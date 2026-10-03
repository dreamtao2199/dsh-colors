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
 * 字体渐变 was REMOVED here (0.9.11). It set `color:transparent` on `strong`, and an inline
 * `code` inside a bold run inherits that transparency while keeping its own light background —
 * so the chip rendered as a blank block until it was selected. The session-title gradient the
 * user actually wanted would need host-DOM painting, which this plugin does not do.
 *
 * Bundling note: `@bundle:strip` blocks are test-only and removed by the bundler.
 */

const MARKDOWN_CONTAINER = '[class*="_markdown_"]';

function markdownNoteCss() {
  const c = MARKDOWN_CONTAINER;
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
  ].join('');
}

/* @bundle:strip-start */
export { MARKDOWN_CONTAINER, markdownNoteCss };
/* @bundle:strip-end */