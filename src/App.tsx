import React, { useState, useEffect, useMemo } from 'react';
import { Principle, UserProgress } from './types';
import { ALL_PRINCIPLES, getPrincipleById } from './data/principles';
import { loadProgress, saveProgress, clearProgress } from './utils/storage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookIntroduction } from './components/BookIntroduction';
import { ApplicationOverview } from './components/ApplicationOverview';
import { LearningRoadmap } from './components/LearningRoadmap';
import { LessonExplorer } from './components/LessonExplorer';
import { LessonDetailModal } from './components/LessonDetailModal';
import { PracticePlan } from './components/PracticePlan';
import { ReflectionSection } from './components/ReflectionSection';
import { BookRecommendationAndDisclaimer } from './components/BookRecommendationAndDisclaimer';
import { BookmarksModal } from './components/BookmarksModal';
import { Footer } from './components/Footer';

export function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [activePrincipleModal, setActivePrincipleModal] = useState<Principle | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [selectedPartFilter, setSelectedPartFilter] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  // Save progress changes to localStorage
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Track active section for header styling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about-book', 'applications', 'roadmap', 'lessons', 'practice-plan', 'reflections'];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute daily spotlight principle (based on day of month, 1-30)
  const spotlightPrinciple = useMemo(() => {
    const dayOfMonth = new Date().getDate();
    const targetId = ((dayOfMonth - 1) % 30) + 1;
    return getPrincipleById(targetId) || ALL_PRINCIPLES[0];
  }, []);

  // Handlers for Bookmark
  const handleToggleBookmark = (id: number) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarkedPrinciples.includes(id);
      const updatedBookmarks = isBookmarked
        ? prev.bookmarkedPrinciples.filter((item) => item !== id)
        : [...prev.bookmarkedPrinciples, id];
      return {
        ...prev,
        bookmarkedPrinciples: updatedBookmarks,
      };
    });
  };

  // Handlers for 30-Day Completion Checkbox
  const handleToggleCompleted = (day: number) => {
    setProgress((prev) => {
      const isDone = prev.completedDays.includes(day);
      const updatedDays = isDone
        ? prev.completedDays.filter((d) => d !== day)
        : [...prev.completedDays, day];
      return {
        ...prev,
        completedDays: updatedDays,
      };
    });
  };

  // Handler for Saving Daily Reflection Notes
  const handleSaveReflection = (day: number, text: string) => {
    setProgress((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [day]: text,
      },
    }));
  };

  // Handler for Reset Progress
  const handleResetProgress = () => {
    clearProgress();
    setProgress({
      completedDays: [],
      reflections: {},
      bookmarkedPrinciples: [],
      lastUpdated: new Date().toISOString(),
    });
  };

  // Navigation handlers within LessonDetailModal
  const handleModalNavigate = (direction: 'prev' | 'next') => {
    if (!activePrincipleModal) return;
    const currentIndex = ALL_PRINCIPLES.findIndex((p) => p.id === activePrincipleModal.id);
    if (direction === 'prev' && currentIndex > 0) {
      setActivePrincipleModal(ALL_PRINCIPLES[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < ALL_PRINCIPLES.length - 1) {
      setActivePrincipleModal(ALL_PRINCIPLES[currentIndex + 1]);
    }
  };

  const handleOpenSearch = () => {
    const el = document.getElementById('lessons');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const searchInput = document.getElementById('lesson-search-input');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 400);
      }
    }
  };

  const currentPrincipleIndex = activePrincipleModal
    ? ALL_PRINCIPLES.findIndex((p) => p.id === activePrincipleModal.id)
    : -1;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2926] flex flex-col font-sans selection:bg-[#2D5A43] selection:text-white">
      {/* Header */}
      <Header
        progress={progress}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSearch={handleOpenSearch}
        activeSection={activeSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onSelectPrinciple={(principle) => setActivePrincipleModal(principle)}
          spotlightPrinciple={spotlightPrinciple}
        />

        {/* 2. Book Introduction & Key Lessons */}
        <BookIntroduction />

        {/* 3. Real-world Application Contexts (Business, Sales, Teaching, Leadership) */}
        <ApplicationOverview />

        {/* 4. Four-Part Learning Roadmap */}
        <LearningRoadmap
          onSelectPart={(partId) => setSelectedPartFilter(partId)}
        />

        {/* 5. 30 Principles Lesson Explorer */}
        <LessonExplorer
          onOpenDetail={(principle) => setActivePrincipleModal(principle)}
          progress={progress}
          onToggleBookmark={handleToggleBookmark}
          selectedPartId={selectedPartFilter}
          onSelectPartId={(partId) => setSelectedPartFilter(partId)}
        />

        {/* 6. 30-Day Habit Practice Plan */}
        <PracticePlan
          progress={progress}
          onToggleCompleted={handleToggleCompleted}
          onResetProgress={handleResetProgress}
          onOpenDetail={(principle) => setActivePrincipleModal(principle)}
        />

        {/* 7. Interactive Daily Reflection & Notes */}
        <ReflectionSection
          progress={progress}
          onSaveReflection={handleSaveReflection}
          onOpenDetail={(principle) => setActivePrincipleModal(principle)}
        />

        {/* 8. Original Book Recommendation & Disclaimer */}
        <BookRecommendationAndDisclaimer />
      </main>

      {/* Footer */}
      <Footer onSelectPart={(partId) => setSelectedPartFilter(partId)} />

      {/* Principle Detail Modal Dialog */}
      {activePrincipleModal && (
        <LessonDetailModal
          principle={activePrincipleModal}
          onClose={() => setActivePrincipleModal(null)}
          onNavigate={handleModalNavigate}
          isBookmarked={progress.bookmarkedPrinciples.includes(activePrincipleModal.id)}
          onToggleBookmark={handleToggleBookmark}
          isCompleted={progress.completedDays.includes(activePrincipleModal.dayPractice.day)}
          onToggleCompleted={handleToggleCompleted}
          userReflection={progress.reflections[activePrincipleModal.dayPractice.day] || ''}
          onSaveReflection={handleSaveReflection}
          hasPrev={currentPrincipleIndex > 0}
          hasNext={currentPrincipleIndex < ALL_PRINCIPLES.length - 1}
        />
      )}

      {/* Saved Bookmarks Modal Dialog */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIds={progress.bookmarkedPrinciples}
        onToggleBookmark={handleToggleBookmark}
        onOpenDetail={(principle) => setActivePrincipleModal(principle)}
      />
    </div>
  );
}

export default App;
