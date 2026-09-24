import { C, paint } from '../../tokens.js';
import { txt, wrapTxt, stretch, fixCollapsedText, col, row } from '../../ui/layout.js';
import {
  card, cta, ghostCta, secondaryCta, pill, listRow, softCard, inputField,
  kvRow, banner, sectionTitle, metricRow,
} from '../../ui/primitives.js';
import { webShell } from '../../ui/web-shell.js';

function last(node) {
  return node.children[node.children.length - 1];
}

function buildWeb(page, id, title, activeNav, chrome, build) {
  const { wrap, content } = webShell(id, title, 0, 0, activeNav, chrome);
  page.appendChild(wrap);

  // Do NOT inject planning metrics inside the page chrome — keeps frames slice-ready.
  build({ content, wrap });
  fixCollapsedText(wrap);
  return wrap;
}

export function generateWebAll(page, positions) {
  const put = (id, title, nav, chrome, fn) => {
    const wrap = buildWeb(page, id, title, nav, chrome, fn);
    positions.placeWeb(wrap);
    return wrap;
  };

  put('W-A01', 'Masuk dashboard', null, 'none', ({ content }) => {
    content.appendChild(inputField('Email', 'nama@perusahaan.com'));
    content.appendChild(inputField('Kata sandi', '••••••••'));
    content.appendChild(cta('Masuk', C.primary));
  });

  put('W-D01', 'Ringkasan operasional', 'Ringkasan', 'app', ({ content }) => {
    content.appendChild(metricRow([
      ['42', 'Hadir', C.success],
      ['3', 'Terlambat', C.warning],
      ['5', 'Belum absen', C.error],
      ['2', 'Izin', C.info],
    ]));
    content.appendChild(sectionTitle('Aktivitas terkini', 'Shift pagi · Site A & B'));
    content.appendChild(listRow('Budi Santoso', 'Clock-in 07:28 · Site A', pill('Hadir', C.successSoft, C.success)));
    content.appendChild(listRow('Citra Lestari', 'Belum clock-in', pill('Open', C.errorSoft, C.error)));
    content.appendChild(listRow('Dewi Anggraini', 'Izin sakit', pill('Izin', C.infoSoft, C.info)));
  });

  put('W-D02', 'Kehadiran live', 'Kehadiran', 'app', ({ content }) => {
    content.appendChild(banner('Refresh otomatis setiap 60 detik (draft)', C.accentSoft, C.accent));
    content.appendChild(sectionTitle('Belum absen — Shift Pagi', '5 karyawan'));
    ['Citra Lestari', 'Eko Prasetyo', 'Fajar Nugroho', 'Gita Putri', 'Hadi Wijaya'].forEach((n) => {
      content.appendChild(listRow(n, 'Site A · target 07:30', pill('Belum', C.ink100, C.ink500)));
    });
  });

  put('W-AP01', 'Inbox persetujuan', 'Persetujuan', 'app', ({ content }) => {
    content.appendChild(listRow('Izin sakit · Budi', '22–23 Sep', pill('Review', C.warningSoft, C.warning)));
    content.appendChild(listRow('Lembur · Citra', '2 jam · 19 Sep', pill('Review', C.warningSoft, C.warning)));
    content.appendChild(listRow('Cuti · Eko', '1–3 Okt', pill('Review', C.warningSoft, C.warning)));
  });

  put('W-AP02', 'Detail izin/cuti', 'Persetujuan', 'app', ({ content }) => {
    content.appendChild(sectionTitle('Izin sakit — Budi Santoso', '22–23 Sep 2026'));
    content.appendChild(wrapTxt('Demam, istirahat di rumah.', 14, 'Regular', C.ink700));
    content.appendChild(kvRow('Diajukan', '21 Sep · 18:02'));
    content.appendChild(inputField('Alasan penolakan (wajib jika tolak)', 'Contoh: overlapping absensi'));
    content.appendChild(wrapTxt('Tolak disabled sampai alasan terisi (validasi FE).', 12, 'Regular', C.ink500));
    const actions = row('Actions', 12);
    stretch(actions);
    const a = cta('Setujui', C.success);
    a.layoutAlign = 'INHERIT';
    a.primaryAxisSizingMode = 'AUTO';
    const r = secondaryCta('Tolak');
    r.layoutAlign = 'INHERIT';
    r.primaryAxisSizingMode = 'AUTO';
    actions.appendChild(a);
    actions.appendChild(r);
    content.appendChild(actions);
  });

  put('W-AP03', 'Detail lembur', 'Persetujuan', 'app', ({ content }) => {
    content.appendChild(sectionTitle('Lembur — Citra Lestari', '19 Sep · 2.0 jam'));
    content.appendChild(kvRow('Jam', '16:30 – 18:30'));
    content.appendChild(kvRow('Keterangan', 'Penyelesaian loading'));
    content.appendChild(inputField('Alasan penolakan (wajib jika tolak)', 'Contoh: melebihi kebijakan'));
    content.appendChild(cta('Setujui', C.success));
    content.appendChild(ghostCta('Tolak'));
  });

  put('W-T01', 'Daftar kehadiran', 'Kehadiran', 'app', ({ content }) => {
    content.appendChild(sectionTitle('Kehadiran hari ini', 'Filter: semua site'));
    [
      ['Budi Santoso', '07:28', 'Hadir'],
      ['Citra Lestari', '—', 'Belum'],
      ['Dewi Anggraini', 'Izin', 'Izin'],
    ].forEach(([n, t, s]) => {
      const color = s === 'Hadir' ? C.success : s === 'Izin' ? C.info : C.ink500;
      const bg = s === 'Hadir' ? C.successSoft : s === 'Izin' ? C.infoSoft : C.ink100;
      content.appendChild(listRow(n, t, pill(s, bg, color)));
    });
  });

  put('W-T02', 'Detail karyawan', 'Karyawan', 'app', ({ content }) => {
    content.appendChild(sectionTitle('Budi Santoso', 'NIP 104892 · Karyawan'));
    content.appendChild(kvRow('Supervisor', 'Andi Pratama'));
    content.appendChild(kvRow('Face enroll', 'Aktif'));
    content.appendChild(kvRow('Lokasi default', 'Site A'));
    content.appendChild(sectionTitle('7 hari terakhir', ''));
    content.appendChild(listRow('Sen 22', '07:28 clock-in', pill('Hadir', C.successSoft, C.success)));
  });

  put('W-R01', 'Hub laporan', 'Laporan', 'app', ({ content }) => {
    content.appendChild(sectionTitle('Laporan kehadiran', 'PDF & Excel untuk payroll/audit'));
    content.appendChild(listRow('Rekap harian', 'Per site / shift', '›'));
    content.appendChild(listRow('Rekap bulanan', 'Termasuk lembur & izin', '›'));
    content.appendChild(listRow('Keterlambatan', 'Statistik', '›'));
    content.appendChild(cta('Buat laporan', C.primary));
  });

  put('W-R02', 'Filter laporan', 'Laporan', 'app', ({ content }) => {
    content.appendChild(inputField('Periode mulai', '2026-09-01'));
    content.appendChild(inputField('Periode selesai', '2026-09-30'));
    content.appendChild(inputField('Karyawan', 'Semua / pilih'));
    content.appendChild(inputField('Status', 'Semua'));
    content.appendChild(cta('Terapkan filter', C.primary));
  });

  put('W-R03', 'Preview & unduh', 'Laporan', 'app', ({ content }) => {
    content.appendChild(banner('Preview 42 baris · Sep 2026', C.primarySoft, C.primaryDark));
    content.appendChild(softCard('Table', C.surface));
    last(content).appendChild(txt('NIP · Nama · Tanggal · Masuk · Keluar · Status · OT', 12, 'Medium', C.ink500));
    last(content).appendChild(txt('104892 · Budi · 22/09 · 07:28 · — · Hadir · 0', 12, 'Regular', C.ink700));
    const actions = row('Export', 12);
    stretch(actions);
    const xls = cta('Unduh Excel', C.primary);
    xls.layoutAlign = 'INHERIT';
    xls.primaryAxisSizingMode = 'AUTO';
    const pdf = secondaryCta('Unduh PDF (opsional)');
    pdf.layoutAlign = 'INHERIT';
    pdf.primaryAxisSizingMode = 'AUTO';
    actions.appendChild(xls);
    actions.appendChild(pdf);
    content.appendChild(actions);
  });

  put('W-H01', 'Manajemen pengguna', 'Karyawan', 'app', ({ content }) => {
    content.appendChild(cta('Tambah pengguna', C.primary));
    content.appendChild(listRow('Budi Santoso', 'Karyawan · Aktif', '›'));
    content.appendChild(listRow('Andi Pratama', 'Supervisor · Aktif', '›'));
    content.appendChild(listRow('Siti HRD', 'HRD · Aktif', '›'));
  });

  put('W-H02', 'Form pengguna', 'Karyawan', 'app', ({ content }) => {
    content.appendChild(inputField('Nama lengkap', 'Budi Santoso'));
    content.appendChild(inputField('Email', 'budi@perusahaan.com'));
    content.appendChild(inputField('Password awal', '••••••••'));
    content.appendChild(inputField('Role', 'Karyawan / Supervisor / HRD', 'Karyawan'));
    content.appendChild(inputField('Status', 'Aktif / Nonaktif', 'Aktif'));
    content.appendChild(inputField('Supervisor (opsional)', 'Andi Pratama'));
    content.appendChild(cta('Simpan', C.primary));
  });

  put('W-H03', 'Lokasi & geofence', 'Lokasi', 'app', ({ content }) => {
    content.appendChild(cta('Tambah lokasi', C.primary));
    content.appendChild(listRow('Site A — Gudang', 'Radius 100 m · Aktif', '›'));
    content.appendChild(listRow('Site B — Pool', 'Radius 100 m · Aktif', '›'));
    content.appendChild(wrapTxt('Clock-in valid di salah satu lokasi aktif.', 12, 'Regular', C.ink500));
  });

  put('W-H04', 'Form lokasi', 'Lokasi', 'app', ({ content }) => {
    content.appendChild(inputField('Nama', 'Site A — Gudang'));
    content.appendChild(inputField('Latitude', '-6.200'));
    content.appendChild(inputField('Longitude', '106.816'));
    content.appendChild(inputField('Radius (m)', '100'));
    content.appendChild(cta('Simpan lokasi', C.primary));
  });

  put('W-H05', 'Log audit', 'Pengaturan', 'app', ({ content }) => {
    content.appendChild(listRow('Approve leave #882', 'Andi · 21 Sep 20:11', '›'));
    content.appendChild(listRow('Export laporan Sep', 'Siti · 22 Sep 09:02', '›'));
    content.appendChild(listRow('Nonaktifkan user', 'Siti · 18 Sep', '›'));
  });

  put('W-S01', 'Pengaturan organisasi', 'Pengaturan', 'app', ({ content }) => {
    content.appendChild(inputField('Nama organisasi', 'Divisi Operation'));
    content.appendChild(inputField('Timezone', 'Asia/Jakarta'));
    content.appendChild(inputField('Default shift start', '07:30'));
    content.appendChild(inputField('Grace terlambat (menit)', '15'));
    content.appendChild(cta('Simpan', C.primary));
  });

  put('W-S02', 'Notifikasi sistem', 'Pengaturan', 'app', ({ content }) => {
    content.appendChild(listRow('FCM channel', 'Android karyawan', 'Aktif'));
    content.appendChild(listRow('Reminder clock-in', 'T-15 menit shift', 'On'));
    content.appendChild(listRow('Approval push', 'Supervisor + karyawan', 'On'));
  });
}
