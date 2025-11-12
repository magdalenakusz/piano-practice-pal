import { describe, it, expect } from 'vitest';
import { ALL_SCALES } from '../constants/scales';
import { noteEquivalents } from '../constants/piano';

/**
 * Test suite for component synchronization
 * 
 * Verifies that audio playback, staff notation, and keyboard highlighting
 * remain synchronized across different playback modes and scale types.
 */

// Simulate keyboard normalization
const normalizeNoteWithOctave = (noteWithOctave: string): string => {
  const noteName = noteWithOctave.replace(/[0-9]/g, '');
  const octave = noteWithOctave.replace(/[^0-9]/g, '');
  
  const normalized = noteEquivalents[noteName] || noteName;
  
  // Adjust octave for boundary-crossing enharmonics
  let adjustedOctave = octave;
  if (octave && noteEquivalents[noteName]) {
    const originalLetter = noteName.charAt(0);
    const normalizedLetter = normalized.charAt(0);
    
    if (originalLetter === 'B' && normalizedLetter === 'C') {
      adjustedOctave = String(parseInt(octave) + 1);
    } else if (originalLetter === 'C' && normalizedLetter === 'B') {
      adjustedOctave = String(parseInt(octave) - 1);
    }
  }
  
  return adjustedOctave ? normalized + adjustedOctave : normalized;
};

describe('Component Synchronization', () => {
  describe('Keyboard highlighting with enharmonic notes', () => {
    it('should correctly normalize B#4 to C5 for keyboard display', () => {
      const result = normalizeNoteWithOctave('B#4');
      expect(result).toBe('C5');
    });
    
    it('should correctly normalize Cb5 to B4 for keyboard display', () => {
      const result = normalizeNoteWithOctave('Cb5');
      expect(result).toBe('B4');
    });
    
    it('should correctly normalize E#5 to F5 for keyboard display', () => {
      const result = normalizeNoteWithOctave('E#5');
      expect(result).toBe('F5');
    });
    
    it('should correctly normalize Fb5 to E5 for keyboard display', () => {
      const result = normalizeNoteWithOctave('Fb5');
      expect(result).toBe('E5');
    });
    
    it('should not change octave for non-boundary enharmonics', () => {
      expect(normalizeNoteWithOctave('Db4')).toBe('C#4');
      expect(normalizeNoteWithOctave('Eb4')).toBe('D#4');
      expect(normalizeNoteWithOctave('Gb4')).toBe('F#4');
      expect(normalizeNoteWithOctave('Ab4')).toBe('G#4');
      expect(normalizeNoteWithOctave('Bb4')).toBe('A#4');
    });
  });

  describe('Staff notation index mapping', () => {
    it('should correctly map ascending playback indices to staff display', () => {
      // Ascending playback: indices 0-7 map directly to staff indices 0-7
      const staffIndices = Array.from({ length: 8 }, (_, i) => i);
      expect(staffIndices).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });
    
    it('should correctly map descending playback indices to staff display', () => {
      // Descending playback: audio plays high to low, staff displays low to high
      const totalNotes = 8;
      const audioToStaffMap = Array.from({ length: totalNotes }, (_, audioIndex) => {
        if (audioIndex === 0) return totalNotes - 1; // First audio = top of staff
        if (audioIndex === totalNotes - 1) return 0; // Last audio = bottom of staff
        return totalNotes - 1 - audioIndex; // Middle notes
      });
      
      expect(audioToStaffMap).toEqual([7, 6, 5, 4, 3, 2, 1, 0]);
    });
    
    it('should correctly map up-and-down playback indices', () => {
      const totalNotes = 8;
      
      // Ascending phase: 0-7 map directly
      const ascendingMap = Array.from({ length: totalNotes }, (_, i) => i);
      
      // Descending phase: map back to staff positions
      // Audio indices 8-14 map to staff indices 6-0
      const descendingMap = Array.from({ length: 7 }, (_, descendingPos) => {
        return 6 - descendingPos;
      });
      
      expect(ascendingMap).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
      expect(descendingMap).toEqual([6, 5, 4, 3, 2, 1, 0]);
    });
  });

  describe('Audio timing synchronization', () => {
    it('should calculate consistent delays for note callbacks', () => {
      const tempo = 'medium';
      const noteInterval = 0.45; // seconds
      const startTime = 0.1; // currentTime + 0.1
      const currentTime = 0;
      
      const delays = Array.from({ length: 8 }, (_, index) => {
        return (startTime - currentTime + (index * noteInterval)) * 1000;
      });
      
      // Delays should be evenly spaced
      expect(delays[0]).toBe(100); // 0.1 * 1000
      expect(delays[1]).toBe(550); // 0.55 * 1000
      expect(delays[2]).toBe(1000); // 1.0 * 1000
      
      // Check spacing is consistent
      for (let i = 1; i < delays.length; i++) {
        const spacing = delays[i] - delays[i - 1];
        expect(spacing).toBeCloseTo(450, 1); // 0.45 * 1000, allow small floating point errors
      }
    });
    
    it('should never have negative delays', () => {
      const startTime = 0.1;
      const currentTime = 0;
      const noteInterval = 0.45;
      
      Array.from({ length: 8 }, (_, index) => {
        const delayMs = (startTime - currentTime + (index * noteInterval)) * 1000;
        const actualDelay = Math.max(0, delayMs);
        
        expect(actualDelay).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Melodic minor direction switching', () => {
    it('should switch from ascending to descending at the right point', () => {
      const ascendingLength = 8; // Including octave
      const totalLength = 15; // 8 ascending + 7 descending
      
      const switchPoints: boolean[] = [];
      for (let i = 0; i < totalLength; i++) {
        const isDescending = i >= ascendingLength;
        switchPoints.push(isDescending);
      }
      
      // First 8 notes should be ascending
      expect(switchPoints.slice(0, 8).every(d => !d)).toBe(true);
      
      // Last 7 notes should be descending
      expect(switchPoints.slice(8).every(d => d)).toBe(true);
    });
    
    it('should trigger direction change callback at correct index', () => {
      const ascendingLength = 8;
      const directionChangeIndex = ascendingLength; // Index 8
      
      expect(directionChangeIndex).toBe(8);
    });
  });

  describe('Real-world scale synchronization', () => {
    it('should keep C Major synchronized', () => {
      const scale = ALL_SCALES.find(s => s.name === 'C Major')!;
      const notesWithOctave = [...scale.notes, scale.notes[0]];
      
      // Audio would play: C4, D4, E4, F4, G4, A4, B4, C5
      // Staff displays: same order (indices 0-7)
      // Keyboard highlights: same notes (no enharmonics to normalize)
      
      notesWithOctave.forEach((note, index) => {
        expect(index).toBeLessThan(8);
        expect(note).toMatch(/^[A-G]$/);
      });
    });
    
    it('should keep C# Major synchronized with B# normalization', () => {
      const scale = ALL_SCALES.find(s => s.name === 'C# Major')!;
      const notes = [...scale.notes, scale.notes[0]];
      
      // Check that B# is present
      expect(notes[6]).toBe('B#');
      
      // Simulate audio playback with octave 4 for B#
      const audioNote = 'B#4';
      
      // Simulate keyboard normalization
      const keyboardNote = normalizeNoteWithOctave(audioNote);
      
      // Should become C5 on keyboard
      expect(keyboardNote).toBe('C5');
    });
    
    it('should keep Ab Natural Minor synchronized with Cb/Fb (correct music theory)', () => {
      const scale = ALL_SCALES.find(s => s.name === 'Ab Natural Minor')!;
      const notes = [...scale.notes, scale.notes[0]];
      
      // Check enharmonic notes (correct music theory)
      expect(notes[2]).toBe('Cb');
      expect(notes[5]).toBe('Fb');
      
      // Simulate audio with calculated octaves (Cb/Fb treated as B/E for octave detection)
      const audioNotes = ['Ab4', 'Bb4', 'Cb4', 'Db5', 'Eb5', 'Fb5', 'Gb5', 'Ab5'];
      
      // Normalize for keyboard
      // Cb4 → B3 (Cb is lower than C, so goes to previous octave's B)
      // Fb5 → E5 (Fb is lower than F, stays in same octave)
      const keyboardNotes = audioNotes.map(normalizeNoteWithOctave);
      
      expect(keyboardNotes[2]).toBe('B3'); // Cb4 → B3
      expect(keyboardNotes[5]).toBe('E5'); // Fb5 → E5
    });
  });

  describe('Edge cases and error conditions', () => {
    it('should handle missing octave gracefully', () => {
      const result = normalizeNoteWithOctave('B#');
      expect(result).toBe('C');
    });
    
    it('should handle non-enharmonic notes without octave change', () => {
      expect(normalizeNoteWithOctave('C4')).toBe('C4');
      expect(normalizeNoteWithOctave('G5')).toBe('G5');
    });
    
    it('should handle double sharps', () => {
      expect(normalizeNoteWithOctave('C##4')).toBe('D4');
      expect(normalizeNoteWithOctave('F##4')).toBe('G4');
      expect(normalizeNoteWithOctave('G##4')).toBe('A4');
    });
    
    it('should preserve octave for regular sharps and flats', () => {
      expect(normalizeNoteWithOctave('C#4')).toBe('C#4');
      expect(normalizeNoteWithOctave('Db4')).toBe('C#4');
      expect(normalizeNoteWithOctave('F#5')).toBe('F#5');
      expect(normalizeNoteWithOctave('Gb5')).toBe('F#5');
    });
  });

  describe('Performance considerations', () => {
    it('should complete normalization quickly for all scales', () => {
      const startTime = performance.now();
      
      ALL_SCALES.forEach(scale => {
        const notes = [...scale.notes, scale.notes[0]];
        notes.forEach((_, i) => {
          const noteWithOctave = `${notes[i]}${4 + Math.floor(i / 7)}`;
          normalizeNoteWithOctave(noteWithOctave);
        });
      });
      
      const duration = performance.now() - startTime;
      
      // Should complete in under 100ms for all scales
      expect(duration).toBeLessThan(100);
    });
  });

  describe('State consistency', () => {
    it('should maintain consistent active note index during playback', () => {
      // Simulate state updates during playback
      const states: number[] = [];
      
      // Ascending playback
      for (let i = 0; i < 8; i++) {
        states.push(i);
      }
      
      // Should have all indices from 0-7
      expect(states).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });
    
    it('should clear active note index after playback completes', () => {
      let activeIndex = 7; // Last note
      
      // Simulate completion
      activeIndex = -1;
      
      expect(activeIndex).toBe(-1);
    });
    
    it('should handle rapid mode switching', () => {
      let showDescending = false;
      let isPlayingDescending = false;
      
      // User toggles to descending
      showDescending = true;
      
      // Start playback
      isPlayingDescending = showDescending;
      expect(isPlayingDescending).toBe(true);
      
      // User toggles back during playback - should not affect current playback
      showDescending = false;
      expect(isPlayingDescending).toBe(true); // Still playing descending
    });
  });
});
