# 🎹 Piano Practice Pal - Quick Reference Card

## 🚀 Quick Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)

# Testing
npm test             # Run tests in watch mode
npm run test:run     # Run tests once (CI/CD)
npm run test:ui      # Interactive test UI
npm run test:coverage # Coverage report

# Production
npm run build        # Build for production → dist/
npm run preview      # Preview production build
```

## 📊 Project Stats

- **Version**: 2.1.0
- **Scales**: 48 unique (60 with enharmonic alternatives)
- **Tests**: 388 (all passing ✅)
- **Components**: 6
- **Services**: 3
- **Test Suites**: 3
- **Build Size**: 1.36 MB (766 KB gzipped)

## 🎵 Scale Breakdown

| Type | Count | Examples |
|------|-------|----------|
| Major | 12 | C, G, D, A, E, B, F#, C#, F, Bb, Eb, Ab |
| Natural Minor | 12 | A, E, B, F#, C#, D, G, C, F, Bb, Eb, Ab |
| Harmonic Minor | 12 | Same roots as Natural Minor |
| Melodic Minor | 12 | Same roots as Natural Minor |

**Enharmonic Pairs** (12 scales):
- Major: B/Cb, F#/Gb, C#/Db
- Minor: Bb/A#, Eb/D#, Ab/G# (×3 types)

## 🧪 Test Coverage

| Test Suite | Tests | Purpose |
|------------|-------|---------|
| scales.test.ts | 248 | Interval patterns, note spelling |
| keySignatures.test.ts | 56 | Circle of Fifths, key mapping |
| enharmonic.test.ts | 84 | Scale conversions, alternatives |

## 📁 Key Files

```
piano-practice-pal/
├── components/
│   ├── PracticeScreen.tsx      # Daily practice interface
│   ├── BrowseScalesScreen.tsx  # Scale catalog
│   ├── StaffNotation.tsx       # VexFlow music notation
│   ├── PianoKeyboard.tsx       # Visual keyboard
│   ├── StatsScreen.tsx         # Progress & export/import
│   └── SettingsScreen.tsx      # Scale type filters
├── constants/
│   ├── scales.ts               # 48 scale definitions ⭐
│   └── piano.ts                # Piano key frequencies
├── services/
│   ├── audioService.ts         # Web Audio API playback
│   ├── practiceService.ts      # Selection algorithm
│   └── storageService.ts       # LocalStorage utils
├── tests/
│   ├── scales.test.ts          # 248 tests
│   ├── keySignatures.test.ts   # 56 tests
│   └── enharmonic.test.ts      # 84 tests
└── hooks/
    └── usePracticeData.ts      # State management
```

## 🎓 Music Theory Rules

### Interval Patterns
- **Major**: W-W-H-W-W-W-H
- **Natural Minor**: W-H-W-W-H-W-W
- **Harmonic Minor**: W-H-W-W-H-Aug2-H
- **Melodic Minor Asc**: W-H-W-W-W-W-H
- **Melodic Minor Desc**: Natural Minor

### Note Spelling Rules
- Each letter (A-G) appears exactly once
- Follow key signature conventions
- Enharmonic equivalents preserve scale degrees

### Key Signatures (Circle of Fifths)
- **Sharps**: C→G→D→A→E→B→F#→C# (0-7 sharps)
- **Flats**: C→F→Bb→Eb→Ab→Db→Gb→Cb (0-7 flats)
- Relative minors share key signatures with majors

## 🔧 Common Tasks

### Adding a New Scale
1. Add to `constants/scales.ts`
2. Update test expectations in `tests/scales.test.ts`
3. Run `npm test` to verify
4. Check key signature in `tests/keySignatures.test.ts`

### Modifying Audio Playback
- Edit `services/audioService.ts`
- Adjust `OCTAVE_STARTS` for different octave ranges
- Modify `NOTE_DURATION` and `NOTE_INTERVAL` for timing

### Changing Daily Scale Count
- Edit `NUM_DAILY_SCALES` in `services/practiceService.ts`
- Default: 2 scales per day

### Customizing Selection Algorithm
- Modify weights in `services/practiceService.ts`:
  ```typescript
  confidenceWeight = (4 - entry.confidence) * 20;
  recencyWeight = daysSincePracticed;
  randomFactor = Math.random() * 5;
  ```

## 🐛 Debugging

### Check Scale Database
```bash
# Count scales by type
grep "type: 'major'" constants/scales.ts | wc -l
grep "type: 'natural-minor'" constants/scales.ts | wc -l
```

### Verify Tests
```bash
npm test -- --run --reporter=verbose
```

### Check Build
```bash
npm run build -- --mode development  # Dev build
npm run build                        # Prod build
```

## 📚 Documentation Files

- **README.md** - User guide & setup
- **CHANGELOG.md** - Version history
- **ROADMAP.md** - Future features & timeline (40+ ideas!)
- **RELEASE-2.1.0.md** - Current release notes
- **QUICK-REFERENCE.md** - This file

## 🎯 Quality Checklist

Before deploying:
- [ ] `npm test` - All tests pass
- [ ] `npm run build` - Build succeeds
- [ ] Zero TypeScript errors
- [ ] Documentation updated
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated

## 🌟 Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| React | 19.1.1 | UI framework |
| TypeScript | 5.8.2 | Type safety |
| Vite | 6.4.1 | Build tool |
| VexFlow | 5.0.0 | Music notation |
| Vitest | 3.2.4 | Testing |
| Web Audio API | Native | Audio synthesis |
| LocalStorage | Native | Data persistence |

## 💡 Tips

- **Fast feedback**: Use `npm test` in watch mode during development
- **Visual tests**: Use `npm run test:ui` for interactive debugging
- **Coverage**: Run `npm run test:coverage` to find untested code
- **Performance**: VexFlow is large (~600KB) - consider lazy loading
- **Mobile**: Test on mobile devices - touch interactions work differently
- **Audio**: Some browsers require user interaction before playing audio

## 🚀 Deployment

Build is static and can deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` branch
- **AWS S3**: Upload `dist/` to bucket
- **Any static host**: Serve `dist/` folder

## 📞 Support

- Check tests first: `npm test`
- Review CHANGELOG.md for known issues
- Verify TypeScript: Check for red squiggles
- Build verification: `npm run build`

---

**Last Updated**: November 3, 2025  
**Version**: 2.1.0  
**Status**: ✅ Production Ready
