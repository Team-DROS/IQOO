# Contributing to VaidyaVani

Thanks for helping build VaidyaVani. This is a small, fast-moving hackathon project, so the
rules are light — the goal is a clean `main` and painless integration between the app,
backend, and extraction pipeline.

## Ground rules

- **`main` is always demo-ready.** Never push directly to `main`; open a pull request.
- **Work on a feature branch.** Use `feature/<short-name>` (or `chore/…`, `fix/…`).
- **One package per PR where possible.** `app/`, `backend/`, and `poc/` are independent —
  keeping changes scoped makes review easy.
- **Never commit secrets.** `.env` files, API keys, and credentials stay local. Copy from
  the `.env.example` in each package.
- **Use invented demo data only.** Never commit or upload a real patient's records.

## Data shapes

The app, backend, and POC all speak one JSON shape (documented in the
[root README](README.md#data-shapes)). If you need to change a field, raise it
with the team first — the app's service layer and the backend adapter both depend on it.

## Per-package setup

Each package documents its own setup:

- **App** — [`app/README.md`](app/README.md) (`cd app && npm install && npm run web`)
- **Backend** — [`backend/README.md`](backend/README.md) (FastAPI + uvicorn)
- **POC** — [`poc/README.md`](poc/README.md) (Python CLI)

## Before you open a PR

- Run the package's own checks (the app should bundle for web; the backend tests live in
  `backend/tests/`).
- Fill in the PR template — what changed, how you tested it.
- Add a screenshot or short clip for any user-facing change.
