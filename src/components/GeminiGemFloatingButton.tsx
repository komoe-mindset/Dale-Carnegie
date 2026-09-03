import React, { useState } from 'react';
import { Sparkles, ExternalLink, X, Headphones, Play } from 'lucide-react';
import { GEMINI_GEM_URL } from '../data/geminiGem';

interface GeminiGemFloatingButtonProps {
  onOpenPodcast?: () => void;
  isAudioPlaying?: boolean;
}

export const GeminiGemFloatingButton: React.FC<GeminiGemFloatingButtonProps> = ({
  onOpenPodcast,
  isAudioPlaying = false,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <div
      id="gemini-gem-floating-container"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Podcast Quick Play Floating Button */}
      {onOpenPodcast && (
        <button
          type="button"
          onClick={onOpenPodcast}
          id="floating-podcast-btn"
          className="flex items-center gap-2 px-3.5 py-3 bg-[#244735] hover:bg-[#1C3829] text-[#FBF9F5] rounded-full shadow-lg hover:shadow-xl border border-[#3E6951] transition-all duration-200 active:scale-95 min-h-[48px] focus:outline-hidden"
          aria-label="Dale Carnegie Podcast Mp3 နားဆင်ရန်"
          title="Podcast Mp3: ဝက်ဘ်ဆိုက်နှင့် စာအုပ်အကြောင်း အနှစ်ချုပ် အသံဖိုင် နားဆင်ပါ"
        >
          <div className="w-6 h-6 rounded-full bg-[#1E3E2E] flex items-center justify-center shrink-0 border border-[#3E6951]">
            <Headphones className="w-3.5 h-3.5 text-[#A7CDB9]" />
          </div>
          <span className="text-xs font-bold hidden sm:inline">Podcast Mp3</span>
          {isAudioPlaying && (
            <span className="w-2 h-2 rounded-full bg-[#E58869] animate-pulse" />
          )}
        </button>
      )}

      {/* Gemini Gem Floating Action Button */}
      <a
        href={GEMINI_GEM_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="gemini-gem-floating-btn"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#1E3E2E] hover:bg-[#2D5A43] text-[#FBF9F5] rounded-full shadow-lg hover:shadow-xl border border-[#446E57] transition-all duration-200 active:scale-95 min-h-[48px] focus:outline-hidden focus:ring-3 focus:ring-[#C25E3E]"
        aria-label="Dale Carnegie Gemini Gem AI လမ်းညွှန် ဖွင့်မည်"
        title="Gemini Gem တွင် ဝက်ဘ်ဆိုက်နှင့် စာအုပ်အကြောင်း ဆွေးနွေးမေးမြန်းပါ"
      >
        <div className="w-6 h-6 rounded-full bg-[#C25E3E] flex items-center justify-center shrink-0 shadow-2xs group-hover:rotate-12 transition-transform">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold leading-tight flex items-center gap-1">
            <span>Gemini AI လမ်းညွှန်</span>
            <ExternalLink className="w-3 h-3 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </span>
          <span className="text-[10px] text-[#A7CDB9] leading-none hidden sm:inline">
            စာအုပ်နှင့် ဝက်ဘ်ဆိုက်အကြောင်း မေးမည်
          </span>
        </div>
      </a>

      {/* Dismiss Button */}
      {isHovered && (
        <button
          onClick={() => setIsDismissed(true)}
          className="w-7 h-7 rounded-full bg-[#2C2926]/80 hover:bg-[#2C2926] text-white flex items-center justify-center shadow-md transition-all text-xs"
          title="ဖျောက်ထားမည်"
          aria-label="AI လမ်းညွှန်ခလုတ် ပိတ်မည်"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
