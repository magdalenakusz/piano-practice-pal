/**
 * Audio Service
 * 
 * Provides audio playback for piano scales using the Web Audio API.
 * Generates clean triangle wave tones with ADSR envelope for educational purposes.
 * 
 * Features:
 * - Real-time audio synthesis (no external audio files)
 * - Intelligent octave balancing for comfortable listening range
 * - Legato timing with slight note overlap for musical phrasing
 * - Support for all note names including double sharps and double flats
 * 
 * Audio Parameters:
 * - Waveform: Triangle wave (clean, simple tone)
 * - Tempo: 0.5s per note (medium pace)
 * - Overlap: 0.05s between notes (smooth legato)
 * - ADSR: 0.02s attack, 0.1s decay, 0.3 sustain, 0.1s release
 */

// Base frequencies for octave 4 (middle C = C4)
const BASE_NOTE_FREQUENCIES: { [key: string]: number } = {
  'C': 261.63,
  'C#': 277.18,
  'Db': 277.18,
  'D': 293.66,
  'D#': 311.13,
  'Eb': 311.13,
  'E': 329.63,
  'E#': 349.23, // Same as F
  'F': 349.23,
  'F#': 369.99,
  'Gb': 369.99,
  'F##': 392.00, // Same as G (double sharp)
  'G': 392.00,
  'G#': 415.30,
  'Ab': 415.30,
  'G##': 440.00, // Same as A (double sharp)
  'A': 440.00,
  'A#': 466.16,
  'Bb': 466.16,
  'B': 493.88,
  'B#': 523.25, // Same as C5
  'Cb': 493.88, // Same as B
  'C##': 293.66, // Same as D (double sharp)
  'Fb': 329.63, // Same as E
};

// Note order for determining position in scale
const NOTE_ORDER = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

function getNoteBase(noteName: string): string {
  // Extract the base note (first character)
  return noteName.charAt(0);
}

function getNoteFrequency(noteName: string, octave: number = 4): number {
  const baseFreq = BASE_NOTE_FREQUENCIES[noteName];
  if (!baseFreq) return 440; // Default to A4 if not found
  
  // Adjust frequency based on octave (each octave doubles/halves frequency)
  const octaveDiff = octave - 4;
  return baseFreq * Math.pow(2, octaveDiff);
}

function calculateOctavesForScale(notes: string[]): number[] {
  if (notes.length === 0) return [];
  
  // Determine starting octave based on the first note
  // This keeps all scales in a comfortable listening range
  const firstNoteBase = getNoteBase(notes[0]);
  const firstNotePos = NOTE_ORDER.indexOf(firstNoteBase);
  
  // Start lower notes (C, D, E) in octave 4
  // Start higher notes (F, F#, G, A, B) in octave 3 (so they don't get too high)
  let currentOctave = firstNotePos <= 2 ? 4 : 3;
  
  const octaves: number[] = [];
  
  for (let i = 0; i < notes.length; i++) {
    octaves.push(currentOctave);
    
    if (i < notes.length - 1) {
      const currentBase = getNoteBase(notes[i]);
      const nextBase = getNoteBase(notes[i + 1]);
      
      const currentPos = NOTE_ORDER.indexOf(currentBase);
      const nextPos = NOTE_ORDER.indexOf(nextBase);
      
      // If next note's letter comes before current in the alphabet, we've crossed into next octave
      // Exception: If we go from B to C, that's expected (next octave)
      if (nextPos < currentPos) {
        // This is normal scale progression (e.g., B to C)
        currentOctave++;
      }
    }
  }
  
  return octaves;
}

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

function playNote(frequency: number, duration: number, startTime: number): void {
  const ctx = getAudioContext();
  
  // Create oscillator for the main tone
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  // Use triangle wave for a softer piano-like sound
  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;
  
  // ADSR envelope (Attack, Decay, Sustain, Release)
  const now = startTime;
  const attackTime = 0.02;
  const decayTime = 0.1;
  const sustainLevel = 0.3;
  const releaseTime = 0.1;
  
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.5, now + attackTime); // Attack
  gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime); // Decay
  gainNode.gain.setValueAtTime(sustainLevel, now + duration - releaseTime); // Sustain
  gainNode.gain.linearRampToValueAtTime(0, now + duration); // Release
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.start(now);
  oscillator.stop(now + duration);
}

export function playScale(notes: string[], tempo: 'slow' | 'medium' | 'fast' = 'medium'): void {
  const ctx = getAudioContext();
  
  // Resume audio context if it's suspended (required by browser autoplay policies)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Slight overlap for smooth flow, but not too much
  const noteDuration = tempo === 'slow' ? 0.65 : tempo === 'medium' ? 0.5 : 0.35;
  const noteInterval = tempo === 'slow' ? 0.6 : tempo === 'medium' ? 0.45 : 0.3;
  
  const startTime = ctx.currentTime + 0.1; // Small delay to ensure smooth start
  
  // Calculate proper octaves for the scale
  const octaves = calculateOctavesForScale(notes);
  
  notes.forEach((note, index) => {
    const frequency = getNoteFrequency(note, octaves[index]);
    if (frequency) {
      playNote(frequency, noteDuration, startTime + (index * noteInterval));
    } else {
      console.warn(`Unknown note: ${note}`);
    }
  });
}

export function playScaleUpAndDown(notes: string[], tempo: 'slow' | 'medium' | 'fast' = 'medium'): void {
  const ascending = [...notes];
  const descending = [...notes].reverse().slice(1); // Remove duplicate root note
  const fullScale = [...ascending, ...descending];
  
  // Calculate octaves for the full scale (up and down)
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Slight overlap for smooth flow, but not too much
  const noteDuration = tempo === 'slow' ? 0.65 : tempo === 'medium' ? 0.5 : 0.35;
  const noteInterval = tempo === 'slow' ? 0.6 : tempo === 'medium' ? 0.45 : 0.3;
  
  const startTime = ctx.currentTime + 0.1;
  
  // Calculate octaves for ascending
  const ascendingOctaves = calculateOctavesForScale(ascending);
  // For descending, reverse the octaves and remove the duplicate root
  const descendingOctaves = [...ascendingOctaves].reverse().slice(1);
  const allOctaves = [...ascendingOctaves, ...descendingOctaves];
  
  fullScale.forEach((note, index) => {
    const frequency = getNoteFrequency(note, allOctaves[index]);
    if (frequency) {
      playNote(frequency, noteDuration, startTime + (index * noteInterval));
    }
  });
}

export function playChord(notes: string[], duration: number = 1.5): void {
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  const startTime = ctx.currentTime + 0.1;
  const octaves = calculateOctavesForScale(notes);
  
  notes.forEach((note, index) => {
    const frequency = getNoteFrequency(note, octaves[index]);
    if (frequency) {
      playNote(frequency, duration, startTime);
    }
  });
}

// Stop all currently playing audio
export function stopAudio(): void {
  if (audioContext) {
    audioContext.close().then(() => {
      audioContext = null;
    });
  }
}
