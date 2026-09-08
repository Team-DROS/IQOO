# How to make the samples

Use only fictional names and invented prescription details.

## Audio samples

1. Open the Voice Recorder app on your phone.
2. Record each doctor-patient dialogue naturally. Two people can read the roles, or one person can pause briefly and change tone between speakers.
3. Do not read the words `Doctor:` and `Patient:` aloud.
4. Keep each recording between 20 and 40 seconds.
5. Record in a quiet room with the phone about 20 cm from the speakers.
6. The completed recordings are stored here as `audio_01.mp4`, `audio_02.mp4`, and `audio_03.mp4`.

Sample 1 is English, sample 2 is Hinglish, and sample 3 is Tanglish with two medicines. None explicitly dictates a patient name or says “prescribe”; the extractor must infer the final record from the conversation.

## Image samples

Three anonymized dataset samples are already included:

- `image_01_normal.png` — normal handwritten OCR test.
- `image_02_hard.png` — dense, difficult handwriting test.
- `image_03_sparse.png` — sparse prescription test.

Their source and license are recorded in `DATASET_ATTRIBUTION.md`.

To make additional original samples:

1. Copy Image Script 1 onto plain white paper in neat handwriting.
2. Copy Image Script 2 into a document and print it, or write it more quickly by hand.
3. Photograph each page in bright light, from directly above, with all corners visible.
4. Avoid shadows, glare, blur, real hospital logos, and real patient information.
5. Save them with a new descriptive filename; do not overwrite the dataset samples.

After adding the files, follow the commands in `../README.md`. Do not edit generated JSON to hide extraction mistakes; those mistakes are useful evidence for the demo discussion.
