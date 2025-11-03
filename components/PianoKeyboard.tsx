import React, { useMemo } from 'react';
import { PIANO_KEYS, noteEquivalents, blackKeyPositions } from '../constants/piano';

interface PianoKeyboardProps {
  scaleNotes: string[];
}

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ scaleNotes }) => {
  const getNoteName = (keyName: string) => keyName.replace(/[0-9]/g, '');
  const normalizeNote = (note: string): string => noteEquivalents[note] || note;

  const normalizedScaleNotes = useMemo(
    () => new Set(scaleNotes.map(normalizeNote)),
    [scaleNotes]
  );
  
  const isNoteInScale = (keyName: string) => 
    normalizedScaleNotes.has(normalizeNote(getNoteName(keyName)));
  
  const isRootNote = (keyName: string) => 
    normalizeNote(getNoteName(keyName)) === normalizeNote(scaleNotes[0]);

  return (
    <div className="flex justify-center p-4 bg-gray-800 rounded-lg shadow-inner overflow-x-auto">
      <div className="relative flex">
        {PIANO_KEYS.filter(k => k.type === 'white').map(({ name }) => (
          <div
            key={name}
            className={`
              w-10 h-40 border-2 border-gray-900 rounded-b-md bg-white relative flex justify-center items-end pb-2
              ${isNoteInScale(name) ? 'shadow-inner shadow-blue-400' : ''}
            `}
          >
            {isNoteInScale(name) && (
              <div className={`
                w-6 h-6 rounded-full
                ${isRootNote(name) ? 'bg-green-500' : 'bg-blue-500'}
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
                w-6 h-24 border-2 border-gray-900 rounded-b-md bg-gray-800 z-10 absolute flex justify-center items-end pb-2
                ${isNoteInScale(name) ? 'shadow-inner shadow-blue-300' : ''}
              `}
              style={{ left: `${leftPosition}rem` }}
            >
              {isNoteInScale(name) && (
                <div className={`
                  w-5 h-5 rounded-full 
                  ${isRootNote(name) ? 'bg-green-400' : 'bg-blue-400'}
                `}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
