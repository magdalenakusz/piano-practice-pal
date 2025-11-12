import React, { useState } from 'react';
import type { ScaleTypeSettings } from '../types';
import { SCALE_TYPE_LABELS, DEFAULT_SCALE_SETTINGS } from '../constants/scales';

interface SettingsScreenProps {
  scaleTypeSettings: ScaleTypeSettings;
  onSave: (settings: ScaleTypeSettings) => void;
  onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  scaleTypeSettings, 
  onSave, 
  onClose 
}) => {
  const [settings, setSettings] = useState<ScaleTypeSettings>(scaleTypeSettings);

  const handleToggle = (scaleType: keyof ScaleTypeSettings) => {
    setSettings(prev => ({
      ...prev,
      [scaleType]: !prev[scaleType]
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings(DEFAULT_SCALE_SETTINGS);
  };

  const scaleTypes: Array<keyof ScaleTypeSettings> = [
    'major',
    'natural-minor',
    'harmonic-minor',
    'melodic-minor'
  ];

  const enabledCount = Object.values(settings).filter(Boolean).length;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-white">Scale Settings</h2>
      </div>

      <p className="text-gray-300 mb-6">
        Choose which types of scales to include in your daily practice sessions.
      </p>

      <div className="space-y-3 mb-6">
        {scaleTypes.map(scaleType => (
          <div
            key={scaleType}
            className="bg-gray-900/70 p-4 rounded-lg flex items-center justify-between hover:bg-gray-900 transition-colors"
          >
            <div className="flex-1">
              <p className="font-semibold text-white text-lg">
                {SCALE_TYPE_LABELS[scaleType]}
              </p>
              <p className="text-sm text-gray-400">
                {scaleType === 'major' && '12 scales (C, G, D, A, E, B, F#, C#, F, Bb, Eb, Ab)'}
                {scaleType === 'natural-minor' && '12 scales (A, E, B, F#, C#, D, G, C, F, Bb, Eb, Ab)'}
                {scaleType === 'harmonic-minor' && '12 scales (Natural minor with raised 7th)'}
                {scaleType === 'melodic-minor' && '12 scales (Raised 6th & 7th ascending)'}
              </p>
            </div>
            <button
              onClick={() => handleToggle(scaleType)}
              className={`
                relative w-14 h-8 rounded-full transition-colors duration-200 ease-in-out
                ${settings[scaleType] ? 'bg-blue-600' : 'bg-gray-600'}
              `}
              aria-label={`Toggle ${SCALE_TYPE_LABELS[scaleType]}`}
            >
              <span
                className={`
                  absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out
                  ${settings[scaleType] ? 'translate-x-6' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
        <p className="text-blue-200 text-sm">
          <strong className="font-semibold">{enabledCount}</strong> scale type{enabledCount !== 1 ? 's' : ''} selected
          {enabledCount === 0 && ' — At least one type must be enabled'}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex-1 px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={enabledCount === 0}
          className={`
            flex-1 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors
            ${enabledCount > 0 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-600 cursor-not-allowed'
            }
          `}
        >
          Save
        </button>
      </div>
    </>
  );
};
