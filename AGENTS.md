# AGENTS.md

## Repo shape

- Two independent npm projects, no root `package.json` or workspace. Run commands inside `backend/` or `frontend/`.
- `backend/`: Express 5 + Mongoose, CommonJS. Entrypoint `index.js` -> `app.js`; serves the API and static `backend/dist`.
- `frontend/`: React 19 + Vite, ESM, react-router, react-bootstrap. Entrypoint `src/main.jsx` -> `src/App.jsx`. No TypeScript.
- Frontend API calls use relative `/api`; the Vite dev proxy targets `http://localhost:3003`. The backend defaults to port 3003, but the proxy is hardcoded, so keep the port aligned.

## Commands and verification

```bash
cd frontend && npm run lint
cd frontend && npm run build
cd backend && npm run dev     # NODE_ENV=dev, uses DEV_MONGODB_URI, node --watch
cd backend && npm start       # uses MONGODB_URI
```

- There is no test suite. Backend `npm test` is a placeholder that always exits 1; there is no backend lint or typecheck script.
- `cd backend && npm run build:ui` deletes `backend/dist`, builds the frontend, and copies `frontend/dist` into `backend/`. `backend/dist` is tracked and is what Express serves in production; regenerate it after frontend changes meant for deployment.

## Configuration and data

- Create `backend/.env` with `DEV_MONGODB_URI` and `MONGODB_URI`. `dotenv` loads relative to the process cwd, so run backend commands from `backend/`.
- Only API route is `/api/users`. There is no authentication yet: `Login.jsx` just stores a username in localStorage under `MatikkapelitAppUser`, and the Mongo username is unique.
- High scores are fields on `models/user.js`: `multiplication`, `division`, `expressions`, `conversions`. The game-type strings in `frontend/src/utils/helpers.jsx` (`highscoreCheck`) must stay in sync with those fields and the highscore UI.

## Conventions

- All user-facing content is Finnish; keep new UI strings Finnish.
- Add a game route in `App.jsx` plus its path in `frontend/src/utils/constants.js`; use `highscoreCheck` for persistence. Conversion units live in `frontend/src/utils/conversions.js`.
