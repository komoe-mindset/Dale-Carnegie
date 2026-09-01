import React, { useState, useEffect, useRef } from 'react';
import { Principle, ContextKey } from '../types';
import {
  X,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Users,
  Sparkles,
  BookOpen,
  Send,
} from 'lucide-react';

interface LessonDetailModalProps {
  principle: Principle | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  isCompleted: boolean;
  onToggleCompleted: (day: number) => void;
  userReflection: string;
  onSaveReflection: (day: number, text: string) => void;
  hasPrev: boolean;
  hasNext: boolean;
  initialContext?: ContextKey | 'all';
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  principle,
  onClose,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  isCompleted,
  onToggleCompleted,
  userReflection,
  onSaveReflection,
  hasPrev,
  hasNext,
  initialContext = 'business',
}) => {
  const getValidContext = (ctx?: string): ContextKey => {
    if (ctx === 'sales' || ctx === 'teaching' || ctx === 'leadership') {
      return ctx;
    }
    return 'business';
  };

  const [activeContext, setActiveContext] = useState<ContextKey>(() => getValidContext(initialContext));
  const [reflectionText, setReflectionText] = useState('');
  const [isSavedToast, setIsSavedToast] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    if (principle) {
      setReflectionText(userReflection || '');
      setActiveContext(getValidContext(initialContext));
    }
  }, [principle, userReflection, initialContext]);

  // Debounced auto-save on typing reflection
  const handleReflectionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setReflectionText(newText);

    if (principle) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        onSaveReflection(principle.dayPractice.day, newText);
      }, 600);
    }
  };

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInputActive = activeTag === 'input' || activeTag === 'textarea';

      if (e.key === 'Escape') {
        onClose();
      } else if (!isInputActive && e.key === 'ArrowLeft' && hasPrev) {
        onNavigate('prev');
      } else if (!isInputActive && e.key === 'ArrowRight' && hasNext) {
        onNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate, hasPrev, hasNext]);

  if (!principle) return null;

  const contextData = principle.contexts[activeContext];

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSaveReflection(principle.dayPractice.day, reflectionText);
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-modal-title"
    >
      {/* Modal Container */}
      <div className="relative bg-[#FBF9F5] w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2D8C7] overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn">
        
        {/* Modal Top Sticky Bar */}
        <div className="sticky top-0 z-20 bg-[#FBF9F5]/95 backdrop-blur-md px-5 py-4 sm:px-8 border-b border-[#EAE2D2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center font-bold text-xs sm:text-sm">
              #{principle.id}
            </span>
            <div>
              <span className="text-[11px] font-bold text-[#C25E3E] uppercase tracking-wider">
                Part {principle.partId} • {principle.partTitle}
              </span>
              <p className="text-xs text-[#7A7163] hidden sm:block">
                {principle.partSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* 30-Day Checkbox Quick Toggle */}
            <button
              id="modal-toggle-complete-btn"
              onClick={() => onToggleCompleted(principle.dayPractice.day)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors border min-h-[40px] ${
                isCompleted
                  ? 'bg-[#E8EFEA] text-[#2D5A43] border-[#C5D9CB]'
                  : 'bg-[#F2ECE1] text-[#5A5245] border-[#DDD3BF] hover:bg-[#EAE0CF]'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#2D5A43]' : 'text-[#8A8174]'}`} />
              <span className="hidden sm:inline">
                {isCompleted ? 'Day ' + principle.dayPractice.day + ' ပြီးစီး' : 'Day ' + principle.dayPractice.day + ' ပြီးပြီ'}
              </span>
            </button>

            {/* Bookmark Toggle */}
            <button
              id="modal-bookmark-btn"
              onClick={() => onToggleBookmark(principle.id)}
              aria-label={isBookmarked ? 'မှတ်သားမှု ပယ်ဖျက်မည်' : 'မှတ်သားမည်'}
              className={`p-2.5 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                isBookmarked
                  ? 'text-[#C25E3E] bg-[#FBECE7]'
                  : 'text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1]'
              }`}
              title={isBookmarked ? 'မှတ်သားမှု ပယ်ဖျက်ရန်' : 'မှတ်သားမည်'}
            >
              <Bookmark className="w-5 h-5 fill-current" />
            </button>

            {/* Close Button */}
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2.5 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Header Title & Tagline */}
          <div className="space-y-2 pb-4 border-b border-[#EAE2D2]">
            <h2
              id="lesson-modal-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading leading-snug"
            >
              {principle.title}
            </h2>
            <p className="text-sm sm:text-base text-[#7A7163] italic">
              Original: "{principle.englishTitle}"
            </p>
            <p className="text-base sm:text-lg text-[#3E3831] font-medium leading-relaxed pt-1">
              {principle.tagline}
            </p>
          </div>

          {/* Section 1: Core Meaning & Why Important */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border border-[#E2D8C7] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#2D5A43] font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>၁။ အဓိက အဓိပ္ပာယ်</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                {principle.coreMeaning}
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border border-[#E2D8C7] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-[#C25E3E] font-bold text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>၂။ ဘာကြောင့် အရေးကြီးသလဲ</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                {principle.whyImportant}
              </p>
            </div>
          </div>

          {/* Section 2: Real-Life Example */}
          <div className="bg-[#F6F0E5] rounded-2xl p-5 sm:p-6 border border-[#E4DAC8] space-y-2">
            <div className="flex items-center gap-2 text-[#1E3E2E] font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#C25E3E]" />
              <span>၃။ လက်တွေ့ဘဝ ဥပမာ</span>
            </div>
            <p className="text-xs sm:text-sm text-[#3E3831] leading-relaxed">
              {principle.realLifeExample}
            </p>
          </div>

          {/* Section 3: Bad vs Good Comparison */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-[#1E3E2E] font-serif-heading">
              ၄။ ပြောဆိုပုံနှင့် ပြုမူပုံ နှိုင်းယှဉ်ချက်
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Bad Approach */}
              <div className="bg-[#FDF2F0] rounded-2xl p-5 border border-[#F5C7C2] space-y-2.5">
                <div className="flex items-center gap-2 text-[#B3261E] font-bold text-xs sm:text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>မလုပ်သင့်သော ပြောဆိုပုံ / လုပ်ရပ်</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C2320] leading-relaxed">
                  {principle.whatNotToDo.description}
                </p>
                <div className="bg-white/80 rounded-xl p-3 border border-[#F5C7C2] text-xs text-[#8C1D18] italic font-medium">
                  {principle.whatNotToDo.badDialogue}
                </div>
              </div>

              {/* Good Approach */}
              <div className="bg-[#EFF8F2] rounded-2xl p-5 border border-[#BCE3C8] space-y-2.5">
                <div className="flex items-center gap-2 text-[#1E5E35] font-bold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ပိုကောင်းသော ပြောဆိုပုံ / လုပ်ရပ်</span>
                </div>
                <p className="text-xs sm:text-sm text-[#18482A] leading-relaxed">
                  {principle.whatToDo.description}
                </p>
                <div className="bg-white/80 rounded-xl p-3 border border-[#BCE3C8] text-xs text-[#16502E] font-medium">
                  {principle.whatToDo.goodDialogue}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Context Applications (Tabs: Business, Sales, Teaching, Leadership) */}
          <div className="bg-[#FFFDF9] rounded-2xl p-5 sm:p-7 border border-[#E2D8C7] space-y-5 shadow-xs">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[#1E3E2E] font-serif-heading">
                ၅။ နယ်ပယ်အလိုက် လက်တွေ့ အသုံးချနည်းများ
              </h3>
              <p className="text-xs text-[#6B6357] mt-0.5">
                အောက်ပါ နယ်ပယ်များကို နှိပ်၍ သက်ဆိုင်ရာ ဥပမာနှင့် အကြံပြုချက်များကို ကြည့်ရှုပါ
              </p>
            </div>

            {/* Context Selector Buttons */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-[#F0EAE1]" role="tablist" aria-label="လက်တွေ့ အသုံးချမှု နယ်ပယ်များ">
              {(
                [
                  { key: 'business', label: 'Business', icon: Briefcase },
                  { key: 'sales', label: 'Sales', icon: ShoppingBag },
                  { key: 'teaching', label: 'Teaching', icon: GraduationCap },
                  { key: 'leadership', label: 'Leadership', icon: Users },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeContext === tab.key;
                return (
                  <button
                    key={tab.key}
                    id={`modal-context-tab-${tab.key}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`modal-context-panel-${tab.key}`}
                    onClick={() => setActiveContext(tab.key)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
                      isActive
                        ? 'bg-[#2D5A43] text-white shadow-xs'
                        : 'bg-[#F2ECE1] text-[#5A5245] hover:bg-[#EAE0CF]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Context Active Content */}
            <div
              id={`modal-context-panel-${activeContext}`}
              role="tabpanel"
              aria-labelledby={`modal-context-tab-${activeContext}`}
              className="space-y-3 bg-[#FAF7F0] p-4 sm:p-5 rounded-xl border border-[#E8E0D2]"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#1E3E2E]">
                  {contextData.title}
                </h4>
                <span className="text-[11px] font-semibold text-[#C25E3E] bg-[#FBECE7] px-2 py-0.5 rounded-sm">
                  {contextData.keyTakeaway}
                </span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-[#3E3831]">
                <p>
                  <strong>ကြုံတွေ့ရမည့် အခြေအနေ:</strong> {contextData.scenario}
                </p>
                <p className="text-[#2D5A43] font-medium">
                  <strong>လက်တွေ့ အကြံပြုချက်:</strong> {contextData.advice}
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Daily Action Step & Reflection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Immediate Action Step */}
            <div className="bg-[#E8EFEA] rounded-2xl p-5 sm:p-6 border border-[#C5D9CB] space-y-2.5">
              <div className="flex items-center gap-2 text-[#1E3E2E] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                <span>၆။ ဒီနေ့ချက်ချင်း လုပ်နိုင်သော Action Step</span>
              </div>
              <p className="text-xs sm:text-sm text-[#234735] leading-relaxed">
                {principle.actionStep}
              </p>
              <div className="pt-2 text-xs font-semibold text-[#1E3E2E]">
                💡 Tip: {principle.dayPractice.habitTip}
              </div>
            </div>

            {/* Reflection Question & Note Taking */}
            <div className="bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border border-[#E2D8C7] space-y-3">
              <div className="flex items-center gap-2 text-[#C25E3E] font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>၇။ ကိုယ်တိုင်စဉ်းစားရန် Reflection</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4036] italic leading-relaxed">
                "{principle.reflectionQuestion}"
              </p>

              {/* Reflection Input */}
              <form onSubmit={handleSaveNote} className="space-y-2 pt-1">
                <label htmlFor={`reflection-input-${principle.id}`} className="sr-only">
                  သင့်ကိုယ်ပိုင် မှတ်စု
                </label>
                <textarea
                  id={`reflection-input-${principle.id}`}
                  value={reflectionText}
                  onChange={handleReflectionChange}
                  placeholder="သင့်အတွေး သို့မဟုတ် လက်တွေ့လုပ်ဆောင်ခဲ့မှုကို ဤနေရာတွင် ရေးမှတ်ပါ..."
                  className="w-full h-20 p-2.5 rounded-xl border border-[#D5CBB9] bg-[#FAF7F0] text-xs text-[#2C2926] focus:outline-hidden focus:ring-2 focus:ring-[#2D5A43] resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between">
                  {isSavedToast ? (
                    <span className="text-xs font-bold text-[#2D5A43] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> မှတ်စု သိမ်းဆည်းပြီးပါပြီ
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#7A7163]">စာရိုက်ပြီးသည်နှင့် အလိုအလျောက် သိမ်းဆည်းပါသည်</span>
                  )}
                  <button
                    type="submit"
                    id={`save-reflection-btn-${principle.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D5A43] hover:bg-[#234735] text-white text-xs font-semibold shadow-xs min-h-[36px]"
                  >
                    <Send className="w-3 h-3" />
                    <span>မှတ်စုသိမ်းမည်</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

        {/* Modal Bottom Navigation Footer */}
        <div className="sticky bottom-0 bg-[#F5EFE4] px-5 py-3.5 sm:px-8 border-t border-[#E8E0D2] flex items-center justify-between">
          <button
            id="modal-prev-principle-btn"
            onClick={() => onNavigate('prev')}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
              hasPrev
                ? 'bg-[#FFFDF9] text-[#2C2926] hover:bg-[#EAE0CF] border border-[#D5CBB9]'
                : 'opacity-40 cursor-not-allowed text-[#8A8174]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ယခင် သဘောတရား</span>
          </button>

          <span className="text-xs font-bold text-[#6B6357]">
            {principle.id} / 30
          </span>

          <button
            id="modal-next-principle-btn"
            onClick={() => onNavigate('next')}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
              hasNext
                ? 'bg-[#2D5A43] text-white hover:bg-[#234735] shadow-xs'
                : 'opacity-40 cursor-not-allowed text-[#8A8174]'
            }`}
          >
            <span>နောက် သဘောတရား</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

