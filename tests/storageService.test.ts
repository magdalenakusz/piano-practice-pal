import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as storage from '../services/storageService';
import type { PracticeData, UserSettings } from '../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// @ts-ignore
global.localStorage = localStorageMock;

describe('Storage Service', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe('Practice Data', () => {
    it('should return empty object when no practice data exists', () => {
      const data = storage.getPracticeData();
      expect(data).toEqual({});
    });

    it('should save and retrieve practice data', () => {
      const practiceData: PracticeData = {
        'C Major': {
          lastPracticed: '2025-11-12T10:00:00.000Z',
          confidence: 2,
        },
      };

      storage.savePracticeData(practiceData);
      const retrieved = storage.getPracticeData();

      expect(retrieved).toEqual(practiceData);
    });

    it('should update practice data for a specific scale', () => {
      const existingData: PracticeData = {
        'C Major': {
          lastPracticed: '2025-11-10T10:00:00.000Z',
          confidence: 1,
        },
      };

      storage.savePracticeData(existingData);

      const updated = storage.updatePracticeData('G Major', 3);

      expect(updated['C Major']).toEqual(existingData['C Major']);
      expect(updated['G Major']).toBeDefined();
      expect(updated['G Major'].confidence).toBe(3);
      expect(updated['G Major'].lastPracticed).toBeDefined();
    });

    it('should handle localStorage errors gracefully when reading', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Override getItem to throw an error
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = () => {
        throw new Error('Storage error');
      };

      const data = storage.getPracticeData();
      
      expect(data).toEqual({});
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      // Restore
      localStorageMock.getItem = originalGetItem;
    });

    it('should handle localStorage errors gracefully when writing', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Override setItem to throw an error
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = () => {
        throw new Error('Storage error');
      };

      storage.savePracticeData({ 'C Major': { lastPracticed: new Date().toISOString(), confidence: 2 } });
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      // Restore
      localStorageMock.setItem = originalSetItem;
    });

    it('should handle invalid JSON gracefully', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.setItem('pianoPracticeData', 'invalid json');
      
      const data = storage.getPracticeData();
      
      expect(data).toEqual({});
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('Daily Practice Session', () => {
    it('should return null when no daily practice exists', () => {
      const daily = storage.getDailyPractice();
      expect(daily).toBeNull();
    });

    it('should save and retrieve daily practice for today', () => {
      const scales = ['C Major', 'G Major'];
      
      storage.saveDailyPractice(scales);
      const retrieved = storage.getDailyPractice();

      expect(retrieved).toEqual(scales);
    });

    it('should return null for daily practice from previous day', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const oldDailyPractice = {
        date: yesterdayStr,
        scales: ['C Major', 'G Major'],
      };

      localStorageMock.setItem('dailyPianoPractice', JSON.stringify(oldDailyPractice));

      const retrieved = storage.getDailyPractice();
      expect(retrieved).toBeNull();
    });

    it('should clear daily practice', () => {
      storage.saveDailyPractice(['C Major', 'G Major']);
      storage.clearDailyPractice();

      const retrieved = storage.getDailyPractice();
      expect(retrieved).toBeNull();
    });

    it('should handle localStorage errors when reading daily practice', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.setItem('dailyPianoPractice', 'invalid json');
      
      const daily = storage.getDailyPractice();
      
      expect(daily).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle localStorage errors when saving daily practice', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Override setItem to throw an error
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = () => {
        throw new Error('Storage error');
      };

      storage.saveDailyPractice(['C Major']);
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      // Restore
      localStorageMock.setItem = originalSetItem;
    });

    it('should handle localStorage errors when clearing daily practice', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Override removeItem to throw an error
      const originalRemoveItem = localStorageMock.removeItem;
      localStorageMock.removeItem = () => {
        throw new Error('Storage error');
      };

      storage.clearDailyPractice();
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      // Restore
      localStorageMock.removeItem = originalRemoveItem;
    });

    it('should return null for invalid daily practice format', () => {
      const invalidData = {
        date: new Date().toISOString().split('T')[0],
        scales: 'not an array', // Invalid format
      };

      localStorageMock.setItem('dailyPianoPractice', JSON.stringify(invalidData));

      const retrieved = storage.getDailyPractice();
      expect(retrieved).toBeNull();
    });
  });

  describe('User Settings', () => {
    it('should return default settings when no saved settings exist', () => {
      const settings = storage.getUserSettings();
      
      expect(settings).toBeDefined();
      expect(settings.enabledScaleTypes).toBeDefined();
      expect(settings.enabledScaleTypes.major).toBe(true);
      expect(settings.enabledScaleTypes['natural-minor']).toBe(false);
      expect(settings.enabledScaleTypes['harmonic-minor']).toBe(true);
      expect(settings.enabledScaleTypes['melodic-minor']).toBe(true);
    });

    it('should save and retrieve user settings', () => {
      const settings: UserSettings = {
        enabledScaleTypes: {
          major: true,
          'natural-minor': true,
          'harmonic-minor': false,
          'melodic-minor': false,
        },
      };

      storage.saveUserSettings(settings);
      const retrieved = storage.getUserSettings();

      expect(retrieved).toEqual(settings);
    });

    it('should merge saved settings with defaults', () => {
      // Save partial settings
      const partialSettings = {
        enabledScaleTypes: {
          major: false,
        },
      };

      localStorageMock.setItem('pianoUserSettings', JSON.stringify(partialSettings));

      const retrieved = storage.getUserSettings();

      // Should have the saved value for major
      expect(retrieved.enabledScaleTypes.major).toBe(false);
      // Should have default values for others
      expect(retrieved.enabledScaleTypes['natural-minor']).toBe(false);
      expect(retrieved.enabledScaleTypes['harmonic-minor']).toBe(true);
      expect(retrieved.enabledScaleTypes['melodic-minor']).toBe(true);
    });

    it('should handle localStorage errors when reading settings', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      localStorageMock.setItem('pianoUserSettings', 'invalid json');
      
      const settings = storage.getUserSettings();
      
      expect(settings.enabledScaleTypes).toBeDefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle localStorage errors when saving settings', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Override setItem to throw an error
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = () => {
        throw new Error('Storage error');
      };

      const settings: UserSettings = {
        enabledScaleTypes: {
          major: true,
          'natural-minor': true,
          'harmonic-minor': true,
          'melodic-minor': true,
        },
      };

      storage.saveUserSettings(settings);
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      // Restore
      localStorageMock.setItem = originalSetItem;
    });
  });

  describe('Reset Functionality', () => {
    it('should clear all data', () => {
      // Set up some data
      storage.savePracticeData({ 'C Major': { lastPracticed: new Date().toISOString(), confidence: 2 } });
      storage.saveDailyPractice(['C Major', 'G Major']);

      // Verify data exists
      expect(storage.getPracticeData()).not.toEqual({});
      expect(storage.getDailyPractice()).not.toBeNull();

      // Clear all
      storage.clearAllData();

      // Verify data is cleared
      expect(storage.getPracticeData()).toEqual({});
      expect(storage.getDailyPractice()).toBeNull();
    });

    it('should handle localStorage errors when clearing all data', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Override removeItem to throw an error
      const originalRemoveItem = localStorageMock.removeItem;
      localStorageMock.removeItem = () => {
        throw new Error('Storage error');
      };

      storage.clearAllData();
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      
      // Restore
      localStorageMock.removeItem = originalRemoveItem;
    });
  });

  describe('Export/Import Functionality', () => {
    it('should export all data including practice data, settings, and daily practice', () => {
      const practiceData: PracticeData = {
        'C Major': {
          lastPracticed: '2025-11-12T10:00:00.000Z',
          confidence: 2,
        },
        'G Major': {
          lastPracticed: '2025-11-11T10:00:00.000Z',
          confidence: 3,
        },
      };

      const settings: UserSettings = {
        enabledScaleTypes: {
          major: true,
          'natural-minor': true,
          'harmonic-minor': false,
          'melodic-minor': false,
        },
      };

      storage.savePracticeData(practiceData);
      storage.saveUserSettings(settings);
      storage.saveDailyPractice(['C Major', 'G Major']);

      const exported = storage.exportAllData();

      expect(exported.version).toBe('1.0');
      expect(exported.exportDate).toBeDefined();
      expect(exported.practiceData).toEqual(practiceData);
      expect(exported.userSettings).toEqual(settings);
      expect(exported.dailyPractice).toBeDefined();
      expect(exported.dailyPractice?.scales).toEqual(['C Major', 'G Major']);
    });

    it('should import all data successfully', () => {
      const exportData = {
        version: '1.0',
        exportDate: '2025-11-12T10:00:00.000Z',
        practiceData: {
          'C Major': {
            lastPracticed: '2025-11-12T10:00:00.000Z',
            confidence: 2 as const,
          },
        },
        userSettings: {
          enabledScaleTypes: {
            major: true,
            'natural-minor': true,
            'harmonic-minor': false,
            'melodic-minor': false,
          },
        },
        dailyPractice: {
          date: new Date().toISOString().split('T')[0],
          scales: ['C Major', 'G Major'],
        },
      };

      const result = storage.importAllData(exportData);

      expect(result).toBe(true);

      const practiceData = storage.getPracticeData();
      expect(practiceData['C Major']).toBeDefined();

      const settings = storage.getUserSettings();
      expect(settings.enabledScaleTypes.major).toBe(true);
      expect(settings.enabledScaleTypes['harmonic-minor']).toBe(false);

      const daily = storage.getDailyPractice();
      expect(daily).toEqual(['C Major', 'G Major']);
    });

    it('should handle invalid import data', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = storage.importAllData(null as any);

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should not import daily practice from previous dates', () => {
      const exportData = {
        version: '1.0',
        exportDate: '2025-11-12T10:00:00.000Z',
        practiceData: {},
        userSettings: {
          enabledScaleTypes: {
            major: true,
            'natural-minor': false,
            'harmonic-minor': true,
            'melodic-minor': true,
          },
        },
        dailyPractice: {
          date: '2025-11-10', // Previous date
          scales: ['C Major', 'G Major'],
        },
      };

      storage.importAllData(exportData);

      const daily = storage.getDailyPractice();
      expect(daily).toBeNull(); // Should not import old daily practice
    });

    it('should handle partial import data gracefully', () => {
      const exportData = {
        version: '1.0',
        exportDate: '2025-11-12T10:00:00.000Z',
        practiceData: {
          'C Major': {
            lastPracticed: '2025-11-12T10:00:00.000Z',
            confidence: 2 as const,
          },
        },
        userSettings: {
          enabledScaleTypes: {
            major: true,
            'natural-minor': false,
            'harmonic-minor': true,
            'melodic-minor': true,
          },
        },
        // No dailyPractice
      };

      const result = storage.importAllData(exportData);

      expect(result).toBe(true);

      const practiceData = storage.getPracticeData();
      expect(practiceData['C Major']).toBeDefined();
    });
  });

  describe('Date Handling', () => {
    it('should correctly identify today\'s date', () => {
      const scales = ['C Major', 'G Major'];
      storage.saveDailyPractice(scales);

      // Retrieve immediately - should be today
      const retrieved = storage.getDailyPractice();
      expect(retrieved).toEqual(scales);
    });

    it('should format dates consistently', () => {
      const now = new Date();
      const expectedFormat = now.toISOString().split('T')[0];

      storage.saveDailyPractice(['C Major']);

      const rawData = localStorageMock.getItem('dailyPianoPractice');
      const parsed = JSON.parse(rawData!);

      expect(parsed.date).toBe(expectedFormat);
      expect(parsed.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
