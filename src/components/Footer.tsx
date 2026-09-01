import React from 'react';
import { BookOpen, Heart, ArrowUp } from 'lucide-react';
import { PARTS } from '../data/parts';

interface FooterProps {
  onSelectPart: (partId: 1 | 2 | 3 | 4) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPart }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#24211E] text-[#D8D2C6] pt-14 pb-10 border-t border-[#3A3530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Quote */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-heading font-bold text-lg text-[#FBF9F5]">
                  လူတွေနဲ့ ပိုကောင်းစွာ ဆက်ဆံတတ်ဖို့
                </span>
                <p className="text-xs text-[#A89F91]">
                  How to Win Friends and Influence People (Dale Carnegie Guide)
                </p>
              </div>
            </div>

            <div className="bg-[#2C2926] p-4 rounded-xl border border-[#3E3934] space-y-2">
              <p className="text-xs sm:text-sm italic text-[#E5DFD3] leading-relaxed">
                "သင်သည် အခြားသူများ၏ အကျိုးစီးပွားကို ၂ လ စိတ်ဝင်စားပေးရုံဖြင့်၊ အခြားသူများက သင့်ကို ၂ နှစ် စိတ်ဝင်စားလာအောင် ကြိုးစားခြင်းထက် မိတ်ဆွေ ပိုမိုရရှိနိုင်သည်။"
              </p>
              <p className="text-xs text-[#C25E3E] font-semibold text-right">
                — Dale Carnegie (1888–1955)
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-[#FBF9F5] font-serif-heading">
              အဓိက အပိုင်းကဏ္ဍများ
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about-book" className="hover:text-[#FBF9F5] transition-colors">
                  စာအုပ်အကြောင်း
                </a>
              </li>
              <li>
                <a href="#applications" className="hover:text-[#FBF9F5] transition-colors">
                  လက်တွေ့နယ်ပယ်များ (Business, Sales, etc.)
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-[#FBF9F5] transition-colors">
                  ၄ ပိုင်း သင်ရိုးမြေပုံ
                </a>
              </li>
              <li>
                <a href="#lessons" className="hover:text-[#FBF9F5] transition-colors">
                  သဘောတရား (၃၀) စူးစမ်းခန်း
                </a>
              </li>
              <li>
                <a href="#practice-plan" className="hover:text-[#FBF9F5] transition-colors">
                  ၃၀ ရက် လေ့ကျင့်ခန်း
                </a>
              </li>
              <li>
                <a href="#reflections" className="hover:text-[#FBF9F5] transition-colors">
                  နေ့စဉ်မှတ်စုနှင့် သုံးသပ်ချက်များ
                </a>
              </li>
            </ul>
          </div>

          {/* 4 Parts Direct Jump */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-[#FBF9F5] font-serif-heading">
              သင်ရိုး ၄ ပိုင်း
            </h4>
            <div className="space-y-2">
              {PARTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => {
                    onSelectPart(part.id);
                    const el = document.getElementById('lessons');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left p-2.5 rounded-lg bg-[#2C2926] hover:bg-[#38332E] border border-[#3E3934] transition-all group flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#FBF9F5] group-hover:text-[#67B288]">
                      {part.badge}: {part.title}
                    </p>
                    <p className="text-[11px] text-[#A89F91] line-clamp-1">
                      {part.principlesCount} Principles
                    </p>
                  </div>
                  <span className="text-xs text-[#A89F91] group-hover:text-[#FBF9F5]">→</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div className="pt-8 border-t border-[#3A3530] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89F91]">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} လူတွေနဲ့ ပိုကောင်းစွာ ဆက်ဆံတတ်ဖို့ လမ်းညွှန်။</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              မြန်မာစာဖတ်သူများအတွက် <Heart className="w-3 h-3 text-[#C25E3E] fill-current" /> ဖြင့် ဖန်တီးထားပါသည်။
            </span>
          </div>

          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2C2926] hover:bg-[#38332E] text-[#D8D2C6] hover:text-[#FBF9F5] transition-colors border border-[#3E3934]"
          >
            <span>ထိပ်ဆုံးသို့ ပြန်သွားမည်</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
