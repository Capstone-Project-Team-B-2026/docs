---
sidebar_position: 1
slug: /
title: Introduction
---

# Nexus Ops

![Nexus Ops](/img/brand/logo-web.png)

Dokumentasi Capstone Project 50 Team B 2026 — **Aplikasi Absensi Divisi Operation**.

## Pintasan

| | |
|--|--|
| Docs site | [capstone-project-team-b-2026.github.io/docs](https://capstone-project-team-b-2026.github.io/docs/) |
| Project board | [GitHub Projects #2 · view 4](https://github.com/orgs/Capstone-Project-Team-B-2026/projects/2/views/4) |
| Figma | [NexusOps design file](https://www.figma.com/design/JOx148Ldmrd6DnmVwoRkti/NexusOps?node-id=0-1) |
| API dev | [dev-nexus-ops-api…workers.dev](https://dev-nexus-ops-api.dev-akmal69.workers.dev) |
| API prod | [nexus-ops-api…workers.dev](https://nexus-ops-api.dev-akmal69.workers.dev) |
| Web dev | [dev-nexus-ops-web.pages.dev](https://dev-nexus-ops-web.pages.dev) |
| Web prod | [nexus-ops-web.pages.dev](https://nexus-ops-web.pages.dev) |
| APK dev | [mobile Actions · Build APK](https://github.com/Capstone-Project-Team-B-2026/mobile/actions) |

Daftar lengkap env & brand: **[Links & Environments](./links)**.

## Brand

| Web | Mobile light | Mobile dark |
|-----|--------------|-------------|
| ![web](/img/brand/logo-web.png) | ![light](/img/brand/logo-mobile-light.png) | ![dark](/img/brand/logo-mobile-dark.png) |

## Tim

| Anggota | GitHub | Peran |
|---------|--------|-------|
| Atin Mulyanto | [`atmcorporation`](https://github.com/atmcorporation) | Project Leader & Analyst + Manual Tester + **Karil** |
| Akmal Syarifudin | [`akmalsyrf`](https://github.com/akmalsyrf) | Backend & Infrastructure |
| Leonardus Sunu Kristianto | [`leokrist`](https://github.com/leokrist) | Mobile (auth, absensi, profil) |
| Asep Muhammad | [`asepmuhamad1300-ctrl`](https://github.com/asepmuhamad1300-ctrl) | UI/UX & Web dashboard |
| Moch Riswan Lutfin Anfa | [`anfariswan`](https://github.com/anfariswan) | Mobile (leave/OT/notif) & web pendukung |

Keputusan domain MVP terkunci di [PRD §10](./prd#10-keputusan-domain-terkunci-mvp). Karya ilmiah (karil) paralel S2–S8: [SDLC §4.1](./sdlc#41-karya-ilmiah-karil--lanjutan-metopen). Board: [Project #2](https://github.com/orgs/Capstone-Project-Team-B-2026/projects/2).

## Dokumen utama

| Dokumen | Status | Deskripsi |
|---------|--------|-----------|
| [Product Requirements Document (PRD)](./prd) | **Locked v1.0** | Kebutuhan produk, NFR, state machine, acceptance |
| [Software Development Life Cycle (SDLC)](./sdlc) | **Locked v1.0** | Proses hybrid, DoR/DoD, testing, kontrak OpenAPI |
| [Infrastructure Document](./infrastructure) | **Locked v1.0** | Stack + face on-device + FCM + R2 + ERD v1 |
| [Design System](./design-system) | **Locked v1.0** | Token, komponen, testID registry |
| [Screens & Pages](./screens) | **Locked v1.0** | Inventaris layar mobile (M-*) & web (W-*) |
| [Links & Environments](./links) | **Living** | URL docs, Figma, API, web, APK, brand assets |
| [Development Tools Setup](./dev-setup) | **Living** | Instalasi tooling lokal (fokus Windows) |
| [Git Workflow](./git-workflow) | **Living** | Branching trunk-based, commit, PR, review |

## Stack (ringkas)

| Lapisan | Repo | Stack | Package | Deploy |
|---------|------|-------|---------|--------|
| Backend | [backend](https://github.com/Capstone-Project-Team-B-2026/backend) | Bun · Hono · Zod→OpenAPI · Drizzle · Neon | `bun` | CF Workers (`main`→dev, `v*`→prod) |
| Web | [web](https://github.com/Capstone-Project-Team-B-2026/web) | Vue 3 · Vite · Orval · Vitest · Playwright | `npm` | CF Pages |
| Mobile | [mobile](https://github.com/Capstone-Project-Team-B-2026/mobile) | React Native · Expo 57 · Orval · Jest · Maestro | `npm` | APK artifact (Actions) |
| Docs | [docs](https://github.com/Capstone-Project-Team-B-2026/docs) | Docusaurus | `bun` | GitHub Pages |

Auth: JWT · roles `employee` / `supervisor` / `hrd` · sesi 12 jam. Face: on-device MobileFaceNet → Worker cosine. OpenAPI: bump `info.version` + publish ke `static/openapi.json`.

Detail: [Infrastructure Document](./infrastructure). Setup lokal: [Development Tools Setup](./dev-setup).

## Desain di Figma

File: [NexusOps di Figma](https://www.figma.com/design/JOx148Ldmrd6DnmVwoRkti/NexusOps?node-id=0-1).

Generator layar MVP: folder `figma-plugin/` (plugin development lokal). Asset logo ada di `figma-plugin/assets/` dan `static/img/brand/`. Build dengan `npm run build`, lalu load `manifest.json` di Figma → Plugins → Development.

## Cara menambah halaman

1. Buat file `.md` atau `.mdx` di folder `docs/`
2. (Opsional) set `sidebar_position` di front matter
3. Sidebar ter-generate otomatis dari struktur folder

## Repositories

| Repo | Link |
|------|------|
| Backend | [Capstone-Project-Team-B-2026/backend](https://github.com/Capstone-Project-Team-B-2026/backend) |
| Web | [Capstone-Project-Team-B-2026/web](https://github.com/Capstone-Project-Team-B-2026/web) |
| Mobile | [Capstone-Project-Team-B-2026/mobile](https://github.com/Capstone-Project-Team-B-2026/mobile) |
| Docs | [Capstone-Project-Team-B-2026/docs](https://github.com/Capstone-Project-Team-B-2026/docs) |
