import sys, os, json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SCHEMA_PROMPT_AUDIO = """You are a clinical prescription structuring assistant. Extract structured
fields from the doctor's spoken prescription transcript below. Return ONLY
valid JSON matching this schema, with no text before or after it:

{
  "patient_name": "string or null",
  "medicine": "string",
  "dosage": "string",
  "frequency": "string",
  "duration": "string",
  "notes": "string or null",
  "confidence": "high | medium | low"
}

If a field is not mentioned in the transcript, set it to null. Set
"confidence" based on how clearly the transcript specified each field.

Transcript:
\"\"\"
{TRANSCRIPT_TEXT_HERE}
\"\"\""""

SCHEMA_PROMPT_IMAGE = """You are reading a photo of a handwritten or printed prescription. Extract
structured fields and return ONLY valid JSON matching this schema, with no
text before or after it:

{
  "patient_name": "string or null",
  "medicine": "string",
  "dosage": "string",
  "frequency": "string",
  "duration": "string",
  "notes": "string or null",
  "confidence": "high | medium | low"
}

If handwriting is unclear, make your best reasonable guess and set
"confidence" to "low" for that field's overall record. If a field is not
present in the image, set it to null."""

def transcribe_audio(path):
    with open(path, "rb") as f:
        transcript = client.audio.transcriptions.create(model="whisper-1", file=f)
    return transcript.text

def structure_from_text(transcript_text):
    prompt = SCHEMA_PROMPT_AUDIO.format(TRANSCRIPT_TEXT_HERE=transcript_text)
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    return json.loads(resp.choices[0].message.content)

def structure_from_image(path):
    import base64
    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": SCHEMA_PROMPT_IMAGE},
                {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}}
            ]
        }],
    )
    return json.loads(resp.choices[0].message.content)

if __name__ == "__main__":
    path = sys.argv[1]
    if path.lower().endswith((".mp3", ".wav", ".m4a")):
        text = transcribe_audio(path)
        print("Transcript:", text)
        result = structure_from_text(text)
    else:
        result = structure_from_image(path)
    print(json.dumps(result, indent=2))
