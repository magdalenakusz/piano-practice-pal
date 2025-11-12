import React, { useState, useMemo } from 'react';
import { PianoKeyboard } from './PianoKeyboard';
import StaffNotation from './StaffNotation';
import { ALL_SCALES, getEnharmonicEquivalent } from '../constants/scales';
import { playScale, playScaleUpAndDown } from '../services/audioService';
import type { Scale, ConfidenceLevel } from '../types';
import type { UsePracticeDataReturn } from '../hooks/usePracticeData';

interface CompletionScreenProps {
  onStartNewSession: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onStartNewSession }) => (
  <div className="flex flex-col items-center justify-center text-center min-h-[28rem]">
    <svg className="w-24 h-24 text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h2 className="text-3xl font-bold text-white">All done for today!</h2>
    <p className="text-gray-300 mt-2 mb-6">Great work. Come back tomorrow or start a new session now.</p>
    <button
      onClick={onStartNewSession}
      className="w-full max-w-xs px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
    >
      Practice More
    </button>
  </div>
);

interface FeedbackButtonsProps {
  onFeedback: (confidence: ConfidenceLevel) => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ onFeedback }) => (
  <div>
    <h3 className="text-xl font-semibold text-white mb-3">How did it feel?</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button 
        onClick={() => onFeedback(1)} 
        className="p-4 rounded-lg bg-red-600/80 hover:bg-red-600 transition-colors transform hover:scale-105"
      >
        Needs Work
      </button>
      <button 
        onClick={() => onFeedback(2)} 
        className="p-4 rounded-lg bg-yellow-500/80 hover:bg-yellow-500 transition-colors transform hover:scale-105"
      >
        Getting There
      </button>
      <button 
        onClick={() => onFeedback(3)} 
        className="p-4 rounded-lg bg-green-600/80 hover:bg-green-600 transition-colors transform hover:scale-105"
      >
        Mastered
      </button>
    </div>
  </div>
);

interface ScaleDisplayProps {
  scale: Scale;
  equivalent?: Scale;
  showDescending?: boolean;
  onToggleDirection?: () => void;
  isBrowseMode?: boolean;
}

const ScaleDisplay: React.FC<ScaleDisplayProps> = ({ 
  scale, 
  equivalent,
  showDescending = false,
  onToggleDirection,
  isBrowseMode = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState(-1);
  const [activeNote, setActiveNote] = useState('');
  const [isPlayingDescending, setIsPlayingDescending] = useState(false);

  const isMelodicMinor = scale.type === 'melodic-minor';
  // During playback, switch display based on which direction is playing
  // When not playing, use the showDescending prop from the toggle button
  const effectiveShowDescending = isPlaying ? isPlayingDescending : showDescending;
  
  const displayNotes = isMelodicMinor && effectiveShowDescending && scale.notesDescending
    ? scale.notesDescending
    : scale.notes;
  
  const equivalentNotes = equivalent && isMelodicMinor && effectiveShowDescending && equivalent.notesDescending
    ? equivalent.notesDescending
    : equivalent?.notes;

    const handlePlay = (mode: 'single' | 'upAndDown') => {
    setIsPlaying(true);
    setIsPlayingDescending(false); // Always start with ascending
    
    const noteCallback = (index: number, note: string) => {
      setActiveNoteIndex(index);
      setActiveNote(note);
    };
    
    if (mode === 'upAndDown') {
      // For melodic minor, pass the descending notes (natural minor form)
      const descendingNotes = isMelodicMinor && scale.notesDescending 
        ? scale.notesDescending 
        : undefined;
      
      // Callback to switch UI when descending starts
      const directionCallback = isMelodicMinor ? (isDesc: boolean) => {
        setIsPlayingDescending(isDesc);
      } : undefined;
      
      playScaleUpAndDown(scale.notes, 'medium', noteCallback, descendingNotes, directionCallback);
      // Calculate duration: notes + octave note, played twice (up and down), minus one for the turn
      // (notes.length + 1) * 2 - 1 = notes.length * 2 + 1
      setTimeout(() => {
        setIsPlaying(false);
        setIsPlayingDescending(false);
        setActiveNoteIndex(-1);
        setActiveNote('');
      }, (scale.notes.length * 2 + 1) * 450 + 200);
    } else {
      // For melodic minor in descending mode, we need special handling
      const isDescendingPlayback = isMelodicMinor && showDescending && scale.notesDescending;
      
      if (isDescendingPlayback) {
        // For descending: Start from root at top, go down to root at bottom
        // notesDescending is stored in ascending order, so reverse it
        const reversedNotes = [...scale.notesDescending].reverse();
        // Add the root note at the beginning (octave above)
        const playbackNotes = [reversedNotes[reversedNotes.length - 1], ...reversedNotes];
        
        // Adjust callback to map indices correctly
        // playbackNotes = [B_high, A, G, F#, E, D, C#, B_low]
        // displayNotes = [B, C#, D, E, F#, G, A] (ascending order for display)
        // When playing index 0 (B_high), we want to highlight displayIndex 0 (B)
        // When playing index 1 (A), we want to highlight displayIndex 6 (A)
        const adjustedCallback = (index: number, note: string) => {
          if (index === -1) {
            noteCallback(-1, note);
          } else if (index === 0) {
            // First note is octave root - highlight the root (index 0)
            noteCallback(0, note);
          } else {
            // Map the descending playback to the ascending display
            // index 1 (A) -> displayIndex 6 (A in display)
            // index 2 (G) -> displayIndex 5 (G in display)
            // index 7 (B_low) -> displayIndex 0 (B in display)
            const displayIndex = displayNotes.length - index;
            noteCallback(displayIndex, note);
          }
        };
        
        playScale(playbackNotes, 'medium', adjustedCallback);
      } else {
        playScale(displayNotes, 'medium', noteCallback);
      }
      
      // Calculate duration: notes + octave note
      setTimeout(() => {
        setIsPlaying(false);
        setIsPlayingDescending(false);
        setActiveNoteIndex(-1);
        setActiveNote('');
      }, (displayNotes.length + 1) * 450 + 200);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-white mb-1">
        {isBrowseMode ? 'Selected Scale:' : 'Today\'s Practice:'}
      </h2>
      <p className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
        {scale.name}
        {equivalent && <span className="text-3xl sm:text-4xl text-gray-400"> / {equivalent.name}</span>}
      </p>
      
      {isMelodicMinor && onToggleDirection && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-lg bg-gray-900/50 p-1">
            <button
              onClick={() => onToggleDirection()}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                !showDescending 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Ascending
            </button>
            <button
              onClick={() => onToggleDirection()}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                showDescending 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Descending
            </button>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <div className="text-lg text-gray-300 mb-4 text-center sm:text-left p-2 rounded-md bg-gray-900/50">
          <p>Notes: <span className="font-mono tracking-tight">{displayNotes.join(' - ')}</span></p>
          {equivalent && equivalentNotes && (
            <p className="text-gray-400 text-base mt-1">
              Alt: <span className="font-mono tracking-tight">{equivalentNotes.join(' - ')}</span>
            </p>
          )}
        </div>

        {/* Audio Controls */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => handlePlay('single')}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              isPlaying 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
            }`}
            title="Play scale once"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            {isPlaying ? 'Playing...' : 'Play'}
          </button>
          
          <button
            onClick={() => handlePlay('upAndDown')}
            disabled={isPlaying}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              isPlaying 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700'
            }`}
            title="Play scale up and down"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Up & Down
          </button>
        </div>

        {/* Musical Staff Notation */}
        <StaffNotation 
          notes={displayNotes} 
          scaleName={scale.name}
          activeNoteIndex={activeNoteIndex}
        />

        <PianoKeyboard 
          scaleNotes={displayNotes}
          activeNoteIndex={activeNoteIndex}
          activeNote={activeNote}
        />
        
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Root Note</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm">Scale Note</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse"></div>
            <span className="text-sm">Now Playing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PracticeScreen: React.FC<UsePracticeDataReturn & { overrideScale?: Scale | null }> = ({
  dailyScales,
  currentIndex,
  isSessionComplete,
  handleFeedback,
  startNewSession,
  overrideScale,
}) => {
  const [practiceStep, setPracticeStep] = useState<'practice' | 'feedback'>('practice');
  const [showDescending, setShowDescending] = useState<boolean>(false);

  const { currentScale, equivalentScale } = useMemo(() => {
    // If there's an override scale, use it instead of the daily scale
    const current = overrideScale || dailyScales[currentIndex];
    if (!current) {
      return { currentScale: undefined, equivalentScale: undefined };
    }
    const equivalent = current.altName ? getEnharmonicEquivalent(current.altName) : undefined;
    return { currentScale: current, equivalentScale: equivalent };
  }, [currentIndex, dailyScales, overrideScale]);

  const onFeedback = (confidence: ConfidenceLevel) => {
    handleFeedback(confidence);
    setPracticeStep('practice');
    setShowDescending(false); // Reset for next scale
  };

  // Show completion screen only if session is complete AND no override scale is selected
  if (isSessionComplete && !overrideScale) {
    return <CompletionScreen onStartNewSession={startNewSession} />;
  }

  if (!currentScale) {
    return <CompletionScreen onStartNewSession={startNewSession} />;
  }

  return (
    <>
      <div className="min-h-[28rem] flex flex-col justify-between">
        {overrideScale && (
          <div className="mb-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg text-center">
            <p className="text-blue-300 text-sm">
              🎯 You selected this scale from the catalog
            </p>
          </div>
        )}
        
        <ScaleDisplay 
          scale={currentScale} 
          equivalent={equivalentScale}
          showDescending={showDescending}
          onToggleDirection={currentScale.type === 'melodic-minor' ? () => setShowDescending(!showDescending) : undefined}
          isBrowseMode={!!overrideScale}
        />

        {practiceStep === 'practice' ? (
          <button
            onClick={() => setPracticeStep('feedback')}
            className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            I've Practiced This Scale
          </button>
        ) : (
          <FeedbackButtons onFeedback={onFeedback} />
        )}
      </div>
      {!overrideScale && dailyScales.length > 1 && (
        <div className="mt-6 text-center text-gray-400">
          Scale {currentIndex + 1} of {dailyScales.length}
        </div>
      )}
    </>
  );
};