# Piano Practice Pal - Feature Documentation

## Scale Customization System

### Overview
The Scale Settings system allows users to customize their practice experience by selecting which types of scales they want to include in their daily practice sessions.

### Scale Types

#### 1. Major Scales (15 total)
- **Description**: The foundation of Western music
- **Default**: Enabled
- **Examples**: C Major, G Major, D Major, etc.
- **Theory**: Uses major scale formula (W-W-H-W-W-W-H)
- **Special Notes**: Uses proper enharmonic spellings (F#/Gb, C#/Db, etc.)

#### 2. Natural Minor Scales (20 total)
- **Description**: The relative minor, natural form
- **Default**: Enabled
- **Examples**: A minor, E minor, B minor, etc.
- **Theory**: Uses natural minor formula (W-H-W-W-H-W-W)
- **Special Notes**: Includes all enharmonic variants (G#/Ab, D#/Eb, A#/Bb)

#### 3. Harmonic Minor Scales (20 total)
- **Description**: Minor scale with raised 7th degree
- **Default**: Disabled (recommended for intermediate players)
- **Examples**: A harmonic minor, E harmonic minor, etc.
- **Theory**: Natural minor with raised 7th (creates distinctive augmented 2nd interval)
- **Special Notes**: Used extensively in classical and jazz music

#### 4. Melodic Minor Scales (20 total)
- **Description**: Minor scale with different ascending/descending forms
- **Default**: Disabled (recommended for advanced players)
- **Examples**: A melodic minor, E melodic minor, etc.
- **Theory**: 
  - **Ascending**: Natural minor with raised 6th and 7th degrees
  - **Descending**: Same as natural minor scale
- **Special Features**: 
  - Toggle button to switch between ascending (↑) and descending (↓) forms
  - Shows different notes depending on direction
  - Uses double sharps (##) where theoretically correct

## Music Theory Notation

### Double Sharps (##)
Used in scales where proper key signature theory requires them:
- **D# Major**: Contains F## and G##
- **G# Major**: Contains F##
- **A# Minor** (all forms): Contains G##
- **D# Minor** (all forms): Contains C##

### Double Flats (bb)
Used in scales where proper key signature theory requires them:
- **Gb Major**: Contains Cb (not a double flat, but enharmonic to B)
- **Cb Major**: Contains Fb (enharmonic to E)

### Enharmonic Equivalents
The app shows both theoretical names and enharmonic alternatives:
- F# Major / Gb Major
- C# Major / Db Major
- G# Minor / Ab Minor
- D# Minor / Eb Minor
- A# Minor / Bb Minor

## User Settings

### Default Configuration
```typescript
{
  enabledScaleTypes: {
    'major': true,              // Enabled by default
    'natural-minor': true,      // Enabled by default
    'harmonic-minor': false,    // Disabled by default
    'melodic-minor': false      // Disabled by default
  }
}
```

### Storage
- Settings are persisted to `localStorage` under the key `piano-practice-settings`
- Changes take effect immediately
- New scales are selected automatically when settings change

### Settings Screen Features
1. **Toggle Switches**: Simple on/off for each scale type
2. **Count Indicator**: Shows how many types are currently enabled
3. **Reset Button**: Restore default settings
4. **Cancel Button**: Discard changes without saving
5. **Save Button**: Apply changes and return to practice

## Practice Algorithm Integration

### Scale Selection
The practice algorithm respects user settings:
1. Filters available scales by enabled types
2. Applies spaced repetition algorithm to filtered scales
3. Selects 2 scales per day from the filtered pool
4. Ensures variety while prioritizing scales that need practice

### Confidence Tracking
- Each scale maintains its own practice history
- Confidence levels: "Needs Work" → "Getting There" → "Mastered"
- Scales with lower confidence appear more frequently
- All 95 scales tracked independently regardless of enabled status

## Implementation Details

### New Components
- **`SettingsScreen.tsx`**: Full-featured settings UI with toggles and save/cancel/reset

### Updated Components
- **`App.tsx`**: Added settings view and navigation
- **`PracticeScreen.tsx`**: Added ascending/descending toggle for melodic minor

### New Types
```typescript
type ScaleType = 'major' | 'natural-minor' | 'harmonic-minor' | 'melodic-minor';

interface ScaleTypeSettings {
  'major': boolean;
  'natural-minor': boolean;
  'harmonic-minor': boolean;
  'melodic-minor': boolean;
}

interface UserSettings {
  enabledScaleTypes: ScaleTypeSettings;
}
```

### Service Updates
- **`storageService.ts`**: New functions for settings persistence
- **`practiceService.ts`**: Updated to filter by enabled scale types
- **`usePracticeData.ts`**: Integrated user settings state management

## Usage Recommendations

### For Beginners
Start with default settings (Major and Natural Minor only):
- Focus on the fundamentals
- Build finger memory and technique
- Master basic key relationships

### For Intermediate Players
Enable Harmonic Minor:
- Learn the characteristic raised 7th
- Practice the augmented 2nd interval
- Common in classical repertoire

### For Advanced Players
Enable all scale types including Melodic Minor:
- Master all scale forms
- Practice ascending/descending variations
- Complete theoretical knowledge

## Future Enhancement Ideas
- Custom scale lists (create your own practice sets)
- Daily scale count customization (practice more than 2 per day)
- Focus modes (e.g., "all scales in C#", "only black key scales")
- Practice statistics by scale type
- Export/import settings
