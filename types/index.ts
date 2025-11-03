export type ScaleType = 'major' | 'natural-minor' | 'harmonic-minor' | 'melodic-minor';

export interface Scale {
  name: string;
  notes: string[];
  notesDescending?: string[]; // For melodic minor
  type: ScaleType;
  altName?: string; // Alternative enharmonic name (e.g., "G# Harmonic Minor" for Ab Harmonic Minor)
}

export interface ScaleTypeSettings {
  major: boolean;
  'natural-minor': boolean;
  'harmonic-minor': boolean;
  'melodic-minor': boolean;
}

export type ConfidenceLevel = 1 | 2 | 3; // 1: Needs Work, 2: Getting There, 3: Mastered

export interface PracticeEntry {
  lastPracticed: string | null;
  confidence: ConfidenceLevel;
}

export interface PracticeData {
  [scaleName: string]: PracticeEntry;
}

export interface UserSettings {
  enabledScaleTypes: ScaleTypeSettings;
}
