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
  { name: 'A Natural Minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], type: 'natural-minor' },
  { name: 'E Natural Minor', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], type: 'natural-minor' },
  { name: 'B Natural Minor', notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], type: 'natural-minor' },
  { name: 'F# Natural Minor', notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], type: 'natural-minor' },
  { name: 'C# Natural Minor', notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], type: 'natural-minor' },
  { name: 'G# Natural Minor', notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'], type: 'natural-minor' },
  { name: 'D# Natural Minor', notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'], type: 'natural-minor' },
  { name: 'A# Natural Minor', notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'], type: 'natural-minor' },

  // Natural Minor Scales (Flat Keys)
  { name: 'D Natural Minor', notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'], type: 'natural-minor' },
  { name: 'G Natural Minor', notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'], type: 'natural-minor' },
  { name: 'C Natural Minor', notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'], type: 'natural-minor' },
  { name: 'F Natural Minor', notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'], type: 'natural-minor' },
  { name: 'Bb Natural Minor', notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'], type: 'natural-minor' },
  { name: 'Eb Natural Minor', notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'], type: 'natural-minor' },
  { name: 'Ab Natural Minor', notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'], type: 'natural-minor' },

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
    notesDescending: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    type: 'melodic-minor' 
  },
  { 
    name: 'E Melodic Minor', 
    notes: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D#'],
    notesDescending: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    type: 'melodic-minor' 
  },
  { 
    name: 'B Melodic Minor', 
    notes: ['B', 'C#', 'D', 'E', 'F#', 'G#', 'A#'],
    notesDescending: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
    type: 'melodic-minor' 
  },
  { 
    name: 'F# Melodic Minor', 
    notes: ['F#', 'G#', 'A', 'B', 'C#', 'D#', 'E#'],
    notesDescending: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
    type: 'melodic-minor' 
  },
  { 
    name: 'C# Melodic Minor', 
    notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B#'],
    notesDescending: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
    type: 'melodic-minor' 
  },
  { 
    name: 'G# Melodic Minor', 
    notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F##'],
    notesDescending: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'D# Melodic Minor', 
    notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C##'],
    notesDescending: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
    type: 'melodic-minor' 
  },
  { 
    name: 'A# Melodic Minor', 
    notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G##'],
    notesDescending: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'],
    type: 'melodic-minor' 
  },

  // Melodic Minor Scales (Flat Keys) - Ascending and Descending
  { 
    name: 'D Melodic Minor', 
    notes: ['D', 'E', 'F', 'G', 'A', 'B', 'C#'],
    notesDescending: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    type: 'melodic-minor' 
  },
  { 
    name: 'G Melodic Minor', 
    notes: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F#'],
    notesDescending: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
    type: 'melodic-minor' 
  },
  { 
    name: 'C Melodic Minor', 
    notes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'B'],
    notesDescending: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    type: 'melodic-minor' 
  },
  { 
    name: 'F Melodic Minor', 
    notes: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E'],
    notesDescending: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
    type: 'melodic-minor' 
  },
  { 
    name: 'Bb Melodic Minor', 
    notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'A'],
    notesDescending: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
    type: 'melodic-minor' 
  },
  { 
    name: 'Eb Melodic Minor', 
    notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'D'],
    notesDescending: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'],
    type: 'melodic-minor' 
  },
  { 
    name: 'Ab Melodic Minor', 
    notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'G'],
    notesDescending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
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
  'Ab Natural Minor': 'G# Natural Minor',
  'G# Natural Minor': 'Ab Natural Minor',
  'Eb Natural Minor': 'D# Natural Minor',
  'D# Natural Minor': 'Eb Natural Minor',
  'Bb Natural Minor': 'A# Natural Minor',
  'A# Natural Minor': 'Bb Natural Minor',
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
  'natural-minor': false,
  'harmonic-minor': true,
  'melodic-minor': true,
};
