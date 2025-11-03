import type { Scale } from '../types';

export const ALL_SCALES: Scale[] = [
  // Major Scales (Sharp Keys)
  { name: 'C Major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], type: 'major' },
  { name: 'G Major', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], type: 'major' },
  { name: 'D Major', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], type: 'major' },
  { name: 'A Major', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], type: 'major' },
  { name: 'E Major', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], type: 'major' },
  { name: 'B Major', notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], type: 'major', altName: 'Cb Major' },
  { name: 'F# Major', notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], type: 'major', altName: 'Gb Major' },
  { name: 'C# Major', notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'], type: 'major', altName: 'Db Major' },

  // Major Scales (Flat Keys)
  { name: 'F Major', notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], type: 'major' },
  { name: 'Bb Major', notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], type: 'major' },
  { name: 'Eb Major', notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'], type: 'major' },
  { name: 'Ab Major', notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], type: 'major' },
  
  // Natural Minor Scales (Sharp Keys)
  { name: 'A Natural Minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], type: 'natural-minor' },
  { name: 'E Natural Minor', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], type: 'natural-minor' },
  { name: 'B Natural Minor', notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], type: 'natural-minor' },
  { name: 'F# Natural Minor', notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], type: 'natural-minor' },
  { name: 'C# Natural Minor', notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], type: 'natural-minor' },

  // Natural Minor Scales (Flat Keys)
  { name: 'D Natural Minor', notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'], type: 'natural-minor' },
  { name: 'G Natural Minor', notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'], type: 'natural-minor' },
  { name: 'C Natural Minor', notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'], type: 'natural-minor' },
  { name: 'F Natural Minor', notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'], type: 'natural-minor' },
  { name: 'Bb Natural Minor', notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'], type: 'natural-minor', altName: 'A# Natural Minor' },
  { name: 'Eb Natural Minor', notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'], type: 'natural-minor', altName: 'D# Natural Minor' },
  { name: 'Ab Natural Minor', notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'], type: 'natural-minor', altName: 'G# Natural Minor' },

  // Harmonic Minor Scales (Sharp Keys)
  { name: 'A Harmonic Minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G#'], type: 'harmonic-minor' },
  { name: 'E Harmonic Minor', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D#'], type: 'harmonic-minor' },
  { name: 'B Harmonic Minor', notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A#'], type: 'harmonic-minor' },
  { name: 'F# Harmonic Minor', notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E#'], type: 'harmonic-minor' },
  { name: 'C# Harmonic Minor', notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B#'], type: 'harmonic-minor' },

  // Harmonic Minor Scales (Flat Keys)
  { name: 'D Harmonic Minor', notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C#'], type: 'harmonic-minor' },
  { name: 'G Harmonic Minor', notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F#'], type: 'harmonic-minor' },
  { name: 'C Harmonic Minor', notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B'], type: 'harmonic-minor' },
  { name: 'F Harmonic Minor', notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'E'], type: 'harmonic-minor' },
  { name: 'Bb Harmonic Minor', notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'A'], type: 'harmonic-minor', altName: 'A# Harmonic Minor' },
  { name: 'Eb Harmonic Minor', notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'D'], type: 'harmonic-minor', altName: 'D# Harmonic Minor' },
  { name: 'Ab Harmonic Minor', notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'G'], type: 'harmonic-minor', altName: 'G# Harmonic Minor' },

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
    type: 'melodic-minor',
    altName: 'A# Melodic Minor'
  },
  { 
    name: 'Eb Melodic Minor', 
    notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'D'],
    notesDescending: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'],
    type: 'melodic-minor',
    altName: 'D# Melodic Minor'
  },
  { 
    name: 'Ab Melodic Minor', 
    notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'G'],
    notesDescending: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
    type: 'melodic-minor',
    altName: 'G# Melodic Minor'
  },
];

// Map notes from flat notation to sharp notation
const flatToSharpMap: { [key: string]: string } = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
  'Cb': 'B',
  'Fb': 'E'
};

// Map notes from sharp notation to flat notation
const sharpToFlatMap: { [key: string]: string } = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
  'B#': 'C',
  'E#': 'F'
};

// Convert a single note maintaining scale degree relationships
function convertNote(note: string, rootNoteFlat: string, rootNoteSharp: string): string {
  // Define the scale degree patterns for each root
  // For Bb melodic minor: Bb C Db Eb F G A
  // For A# melodic minor: A# B# C# D# E# F## G##
  
  const flatScales: { [key: string]: string[] } = {
    'Bb': ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'A'],
    'Eb': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'D'],
    'Ab': ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'G']
  };
  
  const sharpScales: { [key: string]: string[] } = {
    'A#': ['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G##'],
    'D#': ['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C##'],
    'G#': ['G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F##']
  };
  
  // If converting from flat to sharp
  if (flatScales[rootNoteFlat] && sharpScales[rootNoteSharp]) {
    const index = flatScales[rootNoteFlat].indexOf(note);
    if (index !== -1) {
      return sharpScales[rootNoteSharp][index];
    }
  }
  
  // If converting from sharp to flat
  if (sharpScales[rootNoteSharp] && flatScales[rootNoteFlat]) {
    const index = sharpScales[rootNoteSharp].indexOf(note);
    if (index !== -1) {
      return flatScales[rootNoteFlat][index];
    }
  }
  
  // Fallback to simple mapping
  return flatToSharpMap[note] || sharpToFlatMap[note] || note;
}

// Convert a note array from one enharmonic spelling to another
function convertNotes(notes: string[], rootNoteFlat: string, rootNoteSharp: string): string[] {
  return notes.map(note => convertNote(note, rootNoteFlat, rootNoteSharp));
}

// Helper to get enharmonic equivalent scale
export function getEnharmonicEquivalent(scaleName: string): Scale | undefined {
  const scale = ALL_SCALES.find(s => s.altName === scaleName);
  if (!scale) return undefined;
  
  // Get the root notes for proper conversion
  const rootNoteFlat = scale.name.split(' ')[0];
  const rootNoteSharp = scaleName.split(' ')[0];
  
  // Convert the notes using the scale-aware conversion
  const convertedNotes = convertNotes(scale.notes, rootNoteFlat, rootNoteSharp);
  const convertedDescending = scale.notesDescending 
    ? convertNotes(scale.notesDescending, rootNoteFlat, rootNoteSharp)
    : undefined;
  
  // Create a virtual scale with the alternative name and converted notes
  return {
    ...scale,
    name: scaleName,
    altName: scale.name, // Swap the names
    notes: convertedNotes,
    notesDescending: convertedDescending
  };
}


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
