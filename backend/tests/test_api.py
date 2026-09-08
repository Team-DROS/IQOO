from fastapi.testclient import TestClient

import backend.main as api


client = TestClient(api.app)

SAMPLE_PRESCRIPTION = {
    "patient_name": "Demo Patient",
    "medicines": [
        {
            "name": "Paracetamol",
            "dosage": "500 mg",
            "frequency": "twice daily",
            "duration": "3 days",
            "instructions": "after food",
        }
    ],
    "notes": "Demo consultation.",
    "confidence": "high",
}


def test_health_does_not_expose_key(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "secret-value")
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "groq_configured": True}
    assert "secret-value" not in response.text


def test_audio_rejects_unsupported_extension():
    response = client.post(
        "/api/v1/extract/audio",
        files={"file": ("notes.txt", b"not audio", "text/plain")},
    )
    assert response.status_code == 415


def test_image_rejects_empty_upload():
    response = client.post(
        "/api/v1/extract/image",
        files={"file": ("empty.png", b"", "image/png")},
    )
    assert response.status_code == 400


def test_audio_returns_normalized_response(monkeypatch):
    monkeypatch.setattr(api, "build_client", lambda: object())
    monkeypatch.setattr(
        api,
        "extract_from_audio",
        lambda _client, _path: (SAMPLE_PRESCRIPTION, "Demo transcript"),
    )
    response = client.post(
        "/api/v1/extract/audio",
        files={"file": ("sample.mp3", b"mock audio bytes", "audio/mpeg")},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["source_file"] == "sample.mp3"
    assert body["source_type"] == "audio"
    assert body["transcript"] == "Demo transcript"
    assert body["prescription"]["medicines"][0]["name"] == "Paracetamol"
    assert body["requires_review"] is True
