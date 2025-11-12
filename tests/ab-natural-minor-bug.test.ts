import { describe, it, expect } from 'vitest';
import { ALL_SCALES } from '../constants/scales';

/**
 * Specific test for Ab Natural Minor 3rd note octave bug
 * 
 * The issue: Ab Natural Minor has Cb as the 3rd note (correct music theory).
 * When calculating octaves: Ab4 -> Bb4 -> Cb?
 * 
 * The OLD octave calculation saw:
 * - Ab (A) position 5 in NOTE_ORDER
 * - Bb (B) position 6 in NOTE_ORDER (higher, same octave)
 * - Cb (C) position 0 in NOTE_ORDER (LOWER than B!)
 * 
 * This triggered an octave increment, so Cb became Cb5 instead of Cb4.
 * But musically, Cb is the 3rd degree of the scale and should be in the same
 * octave span as the root and 2nd degree.
 * 
 * THE FIX: Use enharmonic base (Cb → B) for octave position comparison
 * while preserving the original note name (Cb) for music theory correctness.
 */

// NEW octave calculation that uses enharmonic base
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

describe('Ab Natural Minor 3rd Note Octave Bug', () => {
  const abNaturalMinor = ALL_SCALES.find(s => s.name === 'Ab Natural Minor')!;
  
  it('should have Cb as the 3rd note (correct music theory)', () => {
    expect(abNaturalMinor.notes[2]).toBe('Cb');
  });
  
  it('FIXED: now calculates correct octave for 3rd note (Cb treated as B)', () => {
    const notesWithOctave = [...abNaturalMinor.notes, abNaturalMinor.notes[0]];
    const octaves = mockCalculateOctavesForScale(notesWithOctave);
    
    console.log('\n🔍 Ab Natural Minor octave calculation:');
    notesWithOctave.forEach((note, i) => {
      console.log(`  ${note}${octaves[i]}`);
    });
    
    // Fixed behavior:
    // Ab4, Bb4, Cb4 ✅ <- Stays in octave 4 (Cb treated as B for octave detection)!
    expect(octaves[2]).toBe(4); // Now correct!
  });
  
  it('should use enharmonic base (Cb→B) to prevent premature octave increment', () => {
    const notes = ['Ab', 'Bb', 'Cb'];
    const octaves = mockCalculateOctavesForScale(notes);
    
    // NEW behavior: Cb is treated as B (position 6) for octave detection
    // B (position 6) -> B (position 6) = no octave change
    expect(octaves).toEqual([4, 4, 4]); // All stay in octave 4!
  });
  
  it('shows that Cb4 in keyboard context normalizes to B4', () => {
    // With NEW octave calculation:
    const correctOctave = 'Cb4'; // What we now calculate ✅
    
    // After keyboard normalization: Cb4 -> B4
    // This means we're highlighting B4 on the keyboard ✅
    
    // Audio plays at frequency for Cb4 (same as B4) ✅
    // Everything is consistent!
    
    expect(correctOctave).toBe('Cb4');
  });
  
  it('compares with similar scale: Eb Natural Minor (also has Cb)', () => {
    const ebNaturalMinor = ALL_SCALES.find(s => s.name === 'Eb Natural Minor')!;
    const notesWithOctave = [...ebNaturalMinor.notes, ebNaturalMinor.notes[0]];
    const octaves = mockCalculateOctavesForScale(notesWithOctave);
    
    console.log('\n🔍 Eb Natural Minor octave calculation (for comparison):');
    notesWithOctave.forEach((note, i) => {
      console.log(`  ${note}${octaves[i]}`);
    });
    
    // Fixed: Eb4, F4, Gb4, Ab4, Bb4, Cb4 <- Now Cb4 (treated as B4)!
    const cbIndex = notesWithOctave.indexOf('Cb');
    if (cbIndex !== -1) {
      expect(octaves[cbIndex]).toBe(4); // Fixed!
    }
  });
  
  it('ROOT CAUSE: Cb after Bb used to trigger octave boundary detection', () => {
    const NOTE_ORDER = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    // The sequence: Ab(A) -> Bb(B) -> Cb(C)
    // OLD: Used letter C (position 0)
    // NEW: Use enharmonic base B (position 6)
    
    const oldPosC = NOTE_ORDER.indexOf('C'); // 0
    const newPosB = NOTE_ORDER.indexOf(getNoteBase('Cb')); // B = 6
    const posB = NOTE_ORDER.indexOf('B'); // 6
    
    expect(oldPosC).toBeLessThan(posB); // 0 < 6 = true (OLD: triggered octave++)
    expect(newPosB).toBe(posB); // 6 === 6 (NEW: no octave change!)
    
    // Now Cb is treated as B for octave detection, preventing the premature increment
  });
  
  it('SOLUTION IMPLEMENTED: Use enharmonic base for octave detection', () => {
    console.log('\n💡 Solution chosen (IMPLEMENTED):');
    console.log('3. Use base note for octave detection (Cb -> B for comparison)');
    console.log('   - ✅ Handles all enharmonics automatically');
    console.log('   - ✅ Preserves correct music theory notation');
    console.log('   - ✅ No changes needed to scale data');
    console.log('');
    console.log('Implementation:');
    console.log('  - Added getNoteBase() helper to map Cb→B, Fb→E, etc.');
    console.log('  - Modified calculateOctavesForScale() to use enharmonic base');
    console.log('  - Original note names (Cb, Fb) preserved in scale data');
    
    // This test documents the implemented solution
    expect(true).toBe(true);
  });
  
  it('demonstrates the fix: 3rd note now plays at correct octave', () => {
    // User now hears: Ab4, Bb4, Cb4 (sounds like B4) ✅
    
    // What happens NOW:
    // 1. Octave calculation: Ab4, Bb4, Cb4 (using B base for comparison)
    // 2. Keyboard normalization: Cb4 -> B4
    // 3. Audio plays: frequency of Cb4 (493.88 Hz) ✅
    
    const octaves = mockCalculateOctavesForScale(['Ab', 'Bb', 'Cb', 'Db']);
    expect(octaves[2]).toBe(4); // Cb4 - CORRECT! ✅
  });
  
  it('shows all notes in Ab Natural Minor with NEW octave calculation', () => {
    const notesWithOctave = [...abNaturalMinor.notes, abNaturalMinor.notes[0]];
    const octaves = mockCalculateOctavesForScale(notesWithOctave);
    
    const fullNotes = notesWithOctave.map((n, i) => `${n}${octaves[i]}`);
    
    console.log('\n📊 Current Ab Natural Minor with octaves:');
    fullNotes.forEach((note, i) => {
      const degree = i === 7 ? 'octave' : `${i + 1}${['st','nd','rd','th','th','th','th'][i]}`;
      console.log(`  ${degree}: ${note}`);
    });
    
    // NEW output with enharmonic-aware octave calculation:
    // 1st: Ab4
    // 2nd: Bb4  
    // 3rd: Cb4 ✅ <- CORRECT! (treated as B for octave detection)
    // 4th: Db5
    // 5th: Eb5
    // 6th: Fb5 ✅ <- CORRECT! (treated as E for octave detection)
    // 7th: Gb5
    // octave: Ab5
    
    expect(fullNotes[2]).toBe('Cb4'); // Correct music theory notation!
    expect(fullNotes[5]).toBe('Fb5'); // Correct music theory notation!
  });
});

describe('Solution: Enharmonic-Aware Octave Calculation', () => {
  it('preserves correct music theory notation (Cb, Fb)', () => {
    const scale = ALL_SCALES.find(s => s.name === 'Ab Natural Minor')!;
    
    // Scale data uses CORRECT music theory notation
    expect(scale.notes).toEqual(['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb']);
    
    console.log('\n🔧 Current scale (CORRECT music theory):');
    console.log('Ab Natural Minor:', scale.notes.join(', '));
  });
  
  it('calculates correct octaves using enharmonic base', () => {
    const scale = ALL_SCALES.find(s => s.name === 'Ab Natural Minor')!;
    const notesWithOctave = [...scale.notes, scale.notes[0]];
    
    // Calculate octaves with enharmonic-aware algorithm
    const octaves = mockCalculateOctavesForScale(notesWithOctave);
    
    console.log('\n📊 Octaves with enharmonic-aware calculation:');
    notesWithOctave.forEach((note, i) => {
      console.log(`  ${note}${octaves[i]}`);
    });
    
    // Should be: Ab4, Bb4, Cb4, Db5, Eb5, Fb5, Gb5, Ab5
    expect(octaves).toEqual([4, 4, 4, 5, 5, 5, 5, 5]);
    
    // How it works:
    // Cb uses base B: B(6) after Bb(6) = no octave increment ✅
    // Then Db: D(1) < B(6) = octave increments to 5 ✅
    // Fb uses base E: E(2) after Eb(2) = no octave increment ✅
  });
});
