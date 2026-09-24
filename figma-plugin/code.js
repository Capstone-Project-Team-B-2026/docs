/* generated from src/ — do not edit */
"use strict";
(() => {
  // src/fonts.js
  var fontState = {
    family: "Inter",
    styles: { Regular: "Regular", Medium: "Medium", SemiBold: "SemiBold", Bold: "Bold" }
  };
  async function tryLoad(family, style) {
    try {
      await figma.loadFontAsync({ family, style });
      return true;
    } catch (e) {
      return false;
    }
  }
  async function loadFonts() {
    const families = ["Inter", "Roboto"];
    const wanted = ["Regular", "Medium", "SemiBold", "Bold"];
    let chosen = null;
    let available = [];
    for (const family of families) {
      const loaded = [];
      for (const style of wanted) {
        if (await tryLoad(family, style)) loaded.push(style);
      }
      if (loaded.includes("Regular")) {
        chosen = family;
        available = loaded;
        break;
      }
    }
    if (!chosen) {
      chosen = "Inter";
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      available = ["Regular"];
    }
    const pick = (preferred) => {
      if (available.includes(preferred)) return preferred;
      if (preferred === "Bold" && available.includes("SemiBold")) return "SemiBold";
      if (preferred === "SemiBold" && available.includes("Medium")) return "Medium";
      return available[0];
    };
    fontState.family = chosen;
    fontState.styles = {
      Regular: pick("Regular"),
      Medium: pick("Medium"),
      SemiBold: pick("SemiBold"),
      Bold: pick("Bold")
    };
  }

  // src/tokens.js
  function hex(h) {
    const n = h.replace("#", "");
    return {
      r: parseInt(n.slice(0, 2), 16) / 255,
      g: parseInt(n.slice(2, 4), 16) / 255,
      b: parseInt(n.slice(4, 6), 16) / 255
    };
  }
  var C = {
    primary: hex("#0B3A5C"),
    primaryDark: hex("#072A42"),
    primaryBright: hex("#1A6FA8"),
    primarySoft: hex("#E8F2F8"),
    primarySubtle: hex("#F3F8FB"),
    onPrimary: hex("#FFFFFF"),
    accent: hex("#0E7490"),
    accentSoft: hex("#ECFEFF"),
    success: hex("#15803D"),
    successDark: hex("#166534"),
    successSoft: hex("#F0FDF4"),
    info: hex("#1D4ED8"),
    infoSoft: hex("#EFF6FF"),
    warning: hex("#B45309"),
    warningSoft: hex("#FFFBEB"),
    error: hex("#B91C1C"),
    errorSoft: hex("#FEF2F2"),
    ink950: hex("#0B1220"),
    ink900: hex("#111827"),
    ink700: hex("#374151"),
    ink500: hex("#6B7280"),
    ink400: hex("#9CA3AF"),
    ink300: hex("#D1D5DB"),
    ink200: hex("#E5E7EB"),
    ink100: hex("#F3F4F6"),
    surface: hex("#FFFFFF"),
    background: hex("#F4F7FA"),
    white: hex("#FFFFFF"),
    overlay: hex("#0B1220")
  };
  var R = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    pill: 999
  };
  var cardShadow = {
    type: "DROP_SHADOW",
    color: { r: 15 / 255, g: 23 / 255, b: 42 / 255, a: 0.06 },
    offset: { x: 0, y: 2 },
    radius: 8,
    spread: 0,
    visible: true,
    blendMode: "NORMAL"
  };
  var raisedShadow = {
    type: "DROP_SHADOW",
    color: { r: 15 / 255, g: 23 / 255, b: 42 / 255, a: 0.1 },
    offset: { x: 0, y: 6 },
    radius: 18,
    spread: 0,
    visible: true,
    blendMode: "NORMAL"
  };
  var headerShadow = {
    type: "DROP_SHADOW",
    color: { r: 11 / 255, g: 58 / 255, b: 92 / 255, a: 0.28 },
    offset: { x: 0, y: 8 },
    radius: 24,
    spread: -8,
    visible: true,
    blendMode: "NORMAL"
  };
  function paint(c, a) {
    const p = { type: "SOLID", color: c };
    if (a !== void 0) p.opacity = a;
    return [p];
  }
  function primaryGradient() {
    return [{
      type: "GRADIENT_LINEAR",
      gradientTransform: [[0, 1, 0], [-1, 0, 1]],
      gradientStops: [
        { position: 0, color: { r: C.primary.r, g: C.primary.g, b: C.primary.b, a: 1 } },
        { position: 1, color: { r: C.primaryDark.r, g: C.primaryDark.g, b: C.primaryDark.b, a: 1 } }
      ]
    }];
  }
  var TOKEN_SWATCHES = [
    ["primary", C.primary, "#0B3A5C", "CTA, nav aktif"],
    ["primaryDark", C.primaryDark, "#072A42", "Pressed / header"],
    ["primaryBright", C.primaryBright, "#1A6FA8", "Highlight"],
    ["accent", C.accent, "#0E7490", "GPS / live"],
    ["success", C.success, "#15803D", "Hadir / approved"],
    ["warning", C.warning, "#B45309", "Terlambat / pending"],
    ["error", C.error, "#B91C1C", "Face/GPS gagal"],
    ["info", C.info, "#1D4ED8", "Izin / info"]
  ];

  // src/ui/layout.js
  function txt(content, size, weight, color, opts) {
    const t = figma.createText();
    t.fontName = { family: fontState.family, style: fontState.styles[weight] || fontState.styles.Regular };
    t.characters = String(content == null ? "" : content);
    t.fontSize = size;
    const lh = opts && opts.lineHeight ? opts.lineHeight : Math.round(size * 1.35);
    t.lineHeight = { unit: "PIXELS", value: lh };
    t.fills = paint(color);
    if (opts && opts.align) t.textAlignHorizontal = opts.align;
    t.textAutoResize = "WIDTH_AND_HEIGHT";
    return t;
  }
  function wrapTxt(content, size, weight, color, opts) {
    const t = txt(content, size, weight, color, opts);
    t.textAutoResize = "HEIGHT";
    t.layoutAlign = "STRETCH";
    return t;
  }
  function box(name, dir, gap, padX, padY) {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = dir;
    f.itemSpacing = gap == null ? 0 : gap;
    f.paddingLeft = padX == null ? 0 : padX;
    f.paddingRight = padX == null ? 0 : padX;
    f.paddingTop = padY === void 0 ? padX == null ? 0 : padX : padY;
    f.paddingBottom = padY === void 0 ? padX == null ? 0 : padX : padY;
    f.primaryAxisSizingMode = "AUTO";
    f.counterAxisSizingMode = "AUTO";
    f.fills = [];
    f.clipsContent = false;
    return f;
  }
  function stretch(node) {
    node.layoutAlign = "STRETCH";
  }
  function grow(node, n) {
    node.layoutGrow = n == null ? 1 : n;
  }
  function space(h) {
    const s = figma.createFrame();
    s.name = "Spacer";
    s.resize(1, h);
    s.fills = [];
    s.layoutAlign = "STRETCH";
    return s;
  }
  function row(name, gap, align) {
    const r = box(name, "HORIZONTAL", gap == null ? 8 : gap, 0, 0);
    r.counterAxisAlignItems = align || "CENTER";
    return r;
  }
  function col(name, gap) {
    return box(name, "VERTICAL", gap == null ? 8 : gap, 0, 0);
  }
  function applyFillsInTree(root) {
    if (!root || !root.findAll) return;
    const nodes = root.findAll((n) => n.type === "FRAME" || n.type === "TEXT" || n.type === "RECTANGLE" || n.type === "ELLIPSE");
    for (const n of nodes) {
      const p = n.parent;
      if (!p || p.type !== "FRAME" || !p.layoutMode || p.layoutMode === "NONE") continue;
      try {
        if (n.layoutAlign === "STRETCH" && p.layoutMode === "VERTICAL") {
          n.layoutSizingHorizontal = "FILL";
        }
        if (n.layoutGrow > 0 && p.layoutMode === "HORIZONTAL") {
          n.layoutSizingHorizontal = "FILL";
        }
        if (n.type === "TEXT" && n.textAutoResize === "HEIGHT" && n.layoutAlign === "STRETCH" && p.layoutMode === "VERTICAL") {
          n.layoutSizingHorizontal = "FILL";
        }
      } catch (e) {
      }
    }
  }
  function fixCollapsedText(root) {
    if (!root || !root.findAll) return;
    applyFillsInTree(root);
    const texts = root.findAll((n) => n.type === "TEXT");
    for (const t of texts) {
      const chars = t.characters || "";
      if (chars.length < 3) continue;
      if (t.textAutoResize !== "HEIGHT" && t.textAutoResize !== "TRUNCATE") continue;
      if (t.width > 0 && t.width < Math.max(18, (t.fontSize || 14) * 1.2)) {
        t.textAutoResize = "WIDTH_AND_HEIGHT";
        t.layoutAlign = "INHERIT";
        try {
          if ("layoutSizingHorizontal" in t) t.layoutSizingHorizontal = "HUG";
        } catch (e) {
        }
        if ("layoutGrow" in t) t.layoutGrow = 0;
      }
    }
  }

  // src/ui/primitives.js
  function pill(label, bg, fg) {
    const p = box("Badge", "HORIZONTAL", 4, 10, 6);
    p.fills = paint(bg);
    p.cornerRadius = R.pill;
    p.counterAxisAlignItems = "CENTER";
    const t = wrapTxt(label, 12, "SemiBold", fg);
    t.layoutAlign = "INHERIT";
    t.textAutoResize = "WIDTH_AND_HEIGHT";
    p.appendChild(t);
    return p;
  }
  function progress(pct, color) {
    const value = Math.max(0, Math.min(100, pct));
    const track = figma.createFrame();
    track.name = "ProgressBar";
    track.setPluginData("pct", String(value));
    track.layoutMode = "NONE";
    track.layoutAlign = "STRETCH";
    track.resize(240, 10);
    track.fills = paint(C.ink100);
    track.cornerRadius = R.pill;
    track.clipsContent = true;
    const fill = figma.createRectangle();
    fill.name = "Fill";
    fill.x = 0;
    fill.y = 0;
    fill.resize(Math.max(8, 240 * value / 100), 10);
    fill.fills = paint(color || C.primaryBright);
    fill.cornerRadius = R.pill;
    track.appendChild(fill);
    return track;
  }
  function layoutProgressBars(root) {
    const bars = root.findAll((n) => n.type === "FRAME" && n.name === "ProgressBar");
    for (const track of bars) {
      const value = Number(track.getPluginData("pct") || "0");
      const fill = track.findOne((n) => n.name === "Fill");
      if (!fill) continue;
      const w = Math.max(8, track.width * value / 100);
      fill.resize(w, track.height);
      fill.x = 0;
      fill.y = 0;
    }
  }
  function buttonLabel(label, size, weight, color) {
    const t = txt(label, size, weight, color, { align: "CENTER" });
    t.textAlignHorizontal = "CENTER";
    t.textAutoResize = "WIDTH_AND_HEIGHT";
    return t;
  }
  function cta(label, bg, fg) {
    const b = box("Button/" + label, "HORIZONTAL", 8, 16, 14);
    b.fills = paint(bg || C.primary);
    b.cornerRadius = R.md;
    b.primaryAxisAlignItems = "CENTER";
    b.counterAxisAlignItems = "CENTER";
    stretch(b);
    b.appendChild(buttonLabel(label, 15, "Bold", fg || C.onPrimary));
    return b;
  }
  function ghostCta(label) {
    const b = box("Button/" + label, "HORIZONTAL", 8, 16, 14);
    b.fills = [];
    b.strokes = paint(C.ink200);
    b.strokeWeight = 1.5;
    b.cornerRadius = R.md;
    b.primaryAxisAlignItems = "CENTER";
    b.counterAxisAlignItems = "CENTER";
    stretch(b);
    b.appendChild(buttonLabel(label, 15, "SemiBold", C.ink700));
    return b;
  }
  function secondaryCta(label) {
    const b = box("Button/" + label, "HORIZONTAL", 8, 16, 14);
    b.fills = paint(C.primarySoft);
    b.cornerRadius = R.md;
    b.primaryAxisAlignItems = "CENTER";
    b.counterAxisAlignItems = "CENTER";
    stretch(b);
    b.appendChild(buttonLabel(label, 15, "SemiBold", C.primaryDark));
    return b;
  }
  function card(name) {
    const f = box(name, "VERTICAL", 10, 16, 16);
    f.fills = paint(C.surface);
    f.cornerRadius = R.lg;
    f.effects = [cardShadow];
    f.strokes = paint(C.ink200);
    f.strokeWeight = 1;
    stretch(f);
    return f;
  }
  function softCard(name, bg) {
    const f = card(name);
    f.fills = paint(bg || C.primarySoft);
    f.strokes = [];
    f.effects = [];
    return f;
  }
  function inputField(label, placeholder, value) {
    const wrap = col("Field/" + label, 6);
    stretch(wrap);
    wrap.appendChild(txt(label, 13, "SemiBold", C.ink700));
    const field = box("Input", "HORIZONTAL", 8, 14, 14);
    field.fills = paint(C.surface);
    field.strokes = paint(C.ink200);
    field.strokeWeight = 1.5;
    field.cornerRadius = R.md;
    field.counterAxisAlignItems = "CENTER";
    stretch(field);
    const t = txt(value || placeholder || "", 15, "Regular", value ? C.ink900 : C.ink400);
    t.layoutGrow = 1;
    t.textTruncation = "ENDING";
    field.appendChild(t);
    wrap.appendChild(field);
    return wrap;
  }
  function listRow(title, meta, trailing, bg) {
    const rowF = box("ListRow", "HORIZONTAL", 12, 14, 12);
    rowF.fills = paint(bg || C.surface);
    rowF.cornerRadius = R.md;
    rowF.strokes = paint(C.ink200);
    rowF.strokeWeight = 1;
    rowF.counterAxisAlignItems = "CENTER";
    stretch(rowF);
    const info = col("Info", 2);
    grow(info);
    info.appendChild(wrapTxt(title, 14, "SemiBold", C.ink900));
    if (meta) info.appendChild(wrapTxt(meta, 12, "Regular", C.ink500));
    rowF.appendChild(info);
    if (trailing) {
      if (typeof trailing === "string") rowF.appendChild(txt(trailing, 13, "SemiBold", C.ink500));
      else rowF.appendChild(trailing);
    }
    return rowF;
  }
  function metricTile(value, label, color) {
    const s = box("Metric", "VERTICAL", 4, 14, 14);
    s.fills = paint(C.surface);
    s.cornerRadius = R.lg;
    s.effects = [cardShadow];
    s.strokes = paint(C.ink200);
    s.strokeWeight = 1;
    grow(s);
    s.appendChild(txt(String(value), 22, "Bold", color || C.ink900));
    s.appendChild(wrapTxt(label, 12, "Medium", C.ink500));
    return s;
  }
  function metricRow(items) {
    const r = row("Metrics", 10);
    stretch(r);
    items.forEach(([value, label, color]) => r.appendChild(metricTile(value, label, color)));
    return r;
  }
  function sectionTitle(title, meta) {
    const wrap = col("Section", 4);
    stretch(wrap);
    wrap.appendChild(txt(title, 18, "Bold", C.ink900));
    if (meta) wrap.appendChild(wrapTxt(meta, 13, "Regular", C.ink500));
    return wrap;
  }
  function kvRow(label, value) {
    const r = row("KV", 12);
    stretch(r);
    r.counterAxisAlignItems = "MIN";
    const lab = txt(label, 13, "Regular", C.ink500);
    lab.layoutGrow = 1;
    r.appendChild(lab);
    const val = txt(value, 13, "SemiBold", C.ink900, { align: "RIGHT" });
    val.textAlignHorizontal = "RIGHT";
    r.appendChild(val);
    return r;
  }
  function banner(text, bg, fg) {
    const b = box("Banner", "VERTICAL", 0, 12, 10);
    b.fills = paint(bg);
    b.cornerRadius = R.md;
    stretch(b);
    b.appendChild(wrapTxt(text, 12, "SemiBold", fg));
    return b;
  }

  // src/catalog/metrics.js
  var NORTH_STAR = {
    id: "NS-01",
    name: "Kehadiran tervalidasi",
    formula: "Valid clock-ins / Total clock-in attempts",
    definition: "Persentase clock-in yang lolos wajah + GPS (target draft \u2265 95%)."
  };
  var PRODUCT_METRICS = [
    { id: "ACC", name: "Accuracy clock-in", target: "\u2265 95%", note: "Wajah + GPS valid" },
    { id: "RPT", name: "Waktu rekap laporan", target: "< 5 menit", note: "Generate PDF/Excel" },
    { id: "UAT", name: "Adoption UAT", target: "\u2265 80%", note: "Skenario utama lulus" },
    { id: "NTF", name: "Latency notifikasi", target: "< 1 menit", note: "Setelah event approval" }
  ];
  var SCREEN_METRIC_HINTS = {
    "M-H01": [{ value: "ATT-04", label: "Status hari ini" }, { value: "\u22643", label: "Langkah clock-in" }],
    "M-ATT01": [{ value: "ATT-01", label: "Clock entry" }],
    "M-ATT02": [{ value: "ATT-02", label: "Face validation" }],
    "M-ATT03": [{ value: "ATT-03", label: "GPS geofence" }],
    "M-ATT04": [{ value: "ATT-05", label: "Audit fields" }],
    "M-ATT05": [{ value: "FACE", label: "Reject reason" }],
    "M-ATT06": [{ value: "GPS", label: "Reject reason" }],
    "M-LV01": [{ value: "LV-01", label: "Pengajuan" }],
    "M-LV02": [{ value: "LV-01", label: "Form leave" }],
    "M-OT02": [{ value: "OT-01", label: "Form OT" }],
    "M-N01": [{ value: "NTF-02", label: "Status approval" }],
    "W-D01": [{ value: "RPT-01", label: "Dashboard harian" }],
    "W-D02": [{ value: "ATT-06", label: "Belum absen" }],
    "W-AP02": [{ value: "LV-02", label: "Approve leave" }],
    "W-AP03": [{ value: "OT-02", label: "Approve OT" }],
    "W-R03": [{ value: "RPT-03", label: "PDF / Excel" }],
    "W-H01": [{ value: "AUTH-02", label: "Kelola akun" }]
  };

  // src/catalog/ids.js
  var MOBILE_SCREENS = [
    ["M-A01", "Splash & cek sesi", "auth"],
    ["M-A02", "Masuk", "auth"],
    ["M-A03", "Sesi berakhir", "auth"],
    ["M-H01", "Beranda", "home"],
    ["M-H02", "Detail shift", "home"],
    ["M-ATT01", "Hub absensi", "attendance"],
    ["M-ATT02", "Capture wajah", "attendance"],
    ["M-ATT03", "Validasi lokasi", "attendance"],
    ["M-ATT04", "Absensi berhasil", "attendance"],
    ["M-ATT05", "Gagal \u2014 wajah", "attendance"],
    ["M-ATT06", "Gagal \u2014 GPS", "attendance"],
    ["M-ATT07", "Riwayat absensi", "attendance"],
    ["M-ATT08", "Detail catatan", "attendance"],
    ["M-LV01", "Daftar izin/cuti", "leave"],
    ["M-LV02", "Form ajukan izin", "leave"],
    ["M-LV03", "Detail pengajuan", "leave"],
    ["M-LV04", "Pengajuan terkirim", "leave"],
    ["M-OT01", "Daftar lembur", "overtime"],
    ["M-OT02", "Form lembur", "overtime"],
    ["M-OT03", "Detail lembur", "overtime"],
    ["M-N01", "Pusat notifikasi", "notification"],
    ["M-N02", "Preferensi notifikasi", "notification"],
    ["M-P01", "Profil saya", "profile"],
    ["M-P02", "Pengaturan", "settings"],
    ["M-P03", "Enrollment wajah", "profile"],
    ["M-P04", "Bantuan", "support"]
  ];
  var WEB_SCREENS = [
    ["W-A01", "Masuk dashboard", "auth"],
    ["W-D01", "Ringkasan operasional", "dashboard"],
    ["W-D02", "Kehadiran live", "dashboard"],
    ["W-AP01", "Inbox persetujuan", "approval"],
    ["W-AP02", "Detail izin/cuti", "approval"],
    ["W-AP03", "Detail lembur", "approval"],
    ["W-T01", "Daftar kehadiran", "team"],
    ["W-T02", "Detail karyawan", "team"],
    ["W-R01", "Hub laporan", "report"],
    ["W-R02", "Filter laporan", "report"],
    ["W-R03", "Preview & unduh", "report"],
    ["W-H01", "Manajemen pengguna", "hrd"],
    ["W-H02", "Form pengguna", "hrd"],
    ["W-H03", "Lokasi & geofence", "hrd"],
    ["W-H04", "Form lokasi", "hrd"],
    ["W-H05", "Log audit", "hrd"],
    ["W-S01", "Pengaturan organisasi", "settings"],
    ["W-S02", "Notifikasi sistem", "settings"]
  ];
  var ALL_SCREEN_IDS = [...MOBILE_SCREENS, ...WEB_SCREENS].map((r) => r[0]);

  // src/screens/tokens-board.js
  async function generateTokens(page, x, y) {
    const board = figma.createFrame();
    board.name = "DS \xB7 Design Tokens v0.1";
    board.resize(1440, 900);
    board.x = x;
    board.y = y;
    board.fills = paint(C.background);
    board.cornerRadius = 24;
    board.layoutMode = "VERTICAL";
    board.itemSpacing = 24;
    board.paddingLeft = 40;
    board.paddingRight = 40;
    board.paddingTop = 36;
    board.paddingBottom = 36;
    board.primaryAxisSizingMode = "AUTO";
    board.counterAxisSizingMode = "FIXED";
    page.appendChild(board);
    const hero = col("Hero", 8);
    hero.appendChild(txt("Nexus Ops Design Tokens", 32, "Bold", C.ink900));
    hero.appendChild(txt("v0.1 \xB7 Slate-navy \xB7 Cyan GPS \xB7 design-system.md", 14, "Regular", C.ink500));
    hero.appendChild(txt("Hadir. Valid. Terkontrol.", 14, "SemiBold", C.primaryDark));
    board.appendChild(hero);
    const row1 = row("Swatches1", 12);
    TOKEN_SWATCHES.slice(0, 4).forEach(([name, color, hexv, use]) => {
      row1.appendChild(swatch(name, color, hexv, use));
    });
    board.appendChild(row1);
    const row2 = row("Swatches2", 12);
    TOKEN_SWATCHES.slice(4).forEach(([name, color, hexv, use]) => {
      row2.appendChild(swatch(name, color, hexv, use));
    });
    board.appendChild(row2);
    const type = col("Type", 10);
    type.appendChild(txt("TYPOGRAPHY \xB7 Inter", 12, "SemiBold", C.ink500));
    type.appendChild(txt("Display \u2014 Nexus Ops", 36, "Bold", C.ink900));
    type.appendChild(txt("Heading \u2014 Absensi hari ini", 24, "SemiBold", C.ink900));
    type.appendChild(txt("Body \u2014 Clock-in tervalidasi wajah dan GPS.", 16, "Regular", C.ink700));
    type.appendChild(txt("Caption \u2014 Site A \xB7 \xB112m \xB7 MATCH", 13, "Medium", C.ink500));
    board.appendChild(type);
    const comps = row("Components", 12);
    const b1 = cta("Clock-in", C.primary);
    b1.layoutAlign = "INHERIT";
    b1.primaryAxisSizingMode = "AUTO";
    comps.appendChild(b1);
    const b2 = secondaryCta("Riwayat");
    b2.layoutAlign = "INHERIT";
    b2.primaryAxisSizingMode = "AUTO";
    comps.appendChild(b2);
    const b3 = ghostCta("Batal");
    b3.layoutAlign = "INHERIT";
    b3.primaryAxisSizingMode = "AUTO";
    comps.appendChild(b3);
    comps.appendChild(pill("Hadir", C.successSoft, C.success));
    comps.appendChild(pill("Pending", C.warningSoft, C.warning));
    comps.appendChild(pill("GPS gagal", C.errorSoft, C.error));
    board.appendChild(comps);
    const prog = col("ProgressDemo", 8);
    stretch(prog);
    prog.appendChild(txt("Kehadiran shift (contoh)", 13, "SemiBold", C.ink700));
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
    colF.appendChild(wrapTxt(name, 12, "SemiBold", C.ink900));
    colF.appendChild(wrapTxt(hexv, 12, "Medium", C.ink500));
    colF.appendChild(wrapTxt(use, 12, "Regular", C.ink500));
    return colF;
  }
  async function generateMetricsBoard(page, x, y) {
    const board = figma.createFrame();
    board.name = "PRD \xB7 Product Metrics";
    board.resize(1440, 1100);
    board.x = x;
    board.y = y;
    board.fills = paint(C.background);
    board.cornerRadius = 24;
    board.layoutMode = "VERTICAL";
    board.itemSpacing = 20;
    board.paddingLeft = 40;
    board.paddingRight = 40;
    board.paddingTop = 36;
    board.paddingBottom = 36;
    board.primaryAxisSizingMode = "AUTO";
    board.counterAxisSizingMode = "FIXED";
    page.appendChild(board);
    board.appendChild(txt("PRD \u2014 Tujuan & Metrik", 28, "Bold", C.ink900));
    board.appendChild(wrapTxt(
      "Success metrics PRD \xA72. Mapping story\u2194screen ada di board ini saja \u2014 tidak diinjeksikan ke frame M-*/W-* agar slicing tidak terkecoh.",
      14,
      "Regular",
      C.ink500
    ));
    const ns = card("NorthStar");
    ns.appendChild(pill(NORTH_STAR.id, C.accent, C.white));
    ns.appendChild(txt(NORTH_STAR.name, 18, "Bold", C.ink900));
    ns.appendChild(wrapTxt(NORTH_STAR.formula, 14, "SemiBold", C.primaryDark));
    ns.appendChild(wrapTxt(NORTH_STAR.definition, 12, "Regular", C.ink500));
    board.appendChild(ns);
    PRODUCT_METRICS.forEach((m) => {
      const c = card(m.id);
      c.appendChild(txt(m.id + " \xB7 " + m.name, 16, "Bold", C.ink900));
      c.appendChild(wrapTxt("Target: " + m.target, 14, "SemiBold", C.primaryBright));
      c.appendChild(wrapTxt(m.note, 12, "Regular", C.ink500));
      board.appendChild(c);
    });
    const cov = card("Coverage");
    cov.appendChild(txt("Screen coverage", 16, "Bold", C.ink900));
    cov.appendChild(wrapTxt("Mobile M-* : " + MOBILE_SCREENS.length + " \xB7 Web W-* : " + WEB_SCREENS.length, 14, "Regular", C.ink700));
    board.appendChild(cov);
    const mapCard = card("ScreenStoryMap");
    mapCard.appendChild(txt("Story hints per screen (planning only)", 16, "Bold", C.ink900));
    Object.keys(SCREEN_METRIC_HINTS).sort().forEach((id) => {
      const hints = SCREEN_METRIC_HINTS[id].map((h) => h.value + " " + h.label).join(" \xB7 ");
      mapCard.appendChild(wrapTxt(id + " \u2014 " + hints, 12, "Regular", C.ink700));
    });
    board.appendChild(mapCard);
    return board;
  }

  // src/ui/device.js
  function navItem(icon, label, active) {
    const n = box("Nav/" + label, "VERTICAL", 4, 4, 8);
    n.primaryAxisAlignItems = "CENTER";
    n.counterAxisAlignItems = "CENTER";
    n.layoutGrow = 1;
    n.appendChild(txt(icon, 16, "Regular", active ? C.primary : C.ink500));
    const lab = txt(label, 11, "SemiBold", active ? C.primary : C.ink500, { align: "CENTER" });
    lab.textAlignHorizontal = "CENTER";
    n.appendChild(lab);
    if (active) {
      const dot = figma.createEllipse();
      dot.resize(4, 4);
      dot.fills = paint(C.primary);
      n.appendChild(dot);
    }
    return n;
  }
  function phoneShell(screenId, title, x, y) {
    const wrap = box(screenId + " \xB7 " + title, "VERTICAL", 8, 0, 0);
    wrap.x = x;
    wrap.y = y;
    wrap.fills = [];
    wrap.appendChild(txt(screenId + "  \xB7  " + title, 12, "SemiBold", C.ink500));
    const phone = figma.createFrame();
    phone.name = "Device/" + screenId;
    phone.resize(390, 100);
    phone.layoutMode = "VERTICAL";
    phone.itemSpacing = 0;
    phone.primaryAxisSizingMode = "AUTO";
    phone.counterAxisSizingMode = "FIXED";
    phone.fills = paint(C.background);
    phone.cornerRadius = 36;
    phone.clipsContent = false;
    phone.strokes = paint(C.ink200);
    phone.strokeWeight = 1;
    wrap.appendChild(phone);
    return { wrap, phone };
  }
  function bottomNav(active) {
    const bar = box("TabBar", "HORIZONTAL", 0, 4, 6);
    bar.fills = paint(C.surface);
    bar.paddingBottom = 18;
    bar.counterAxisAlignItems = "CENTER";
    bar.strokes = paint(C.ink200);
    bar.strokeWeight = 1;
    stretch(bar);
    const items = [
      ["\u2302", "Beranda"],
      ["\u25CE", "Absensi"],
      ["\u25A4", "Pengajuan"],
      ["\u25CF", "Profil"]
    ];
    items.forEach(([icon, label]) => bar.appendChild(navItem(icon, label, label === active)));
    return bar;
  }
  function statusRow(light) {
    const r = box("StatusBar", "HORIZONTAL", 0, 20, 12);
    r.paddingTop = 14;
    r.primaryAxisAlignItems = "SPACE_BETWEEN";
    stretch(r);
    const fg = light ? C.white : C.ink900;
    r.appendChild(txt("9:41", 13, "SemiBold", fg));
    r.appendChild(txt("LTE  GPS", 12, "Medium", fg));
    return r;
  }
  function appHeader(title, opts) {
    const o = opts || {};
    const head = box("AppHeader", "VERTICAL", 8, 20, 8);
    stretch(head);
    head.appendChild(statusRow(false));
    const nav = row("Nav", 12);
    stretch(nav);
    nav.primaryAxisAlignItems = "SPACE_BETWEEN";
    nav.counterAxisAlignItems = "CENTER";
    nav.appendChild(txt(o.back === false ? " " : "\u2190", 18, "Medium", C.ink700));
    const mid = col("Title", 2);
    mid.layoutGrow = 1;
    mid.primaryAxisAlignItems = "CENTER";
    mid.counterAxisAlignItems = "CENTER";
    const titleNode = txt(title, 16, "Bold", C.ink900, { align: "CENTER" });
    titleNode.textAlignHorizontal = "CENTER";
    mid.appendChild(titleNode);
    if (o.subtitle) {
      const sub = txt(o.subtitle, 12, "Regular", C.ink500, { align: "CENTER" });
      sub.textAlignHorizontal = "CENTER";
      mid.appendChild(sub);
    }
    nav.appendChild(mid);
    nav.appendChild(txt(o.trailing || " ", 14, "SemiBold", C.ink500));
    head.appendChild(nav);
    return head;
  }
  function scrollBody(name) {
    const body = box(name || "Body", "VERTICAL", 20, 20, 16);
    stretch(body);
    return body;
  }
  function footerCtas(nodes) {
    const foot = box("Footer", "VERTICAL", 10, 20, 12);
    foot.paddingBottom = 24;
    stretch(foot);
    (nodes || []).forEach((n) => foot.appendChild(n));
    return foot;
  }

  // src/screens/mobile/_shared.js
  function buildMobile(page, x, y, id, title, opts, build) {
    const o = opts || {};
    const { wrap, phone } = phoneShell(id, title, x, y);
    page.appendChild(wrap);
    if (o.header === "brand") {
    } else if (o.header !== "none") {
      phone.appendChild(appHeader(title, { subtitle: o.subtitle, trailing: o.trailing, back: o.back }));
    }
    const body = scrollBody("Body");
    phone.appendChild(body);
    build({ phone, body, wrap, opts: o });
    if (!o.hideNav) {
      phone.appendChild(bottomNav(o.tab || "Beranda"));
    } else if (o.footer) {
      phone.appendChild(footerCtas(o.footer));
    }
    fixCollapsedText(wrap);
    return wrap;
  }
  function brandHeader(phone, greeting, sub) {
    const header = box("Header", "VERTICAL", 14, 20, 0);
    header.fills = primaryGradient();
    header.effects = [headerShadow];
    header.paddingBottom = 22;
    stretch(header);
    header.appendChild(statusRow(true));
    const greet = col("Greet", 4);
    greet.appendChild(wrapTxt(greeting, 22, "Bold", C.white));
    if (sub) greet.appendChild(wrapTxt(sub, 13, "Regular", C.white));
    header.appendChild(greet);
    phone.insertChild(0, header);
    return header;
  }
  function faceFrame(label) {
    const frame = box("FaceFrame", "VERTICAL", 12, 16, 24);
    frame.fills = paint(C.ink950);
    frame.cornerRadius = 20;
    stretch(frame);
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    const oval = figma.createEllipse();
    oval.resize(160, 200);
    oval.fills = [];
    oval.strokes = paint(C.accent);
    oval.strokeWeight = 3;
    frame.appendChild(oval);
    frame.appendChild(txt(label || "Posisikan wajah di dalam area", 13, "Medium", C.white));
    return frame;
  }
  function gpsStrip(ok, name, accuracy) {
    const s = softCard("GPS", ok ? C.accentSoft : C.errorSoft);
    s.appendChild(txt(ok ? "\u25CF Dalam area" : "\u25CF Di luar area", 14, "Bold", ok ? C.accent : C.error));
    s.appendChild(wrapTxt(name + " \xB7 akurasi \xB1" + accuracy + "m", 12, "Regular", C.ink700));
    return s;
  }

  // src/screens/mobile/auth-attendance-leave.js
  function last(node) {
    return node.children[node.children.length - 1];
  }
  function generateMobileAuthHome(page, positions) {
    const put = (id, title, opts, fn) => {
      const wrap = buildMobile(page, 0, 0, id, title, opts, fn);
      positions.placeMobile(wrap);
      return wrap;
    };
    put("M-A01", "Splash", { hideNav: true, header: "none" }, ({ phone, body }) => {
      phone.fills = paint(C.primary);
      body.primaryAxisAlignItems = "CENTER";
      body.counterAxisAlignItems = "CENTER";
      body.appendChild(txt("Nexus Ops", 32, "Bold", C.white));
      body.appendChild(txt("Hadir. Valid. Terkontrol.", 14, "Regular", C.white));
      body.appendChild(space(24));
      body.appendChild(txt("Memeriksa sesi\u2026", 13, "Medium", C.primarySoft));
    });
    put("M-A02", "Masuk", { hideNav: true }, ({ body }) => {
      body.appendChild(sectionTitle("Masuk ke Nexus Ops", "Karyawan Divisi Operation"));
      body.appendChild(inputField("Email / NIP", "nip@perusahaan.com"));
      body.appendChild(inputField("Kata sandi", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"));
      body.appendChild(cta("Masuk", C.primary));
      body.appendChild(wrapTxt("Lupa sandi? Hubungi HRD untuk reset akun.", 12, "Regular", C.ink500));
    });
    put("M-A03", "Sesi berakhir", { hideNav: true }, ({ body }) => {
      body.appendChild(banner("Sesi berakhir demi keamanan. Silakan masuk lagi.", C.warningSoft, C.warning));
      body.appendChild(cta("Masuk kembali", C.primary));
    });
    put("M-H01", "Beranda", { tab: "Beranda", header: "none" }, ({ phone, body }) => {
      brandHeader(phone, "Selamat pagi, Budi", "Shift Pagi \xB7 Site A \xB7 Senin 22 Sep");
      body.appendChild(softCard("Today", C.successSoft));
      last(body).appendChild(txt("Belum clock-in", 14, "Bold", C.successDark || C.success));
      last(body).appendChild(wrapTxt("Jam masuk target 07:30 \xB7 Geofence Site A aktif", 12, "Regular", C.ink700));
      body.appendChild(cta("Clock-in sekarang", C.primary));
      body.appendChild(sectionTitle("Pengajuan", "Menunggu tindakan"));
      body.appendChild(listRow("Izin sakit", "22\u201323 Sep \xB7 Pending", pill("Pending", C.warningSoft, C.warning)));
      body.appendChild(listRow("Lembur", "Kemarin 2 jam \xB7 Disetujui", pill("OK", C.successSoft, C.success)));
    });
    put("M-H02", "Detail shift", { tab: "Beranda" }, ({ body }) => {
      body.appendChild(sectionTitle("Shift Pagi", "Senin\u2013Jumat"));
      body.appendChild(kvRow("Jam kerja", "07:30 \u2013 16:30"));
      body.appendChild(kvRow("Lokasi default", "Site A \u2014 Gudang"));
      body.appendChild(kvRow("Supervisor", "Andi Pratama"));
      body.appendChild(kvRow("Radius geofence", "100 m (default org)"));
      body.appendChild(kvRow("Grace terlambat", "15 menit"));
    });
  }
  function generateMobileAttendance(page, positions) {
    const put = (id, title, opts, fn) => {
      const wrap = buildMobile(page, 0, 0, id, title, opts, fn);
      positions.placeMobile(wrap);
      return wrap;
    };
    put("M-ATT01", "Hub absensi", { tab: "Absensi" }, ({ body }) => {
      body.appendChild(sectionTitle("Absensi hari ini", "Sudah clock-in \xB7 lanjut clock-out (wajah + GPS)"));
      body.appendChild(metricRow([
        ["07:28", "Masuk", C.success],
        ["\u2014", "Keluar", C.ink500]
      ]));
      body.appendChild(cta("Clock-out", C.primary));
      body.appendChild(wrapTxt("Clock-in dinonaktifkan sampai clock-out / hari berikutnya.", 12, "Regular", C.ink500));
      body.appendChild(ghostCta("Lihat riwayat"));
    });
    put("M-ATT02", "Capture wajah", { hideNav: true }, ({ body }) => {
      body.appendChild(sectionTitle("Verifikasi wajah", "Pastikan pencahayaan cukup"));
      body.appendChild(faceFrame("Tahan diam\u2026"));
      body.appendChild(cta("Ambil foto", C.primary));
      body.appendChild(ghostCta("Batal"));
    });
    put("M-ATT03", "Validasi lokasi", { hideNav: true }, ({ body }) => {
      body.appendChild(sectionTitle("Cek lokasi", "Memastikan Anda di area kerja"));
      body.appendChild(gpsStrip(true, "Site A \u2014 Gudang", 12));
      body.appendChild(softCard("MapHint", C.primarySubtle));
      last(body).appendChild(wrapTxt("Peta / pin lokasi (placeholder). Server memvalidasi radius geofence.", 12, "Regular", C.ink700));
      body.appendChild(cta("Lanjut validasi", C.primary));
    });
    put("M-ATT04", "Absensi berhasil", { hideNav: true }, ({ body }) => {
      body.appendChild(banner("Absensi tersimpan", C.successSoft, C.success));
      body.appendChild(sectionTitle("07:28 WIB", "Senin, 22 Sep 2026"));
      body.appendChild(kvRow("Jenis", "Clock-in"));
      body.appendChild(kvRow("Wajah", "Cocok"));
      body.appendChild(kvRow("GPS", "Dalam area \xB7 \xB112m"));
      body.appendChild(kvRow("Lokasi", "Site A"));
      body.appendChild(wrapTxt("Frame yang sama dipakai untuk clock-out (ganti Jenis + jam).", 12, "Regular", C.ink500));
      body.appendChild(cta("Kembali ke beranda", C.primary));
    });
    put("M-ATT05", "Gagal wajah", { hideNav: true }, ({ body }) => {
      body.appendChild(banner("Wajah tidak cocok \xB7 FACE_MISMATCH", C.errorSoft, C.error));
      body.appendChild(wrapTxt("Pastikan wajah menghadap kamera dan tidak tertutup. Hubungi HRD jika enrollment perlu diperbarui.", 13, "Regular", C.ink700));
      body.appendChild(cta("Coba lagi", C.primary));
      body.appendChild(ghostCta("Batal"));
    });
    put("M-ATT06", "Gagal GPS", { hideNav: true }, ({ body }) => {
      body.appendChild(banner("Di luar area \xB7 OUT_OF_GEOFENCE", C.errorSoft, C.error));
      body.appendChild(gpsStrip(false, "Site A \u2014 Gudang", 48));
      body.appendChild(cta("Coba lagi", C.primary));
      body.appendChild(ghostCta("Batal"));
    });
    put("M-ATT07", "Riwayat absensi", { tab: "Absensi" }, ({ body }) => {
      body.appendChild(sectionTitle("September 2026", "Filter: semua status"));
      [
        ["Sen 22", "07:28 \u2013 \u2014", "Hadir"],
        ["Jum 19", "07:41 \u2013 16:32", "Terlambat"],
        ["Kam 18", "Izin sakit", "Izin"]
      ].forEach(([d, m, s]) => {
        const color = s === "Hadir" ? C.success : s === "Terlambat" ? C.warning : C.info;
        const bg = s === "Hadir" ? C.successSoft : s === "Terlambat" ? C.warningSoft : C.infoSoft;
        body.appendChild(listRow(d, m, pill(s, bg, color)));
      });
    });
    put("M-ATT08", "Detail catatan", { tab: "Absensi" }, ({ body }) => {
      body.appendChild(sectionTitle("Clock-in", "22 Sep 2026 \xB7 07:28"));
      body.appendChild(kvRow("Karyawan", "Budi Santoso"));
      body.appendChild(kvRow("Face result", "MATCH"));
      body.appendChild(kvRow("GPS result", "IN_GEOFENCE"));
      body.appendChild(kvRow("Lat / Lng", "-6.200 \xB7 106.816"));
      body.appendChild(kvRow("Akurasi", "12 m"));
    });
  }
  function generateMobileLeaveOtProfile(page, positions) {
    const put = (id, title, opts, fn) => {
      const wrap = buildMobile(page, 0, 0, id, title, opts, fn);
      positions.placeMobile(wrap);
      return wrap;
    };
    put("M-LV01", "Daftar izin/cuti", { tab: "Pengajuan" }, ({ body }) => {
      body.appendChild(sectionTitle("Pengajuan", "Segment Izin | Lembur (satu tab)"));
      const seg = softCard("Segment", C.primarySubtle);
      seg.appendChild(txt("\u25CF Izin/Cuti     \u25CB Lembur", 13, "SemiBold", C.primaryDark));
      body.appendChild(seg);
      body.appendChild(cta("Ajukan baru", C.primary));
      body.appendChild(listRow("Sakit", "22\u201323 Sep", pill("Pending", C.warningSoft, C.warning)));
      body.appendChild(listRow("Cuti", "1\u20135 Agu", pill("Disetujui", C.successSoft, C.success)));
      body.appendChild(listRow("Izin lain", "12 Jul", pill("Ditolak", C.errorSoft, C.error)));
    });
    put("M-LV02", "Form ajukan izin", { tab: "Pengajuan", hideNav: true }, ({ body }) => {
      body.appendChild(inputField("Jenis", "Sakit / Cuti / Izin lain", "Sakit"));
      body.appendChild(inputField("Tanggal mulai", "YYYY-MM-DD", "2026-09-22"));
      body.appendChild(inputField("Tanggal selesai", "YYYY-MM-DD", "2026-09-23"));
      body.appendChild(inputField("Keterangan", "Alasan singkat"));
      body.appendChild(cta("Kirim pengajuan", C.primary));
      body.appendChild(ghostCta("Batal"));
    });
    put("M-LV03", "Detail pengajuan", { tab: "Pengajuan" }, ({ body }) => {
      body.appendChild(pill("Pending", C.warningSoft, C.warning));
      body.appendChild(sectionTitle("Sakit", "22\u201323 Sep 2026"));
      body.appendChild(kvRow("Diajukan", "21 Sep \xB7 18:02"));
      body.appendChild(kvRow("Supervisor", "Andi Pratama"));
      body.appendChild(wrapTxt("Demam, istirahat di rumah.", 14, "Regular", C.ink700));
      body.appendChild(ghostCta("Batalkan pengajuan"));
    });
    put("M-LV04", "Pengajuan terkirim", { hideNav: true }, ({ body }) => {
      body.appendChild(banner("Pengajuan terkirim. Supervisor mendapat notifikasi.", C.successSoft, C.success));
      body.appendChild(cta("Lihat status", C.primary));
      body.appendChild(ghostCta("Kembali"));
    });
    put("M-OT01", "Daftar lembur", { tab: "Pengajuan" }, ({ body }) => {
      body.appendChild(sectionTitle("Lembur", "Terintegrasi data kehadiran"));
      body.appendChild(cta("Ajukan lembur", C.primary));
      body.appendChild(listRow("19 Sep", "2.0 jam", pill("Disetujui", C.successSoft, C.success)));
      body.appendChild(listRow("12 Sep", "1.5 jam", pill("Pending", C.warningSoft, C.warning)));
    });
    put("M-OT02", "Form lembur", { hideNav: true, tab: "Pengajuan" }, ({ body }) => {
      body.appendChild(inputField("Tanggal", "YYYY-MM-DD", "2026-09-22"));
      body.appendChild(inputField("Jam mulai", "16:30"));
      body.appendChild(inputField("Jam selesai", "18:30"));
      body.appendChild(wrapTxt("Maksimal 4 jam per pengajuan.", 12, "Regular", C.ink500));
      body.appendChild(inputField("Keterangan", "Penyelesaian loading"));
      body.appendChild(cta("Kirim", C.primary));
    });
    put("M-OT03", "Detail lembur", { tab: "Pengajuan" }, ({ body }) => {
      body.appendChild(pill("Disetujui", C.successSoft, C.success));
      body.appendChild(kvRow("Durasi", "2.0 jam"));
      body.appendChild(kvRow("Approver", "Andi Pratama"));
      body.appendChild(kvRow("Waktu approve", "19 Sep \xB7 20:11"));
    });
    put("M-N01", "Pusat notifikasi", { tab: "Beranda", hideNav: false }, ({ body }) => {
      body.appendChild(listRow("Izin disetujui", "Cuti 1\u20135 Agu \xB7 baru saja", "\u203A"));
      body.appendChild(listRow("Pengingat clock-in", "Shift mulai 07:30", "\u203A"));
      body.appendChild(listRow("Lembur ditolak", "Alasan: melebihi 4 jam", "\u203A"));
    });
    put("M-N02", "Preferensi notifikasi", { tab: "Profil" }, ({ body }) => {
      body.appendChild(listRow("Pengingat absensi", "Sebelum shift", "On"));
      body.appendChild(listRow("Status approval", "Push segera", "On"));
      body.appendChild(listRow("Quiet hours", "21.00\u201306.00", "Off"));
    });
    put("M-P01", "Profil saya", { tab: "Profil" }, ({ body }) => {
      body.appendChild(sectionTitle("Budi Santoso", "NIP 104892 \xB7 Karyawan"));
      body.appendChild(kvRow("Supervisor", "Andi Pratama"));
      body.appendChild(kvRow("Lokasi default", "Site A"));
      body.appendChild(listRow("Enrollment wajah", "Terdaftar", "\u203A"));
      body.appendChild(listRow("Pengaturan", "", "\u203A"));
      body.appendChild(listRow("Bantuan", "", "\u203A"));
    });
    put("M-P02", "Pengaturan", { tab: "Profil" }, ({ body }) => {
      body.appendChild(listRow("Ubah kata sandi", "", "\u203A"));
      body.appendChild(listRow("Bahasa", "Indonesia", "\u203A"));
      body.appendChild(ghostCta("Keluar"));
    });
    put("M-P03", "Enrollment wajah", { tab: "Profil", hideNav: true }, ({ body }) => {
      body.appendChild(sectionTitle("Daftarkan wajah", "Dipakai untuk verifikasi absensi"));
      body.appendChild(faceFrame("Ambil 3 foto jelas"));
      body.appendChild(cta("Simpan template", C.primary));
    });
    put("M-P04", "Bantuan", { tab: "Profil" }, ({ body }) => {
      body.appendChild(sectionTitle("Bantuan", "Hubungi HRD Divisi Operation"));
      body.appendChild(listRow("FAQ absensi", "Face & GPS", "\u203A"));
      body.appendChild(listRow("Kontak HRD", "hrd-ops@perusahaan.com", "\u203A"));
      body.appendChild(card("Version"));
      last(body).appendChild(txt("Nexus Ops Mobile \xB7 0.1.0", 12, "Regular", C.ink500));
    });
  }

  // src/ui/web-shell.js
  var NAV = [
    "Ringkasan",
    "Kehadiran",
    "Persetujuan",
    "Laporan",
    "Karyawan",
    "Lokasi",
    "Pengaturan"
  ];
  function webShell(screenId, title, x, y, activeNav, chrome) {
    if (chrome === "none") return webAuthShell(screenId, title, x, y);
    return webAppShell(screenId, title, x, y, activeNav);
  }
  function webAuthShell(screenId, title, x, y) {
    const wrap = box(screenId + " \xB7 " + title, "VERTICAL", 8, 0, 0);
    wrap.x = x;
    wrap.y = y;
    wrap.fills = [];
    wrap.appendChild(txt(screenId + "  \xB7  " + title, 12, "SemiBold", C.ink500));
    const board = figma.createFrame();
    board.name = "DesktopAuth/" + screenId;
    board.resize(960, 120);
    board.layoutMode = "VERTICAL";
    board.itemSpacing = 24;
    board.primaryAxisSizingMode = "AUTO";
    board.counterAxisSizingMode = "FIXED";
    board.primaryAxisAlignItems = "CENTER";
    board.counterAxisAlignItems = "CENTER";
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
    const brand = col("Brand", 6);
    brand.primaryAxisAlignItems = "CENTER";
    brand.counterAxisAlignItems = "CENTER";
    brand.appendChild(txt("Nexus Ops", 28, "Bold", C.primaryDark));
    brand.appendChild(txt("Absensi Divisi Operation", 12, "Regular", C.ink500));
    board.appendChild(brand);
    const panel = figma.createFrame();
    panel.name = "AuthPanel";
    panel.resize(440, 80);
    panel.layoutMode = "VERTICAL";
    panel.itemSpacing = 16;
    panel.paddingLeft = 28;
    panel.paddingRight = 28;
    panel.paddingTop = 28;
    panel.paddingBottom = 28;
    panel.primaryAxisSizingMode = "AUTO";
    panel.counterAxisSizingMode = "FIXED";
    panel.fills = paint(C.surface);
    panel.cornerRadius = 16;
    panel.effects = [cardShadow];
    panel.strokes = paint(C.ink200);
    panel.strokeWeight = 1;
    panel.appendChild(txt(title, 22, "Bold", C.ink900));
    panel.appendChild(txt(screenId + " \xB7 Web Dashboard", 12, "Regular", C.ink500));
    const content = box("Content", "VERTICAL", 16, 0, 0);
    stretch(content);
    panel.appendChild(content);
    board.appendChild(panel);
    return { wrap, board, main: panel, content, chrome: "none" };
  }
  function webAppShell(screenId, title, x, y, activeNav) {
    const wrap = box(screenId + " \xB7 " + title, "VERTICAL", 8, 0, 0);
    wrap.x = x;
    wrap.y = y;
    wrap.fills = [];
    wrap.appendChild(txt(screenId + "  \xB7  " + title, 12, "SemiBold", C.ink500));
    const board = figma.createFrame();
    board.name = "Desktop/" + screenId;
    board.resize(1280, 200);
    board.layoutMode = "HORIZONTAL";
    board.itemSpacing = 0;
    board.primaryAxisSizingMode = "FIXED";
    board.counterAxisSizingMode = "AUTO";
    board.fills = paint(C.background);
    board.cornerRadius = 12;
    board.clipsContent = false;
    board.strokes = paint(C.ink200);
    board.strokeWeight = 1;
    wrap.appendChild(board);
    const side = box("Sidebar", "VERTICAL", 8, 16, 20);
    side.resize(240, 100);
    side.primaryAxisSizingMode = "AUTO";
    side.counterAxisSizingMode = "FIXED";
    side.fills = paint(C.primaryDark);
    side.appendChild(txt("Nexus Ops", 18, "Bold", C.white));
    side.appendChild(txt("Operation", 11, "Medium", C.primarySoft));
    NAV.forEach((label) => {
      const item = box("Nav/" + label, "HORIZONTAL", 8, 12, 10);
      const active = label === activeNav;
      item.fills = paint(active ? C.primaryBright : C.primaryDark);
      item.cornerRadius = 8;
      stretch(item);
      item.appendChild(txt(label, 13, active ? "SemiBold" : "Regular", C.white));
      side.appendChild(item);
    });
    board.appendChild(side);
    const mainCol = box("Main", "VERTICAL", 16, 28, 24);
    mainCol.layoutGrow = 1;
    mainCol.primaryAxisSizingMode = "AUTO";
    mainCol.counterAxisSizingMode = "AUTO";
    const top = row("TopBar", 12);
    stretch(top);
    top.primaryAxisAlignItems = "SPACE_BETWEEN";
    const left = col("TitleBlock", 4);
    left.appendChild(txt(title, 22, "Bold", C.ink900));
    left.appendChild(txt(screenId, 12, "Regular", C.ink500));
    top.appendChild(left);
    const right = row("Actions", 8);
    right.appendChild(pill("Hari ini", C.primarySoft, C.primaryDark));
    right.appendChild(pill("Supervisor", C.accentSoft, C.accent));
    top.appendChild(right);
    mainCol.appendChild(top);
    const content = box("Content", "VERTICAL", 16, 0, 0);
    stretch(content);
    mainCol.appendChild(content);
    board.appendChild(mainCol);
    return { wrap, board, main: mainCol, content, chrome: "app" };
  }

  // src/screens/web/dashboard-admin.js
  function last2(node) {
    return node.children[node.children.length - 1];
  }
  function buildWeb(page, id, title, activeNav, chrome, build) {
    const { wrap, content } = webShell(id, title, 0, 0, activeNav, chrome);
    page.appendChild(wrap);
    build({ content, wrap });
    fixCollapsedText(wrap);
    return wrap;
  }
  function generateWebAll(page, positions) {
    const put = (id, title, nav, chrome, fn) => {
      const wrap = buildWeb(page, id, title, nav, chrome, fn);
      positions.placeWeb(wrap);
      return wrap;
    };
    put("W-A01", "Masuk dashboard", null, "none", ({ content }) => {
      content.appendChild(inputField("Email", "nama@perusahaan.com"));
      content.appendChild(inputField("Kata sandi", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"));
      content.appendChild(cta("Masuk", C.primary));
    });
    put("W-D01", "Ringkasan operasional", "Ringkasan", "app", ({ content }) => {
      content.appendChild(metricRow([
        ["42", "Hadir", C.success],
        ["3", "Terlambat", C.warning],
        ["5", "Belum absen", C.error],
        ["2", "Izin", C.info]
      ]));
      content.appendChild(sectionTitle("Aktivitas terkini", "Shift pagi \xB7 Site A & B"));
      content.appendChild(listRow("Budi Santoso", "Clock-in 07:28 \xB7 Site A", pill("Hadir", C.successSoft, C.success)));
      content.appendChild(listRow("Citra Lestari", "Belum clock-in", pill("Open", C.errorSoft, C.error)));
      content.appendChild(listRow("Dewi Anggraini", "Izin sakit", pill("Izin", C.infoSoft, C.info)));
    });
    put("W-D02", "Kehadiran live", "Kehadiran", "app", ({ content }) => {
      content.appendChild(banner("Refresh otomatis setiap 60 detik (draft)", C.accentSoft, C.accent));
      content.appendChild(sectionTitle("Belum absen \u2014 Shift Pagi", "5 karyawan"));
      ["Citra Lestari", "Eko Prasetyo", "Fajar Nugroho", "Gita Putri", "Hadi Wijaya"].forEach((n) => {
        content.appendChild(listRow(n, "Site A \xB7 target 07:30", pill("Belum", C.ink100, C.ink500)));
      });
    });
    put("W-AP01", "Inbox persetujuan", "Persetujuan", "app", ({ content }) => {
      content.appendChild(listRow("Izin sakit \xB7 Budi", "22\u201323 Sep", pill("Review", C.warningSoft, C.warning)));
      content.appendChild(listRow("Lembur \xB7 Citra", "2 jam \xB7 19 Sep", pill("Review", C.warningSoft, C.warning)));
      content.appendChild(listRow("Cuti \xB7 Eko", "1\u20133 Okt", pill("Review", C.warningSoft, C.warning)));
    });
    put("W-AP02", "Detail izin/cuti", "Persetujuan", "app", ({ content }) => {
      content.appendChild(sectionTitle("Izin sakit \u2014 Budi Santoso", "22\u201323 Sep 2026"));
      content.appendChild(wrapTxt("Demam, istirahat di rumah.", 14, "Regular", C.ink700));
      content.appendChild(kvRow("Diajukan", "21 Sep \xB7 18:02"));
      content.appendChild(inputField("Alasan penolakan (wajib jika tolak)", "Contoh: overlapping absensi"));
      content.appendChild(wrapTxt("Tolak disabled sampai alasan terisi (validasi FE).", 12, "Regular", C.ink500));
      const actions = row("Actions", 12);
      stretch(actions);
      const a = cta("Setujui", C.success);
      a.layoutAlign = "INHERIT";
      a.primaryAxisSizingMode = "AUTO";
      const r = secondaryCta("Tolak");
      r.layoutAlign = "INHERIT";
      r.primaryAxisSizingMode = "AUTO";
      actions.appendChild(a);
      actions.appendChild(r);
      content.appendChild(actions);
    });
    put("W-AP03", "Detail lembur", "Persetujuan", "app", ({ content }) => {
      content.appendChild(sectionTitle("Lembur \u2014 Citra Lestari", "19 Sep \xB7 2.0 jam"));
      content.appendChild(kvRow("Jam", "16:30 \u2013 18:30"));
      content.appendChild(kvRow("Keterangan", "Penyelesaian loading"));
      content.appendChild(inputField("Alasan penolakan (wajib jika tolak)", "Contoh: melebihi kebijakan"));
      content.appendChild(cta("Setujui", C.success));
      content.appendChild(ghostCta("Tolak"));
    });
    put("W-T01", "Daftar kehadiran", "Kehadiran", "app", ({ content }) => {
      content.appendChild(sectionTitle("Kehadiran hari ini", "Filter: semua site"));
      [
        ["Budi Santoso", "07:28", "Hadir"],
        ["Citra Lestari", "\u2014", "Belum"],
        ["Dewi Anggraini", "Izin", "Izin"]
      ].forEach(([n, t, s]) => {
        const color = s === "Hadir" ? C.success : s === "Izin" ? C.info : C.ink500;
        const bg = s === "Hadir" ? C.successSoft : s === "Izin" ? C.infoSoft : C.ink100;
        content.appendChild(listRow(n, t, pill(s, bg, color)));
      });
    });
    put("W-T02", "Detail karyawan", "Karyawan", "app", ({ content }) => {
      content.appendChild(sectionTitle("Budi Santoso", "NIP 104892 \xB7 Karyawan"));
      content.appendChild(kvRow("Supervisor", "Andi Pratama"));
      content.appendChild(kvRow("Face enroll", "Aktif"));
      content.appendChild(kvRow("Lokasi default", "Site A"));
      content.appendChild(sectionTitle("7 hari terakhir", ""));
      content.appendChild(listRow("Sen 22", "07:28 clock-in", pill("Hadir", C.successSoft, C.success)));
    });
    put("W-R01", "Hub laporan", "Laporan", "app", ({ content }) => {
      content.appendChild(sectionTitle("Laporan kehadiran", "PDF & Excel untuk payroll/audit"));
      content.appendChild(listRow("Rekap harian", "Per site / shift", "\u203A"));
      content.appendChild(listRow("Rekap bulanan", "Termasuk lembur & izin", "\u203A"));
      content.appendChild(listRow("Keterlambatan", "Statistik", "\u203A"));
      content.appendChild(cta("Buat laporan", C.primary));
    });
    put("W-R02", "Filter laporan", "Laporan", "app", ({ content }) => {
      content.appendChild(inputField("Periode mulai", "2026-09-01"));
      content.appendChild(inputField("Periode selesai", "2026-09-30"));
      content.appendChild(inputField("Karyawan", "Semua / pilih"));
      content.appendChild(inputField("Status", "Semua"));
      content.appendChild(cta("Terapkan filter", C.primary));
    });
    put("W-R03", "Preview & unduh", "Laporan", "app", ({ content }) => {
      content.appendChild(banner("Preview 42 baris \xB7 Sep 2026", C.primarySoft, C.primaryDark));
      content.appendChild(softCard("Table", C.surface));
      last2(content).appendChild(txt("NIP \xB7 Nama \xB7 Tanggal \xB7 Masuk \xB7 Keluar \xB7 Status \xB7 OT", 12, "Medium", C.ink500));
      last2(content).appendChild(txt("104892 \xB7 Budi \xB7 22/09 \xB7 07:28 \xB7 \u2014 \xB7 Hadir \xB7 0", 12, "Regular", C.ink700));
      const actions = row("Export", 12);
      stretch(actions);
      const xls = cta("Unduh Excel", C.primary);
      xls.layoutAlign = "INHERIT";
      xls.primaryAxisSizingMode = "AUTO";
      const pdf = secondaryCta("Unduh PDF (opsional)");
      pdf.layoutAlign = "INHERIT";
      pdf.primaryAxisSizingMode = "AUTO";
      actions.appendChild(xls);
      actions.appendChild(pdf);
      content.appendChild(actions);
    });
    put("W-H01", "Manajemen pengguna", "Karyawan", "app", ({ content }) => {
      content.appendChild(cta("Tambah pengguna", C.primary));
      content.appendChild(listRow("Budi Santoso", "Karyawan \xB7 Aktif", "\u203A"));
      content.appendChild(listRow("Andi Pratama", "Supervisor \xB7 Aktif", "\u203A"));
      content.appendChild(listRow("Siti HRD", "HRD \xB7 Aktif", "\u203A"));
    });
    put("W-H02", "Form pengguna", "Karyawan", "app", ({ content }) => {
      content.appendChild(inputField("Nama lengkap", "Budi Santoso"));
      content.appendChild(inputField("Email", "budi@perusahaan.com"));
      content.appendChild(inputField("Password awal", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"));
      content.appendChild(inputField("Role", "Karyawan / Supervisor / HRD", "Karyawan"));
      content.appendChild(inputField("Status", "Aktif / Nonaktif", "Aktif"));
      content.appendChild(inputField("Supervisor (opsional)", "Andi Pratama"));
      content.appendChild(cta("Simpan", C.primary));
    });
    put("W-H03", "Lokasi & geofence", "Lokasi", "app", ({ content }) => {
      content.appendChild(cta("Tambah lokasi", C.primary));
      content.appendChild(listRow("Site A \u2014 Gudang", "Radius 100 m \xB7 Aktif", "\u203A"));
      content.appendChild(listRow("Site B \u2014 Pool", "Radius 100 m \xB7 Aktif", "\u203A"));
      content.appendChild(wrapTxt("Clock-in valid di salah satu lokasi aktif.", 12, "Regular", C.ink500));
    });
    put("W-H04", "Form lokasi", "Lokasi", "app", ({ content }) => {
      content.appendChild(inputField("Nama", "Site A \u2014 Gudang"));
      content.appendChild(inputField("Latitude", "-6.200"));
      content.appendChild(inputField("Longitude", "106.816"));
      content.appendChild(inputField("Radius (m)", "100"));
      content.appendChild(cta("Simpan lokasi", C.primary));
    });
    put("W-H05", "Log audit", "Pengaturan", "app", ({ content }) => {
      content.appendChild(listRow("Approve leave #882", "Andi \xB7 21 Sep 20:11", "\u203A"));
      content.appendChild(listRow("Export laporan Sep", "Siti \xB7 22 Sep 09:02", "\u203A"));
      content.appendChild(listRow("Nonaktifkan user", "Siti \xB7 18 Sep", "\u203A"));
    });
    put("W-S01", "Pengaturan organisasi", "Pengaturan", "app", ({ content }) => {
      content.appendChild(inputField("Nama organisasi", "Divisi Operation"));
      content.appendChild(inputField("Timezone", "Asia/Jakarta"));
      content.appendChild(inputField("Default shift start", "07:30"));
      content.appendChild(inputField("Grace terlambat (menit)", "15"));
      content.appendChild(cta("Simpan", C.primary));
    });
    put("W-S02", "Notifikasi sistem", "Pengaturan", "app", ({ content }) => {
      content.appendChild(listRow("FCM channel", "Android karyawan", "Aktif"));
      content.appendChild(listRow("Reminder clock-in", "T-15 menit shift", "On"));
      content.appendChild(listRow("Approval push", "Supervisor + karyawan", "On"));
    });
  }

  // src/generate.js
  var MOBILE_COL_W = 420;
  var WEB_COL_W = 1320;
  var COLS_MOBILE = 6;
  var COLS_WEB = 2;
  var ROW_GUTTER = 64;
  var SECTION_GAP = 200;
  function makePositions(startY) {
    let mIndex = 0;
    let wIndex = 0;
    let mobileY = startY;
    let mobileCol = 0;
    let mobileRowMaxH = 0;
    let mobileFinished = false;
    let webY = startY;
    let webCol = 0;
    let webRowMaxH = 0;
    function advanceMobileRow() {
      if (mobileCol === 0 && mobileRowMaxH === 0) return;
      mobileY += mobileRowMaxH + ROW_GUTTER;
      mobileCol = 0;
      mobileRowMaxH = 0;
    }
    function advanceWebRow() {
      if (webCol === 0 && webRowMaxH === 0) return;
      webY += webRowMaxH + ROW_GUTTER;
      webCol = 0;
      webRowMaxH = 0;
    }
    return {
      placeMobile(wrap) {
        wrap.x = mobileCol * MOBILE_COL_W;
        wrap.y = mobileY;
        const h = Math.max(wrap.height || 0, 1);
        mobileRowMaxH = Math.max(mobileRowMaxH, h);
        mobileCol += 1;
        mIndex += 1;
        if (mobileCol >= COLS_MOBILE) advanceMobileRow();
      },
      placeWeb(wrap) {
        if (!mobileFinished) this.finishMobile();
        wrap.x = webCol * WEB_COL_W;
        wrap.y = webY;
        const h = Math.max(wrap.height || 0, 1);
        webRowMaxH = Math.max(webRowMaxH, h);
        webCol += 1;
        wIndex += 1;
        if (webCol >= COLS_WEB) advanceWebRow();
      },
      finishMobile() {
        if (mobileFinished) return;
        advanceMobileRow();
        webY = mobileY + SECTION_GAP;
        webCol = 0;
        webRowMaxH = 0;
        mobileFinished = true;
      },
      counts() {
        return { mobile: mIndex, web: wIndex };
      }
    };
  }
  function clearGenerated(page) {
    const doomed = page.children.filter((n) => {
      const name = n.name || "";
      return name.startsWith("DS \xB7") || name.startsWith("PRD \xB7") || name.startsWith("M-") || name.startsWith("W-") || name.startsWith("Design Tokens") || name.startsWith("Mobile \xB7") || name.startsWith("Web \xB7");
    });
    doomed.forEach((n) => n.remove());
  }
  function findCanvasOverlaps(nodes, gutter) {
    const g = gutter == null ? 0 : gutter;
    const frames = nodes.filter((n) => n && typeof n.x === "number");
    const hits = [];
    for (let i = 0; i < frames.length; i++) {
      for (let j = i + 1; j < frames.length; j++) {
        const a = frames[i];
        const b = frames[j];
        const ax2 = a.x + a.width;
        const ay2 = a.y + a.height;
        const bx2 = b.x + b.width;
        const by2 = b.y + b.height;
        const overlapX = a.x < bx2 + g && b.x < ax2 + g;
        const overlapY = a.y < by2 + g && b.y < ay2 + g;
        if (overlapX && overlapY) hits.push([a.name, b.name]);
      }
    }
    return hits;
  }
  async function generate(page, scope) {
    clearGenerated(page);
    let boardsBottom = 0;
    if (scope === "all" || scope === "tokens" || scope === "components") {
      const tokens = await generateTokens(page, 0, 0);
      const metrics = await generateMetricsBoard(page, 1520, 0);
      boardsBottom = Math.max(tokens.height || 0, metrics.height || 0) + SECTION_GAP;
    }
    if (scope === "tokens") {
      layoutProgressBars(page);
      return {
        mobile: 0,
        web: 0,
        totalIds: ALL_SCREEN_IDS.length,
        overlapMobile: 0,
        overlapWeb: 0
      };
    }
    const positions = makePositions(boardsBottom || 0);
    const mobileWraps = [];
    const webWraps = [];
    const basePlaceMobile = positions.placeMobile.bind(positions);
    const basePlaceWeb = positions.placeWeb.bind(positions);
    positions.placeMobile = (wrap) => {
      basePlaceMobile(wrap);
      mobileWraps.push(wrap);
    };
    positions.placeWeb = (wrap) => {
      basePlaceWeb(wrap);
      webWraps.push(wrap);
    };
    if (scope === "all" || scope === "mobile" || scope === "components") {
      generateMobileAuthHome(page, positions);
      generateMobileAttendance(page, positions);
      generateMobileLeaveOtProfile(page, positions);
      positions.finishMobile();
    } else {
      positions.finishMobile();
    }
    if (scope === "all" || scope === "web" || scope === "components") {
      generateWebAll(page, positions);
    }
    layoutProgressBars(page);
    const counts = positions.counts();
    const expectedMobile = scope === "web" || scope === "tokens" ? 0 : MOBILE_SCREENS.length;
    const expectedWeb = scope === "mobile" || scope === "tokens" ? 0 : WEB_SCREENS.length;
    if (scope === "all" || scope === "components") {
      if (counts.mobile !== MOBILE_SCREENS.length) {
        throw new Error("Mobile screen count mismatch: got " + counts.mobile + " expected " + MOBILE_SCREENS.length);
      }
      if (counts.web !== WEB_SCREENS.length) {
        throw new Error("Web screen count mismatch: got " + counts.web + " expected " + WEB_SCREENS.length);
      }
    } else if (scope === "mobile" && counts.mobile !== expectedMobile) {
      throw new Error("Mobile screen count mismatch: got " + counts.mobile + " expected " + expectedMobile);
    } else if (scope === "web" && counts.web !== expectedWeb) {
      throw new Error("Web screen count mismatch: got " + counts.web + " expected " + expectedWeb);
    }
    const mobileHits = findCanvasOverlaps(mobileWraps, 0);
    const webHits = findCanvasOverlaps(webWraps, 0);
    if (mobileHits.length || webHits.length) {
      const sample = (mobileHits[0] || webHits[0]).join(" \u2229 ");
      throw new Error(
        "Canvas overlap detected: " + sample + " (mobile=" + mobileHits.length + ", web=" + webHits.length + ")"
      );
    }
    return {
      mobile: counts.mobile,
      web: counts.web,
      totalIds: ALL_SCREEN_IDS.length,
      overlapMobile: mobileHits.length,
      overlapWeb: webHits.length
    };
  }

  // src/main.js
  figma.showUI(__html__, { width: 340, height: 400 });
  figma.ui.onmessage = async (msg) => {
    if (!msg || msg.type !== "generate") return;
    figma.ui.postMessage({ status: "Menggambar ulang dari docs v0.1\u2026" });
    try {
      await loadFonts();
      const page = figma.currentPage;
      page.name = "Nexus Ops \u2014 Screens v0.1";
      const result = await generate(page, msg.scope);
      const nodes = page.children.slice(-Math.min(12, page.children.length));
      if (nodes.length) figma.viewport.scrollAndZoomIntoView(nodes);
      figma.ui.postMessage({
        status: "Selesai. " + result.mobile + " M-* + " + result.web + " W-* (katalog " + result.totalIds + "). Overlaps=" + (result.overlapMobile + result.overlapWeb) + "."
      });
    } catch (e) {
      figma.ui.postMessage({ status: "Error: " + (e.message || String(e)) });
      console.error(e);
    }
  };
})();
