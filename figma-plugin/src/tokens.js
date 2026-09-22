/**
 * Nexus Ops design tokens — design-system.md v0.1
 * Slate-navy primary; cyan for GPS/live; green valid attendance.
 */
export function hex(h) {
  const n = h.replace('#', '');
  return {
    r: parseInt(n.slice(0, 2), 16) / 255,
    g: parseInt(n.slice(2, 4), 16) / 255,
    b: parseInt(n.slice(4, 6), 16) / 255,
  };
}

export const C = {
  primary: hex('#0B3A5C'),
  primaryDark: hex('#072A42'),
  primaryBright: hex('#1A6FA8'),
  primarySoft: hex('#E8F2F8'),
  primarySubtle: hex('#F3F8FB'),
  onPrimary: hex('#FFFFFF'),

  accent: hex('#0E7490'),
  accentSoft: hex('#ECFEFF'),

  success: hex('#15803D'),
  successDark: hex('#166534'),
  successSoft: hex('#F0FDF4'),
  info: hex('#1D4ED8'),
  infoSoft: hex('#EFF6FF'),
  warning: hex('#B45309'),
  warningSoft: hex('#FFFBEB'),
  error: hex('#B91C1C'),
  errorSoft: hex('#FEF2F2'),

  ink950: hex('#0B1220'),
  ink900: hex('#111827'),
  ink700: hex('#374151'),
  ink500: hex('#6B7280'),
  ink400: hex('#9CA3AF'),
  ink300: hex('#D1D5DB'),
  ink200: hex('#E5E7EB'),
  ink100: hex('#F3F4F6'),
  surface: hex('#FFFFFF'),
  background: hex('#F4F7FA'),
  white: hex('#FFFFFF'),
  overlay: hex('#0B1220'),
};

export const R = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
};

export const SP = {
  page: 20,
  card: 16,
  section: 24,
  option: 12,
};

export const cardShadow = {
  type: 'DROP_SHADOW',
  color: { r: 15 / 255, g: 23 / 255, b: 42 / 255, a: 0.06 },
  offset: { x: 0, y: 2 },
  radius: 8,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL',
};

export const raisedShadow = {
  type: 'DROP_SHADOW',
  color: { r: 15 / 255, g: 23 / 255, b: 42 / 255, a: 0.1 },
  offset: { x: 0, y: 6 },
  radius: 18,
  spread: 0,
  visible: true,
  blendMode: 'NORMAL',
};

export const headerShadow = {
  type: 'DROP_SHADOW',
  color: { r: 11 / 255, g: 58 / 255, b: 92 / 255, a: 0.28 },
  offset: { x: 0, y: 8 },
  radius: 24,
  spread: -8,
  visible: true,
  blendMode: 'NORMAL',
};

export function paint(c, a) {
  const p = { type: 'SOLID', color: c };
  if (a !== undefined) p.opacity = a;
  return [p];
}

export function primaryGradient() {
  return [{
    type: 'GRADIENT_LINEAR',
    gradientTransform: [[0, 1, 0], [-1, 0, 1]],
    gradientStops: [
      { position: 0, color: { r: C.primary.r, g: C.primary.g, b: C.primary.b, a: 1 } },
      { position: 1, color: { r: C.primaryDark.r, g: C.primaryDark.g, b: C.primaryDark.b, a: 1 } },
    ],
  }];
}

export const TOKEN_SWATCHES = [
  ['primary', C.primary, '#0B3A5C', 'CTA, nav aktif'],
  ['primaryDark', C.primaryDark, '#072A42', 'Pressed / header'],
  ['primaryBright', C.primaryBright, '#1A6FA8', 'Highlight'],
  ['accent', C.accent, '#0E7490', 'GPS / live'],
  ['success', C.success, '#15803D', 'Hadir / approved'],
  ['warning', C.warning, '#B45309', 'Terlambat / pending'],
  ['error', C.error, '#B91C1C', 'Face/GPS gagal'],
  ['info', C.info, '#1D4ED8', 'Izin / info'],
];
