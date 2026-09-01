import React from 'react';
import { PARTS } from '../data/parts';
import { Sparkles, HeartHandshake, Lightbulb, Compass, ArrowRight } from 'lucide-react';

interface LearningRoadmapProps {
  onSelectPart: (partId: 1 | 2 | 3 | 4) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ onSelectPart }) => {
  const iconMap: Record<string, typeof Sparkles> = {
    Sparkles,
    HeartHandshake,
    Lightbulb,
    Compass,
  };

  return (
    <section id="roadmap" className="py-16 sm:py-20 bg-[#F5EFE4] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0CF] text-[#4A4036] text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>၄ ပိုင်း သင်ရိုးမြေပုံ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading">
            အဆင့် ၄ ဆင့်ဖြင့် လေ့လာမည့် သင်ရိုးလမ်းညွှန်
          </h2>
          <p className="text-sm sm:text-base text-[#5A5245] leading-relaxed">
            အခြေခံ စိတ်ပညာမှစတင်၍ လူချစ်များစေသော နည်းလမ်းများ၊ အမြင်ညှိနှိုင်းခြင်းနှင့် ခေါင်းဆောင်မှုအထိ စနစ်တကျ ခွဲခြားထားပါသည်။
          </p>
        </div>

        {/* 4 Parts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PARTS.map((part) => {
            const Icon = iconMap[part.iconName] || Sparkles;

            return (
              <div
                key={part.id}
                className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E2D8C7] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#2D5A43]/50 transition-all group"
              >
                <div className="space-y-4">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#E8EFEA] text-[#1E3E2E]">
                      {part.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#2D5A43] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-bold text-[#1E3E2E] font-serif-heading leading-snug">
                      {part.title}
                    </h3>
                    <p className="text-xs text-[#7A7163] mt-1 font-sans line-clamp-1">
                      {part.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5A5245] leading-relaxed line-clamp-3">
                    {part.description}
                  </p>
                </div>

                {/* Card Footer: Principle Count & Link */}
                <div className="pt-5 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C25E3E]">
                    {part.principlesCount} Principles
                  </span>

                  <button
                    id={`roadmap-part-btn-${part.id}`}
                    onClick={() => {
                      onSelectPart(part.id);
                      const el = document.getElementById('lessons');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5A43] hover:text-[#1E3E2E] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>လေ့လာရန်</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
