---
sidebar_position: 8
title: Git Workflow
---

# Git Workflow (Tim)

:::info Status
**Draft v0.3** — cara kerja Git sehari-hari. Ringkasan proses: [SDLC §6](./sdlc#6-alur-kerja-git--quality-gate). Setup tool: [Dev Setup](./dev-setup).
:::

| Field | Value |
|-------|-------|
| Version | 0.3.0 |
| Last updated | 2026-09-24 |

---

## Aturan singkat

1. Kerja di branch sendiri → buka **Pull Request** ke `main`. Jangan push langsung ke `main`.
2. PR kecil, satu concern. Minta **minimal 1 review**; **CI harus hijau** sebelum merge.
3. Setelah merge, branch remote **otomatis terhapus** — cukup bersihkan branch lokal.
4. Jangan commit secret / `.env`.

---

## Branch

```bash
git checkout main && git pull
git checkout -b feature/nama-singkat
```

| Prefiks | Contoh |
|---------|--------|
| `feature/` | `feature/attendance-clock-in` |
| `fix/` | `fix/jwt-expire-handling` |
| `chore/` | `chore/eslint-config` |
| `docs/` | `docs/dev-setup-windows` |

---

## Commit & PR

```bash
git add path/ke/file
git commit -m "feat: endpoint POST /leaves untuk karyawan"
git push -u origin HEAD
# lalu buka PR di GitHub, atau: gh pr create
```

Pesan commit fokus **mengapa** (boleh pakai `feat:` / `fix:` / `chore:` / `docs:`).  
Jika Husky/pre-commit gagal: perbaiki dulu — jangan `--no-verify`.

**Isi PR:** ringkasan singkat + cara verifikasi (test / screenshot UI jika perlu).

Setelah merge:

```bash
git checkout main && git pull
git fetch --prune
git branch -d feature/nama-singkat
```

---

## Sync & konflik

```bash
git fetch origin
git merge origin/main
```

Kalau konflik: selesaikan di editor → `git add` → `git commit` → jalankan lint/test lagi → push.  
`git push --force` ke `main` dilarang. Di branch sendiri, pakai `--force-with-lease` hanya jika yakin.

---

## Multi-repo

| Repo | Install / run | Catatan |
|------|---------------|---------|
| `backend` | `bun` | OpenAPI source of truth |
| `web` / `mobile` | `npm` | Setelah API berubah: `npm run api:sync` (butuh `gh auth`) |
| `docs` | `bun` | Dokumentasi |

API dulu di backend, klien follow-up di PR terpisah. Link PR ke issue/board bila ada.

---

## Jangan

- Push / commit langsung ke `main`
- Secret, dump DB, data pribadi di Git
- PR besar berhari-hari tanpa sync `main`
- Lewati Husky tanpa alasan
- Biarkan CI merah di `main`

---

## Cheat sheet

```bash
git status
git diff
git checkout main && git pull && git checkout -b feature/foo
git stash -u && git stash pop
git reset --soft HEAD~1   # batalkan commit terakhir (belum push), simpan perubahan
```

---

## Referensi

- [Dev Setup](./dev-setup) · [SDLC](./sdlc) · [Infrastructure](./infrastructure)
- Project board otomasi: secret `PROJECT_TOKEN` di repo **docs** (lihat SDLC §2)
