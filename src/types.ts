export type ContextKey = 'business' | 'sales' | 'teaching' | 'leadership';

export interface ContextExample {
  title: string;
  scenario: string;
  advice: string;
  keyTakeaway: string;
}

export interface Principle {
  id: number;
  partId: 1 | 2 | 3 | 4;
  partTitle: string;
  partSubtitle: string;
  partOrder: number;
  title: string;
  englishTitle: string;
  tagline: string;
  coreMeaning: string;
  whyImportant: string;
  realLifeExample: string;
  whatNotToDo: {
    description: string;
    badDialogue: string;
  };
  whatToDo: {
    description: string;
    goodDialogue: string;
  };
  actionStep: string;
  reflectionQuestion: string;
  contexts: Record<ContextKey, ContextExample>;
  dayPractice: {
    day: number;
    activity: string;
    reflectionPrompt: string;
    habitTip: string;
  };
}

export interface PartInfo {
  id: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  description: string;
  principlesCount: number;
  badge: string;
  iconName: string;
}

export interface UserProgress {
  completedDays: number[]; // array of day numbers (1..30)
  reflections: Record<number, string>; // day -> user reflection text
  bookmarkedPrinciples: number[]; // principle IDs
  lastUpdated: string;
}
