![VaidyaVani — Multilingual Clinical Intelligence](assets/vaidyavani-readme-banner.png)

# VaidyaVani Prototype

This repository contains the prototype for the VaidyaVani idea submission for the iQOO hackathon.

## Structure
- `app/`: React Native (Expo) click-through mockup of the app interfaces.
- `poc/`: Standalone Python script demonstrating the AI extraction for audio and images.

## Running the App Prototype
The app is a React Native mockup built with Expo. No real backend is connected in this version; it runs with mock data to demonstrate the flow.

1. Navigate to the app directory: `cd app`
2. Install dependencies: `npm install`
3. Start Expo: `npx expo start`
4. Use Expo Go on your phone or an emulator to test the flow.

## Running the POC Script
This proves the technical feasibility of extracting structured JSON from voice and images. Groq Whisper Large V3 transcribes English, Hinglish, and Tanglish audio; the extraction stage normalizes the result into English JSON.

1. Navigate to the poc directory: `cd poc`
2. Install Python dependencies: `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and add your Groq API key.
4. Follow the beginner sample guide in `poc/samples/README.md`.
5. Run with audio: `python extract.py samples/audio_01.mp4 --output examples/audio_01.json`
6. Run with image: `python extract.py samples/image_01_normal.png --output examples/image_01.json`

Detailed setup, supported formats, expected output, and demo guidance are in `poc/README.md`.

*Note: This is an idea-submission-stage prototype, not the full 30-hour final build.*
