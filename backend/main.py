"""HTTP API for the VaidyaVani extraction prototype."""

from __future__ import annotations

import asyncio
import logging
import os
import tempfile
from pathlib import Path
from typing import Annotated, Any, Literal

from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from dotenv import load_dotenv

from poc.extract import (
    AUDIO_EXTENSIONS,
    IMAGE_EXTENSIONS,
    build_client,
    extract_from_audio,
    extract_from_image,
)

logger = logging.getLogger("vaidyavani.api")
load_dotenv(Path(__file__).parents[1] / "poc" / ".env")
MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", 25 * 1024 * 1024))


class Medicine(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str | None
    dosage: str | None
    frequency: str | None
    duration: str | None
    instructions: str | None


class Prescription(BaseModel):
    model_config = ConfigDict(extra="forbid")

    patient_name: str | None
    medicines: list[Medicine]
    notes: str | None
    confidence: Literal["high", "medium", "low"]


class ExtractionResponse(BaseModel):
    source_file: str
    source_type: Literal["audio", "image"]
    transcript: str | None
    prescription: Prescription
    requires_review: bool = True


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    groq_configured: bool


class DemoRequest(BaseModel):
    source_type: Literal["audio", "image"] = "audio"
    language: Literal["english", "hinglish", "tanglish"] = "english"


app = FastAPI(
    title="VaidyaVani API",
    description="Prototype API for multilingual clinical transcription and prescription extraction.",
    version="0.1.0",
)

origins = [item.strip() for item in os.getenv(
    "CORS_ORIGINS", "http://localhost:8081,http://127.0.0.1:8081"
).split(",") if item.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    """Return service readiness without exposing the API key."""
    return HealthResponse(groq_configured=bool(os.getenv("GROQ_API_KEY")))


async def _save_upload(upload: UploadFile, allowed: set[str]) -> Path:
    """Validate and save one upload to an isolated temporary file."""
    filename = Path(upload.filename or "upload").name
    extension = Path(filename).suffix.lower()
    if extension not in allowed:
        supported = ", ".join(sorted(allowed))
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type. Supported extensions: {supported}",
        )

    content = await upload.read(MAX_UPLOAD_BYTES + 1)
    await upload.close()
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    if len(content) > MAX_UPLOAD_BYTES:
        limit_mb = MAX_UPLOAD_BYTES // (1024 * 1024)
        raise HTTPException(status_code=413, detail=f"File exceeds the {limit_mb} MB limit.")

    handle = tempfile.NamedTemporaryFile(prefix="vaidyavani_", suffix=extension, delete=False)
    try:
        handle.write(content)
        return Path(handle.name)
    finally:
        handle.close()


async def _extract_path(
    path: Path,
    display_name: str,
    source_type: Literal["audio", "image"],
) -> ExtractionResponse:
    """Run the blocking Groq pipeline for one validated local file."""
    try:
        client = build_client()
        if source_type == "audio":
            prescription, transcript = await asyncio.to_thread(extract_from_audio, client, path)
        else:
            prescription = await asyncio.to_thread(extract_from_image, client, path)
            transcript = None
        return ExtractionResponse(
            source_file=display_name,
            source_type=source_type,
            transcript=transcript,
            prescription=prescription,
        )
    except HTTPException:
        raise
    except RuntimeError as exc:
        logger.warning("Extraction configuration error: %s", exc)
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Groq extraction failed")
        raise HTTPException(
            status_code=502,
            detail="Extraction failed. Check the input and try again.",
        ) from exc


async def _extract(upload: UploadFile, source_type: Literal["audio", "image"]) -> ExtractionResponse:
    allowed = AUDIO_EXTENSIONS if source_type == "audio" else IMAGE_EXTENSIONS
    temp_path = await _save_upload(upload, allowed)
    display_name = Path(upload.filename or temp_path.name).name
    try:
        return await _extract_path(temp_path, display_name, source_type)
    finally:
        temp_path.unlink(missing_ok=True)


@app.post("/api/v1/extract/audio", response_model=ExtractionResponse, tags=["extraction"])
async def extract_audio(file: Annotated[UploadFile, File(description="Doctor-patient audio")]) -> ExtractionResponse:
    """Transcribe code-mixed audio and extract the reviewed prescription fields."""
    return await _extract(file, "audio")


@app.post("/api/v1/extract/image", response_model=ExtractionResponse, tags=["extraction"])
async def extract_image(file: Annotated[UploadFile, File(description="English prescription image")]) -> ExtractionResponse:
    """Extract structured fields from a prescription image."""
    return await _extract(file, "image")


@app.post("/api/v1/demo", response_model=ExtractionResponse, tags=["demo"])
async def extract_demo(request: DemoRequest) -> ExtractionResponse:
    """Run an included invented sample for the click-through prototype."""
    sample_root = Path(__file__).parents[1] / "poc" / "samples"
    audio_samples = {
        "english": "audio_01.mp4",
        "hinglish": "audio_02.mp4",
        "tanglish": "audio_03.mp4",
    }
    filename = audio_samples[request.language] if request.source_type == "audio" else "image_01_normal.png"
    sample_path = sample_root / filename
    if not sample_path.is_file():
        raise HTTPException(status_code=503, detail="The requested demo sample is unavailable.")
    return await _extract_path(sample_path, filename, request.source_type)
