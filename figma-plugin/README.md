# Nexus Ops Figma plugin

Generates the Nexus Ops screen set from `docs/docs/` (design-system, screens, PRD) into a Figma page.

Figma runs `code.js` only. Maintain sources under `src/`, then bundle.

```
src/
  main.js
  generate.js              scope routing + measured grid layout
  tokens.js                design-system.md v0.1 colors
  fonts.js
  catalog/
    ids.js                 all M-* (26) + W-* (18)
    metrics.js             PRD metrics + per-screen hints
  ui/
    layout.js / primitives.js / device.js / web-shell.js
  screens/
    tokens-board.js
    mobile/                M-* generators
    web/                   W-* generators
```

## Develop

```bash
cd figma-plugin
npm install
npm run watch   # or: npm run build
npm test        # build + coverage audit
```

In Figma: **Plugins → Development → Import plugin from manifest…** → pilih `manifest.json` di folder ini. Reload setelah rebuild.

Scopes:

- **Generate Everything** — tokens, PRD metrics, semua M-*, semua W-*
- **Tokens + Metrics Board**
- **Mobile Screens (M-*)**
- **Web Pages (W-*)**

Do not edit `code.js` directly.
