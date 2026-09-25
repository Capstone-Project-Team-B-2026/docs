import { C, paint, cardShadow } from '../tokens.js';
import { box, stretch, txt, row, col } from './layout.js';
import { pill } from './primitives.js';

const NAV = [
  'Ringkasan',
  'Kehadiran',
  'Persetujuan',
  'Laporan',
  'Karyawan',
  'Lokasi',
  'Pengaturan',
];

export function webShell(screenId, title, x, y, activeNav, chrome) {
  if (chrome === 'none') return webAuthShell(screenId, title, x, y);
  return webAppShell(screenId, title, x, y, activeNav);
}

function webAuthShell(screenId, title, x, y) {
  const wrap = box(screenId + ' · ' + title, 'VERTICAL', 8, 0, 0);
  wrap.x = x;
  wrap.y = y;
  wrap.fills = [];
  wrap.appendChild(txt(screenId + '  ·  ' + title, 12, 'SemiBold', C.ink500));

  const board = figma.createFrame();
  board.name = 'DesktopAuth/' + screenId;
  board.resize(960, 120);
  board.layoutMode = 'VERTICAL';
  board.itemSpacing = 24;
  board.primaryAxisSizingMode = 'AUTO';
  board.counterAxisSizingMode = 'FIXED';
  board.primaryAxisAlignItems = 'CENTER';
  board.counterAxisAlignItems = 'CENTER';
  board.paddingLeft = 48;
  board.paddingRight = 48;
  board.paddingTop = 40;
  board.paddingBottom = 48;
  board.fills = paint(C.background);
  board.cornerRadius = 16;
  board.clipsContent = false;
  board.strokes = paint(C.ink200);
  board.strokeWeight = 1;
  wrap.appendChild(board);

  const brand = col('Brand', 6);
  brand.primaryAxisAlignItems = 'CENTER';
  brand.counterAxisAlignItems = 'CENTER';
  brand.appendChild(txt('Nexus Ops', 28, 'Bold', C.primaryDark));
  brand.appendChild(txt('Absensi Divisi Operation', 12, 'Regular', C.ink500));
  brand.appendChild(txt('Logo: figma-plugin/assets/logo-web.png', 11, 'Regular', C.ink400));
  board.appendChild(brand);

  const panel = figma.createFrame();
  panel.name = 'AuthPanel';
  panel.resize(440, 80);
  panel.layoutMode = 'VERTICAL';
  panel.itemSpacing = 16;
  panel.paddingLeft = 28;
  panel.paddingRight = 28;
  panel.paddingTop = 28;
  panel.paddingBottom = 28;
  panel.primaryAxisSizingMode = 'AUTO';
  panel.counterAxisSizingMode = 'FIXED';
  panel.fills = paint(C.surface);
  panel.cornerRadius = 16;
  panel.effects = [cardShadow];
  panel.strokes = paint(C.ink200);
  panel.strokeWeight = 1;
  panel.appendChild(txt(title, 22, 'Bold', C.ink900));
  panel.appendChild(txt(screenId + ' · Web Dashboard', 12, 'Regular', C.ink500));

  const content = box('Content', 'VERTICAL', 16, 0, 0);
  stretch(content);
  panel.appendChild(content);
  board.appendChild(panel);

  return { wrap, board, main: panel, content, chrome: 'none' };
}

function webAppShell(screenId, title, x, y, activeNav) {
  const wrap = box(screenId + ' · ' + title, 'VERTICAL', 8, 0, 0);
  wrap.x = x;
  wrap.y = y;
  wrap.fills = [];
  wrap.appendChild(txt(screenId + '  ·  ' + title, 12, 'SemiBold', C.ink500));

  const board = figma.createFrame();
  board.name = 'Desktop/' + screenId;
  board.resize(1280, 200);
  board.layoutMode = 'HORIZONTAL';
  board.itemSpacing = 0;
  board.primaryAxisSizingMode = 'FIXED';
  board.counterAxisSizingMode = 'AUTO';
  board.fills = paint(C.background);
  board.cornerRadius = 12;
  board.clipsContent = false;
  board.strokes = paint(C.ink200);
  board.strokeWeight = 1;
  wrap.appendChild(board);

  const side = box('Sidebar', 'VERTICAL', 8, 16, 20);
  side.resize(240, 100);
  side.primaryAxisSizingMode = 'AUTO';
  side.counterAxisSizingMode = 'FIXED';
  side.fills = paint(C.primaryDark);
  side.appendChild(txt('Nexus Ops', 18, 'Bold', C.white));
  side.appendChild(txt('Operation', 11, 'Medium', C.primarySoft));
  NAV.forEach((label) => {
    const item = box('Nav/' + label, 'HORIZONTAL', 8, 12, 10);
    const active = label === activeNav;
    item.fills = paint(active ? C.primaryBright : C.primaryDark);
    item.cornerRadius = 8;
    stretch(item);
    item.appendChild(txt(label, 13, active ? 'SemiBold' : 'Regular', C.white));
    side.appendChild(item);
  });
  board.appendChild(side);

  const mainCol = box('Main', 'VERTICAL', 16, 28, 24);
  mainCol.layoutGrow = 1;
  mainCol.primaryAxisSizingMode = 'AUTO';
  mainCol.counterAxisSizingMode = 'AUTO';

  const top = row('TopBar', 12);
  stretch(top);
  top.primaryAxisAlignItems = 'SPACE_BETWEEN';
  const left = col('TitleBlock', 4);
  left.appendChild(txt(title, 22, 'Bold', C.ink900));
  left.appendChild(txt(screenId, 12, 'Regular', C.ink500));
  top.appendChild(left);
  const right = row('Actions', 8);
  right.appendChild(pill('Hari ini', C.primarySoft, C.primaryDark));
  right.appendChild(pill('Supervisor', C.accentSoft, C.accent));
  top.appendChild(right);
  mainCol.appendChild(top);

  const content = box('Content', 'VERTICAL', 16, 0, 0);
  stretch(content);
  mainCol.appendChild(content);
  board.appendChild(mainCol);

  return { wrap, board, main: mainCol, content, chrome: 'app' };
}
