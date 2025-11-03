# Changelog

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
