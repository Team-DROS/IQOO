# POC evaluation

Evaluation date: 2026-09-06

## Audio conversations

| Sample | Language | Patient name | Medicines and regimen | Result |
|---|---|---|---|---|
| `audio_01.mp4` | English | Incorrect spelling (`Aarumethha` instead of Aarav Mehta) | Paracetamol regimen correct | Partial pass |
| `audio_02.mp4` | Hinglish | First name missed; surname captured | Cetirizine regimen correct and normalized to English | Partial pass |
| `audio_03.mp4` | Tanglish | Minor surname spelling error | Both medicine names corrected; most regimen fields normalized | Partial pass |

The medical-vocabulary prompt materially improved medicine-name recognition. Patient names remain the weakest speech field because Whisper transcribes unfamiliar names phonetically. The UI must require doctor confirmation before saving.

## Prescription images

| Sample | Difficulty | Result |
|---|---|---|
| `image_01_normal.png` | Normal handwritten | Four medicine rows detected; some ambiguous fields correctly left null, but one medicine name remains unclear |
| `image_02_hard.png` | Dense/illegible | Low confidence returned; many names remain unreliable, demonstrating the need for manual review |
| `image_03_sparse.png` | Sparse | Remdesivir and strength detected; handwritten frequency remains ambiguous |

## Conclusion

The POC proves end-to-end multilingual conversation and image extraction, but it is not safe for automatic prescribing. Every generated record must be presented as an editable draft, with low-confidence or ambiguous fields highlighted for clinician confirmation.
