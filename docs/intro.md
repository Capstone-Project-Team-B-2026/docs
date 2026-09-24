---
sidebar_position: 1
slug: /
title: Introduction
---

# Nexus Ops

Dokumentasi Capstone Project 50 Team B 2026 — **Aplikasi Absensi Divisi Operation**.

## Tim

| Anggota | GitHub | Peran |
|---------|--------|-------|
| Atin Mulyanto | [`atmcorporation`](https://github.com/atmcorporation) | Project Leader & Analyst + Manual Tester |
| Akmal Syarifudin | [`akmalsyrf`](https://github.com/akmalsyrf) | Backend & Infrastructure |
| Leonardus Sunu Kristianto | [`leokrist`](https://github.com/leokrist) | Mobile (auth, absensi, profil) |
| Asep Muhammad | [`asepmuhamad1300-ctrl`](https://github.com/asepmuhamad1300-ctrl) | UI/UX & Web dashboard |
| Moch Riswan Lutfin Anfa | [`anfariswan`](https://github.com/anfariswan) | Mobile (leave/OT/notif) & web pendukung |

Keputusan domain MVP terkunci di [PRD §10](./prd#10-keputusan-domain-terkunci-mvp). Board: [Project #2](https://github.com/orgs/Capstone-Project-Team-B-2026/projects/2).

## Dokumen utama

| Dokumen | Status | Deskripsi |
|---------|--------|-----------|
| [Product Requirements Document (PRD)](./prd) | **v0.2.1** (keputusan domain terkunci) | Kebutuhan produk, scope, user stories, acceptance criteria |
| [Software Development Life Cycle (SDLC)](./sdlc) | Draft | Proses hybrid Waterfall + Scrum, fase, DoD, release |
| [Infrastructure Document](./infrastructure) | Draft v0.3.1 | Stack terkunci + **FCM** + **Cloudflare R2** |
| [Design System](./design-system) | Draft | Token warna, tipografi, komponen, pola UI |
| [Screens & Pages](./screens) | Draft | Inventaris layar mobile (M-*) & web (W-*) |
| [Development Tools Setup](./dev-setup) | Draft | Instalasi Git, VS Code, Bun/npm, JDK, Android Studio (fokus Windows) |
| [Git Workflow](./git-workflow) | Draft | Branching trunk-based, commit, PR, review, kolaborasi tim |

## Stack (ringkas)

| Lapisan | Repo | Stack | Package | Deploy |
|---------|------|-------|---------|--------|
| Backend | [backend](https://github.com/Capstone-Project-Team-B-2026/backend) | Bun · Hono · Zod→OpenAPI · Drizzle · Neon | `bun` | CF Workers (`main`→dev, `v*`→prod) |
| Web | [web](https://github.com/Capstone-Project-Team-B-2026/web) | Vue 3 · Vite · Orval · Vitest | `npm` | CF Pages |
| Mobile | [mobile](https://github.com/Capstone-Project-Team-B-2026/mobile) | React Native · Expo 57 · Expo Router · Orval · Jest | `npm` | APK artifact (Actions) |
| Docs | [docs](https://github.com/Capstone-Project-Team-B-2026/docs) | Docusaurus | `bun` | GitHub Pages |

Auth API: JWT · roles `employee` / `supervisor` / `hrd`. Backend coverage CI ≥ 95%. OpenAPI: `/docs` lokal / Worker; klien sync via `gh` + Orval.

Detail: [Infrastructure Document](./infrastructure). Setup lokal: [Development Tools Setup](./dev-setup).

## Desain di Figma

Generator layar MVP ada di folder `figma-plugin/` (plugin development lokal). Build dengan `npm run build`, lalu load `manifest.json` di Figma → Plugins → Development.

## Cara menambah halaman

1. Buat file `.md` atau `.mdx` di folder `docs/`
2. (Opsional) set `sidebar_position` di front matter
3. Sidebar ter-generate otomatis dari struktur folder

```md
---
sidebar_position: 2
title: Getting Started
---

# Getting Started

Isi halaman...
```

## Repositories

| Repo | Link |
|------|------|
| Backend | [Capstone-Project-Team-B-2026/backend](https://github.com/Capstone-Project-Team-B-2026/backend) |
| Web | [Capstone-Project-Team-B-2026/web](https://github.com/Capstone-Project-Team-B-2026/web) |
| Mobile | [Capstone-Project-Team-B-2026/mobile](https://github.com/Capstone-Project-Team-B-2026/mobile) |
| Docs | [Capstone-Project-Team-B-2026/docs](https://github.com/Capstone-Project-Team-B-2026/docs) |
