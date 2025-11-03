import React, { useState, useMemo } from 'react';
import { PianoKeyboard } from './PianoKeyboard';
import { ALL_SCALES, ENHARMONIC_EQUIVALENTS } from '../constants/scales';
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
  const isMelodicMinor = scale.type === 'melodic-minor';
  const displayNotes = isMelodicMinor && showDescending && scale.notesDescending
    ? scale.notesDescending
    : scale.notes;
  
  const equivalentNotes = equivalent && isMelodicMinor && showDescending && equivalent.notesDescending
    ? equivalent.notesDescending
    : equivalent?.notes;

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

        <PianoKeyboard scaleNotes={displayNotes} />
        
        <div className="mt-4 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Root Note</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm">Scale Note</span>
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
    const equivalentName = ENHARMONIC_EQUIVALENTS[current.name];
    const equivalent = equivalentName ? ALL_SCALES.find(s => s.name === equivalentName) : undefined;
    return { currentScale: current, equivalentScale: equivalent };
  }, [currentIndex, dailyScales, overrideScale]);

  const onFeedback = (confidence: ConfidenceLevel) => {
    handleFeedback(confidence);
    setPracticeStep('practice');
    setShowDescending(false); // Reset for next scale
  };

  if (isSessionComplete) {
    return <CompletionScreen onStartNewSession={startNewSession} />;
  }

  if (!currentScale) {
    return (
      <div className="min-h-[28rem] flex items-center justify-center">
        No more scales for today.
      </div>
    );
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