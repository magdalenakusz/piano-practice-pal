# Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Overview

Piano Practice Pal is a single-page React application that helps users practice piano scales using a spaced repetition algorithm. All user data is stored locally in the browser using LocalStorage.

## Architecture

### Data Flow
1. **App.tsx** - Main container, manages view state (practice vs stats)
2. **usePracticeData** hook - Manages all practice data and session state
3. **storageService** - Handles LocalStorage operations
4. **practiceService** - Contains scale selection algorithm
5. **PracticeScreen/StatsScreen** - UI components for each view

### Key Concepts

**Daily Practice Session**
- Users get 2 scales per day (configurable)
- Scales are selected based on confidence level and recency
- Session persists until completed

**Confidence Tracking**
- 1 = Needs Work (red)
- 2 = Getting There (yellow)
- 3 = Mastered (green)

**Spaced Repetition Algorithm**
The scale selection in `practiceService.ts` uses a scoring system:
- Lower confidence → Higher score
- More days since practice → Higher score
- Small random factor for variety

## File Structure

```
piano-practice-pal/
├── components/              # React UI components
│   ├── PianoKeyboard.tsx   # Visual piano with highlighted notes
│   ├── PracticeScreen.tsx  # Main practice interface
│   └── StatsScreen.tsx     # History and statistics view
├── constants/              # Static data
│   ├── piano.ts           # Piano key definitions
│   └── scales.ts          # All 35 scales and enharmonic mappings
├── hooks/                 # Custom React hooks
│   └── usePracticeData.ts # Main practice data management
├── services/              # Business logic
│   ├── practiceService.ts # Scale selection algorithm
│   └── storageService.ts  # LocalStorage wrapper
├── types/                 # TypeScript definitions
│   └── index.ts          # All type definitions
├── App.tsx               # Root component
├── index.tsx             # Entry point
└── index.html            # HTML template
```

## Development Workflow

### Adding New Scales
1. Add scale definition to `constants/scales.ts`
2. Update enharmonic equivalents if needed
3. No other changes required - the app will automatically include it

### Modifying the Algorithm
Edit `services/practiceService.ts`:
```typescript
// Adjust daily scale count
const NUM_DAILY_SCALES = 2;

// Adjust scoring weights
const confidenceWeight = (4 - entry.confidence) * 20; // Confidence impact
const recencyWeight = daysSincePracticed;              // Time impact
const randomFactor = Math.random() * 5;                // Randomness
```

### Customizing UI
- All styling uses Tailwind CSS classes
- Color scheme: Gray-based dark theme with blue/green accents
- Main colors: `bg-gray-900` (background), `text-white` (text), `bg-blue-600` (buttons)

### Adding New Features

**Example: Add a new confidence level**
1. Update `types/index.ts`: `type ConfidenceLevel = 1 | 2 | 3 | 4;`
2. Update `components/StatsScreen.tsx`: Add case for level 4
3. Update `components/PracticeScreen.tsx`: Add button for level 4

**Example: Export practice data**
1. Add button in `StatsScreen.tsx`
2. Create export function in `storageService.ts`
3. Use `JSON.stringify()` and create download link

## LocalStorage Keys

- `pianoPracticeData` - All practice history
  ```json
  {
    "C Major": {
      "lastPracticed": "2025-11-03T10:30:00.000Z",
      "confidence": 3
    }
  }
  ```

- `dailyPianoPractice` - Current daily session
  ```json
  {
    "date": "2025-11-03",
    "scales": ["C Major", "A Minor"]
  }
  ```

## Testing Locally

### Test Different Scenarios
```javascript
// In browser console:

// View current practice data
localStorage.getItem('pianoPracticeData')

// View daily practice
localStorage.getItem('dailyPianoPractice')

// Clear all data (reset)
localStorage.clear()

// Manually set practice data (for testing)
localStorage.setItem('pianoPracticeData', JSON.stringify({
  "C Major": { "lastPracticed": "2025-01-01T00:00:00.000Z", "confidence": 1 }
}))
```

## Performance Notes

- App bundle size: ~210KB (gzipped ~65KB)
- No external API calls - everything runs locally
- Instant load time after initial bundle download
- Works offline after first load

## Browser Compatibility

- Modern browsers with ES2022 support
- LocalStorage required
- No IE11 support (uses modern JS features)

## Deployment

The app is a static site - can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Just run `npm run build` and deploy the `dist/` folder.

## Common Tasks

### Update Dependencies
```bash
npm update
```

### Fix TypeScript Errors
```bash
npx tsc --noEmit
```

### Check Bundle Size
```bash
npm run build
# Check dist/assets/*.js file sizes
```

## Troubleshooting

**Issue: App shows "Loading..." forever**
- Check browser console for errors
- Clear LocalStorage: `localStorage.clear()`
- Refresh page

**Issue: Practice data disappeared**
- Check if LocalStorage is enabled
- Check browser privacy settings
- Data is domain-specific

**Issue: TypeScript errors**
- Run `npm install` to ensure types are installed
- Check `tsconfig.json` is properly configured

## Code Style

- 2-space indentation
- Single quotes for strings (except JSX attributes)
- No semicolons (automatic insertion)
- Functional components with hooks
- Named exports for components
- Clear, descriptive variable names

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add: description of changes"

# Push to remote
git push origin feature/my-feature
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
