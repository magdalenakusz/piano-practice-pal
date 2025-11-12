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

// Map enharmonic notes to their base note for octave calculation
// IMPORTANT: Only map Cb and Fb (flats that would cause premature octave++)
// Do NOT map B# and E# because they should naturally stay in current octave
const ENHARMONIC_BASE_MAP: { [key: string]: string } = {
  'Cb': 'B',  // C-flat is B (prevents premature octave increment)
  'Fb': 'E',  // F-flat is E (prevents premature octave increment)
  'C##': 'D', // C-double-sharp is D
  'F##': 'G', // F-double-sharp is G
  'G##': 'A', // G-double-sharp is A
};

function getNoteBase(noteName: string): string {
  // Check if this is an enharmonic note that maps to a different base
  if (ENHARMONIC_BASE_MAP[noteName]) {
    return ENHARMONIC_BASE_MAP[noteName];
  }
  // Otherwise extract the base note (first character)
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
  
  // ALWAYS start at octave 4 to match the visible keyboard range (C4-B5)
  // This ensures all notes are visible and highlighted correctly
  let currentOctave = 4;
  
  const octaves: number[] = [];
  
  // Use the ENHARMONIC BASE for octave detection
  // This ensures Cb is treated as B and Fb as E when detecting octave boundaries
  // while preserving the original note names for music theory correctness
  let previousBase = getNoteBase(notes[0]);
  
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    
    // Get the enharmonic base for octave position comparison
    // Example: Cb → B, Fb → E, B# → C
    const currentBase = getNoteBase(note);
    const currentPos = NOTE_ORDER.indexOf(currentBase);
    const prevPos = NOTE_ORDER.indexOf(previousBase);
    
    // Increment octave when we cross from B to C (or wrap around)
    // Using enharmonic base ensures Cb (treated as B) won't trigger
    // premature octave increment
    if (i > 0 && currentPos < prevPos) {
      currentOctave++;
    }
    
    octaves.push(currentOctave);
    previousBase = currentBase;
  }
  
  return octaves;
}

let audioContext: AudioContext | null = null;
let isAudioInitialized = false;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Initialize and unlock audio context on iOS
 * Must be called from a user interaction event (tap, click)
 */
export function initializeAudio(): void {
  if (isAudioInitialized) return;
  
  const ctx = getAudioContext();
  
  // Resume audio context if suspended (required on iOS)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Play a silent sound to unlock audio on iOS
  // This is required for PWAs on iOS home screen
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  gainNode.gain.value = 0; // Silent
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.01);
  
  isAudioInitialized = true;
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

/**
 * Play a scale with optional note-by-note callback for animations
 * @param notes - Array of note names
 * @param tempo - Playback speed
 * @param onNotePlay - Optional callback fired when each note starts playing (noteIndex, note)
 */
export function playScale(
  notes: string[], 
  tempo: 'slow' | 'medium' | 'fast' = 'medium',
  onNotePlay?: (noteIndex: number, note: string) => void
): void {
  const ctx = getAudioContext();
  
  // Initialize audio if not already done (important for iOS PWA)
  if (!isAudioInitialized) {
    initializeAudio();
  }
  
  // Resume audio context if it's suspended (required by browser autoplay policies)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Add the octave (root note one octave higher) to complete the scale
  const notesWithOctave = [...notes, notes[0]];
  
  // Slight overlap for smooth flow, but not too much
  const noteDuration = tempo === 'slow' ? 0.65 : tempo === 'medium' ? 0.5 : 0.35;
  const noteInterval = tempo === 'slow' ? 0.6 : tempo === 'medium' ? 0.45 : 0.3;
  
  const startTime = ctx.currentTime + 0.1; // Small delay to ensure smooth start
  
  // Calculate proper octaves for the scale (including the octave note)
  const octaves = calculateOctavesForScale(notesWithOctave);
  
  notesWithOctave.forEach((note, index) => {
    const frequency = getNoteFrequency(note, octaves[index]);
    if (frequency) {
      playNote(frequency, noteDuration, startTime + (index * noteInterval));
      
      // Schedule animation callback with full note including octave
      if (onNotePlay) {
        const noteWithOctave = note + octaves[index];
        const delayMs = (startTime - ctx.currentTime + (index * noteInterval)) * 1000;
        // Pass the actual index - components can handle octave note specially if needed
        setTimeout(() => onNotePlay(index, noteWithOctave), Math.max(0, delayMs));
      }
    } else {
      console.warn(`Unknown note: ${note}`);
    }
  });
  
  // Schedule callback to clear animation after last note finishes
  if (onNotePlay) {
    const lastNoteTime = startTime + (notesWithOctave.length * noteInterval) + noteDuration;
    const delayMs = (lastNoteTime - ctx.currentTime) * 1000;
    setTimeout(() => onNotePlay(-1, ''), Math.max(0, delayMs));
  }
}

/**
 * Play a scale up and down with optional animation callback
 */
/**
 * Play a scale up and down (ascending then descending) with optional animation callback.
 * 
 * For melodic minor scales:
 * - Ascending uses raised 6th and 7th degrees (from `notes`)
 * - Descending uses natural 6th and 7th degrees (from `notesDescending`)
 * - UI can be notified when direction changes via `onDirectionChange`
 * 
 * @param notes - The ascending scale notes (7 notes, no octave)
 * @param tempo - Playback speed
 * @param onNotePlay - Callback when each note plays (receives index and note with octave)
 * @param notesDescending - Optional descending notes for melodic minor (7 notes, in ascending order)
 * @param onDirectionChange - Optional callback when switching from ascending to descending
 */
export function playScaleUpAndDown(
  notes: string[], 
  tempo: 'slow' | 'medium' | 'fast' = 'medium',
  onNotePlay?: (noteIndex: number, note: string) => void,
  notesDescending?: string[],
  onDirectionChange?: (isDescending: boolean) => void
): void {
  // Ascending: Add octave note at the end (e.g., C-D-E-F-G-A-B-C)
  const ascending = [...notes, notes[0]];
  
  // Descending: Reverse and remove duplicate root
  // For melodic minor, notesDescending is stored in ascending order,
  // so we reverse it to play from high to low
  const descending = notesDescending 
    ? [...notesDescending, notesDescending[0]].reverse().slice(1)  // Melodic minor: natural 6th/7th
    : [...notes, notes[0]].reverse().slice(1);                      // Other scales: same notes reversed
    
  const fullScale = [...ascending, ...descending];
  
  // Calculate octaves for the full scale (up and down)
  const ctx = getAudioContext();
  
  // Initialize audio if not already done (important for iOS PWA)
  if (!isAudioInitialized) {
    initializeAudio();
  }
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Slight overlap for smooth flow, but not too much
  const noteDuration = tempo === 'slow' ? 0.65 : tempo === 'medium' ? 0.5 : 0.35;
  const noteInterval = tempo === 'slow' ? 0.6 : tempo === 'medium' ? 0.45 : 0.3;
  
  const startTime = ctx.currentTime + 0.1;
  
  // Calculate octaves for ascending (including octave note)
  const ascendingOctaves = calculateOctavesForScale(ascending);
  // For descending, reverse the octaves and remove the duplicate top note
  const descendingOctaves = [...ascendingOctaves].reverse().slice(1);
  const allOctaves = [...ascendingOctaves, ...descendingOctaves];
  
  // Track when we switch from ascending to descending
  const ascendingLength = ascending.length;
  let directionChangeScheduled = false;
  
  fullScale.forEach((note, index) => {
    const frequency = getNoteFrequency(note, allOctaves[index]);
    if (frequency) {
      playNote(frequency, noteDuration, startTime + (index * noteInterval));
      
      // Notify when we start playing descending notes
      if (onDirectionChange && !directionChangeScheduled && index === ascendingLength) {
        directionChangeScheduled = true;
        setTimeout(() => {
          onDirectionChange(true);
        }, (index * noteInterval * 1000) + 100);
      }
      
      // Schedule animation callback with full note including octave
      // Map the fullScale index back to the display notes array (8 notes including octave)
      if (onNotePlay) {
        let displayIndex: number;
        if (index < ascending.length) {
          // Ascending phase - pass actual index (0-7 for 8 notes)
          displayIndex = index;
        } else {
          // Descending phase - map back to display notes
          // ascending.length = 8, so descending starts at index 8
          // descending goes: index 8->6, 9->5, 10->4, 11->3, 12->2, 13->1, 14->0
          const descendingPosition = index - ascending.length;
          displayIndex = (notes.length - 1) - descendingPosition; // notes.length=7, so 6, 5, 4, 3, 2, 1, 0
        }
        
        const noteWithOctave = note + allOctaves[index];
        const delayMs = (startTime - ctx.currentTime + (index * noteInterval)) * 1000;
        setTimeout(() => onNotePlay(displayIndex, noteWithOctave), Math.max(0, delayMs));
      }
    }
  });
  
  // Schedule callback to clear animation after last note finishes
  if (onNotePlay) {
    const lastNoteTime = startTime + (fullScale.length * noteInterval) + noteDuration;
    const delayMs = (lastNoteTime - ctx.currentTime) * 1000;
    setTimeout(() => onNotePlay(-1, ''), Math.max(0, delayMs));
  }
}

export function playChord(notes: string[], duration: number = 1.5): void {
  const ctx = getAudioContext();
  
  // Initialize audio if not already done (important for iOS PWA)
  if (!isAudioInitialized) {
    initializeAudio();
  }
  
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

/**
 * Play a scale in descending order with correct octave calculation
 * 
 * This function handles descending playback by properly managing octave relationships.
 * For melodic minor, the notes should already be in the descending form (natural 6th/7th).
 * 
 * @param notes - Array of note names in ascending order (will be reversed for playback)
 * @param tempo - Playback speed 
 * @param onNotePlay - Optional callback fired when each note starts playing (noteIndex, note)
 */
export function playScaleDescending(
  notes: string[], 
  tempo: 'slow' | 'medium' | 'fast' = 'medium',
  onNotePlay?: (noteIndex: number, note: string) => void
): void {
  const ctx = getAudioContext();
  
  // Initialize audio if not already done (important for iOS PWA)
  if (!isAudioInitialized) {
    initializeAudio();
  }
  
  // Resume audio context if it's suspended (required by browser autoplay policies)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // For descending: We want to play root(high) -> ... -> root(low)
  // First, add the octave note, then reverse the whole thing
  const notesWithOctave = [...notes, notes[0]]; // ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']
  
  // Calculate octaves for the ascending sequence (this gives us correct octave progression)
  const ascendingOctaves = calculateOctavesForScale(notesWithOctave);
  // For A melodic: [4, 4, 5, 5, 5, 5, 5, 5] -> A4 B4 C5 D5 E5 F5 G5 A5
  
  // Now reverse both notes and octaves for descending playback
  const descendingNotes = [...notesWithOctave].reverse(); // ['A', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
  const descendingOctaves = [...ascendingOctaves].reverse(); // [5, 5, 5, 5, 5, 5, 4, 4]
  // This gives us: A5 G5 F5 E5 D5 C5 B4 A4 ✅
  
  // Slight overlap for smooth flow, but not too much
  const noteDuration = tempo === 'slow' ? 0.65 : tempo === 'medium' ? 0.5 : 0.35;
  const noteInterval = tempo === 'slow' ? 0.6 : tempo === 'medium' ? 0.45 : 0.3;
  
  const startTime = ctx.currentTime + 0.1; // Small delay to ensure smooth start
  
  // Play each note with its correct octave
  descendingNotes.forEach((note, index) => {
    const octave = descendingOctaves[index];
    const frequency = getNoteFrequency(note, octave);
    
    if (frequency) {
      playNote(frequency, noteDuration, startTime + (index * noteInterval));
      
      // Schedule animation callback with full note including octave
      if (onNotePlay) {
        const noteWithOctave = note + octave;
        const delayMs = (startTime - ctx.currentTime + (index * noteInterval)) * 1000;
        setTimeout(() => onNotePlay(index, noteWithOctave), Math.max(0, delayMs));
      }
    }
  });
  
  // Schedule cleanup callback when all notes finish
  if (onNotePlay) {
    const totalDuration = startTime - ctx.currentTime + (descendingNotes.length * noteInterval) + noteDuration;
    setTimeout(() => onNotePlay(-1, ''), Math.max(0, totalDuration * 1000));
  }
}

// Stop all currently playing audio
export function stopAudio(): void {
  if (audioContext) {
    audioContext.close().then(() => {
      audioContext = null;
    });
  }
}
