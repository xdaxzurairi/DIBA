# Book Finder (metadatabuku)

**Repo:** `C:\Users\Administrator\metadatabuku\metadatabuku` → [github.com/xdaxzurairi/metadatabuku](https://github.com/xdaxzurairi/metadatabuku) (private)
**Stack:** PHP 8.2 (vanilla, no framework) backend + vanilla JS frontend (ES modules, no build step) + SheetJS for Excel
**Status:** 🟢 Active — 15 build steps in, core pipeline working, tested against real production data

## What it is
Search tool for UiTM course reading lists: paste ISBN/title/author (or import Excel/CSV), merges results from Open Library + Google Books, dedupes, exports to .xlsx. First target: UiTM's actual FSG-coded course reading list (39 sheets, ~7,800 rows, real file in `~/Downloads/2. FSG KOD KURSUS MENGIKUT PROGRAM - DILENGKAPKAN.xlsx`).

**Naming note:** app/README call it "book-finder", but the folder on disk is `metadatabuku` — earlier sessions searching for "book-finder" wrongly concluded the project didn't exist. This IS that project.

## Build log (see git log for full commit messages)
1–9: ISBN validate/recover, InputParser, OpenLibrary+GoogleBooks sources, Merger, Deduper, functional frontend, Excel import backend+frontend, README.
10: Full frontend redesign to match agreed canvas mockup ("Book Finder · Mockup v2") — sidebar nav, Fraunces/Plex fonts, Bahasa Melayu UI, mobile layout.
11: Completion pass — backfill missing core fields (author/publisher/year) via supplementary isbn lookup when isbn13 known. Fixed a real GoogleBooks bug found live: responses for an exact-isbn query sometimes omit ISBN_13 in industryIdentifiers, breaking merge-key matching.
12: Widened OpenLibrary/GoogleBooks text-search result limits 10→20 (free, same request count) — raised cross-source merge rate.
13: Title+author fallback for ISBN-not-found import rows (mandatory title+author per Zuex's requirement). Found+fixed a real InputParser bug: the "title:X author:Y" composite term (used whenever an import row has no ISBN) was being parsed wrong this whole time — title regex swallowed the author part, breaking every plain title+author import search silently.
14: Wired up the ISBN recovery verify-then-refallback loop (closes README's own documented "known simplification") using the already-built-but-unwired `IsbnVerifier.php`. New `mode:verify` endpoint.
15: Tested against the REAL UiTM workbook for the first time — found + fixed 3 real bugs: (a) leading title-banner row broke column mapping (auto-detect + manual override added), (b) title_author search path had no verification (same author, wrong book), (c) sentinel "n/a" values were being verified as if they were real author names.

## Known gaps / open items
- **noxx / leaked API key incident (2026-09-22→23):** a Google Books API key ended up in a stray untracked file `noxx`, then got committed by a non-Claude commit (`c22b4f5 "commit"`) before being cleaned up. Relocated into gitignored `.env`. **`c22b4f5` still has it in history as of last check** — repo confirmed private on GitHub, but not yet resolved (amend vs push-as-is). Check `main/decisions.md` for the full thread.
- `CONTACT_EMAIL` in `.env` is still the placeholder (`contact@example.com`), not a real address — Zuex hasn't said whether to use his own.
- WorldCat/OCLC institutional access — best lead for the remaining "genuinely not in either free source" gap (many are Malaysian small-press or Routledge/Taylor & Francis academic-only ISBNs). Needs Zuex to check with UiTM library whether they already hold an OCLC subscription. Not actionable by DIBA directly.
- Researched and ruled out as data-source options: Amazon PA-API (Associates-gated, being deprecated for new signups May 2026), Crossref (DOI/journal-article index, not a book/ISBN catalog — tested live, 0 results even for mainstream books by ISBN), Wikidata (tested live, ISBN coverage too sparse), Perpustakaan Negara Malaysia (no public API found).
- Not yet tested at real scale: only ran AS750 (6 rows, full pipeline) and AS263/AS750/AS201 (parsing only) against the real workbook. Full 39-sheet/~7800-row run never attempted (would take 15–25+ min of live API calls).
- `.env.example` / `.env` require PHP dev server (`C:\xampp\php\php.exe -S localhost:8000` from repo root) — not a persistent service, needs manual start per session.

## Test suite
`php tests/run.php` — 110/110 passing as of build step 15 (offline, no network, covers Isbn/IsbnVerifier/RowTermBuilder/Deduper). No JS test runner; all frontend logic verified this session via ad-hoc Node harnesses run against the live local server (not checked into the repo).
