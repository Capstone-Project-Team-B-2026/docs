---
sidebar_position: 4
title: Design System
---

# Nexus Ops Design System

:::info Status
**Locked v1.0** — token, komponen, pola UI, dan registry `testID` terkunci. Selaras [PRD §10](./prd#10-keputusan-domain-terkunci-mvp) dan [Screens](./screens).
:::

| Field | Value |
|-------|-------|
| Product | Nexus Ops — Absensi Divisi Operation |
| Version | 1.0.0 |
| Surfaces | Mobile (390×844) · Web dashboard (1280+) |
| Last updated | 2026-09-24 |

---

## 1. Prinsip desain

1. **Kepercayaan operasional** — Absensi menyangkut gaji & disiplin; UI harus terasa akurat, tenang, dan auditabel.
2. **Satu aksi utama** — Clock-in/out selesai dalam ≤ 3 langkah setelah buka app (NFR usability PRD).
3. **Status selalu terlihat** — Kehadiran hari ini, hasil face/GPS, dan approval harus terbaca tanpa menebak.
4. **Satu bahasa visual** — Mobile & web memakai token yang sama; density berbeda, bukan brand berbeda.
5. **Aksesibilitas lapangan** — Kontras tinggi, target tap ≥ 44px, label status tidak hanya warna.

Tagline visual: **Hadir. Valid. Terkontrol.**

---

## 2. Brand & warna

Palette **slate-navy + cyan live** — profesional untuk operasi lapangan, bukan SaaS ungu generik.

### 2.1 Brand

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `primary` | `#0B3A5C` | CTA, nav aktif, brand mark |
| `primaryDark` | `#072A42` | Pressed / header gelap |
| `primaryBright` | `#1A6FA8` | Highlight, progress |
| `primarySoft` | `#E8F2F8` | Soft fill, chip netral-brand |
| `primarySubtle` | `#F3F8FB` | Background strip metrik |
| `onPrimary` | `#FFFFFF` | Teks di atas primary |
| `accent` | `#0E7490` | GPS / “live” / lokasi |
| `accentSoft` | `#ECFEFF` | Soft GPS |

### 2.2 Semantic

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `success` | `#15803D` | Clock-in valid, approved |
| `successSoft` | `#F0FDF4` | Banner sukses |
| `warning` | `#B45309` | Terlambat, pending |
| `warningSoft` | `#FFFBEB` | Banner pending |
| `error` | `#B91C1C` | Face/GPS gagal, rejected |
| `errorSoft` | `#FEF2F2` | Banner gagal |
| `info` | `#1D4ED8` | Info tip, link |
| `infoSoft` | `#EFF6FF` | Soft info |

### 2.3 Neutral

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `ink950` | `#0B1220` | Display teks |
| `ink900` | `#111827` | Judul |
| `ink700` | `#374151` | Body |
| `ink500` | `#6B7280` | Meta / caption |
| `ink400` | `#9CA3AF` | Placeholder |
| `ink300` | `#D1D5DB` | Divider soft |
| `ink200` | `#E5E7EB` | Border |
| `ink100` | `#F3F4F6` | Track / muted fill |
| `surface` | `#FFFFFF` | Card / sheet |
| `background` | `#F4F7FA` | App canvas |
| `overlay` | `#0B1220` | Modal scrim (opacity) |

### 2.4 Status absensi (domain)

| Status API | Warna | Label UI |
|------------|-------|----------|
| (belum baris) | `ink500` + `ink100` | Belum absen |
| `present` | `success` | Hadir |
| `late` | `warning` | Terlambat |
| `absent` | `error` | Alpha |
| `leave` | `info` | Izin |
| GPS ditolak | `error` | GPS ditolak |
| Face ditolak | `error` | Face ditolak |
| `pending` (request) | `warning` | Menunggu |
| `approved` | `success` | Disetujui |

---

## 3. Tipografi

Font UI: **Inter** (fallback Roboto). Hindari display serif untuk produk ops.

| Role | Size / weight | Contoh |
|------|---------------|--------|
| Display | 32 / Bold | Nexus Ops |
| Title | 24 / Bold | Selamat pagi, Budi |
| Heading | 18 / SemiBold | Absensi hari ini |
| Body | 15–16 / Regular | Keterangan pengajuan |
| Label | 13 / SemiBold | Field label |
| Caption | 12 / Medium | Timestamp · GPS ±12m |
| Overline | 11 / SemiBold · uppercase tracking | SHIFT PAGI |

---

## 4. Spacing, radius, elevation

| Token | Value |
|-------|-------|
| Page padding | 20 |
| Section gap | 20–24 |
| Card padding | 16 |
| Control gap | 8–12 |
| `R.sm` | 8 |
| `R.md` | 12 |
| `R.lg` | 16 |
| `R.xl` | 20 |
| `R.pill` | 999 |

Shadow card: `y:2 · blur:8 · ink950 @ 6%`.  
Header brand: soft navy shadow, bukan glow.

---

## 5. Komponen inti

### 5.1 Tombol

- **Primary** — aksi utama (Clock-in, Ajukan, Setujui)
- **Secondary** — aksi sekunder (Lihat riwayat)
- **Ghost** — batal / nanti
- Disabled: opacity 40%, tidak mengubah warna semantic

### 5.2 Input & form

- Label di atas field; helper di bawah
- Error inline merah + **reason code** dari API (lihat [PRD §10.6](./prd#106-reason-code--enum))
- Tanggal/jam leave & OT memakai picker native platform

### 5.3 Status chip / pill

Chip kecil untuk status absensi & approval. Selalu kombinasi **warna + teks**.

### 5.4 List row

Judul + meta (waktu / lokasi) + trailing (status chip atau chevron). Digunakan di riwayat, approval inbox, daftar tim.

### 5.5 Metric tile

Angka besar + label untuk dashboard (Hadir, Terlambat, Belum absen, On leave).

### 5.6 Face / GPS panels

- **Face frame** — area kamera persegi rounded; overlay guide oval; teks instruksi singkat
- **GPS strip** — ikon lokasi + nama geofence + akurasi meter; hijau dalam area / merah luar area

### 5.7 Navigation

**Mobile tab bar (4):** Beranda · Absensi · Pengajuan · Profil  
**Web sidebar:** Ringkasan · Kehadiran · Persetujuan · Laporan · Karyawan · Lokasi · Pengaturan

### 5.8 Props minimum (komponen FE bersama)

Agar web Vue dan mobile RN tidak divergen:

| Komponen | Props / slots minimum |
|----------|------------------------|
| **DataTable** (W-T01, W-R02) | `columns[]`, `rows[]`, `loading`, `emptyText`, `onRowClick?`, `filters?` |
| **DateRangePicker** (W-R01, M-LV02) | `start`, `end`, `onChange`, `maxRangeDays?`, `disabled?` |
| **Toast / Banner** | `variant: success\|warning\|error\|info`, `title`, `message?`, `actionLabel?`, `onAction?`, `durationMs?` |
| **Skeleton** | `variant: text\|row\|card\|metric`, `count?` |
| **EmptyState** | `title`, `description?`, `ctaLabel?`, `onCta?` |

---

## 6. Pola layar

### 6.1 Mobile shell

- Status bar sistem + app header (back opsional)
- Body scroll, padding 20
- Tab bar tetap (kecuali alur auth / camera fullscreen)

### 6.2 Clock-in / clock-out flow

1. Hub absensi (pilih **Clock-in** atau **Clock-out**) → 2. Capture wajah (on-device embedding) → 3. Validasi GPS → 4. Sukses / gagal dengan reason

Gagal: tampilkan alasan + CTA “Coba lagi” (maks 3); jangan silent fail; **tanpa** tombol override supervisor.

### 6.3 Approval reject

Di web `W-AP02` / `W-AP03`: field **Alasan penolakan** wajib sebelum Tolak aktif (disable tombol sampai terisi).

### 6.4 Web shell

Sidebar 240px + top bar (periode, role, avatar) + main content max-width nyaman untuk tabel.

### 6.5 State tanpa frame ekstra (pragmatis)

| Kebutuhan | Solusi |
|-----------|--------|
| Empty / loading / GPS-permission denied | Komponen shared (`EmptyState`, spinner); **tidak** digambar sebagai M-*/W-* terpisah |
| Clock-out sukses | Reuse `M-ATT04` — ganti field Jenis + jam |
| Hub sebelum clock-in | FE toggle dari state `M-ATT01` (Figma menampilkan state pasca clock-in) |
| RBAC ditolak | Route guard → redirect + toast; **bukan** halaman penuh |
| Peta geofence | Placeholder di Figma; implementasi map SDK di mobile tanpa frame baru |
| Segment Izin \| Lembur | Kontrol di `M-LV01` / tab Pengajuan (bukan dua tab bar) |

---

## 7. Registry testID / data-testid

Wajib untuk DoD UI dan card E2E. Web: `data-testid`; Mobile: `testID`.

| Screen / area | ID wajib |
|---------------|----------|
| Web shell smoke | `web-shell`, `web-brand` |
| W-A01 login | `login-identifier`, `login-password`, `login-submit`, `dashboard-shell` |
| W-AP01 inbox | `approvals-inbox` |
| W-AP02/03 reject | `reject-reason`, `reject-submit` |
| W-R01 hub | `reports-hub` |
| W-R03 export | `export-excel` |
| Mobile shell smoke | `mobile-shell`, `mobile-brand` |
| M-A02 login | `login-identifier`, `login-password`, `login-submit`, `home-shell` |
| M-H01 / clock | `home-shell`, `cta-clock-in` |
| M-ATT* flow | `attendance-hub`, `start-clock-in`, `face-capture`, `attendance-success` |
| M-LV* | `tab-pengajuan`, `leave-list`, `leave-create`, `leave-type-cuti`, `leave-submit`, `leave-sent` |

Unskip spek Playwright/Maestro setelah ID di atas terpasang di layar terkait.

---

## 8. Ikonografi & ilustrasi

- Ikon line sederhana (kehadiran, lokasi, wajah, dokumen, lonceng)
- Hindari ilustrasi mascot; produk ops memakai **ikon status + foto profil**
- Empty state: satu kalimat + satu CTA

---

## 9. Motion (ringkas)

| Momen | Motion |
|-------|--------|
| Clock-in sukses | Checkmark scale-in singkat + confetti **tidak** dipakai |
| GPS lock | Pulse soft pada pin lokasi |
| Pending → approved | Chip warna crossfade |
| Push masuk | Banner slide-down |

Durasi tipikal 150–250ms; easing standard, bukan bounce berlebihan.

---

## 10. Do / Don’t

| Do | Don’t |
|----|-------|
| Tampilkan hasil face **dan** GPS | Hanya warna hijau tanpa teks |
| Reason code yang bisa dipahami | Error generik “Gagal” |
| Satu CTA primer per viewport | Dua tombol primary berdampingan |
| Filter laporan jelas (periode / orang / status) | Export tanpa konfirmasi filter |

---

## 11. Mapping ke kode & Figma

| Artefak | Lokasi |
|---------|--------|
| Token JS (plugin) | `figma-plugin/src/tokens.js` — **sumber tunggal** |
| Token JSON publik | `docs/static/tokens.json` (di-generate dari plugin tokens) |
| Vendor web | `web/src/styles/tokens.ts` (salin dari static; pola seperti OpenAPI) |
| Vendor mobile | `mobile/src/theme/tokens.ts` |
| Screen IDs | [Screens](./screens) · `figma-plugin/src/catalog/ids.js` |
| Generator Figma | Plugin **Nexus Ops Design Generator** di `figma-plugin/` |

Generate: dari root docs, `node figma-plugin/scripts/export-tokens.mjs` (atau `npm run tokens:export` di plugin) → tulis `static/tokens.json`. FE menjalankan sync manual / script mirror saat mulai sprint UI.

---

## 12. Riwayat revisi

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 0.1.0 | 2026-09-22 | Draft awal dari proposal & PRD Kelompok B |
| 0.1.1 | 2026-09-24 | Catatan permukaan: RN/Expo (mobile), Vue 3 (web) |
| 0.1.2 | 2026-09-24 | Pola clock-out + reject reason wajib |
| 0.1.3 | 2026-09-24 | State pragmatis tanpa frame ekstra |
| 1.0.0 | 2026-09-24 | **Locked:** testID registry, props minimum, token vendoring, status API labels |
