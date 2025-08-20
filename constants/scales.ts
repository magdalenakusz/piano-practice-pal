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
  { name: 'A Minor', notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], type: 'minor' },
  { name: 'E Minor', notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'], type: 'minor' },
  { name: 'B Minor', notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'], type: 'minor' },
  { name: 'F# Minor', notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'], type: 'minor' },
  { name: 'C# Minor', notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'], type: 'minor' },
  { name: 'G# Minor', notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'], type: 'minor' },
  { name: 'D# Minor', notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'], type: 'minor' },
  { name: 'A# Minor', notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'], type: 'minor' },

  // Natural Minor Scales (Flat Keys)
  { name: 'D Minor', notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'], type: 'minor' },
  { name: 'G Minor', notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'], type: 'minor' },
  { name: 'C Minor', notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'], type: 'minor' },
  { name: 'F Minor', notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'], type: 'minor' },
  { name: 'Bb Minor', notes: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'], type: 'minor' },
  { name: 'Eb Minor', notes: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'], type: 'minor' },
  { name: 'Ab Minor', notes: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'], type: 'minor' },
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
};
