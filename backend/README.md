# VaidyaVani backend

This FastAPI service exposes the existing Groq extraction pipeline to the Expo prototype. Uploaded files are validated, processed from a temporary file, and deleted immediately after the request.

## Setup

Run these commands from the repository root:

```powershell
py -m venv backend\.venv
backend\.venv\Scripts\python -m pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
```

Add the Groq key to `backend/.env`. Alternatively, keep using `poc/.env`; the API loads environment variables through the existing extractor.

## Run

```powershell
backend\.venv\Scripts\python -m uvicorn backend.main:app --reload --port 8000 --env-file backend\.env
```

Open `http://localhost:8000/docs` for the interactive API page.

## Endpoints

- `GET /health` — confirms API availability and whether a Groq key is configured.
- `POST /api/v1/extract/audio` — accepts supported audio and returns transcript plus structured prescription data.
- `POST /api/v1/extract/image` — accepts a prescription image and returns structured prescription data.
- `POST /api/v1/demo` — processes an included invented sample for the simulated frontend flow.

Both extraction routes use multipart form data with a field named `file`. Every result has `requires_review: true`; a doctor must verify the generated fields.

## Example

```powershell
curl.exe -X POST http://localhost:8000/api/v1/extract/audio `
  -F "file=@poc/samples/audio_01.mp4"
```

Do not send real patient information through this prototype.
