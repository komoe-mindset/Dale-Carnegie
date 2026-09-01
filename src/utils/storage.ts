import { UserProgress } from '../types';

const STORAGE_KEY = 'carnegie_myanmar_progress_v1';

export const getDefaultProgress = (): UserProgress => ({
  completedDays: [],
  reflections: {},
  bookmarkedPrinciples: [],
  lastUpdated: new Date().toISOString(),
});

export const loadProgress = (): UserProgress => {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return getDefaultProgress();
    const parsed = JSON.parse(data);
    return {
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
      reflections: parsed.reflections && typeof parsed.reflections === 'object' ? parsed.reflections : {},
      bookmarkedPrinciples: Array.isArray(parsed.bookmarkedPrinciples) ? parsed.bookmarkedPrinciples : [],
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Failed to load progress from localStorage', err);
    return getDefaultProgress();
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    const updated = {
      ...progress,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
};

export const clearProgress = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear progress', err);
  }
};
