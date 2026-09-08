# Deck, Video & Submission Docs (Role C)

This folder holds the required idea-submission artifacts for VaidyaVani.

- `VaidyaVani_Deck.pptx` — the pitch deck: problem + evidence, solution flow (built from
  real screenshots of the mockup in `../app`), market-gap differentiation vs. Suki/Nuance
  DAX/Abridge, POC evaluation results, 30-hour MVP scope, and team/prior work.
- `screenshots/` — screenshots of the four click-through mockup screens, captured directly
  from the running Expo app (`../app`) and used in the deck's solution-flow slide.
- `video/vaidyavani_walkthrough.mp4` — the 60–90 second walkthrough recording narrating the
  mockup as if it were live.
- `SUBMISSION_FORM.md` — drafted answers for the actual submission form fields (title,
  description, Android/LLM proficiency, prior builds, "what makes you stand out").

## Sources for the deck's evidence

- Incumbent pricing (Suki AI, Nuance DAX / Dragon Copilot, Abridge): 2026 vendor and
  third-party pricing aggregations.
- ABDM small-clinic adoption gap: National Health Authority ABDM facility-registration data
  (~17,000 of 1.3 lakh ABDM-enabled facilities are private-sector, as of the most recent
  reporting).
- POC pipeline evidence and evaluation table: `../poc/EVALUATION.md` and
  `../poc/examples/*.json` on the `feature/poc-extraction` branch (Role B's work).
- Mockup screens: `../app/src/screens/*.js` (Role A's work), screenshotted for this deck by
  running the Expo web build headlessly.
