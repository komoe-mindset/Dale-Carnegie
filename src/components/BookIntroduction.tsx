import React from 'react';
import { BookOpen, Award, Compass, HeartHandshake, ShieldCheck, Sparkles, Check, ExternalLink, Bot, MessageSquare, Headphones, Play } from 'lucide-react';
import { GEMINI_GEM_URL, GEMINI_GEM_INFO } from '../data/geminiGem';
import { PODCAST_MP3_URL, PODCAST_INFO } from '../data/podcast';

interface BookIntroductionProps {
  onOpenPodcast?: () => void;
}

export const BookIntroduction: React.FC<BookIntroductionProps> = ({ onOpenPodcast }) => {
  const keyTakeaways = [
    {
      title: 'လူ့သဘာဝကို နားလည်ခြင်း (Human Psychology)',
      desc: 'လူသားတိုင်းသည် မိမိကိုယ်မိမိ အရေးပါသူအဖြစ် ခံစားလိုကြပြီး အသိအမှတ်ပြုမှုကို ဆာလောင်နေကြကြောင်း သဘောပေါက်ခြင်း။',
    },
    {
      title: 'အငြင်းပွားမှုမရှိဘဲ စည်းရုံးနိုင်ခြင်း (Frictionless Influence)',
      desc: 'အတင်းအကျပ် အမိန့်ပေး ငြင်းခုံမည့်အစား စာနာနားလည်မှုနှင့် မေးခွန်းများဖြင့် တစ်ဖက်သား၏ သဘောတူညီမှုကို ရယူခြင်း။',
    },
    {
      title: 'မနာကျင်စေဘဲ ပြုပြင်ပြောင်းလဲပေးခြင်း (Leadership with Empathy)',
      desc: 'တစ်ဖက်သား၏ ဂုဏ်သိက္ခာကို မထိခိုက်စေဘဲ အမှားများကို သွယ်ဝိုက်ပြုပြင်ပေးပြီး စိတ်ဓာတ်ခွန်အား မြှင့်တင်ပေးခြင်း။',
    },
    {
      title: 'ရေရှည်ခိုင်မြဲသော ဆက်ဆံရေး (Lasting Relationships)',
      desc: 'အပေါ်ယံ မြှောက်ပင့်ခြင်းမဟုတ်ဘဲ နှလုံးသားမှလာသော စစ်မှန်သည့် မေတ္တာနှင့် တန်ဖိုးထားမှုဖြင့် မိတ်ဆွေစစ်များ ပိုင်ဆိုင်လာခြင်း။',
    },
  ];

  return (
    <section id="about-book" className="py-16 sm:py-20 bg-[#F5EFE4] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE0CF] text-[#4A4036] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>မူရင်းစာအုပ်နှင့် သဘောတရား</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading">
            “လူတွေနဲ့ ပိုကောင်းစွာ ဆက်ဆံတတ်ဖို့” စာအုပ်အကြောင်း
          </h2>
          <p className="text-sm sm:text-base text-[#5A5245] leading-relaxed">
            Dale Carnegie ၏ ၁၉၃၆ ခုနှစ်ထုတ် ကမ္ဘာကျော် လူမှုဆက်ဆံရေး လက်စွဲကျမ်းသည် နှစ်ပေါင်း ၉၀ နီးပါးတိုင်အောင်
            ကမ္ဘာတစ်ဝန်းရှိ စီးပွားရေးလုပ်ငန်းရှင်များ၊ ခေါင်းဆောင်များနှင့် လူငယ်များအတွက် အဖိုးမဖြတ်နိုင်သော လမ်းညွှန်ဖြစ်ခဲ့သည်။
          </p>
        </div>

        {/* 2-Column Content: Book Legacy & Core Lessons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Why this book matters */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E2D8C7] shadow-xs space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#F0EAE1]">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center font-bold">
                DC
              </div>
              <div>
                <h3 className="font-serif-heading font-bold text-lg text-[#1E3E2E]">
                  ဒီစာအုပ်က ဘာကြောင့် အရေးကြီးသလဲ
                </h3>
                <p className="text-xs text-[#7A7163]">
                  How to Win Friends and Influence People (1936)
                </p>
              </div>
            </div>

            <p className="text-sm text-[#4A4036] leading-relaxed">
              ကျွန်ုပ်တို့၏ အောင်မြင်မှု ၈၅% သည် နည်းပညာကျွမ်းကျင်မှုထက် <strong>လူမှုဆက်ဆံရေး၊ စကားပြောဆိုဆက်ဆံနိုင်စွမ်းနှင့် ခေါင်းဆောင်မှု</strong> အပေါ်တွင် တည်မှီနေကြောင်း Carnegie Institute of Technology ၏ သုတေသနများက သက်သေပြခဲ့သည်။
            </p>

            <p className="text-sm text-[#4A4036] leading-relaxed">
              ဤပလက်ဖောင်းသည် ထိုစာအုပ်ပါ မူလသဘောတရား ၃၀ ခုကို မြန်မာလူမှုဘဝ၊ လုပ်ငန်းခွင်၊ ကျောင်းနှင့် မိသားစုပတ်ဝန်းကျင်တို့တွင် အလွယ်တကူ သဘောပေါက်ကျင့်သုံးနိုင်စေရန် ခေတ်မီစွာ ရှင်းလင်းတင်ပြထားခြင်း ဖြစ်သည်။
            </p>

            <div className="pt-2 border-t border-[#F0EAE1] flex items-center gap-2 text-xs text-[#5A5245]">
              <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
              <span>အမှီအခိုကင်းသော မြန်မာဘာသာ ပညာရေးဆိုင်ရာ အကျဉ်းချုပ်</span>
            </div>
          </div>

          {/* Right Column: What this book teaches (4 Pillars) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2">
              <h3 className="text-xl font-bold text-[#1E3E2E] font-serif-heading">
                ဒီစာအုပ်က ကျွန်ုပ်တို့အား ဘာတွေ သင်ကြားပေးသလဲ
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6357] mt-1">
                နေ့စဉ် လူမှုဆက်ဆံရေးတွင် သိသိသာသာ ပြောင်းလဲစေမည့် အဓိက အနှစ်သာရများ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyTakeaways.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FFFDF9] rounded-xl p-5 border border-[#E2D8C7] shadow-xs space-y-2 hover:border-[#2D5A43]/40 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#E8EFEA] text-[#2D5A43] flex items-center justify-center text-xs font-bold shrink-0">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-sm text-[#1E3E2E]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#5A5245] leading-relaxed pl-8">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#EAE2D2] rounded-xl p-4 sm:p-5 border border-[#DDD3BF] flex items-start gap-3 mt-4">
              <Sparkles className="w-5 h-5 text-[#C25E3E] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#3E3831] leading-relaxed">
                <strong>ဆရာကြီး Dale Carnegie ၏ အဓိက သတိပေးချက်:</strong> ဤသဘောတရားများသည် အပေါ်ယံ လှည့်စားလိမ်လည်သည့် နည်းပညာများ မဟုတ်ဘဲ၊ စိတ်နှလုံးမှလာသော စစ်မှန်သည့် မေတ္တာနှင့် လေးစားမှုကို အခြေခံသော ဘဝနေထိုင်မှု အနုပညာ ဖြစ်ပါသည်။
              </p>
            </div>
          </div>

        </div>

        {/* Learning Companions: Audio Podcast & Gemini AI */}
        <div className="mt-12 space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C25E3E]" />
            <h3 className="text-base sm:text-lg font-bold text-[#1E3E2E] font-serif-heading">
              လေ့လာသင်ယူမှု အထောက်အကူပြု အရင်းအမြစ်များ (Media & AI Companions)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Podcast MP3 Audio Summary Card */}
            <div className="bg-gradient-to-br from-[#FFFDF9] to-[#F5F9F6] rounded-3xl p-6 sm:p-8 border border-[#CFDFD4] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2ED] text-[#2D5A43] text-xs font-bold border border-[#C5DDCB]">
                    <Headphones className="w-3.5 h-3.5 text-[#2D5A43]" />
                    <span>တရားဝင် Podcast Mp3 (Audio Summary)</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#6B6357] bg-[#FAF7F0] px-2.5 py-0.5 rounded-full border border-[#E8DFC8]">
                    MP3 Audio
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1E3E2E] leading-snug">
                    {PODCAST_INFO.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A5D52] font-medium">
                    {PODCAST_INFO.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                  {PODCAST_INFO.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 pt-1">
                  {PODCAST_INFO.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#3E3831]">
                      <Check className="w-3.5 h-3.5 text-[#2D5A43] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9E7DE] flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenPodcast}
                  id="book-intro-podcast-play-btn"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2D5A43] hover:bg-[#234735] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95 min-h-[44px]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Podcast နားဆင်မည်</span>
                </button>

                <a
                  href={PODCAST_MP3_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="book-intro-podcast-mp3-link"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#F0EAE1] hover:bg-[#E5DDCF] text-[#2C2926] font-semibold text-xs border border-[#D5CBB9] transition-all min-h-[44px]"
                  title="MP3 Link တိုက်ရိုက်ဖွင့်ရန်"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#2D5A43]" />
                  <span>Mp3 Link တိုက်ရိုက်</span>
                </a>
              </div>
            </div>

            {/* Gemini Gem Interactive Companion Showcase */}
            <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF5EB] rounded-3xl p-6 sm:p-8 border border-[#DFCDB9] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBECE7] text-[#8C3A21] text-xs font-bold border border-[#F5C7B7]">
                    <Bot className="w-3.5 h-3.5 text-[#C25E3E]" />
                    <span>သီးသန့် AI သင်ကြားရေး လက်ထောက်</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#8C3A21] bg-[#FDF1ED] px-2.5 py-0.5 rounded-full border border-[#F5C7B7]">
                    Gemini Gem
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1E3E2E] leading-snug">
                    {GEMINI_GEM_INFO.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8C3A21] font-medium">
                    {GEMINI_GEM_INFO.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed">
                  {GEMINI_GEM_INFO.description} စာအုပ်ပါ သဘောတရားများ၏ မူလရည်ရွယ်ချက်နှင့် လက်ရှိအခက်အခဲများကို စိတ်တိုင်းကျ မေးမြန်းနိုင်ပါသည်။
                </p>

                {/* Suggested Questions */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-xs font-bold text-[#6B6357] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#2D5A43]" />
                    <span>နမူနာ မေးခွန်းများ:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {GEMINI_GEM_INFO.suggestedQuestions.slice(0, 2).map((q, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2.5 py-1 rounded-md bg-[#F2ECE1] text-[#3E3831] text-[11px] font-medium border border-[#E5DAC6]"
                      >
                        "{q}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DFC8]">
                <a
                  href={GEMINI_GEM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="book-intro-gemini-gem-btn"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8C3A21] hover:bg-[#732F1A] text-white font-semibold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 min-h-[44px]"
                >
                  <span>Gemini Gem ဖွင့်မည်</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
