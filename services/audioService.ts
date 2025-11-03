// Audio service for playing piano notes using Web Audio API

const NOTE_FREQUENCIES: { [key: string]: number } = {
  // Octave 4 (middle octave)
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
  'B#': 523.25, // Same as C (next octave)
  'Cb': 493.88, // Same as B
  'C##': 293.66, // Same as D (double sharp)
  
  // Special cases for flats
  'Fb': 329.63, // Same as E
};

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
  
  const noteDuration = tempo === 'slow' ? 0.6 : tempo === 'medium' ? 0.4 : 0.25;
  const noteInterval = tempo === 'slow' ? 0.65 : tempo === 'medium' ? 0.45 : 0.3;
  
  const startTime = ctx.currentTime + 0.1; // Small delay to ensure smooth start
  
  notes.forEach((note, index) => {
    const frequency = NOTE_FREQUENCIES[note];
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
  playScale(fullScale, tempo);
}

export function playChord(notes: string[], duration: number = 1.5): void {
  const ctx = getAudioContext();
  
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  const startTime = ctx.currentTime + 0.1;
  
  notes.forEach((note) => {
    const frequency = NOTE_FREQUENCIES[note];
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
