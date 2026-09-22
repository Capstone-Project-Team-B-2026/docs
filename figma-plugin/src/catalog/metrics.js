/** PRD success metrics + per-screen hints */

export const NORTH_STAR = {
  id: 'NS-01',
  name: 'Kehadiran tervalidasi',
  formula: 'Valid clock-ins / Total clock-in attempts',
  definition: 'Persentase clock-in yang lolos wajah + GPS (target draft ≥ 95%).',
};

export const PRODUCT_METRICS = [
  { id: 'ACC', name: 'Accuracy clock-in', target: '≥ 95%', note: 'Wajah + GPS valid' },
  { id: 'RPT', name: 'Waktu rekap laporan', target: '< 5 menit', note: 'Generate PDF/Excel' },
  { id: 'UAT', name: 'Adoption UAT', target: '≥ 80%', note: 'Skenario utama lulus' },
  { id: 'NTF', name: 'Latency notifikasi', target: '< 1 menit', note: 'Setelah event approval' },
];

const MAP = {
  'M-H01': [{ value: 'ATT-04', label: 'Status hari ini' }, { value: '≤3', label: 'Langkah clock-in' }],
  'M-ATT01': [{ value: 'ATT-01', label: 'Clock entry' }],
  'M-ATT02': [{ value: 'ATT-02', label: 'Face validation' }],
  'M-ATT03': [{ value: 'ATT-03', label: 'GPS geofence' }],
  'M-ATT04': [{ value: 'ATT-05', label: 'Audit fields' }],
  'M-ATT05': [{ value: 'FACE', label: 'Reject reason' }],
  'M-ATT06': [{ value: 'GPS', label: 'Reject reason' }],
  'M-LV01': [{ value: 'LV-01', label: 'Pengajuan' }],
  'M-LV02': [{ value: 'LV-01', label: 'Form leave' }],
  'M-OT02': [{ value: 'OT-01', label: 'Form OT' }],
  'M-N01': [{ value: 'NTF-02', label: 'Status approval' }],
  'W-D01': [{ value: 'RPT-01', label: 'Dashboard harian' }],
  'W-D02': [{ value: 'ATT-06', label: 'Belum absen' }],
  'W-AP02': [{ value: 'LV-02', label: 'Approve leave' }],
  'W-AP03': [{ value: 'OT-02', label: 'Approve OT' }],
  'W-R03': [{ value: 'RPT-03', label: 'PDF / Excel' }],
  'W-H01': [{ value: 'AUTH-02', label: 'Kelola akun' }],
};

export function metricsFor(id) {
  return MAP[id] || [];
}
