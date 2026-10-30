# EDO – Easy to Do All 🌍
*The All-in-One Travel & Arrival Ecosystem*

---

## 1. Project Introduction

**EDO – Easy to Do All** is an all-in-one travel ecosystem designed to remove the stress and fragmentation of international and regional journeys. Instead of forcing travelers to constantly jump between 5 different applications (hotel booking, subway apps, ride-hailing, translation apps, and emergency documents), EDO unites everything inside a unified, mobile-first, and offline-resilient platform.

### Target Audience
* **Travelers & Tourists:** Visitors arriving in unfamiliar cities or countries.
* **Transit Navigators:** People needing step-by-step subway, bus, walking, or cab instructions from airport to hotel.
* **Language Learners & Tourists:** People facing immediate communication hurdles in restaurants, transit terminals, or emergencies.
* **Safety-Conscious Travelers:** Solo travelers and families who need instant, offline access to local police/ambulance numbers and a personal emergency card.

---

## 2. Visual Identity & Design System

EDO is built with a **modern glassmorphism** aesthetic tailored for mobile and desktop viewports:
* **Color Palette:** Deep navy backgrounds (`#0f172a`, `#083344`), glowing cyan accents (`#06b6d4`, `#22d3ee`), aqua highlights, and crisp white text.
* **Typography:** Clean, legible **Poppins** font loaded via Google Fonts.
* **Glassmorphic Cards:** Frosted glass panels with subtle semi-transparent borders, ambient glows, and rounded corners (`rounded-2xl` / `rounded-3xl`).
* **Themes:** Full Light and Dark mode support, switchable with a single tap in the top navigation bar.

---

## 3. Implemented Modules & Key Features

### 🏢 Module 1: Hotel Booking
* **Destination Discovery:** Search accommodations by city or hotel name, with quick-select chips for popular global destinations (Tokyo, Paris, New York, Bali, London, Dubai).
* **Flexible Date & Guest Selection:** Pick check-in and check-out dates, number of guests, and number of rooms.
* **Filter Suite:** Filter stays by price range, star rating (4.5★+), and specific amenities (WiFi, Pool, Spa, Airport Shuttle, Breakfast).
* **Detailed Hotel View Modal:** High-resolution photo gallery with thumbnail switcher, comprehensive descriptions, verified facility lists, and room type selector.
* **Demo Stay Reservation:** Instant booking confirmation with reference codes (e.g. `EDO-TYO-8829`), guest details, and pricing calculated in your chosen currency.
* **My Bookings History:** Review active and past reservations, with one-tap demo booking cancellation and transparent demo notices.

### 🚆 Module 2: Transit and Navigation
* **Multi-Modal Route Search:** Enter starting point and destination, or select realistic airport-to-hotel presets.
* **Transport Modes:** Compare Train/Subway, Bus, Taxi/Cab, and Walking options side by side.
* **Step-by-Step Arrival Instructions:** Detailed timeline showing line names, platform directions, transfer points, and station exits.
* **Arrival Tips:** Contextual hints such as luggage storage, ticket vending machine guidance, and station landmarks.
* **External Maps Launcher:** One-tap button opening real directions directly in Google Maps or your native map application.
* **Eco & Carbon Rating:** Evaluates CO₂ emission savings vs driving alone.
* **Privacy by Design:** Never tracks or records GPS without user consent.

### 🗣 Module 3: Translation Tool & Phrasebook
* **Two-Way Text & Voice:** Translate between 8+ global languages (English, Japanese, French, Spanish, German, Hindi, Italian, Chinese, Arabic).
* **Speech Input (Voice):** Speak directly into your device microphone using the Web Speech Recognition API.
* **Text-to-Speech (Pronounce):** Tap the speaker button to hear native pronunciation of translated phrases.
* **Phonetic Pronunciation Guides:** Displays easy-to-read romanized phonetics for non-Latin languages.
* **Categorized Travel Phrasebook:** Includes 1-tap instant translations for all essential traveler questions:
  1. *Where is the hotel?*
  2. *How can I reach the railway station?*
  3. *Please help me.*
  4. *How much does it cost?*
  5. *Where is the nearest hospital?*
* **Offline Dictionary:** Instant zero-latency lookups for vital travel vocabulary even when completely offline.

### 🛡 Module 4: Offline Safety Toolkit
* **100% Offline Access:** Never relies on an active internet connection to retrieve emergency data.
* **Emergency Dispatch Directory:** Official Police, Ambulance, Fire, and Tourist Police telephone numbers for 12+ countries (Japan, France/EU, UK, US/Canada, India, Thailand, Italy, UAE, Australia, etc.) with 1-tap `tel:` phone dialer links.
* **Emergency SOS Button:** Features a 5-second cancelable countdown to prevent accidental triggers, revealing an **Emergency Medical Summary Card** (blood group, allergies, emergency contacts) and a pre-filled emergency SMS link.
* **Personal Emergency Contacts:** Save family, friends, or embassy contacts directly in your local browser storage.
* **Safety Protocols Guide:** Practical safety tips for nighttime travel, transit vigilance, scam avoidance, and medical emergencies.

### ⚙ User Profile & Application Settings
* **Demo Authentication:** Login, registration, and guest mode with form validation.
* **Traveler Profile:** Edit profile picture, contact phone, blood type, and emergency contact details.
* **Multi-Currency Converter:** Real-time pricing toggle between USD ($), EUR (€), GBP (£), JPY (¥), and INR (₹).
* **PWA & Offline Cache:** Service Worker caching (`/sw.js`), web manifest (`manifest.webmanifest`), and in-app installation banner with step-by-step iOS Safari instructions.

---

## 4. Project Folder Structure

```
/
├── index.html                  # HTML entry point with Poppins font and PWA meta tags
├── metadata.json               # AI Studio project configuration and capabilities
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite build setup with React & Tailwind CSS
├── public/
│   ├── icon.svg                # Brand SVG logo & PWA icon
│   ├── manifest.webmanifest    # Web App Manifest for mobile installation
│   └── sw.js                   # Service Worker for offline caching
├── src/
│   ├── main.tsx                # React root bootstrap
│   ├── App.tsx                 # Core application shell and state orchestrator
│   ├── index.css               # Tailwind CSS v4 directives and glassmorphism styling
│   ├── types/
│   │   └── index.ts            # TypeScript definitions for hotels, transit, safety, user
│   ├── data/
│   │   ├── mockHotels.ts       # Curated realistic hotel listings
│   │   ├── mockTransit.ts      # Multi-modal arrival routes and step timelines
│   │   └── safetyData.ts       # Country emergency hotlines and safety guidelines
│   ├── utils/
│   │   ├── storage.ts          # Safe localStorage wrapper for bookings & settings
│   │   ├── storage.test.ts     # Automated unit tests for storage and currency
│   │   ├── transit.ts          # Transit filtering, duration, and external map URL generator
│   │   ├── transit.test.ts      # Automated unit tests for transit logic
│   │   ├── translationData.ts  # Phrasebook, phonetics, and offline dictionary
│   │   └── translation.test.ts # Automated unit tests for translation phrases
│   └── components/
│       ├── Header.tsx          # Brand header with theme toggle, install, and profile
│       ├── BottomNav.tsx       # Mobile-first bottom navigation bar
│       ├── OfflineIndicator.tsx# Connectivity status pill (online/offline banner)
│       ├── PWAInstallButton.tsx# Install prompt with iOS Safari guide
│       ├── AuthModal.tsx       # Login & registration modal with demo fill
│       ├── ProfileModal.tsx    # Traveler profile, avatar picker, and medical notes
│       ├── SettingsModal.tsx   # Currency, theme, and offline cache manager
│       └── modules/
│           ├── HomeDashboard.tsx # Unified dashboard with shortcuts and module cards
│           ├── HotelModule.tsx   # Hotel search, filters, details, and booking history
│           ├── TransitModule.tsx # Multi-modal navigation, steps, and map launcher
│           ├── TranslateModule.tsx# Speech & text translator with phrasebook
│           └── SafetyModule.tsx  # SOS button, medical card, and emergency directory
```

---

## 5. Technologies Used

* **Frontend Framework:** React 19 with TypeScript
* **Build Tool:** Vite 8
* **Styling:** Tailwind CSS v4 with custom glassmorphism layers
* **Icons:** Lucide React (`lucide-react`)
* **Motion:** Motion (`motion`)
* **PWA & Offline:** Web App Manifest + Service Worker Cache API
* **Speech Integration:** Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
* **Testing:** Node.js built-in test runner (`node:test`, `node:assert/strict`) via `tsx`

---

## 6. How to Run & Test the Application

### Running the App
In the terminal, run:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Building for Production
```bash
npm run build
```

### Running the Automated Unit Tests
To run all logic unit tests (verifying storage, transit routing, currency formatting, and translation phrasebook):
```bash
npx --yes tsx --test src/utils/transit.test.ts src/utils/translation.test.ts src/utils/storage.test.ts
```

---

## 7. Current MVP Limitations & External API Integration Guide

This initial MVP provides an intuitive, working travel experience without charging user credit cards or requiring paid API subscriptions:

1. **Hotel Bookings:** Sample hotel listings and demo reservations are stored locally in `localStorage`.
   * *Future API Integration:* Connect to Amadeus Hotel Search API (`GET /v2/shopping/hotel-offers`) or Booking.com Rapid API via an Express backend route (`/api/hotels`).
2. **Transit Schedules:** Shows realistic multi-modal timetables and step-by-step arrivals.
   * *Future API Integration:* Connect to Google Maps Directions API, Transitland, or Citymapper API via `/api/directions`.
3. **Live AI Translation:** Phrases and common words use the built-in offline dictionary and Web Speech synthesis.
   * *Future API Integration:* Set `GEMINI_API_KEY` in `.env` to enable free-form generative translation via `@google/genai` on a server proxy.

---

## 8. Preparing EDO for Native Android & iOS

EDO is already built as a **Progressive Web App (PWA)**, which allows users to install it directly from mobile Safari or Chrome:
1. Tap the in-app **Install App** button or the browser's "Add to Home Screen" option.
2. The app will launch in standalone fullscreen mode like a native app.

### Packaging with Capacitor (for Google Play & Apple App Store)
If you wish to distribute EDO as an `.apk` / `.aab` for Android or `.ipa` for iOS:
1. Install Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
   npx cap init "EDO Travel" "app.edo.travel"
   ```
2. Build the web distribution:
   ```bash
   npm run build
   ```
3. Add native platforms:
   ```bash
   npx cap add android
   npx cap add ios
   ```
4. Sync and open in Android Studio or Xcode:
   ```bash
   npx cap open android
   npx cap open ios
   ```
