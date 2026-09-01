import React from 'react';
import { Principle } from '../types';
import { Bookmark, ArrowRight, CheckCircle2, Sparkles, Briefcase, ShoppingBag, GraduationCap, Users } from 'lucide-react';

interface LessonCardProps {
  principle: Principle;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  onOpenDetail: (principle: Principle) => void;
  isCompleted: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  principle,
  isBookmarked,
  onToggleBookmark,
  onOpenDetail,
  isCompleted,
}) => {
  return (
    <article
      id={`lesson-card-${principle.id}`}
      className={`bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
        isCompleted
          ? 'border-[#2D5A43]/40 bg-[#FAFDFC]'
          : 'border-[#E2D8C7] hover:border-[#2D5A43]/40'
      }`}
    >
      <div className="space-y-4">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#2D5A43] text-white flex items-center justify-center font-bold text-xs">
              #{principle.id}
            </span>
            <span className="text-[11px] font-semibold text-[#6B6357] bg-[#F2ECE1] px-2.5 py-0.5 rounded-md">
              Part {principle.partId}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D5A43] bg-[#E8EFEA] px-2 py-0.5 rounded-md">
                <CheckCircle2 className="w-3 h-3" />
                ပြီးစီး
              </span>
            )}
          </div>

          <button
            id={`bookmark-btn-${principle.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(principle.id);
            }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this principle'}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked
                ? 'text-[#C25E3E] bg-[#FBECE7]'
                : 'text-[#8A8174] hover:text-[#2C2926] hover:bg-[#F2ECE1]'
            }`}
            title={isBookmarked ? 'မှတ်သားမှု ပယ်ဖျက်ရန်' : 'နောင်ဖတ်ရန် မှတ်သားမည်'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Titles */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-[#1E3E2E] font-serif-heading leading-snug">
            {principle.title}
          </h3>
          <p className="text-xs text-[#7A7163] italic">
            "{principle.englishTitle}"
          </p>
          <p className="text-xs sm:text-sm text-[#4A4036] line-clamp-2 leading-relaxed">
            {principle.tagline}
          </p>
        </div>

        {/* Action Step Quick Highlight */}
        <div className="bg-[#F8F5EE] rounded-xl p-3 border border-[#EBE4D5] text-xs text-[#3E3831] space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-[#2D5A43]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Action Step</span>
          </div>
          <p className="line-clamp-2 leading-relaxed text-[#5A5245]">
            {principle.actionStep}
          </p>
        </div>

        {/* Context Application Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#E8EFEA] text-[#1E3E2E] px-2 py-0.5 rounded-sm">
            <Briefcase className="w-2.5 h-2.5" /> Business
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#FBECE7] text-[#8C3A21] px-2 py-0.5 rounded-sm">
            <ShoppingBag className="w-2.5 h-2.5" /> Sales
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#E6F0F5] text-[#1C4D6B] px-2 py-0.5 rounded-sm">
            <GraduationCap className="w-2.5 h-2.5" /> Teaching
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#F3EBF7] text-[#4E2F63] px-2 py-0.5 rounded-sm">
            <Users className="w-2.5 h-2.5" /> Leadership
          </span>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="pt-4 mt-4 border-t border-[#F0EAE1]">
        <button
          id={`open-detail-btn-${principle.id}`}
          onClick={() => onOpenDetail(principle)}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F4EFE6] hover:bg-[#2D5A43] text-[#2C2926] hover:text-[#FBF9F5] font-semibold text-xs transition-all group/btn"
        >
          <span>အသေးစိတ်နှင့် လက်တွေ့ဥပမာများ</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
};
