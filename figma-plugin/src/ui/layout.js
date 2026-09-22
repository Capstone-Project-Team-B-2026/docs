import { paint } from '../tokens.js';
import { fontState } from '../fonts.js';

export function tryFillH(node) {
  if (!node || !('layoutSizingHorizontal' in node)) return;
  const p = node.parent;
  if (!p || p.type !== 'FRAME' || !p.layoutMode || p.layoutMode === 'NONE') return;
  try {
    node.layoutSizingHorizontal = 'FILL';
  } catch (e) {
    /* ignore */
  }
}

export function txt(content, size, weight, color, opts) {
  const t = figma.createText();
  t.fontName = { family: fontState.family, style: fontState.styles[weight] || fontState.styles.Regular };
  t.characters = String(content == null ? '' : content);
  t.fontSize = size;
  const lh = opts && opts.lineHeight ? opts.lineHeight : Math.round(size * 1.35);
  t.lineHeight = { unit: 'PIXELS', value: lh };
  t.fills = paint(color);
  if (opts && opts.align) t.textAlignHorizontal = opts.align;
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  return t;
}

export function wrapTxt(content, size, weight, color, opts) {
  const t = txt(content, size, weight, color, opts);
  t.textAutoResize = 'HEIGHT';
  t.layoutAlign = 'STRETCH';
  // Do NOT set FILL before parented
  return t;
}

export function box(name, dir, gap, padX, padY) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = dir;
  f.itemSpacing = gap == null ? 0 : gap;
  f.paddingLeft = padX == null ? 0 : padX;
  f.paddingRight = padX == null ? 0 : padX;
  f.paddingTop = padY === undefined ? (padX == null ? 0 : padX) : padY;
  f.paddingBottom = padY === undefined ? (padX == null ? 0 : padX) : padY;
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  f.fills = [];
  f.clipsContent = false;
  return f;
}

export function stretch(node) {
  node.layoutAlign = 'STRETCH';
}

export function grow(node, n) {
  node.layoutGrow = n == null ? 1 : n;
}

export function space(h) {
  const s = figma.createFrame();
  s.name = 'Spacer';
  s.resize(1, h);
  s.fills = [];
  s.layoutAlign = 'STRETCH';
  return s;
}

export function row(name, gap, align) {
  const r = box(name, 'HORIZONTAL', gap == null ? 8 : gap, 0, 0);
  r.counterAxisAlignItems = align || 'CENTER';
  return r;
}

export function col(name, gap) {
  return box(name, 'VERTICAL', gap == null ? 8 : gap, 0, 0);
}

export function between(name, gap) {
  const r = row(name, gap == null ? 8 : gap);
  r.primaryAxisAlignItems = 'SPACE_BETWEEN';
  stretch(r);
  return r;
}

export function centerCol(name, gap) {
  const c = col(name, gap == null ? 8 : gap);
  c.primaryAxisAlignItems = 'CENTER';
  c.counterAxisAlignItems = 'CENTER';
  stretch(c);
  return c;
}

export function applyFillsInTree(root) {
  if (!root || !root.findAll) return;
  const nodes = root.findAll((n) => n.type === 'FRAME' || n.type === 'TEXT' || n.type === 'RECTANGLE' || n.type === 'ELLIPSE');
  for (const n of nodes) {
    const p = n.parent;
    if (!p || p.type !== 'FRAME' || !p.layoutMode || p.layoutMode === 'NONE') continue;
    try {
      if (n.layoutAlign === 'STRETCH' && p.layoutMode === 'VERTICAL') {
        n.layoutSizingHorizontal = 'FILL';
      }
      if (n.layoutGrow > 0 && p.layoutMode === 'HORIZONTAL') {
        n.layoutSizingHorizontal = 'FILL';
      }
      if (n.type === 'TEXT' && n.textAutoResize === 'HEIGHT' && n.layoutAlign === 'STRETCH' && p.layoutMode === 'VERTICAL') {
        n.layoutSizingHorizontal = 'FILL';
      }
    } catch (e) {
      /* skip */
    }
  }
}

export function fixCollapsedText(root) {
  if (!root || !root.findAll) return;
  applyFillsInTree(root);
  const texts = root.findAll((n) => n.type === 'TEXT');
  for (const t of texts) {
    const chars = t.characters || '';
    if (chars.length < 3) continue;
    if (t.textAutoResize !== 'HEIGHT' && t.textAutoResize !== 'TRUNCATE') continue;
    if (t.width > 0 && t.width < Math.max(18, (t.fontSize || 14) * 1.2)) {
      t.textAutoResize = 'WIDTH_AND_HEIGHT';
      t.layoutAlign = 'INHERIT';
      try {
        if ('layoutSizingHorizontal' in t) t.layoutSizingHorizontal = 'HUG';
      } catch (e) { /* ignore */ }
      if ('layoutGrow' in t) t.layoutGrow = 0;
    }
  }
}
