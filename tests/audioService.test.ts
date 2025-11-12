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
});
