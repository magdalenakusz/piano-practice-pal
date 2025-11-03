import type { Scale } from '../types';

export const ALL_SCALES: Scale[] = [
  // Major Scales (Sharp Keys)
  { name: 'C Major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], type: 'major' },
  { name: 'G Major', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], type: 'major' },
  { name: 'D Major', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], type: 'major' },
  { name: 'A Major', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], type: 'major' },
  { name: 'E Major', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], type: 'major' },
  { name: 'B Major', notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], type: 'major' },
  { name: 'F# Major', notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], type: 'major' },
  { name: 'C# Major', notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'], type: 'major' },

  // Major Scales (Flat Keys)
  { name: 'F Major', notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], type: 'major' },
  { name: 'Bb Major', notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], type: 'major' },
  { name: 'Eb Major', notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'], type: 'major' },
  { name: 'Ab Major', notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], type: 'major' },
  { name: 'Db Major', notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'], type: 'major' },
  { name: 'Gb Major', notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'], type: 'major' },
  { name: 'Cb Major', notes: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'], type: 'major' },
  
  // Natural Minor Scales (Sharp Keys)
  { name: 'A Minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], type: 'natural-minor' },
  { name: 'E Minor', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], type: 'natural-minor' },
  { name: 'B Minor', notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], type: 'natural-minor' },
  { name: 'F# Minor', notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], type: 'natural-minor' },
  { name: 'C# Minor', notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], type: 'natural-minor' },
  { name: 'G# Minor', notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'], type: 'natural-minor' },
  { name: 'D# Minor', notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'], type: 'natural-minor' },
  { name: 'A# Minor', notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'], type: 'natural-minor' },

  // Natural Minor Scales (Flat Keys)
  { name: 'D Minor', notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'], type: 'natural-minor' },
  { name: 'G Minor', notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'], type: 'natural-minor' },
  { name: 'C Minor', notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'], type: 'natural-minor' },
  { name: 'F Minor', notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'], type: 'natural-minor' },
  { name: 'Bb Minor', notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'], type: 'natural-minor' },
  { name: 'Eb Minor', notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'], type: 'natural-minor' },
  { name: 'Ab Minor', notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'], type: 'natural-minor' },

  // Harmonic Minor Scales (Sharp Keys)
  { name: 'A Harmonic Minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G#'], type: 'harmonic-minor' },
  { name: 'E Harmonic Minor', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D#'], type: 'harmonic-minor' },
  { name: 'B Harmonic Minor', notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A#'], type: 'harmonic-minor' },
  { name: 'F# Harmonic Minor', notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E#'], type: 'harmonic-minor' },
  { name: 'C# Harmonic Minor', notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B#'], type: 'harmonic-minor' },
  { name: 'G# Harmonic Minor', notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F##'], type: 'harmonic-minor' },
  { name: 'D# Harmonic Minor', notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C##'], type: 'harmonic-minor' },
  { name: 'A# Harmonic Minor', notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G##'], type: 'harmonic-minor' },

  // Harmonic Minor Scales (Flat Keys)
  { name: 'D Harmonic Minor', notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C#'], type: 'harmonic-minor' },
  { name: 'G Harmonic Minor', notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F#'], type: 'harmonic-minor' },
  { name: 'C Harmonic Minor', notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'], type: 'harmonic-minor' },
  { name: 'F Harmonic Minor', notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'E'], type: 'harmonic-minor' },
  { name: 'Bb Harmonic Minor', notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'A'], type: 'harmonic-minor' },
  { name: 'Eb Harmonic Minor', notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'D'], type: 'harmonic-minor' },
  { name: 'Ab Harmonic Minor', notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'G'], type: 'harmonic-minor' },

  // Melodic Minor Scales (Sharp Keys) - Ascending and Descending
  { 
    name: 'A Melodic Minor', 
    notes: ['A', 'B', 'C', 'D', 'E', 'F#', 'G#'],
    notesDescending: ['A', 'G', 'F', 'E', 'D', 'C', 'B'],
    type: 'melodic-minor' 
  },
  { 
    name: 'E Melodic Minor', 
    notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D#'],
    notesDescending: ['E', 'D', 'C', 'B', 'A', 'G', 'F#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'B Melodic Minor', 
    notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A#'],
    notesDescending: ['B', 'A', 'G', 'F#', 'E', 'D', 'C#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'F# Melodic Minor', 
    notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E#'],
    notesDescending: ['F#', 'E', 'D', 'C#', 'B', 'A', 'G#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'C# Melodic Minor', 
    notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B#'],
    notesDescending: ['C#', 'B', 'A', 'G#', 'F#', 'E', 'D#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'G# Melodic Minor', 
    notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F##'],
    notesDescending: ['G#', 'F#', 'E', 'D#', 'C#', 'B', 'A#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'D# Melodic Minor', 
    notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C##'],
    notesDescending: ['D#', 'C#', 'B', 'A#', 'G#', 'F#', 'E#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'A# Melodic Minor', 
    notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G##'],
    notesDescending: ['A#', 'G#', 'F#', 'E#', 'D#', 'C#', 'B#'],
    type: 'melodic-minor' 
  },

  // Melodic Minor Scales (Flat Keys) - Ascending and Descending
  { 
    name: 'D Melodic Minor', 
    notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C#'],
    notesDescending: ['D', 'C', 'Bb', 'A', 'G', 'F', 'E'],
    type: 'melodic-minor' 
  },
  { 
    name: 'G Melodic Minor', 
    notes: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F#'],
    notesDescending: ['G', 'F', 'Eb', 'D', 'C', 'Bb', 'A'],
    type: 'melodic-minor' 
  },
  { 
    name: 'C Melodic Minor', 
    notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'B'],
    notesDescending: ['C', 'Bb', 'Ab', 'G', 'F', 'Eb', 'D'],
    type: 'melodic-minor' 
  },
  { 
    name: 'F Melodic Minor', 
    notes: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E'],
    notesDescending: ['F', 'Eb', 'Db', 'C', 'Bb', 'Ab', 'G'],
    type: 'melodic-minor' 
  },
  { 
    name: 'Bb Melodic Minor', 
    notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'A'],
    notesDescending: ['Bb', 'Ab', 'Gb', 'F', 'Eb', 'Db', 'C'],
    type: 'melodic-minor' 
  },
  { 
    name: 'Eb Melodic Minor', 
    notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'D'],
    notesDescending: ['Eb', 'Db', 'Cb', 'Bb', 'Ab', 'Gb', 'F'],
    type: 'melodic-minor' 
  },
  { 
    name: 'Ab Melodic Minor', 
    notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'G'],
    notesDescending: ['Ab', 'Gb', 'Fb', 'Eb', 'Db', 'Cb', 'Bb'],
    type: 'melodic-minor' 
  },
];

export const ENHARMONIC_EQUIVALENTS: { [key: string]: string } = {
  'Gb Major': 'F# Major',
  'F# Major': 'Gb Major',
  'Db Major': 'C# Major',
  'C# Major': 'Db Major',
  'B Major': 'Cb Major',
  'Cb Major': 'B Major',
  'Ab Minor': 'G# Minor',
  'G# Minor': 'Ab Minor',
  'Eb Minor': 'D# Minor',
  'D# Minor': 'Eb Minor',
  'Bb Minor': 'A# Minor',
  'A# Minor': 'Bb Minor',
  'Ab Harmonic Minor': 'G# Harmonic Minor',
  'G# Harmonic Minor': 'Ab Harmonic Minor',
  'Eb Harmonic Minor': 'D# Harmonic Minor',
  'D# Harmonic Minor': 'Eb Harmonic Minor',
  'Bb Harmonic Minor': 'A# Harmonic Minor',
  'A# Harmonic Minor': 'Bb Harmonic Minor',
  'Ab Melodic Minor': 'G# Melodic Minor',
  'G# Melodic Minor': 'Ab Melodic Minor',
  'Eb Melodic Minor': 'D# Melodic Minor',
  'D# Melodic Minor': 'Eb Melodic Minor',
  'Bb Melodic Minor': 'A# Melodic Minor',
  'A# Melodic Minor': 'Bb Melodic Minor',
};

export const SCALE_TYPE_LABELS: Record<string, string> = {
  'major': 'Major',
  'natural-minor': 'Natural Minor',
  'harmonic-minor': 'Harmonic Minor',
  'melodic-minor': 'Melodic Minor',
};

export const DEFAULT_SCALE_SETTINGS = {
  major: true,
  'natural-minor': true,
  'harmonic-minor': false,
  'melodic-minor': false,
};
