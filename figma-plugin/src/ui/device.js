import { C, paint } from '../tokens.js';
import { box, stretch, txt, row, col } from './layout.js';

function navItem(icon, label, active) {
  const n = box('Nav/' + label, 'VERTICAL', 4, 4, 8);
  n.primaryAxisAlignItems = 'CENTER';
  n.counterAxisAlignItems = 'CENTER';
  n.layoutGrow = 1;
  n.appendChild(txt(icon, 16, 'Regular', active ? C.primary : C.ink500));
  const lab = txt(label, 11, 'SemiBold', active ? C.primary : C.ink500, { align: 'CENTER' });
  lab.textAlignHorizontal = 'CENTER';
  n.appendChild(lab);
  if (active) {
    const dot = figma.createEllipse();
    dot.resize(4, 4);
    dot.fills = paint(C.primary);
    n.appendChild(dot);
  }
  return n;
}

export function phoneShell(screenId, title, x, y) {
  const wrap = box(screenId + ' · ' + title, 'VERTICAL', 8, 0, 0);
  wrap.x = x;
  wrap.y = y;
  wrap.fills = [];
  wrap.appendChild(txt(screenId + '  ·  ' + title, 12, 'SemiBold', C.ink500));

  const phone = figma.createFrame();
  phone.name = 'Device/' + screenId;
  phone.resize(390, 100);
  phone.layoutMode = 'VERTICAL';
  phone.itemSpacing = 0;
  phone.primaryAxisSizingMode = 'AUTO';
  phone.counterAxisSizingMode = 'FIXED';
  phone.fills = paint(C.background);
  phone.cornerRadius = 36;
  phone.clipsContent = false;
  phone.strokes = paint(C.ink200);
  phone.strokeWeight = 1;
  wrap.appendChild(phone);
  return { wrap, phone };
}

export function bottomNav(active) {
  const bar = box('TabBar', 'HORIZONTAL', 0, 4, 6);
  bar.fills = paint(C.surface);
  bar.paddingBottom = 18;
  bar.counterAxisAlignItems = 'CENTER';
  bar.strokes = paint(C.ink200);
  bar.strokeWeight = 1;
  stretch(bar);
  const items = [
    ['⌂', 'Beranda'],
    ['◎', 'Absensi'],
    ['▤', 'Pengajuan'],
    ['●', 'Profil'],
  ];
  items.forEach(([icon, label]) => bar.appendChild(navItem(icon, label, label === active)));
  return bar;
}

export function statusRow(light) {
  const r = box('StatusBar', 'HORIZONTAL', 0, 20, 12);
  r.paddingTop = 14;
  r.primaryAxisAlignItems = 'SPACE_BETWEEN';
  stretch(r);
  const fg = light ? C.white : C.ink900;
  r.appendChild(txt('9:41', 13, 'SemiBold', fg));
  r.appendChild(txt('LTE  GPS', 12, 'Medium', fg));
  return r;
}

export function appHeader(title, opts) {
  const o = opts || {};
  const head = box('AppHeader', 'VERTICAL', 8, 20, 8);
  stretch(head);
  head.appendChild(statusRow(false));
  const nav = row('Nav', 12);
  stretch(nav);
  nav.primaryAxisAlignItems = 'SPACE_BETWEEN';
  nav.counterAxisAlignItems = 'CENTER';
  nav.appendChild(txt(o.back === false ? ' ' : '←', 18, 'Medium', C.ink700));
  const mid = col('Title', 2);
  mid.layoutGrow = 1;
  mid.primaryAxisAlignItems = 'CENTER';
  mid.counterAxisAlignItems = 'CENTER';
  const titleNode = txt(title, 16, 'Bold', C.ink900, { align: 'CENTER' });
  titleNode.textAlignHorizontal = 'CENTER';
  mid.appendChild(titleNode);
  if (o.subtitle) {
    const sub = txt(o.subtitle, 12, 'Regular', C.ink500, { align: 'CENTER' });
    sub.textAlignHorizontal = 'CENTER';
    mid.appendChild(sub);
  }
  nav.appendChild(mid);
  nav.appendChild(txt(o.trailing || ' ', 14, 'SemiBold', C.ink500));
  head.appendChild(nav);
  return head;
}

export function scrollBody(name) {
  const body = box(name || 'Body', 'VERTICAL', 20, 20, 16);
  stretch(body);
  return body;
}

export function footerCtas(nodes) {
  const foot = box('Footer', 'VERTICAL', 10, 20, 12);
  foot.paddingBottom = 24;
  stretch(foot);
  (nodes || []).forEach((n) => foot.appendChild(n));
  return foot;
}
