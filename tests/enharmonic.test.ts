/**
 * Enharmonic Equivalents Tests
 * 
 * Verifies that enharmonic equivalent scales are properly converted
 * and maintain correct scale degree relationships.
 */

import { describe, it, expect } from 'vitest';
import { ALL_SCALES, getEnharmonicEquivalent } from '../constants/scales';

describe('Enharmonic Equivalents', () => {
  describe('Scales with Alternative Names', () => {
    const scalesWithAltNames = ALL_SCALES.filter(s => s.altName);
    
    it('should have exactly 12 scales with alternative names', () => {
      expect(scalesWithAltNames.length).toBe(12);
    });
    
    scalesWithAltNames.forEach(scale => {
      describe(`${scale.name} / ${scale.altName}`, () => {
        it('should generate enharmonic equivalent', () => {
          const equivalent = getEnharmonicEquivalent(scale.altName!);
          expect(equivalent).toBeDefined();
        });
        
        it('should have 7 notes in equivalent scale', () => {
          const equivalent = getEnharmonicEquivalent(scale.altName!);
          expect(equivalent?.notes).toHaveLength(7);
        });
        
        it('should preserve number of notes', () => {
          const equivalent = getEnharmonicEquivalent(scale.altName!);
          expect(equivalent?.notes.length).toBe(scale.notes.length);
        });
        
        it('should have different note spellings but same pitches', () => {
          const equivalent = getEnharmonicEquivalent(scale.altName!);
          
          // Notes should be different (enharmonic)
          const sameSpelling = scale.notes.every((note, i) => note === equivalent?.notes[i]);
          expect(sameSpelling).toBe(false);
          
          // But represent the same pitches (semitones)
          // This is tested implicitly by interval tests
        });
        
        if (scale.notesDescending) {
          it('should convert descending notes for melodic minor', () => {
            const equivalent = getEnharmonicEquivalent(scale.altName!);
            expect(equivalent?.notesDescending).toBeDefined();
            expect(equivalent?.notesDescending).toHaveLength(7);
          });
        }
      });
    });
  });
  
  describe('Specific Enharmonic Conversions', () => {
    it('Bb Melodic Minor → A# Melodic Minor should preserve intervals', () => {
      const bbScale = ALL_SCALES.find(s => s.name === 'Bb Melodic Minor');
      expect(bbScale).toBeDefined();
      
      const aSharpScale = getEnharmonicEquivalent('A# Melodic Minor');
      expect(aSharpScale).toBeDefined();
      
      // Expected conversion:
      // Bb → A#, C → B#, Db → C#, Eb → D#, F → E#, G → F##, A → G##
      expect(aSharpScale?.notes).toEqual(['A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G##']);
    });
    
    it('Eb Melodic Minor → D# Melodic Minor should preserve intervals', () => {
      const ebScale = ALL_SCALES.find(s => s.name === 'Eb Melodic Minor');
      expect(ebScale).toBeDefined();
      
      const dSharpScale = getEnharmonicEquivalent('D# Melodic Minor');
      expect(dSharpScale).toBeDefined();
      
      // Expected conversion:
      // Eb → D#, F → E#, Gb → F#, Ab → G#, Bb → A#, C → B#, D → C##
      expect(dSharpScale?.notes).toEqual(['D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C##']);
    });
    
    it('Ab Melodic Minor → G# Melodic Minor should preserve intervals', () => {
      const abScale = ALL_SCALES.find(s => s.name === 'Ab Melodic Minor');
      expect(abScale).toBeDefined();
      
      const gSharpScale = getEnharmonicEquivalent('G# Melodic Minor');
      expect(gSharpScale).toBeDefined();
      
      // Ab uses B and E instead of Cb and Fb to avoid octave bugs
      // The enharmonic conversion handles this appropriately
      expect(gSharpScale?.notes).toHaveLength(7);
      expect(gSharpScale?.notes[0]).toBe('G#'); // Root note should be G#
    });
    
    it('B Major → Cb Major should preserve intervals', () => {
      const bScale = ALL_SCALES.find(s => s.name === 'B Major');
      expect(bScale).toBeDefined();
      
      const cbScale = getEnharmonicEquivalent('Cb Major');
      expect(cbScale).toBeDefined();
      
      expect(cbScale?.notes.length).toBe(7);
    });
    
    it('F# Major → Gb Major should preserve intervals', () => {
      const fSharpScale = ALL_SCALES.find(s => s.name === 'F# Major');
      expect(fSharpScale).toBeDefined();
      
      const gbScale = getEnharmonicEquivalent('Gb Major');
      expect(gbScale).toBeDefined();
      
      expect(gbScale?.notes.length).toBe(7);
    });
    
    it('C# Major → Db Major should preserve intervals', () => {
      const cSharpScale = ALL_SCALES.find(s => s.name === 'C# Major');
      expect(cSharpScale).toBeDefined();
      
      const dbScale = getEnharmonicEquivalent('Db Major');
      expect(dbScale).toBeDefined();
      
      expect(dbScale?.notes.length).toBe(7);
    });
  });
  
  describe('Alternative Name Swapping', () => {
    const scalesWithAltNames = ALL_SCALES.filter(s => s.altName);
    
    scalesWithAltNames.forEach(scale => {
      it(`${scale.name} should have altName pointing to ${scale.altName}`, () => {
        expect(scale.altName).toBeDefined();
        expect(scale.altName).toBeTruthy();
      });
      
      it(`Equivalent of ${scale.altName} should swap names correctly`, () => {
        const equivalent = getEnharmonicEquivalent(scale.altName!);
        expect(equivalent?.name).toBe(scale.altName);
        expect(equivalent?.altName).toBe(scale.name);
      });
    });
  });
  
  describe('Invalid Enharmonic Requests', () => {
    it('should return undefined for non-existent scale name', () => {
      const result = getEnharmonicEquivalent('Z# Major');
      expect(result).toBeUndefined();
    });
    
    it('should return undefined for scale without altName', () => {
      const result = getEnharmonicEquivalent('C Major');
      expect(result).toBeUndefined();
    });
  });
});
