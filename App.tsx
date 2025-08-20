import React, { useState } from 'react';
import { usePracticeData } from './hooks/usePracticeData';
import { PracticeScreen } from './components/PracticeScreen';
import { StatsScreen } from './components/StatsScreen';

const App: React.FC = () => {
    const [view, setView] = useState<'practice' | 'stats'>('practice');
    const practiceManager = usePracticeData();

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
            // Force a page reload to ensure the app starts from a clean state.
            // This is the most robust way to handle a full data reset.
            window.location.reload();
        }
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
                            : 'Review your progress and find areas to improve.'
                        }
                    </p>
                    {view === 'practice' && (
                         <button
                            onClick={() => setView('stats')}
                            className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            View Practice History
                        </button>
                    )}
                </header>

                <main className="bg-gray-800/50 rounded-lg p-6 shadow-lg backdrop-blur-sm border border-gray-700">
                    {view === 'stats' ? (
                        <StatsScreen
                            practiceData={practiceManager.practiceData}
                            onClose={() => setView('practice')}
                            onReset={handleReset}
                        />
                    ) : (
                       <PracticeScreen {...practiceManager} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;