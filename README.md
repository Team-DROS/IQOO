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
This proves the technical feasibility of extracting structured JSON from voice and images.

1. Navigate to the poc directory: `cd poc`
2. Install Python dependencies: `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and add your OpenAI API Key.
4. Run with audio: `python extract.py samples/sample_prescription_audio.mp3`
5. Run with image: `python extract.py samples/sample_prescription_image.jpg`

*Note: This is an idea-submission-stage prototype, not the full 30-hour final build.*
