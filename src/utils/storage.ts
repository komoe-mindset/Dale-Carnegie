import { UserProgress } from '../types';

const STORAGE_KEY = 'carnegie_myanmar_progress_v1';

export const getDefaultProgress = (): UserProgress => ({
  completedDays: [],
  reflections: {},
  bookmarkedPrinciples: [],
  lastUpdated: new Date().toISOString(),
});

/**
 * Validates and sanitizes integer arrays (e.g. days 1-30, principle IDs 1-30)
 */
const sanitizeIdArray = (arr: unknown, min = 1, max = 30): number[] => {
  if (!Array.isArray(arr)) return [];
  const unique = new Set<number>();
  for (const item of arr) {
    const num = typeof item === 'number' ? item : parseInt(String(item), 10);
    if (!isNaN(num) && Number.isInteger(num) && num >= min && num <= max) {
      unique.add(num);
    }
  }
  return Array.from(unique).sort((a, b) => a - b);
};

/**
 * Validates and sanitizes reflection dictionary (day 1-30 -> string)
 */
const sanitizeReflections = (obj: unknown): Record<number, string> => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};
  const result: Record<number, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const day = parseInt(key, 10);
    if (!isNaN(day) && Number.isInteger(day) && day >= 1 && day <= 30 && typeof value === 'string') {
      result[day] = value;
    }
  }
  return result;
};

/**
 * Loads user progress from localStorage with complete data validation
 */
export const loadProgress = (): UserProgress => {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return getDefaultProgress();
    
    const parsed = JSON.parse(data);
    if (!parsed || typeof parsed !== 'object') return getDefaultProgress();

    return {
      completedDays: sanitizeIdArray(parsed.completedDays, 1, 30),
      reflections: sanitizeReflections(parsed.reflections),
      bookmarkedPrinciples: sanitizeIdArray(parsed.bookmarkedPrinciples, 1, 30),
      lastUpdated: typeof parsed.lastUpdated === 'string' ? parsed.lastUpdated : new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to load progress from localStorage', err);
    return getDefaultProgress();
  }
};

/**
 * Saves sanitized user progress to localStorage
 */
export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    const sanitized: UserProgress = {
      completedDays: sanitizeIdArray(progress.completedDays, 1, 30),
      reflections: sanitizeReflections(progress.reflections),
      bookmarkedPrinciples: sanitizeIdArray(progress.bookmarkedPrinciples, 1, 30),
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
};

/**
 * Resets only completed 30-day practice checkboxes, preserving user reflections & bookmarks
 */
export const resetPracticeDaysOnly = (current: UserProgress): UserProgress => {
  const updated: UserProgress = {
    ...current,
    completedDays: [],
    lastUpdated: new Date().toISOString(),
  };
  saveProgress(updated);
  return updated;
};

/**
 * Completely clears all stored user progress and reset to default
 */
export const clearAllProgress = (): UserProgress => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear progress', err);
    }
  }
  return getDefaultProgress();
};

/**
 * Export user progress as JSON string for backup
 */
export const exportProgressJSON = (progress: UserProgress): string => {
  return JSON.stringify(progress, null, 2);
};

