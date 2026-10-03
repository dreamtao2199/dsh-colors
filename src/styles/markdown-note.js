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

/* @bundle:strip-start */
export { MARKDOWN_CONTAINER, gradientTextCss, markdownNoteCss };
/* @bundle:strip-end */
