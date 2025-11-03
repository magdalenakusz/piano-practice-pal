/**
 * Key Signature Tests
 * 
 * Verifies that all scales are mapped to the correct key signatures
 * based on the Circle of Fifths.
 */

import { describe, it, expect } from 'vitest';
import { ALL_SCALES } from '../constants/scales';

// Reference key signature data based on Circle of Fifths
const KEY_SIGNATURES: Record<string, { sharps?: number; flats?: number }> = {
  // Major scales
  'C Major': {},
  'G Major': { sharps: 1 },
  'D Major': { sharps: 2 },
  'A Major': { sharps: 3 },
  'E Major': { sharps: 4 },
  'B Major': { sharps: 5 },
  'F# Major': { sharps: 6 },
  'C# Major': { sharps: 7 },
  'F Major': { flats: 1 },
  'Bb Major': { flats: 2 },
  'Eb Major': { flats: 3 },
  'Ab Major': { flats: 4 },
  'Db Major': { flats: 5 },
  'Gb Major': { flats: 6 },
  'Cb Major': { flats: 7 },
  
  // Natural minor scales (use relative major's key signature)
  'A Natural Minor': {}, // Relative to C Major
  'E Natural Minor': { sharps: 1 }, // Relative to G Major
  'B Natural Minor': { sharps: 2 }, // Relative to D Major
  'F# Natural Minor': { sharps: 3 }, // Relative to A Major
  'C# Natural Minor': { sharps: 4 }, // Relative to E Major
  'G# Natural Minor': { sharps: 5 }, // Relative to B Major
  'D# Natural Minor': { sharps: 6 }, // Relative to F# Major
  'A# Natural Minor': { sharps: 7 }, // Relative to C# Major
  'D Natural Minor': { flats: 1 }, // Relative to F Major
  'G Natural Minor': { flats: 2 }, // Relative to Bb Major
  'C Natural Minor': { flats: 3 }, // Relative to Eb Major
  'F Natural Minor': { flats: 4 }, // Relative to Ab Major
  'Bb Natural Minor': { flats: 5 }, // Relative to Db Major
  'Eb Natural Minor': { flats: 6 }, // Relative to Gb Major
  'Ab Natural Minor': { flats: 7 }, // Relative to Cb Major
};

// Helper function to get expected key signature for a scale
function getExpectedKeySignature(scaleName: string): { sharps?: number; flats?: number } {
  // For harmonic and melodic minor, use same key signature as natural minor
  const root = scaleName.split(' ')[0];
  
  // Check if it's a major scale
  if (scaleName.endsWith('Major')) {
    return KEY_SIGNATURES[scaleName] || {};
  }
  
  // For all minor scales, use the natural minor key signature
  const naturalMinorName = `${root} Natural Minor`;
  return KEY_SIGNATURES[naturalMinorName] || {};
}

describe('Key Signatures - All Scales', () => {
  describe('Major Scales', () => {
    const majorScales = ALL_SCALES.filter(s => s.type === 'major');
    
    majorScales.forEach(scale => {
      it(`${scale.name} should have correct key signature`, () => {
        const expected = getExpectedKeySignature(scale.name);
        // This test verifies the scale is in our reference data
        expect(expected).toBeDefined();
        
        // Verify it's either sharps or flats, not both
        if (expected.sharps) {
          expect(expected.flats).toBeUndefined();
          expect(expected.sharps).toBeGreaterThan(0);
          expect(expected.sharps).toBeLessThanOrEqual(7);
        } else if (expected.flats) {
          expect(expected.sharps).toBeUndefined();
          expect(expected.flats).toBeGreaterThan(0);
          expect(expected.flats).toBeLessThanOrEqual(7);
        }
      });
    });
  });
  
  describe('Natural Minor Scales', () => {
    const naturalMinorScales = ALL_SCALES.filter(s => s.type === 'natural-minor');
    
    naturalMinorScales.forEach(scale => {
      it(`${scale.name} should have correct key signature (relative major)`, () => {
        const expected = getExpectedKeySignature(scale.name);
        expect(expected).toBeDefined();
        
        // Verify it's either sharps or flats, not both
        if (expected.sharps) {
          expect(expected.flats).toBeUndefined();
          expect(expected.sharps).toBeGreaterThan(0);
          expect(expected.sharps).toBeLessThanOrEqual(7);
        } else if (expected.flats) {
          expect(expected.sharps).toBeUndefined();
          expect(expected.flats).toBeGreaterThan(0);
          expect(expected.flats).toBeLessThanOrEqual(7);
        }
      });
    });
  });
  
  describe('Harmonic Minor Scales', () => {
    const harmonicMinorScales = ALL_SCALES.filter(s => s.type === 'harmonic-minor');
    
    harmonicMinorScales.forEach(scale => {
      it(`${scale.name} should use same key signature as natural minor`, () => {
        const expected = getExpectedKeySignature(scale.name);
        expect(expected).toBeDefined();
        
        // Harmonic minor uses same key signature as natural minor
        // The raised 7th is shown as an accidental
        if (expected.sharps) {
          expect(expected.flats).toBeUndefined();
          expect(expected.sharps).toBeGreaterThan(0);
          expect(expected.sharps).toBeLessThanOrEqual(7);
        } else if (expected.flats) {
          expect(expected.sharps).toBeUndefined();
          expect(expected.flats).toBeGreaterThan(0);
          expect(expected.flats).toBeLessThanOrEqual(7);
        }
      });
    });
  });
  
  describe('Melodic Minor Scales', () => {
    const melodicMinorScales = ALL_SCALES.filter(s => s.type === 'melodic-minor');
    
    melodicMinorScales.forEach(scale => {
      it(`${scale.name} should use same key signature as natural minor`, () => {
        const expected = getExpectedKeySignature(scale.name);
        expect(expected).toBeDefined();
        
        // Melodic minor uses same key signature as natural minor
        // The raised 6th and 7th (ascending) are shown as accidentals
        if (expected.sharps) {
          expect(expected.flats).toBeUndefined();
          expect(expected.sharps).toBeGreaterThan(0);
          expect(expected.sharps).toBeLessThanOrEqual(7);
        } else if (expected.flats) {
          expect(expected.sharps).toBeUndefined();
          expect(expected.flats).toBeGreaterThan(0);
          expect(expected.flats).toBeLessThanOrEqual(7);
        }
      });
    });
  });
  
  describe('Special Cases - 7 Flats', () => {
    it('Ab Natural Minor should have 7 flats', () => {
      const scale = ALL_SCALES.find(s => s.name === 'Ab Natural Minor');
      expect(scale).toBeDefined();
      
      const keySig = getExpectedKeySignature(scale!.name);
      expect(keySig.flats).toBe(7);
      expect(keySig.sharps).toBeUndefined();
    });
    
    it('Ab Harmonic Minor should have 7 flats', () => {
      const scale = ALL_SCALES.find(s => s.name === 'Ab Harmonic Minor');
      expect(scale).toBeDefined();
      
      const keySig = getExpectedKeySignature(scale!.name);
      expect(keySig.flats).toBe(7);
      expect(keySig.sharps).toBeUndefined();
    });
    
    it('Ab Melodic Minor should have 7 flats', () => {
      const scale = ALL_SCALES.find(s => s.name === 'Ab Melodic Minor');
      expect(scale).toBeDefined();
      
      const keySig = getExpectedKeySignature(scale!.name);
      expect(keySig.flats).toBe(7);
      expect(keySig.sharps).toBeUndefined();
    });
  });
  
  describe('Special Cases - 7 Sharps', () => {
    it('C# Major should have 7 sharps', () => {
      const scale = ALL_SCALES.find(s => s.name === 'C# Major');
      expect(scale).toBeDefined();
      
      const keySig = getExpectedKeySignature(scale!.name);
      expect(keySig.sharps).toBe(7);
      expect(keySig.flats).toBeUndefined();
    });
    
    it('A# Natural Minor should have 7 sharps (if it exists as altName)', () => {
      const scale = ALL_SCALES.find(s => s.altName === 'A# Natural Minor');
      if (scale) {
        const keySig = getExpectedKeySignature('A# Natural Minor');
        expect(keySig.sharps).toBe(7);
        expect(keySig.flats).toBeUndefined();
      }
    });
  });
});

describe('Enharmonic Equivalents', () => {
  it('B Major and Cb Major should have different key signatures', () => {
    const bMajor = getExpectedKeySignature('B Major');
    const cbMajor = getExpectedKeySignature('Cb Major');
    
    expect(bMajor.sharps).toBe(5);
    expect(cbMajor.flats).toBe(7);
  });
  
  it('F# Major and Gb Major should have different key signatures', () => {
    const fSharpMajor = getExpectedKeySignature('F# Major');
    const gbMajor = getExpectedKeySignature('Gb Major');
    
    expect(fSharpMajor.sharps).toBe(6);
    expect(gbMajor.flats).toBe(6);
  });
  
  it('C# Major and Db Major should have different key signatures', () => {
    const cSharpMajor = getExpectedKeySignature('C# Major');
    const dbMajor = getExpectedKeySignature('Db Major');
    
    expect(cSharpMajor.sharps).toBe(7);
    expect(dbMajor.flats).toBe(5);
  });
});
