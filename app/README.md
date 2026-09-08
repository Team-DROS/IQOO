# VaidyaVani — Mobile App

The phone-first doctor experience for VaidyaVani, built with React Native and Expo. It runs
the complete consultation journey on **mock data** — no backend or API key required — so the
flow can be demoed anywhere, including in a browser.

## Run it

```bash
npm install
npm run web      # browser (recommended for a quick look)
npm start        # Expo dev server — scan the QR with Expo Go for a real device
```

`npm run web` opens the app framed as a phone on a calm backdrop. Everything is navigable
end to end.

## The journey

```
Welcome → Dashboard → New Consultation → Audio Recording ┐
                                       → Image Upload    ├→ Processing → Review
                                                          ┘             → Prescription Preview
                                                                        → Patient Timeline
```

| # | Screen | Purpose |
|---|--------|---------|
| 1 | **Welcome** | Brand intro, language hint, single call to action |
| 2 | **Dashboard** | Greeting, today's stats, quick patient access, recent consultations |
| 3 | **New Consultation** | Pick patient · choose language (English / Hinglish / Tanglish) · choose capture method |
| 4 | **Audio Recording** | Idle → recording → paused → completed, with timer and animated waveform |
| 5 | **Image Upload** | Camera / gallery choice → preview → continue |
| 6 | **Processing** | Staged extraction cascade with a friendly error + retry state |
| 7 | **Review** | Editable clinical fields + medicine cards, AI-draft disclaimer, warnings |
| 8 | **Prescription Preview** | Clean English prescription document; confirm or edit |
| 9 | **Patient Timeline** | Chronological history, with an empty state for new patients |

Screenshots live in [`../docs/screenshots/app/`](../docs/screenshots/app/).

## Design system

A warm, editorial "apothecary" aesthetic — deliberately not cold hospital-blue SaaS. All
tokens live in [`src/constants/theme.js`](src/constants/theme.js).

- **Colour** — deep pine-teal primary, turmeric-gold accent, warm bone-paper background.
- **Type** — [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif) +
  [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (body), loaded via
  `@expo-google-fonts`.
- **Motion** — staggered entrance reveals, an animated recording waveform, a processing
  cascade, and press-scale feedback.
- **Motif** — capsule / pill geometry and tinted icon badges, repeated across screens.

## Project structure

```
app/
├── App.js                     # font loading, navigation stack, web deep links, phone frame
├── src/
│   ├── constants/theme.js     # colour, spacing, radius, type scale, shadows
│   ├── data/mockData.js       # doctors, patients, per-language consultation scenarios
│   ├── services/
│   │   └── consultationService.js   # mock promises against the consultation contract
│   ├── components/            # reusable UI (see catalogue below)
│   └── screens/               # the nine screens above
```

### Component catalogue

`PrimaryButton` · `SecondaryButton` · `ScreenHeader` · `PatientCard` · `MedicineCard` ·
`StatusBadge` · `LoadingStep` — plus supporting primitives: `Screen`, `Card`, `Avatar`,
`Chip`, `LanguagePill`, `Waveform`, `EditableField`, `AIDisclaimer`, `GradientBackground`,
`PhoneFrame`, `Logo`, `Reveal`, `IconBadge`, `AppText`.

## Connecting a real backend

Screens never call the network directly — they call the service layer in
[`src/services/consultationService.js`](src/services/consultationService.js), which today
returns mock promises shaped like the consultation contract (see the
[root README](../README.md#the-consultation-contract)). To go live, replace the internals of
`processConsultation()` with a call to the backend's `/api/v1/extract/*` endpoints and return
the same shape. **Do not rename the contract fields** — the backend adapter depends on them.

## Notes

- Recording and image upload are **simulated**; the prototype does not access the microphone,
  camera, or filesystem.
- Web deep links are enabled (e.g. `/dashboard`, `/timeline`) for shareable URLs and testing.
- Targets Expo SDK 57 / React Native 0.86. See [`AGENTS.md`](AGENTS.md) before upgrading.
