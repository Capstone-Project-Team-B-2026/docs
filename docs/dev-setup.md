---
sidebar_position: 7
title: Development Tools Setup
---

# Development Tools Setup

:::info Status
**Living** — panduan instalasi & konfigurasi tooling lokal. Fokus utama **Windows**; macOS & Linux disertakan ringkas. Selaras stack terkunci di [Infrastructure](./infrastructure).
:::

| Field | Value |
|-------|-------|
| Product | Nexus Ops — Aplikasi Absensi Divisi Operation |
| Version | 0.3.0 |
| Tim | Kelompok B — Capstone Project 50 Team B 2026 |
| Last updated | 2026-09-24 |

---

## 1. Tujuan dokumen

Dokumen ini memastikan setiap anggota tim punya lingkungan development yang **seragam dan siap kerja** sebelum clone repo. Setelah setup selesai, lanjutkan ke [Git Workflow](./git-workflow).

Dokumen terkait: [Infrastructure](./infrastructure) (stack & deploy) · [SDLC](./sdlc) (proses tim).

---

## 2. Ringkasan tooling

| Tool | Wajib untuk | Versi target |
|------|-------------|--------------|
| **Git** | Semua repo | 2.40+ |
| **VS Code** | Editor utama | Latest stable |
| **Bun** | **Backend** + **Docs** (`packageManager: bun`) | 1.1.x+ (lihat `packageManager` di repo) |
| **Node.js + npm** | **Web** + **Mobile** (`packageManager: npm`) | **Node 22+ / 24** (CI memakai Node 24) |
| **GitHub CLI** (`gh`) | Web & mobile (`npm run api:sync` ke OpenAPI private) | Latest |
| **JDK 17** | Mobile — `expo prebuild` / Gradle APK | **17** (LTS) |
| **Android Studio** | Mobile — emulator, SDK, debug APK | Latest stable |
| **Dev client / APK** | Mobile face/camera (vision-camera + TFLite) | `expo prebuild` — **Expo Go tidak cukup** |
| **Playwright** (browsers) | Web E2E — `npx playwright install chromium` | Sesuai `@playwright/test` di web |
| **Maestro CLI** | Mobile E2E Android — [install](https://docs.maestro.dev/getting-started/installing-maestro) | Latest |

| Peran | Tool wajib | Package manager | Opsional |
|-------|------------|-----------------|----------|
| Backend | Git, Bun, VS Code | `bun` | Wrangler CLI, `gh` |
| Web | Git, Node/npm, VS Code, `gh` | `npm` | Playwright Chromium |
| Mobile | Git, Node/npm, JDK 17, Android Studio, VS Code, `gh` | `npm` | Device fisik, Maestro CLI |
| Docs / UI | Git, Bun, VS Code | `bun` | Figma Desktop |

:::note Bun vs npm
- **Backend & Docs** → `bun install` / `bun run …`
- **Web & Mobile** → `npm install` / `npm run …` (jangan campur lockfile)
:::

---

## 3. Checklist cepat (semua OS)

```bash
git --version
code --version          # VS Code CLI (opsional)
bun --version           # Backend / Docs
node --version && npm --version   # Web / Mobile (Node 22+)
gh --version            # Web / Mobile api:sync
java -version           # Mobile: harus JDK 17
```

Konfigurasi Git sekali saja:

```bash
git config --global user.name "Nama Lengkap"
git config --global user.email "email@yang-sama-dengan-github.com"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

Autentikasi GitHub:

- HTTPS + credential helper, atau SSH key
- **Wajib untuk web/mobile:** `gh auth login` (baca repo private `backend` untuk sync OpenAPI)

```bash
gh auth login
gh auth status
```

---

## 4. Windows (utama)

### 4.1 Prasyarat Windows

| Item | Catatan |
|------|---------|
| OS | Windows 10 (22H2+) atau Windows 11 |
| Hak admin | Dibutuhkan untuk installer & PATH |
| Disk | Cadangan ≥ 15 GB (Android Studio paling boros) |
| Terminal | **Windows Terminal** + PowerShell 7, atau Git Bash |

Install [Windows Terminal](https://aka.ms/terminal) dari Microsoft Store jika belum ada.

:::tip Winget
Cek dengan `winget --version`. Jika tidak ada, install App Installer dari Microsoft Store.
:::

### 4.2 Git

```powershell
winget install --id Git.Git -e --source winget
```

Atau unduh dari [https://git-scm.com/download/win](https://git-scm.com/download/win).

Saat wizard:

1. Editor: **Visual Studio Code**.
2. PATH: *Git from the command line and also from 3rd-party software*.
3. Line ending: **Checkout Windows-style, commit Unix-style** (`core.autocrlf=true`).
4. Terminal: Windows Terminal / MinTTY.

```powershell
git --version
```

### 4.3 Visual Studio Code

```powershell
winget install --id Microsoft.VisualStudioCode -e --source winget
```

Atau [https://code.visualstudio.com/](https://code.visualstudio.com/). Pastikan *Add to PATH* dicentang.

**Ekstensi disarankan:**

| Extension ID | Kegunaan |
|--------------|----------|
| `dbaeumer.vscode-eslint` | Lint |
| `esbenp.prettier-vscode` | Format |
| `Vue.volar` | **Web** — Vue 3 + Vite |
| `expo.vscode-expo-tools` | **Mobile** — Expo |
| `msjsdiag.vscode-react-native` | **Mobile** — React Native (opsional) |
| `eamodio.gitlens` | Riwayat & blame Git |
| `usernamehw.errorlens` | Error inline (opsional) |

```powershell
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension Vue.volar
code --install-extension expo.vscode-expo-tools
code --install-extension eamodio.gitlens
```

Aktifkan *Format on Save*; set Prettier sebagai default formatter untuk JS/TS/Vue/TSX.

### 4.4 Bun (Backend & Docs)

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Tutup & buka ulang terminal:

```powershell
bun --version
```

Jika tidak dikenali: pastikan `%USERPROFILE%\.bun\bin` di PATH.  
Docs: [https://bun.sh/docs/installation](https://bun.sh/docs/installation)

### 4.5 Node.js + npm (Web & Mobile)

CI web/mobile memakai **Node 24**. Install LTS terbaru atau Node 24:

```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget
```

Atau [https://nodejs.org/](https://nodejs.org/).

```powershell
node --version   # 22.x atau 24.x
npm --version
```

### 4.6 Java JDK 17 (Mobile — native / APK)

Dibutuhkan untuk `npm run prebuild` / `android:build:debug` (Expo → Gradle), **bukan** Capacitor.

```powershell
winget install --id Microsoft.OpenJDK.17 -e --source winget
```

Alternatif: [Temurin 17](https://adoptium.net/).

```powershell
java -version
# openjdk version "17.x.x"
```

Set `JAVA_HOME` jika belum otomatis (mis. `C:\Program Files\Microsoft\jdk-17.x.x`) dan tambahkan `%JAVA_HOME%\bin` ke `Path`.

### 4.7 Android Studio (Mobile)

1. Unduh [Android Studio](https://developer.android.com/studio).
2. Wizard: centang **Android SDK**, **Android SDK Platform**, **Android Virtual Device**.
3. *SDK Manager* → install platform mendekati CI (repo mobile memakai **API 36** di Actions) + Build-Tools + Emulator.
4. Buat AVD untuk uji Expo / debug APK.

| Variable | Contoh nilai |
|----------|--------------|
| `ANDROID_HOME` | `C:\Users\<USER>\AppData\Local\Android\Sdk` |
| Path | `%ANDROID_HOME%\platform-tools` |
| Path | `%ANDROID_HOME%\emulator` |

```powershell
adb version
```

**Alur mobile sehari-hari:**

| Mode | Perintah | Butuh |
|------|----------|--------|
| Dev cepat | `npm start` lalu tekan `a`, atau `npm run dev:android` | Node + emulator/device (Expo Go atau dev client) |
| Native / APK lokal | `npm run android:build:debug` | JDK 17 + Android SDK |

Folder `android/` digenerate oleh `expo prebuild` dan **tidak di-commit**.

### 4.8 GitHub CLI (wajib web & mobile)

```powershell
winget install --id GitHub.cli -e --source winget
gh auth login
```

`npm run api:sync` di web/mobile mengambil `openapi.json` private dari backend lewat `gh api` (bukan raw URL publik).

### 4.9 Troubleshooting Windows

| Gejala | Perbaikan |
|--------|-----------|
| Perintah tidak dikenali setelah install | Tutup semua terminal / VS Code, buka ulang; cek PATH |
| `bun` / `git` hanya jalan di Git Bash | Restart Windows Terminal |
| Execution policy memblokir install Bun | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `api:sync` 404 / auth gagal | `gh auth login` + pastikan akses org `Capstone-Project-Team-B-2026` |
| Line ending conflict di PR | `core.autocrlf=true` di Windows |
| Antivirus memblokir emulator | Exception folder Android SDK & `.gradle` |
| JDK salah versi | `JAVA_HOME` → JDK **17** |

---

## 5. macOS (ringkas)

```bash
brew install git node gh
brew install --cask visual-studio-code android-studio temurin@17
curl -fsSL https://bun.sh/install | bash
```

Tambahkan `~/.bun/bin` ke `PATH` di `~/.zshrc`. Line ending: jangan pakai `core.autocrlf=true`.

---

## 6. Linux (ringkas)

```bash
sudo apt update && sudo apt install -y git curl unzip openjdk-17-jdk
curl -fsSL https://bun.sh/install | bash

# Node via nvm (contoh)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 24

# VS Code, Android Studio, gh: unduh dari situs resmi / docs GitHub CLI
```

Ekspor `JAVA_HOME` dan `ANDROID_HOME` di shell rc.

---

## 7. Clone & jalankan repo

Org: [Capstone-Project-Team-B-2026](https://github.com/Capstone-Project-Team-B-2026)

### Backend — Bun

```bash
git clone https://github.com/Capstone-Project-Team-B-2026/backend.git
cd backend
bun install
cp .env.example .env   # DATABASE_URL (Neon), JWT_SECRET
bun run db:migrate && bun run db:seed
bun run dev            # http://localhost:3000 · OpenAPI UI /docs
```

### Web — Vue 3 + Vite (npm)

```bash
git clone https://github.com/Capstone-Project-Team-B-2026/web.git
cd web
npm install
cp .env.example .env.development.local   # opsional
gh auth login                            # sekali
npm run api:generate                     # atau npm run api:sync
npm run dev
```

### Mobile — React Native + Expo (npm)

```bash
git clone https://github.com/Capstone-Project-Team-B-2026/mobile.git
cd mobile
npm install
cp .env.example .env.development.local   # opsional EXPO_PUBLIC_*
gh auth login
npm run api:generate                     # atau npm run api:sync
npm start                                # Metro; tekan `a` untuk Android
# atau: npm run dev:android
# APK debug lokal: npm run android:build:debug
```

### Docs — Bun

```bash
git clone https://github.com/Capstone-Project-Team-B-2026/docs.git
cd docs
bun install
bun start
```

:::warning Secrets
Jangan commit `.env*`, token, atau kunci API. Lihat [Infrastructure](./infrastructure).
:::

Alur branch / PR: [Git Workflow](./git-workflow).

---

## 8. Verifikasi peran

### Backend

- [ ] `bun --version` OK  
- [ ] `bun install` → `bun run dev` / `bun run test:coverage`  

### Web

- [ ] Node 22+ / npm OK  
- [ ] `gh auth status` OK  
- [ ] `npm install` → `npm run api:generate` → `npm run dev`  

### Mobile

- [ ] Node 22+ / npm OK  
- [ ] JDK 17 + `ANDROID_HOME` / `adb` (untuk native/APK)  
- [ ] Emulator, device, atau Expo Go  
- [ ] `npm start` / `npm run dev:android` jalan  

### Semua

- [ ] Git identity sesuai GitHub  
- [ ] Bisa `git push`  
- [ ] VS Code: ESLint + Prettier (+ Volar untuk web, Expo tools untuk mobile)  

---

## 9. Riwayat revisi

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 0.1.0 | 2026-09-24 | Draft awal: Git, VS Code, Bun, Node, JDK, Android Studio; fokus Windows |
| 0.2.0 | 2026-09-24 | Selaras repo: Bun=BE/docs, npm=web/mobile; RN+Expo (bukan Capacitor); `gh` untuk OpenAPI; CF Pages / APK CI |
| 0.3.0 | 2026-09-24 | Living guide; Expo Go tidak cukup untuk face (dev client / APK wajib) |

---

## Referensi

- [Git Workflow](./git-workflow)
- [Infrastructure Document](./infrastructure)
- [Software Development Life Cycle (SDLC)](./sdlc)
- [Introduction](./)
- [Expo docs](https://docs.expo.dev/)
- [Bun installation](https://bun.sh/docs/installation)
- [Git for Windows](https://git-scm.com/download/win)
- [Android Studio](https://developer.android.com/studio)
