import React, { useState, useEffect } from 'react';
import { usePracticeData } from './hooks/usePracticeData';
import { PracticeScreen } from './components/PracticeScreen';
import { StatsScreen } from './components/StatsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BrowseScalesScreen } from './components/BrowseScalesScreen';
import { InstallPrompt } from './components/InstallPrompt';
import { initializeAudio } from './services/audioService';
import type { Scale } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'practice' | 'stats' | 'settings' | 'browse'>('practice');
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const practiceManager = usePracticeData();

  // Initialize audio on first user interaction (required for iOS PWA)
  useEffect(() => {
    const handleFirstInteraction = () => {
      initializeAudio();
      // Remove listeners after first interaction
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    document.addEventListener('click', handleFirstInteraction);

    return () => {
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  if (practiceManager.loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading your practice session...</div>
      </div>
    );
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your practice data? This action cannot be undone.')) {
      practiceManager.reset();
      window.location.reload();
    }
  };

  const handleSelectScaleFromBrowse = (scale: Scale) => {
    setSelectedScale(scale);
    setView('practice');
  };

  const handleFeedbackWithClear = (...args: Parameters<typeof practiceManager.handleFeedback>) => {
    practiceManager.handleFeedback(...args);
    setSelectedScale(null); // Clear selected scale after feedback
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Piano Practice Pal
          </h1>
          <p className="text-lg text-gray-400">
            {view === 'practice'
              ? 'Your daily dose of scales to master the keys.'
              : view === 'stats'
              ? 'Review your progress and find areas to improve.'
              : view === 'browse'
              ? 'Choose any scale from the catalog to practice.'
              : 'Customize your practice experience.'
            }
          </p>
          {view === 'practice' && (
            <div className="mt-4 flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setView('browse')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Browse Scales
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => setView('stats')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                History
              </button>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => setView('settings')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Settings
              </button>
            </div>
          )}
        </header>

        <main className="bg-gray-800/50 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-gray-700">
          {view === 'stats' ? (
            <StatsScreen
              practiceData={practiceManager.practiceData}
              onClose={() => setView('practice')}
              onReset={handleReset}
            />
          ) : view === 'settings' ? (
            <SettingsScreen
              scaleTypeSettings={practiceManager.userSettings.enabledScaleTypes}
              onSave={(settings) => {
                practiceManager.updateSettings({ enabledScaleTypes: settings });
                setView('practice');
              }}
              onClose={() => setView('practice')}
            />
          ) : view === 'browse' ? (
            <BrowseScalesScreen
              onClose={() => setView('practice')}
              onSelectScale={handleSelectScaleFromBrowse}
            />
          ) : (
            <PracticeScreen 
              {...practiceManager} 
              handleFeedback={handleFeedbackWithClear}
              overrideScale={selectedScale} 
            />
          )}
        </main>
      </div>

      {/* Install prompt for PWA */}
      <InstallPrompt />
    </div>
  );
};

export default App;