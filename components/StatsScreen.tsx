import React, { useState, useMemo, useRef } from 'react';
import { ALL_SCALES } from '../constants/scales';
import { downloadDataAsFile, uploadDataFromFile } from '../services/storageService';
import type { PracticeData, ConfidenceLevel } from '../types';

type SortKey = 'name' | 'lastPracticed' | 'confidence';

interface StatsScreenProps {
  practiceData: PracticeData;
  onClose: () => void;
  onReset: () => void;
}

const getConfidenceInfo = (confidence?: ConfidenceLevel) => {
  switch (confidence) {
    case 1: return { text: 'Needs Work', className: 'bg-red-600/80 text-white' };
    case 2: return { text: 'Getting There', className: 'bg-yellow-500/80 text-white' };
    case 3: return { text: 'Mastered', className: 'bg-green-600/80 text-white' };
    default: return { text: 'N/A', className: 'bg-gray-600 text-white' };
  }
};

const formatDateAgo = (dateString: string | null): string => {
  if (!dateString) return 'Not yet';
  
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const practiceDate = new Date(date);
  practiceDate.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - practiceDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Today';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};

interface SortButtonProps {
  currentSortKey: SortKey;
  targetSortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  children: React.ReactNode;
}

const SortButton: React.FC<SortButtonProps> = ({ currentSortKey, targetSortKey, setSortKey, children }) => (
  <button
    onClick={() => setSortKey(targetSortKey)}
    className={`px-3 py-1 text-sm rounded-full transition-colors ${
      currentSortKey === targetSortKey ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
    }`}
  >
    {children}
  </button>
);

export const StatsScreen: React.FC<StatsScreenProps> = ({ practiceData, onClose, onReset }) => {
  const [sortKey, setSortKey] = useState<SortKey>('lastPracticed');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    downloadDataAsFile();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const success = await uploadDataFromFile(file);
      if (success) {
        setImportStatus('success');
        setTimeout(() => {
          window.location.reload(); // Reload to reflect imported data
        }, 1500);
      } else {
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    } catch (error) {
      setImportStatus('error');
      setTimeout(() => setImportStatus('idle'), 3000);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sortedScales = useMemo(() => {
    return [...ALL_SCALES].sort((a, b) => {
      const entryA = practiceData[a.name];
      const entryB = practiceData[b.name];
      
      const confidenceA = entryA?.confidence ?? 0;
      const confidenceB = entryB?.confidence ?? 0;
      
      const dateA = entryA?.lastPracticed ? new Date(entryA.lastPracticed).getTime() : 0;
      const dateB = entryB?.lastPracticed ? new Date(entryB.lastPracticed).getTime() : 0;

      switch (sortKey) {
        case 'confidence':
          if (confidenceA !== confidenceB) return confidenceA - confidenceB;
          return a.name.localeCompare(b.name);
        case 'lastPracticed':
          if (dateA !== dateB) return dateB - dateA;
          return a.name.localeCompare(b.name);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [practiceData, sortKey]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-white">Practice History</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            title="Export practice data"
            className="px-3 py-1 text-sm rounded-full transition-colors bg-green-700 hover:bg-green-600 text-white transform hover:scale-105 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button
            onClick={handleImportClick}
            title="Import practice data"
            className="px-3 py-1 text-sm rounded-full transition-colors bg-blue-700 hover:bg-blue-600 text-white transform hover:scale-105 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import
          </button>
          <button
            onClick={onReset}
            title="Reset all practice data"
            className="px-3 py-1 text-sm rounded-full transition-colors bg-red-800 hover:bg-red-700 text-white transform hover:scale-105"
          >
            Reset
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {importStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-600/20 border border-green-500/30 rounded-lg text-center">
          <p className="text-green-300 text-sm">✅ Data imported successfully! Reloading...</p>
        </div>
      )}

      {importStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg text-center">
          <p className="text-red-300 text-sm">❌ Failed to import data. Please check the file format.</p>
        </div>
      )}
      
      <div className="flex justify-center space-x-2 mb-4">
        <SortButton currentSortKey={sortKey} targetSortKey="name" setSortKey={setSortKey}>
          Name
        </SortButton>
        <SortButton currentSortKey={sortKey} targetSortKey="lastPracticed" setSortKey={setSortKey}>
          Recent
        </SortButton>
        <SortButton currentSortKey={sortKey} targetSortKey="confidence" setSortKey={setSortKey}>
          Confidence
        </SortButton>
      </div>
      
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
        {sortedScales.map(scale => {
          const entry = practiceData[scale.name];
          const confidenceInfo = getConfidenceInfo(entry?.confidence);
          return (
            <div key={scale.name} className="bg-gray-900/70 p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{scale.name}</p>
                <p className="text-sm text-gray-400">
                  Last practiced: {formatDateAgo(entry?.lastPracticed ?? null)}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded-full ${confidenceInfo.className}`}>
                {confidenceInfo.text}
              </span>
            </div>
          );
        })}
      </div>
      
      <button
        onClick={onClose}
        className="mt-6 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
      >
        Back to Practice
      </button>
    </>
  );
};
