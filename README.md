# Trip Planner (Expo)

AI-assisted mobile app (Expo Router) for planning trips end-to-end: pick a place, dates, budget, and travelers, then generate itineraries with Google Gemini and store them in Firebase.

## Features
- Email/password auth with Firebase; splash screen auto-redirects signed-in users to `mytrip`.
- Discover tab pulls `Explore` and `Featured` cards from Firestore, with category filtering.
- My Trips tab lists saved itineraries from the `UserTrips` collection; start new trips from here.
- Guided trip-creation flow (search place → travelers → dates → budget → review) saved in `CreateTripContext`.
- Trip generation via Google Gemini (`createChatSession`) using the prompt in `constants/Options.js`; saves plans plus user selections to Firestore.
- Trip detail views show flights, hotels, places to visit, and a day-wise plan, with optional premium-only flight sections.

## Tech Stack
- Expo 53, React Native 0.79, React 19, Expo Router 5
- Firebase Auth + Firestore
- Google Gemini (via `@google/generative-ai`)
- UI: Expo vector icons, React Navigation, custom fonts (Outfit)

## Project Structure
- `trip-planner/app/index.tsx` – splash/auth gate and redirect
- `trip-planner/app/(tabs)/` – main tabs (`discover`, `mytrip`, `premium`, `profile`)
- `trip-planner/app/create-trip/` – trip setup wizard and generator
- `trip-planner/app/trip-details/` – itinerary detail screens
- `trip-planner/components/` – shared UI (lists, cards, splash, auth landing)
- `trip-planner/configs/` – Firebase and Gemini helpers
- `trip-planner/constants/` – colors, prompt, option lists

## Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`) or use `npx expo`
- Android Studio / Xcode simulators, or Expo Go on a device

## Setup
1. `cd trip-planner`
2. Install deps: `npm install`
3. Create a `.env` (or set env vars) with your Gemini key:
   - `EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY=your-key`
   - If absent, the app prompts for a key on the generate step.
4. Start Expo: `npm start`
   - or platform targets: `npm run android`, `npm run ios`, `npm run web`
5. Run lint: `npm run lint` (optional)

## Data Notes
- Firestore collections expected:
  - `Explore` and `Featured` (cards for Discover tab)
  - `UserTrips` (documents contain `userEmail`, `tripPlan` from Gemini, `tripData` serialized, `docId`)
- Places search uses Nominatim (OpenStreetMap) in `create-trip/search-place.jsx`.

## Authentication
- Email/password flows live in `app/auth/sign-in` and `app/auth/sign-up`.
- Configured Firebase project is in `configs/FirebaseConfig.js`; replace with your keys if needed.

## Trip Generation Flow
`Search place → select travelers → pick dates → choose budget → review → generate`. Generation runs in `create-trip/generate-trip.jsx` using the prompt from `constants/Options.js`, then stores the result to Firestore and redirects to My Trips.
