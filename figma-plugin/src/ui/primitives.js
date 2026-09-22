import { C, R, cardShadow, paint } from '../tokens.js';
import { box, grow, stretch, txt, wrapTxt, row, col } from './layout.js';

export function pill(label, bg, fg) {
  const p = box('Badge', 'HORIZONTAL', 4, 10, 6);
  p.fills = paint(bg);
  p.cornerRadius = R.pill;
  p.counterAxisAlignItems = 'CENTER';
  const t = wrapTxt(label, 12, 'SemiBold', fg);
  // Hug content in horizontal pills — avoid STRETCH collapsing width
  t.layoutAlign = 'INHERIT';
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  p.appendChild(t);
  return p;
}

export function progress(pct, color) {
  const value = Math.max(0, Math.min(100, pct));
  const track = figma.createFrame();
  track.name = 'ProgressBar';
  track.setPluginData('pct', String(value));
  track.layoutMode = 'NONE';
  track.layoutAlign = 'STRETCH';
  track.resize(240, 10);
  track.fills = paint(C.ink100);
  track.cornerRadius = R.pill;
  track.clipsContent = true;

  const fill = figma.createRectangle();
  fill.name = 'Fill';
  fill.x = 0;
  fill.y = 0;
  fill.resize(Math.max(8, (240 * value) / 100), 10);
  fill.fills = paint(color || C.primaryBright);
  fill.cornerRadius = R.pill;
  track.appendChild(fill);
  return track;
}

export function layoutProgressBars(root) {
  const bars = root.findAll((n) => n.type === 'FRAME' && n.name === 'ProgressBar');
  for (const track of bars) {
    const value = Number(track.getPluginData('pct') || '0');
    const fill = track.findOne((n) => n.name === 'Fill');
    if (!fill) continue;
    const w = Math.max(8, (track.width * value) / 100);
    fill.resize(w, track.height);
    fill.x = 0;
    fill.y = 0;
  }
}

function buttonLabel(label, size, weight, color) {
  const t = txt(label, size, weight, color, { align: 'CENTER' });
  t.textAlignHorizontal = 'CENTER';
  t.textAutoResize = 'WIDTH_AND_HEIGHT';
  return t;
}

export function cta(label, bg, fg) {
  const b = box('Button/' + label, 'HORIZONTAL', 8, 16, 14);
  b.fills = paint(bg || C.primary);
  b.cornerRadius = R.md;
  b.primaryAxisAlignItems = 'CENTER';
  b.counterAxisAlignItems = 'CENTER';
  stretch(b);
  b.appendChild(buttonLabel(label, 15, 'Bold', fg || C.onPrimary));
  return b;
}

export function ghostCta(label) {
  const b = box('Button/' + label, 'HORIZONTAL', 8, 16, 14);
  b.fills = [];
  b.strokes = paint(C.ink200);
  b.strokeWeight = 1.5;
  b.cornerRadius = R.md;
  b.primaryAxisAlignItems = 'CENTER';
  b.counterAxisAlignItems = 'CENTER';
  stretch(b);
  b.appendChild(buttonLabel(label, 15, 'SemiBold', C.ink700));
  return b;
}

export function secondaryCta(label) {
  const b = box('Button/' + label, 'HORIZONTAL', 8, 16, 14);
  b.fills = paint(C.primarySoft);
  b.cornerRadius = R.md;
  b.primaryAxisAlignItems = 'CENTER';
  b.counterAxisAlignItems = 'CENTER';
  stretch(b);
  b.appendChild(buttonLabel(label, 15, 'SemiBold', C.primaryDark));
  return b;
}

export function card(name) {
  const f = box(name, 'VERTICAL', 10, 16, 16);
  f.fills = paint(C.surface);
  f.cornerRadius = R.lg;
  f.effects = [cardShadow];
  f.strokes = paint(C.ink200);
  f.strokeWeight = 1;
  stretch(f);
  return f;
}

export function softCard(name, bg) {
  const f = card(name);
  f.fills = paint(bg || C.primarySoft);
  f.strokes = [];
  f.effects = [];
  return f;
}

export function inputField(label, placeholder, value) {
  const wrap = col('Field/' + label, 6);
  stretch(wrap);
  wrap.appendChild(txt(label, 13, 'SemiBold', C.ink700));
  const field = box('Input', 'HORIZONTAL', 8, 14, 14);
  field.fills = paint(C.surface);
  field.strokes = paint(C.ink200);
  field.strokeWeight = 1.5;
  field.cornerRadius = R.md;
  field.counterAxisAlignItems = 'CENTER';
  stretch(field);
  const t = txt(value || placeholder || '', 15, 'Regular', value ? C.ink900 : C.ink400);
  t.layoutGrow = 1;
  t.textTruncation = 'ENDING';
  field.appendChild(t);
  wrap.appendChild(field);
  return wrap;
}

export function listRow(title, meta, trailing, bg) {
  const rowF = box('ListRow', 'HORIZONTAL', 12, 14, 12);
  rowF.fills = paint(bg || C.surface);
  rowF.cornerRadius = R.md;
  rowF.strokes = paint(C.ink200);
  rowF.strokeWeight = 1;
  rowF.counterAxisAlignItems = 'CENTER';
  stretch(rowF);

  const info = col('Info', 2);
  grow(info);
  info.appendChild(wrapTxt(title, 14, 'SemiBold', C.ink900));
  if (meta) info.appendChild(wrapTxt(meta, 12, 'Regular', C.ink500));
  rowF.appendChild(info);
  if (trailing) {
    if (typeof trailing === 'string') rowF.appendChild(txt(trailing, 13, 'SemiBold', C.ink500));
    else rowF.appendChild(trailing);
  }
  return rowF;
}

export function metricTile(value, label, color) {
  const s = box('Metric', 'VERTICAL', 4, 14, 14);
  s.fills = paint(C.surface);
  s.cornerRadius = R.lg;
  s.effects = [cardShadow];
  s.strokes = paint(C.ink200);
  s.strokeWeight = 1;
  grow(s);
  s.appendChild(txt(String(value), 22, 'Bold', color || C.ink900));
  s.appendChild(wrapTxt(label, 12, 'Medium', C.ink500));
  return s;
}

export function metricRow(items) {
  const r = row('Metrics', 10);
  stretch(r);
  items.forEach(([value, label, color]) => r.appendChild(metricTile(value, label, color)));
  return r;
}

/** 2×n metric grid — shows every item (no slice). Labels wrap; no mid-word clip. */
export function metricGrid(items, columns) {
  const cols = columns || 2;
  const grid = col('MetricGrid', 8);
  stretch(grid);
  for (let i = 0; i < items.length; i += cols) {
    const r = row('MetricRow', 8);
    stretch(r);
    r.counterAxisAlignItems = 'MIN';
    for (let j = i; j < Math.min(i + cols, items.length); j++) {
      const m = items[j];
      const cell = col('m', 2);
      cell.layoutGrow = 1;
      stretch(cell);
      cell.appendChild(wrapTxt(m.value, 14, 'Bold', C.ink900));
      cell.appendChild(wrapTxt(m.label, 12, 'Medium', C.ink500));
      r.appendChild(cell);
    }
    // Fill empty slots so a lone last cell does not stretch full width oddly
    const remainder = cols - (Math.min(i + cols, items.length) - i);
    for (let k = 0; k < remainder; k++) {
      const spacer = col('spacer', 0);
      spacer.layoutGrow = 1;
      r.appendChild(spacer);
    }
    grid.appendChild(r);
  }
  return grid;
}

export function sectionTitle(title, meta) {
  const wrap = col('Section', 4);
  stretch(wrap);
  wrap.appendChild(txt(title, 18, 'Bold', C.ink900));
  if (meta) wrap.appendChild(wrapTxt(meta, 13, 'Regular', C.ink500));
  return wrap;
}

export function answerOption(letter, value, state) {
  let bg = C.surface;
  let border = C.ink200;
  let letterBg = C.ink100;
  let letterFg = C.ink700;
  let valueFg = C.ink900;
  if (state === 'selected') {
    bg = C.primarySoft;
    border = C.primary;
    letterBg = C.primary;
    letterFg = C.white;
  } else if (state === 'correct') {
    bg = C.successSoft;
    border = C.success;
    letterBg = C.success;
    letterFg = C.white;
  } else if (state === 'mistake') {
    bg = C.mistakeSoft;
    border = C.mistake;
    letterBg = C.mistake;
    letterFg = C.white;
  }

  const opt = box('AnswerOption/' + letter, 'HORIZONTAL', 12, 14, 14);
  opt.fills = paint(bg);
  opt.cornerRadius = R.lg;
  opt.strokes = paint(border);
  opt.strokeWeight = state === 'default' || !state ? 1.5 : 2;
  opt.counterAxisAlignItems = 'CENTER';
  stretch(opt);

  const circle = box('Letter', 'HORIZONTAL', 0, 0, 0);
  circle.resize(36, 36);
  circle.primaryAxisSizingMode = 'FIXED';
  circle.counterAxisSizingMode = 'FIXED';
  circle.fills = paint(letterBg);
  circle.cornerRadius = R.pill;
  circle.primaryAxisAlignItems = 'CENTER';
  circle.counterAxisAlignItems = 'CENTER';
  circle.appendChild(txt(letter, 14, 'Bold', letterFg));
  opt.appendChild(circle);
  const label = wrapTxt(value, 16, 'SemiBold', valueFg);
  label.layoutGrow = 1;
  opt.appendChild(label);
  return opt;
}

export function pathNode(label, state, meta) {
  const colors = {
    completed: [C.successSoft, C.success, C.successDark],
    available: [C.surface, C.ink200, C.ink900],
    recommended: [C.primarySoft, C.primary, C.primaryDark],
    locked: [C.ink100, C.ink200, C.ink500],
    in_progress: [C.primarySubtle, C.primaryBright, C.primaryDark],
  };
  const [bg, border, fg] = colors[state] || colors.available;
  const node = box('PathNode/' + label, 'HORIZONTAL', 12, 14, 12);
  node.fills = paint(bg);
  node.cornerRadius = R.lg;
  node.strokes = paint(border);
  node.strokeWeight = 1.5;
  node.counterAxisAlignItems = 'CENTER';
  stretch(node);
  const icon = txt(
    state === 'completed' ? '✓' : state === 'locked' ? '○' : state === 'in_progress' ? '●' : '›',
    16,
    'Bold',
    fg
  );
  node.appendChild(icon);
  const info = col('i', 2);
  grow(info);
  info.appendChild(wrapTxt(label, 14, 'SemiBold', fg));
  if (meta) info.appendChild(wrapTxt(meta, 12, 'Regular', C.ink500));
  node.appendChild(info);
  return node;
}

export function kvRow(label, value) {
  const r = row('KV', 12);
  stretch(r);
  r.counterAxisAlignItems = 'MIN';
  const lab = txt(label, 13, 'Regular', C.ink500);
  lab.layoutGrow = 1;
  r.appendChild(lab);
  const val = txt(value, 13, 'SemiBold', C.ink900, { align: 'RIGHT' });
  val.textAlignHorizontal = 'RIGHT';
  r.appendChild(val);
  return r;
}

export function emptyState(title, body, ctaLabel) {
  const e = softCard('Empty', C.primarySubtle);
  e.primaryAxisAlignItems = 'CENTER';
  e.appendChild(txt(title, 16, 'Bold', C.ink900));
  e.appendChild(wrapTxt(body, 13, 'Regular', C.ink500, { align: 'CENTER' }));
  if (ctaLabel) e.appendChild(cta(ctaLabel, C.primary));
  return e;
}

export function banner(text, bg, fg) {
  const b = box('Banner', 'VERTICAL', 0, 12, 10);
  b.fills = paint(bg);
  b.cornerRadius = R.md;
  stretch(b);
  b.appendChild(wrapTxt(text, 12, 'SemiBold', fg));
  return b;
}
