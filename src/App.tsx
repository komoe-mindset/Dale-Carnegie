import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Principle, UserProgress, ContextKey } from './types';
import { ALL_PRINCIPLES, getPrincipleById } from './data/principles';
import { loadProgress, saveProgress, clearAllProgress } from './utils/storage';
import { PODCAST_MP3_URL } from './data/podcast';
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
import { GeminiGemFloatingButton } from './components/GeminiGemFloatingButton';
import { PodcastPlayerModal } from './components/PodcastPlayerModal';
import { Footer } from './components/Footer';

export function App() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [activePrincipleModal, setActivePrincipleModal] = useState<Principle | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [selectedPartFilter, setSelectedPartFilter] = useState<number | null>(null);
  const [selectedContext, setSelectedContext] = useState<ContextKey | 'all'>('all');
  const [activeSection, setActiveSection] = useState<string>('');

  // Podcast Audio Playback State
  const [isPodcastOpen, setIsPodcastOpen] = useState<boolean>(false);
  const [isPodcastMinimized, setIsPodcastMinimized] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenPodcast = () => {
    setIsPodcastOpen(true);
    setIsPodcastMinimized(false);
    if (audioRef.current && !isAudioPlaying) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleChangePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

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

  // Handler for Resetting 30-Day Practice Only (preserves reflections & bookmarks)
  const handleResetPracticeOnly = () => {
    setProgress((prev) => ({
      ...prev,
      completedDays: [],
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Handler for Clearing All App Data
  const handleClearAllData = () => {
    clearAllProgress();
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
      {/* Hidden Audio Element for Global Playback */}
      <audio
        ref={audioRef}
        src={PODCAST_MP3_URL}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
        onEnded={() => setIsAudioPlaying(false)}
      />

      {/* Header */}
      <Header
        progress={progress}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSearch={handleOpenSearch}
        activeSection={activeSection}
        onOpenPodcast={handleOpenPodcast}
        isAudioPlaying={isAudioPlaying}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onSelectPrinciple={(principle) => setActivePrincipleModal(principle)}
          spotlightPrinciple={spotlightPrinciple}
          onOpenPodcast={handleOpenPodcast}
        />

        {/* 2. Book Introduction & Key Lessons */}
        <BookIntroduction onOpenPodcast={handleOpenPodcast} />

        {/* 3. Real-world Application Contexts (Business, Sales, Teaching, Leadership) */}
        <ApplicationOverview
          selectedContext={selectedContext}
          onSelectContext={setSelectedContext}
        />

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
          selectedContext={selectedContext}
          onSelectContext={setSelectedContext}
        />

        {/* 6. 30-Day Habit Practice Plan */}
        <PracticePlan
          progress={progress}
          onToggleCompleted={handleToggleCompleted}
          onResetPracticeOnly={handleResetPracticeOnly}
          onClearAllData={handleClearAllData}
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
      <Footer
        onSelectPart={(partId) => setSelectedPartFilter(partId)}
        onOpenPodcast={handleOpenPodcast}
      />

      {/* Floating Gemini Gem & Podcast Access Buttons */}
      <GeminiGemFloatingButton
        onOpenPodcast={handleOpenPodcast}
        isAudioPlaying={isAudioPlaying}
      />

      {/* Global Podcast Player Modal & Minimized Bar */}
      <PodcastPlayerModal
        isOpen={isPodcastOpen}
        onClose={() => {
          setIsPodcastOpen(false);
          setIsPodcastMinimized(false);
          if (audioRef.current) audioRef.current.pause();
        }}
        isMinimized={isPodcastMinimized}
        onToggleMinimize={() => setIsPodcastMinimized(!isPodcastMinimized)}
        isPlaying={isAudioPlaying}
        onTogglePlay={handleTogglePlay}
        audioRef={audioRef}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        playbackRate={playbackRate}
        onChangePlaybackRate={handleChangePlaybackRate}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

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
          initialContext={selectedContext}
          onOpenPodcast={handleOpenPodcast}
        />
      )}

      {/* Saved Bookmarks Modal Dialog */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIds={progress.bookmarkedPrinciples}
        reflections={progress.reflections}
        onToggleBookmark={handleToggleBookmark}
        onOpenDetail={(principle) => setActivePrincipleModal(principle)}
      />
    </div>
  );
}

export default App;

