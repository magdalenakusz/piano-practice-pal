# 🎹 Piano Practice Pal

A clean, simple web app designed to help you master all piano scales through daily practice and spaced repetition. Perfect for pianists of all levels who want to build consistent practice habits.

![Piano Practice Pal](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## ✨ Features

- **Daily Scale Selection**: Smart algorithm selects 2 scales per day based on your practice history and confidence levels
- **Spaced Repetition**: Scales you need more work on appear more frequently
- **Visual Piano Keyboard**: See exactly which notes to play with highlighted keys
- **Progress Tracking**: Track your confidence level and practice history for all 35 major and minor scales
- **Enharmonic Support**: Automatically shows enharmonic equivalents (e.g., F# Major / Gb Major)
- **Mobile-Friendly**: Fully responsive design works on all devices and screen sizes
- **Offline-Ready**: All data stored locally in your browser - no account required

## 🎯 Scale Coverage

The app includes all standard piano scales:
- **15 Major Scales**: C, G, D, A, E, B, F#, C#, F, Bb, Eb, Ab, Db, Gb, Cb
- **20 Minor Scales**: A, E, B, F#, C#, G#, D#, A#, D, G, C, F, Bb, Eb, Ab (natural minor)

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

## 📱 How to Use

1. **Practice Mode** (default view):
   - See your daily selected scales
   - View the notes on a visual piano keyboard
   - Click "I've Practiced This Scale" when done
   - Rate your confidence: Needs Work / Getting There / Mastered

2. **Stats View**:
   - Click "View Practice History" to see all scales
   - Sort by name, recent practice, or confidence level
   - Track your progress over time
   - Reset all data if you want to start fresh

3. **New Session**:
   - Complete all daily scales to unlock a new session
   - Start practicing more scales whenever you want

## 🛠️ Technology Stack

- **React 19** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling (via CDN)
- **LocalStorage** - Client-side data persistence

## 📂 Project Structure

```
piano-practice-pal/
├── components/          # React components
│   ├── PianoKeyboard.tsx
│   ├── PracticeScreen.tsx
│   └── StatsScreen.tsx
├── constants/           # Static data
│   ├── piano.ts        # Piano key definitions
│   └── scales.ts       # All 35 scales
├── hooks/              # Custom React hooks
│   └── usePracticeData.ts
├── services/           # Business logic
│   ├── practiceService.ts  # Scale selection algorithm
│   └── storageService.ts   # LocalStorage utilities
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component
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
