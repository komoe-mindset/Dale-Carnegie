import React from 'react';
import { Briefcase, ShoppingBag, GraduationCap, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ContextKey } from '../types';

interface ApplicationOverviewProps {
  selectedContext: ContextKey | 'all';
  onSelectContext: (context: ContextKey) => void;
}

export const ApplicationOverview: React.FC<ApplicationOverviewProps> = ({
  selectedContext,
  onSelectContext,
}) => {
  const activeKey: ContextKey = selectedContext === 'all' ? 'business' : selectedContext;

  const contextData: Record<
    ContextKey,
    {
      label: string;
      subLabel: string;
      icon: typeof Briefcase;
      accentColor: string;
      bgLight: string;
      borderColor: string;
      description: string;
      keyPrinciples: string[];
      practicalAdvice: string;
      quote: string;
    }
  > = {
    business: {
      label: 'Business',
      subLabel: 'လုပ်ငန်းခွင်နှင့် စီမံခန့်ခွဲမှု',
      icon: Briefcase,
      accentColor: '#2D5A43',
      bgLight: '#E8EFEA',
      borderColor: '#C5D9CB',
      description: 'လုပ်ဖော်ကိုင်ဖက်များ၊ အထက်လူကြီး၊ ဌာနအချင်းချင်းနှင့် စီမံကိန်းများတွင် ပဋိပက္ခကင်းစင်ပြီး ချောမွေ့သော ပူးပေါင်းဆောင်ရွက်မှု တည်ဆောက်ခြင်း။',
      keyPrinciples: [
        'အမှားကို လူရှေ့တွင် မဆူပူဘဲ Process အခက်အခဲကို ရှာဖွေပါ',
        'အစည်းအဝေးများတွင် တစ်ဖက်သား၏ အကြံပြုချက်ကို လေးစားပါ',
        'ဘုံရည်မှန်းချက်များကို အရင်ဆုံး သဘောတူညီမှု ရယူပါ',
      ],
      practicalAdvice: 'အလုပ်တွင် လူထက် အကြောင်းအရာကို ဦးစားပေးပြီး၊ အဖွဲ့သားတစ်ဦးချင်းစီ၏ အားသာချက်ကို အသိအမှတ်ပြုပါ။',
      quote: '“စီးပွားရေးလုပ်ငန်းတစ်ခု၏ အကြီးမားဆုံး အရင်းအနှီးမှာ ငွေကြေးမဟုတ်ဘဲ လူသားများ၏ ပူးပေါင်းဆောင်ရွက်မှု ဖြစ်သည်။”',
    },
    sales: {
      label: 'Sales',
      subLabel: 'အရောင်းနှင့် Client ဆက်ဆံရေး',
      icon: ShoppingBag,
      accentColor: '#C25E3E',
      bgLight: '#FBECE7',
      borderColor: '#F3CFC4',
      description: 'ကုန်ပစ္စည်းကို အတင်းအကျပ် ရောင်းချမည့်အစား Customer ၏ နာကျင်မှုနှင့် လိုအပ်ချက်ကို စာနာနားလည်ကာ ယုံကြည်စိတ်ချရသော မိတ်ဖက်အဖြစ် ရပ်တည်ခြင်း။',
      keyPrinciples: [
        'Customer စကားများများပြောနိုင်အောင် နားထောင်ပေးပါ',
        'Customer ၏ အမည်နှင့် လိုအပ်ချက်ကို အမြဲမှတ်မိပါ',
        'ကုန်ပစ္စည်းထက် Customer ရရှိမည့် အကျိုးကျေးဇူးကို အဓိကထားပါ',
      ],
      practicalAdvice: 'လူတို့သည် ပစ္စည်းကို အဝယ်မခံချင်ကြပါ၊ မိမိတို့စိတ်ဆန္ဒဖြင့် ဝယ်ယူရခြင်းကိုသာ နှစ်သက်ကြသည်။',
      quote: '“အရောင်းသမားကောင်းသည် ကုန်ပစ္စည်းကို မရောင်းဘဲ Customer အတွက် အဖြေကို ရှာဖွေပေးသူဖြစ်သည်။”',
    },
    teaching: {
      label: 'Teaching',
      subLabel: 'သင်ကြားရေးနှင့် လမ်းညွှန်မှု',
      icon: GraduationCap,
      accentColor: '#2C5E7A',
      bgLight: '#E6F0F5',
      borderColor: '#BDD7E6',
      description: 'ကျောင်းသားများအား အပြစ်တင်ဒဏ်ပေးမည့်အစား သူတို့၏ သေးငယ်သော တိုးတက်မှုတိုင်းကို ချီးကျူးပြီး သင်ယူလိုစိတ်ကို မီးတောက်စေခြင်း။',
      keyPrinciples: [
        'စာမလိုက်နိုင်သော ကလေးကို အပြစ်မတင်ဘဲ စာနာနားလည်ပါ',
        'တိုးတက်မှု အသေးအမွှားကိုပါ တိကျစွာ အသိအမှတ်ပြုပါ',
        'ကျောင်းသားဖြစ်လာနိုင်သည့် ကောင်းမွန်သော ပုံရိပ်ကို ကြိုတင်ပေးပါ',
      ],
      practicalAdvice: 'ဆရာ၏ နွေးထွေးသော အပြုံးနှင့် အသိအမှတ်ပြုမှုသည် ကလေးတစ်ဦး၏ ဘဝတစ်ခုလုံးကို ပြောင်းလဲစေနိုင်သည်။',
      quote: '“ပညာသင်ကြားခြင်းဆိုသည်မှာ ပုံးအလွတ်ထဲသို့ ရေဖြည့်ခြင်းမဟုတ်ဘဲ မီးတောက်ကို မွေးမြူပေးခြင်းဖြစ်သည်။”',
    },
    leadership: {
      label: 'Leadership',
      subLabel: 'ခေါင်းဆောင်မှုနှင့် အသင်းအဖွဲ့',
      icon: Users,
      accentColor: '#6B4C82',
      bgLight: '#F3EBF7',
      borderColor: '#DECCE6',
      description: 'အာဏာပြ အမိန့်ပေးမည့်အစား အဖွဲ့သားများ မိမိတို့ဆန္ဒဖြင့် တက်ကြွပျော်ရွှင်စွာ လုပ်ဆောင်ချင်လာအောင် စံပြအဖြစ် လမ်းပြဦးဆောင်ခြင်း။',
      keyPrinciples: [
        'အမိန့်ပေးမည့်အစား မေးခွန်းများဖြင့် လမ်းပြပါ',
        'အခြားသူ၏ ဂုဏ်သိက္ခာနှင့် မျက်နှာကို အမြဲကာကွယ်ပေးပါ',
        'အခြားသူ၏ အမှားမပြောမီ မိမိအမှားကို အရင်ပြောပါ',
      ],
      practicalAdvice: 'ခေါင်းဆောင်ကောင်းသည် နောက်လိုက်များကို မွေးထုတ်သည်မဟုတ်ဘဲ နောက်ထပ် ခေါင်းဆောင်အသစ်များကို မွေးဖွားပေးသည်။',
      quote: '“ခေါင်းဆောင်မှုဆိုသည်မှာ အခြားသူများအား သူတို့ကိုယ်တိုင် မသိသေးသော စွမ်းရည်များကို မြင်လာအောင် ကူညီပေးခြင်းဖြစ်သည်။”',
    },
  };

  const current = contextData[activeKey];

  return (
    <section id="applications" className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#EFE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D2] text-[#4A4036] text-xs font-semibold">
            <span>လက်တွေ့ နယ်ပယ်များ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading">
            Business, Sales, Teaching & Leadership လက်တွေ့အသုံးချမှု
          </h2>
          <p className="text-sm sm:text-base text-[#5A5245] leading-relaxed">
            သဘောတရား ၃၀ ခုလုံးတွင် အောက်ပါ အဓိက နယ်ပယ် ၄ ခုအတွက် သီးသန့် လက်တွေ့ဥပမာများနှင့် ညွှန်ကြားချက်များ ပါဝင်ပါသည်။
          </p>
        </div>

        {/* 4 Context Selectors / Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8" role="tablist" aria-label="လက်တွေ့နယ်ပယ် ရွေးချယ်မှု">
          {(Object.keys(contextData) as ContextKey[]).map((key) => {
            const item = contextData[key];
            const Icon = item.icon;
            const isSelected = activeKey === key;

            return (
              <button
                key={key}
                id={`context-tab-btn-${key}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`context-panel-${key}`}
                onClick={() => onSelectContext(key)}
                className={`flex flex-col items-start p-4 sm:p-5 rounded-2xl border transition-all text-left min-h-[44px] ${
                  isSelected
                    ? 'bg-[#FFFDF9] shadow-sm ring-2 ring-[#2D5A43] border-transparent'
                    : 'bg-[#F5EFE4] hover:bg-[#EFE7D8] border-[#E2D8C7]'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: item.bgLight,
                    color: item.accentColor,
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1E3E2E]">
                  {item.label}
                </h3>
                <p className="text-xs text-[#6B6357] mt-0.5">
                  {item.subLabel}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Context Card Overview */}
        <div
          id={`context-panel-${activeKey}`}
          role="tabpanel"
          aria-labelledby={`context-tab-btn-${activeKey}`}
          className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E2D8C7] shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: current.bgLight,
                    color: current.accentColor,
                  }}
                >
                  {current.label} လက်တွေ့ အသုံးချနည်း
                </span>
                <span className="text-xs text-[#6B6357] font-medium">{current.subLabel}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1E3E2E] font-serif-heading">
                {current.description}
              </h3>

              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-[#3E3831] uppercase tracking-wider">
                  အဓိက သတိပြုရမည့် အခြေခံစည်းမျဉ်းများ:
                </p>
                {current.keyPrinciples.map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#4A4036]">{principle}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8F4EC] rounded-xl p-6 border border-[#E8E0D2] space-y-4">
              <div>
                <p className="text-xs font-bold text-[#C25E3E] uppercase tracking-wider mb-1">
                  အဓိက အကြံပြုချက်
                </p>
                <p className="text-xs sm:text-sm italic text-[#3E3831] leading-relaxed">
                  {current.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2D8C7]">
                <p className="text-xs sm:text-sm text-[#5A5245] leading-relaxed">
                  <strong>လက်တွေ့ လုပ်ဆောင်ရန်:</strong> {current.practicalAdvice}
                </p>
              </div>

              <a
                href="#lessons"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2D5A43] hover:underline pt-1 min-h-[44px]"
              >
                <span>{current.label} ရှုထောင့်ဖြင့် သဘောတရား ၃၀ လုံး ကြည့်ရှုမည်</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

