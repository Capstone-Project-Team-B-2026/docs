import { C, TOKEN_SWATCHES, paint, R } from '../tokens.js';
import { txt, wrapTxt, row, col, stretch } from '../ui/layout.js';
import { cta, secondaryCta, ghostCta, pill, progress, card } from '../ui/primitives.js';
import { NORTH_STAR, PRODUCT_METRICS, SCREEN_METRIC_HINTS } from '../catalog/metrics.js';
import { MOBILE_SCREENS, WEB_SCREENS } from '../catalog/ids.js';

export async function generateTokens(page, x, y) {
  const board = figma.createFrame();
  board.name = 'DS · Design Tokens v0.1';
  board.resize(1440, 900);
  board.x = x;
  board.y = y;
  board.fills = paint(C.background);
  board.cornerRadius = 24;
  board.layoutMode = 'VERTICAL';
  board.itemSpacing = 24;
  board.paddingLeft = 40;
  board.paddingRight = 40;
  board.paddingTop = 36;
  board.paddingBottom = 36;
  board.primaryAxisSizingMode = 'AUTO';
  board.counterAxisSizingMode = 'FIXED';
  page.appendChild(board);

  const hero = col('Hero', 8);
  hero.appendChild(txt('Nexus Ops Design Tokens', 32, 'Bold', C.ink900));
  hero.appendChild(txt('v0.1 · Slate-navy · Cyan GPS · design-system.md', 14, 'Regular', C.ink500));
  hero.appendChild(txt('Hadir. Valid. Terkontrol.', 14, 'SemiBold', C.primaryDark));
  board.appendChild(hero);

  const row1 = row('Swatches1', 12);
  TOKEN_SWATCHES.slice(0, 4).forEach(([name, color, hexv, use]) => {
    row1.appendChild(swatch(name, color, hexv, use));
  });
  board.appendChild(row1);
  const row2 = row('Swatches2', 12);
  TOKEN_SWATCHES.slice(4).forEach(([name, color, hexv, use]) => {
    row2.appendChild(swatch(name, color, hexv, use));
  });
  board.appendChild(row2);

  const type = col('Type', 10);
  type.appendChild(txt('TYPOGRAPHY · Inter', 12, 'SemiBold', C.ink500));
  type.appendChild(txt('Display — Nexus Ops', 36, 'Bold', C.ink900));
  type.appendChild(txt('Heading — Absensi hari ini', 24, 'SemiBold', C.ink900));
  type.appendChild(txt('Body — Clock-in tervalidasi wajah dan GPS.', 16, 'Regular', C.ink700));
  type.appendChild(txt('Caption — Site A · ±12m · MATCH', 13, 'Medium', C.ink500));
  board.appendChild(type);

  const comps = row('Components', 12);
  const b1 = cta('Clock-in', C.primary);
  b1.layoutAlign = 'INHERIT';
  b1.primaryAxisSizingMode = 'AUTO';
  comps.appendChild(b1);
  const b2 = secondaryCta('Riwayat');
  b2.layoutAlign = 'INHERIT';
  b2.primaryAxisSizingMode = 'AUTO';
  comps.appendChild(b2);
  const b3 = ghostCta('Batal');
  b3.layoutAlign = 'INHERIT';
  b3.primaryAxisSizingMode = 'AUTO';
  comps.appendChild(b3);
  comps.appendChild(pill('Hadir', C.successSoft, C.success));
  comps.appendChild(pill('Pending', C.warningSoft, C.warning));
  comps.appendChild(pill('GPS gagal', C.errorSoft, C.error));
  board.appendChild(comps);

  const prog = col('ProgressDemo', 8);
  stretch(prog);
  prog.appendChild(txt('Kehadiran shift (contoh)', 13, 'SemiBold', C.ink700));
  prog.appendChild(progress(84, C.primaryBright));
  board.appendChild(prog);

  return board;
}

function swatch(name, color, hexv, use) {
  const colF = col(name, 6);
  const s = figma.createRectangle();
  s.resize(120, 72);
  s.fills = paint(color);
  s.cornerRadius = R.lg;
  colF.appendChild(s);
  colF.appendChild(wrapTxt(name, 12, 'SemiBold', C.ink900));
  colF.appendChild(wrapTxt(hexv, 12, 'Medium', C.ink500));
  colF.appendChild(wrapTxt(use, 12, 'Regular', C.ink500));
  return colF;
}

export async function generateMetricsBoard(page, x, y) {
  const board = figma.createFrame();
  board.name = 'PRD · Product Metrics';
  board.resize(1440, 1100);
  board.x = x;
  board.y = y;
  board.fills = paint(C.background);
  board.cornerRadius = 24;
  board.layoutMode = 'VERTICAL';
  board.itemSpacing = 20;
  board.paddingLeft = 40;
  board.paddingRight = 40;
  board.paddingTop = 36;
  board.paddingBottom = 36;
  board.primaryAxisSizingMode = 'AUTO';
  board.counterAxisSizingMode = 'FIXED';
  page.appendChild(board);

  board.appendChild(txt('PRD — Tujuan & Metrik', 28, 'Bold', C.ink900));
  board.appendChild(wrapTxt(
    'Success metrics PRD §2. Mapping story↔screen ada di board ini saja — tidak diinjeksikan ke frame M-*/W-* agar slicing tidak terkecoh.',
    14,
    'Regular',
    C.ink500,
  ));

  const ns = card('NorthStar');
  ns.appendChild(pill(NORTH_STAR.id, C.accent, C.white));
  ns.appendChild(txt(NORTH_STAR.name, 18, 'Bold', C.ink900));
  ns.appendChild(wrapTxt(NORTH_STAR.formula, 14, 'SemiBold', C.primaryDark));
  ns.appendChild(wrapTxt(NORTH_STAR.definition, 12, 'Regular', C.ink500));
  board.appendChild(ns);

  PRODUCT_METRICS.forEach((m) => {
    const c = card(m.id);
    c.appendChild(txt(m.id + ' · ' + m.name, 16, 'Bold', C.ink900));
    c.appendChild(wrapTxt('Target: ' + m.target, 14, 'SemiBold', C.primaryBright));
    c.appendChild(wrapTxt(m.note, 12, 'Regular', C.ink500));
    board.appendChild(c);
  });

  const cov = card('Coverage');
  cov.appendChild(txt('Screen coverage', 16, 'Bold', C.ink900));
  cov.appendChild(wrapTxt('Mobile M-* : ' + MOBILE_SCREENS.length + ' · Web W-* : ' + WEB_SCREENS.length, 14, 'Regular', C.ink700));
  board.appendChild(cov);

  const mapCard = card('ScreenStoryMap');
  mapCard.appendChild(txt('Story hints per screen (planning only)', 16, 'Bold', C.ink900));
  Object.keys(SCREEN_METRIC_HINTS).sort().forEach((id) => {
    const hints = SCREEN_METRIC_HINTS[id].map((h) => h.value + ' ' + h.label).join(' · ');
    mapCard.appendChild(wrapTxt(id + ' — ' + hints, 12, 'Regular', C.ink700));
  });
  board.appendChild(mapCard);

  return board;
}
