export const PIANO_KEYS = [
    // Octave 4
    { name: 'C4', type: 'white' as const }, { name: 'C#4', type: 'black' as const },
    { name: 'D4', type: 'white' as const }, { name: 'D#4', type: 'black' as const },
    { name: 'E4', type: 'white' as const },
    { name: 'F4', type: 'white' as const }, { name: 'F#4', type: 'black' as const },
    { name: 'G4', type: 'white' as const }, { name: 'G#4', type: 'black' as const },
    { name: 'A4', type: 'white' as const }, { name: 'A#4', type: 'black' as const },
    { name: 'B4', type: 'white' as const },
    // Octave 5
    { name: 'C5', type: 'white' as const }, { name: 'C#5', type: 'black' as const },
    { name: 'D5', type: 'white' as const }, { name: 'D#5', type: 'black' as const },
    { name: 'E5', type: 'white' as const },
    { name: 'F5', type: 'white' as const }, { name: 'F#5', type: 'black' as const },
    { name: 'G5', type: 'white' as const }, { name: 'G#5', type: 'black' as const },
    { name: 'A5', type: 'white' as const }, { name: 'A#5', type: 'black' as const },
    { name: 'B5', type: 'white' as const },
];

export const noteEquivalents: { [key: string]: string } = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
    'E#': 'F', 'B#': 'C', 'Cb': 'B', 'Fb': 'E'
};

export const blackKeyPositions: { [key: string]: number } = {
    'C#': 1.75, 'D#': 4.25, 'F#': 9.25, 'G#': 11.75, 'A#': 14.25,
};
