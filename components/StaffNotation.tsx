import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow';

/**
 * StaffNotation Component
 * 
 * Renders musical notation on a standard 5-line staff using VexFlow.
 * Displays scales with proper treble clef, key signatures, and note positioning.
 * 
 * Features:
 * - Automatic key signature detection for all 95 scales
 * - Proper octave spanning matching audio playback
 * - Accidental rendering (sharps, flats, double sharps, double flats)
 * - SVG rendering for crisp display on all screen sizes
 * 
 * @param notes - Array of note names (e.g., ["C", "D", "E", "F#", "G", "A", "B"])
 * @param scaleName - Full scale name (e.g., "G Major", "E Harmonic Minor")
 */

interface StaffNotationProps {
  notes: string[];
  scaleName: string;
  activeNoteIndex?: number; // Index of currently playing note
}

// Map note names to VexFlow note positions with proper accidental handling
// Takes into account the key signature to determine if naturals are needed
function convertToVexFlowNote(
  note: string, 
  octave: number, 
  keySignature: { sharps?: number; flats?: number }
): { keys: string[]; accidentals: string[] } {
  const baseNote = note.charAt(0).toLowerCase();
  const accidental = note.substring(1);
  
  // VexFlow notation: note/octave (e.g., "c/4", "d#/4", "eb/5")
  let vexNote = `${baseNote}/${octave}`;
  
  // Determine what accidentals are in the key signature
  const keySigFlats = ['', 'b', 'e', 'a', 'd', 'g', 'c', 'f']; // Order of flats: Bb, Eb, Ab, Db, Gb, Cb, Fb
  const keySigSharps = ['', 'f', 'c', 'g', 'd', 'a', 'e', 'b']; // Order of sharps: F#, C#, G#, D#, A#, E#, B#
  
  const notesInKeySig = new Set<string>();
  if (keySignature.flats) {
    for (let i = 1; i <= keySignature.flats; i++) {
      notesInKeySig.add(keySigFlats[i]);
    }
  } else if (keySignature.sharps) {
    for (let i = 1; i <= keySignature.sharps; i++) {
      notesInKeySig.add(keySigSharps[i]);
    }
  }
  
  // Determine what accidental to show
  let accidentalSymbol = '';
  
  if (accidental === '#') {
    accidentalSymbol = '#';
  } else if (accidental === 'b') {
    accidentalSymbol = 'b';
  } else if (accidental === '##') {
    accidentalSymbol = '##';
  } else if (accidental === 'bb') {
    accidentalSymbol = 'bb';
  } else if (accidental === '') {
    // Natural note - check if it needs a natural sign
    // If the key signature has this note as flat/sharp, we need a natural sign
    if (notesInKeySig.has(baseNote)) {
      accidentalSymbol = 'n'; // Natural sign
    }
  }
  
  return {
    keys: [vexNote],
    accidentals: accidentalSymbol ? [accidentalSymbol] : []
  };
}

// Determine key signature from scale name
function getKeySignature(scaleName: string): { sharps?: number; flats?: number } {
  const name = scaleName.toLowerCase();
  
  // For minor scales, use the relative major's key signature
  // A minor = C major (no sharps/flats), E minor = G major (1 sharp), etc.
  
  // No sharps or flats
  if (name.startsWith('c major')) return {};
  if (name.startsWith('a natural') || name.startsWith('a harmonic') || name.startsWith('a melodic')) return {};
  
  // Sharp keys
  if (name.startsWith('g major')) return { sharps: 1 };
  if (name.startsWith('e natural') || name.startsWith('e harmonic') || name.startsWith('e melodic')) return { sharps: 1 };
  
  if (name.startsWith('d major')) return { sharps: 2 };
  if (name.startsWith('b natural') || name.startsWith('b harmonic') || name.startsWith('b melodic')) return { sharps: 2 };
  
  if (name.startsWith('a major')) return { sharps: 3 };
  if (name.startsWith('f# natural') || name.startsWith('f# harmonic') || name.startsWith('f# melodic')) return { sharps: 3 };
  
  if (name.startsWith('e major')) return { sharps: 4 };
  if (name.startsWith('c# natural') || name.startsWith('c# harmonic') || name.startsWith('c# melodic')) return { sharps: 4 };
  
  if (name.startsWith('b major')) return { sharps: 5 };
  if (name.startsWith('g# natural') || name.startsWith('g# harmonic') || name.startsWith('g# melodic')) return { sharps: 5 };
  
  if (name.startsWith('f# major')) return { sharps: 6 };
  if (name.startsWith('d# natural') || name.startsWith('d# harmonic') || name.startsWith('d# melodic')) return { sharps: 6 };
  
  if (name.startsWith('c# major')) return { sharps: 7 };
  if (name.startsWith('a# natural') || name.startsWith('a# harmonic') || name.startsWith('a# melodic')) return { sharps: 7 };
  
  // Flat keys
  if (name.startsWith('f major')) return { flats: 1 };
  if (name.startsWith('d natural') || name.startsWith('d harmonic') || name.startsWith('d melodic')) return { flats: 1 };
  
  if (name.startsWith('bb major')) return { flats: 2 };
  if (name.startsWith('g natural') || name.startsWith('g harmonic') || name.startsWith('g melodic')) return { flats: 2 };
  
  if (name.startsWith('eb major')) return { flats: 3 };
  if (name.startsWith('c natural') || name.startsWith('c harmonic') || name.startsWith('c melodic')) return { flats: 3 };
  
  if (name.startsWith('ab major')) return { flats: 4 };
  if (name.startsWith('f natural') || name.startsWith('f harmonic') || name.startsWith('f melodic')) return { flats: 4 };
  
  if (name.startsWith('db major')) return { flats: 5 };
  if (name.startsWith('bb natural') || name.startsWith('bb harmonic') || name.startsWith('bb melodic')) return { flats: 5 };
  
  if (name.startsWith('gb major')) return { flats: 6 };
  if (name.startsWith('eb natural') || name.startsWith('eb harmonic') || name.startsWith('eb melodic')) return { flats: 6 };
  
  if (name.startsWith('cb major')) return { flats: 7 };
  if (name.startsWith('ab natural') || name.startsWith('ab harmonic') || name.startsWith('ab melodic')) return { flats: 7 };
  
  return {};
}

// Calculate octaves for the scale (same logic as audioService)// Calculate octaves for the scale (same logic as audioService)
function calculateOctavesForScale(notes: string[]): number[] {
  if (notes.length === 0) return [];
  
  const noteLetterPositions = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  
  // ALWAYS start at octave 4 to match the visible keyboard range (C4-B5)
  let currentOctave = 4;
  let previousBase = notes[0].charAt(0);
  
  const octaves: number[] = [];
  
  for (let i = 0; i < notes.length; i++) {
    const currentBase = notes[i].charAt(0);
    const currentPos = noteLetterPositions.indexOf(currentBase);
    const prevPos = noteLetterPositions.indexOf(previousBase);
    
    // Increment octave when we cross from B to C (or wrap around)
    if (i > 0 && currentPos < prevPos) {
      currentOctave++;
    }
    
    octaves.push(currentOctave);
    previousBase = currentBase;
  }
  
  return octaves;
}

export default function StaffNotation({ notes, scaleName, activeNoteIndex = -1 }: StaffNotationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || notes.length === 0) return;
    
    try {
      // Clear previous content
      containerRef.current.innerHTML = '';
    
    // Create VexFlow renderer
    const renderer = new Renderer(
      containerRef.current,
      Renderer.Backends.SVG
    );
    
    // Set dimensions - wider to accommodate 8 notes + key signatures with many accidentals
    const width = 800;
    const height = 150;
    renderer.resize(width, height);
    
    const context = renderer.getContext();
    
    // Create a stave (staff) - increased left margin for key signatures with 6-7 accidentals
    const stave = new Stave(10, 20, width - 20);
    
    // Add treble clef
    stave.addClef('treble');
    
    // Get key signature (will be used later for accidental determination too)
    const keySignature = getKeySignature(scaleName);
    
    // Add key signature to the stave
    if (keySignature.sharps) {
      // VexFlow expects key signature format like 'G' for 1 sharp, 'D' for 2 sharps, etc.
      const sharpKeys = ['', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
      const keyString = sharpKeys[keySignature.sharps];
      console.log(`[StaffNotation] ${scaleName} → ${keySignature.sharps} sharps → Key: ${keyString}`);
      stave.addKeySignature(keyString);
    } else if (keySignature.flats) {
      // VexFlow expects key signature format like 'F' for 1 flat, 'Bb' for 2 flats, etc.
      const flatKeys = ['', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
      const keyString = flatKeys[keySignature.flats];
      console.log(`[StaffNotation] ${scaleName} → ${keySignature.flats} flats → Key: ${keyString}`);
      stave.addKeySignature(keyString);
    }
    
    // Add time signature (not strictly needed for scales, but looks professional)
    // stave.addTimeSignature('4/4');
    
    // Draw the stave
    stave.setContext(context).draw();
    
    // Add octave note to complete the scale (do-re-mi-fa-sol-la-ti-do)
    const notesWithOctave = [...notes, notes[0]];
    
    // Calculate octaves for notes (including the octave)
    const octaves = calculateOctavesForScale(notesWithOctave);
    
    // Convert notes to VexFlow format
    const vexNotes = notesWithOctave.map((note, index) => {
      const { keys, accidentals } = convertToVexFlowNote(note, octaves[index], keySignature);
      
      const staveNote = new StaveNote({
        keys: keys,
        duration: 'q' // Quarter note
      });
      
      // Add accidentals if needed
      if (accidentals.length > 0) {
        staveNote.addModifier(new Accidental(accidentals[0]), 0);
      }
      
      // Highlight the active note being played
      if (index === activeNoteIndex) {
        staveNote.setStyle({ fillStyle: '#EAB308', strokeStyle: '#EAB308' }); // Yellow
      }
      
      return staveNote;
    });
    
    // Create a voice and add notes
    const voice = new Voice({
      numBeats: notesWithOctave.length,
      beatValue: 4
    });
    voice.addTickables(vexNotes);
    
    // Format and draw
    new Formatter()
      .joinVoices([voice])
      .format([voice], width - 100);
    
    voice.draw(context, stave);
    
    } catch (error) {
      console.error('Error rendering staff notation:', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div style="color: #999; text-align: center; padding: 20px;">Music notation temporarily unavailable</div>';
      }
    }
    
  }, [notes, scaleName, activeNoteIndex]);
  
  return (
    <div className="staff-notation-container">
      <div ref={containerRef} className="vexflow-container"></div>
      <style>{`
        .staff-notation-container {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .vexflow-container {
          overflow-x: auto;
        }
        .vexflow-container svg {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}
