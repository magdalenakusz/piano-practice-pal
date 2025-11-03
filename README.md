# 🎹 Piano Practice Pal

A clean, simple web app designed to help you master all piano scales through daily practice and spaced repetition. Perfect for pianists of all levels who want to build consistent practice habits.

## ✨ Features

- **Daily Scale Selection**: Smart algorithm selects 2 scales per day based on your practice history and confidence levels
- **Browse All Scales**: Browse and select any scale from the complete catalog of 48 scales
- **Musical Staff Notation**: Professional music notation with treble clef and key signatures for all scales (VexFlow)
- **Audio Playback**: Hear each scale played with clean piano tones (Web Audio API) with proper octave handling
- **Spaced Repetition**: Scales you need more work on appear more frequently
- **Customizable Scale Types**: Choose which scale types to include in your practice (Major, Natural Minor, Harmonic Minor, Melodic Minor)
- **Direction Toggle**: For melodic minor scales, switch between ascending and descending forms
- **Visual Piano Keyboard**: See exactly which notes to play with highlighted keys
- **Progress Tracking**: Track your confidence level and practice history for all 48 scales
- **Export/Import Data**: Backup and restore your practice data across browsers and devices
- **Enharmonic Support**: Automatically shows enharmonic equivalents (e.g., F# Major / Gb Major)
- **Proper Music Notation**: Uses correct theoretical notation with proper note spelling
- **Mobile-Friendly**: Fully responsive design works on all devices and screen sizes
- **Offline-Ready**: All data stored locally in your browser - no account required
- **Comprehensive Test Suite**: 388 unit tests ensure all scales are musically correct

## 🎯 Scale Coverage

The app includes **48 unique scales** across 4 types, all with theoretically correct notation:

- **12 Major Scales**: C, G, D, A, E, B, F#, C#, F, Bb, Eb, Ab
- **12 Natural Minor Scales**: A, E, B, F#, C#, D, G, C, F, Bb, Eb, Ab
- **12 Harmonic Minor Scales**: All keys with raised 7th degree
- **12 Melodic Minor Scales**: All keys with raised 6th and 7th degrees ascending, natural descending

**Enharmonic Equivalents**: 12 scales have alternative names:
- Major: B/Cb, F#/Gb, C#/Db
- Minor (Natural, Harmonic, Melodic): Bb/A#, Eb/D#, Ab/G#

**Total scales including enharmonic names**: 60 scale variations

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/magdalenakusz/piano-practice-pal.git
   cd piano-practice-pal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready to deploy to any static hosting service.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Run Tests

To run the comprehensive test suite (388 tests):

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

The test suite includes:
- **248 tests** for scale intervals and note spelling
- **56 tests** for key signature mapping
- **84 tests** for enharmonic equivalent conversions

## 📱 How to Use

1. **Practice Mode** (default view):
   - See your daily selected scales
   - **📝 Musical Notation**: View scales on a professional music staff with treble clef and key signatures
   - **🎹 Piano Keyboard**: See notes highlighted on a visual piano keyboard
   - **🔊 Listen**: Click "Play Scale" to hear it, or "Up & Down" to hear it ascending and descending
   - For melodic minor scales, toggle between ascending ↑ and descending ↓ forms
   - Click "I've Practiced This Scale" when done
   - Rate your confidence: Needs Work / Getting There / Mastered

2. **Browse All Scales**:
   - Click "Browse All Scales" in the header
   - Search for scales by name (e.g., "C", "Minor", "Harmonic")
   - Filter by scale type (Major, Natural Minor, Harmonic Minor, Melodic Minor)
   - **📝 Musical Notation**: See each scale on a professional staff with proper key signatures
   - **🎹 Piano Preview**: Preview any scale with the keyboard visualization
   - **🔊 Listen**: Use the "Play" and "Up & Down" buttons to hear each scale
   - Click "Practice This Scale" to practice it immediately
   - Perfect for working on specific scales or exploring the full catalog

3. **Scale Settings**:
   - Click "Scale Settings" in the header
   - Toggle which scale types you want to practice:
     - Major (enabled by default)
     - Natural Minor (disabled by default)
     - Harmonic Minor (enabled by default)
     - Melodic Minor (enabled by default)
   - Changes take effect immediately and new scales will be selected
   - Perfect for beginners who want to start with just major scales, or advanced players who want to focus on specific types

4. **Stats View**:
   - Click "View Practice History" to see all scales
   - Sort by name, recent practice, or confidence level
   - Track your progress over time
   - **Export**: Download your practice data as a JSON file for backup
   - **Import**: Upload a previously exported file to restore your progress
   - **Reset**: Clear all data if you want to start fresh

5. **Backup & Restore**:
   - **Export your data**: Click "Export" in the Stats view to download a backup file
   - **Import your data**: Click "Import" and select a backup file to restore
   - Useful for:
     - Backing up your progress
     - Transferring data between browsers or devices
     - Recovering after accidentally clearing browser data

6. **New Session**:
   - Complete all daily scales to unlock a new session
   - Start practicing more scales whenever you want

## 🛠️ Technology Stack

- **React 19** - Modern UI library with hooks
- **TypeScript 5.8** - Type-safe development
- **Vite 6** - Fast build tool and dev server
- **VexFlow 5** - Professional music notation rendering (SVG)
- **Web Audio API** - Real-time audio synthesis for scale playback
- **Vitest 3** - Fast unit testing framework with 388 tests
- **Tailwind CSS** - Utility-first styling (via CDN)
- **LocalStorage** - Client-side data persistence

## 📂 Project Structure

```
piano-practice-pal/
├── components/          # React components
│   ├── BrowseScalesScreen.tsx  # Scale catalog browser
│   ├── PianoKeyboard.tsx       # Visual piano with highlighted keys
│   ├── PracticeScreen.tsx      # Main practice interface
│   ├── SettingsScreen.tsx      # Scale type customization
│   ├── StaffNotation.tsx       # Musical staff notation (VexFlow)
│   └── StatsScreen.tsx         # Progress tracking and data export
├── constants/           # Static data
│   ├── piano.ts        # Piano key definitions and frequencies
│   └── scales.ts       # All 48 scales with proper notation
├── hooks/              # Custom React hooks
│   └── usePracticeData.ts  # Practice data and state management
├── services/           # Business logic
│   ├── audioService.ts     # Web Audio API for scale playback
│   ├── practiceService.ts  # Scale selection algorithm
│   └── storageService.ts   # LocalStorage utilities
├── tests/              # Test suite (388 tests)
│   ├── setup.ts            # Vitest configuration
│   ├── scales.test.ts      # Scale interval tests (248 tests)
│   ├── keySignatures.test.ts  # Key signature tests (56 tests)
│   └── enharmonic.test.ts  # Enharmonic conversion tests (84 tests)
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component and routing
├── index.tsx           # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
└── README.md           # This file
```

## 🎨 Customization

### Adjust Daily Scale Count

Edit `services/practiceService.ts`:

```typescript
const NUM_DAILY_SCALES = 2; // Change to your preferred number
```

### Modify Selection Algorithm

The scale selection algorithm in `practiceService.ts` considers:
- **Confidence level**: Lower confidence = higher priority
- **Days since last practice**: Longer time = higher priority
- **Randomness**: Small random factor for variety

Adjust the weights to customize behavior:

```typescript
const confidenceWeight = (4 - entry.confidence) * 20;
const recencyWeight = daysSincePracticed;
const randomFactor = Math.random() * 5;
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 🎵 Happy Practicing!

Remember: Consistent daily practice is the key to mastering scales. Even just 10-15 minutes a day makes a huge difference!

---

Built with ❤️ for pianists everywhere
