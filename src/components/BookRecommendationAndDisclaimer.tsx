import React from 'react';
import { BookOpen, ShieldAlert, Sparkles, ExternalLink, Heart } from 'lucide-react';

export const BookRecommendationAndDisclaimer: React.FC = () => {
  return (
    <section id="disclaimer-section" className="py-14 bg-[#F5EFE4] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Original Book Recommendation */}
          <div className="lg:col-span-6 bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#E2D8C7] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#1E3E2E] text-xs font-semibold">
                <BookOpen className="w-3.5 h-3.5 text-[#2D5A43]" />
                <span>မူရင်းစာအုပ် ဖတ်ရှုရန် တိုက်တွန်းချက်</span>
              </div>
              <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-[#1E3E2E]">
                Dale Carnegie ၏ မူရင်းလက်ရာကို ဖတ်ရှုလေ့လာပါ
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                ဤပလက်ဖောင်းသည် သဘောတရားများကို နေ့စဉ် လျင်မြန်စွာ အသုံးချနိုင်ရန် ပြုစုထားသော သင်ယူရေး အထောက်အကူပြု လမ်းညွှန်သာ ဖြစ်ပါသည်။ မူရင်းစာအုပ်တွင် ပါဝင်သော စိတ်လှုပ်ရှားဖွယ် သမိုင်းဝင်ဖြစ်ရပ်များ၊ အသေးစိတ် ဇာတ်လမ်းများနှင့် အတွေ့အကြုံများကို ပိုမိုနက်ရှိုင်းစွာ ခံစားနိုင်ရန်အတွက် <strong>Dale Carnegie ၏ "How to Win Friends and Influence People"</strong> မူရင်းအင်္ဂလိပ်စာအုပ် သို့မဟုတ် မြန်မာဘာသာပြန် စာအုပ်ကောင်းများကို ဝယ်ယူဖတ်ရှုကြရန် အလေးအနက် တိုက်တွန်းအပ်ပါသည်။
              </p>
            </div>

            <div className="pt-3 border-t border-[#F0EAE1] text-xs text-[#6B6357] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C25E3E]" />
              <span>မြန်မာဘာသာပြန် ဆရာကြီးများ၏ လက်ရာများကို စာအုပ်အရောင်းဆိုင်များတွင် ရရှိနိုင်ပါသည်။</span>
            </div>
          </div>

          {/* Right: Educational Disclaimer */}
          <div className="lg:col-span-6 bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-[#E2D8C7] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBECE7] text-[#8C3A21] text-xs font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C25E3E]" />
                <span>ပညာရေးဆိုင်ရာ ဖော်ပြချက် (Educational Disclaimer)</span>
              </div>
              <h3 className="font-serif-heading font-bold text-lg sm:text-xl text-[#1E3E2E]">
                အမှီအခိုကင်းသော ပညာဒါန သင်ယူလေ့ကျင့်ရေး ပလက်ဖောင်း
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                ဤဝက်ဘ်ဆိုက်သည် Dale Carnegie & Associates နှင့် တရားဝင် ချိတ်ဆက်ထားခြင်း သို့မဟုတ် ပံ့ပိုးထားခြင်း မဟုတ်ပါ။ လူငယ်များ၊ စီးပွားရေးလုပ်ကိုင်သူများနှင့် ဆရာ/ဆရာမများ လူမှုဆက်ဆံရေး စွမ်းရည် တိုးတက်စေရန် ရည်ရွယ်၍ <strong>လေ့လာသင်ယူရေးနှင့် အလေ့အကျင့် မွေးမြူရေး သက်သက်အတွက်သာ</strong> အခမဲ့ ဖန်တီးထားသော အကျဉ်းချုပ် လမ်းညွှန်ဖြစ်ပါသည်။
              </p>
            </div>

            <div className="pt-3 border-t border-[#F0EAE1] text-xs text-[#6B6357] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#2D5A43]" />
              <span>မြန်မာစာဖတ်ပရိသတ်၏ ဘဝတိုးတက်ရေးအတွက် စေတနာဖြင့် ပြုစုပါသည်။</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
