import { ALL_SCALES, ENHARMONIC_EQUIVALENTS } from '../constants/scales';
import type { Scale, PracticeData } from '../types';

const NUM_DAILY_SCALES = 2;

/**
 * Selects scales for daily practice using a scoring algorithm.
 * 
 * The algorithm prioritizes scales based on:
 * - Confidence level (lower = higher priority)
 * - Time since last practice (longer = higher priority)
 * - Small random factor for variety
 * 
 * Enharmonic equivalents are treated as the same scale to avoid duplication.
 */
export function selectNewScales(practiceData: PracticeData): Scale[] {
  const today = new Date();

  const scoredScales = ALL_SCALES
    .map(scale => {
      const entry = practiceData[scale.name] || { lastPracticed: null, confidence: 1 };
      
      let daysSincePracticed = 999;
      if (entry.lastPracticed) {
        const lastDate = new Date(entry.lastPracticed);
        daysSincePracticed = (today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
      }
      
      const confidenceWeight = (4 - entry.confidence) * 20;
      const recencyWeight = daysSincePracticed;
      const randomFactor = Math.random() * 5;
      
      const score = confidenceWeight + recencyWeight + randomFactor;
      
      return { scale, score };
    })
    .sort((a, b) => b.score - a.score);

  const selectedScales: Scale[] = [];
  const pickedScaleNames = new Set<string>();

  for (const { scale } of scoredScales) {
    if (selectedScales.length >= NUM_DAILY_SCALES) {
      break;
    }
    if (pickedScaleNames.has(scale.name)) {
      continue;
    }

    selectedScales.push(scale);
    pickedScaleNames.add(scale.name);

    const equivalentName = ENHARMONIC_EQUIVALENTS[scale.name];
    if (equivalentName) {
      pickedScaleNames.add(equivalentName);
    }
  }

  return selectedScales;
}