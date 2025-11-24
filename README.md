# task-blogs (React + Vite)

Minimal README for a React + Vite blog/task app that uses the DummyJSON API (https://dummyjson.com) for blog data. Covers local development, tests, and producing a production build.

## Summary
Project: task-blogs — a frontend React app bootstrapped with Vite. The app fetches blog posts from DummyJSON (or a configurable API) and provides list, read, and basic CRUD-like UI (using the external API or local mocks).

## Prerequisites
- Git
- Node.js (LTS) + npm or yarn

## Quick start (Node.js + Vite)

1. Clone
```
git clone <repo-url> /c:/projects/task-blogs
cd /c:/projects/task-blogs
```

2. Environment
Create a `.env` (Vite requires client-facing vars to start with `VITE_`):
```
PORT=5173                      # optional, used by dev server or Docker
VITE_BACKEND_URL=https://dummyjson.com
```
Note: Vite exposes `VITE_` prefixed vars to the client. Do not put secrets in client-side env.

3. Install & run (npm)
```
npm install
npm run dev         # start Vite dev server (hot reload)
```
or (yarn)
```
yarn
yarn dev
```

4. Build & preview production
```
npm run build       # build for production (dist/)
npm run preview     # serve the production build locally
```

## Common scripts (expected in package.json)
- dev: start vite (e.g., vite)
- build: build for production (vite build)
- preview: vite preview (serve build)
- test: run unit tests (vitest or jest)
- lint: run eslint
- format: run prettier
- clean: remove build artifacts (e.g., rimraf dist)
Example:
```
"scripts": {
   "dev": "vite",
   "build": "vite build",
   "preview": "vite preview --port 4173",
   "test": "vitest",
   "lint": "eslint 'src/**/*.{ts,tsx,js,jsx}'",
   "format": "prettier --write 'src/**/*.{ts,tsx,js,jsx,json,md}'",
   "clean": "rimraf dist"
}
```

## API (DummyJSON)
Default base URL: https://dummyjson.com
- Get posts list: GET /posts
   - Example: https://dummyjson.com/posts?limit=20
- Get post by id: GET /posts/{id}
- Search: GET /posts/search?q=term

To use a different backend, set VITE_API_BASE_URL in `.env` and the app will read it from import.meta.env.VITE_BACKEND_URL.

## Contributing
- Follow existing code style, run tests, and lint before opening PRs.
- Open PRs against `main` with descriptive titles and any relevant tests.
