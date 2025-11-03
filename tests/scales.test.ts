/**
 * Scale Interval Verification Tests
 * 
 * Verifies that all scales follow correct music theory interval patterns:
 * - Major: W-W-H-W-W-W-H (2-2-1-2-2-2-1)
 * - Natural Minor: W-H-W-W-H-W-W (2-1-2-2-1-2-2)
 * - Harmonic Minor: W-H-W-W-H-Aug2-H (2-1-2-2-1-3-1)
 * - Melodic Minor Ascending: W-H-W-W-W-W-H (2-1-2-2-2-2-1)
 * - Melodic Minor Descending: Same as Natural Minor
 */

import { describe, it, expect } from 'vitest';
import { ALL_SCALES } from '../constants/scales';

// Convert note name to semitone position (0-11)
function noteToSemitones(note: string): number {
  const noteMap: Record<string, number> = {
    'C': 0, 'B#': 0, 'Dbb': 0,
    'C#': 1, 'Db': 1, 'B##': 1,
    'D': 2, 'C##': 2, 'Ebb': 2,
    'D#': 3, 'Eb': 3, 'Fbb': 3,
    'E': 4, 'Fb': 4, 'D##': 4,
    'F': 5, 'E#': 5, 'Gbb': 5,
    'F#': 6, 'Gb': 6, 'E##': 6,
    'G': 7, 'F##': 7, 'Abb': 7,
    'G#': 8, 'Ab': 8,
    'A': 9, 'G##': 9, 'Bbb': 9,
    'A#': 10, 'Bb': 10, 'Cbb': 10,
    'B': 11, 'Cb': 11, 'A##': 11
  };
  return noteMap[note] ?? -1;
}

// Calculate intervals between consecutive notes
function calculateIntervals(notes: string[]): number[] {
  const intervals: number[] = [];
  for (let i = 0; i < notes.length - 1; i++) {
    const current = noteToSemitones(notes[i]);
    const next = noteToSemitones(notes[i + 1]);
    
    if (current === -1 || next === -1) {
      throw new Error(`Invalid note: ${notes[i]} or ${notes[i + 1]}`);
    }
    
    const interval = (next - current + 12) % 12;
    intervals.push(interval);
  }
  return intervals;
}

// Check that each letter name appears exactly once
function checkNoteSpelling(notes: string[]): { valid: boolean; errors: string[] } {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const usedLetters = notes.map(note => note.charAt(0));
  const errors: string[] = [];
  
  // Check if we have 7 different letters
  if (new Set(usedLetters).size !== 7) {
    errors.push(`Scale doesn't use all 7 letter names: ${usedLetters.join(', ')}`);
  }
  
  // Check for duplicates
  for (const letter of letters) {
    const count = usedLetters.filter(l => l === letter).length;
    if (count > 1) {
      errors.push(`Letter '${letter}' appears ${count} times (should be 1)`);
    } else if (count === 0) {
      errors.push(`Letter '${letter}' is missing`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

describe('Scale Intervals - All Scales', () => {
  const MAJOR_INTERVALS = [2, 2, 1, 2, 2, 2]; // First 6 intervals (W-W-H-W-W-W), 7th is added during playback
  const NATURAL_MINOR_INTERVALS = [2, 1, 2, 2, 1, 2]; // First 6 intervals (W-H-W-W-H-W), 7th is added during playback
  const HARMONIC_MINOR_INTERVALS = [2, 1, 2, 2, 1, 3]; // First 6 intervals (W-H-W-W-H-Aug2), 7th is added during playback
  const MELODIC_MINOR_ASC_INTERVALS = [2, 1, 2, 2, 2, 2]; // First 6 intervals (W-H-W-W-W-W), 7th is added during playback
  
  describe('Major Scales', () => {
    const majorScales = ALL_SCALES.filter(s => s.type === 'major');
    
    it('should have exactly 12 major scales', () => {
      expect(majorScales.length).toBe(12);
    });
    
    majorScales.forEach(scale => {
      describe(scale.name, () => {
        it('should have 7 notes', () => {
          expect(scale.notes).toHaveLength(7);
        });
        
        it('should follow major scale interval pattern (W-W-H-W-W-W)', () => {
          const intervals = calculateIntervals(scale.notes);
          expect(intervals).toEqual(MAJOR_INTERVALS);
        });
        
        it('should use each letter name exactly once', () => {
          const { valid, errors } = checkNoteSpelling(scale.notes);
          expect(errors).toEqual([]);
          expect(valid).toBe(true);
        });
        
        it('should have valid note names', () => {
          scale.notes.forEach(note => {
            const semitone = noteToSemitones(note);
            expect(semitone).toBeGreaterThanOrEqual(0);
            expect(semitone).toBeLessThanOrEqual(11);
          });
        });
      });
    });
  });
  
  describe('Natural Minor Scales', () => {
    const naturalMinorScales = ALL_SCALES.filter(s => s.type === 'natural-minor');
    
    it('should have exactly 12 natural minor scales', () => {
      expect(naturalMinorScales.length).toBe(12);
    });
    
    naturalMinorScales.forEach(scale => {
      describe(scale.name, () => {
        it('should have 7 notes', () => {
          expect(scale.notes).toHaveLength(7);
        });
        
        it('should follow natural minor interval pattern (W-H-W-W-H-W)', () => {
          const intervals = calculateIntervals(scale.notes);
          expect(intervals).toEqual(NATURAL_MINOR_INTERVALS);
        });
        
        it('should use each letter name exactly once', () => {
          const { valid, errors } = checkNoteSpelling(scale.notes);
          expect(errors).toEqual([]);
          expect(valid).toBe(true);
        });
        
        it('should have valid note names', () => {
          scale.notes.forEach(note => {
            const semitone = noteToSemitones(note);
            expect(semitone).toBeGreaterThanOrEqual(0);
            expect(semitone).toBeLessThanOrEqual(11);
          });
        });
      });
    });
  });
  
  describe('Harmonic Minor Scales', () => {
    const harmonicMinorScales = ALL_SCALES.filter(s => s.type === 'harmonic-minor');
    
    it('should have exactly 12 harmonic minor scales', () => {
      expect(harmonicMinorScales.length).toBe(12);
    });
    
    harmonicMinorScales.forEach(scale => {
      describe(scale.name, () => {
        it('should have 7 notes', () => {
          expect(scale.notes).toHaveLength(7);
        });
        
        it('should follow harmonic minor interval pattern (W-H-W-W-H-Aug2)', () => {
          const intervals = calculateIntervals(scale.notes);
          expect(intervals).toEqual(HARMONIC_MINOR_INTERVALS);
        });
        
        it('should use each letter name exactly once', () => {
          const { valid, errors } = checkNoteSpelling(scale.notes);
          expect(errors).toEqual([]);
          expect(valid).toBe(true);
        });
        
        it('should have valid note names', () => {
          scale.notes.forEach(note => {
            const semitone = noteToSemitones(note);
            expect(semitone).toBeGreaterThanOrEqual(0);
            expect(semitone).toBeLessThanOrEqual(11);
          });
        });
      });
    });
  });
  
  describe('Melodic Minor Scales', () => {
    const melodicMinorScales = ALL_SCALES.filter(s => s.type === 'melodic-minor');
    
    it('should have exactly 12 melodic minor scales', () => {
      expect(melodicMinorScales.length).toBe(12);
    });
    
    melodicMinorScales.forEach(scale => {
      describe(`${scale.name} - Ascending`, () => {
        it('should have 7 notes', () => {
          expect(scale.notes).toHaveLength(7);
        });
        
        it('should follow melodic minor ascending pattern (W-H-W-W-W-W)', () => {
          const intervals = calculateIntervals(scale.notes);
          expect(intervals).toEqual(MELODIC_MINOR_ASC_INTERVALS);
        });
        
        it('should use each letter name exactly once', () => {
          const { valid, errors } = checkNoteSpelling(scale.notes);
          expect(errors).toEqual([]);
          expect(valid).toBe(true);
        });
        
        it('should have valid note names', () => {
          scale.notes.forEach(note => {
            const semitone = noteToSemitones(note);
            expect(semitone).toBeGreaterThanOrEqual(0);
            expect(semitone).toBeLessThanOrEqual(11);
          });
        });
      });
      
      if (scale.notesDescending) {
        describe(`${scale.name} - Descending`, () => {
          it('should have 7 notes', () => {
            expect(scale.notesDescending).toHaveLength(7);
          });
          
          it('should follow natural minor pattern (same as natural minor)', () => {
            const intervals = calculateIntervals(scale.notesDescending);
            expect(intervals).toEqual(NATURAL_MINOR_INTERVALS);
          });
          
          it('should use each letter name exactly once', () => {
            const { valid, errors } = checkNoteSpelling(scale.notesDescending);
            expect(errors).toEqual([]);
            expect(valid).toBe(true);
          });
          
          it('should have valid note names', () => {
            scale.notesDescending.forEach(note => {
              const semitone = noteToSemitones(note);
              expect(semitone).toBeGreaterThanOrEqual(0);
              expect(semitone).toBeLessThanOrEqual(11);
            });
          });
        });
      }
    });
  });
});

describe('Scale Database Integrity', () => {
  it('should have exactly 48 unique scales', () => {
    expect(ALL_SCALES).toHaveLength(48);
  });
  
  it('should have unique scale names', () => {
    const names = ALL_SCALES.map(s => s.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
  
  it('should have correct distribution of scale types', () => {
    const counts = {
      major: ALL_SCALES.filter(s => s.type === 'major').length,
      'natural-minor': ALL_SCALES.filter(s => s.type === 'natural-minor').length,
      'harmonic-minor': ALL_SCALES.filter(s => s.type === 'harmonic-minor').length,
      'melodic-minor': ALL_SCALES.filter(s => s.type === 'melodic-minor').length,
    };
    
    expect(counts.major).toBe(12);
    expect(counts['natural-minor']).toBe(12);
    expect(counts['harmonic-minor']).toBe(12);
    expect(counts['melodic-minor']).toBe(12);
  });
  
  it('should have 12 scales with alternative names', () => {
    const scalesWithAltNames = ALL_SCALES.filter(s => s.altName);
    expect(scalesWithAltNames.length).toBe(12);
  });
});
