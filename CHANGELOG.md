# Changelog

## Version 2.1.0 - Comprehensive Testing & Music Theory Validation (2025-11-03)

### 🎯 Major New Features

#### Comprehensive Test Suite
- **388 Unit Tests**: Complete test coverage ensuring musical accuracy
  - 248 tests for scale intervals and note spelling
  - 56 tests for key signature mapping
  - 84 tests for enharmonic equivalent conversions
- **Test Framework**: Vitest 3.2.4 with jsdom environment
- **Test Infrastructure**: @testing-library/react for component testing
- **Coverage Reports**: Available via `npm run test:coverage`
- **CI/CD Ready**: Tests complete in ~950ms

#### Test Coverage Areas
- **Scale Intervals**: Validates all 48 scales follow correct patterns
  - Major: W-W-H-W-W-W-H (whole-whole-half-whole-whole-whole-half)
  - Natural Minor: W-H-W-W-H-W-W
  - Harmonic Minor: W-H-W-W-H-Aug2-H (augmented 2nd)
  - Melodic Minor: W-H-W-W-W-W-H ascending, natural minor descending
- **Note Spelling**: Each letter name (A-G) appears exactly once per scale
- **Key Signatures**: All scales map correctly to 0-7 sharps or flats
- **Enharmonic Conversions**: Scale-degree preservation validated
- **Database Integrity**: Validates count, uniqueness, required properties

### 🔧 Critical Fixes

#### Audio Playback - Octave Handling
- **Fixed**: Scales now properly cross octave boundaries
- **Problem**: All notes were in same octave (C4-B4), causing downward jumps
  - Example: B Major played B4 → C#4 (wrong) instead of B4 → C#5 (correct)
- **Solution**: Intelligent octave tracking algorithm
  - Detects when note letter wraps (B→C, G→A, etc.)
  - Automatically increments octave for ascending progression
  - All scales now sound melodically natural and correct

#### Staff Notation Display
- **Increased width**: 700px → 800px for better accidental spacing
- **Better rendering**: Accommodates scales with 6-7 accidentals
- **Visual improvement**: Proper spacing for complex key signatures

### 🎵 Scale Database Corrections

#### Accurate Scale Count
- **Total unique scales**: 48 (corrected from previous documentation of 95)
  - 12 Major scales
  - 12 Natural Minor scales
  - 12 Harmonic Minor scales
  - 12 Melodic Minor scales
- **Enharmonic alternatives**: 12 scales with alternative names
  - 3 Major: B/Cb, F#/Gb, C#/Db
  - 9 Minor: Bb/A#, Eb/D#, Ab/G# (Natural, Harmonic, Melodic)
- **Total variations**: 60 scale options for users

### 📦 New Dependencies
- `vitest: ^3.2.4` - Fast unit testing framework
- `@testing-library/react: ^16.3.0` - Component testing utilities
- `@testing-library/jest-dom: ^6.9.1` - DOM matchers
- `jsdom: ^27.0.1` - Browser environment simulation
- `@vitest/ui: ^3.2.4` - Interactive test UI

### 📝 Documentation Updates
- **README.md**: 
  - Corrected scale counts (48 unique scales)
  - Added test suite documentation
  - Updated feature list with test coverage
  - Added test commands and usage
- **New Test Files**:
  - `tests/setup.ts` - Test configuration
  - `tests/scales.test.ts` - Scale validation (248 tests)
  - `tests/keySignatures.test.ts` - Key signature tests (56 tests)
  - `tests/enharmonic.test.ts` - Enharmonic tests (84 tests)

### 🧹 Code Quality
- **Removed debug logs**: Cleaned up console.log statements from production code
- **Kept useful warnings**: Maintained console.warn for error detection
- **Better comments**: Improved code documentation
- **Type safety**: All scales verified against TypeScript definitions

### 🚀 New npm Scripts
```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:ui       # Interactive test UI
npm run test:coverage # Coverage report
```

### ✅ Verification
- ✅ Music theory validated against authoritative sources
- ✅ 388 passing unit tests
- ✅ Manual testing of all 48 scales
- ✅ Audio playback verification
- ✅ Staff notation rendering checked
- ✅ Production build successful
- ✅ TypeScript strict mode compliance

### 🎓 Developer Experience
- **Regression protection**: Tests catch changes to scale definitions
- **Documentation**: Tests serve as executable music theory specification
- **Easy contribution**: Clear patterns for adding new scales
- **Fast feedback**: Tests run in under 1 second

---

## Version 2.0.0 - Musical Notation & Audio Playback (2025-11-03)

### 🎼 Major New Features

#### Professional Music Notation
- **VexFlow Integration**: Added professional music notation library (VexFlow 5.0)
- **Musical Staff Display**: Shows scales on standard 5-line staff with treble clef
- **Key Signatures**: Automatically displays correct sharps/flats for all 95 scales
  - Sharp keys: 1-7 sharps (G Major through C# Major)
  - Flat keys: 1-7 flats (F Major through Cb Major)
  - Proper relative minor key signatures
- **Note Rendering**: Accurate note positioning on staff lines and spaces
- **Accidentals**: Displays sharp, flat, double sharp, and double flat symbols
- **Octave Accuracy**: Notes span correct octave range matching audio playback
- **SVG Graphics**: Crisp, scalable rendering on all screen sizes
- **Integration**: Appears in both Practice and Browse screens
- **New Component**: `StaffNotation.tsx` with comprehensive key signature mapping

#### Audio Playback System
- **Web Audio API**: Real-time audio synthesis for scale playback
- **Triangle Wave**: Clean, educational piano tone
- **ADSR Envelope**: Natural attack, decay, sustain, release
- **Octave Balancing**: Intelligent octave selection for comfortable listening
  - C, D, E scales start in octave 4 (middle C region)
  - F, F#, G, A, B scales start in octave 3 (slightly lower)
  - Automatic octave progression at note C
- **Legato Timing**: Smooth 0.05s note overlap for musical phrasing
- **Play Modes**:
  - "Play Scale": Ascending only
  - "Up & Down": Ascending then descending
- **New Service**: `audioService.ts` with frequency calculation and playback logic
- **Performance**: Lightweight, no external audio files, instant response

### 🎹 Enhanced User Experience
- **Multi-Modal Learning**: Visual (staff + keyboard), Auditory (playback), Kinesthetic (practice)
- **Educational Value**: See how scales appear in actual sheet music
- **Music Theory**: Understand relationship between scales and key signatures
- **Sight Reading**: Practice reading scales in standard notation

### 📦 Technical Details
- **New Dependency**: `vexflow ^5.0.0` (professional music notation)
- **Bundle Size**: 1,364 KB (766 KB gzipped) - includes VexFlow library
- **Architecture**: Clean separation between notation rendering and audio synthesis
- **Error Handling**: Graceful fallback for notation rendering failures
- **Type Safety**: Full TypeScript coverage for new features

### 🔧 Code Quality Improvements
- **Clean Code**: Removed all debug logging from production build
- **Documentation**: Updated README.md with musical notation features
- **Feature Docs**: Expanded FEATURES.md with notation and audio sections
- **No Errors**: Zero TypeScript compilation errors
- **Consistent Style**: Maintained 2-space indentation throughout

### 📝 Documentation Updates
- **README.md**: Added musical notation to feature list and usage instructions
- **FEATURES.md**: New sections on Musical Staff Notation and Audio Playback System
- **Technology Stack**: Updated to include VexFlow and Web Audio API
- **Project Structure**: Updated file tree to include new components and services

---

## Version 1.1.0 - Scale Customization & Music Theory Enhancements (2025-11-03)

### 🎯 New Features

#### Scale Settings System
- **Settings Screen**: New dedicated screen for customizing which scale types to practice
- **Scale Type Toggles**: Enable/disable Major, Natural Minor, Harmonic Minor, and Melodic Minor scales independently
- **Smart Defaults**: Major and Natural Minor enabled by default for beginners
- **Live Updates**: Scale selection updates immediately when settings are changed
- **Persistent Settings**: User preferences saved to localStorage

#### Melodic Minor Direction Toggle
- **Ascending/Descending Forms**: Melodic minor scales now show both directions
- **Interactive Toggle**: Switch between ascending (↑) and descending (↓) forms during practice
- **Proper Theory**: Ascending uses raised 6th and 7th; descending uses natural minor scale

#### Music Theory Accuracy
- **Double Sharps**: Properly uses F##, G##, C## where theoretically correct (e.g., D# Major, G# Major)
- **Double Flats**: Uses Bbb, Abb where required
- **Enharmonic Equivalents**: Maintains proper key signature theory while showing enharmonic alternatives

### 📊 Scale Coverage
- **95 Total Scales**: Complete coverage of all standard piano scales
  - 15 Major scales
  - 20 Natural Minor scales  
  - 20 Harmonic Minor scales
  - 20 Melodic Minor scales (with both ascending and descending forms)

### 🔧 Technical Improvements
- **Type System**: Extended with `ScaleType`, `ScaleTypeSettings`, `UserSettings` types
- **Storage Service**: Added user settings management functions
- **Practice Algorithm**: Updated to filter scales by enabled types
- **Component Architecture**: New `SettingsScreen` component with clean UI

### 🎨 UI/UX Enhancements
- **Settings Button**: Added to main header for easy access
- **Scale Type Labels**: Clear descriptions for each scale type
- **Direction Indicators**: Visual arrows (↑/↓) for melodic minor direction
- **Count Display**: Shows how many scale types are currently enabled
- **Sorting Default**: Changed default sort to "Last Practiced" for better workflow

### 📦 Bundle Size
- Production build: 219KB (gzipped: 67KB)

---

## Version 1.0.0 - Clean & Polished Release (2025-11-03)

### 🎉 Major Improvements

This release represents a complete cleanup and refinement of the Piano Practice Pal codebase, establishing a clean foundation for future development.

### 📦 Dependencies
- **Removed**: Unused `@google/genai` dependency
- **Added**: Missing TypeScript type definitions for React (`@types/react`, `@types/react-dom`)
- **Updated**: `package.json` version to 1.0.0 with proper description

### 🗂️ Code Organization & Style
- **Standardized indentation**: All files now use 2-space indentation consistently
- **Removed unnecessary comments**: Cleaned up verbose comments, keeping only essential documentation
- **Improved code formatting**: Better readability throughout all components
- **Consistent error handling**: Standardized error variable names from `e` to `error`
- **Better JSDoc comments**: Added clear function documentation in `practiceService.ts`

### 🧹 Configuration Files
- **vite.config.ts**: Removed unused Gemini API key configurations
- **index.html**: 
  - Cleaned up import map (removed unused `@google/genai`)
  - Added meta description for SEO
  - Better formatting

### 📝 Documentation
- **README.md**: Complete rewrite with:
  - Clear feature list
  - Comprehensive getting started guide
  - Project structure documentation
  - Technology stack details
  - Customization instructions
  - Contributing guidelines
  - Removed outdated AI Studio references
  
- **CHANGELOG.md**: New file to track changes (this file!)

### 🎨 Component Improvements
- **App.tsx**: Simplified and better formatted
- **PracticeScreen.tsx**: 
  - Better component organization
  - Improved readability
  - Cleaner sub-component definitions
- **StatsScreen.tsx**: More consistent formatting
- **PianoKeyboard.tsx**: Simplified logic, better readability
- **All components**: Consistent TypeScript prop interface definitions

### 🔧 Service Layer
- **practiceService.ts**: 
  - Enhanced documentation
  - Clearer variable names
  - Better code organization
- **storageService.ts**: 
  - Consistent error handling
  - Clearer function organization
  - Removed unnecessary comments

### 🪝 Hooks
- **usePracticeData.ts**: 
  - Simplified comments
  - Better code organization
  - More consistent formatting

### 🎯 Type Definitions
- All TypeScript types remain well-organized in `types/index.ts`
- Consistent type usage throughout the codebase

### ✅ Quality Assurance
- Zero TypeScript errors
- Zero linting issues
- All dependencies properly installed
- Clean build process

### 🚀 What's Next
The codebase is now in excellent shape for future feature development:
- Consider adding harmonic minor and melodic minor scales
- Potential for practice session history/analytics
- Audio playback for scales
- Customizable practice session length
- Export/import practice data

---

**Note**: This version establishes a clean, maintainable foundation. All existing functionality is preserved while code quality is significantly improved.
