import React, { useMemo } from 'react';
import { PIANO_KEYS, noteEquivalents, blackKeyPositions } from '../constants/piano';

interface PianoKeyboardProps {
  scaleNotes: string[];
  activeNoteIndex?: number; // Index of currently playing note
  activeNote?: string; // The exact note with octave being played (e.g., "C4")
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ 
  scaleNotes, 
  activeNoteIndex = -1,
  activeNote = ''
}) => {
  const getNoteName = (keyName: string) => keyName.replace(/[0-9]/g, '');
  
  const normalizeNote = (note: string): string => {
    // Extract note name and octave separately
    const noteName = note.replace(/[0-9]/g, '');
    const octave = note.replace(/[^0-9]/g, '');
    
    // Normalize the note name
    const normalized = noteEquivalents[noteName] || noteName;
    
    // Adjust octave for enharmonic notes that cross octave boundaries
    // B# -> C (next octave), Cb -> B (previous octave)
    let adjustedOctave = octave;
    if (octave && noteEquivalents[noteName]) {
      const originalLetter = noteName.charAt(0);
      const normalizedLetter = normalized.charAt(0);
      
      // B# becomes C - increment octave
      if (originalLetter === 'B' && normalizedLetter === 'C') {
        adjustedOctave = String(parseInt(octave) + 1);
      }
      // Cb becomes B - decrement octave  
      else if (originalLetter === 'C' && normalizedLetter === 'B') {
        adjustedOctave = String(parseInt(octave) - 1);
      }
    }
    
    // Reconstruct with octave if it exists
    return adjustedOctave ? normalized + adjustedOctave : normalized;
  };

  const normalizedScaleNotes = useMemo(
    () => new Set(scaleNotes.map(normalizeNote)),
    [scaleNotes]
  );
  
  const isNoteInScale = (keyName: string) => 
    normalizedScaleNotes.has(normalizeNote(getNoteName(keyName)));
  
  const isRootNote = (keyName: string) => 
    normalizeNote(getNoteName(keyName)) === normalizeNote(scaleNotes[0]);
  
  const isActiveNote = (keyName: string) => {
    if (!activeNote || activeNoteIndex < 0) return false;
    // Match exact note with octave (e.g., "C4" matches only "C4", not "C5")
    return normalizeNote(keyName) === normalizeNote(activeNote);
  };

  return (
    <div className="flex justify-center p-4 bg-gray-800 rounded-lg shadow-inner overflow-x-auto">
      <div className="relative flex">
        {PIANO_KEYS.filter(k => k.type === 'white').map(({ name }) => (
          <div
            key={name}
            className={`
              w-10 h-40 border-2 border-gray-900 rounded-b-md bg-white relative flex justify-center items-end pb-2
              transition-all duration-200
              ${isActiveNote(name) ? 'bg-yellow-200 scale-95 shadow-2xl shadow-yellow-400/50' : ''}
              ${isNoteInScale(name) && !isActiveNote(name) ? 'shadow-inner shadow-blue-400' : ''}
            `}
          >
            {isNoteInScale(name) && (
              <div className={`
                w-6 h-6 rounded-full transition-all duration-200
                ${isActiveNote(name) ? 'bg-yellow-500 scale-125 animate-pulse' : ''}
                ${!isActiveNote(name) && isRootNote(name) ? 'bg-green-500' : ''}
                ${!isActiveNote(name) && !isRootNote(name) ? 'bg-blue-500' : ''}
              `}></div>
            )}
          </div>
        ))}
        {PIANO_KEYS.filter(k => k.type === 'black').map(({ name }) => {
          const noteName = getNoteName(name);
          const octave = parseInt(name.slice(-1));
          const octaveOffset = (octave - 4) * (7 * 2.5);
          const leftPosition = octaveOffset + blackKeyPositions[noteName];

          return (
            <div
              key={name}
              className={`
                w-6 h-24 border-2 border-gray-900 rounded-b-md z-10 absolute flex justify-center items-end pb-2
                transition-all duration-200
                ${isActiveNote(name) ? 'bg-yellow-300 scale-95 shadow-2xl shadow-yellow-400/50' : 'bg-gray-800'}
                ${isNoteInScale(name) && !isActiveNote(name) ? 'shadow-inner shadow-blue-300' : ''}
              `}
              style={{ left: `${leftPosition}rem` }}
            >
              {isNoteInScale(name) && (
                <div className={`
                  w-5 h-5 rounded-full transition-all duration-200
                  ${isActiveNote(name) ? 'bg-yellow-500 scale-125 animate-pulse' : ''}
                  ${!isActiveNote(name) && isRootNote(name) ? 'bg-green-400' : ''}
                  ${!isActiveNote(name) && !isRootNote(name) ? 'bg-blue-400' : ''}
                `}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
