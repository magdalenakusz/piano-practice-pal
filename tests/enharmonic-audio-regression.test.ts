import { describe, it, expect } from 'vitest';
import { getNoteFrequency, calculateOctavesForScale } from '../services/audioService';
import { ALL_SCALES } from '../constants/scales';

// Helper to find a scale by name
function findScale(name: string) {
  return ALL_SCALES.find(s => s.name === name);
}

describe('Enharmonic Audio Regression', () => {
  it('Cb and B share identical frequency in same octave (no octave bump)', () => {
    const b4 = getNoteFrequency('B', 4);
    const cb4 = getNoteFrequency('Cb', 4);
    expect(cb4).toBeCloseTo(b4, 6);

    const b5 = getNoteFrequency('B', 5);
    expect(cb4).not.toBeCloseTo(b5, 6); // Ensure we did not shift Cb up an octave
  });

  it('Ab Natural Minor octave progression has no artificial bump at Cb', () => {
    const scale = findScale('Ab Natural Minor');
    expect(scale).toBeTruthy();
    const notes = [...(scale!.notes), scale!.notes[0]]; // include octave note
    const octaves = calculateOctavesForScale(notes);

    // Expected: Ab4 Bb4 Cb4 Db5 Eb5 Fb5 Gb5 Ab5
    expect(octaves.length).toBe(notes.length);
    const expected = [4, 4, 4, 5, 5, 5, 5, 5];
    expect(octaves).toEqual(expected);
  });

  it('Eb Harmonic Minor handles Cb without bump before D', () => {
    const scale = findScale('Eb Harmonic Minor');
    expect(scale).toBeTruthy();
    const notes = [...(scale!.notes), scale!.notes[0]];
    const octaves = calculateOctavesForScale(notes);
    // Eb4 F4 Gb4 Ab4 Bb4 Cb4 D5 Eb5
    const expected = [4, 4, 4, 4, 4, 4, 5, 5];
    expect(octaves).toEqual(expected);
  });
});
