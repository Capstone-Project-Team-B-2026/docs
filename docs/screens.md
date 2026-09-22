---
sidebar_position: 5
title: Screens & Pages
---

# Screens & Pages

:::info Status
**Draft v0.1** — inventaris layar Mobile (M-\*) dan Web (W-\*) untuk MVP Nexus Ops. Sumber: proposal Capstone + [PRD](./prd). Visual token: [Design System](./design-system).
:::

| Field | Value |
|-------|-------|
| Product | Nexus Ops |
| Version | 0.1.0 |
| Mobile IDs | **M-\*** (karyawan Operation) |
| Web IDs | **W-\*** (supervisor / HRD / admin) |
| Last updated | 2026-09-22 |

---

## 1. Peta permukaan

```mermaid
flowchart LR
  subgraph Mobile["Mobile Android · Karyawan"]
    MA[Auth]
    MH[Home]
    MATT[Absensi]
    MLV[Izin/Cuti]
    MOT[Lembur]
    MN[Notifikasi]
    MP[Profil]
  end

  subgraph Web["Web Dashboard"]
    WA[Auth]
    WD[Ringkasan]
    WAP[Persetujuan]
    WT[Kehadiran Tim]
    WR[Laporan]
    WH[Master HRD]
    WS[Pengaturan]
  end

  MA --> MH --> MATT
  MH --> MLV
  MH --> MOT
  WA --> WD --> WAP
  WD --> WT
  WD --> WR
  WD --> WH
```

---

## 2. Mobile — inventaris M-\*

### 2.1 Auth (`M-A*`)

| ID | Layar | Catatan |
|----|-------|---------|
| M-A01 | Splash & cek sesi | Brand mark + loading token |
| M-A02 | Masuk | Email/NIP + password (AUTH-01) |
| M-A03 | Sesi berakhir | Re-auth |

### 2.2 Home (`M-H*`)

| ID | Layar | Catatan |
|----|-------|---------|
| M-H01 | Beranda | Status hari ini, CTA clock, ringkas pengajuan |
| M-H02 | Detail shift | Jadwal shift & lokasi default |

### 2.3 Absensi (`M-ATT*`) — ATT-01…06

| ID | Layar | Catatan |
|----|-------|---------|
| M-ATT01 | Hub absensi | Clock-in / clock-out entry |
| M-ATT02 | Capture wajah | Kamera + guide oval (ATT-02) |
| M-ATT03 | Validasi lokasi | GPS + nama geofence (ATT-03) |
| M-ATT04 | Absensi berhasil | Timestamp + ringkas validasi |
| M-ATT05 | Gagal — wajah | Reason `FACE_MISMATCH` |
| M-ATT06 | Gagal — GPS | Reason `OUT_OF_GEOFENCE` / akurasi rendah |
| M-ATT07 | Riwayat absensi | List per periode |
| M-ATT08 | Detail catatan | Audit fields: waktu, lat/lng, hasil face/GPS |

### 2.4 Izin & cuti (`M-LV*`) — LV-01…03

| ID | Layar | Catatan |
|----|-------|---------|
| M-LV01 | Daftar pengajuan | Filter status |
| M-LV02 | Form ajukan | Jenis, tanggal, keterangan |
| M-LV03 | Detail pengajuan | Status + timeline approval |
| M-LV04 | Terkirim | Konfirmasi + notifikasi ke supervisor |

### 2.5 Lembur (`M-OT*`) — OT-01…02

| ID | Layar | Catatan |
|----|-------|---------|
| M-OT01 | Daftar lembur | |
| M-OT02 | Form lembur | Jam terkait kehadiran |
| M-OT03 | Detail lembur | Status approval |

### 2.6 Notifikasi & profil (`M-N*` / `M-P*`)

| ID | Layar | Catatan |
|----|-------|---------|
| M-N01 | Pusat notifikasi | Approval, pengingat absensi (NTF-*) |
| M-N02 | Preferensi notifikasi | Quiet hours opsional |
| M-P01 | Profil saya | Nama, NIP, supervisor |
| M-P02 | Pengaturan | Bahasa, keamanan dasar |
| M-P03 | Enrollment wajah | Onboarding template wajah |
| M-P04 | Bantuan | Kontak HRD / FAQ singkat |

**Total mobile: 26 layar**

### 2.7 Tab bar

| Tab | Default screen |
|-----|----------------|
| Beranda | M-H01 |
| Absensi | M-ATT01 |
| Pengajuan | M-LV01 (segment: Izin \| Lembur) |
| Profil | M-P01 |

---

## 3. Web — inventaris W-\*

### 3.1 Auth & ringkasan

| ID | Halaman | Persona | Catatan |
|----|---------|---------|---------|
| W-A01 | Masuk dashboard | Semua | |
| W-D01 | Ringkasan operasional | Supervisor / HRD | Metrik harian (RPT-01) |
| W-D02 | Kehadiran live | Supervisor | Siapa sudah/belum absen (ATT-06) |

### 3.2 Persetujuan

| ID | Halaman | Persona | Catatan |
|----|---------|---------|---------|
| W-AP01 | Inbox persetujuan | Supervisor | Izin + lembur |
| W-AP02 | Detail izin/cuti | Supervisor | Approve / reject (LV-02) |
| W-AP03 | Detail lembur | Supervisor | Approve / reject (OT-02) |

### 3.3 Kehadiran & laporan

| ID | Halaman | Persona | Catatan |
|----|---------|---------|---------|
| W-T01 | Daftar kehadiran | Supervisor / HRD | Filter shift / status |
| W-T02 | Detail karyawan | Supervisor / HRD | Profil + riwayat singkat |
| W-R01 | Hub laporan | HRD / Manajer | RPT-02 |
| W-R02 | Filter laporan | HRD | Periode / karyawan / status (RPT-04) |
| W-R03 | Preview & unduh | HRD | PDF / Excel (RPT-03) |

### 3.4 Master data HRD

| ID | Halaman | Persona | Catatan |
|----|---------|---------|---------|
| W-H01 | Manajemen pengguna | HRD | AUTH-02 |
| W-H02 | Form pengguna | HRD | Role, aktif/nonaktif |
| W-H03 | Lokasi & geofence | HRD | Master lokasi kerja |
| W-H04 | Form lokasi | HRD | Lat/lng + radius |
| W-H05 | Log audit | HRD | Jejak approve / export |

### 3.5 Pengaturan

| ID | Halaman | Persona | Catatan |
|----|---------|---------|---------|
| W-S01 | Pengaturan organisasi | HRD | Default shift, timezone |
| W-S02 | Notifikasi sistem | HRD | Template / channel FCM |

**Total web: 18 halaman**

---

## 4. Alur lintas layar (MVP)

### Clock-in

`M-H01` → `M-ATT01` → `M-ATT02` → `M-ATT03` → `M-ATT04` | `M-ATT05` | `M-ATT06`

### Pengajuan izin

`M-LV01` → `M-LV02` → `M-LV04` → (push) `W-AP01` → `W-AP02` → (push) `M-N01` / `M-LV03`

### Laporan

`W-R01` → `W-R02` → `W-R03`

---

## 5. Prioritas implementasi UI

| Priority | IDs |
|----------|-----|
| P0 | M-A01–02, M-H01, M-ATT01–06, M-LV01–04, M-OT01–03, M-N01, W-A01, W-D01–02, W-AP01–03, W-R01–03, W-H01 |
| P1 | M-ATT07–08, M-H02, M-P03, W-T01–02, W-H02–04 |
| P2 | M-N02, M-P02/04, W-H05, W-S01–02 |

---

## 6. Figma plugin

Plugin **Nexus Ops Design Generator** (`figma-plugin/`) menggambar:

- Board design tokens + metrik PRD
- Semua frame **M-\*** (phone 390)
- Semua frame **W-\*** (desktop 1280)

Lihat README plugin untuk build & load di Figma.

---

## 7. Riwayat revisi

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 0.1.0 | 2026-09-22 | Inventaris awal 26 mobile + 18 web dari proposal/PRD |
