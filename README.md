# ローリーの日本語ハブ — Japanese Learning Hub

A static, no-build Japanese learning hub that personalizes itself around an Anki collection. Open `index.html` in a browser — no server or install required (a local server is optional, see the Setup page).

**Live site:** [rory-97.github.io/Japanese-Learning-Hub](https://rory-97.github.io/Japanese-Learning-Hub/) (hosted via GitHub Pages from `main`)

> To use live Anki sync from the hosted site, add `"https://rory-97.github.io"` to `webCorsOriginList` in the AnkiConnect config (Tools → Add-ons → AnkiConnect → Config), then restart Anki.

## Pages

| Page | What it does |
|---|---|
| `index.html` | Dashboard: Anki connect, deck stats, adaptive suggestions |
| `kana.html` | Hiragana/katakana charts + drills |
| `kanji.html` | Core N5 kanji browser + "Random 20 from Anki" + reading quiz (subtab pair with Radicals) |
| `radicals.html` | All 214 Kangxi radicals, searchable, deck badges |
| `grammar.html` | Sentence structure, full particle guide, conjugation tables, N5–N4 grammar patterns, politeness |
| `particles.html` | Redirect stub → `grammar.html#particles` (old links keep working) |
| `cheatsheets.html` | Numbers, counters, time, question words, pronouns, and more — click-to-hear |
| `speaking.html` | Pronunciation, pitch accent, phrases, deck shadowing |
| `quizzes.html` | Dynamic kana/kanji/particle/grammar/mixed quizzes + adaptive "My vocab" mode |
| `setup.html` | Anki setup, video mining, and manga mining guides (tabbed, per-platform) |

## How it works

- **Anki integration** (`assets/anki.js`): live via AnkiConnect (`127.0.0.1:8765`) on desktop, or import of an Anki plain-text export. Cards are classified known (interval ≥ 21d) vs learning; word/reading/gloss/sentence are extracted heuristically from note fields. All data stays in the visitor's `localStorage`.
- **Audio** (`assets/audio.js`): free browser TTS (Web Speech API — needs a Japanese OS voice).
- **Content data**: `assets/*-data.js` (kana, kanji, radicals, phrases, particle quiz).
- **Theme**: `assets/theme.css`.

Desktop-first: the hub is designed for desktop browsers. Phone study happens in the Anki apps (AnkiDroid / AnkiMobile), which sync back through AnkiWeb.

No frameworks, no build step, no external requests except Google Fonts.
