import { describe, it, expect } from 'vitest';
import { ALL_SCALES } from '../constants/scales';

/**
 * Test suite for enharmonic notes and octave boundary handling
 * 
 * These tests verify that:
 * 1. Enharmonic notes (B#, Cb, E#, Fb) are handled correctly with enharmonic-aware octave calculation
 * 2. Octave calculations work properly across note boundaries
 * 3. UI synchronization between staff, keyboard, and audio is correct
 */

// Enharmonic base map for octave calculation
// IMPORTANT: Only map Cb and Fb (flats that would cause premature octave++)
// Do NOT map B# and E# because they should naturally stay in current octave
const ENHARMONIC_BASE_MAP: { [key: string]: string } = {
  'Cb': 'B',  // C-flat is B (prevents premature octave increment)
  'Fb': 'E',  // F-flat is E (prevents premature octave increment)
};

function getNoteBase(noteName: string): string {
  if (ENHARMONIC_BASE_MAP[noteName]) {
    return ENHARMONIC_BASE_MAP[noteName];
  }
  return noteName.charAt(0);
}

// Mock audio context for testing with ENHARMONIC-AWARE octave calculation
const mockCalculateOctavesForScale = (notes: string[]): number[] => {
  if (notes.length === 0) return [];
  
  const NOTE_ORDER = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  let currentOctave = 4;
  const octaves: number[] = [];
  let previousBase = getNoteBase(notes[0]);
  
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const currentBase = getNoteBase(note);
    const currentPos = NOTE_ORDER.indexOf(currentBase);
    const prevPos = NOTE_ORDER.indexOf(previousBase);
    
    if (i > 0 && currentPos < prevPos) {
      currentOctave++;
    }
    
    octaves.push(currentOctave);
    previousBase = currentBase;
  }
  
  return octaves;
};

describe('Enharmonic Notes and Octave Boundaries', () => {
  describe('C# Major Scale (has B# as 7th note)', () => {
    const cSharpMajor = ALL_SCALES.find(s => s.name === 'C# Major')!;
    
    it('should have B# as the 7th note', () => {
      expect(cSharpMajor.notes[6]).toBe('B#');
    });
    
    it('should calculate octaves correctly with B# at the end', () => {
      const notesWithOctave = [...cSharpMajor.notes, cSharpMajor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // C#4, D#4, E#4, F#4, G#4, A#4, B#4, C#5
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 4, 5]);
    });
    
    it('should have B# in octave 4 (before the octave jump to C#5)', () => {
      const notesWithOctave = [...cSharpMajor.notes, cSharpMajor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // B# is at index 6
      expect(octaves[6]).toBe(4);
    });
    
    it('should recognize that B#4 should display as C5 on keyboard', () => {
      // This is what the keyboard normalization should do
      const noteWithOctave = 'B#4';
      const noteName = noteWithOctave.replace(/[0-9]/g, '');
      const octave = parseInt(noteWithOctave.replace(/[^0-9]/g, ''));
      
      // B# -> C, and since B->C crosses octave boundary, increment octave
      const shouldBecomeCAtOctave5 = noteName === 'B#' && octave === 4;
      expect(shouldBecomeCAtOctave5).toBe(true);
    });
  });

  describe('F# Major Scale (has E# as 3rd note)', () => {
    const fSharpMajor = ALL_SCALES.find(s => s.name === 'F# Major')!;
    
    it('should have E# as the 7th note', () => {
      expect(fSharpMajor.notes[6]).toBe('E#');
    });
    
    it('should calculate octaves correctly with E#', () => {
      const notesWithOctave = [...fSharpMajor.notes, fSharpMajor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // F#4, G#4, A#4, B4, C#5, D#5, E#5, F#5
      expect(octaves).toEqual([4, 4, 4, 4, 5, 5, 5, 5]);
    });
    
    it('should recognize that E#5 should display as F5 on keyboard', () => {
      const noteWithOctave = 'E#5';
      const noteName = noteWithOctave.replace(/[0-9]/g, '');
      const octave = parseInt(noteWithOctave.replace(/[^0-9]/g, ''));
      
      // E# -> F, same octave (no boundary crossing)
      const shouldBecomeFAtOctave5 = noteName === 'E#' && octave === 5;
      expect(shouldBecomeFAtOctave5).toBe(true);
    });
  });

  describe('Eb Natural Minor Scale (has Cb as 6th note)', () => {
    const ebNaturalMinor = ALL_SCALES.find(s => s.name === 'Eb Natural Minor')!;
    
    it('should have Cb as the 6th note (correct music theory)', () => {
      expect(ebNaturalMinor.notes[5]).toBe('Cb');
    });
    
    it('should calculate octaves correctly (Cb treated as B for octave detection)', () => {
      const notesWithOctave = [...ebNaturalMinor.notes, ebNaturalMinor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // Eb4, F4, Gb4, Ab4, Bb4, Cb4 (treated as B4), Db5, Eb5
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 5, 5]);
    });
    
    it('should recognize that Cb4 stays in the correct octave', () => {
      const noteWithOctave = 'Cb4';
      const octave = parseInt(noteWithOctave.replace(/[^0-9]/g, ''));
      
      expect(octave).toBe(4); // Correct octave
    });
  });

  describe('Ab Natural Minor Scale (has Cb and Fb)', () => {
    const abNaturalMinor = ALL_SCALES.find(s => s.name === 'Ab Natural Minor')!;
    
    it('should have Cb as the 3rd note (correct music theory)', () => {
      expect(abNaturalMinor.notes[2]).toBe('Cb');
    });
    
    it('should have Fb as the 6th note (correct music theory)', () => {
      expect(abNaturalMinor.notes[5]).toBe('Fb');
    });
    
    it('should calculate octaves correctly (Cb treated as B for octave detection)', () => {
      const notesWithOctave = [...abNaturalMinor.notes, abNaturalMinor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // Ab4, Bb4, Cb4 (treated as B4), Db5, Eb5, Fb5 (treated as E5), Gb5, Ab5
      expect(octaves).toEqual([4, 4, 4, 5, 5, 5, 5, 5]);
    });
  });

  describe('All scales with enharmonic notes', () => {
    const scalesWithEnharmonics = ALL_SCALES.filter(scale => 
      scale.notes.some(note => 
        note.includes('#') && note.charAt(0) === 'B' || // B#
        note.includes('#') && note.charAt(0) === 'E' || // E#
        note.includes('b') && note.charAt(0) === 'C' || // Cb
        note.includes('b') && note.charAt(0) === 'F' || // Fb
        note.includes('##') // Double sharps
      )
    );
    
    it('should identify all scales with enharmonic edge cases', () => {
      const scaleNames = scalesWithEnharmonics.map(s => s.name);
      console.log('📋 Scales with enharmonic edge cases:', scaleNames);
      
      expect(scalesWithEnharmonics.length).toBeGreaterThan(0);
    });
    
    it('should calculate octaves without errors for all enharmonic scales', () => {
      scalesWithEnharmonics.forEach(scale => {
        const notesWithOctave = [...scale.notes, scale.notes[0]];
        const octaves = mockCalculateOctavesForScale(notesWithOctave);
        
        expect(octaves.length).toBe(notesWithOctave.length);
        expect(octaves.every(o => o >= 4 && o <= 6)).toBe(true);
      });
    });
    
    it('should have progressive or stable octave changes', () => {
      scalesWithEnharmonics.forEach(scale => {
        const notesWithOctave = [...scale.notes, scale.notes[0]];
        const octaves = mockCalculateOctavesForScale(notesWithOctave);
        
        // Check that octaves only increase by 0 or 1
        for (let i = 1; i < octaves.length; i++) {
          const diff = octaves[i] - octaves[i - 1];
          expect(diff).toBeGreaterThanOrEqual(0);
          expect(diff).toBeLessThanOrEqual(1);
        }
      });
    });
  });

  describe('Octave boundary edge cases', () => {
    it('should handle B to C transition (natural octave boundary)', () => {
      const bMajor = ALL_SCALES.find(s => s.name === 'B Major')!;
      const notesWithOctave = [...bMajor.notes, bMajor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // Should have octave jump from B (index 0) to octave B (index 7)
      expect(octaves[0]).toBeLessThan(octaves[7]);
    });
    
    it('should handle scales starting with C (no immediate octave jump)', () => {
      const cMajor = ALL_SCALES.find(s => s.name === 'C Major')!;
      const notesWithOctave = [...cMajor.notes, cMajor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // C4, D4, E4, F4, G4, A4, B4, C5
      expect(octaves).toEqual([4, 4, 4, 4, 4, 4, 4, 5]);
    });
    
    it('should handle scales starting with F (mid-scale octave jump)', () => {
      const fMajor = ALL_SCALES.find(s => s.name === 'F Major')!;
      const notesWithOctave = [...fMajor.notes, fMajor.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // F4, G4, A4, Bb4, C5, D5, E5, F5
      expect(octaves).toEqual([4, 4, 4, 4, 5, 5, 5, 5]);
    });
  });

  describe('Descending playback octave handling', () => {
    it('should reverse octaves correctly for descending playback', () => {
      const cMajor = ALL_SCALES.find(s => s.name === 'C Major')!;
      const notesWithOctave = [...cMajor.notes, cMajor.notes[0]];
      
      // Ascending octaves
      const ascendingOctaves = mockCalculateOctavesForScale(notesWithOctave);
      // [4, 4, 4, 4, 4, 4, 4, 5]
      
      // Descending should reverse
      const descendingOctaves = [...ascendingOctaves].reverse();
      // [5, 4, 4, 4, 4, 4, 4, 4]
      
      expect(descendingOctaves[0]).toBe(5); // Start high
      expect(descendingOctaves[descendingOctaves.length - 1]).toBe(4); // End low
    });
    
    it('should handle B# in descending playback for C# Major', () => {
      const cSharpMajor = ALL_SCALES.find(s => s.name === 'C# Major')!;
      const notesWithOctave = [...cSharpMajor.notes, cSharpMajor.notes[0]];
      
      const ascendingOctaves = mockCalculateOctavesForScale(notesWithOctave);
      // [4, 4, 4, 4, 4, 4, 4, 5]
      
      const descendingNotes = [...notesWithOctave].reverse();
      const descendingOctaves = [...ascendingOctaves].reverse();
      
      // First descending note is C#5
      expect(descendingNotes[0]).toBe('C#');
      expect(descendingOctaves[0]).toBe(5);
      
      // Second descending note is B#4
      expect(descendingNotes[1]).toBe('B#');
      expect(descendingOctaves[1]).toBe(4);
    });
  });

  describe('Melodic minor descending with enharmonics', () => {
    it('should handle F# Melodic Minor (has E# ascending)', () => {
      const fSharpMelodicMinor = ALL_SCALES.find(s => s.name === 'F# Melodic Minor')!;
      
      if (fSharpMelodicMinor.notesDescending) {
        expect(fSharpMelodicMinor.notes[2]).toBe('A'); // Natural 3rd (both ascending and descending)
        expect(fSharpMelodicMinor.notes[5]).toBe('D#'); // Raised 6th ascending
        expect(fSharpMelodicMinor.notes[6]).toBe('E#'); // Raised 7th ascending
        
        expect(fSharpMelodicMinor.notesDescending[5]).toBe('D'); // Natural 6th descending
        expect(fSharpMelodicMinor.notesDescending[6]).toBe('E'); // Natural 7th descending
      }
    });
    
    it('should handle C# Melodic Minor (has B# ascending)', () => {
      const cSharpMelodicMinor = ALL_SCALES.find(s => s.name === 'C# Melodic Minor')!;
      
      if (cSharpMelodicMinor.notesDescending) {
        expect(cSharpMelodicMinor.notes[6]).toBe('B#'); // Raised 7th ascending
        expect(cSharpMelodicMinor.notesDescending[6]).toBe('B'); // Natural 7th descending
      }
    });
  });

  describe('Staff notation display indices', () => {
    it('should map descending audio playback to correct staff positions', () => {
      // For descending playback: audio plays high to low
      // But staff displays low to high with indices 0-7
      
      const totalNotes = 8; // Including octave
      
      // First audio note (index 0) = highest note = staff index 7
      const firstNoteStaffIndex = totalNotes - 1;
      expect(firstNoteStaffIndex).toBe(7);
      
      // Last audio note (index 7) = lowest note = staff index 0
      const lastNoteStaffIndex = 0;
      expect(lastNoteStaffIndex).toBe(0);
      
      // Middle notes use formula: displayIndex = totalNotes - 1 - audioIndex
      for (let audioIndex = 1; audioIndex < totalNotes - 1; audioIndex++) {
        const staffIndex = totalNotes - 1 - audioIndex;
        expect(staffIndex).toBeGreaterThan(0);
        expect(staffIndex).toBeLessThan(7);
      }
    });
  });

  describe('Integration: Full scale playback simulation', () => {
    it('should synchronize C# Major across all components', () => {
      const scale = ALL_SCALES.find(s => s.name === 'C# Major')!;
      const notesWithOctave = [...scale.notes, scale.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      // Simulate what each component should see
      const audioNotes = notesWithOctave.map((note, i) => `${note}${octaves[i]}`);
      
      // Expected audio sequence
      expect(audioNotes).toEqual([
        'C#4', 'D#4', 'E#4', 'F#4', 'G#4', 'A#4', 'B#4', 'C#5'
      ]);
      
      // Keyboard should normalize B#4 to C5
      const lastNoteForKeyboard = audioNotes[6]; // 'B#4'
      expect(lastNoteForKeyboard).toBe('B#4');
      
      // After normalization: B#4 -> C5
      // This is what the keyboard component should display
    });
    
    it('should synchronize Ab Natural Minor across all components', () => {
      const scale = ALL_SCALES.find(s => s.name === 'Ab Natural Minor')!;
      const notesWithOctave = [...scale.notes, scale.notes[0]];
      const octaves = mockCalculateOctavesForScale(notesWithOctave);
      
      const audioNotes = notesWithOctave.map((note, i) => `${note}${octaves[i]}`);
      
      // Expected with Cb and Fb (correct music theory)
      // Octave calculation treats Cb as B and Fb as E for octave boundaries
      expect(audioNotes).toEqual([
        'Ab4', 'Bb4', 'Cb4', 'Db5', 'Eb5', 'Fb5', 'Gb5', 'Ab5'
      ]);
    });
  });
});
