# Hello-world · Calendar starter

A small Next.js Pages Router + React + TypeScript boilerplate based on [Calendar4](https://github.com/interfacethegreatest/Calendar4), with plain global CSS and component CSS modules.

## Start

Use Node.js 24 LTS.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The home page displays **Hello world 😎** and a reusable month calendar with previous/next navigation, Today, and date selection.

## Check and build

```sh
npm test
npm run typecheck
npm run build
```

The production build exports static HTML, CSS, and JavaScript to `out/`.

## Structure

- `src/pages/index.tsx`: home page
- `src/pages/_app.tsx`: application wrapper and global styles
- `src/pages/_document.tsx`: HTML document shell
- `src/components/calendar/Calendar.tsx`: interactive month grid
- `src/components/calendar/Calendar.module.css`: scoped styles
- `src/lib/calendar.ts`: date helpers
- `src/styles/globals.css`: global styles

## Source and scope

Adapted from public Calendar4 commit `7b7e533e587d4991c97b63259355d1a5e9141616`: its `SmallCalendar.tsx` six-week grid, date selection pattern, `addMonthsClamped` helper, Pages Router layout, and dark CSS-module styling. Calendar2's package manifest was inspected for comparison; no private Calendar2 source is included.

This is a fresh starter, not a copy of the full calendar application. Authentication, database access, email, uploads, 3D assets, and event editing are outside its scope. It needs no environment secrets. Selection is in memory and resets on reload. Next.js generates the HTML entry point from the Pages Router rather than using a hand-written `index.html`.

## GitHub Pages

Build with the repository prefix:

```sh
GITHUB_PAGES=true npm run build
```

Publish the contents of `out/` using a GitHub Pages deployment workflow. Include an empty `.nojekyll` file when publishing from a branch. If the repository is renamed, update `basePath` in `next.config.mjs`. Pages hosting is not enabled by adding this starter.

## Credits

Built collaboratively by Drew and ChatGPT.
Coding assistance by OpenAI’s Codex.
