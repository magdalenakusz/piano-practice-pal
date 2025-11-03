import type { PracticeData, ConfidenceLevel } from '../types';

const PRACTICE_DATA_KEY = 'pianoPracticeData';
const DAILY_PRACTICE_KEY = 'dailyPianoPractice';

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

// Practice Data (History)

export function getPracticeData(): PracticeData {
  try {
    const data = localStorage.getItem(PRACTICE_DATA_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to read practice data from localStorage', error);
    return {};
  }
}

export function savePracticeData(data: PracticeData): void {
  try {
    localStorage.setItem(PRACTICE_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to write practice data to localStorage', error);
  }
}

export function updatePracticeData(scaleName: string, confidence: ConfidenceLevel): PracticeData {
  const data = getPracticeData();
  data[scaleName] = {
    lastPracticed: new Date().toISOString(),
    confidence,
  };
  savePracticeData(data);
  return data;
}

// Daily Practice Session

export function getDailyPractice(): string[] | null {
  const todayStr = getTodayDateString();
  try {
    const dailyPracticeRaw = localStorage.getItem(DAILY_PRACTICE_KEY);
    if (dailyPracticeRaw) {
      const dailyPractice = JSON.parse(dailyPracticeRaw);
      if (dailyPractice.date === todayStr && Array.isArray(dailyPractice.scales)) {
        return dailyPractice.scales;
      }
    }
  } catch (error) {
    console.error('Failed to read daily practice from localStorage', error);
  }
  return null;
}

export function saveDailyPractice(scaleNames: string[]): void {
  const todayStr = getTodayDateString();
  const newDailyPractice = {
    date: todayStr,
    scales: scaleNames,
  };
  try {
    localStorage.setItem(DAILY_PRACTICE_KEY, JSON.stringify(newDailyPractice));
  } catch (error) {
    console.error('Failed to write daily practice to localStorage', error);
  }
}

export function clearDailyPractice(): void {
  try {
    localStorage.removeItem(DAILY_PRACTICE_KEY);
  } catch (error) {
    console.error('Failed to clear daily practice from localStorage', error);
  }
}

// Reset

export function clearAllData(): void {
  try {
    localStorage.removeItem(PRACTICE_DATA_KEY);
    localStorage.removeItem(DAILY_PRACTICE_KEY);
  } catch (error) {
    console.error('Failed to reset data from localStorage', error);
  }
}