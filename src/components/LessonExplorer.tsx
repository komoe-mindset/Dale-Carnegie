import React, { useState, useMemo } from 'react';
import { Principle, ContextKey, UserProgress } from '../types';
import { ALL_PRINCIPLES } from '../data/principles';
import { LessonCard } from './LessonCard';
import { Search, Filter, BookOpen, X, Sparkles, Layers } from 'lucide-react';

interface LessonExplorerProps {
  onOpenDetail: (principle: Principle) => void;
  progress: UserProgress;
  onToggleBookmark: (id: number) => void;
  selectedPartId: number | null;
  onSelectPartId: (partId: number | null) => void;
  selectedContext: ContextKey | 'all';
  onSelectContext: (context: ContextKey | 'all') => void;
}

export const LessonExplorer: React.FC<LessonExplorerProps> = ({
  onOpenDetail,
  progress,
  onToggleBookmark,
  selectedPartId,
  onSelectPartId,
  selectedContext,
  onSelectContext,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrinciples = useMemo(() => {
    return ALL_PRINCIPLES.filter((principle) => {
      // Filter by Part
      if (selectedPartId !== null && principle.partId !== selectedPartId) {
        return false;
      }

      // Filter by Search Query (Title, keywords, english title, meaning, contexts)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = principle.title.toLowerCase().includes(query);
        const englishMatch = principle.englishTitle.toLowerCase().includes(query);
        const meaningMatch = principle.coreMeaning.toLowerCase().includes(query);
        const taglineMatch = principle.tagline.toLowerCase().includes(query);
        const actionMatch = principle.actionStep.toLowerCase().includes(query);
        const exampleMatch = principle.realLifeExample.toLowerCase().includes(query);
        const badMatch = principle.whatNotToDo.description.toLowerCase().includes(query) ||
                         principle.whatNotToDo.badDialogue.toLowerCase().includes(query);
        const betterMatch = principle.whatToDo.description.toLowerCase().includes(query) ||
                            principle.whatToDo.goodDialogue.toLowerCase().includes(query);
        const reflectionMatch = principle.reflectionQuestion.toLowerCase().includes(query);
        const habitMatch = principle.dayPractice.activity.toLowerCase().includes(query) ||
                           principle.dayPractice.reflectionPrompt.toLowerCase().includes(query) ||
                           principle.dayPractice.habitTip.toLowerCase().includes(query);
        const idMatch = principle.id.toString() === query || `day ${principle.dayPractice.day}`.includes(query);

        // check context content
        const businessMatch = principle.contexts.business.scenario.toLowerCase().includes(query) ||
                              principle.contexts.business.advice.toLowerCase().includes(query) ||
                              principle.contexts.business.keyTakeaway.toLowerCase().includes(query);
        const salesMatch = principle.contexts.sales.scenario.toLowerCase().includes(query) ||
                           principle.contexts.sales.advice.toLowerCase().includes(query) ||
                           principle.contexts.sales.keyTakeaway.toLowerCase().includes(query);
        const teachingMatch = principle.contexts.teaching.scenario.toLowerCase().includes(query) ||
                              principle.contexts.teaching.advice.toLowerCase().includes(query) ||
                              principle.contexts.teaching.keyTakeaway.toLowerCase().includes(query);
        const leadershipMatch = principle.contexts.leadership.scenario.toLowerCase().includes(query) ||
                                principle.contexts.leadership.advice.toLowerCase().includes(query) ||
                                principle.contexts.leadership.keyTakeaway.toLowerCase().includes(query);

        return (
          titleMatch ||
          englishMatch ||
          meaningMatch ||
          taglineMatch ||
          actionMatch ||
          exampleMatch ||
          badMatch ||
          betterMatch ||
          reflectionMatch ||
          habitMatch ||
          idMatch ||
          businessMatch ||
          salesMatch ||
          teachingMatch ||
          leadershipMatch
        );
      }

      return true;
    });
  }, [selectedPartId, searchQuery]);

  const clearAllFilters = () => {
    setSearchQuery('');
    onSelectContext('all');
    onSelectPartId(null);
  };

  return (
    <section id="lessons" className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#EFE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D2] text-[#4A4036] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>သဘောတရား စူးစမ်းရှာဖွေခန်း</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading">
            Dale Carnegie သဘောတရား (၃၀) အပြည့်အစုံ
          </h2>
          <p className="text-sm sm:text-base text-[#5A5245] leading-relaxed">
            မိမိလေ့လာလိုသော သဘောတရား၊ စကားလုံး သို့မဟုတ် နယ်ပယ်အလိုက် ရှာဖွေလေ့လာနိုင်ပါသည်။
          </p>
        </div>

        {/* Search & Filter Controls Container */}
        <div className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-6 border border-[#E2D8C7] shadow-xs mb-8 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A8174]">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="lesson-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="သဘောတရား ခေါင်းစဉ်၊ မြန်မာစကားလုံး၊ Business, Sales စသည်ဖြင့် ရှာဖွေပါ..."
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#D5CBB9] bg-[#FAF7F0] text-sm text-[#2C2926] placeholder-[#8A8174] focus:outline-hidden focus:ring-2 focus:ring-[#2D5A43]"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8A8174] hover:text-[#2C2926]"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-[#F0EAE1]">
            
            {/* Part Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-thin">
              <span className="text-xs font-bold text-[#6B6357] shrink-0 mr-1">
                အပိုင်းများ:
              </span>
              <button
                id="filter-part-all"
                onClick={() => onSelectPartId(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedPartId === null
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F2ECE1] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                အားလုံး (၃၀)
              </button>
              <button
                id="filter-part-1"
                onClick={() => onSelectPartId(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedPartId === 1
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F2ECE1] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Part 1 (၃ ခု)
              </button>
              <button
                id="filter-part-2"
                onClick={() => onSelectPartId(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedPartId === 2
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F2ECE1] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Part 2 (၆ ခု)
              </button>
              <button
                id="filter-part-3"
                onClick={() => onSelectPartId(3)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedPartId === 3
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F2ECE1] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Part 3 (၁၂ ခု)
              </button>
              <button
                id="filter-part-4"
                onClick={() => onSelectPartId(4)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedPartId === 4
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F2ECE1] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Part 4 (၉ ခု)
              </button>
            </div>

            {/* Context Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0" role="tablist" aria-label="လက်တွေ့နယ်ပယ် ရှုထောင့် ရွေးချယ်မှု">
              <span className="text-xs font-bold text-[#6B6357] shrink-0 mr-1">
                နယ်ပယ်:
              </span>
              {(
                [
                  { key: 'all', label: 'အားလုံး' },
                  { key: 'business', label: 'Business' },
                  { key: 'sales', label: 'Sales' },
                  { key: 'teaching', label: 'Teaching' },
                  { key: 'leadership', label: 'Leadership' },
                ] as const
              ).map((ctx) => (
                <button
                  key={ctx.key}
                  id={`filter-context-${ctx.key}`}
                  role="tab"
                  aria-selected={selectedContext === ctx.key}
                  onClick={() => onSelectContext(ctx.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors min-h-[36px] ${
                    selectedContext === ctx.key
                      ? 'bg-[#1E3E2E] text-white font-semibold shadow-xs'
                      : 'bg-[#F5EFE4] text-[#5A5245] hover:bg-[#EFE7D8]'
                  }`}
                >
                  {ctx.label}
                </button>
              ))}
            </div>

          </div>

          {/* Results Summary Count */}
          <div className="flex items-center justify-between text-xs text-[#6B6357] pt-1">
            <span>
              ရလဒ် စုစုပေါင်း <strong>{filteredPrinciples.length}</strong> ခု တွေ့ရှိပါသည်
            </span>
            {(selectedPartId !== null || selectedContext !== 'all' || searchQuery !== '') && (
              <button
                id="reset-all-filters-btn"
                onClick={clearAllFilters}
                className="text-[#C25E3E] font-semibold hover:underline"
              >
                Filter အားလုံး ပယ်ဖျက်မည်
              </button>
            )}
          </div>

        </div>

        {/* Empty State when no lessons found */}
        {filteredPrinciples.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-2xl p-10 sm:p-14 text-center border border-[#E2D8C7] space-y-4 max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FBECE7] text-[#C25E3E] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif-heading font-bold text-lg text-[#1E3E2E]">
                ကိုက်ညီသော သဘောတရား မတွေ့ရှိပါ
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6357] leading-relaxed">
                "{searchQuery}" နှင့် ပတ်သက်သော သင်ခန်းစာ မတွေ့ပါ။ အခြား စကားလုံးဖြင့် ရှာဖွေပါ သို့မဟုတ် Filter များကို ပြန်လည်ရှင်းလင်းပါ။
              </p>
            </div>
            <button
              id="empty-state-reset-btn"
              onClick={clearAllFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2D5A43] text-white text-xs font-semibold hover:bg-[#234735] shadow-xs min-h-[44px]"
            >
              <span>မူလအတိုင်း အားလုံး ပြန်ကြည့်မည်</span>
            </button>
          </div>
        ) : (
          /* Principles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrinciples.map((principle) => {
              const isCompleted = progress.completedDays.includes(principle.dayPractice.day);
              const isBookmarked = progress.bookmarkedPrinciples.includes(principle.id);

              return (
                <LessonCard
                  key={principle.id}
                  principle={principle}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={onToggleBookmark}
                  onOpenDetail={onOpenDetail}
                  isCompleted={isCompleted}
                  activeContext={selectedContext}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
