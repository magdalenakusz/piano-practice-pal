import { ALL_SCALES } from '../constants/scales';
import type { Scale, PracticeData, ScaleTypeSettings } from '../types';

const NUM_DAILY_SCALES = 2;

/**
 * Selects scales for daily practice using a scoring algorithm.
 * 
 * The algorithm prioritizes scales based on:
 * - Confidence level (lower = higher priority)
 * - Time since last practice (longer = higher priority)
 * - Small random factor for variety
 * 
 * Scales with alternative names (enharmonic equivalents) are not duplicated.
 * Only includes scale types that are enabled in user settings.
 */
export function selectNewScales(
  practiceData: PracticeData, 
  enabledScaleTypes: ScaleTypeSettings
): Scale[] {
  const today = new Date();

  // Filter scales based on enabled types
  const availableScales = ALL_SCALES.filter(scale => enabledScaleTypes[scale.type]);

  const scoredScales = availableScales
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

    // Also block the alternative enharmonic name if it exists
    if (scale.altName) {
      pickedScaleNames.add(scale.altName);
    }
  }

  return selectedScales;
}