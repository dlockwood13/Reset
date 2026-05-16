# RESET

> *For navigating redundancy in the UK*

A privacy-first Progressive Web App that helps you move through redundancy with clarity and momentum.

> **No accounts. No tracking. No server.** Every piece of data — your progress, journal entries, mood, name — stays on your device in `localStorage`.

## Features

- 📱 **Installable** on iOS, Android, and desktop home screens
- 🔌 **Works fully offline** after first load
- 🔒 **100% private** — all data stored locally, nothing leaves your device
- 🌒 **Automatic dark mode** based on system preference
- 🔥 **Streak tracking** to keep you consistent
- ✅ **Daily checklist** that auto-resets each day
- 📓 **Mood-aware journal** for reflections and wins
- 💚 **Mental health support** — crisis lines, breathing tools & grounding
- 📤 **Export your data** anytime as JSON backup
- 🗑️ **Clear all data** with one tap

## Brand

| | |
|---|---|
| **Primary** | `#3CBF9E` Teal |
| **Charcoal** | `#333333` |
| **Cloud Gray** | `#F5F7F6` |
| **White** | `#FFFFFF` |
| **Heading font** | Montserrat (600/700) |
| **Body font** | Lato (400/500/700) |

Brand assets live in `/assets/` (logo, icons, colors, fonts).

## Project structure

```
reset-pwa/
├── index.html              # App shell & layout
├── styles.css              # All styling (light + dark mode)
├── content.js              # Journey, checklist, resources data
├── app.js                  # Logic, storage, navigation, rendering
├── manifest.webmanifest    # PWA manifest
├── service-worker.js       # Offline cache
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   └── icon-source.svg
├── assets/
│   ├── logo/               # Logo lockups & marks
│   ├── colors/             # Color swatch reference
│   └── fonts/              # Bundled fonts (optional)
├── README.md
└── .gitignore
```

## Local development

No build step required. Just serve the folder:

```bash
npx serve .
```

Then open <http://localhost:3000>.

> Service workers need HTTP/HTTPS, not `file://`. Always serve through a local server.

## Deploy

### GitHub Pages
1. Push to GitHub
2. Repo Settings → Pages → Source: `main` branch, `/` root (or use the included workflow)
3. Visit `https://<username>.github.io/<repo>/`

### Netlify / Vercel
Drop the folder in — zero config needed.

## Icons

Generate the three PNG icons from `icons/icon-source.svg` using [pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator):

```bash
npx pwa-asset-generator icons/icon-source.svg ./icons --icon-only --type png --opaque false --padding "0"
```

Or use [realfavicongenerator.net](https://realfavicongenerator.net).

## Editing content

All journey sections, checklist tasks, mental health tools, and resources live in `content.js`. Edit that file to change what appears in the app — no other code changes needed.

## Data privacy

All data is stored under a single `localStorage` key: `reset.v1`. You can:
- **Export** your data as JSON via Settings
- **Clear all data** via Settings (irreversible)
- **Inspect** what's stored: DevTools → Application → Local Storage

## Browser support

Works on all modern browsers (Chrome, Safari, Firefox, Edge — 2022+).
PWA install: iOS Safari, Chrome (all platforms), Edge.

## Versioning

When shipping updates that change cached assets, bump `CACHE_VERSION` in `service-worker.js` so users receive the new files.

## License

MIT © [DanLockwood.co.uk](https://danlockwood.co.uk) · 2026
