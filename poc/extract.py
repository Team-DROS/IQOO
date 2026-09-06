"""Extract structured prescription data from an audio recording or image."""

from __future__ import annotations

import argparse
import base64
import json
import mimetypes
import os
import sys
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from groq import Groq
from openai import OpenAI

AUDIO_EXTENSIONS = {".flac", ".mp3", ".mp4", ".mpeg", ".mpga", ".m4a", ".ogg", ".wav", ".webm"}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

PRESCRIPTION_SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {
        "patient_name": {"type": ["string", "null"]},
        "medicines": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {"type": ["string", "null"]},
                    "dosage": {"type": ["string", "null"]},
                    "frequency": {"type": ["string", "null"]},
                    "duration": {"type": ["string", "null"]},
                    "instructions": {"type": ["string", "null"]},
                },
                "required": ["name", "dosage", "frequency", "duration", "instructions"],
                "additionalProperties": False,
            },
        },
        "notes": {"type": ["string", "null"]},
        "confidence": {"type": "string", "enum": ["high", "medium", "low"]},
    },
    "required": ["patient_name", "medicines", "notes", "confidence"],
    "additionalProperties": False,
}

EXTRACTION_INSTRUCTIONS = """You are a multilingual clinical-conversation extraction assistant for a prototype.
Extract only information visible in the image or stated in the transcript.
Do not invent missing medicine details; use null. Preserve medicine names and dosages as written.
For audio, infer the patient's name from natural introductions or how the doctor addresses the patient.
Extract only medicines that the doctor recommends in the current conversation, not medicines merely
mentioned as allergies, previous treatments, examples, questions, or drugs the patient stopped taking.
The transcript may mix English with Hindi or Tamil. Return all structured fields in English,
translating only ordinary instructions while preserving medicine names, units, and numbers exactly.
The result is for demonstration only and must not include diagnosis or medical advice."""


def build_clients() -> tuple[Groq, OpenAI]:
    load_dotenv()
    if not os.getenv("GROQ_API_KEY"):
        raise RuntimeError("GROQ_API_KEY is missing. Copy .env.example to .env and add your key.")
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("OPENAI_API_KEY is missing. Copy .env.example to .env and add your key.")
    return Groq(api_key=os.getenv("GROQ_API_KEY")), OpenAI()


def transcribe_audio(client: Groq, path: Path) -> str:
    model = os.getenv("GROQ_TRANSCRIPTION_MODEL", "whisper-large-v3")
    with path.open("rb") as audio_file:
        transcript = client.audio.transcriptions.create(
            model=model,
            file=(path.name, audio_file.read()),
            prompt=(
                "This is a natural conversation between an Indian doctor and patient. "
                "Accurately preserve patient names, medicine names, dosages, units, "
                "frequency, and duration. Speech may mix English with Hindi or Tamil. "
                "Do not summarize or translate the conversation."
            ),
            response_format="json",
            temperature=0.0,
        )
    return transcript.text


def extract_structured(client: OpenAI, content: Any) -> dict[str, Any]:
    model = os.getenv("OPENAI_VISION_MODEL", "gpt-4.1-mini")
    response = client.responses.create(
        model=model,
        instructions=EXTRACTION_INSTRUCTIONS,
        input=[{"role": "user", "content": content}],
        text={
            "format": {
                "type": "json_schema",
                "name": "prescription",
                "strict": True,
                "schema": PRESCRIPTION_SCHEMA,
            }
        },
        store=False,
    )
    if not response.output_text:
        raise RuntimeError("The model returned no structured output.")
    return json.loads(response.output_text)


def extract_from_audio(
    transcription_client: Groq, extraction_client: OpenAI, path: Path
) -> tuple[dict[str, Any], str]:
    transcript = transcribe_audio(transcription_client, path)
    content = [{"type": "input_text", "text": f"Doctor-patient conversation transcript:\n{transcript}"}]
    return extract_structured(extraction_client, content), transcript


def extract_from_image(client: OpenAI, path: Path) -> dict[str, Any]:
    mime_type = mimetypes.guess_type(path.name)[0] or "image/jpeg"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    content = [
        {"type": "input_text", "text": "Extract the prescription from this image."},
        {"type": "input_image", "image_url": f"data:{mime_type};base64,{encoded}", "detail": "high"},
    ]
    return extract_structured(client, content)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path, help="Path to an audio recording or prescription image")
    parser.add_argument("--output", "-o", type=Path, help="Optional path for the JSON result")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    path = args.input.expanduser().resolve()
    if not path.is_file():
        print(f"Error: input file not found: {path}", file=sys.stderr)
        return 2

    extension = path.suffix.lower()
    if extension not in AUDIO_EXTENSIONS | IMAGE_EXTENSIONS:
        supported = ", ".join(sorted(AUDIO_EXTENSIONS | IMAGE_EXTENSIONS))
        print(f"Error: unsupported file type '{extension}'. Supported: {supported}", file=sys.stderr)
        return 2

    try:
        transcription_client, extraction_client = build_clients()
        transcript = None
        if extension in AUDIO_EXTENSIONS:
            result, transcript = extract_from_audio(transcription_client, extraction_client, path)
        else:
            result = extract_from_image(extraction_client, path)

        payload = {"source_file": path.name, "transcript": transcript, "prescription": result}
        rendered = json.dumps(payload, indent=2, ensure_ascii=False)
        print(rendered)
        if args.output:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(rendered + "\n", encoding="utf-8")
            print(f"Saved result to {args.output}", file=sys.stderr)
        return 0
    except (RuntimeError, json.JSONDecodeError, OSError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    except Exception as exc:
        print(f"API error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
