import { describe, it, expect } from 'vitest';
import { ALL_SCALES } from '../constants/scales';

// Note order for octave detection
const NOTE_ORDER = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

/**
 * Calculate octaves for a scale starting at octave 4
 * This is the same algorithm used in audioService.ts
 */
function calculateOctavesForScale(notes: string[]): number[] {
  if (notes.length === 0) return [];
  
  let currentOctave = 4;
  const octaves: number[] = [];
  let previousLetter = notes[0].charAt(0);
  
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const currentLetter = note.charAt(0);
    const currentPos = NOTE_ORDER.indexOf(currentLetter);
    const prevPos = NOTE_ORDER.indexOf(previousLetter);
    
    // Increment octave when we cross from B to C (or wrap around)
    if (i > 0 && currentPos < prevPos) {
      currentOctave++;
    }
    
    octaves.push(currentOctave);
    previousLetter = currentLetter;
  }
  
  return octaves;
}

/**
 * Get the note letter (without accidentals or octave)
 */
function getNoteLetter(note: string): string {
  return note.charAt(0);
}

/**
 * Check if all notes in a scale span exactly one octave
 * (starting octave to starting octave + 1)
 */
function scaleSpansOneOctave(notes: string[]): { valid: boolean; octaves: number[]; details: string } {
  const octaves = calculateOctavesForScale(notes);
  const startOctave = octaves[0];
  const maxOctave = Math.max(...octaves);
  const minOctave = Math.min(...octaves);
  
  // All notes should be within one octave span (e.g., 4 or 5, but not both 4 and 6)
  const octaveSpan = maxOctave - minOctave;
  
  if (octaveSpan > 1) {
    return {
      valid: false,
      octaves,
      details: `Octave span too large: ${octaveSpan + 1} octaves (from ${minOctave} to ${maxOctave})`
    };
  }
  
  return {
    valid: true,
    octaves,
    details: `Valid: spans from octave ${minOctave} to ${maxOctave}`
  };
}

describe('Audio Service - Octave Calculations', () => {
  describe('Basic octave progression', () => {
    it('should keep C Major in octave 4', () => {
      const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      const octaves = calculateOctavesForScale(notes);
      
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 4]);
    });

    it('should increment octave when crossing from B to C', () => {
      const notes = ['G', 'A', 'B', 'C', 'D', 'E', 'F#'];
      const octaves = calculateOctavesForScale(notes);
      
      expect(octaves).toEqual([4, 4, 4, 5, 5, 5, 5]);
      expect(octaves[2]).toBe(4); // B4
      expect(octaves[3]).toBe(5); // C5
    });

    it('should handle B Major crossing octave at C#', () => {
      const notes = ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'];
      const octaves = calculateOctavesForScale(notes);
      
      expect(octaves).toEqual([4, 5, 5, 5, 5, 5, 5]);
      expect(octaves[0]).toBe(4); // B4
      expect(octaves[1]).toBe(5); // C#5
    });
  });

  describe('Enharmonic equivalents', () => {
    it('should handle E# (F natural) correctly in F# Major', () => {
      const notes = ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'];
      const octaves = calculateOctavesForScale(notes);
      
      // Should cross octave at C#
      expect(octaves).toEqual([4, 4, 4, 4, 5, 5, 5]);
      expect(octaves[6]).toBe(5); // E# should be in octave 5, not 6
    });

    it('should handle B# (C natural) correctly in C# Major', () => {
      const notes = ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'];
      const octaves = calculateOctavesForScale(notes);
      
      // All notes should stay in octave 4
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 4]);
      expect(octaves[6]).toBe(4); // B# should be octave 4, not 5
    });

    it('should handle B# in C# Harmonic Minor correctly', () => {
      const notes = ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B#'];
      const octaves = calculateOctavesForScale(notes);
      
      // All notes should stay in octave 4
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 4]);
      expect(octaves[6]).toBe(4); // B# should be octave 4, not 5
    });

    it('should handle Cb (B natural) correctly - Eb Natural Minor', () => {
      const notes = ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'];
      const octaves = calculateOctavesForScale(notes);
      
      // Cb has letter 'C', so when coming from Bb (letter 'B'), it triggers octave crossing
      // This is musically correct: Bb4 → Cb5 (which sounds like B4)
      expect(octaves).toEqual([4, 4, 4, 4, 4, 5, 5]);
      expect(octaves[4]).toBe(4); // Bb4
      expect(octaves[5]).toBe(5); // Cb5 (sounds like B4)
      expect(octaves[6]).toBe(5); // Db5
    });

    it('should handle Fb (E natural) correctly - Ab Natural Minor', () => {
      const notes = ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'];
      const octaves = calculateOctavesForScale(notes);
      
      // Cb has letter 'C', triggers octave crossing from Bb (letter 'B')
      // Then continues in octave 5
      expect(octaves).toEqual([4, 4, 5, 5, 5, 5, 5]);
      expect(octaves[1]).toBe(4); // Bb4
      expect(octaves[2]).toBe(5); // Cb5 (sounds like B4)
      expect(octaves[5]).toBe(5); // Fb5 (sounds like E5)
    });
  });

  describe('All Major Scales', () => {
    const majorScales = ALL_SCALES.filter(scale => scale.type === 'major');

    majorScales.forEach(scale => {
      it(`${scale.name} should span exactly one octave`, () => {
        const result = scaleSpansOneOctave(scale.notes);
        
        if (!result.valid) {
          console.log(`${scale.name}: ${scale.notes.join(' ')}`);
          console.log(`Octaves: ${result.octaves.join(' ')}`);
          console.log(`With octaves: ${scale.notes.map((n, i) => `${n}${result.octaves[i]}`).join(' ')}`);
        }
        
        expect(result.valid).toBe(true);
      });

      it(`${scale.name} should have all 7 scale degrees`, () => {
        expect(scale.notes).toHaveLength(7);
      });

      it(`${scale.name} should have unique note letters`, () => {
        const letters = scale.notes.map(getNoteLetter);
        const uniqueLetters = new Set(letters);
        expect(uniqueLetters.size).toBe(7);
      });
    });
  });

  describe('All Natural Minor Scales', () => {
    const naturalMinorScales = ALL_SCALES.filter(scale => scale.type === 'natural-minor');

    naturalMinorScales.forEach(scale => {
      it(`${scale.name} should span exactly one octave`, () => {
        const result = scaleSpansOneOctave(scale.notes);
        
        if (!result.valid) {
          console.log(`${scale.name}: ${scale.notes.join(' ')}`);
          console.log(`Octaves: ${result.octaves.join(' ')}`);
          console.log(`With octaves: ${scale.notes.map((n, i) => `${n}${result.octaves[i]}`).join(' ')}`);
        }
        
        expect(result.valid).toBe(true);
      });

      it(`${scale.name} should have all 7 scale degrees`, () => {
        expect(scale.notes).toHaveLength(7);
      });
    });
  });

  describe('All Harmonic Minor Scales', () => {
    const harmonicMinorScales = ALL_SCALES.filter(scale => scale.type === 'harmonic-minor');

    harmonicMinorScales.forEach(scale => {
      it(`${scale.name} should span exactly one octave`, () => {
        const result = scaleSpansOneOctave(scale.notes);
        
        if (!result.valid) {
          console.log(`${scale.name}: ${scale.notes.join(' ')}`);
          console.log(`Octaves: ${result.octaves.join(' ')}`);
          console.log(`With octaves: ${scale.notes.map((n, i) => `${n}${result.octaves[i]}`).join(' ')}`);
        }
        
        expect(result.valid).toBe(true);
      });

      it(`${scale.name} should have all 7 scale degrees`, () => {
        expect(scale.notes).toHaveLength(7);
      });
    });
  });

  describe('All Melodic Minor Scales', () => {
    const melodicMinorScales = ALL_SCALES.filter(scale => scale.type === 'melodic-minor');

    melodicMinorScales.forEach(scale => {
      it(`${scale.name} ascending should span exactly one octave`, () => {
        const result = scaleSpansOneOctave(scale.notes);
        
        if (!result.valid) {
          console.log(`${scale.name} (ascending): ${scale.notes.join(' ')}`);
          console.log(`Octaves: ${result.octaves.join(' ')}`);
          console.log(`With octaves: ${scale.notes.map((n, i) => `${n}${result.octaves[i]}`).join(' ')}`);
        }
        
        expect(result.valid).toBe(true);
      });

      if (scale.notesDescending) {
        it(`${scale.name} descending should span exactly one octave`, () => {
          const result = scaleSpansOneOctave(scale.notesDescending);
          
          if (!result.valid) {
            console.log(`${scale.name} (descending): ${scale.notesDescending.join(' ')}`);
            console.log(`Octaves: ${result.octaves.join(' ')}`);
            console.log(`With octaves: ${scale.notesDescending.map((n, i) => `${n}${result.octaves[i]}`).join(' ')}`);
          }
          
          expect(result.valid).toBe(true);
        });
      }

      it(`${scale.name} should have all 7 scale degrees`, () => {
        expect(scale.notes).toHaveLength(7);
      });
    });
  });

  describe('Specific problematic scales', () => {
    it('C# Natural Minor should stay in one octave', () => {
      const notes = ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'];
      const octaves = calculateOctavesForScale(notes);
      const maxOctave = Math.max(...octaves);
      const minOctave = Math.min(...octaves);
      
      expect(maxOctave - minOctave).toBeLessThanOrEqual(1);
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 4]);
    });

    it('C# Harmonic Minor should stay in one octave', () => {
      const notes = ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B#'];
      const octaves = calculateOctavesForScale(notes);
      const maxOctave = Math.max(...octaves);
      const minOctave = Math.min(...octaves);
      
      expect(maxOctave - minOctave).toBeLessThanOrEqual(1);
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 4]);
    });

    it('F# Harmonic Minor should stay in one octave', () => {
      const notes = ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E#'];
      const octaves = calculateOctavesForScale(notes);
      const maxOctave = Math.max(...octaves);
      const minOctave = Math.min(...octaves);
      
      expect(maxOctave - minOctave).toBeLessThanOrEqual(1);
      // Should cross at C#
      expect(octaves).toEqual([4, 4, 4, 4, 5, 5, 5]);
    });

    it('G Major should cross octave at C', () => {
      const notes = ['G', 'A', 'B', 'C', 'D', 'E', 'F#'];
      const octaves = calculateOctavesForScale(notes);
      
      expect(octaves[0]).toBe(4); // G4
      expect(octaves[1]).toBe(4); // A4
      expect(octaves[2]).toBe(4); // B4
      expect(octaves[3]).toBe(5); // C5 - octave crossing
      expect(octaves[4]).toBe(5); // D5
      expect(octaves[5]).toBe(5); // E5
      expect(octaves[6]).toBe(5); // F#5
    });
  });

  describe('Octave crossing validation', () => {
    it('should only cross octave once per scale', () => {
      ALL_SCALES.forEach(scale => {
        const octaves = calculateOctavesForScale(scale.notes);
        const uniqueOctaves = new Set(octaves);
        
        // Should have at most 2 different octaves (e.g., 4 and 5)
        expect(uniqueOctaves.size).toBeLessThanOrEqual(2);
        
        if (uniqueOctaves.size === 2) {
          const octaveArray = Array.from(uniqueOctaves).sort();
          // Should be consecutive octaves
          expect(octaveArray[1] - octaveArray[0]).toBe(1);
        }
      });
    });

    it('should never have notes in octave 6 or higher when starting at octave 4', () => {
      ALL_SCALES.forEach(scale => {
        const octaves = calculateOctavesForScale(scale.notes);
        const maxOctave = Math.max(...octaves);
        
        expect(maxOctave).toBeLessThanOrEqual(5);
      });
    });

    it('should start all scales at octave 4', () => {
      ALL_SCALES.forEach(scale => {
        const octaves = calculateOctavesForScale(scale.notes);
        expect(octaves[0]).toBe(4);
      });
    });
  });

  describe('Summary statistics', () => {
    it('should report total scale count', () => {
      const total = ALL_SCALES.length;
      const majorCount = ALL_SCALES.filter(s => s.type === 'major').length;
      const naturalMinorCount = ALL_SCALES.filter(s => s.type === 'natural-minor').length;
      const harmonicMinorCount = ALL_SCALES.filter(s => s.type === 'harmonic-minor').length;
      const melodicMinorCount = ALL_SCALES.filter(s => s.type === 'melodic-minor').length;
      
      console.log(`\n📊 Scale Statistics:`);
      console.log(`Total scales: ${total}`);
      console.log(`Major: ${majorCount}`);
      console.log(`Natural Minor: ${naturalMinorCount}`);
      console.log(`Harmonic Minor: ${harmonicMinorCount}`);
      console.log(`Melodic Minor: ${melodicMinorCount}`);
      
      expect(total).toBeGreaterThan(0);
    });

    it('should report scales with octave crossings', () => {
      const crossingScales = ALL_SCALES.filter(scale => {
        const octaves = calculateOctavesForScale(scale.notes);
        return new Set(octaves).size > 1;
      });
      
      console.log(`\n🎵 Scales with octave crossings: ${crossingScales.length}`);
      crossingScales.forEach(scale => {
        const octaves = calculateOctavesForScale(scale.notes);
        const notesWithOctaves = scale.notes.map((n, i) => `${n}${octaves[i]}`);
        console.log(`  ${scale.name}: ${notesWithOctaves.join(' ')}`);
      });
      
      expect(crossingScales.length).toBeGreaterThan(0);
    });
  });

  describe('Melodic Minor Playback', () => {
    describe('Scale data structure', () => {
      it('should have notesDescending for all melodic minor scales', () => {
        const melodicMinorScales = ALL_SCALES.filter(s => s.type === 'melodic-minor');
        
        expect(melodicMinorScales.length).toBe(12);
        
        melodicMinorScales.forEach(scale => {
          expect(scale.notesDescending).toBeDefined();
          expect(Array.isArray(scale.notesDescending)).toBe(true);
          expect(scale.notesDescending!.length).toBe(7);
        });
      });

      it('should have same root note in ascending and descending', () => {
        const melodicMinorScales = ALL_SCALES.filter(s => s.type === 'melodic-minor');
        
        melodicMinorScales.forEach(scale => {
          expect(scale.notes[0]).toBe(scale.notesDescending![0]);
        });
      });

      it('should have different 6th and 7th degrees in ascending vs descending', () => {
        const melodicMinorScales = ALL_SCALES.filter(s => s.type === 'melodic-minor');
        
        melodicMinorScales.forEach(scale => {
          const asc6th = scale.notes[5]; // Index 5 = 6th degree
          const asc7th = scale.notes[6]; // Index 6 = 7th degree
          const desc6th = scale.notesDescending![5];
          const desc7th = scale.notesDescending![6];
          
          // 6th and 7th should be different (raised in ascending, natural in descending)
          expect(asc6th).not.toBe(desc6th);
          expect(asc7th).not.toBe(desc7th);
        });
      });
    });

    describe('Up and down playback structure', () => {
      it('should create correct ascending portion with octave', () => {
        const bMelodicMinor = ALL_SCALES.find(s => s.name === 'B Melodic Minor')!;
        const ascending = [...bMelodicMinor.notes, bMelodicMinor.notes[0]];
        
        expect(ascending).toEqual(['B', 'C#', 'D', 'E', 'F#', 'G#', 'A#', 'B']);
        expect(ascending[6]).toBe('A#'); // Raised 7th in ascending
      });

      it('should create correct descending portion from notesDescending', () => {
        const bMelodicMinor = ALL_SCALES.find(s => s.name === 'B Melodic Minor')!;
        const descending = [...bMelodicMinor.notesDescending!, bMelodicMinor.notesDescending![0]]
          .reverse()
          .slice(1);
        
        expect(descending).toEqual(['A', 'G', 'F#', 'E', 'D', 'C#', 'B']);
        expect(descending[0]).toBe('A'); // Natural 7th in descending
        expect(descending[1]).toBe('G'); // Natural 6th in descending
      });

      it('should create full scale with ascending then descending', () => {
        const bMelodicMinor = ALL_SCALES.find(s => s.name === 'B Melodic Minor')!;
        const ascending = [...bMelodicMinor.notes, bMelodicMinor.notes[0]];
        const descending = [...bMelodicMinor.notesDescending!, bMelodicMinor.notesDescending![0]]
          .reverse()
          .slice(1);
        const fullScale = [...ascending, ...descending];
        
        expect(fullScale).toEqual([
          'B', 'C#', 'D', 'E', 'F#', 'G#', 'A#', 'B', // Ascending with sharps
          'A', 'G', 'F#', 'E', 'D', 'C#', 'B'          // Descending with naturals
        ]);
      });

      it('should test all 12 melodic minor scales for correct structure', () => {
        const melodicMinorScales = ALL_SCALES.filter(s => s.type === 'melodic-minor');
        
        melodicMinorScales.forEach(scale => {
          const ascending = [...scale.notes, scale.notes[0]];
          const descending = [...scale.notesDescending!, scale.notesDescending![0]]
            .reverse()
            .slice(1);
          const fullScale = [...ascending, ...descending];
          
          // Should have 8 ascending + 7 descending = 15 total notes
          expect(fullScale.length).toBe(15);
          
          // First note should be root (ascending start)
          expect(fullScale[0]).toBe(scale.notes[0]);
          
          // Middle note should be root at octave (top of ascending)
          expect(fullScale[7]).toBe(scale.notes[0]);
          
          // Last note should be root (end of descending)
          expect(fullScale[14]).toBe(scale.notes[0]);
          
          // 6th degree should be different in ascending vs descending
          const asc6th = fullScale[5]; // 6th note in ascending
          const desc6th = fullScale[9]; // 6th note in descending (from top)
          expect(asc6th).not.toBe(desc6th);
        });
      });
    });

    describe('Single descending playback', () => {
      it('should reverse notesDescending for descending playback', () => {
        const bMelodicMinor = ALL_SCALES.find(s => s.name === 'B Melodic Minor')!;
        const playbackNotes = [...bMelodicMinor.notesDescending!].reverse();
        
        expect(playbackNotes).toEqual(['A', 'G', 'F#', 'E', 'D', 'C#', 'B']);
        expect(playbackNotes[0]).toBe('A'); // Starts from top (7th degree)
        expect(playbackNotes[playbackNotes.length - 1]).toBe('B'); // Ends at root
      });

      it('should use natural 6th and 7th in descending playback', () => {
        const aMelodicMinor = ALL_SCALES.find(s => s.name === 'A Melodic Minor')!;
        const playbackNotes = [...aMelodicMinor.notesDescending!].reverse();
        
        expect(playbackNotes[0]).toBe('G'); // Natural 7th (not G#)
        expect(playbackNotes[1]).toBe('F'); // Natural 6th (not F#)
      });

      it('should test all 12 melodic minor scales for descending playback', () => {
        const melodicMinorScales = ALL_SCALES.filter(s => s.type === 'melodic-minor');
        
        melodicMinorScales.forEach(scale => {
          const playbackNotes = [...scale.notesDescending!].reverse();
          
          // Should have 7 notes
          expect(playbackNotes.length).toBe(7);
          
          // Should start with the 7th degree (top note)
          expect(playbackNotes[0]).toBe(scale.notesDescending![6]);
          
          // Should end with root
          expect(playbackNotes[6]).toBe(scale.notes[0]);
          
          // 6th and 7th degrees should be natural (from notesDescending)
          const desc7th = playbackNotes[0];
          const desc6th = playbackNotes[1];
          const asc7th = scale.notes[6];
          const asc6th = scale.notes[5];
          
          // These should be different (natural vs raised)
          expect(desc7th).not.toBe(asc7th);
          expect(desc6th).not.toBe(asc6th);
        });
      });
    });

    describe('Specific melodic minor examples', () => {
      it('A Melodic Minor: ascending has F# and G#', () => {
        const aMelodicMinor = ALL_SCALES.find(s => s.name === 'A Melodic Minor')!;
        
        expect(aMelodicMinor.notes).toEqual(['A', 'B', 'C', 'D', 'E', 'F#', 'G#']);
        expect(aMelodicMinor.notes[5]).toBe('F#'); // Raised 6th
        expect(aMelodicMinor.notes[6]).toBe('G#'); // Raised 7th
      });

      it('A Melodic Minor: descending has F and G', () => {
        const aMelodicMinor = ALL_SCALES.find(s => s.name === 'A Melodic Minor')!;
        
        expect(aMelodicMinor.notesDescending).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
        expect(aMelodicMinor.notesDescending![5]).toBe('F'); // Natural 6th
        expect(aMelodicMinor.notesDescending![6]).toBe('G'); // Natural 7th
      });

      it('B Melodic Minor: ascending has G# and A#', () => {
        const bMelodicMinor = ALL_SCALES.find(s => s.name === 'B Melodic Minor')!;
        
        expect(bMelodicMinor.notes).toEqual(['B', 'C#', 'D', 'E', 'F#', 'G#', 'A#']);
        expect(bMelodicMinor.notes[5]).toBe('G#'); // Raised 6th
        expect(bMelodicMinor.notes[6]).toBe('A#'); // Raised 7th
      });

      it('B Melodic Minor: descending has G and A', () => {
        const bMelodicMinor = ALL_SCALES.find(s => s.name === 'B Melodic Minor')!;
        
        expect(bMelodicMinor.notesDescending).toEqual(['B', 'C#', 'D', 'E', 'F#', 'G', 'A']);
        expect(bMelodicMinor.notesDescending![5]).toBe('G'); // Natural 6th
        expect(bMelodicMinor.notesDescending![6]).toBe('A'); // Natural 7th
      });

      it('D Melodic Minor: ascending has B and C#', () => {
        const dMelodicMinor = ALL_SCALES.find(s => s.name === 'D Melodic Minor')!;
        
        expect(dMelodicMinor.notes).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C#']);
        expect(dMelodicMinor.notes[5]).toBe('B'); // Raised 6th
        expect(dMelodicMinor.notes[6]).toBe('C#'); // Raised 7th
      });

      it('D Melodic Minor: descending has Bb and C', () => {
        const dMelodicMinor = ALL_SCALES.find(s => s.name === 'D Melodic Minor')!;
        
        expect(dMelodicMinor.notesDescending).toEqual(['D', 'E', 'F', 'G', 'A', 'Bb', 'C']);
        expect(dMelodicMinor.notesDescending![5]).toBe('Bb'); // Natural 6th
        expect(dMelodicMinor.notesDescending![6]).toBe('C'); // Natural 7th
      });
    });
  });
});
