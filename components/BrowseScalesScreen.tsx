import React, { useState, useMemo } from 'react';
import { ALL_SCALES } from '../constants/scales';
import { PianoKeyboard } from './PianoKeyboard';
import StaffNotation from './StaffNotation';
import { playScale, playScaleUpAndDown } from '../services/audioService';
import type { Scale, ScaleType } from '../types';

interface BrowseScalesScreenProps {
  onClose: () => void;
  onSelectScale: (scale: Scale) => void;
}

export const BrowseScalesScreen: React.FC<BrowseScalesScreenProps> = ({ onClose, onSelectScale }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ScaleType | 'all'>('all');
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState(-1);
  const [activeNote, setActiveNote] = useState('');

  const handlePlayScale = (scale: Scale, direction: 'ascending' | 'up-and-down') => {
    setIsPlaying(true);
    
    const noteCallback = (index: number, note: string) => {
      setActiveNoteIndex(index);
      setActiveNote(note);
    };
    
    if (direction === 'up-and-down') {
      // For melodic minor, pass the descending notes (natural minor form)
      const descendingNotes = scale.type === 'melodic-minor' && scale.notesDescending 
        ? scale.notesDescending 
        : undefined;
      playScaleUpAndDown(scale.notes, 'medium', noteCallback, descendingNotes);
      // Calculate duration: notes + octave note, played twice (up and down), minus one for the turn
      setTimeout(() => {
        setIsPlaying(false);
        setActiveNoteIndex(-1);
        setActiveNote('');
      }, (scale.notes.length * 2 + 1) * 450 + 200);
    } else {
      playScale(scale.notes, 'medium', noteCallback);
      // Calculate duration: notes + octave note
      setTimeout(() => {
        setIsPlaying(false);
        setActiveNoteIndex(-1);
        setActiveNote('');
      }, (scale.notes.length + 1) * 450 + 200);
    }
  };

  const filteredScales = useMemo(() => {
    return ALL_SCALES.filter(scale => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        scale.name.toLowerCase().includes(searchLower) ||
        (scale.altName && scale.altName.toLowerCase().includes(searchLower));
      const matchesType = selectedType === 'all' || scale.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  const scaleTypes: Array<{ value: ScaleType | 'all'; label: string }> = [
    { value: 'all', label: 'All Types' },
    { value: 'major', label: 'Major' },
    { value: 'natural-minor', label: 'Natural Minor' },
    { value: 'harmonic-minor', label: 'Harmonic Minor' },
    { value: 'melodic-minor', label: 'Melodic Minor' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Browse All Scales</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search scales (e.g., 'C', 'Minor', 'Harmonic')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as ScaleType | 'all')}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {scaleTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-gray-400 text-sm">
        Found {filteredScales.length} scale{filteredScales.length !== 1 ? 's' : ''}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Scale List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredScales.map((scale) => (
            <button
              key={scale.name}
              onClick={() => setSelectedScale(scale)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                selectedScale?.name === scale.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="font-medium">{scale.name}</div>
              <div className="text-sm opacity-75 font-mono tracking-tight">
                {scale.notes.join(' - ')}
              </div>
            </button>
          ))}
          {filteredScales.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No scales found matching your criteria
            </div>
          )}
        </div>

        {/* Right: Scale Preview */}
        <div className="bg-gray-800/30 rounded-lg p-6 sticky top-0">
          {selectedScale ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedScale.name}
                  {selectedScale.altName && (
                    <span className="text-base font-normal text-gray-400 ml-2">
                      (also known as {selectedScale.altName})
                    </span>
                  )}
                </h3>
                <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                  {selectedScale.type === 'major' && 'Major'}
                  {selectedScale.type === 'natural-minor' && 'Natural Minor'}
                  {selectedScale.type === 'harmonic-minor' && 'Harmonic Minor'}
                  {selectedScale.type === 'melodic-minor' && 'Melodic Minor'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-gray-300">
                  <span className="font-semibold">Ascending:</span>
                  <div className="font-mono tracking-tight mt-1 text-lg">
                    {selectedScale.notes.join(' - ')}
                  </div>
                </div>
                
                {selectedScale.type === 'melodic-minor' && selectedScale.notesDescending && (
                  <div className="text-gray-300">
                    <span className="font-semibold">Descending:</span>
                    <div className="font-mono tracking-tight mt-1 text-lg">
                      {selectedScale.notesDescending.join(' - ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Musical Staff Notation */}
              <div>
                <div className="text-sm text-gray-400 mb-2">Musical Notation:</div>
                <StaffNotation notes={selectedScale.notes} scaleName={selectedScale.name} activeNoteIndex={activeNoteIndex} />
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-2">Piano Keyboard:</div>
                <PianoKeyboard scaleNotes={selectedScale.notes} activeNoteIndex={activeNoteIndex} activeNote={activeNote} />
              </div>

              {/* Audio Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePlayScale(selectedScale, 'ascending')}
                  disabled={isPlaying}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isPlaying 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Play
                </button>
                <button
                  onClick={() => handlePlayScale(selectedScale, 'up-and-down')}
                  disabled={isPlaying}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isPlaying 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Up & Down
                </button>
              </div>

              <button
                onClick={() => onSelectScale(selectedScale)}
                className="w-full mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors transform hover:scale-105"
              >
                Practice This Scale
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Select a scale to preview
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 1);
        }
      `}</style>
    </div>
  );
};
