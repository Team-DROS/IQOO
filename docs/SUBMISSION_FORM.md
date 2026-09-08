# iQOO Reskill Hackathon — Idea Submission Form

Fields drafted for the actual submission form. Copy each answer into the matching field.

## Title

VaidyaVani — Voice & OCR Patient Records for Tier-2/3 Hospitals

## Short description (1–2 lines)

A phone-first assistant that turns a doctor's spoken prescription and a patient's paper
records into one structured, shareable health profile — synced from phone to a pharmacy
dashboard via Office Kit, built for Indian hospitals that Suki/Nuance/Abridge don't serve.

## Full description

Most Indian hospitals outside the big metro chains still run on paper prescriptions and
disconnected records: a patient's history lives across three clinics and a shoebox, not one
app. Doctors lose consult time writing by hand, pharmacies work from illegible orders, and a
new doctor has no summary to start from. Existing ambient-scribe tools (Suki, Nuance
DAX/Dragon Copilot, Abridge) start around $200–$600+ per provider per month, assume
English-only dictation, and are built for US hospitals on Epic/Cerner.

VaidyaVani is a phone-first, multilingual alternative: a doctor dictates a prescription into
the iQOO phone, staff photograph existing paper prescriptions and lab reports, and both feed
one structured patient record — a visit timeline, current medications, and basic insurance
info. The record syncs via Office Kit to a front-desk/pharmacy laptop dashboard.

At the idea-submission stage we've built and validated two things: a four-screen clickable
mockup of the full flow (dictation → confirmation → patient timeline → dashboard/pharmacy
sync), and a standalone proof-of-concept extraction pipeline (Groq Whisper + Qwen) tested
against English, Hinglish, and Tanglish sample conversations and three prescription-photo
difficulty levels. The POC's own evaluation shows the pipeline works end to end but is not
safe for automatic prescribing — every generated record is designed to surface as an editable
draft, with low-confidence fields flagged for the doctor to confirm.

## Android / LLM proficiency

- **Android:** Basic. The team chose Expo/React Native over native Android specifically
  because it is explicitly allowed by the hackathon brief and matches the team's actual
  skill level, rather than overclaiming native Android depth.
- **LLM proficiency:** Working proficiency with LLM APIs for structured extraction —
  prompt design for schema-constrained JSON output, multilingual transcription (Groq
  Whisper-large-v3) and vision-based OCR (Groq Qwen), and evaluating model output against
  real (invented-patient) samples rather than trusting it blindly.

## Prior builds / experience

- ML data pipelines and hands-on experience structuring messy real-world input into
  usable schemas.
- Biomedical signal processing background — direct relevance to a healthcare data product.
- Hardware integration experience, relevant to the Office Kit phone-to-laptop sync piece.
- Team has already shipped the two hardest feasibility questions for this idea before
  submission: a working click-through mockup and a validated multilingual extraction POC —
  not just a slide deck of intentions.

## What makes your team stand out

Most idea submissions at this stage are a deck describing what a team *plans* to build. Ours
includes a POC pipeline actually run against multilingual audio and real prescription-photo
difficulty levels, with an honest evaluation of where it fails (patient names, dense
handwriting) — and a design response to those failures (confirmation-first UX) baked into the
mockup, not bolted on afterward. The idea also targets a gap the obvious Western comparables
(Suki, Nuance, Abridge) structurally cannot serve: multilingual, non-EHR, tier-2/3 Indian
hospitals — evidenced with the same market data cited in the deck (ABDM private-facility
adoption gap, incumbent pricing).

## Links

- Repository: this GitHub repo (`main` branch after the three feature branches merge)
- Deck: `docs/VaidyaVani_Deck.pptx`
- Video walkthrough: `docs/video/vaidyavani_walkthrough.mp4`
- POC evidence: `poc/README.md`, `poc/EVALUATION.md`, `poc/examples/*.json` (on
  `feature/poc-extraction`)
