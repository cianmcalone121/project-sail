# Project SAIL — Mobilising the Nation

A desktop-first, responsive editorial microsite for the supplied **Project SAIL — Full Draft for Review**. Built with semantic HTML, CSS and small progressive-enhancement JavaScript components. No framework, package installation, external fonts, cookies, analytics, API keys or runtime dependencies.

## Run locally

Requires Node.js 18 or newer.

```sh
npm start
```

Open http://127.0.0.1:4173. Stop with Ctrl+C. You can also run `node scripts/serve.mjs` directly. To change the port on macOS/Linux, run `PORT=4200 npm start`.

Alternatively, with Python 3 installed:

```sh
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

Opening `dist/index.html` directly also works for reading and interactions. An HTTP server is recommended for consistent download behaviour.

## Structure and components

- `dist/index.html` — semantic page sections: Masthead, ReadingRail, Hero, ActionPlanContext, ProgressSnapshot, CoordinationCeiling, SprintComparison, ProsperityCompact, RecommendationList, ReportCTA.
- `dist/styles.css` — design tokens, desktop layout, named component styles, mobile breakpoints, print styles and reduced-motion support.
- `dist/app.js` — vertical reading progress, active chapter navigation, scroll reveals, the desktop coordination story and Compact stage controls. Functions are independent initialisers.
- `dist/content.json` — the editable source for all ten recommendation cards, with source locations, owners, commitments and timelines.
- `dist/report.html` — full text reading edition, including tables and editorial notes from the original draft, with deep links to each recommendation. Embedded visuals and original formatting remain in the source Word file.
- `dist/assets/project-sail-full-draft.docx` — unchanged user-supplied report. Download is labelled Word document and draft for review; no fabricated PDF is provided.
- `scripts/sync-content.mjs` — RecommendationCard renderer. Regenerates the card section from `content.json`.
- `scripts/check.mjs` — local integrity checks.
- `SOURCE-NOTES.md` — content provenance and editorial boundaries.

## Edit and validate

Edit `dist/content.json` for recommendation copy, then:

```sh
npm run build
npm run check
```

Other narrative sections are directly editable in `dist/index.html`. Visual tokens are at the top of `dist/styles.css`. No bundling step is required. `dist/` is both the tracked source surface and the deployable output.

## Interaction and accessibility

- Left-hand reading rail with percentage and chapter states on desktop; compact chapter index and a left-edge progress line on mobile. Anchor navigation works without JavaScript.
- Two coordination-diagram states with descriptive, live-updated text; the desktop diagram stays beside the argument and changes as its two passages enter view. Both states are also selectable directly. The diagram is explicitly conceptual, not a numerical chart.
- Four selectable Compact stages, with a rotating quarter-circle highlight, native buttons, pressed states and live text. No automatic stage cycling.
- One-time headline and chapter reveals, sequential animation of fifty assessment markers, and finite diagram animations. Reduced-motion preferences disable motion. Content remains visible without JavaScript.
- Ten keyboard-operable native disclosure cards; each links directly to its full source recommendation.
- Skip link, heading hierarchy, visible keyboard focus, text equivalents for diagrams, responsive type and reduced-motion support.
- Recommendation disclosure and report download work without JavaScript. A no-script fallback describes the remaining Compact stages.

## Deployment

Public preview: https://cianmcalone121.github.io/project-sail/

GitHub Pages publishes the root of the `gh-pages` branch. That branch contains the contents of `dist/` and a `.nojekyll` file. After editing and checking the source on `main`, copy the updated contents of `dist/` to the root of `gh-pages` to publish an update. Changes on `main` alone do not update the preview.

The website, repository and downloadable draft report are public. Visitors do not need a login. The report remains a draft for review.

## Checks completed

JavaScript syntax; local links, assets and anchors; ten unique recommendation cards; source file integrity; desktop and mobile browser inspection; all disclosure cards; diagram controls and report navigation. See `QA.md` for tested viewports and limits.
