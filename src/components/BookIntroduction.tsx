import React from 'react';
import { BookOpen, Award, Compass, HeartHandshake, ShieldCheck, Sparkles, Check } from 'lucide-react';

export const BookIntroduction: React.FC = () => {
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

      </div>
    </section>
  );
};
