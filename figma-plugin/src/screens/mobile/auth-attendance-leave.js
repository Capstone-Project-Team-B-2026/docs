import {
  buildMobile, brandHeader, faceFrame, gpsStrip,
  C, paint, txt, wrapTxt, card, cta, ghostCta, secondaryCta,
  pill, listRow, softCard, inputField, kvRow, banner, sectionTitle,
  metricRow, space,
} from './_shared.js';
import { LOGO_URLS, createImageHashFromUrl, imageOrRect } from '../../brand/logos.js';

function last(node) {
  return node.children[node.children.length - 1];
}

export async function generateMobileAuthHome(page, positions) {
  const [hashMark, hashLight] = await Promise.all([
    createImageHashFromUrl(LOGO_URLS.mark),
    createImageHashFromUrl(LOGO_URLS.mobileLight),
  ]);

  const put = (id, title, opts, fn) => {
    const wrap = buildMobile(page, 0, 0, id, title, opts, fn);
    positions.placeMobile(wrap);
    return wrap;
  };

  put('M-A01', 'Splash', { hideNav: true, header: 'none' }, ({ phone, body }) => {
    phone.fills = paint(C.primary);
    body.primaryAxisAlignItems = 'CENTER';
    body.counterAxisAlignItems = 'CENTER';
    // App icon on splash (light tile) — falls back to soft fill if fetch fails
    const icon = imageOrRect('SplashLogo', 112, 112, hashLight || hashMark, C.primarySoft);
    icon.cornerRadius = 28;
    body.appendChild(icon);
    body.appendChild(space(20));
    body.appendChild(txt('Nexus Ops', 28, 'Bold', C.white));
    body.appendChild(txt('Hadir. Valid. Terkontrol.', 14, 'Regular', C.primarySoft));
    body.appendChild(space(28));
    body.appendChild(txt('Memeriksa sesi…', 13, 'Medium', C.primarySoft));
  });

  put('M-A02', 'Masuk', { hideNav: true }, ({ body }) => {
    body.counterAxisAlignItems = 'CENTER';
    const mark = imageOrRect('LoginMark', 64, 64, hashLight || hashMark, C.primarySoft);
    mark.cornerRadius = 16;
    body.appendChild(mark);
    body.appendChild(space(12));
    body.appendChild(sectionTitle('Masuk ke Nexus Ops', 'Karyawan Divisi Operation'));
    body.appendChild(inputField('Email / NIP', 'nip@perusahaan.com'));
    body.appendChild(inputField('Kata sandi', '••••••••'));
    body.appendChild(cta('Masuk', C.primary));
    body.appendChild(wrapTxt('Lupa sandi? Hubungi HRD untuk reset akun.', 12, 'Regular', C.ink500));
  });

  put('M-A03', 'Sesi berakhir', { hideNav: true }, ({ body }) => {
    body.appendChild(banner('Sesi berakhir demi keamanan. Silakan masuk lagi.', C.warningSoft, C.warning));
    body.appendChild(cta('Masuk kembali', C.primary));
  });

  put('M-H01', 'Beranda', { tab: 'Beranda', header: 'none' }, ({ phone, body }) => {
    brandHeader(phone, 'Selamat pagi, Budi', 'Shift Pagi · Site A · Senin 22 Sep');
    body.appendChild(softCard('Today', C.successSoft));
    last(body).appendChild(txt('Belum clock-in', 14, 'Bold', C.successDark || C.success));
    last(body).appendChild(wrapTxt('Jam masuk target 07:30 · Geofence Site A aktif', 12, 'Regular', C.ink700));
    body.appendChild(cta('Clock-in sekarang', C.primary));
    body.appendChild(sectionTitle('Pengajuan', 'Menunggu tindakan'));
    body.appendChild(listRow('Izin sakit', '22–23 Sep · Pending', pill('Pending', C.warningSoft, C.warning)));
    body.appendChild(listRow('Lembur', 'Kemarin 2 jam · Disetujui', pill('OK', C.successSoft, C.success)));
  });

  put('M-H02', 'Detail shift', { tab: 'Beranda' }, ({ body }) => {
    body.appendChild(sectionTitle('Shift Pagi', 'Senin–Jumat'));
    body.appendChild(kvRow('Jam kerja', '07:30 – 16:30'));
    body.appendChild(kvRow('Lokasi default', 'Site A — Gudang'));
    body.appendChild(kvRow('Supervisor', 'Andi Pratama'));
    body.appendChild(kvRow('Radius geofence', '100 m (default org)'));
    body.appendChild(kvRow('Grace terlambat', '15 menit'));
  });
}

export function generateMobileAttendance(page, positions) {
  const put = (id, title, opts, fn) => {
    const wrap = buildMobile(page, 0, 0, id, title, opts, fn);
    positions.placeMobile(wrap);
    return wrap;
  };

  put('M-ATT01', 'Hub absensi', { tab: 'Absensi' }, ({ body }) => {
    body.appendChild(sectionTitle('Absensi hari ini', 'Sudah clock-in · lanjut clock-out (wajah + GPS)'));
    body.appendChild(metricRow([
      ['07:28', 'Masuk', C.success],
      ['—', 'Keluar', C.ink500],
    ]));
    body.appendChild(cta('Clock-out', C.primary));
    body.appendChild(wrapTxt('Clock-in dinonaktifkan sampai clock-out / hari berikutnya.', 12, 'Regular', C.ink500));
    body.appendChild(ghostCta('Lihat riwayat'));
  });

  put('M-ATT02', 'Capture wajah', { hideNav: true }, ({ body }) => {
    body.appendChild(sectionTitle('Verifikasi wajah', 'Pastikan pencahayaan cukup'));
    body.appendChild(faceFrame('Tahan diam…'));
    body.appendChild(cta('Ambil foto', C.primary));
    body.appendChild(ghostCta('Batal'));
  });

  put('M-ATT03', 'Validasi lokasi', { hideNav: true }, ({ body }) => {
    body.appendChild(sectionTitle('Cek lokasi', 'Memastikan Anda di area kerja'));
    body.appendChild(gpsStrip(true, 'Site A — Gudang', 12));
    body.appendChild(softCard('MapHint', C.primarySubtle));
    last(body).appendChild(wrapTxt('Peta / pin lokasi (placeholder). Server memvalidasi radius geofence.', 12, 'Regular', C.ink700));
    body.appendChild(cta('Lanjut validasi', C.primary));
  });

  put('M-ATT04', 'Absensi berhasil', { hideNav: true }, ({ body }) => {
    body.appendChild(banner('Absensi tersimpan', C.successSoft, C.success));
    body.appendChild(sectionTitle('07:28 WIB', 'Senin, 22 Sep 2026'));
    body.appendChild(kvRow('Jenis', 'Clock-in'));
    body.appendChild(kvRow('Wajah', 'Cocok'));
    body.appendChild(kvRow('GPS', 'Dalam area · ±12m'));
    body.appendChild(kvRow('Lokasi', 'Site A'));
    body.appendChild(wrapTxt('Frame yang sama dipakai untuk clock-out (ganti Jenis + jam).', 12, 'Regular', C.ink500));
    body.appendChild(cta('Kembali ke beranda', C.primary));
  });

  put('M-ATT05', 'Gagal wajah', { hideNav: true }, ({ body }) => {
    body.appendChild(banner('Wajah tidak cocok · FACE_MISMATCH', C.errorSoft, C.error));
    body.appendChild(wrapTxt('Pastikan wajah menghadap kamera dan tidak tertutup. Hubungi HRD jika enrollment perlu diperbarui.', 13, 'Regular', C.ink700));
    body.appendChild(cta('Coba lagi', C.primary));
    body.appendChild(ghostCta('Batal'));
  });

  put('M-ATT06', 'Gagal GPS', { hideNav: true }, ({ body }) => {
    body.appendChild(banner('Di luar area · OUT_OF_GEOFENCE', C.errorSoft, C.error));
    body.appendChild(gpsStrip(false, 'Site A — Gudang', 48));
    body.appendChild(cta('Coba lagi', C.primary));
    body.appendChild(ghostCta('Batal'));
  });

  put('M-ATT07', 'Riwayat absensi', { tab: 'Absensi' }, ({ body }) => {
    body.appendChild(sectionTitle('September 2026', 'Filter: semua status'));
    [
      ['Sen 22', '07:28 – —', 'Hadir'],
      ['Jum 19', '07:41 – 16:32', 'Terlambat'],
      ['Kam 18', 'Izin sakit', 'Izin'],
    ].forEach(([d, m, s]) => {
      const color = s === 'Hadir' ? C.success : s === 'Terlambat' ? C.warning : C.info;
      const bg = s === 'Hadir' ? C.successSoft : s === 'Terlambat' ? C.warningSoft : C.infoSoft;
      body.appendChild(listRow(d, m, pill(s, bg, color)));
    });
  });

  put('M-ATT08', 'Detail catatan', { tab: 'Absensi' }, ({ body }) => {
    body.appendChild(sectionTitle('Clock-in', '22 Sep 2026 · 07:28'));
    body.appendChild(kvRow('Karyawan', 'Budi Santoso'));
    body.appendChild(kvRow('Face result', 'MATCH'));
    body.appendChild(kvRow('GPS result', 'IN_GEOFENCE'));
    body.appendChild(kvRow('Lat / Lng', '-6.200 · 106.816'));
    body.appendChild(kvRow('Akurasi', '12 m'));
  });
}

export function generateMobileLeaveOtProfile(page, positions) {
  const put = (id, title, opts, fn) => {
    const wrap = buildMobile(page, 0, 0, id, title, opts, fn);
    positions.placeMobile(wrap);
    return wrap;
  };

  put('M-LV01', 'Daftar izin/cuti', { tab: 'Pengajuan' }, ({ body }) => {
    body.appendChild(sectionTitle('Pengajuan', 'Segment Izin | Lembur (satu tab)'));
    const seg = softCard('Segment', C.primarySubtle);
    seg.appendChild(txt('● Izin/Cuti     ○ Lembur', 13, 'SemiBold', C.primaryDark));
    body.appendChild(seg);
    body.appendChild(cta('Ajukan baru', C.primary));
    body.appendChild(listRow('Sakit', '22–23 Sep', pill('Pending', C.warningSoft, C.warning)));
    body.appendChild(listRow('Cuti', '1–5 Agu', pill('Disetujui', C.successSoft, C.success)));
    body.appendChild(listRow('Izin lain', '12 Jul', pill('Ditolak', C.errorSoft, C.error)));
  });

  put('M-LV02', 'Form ajukan izin', { tab: 'Pengajuan', hideNav: true }, ({ body }) => {
    body.appendChild(inputField('Jenis', 'Sakit / Cuti / Izin lain', 'Sakit'));
    body.appendChild(inputField('Tanggal mulai', 'YYYY-MM-DD', '2026-09-22'));
    body.appendChild(inputField('Tanggal selesai', 'YYYY-MM-DD', '2026-09-23'));
    body.appendChild(inputField('Keterangan', 'Alasan singkat'));
    body.appendChild(cta('Kirim pengajuan', C.primary));
    body.appendChild(ghostCta('Batal'));
  });

  put('M-LV03', 'Detail pengajuan', { tab: 'Pengajuan' }, ({ body }) => {
    body.appendChild(pill('Pending', C.warningSoft, C.warning));
    body.appendChild(sectionTitle('Sakit', '22–23 Sep 2026'));
    body.appendChild(kvRow('Diajukan', '21 Sep · 18:02'));
    body.appendChild(kvRow('Supervisor', 'Andi Pratama'));
    body.appendChild(wrapTxt('Demam, istirahat di rumah.', 14, 'Regular', C.ink700));
    body.appendChild(ghostCta('Batalkan pengajuan'));
  });

  put('M-LV04', 'Pengajuan terkirim', { hideNav: true }, ({ body }) => {
    body.appendChild(banner('Pengajuan terkirim. Supervisor mendapat notifikasi.', C.successSoft, C.success));
    body.appendChild(cta('Lihat status', C.primary));
    body.appendChild(ghostCta('Kembali'));
  });

  put('M-OT01', 'Daftar lembur', { tab: 'Pengajuan' }, ({ body }) => {
    body.appendChild(sectionTitle('Lembur', 'Terintegrasi data kehadiran'));
    body.appendChild(cta('Ajukan lembur', C.primary));
    body.appendChild(listRow('19 Sep', '2.0 jam', pill('Disetujui', C.successSoft, C.success)));
    body.appendChild(listRow('12 Sep', '1.5 jam', pill('Pending', C.warningSoft, C.warning)));
  });

  put('M-OT02', 'Form lembur', { hideNav: true, tab: 'Pengajuan' }, ({ body }) => {
    body.appendChild(inputField('Tanggal', 'YYYY-MM-DD', '2026-09-22'));
    body.appendChild(inputField('Jam mulai', '16:30'));
    body.appendChild(inputField('Jam selesai', '18:30'));
    body.appendChild(wrapTxt('Maksimal 4 jam per pengajuan.', 12, 'Regular', C.ink500));
    body.appendChild(inputField('Keterangan', 'Penyelesaian loading'));
    body.appendChild(cta('Kirim', C.primary));
  });

  put('M-OT03', 'Detail lembur', { tab: 'Pengajuan' }, ({ body }) => {
    body.appendChild(pill('Disetujui', C.successSoft, C.success));
    body.appendChild(kvRow('Durasi', '2.0 jam'));
    body.appendChild(kvRow('Approver', 'Andi Pratama'));
    body.appendChild(kvRow('Waktu approve', '19 Sep · 20:11'));
  });

  put('M-N01', 'Pusat notifikasi', { tab: 'Beranda', hideNav: false }, ({ body }) => {
    body.appendChild(listRow('Izin disetujui', 'Cuti 1–5 Agu · baru saja', '›'));
    body.appendChild(listRow('Pengingat clock-in', 'Shift mulai 07:30', '›'));
    body.appendChild(listRow('Lembur ditolak', 'Alasan: melebihi 4 jam', '›'));
  });

  put('M-N02', 'Preferensi notifikasi', { tab: 'Profil' }, ({ body }) => {
    body.appendChild(listRow('Pengingat absensi', 'Sebelum shift', 'On'));
    body.appendChild(listRow('Status approval', 'Push segera', 'On'));
    body.appendChild(listRow('Quiet hours', '21.00–06.00', 'Off'));
  });

  put('M-P01', 'Profil saya', { tab: 'Profil' }, ({ body }) => {
    body.appendChild(sectionTitle('Budi Santoso', 'NIP 104892 · Karyawan'));
    body.appendChild(kvRow('Supervisor', 'Andi Pratama'));
    body.appendChild(kvRow('Lokasi default', 'Site A'));
    body.appendChild(listRow('Enrollment wajah', 'Terdaftar', '›'));
    body.appendChild(listRow('Pengaturan', '', '›'));
    body.appendChild(listRow('Bantuan', '', '›'));
  });

  put('M-P02', 'Pengaturan', { tab: 'Profil' }, ({ body }) => {
    body.appendChild(listRow('Ubah kata sandi', '', '›'));
    body.appendChild(listRow('Bahasa', 'Indonesia', '›'));
    body.appendChild(ghostCta('Keluar'));
  });

  put('M-P03', 'Enrollment wajah', { tab: 'Profil', hideNav: true }, ({ body }) => {
    body.appendChild(sectionTitle('Daftarkan wajah', 'Dipakai untuk verifikasi absensi'));
    body.appendChild(faceFrame('Ambil 3 foto jelas'));
    body.appendChild(cta('Simpan template', C.primary));
  });

  put('M-P04', 'Bantuan', { tab: 'Profil' }, ({ body }) => {
    body.appendChild(sectionTitle('Bantuan', 'Hubungi HRD Divisi Operation'));
    body.appendChild(listRow('FAQ absensi', 'Face & GPS', '›'));
    body.appendChild(listRow('Kontak HRD', 'hrd-ops@perusahaan.com', '›'));
    body.appendChild(card('Version'));
    last(body).appendChild(txt('Nexus Ops Mobile · 0.1.0', 12, 'Regular', C.ink500));
  });
}
