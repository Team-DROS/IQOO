# VaidyaVani extraction POC

This command-line demo converts a spoken or photographed sample prescription into structured JSON. Use invented demo patients only—never upload a real patient's record.

## Setup

```powershell
cd poc
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Open `.env` and add both a Groq API key and an OpenAI API key. Do not commit `.env`.

Audio follows this pipeline: natural doctor-patient conversation → Groq `whisper-large-v3` transcription → OpenAI structured JSON extraction. The extractor infers the patient name and final medication plan from context. Language detection is automatic because recordings may mix English with Hindi or Tamil. Prescription images remain English-only and go directly to the vision extraction stage.

## Run

```powershell
py extract.py samples\audio_01.m4a --output examples\audio_01.json
py extract.py samples\image_01_normal.png --output examples\image_01.json
```

The output contains the source filename, the audio transcript when applicable, and a structured prescription. This is a feasibility demo, not a medical system; verify every field manually.

## What to submit

- Two or three short recordings based on `samples/sample_scripts.txt`.
- One printed and one handwritten prescription image containing invented details.
- JSON results generated with `--output`.
- A short screen recording showing one audio run and one image run.

See `samples/README.md` for beginner-friendly recording instructions.
