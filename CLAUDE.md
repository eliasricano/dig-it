# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Dig It! is a Chrome MV3 extension that injects transcription helper controls (loop A/B, etc.) into the YouTube watch-page player so musicians can dig into passages of audio. It targets `https://www.youtube.com/watch?*` only.

## Commands

- `npm run dev` — Vite build in watch mode. Rebuilds `dist/` on every change.
- `npm run build` — One-shot production build into `dist/`.

There is no test runner, linter, or formatter configured.

## Loading the extension in Chrome

Chrome loads the **`dist/`** directory, not the repo root. After running `npm run dev` (or `build`), open `chrome://extensions`, enable Developer Mode, and "Load unpacked" → select `dist/`. Reload the extension after rebuilds.

## Build pipeline

`vite.config.js` is the source of truth for what ships:

- Single entry: `src/content.js` → `dist/content.js` (forced filename via `entryFileNames: "[name].js"` so `manifest.json` can reference it statically).
- `vite-plugin-static-copy` copies `manifest.json`, the `images/` directory, and `src/styles.css` into `dist/` verbatim. **The CSS is not processed by Vite** — edits to `src/styles.css` flow through as a plain file copy, and it's loaded by Chrome via the manifest's `content_scripts.css`, not imported from JS.
- SVGs in `images/` are listed under `web_accessible_resources` so the content script can `fetch(chrome.runtime.getURL("images/<name>.svg"))` and inline them into buttons.

When adding new assets that need to be reachable from the content script at runtime, add them to **both** `vite.config.js` (so they're copied) and `manifest.json` `web_accessible_resources` (so Chrome will serve them to the page).

## Content script architecture

`src/content.js` runs once on page load and mutates the YouTube player DOM directly:

- It queries `.ytp-chrome-controls` and `.ytp-right-controls` (YouTube's player chrome) and inserts a `.loop-controls` container before the right-side controls.
- SVG icons are fetched at runtime and assigned via `innerHTML` so they can be styled with CSS.

YouTube is a SPA, so the player DOM is replaced on navigation between videos. The current script does not observe navigation — anything that should survive in-app navigation needs a `MutationObserver` or a listener for YouTube's `yt-navigate-finish` event.
