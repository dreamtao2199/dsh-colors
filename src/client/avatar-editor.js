/**
 * Avatar editor (PRD FR-9): pick → preview → adjust → 确定.
 *
 * Why an inline editor instead of "upload and hope":
 *   * the stored image is the ONLY copy — it lives in `localStorage`, which browsers cap at
 *     a few megabytes per origin, so the output is always downsampled to 256×256 (~20–40KB);
 *   * a square crop with pan + zoom is what makes an arbitrary photo look deliberate;
 *   * 确定 / 取消 gives the click a visible result, which is what "no feedback" complaints
 *     were actually about.
 *
 * Everything is feature-guarded: without a canvas (tests, exotic runtime) the editor still
 * works as a plain data-URL passthrough rather than throwing inside a host slot.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

/** Crop viewport edge in the panel, in px. Purely cosmetic. */
const AVATAR_VIEW = 168;

function createAvatarEditor(deps) {
  const h = deps.h;
  const store = deps.store;
  const edge = deps.edge || 256;

  function canUseCanvas() {
    try {
      if (typeof document === 'undefined' || !document.createElement) return false;
      const probe = document.createElement('canvas');
      return Boolean(probe && typeof probe.getContext === 'function' && probe.getContext('2d'));
    } catch (err) {
      return false;
    }
  }

  /** Cover-fit transform for one viewport size, honouring zoom + pan with clamping. */
  function fit(image, view, zoom, offset) {
    const scale = Math.max(view / image.width, view / image.height) * zoom;
    const dw = image.width * scale;
    const dh = image.height * scale;
    const maxX = Math.max(0, (dw - view) / 2);
    const maxY = Math.max(0, (dh - view) / 2);
    const x = (view - dw) / 2 + Math.max(-maxX, Math.min(maxX, offset.x));
    const y = (view - dh) / 2 + Math.max(-maxY, Math.min(maxY, offset.y));
    return { x, y, dw, dh };
  }

  return function AvatarEditor(props) {
    const close = props && typeof props.onClose === 'function' ? props.onClose : null;
    const stored = store.snapshot().brand.avatar || '';
    const [src, setSrc] = React.useState(stored);
    const [zoom, setZoom] = React.useState(1);
    const [offset, setOffset] = React.useState({ x: 0, y: 0 });
    const [adjust, setAdjust] = React.useState({ brightness: 1, contrast: 1, saturate: 1 });
    const [note, setNote] = React.useState(null);
    const imageRef = React.useRef(null);
    const canvasRef = React.useRef(null);
    const dragRef = React.useRef(null);

    const usable = canUseCanvas();

    function filterString(a) {
      return (
        'brightness(' + a.brightness + ') contrast(' + a.contrast + ') saturate(' + a.saturate + ')'
      );
    }

    function paintPreview() {
      if (!usable) return;
      const canvas = canvasRef.current;
      const image = imageRef.current;
      if (!canvas || !image) return;
      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, AVATAR_VIEW, AVATAR_VIEW);
        const box = fit(image, AVATAR_VIEW, zoom, offset);
        if (typeof ctx.filter === 'string') ctx.filter = filterString(adjust);
        ctx.drawImage(image, box.x, box.y, box.dw, box.dh);
        ctx.filter = 'none';
      } catch (err) {
        setNote('预览绘制失败');
      }
    }

    React.useEffect(() => {
      if (!src) {
        imageRef.current = null;
        return undefined;
      }
      if (typeof Image !== 'function') return undefined;
      try {
        const image = new Image();
        image.onload = () => {
          imageRef.current = image;
          paintPreview();
        };
        image.onerror = () => setNote('图片解码失败');
        image.src = src;
      } catch (err) {
        setNote('图片解码失败');
      }
      return undefined;
    }, [src, zoom, offset.x, offset.y, adjust.brightness, adjust.contrast, adjust.saturate]);

    function loadFile(file) {
      if (!file) return;
      if (typeof file.size === 'number' && file.size > deps.limit) {
        setNote('图片需小于 ' + Math.max(1, Math.round(deps.limit / 1048576)) + 'MB');
        return;
      }
      try {
        const reader = new FileReader();
        reader.onload = () => {
          setNote(null);
          setZoom(1);
          setOffset({ x: 0, y: 0 });
          setSrc(String(reader.result || ''));
        };
        reader.onerror = () => setNote('图片读取失败');
        reader.readAsDataURL(file);
      } catch (err) {
        setNote('图片读取失败');
      }
    }

    function commit() {
      let output = src;
      const image = imageRef.current;
      if (usable && image) {
        try {
          const out = document.createElement('canvas');
          out.width = edge;
          out.height = edge;
          const ctx = out.getContext('2d');
          const box = fit(image, AVATAR_VIEW, zoom, offset);
          const scale = edge / AVATAR_VIEW;
          if (typeof ctx.filter === 'string') ctx.filter = filterString(adjust);
          ctx.drawImage(image, box.x * scale, box.y * scale, box.dw * scale, box.dh * scale);
          ctx.filter = 'none';
          const data = out.toDataURL('image/png');
          if (typeof data === 'string' && data.indexOf('data:image') === 0) output = data;
        } catch (err) {
          setNote('导出失败，已保留原图');
        }
      }
      store.patch({ brand: Object.assign({}, store.snapshot().brand, { avatar: output }) });
      if (close) close();
    }

    function pointerDown(event) {
      const point = pointOf(event);
      if (!point) return;
      dragRef.current = { x: point.x, y: point.y, ox: offset.x, oy: offset.y };
    }

    function pointerMove(event) {
      const drag = dragRef.current;
      const point = pointOf(event);
      if (!drag || !point) return;
      setOffset({ x: drag.ox + (point.x - drag.x), y: drag.oy + (point.y - drag.y) });
    }

    function pointerUp() {
      dragRef.current = null;
    }

    function pointOf(event) {
      try {
        const rect = event.currentTarget.getBoundingClientRect();
        return { x: event.clientX - rect.left, y: event.clientY - rect.top };
      } catch (err) {
        return null;
      }
    }

    const slider = (label, value, min, max, step, onChange) =>
      h(
        'label',
        { style: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 } },
        h('span', { style: { width: 52, color: 'var(--dsw-alias-label-tertiary)' } }, label),
        h('input', {
          type: 'range',
          min,
          max,
          step,
          value,
          onChange: (event) => onChange(Number(event.target.value)),
          style: { width: 120 },
        }),
      );

    return h(
      'div',
      {
        style: {
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          padding: '8px 0',
          borderTop: '1px solid var(--dsw-alias-border-l1)',
        },
      },
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
        h(
          'div',
          {
            'data-dsh-avatar-view': 'true',
            onPointerDown: pointerDown,
            onPointerMove: pointerMove,
            onPointerUp: pointerUp,
            onPointerLeave: pointerUp,
            style: {
              width: AVATAR_VIEW,
              height: AVATAR_VIEW,
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--dsw-alias-bg-layer-2)',
              border: '1px solid var(--dsw-alias-border-l2)',
              cursor: 'grab',
              display: 'grid',
              placeItems: 'center',
              fontSize: 11,
              color: 'var(--dsw-alias-label-tertiary)',
            },
          },
          usable && src
            ? h('canvas', { ref: canvasRef, width: AVATAR_VIEW, height: AVATAR_VIEW, style: { display: 'block' } })
            : h('span', null, src ? '预览不可用' : '选择图片'),
        ),
        h('input', {
          type: 'file',
          accept: 'image/png,image/jpeg,image/webp',
          onChange: (event) => {
            const file = event.target.files && event.target.files[0];
            loadFile(file);
          },
          style: { fontSize: 11 },
        }),
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 4, minWidth: 220 } },
        slider('缩放', zoom, 1, 3, 0.05, setZoom),
        slider('亮度', adjust.brightness, 0.6, 1.6, 0.02, (v) => setAdjust(Object.assign({}, adjust, { brightness: v }))),
        slider('对比', adjust.contrast, 0.6, 1.6, 0.02, (v) => setAdjust(Object.assign({}, adjust, { contrast: v }))),
        slider('饱和', adjust.saturate, 0, 2, 0.02, (v) => setAdjust(Object.assign({}, adjust, { saturate: v }))),
        h(
          'div',
          { style: { fontSize: 11, color: 'var(--dsw-alias-label-tertiary)' } },
          '输出 ' + edge + '×' + edge + '，约 20–40KB',
        ),
        note ? h('div', { style: { fontSize: 11, color: 'var(--dsw-alias-state-error-primary)' } }, note) : null,
        h(
          'div',
          { style: { display: 'flex', gap: 6, marginTop: 2 } },
          h(
            'button',
            {
              type: 'button',
              'data-dsh-action': 'true',
              disabled: !src,
              onClick: commit,
              style: { font: 'inherit', fontSize: 12, padding: '2px 12px', borderRadius: 6, cursor: 'pointer' },
            },
            '确定',
          ),
          h(
            'button',
            {
              type: 'button',
              'data-dsh-chip': 'true',
              'data-active': 'false',
              onClick: close || (() => {}),
              style: { font: 'inherit', fontSize: 12, padding: '2px 12px', borderRadius: 6, cursor: 'pointer' },
            },
            '取消',
          ),
        ),
      ),
    );
  };
}

/* @bundle:strip-start */
export { createAvatarEditor, AVATAR_VIEW };
/* @bundle:strip-end */
