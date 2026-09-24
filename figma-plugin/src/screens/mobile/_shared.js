import { C, primaryGradient, headerShadow, paint } from '../../tokens.js';
import { box, stretch, txt, wrapTxt, row, col, space, fixCollapsedText } from '../../ui/layout.js';
import {
  card, cta, ghostCta, secondaryCta, pill, progress, metricRow, listRow,
  softCard, inputField, kvRow, banner, sectionTitle,
} from '../../ui/primitives.js';
import { phoneShell, bottomNav, statusRow, appHeader, scrollBody, footerCtas } from '../../ui/device.js';

export function buildMobile(page, x, y, id, title, opts, build) {
  const o = opts || {};
  const { wrap, phone } = phoneShell(id, title, x, y);
  page.appendChild(wrap);

  if (o.header === 'brand') {
    // caller adds branded header
  } else if (o.header !== 'none') {
    phone.appendChild(appHeader(title, { subtitle: o.subtitle, trailing: o.trailing, back: o.back }));
  }

  const body = scrollBody('Body');
  phone.appendChild(body);

  // Do NOT inject planning metrics inside the device — keeps Figma frames slice-ready.
  build({ phone, body, wrap, opts: o });

  if (!o.hideNav) {
    phone.appendChild(bottomNav(o.tab || 'Beranda'));
  } else if (o.footer) {
    phone.appendChild(footerCtas(o.footer));
  }

  fixCollapsedText(wrap);
  return wrap;
}

export function brandHeader(phone, greeting, sub) {
  const header = box('Header', 'VERTICAL', 14, 20, 0);
  header.fills = primaryGradient();
  header.effects = [headerShadow];
  header.paddingBottom = 22;
  stretch(header);
  header.appendChild(statusRow(true));
  const greet = col('Greet', 4);
  greet.appendChild(wrapTxt(greeting, 22, 'Bold', C.white));
  if (sub) greet.appendChild(wrapTxt(sub, 13, 'Regular', C.white));
  header.appendChild(greet);
  phone.insertChild(0, header);
  return header;
}

export function faceFrame(label) {
  const frame = box('FaceFrame', 'VERTICAL', 12, 16, 24);
  frame.fills = paint(C.ink950);
  frame.cornerRadius = 20;
  stretch(frame);
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  const oval = figma.createEllipse();
  oval.resize(160, 200);
  oval.fills = [];
  oval.strokes = paint(C.accent);
  oval.strokeWeight = 3;
  frame.appendChild(oval);
  frame.appendChild(txt(label || 'Posisikan wajah di dalam area', 13, 'Medium', C.white));
  return frame;
}

export function gpsStrip(ok, name, accuracy) {
  const s = softCard('GPS', ok ? C.accentSoft : C.errorSoft);
  s.appendChild(txt(ok ? '● Dalam area' : '● Di luar area', 14, 'Bold', ok ? C.accent : C.error));
  s.appendChild(wrapTxt(name + ' · akurasi ±' + accuracy + 'm', 12, 'Regular', C.ink700));
  return s;
}

export {
  C, paint, box, stretch, txt, wrapTxt, row, col, space,
  card, cta, ghostCta, secondaryCta, pill, progress, metricRow, listRow,
  softCard, inputField, kvRow, banner, sectionTitle,
  phoneShell, bottomNav, statusRow, appHeader, scrollBody, footerCtas,
};
