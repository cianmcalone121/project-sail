# Project SAIL — Mobilising the Nation

A responsive digital reading edition of the full Project SAIL review draft. Hosted at https://cianmcalone121.github.io/project-sail/.

## Editing and handover

- `dist/report.html`: canonical full draft text, tables, references and original recommendation anchors. Edit its `article#report-text` to update report copy.
- `dist/index.html`: opening statement, report cover, navigation and partner-logo area. Content between `REPORT START` and `REPORT END` is generated; edit the source report instead.
- `dist/report-design.css`: homepage typography, restrained purple theme and responsive layout.
- `dist/report-design.js`: expand/collapse, anchor navigation and reading progress.
- `dist/assets/report-cover.jpg`: cover rendered from the supplied one-page “Zinc Taskforce 2026 v3 cover.pdf”.
- `dist/assets/project-sail-full-draft.docx`: original draft download. Replace the file and update labels/links when the final report is approved.
- `dist/content.json`: legacy summary data, no longer used to generate the homepage. Do not edit it expecting changes to the full report.

No package installation is needed. With Node.js 18 or later:

```sh
npm run build
npm run check
npm start
```

Preview at http://127.0.0.1:4173. `build` regenerates the homepage chapters from the full reading edition. Checks verify all report paragraphs and tables are preserved, ten recommendations exist, IDs are unique, and local links and assets resolve.

## Publishing

GitHub Pages publishes the root of `gh-pages`. Commit source changes on `main`, then copy the checked contents of `dist/` to the root of `gh-pages`, preserving `.nojekyll` and any configured `CNAME`. Changes on `main` alone do not publish. Wait for the Pages deployment to succeed and check the live homepage, a recommendation and the download. To roll back, restore the previous published files in a new commit on `gh-pages`.

## Review status

The supplied PDF contains only the cover; it provides visual direction, not updated policy text. The site retains the previously supplied full review draft, including editorial queries and references. Updated NDL wording, attribution, approved partner logos, final PDF and final policy sign-off are still needed from the report owners. No unconfirmed partner endorsement is implied. The reserved partner area can be populated with approved logo assets and descriptive alt text.

## Accessibility

Named section links preserve the source's section 1–5 numbering. Recommendations and the detailed assessment use native disclosures, with expand/collapse-all controls for the ten recommendations. Deep links open the relevant disclosure. Tables scroll within their own region on small screens. Keyboard focus, reduced motion and print expansion are supported.
