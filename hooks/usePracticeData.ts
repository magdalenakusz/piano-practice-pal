import { useState, useEffect, useCallback } from 'react';
import * as storage from '../services/storageService';
import { selectNewScales } from '../services/practiceService';
import { ALL_SCALES } from '../constants/scales';
import type { Scale, PracticeData, ConfidenceLevel, UserSettings } from '../types';

export interface UsePracticeDataReturn {
  loading: boolean;
  dailyScales: Scale[];
  currentIndex: number;
  isSessionComplete: boolean;
  practiceData: PracticeData;
  userSettings: UserSettings;
  handleFeedback: (confidence: ConfidenceLevel) => void;
  reset: () => void;
  startNewSession: () => void;
  updateSettings: (settings: UserSettings) => void;
}

export const usePracticeData = (): UsePracticeDataReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dailyScales, setDailyScales] = useState<Scale[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);
  const [practiceData, setPracticeData] = useState<PracticeData>({});
  const [userSettings, setUserSettings] = useState<UserSettings>({ 
    enabledScaleTypes: { major: true, 'natural-minor': true, 'harmonic-minor': false, 'melodic-minor': false }
  });

  const initialize = useCallback(() => {
    setLoading(true);
    const initialPracticeData = storage.getPracticeData();
    const initialSettings = storage.getUserSettings();
    setPracticeData(initialPracticeData);
    setUserSettings(initialSettings);

    let scalesForToday: Scale[];
    const savedDaily = storage.getDailyPractice();

    if (savedDaily && savedDaily.length > 0) {
      scalesForToday = savedDaily
        .map((scaleName: string) => ALL_SCALES.find(s => s.name === scaleName))
        .filter((s?: Scale): s is Scale => !!s);
    } else {
      scalesForToday = selectNewScales(initialPracticeData, initialSettings.enabledScaleTypes);
      storage.saveDailyPractice(scalesForToday.map(s => s.name));
    }
    
    setDailyScales(scalesForToday);
    setCurrentIndex(0);
    setIsSessionComplete(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleFeedback = (confidence: ConfidenceLevel) => {
    const currentScale = dailyScales[currentIndex];
    if (!currentScale) return;

    const updatedData = storage.updatePracticeData(currentScale.name, confidence);
    setPracticeData(updatedData);

    const isLastScale = currentIndex >= dailyScales.length - 1;
    if (isLastScale) {
      setIsSessionComplete(true);
      storage.clearDailyPractice();
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const startNewSession = useCallback(() => {
    setLoading(true);
    storage.clearDailyPractice();
    const currentPracticeData = storage.getPracticeData();
    const currentSettings = storage.getUserSettings();
    const newScales = selectNewScales(currentPracticeData, currentSettings.enabledScaleTypes);
    storage.saveDailyPractice(newScales.map(s => s.name));

    setDailyScales(newScales);
    setCurrentIndex(0);
    setIsSessionComplete(false);
    setLoading(false);
  }, []);
  
  const reset = () => {
    storage.clearAllData();
  };

  const updateSettings = (settings: UserSettings) => {
    storage.saveUserSettings(settings);
    setUserSettings(settings);
    // Clear daily practice to force new selection with new settings
    storage.clearDailyPractice();
  };

  return {
    loading,
    dailyScales,
    currentIndex,
    isSessionComplete,
    practiceData,
    userSettings,
    handleFeedback,
    startNewSession,
    reset,
    updateSettings,
  };
};