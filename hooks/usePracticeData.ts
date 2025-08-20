import { useState, useEffect, useCallback } from 'react';
import * as storage from '../services/storageService';
import { selectNewScales } from '../services/practiceService';
import { ALL_SCALES } from '../constants/scales';
import type { Scale, PracticeData, ConfidenceLevel } from '../types';

export interface UsePracticeDataReturn {
    loading: boolean;
    dailyScales: Scale[];
    currentIndex: number;
    isSessionComplete: boolean;
    practiceData: PracticeData;
    handleFeedback: (confidence: ConfidenceLevel) => void;
    reset: () => void;
    startNewSession: () => void;
}

export const usePracticeData = (): UsePracticeDataReturn => {
    const [loading, setLoading] = useState<boolean>(true);
    const [dailyScales, setDailyScales] = useState<Scale[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);
    const [practiceData, setPracticeData] = useState<PracticeData>({});

    const initialize = useCallback(() => {
        setLoading(true);
        const initialPracticeData = storage.getPracticeData();
        setPracticeData(initialPracticeData);

        let scalesForToday: Scale[];
        const savedDaily = storage.getDailyPractice();

        if (savedDaily && savedDaily.length > 0) {
            scalesForToday = savedDaily
                .map((scaleName: string) => ALL_SCALES.find(s => s.name === scaleName))
                .filter((s?: Scale): s is Scale => !!s);
        } else {
            scalesForToday = selectNewScales(initialPracticeData);
            storage.saveDailyPractice(scalesForToday.map(s => s.name));
        }
        
        setDailyScales(scalesForToday);
        setCurrentIndex(0);
        setIsSessionComplete(false); // Reset completion status on initialize
        setLoading(false);
    }, []);

    // Effect to initialize state from localStorage on mount
    useEffect(() => {
        initialize();
    }, [initialize]);

    const handleFeedback = (confidence: ConfidenceLevel) => {
        const currentScale = dailyScales[currentIndex];
        if (!currentScale) return;

        // Update practice data in storage and then in state
        const updatedData = storage.updatePracticeData(currentScale.name, confidence);
        setPracticeData(updatedData);

        const isLastScale = currentIndex >= dailyScales.length - 1;
        if (isLastScale) {
            setIsSessionComplete(true);
            storage.clearDailyPractice(); // Clear daily scales once session is complete
        } else {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const startNewSession = useCallback(() => {
        // This is like a mini-reset for just the daily session
        setLoading(true);
        storage.clearDailyPractice();
        const currentPracticeData = storage.getPracticeData();
        const newScales = selectNewScales(currentPracticeData);
        storage.saveDailyPractice(newScales.map(s => s.name));

        setDailyScales(newScales);
        setCurrentIndex(0);
        setIsSessionComplete(false);
        setLoading(false);
    }, []);
    
    const reset = () => {
        // The only responsibility of this function is to clear the data.
        // The App component will handle reloading the page to get a fresh start.
        storage.clearAllData();
    };

    return {
        loading,
        dailyScales,
        currentIndex,
        isSessionComplete,
        practiceData,
        handleFeedback,
        startNewSession,
        reset,
    };
};