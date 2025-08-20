export interface Scale {
  name: string;
  notes: string[];
  type: 'major' | 'minor';
}

export type ConfidenceLevel = 1 | 2 | 3; // 1: Needs Work, 2: Getting There, 3: Mastered

export interface PracticeEntry {
  lastPracticed: string | null;
  confidence: ConfidenceLevel;
}

export interface PracticeData {
  [scaleName: string]: PracticeEntry;
}
