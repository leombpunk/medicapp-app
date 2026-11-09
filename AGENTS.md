# AGENTS.md

Guidance for AI coding agents working in this repo (MedicApp — patient/appointment management, SPA + API + mobile app). UI text and commits are in Spanish; match existing Spanish terminology in user-facing strings.

## Structure

Three **independent** npm projects (no workspace/monorepo setup; each has its own `node_modules`). Run all commands from inside the project folder:

- `BackEnd/` — Express + MySQL (Sequelize) API. ESM (`"type": "module"`), entry `index.js`, runs on the port in `.env` (`PORT`; FrontEnd expects **3001**). Route files live in `app/routes/` (mounted at root — no `/api` prefix), controllers in `app/controlers/` (sic), models/validators/middleware alongside.
- `FrontEnd/` — Vite + React 19 (`@vitejs/plugin-react`), Bootstrap 5.3 + react-bootstrap, entry root `index.html` → `src/index.jsx` → `src/react/App.jsx`. Also packaged as Electron desktop app (dev server on Vite's default **5173**; `npm run electron` opens that URL).
- `Mobile/` — Expo (SDK 49, React Native 0.72). Entry root `App.js` → `src/Main.jsx`.
- `ScriptDB/` — raw SQL: `medicapp-db.sql` (full schema), `data-test.sql` / `script-testcontent.sql` (test data). Schema is **not** managed by Sequelize migrations; load these manually.

## Setup & quirks

- Backend requires `.env` (copy from `BackEnd/.env_example`): `DB_*`, `JWT_SECRET`, `JWT_RT_SECRET`, `PORT`, and `CLOUD_STORAGE` (`1` = Cloudinary via `CD_*` keys, `0` = local `app/storage/`, which is gitignored).
- Deploy target: Vercel (`BackEnd/vercel.json`, domain in RoutesAPI). FrontEnd deploys via Firebase (`firebase.json`; `.gitignore` ignores firebase config).
- `.gitignore` excludes `package-lock.json` — don't commit lockfiles.
- Electron packaging requires this exact order from `FrontEnd/`: `npm run build` → `npm run build-electron` → `npm run package-windows` (or `package-linux`). Resulting executable lands in `/dist`.
- Backend `postinstall` runs `npm install mysql2 --save` unexpectedly; harmless but expect it.
- No tests, lint, or typecheck anywhere (backend `npm test` intentionally fails). Verification is manual: start MySQL with ScriptDB schema, `npm run dev` in BackEnd, `npm run dev` in FrontEnd (Vite; `npm start` is still a Vite alias), and exercise the flow in the browser.

## Hardcoded API URLs (gotcha)

Backend base URL is hardcoded, **not** env-driven, and duplicated:

- `FrontEnd/src/react/constants/RoutesAPI.js` — `localhost:3001`, commented Vercel URL below it
- `Mobile/src/constants/RoutesAPI.js` — LAN IP `192.168.0.70:3001` (adjust when testing from a device)

When changing backend routes, update both files, and match the actual mount points in `BackEnd/app/routes/index.js`.

## Known frontend debt

- Several pages/components import via the `./pages` and `./components/basis` barrel files instead of directly (React Doctor performance warning, ~66 files) and ~32 frontend files are unreachable dead code — `react-doctor-report.md` tracks the audit and is a one-off task file, not durable docs. Prefer direct module imports for new code. (E.g. `components/schedule/new/Calendar.jsx` has no importers.)
- The actively used table component is `components/basis/TableV2.jsx` (referenced by list views across the app); legacy `Table.jsx` is likely a stale predecessor — don't assume both are live. Legacy `App.css`/`index.css` classes used by V1 layouts (`.square-button`, `.table-overflow`, …) are still referenced; `Topbar.jsx` appears unused.
- **Responsive work:** media queries and per-breakpoint styles live in `src/react/responsive.css` (imported from `src/index.jsx`). The plan is documented in `FrontEnd/RESPONSIVE-GUIDE.md` (diagnosis + patterns) and the executed changes are tracked in `FrontEnd/RESPONSIVE-LOG.md` (changelog). Keep updating the log for any new responsive change.
