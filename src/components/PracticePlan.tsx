import React, { useState, useMemo } from 'react';
import { Principle, UserProgress } from '../types';
import { ALL_PRINCIPLES } from '../data/principles';
import {
  Calendar,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  AlertCircle,
  X,
} from 'lucide-react';

interface PracticePlanProps {
  progress: UserProgress;
  onToggleCompleted: (day: number) => void;
  onResetProgress: () => void;
  onOpenDetail: (principle: Principle) => void;
}

export const PracticePlan: React.FC<PracticePlanProps> = ({
  progress,
  onToggleCompleted,
  onResetProgress,
  onOpenDetail,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  const filteredDays = useMemo(() => {
    return ALL_PRINCIPLES.filter((principle) => {
      const isDone = progress.completedDays.includes(principle.dayPractice.day);
      if (filterMode === 'completed') return isDone;
      if (filterMode === 'incomplete') return !isDone;
      return true;
    });
  }, [filterMode, progress.completedDays]);

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
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                id="reset-practice-progress-btn"
                onClick={() => setShowResetConfirm(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F5EFE4] hover:bg-[#EAE0CF] text-[#6B6357] hover:text-[#B3261E] text-xs font-semibold border border-[#DDD3BF] transition-colors"
                title="လေ့ကျင့်မှု မှတ်တမ်းများကို အစမှ ပြန်လည်စတင်ရန်"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Progress</span>
              </button>
            </div>

          </div>

          {/* Visual Progress Bar */}
          <div className="mt-6 pt-4 border-t border-[#F0EAE1]">
            <div className="flex items-center justify-between text-xs text-[#6B6357] font-medium mb-2">
              <span>စတင်ချိန် (Day 1)</span>
              <span>အောင်မြင်ချိန် (Day 30)</span>
            </div>
            <div className="w-full bg-[#EAE2D2] h-3.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-[#2D5A43] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 2)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs: All, Completed, Incomplete */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex p-1 rounded-xl bg-[#EAE0CF] border border-[#DDD3BF]">
            <button
              id="practice-filter-all"
              onClick={() => setFilterMode('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-[#FFFDF9] text-[#1E3E2E] shadow-xs'
                  : 'text-[#5A5245] hover:text-[#1E3E2E]'
              }`}
            >
              အားလုံး (၃၀)
            </button>
            <button
              id="practice-filter-completed"
              onClick={() => setFilterMode('completed')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'completed'
                  ? 'bg-[#FFFDF9] text-[#2D5A43] shadow-xs'
                  : 'text-[#5A5245] hover:text-[#1E3E2E]'
              }`}
            >
              ပြီးစီးပြီး ({completedCount})
            </button>
            <button
              id="practice-filter-incomplete"
              onClick={() => setFilterMode('incomplete')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'incomplete'
                  ? 'bg-[#FFFDF9] text-[#C25E3E] shadow-xs'
                  : 'text-[#5A5245] hover:text-[#1E3E2E]'
              }`}
            >
              မပြီးသေး ({30 - completedCount})
            </button>
          </div>

          <span className="text-xs text-[#6B6357] hidden sm:inline">
            ပြသထားသည်: <strong>{filteredDays.length}</strong> ရက်
          </span>
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
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5A43] hover:underline"
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

        {/* Confirmation Modal for Reset Progress */}
        {showResetConfirm && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-[#FFFDF9] max-w-md w-full rounded-2xl p-6 sm:p-7 border border-[#E2D8C7] shadow-2xl space-y-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#FDF2F0] text-[#B3261E] flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1.5">
                <h3 className="font-serif-heading font-bold text-lg text-[#1E3E2E]">
                  လေ့ကျင့်မှု မှတ်တမ်းများကို ဖျက်လိုပါသလား
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5245] leading-relaxed">
                  လက်ရှိ ပြီးစီးထားသော {completedCount} ရက်စာ မှတ်တမ်းအားလုံးကို ရှင်းလင်းပြီး Day 1 သို့ အစမှ ပြန်လည် စတင်ပါမည်။ ဤလုပ်ဆောင်ချက်ကို ပြန်ပြင်၍ မရနိုင်ပါ။
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0EAE1]">
                <button
                  id="cancel-reset-btn"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5EFE4] hover:bg-[#EAE0CF] text-[#4A4036] transition-colors"
                >
                  မလုပ်တော့ပါ
                </button>
                <button
                  id="confirm-reset-btn"
                  onClick={() => {
                    onResetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#B3261E] hover:bg-[#8C1D18] text-white transition-colors shadow-xs"
                >
                  သေချာပါသည်၊ အစမှပြန်စမည်
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
