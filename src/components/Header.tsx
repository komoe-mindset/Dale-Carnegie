import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Menu, X, Bookmark, Search, Sparkles, ExternalLink, Headphones } from 'lucide-react';
import { UserProgress } from '../types';
import { GEMINI_GEM_URL } from '../data/geminiGem';
import { PODCAST_MP3_URL } from '../data/podcast';

interface HeaderProps {
  progress: UserProgress;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  activeSection: string;
  onOpenPodcast?: () => void;
  isAudioPlaying?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  onOpenBookmarks,
  onOpenSearch,
  activeSection,
  onOpenPodcast,
  isAudioPlaying = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll state for elevation shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const navLinks = [
    { href: '#about-book', label: 'စာအုပ်အကြောင်း' },
    { href: '#applications', label: 'လက်တွေ့နယ်ပယ်များ' },
    { href: '#roadmap', label: 'သင်ရိုးမြေပုံ' },
    { href: '#lessons', label: 'သဘောတရား (၃၀)' },
    { href: '#practice-plan', label: '၃၀ ရက် လေ့ကျင့်ခန်း' },
    { href: '#reflections', label: 'နေ့စဉ်မှတ်စု' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FBF9F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D5]'
          : 'bg-[#FBF9F5] border-b border-[#EFE9DD]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand / Logo */}
          <a
            href="#"
            id="header-brand-logo"
            className="flex items-center gap-3 group focus:outline-hidden focus:ring-2 focus:ring-[#2D5A43] rounded-lg p-1 min-h-[44px] min-w-[44px]"
            aria-label="ပင်မစာမျက်နှာသို့ သွားမည်"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-[#FBF9F5] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-heading font-bold text-lg sm:text-xl text-[#1E3E2E] leading-tight">
                  လူတွေနဲ့ ပိုကောင်းစွာ ဆက်ဆံတတ်ဖို့
                </span>
                <span className="hidden md:inline-block text-[11px] font-semibold uppercase tracking-wider bg-[#EAE2D2] text-[#4A4036] px-2 py-0.5 rounded-full">
                  Dale Carnegie Guide
                </span>
              </div>
              <p className="text-xs text-[#6B6357] font-medium hidden sm:block">
                လူတွေနဲ့ ပိုကောင်းစွာ ဆက်ဆံတတ်ဖို့ သင်ယူလေ့ကျင့်ရေး ပလက်ဖောင်း
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  id={`nav-link-${link.href.substring(1)}`}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    isActive
                      ? 'text-[#2D5A43] bg-[#E8EFEA] font-semibold'
                      : 'text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Podcast MP3 Button */}
            <button
              id="header-podcast-btn"
              onClick={onOpenPodcast}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#EAEFEA] hover:bg-[#DCE7DC] text-[#1E3E2E] rounded-xl text-xs font-bold transition-all border border-[#C6D8C8] shadow-2xs min-h-[44px]"
              title="Dale Carnegie ၏ စာအုပ်နှင့် ဝက်ဘ်ဆိုက် အနှစ်ချုပ် Podcast နားဆင်ရန်"
            >
              <Headphones className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span className="hidden lg:inline">Podcast အနှစ်ချုပ်</span>
              <span className="lg:hidden">Podcast</span>
              {isAudioPlaying && (
                <span className="w-2 h-2 rounded-full bg-[#2D5A43] animate-pulse" />
              )}
            </button>

            {/* Gemini Gem Button */}
            <a
              href={GEMINI_GEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="header-gemini-gem-btn"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-[#F5EFE4] hover:bg-[#EAE0CF] text-[#8C3A21] hover:text-[#702914] rounded-xl text-xs font-bold transition-all border border-[#DFD3C0] shadow-2xs min-h-[44px]"
              title="Dale Carnegie Gemini Gem AI လမ်းညွှန်ဖြင့် ဆွေးနွေးမေးမြန်းပါ"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C25E3E]" />
              <span className="hidden md:inline">Gemini AI လမ်းညွှန်</span>
              <span className="md:hidden">Gemini</span>
              <ExternalLink className="w-3 h-3 text-[#A86445]" />
            </a>

            {/* Quick Search Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              aria-label="သဘောတရားများ ရှာဖွေပါ"
              className="p-2.5 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="သဘောတရားများ ရှာဖွေရန်"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bookmarked Principles Button */}
            <button
              id="header-bookmarks-btn"
              onClick={onOpenBookmarks}
              aria-label={`သိမ်းဆည်းထားသော သဘောတရားများ ကြည့်မည် (${progress.bookmarkedPrinciples.length} ခု)`}
              className="relative p-2.5 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="သိမ်းဆည်းထားသော သဘောတရားများ"
            >
              <Bookmark className="w-5 h-5" />
              {progress.bookmarkedPrinciples.length > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#C25E3E] ring-2 ring-[#FBF9F5]" />
              )}
            </button>

            {/* Progress Badge */}
            <a
              href="#practice-plan"
              id="header-progress-indicator"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-[#E8EFEA] hover:bg-[#D8E6DC] text-[#1E3E2E] rounded-full text-xs font-semibold transition-colors border border-[#C5D9CB] min-h-[44px]"
              title="၃၀ ရက် လေ့ကျင့်မှု တိုးတက်မှုနှုန်း"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
              <span>{completedCount}/30 ရက် ({progressPercent}%)</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'မီနူးပိတ်မည်' : 'မီနူးဖွင့်မည်'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dropdown"
          className="lg:hidden bg-[#FBF9F5] border-b border-[#E8E2D5] px-4 pt-3 pb-6 shadow-xl transition-all"
        >
          <div className="py-2.5 border-b border-[#EFE9DD] mb-3">
            <div className="flex items-center justify-between text-xs text-[#6B6357] mb-2 font-medium">
              <span>သင်၏ ၃၀ ရက် လေ့ကျင့်မှု</span>
              <span className="font-bold text-[#2D5A43]">{completedCount}/30 ရက် ({progressPercent}%)</span>
            </div>
            <div
              className="w-full bg-[#EAE2D2] h-2 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="၃၀ ရက် လေ့ကျင့်မှု တိုးတက်မှုနှုန်း"
            >
              <div
                className="bg-[#2D5A43] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {/* Podcast Card in Mobile Menu */}
            <button
              id="mobile-nav-podcast-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenPodcast) onOpenPodcast();
              }}
              className="p-3 mb-2 rounded-xl bg-[#EAF2ED] border border-[#BFD9C7] text-[#1E3E2E] shadow-2xs flex items-center justify-between min-h-[48px] text-left w-full"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2D5A43] text-white flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E3E2E]">Dale Carnegie Podcast Mp3 နားဆင်ရန်</p>
                  <p className="text-[11px] text-[#4A5D52]">စာအုပ်နှင့် ဝက်ဘ်ဆိုက် အနှစ်ချုပ် အသံဖိုင်</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2D5A43] px-2 py-1 rounded-md bg-white/70">
                Play
              </span>
            </button>

            <a
              href={GEMINI_GEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="mobile-nav-gemini-gem-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 mb-2 rounded-xl bg-[#FAF6EE] border border-[#DFCDB9] text-[#1E3E2E] shadow-2xs flex items-center justify-between min-h-[48px]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C25E3E] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1E3E2E]">Gemini AI လမ်းညွှန် (Gemini Gem)</p>
                  <p className="text-[11px] text-[#6B6357]">ဝက်ဘ်ဆိုက်နှင့် စာအုပ်အကြောင်း AI ဖြင့် မေးရန်</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#C25E3E] shrink-0" />
            </a>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-3 rounded-xl text-base font-medium text-[#4A4036] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

