import React, { useState, useMemo } from 'react';
import { Principle, UserProgress } from '../types';
import { ALL_PRINCIPLES } from '../data/principles';
import {
  Calendar,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trash2,
} from 'lucide-react';

interface PracticePlanProps {
  progress: UserProgress;
  onToggleCompleted: (day: number) => void;
  onResetPracticeOnly: () => void;
  onClearAllData: () => void;
  onOpenDetail: (principle: Principle) => void;
}

export const PracticePlan: React.FC<PracticePlanProps> = ({
  progress,
  onToggleCompleted,
  onResetPracticeOnly,
  onClearAllData,
  onOpenDetail,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState<'practice' | 'all' | null>(null);

  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const filteredDays = useMemo(() => {
    return ALL_PRINCIPLES.filter((principle) => {
      const dayNum = principle.dayPractice.day;
      const isDone = progress.completedDays.includes(dayNum);

      // Status filter
      if (filterMode === 'completed' && !isDone) return false;
      if (filterMode === 'incomplete' && isDone) return false;

      // Week filter
      if (selectedWeek !== 'all') {
        if (selectedWeek === 1 && (dayNum < 1 || dayNum > 7)) return false;
        if (selectedWeek === 2 && (dayNum < 8 || dayNum > 14)) return false;
        if (selectedWeek === 3 && (dayNum < 15 || dayNum > 21)) return false;
        if (selectedWeek === 4 && (dayNum < 22 || dayNum > 28)) return false;
        if (selectedWeek === 5 && (dayNum < 29 || dayNum > 30)) return false;
      }

      return true;
    });
  }, [filterMode, selectedWeek, progress.completedDays]);

  return (
    <section id="practice-plan" className="py-16 sm:py-20 bg-[#F5EFE4] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0CF] text-[#4A4036] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>၃၀ ရက် လက်တွေ့ အလေ့အကျင့်</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading">
            ၃၀ ရက် အလေ့အကျင့် တည်ဆောက်ရေး အစီအစဉ်
          </h2>
          <p className="text-sm sm:text-base text-[#5A5245] leading-relaxed">
            တစ်နေ့လျှင် သဘောတရားတစ်ခုစီကို လက်တွေ့ကျင့်သုံးပြီး သင့်ဘဝနှင့် လူမှုဆက်ဆံရေးကို အဆင့်မြှင့်တင်ပါ။
          </p>
        </div>

        {/* Progress Dashboard Banner */}
        <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E2D8C7] shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Stats Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C25E3E]">
                  သင်၏ ပြီးမြောက်မှု အခြေအနေ
                </span>
                <span className="text-xs bg-[#E8EFEA] text-[#2D5A43] font-bold px-2.5 py-0.5 rounded-full">
                  {progressPercent}% Complete
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3E2E] font-serif-heading">
                {completedCount} / ၃၀ ရက် ပြီးစီးပါပြီ
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6357]">
                {completedCount === 30
                  ? 'ဂုဏ်ယူပါသည်! သင်သည် ၃၀ ရက် လေ့ကျင့်ခန်းအားလုံးကို အောင်မြင်စွာ ပြီးမြောက်ခဲ့ပါပြီ။'
                  : completedCount > 0
                  ? `နောက်ထပ် ${30 - completedCount} ရက် ဆက်လက် လေ့ကျင့်ရန် ကျန်ရှိပါသေးသည်။`
                  : 'ပထမဆုံးနေ့ (Day 1) လေ့ကျင့်ခန်းမှ စတင်ကာ အလေ့အကျင့် မွေးမြူကြပါစို့။'}
              </p>
            </div>

            {/* Action Tools */}
            <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
              <button
                id="reset-practice-days-btn"
                onClick={() => setShowResetConfirm('practice')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#F5EFE4] hover:bg-[#EAE0CF] text-[#6B6357] hover:text-[#B3261E] text-xs font-semibold border border-[#DDD3BF] transition-colors min-h-[40px]"
                title="၃၀ ရက် လေ့ကျင့်မှု မှတ်တမ်းများကိုသာ အစမှ ပြန်လည်စတင်ရန်"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset 30-Day Practice</span>
              </button>

              <button
                id="clear-all-app-data-btn"
                onClick={() => setShowResetConfirm('all')}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FDF2F0] hover:bg-[#FBE4E1] text-[#B3261E] text-xs font-semibold border border-[#F5C7C2] transition-colors min-h-[40px]"
                title="မှတ်စုများနှင့် Bookmark များအပါအဝင် အားလုံး ရှင်းလင်းရန်"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Data</span>
              </button>
            </div>

          </div>

          {/* Visual Progress Bar with WAI-ARIA */}
          <div className="mt-6 pt-4 border-t border-[#F0EAE1]">
            <div className="flex items-center justify-between text-xs text-[#6B6357] font-medium mb-2">
              <span>စတင်ချိန် (Day 1)</span>
              <span className="font-semibold text-[#1E3E2E]">{completedCount} / 30 Days ({progressPercent}%)</span>
              <span>အောင်မြင်ချိန် (Day 30)</span>
            </div>
            <div
              className="w-full bg-[#EAE2D2] h-3.5 rounded-full overflow-hidden p-0.5"
              role="progressbar"
              aria-valuenow={completedCount}
              aria-valuemin={0}
              aria-valuemax={30}
              aria-label="၃၀ ရက် လေ့ကျင့်ခန်း ပြီးမြောက်မှု အခြေအနေ"
            >
              <div
                className="bg-[#2D5A43] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Controls: Week Selector & Status Tabs */}
        <div className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-[#E2D8C7] mb-6 space-y-4 shadow-xs">
          
          {/* Week Groups */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6B6357] uppercase tracking-wider block">
              ရက်သတ္တပတ်အလိုက် ခွဲခြားလေ့ကျင့်ရန်:
            </label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="ရက်သတ္တပတ် ရွေးချယ်မှု">
              <button
                id="week-filter-all"
                onClick={() => setSelectedWeek('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                  selectedWeek === 'all'
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F5EFE4] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                ရက် ၃၀ လုံး (All)
              </button>
              <button
                id="week-filter-1"
                onClick={() => setSelectedWeek(1)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                  selectedWeek === 1
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F5EFE4] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Week 1 (Day 1-7)
              </button>
              <button
                id="week-filter-2"
                onClick={() => setSelectedWeek(2)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                  selectedWeek === 2
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F5EFE4] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Week 2 (Day 8-14)
              </button>
              <button
                id="week-filter-3"
                onClick={() => setSelectedWeek(3)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                  selectedWeek === 3
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F5EFE4] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Week 3 (Day 15-21)
              </button>
              <button
                id="week-filter-4"
                onClick={() => setSelectedWeek(4)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                  selectedWeek === 4
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F5EFE4] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Week 4 (Day 22-28)
              </button>
              <button
                id="week-filter-5"
                onClick={() => setSelectedWeek(5)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] ${
                  selectedWeek === 5
                    ? 'bg-[#2D5A43] text-white shadow-xs'
                    : 'bg-[#F5EFE4] text-[#5A5245] hover:bg-[#EAE0CF]'
                }`}
              >
                Final (Day 29-30)
              </button>
            </div>
          </div>

          {/* Status Tabs: All, Completed, Incomplete */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0EAE1]">
            <div className="inline-flex p-1 rounded-xl bg-[#EAE0CF] border border-[#DDD3BF]" role="tablist" aria-label="ပြီးစီးမှု အခြေအနေ စစ်ထုတ်မှု">
              <button
                id="practice-filter-all"
                role="tab"
                aria-selected={filterMode === 'all'}
                onClick={() => setFilterMode('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                  filterMode === 'all'
                    ? 'bg-[#FFFDF9] text-[#1E3E2E] shadow-xs'
                    : 'text-[#5A5245] hover:text-[#1E3E2E]'
                }`}
              >
                အားလုံး ({filteredDays.length})
              </button>
              <button
                id="practice-filter-completed"
                role="tab"
                aria-selected={filterMode === 'completed'}
                onClick={() => setFilterMode('completed')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                  filterMode === 'completed'
                    ? 'bg-[#FFFDF9] text-[#2D5A43] shadow-xs'
                    : 'text-[#5A5245] hover:text-[#1E3E2E]'
                }`}
              >
                ပြီးစီးပြီး ({completedCount})
              </button>
              <button
                id="practice-filter-incomplete"
                role="tab"
                aria-selected={filterMode === 'incomplete'}
                onClick={() => setFilterMode('incomplete')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                  filterMode === 'incomplete'
                    ? 'bg-[#FFFDF9] text-[#C25E3E] shadow-xs'
                    : 'text-[#5A5245] hover:text-[#1E3E2E]'
                }`}
              >
                မပြီးသေး ({30 - completedCount})
              </button>
            </div>

            <span className="text-xs text-[#6B6357]">
              ပြသထားသော အရေအတွက်: <strong>{filteredDays.length}</strong> ရက်
            </span>
          </div>

        </div>

        {/* 30-Day Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredDays.map((principle) => {
            const dayNum = principle.dayPractice.day;
            const isCompleted = progress.completedDays.includes(dayNum);

            return (
              <div
                key={principle.id}
                id={`practice-card-day-${dayNum}`}
                className={`bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border transition-all flex flex-col justify-between hover:shadow-md ${
                  isCompleted
                    ? 'border-[#2D5A43]/50 bg-[#FAFDFC]'
                    : 'border-[#E2D8C7]'
                }`}
              >
                <div className="space-y-3.5">
                  {/* Top Day Header & Status */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#E8EFEA] text-[#1E3E2E]">
                      Day {dayNum}
                    </span>

                    <button
                      id={`toggle-day-${dayNum}-btn`}
                      onClick={() => onToggleCompleted(dayNum)}
                      aria-label={`Day ${dayNum} အလေ့အကျင့် ${isCompleted ? 'မပြီးသေးပါသို့ ပြောင်းမည်' : 'ပြီးစီးပါပြီဟု မှတ်သားမည်'}`}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors border min-h-[36px] ${
                        isCompleted
                          ? 'bg-[#2D5A43] text-white border-[#2D5A43]'
                          : 'bg-[#F2ECE1] text-[#5A5245] border-[#DDD3BF] hover:bg-[#EAE0CF]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'ပြီးစီးပါပြီ' : 'မပြီးသေးပါ'}</span>
                    </button>
                  </div>

                  {/* Principle Title */}
                  <div>
                    <h3 className="font-bold text-base text-[#1E3E2E] font-serif-heading leading-snug">
                      {principle.title}
                    </h3>
                    <p className="text-xs text-[#7A7163] italic">
                      Part {principle.partId} • #{principle.id}
                    </p>
                  </div>

                  {/* Practical Activity */}
                  <div className="bg-[#F8F5EE] rounded-xl p-3.5 border border-[#EBE4D5] space-y-1 text-xs">
                    <p className="font-bold text-[#2D5A43] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>လက်တွေ့ လုပ်ဆောင်ရမည့် အလေ့အကျင့်:</span>
                    </p>
                    <p className="text-[#3E3831] leading-relaxed">
                      {principle.dayPractice.activity}
                    </p>
                  </div>

                  {/* Reflection Question */}
                  <div className="text-xs text-[#5A5245] space-y-0.5">
                    <p className="font-semibold text-[#C25E3E]">ကိုယ်တိုင် ပြန်လည်ဆင်ခြင်ရန်:</p>
                    <p className="italic text-[#4A4036] leading-relaxed">
                      "{principle.dayPractice.reflectionPrompt}"
                    </p>
                  </div>
                </div>

                {/* Card Action Link to Full Lesson */}
                <div className="pt-4 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <button
                    id={`practice-open-detail-${principle.id}`}
                    onClick={() => onOpenDetail(principle)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A43] hover:underline min-h-[40px]"
                  >
                    <span>သဘောတရား အပြည့်အစုံ ဖတ်ရှုမည်</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-[#8A8174]">
                    {principle.dayPractice.habitTip}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Confirmation Modal for Reset (Practice only vs Clear all data) */}
        {showResetConfirm && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-confirm-modal-title"
          >
            <div className="bg-[#FFFDF9] max-w-md w-full rounded-2xl p-6 sm:p-7 border border-[#E2D8C7] shadow-2xl space-y-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#FDF2F0] text-[#B3261E] flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1.5">
                <h3 id="reset-confirm-modal-title" className="font-serif-heading font-bold text-lg text-[#1E3E2E]">
                  {showResetConfirm === 'practice'
                    ? '၃၀ ရက် လေ့ကျင့်မှု မှတ်တမ်းများကိုသာ ပြန်စမည်လား'
                    : 'အချက်အလက်အားလုံး (မှတ်စု၊ Bookmark များအပါ) ဖျက်မည်လား'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5245] leading-relaxed">
                  {showResetConfirm === 'practice'
                    ? `လက်ရှိ ပြီးစီးထားသော ${completedCount} ရက်စာ မှတ်တမ်းကို ရှင်းလင်းပြီး Day 1 မှ ပြန်စပါမည်။ သင် ရေးသားထားသော မှတ်စုများနှင့် Bookmark များ မပျက်စီးပါ။`
                    : '၃၀ ရက် လေ့ကျင့်မှု မှတ်တမ်း၊ ရေးသားထားသော မှတ်စုများနှင့် Bookmark အားလုံးကို လုံးဝ ဖျက်ဆီးရှင်းလင်းပါမည်။ ဤလုပ်ဆောင်ချက်ကို ပြန်ပြင်၍ မရနိုင်ပါ။'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0EAE1]">
                <button
                  id="cancel-reset-btn"
                  onClick={() => setShowResetConfirm(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#F5EFE4] hover:bg-[#EAE0CF] text-[#4A4036] transition-colors min-h-[40px]"
                >
                  မလုပ်တော့ပါ
                </button>
                <button
                  id="confirm-reset-btn"
                  onClick={() => {
                    if (showResetConfirm === 'practice') {
                      onResetPracticeOnly();
                    } else {
                      onClearAllData();
                    }
                    setShowResetConfirm(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#B3261E] hover:bg-[#8C1D18] text-white transition-colors shadow-xs min-h-[40px]"
                >
                  သေချာပါသည်၊ ဆက်လုပ်မည်
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

