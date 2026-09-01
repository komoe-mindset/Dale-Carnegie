import React from 'react';
import { Principle } from '../types';
import { ArrowRight, Calendar, Sparkles, CheckCircle2, BookOpen, HelpCircle } from 'lucide-react';

interface HeroProps {
  onSelectPrinciple: (principle: Principle) => void;
  spotlightPrinciple: Principle;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPrinciple, spotlightPrinciple }) => {
  return (
    <section id="hero-section" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#EFE9DD]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#E8E2D5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE2D2] text-[#4A4036] text-xs sm:text-sm font-semibold tracking-wide border border-[#DDD3BF]">
              <Sparkles className="w-4 h-4 text-[#C25E3E]" />
              <span>Dale Carnegie ၏ လက်တွေ့ လူမှုဆက်ဆံရေး</span>
            </div>

            <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3E2E] tracking-tight leading-[1.25]">
              Dale Carnegie ၏ လူတွေနဲ့ ပိုကောင်းစွာ ဆက်ဆံတတ်ဖို့ လက်တွေ့လမ်းညွှန်
            </h1>

            <p className="text-base sm:text-lg text-[#5A5245] leading-relaxed max-w-2xl font-normal">
              စာအုပ်တစ်အုပ်လုံးကို အလွတ်ကျက်စရာမလိုဘဲ သင့်နေ့စဉ်ဘဝ၊ လုပ်ငန်းခွင် (<span className="font-semibold text-[#1E3E2E]">Business</span>)၊
              အရောင်း (<span className="font-semibold text-[#1E3E2E]">Sales</span>)၊
              သင်ကြားရေး (<span className="font-semibold text-[#1E3E2E]">Teaching</span>) နှင့်
              ခေါင်းဆောင်မှု (<span className="font-semibold text-[#1E3E2E]">Leadership</span>) မှာ
              ချက်ချင်းစသုံးနိုင်မယ့် သဘောတရား (၃၀) လက်တွေ့လမ်းညွှန်။
            </p>

            {/* 3 Quick Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">
              <a
                href="#problem-finder"
                id="hero-problem-finder-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] text-[#FBF9F5] font-semibold text-sm sm:text-base shadow-xs hover:shadow-md transition-all active:scale-95 min-h-[44px]"
              >
                <HelpCircle className="w-4 h-4 text-[#E8EFEA]" />
                <span>ကိုယ့်ပြဿနာနဲ့ စတင်မယ်</span>
              </a>

              <a
                href="#lessons"
                id="hero-explore-lessons-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#F0EAE1] hover:bg-[#E5DDCF] text-[#2C2926] font-semibold text-sm sm:text-base border border-[#D5CBB9] transition-all active:scale-95 min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-[#2D5A43]" />
                <span>သဘောတရား (၃၀) အားလုံး ကြည့်မယ်</span>
              </a>

              <a
                href="#practice-plan"
                id="hero-start-practice-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#F0EAE1] hover:bg-[#E5DDCF] text-[#2C2926] font-semibold text-sm sm:text-base border border-[#D5CBB9] transition-all active:scale-95 min-h-[44px]"
              >
                <Calendar className="w-4 h-4 text-[#C25E3E]" />
                <span>ဒီနေ့အတွက် ၁ ခု စကျင့်မယ်</span>
              </a>
            </div>

            {/* Highlights Pillars */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#EAE2D2]">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-[#1E3E2E] font-serif-heading">၃၀ ခု</p>
                <p className="text-xs text-[#6B6357] font-medium">အဓိက သဘောတရားများ</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-[#1E3E2E] font-serif-heading">၄ ပိုင်း</p>
                <p className="text-xs text-[#6B6357] font-medium">အဆင့်ဆင့် သင်ရိုး</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-[#1E3E2E] font-serif-heading">၄ နယ်ပယ်</p>
                <p className="text-xs text-[#6B6357] font-medium">လက်တွေ့ အသုံးချမှုများ</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-[#1E3E2E] font-serif-heading">၃၀ ရက်</p>
                <p className="text-xs text-[#6B6357] font-medium">အလေ့အကျင့် တည်ဆောက်ခြင်း</p>
              </div>
            </div>
          </div>

          {/* Right Column: Daily Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 shadow-sm border border-[#E2D8C7] transition-all hover:shadow-md">
              {/* Card Ribbon */}
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#F0EAE1]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8EFEA] text-[#2D5A43] flex items-center justify-center font-bold text-xs">
                    #{spotlightPrinciple.id}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C25E3E]">
                      ယနေ့ လက်တွေ့ကျင့်သုံးရန်
                    </span>
                    <p className="text-xs text-[#6B6357]">{spotlightPrinciple.partTitle}</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-[#F2ECE1] text-[#5A5245] px-2.5 py-1 rounded-full">
                  Day {spotlightPrinciple.dayPractice.day}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E3E2E] font-serif-heading leading-snug">
                  {spotlightPrinciple.title}
                </h3>
                <p className="text-xs text-[#7A7163] italic">
                  "{spotlightPrinciple.englishTitle}"
                </p>
                <p className="text-sm text-[#4A4036] line-clamp-2 leading-relaxed">
                  {spotlightPrinciple.tagline}
                </p>
              </div>

              {/* Quick Action Box */}
              <div className="bg-[#F8F5EE] rounded-xl p-4 mb-5 border border-[#EBE4D5] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A43]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A43]" />
                  <span>ဒီနေ့ လက်တွေ့ လုပ်ဆောင်ရန်</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3E3831] leading-relaxed">
                  {spotlightPrinciple.actionStep}
                </p>
              </div>

              {/* Card Footer Button */}
              <button
                id={`spotlight-principle-btn-${spotlightPrinciple.id}`}
                onClick={() => onSelectPrinciple(spotlightPrinciple)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1E3E2E] hover:bg-[#2D5A43] text-[#FBF9F5] font-semibold text-sm transition-colors shadow-xs min-h-[44px]"
              >
                <span>အပြည့်အစုံ ဖတ်မယ်</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
