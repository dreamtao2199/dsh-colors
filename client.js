/**
 * GENERATED FILE — do not edit by hand.
 * Source of truth: src/ ; rebuild with `node build.mjs`.
 * dsh-colors v0.9.9
 */
window.__ModuleLoader__.load({
  id: 'dsh-colors',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const PALETTES = [{"id":"cloud-dancer","name":"云上舞白","group":"A","source":"Pantone 11-4201 · 2026 年度色","identity":"#F0EEE9","note":"暖白中性底，主色低饱和暖灰","noteAccent":"#2A4E8C","light":{"brand":"#9A8F80","bg":"#F5F3EF","surface":"#FFFFFF","sunken":"#EDEAE3","text":"#2B2721","sidebar":"#F1EEE8"}},{"id":"mocha-mousse","name":"摩卡慕斯","group":"A","source":"Pantone 17-1230 · 2025 年度色","identity":"#A47864","note":"咖啡奶调，暖而不燥","noteAccent":"#2F5F8F","light":{"brand":"#A47864","bg":"#F7F1EC","surface":"#FFFDFB","sunken":"#EFE4DB","text":"#2E241D","sidebar":"#F3EBE3"}},{"id":"peach-fuzz","name":"柔和桃","group":"A","source":"Pantone 13-1023 · 2024 年度色","identity":"#FFBE98","note":"身份色偏浅，强调色自动加深为陶土橙","noteAccent":"#2F5F8F","light":{"brand":"#FFBE98","bg":"#FDF4EE","surface":"#FFFFFF","sunken":"#F7E7DC","text":"#33241C","sidebar":"#FBF1EA"}},{"id":"very-peri","name":"长春花蓝","group":"A","source":"Pantone 17-3938 · 2022 年度色","identity":"#6667AB","note":"唯一的冷紫调","noteAccent":"#A05A2C","light":{"brand":"#6667AB","bg":"#F4F4FA","surface":"#FFFFFF","sunken":"#E9E9F5","text":"#1F1F33","sidebar":"#EFF0F8"}},{"id":"ruyao-celadon","name":"汝窑天青","group":"B","source":"中国传统色","identity":"#7FA39B","note":"宋瓷天青，最耐看的一支；青瓷的正式替代","noteAccent":"#A63A5A","light":{"brand":"#7FA39B","bg":"#F2F6F4","surface":"#FFFFFF","sunken":"#E6EDEA","text":"#1E2A27","sidebar":"#EDF2F0"}},{"id":"moon-white","name":"月白","group":"B","source":"中国传统色","identity":"#E8EDF2","note":"极浅蓝白，身份色几乎就是底","noteAccent":"#A05A2C","light":{"brand":"#E8EDF2","bg":"#F6F8FA","surface":"#FFFFFF","sunken":"#EBEFF4","text":"#1D2530","sidebar":"#F1F4F8"}},{"id":"lotus-pink","name":"藕荷","group":"B","source":"中国传统色","identity":"#D8C7D8","note":"淡莲粉紫，温柔不甜腻","noteAccent":"#2F5F8F","light":{"brand":"#D8C7D8","bg":"#FAF5F8","surface":"#FFFFFF","sunken":"#F2E9F0","text":"#2E2230","sidebar":"#F7F1F5"}},{"id":"autumn-olive","name":"秋香","group":"B","source":"中国传统色","identity":"#D9C98A","note":"橄榄黄，复古纸感","noteAccent":"#35486B","light":{"brand":"#D9C98A","bg":"#F9F7EC","surface":"#FFFFFF","sunken":"#F1EDD9","text":"#2B2818","sidebar":"#F5F2E4"}},{"id":"tianshui-jade","name":"天水碧","group":"B","source":"中国传统色","identity":"#A8D8CF","note":"雨过天青的水绿，清爽","noteAccent":"#A63A5A","light":{"brand":"#A8D8CF","bg":"#F1F8F6","surface":"#FFFFFF","sunken":"#E3F0EC","text":"#16302A","sidebar":"#EBF5F2"}},{"id":"dawn-white","name":"东方既白","group":"B","source":"中国传统色","identity":"#F2EDE4","note":"破晓暖白，配灰褐强调色","noteAccent":"#35486B","light":{"brand":"#F2EDE4","bg":"#F8F5EE","surface":"#FFFFFF","sunken":"#EFEAE0","text":"#2A251B","sidebar":"#F4F0E8"}},{"id":"cinnabar","name":"朱砂","group":"B","source":"中国传统色","identity":"#B4432F","note":"暖红，身份色本身就是深色强调色（底仍是浅的）","noteAccent":"#2F5F8F","light":{"brand":"#B4432F","bg":"#FBF2EF","surface":"#FFFFFF","sunken":"#F5E2DC","text":"#331E18","sidebar":"#F8EDE9"}},{"id":"azurite","name":"石青","group":"B","source":"中国传统色","identity":"#2F5F8F","note":"矿物蓝，沉静","noteAccent":"#A05A2C","light":{"brand":"#2F5F8F","bg":"#F2F6FA","surface":"#FFFFFF","sunken":"#E5EDF5","text":"#16283A","sidebar":"#EDF3F8"}},{"id":"dai-blue","name":"黛蓝","group":"B","source":"中国传统色","identity":"#35486B","note":"远山黛色，偏深的蓝（只作强调，底不动）","noteAccent":"#A05A2C","light":{"brand":"#35486B","bg":"#F3F5F9","surface":"#FFFFFF","sunken":"#E7EBF2","text":"#1A2333","sidebar":"#EFF2F7"}},{"id":"ochre","name":"赭石","group":"B","source":"中国传统色","identity":"#A05A2C","note":"土红棕，古画底调","noteAccent":"#2F5F8F","light":{"brand":"#A05A2C","bg":"#FAF4EE","surface":"#FFFFFF","sunken":"#F2E6D9","text":"#2F2418","sidebar":"#F7F0E8"}},{"id":"cang-huang","name":"苍黄","group":"B","source":"中国传统色","identity":"#A88C2A","note":"暗黄，古籍纸色","noteAccent":"#35486B","light":{"brand":"#A88C2A","bg":"#F9F6EA","surface":"#FFFFFF","sunken":"#F1EBD5","text":"#2C2716","sidebar":"#F5F1E1"}},{"id":"rouge","name":"胭脂","group":"B","source":"中国传统色","identity":"#A63A5A","note":"玫红，比朱砂偏冷","noteAccent":"#2F5F8F","light":{"brand":"#A63A5A","bg":"#FBF3F5","surface":"#FFFFFF","sunken":"#F4E4E9","text":"#33202A","sidebar":"#F8EFF2"}},{"id":"bamboo-moon","name":"竹月","group":"B","source":"中国传统色","identity":"#63808C","note":"竹影月色，青灰蓝","noteAccent":"#9E4A32","light":{"brand":"#63808C","bg":"#F4F7F8","surface":"#FFFFFF","sunken":"#E8EFF2","text":"#1E2A30","sidebar":"#EFF4F6"}},{"id":"lapis","name":"青金","group":"B","source":"中国传统色","identity":"#2A4E8C","note":"青金石蓝，浓而不艳","noteAccent":"#A05A2C","light":{"brand":"#2A4E8C","bg":"#F3F5FB","surface":"#FFFFFF","sunken":"#E5EAF7","text":"#1B2440","sidebar":"#EFF2FA"}},{"id":"morandi-sage","name":"莫兰迪·灰绿","group":"C","source":"莫兰迪高级灰","identity":"#7E9179","note":"最低调的一支，久看不累","noteAccent":"#8A5A86","light":{"brand":"#7E9179","bg":"#F4F6F2","surface":"#FFFFFF","sunken":"#E8EDE6","text":"#222A20","sidebar":"#EFF3EC"}},{"id":"morandi-blue","name":"莫兰迪·灰蓝","group":"C","source":"莫兰迪高级灰","identity":"#7E93A8","note":"雾霾蓝，冷静","noteAccent":"#A05A2C","light":{"brand":"#7E93A8","bg":"#F3F6F8","surface":"#FFFFFF","sunken":"#E6ECF1","text":"#1F272E","sidebar":"#EEF2F6"}},{"id":"morandi-rose","name":"莫兰迪·灰粉","group":"C","source":"莫兰迪高级灰","identity":"#B08A8A","note":"脏粉，柔和不幼稚","noteAccent":"#2F5F8F","light":{"brand":"#B08A8A","bg":"#F9F4F4","surface":"#FFFFFF","sunken":"#F1E7E7","text":"#2C2222","sidebar":"#F6F0F0"}},{"id":"morandi-mauve","name":"莫兰迪·灰紫","group":"C","source":"莫兰迪高级灰","identity":"#93829A","note":"灰紫，含蓄的高级感","noteAccent":"#A05A2C","light":{"brand":"#93829A","bg":"#F6F3F7","surface":"#FFFFFF","sunken":"#ECE7EF","text":"#262028","sidebar":"#F1EDF4"}}];

      /* ---- src/lib/color.js ---- */
  /**
   * Color engine: sRGB relative luminance, WCAG contrast, and hue-preserving derivation.
   *
   * Every threshold decision in this plugin comes from here, so an accent is never a color
   * somebody eyeballed: it is the palette's identity hue pushed along the lightness axis
   * until it clears the ratio the interface actually needs.
   *
   * Bundling note: the `@bundle:strip` block exists only for Node-side tests; the bundler
   * removes it before inlining this file into the Client artifact (the browser gets plain
   * function declarations inside the module factory).
   */

  /** Parse `#rgb` / `#rrggbb` into `[r, g, b]`; throws on anything else. */
  function hexToRgb(hex) {
    if (typeof hex !== 'string') throw new TypeError('hexToRgb expects a string, got ' + typeof hex);
    let h = hex.trim().replace(/^#/, '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new TypeError('not a hex color: ' + hex);
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgbToHex(rgb) {
    return (
      '#' +
      rgb
        .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase()
    );
  }

  /** `rgba(...)` string for a hex color at the given alpha (used by translucent finishes). */
  function toRgba(hex, alpha) {
    const [r, g, b] = hexToRgb(hex);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /** WCAG 2.x channel linearization. */
  function _linearize(channel) {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function relativeLuminance(color) {
    const [r, g, b] = typeof color === 'string' ? hexToRgb(color) : color;
    return 0.2126 * _linearize(r) + 0.7152 * _linearize(g) + 0.0722 * _linearize(b);
  }

  /** WCAG contrast ratio, 1..21. Accepts hex strings or `[r,g,b]`. */
  function contrastRatio(a, b) {
    const la = relativeLuminance(a);
    const lb = relativeLuminance(b);
    const hi = Math.max(la, lb);
    const lo = Math.min(la, lb);
    return (hi + 0.05) / (lo + 0.05);
  }

  /** Linear blend in sRGB: ratio 0 → a, ratio 1 → b. */
  function mixHex(a, b, ratio) {
    const ra = hexToRgb(a);
    const rb = hexToRgb(b);
    return rgbToHex(ra.map((v, i) => v + (rb[i] - v) * ratio));
  }

  function darken(hex, ratio) {
    return mixHex(hex, '#000000', ratio);
  }

  function lighten(hex, ratio) {
    return mixHex(hex, '#FFFFFF', ratio);
  }

  /**
   * Return the identity hue pushed toward black until it clears `target` against `backdrop`.
   * This is what makes a pale Pantone color usable as link or button fill without letting go
   * of its hue family. Never returns something worse than the input.
   */
  function usableAccent(brand, backdrop, target) {
    const want = target === undefined ? 4.5 : target;
    if (contrastRatio(brand, backdrop) >= want) return brand;
    let best = brand;
    for (let step = 1; step <= 100; step += 1) {
      best = darken(brand, step / 100);
      if (contrastRatio(best, backdrop) >= want) return best;
    }
    return best;
  }

  /** The same push, but upward — for text sitting on a dark fill. */
  function usableOn(brand, backdrop, target) {
    const want = target === undefined ? 4.5 : target;
    if (contrastRatio(brand, backdrop) >= want) return brand;
    let best = brand;
    for (let step = 1; step <= 100; step += 1) {
      best = lighten(brand, step / 100);
      if (contrastRatio(best, backdrop) >= want) return best;
    }
    return best;
  }

  function isHexColor(value) {
    return typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
  }

  /**
   * Walk from `from` toward `towards` and return the furthest point that still clears
   * `target` against `backdrop`. Used for secondary text: as light as accessibility allows,
   * never lighter.
   */
  function maxBlendForContrast(from, towards, backdrop, target) {
    const want = target === undefined ? 4.5 : target;
    let best = from;
    for (let step = 0; step <= 100; step += 1) {
      const candidate = mixHex(from, towards, step / 100);
      if (contrastRatio(candidate, backdrop) < want) break;
      best = candidate;
    }
    return best;
  }

  /* stripped for bundle */

      /* ---- src/lib/breaker.js ---- */
  /**
   * Repaint circuit breaker.
   *
   * Why this exists: the theme service's `overrideTokens` emits the documented `theme/change`
   * event. A plugin that listens to `theme/change` and repaints inside that listener therefore
   * feeds itself — paint → overrideTokens → theme/change → paint — and the renderer runs out of
   * memory (the crash log said exactly that: `Desktop renderer exited: oom`, with no JS error).
   *
   * Three guards, cheapest first:
   *   1. re-entrancy: a repaint already in progress rejects a nested one;
   *   2. rate window: more than `limit` repaints inside `windowMs` trips the breaker;
   *   3. once tripped it stays tripped until something explicit resets it, so a feedback loop
   *      can never run again in that session.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  const BREAKER_DEFAULTS = { limit: 24, windowMs: 2000 };

  function createBreaker(options) {
    const opts = options || {};
    const limit = typeof opts.limit === 'number' ? opts.limit : BREAKER_DEFAULTS.limit;
    const windowMs = typeof opts.windowMs === 'number' ? opts.windowMs : BREAKER_DEFAULTS.windowMs;

    let count = 0;
    let windowStart = 0;
    let tripped = false;
    let running = false;

    return {
      /** `'ok'` to proceed; `'reentrant'`, `'tripped'` to skip. */
      enter(now) {
        if (tripped) return 'tripped';
        if (running) return 'reentrant';
        const t = typeof now === 'number' ? now : Date.now();
        if (windowStart === 0 || t - windowStart > windowMs) {
          windowStart = t;
          count = 0;
        }
        count += 1;
        if (count > limit) {
          tripped = true;
          return 'tripped';
        }
        running = true;
        return 'ok';
      },

      exit() {
        running = false;
      },

      reset() {
        tripped = false;
        running = false;
        count = 0;
        windowStart = 0;
      },

      state() {
        return { tripped, running, count, limit, windowMs };
      },
    };
  }

  /* stripped for bundle */

      /* ---- src/data/textures.js ---- */
  /**
   * Generated texture tiles (base64 PNG data URIs).
   * Regenerate with tools/make-textures.py — do not edit by hand.
   */
  const TEXTURE_TILES = {
    fiber: { name: '纤维', note: '短纤维走向，浅底纸感', dataUri: 'data:image/png;base64,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' },
    cloud: { name: '云絮', note: '低频云絮斑，纸面匀度不均', dataUri: 'data:image/png;base64,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' },
    washi: { name: '和纸', note: '长纤维、更均匀', dataUri: 'data:image/png;base64,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' },
    kraft: { name: '牛皮纸', note: '暖棕底，纤维与云絮', dataUri: 'data:image/png;base64,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' },
    linen: { name: '亚麻', note: '不规则经纬织纹', dataUri: 'data:image/png;base64,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' },
    rule: { name: '直纹纸', note: '竖向细纹', dataUri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAwFBMVEX59/H29O729O328+318+z18uz08uv08ev08erz8ery7+jx7+jx7+fx7ujw7ufw7ubw7ebw7eXv7ebv7eXv7OXv7OTu7OXv6+Xu6+Tu6+Pt6+Tt6+Pu6uPt6uPt6uLs6uLs6eLr6eHr6OHr6ODq6ODr5+Dq5+Dq59/q5t/p59/p5t/p5t7p5d7p5d3o5d7o5d3o5dzo5N3n5N3n5Nzn49zm49zm49vm49rm4trl4tvl4trl4tnl4dnk4Nnj4Njj39dYFovTAAADvElEQVR42u3be1fTMBQA8Jub26TxLSJOfGyOh8KACUxERPn+38qs3WY7+kjStGFjf+QUdtaeHzc3N2kbAGAL0vZJt2PderqNdTvTra/bSLcX088EwCt9fKrbIQB7PjtnqNtApcfh7LvD2Xm76XeT34+Bw7Y+7syuOz1eAJgCEO8gB4AsYAIWALIH4AcEMS4HqIEJgEMCGLpFIP2sGKBAA9AMQLTjHaD73wRwpds2OedAMeBECJEkoSkAPAOm51y+FcKoC7KAyHsOIAQEgJoEBuhC1AkAywHwsgLA+T0ARL4B1REYcy8AwHIA2HXBqgJgjQC5UUChAUDtAWg1AMkFggKyEfgWGtATXpOQugJIfwAQThGYhAYMpbQHUHElFI45IIsBWAUgt1JMVpUQK7qgISA2K8Vn3gH6vDQCcQlAqdvsXIBok4Q+APo8pVRmMsKWAOaz4Q8bwA0i/sLKUUA+p2OX9UBwAHQL4Jz/DgMQ/yOgEZ95SEDwCLQEoMCA2lIsQo+CdgEUGPAnF4Eoim50+9odgFaoEm4AG0D3AF4EiPfiOB4EBASPwDIgWmMAN0vCkR2APABYWMBH1igJmwIYazYKyKkQqTngJ2s6DEsBMgtQeYCaR4A1rwNlAJmNgMpF4FK1X4jkfrYLVK4L3ndQCWUuB6YPFQ4WAAWXbQNkQRIeZLvAFhDZAe6gBtC3zoEoalyKDxquB/oNAdTjYRckT/bCrog4hV6SNQfEoRel7QCIbo27IK4EOOwhIeqTTQ54B9gm4VoC0GoYxmsI0K9dAt+cPjhA3PntOT56AKw8YBIYwMJGgLHO1gOqCHDS4YJEhXhMx0f2AHnkDcC5QwQk7MR+AHzs1AUaoBO5OUD/9U45IJNjHCwJv1fdnHYJCPWwWpoMQx76cb0pQLQ2G948FgCaJyEvArwODFjsrqcywHU9gJkBeNH2/sUoKAHINzUR0Pu8GLgCRGYYFgJGEkQdILmIG0BANUDK3dk/NpQCEJ6BOyBfiM6XALcyzYEaADDTJKzbRXPuMgqExVzQBuBvrhDpub0eIHwCxHIl5Fe1s6FPgCgoxToKlQAR+uW12Ly+f3AAKZ0A6AlwKl0jgD4AUjboAmwMGMiyHGALwKEhQO5LKU/13vDyB5WIeqOrWRKyeQSIqpLwS0ujgPVmP1+T8ShgHgFslgNEhsMQsY8K+/cBel8x4pFuV8sArK8D52RYBzANP7OLAGICYP4KEbPtggvPgORCtjnwDtYJsLUB2APY0jBUBgDeIkCBG+Af/Dbz6MSrdokAAAAASUVORK5CYII=' },
    halftone: { name: '网点', note: '半调点阵', dataUri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAABlBMVEX8+/nm5eQqvNUWAAAARElEQVR42mNgIAQYJdAEWFTQBJgIaqEGYGRsQOH/Z2Q+gCLwF8MdLP/2oWqhijtGw2M0PEbDYzQ8RsNjNDxGw4PC8AAAPCwy+XO2p4oAAAAASUVORK5CYII=' },
    scanline: { name: '扫描线', note: '横向扫描细线', dataUri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAKlBMVEX6+vjt7ezs7Ovr7Orq6uno6Ofm5+Xk5eTk5OPj4+Li4uHh4eDf4N/c3NuM1hBHAAAAeklEQVR42u3ZQQ2DUBAE0BkJWMACFrCABSxgoRZqoRawgIV64dYDBiDpWwkvm50/+cnd03f+fvph0IlBZwb2IOnIoAuD7gxkY9IvA3uQdGXQg4Fc0Bv1BQY/g42BvpD0xUB31hfcRG9luSAX7MHFYGDgf0EuuAdPeSufUVcOzo1LoXQAAAAASUVORK5CYII=' },
  };

  /* stripped for bundle */

      /* ---- src/lib/palette-layer.js ---- */
  /**
   * Palette → theme layer.
   *
   * Two groups of tokens:
   *   CORE    the sanctioned third-party alias surface (the 14 the Theme provider advertises)
   *   DERIVED the extra tokens a full light surface needs (tertiary text, hairline borders,
   *           link, focus ring, business accent, filled button) — the "standard" accent tier
   *
   * Every token is emitted in BOTH mode slots with the same light value: this build has no
   * dark mode, so an accidental dark preference cannot darken the interface. Secondary and
   * tertiary text are derived by walking toward the background only as far as WCAG allows.
   *
   * Bundling note: the `@bundle:strip` block is test-only and removed by the bundler.
   */

  /* stripped for bundle */

  const CORE_TOKENS = [
    '--dsw-alias-brand-primary',
    '--dsw-alias-bg-base',
    '--dsw-alias-bg-layer-1',
    '--dsw-alias-bg-layer-2',
    '--dsw-alias-bg-overlay',
    '--dsw-alias-border-l1',
    '--dsw-alias-border-l2',
    '--dsw-alias-label-primary',
    '--dsw-alias-label-secondary',
    '--dsw-specific-sidebar-fill',
  ];

  /**
   * Derived tokens (borders l3/l4, tertiary text, link, focus ring, business accent, filled
   * buttons) are owned by `accents.js`, which filters them by the active tier. This file stays
   * responsible for the sanctioned alias surface only.
   */
  const DERIVED_TOKENS = [];

  const LAYER_TOKEN_ORDER = CORE_TOKENS.concat(DERIVED_TOKENS);

  /** All light-mode values for one palette, including the accessibility-derived ones. */
  function schemeTokens(spec) {
    const surface = spec.surface;
    const text = spec.text;
    const backdrop = spec.bg;
    const accent = usableAccent(spec.brand, backdrop, 4.5);
    const accentOnSurface = usableAccent(accent, surface, 4.5);

    return {
      // ---- core alias surface
      '--dsw-alias-brand-primary': spec.brand,
      '--dsw-alias-bg-base': spec.bg,
      '--dsw-alias-bg-layer-1': surface,
      '--dsw-alias-bg-layer-2': spec.sunken,
      '--dsw-alias-bg-overlay': spec.overlay || surface,
      '--dsw-alias-border-l1': spec.border1 || mixHex(surface, text, 0.1),
      '--dsw-alias-border-l2': spec.border2 || mixHex(surface, text, 0.2),
      '--dsw-alias-label-primary': text,
      '--dsw-alias-label-secondary':
        spec.label2 || maxBlendForContrast(text, surface, backdrop, 4.5),
      '--dsw-specific-sidebar-fill': spec.sidebar,
    };
  }

  /** The `{ light, dark }` payload the theme service takes; dark mirrors light by design. */
  function buildLayer(palette) {
    const values = schemeTokens(palette.light);
    const layer = {};
    for (const key of LAYER_TOKEN_ORDER) {
      const value = values[key];
      if (typeof value === 'string' && value.length > 0) layer[key] = { light: value, dark: value };
    }
    return layer;
  }

  /** Layer for the "official colors" position: an empty layer clears every override. */
  function emptyLayer() {
    return {};
  }

  /** Contrast report for one palette, used by the tests and by the settings row preview. */
  function auditPalette(palette) {
    const s = palette.light;
    const accent = usableAccent(s.brand, s.bg, 4.5);
    return {
      id: palette.id,
      name: palette.name,
      group: palette.group,
      identity: palette.identity || s.brand,
      accent,
      textOnBg: contrastRatio(s.text, s.bg),
      textOnSurface: contrastRatio(s.text, s.surface),
      secondaryOnBg: contrastRatio(maxBlendForContrast(s.text, s.surface, s.bg, 4.5), s.bg),
      tertiaryOnBg: contrastRatio(maxBlendForContrast(s.text, s.bg, s.bg, 4.5), s.bg),
      accentOnBg: contrastRatio(accent, s.bg),
      accentOnSurface: contrastRatio(accent, s.surface),
      whiteOnAccent: contrastRatio('#FFFFFF', accent),
    };
  }

  /* stripped for bundle */

      /* ---- src/lib/accents.js ---- */
  /**
   * Accent tiers: how much of the interface a palette is allowed to repaint.
   *
   * Ownership split that keeps this file honest:
   *   palette-layer.js  → the 10 sanctioned alias tokens (base, surfaces, text, sidebar)
   *   THIS FILE         → every derived token, filtered by the active tier
   *   finishes.js       → behaviour tokens (translucency, elevation, strokes, scrollbars)
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  /* stripped for bundle */

  const TIERS = {
    gentle: {
      id: 'gentle',
      name: '克制',
      note: '只动 4 处：发丝描边、焦点环、悬停底色、链接',
      tokens: [
        '--dsw-alias-border-l1',
        '--dsw-alias-border-l3',
        '--dsw-focus-ring-color',
        '--dsw-alias-interactive-bg-hover',
        '--dsw-alias-link',
      ],
    },
    standard: {
      id: 'standard',
      name: '标准',
      note: '默认档：加上二级/三级文字、业务强调色、实心按钮、菜单图标、代码块、标注底纹',
      tokens: [
        '--dsw-alias-border-l1',
        '--dsw-alias-border-l2',
        '--dsw-alias-border-l3',
        '--dsw-alias-border-l4',
        '--dsw-focus-ring-color',
        '--dsw-alias-interactive-bg-hover',
        '--dsw-alias-label-secondary',
        '--dsw-alias-label-tertiary',
        '--dsw-alias-link',
        '--dsw-alias-state-business-primary',
        '--dsw-alias-button-primary-fill',
        '--dsw-alias-button-primary-hover',
        '--dsw-alias-menu-icon',
        '--dsw-alias-markdown-code-block',
        '--dsw-alias-mark-note-bg',
      ],
    },
    bold: {
      id: 'bold',
      name: '张扬',
      note: '再加上菜单材质、开关滑块、工具提示、骨架屏',
      tokens: [
        '--dsw-alias-border-l1',
        '--dsw-alias-border-l2',
        '--dsw-alias-border-l3',
        '--dsw-alias-border-l4',
        '--dsw-focus-ring-color',
        '--dsw-alias-interactive-bg-hover',
        '--dsw-alias-label-secondary',
        '--dsw-alias-label-tertiary',
        '--dsw-alias-link',
        '--dsw-alias-state-business-primary',
        '--dsw-alias-button-primary-fill',
        '--dsw-alias-button-primary-hover',
        '--dsw-alias-menu-icon',
        '--dsw-alias-markdown-code-block',
        '--dsw-alias-mark-note-bg',
        '--dsw-menu-surface-fill',
        '--dsw-alias-switch-thumb',
        '--dsw-alias-tooltip-key-bg',
        '--dsw-alias-bg-skeleton',
      ],
    },
  };

  const TIER_ORDER = ['gentle', 'standard', 'bold'];

  /** Accent pushed against the raised surface — where links, buttons and chips live. */
  function surfaceAccent(spec) {
    const start = spec.brand;
    if (contrastRatio(start, spec.surface) >= 4.5) return start;
    let best = start;
    for (let step = 1; step <= 100; step += 1) {
      best = darken(start, step / 100);
      if (contrastRatio(best, spec.surface) >= 4.5) return best;
    }
    return best;
  }

  /** Every token this palette can contribute, before tier filtering. */
  function allAccentTokens(palette) {
    const s = palette.light;
    const surface = s.surface;
    const sunken = s.sunken || s.surface;
    const accent = surfaceAccent(s);

    return {
      '--dsw-alias-border-l1': mixHex(surface, accent, 0.16),
      '--dsw-alias-border-l2': mixHex(surface, accent, 0.26),
      '--dsw-alias-border-l3': mixHex(surface, accent, 0.34),
      '--dsw-alias-border-l4': mixHex(surface, accent, 0.42),
      '--dsw-focus-ring-color': accent,
      '--dsw-alias-interactive-bg-hover': mixHex(surface, accent, 0.08),
      '--dsw-alias-label-secondary': maxBlendForContrast(s.text, surface, s.bg, 4.5),
      '--dsw-alias-label-tertiary': maxBlendForContrast(s.text, s.bg, s.bg, 4.5),
      '--dsw-alias-link': accent,
      '--dsw-alias-state-business-primary': accent,
      '--dsw-alias-button-primary-fill': accent,
      '--dsw-alias-button-primary-hover': darken(accent, 0.12),
      '--dsw-alias-menu-icon': mixHex(s.text, accent, 0.25),
      '--dsw-alias-markdown-code-block': mixHex(surface, accent, 0.05),
      '--dsw-alias-mark-note-bg': mixHex(surface, accent, 0.14),
      '--dsw-menu-surface-fill': mixHex(surface, accent, 0.03),
      '--dsw-alias-switch-thumb': mixHex(surface, accent, 0.06),
      '--dsw-alias-tooltip-key-bg': mixHex(sunken, accent, 0.1),
      '--dsw-alias-bg-skeleton': mixHex(sunken, accent, 0.07),
    };
  }

  /** Token name → value for one tier. Unknown tiers fall back to `standard`. */
  function tierTokens(tierId, palette) {
    const all = allAccentTokens(palette);
    const tier = TIERS[tierId] || TIERS.standard;
    const out = {};
    for (const key of tier.tokens) {
      if (all[key] !== undefined) out[key] = all[key];
    }
    return out;
  }

  /**
   * Harmonise the host's three semantic state colours toward the active palette (PRD FR-7).
   *
   * success stays green, warn stays amber, error stays red — only saturation and temperature
   * move, so the learned meaning survives while the palette is felt. Every value is pushed
   * until it clears 4.5:1 on the palette's own base background.
   *
   * The RUNNING indicator is deliberately absent: its colour comes from
   * `--dsw-alias-label-tertiary`, so recolouring it would tint every tertiary text in the app.
   */
  const SEMANTIC_ANCHORS = {
    '--dsw-alias-state-success-primary': '#2E7D5B',
    '--dsw-alias-state-warn-primary': '#B0781E',
    '--dsw-alias-state-error-primary': '#B4432F',
  };

  function harmonyTokens(palette) {
    const s = palette.light;
    const out = {};
    for (const key of Object.keys(SEMANTIC_ANCHORS)) {
      out[key] = usableAccent(mixHex(SEMANTIC_ANCHORS[key], s.brand, 0.28), s.bg, 4.5);
    }
    return out;
  }

  /**
   * Six session-mark colours derived from ONE palette (PRD FR-10).
   *
   * Marks must never look pasted on: the first two are the palette's own brand and its paired
   * counter-colour, and the rest are that brand blended toward fixed hues, so the whole family
   * keeps the palette's temperature while staying tellable apart.
   *
   * Two rules are enforced here rather than left to taste:
   *   * every mark is pushed until it clears 3:1 against the palette background — that is the
   *     non-text contrast standard for a graphical object, and a pale palette's near-white brand
   *     would otherwise paint an invisible bar;
   *   * marks are de-duplicated (a light palette can collapse two blends onto one colour), by
   *     nudging the loser further toward its anchor until it is distinct.
   *
   * With no palette active we fall back to the documented neutral family — we do not invent a
   * brand colour.
   */
  const MARK_ANCHORS = ['#2F7D6B', '#B0781E', '#A63A5A', '#3A5FA8'];
  const MARK_NEUTRAL = ['#8A8F98', '#4D6BFE', '#2F7D6B', '#B0781E', '#A63A5A', '#3A5FA8'];
  const MARK_MIN_CONTRAST = 3;

  function markColors(palette) {
    if (!palette || !palette.light) return MARK_NEUTRAL.slice();
    const spec = palette.light;
    const brand = spec.brand;
    const note = palette.noteAccent || spec.text;
    const seen = {};
    const out = [];

    const push = (candidate, anchor) => {
      let value = usableAccent(candidate, spec.bg, MARK_MIN_CONTRAST);
      let step = 0;
      while (seen[value] && step < 6) {
        step += 1;
        // Nudge by DARKENING, not by mixing toward the anchor: for a palette whose brand already
        // equals an anchor (胭脂 #A63A5A) mixing toward it is a no-op and the duplicate survives.
        value = usableAccent(darken(candidate, 0.14 * step), spec.bg, MARK_MIN_CONTRAST);
      }
      seen[value] = true;
      out.push(value);
    };

    push(brand, spec.text);
    push(note, spec.text);
    MARK_ANCHORS.forEach((anchor) => push(mixHex(brand, anchor, 0.55), anchor));
    return out;
  }

  /**
   * Workspace accent layer: a narrow slice that can sit on top of a global palette without
   * repainting surfaces — this is what "nested workspace color" means in practice.
   */
  function workspaceTokens(palette) {
    const s = palette.light;
    const accent = surfaceAccent(s);
    return {
      '--dsw-alias-brand-primary': s.brand,
      '--dsw-alias-link': accent,
      '--dsw-focus-ring-color': accent,
      '--dsw-alias-state-business-primary': accent,
      '--dsw-alias-button-primary-fill': accent,
      '--dsw-alias-button-primary-hover': darken(accent, 0.12),
      '--dsw-alias-border-l1': mixHex(s.surface, accent, 0.16),
      '--dsw-alias-mark-note-bg': mixHex(s.surface, accent, 0.14),
      '--dsw-specific-sidebar-fill': s.sidebar,
    };
  }

  /* stripped for bundle */

      /* ---- src/lib/finishes.js ---- */
  /**
   * Finishes: surface effects, kept strictly separate from the colour systems.
   *
   * Texture effects are IMAGE TILES (base64 PNG data URIs from `src/data/textures.js`), not CSS
   * gradients. That is deliberate: `repeating-linear-gradient` can only draw regular patterns —
   * it produced graph paper where linen was asked for. The tiles are generated by
   * `tools/make-textures.py` and pass a numeric seam test (wrapped-edge delta <= 1.3x the
   * internal neighbour delta).
   *
   * Safety invariants carried over from the incident:
   *   * AT MOST ONE full-viewport overlay, enforced in `resolveFinishes`;
   *   * overlays sit at `z-index: 1` with `pointer-events: none`;
   *   * no `background-attachment: fixed`, no `!important` on painted backgrounds;
   *   * every texture stays faint — the overlay opacity is capped at 0.5.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  /* stripped for bundle */

  const FINISH_ORDER = [
    'glass',
    'gradient',
    'fiber',
    'cloud',
    'washi',
    'kraft',
    'linen',
    'rule',
    'halftone',
    'scanline',
    'emboss',
    'stroke',
    'shadow',
    'scroll',
  ];

  /** Soften each other instead of refusing to combine. */
  const DEGRADE_RULES = [
    { when: ['gradient', 'emboss'], note: '渐变 + 硬描边：硬描边保留描边，不铺底色' },
    { when: ['glass', 'fiber'], note: '毛玻璃 + 纤维：粒径减半，保住通透感' },
    { when: ['glass', 'cloud'], note: '毛玻璃 + 云絮：云絮减半，保住通透感' },
  ];

  /**
   * The neutral light surface used when NO palette is selected ("官方原色").
   *
   * Why this exists: effects and colours are ADDITIVE, never substitutes. The build up to
   * 0.9.9 computed finishes only when a palette was active, so choosing 官方原色 silently threw
   * all fourteen effects away. Finishes now always resolve; without a palette they fall back to
   * this documented neutral.
   *
   * `brand` is deliberately a NEUTRAL GREY, not a real accent: the host's own brand colour is
   * not ours to guess, and inventing one would make "official colors + 焦点描边" quietly paint a
   * colour the user never chose.
   */
  const NEUTRAL_LIGHT = {
    bg: '#FFFFFF',
    surface: '#FFFFFF',
    sunken: '#F2F3F5',
    text: '#1F2328',
    brand: '#8A8F98',
  };

  /** Shared geometry for the single permitted texture layer. */
  const OVERLAY_BASE = 'position:fixed;inset:0;pointer-events:none;z-index:1;';

  const SPIN_KEYFRAMES =
    '@keyframes dsh-theme-spin{to{transform:rotate(360deg)}}' +
    '@keyframes dsh-theme-pulse{0%,100%{opacity:.35}50%{opacity:1}}';

  /** Texture overlays must stay faint enough to read text through (PRD FR-2). */
  const TEXTURE_OPACITY = {
    fiber: 0.5,
    cloud: 0.45,
    washi: 0.45,
    kraft: 0.42,
    linen: 0.45,
    rule: 0.45,
    halftone: 0.32,
    scanline: 0.3,
  };

  /** One finish per generated tile, in the order the tiles are declared. */
  const TEXTURE_FINISHES = Object.keys(TEXTURE_TILES).map((key) => ({
    id: key,
    name: TEXTURE_TILES[key].name,
    note: TEXTURE_TILES[key].note,
    tags: ['light', 'texture'],
    apply: (c, opts) => {
      const base = TEXTURE_OPACITY[key] === undefined ? 0.4 : TEXTURE_OPACITY[key];
      const alpha = opts && opts.softOverlays ? base / 2 : base;
      return {
        overlay:
          'opacity:' + alpha + ';' +
          'background-image:url(' + TEXTURE_TILES[key].dataUri + ');' +
          'background-repeat:repeat;background-size:128px 128px;',
      };
    },
  }));

  const CORE_FINISHES = [
    {
      id: 'glass',
      name: '毛玻璃',
      tags: ['light', 'neutral'],
      apply: (c) => ({
        tokens: {
          // "frosted", not "transparent": surfaces stay >=0.72 opaque (PRD FR-2)
          '--dsw-alias-bg-layer-1': toRgba(c.surface, 0.8),
          '--dsw-alias-bg-layer-2': toRgba(c.sunken, 0.72),
          '--dsw-alias-bg-overlay': toRgba(c.surface, 0.88),
          '--dsw-menu-surface-fill': toRgba(c.surface, 0.82),
          '--dsw-menu-backdrop-filter': 'saturate(140%) blur(10px)',
        },
      }),
    },
    {
      id: 'gradient',
      name: '渐变雾面',
      tags: ['light'],
      apply: (c) => ({
        // the base stays a COLOUR (translucent) so color-mix() consumers remain valid
        tokens: { '--dsw-alias-bg-base': toRgba(c.bg, 0.86) },
        css:
          'html{background-image:linear-gradient(158deg,' + c.bg + ' 0%,' + c.tintA + ' 52%,' + c.tintB + ' 100%);}' +
          'body{background-color:transparent;}',
      }),
    },
  ];

  const TAIL_FINISHES = [
    {
      id: 'emboss',
      name: '硬描边',
      tags: ['light', 'neutral'],
      apply: (c) => ({
        // an inset shadow on `body` is invisible (the shell frame paints over it) — only the
        // border tokens do visible work here
        tokens: {
          '--dsw-alias-border-l1': mixHex(c.surface, c.ink, 0.38),
          '--dsw-alias-border-l2': mixHex(c.surface, c.ink, 0.5),
          '--dsw-elevation-stroke-color': mixHex(c.surface, c.ink, 0.46),
        },
      }),
    },
    {
      id: 'stroke',
      name: '焦点描边',
      tags: ['light', 'neutral'],
      apply: (c) => ({
        tokens: {
          '--dsw-alias-border-l1': mixHex(c.surface, c.accent, 0.34),
          '--dsw-alias-border-l3': mixHex(c.surface, c.accent, 0.48),
          '--dsw-focus-ring-width': '3px',
        },
      }),
    },
    {
      id: 'shadow',
      name: '浮层投影',
      tags: ['light', 'neutral'],
      apply: (c) => ({
        // consumed as `box-shadow: var(--dsw-elevation-panel)` — which the host only uses on
        // floating surfaces (menus, floating buttons, previews), hence the name
        tokens: {
          '--dsw-elevation-panel': '0 14px 40px ' + toRgba(c.ink, 0.14),
          '--dsw-elevation-prominent': '0 22px 60px ' + toRgba(c.ink, 0.2),
          '--dsw-elevation-soft': '0 10px 28px ' + toRgba(c.ink, 0.12),
        },
      }),
    },
    {
      id: 'scroll',
      name: '描金滚动条',
      tags: ['light', 'neutral'],
      apply: (c) => ({
        tokens: {
          // the host rebinds --dsh-scrollbar-thumb per container to these alias tokens, so the
          // alias pair is the lever that reaches the thumb; the width token makes it visible
          '--dsw-alias-scrollbar-bg-l2': mixHex(c.accent, c.surface, 0.3),
          '--dsw-alias-scrollbar-hover-l2': c.accent,
          '--dsh-scrollbar-width': '8px',
        },
      }),
    },
  ];

  const FINISHES = CORE_FINISHES.concat(TEXTURE_FINISHES, TAIL_FINISHES);

  const FINISH_BY_ID = FINISHES.reduce((acc, f) => {
    acc[f.id] = f;
    return acc;
  }, {});

  /**
   * Compose the enabled finishes over one palette.
   *
   * `palette` may be null (官方原色): effects are additive with colour, so they must still
   * resolve — they simply lose the palette tint and use `NEUTRAL_LIGHT`.
   *
   * @returns `{ tokens, css, overlayCount, notes, order }`
   */
  function resolveFinishes(finishIds, palette) {
    const spec = (palette && palette.light) || NEUTRAL_LIGHT;
    const colors = {
      bg: spec.bg,
      surface: spec.surface,
      sunken: spec.sunken,
      ink: spec.text,
      accent: spec.brand,
      tintA: mixHex(spec.bg, spec.brand, 0.12),
      tintB: mixHex(spec.bg, spec.brand, 0.05),
    };

    const requested = (finishIds || []).filter((id) => Boolean(FINISH_BY_ID[id]));
    const ordered = FINISH_ORDER.filter((id) => requested.indexOf(id) >= 0);
    const notes = [];
    for (const rule of DEGRADE_RULES) {
      if (rule.when.every((id) => ordered.indexOf(id) >= 0)) notes.push(rule.note);
    }

    const opts = {
      softOverlays: ordered.indexOf('glass') >= 0,
      hasGradient: ordered.indexOf('gradient') >= 0,
    };

    const tokens = {};
    let css = '';
    const overlays = [];
    for (const id of ordered) {
      const out = FINISH_BY_ID[id].apply(colors, opts) || {};
      if (out.tokens) Object.assign(tokens, out.tokens);
      if (out.css) css += out.css;
      if (out.overlay) overlays.push({ id, body: out.overlay });
    }

    // HARD CAP: one full-viewport layer, no matter what state asked for.
    const chosen = overlays.slice(0, 1);
    if (overlays.length > 1) {
      notes.push(
        '只允许一个全屏纹理层：已采用「' + FINISH_BY_ID[chosen[0].id].name + '」',
      );
    }
    if (chosen.length) {
      css += 'body::after{content:"";' + OVERLAY_BASE + chosen[0].body + '}';
    }

    return { tokens, css, overlayCount: chosen.length, notes, order: ordered };
  }

  /** The documented kill switch: an empty composition that paints nothing at all. */
  function emptyComposition() {
    return { tokens: {}, css: '', overlayCount: 0, notes: [], order: [] };
  }

  /* stripped for bundle */

      /* ---- src/lib/schedule.js ---- */
  /**
   * Time policy: fixed clock anchors, four editable day segments (十二时辰), mutual exclusion,
   * and a manual choice that stays in front until the next boundary.
   *
   * Decisions behind this file:
   *   * Intervals are anchored to the CLOCK, not to "the last time something changed" — a
   *     drifting anchor makes the next switch unpredictable, which is the classic timer bug.
   *   * Rhythm and interval are mutually exclusive: two clocks fighting over one palette
   *     leaves nobody able to say which one wins.
   *   * Segment starts are user-editable; segments are ordered by start time and wrap.
   *   * A manual pick used to SWITCH AUTOMATION OFF, which made one click silently cancel a
   *     standing schedule. It now outranks the schedule only until the next boundary and then
   *     hands control back (`manualOverride`), so a schedule survives a look around.
   *   * Default segment names are the 时辰 each segment STARTS in (05:00 卯, 09:00 巳,
   *     17:00 酉, 21:00 亥) — accurate, not decorative; a user-edited clock keeps its name.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  const INTERVALS = [
    { id: 'off', name: '关', minutes: 0 },
    { id: '1h', name: '1 小时', minutes: 60 },
    { id: '1d', name: '1 天', minutes: 1440 },
    { id: '1w', name: '1 周', minutes: 10080 },
    { id: '1m', name: '1 月', minutes: 43200 },
  ];

  const DEFAULT_SEGMENTS = [
    { id: 'dawn', name: '卯时', start: '05:00', palette: 'ruyao-celadon' },
    { id: 'day', name: '巳时', start: '09:00', palette: 'cloud-dancer' },
    { id: 'dusk', name: '酉时', start: '17:00', palette: 'mocha-mousse' },
    { id: 'night', name: '亥时', start: '21:00', palette: 'moon-white' },
  ];

  const DAY_MINUTES = 1440;

  /** `"07:30"` → 450. Invalid input falls back to the default for that index. */
  function parseClock(text, fallback) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(text || '').trim());
    if (!m) return fallback;
    const h = Number(m[1]);
    const min = Number(m[2]);
    if (h > 23 || min > 59) return fallback;
    return h * 60 + min;
  }

  function formatClock(totalMinutes) {
    const t = ((totalMinutes % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
    const h = Math.floor(t / 60);
    const m = t % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }

  /** Normalize user input: valid starts only, stable identity, sorted by start. */
  function normalizeSegments(input) {
    const source = Array.isArray(input) && input.length ? input : DEFAULT_SEGMENTS;
    const byId = {};
    for (const fallback of DEFAULT_SEGMENTS) {
      const given = source.find((s) => s && s.id === fallback.id) || {};
      byId[fallback.id] = {
        id: fallback.id,
        name: fallback.name,
        start: formatClock(parseClock(given.start, parseClock(fallback.start, 0))),
        palette: typeof given.palette === 'string' ? given.palette : fallback.palette,
      };
    }
    return DEFAULT_SEGMENTS.map((s) => byId[s.id]).sort((a, b) => parseClock(a.start, 0) - parseClock(b.start, 0));
  }

  /** Which segment covers `date`. */
  function segmentAt(segments, date) {
    const list = normalizeSegments(segments);
    const now = date.getHours() * 60 + date.getMinutes();
    let current = list[list.length - 1];
    for (const segment of list) {
      if (parseClock(segment.start, 0) <= now) current = segment;
    }
    return current;
  }

  /** When the covering segment changes next (today or tomorrow). */
  function nextSegmentChange(segments, date) {
    const list = normalizeSegments(segments);
    const now = date.getHours() * 60 + date.getMinutes();
    const upcoming = list
      .map((s) => ({ s, at: parseClock(s.start, 0) }))
      .filter((entry) => entry.at > now)
      .sort((a, b) => a.at - b.at)[0];
    const minutes = upcoming ? upcoming.at : list[0] ? parseClock(list[0].start, 0) + DAY_MINUTES : DAY_MINUTES;
    const next = new Date(date.getTime());
    next.setHours(0, 0, 0, 0);
    next.setMinutes(minutes);
    return next;
  }

  /** Next fixed-clock boundary for an interval id (`1d` → next 06:00, `1w` → next Monday 06:00). */
  function nextIntervalBoundary(intervalId, date) {
    const next = new Date(date.getTime());
    if (intervalId === '1h') {
      next.setMinutes(0, 0, 0);
      next.setHours(next.getHours() + 1);
      return next;
    }
    if (intervalId === '1w') {
      next.setHours(6, 0, 0, 0);
      const day = next.getDay(); // 0 = Sunday
      const delta = (8 - day) % 7 || 7;
      next.setDate(next.getDate() + delta);
      return next;
    }
    if (intervalId === '1m') {
      next.setHours(6, 0, 0, 0);
      next.setDate(1);
      next.setMonth(next.getMonth() + 1);
      return next;
    }
    // 1d and anything unknown
    next.setHours(6, 0, 0, 0);
    if (next.getTime() <= date.getTime()) next.setDate(next.getDate() + 1);
    return next;
  }

  function intervalById(id) {
    return INTERVALS.find((entry) => entry.id === id) || INTERVALS[0];
  }

  /** Mutual exclusion lives here, so no caller has to remember it. */
  function activeMode(state) {
    if (state.rhythm && state.rhythm.enabled) return 'rhythm';
    if (state.interval && state.interval !== 'off') return 'interval';
    return 'off';
  }

  /**
   * When the current policy next changes its mind, as an epoch timestamp.
   * `0` means "never" — nothing is scheduled, so a choice made now simply stands.
   */
  function nextBoundaryMs(state, date) {
    const mode = activeMode(state);
    if (mode === 'rhythm') return nextSegmentChange(state.rhythm.segments, date).getTime();
    if (mode === 'interval') return nextIntervalBoundary(state.interval, date).getTime();
    return 0;
  }

  /**
   * The palette a manual pick is still entitled to hold, or `null` once the schedule takes over.
   *
   * `until === 0` (no automation running) means the pick has no expiry: with nothing scheduled
   * there is nothing to hand control back to, which is the plain "I chose this" case.
   */
  function manualOverride(state, date) {
    const manual = state && state.manual;
    if (!manual || !manual.paletteId) return null;
    if (!manual.until) return manual.paletteId;
    return date.getTime() < manual.until ? manual.paletteId : null;
  }

  /** The override record a manual pick should store: valid until the next boundary. */
  function manualRecord(paletteId, state, date) {
    return { paletteId: paletteId || null, until: nextBoundaryMs(state, date) };
  }

  /** A cleared override, for callers that must not let a stale one survive. */
  function noManual() {
    return { paletteId: null, until: 0 };
  }

  /** The palette this instant resolves to: manual pick, then rhythm, then interval rotation. */
  function resolvePaletteId(state, date, allIds) {
    const manual = manualOverride(state, date);
    if (manual) return manual;
    const mode = activeMode(state);
    if (mode === 'rhythm') {
      const segment = segmentAt(state.rhythm.segments, date);
      return segment.palette || null;
    }
    if (mode === 'interval') {
      // An empty rotation means "the whole library" (PRD FR-4).
      const ids = state.rotation && state.rotation.length ? state.rotation : allIds || [];
      if (!ids.length) return null;
      const step = Math.floor(date.getTime() / (intervalById(state.interval).minutes * 60000));
      return ids[((step % ids.length) + ids.length) % ids.length];
    }
    return null;
  }

  /**
   * Milliseconds until the policy next wants attention (for the single plugin timer).
   *
   * A pending manual expiry counts as a boundary: if the schedule was changed from elsewhere
   * while an override was held, the timer still wakes to hand control back on time.
   */
  function msUntilNextChange(state, date) {
    const mode = activeMode(state);
    let ms = 0;
    if (mode === 'rhythm') ms = nextSegmentChange(state.rhythm.segments, date).getTime() - date.getTime();
    else if (mode === 'interval') ms = nextIntervalBoundary(state.interval, date).getTime() - date.getTime();

    const manual = state && state.manual;
    if (manual && manual.paletteId && manual.until) {
      const remaining = manual.until - date.getTime();
      if (remaining > 0 && (ms === 0 || remaining < ms)) ms = remaining;
    }
    return ms > 0 ? Math.max(1000, ms) : 0;
  }

  /* stripped for bundle */

      /* ---- src/lib/status.js ---- */
  /**
   * Four-state agent status: pure data and classification, no React.
   *
   * The field names come from the shipped `SessionSnapshot` contract, which really does carry
   * `running` and `lastAgentError` — so "running" and "error" are read, not guessed. The
   * awaiting-approval signal is probed across the plausible field names and degrades to
   * "not shown" rather than to a wrong badge.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  const STATES = [
    {
      id: 'running',
      name: '运行中',
      indicator: '#2F7D6B',
      text: '#2F7D6B',
      animated: true,
      note: '转圈圈：旋转弧线，静态色块表达不了"进行中"',
    },
    {
      id: 'awaiting',
      name: '等待审批',
      indicator: '#B0781E',
      text: '#99681A',
      animated: false,
      note: '需要你介入，四态里最该被看见',
    },
    {
      id: 'error',
      name: '出错',
      indicator: '#B4432F',
      text: '#B4432F',
      animated: false,
      note: '失败或中断，收敛不刺眼',
    },
    {
      id: 'done',
      name: '已完成',
      indicator: '#6B7F8C',
      text: '#61747F',
      animated: false,
      note: '静息态，不抢注意力',
    },
  ];

  const STATE_BY_ID = STATES.reduce((acc, s) => {
    acc[s.id] = s;
    return acc;
  }, {});

  const PRIORITY = ['error', 'awaiting', 'running', 'done'];

  /** The awaiting-approval signal is not named consistently across builds; probe, don't guess. */
  function awaitingSignal(snapshot) {
    if (!snapshot) return false;
    if (snapshot.pendingInteraction) return true;
    if (snapshot.awaitingApproval) return true;
    if (snapshot.awaitingApprovals && snapshot.awaitingApprovals.length) return true;
    if (snapshot.pendingSubmissions && snapshot.pendingSubmissions.length) return true;
    return false;
  }

  /**
   * Classify one session snapshot. Returns null when the row has nothing to say
   * (blank session, no activity) — an absent badge beats a wrong one.
   */
  function classifySession(snapshot) {
    if (!snapshot) return null;
    if (snapshot.lastAgentError) return 'error';
    if (snapshot.running) return 'running';
    if (awaitingSignal(snapshot)) return 'awaiting';
    if (snapshot.blank) return null;
    if (snapshot.promptAttempted) return 'done';
    return null;
  }

  /** Worst state across sessions: error beats awaiting beats running beats done. */
  function combineStates(ids) {
    const set = ids.filter(Boolean);
    if (!set.length) return null;
    for (const id of PRIORITY) {
      if (set.indexOf(id) >= 0) return id;
    }
    return null;
  }

  /** Tint for text vs indicator: the indicator may sit at 3:1, text must clear 4.5:1. */
  function stateColors(id) {
    const state = STATE_BY_ID[id];
    return state ? { indicator: state.indicator, text: state.text, animated: state.animated } : null;
  }

  /* stripped for bundle */

      /* ---- src/styles/markdown-note.js ---- */
  /**
   * Conversation annotation ("换肤"): the CSS half of the highlighting feature.
   *
   * Why CSS and not a new markdown syntax: DSH renders assistant text with its own mdast
   * renderer (`case "html": return node.value`), so inline HTML shows up as literal text and
   * there is no `==highlight==` extension. The renderer's element output, however, is plain
   * `strong` / `em` / `code` / `blockquote` inside a container whose class carries the stable
   * fragment `_markdown_`. Styling those is supported, version-tolerant, and needs no DOM
   * rewriting — and because the colors come from tokens, the annotation tint follows whichever
   * color system is active.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  const MARKDOWN_CONTAINER = '[class*="_markdown_"]';

  /**
   * 字体渐变 (gradient text) for headings and emphasis — tier-gated by the caller.
   *
   * Two safety rules, both learned the hard way:
   *   * the whole block sits inside `@supports`: without `background-clip:text` a
   *     `color:transparent` heading would render as INVISIBLE text;
   *   * both gradient stops are already-validated colours (`--dsh-note-accent` clears 4.5:1 on
   *     the palette background by construction), so the lightest stop is still readable — the
   *     grader checks the LIGHTEST stop, not the average.
   */
  function gradientTextCss() {
    const c = MARKDOWN_CONTAINER;
    return (
      '@supports ((background-clip:text) or (-webkit-background-clip:text)){' +
      c + ' :where(h1,h2,h3,h4,h5,h6),' +
      c + ' :where(p,li,td,dd,blockquote) strong{' +
      'background-image:linear-gradient(96deg,' +
      'var(--dsw-alias-link,currentColor) 0%,' +
      'var(--dsh-note-accent,var(--dsw-alias-link,currentColor)) 100%);' +
      '-webkit-background-clip:text;background-clip:text;' +
      '-webkit-text-fill-color:transparent;color:transparent;' +
      '}' +
      c + ' :where(h1,h2,h3,h4,h5,h6) strong{' +
      'background-image:none;-webkit-text-fill-color:currentColor;color:inherit;}' +
      '}'
    );
  }

  function markdownNoteCss(options) {
    const c = MARKDOWN_CONTAINER;
    const withGradient = Boolean(options && options.gradientText);
    return [
      // Emphasis is COLOUR ONLY — no background block. The colour is the palette's paired
      // counter-colour (`--dsh-note-accent`), falling back to the link colour.
      c + ' :where(p,li,td,dd,blockquote) strong{',
      'color:var(--dsh-note-accent,var(--dsw-alias-link,inherit));',
      'font-weight:600;',
      'background:none;',
      '}',

      c + ' :where(h1,h2,h3,h4,h5,h6) strong{background:none;color:inherit;}',

      // italic reads as a dashed underline instead of a slant — a quieter emphasis level
      c + ' :where(p,li,td,dd) em{',
      'font-style:normal;',
      'color:var(--dsh-note-accent,var(--dsw-alias-link,inherit));',
      'border-bottom:1px dashed var(--dsw-alias-border-l2,var(--dsw-alias-border-l1));',
      '}',

      // quotes carry the accent as a left rule, so conclusions stand out without color blocks
      c + ' blockquote{border-left:3px solid var(--dsw-alias-link,var(--dsw-alias-border-l2));}',

      // inline code gets the palette-tinted chip background
      c + ' :where(p,li,td,dd) code{background:var(--dsw-alias-markdown-code-block,transparent);}',

      // tables keep hairlines that follow the accent tier
      c + ' table{border-color:var(--dsw-alias-border-l2);}',
    ].join('') + (withGradient ? gradientTextCss() : '');
  }

  /* stripped for bundle */

      /* ---- src/client/state.js ---- */
  /**
   * Plugin state: one store, one persistence key, one subscription.
   *
   * The store is deliberately dumb — it holds data and notifies. Everything that turns state
   * into theme layers lives in `index.js`, so the panel and the resident components can never
   * disagree about what is active.
   *
   * Rename note (3.2.0 → 0.9.9): the plugin became `dsh-colors`, so the key moved to
   * `dsh-colors.state.v1`. The previous keys are still READ once, so renaming cannot look like
   * "my settings disappeared"; the old key is left in place as a fallback.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  /* stripped for bundle */

  const STORAGE_KEY = 'dsh-colors.state.v1';

  /** Keys this plugin used before the rename, newest first. Read-only fallbacks. */
  const LEGACY_KEYS = [
    'dsh-theme-celadon.state.v3',
    'dsh-theme-celadon.state.v2',
    'dsh-theme-celadon.state.v1',
  ];

  /**
   * Hard cap on a picked avatar FILE (before it becomes a data URL).
   *
   * The editor downsamples to 256×256 (~20–40KB), so this is only the entry gate: it stops a
   * 12MP photo from being decoded into a 48MB bitmap before the user ever sees the crop UI.
   */
  const AVATAR_LIMIT = 1024 * 1024;

  /** Above this many data-URL characters the panel warns about the storage budget. */
  const AVATAR_WARN = 700 * 1024;

  /** Avatar edge actually stored (the editor always writes exactly this). */
  const AVATAR_EDGE = 256;

  /** How many per-session colour marks are kept; the oldest are dropped beyond this. */
  const SESSION_COLOR_LIMIT = 200;

  const DEFAULT_STATE = {
    /** `null` paletteId means the "official colors" position: no layer at all. */
    paletteId: 'ruyao-celadon',
    /**
     * Effects are single-select, and the default is NONE. The old build shipped
     * `['gradient']` and honoured whatever a stale multi-select state contained — which is how
     * four full-viewport layers ended up stacked.
     */
    finishes: [],
    /** Kill switch: when true the plugin paints nothing at all (not even the palette). */
    safeMode: false,
    tier: 'standard',
    interval: 'off',
    /** Empty means "rotate over the whole library"; PRD FR-4. */
    rotation: [],
    rhythm: {
      enabled: false,
      segments: null, // normalized on first read
    },
    /**
     * Manual override (PRD FR-5). `until === 0` means "no schedule is running, so the pick
     * stands"; a timestamp means "the pick outranks the schedule until that instant".
     */
    manual: {
      paletteId: null,
      until: 0,
    },
    /** 随机 locks: a locked axis is left alone by the dice. */
    locks: {
      palette: false,
      finish: false,
    },
    workspace: {
      enabled: true,
      /** workspaceId → palette id, or the literal 'global' to follow the global palette. */
      map: {},
      accentOnly: true,
    },
    /** sessionId → `#RRGGBB`; a manual mark, always picked from the active palette's family. */
    sessionColors: {},
    status: {
      /** Whether the composer-dock status chip is rendered at all (PRD FR-7: default off). */
      enabled: true,
      /** The chip is opt-in; the seat still mounts because it carries the workspace signal. */
      chip: false,
      annotations: true,
      /**
       * Harmonise the host's three semantic state colours (success / warn / error) toward the
       * active palette. The running indicator is deliberately NOT touched: its colour comes from
       * `--dsw-alias-label-tertiary`, so recolouring it would tint all tertiary text.
       */
      semantic: true,
    },
    /**
     * Account row (PRD FR-9): an optional custom nickname + avatar rendered in the sidebar's
     * account launcher seat. Off by default: while off we do not register the occupant at all,
     * so the shipped account menu (with sign-out) stays exactly as it was.
     */
    brand: {
      enabled: false,
      nickname: '',
      /** Data URL, size-capped; empty means "use the initial block". */
      avatar: '',
    },
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalize(raw) {
    const state = Object.assign(clone(DEFAULT_STATE), raw || {});
    state.rhythm = Object.assign(clone(DEFAULT_STATE.rhythm), (raw && raw.rhythm) || {});
    state.rhythm.segments = normalizeSegments(state.rhythm.segments);

    const manual = (raw && raw.manual) || {};
    state.manual = {
      paletteId: typeof manual.paletteId === 'string' && manual.paletteId ? manual.paletteId : null,
      until: typeof manual.until === 'number' && isFinite(manual.until) && manual.until > 0 ? manual.until : 0,
    };

    const locks = (raw && raw.locks) || {};
    state.locks = { palette: Boolean(locks.palette), finish: Boolean(locks.finish) };

    state.workspace = Object.assign(clone(DEFAULT_STATE.workspace), (raw && raw.workspace) || {});
    state.workspace.map = Object.assign({}, (raw && raw.workspace && raw.workspace.map) || {});

    const marks = (raw && raw.sessionColors) || {};
    const clean = {};
    let kept = 0;
    for (const key of Object.keys(marks)) {
      const value = marks[key];
      if (typeof key !== 'string' || !key) continue;
      if (typeof value !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(value)) continue;
      if (kept >= SESSION_COLOR_LIMIT) break;
      clean[key] = value.toUpperCase();
      kept += 1;
    }
    state.sessionColors = clean;

    state.status = Object.assign(clone(DEFAULT_STATE.status), (raw && raw.status) || {});
    state.brand = Object.assign(clone(DEFAULT_STATE.brand), (raw && raw.brand) || {});
    if (typeof state.brand.nickname !== 'string') state.brand.nickname = '';
    if (typeof state.brand.avatar !== 'string' || state.brand.avatar.length > AVATAR_LIMIT) state.brand.avatar = '';
    state.brand.enabled = Boolean(state.brand.enabled);
    state.safeMode = Boolean(raw && raw.safeMode);

    // Effects: known ids only, and HARD-CAPPED AT ONE. A persisted list from the old
    // multi-select UI must not be able to stack overlays again.
    const requested = Array.isArray(state.finishes) ? state.finishes : clone(DEFAULT_STATE.finishes);
    state.finishes = requested.filter((id) => Boolean(FINISH_BY_ID[id])).slice(0, 1);

    if (!Array.isArray(state.rotation) || !state.rotation.length) state.rotation = clone(DEFAULT_STATE.rotation);
    state.rotation = state.rotation.filter((id) => typeof id === 'string');
    if (!state.rotation.length) state.rotation = clone(DEFAULT_STATE.rotation);
    return state;
  }

  /** One random member of `list` that is not `exclude` (when the list has an alternative). */
  function pickOther(list, exclude) {
    const ids = (list || []).filter((id) => typeof id === 'string' && id);
    if (!ids.length) return null;
    const pool = ids.filter((id) => id !== exclude);
    const source = pool.length ? pool : ids;
    return source[Math.floor(Math.random() * source.length)];
  }

  /**
   * Create the store. `storage` is injectable so tests can run it without a browser.
   * `onError` receives persistence failures — a full quota is a real, visible problem
   * (settings would silently stop being saved), so it is reported rather than swallowed.
   */
  function createStore(storage, onError) {
    const backing = storage || (typeof window !== 'undefined' ? window.localStorage : null);
    let state = DEFAULT_STATE;
    let migratedFrom = null;
    const listeners = new Set();

    function readKey(key) {
      try {
        const text = backing ? backing.getItem(key) : null;
        return text ? JSON.parse(text) : null;
      } catch (err) {
        return null;
      }
    }

    try {
      let raw = readKey(STORAGE_KEY);
      if (!raw) {
        for (const legacy of LEGACY_KEYS) {
          const old = readKey(legacy);
          if (old) {
            raw = old;
            migratedFrom = legacy;
            break;
          }
        }
      }
      state = normalize(raw);
    } catch (err) {
      state = normalize(null);
    }

    function snapshot() {
      return state;
    }

    function persist() {
      try {
        if (backing) backing.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (err) {
        // private mode or quota: the session keeps the state, but the user is told.
        try {
          if (onError) onError(err);
        } catch (inner) {
          /* an error reporter must never break the store */
        }
      }
    }

    function notify() {
      for (const fn of Array.from(listeners)) {
        try {
          fn(state);
        } catch (err) {
          /* one bad listener must not stop the others */
        }
      }
    }

    /** Shallow merge of a patch; `null` clears a palette back to the official position. */
    function patch(next) {
      state = normalize(Object.assign({}, state, next));
      persist();
      notify();
    }

    function subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }

    function toggleFinish(id) {
      const list = state.finishes.slice();
      const at = list.indexOf(id);
      if (at >= 0) list.splice(at, 1);
      else list.push(id);
      patch({ finishes: list });
    }

    function setSegment(id, changes) {
      const segments = state.rhythm.segments.map((segment) =>
        segment.id === id ? Object.assign({}, segment, changes) : segment,
      );
      patch({ rhythm: Object.assign({}, state.rhythm, { segments }) });
    }

    function setWorkspacePalette(workspaceId, paletteId) {
      const map = Object.assign({}, state.workspace.map);
      if (paletteId === 'global') delete map[workspaceId];
      else map[workspaceId] = paletteId;
      patch({ workspace: Object.assign({}, state.workspace, { map }) });
    }

    /**
     * Global palette choice (PRD FR-5).
     *
     * Three things have to happen or the click looks broken:
     *   1. clear the CURRENT workspace's binding — otherwise that layer keeps overriding the accent;
     *   2. record a MANUAL OVERRIDE that outranks the schedule — a running interval/rhythm resolves
     *      its own palette and would otherwise make the click look like it did nothing;
     *   3. but only UNTIL THE NEXT BOUNDARY. The old build switched automation off outright, so a
     *      single exploratory click silently cancelled a standing schedule; now the schedule
     *      resumes on its own clock and the 自动切换 controls stay untouched.
     *
     * With no schedule running the override has no expiry (`until: 0`), which is the plain
     * "I chose this and it stays chosen" case.
     */
    function selectPalette(paletteId, currentWorkspaceId, now) {
      const map = Object.assign({}, state.workspace.map);
      if (currentWorkspaceId) delete map[currentWorkspaceId];
      patch({
        paletteId,
        manual: paletteId ? manualRecord(paletteId, state, now || new Date()) : noManual(),
        workspace: Object.assign({}, state.workspace, { map }),
      });
    }

    /**
     * Change the automation policy. Switching or stopping automation cancels any pending manual
     * override by design: the user just asked for the schedule to decide.
     */
    function setAutomation(changes) {
      patch(Object.assign({ manual: noManual() }, changes));
    }

    /** Flip one 随机 lock. */
    function toggleLock(axis) {
      const locks = Object.assign({}, state.locks);
      locks[axis] = !locks[axis];
      patch({ locks });
    }

    /**
     * 随机: one dice roll over «palette × effect», honouring the two locks.
     * A rolled palette is written as a MANUAL pick, so it behaves exactly like a click —
     * it leads until the next boundary and then hands control back to a running schedule.
     */
    function randomize(paletteIds, finishIds, currentWorkspaceId, now) {
      const next = {};
      if (!state.locks.palette) {
        const id = pickOther(paletteIds, state.paletteId);
        if (id) {
          next.paletteId = id;
          next.manual = manualRecord(id, state, now || new Date());
          const map = Object.assign({}, state.workspace.map);
          if (currentWorkspaceId) delete map[currentWorkspaceId];
          next.workspace = Object.assign({}, state.workspace, { map });
        }
      }
      if (!state.locks.finish) {
        const id = pickOther(finishIds, (state.finishes || [])[0]);
        if (id) next.finishes = [id];
      }
      patch(next);
    }

    /** 十二时辰 random: four DISTINCT palettes, one per segment. */
    function randomizeRhythm(paletteIds) {
      const ids = (paletteIds || []).filter((id) => typeof id === 'string' && id);
      if (ids.length < 2) return;
      const pool = ids.slice();
      const segments = state.rhythm.segments.map((segment) => {
        const at = Math.floor(Math.random() * pool.length);
        const pick = pool.splice(at, 1)[0] || ids[0];
        return Object.assign({}, segment, { palette: pick });
      });
      patch({ rhythm: Object.assign({}, state.rhythm, { segments }), manual: noManual() });
    }

    function setSessionColor(sessionId, color) {
      if (typeof sessionId !== 'string' || !sessionId) return;
      const marks = Object.assign({}, state.sessionColors);
      if (!color) delete marks[sessionId];
      else marks[sessionId] = String(color).toUpperCase();
      patch({ sessionColors: marks });
    }

    return {
      STORAGE_KEY,
      LEGACY_KEYS,
      AVATAR_LIMIT,
      AVATAR_WARN,
      AVATAR_EDGE,
      migratedFrom: () => migratedFrom,
      snapshot,
      subscribe,
      patch,
      toggleFinish,
      toggleLock,
      setSegment,
      setWorkspacePalette,
      selectPalette,
      setAutomation,
      randomize,
      randomizeRhythm,
      setSessionColor,
      reset: () => patch(clone(DEFAULT_STATE)),
    };
  }

  /* stripped for bundle */

      /* ---- src/client/session-colors.js ---- */
  /**
   * Session colour marks (PRD FR-10).
   *
   * A mark is a per-CONVERSATION manual colour, so a long session list can be navigated by
   * recognition instead of by reading titles. Three design rules, all deliberate:
   *
   *   * the palette comes from the ACTIVE THEME (`markColors`), never from a private colour
   *     set — a mark has to look like part of the theme, not pasted on top of it;
   *   * nothing is automatic: unmarked rows stay perfectly plain, so the sidebar cannot turn
   *     into a colour wall (that is why the plugin does NOT colour rows by unread/running);
   *   * assignment goes through OFFICIAL seats only — the session menu and our own panel. The
   *     row decoration uses the official `sidebar.session.row.leading` seat plus a declarative
   *     stylesheet rule keyed on the host's `data-session-id`; there is no DOM mutation, so the
   *     worst case is a mark that does not show, never a broken tree.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  /**
   * Defensive session-id read: the row seat, the menu seat and our own panel hand different
   * props, and guessing an id from a wrong field would paint the wrong row.
   */
  function sessionIdOf(props) {
    if (!props || typeof props !== 'object') return null;
    for (const name of ['sessionId', 'id', 'key']) {
      if (typeof props[name] === 'string' && props[name]) return props[name];
    }
    for (const name of ['session', 'item', 'entry', 'row', 'value']) {
      const candidate = props[name];
      if (!candidate || typeof candidate !== 'object') continue;
      if (typeof candidate.id === 'string' && candidate.id) return candidate.id;
      if (typeof candidate.sessionId === 'string' && candidate.sessionId) return candidate.sessionId;
    }
    return null;
  }

  /** The six mark colours for the palette currently chosen (neutral family when none is). */
  function markOptions(paletteById, state) {
    const palette = state && state.paletteId ? paletteById(state.paletteId) : null;
    return markColors(palette);
  }

  /** Flatten a `useSessions` snapshot into `[{ id, label }]`, defensively. */
  function readSessions(props, limit) {
    const max = limit || 40;
    try {
      if (!props || typeof props.useSessions !== 'function') return [];
      const snapshot = props.useSessions((value) => value);
      const byId = snapshot && snapshot.byId ? snapshot.byId : snapshot;
      if (!byId || typeof byId !== 'object') return [];
      return Object.keys(byId)
        .slice(0, max)
        .map((id) => {
          const entry = byId[id] || {};
          const label = entry.title || entry.name || entry.label || id;
          return { id, label: String(label).slice(0, 28) };
        });
    } catch (err) {
      return [];
    }
  }

  /** One swatch button; shared by the menu seat and the panel. */
  function swatchButton(h, color, active, onClick, key) {
    return h('button', {
      key,
      type: 'button',
      'data-dsh-swatch': 'true',
      'data-active': active ? 'true' : 'false',
      title: color,
      'aria-label': color,
      onClick,
      style: {
        width: 18,
        height: 18,
        borderRadius: 4,
        background: color,
        border: '1px solid var(--dsw-alias-border-l2)',
        cursor: 'pointer',
        padding: 0,
      },
    });
  }

  /** Session row decoration: a 3px bar, only for marked sessions. */
  function createSessionMark(deps) {
    const h = deps.h;
    const store = deps.store;
    return function SessionMark(props) {
      const [state, setState] = React.useState(store.snapshot());
      React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
      const id = sessionIdOf(props);
      const color = id && state.sessionColors ? state.sessionColors[id] : null;
      if (!color) return null;
      return h('span', {
        'data-dsh-session-mark': 'true',
        'aria-hidden': true,
        style: {
          display: 'inline-block',
          width: 3,
          height: 14,
          borderRadius: 2,
          background: color,
          verticalAlign: 'middle',
        },
      });
    };
  }

  /** Session "..." menu entry: pick a colour, or clear it. */
  function createSessionMenu(deps) {
    const h = deps.h;
    const store = deps.store;
    const paletteById = deps.paletteById;
    return function SessionMenu(props) {
      const [state, setState] = React.useState(store.snapshot());
      React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
      const id = sessionIdOf(props);
      if (!id) return null;
      const current = state.sessionColors ? state.sessionColors[id] : null;
      const options = markOptions(paletteById, state);
      return h(
        'div',
        {
          'data-dsh-session-menu': 'true',
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 8px',
            fontSize: 12,
            color: 'var(--dsw-alias-label-primary)',
          },
        },
        h('span', { style: { color: 'var(--dsw-alias-label-tertiary)' } }, '颜色标记'),
        options.map((color, index) =>
          swatchButton(h, color, current === color, () => store.setSessionColor(id, color), 'm' + index),
        ),
        h(
          'button',
          {
            type: 'button',
            'data-dsh-chip': 'true',
            'data-active': 'false',
            'aria-disabled': current ? 'false' : 'true',
            onClick: () => store.setSessionColor(id, null),
            style: { font: 'inherit', fontSize: 12, padding: '0 8px', borderRadius: 6, cursor: 'pointer' },
          },
          '清除',
        ),
      );
    };
  }

  /* stripped for bundle */

      /* ---- src/client/avatar-editor.js ---- */
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

  /* stripped for bundle */

      /* ---- src/client/dock-signal.js ---- */
  /**
   * Session-aware signal + status chip, mounted under the composer.
   *
   * Why this slot: `conversation.composer.dock` is the one stable seat that receives
   * `sessionId` directly AND gets `useSession` (the per-session runtime snapshot carrying
   * `running` / `lastAgentError`) plus `useSessions` / `useWorkspaces`. That makes it both the
   * precise "which conversation am I looking at" signal that workspace-bound accents need, and
   * the honest place to show the four-state indicator as a rotating arc.
   *
   * Note: `sidebar.session.row.leading` was the wrong seat for this — its catalog states it
   * mounts only for rows whose primary state is idle, so a live indicator there would vanish
   * exactly when it matters.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  /* stripped for bundle */

  const identityHook = (selector) => selector(null);

  function sessionView(sessionsSnapshot, sessionId) {
    if (!sessionsSnapshot || !sessionId) return null;
    if (sessionsSnapshot.byId && sessionsSnapshot.byId[sessionId]) return sessionsSnapshot.byId[sessionId];
    if (sessionsSnapshot[sessionId]) return sessionsSnapshot[sessionId];
    return null;
  }

  /**
   * Workspace for a session. The sessions store exposes the session's own view; the field may
   * be `workspaceId` or only `cwd` — probe both, and never invent one.
   */
  function workspaceOf(view) {
    if (!view) return null;
    if (typeof view.workspaceId === 'string') return view.workspaceId;
    if (view.workspace && typeof view.workspace.id === 'string') return view.workspace.id;
    if (typeof view.cwd === 'string') return 'cwd:' + view.cwd;
    return null;
  }

  /** Optional label for a detected workspace, for the settings mapping table. */
  function workspaceLabel(workspacesSnapshot, workspaceId) {
    if (!workspacesSnapshot || !workspaceId) return null;
    const items = workspacesSnapshot.items || [];
    const hit = items.find((item) => item && item.id === workspaceId);
    if (hit) return hit.title || hit.name || workspaceId;
    if (workspaceId.indexOf('cwd:') === 0) {
      const parts = workspaceId.slice(4).split(/[\\/]/).filter(Boolean);
      return parts.length ? parts[parts.length - 1] : workspaceId;
    }
    return workspaceId;
  }

  function createDockSignal(deps) {
    const store = deps.store;
    const report = deps.report;
    const h = deps.h;

    function Arc(props) {
      const size = props.size || 14;
      const stroke = 2;
      const r = (size - stroke) / 2;
      const c = size / 2;
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 ' + size + ' ' + size,
          'aria-hidden': true,
          style: props.animated
            ? { animation: 'dsh-theme-spin 1s linear infinite', display: 'block' }
            : { display: 'block' },
        },
        h('circle', { cx: c, cy: c, r, fill: 'none', stroke: props.track, strokeWidth: stroke }),
        h('circle', {
          cx: c,
          cy: c,
          r,
          fill: 'none',
          stroke: props.color,
          strokeWidth: stroke,
          strokeLinecap: 'round',
          strokeDasharray: String(2 * Math.PI * r),
          strokeDashoffset: String(2 * Math.PI * r * 0.35),
        }),
      );
    }

    function Dot(props) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: props.color,
        },
      });
    }

    return function DockSignal(props) {
      // Always call through a stable function so the hook order cannot depend on props.
      const useSession = props && props.useSession ? props.useSession : identityHook;
      const useSessions = props && props.useSessions ? props.useSessions : identityHook;
      const useWorkspaces = props && props.useWorkspaces ? props.useWorkspaces : identityHook;

      const sessionSnap = useSession((s) => s);
      const sessionsSnap = useSessions((s) => s);
      const workspacesSnap = useWorkspaces((s) => s);

      const sessionId = props && props.sessionId ? props.sessionId : null;
      const state = classifySession(sessionSnap);
      const view = sessionView(sessionsSnap, sessionId);
      const workspaceId = workspaceOf(view);
      const label = workspaceLabel(workspacesSnap, workspaceId);
      const current = store.snapshot();

      const announce = React.useEffect;
      announce(() => {
        report({ sessionId, workspaceId, label, state });
      }, [sessionId, workspaceId, label, state]);

      const colors = stateColors(state);
      // PRD FR-7: the chip is opt-in. The seat still mounts because it carries the workspace
      // signal that drives the workspace palette layer.
      if (!current.status.chip) return null;
      const showState = Boolean(current.status.enabled && colors);
      const workspacePalette = workspaceId ? current.workspace.map[workspaceId] : null;
      const showWorkspace =
        Boolean(current.workspace.enabled && workspaceId && workspacePalette && current.status.enabled);

      if (!showState && !showWorkspace) return null;

      const chip = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        lineHeight: '18px',
        padding: '1px 8px',
        borderRadius: 999,
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-label-secondary)',
      };

      return h(
        'div',
        { style: { display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '2px 0' } },
        showWorkspace
          ? h(
              'span',
              { style: chip, title: '工作区配色绑定' },
              h(Dot, { color: workspacePalette ? paletteAccent(workspacePalette, deps.paletteById) : colors.text }),
              (label || '工作区') + ' · 已绑定配色',
            )
          : null,
        showState
          ? h(
              'span',
              { style: chip, title: colorsStateTitle(state) },
              colors.animated
                ? h(Arc, { color: colors.indicator, animated: true, track: 'var(--dsw-alias-border-l1)' })
                : h(Dot, { color: colors.indicator }),
              h('span', { style: { color: 'var(--dsw-alias-label-primary)' } }, stateName(state)),
            )
          : null,
      );
    };
  }

  function paletteAccent(paletteId, paletteById) {
    const palette = paletteById ? paletteById(paletteId) : null;
    return palette ? palette.light.brand : 'var(--dsw-alias-brand-primary)';
  }

  function stateName(state) {
    const names = { running: '运行中', awaiting: '等待审批', error: '出错', done: '已完成' };
    return names[state] || state;
  }

  function colorsStateTitle(state) {
    return 'Agent 状态：' + stateName(state);
  }

  /* stripped for bundle */

      /* ---- src/client/workspace-bar.js ---- */
  /**
   * Frame-wide workspace colour bar.
   *
   * The user's ask was a visible bar in the MAIN interface marking which workspace is active —
   * not a colour per conversation, which would be noise. The sidebar has no per-workspace row
   * slot (and no stable data attribute to style against), so the bar lives in `shell.overlay`:
   * a frame-wide floating layer above every column, rendered as a hairline strip along the top
   * edge plus a small label. It follows the same signal as the workspace accent layer, so both
   * always agree.
   *
   * Non-interactive by construction (`pointer-events: none`), so it can never eat a click.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  function createWorkspaceBar(deps) {
    const h = deps.h;
    const store = deps.store;
    const runtime = deps.runtime;
    const paletteById = deps.paletteById;

    return function WorkspaceBar() {
      const state = React.useState(0)[0]; // re-render driver only; values come from runtime
      void state;
      const current = runtime.current;
      const config = store.snapshot();
      if (!config.workspace.enabled || !current || !current.workspaceId) return null;

      const boundId = config.workspace.map[current.workspaceId];
      const bound = boundId ? paletteById(boundId) : null;
      const color = bound ? bound.light.brand : 'var(--dsw-alias-border-l2)';
      const label = current.label || current.workspaceId;

      return h(
        'div',
        {
          'aria-hidden': true,
          style: {
            position: 'relative',
            width: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        },
        h('div', { style: { height: 3, width: '100%', background: color, opacity: bound ? 1 : 0.35 } }),
        h(
          'div',
          {
            style: {
              marginLeft: 10,
              marginTop: 4,
              fontSize: 10,
              lineHeight: '14px',
              padding: '0 8px',
              borderRadius: '0 0 6px 6px',
              color: 'var(--dsw-alias-label-secondary)',
              background: 'var(--dsw-alias-bg-layer-2)',
              border: '1px solid var(--dsw-alias-border-l1)',
              borderTop: 'none',
            },
          },
          label + (bound ? ' · ' + bound.name : ' · 跟随全局'),
        ),
      );
    };
  }

  /* stripped for bundle */

      /* ---- src/client/account-row.js ---- */
  /**
   * Account row (PRD FR-9): a custom nickname + avatar rendered in the sidebar's account
   * launcher seat (`settings.launcher`).
   *
   * Verified facts behind this file:
   *   * the seat is a `single` slot that takes no id/order — the shipped account menu registers as
   *     `{ name: 'settings.launcher', locale, inject }`;
   *   * the owner hands the occupant `{ wide, settingsOpen, openSettings, openOnboarding }`, so a
   *     replacement row keeps the "open Settings" behaviour without guessing a panel id;
   *   * replacing it SHADOWS the shipped account menu (which is where the quick sign-out lives),
   *     which is why this occupant is registered only while the user has it enabled — disabled
   *     means "not registered at all", so the shipped row returns untouched.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  function createAccountRow(deps) {
    const h = deps.h;
    const store = deps.store;
    const paletteById = deps.paletteById;

    return function AccountRow(props) {
      const [state, setState] = React.useState(store.snapshot());
      React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);

      const brand = state.brand || {};
      const wide = Boolean(props && props.wide);
      const open = props && typeof props.openSettings === 'function' ? props.openSettings : null;
      const label = brand.nickname && brand.nickname.length ? brand.nickname : '账号';

      // initial block tinted by the active palette, used when no avatar is stored
      const palette = state.paletteId ? paletteById(state.paletteId) : null;
      const tint = palette ? palette.light.brand : 'var(--dsw-alias-brand-primary)';

      const avatar = brand.avatar
        ? h('img', {
            src: brand.avatar,
            alt: '',
            style: { width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', display: 'block' },
          })
        : h(
            'span',
            {
              style: {
                width: 22,
                height: 22,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: tint,
                color: 'var(--dsw-alias-bg-layer-1)',
                fontSize: 11,
                fontWeight: 600,
              },
            },
            label.slice(0, 1).toUpperCase(),
          );

      return h(
        'button',
        {
          type: 'button',
          'data-dsh-account': 'true',
          title: label,
          onClick: open ? () => open() : undefined,
          style: {
            appearance: 'none',
            border: '1px solid transparent',
            background: 'transparent',
            color: 'var(--dsw-alias-label-primary)',
            font: 'inherit',
            fontSize: 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '2px 8px',
            borderRadius: 999,
            cursor: open ? 'pointer' : 'default',
            maxWidth: '100%',
            overflow: 'hidden',
          },
        },
        avatar,
        wide
          ? h(
              'span',
              { style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } },
              label,
            )
          : null,
      );
    };
  }

  /* stripped for bundle */

      /* ---- src/client/panel.js ---- */
  /**
   * The control panel: one component, rendered in the settings page AND in the workbench.
   *
   * Copy rules (PRD §5): product interface language, labels ≤6 characters, hints ≤40 characters,
   * no first person, no conversational explanation.
   * Control rules (PRD §5):
   *   * inactive chips carry no border and no outline — they are styled from the plugin
   *     stylesheet via `data-dsh-chip`, which is what removes the click-residue outline;
   *   * an ACTION (`data-dsh-action`) never looks like a switch: a switch that never lights up
   *     reads as "that click did nothing", which is exactly what the action-shaped chips did;
   *   * destructive actions ask twice, without timers (the confirm state is component state).
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  function createPanel(deps) {
    const h = deps.h;
    const store = deps.store;
    const runtime = deps.runtime;
    const fault = deps.fault;
    const palettes = deps.palettes;
    const paletteById = deps.paletteById;
    const finishes = deps.finishes;
    const tiers = deps.tiers;
    const intervals = deps.intervals;
    const audit = deps.audit;
    const avatarLimit = deps.avatarLimit || 1024 * 1024;
    const avatarWarn = deps.avatarWarn || 700 * 1024;

    /**
     * One single-select list over ALL surface effects (PRD FR-2). Textures and materials are
     * both "surface effects": they compose with any palette and never replace one, so splitting
     * them into two mutually exclusive groups only taught the user that picking one cancelled
     * the other.
     */
    const surfaceFinishes = finishes;
    const AvatarEditor = createAvatarEditor({
      h,
      store,
      edge: deps.avatarEdge || 256,
      limit: avatarLimit,
    });
    const avatarLimitLabel = Math.max(1, Math.round(avatarLimit / 1048576)) + 'MB';
    const comboCount = palettes.length * finishes.length;

    const CHIP = { appearance: 'none', font: 'inherit', fontSize: 12, lineHeight: '20px', padding: '2px 10px', borderRadius: 999 };
    const ACTION = { appearance: 'none', font: 'inherit', fontSize: 12, lineHeight: '20px', padding: '2px 10px', borderRadius: 6 };
    const TITLE = { fontSize: 13, color: 'var(--dsw-alias-label-primary)', fontWeight: 600 };
    const HINT = { fontSize: 11, color: 'var(--dsw-alias-label-tertiary)' };
    const FIELD = {
      font: 'inherit',
      fontSize: 12,
      color: 'var(--dsw-alias-label-primary)',
      background: 'var(--dsw-alias-bg-layer-1)',
      border: '1px solid var(--dsw-alias-border-l1)',
      borderRadius: 6,
      padding: '1px 6px',
    };
    const ERR = { fontSize: 11, color: 'var(--dsw-alias-state-error-primary)', padding: '2px 0' };
    const ROW = { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' };

    /** One selectable chip. Active state is expressed by CSS, not by inline borders. */
    const chip = (label, active, onClick, key) =>
      h(
        'button',
        {
          key,
          type: 'button',
          'data-dsh-chip': 'true',
          'data-active': active ? 'true' : 'false',
          'aria-pressed': Boolean(active),
          onClick,
          style: CHIP,
        },
        label,
      );

    /** One action button. Different shape on purpose: actions are not switches. */
    const action = (label, onClick, key, tone, disabled) =>
      h(
        'button',
        {
          key,
          type: 'button',
          'data-dsh-action': 'true',
          'data-tone': tone || 'normal',
          'aria-disabled': disabled ? 'true' : 'false',
          onClick: disabled ? undefined : onClick,
          style: ACTION,
        },
        label,
      );

    const group = (title, hint, children) =>
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 6, padding: '6px 0' } },
        h('div', { style: TITLE }, title),
        hint ? h('div', { style: HINT }, hint) : null,
        h(ROW, null, children),
      );

    function Panel(props) {
      const [state, setState] = React.useState(store.snapshot());
      const [confirmReset, setConfirmReset] = React.useState(false);
      const [avatarOpen, setAvatarOpen] = React.useState(false);
      const [nickDraft, setNickDraft] = React.useState(null);
      React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);

      const refresh = () => setState(Object.assign({}, store.snapshot()));

      // The readout must describe the palette that is ACTUALLY applied, not the stored choice:
      // with automation on they differ, and a lying readout is how "clicking does nothing" looks.
      const effectiveId = runtime.diag.lastPaletteId || state.paletteId;
      const activePalette = effectiveId ? paletteById(effectiveId) : null;
      const report = activePalette ? audit(activePalette) : null;
      const detected = Array.from(runtime.workspaces.values());
      const currentWorkspaceId = runtime.currentWorkspaceId ? runtime.currentWorkspaceId() : null;
      const manual = state.manual || {};
      const manualName =
        manual.paletteId && paletteById(manual.paletteId) ? paletteById(manual.paletteId).name : null;
      const marks = state.sessionColors || {};
      const sessions = readSessions(props, 24);
      const markPalette = state.paletteId ? paletteById(state.paletteId) : null;
      const markOptionsList = markColors(markPalette);

      // Expected vs actually applied. "Expected" is the exact value this plugin last WROTE for
      // the token (`runtime.diag.expectAccent`), never a value derived some other way: the old
      // readout compared the palette's accent-on-backdrop against the painted accent-on-surface
      // and showed a permanent, meaningless ✗.
      let readback = '—';
      try {
        if (typeof window !== 'undefined' && window.getComputedStyle && document.documentElement) {
          const value = String(
            window.getComputedStyle(document.documentElement).getPropertyValue('--dsw-alias-state-business-primary') || '',
          ).trim();
          readback = value ? value.toUpperCase() : '空';
        }
      } catch (err) {
        readback = '读取失败';
      }
      const expected = runtime.diag.expectAccent ? String(runtime.diag.expectAccent).toUpperCase() : null;
      const readbackOk = Boolean(expected) && readback === expected;
      const effective = runtime.diag.lastSource || '—';
      const finishName = runtime.diag.finish
        ? (finishes.find((f) => f.id === runtime.diag.finish) || {}).name || runtime.diag.finish
        : '无';

      return h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 2, padding: '2px 0' } },

        group('配色库', '22 套：Pantone 年度色 4 · 中国传统色 14 · 莫兰迪高级灰 4（仅浅色）', [
          chip('官方原色', !state.paletteId, () => store.selectPalette(null, currentWorkspaceId), 'official'),
        ].concat(
          palettes.map((p) =>
            chip(p.name, state.paletteId === p.id, () => store.selectPalette(p.id, currentWorkspaceId), p.id),
          ),
        )),

        h(
          'div',
          { style: HINT },
          activePalette
            ? '当前 ' + activePalette.name + ' · ' + activePalette.source + ' · 强调 ' + report.accent +
              ' · 正文/底 ' + report.textOnBg.toFixed(2) + ' · 强调/底 ' + report.accentOnBg.toFixed(2)
            : '当前 官方原色（无覆盖）',
        ),

        h(ROW, null, [
          action('随机一套', () => {
            if (runtime.randomize) runtime.randomize();
            refresh();
          }, 'dice'),
          chip(state.locks.palette ? '锁配色 开' : '锁配色 关', state.locks.palette, () => {
            store.toggleLock('palette');
            refresh();
          }, 'lock-p'),
          chip(state.locks.finish ? '锁效果 开' : '锁效果 关', state.locks.finish, () => {
            store.toggleLock('finish');
            refresh();
          }, 'lock-f'),
          h('span', { style: HINT }, '共 ' + comboCount + ' 种「配色 × 效果」组合'),
        ]),

        group('表面效果', '单选；与配色叠加，不覆盖', [
          chip('无', state.finishes.length === 0, () => store.patch({ finishes: [] }), 'plain'),
        ].concat(
          surfaceFinishes.map((f) =>
            chip(
              f.name,
              state.finishes[0] === f.id,
              // clicking the active effect clears it — "undo" must not require finding 无
              () => store.patch({ finishes: state.finishes[0] === f.id ? [] : [f.id] }),
              f.id,
            ),
          ),
        )),

        group('作用范围', '控制配色重绘的元素范围；标准/张扬档启用字体渐变', tiers.map((t) =>
          chip(t.name, state.tier === t.id, () => store.patch({ tier: t.id }), t.id))),

        group('自动切换', '定时轮换与十二时辰互斥；手动选择优先到下一时段', [
          chip('关闭', state.interval === 'off' && !state.rhythm.enabled, () =>
            store.setAutomation({ interval: 'off', rhythm: Object.assign({}, state.rhythm, { enabled: false }) }), 'off'),
        ].concat(
          intervals
            .filter((i) => i.id !== 'off')
            .map((i) =>
              chip(i.name, state.interval === i.id, () =>
                store.setAutomation({ interval: i.id, rhythm: Object.assign({}, state.rhythm, { enabled: false }) }), i.id),
            ),
        ).concat([
          chip('十二时辰', state.rhythm.enabled, () =>
            store.setAutomation({ interval: 'off', rhythm: Object.assign({}, state.rhythm, { enabled: !state.rhythm.enabled }) }), 'rhythm'),
          action('随机排程', () => {
            if (runtime.randomizeRhythm) runtime.randomizeRhythm();
            refresh();
          }, 'rhythm-dice'),
        ])),

        manualName
          ? h('div', { style: HINT }, '手动优先：' + manualName + '（到下一个时段边界交还排程）')
          : null,

        state.rhythm.enabled
          ? h(
              'div',
              { style: { display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 2 } },
              state.rhythm.segments.map((segment) =>
                h(
                  'div',
                  { key: segment.id, style: { display: 'flex', gap: 8, alignItems: 'center' } },
                  h('span', { style: Object.assign({}, HINT, { width: 34 }) }, segment.name),
                  h('input', {
                    type: 'time',
                    value: segment.start,
                    onChange: (event) => store.setSegment(segment.id, { start: event.target.value }),
                    style: FIELD,
                  }),
                  h(
                    'select',
                    {
                      value: segment.palette || '',
                      onChange: (event) => store.setSegment(segment.id, { palette: event.target.value }),
                      style: FIELD,
                    },
                    palettes.map((p) => h('option', { key: p.id, value: p.id }, p.name)),
                  ),
                ),
              ),
              h('div', { style: HINT }, '名称取起始时辰；切换锚定固定钟点'),
            )
          : null,

        group('工作区配色', '未绑定时跟随全局；帧顶色条标识当前工作区', [
          chip(state.workspace.enabled ? '已启用' : '已停用', state.workspace.enabled, () =>
            store.patch({ workspace: Object.assign({}, state.workspace, { enabled: !state.workspace.enabled }) }), 'ws-on'),
          chip(state.workspace.accentOnly ? '仅强调色' : '整套', state.workspace.accentOnly, () =>
            store.patch({ workspace: Object.assign({}, state.workspace, { accentOnly: !state.workspace.accentOnly }) }), 'ws-scope'),
          action('全部跟随全局', () =>
            store.patch({ workspace: Object.assign({}, state.workspace, { map: {} }) }), 'ws-clear'),
        ]),

        detected.length
          ? h(
              'div',
              { style: { display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 2 } },
              detected.map((entry) =>
                h(
                  'div',
                  { key: entry.id, style: { display: 'flex', gap: 8, alignItems: 'center' } },
                  h('span', { style: HINT }, (entry.label || entry.id) + (entry.active ? '（当前）' : '')),
                  h(
                    'select',
                    {
                      value: state.workspace.map[entry.id] || 'global',
                      onChange: (event) => store.setWorkspacePalette(entry.id, event.target.value),
                      style: FIELD,
                    },
                    [h('option', { key: 'global', value: 'global' }, '跟随全局')].concat(
                      palettes.map((p) => h('option', { key: p.id, value: p.id }, p.name)),
                    ),
                  ),
                ),
              ),
            )
          : h('div', { style: HINT }, '未检测到工作区；打开任一会话后自动识别'),

        group('会话标记', '手动给单个对话上色，行首竖杠标出；未标记的保持素净', [
          action('清除全部标记', () => store.patch({ sessionColors: {} }), 'marks-clear', 'normal', !Object.keys(marks).length),
        ]),

        sessions.length
          ? h(
              'div',
              { style: { display: 'flex', flexDirection: 'column', gap: 3, paddingLeft: 2 } },
              sessions.map((session) =>
                h(
                  'div',
                  { key: session.id, style: { display: 'flex', gap: 6, alignItems: 'center' } },
                  h('span', { style: Object.assign({}, HINT, { width: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }) }, session.label),
                  markOptionsList.map((color, index) =>
                    swatchButton(h, color, marks[session.id] === color, () => {
                      store.setSessionColor(session.id, marks[session.id] === color ? null : color);
                      refresh();
                    }, session.id + '-' + index),
                  ),
                ),
              ),
            )
          : h('div', { style: HINT }, '会话列表由面板提供；打开任一会话后再看'),

        group('账号行', '替换侧栏账号入口；停用即还原官方（含快速退出登录）', [
          chip(state.brand.enabled ? '自定义 开' : '自定义 关', state.brand.enabled, () =>
            store.patch({ brand: Object.assign({}, state.brand, { enabled: !state.brand.enabled }) }), 'brand-on'),
          action(state.brand.avatar ? '换头像' : '上传头像', () => setAvatarOpen(!avatarOpen), 'brand-avatar'),
          action('清除头像', () =>
            store.patch({ brand: Object.assign({}, state.brand, { avatar: '' }) }), 'brand-clear', 'normal', !state.brand.avatar),
        ]),

        h(
          'div',
          { style: ROW },
          h('span', { style: HINT }, '昵称'),
          h('input', {
            type: 'text',
            value: nickDraft === null ? state.brand.nickname : nickDraft,
            placeholder: '最多 24 字',
            onChange: (event) => setNickDraft(String(event.target.value).slice(0, 24)),
            style: Object.assign({}, FIELD, { width: 150 }),
          }),
          nickDraft === null
            ? action('改昵称', () => setNickDraft(state.brand.nickname), 'nick')
            : [
                action('确定', () => {
                  store.patch({ brand: Object.assign({}, store.snapshot().brand, { nickname: nickDraft }) });
                  setNickDraft(null);
                }, 'nick-ok'),
                chip('取消', false, () => setNickDraft(null), 'nick-cancel'),
              ],
        ),

        avatarOpen
          ? h(AvatarEditor, { onClose: () => setAvatarOpen(false) })
          : null,

        state.brand.avatar.length > avatarWarn
          ? h('div', { style: HINT }, '头像较大，接近浏览器存储上限')
          : null,

        group('安全', '安全模式停用全部绘制，可随时恢复', [
          chip(state.safeMode ? '安全模式 开' : '安全模式 关', state.safeMode, () => store.patch({ safeMode: !state.safeMode }), 'safe'),
        ].concat(
          confirmReset
            ? [
                action('确认还原', () => {
                  store.reset();
                  setConfirmReset(false);
                }, 'reset-yes', 'danger'),
                chip('取消', false, () => setConfirmReset(false), 'reset-no'),
              ]
            : [action('还原出厂', () => setConfirmReset(true), 'reset', 'danger')],
        )),

        group('诊断', '期望值为当前配色计算值，实际值为从 DOM 读回的值', [
          action('重新应用', () => {
            if (runtime.clearFault) runtime.clearFault();
            if (runtime.resetBreaker) runtime.resetBreaker();
            else if (runtime.repaint) runtime.repaint();
            refresh();
          }, 'reapply'),
        ]),

        h(
          'div',
          { style: HINT },
          expected
            ? '强调色 期望 ' + expected + ' · 实际 ' + readback + ' ' + (readbackOk ? '✓' : '✗')
            : '强调色 本档未设 · 实际 ' + readback,
        ),
        h(
          'div',
          { style: HINT },
          '生效来源 ' + effective + ' · 效果 ' + finishName + ' · 标记 ' + Object.keys(marks).length + ' 个 · 重绘 ' +
            runtime.diag.paints + ' 次 · 服务失败 ' + runtime.diag.serviceFails + ' 次 · 被拒值 ' +
            runtime.diag.rejectedValues + ' 个 · 全屏层 ' + runtime.diag.overlays + ' 个 · 熔断 ' +
            (runtime.diag.breakerTripped ? '已触发' : '正常'),
        ),
        fault && fault.message ? h('div', { style: ERR }, '故障【' + fault.stage + '】' + fault.message) : null,
        avatarLimitLabel ? h('div', { style: HINT }, '头像入口限制 ' + avatarLimitLabel + '，输出统一 256×256') : null,
      );
    }

    return Panel;
  }

  /* stripped for bundle */

      /* ---- src/client/workbench.js ---- */
  /**
   * Workbench: the plugin's own place in the main column (PRD FR-11).
   *
   * Why a panel and not only a settings row: a theme system has ~10 groups — colours, effects,
   * scope, schedule, workspaces, session marks, account, safety, diagnostics. The official
   * `settings.general.item` seat is documented for "a single setting that needs no page of its
   * own", so the panel moved to a `settings.section` page and, in parallel, became a
   * `sidebar.panellist` + `main` pair — the same pattern the shipped 插件广场 / 计划 pane use,
   * which is what puts a permanent, discoverable button in the main interface.
   *
   * The header carries at most three direct actions, deliberately: 随机一套 / 官方原色 /
   * 安全模式. Everything else lives in the panel below it.
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  function createWorkbench(deps) {
    const h = deps.h;
    const store = deps.store;
    const runtime = deps.runtime;
    const paletteById = deps.paletteById;
    const Panel = createPanel(deps);

    return function Workbench(props) {
      const [state, setState] = React.useState(store.snapshot());
      React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
      const palette = state.paletteId ? paletteById(state.paletteId) : null;
      const refresh = () => setState(Object.assign({}, store.snapshot()));

      const quick = (label, onClick, key, active) =>
        h(
          'button',
          {
            key,
            type: 'button',
            'data-dsh-action': 'true',
            onClick,
            style: {
              appearance: 'none',
              font: 'inherit',
              fontSize: 12,
              padding: '3px 12px',
              borderRadius: 6,
              cursor: 'pointer',
            },
          },
          label,
        );

      return h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: 10, padding: '18px 22px', maxWidth: 960 } },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' } },
          h('div', { style: { fontSize: 18, fontWeight: 600, color: 'var(--dsw-alias-label-primary)' } }, '多彩Harness'),
          h(
            'div',
            { style: { fontSize: 12, color: 'var(--dsw-alias-label-tertiary)' } },
            palette ? palette.name + ' · ' + (palette.note || palette.source || '') : '官方原色',
          ),
        ),
        h(
          'div',
          { style: { display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' } },
          quick('随机一套', () => {
            if (runtime.randomize) runtime.randomize();
            refresh();
          }, 'wb-dice'),
          quick('官方原色', () => {
            store.selectPalette(null, runtime.currentWorkspaceId ? runtime.currentWorkspaceId() : null);
            refresh();
          }, 'wb-official'),
          quick(state.safeMode ? '安全模式 开' : '安全模式 关', () => {
            store.patch({ safeMode: !state.safeMode });
            refresh();
          }, 'wb-safe'),
        ),
        h(Panel, props),
      );
    };
  }

  /**
   * The sidebar icon: three stacked colour cards, painted with the ACTIVE theme's colours.
   *
   * This seat is ours to draw (`ownerProps` only hands `{ size, active }`), so the icon is a
   * colour illustration rather than a monochrome glyph — and because it reads the live palette,
   * the button itself changes when the theme does. `active` only modulates opacity: the host
   * keeps full control of the label and the hit area.
   */
  function createWorkbenchIcon(deps) {
    const h = deps.h;
    const store = deps.store;
    const paletteById = deps.paletteById;

    return function WorkbenchIcon(props) {
      const [state, setState] = React.useState(store.snapshot());
      React.useEffect(() => store.subscribe((next) => setState(Object.assign({}, next))), []);
      const size = (props && props.size) || 16;
      const active = Boolean(props && props.active);
      const palette = state.paletteId ? paletteById(state.paletteId) : null;
      const brand = palette ? palette.light.brand : '#8A8F98';
      const counter = palette && palette.noteAccent ? palette.noteAccent : '#B0781E';
      const third = palette ? palette.light.sunken : '#F2F3F5';
      const stroke = palette ? palette.light.border1 || palette.light.sunken : '#E6E8EB';

      return h(
        'span',
        {
          'data-dsh-workbench-icon': 'true',
          'aria-hidden': true,
          style: { display: 'inline-grid', placeItems: 'center', opacity: active ? 1 : 0.82 },
        },
        h(
          'svg',
          { viewBox: '0 0 24 24', width: size, height: size, focusable: 'false' },
          h('rect', {
            x: 3.5,
            y: 6.5,
            width: 12,
            height: 12,
            rx: 3,
            fill: third,
            stroke: stroke,
            strokeWidth: 1,
            transform: 'rotate(-9 9 12)',
          }),
          h('rect', {
            x: 6.5,
            y: 5,
            width: 12,
            height: 12,
            rx: 3,
            fill: counter,
            opacity: 0.92,
            transform: 'rotate(-2 12 11)',
          }),
          h('rect', { x: 9.5, y: 4, width: 12, height: 12, rx: 3, fill: brand }),
        ),
      );
    };
  }

  /* stripped for bundle */

      /* ---- src/client/index.js ---- */
  /**
   * Plugin assembly: state → CSS variables (+ the sanctioned service path) → slots.
   *
   * Hard lesson from 2.1.0, applied as structure rather than intent:
   *
   *   * SLOTS ARE REGISTERED FIRST, each guarded on its own. In 2.1.0 the theme effect ran
   *     before any slot registration; when that path threw, the plugin registered nothing at
   *     all and the interface reverted to stock — no panel, no error, no trace.
   *   * EVERY stage of `apply` is guarded, and every failure lands in `FAULT`, which the panel
   *     renders. A failure nobody can see is worse than a visible error.
   *   * The plugin's own stylesheet is the PRIMARY channel (`!important` CSS variables), so a
   *     rejected `overrideTokens` layer can no longer mean "nothing happens".
   *   * Only valid COLOUR values ever enter a colour token. A gradient in a colour token
   *     silently invalidates every `color-mix()` that consumes it; the gradient is declared as
   *     a `background-image` rule over a translucent base colour instead.
   *   * COLOUR AND EFFECT ARE ADDITIVE. Finishes always resolve, with or without a palette
   *     (`NEUTRAL_LIGHT` is the fallback) — the build up to 0.9.9 dropped all fourteen effects
   *     whenever 官方原色 was selected, which read as "the effect is broken".
   *
   * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
   */

  const SOURCE = 'dsh-colors';
  const PANEL_ID = 'dsh-colors';
  const DOCK_ID = 'dsh-colors-status';
  const BAR_ID = 'dsh-colors-workspace-bar';
  const SESSION_BAR_ID = 'dsh-colors-session-mark';
  const SESSION_MENU_ID = 'dsh-colors-session-menu';

  /** Last internal failure, surfaced in the panel. Never silently swallowed. */
  const FAULT = { stage: null, message: null, at: null, count: 0 };

  function recordFault(stage, err) {
    FAULT.stage = stage;
    FAULT.message = err && err.message ? err.message : String(err);
    FAULT.at = Date.now();
    FAULT.count += 1;
  }

  /**
   * Clear a fault whose cause has demonstrably gone away — a stage that just succeeded again.
   * Stale red text is its own kind of lie: it kept reporting a rejected slot registration after
   * the registration had been fixed, and `count` is kept so the history is not erased.
   */
  function clearFault(stage) {
    if (!stage || FAULT.stage === stage) {
      FAULT.stage = null;
      FAULT.message = null;
      FAULT.at = null;
    }
  }

  /**
   * Chip styling lives here, not in inline styles, for one concrete reason (PRD §5): inline
   * borders plus the host's focus ring left a persistent outline on every button the user had
   * ever clicked. Inactive chips now have no border and no outline; the focus ring is ours and
   * only appears for keyboard focus.
   *
   * `[data-dsh-action]` is the second control shape: an ACTION (reset, clear, reapply) must not
   * look like a switch, because a switch that never lights up reads as "this click did nothing".
   */
  const CHIP_CSS =
    '[data-dsh-chip]{border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-primary);outline:none;cursor:pointer;}' +
    '[data-dsh-chip]:focus{outline:none;}' +
    '[data-dsh-chip]:hover{background:var(--dsw-alias-interactive-bg-hover);}' +
    '[data-dsh-chip]:focus-visible{box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));}' +
    '[data-dsh-chip][data-active="true"]{background:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-bg-layer-1);font-weight:600;}' +
    '[data-dsh-chip][aria-disabled="true"]{opacity:.45;cursor:default;}' +
    '[data-dsh-action]{border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-primary);outline:none;cursor:pointer;}' +
    '[data-dsh-action]:hover{background:var(--dsw-alias-interactive-bg-hover);}' +
    '[data-dsh-action]:focus-visible{box-shadow:0 0 0 2px var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));}' +
    '[data-dsh-action][data-tone="danger"]{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary);}' +
    '[data-dsh-swatch]{border:1px solid var(--dsw-alias-border-l2);outline:none;cursor:pointer;padding:0;}' +
    '[data-dsh-swatch][data-active="true"]{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-1),0 0 0 4px var(--dsw-alias-state-business-primary);}';

  /** Plain token map → the `{ light, dark }` shape; dark mirrors light (no dark mode). */
  function wrapTokens(map) {
    const out = {};
    for (const key of Object.keys(map || {})) {
      const value = map[key];
      if (typeof value === 'string' && value.length > 0) out[key] = { light: value, dark: value };
    }
    return out;
  }

  /** True only for real colour values: gradients, filters and shadows must never enter one. */
  function isColorValue(value) {
    if (typeof value !== 'string') return false;
    const v = value.trim();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) return true;
    return /^(rgb|rgba|hsl|hsla|color|oklch|lab|lch)\(/i.test(v);
  }

  /**
   * Wrap a slot component so a render crash can never take the host's tree down with it.
   * The failure is recorded (and shown in the panel); the occupant renders nothing.
   */
  function safeComponent(Component, label) {
    return function Guarded(props) {
      try {
        return Component(props);
      } catch (err) {
        recordFault('render:' + label, err);
        return null;
      }
    };
  }

  function createPlugin(deps) {
    const h = deps.h;
    const palettes = deps.palettes;
    const finishes = deps.finishes;
    const paletteById = (id) => palettes.find((p) => p.id === id) || null;
    const paletteIds = palettes.map((p) => p.id);
    const finishIds = finishes.map((f) => f.id);
    const store = createStore(undefined, (err) => recordFault('storage', err));
    const runtime = {
      workspaces: new Map(),
      current: null,
      repaint: null,
      clearFault: null,
      randomize: null,
      faults: FAULT,
      store,
      palettes,
      paletteById,
      paletteIds,
      finishes,
      finishIds,
      diag: {
        paints: 0,
        lastPaletteId: null,
        lastSource: null,
        /** The accent value this plugin actually WROTE, so the read-back compares like with like. */
        expectAccent: null,
        rejectedValues: 0,
        serviceFails: 0,
        overlays: 0,
        sessionMarks: 0,
        finish: null,
        breakerTripped: false,
      },
    };

    return {
      inject: ['theme', 'slots'],

      apply(ctx) {
        const theme = ctx.theme;
        let styleEl = null;
        let timer = null;
        /**
         * The guard against the failure that took the app down: `overrideTokens` emits the
         * documented `theme/change` event, so a listener that repaints feeds itself and the
         * renderer dies of OOM with no JS error to show for it.
         */
        const breaker = createBreaker();

        function setCss(css) {
          if (!css) {
            if (styleEl) styleEl.textContent = '';
            return;
          }
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.setAttribute('data-dsh-plugin', SOURCE);
            document.head.appendChild(styleEl);
          }
          styleEl.textContent = css;
        }

        /** Merge token layers in order — later layers win. Non-colour values are declared apart. */
        function mergeLayers(layers) {
          const colors = {};
          const extras = [];
          for (const layer of layers) {
            for (const key of Object.keys(layer || {})) {
              const entry = layer[key];
              const value = entry && typeof entry === 'object' ? entry.light : entry;
              if (typeof value !== 'string' || !value) continue;
              if (isColorValue(value)) colors[key] = value;
              else extras.push([key, value]);
            }
          }
          return { colors, extras };
        }

        /** The declaration block for an already-merged layer set. */
        function cssFromMerged(merged) {
          const names = Object.keys(merged.colors);
          let css = '';
          if (names.length) {
            css +=
              ':root,html,body{' +
              names.map((k) => k + ':' + merged.colors[k] + ' !important;').join('') +
              '}';
          }
          for (const pair of merged.extras) {
            css += ':root,html,body{' + pair[0] + ':' + pair[1] + ' !important;}';
          }
          return css;
        }

        function activePalette(now) {
          const state = store.snapshot();
          const scheduled = resolvePaletteId(state, now || new Date(), paletteIds);
          const id = scheduled || state.paletteId;
          return id ? paletteById(id) : null;
        }

        function pushLayer(source, tokens) {
          const colorTokens = {};
          for (const key of Object.keys(tokens || {})) {
            const entry = tokens[key];
            if (entry && typeof entry === 'object' && isColorValue(entry.light)) colorTokens[key] = entry;
            else runtime.diag.rejectedValues += 1;
          }
          try {
            theme.overrideTokens(source, colorTokens);
          } catch (err) {
            runtime.diag.serviceFails += 1;
            recordFault('overrideTokens(' + source + ')', err);
          }
        }

        function paint() {
          const state = store.snapshot();
          const now = new Date();

          // Kill switch first: safe mode paints nothing at all, not even the palette.
          if (state.safeMode) {
            pushLayer(SOURCE, {});
            pushLayer(SOURCE + ':accents', {});
            pushLayer(SOURCE + ':finish', {});
            pushLayer(SOURCE + ':workspace', {});
            setCss('html{color-scheme:light !important;}body{color-scheme:light !important;}');
            runtime.diag.paints += 1;
            runtime.diag.overlays = 0;
            runtime.diag.lastPaletteId = null;
            runtime.diag.expectAccent = null;
            runtime.diag.finish = null;
            runtime.diag.lastSource = 'safe-mode';
            return;
          }

          const palette = activePalette(now);

          const core = palette ? buildLayer(palette) : {};
          const accents = palette ? wrapTokens(tierTokens(state.tier, palette)) : {};
          // PRD FR-7: harmonise the three semantic state colours toward the palette when asked.
          const harmony = palette && state.status.semantic ? wrapTokens(harmonyTokens(palette)) : {};
          // PRD FR-6: the palette's paired counter-colour, consumed by our markdown stylesheet.
          const note = palette && palette.noteAccent ? { '--dsh-note-accent': palette.noteAccent } : {};
          // FR-2: effects are ADDITIVE — they resolve even with no palette at all.
          const finish = resolveFinishes(state.finishes, palette);

          const current = runtime.current;
          const boundId =
            state.workspace.enabled && current && current.workspaceId
              ? state.workspace.map[current.workspaceId]
              : null;
          const bound = boundId ? paletteById(boundId) : null;
          // PRD FR-5: an explicit binding may replace the whole palette, not just the accent.
          const workspaceLayer = bound
            ? state.workspace.accentOnly === false
              ? buildLayer(bound)
              : wrapTokens(workspaceTokens(bound))
            : {};

          pushLayer(SOURCE, core);
          pushLayer(SOURCE + ':accents', Object.assign({}, accents, harmony));
          pushLayer(SOURCE + ':finish', wrapTokens(finish.tokens));
          pushLayer(SOURCE + ':workspace', workspaceLayer);

          let css = SPIN_KEYFRAMES + CHIP_CSS;
          css += 'html{color-scheme:light !important;}body{color-scheme:light !important;}';
          const merged = mergeLayers([core, accents, finish.tokens, workspaceLayer, harmony, note]);
          css += cssFromMerged(merged);
          css += finish.css;
          // 字体渐变 is carried by the ACCENT TIER, not by a separate switch: 克制档 keeps flat
          // emphasis, 标准/张扬 use the theme gradient (both stops already contrast-checked).
          if (state.status.annotations) {
            css += markdownNoteCss({ gradientText: state.tier !== 'gentle' });
          }
          css += sessionMarkCss(state);
          setCss(css);

          const manualId = manualOverride(state, now);
          runtime.diag.paints += 1;
          runtime.diag.overlays = finish.overlayCount || 0;
          runtime.diag.lastPaletteId = palette ? palette.id : null;
          // What the DIAGNOSTIC compares against must be the value this plugin just wrote —
          // comparing a palette's on-backdrop accent against an on-surface one is apples to
          // oranges, and produced a permanent red ✗ that meant nothing.
          runtime.diag.expectAccent = merged.colors['--dsw-alias-state-business-primary'] || null;
          runtime.diag.finish = state.finishes.length ? state.finishes[0] : null;
          runtime.diag.sessionMarks = Object.keys(state.sessionColors).length;
          runtime.diag.lastSource = bound
            ? 'workspace:' + bound.id
            : palette
              ? (manualId ? 'manual:' : 'global:') + palette.id
              : 'official';
        }

        /**
         * Session colour marks (PRD FR-10) as a pure stylesheet rule.
         *
         * The mark is keyed by the host's own `data-session-id` attribute, so painting is
         * DECLARATIVE: no DOM mutation, nothing to go stale, and if the host renames the
         * attribute the worst case is a mark that stops showing (the panel still lists it).
         * One rule per marked session, capped because the marks themselves are capped.
         */
        function sessionMarkCss(state) {
          const marks = state.sessionColors || {};
          const ids = Object.keys(marks).slice(0, 200);
          if (!ids.length) return '';
          let css = '';
          for (const id of ids) {
            const color = marks[id];
            if (!/^#[0-9a-fA-F]{6}$/.test(color)) continue;
            const safe = id.replace(/["\\]/g, '');
            const sel = '[data-session-id="' + safe + '"]';
            css +=
              sel + '{--dsh-session-mark:' + color + ';}' +
              sel + ' [class*="session"]::before,' +
              sel + '::before{content:"";position:absolute;left:0;top:2px;bottom:2px;width:3px;' +
              'border-radius:2px;background:' + color + ';pointer-events:none;}' +
              sel + '[class*="row"],' + sel + '{position:relative;}';
          }
          return css;
        }

        /** Every path into paint: re-entrancy guard, storm breaker, fault capture. */
        function safePaint(stage) {
          const verdict = breaker.enter();
          if (verdict === 'reentrant') return false;
          if (verdict === 'tripped') {
            if (!runtime.diag.breakerTripped) {
              runtime.diag.breakerTripped = true;
              recordFault(
                'circuit-breaker',
                new Error(
                  'repaint storm: ' +
                    breaker.state().count +
                    ' repaints within ' +
                    breaker.state().windowMs +
                    'ms — repainting suspended until reset',
                ),
              );
            }
            return false;
          }
          try {
            paint();
            return true;
          } catch (err) {
            recordFault(stage, err);
            return false;
          } finally {
            breaker.exit();
          }
        }

        function schedule() {
          if (timer) {
            window.clearTimeout(timer);
            timer = null;
          }
          const ms = msUntilNextChange(store.snapshot(), new Date());
          if (ms > 0) {
            timer = window.setTimeout(() => {
              safePaint('timer');
              try {
                schedule();
              } catch (err) {
                recordFault('schedule', err);
              }
            }, Math.min(ms, 2147483000));
          }
        }

        function report(signal) {
          try {
            if (signal.workspaceId) {
              const entry = runtime.workspaces.get(signal.workspaceId) || { id: signal.workspaceId };
              for (const other of runtime.workspaces.values()) other.active = false;
              runtime.workspaces.set(
                signal.workspaceId,
                Object.assign(entry, { label: signal.label || entry.label || signal.workspaceId, active: true }),
              );
            }
            runtime.current = signal;
            paint();
          } catch (err) {
            recordFault('report', err);
          }
        }
        runtime.report = report;

        /**
         * Account row (PRD FR-9). Registered ONLY while enabled: disabling disposes the
         * injection so the shipped account launcher (with its quick sign-out) comes back,
         * instead of leaving an empty seat behind.
         *
         * `settings.launcher` is a SINGLE slot and already has an occupant at the shipped
         * priority 0. The slot core refuses a second occupant at the same priority and says so
         * in the error: "register at a different priority to shadow it (lowest renders)". A lower
         * number is therefore how this occupant takes the seat, which SHADOWS the shipped
         * launcher while enabled (and restores it the moment it is disabled).
         */
        const ACCOUNT_PRIORITY = -1;
        let accountDisposer = null;
        function syncAccountRow() {
          const want = Boolean(store.snapshot().brand.enabled);
          if (want && !accountDisposer) {
            try {
              accountDisposer = ctx.slots.inject('settings.launcher', () => {
                try {
                  const disposer = ctx.slots.register(
                    { name: 'settings.launcher', priority: ACCOUNT_PRIORITY },
                    createAccountRow({ h, store, paletteById }),
                  );
                  clearFault('slot:account');
                  return disposer;
                } catch (err) {
                  recordFault('slot:account', err);
                  return () => {};
                }
              });
            } catch (err) {
              recordFault('slot:account', err);
              accountDisposer = null;
            }
          } else if (!want && accountDisposer) {
            try {
              accountDisposer();
            } catch (err) {
              /* disposal must never throw */
            }
            accountDisposer = null;
          }
        }
        runtime.syncAccountRow = syncAccountRow;

        runtime.repaint = () => {
          safePaint('manual');
          try {
            schedule();
          } catch (err) {
            recordFault('schedule', err);
          }
        };

        /** Manual recovery from a tripped breaker: explicit, never automatic. */
        runtime.resetBreaker = () => {
          breaker.reset();
          runtime.diag.breakerTripped = false;
          return safePaint('manual-reset');
        };
        runtime.breakerState = () => breaker.state();
        /** Clear the fault banner after a retry. A recurring fault re-records itself at once. */
        runtime.clearFault = () => clearFault(null);
        /** 随机: one dice roll over palette × effect, honouring the two locks. */
        runtime.randomize = () =>
          store.randomize(paletteIds, finishIds, currentWorkspaceId(), new Date());
        runtime.randomizeRhythm = () => store.randomizeRhythm(paletteIds);
        function currentWorkspaceId() {
          return runtime.current && runtime.current.workspaceId ? runtime.current.workspaceId : null;
        }
        runtime.currentWorkspaceId = currentWorkspaceId;

        // ------------------------------------------------------------------ 1. slots first
        // A failure later in apply must not be able to take the interface entry points away.
        // Every seat is registered in its own try/catch, so one refusal cannot cascade.
        const panelDeps = {
          h,
          store,
          runtime,
          fault: FAULT,
          palettes,
          paletteById,
          finishes,
          tiers: TIER_ORDER.map((id) => TIERS[id]),
          intervals: INTERVALS,
          audit: auditPalette,
          avatarLimit: AVATAR_LIMIT,
          avatarWarn: AVATAR_WARN,
          avatarEdge: AVATAR_EDGE,
        };

        try {
          ctx.slots.inject('settings.section', () =>
            ctx.slots.register(
              { name: 'settings.section', id: PANEL_ID, order: 30, label: '多彩Harness' },
              safeComponent(createPanel(panelDeps), 'settings-section'),
            ),
          );
        } catch (err) {
          recordFault('slot:settings-section', err);
        }

        try {
          ctx.slots.inject('sidebar.panellist', () =>
            ctx.slots.register(
              { name: 'sidebar.panellist', id: PANEL_ID, order: 100, label: '多彩Harness' },
              safeComponent(createWorkbenchIcon({ h, paletteById, store }), 'panellist'),
            ),
          );
        } catch (err) {
          recordFault('slot:panellist', err);
        }

        try {
          ctx.slots.inject('main', () =>
            ctx.slots.register(
              { name: 'main', key: PANEL_ID },
              safeComponent(createWorkbench(panelDeps), 'workbench'),
            ),
          );
        } catch (err) {
          recordFault('slot:workbench', err);
        }

        try {
          ctx.slots.inject('conversation.composer.dock', () =>
            ctx.slots.register(
              { name: 'conversation.composer.dock', id: DOCK_ID, order: 20 },
              safeComponent(createDockSignal({ h, store, report, paletteById }), 'dock'),
            ),
          );
        } catch (err) {
          recordFault('slot:dock', err);
        }

        try {
          ctx.slots.inject('shell.overlay', () =>
            ctx.slots.register(
              { name: 'shell.overlay', id: BAR_ID, order: 500 },
              safeComponent(createWorkspaceBar({ h, store, runtime, paletteById }), 'bar'),
            ),
          );
        } catch (err) {
          recordFault('slot:bar', err);
        }

        try {
          ctx.slots.inject('sidebar.session.row.leading', () =>
            ctx.slots.register(
              { name: 'sidebar.session.row.leading', id: SESSION_BAR_ID, order: 10 },
              safeComponent(createSessionMark({ h, store }), 'session-mark'),
            ),
          );
        } catch (err) {
          recordFault('slot:session-mark', err);
        }

        try {
          ctx.slots.inject('sidebar.workspaces.session.menu.item', () =>
            ctx.slots.register(
              { name: 'sidebar.workspaces.session.menu.item', id: SESSION_MENU_ID, order: 60 },
              safeComponent(createSessionMenu({ h, store, paletteById }), 'session-menu'),
            ),
          );
        } catch (err) {
          recordFault('slot:session-menu', err);
        }

        // --------------------------------------------------- 2. paint once, then subscribe
        safePaint('initial');
        syncAccountRow();

        try {
          schedule();
        } catch (err) {
          recordFault('schedule', err);
        }

        try {
          ctx.effect(() => {
            let offStore = null;
            try {
              offStore = store.subscribe(() => {
                safePaint('store-change');
                syncAccountRow();
                try {
                  schedule();
                } catch (err) {
                  recordFault('schedule', err);
                }
              });
            } catch (err) {
              recordFault('subscribe', err);
            }
            // NOTE: we deliberately do NOT subscribe to `theme/change`.
            // `overrideTokens` emits that event, so a repainting listener feeds itself:
            // paint → overrideTokens → theme/change → paint → … until the renderer OOMs
            // (that is exactly the crash this version fixes). The subscription bought nothing:
            // there is no dark mode to follow and the finish CSS is scheme-independent.
            return () => {
              try {
                if (offStore) offStore();
              } catch (err) {
                /* disposal must never throw */
              }
              if (timer) {
                window.clearTimeout(timer);
                timer = null;
              }
              runtime.repaint = null;
              ['', ':accents', ':finish', ':workspace'].forEach((suffix) => {
                try {
                  theme.overrideTokens(SOURCE + suffix, {});
                } catch (err) {
                  /* disposal must not throw */
                }
              });
              try {
                setCss('');
                if (styleEl) {
                  styleEl.remove();
                  styleEl = null;
                }
              } catch (err) {
                /* nothing else to do */
              }
            };
          });
        } catch (err) {
          recordFault('effect', err);
        }
      },
    };
  }

  /* stripped for bundle */

    return createPlugin({ h, palettes: PALETTES, finishes: FINISHES });
  },
});
