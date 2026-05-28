# Periodic Kids — Interactive Periodic Table PWA

A fun, kid-friendly interactive periodic table that runs as a Progressive Web App (PWA) on phones, tablets, and desktops — with full offline support after the first load.

## What's inside

```
periodic-table-pwa/
├── index.html          ← App shell (HTML + CSS)
├── app.js              ← All element data and interactivity
├── manifest.json       ← PWA metadata (name, icons, colors)
├── service-worker.js   ← Offline caching
├── icons/
│   ├── icon-192.png            ← Standard Android icon
│   ├── icon-512.png            ← Standard Android icon (high-res)
│   ├── icon-192-maskable.png   ← Adaptive icon (Android 8+)
│   ├── icon-512-maskable.png   ← Adaptive icon (high-res)
│   ├── apple-touch-icon.png    ← iOS home screen icon
│   ├── favicon.ico             ← Browser tab icon
│   ├── favicon-16.png
│   └── favicon-32.png
└── README.md
```

## Features

- **Multiple kids / player profiles** — each player picks a name + avatar; **every session asks "Who's playing?"** and each kid's progress (discoveries, XP, badges, streak) is saved separately
- **Leaderboard** — ranks all the explorers on the device by XP (👑 / 🥈 / 🥉), highlighting the current player
- **Atomi the mascot** — a friendly cartoon buddy who reacts and cheers as you discover, level up, and answer quizzes
- **Learn tabs on every element** — **🔧 Uses**, **📜 History** (discovery story), and **🧪 How we get it** (extraction / experimental process), with curated facts for famous elements and a sensible per-family fallback for the rest
- **All 118 elements** with everyday examples kids can relate to (bananas for potassium, iPhone screens for silicon, fridge magnets for neodymium, etc.)
- **Discovery collection game** — tap an element to "discover" it (gold ⭐), with a live **X / 118** progress bar
- **XP & Explorer Levels** — earn XP for discovering elements and answering quiz questions; level up with a celebration
- **Badges / achievements** — 9 unlockable badges (First Find, Element Hunter, Noble Crew, On Fire, Star Explorer, Element Master…)
- **Progressive streak quiz** — questions get harder (Easy → Medium → Hard) as your streak grows, with confetti and encouraging feedback
- **⏱️ Timed Challenge** — a 60-second blitz: answer as many as you can, earn XP, and beat your best score (unlocks the Blitz Champ badge)
- **⚖️ Compare game** — two elements face off: guess which is heavier / hotter-melting / discovered first / bigger, then see them revealed side-by-side
- **SVG mini-illustrations** — every element shows a hand-drawn vector icon (a battery for lithium, a balloon for helium, a magnet for iron, a radioactive trefoil for uranium…), mapped per element with a per-family fallback
- **Element of the Day** — a fresh featured element each day
- **Sound effects** — generated in-browser via the Web Audio API (no audio files); toggle with the 🔊 button
- **Confetti celebrations** — drawn on a `<canvas>` for level-ups, badges, and quiz streaks
- **Four display modes**: element names, outer electron shell, year discovered, melting point
- **Filter by category** + **search** by name, symbol, or atomic number
- **Progress persists** in `localStorage` (discoveries, XP, badges, best streak, sound preference)
- **Works offline** after first load · **installable** on iOS, Android, Windows, Mac, ChromeOS
- **Dark mode** follows system setting · **responsive** for phones, tablets, and desktop

## Testing locally

Service workers require HTTPS or localhost. Don't double-click `index.html` — serve it over a local web server instead:

```bash
# Python (almost always pre-installed)
cd periodic-table-pwa
python3 -m http.server 8000
# then open http://localhost:8000

# Or Node.js
npx serve .

# Or any static server you like
```

Open Chrome DevTools → Application → Manifest to verify the PWA is detected. You should see "Add to home screen" eligibility and the icons listed.

## Deploying — pick the option that fits

### Option 1: Free static hosting (recommended start)

All of these are free for small projects, give you HTTPS automatically, and deploy in under 5 minutes:

| Host | How |
|------|-----|
| **Netlify** | Drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` from inside the folder |
| **Cloudflare Pages** | Connect a Git repo at [pages.cloudflare.com](https://pages.cloudflare.com) |
| **GitHub Pages** | Push to a repo, enable Pages in Settings |
| **Firebase Hosting** | `firebase init` then `firebase deploy` |

After deploying, kids can visit the URL on any device and tap "Add to Home Screen" (iOS Safari share menu, Chrome menu on Android) to install it like a native app.

### Option 2: Package for the App Store / Google Play

Use [PWABuilder](https://www.pwabuilder.com/) — paste your deployed URL and it generates submission-ready packages:

- **Android**: Trusted Web Activity (TWA) APK/AAB ready for Google Play ($25 one-time fee)
- **iOS**: Xcode project ready for App Store ($99/year Apple Developer fee)
- **Windows**: MSIX package for the Microsoft Store
- **Meta Quest**: AAB for the Quest Store

Or use [Capacitor](https://capacitorjs.com/) for more control over native features (push notifications, haptics, in-app purchases). Your existing HTML/JS goes inside a native shell.

### Option 3: Desktop apps

Wrap with [Tauri](https://tauri.app/) (small binaries, ~3 MB) or [Electron](https://www.electronjs.org/) (larger, ~80 MB but battle-tested) to ship Mac/Windows/Linux installers from the same codebase.

## Customizing

### Add or edit elements
Element data lives in the `ELS` array in `app.js`. Each row is:
```js
[atomicNumber, symbol, name, mass, period, group, category,
 electronConfig, yearDiscovered, discoverer, meltingPoint,
 funFact, [exampleArray]]
```

### Change colors or branding
- `manifest.json` → `theme_color` and `background_color`
- `index.html` `<meta name="theme-color">` 
- `make_icons.py` constants if you regenerate icons

### Update cache version (do this on every release)
When you edit `app.js`, bump the version in **three** places so browsers and installed apps fetch the new code instead of a stale cached copy:
1. `index.html` — the script tag: `<script src="app.js?v=2">` → `?v=3`
2. `service-worker.js` — the `ASSETS` entry: `'./app.js?v=2'` → `'./app.js?v=3'`
3. `service-worker.js` — `CACHE_NAME`: `'periodic-kids-v2'` → `'periodic-kids-v3'`

(The `?v=` query is what reliably busts the cache — a plain `app.js` reference can be served stale by the service worker.)

## License & credits
Free to use, modify, and distribute for educational purposes.
Element facts compiled from public-domain chemistry references.

Built with care for curious kids everywhere.
