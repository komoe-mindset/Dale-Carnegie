import React, { useState } from 'react';
import { Principle } from '../types';
import { getPrincipleById } from '../data/principles';
import {
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Users,
  ShieldCheck,
  Briefcase,
  HeartHandshake,
} from 'lucide-react';

interface ProblemCategory {
  id: string;
  icon: typeof MessageSquare;
  title: string;
  subtitle: string;
  principleIds: number[];
  badgeColor: string;
  accentBg: string;
}

const PROBLEM_CATEGORIES: ProblemCategory[] = [
  {
    id: 'criticism',
    icon: ShieldCheck,
    title: 'လူတွေကို အပြစ်မတင်ဘဲ စိတ်မဆိုးစေဘဲ ဘယ်လိုပြောရမလဲ?',
    subtitle: 'အပြစ်ရှာမည့်အစား နားလည်မှုပေးပြီး အပြုသဘောဆောင် ပြောဆိုနည်း',
    principleIds: [1, 22, 24],
    badgeColor: '#2D5A43',
    accentBg: '#E8EFEA',
  },
  {
    id: 'engagement',
    icon: Sparkles,
    title: 'ကိုယ့်စကားကို လူတွေ စိတ်ဝင်စားပြီး နားထောင်လာအောင် ဘယ်လိုလုပ်ရမလဲ?',
    subtitle: 'ကိုယ့်အကြောင်းချည်း မဟုတ်ဘဲ သူများစိတ်ဝင်စားတာကို အရင်ဖော်ထုတ်နည်း',
    principleIds: [3, 4, 8],
    badgeColor: '#C25E3E',
    accentBg: '#FBECE7',
  },
  {
    id: 'argument',
    icon: MessageSquare,
    title: 'အငြင်းပွားမှုမဖြစ်ဘဲ ကိုယ့်သဘောထားကို ဘယ်လိုလက်ခံစေမလဲ?',
    subtitle: 'အနိုင်ယူငြင်းခုံမည့်အစား တစ်ဖက်သား သဘောတူလာအောင် ညင်သာစွာ စည်းရုံးနည်း',
    principleIds: [10, 11, 12, 14],
    badgeColor: '#2C5E7A',
    accentBg: '#E6F0F5',
  },
  {
    id: 'clients',
    icon: Briefcase,
    title: 'Customer / Client နဲ့ ဆက်ဆံရေး ပိုမိုခိုင်မာအောင် ဘယ်လိုတည်ဆောက်မလဲ?',
    subtitle: 'အတင်းရောင်းမည့်အစား Customer ကြုံနေရတဲ့ အခက်အခဲကို ကူညီဖြေရှင်းပေးနည်း',
    principleIds: [2, 4, 15, 17],
    badgeColor: '#8C3A21',
    accentBg: '#FCEFE9',
  },
  {
    id: 'leadership-mistakes',
    icon: Users,
    title: 'အဖွဲ့သားတွေကို စိတ်မကွက်စေဘဲ အမှားပြင်ဆင်ပေးချင်တယ်',
    subtitle: 'ဂုဏ်သိက္ခာကို မထိခိုက်စေဘဲ အမှားများကို စေတနာဖြင့် သွယ်ဝိုက်ပြုပြင်ပေးနည်း',
    principleIds: [22, 23, 25, 27],
    badgeColor: '#6B4C82',
    accentBg: '#F3EBF7',
  },
  {
    id: 'friendship',
    icon: HeartHandshake,
    title: 'ကိုယ့်ကိုယ်ကိုယ် စကားပြောရဲတဲ့ သတ္တိနဲ့ မိတ်ဆွေသစ်တွေ တိုးချင်တယ်',
    subtitle: 'နွေးထွေးသောအပြုံး၊ နာမည်မှတ်မိခြင်းနဲ့ ရိုးသားစွာ စိတ်ဝင်စားမှုပြသနည်း',
    principleIds: [5, 6, 7, 9],
    badgeColor: '#2D5A43',
    accentBg: '#E8EFEA',
  },
];

interface ProblemFinderProps {
  onSelectPrinciple: (principle: Principle) => void;
}

export const ProblemFinder: React.FC<ProblemFinderProps> = ({ onSelectPrinciple }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('criticism');

  const activeCategory =
    PROBLEM_CATEGORIES.find((cat) => cat.id === selectedCategoryId) || PROBLEM_CATEGORIES[0];

  const matchedPrinciples = activeCategory.principleIds
    .map((id) => getPrincipleById(id))
    .filter((p): p is Principle => p !== undefined);

  return (
    <section
      id="problem-finder"
      className="py-16 sm:py-20 bg-[#FAF7F0] border-b border-[#EAE0CF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE0CF] text-[#4A4036] text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-[#C25E3E]" />
            <span>လက်တွေ့ အမြန်ရှာဖွေမှု</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading">
            ကိုယ့်ပြဿနာနဲ့ စတင်မယ်
          </h2>
          <p className="text-sm sm:text-base text-[#5A5245] leading-relaxed">
            လက်ရှိ သင်ကြုံတွေ့နေရတဲ့ လူမှုဆက်ဆံရေး အခက်အခဲကို ရွေးချယ်ပြီး အသင့်တော်ဆုံး
            သဘောတရားတွေကို တိုက်ရိုက်ရှာဖွေလိုက်ပါ။
          </p>
        </div>

        {/* 6 Problem Selection Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {PROBLEM_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === selectedCategoryId;

            return (
              <button
                key={cat.id}
                id={`problem-category-btn-${cat.id}`}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-[#FFFDF9] ring-2 ring-[#2D5A43] border-transparent shadow-md scale-[1.01]'
                    : 'bg-[#FFFDF9] hover:bg-[#F5EFE4] border-[#E2D8C7]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: cat.accentBg, color: cat.badgeColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-[15px] text-[#1E3E2E] leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#6B6357] leading-relaxed line-clamp-2">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#8A8174]">
                    သဘောတရား {cat.principleIds.length} ခု
                  </span>
                  <span
                    className={`font-bold inline-flex items-center gap-1 ${
                      isSelected ? 'text-[#2D5A43]' : 'text-[#8A8174]'
                    }`}
                  >
                    <span>{isSelected ? 'ကြည့်ရှုနေသည်' : 'လေ့လာမည်'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Problem Result Box */}
        <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E2D8C7] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0EAE1]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C25E3E]">
                အကြံပြုထားသော သဘောတရားများ
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1E3E2E] font-serif-heading mt-0.5">
                "{activeCategory.title}" အတွက် လေ့ကျင့်သင့်သော အချက်များ
              </h3>
            </div>
            <a
              href="#lessons"
              className="text-xs sm:text-sm font-semibold text-[#2D5A43] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>သဘောတရား (၃၀) လုံး ကြည့်မည်</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Principle Cards Grid for Selected Problem */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {matchedPrinciples.map((principle) => (
              <div
                key={principle.id}
                className="bg-[#FAF7F0] rounded-xl p-5 border border-[#E8E0D2] flex flex-col justify-between hover:border-[#2D5A43]/50 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-[#2D5A43] text-white flex items-center justify-center font-bold text-xs">
                      #{principle.id}
                    </span>
                    <span className="text-xs font-semibold text-[#6B6357] bg-[#EAE0CF] px-2 py-0.5 rounded-md">
                      Part {principle.partId}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-[#1E3E2E] font-serif-heading leading-snug">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-[#7A7163] italic">
                    "{principle.englishTitle}"
                  </p>
                  <p className="text-xs sm:text-sm text-[#4A4036] line-clamp-2 leading-relaxed">
                    {principle.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2D8C7] flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6B6357]">
                    Day {principle.dayPractice.day} လေ့ကျင့်ခန်း
                  </span>
                  <button
                    id={`problem-view-principle-btn-${principle.id}`}
                    onClick={() => onSelectPrinciple(principle)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D5A43] hover:bg-[#234735] text-white text-xs font-semibold shadow-xs min-h-[36px]"
                  >
                    <span>ဖတ်ရှုမည်</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
