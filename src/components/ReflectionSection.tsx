import React, { useState, useEffect } from 'react';
import { UserProgress, Principle } from '../types';
import { ALL_PRINCIPLES } from '../data/principles';
import { Edit3, Send, CheckCircle2, Copy, Download, Trash2, BookOpen } from 'lucide-react';

interface ReflectionSectionProps {
  progress: UserProgress;
  onSaveReflection: (day: number, text: string) => void;
  onOpenDetail: (principle: Principle) => void;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  progress,
  onSaveReflection,
  onOpenDetail,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [inputText, setInputText] = useState<string>(progress.reflections[1] || '');
  const [copiedToast, setCopiedToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Sync inputText if progress.reflections changes from another source (e.g. modal)
  useEffect(() => {
    setInputText(progress.reflections[selectedDay] || '');
  }, [selectedDay, progress.reflections]);

  const selectedPrinciple = ALL_PRINCIPLES.find((p) => p.dayPractice.day === selectedDay) || ALL_PRINCIPLES[0];

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setInputText(progress.reflections[day] || '');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveReflection(selectedDay, inputText);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleDeleteSingleReflection = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveReflection(day, '');
    if (selectedDay === day) {
      setInputText('');
    }
  };

  const recordedEntries = Object.entries(progress.reflections).filter(
    ([_, text]) => typeof text === 'string' && text.trim() !== ''
  ) as [string, string][];

  const generateExportText = () => {
    let summary = '===================================================\n';
    summary += 'Dale Carnegie လူတွေနဲ့ ပိုကောင်းစွာ ဆက်ဆံတတ်ဖို့ - လေ့ကျင့်ရေး မှတ်စုများ\n';
    summary += `ရက်စွဲ: ${new Date().toLocaleDateString()}\n`;
    summary += '===================================================\n\n';

    recordedEntries.forEach(([dayStr, note]) => {
      const day = parseInt(dayStr, 10);
      const p = ALL_PRINCIPLES.find((item) => item.dayPractice.day === day);
      if (p) {
        summary += `[Day ${day}] ${p.title} (${p.englishTitle})\n`;
        summary += `ဆင်ခြင်ရန် မေးခွန်း: "${p.reflectionQuestion}"\n`;
        summary += `ကျွန်ုပ်၏ အတွေးအမြင်/လက်တွေ့မှတ်စု:\n${note}\n\n`;
        summary += '---------------------------------------------------\n\n';
      }
    });

    return summary;
  };

  const handleCopyToClipboard = () => {
    const summary = generateExportText();
    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleDownloadTextFile = () => {
    const summary = generateExportText();
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Dale_Carnegie_Reflections_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="reflections" className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#EFE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE2D2] text-[#4A4036] text-xs font-semibold">
            <Edit3 className="w-3.5 h-3.5 text-[#2D5A43]" />
            <span>ကိုယ်ပိုင် ဆင်ခြင်သုံးသပ်ချက်</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3E2E] font-serif-heading">
            နေ့စဉ် မှတ်စုနှင့် အတွေးအမြင်များ
          </h2>
          <p className="text-sm sm:text-base text-[#5A5245] leading-relaxed">
            စာဖတ်ပြီးနောက် မိမိကိုယ်တိုင် ကြုံတွေ့ခဲ့ရသော အခြေအနေများနှင့် လက်တွေ့ပြောင်းလဲမှုများကို မှတ်တမ်းတင်ထားပါ။
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Reflection Editor */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E2D8C7] shadow-xs space-y-6">
            
            {/* Day Selector dropdown */}
            <div className="space-y-2">
              <label htmlFor="reflection-day-select" className="text-xs font-bold text-[#6B6357] uppercase tracking-wider block">
                လေ့ကျင့်ရေးနေ့ကို ရွေးချယ်ပါ:
              </label>
              <select
                id="reflection-day-select"
                value={selectedDay}
                onChange={(e) => handleSelectDay(parseInt(e.target.value, 10))}
                className="w-full p-3.5 rounded-xl border border-[#D5CBB9] bg-[#FAF7F0] text-sm text-[#2C2926] font-medium focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden min-h-[44px]"
              >
                {ALL_PRINCIPLES.map((p) => (
                  <option key={p.id} value={p.dayPractice.day}>
                    Day {p.dayPractice.day}: {p.title} (#{p.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt for selected principle */}
            <div className="bg-[#F8F5EE] rounded-xl p-4 sm:p-5 border border-[#EBE4D5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C25E3E]">
                  Day {selectedDay} ဆင်ခြင်သုံးသပ်ရန် မေးခွန်း:
                </span>
                <button
                  id={`read-principle-btn-${selectedPrinciple.id}`}
                  onClick={() => onOpenDetail(selectedPrinciple)}
                  className="text-xs font-semibold text-[#2D5A43] hover:underline inline-flex items-center gap-1 min-h-[36px]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>သဘောတရားဖတ်မည် →</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#3E3831] italic leading-relaxed">
                "{selectedPrinciple.reflectionQuestion}"
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSave} className="space-y-3">
              <label htmlFor="reflection-textarea" className="text-xs font-bold text-[#4A4036] block">
                သင့်ကိုယ်ပိုင် မှတ်စု / သုံးသပ်ချက်:
              </label>
              <textarea
                id="reflection-textarea"
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="ဥပမာ- ဒီနေ့ လုပ်ဖော်ကိုင်ဖက်တစ်ဦးကို အပြစ်တင်မည့်အစား စာနာနားလည်ပေးခဲ့သည်..."
                className="w-full p-4 rounded-xl border border-[#D5CBB9] bg-[#FAF7F0] text-sm text-[#2C2926] focus:ring-2 focus:ring-[#2D5A43] focus:outline-hidden resize-none leading-relaxed"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {savedToast ? (
                  <span className="text-xs font-bold text-[#2D5A43] flex items-center gap-1.5 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4" /> မှတ်စု သိမ်းဆည်းပြီးပါပြီ
                  </span>
                ) : (
                  <span className="text-[11px] text-[#7A7163]">
                    {progress.reflections[selectedDay] ? 'ယခင် ရေးသားထားသော မှတ်စု ရှိပါသည်' : 'မှတ်စု မရေးရသေးပါ'}
                  </span>
                )}

                <button
                  type="submit"
                  id="submit-reflection-btn"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>မှတ်စု သိမ်းမည်</span>
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: Saved Reflections Journal Overview */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E2D8C7] shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0EAE1]">
              <div>
                <h3 className="font-serif-heading font-bold text-base text-[#1E3E2E]">
                  သိမ်းဆည်းထားသော မှတ်စုများ ({recordedEntries.length})
                </h3>
                <p className="text-xs text-[#7A7163]">သင်၏ ကိုယ်ပိုင် သင်ယူမှု မှတ်တမ်းများ</p>
              </div>

              {recordedEntries.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <button
                    id="download-all-reflections-btn"
                    onClick={handleDownloadTextFile}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F5EFE4] hover:bg-[#EAE0CF] text-[#4A4036] text-xs font-semibold border border-[#DDD3BF] transition-colors min-h-[36px]"
                    title="Text ဖိုင်ဖြင့် သိမ်းဆည်းရန်"
                    aria-label="မှတ်စုအားလုံး Text ဖိုင်ဖြင့် Download ရယူမည်"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    id="copy-all-reflections-btn"
                    onClick={handleCopyToClipboard}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F5EFE4] hover:bg-[#EAE0CF] text-[#4A4036] text-xs font-semibold border border-[#DDD3BF] transition-colors min-h-[36px]"
                    title="မှတ်စုအားလုံး ကူးယူရန်"
                    aria-label="မှတ်စုအားလုံး ကူးယူမည်"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedToast ? 'ကူးယူပြီး' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* List of recorded notes */}
            {recordedEntries.length === 0 ? (
              <div className="py-8 text-center space-y-2 text-[#7A7163]">
                <Edit3 className="w-8 h-8 mx-auto text-[#C5BBAA]" />
                <p className="text-xs sm:text-sm">
                  မှတ်စုများ မရှိသေးပါ။ ဘယ်ဘက်မှ လေ့ကျင့်ရေးနေ့ကို ရွေးချယ်၍ သင်၏ အတွေးအမြင်များကို စတင် ရေးသားနိုင်ပါသည်။
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
                {recordedEntries.map(([dayStr, text]) => {
                  const day = parseInt(dayStr, 10);
                  const p = ALL_PRINCIPLES.find((item) => item.dayPractice.day === day);
                  if (!p) return null;

                  return (
                    <div
                      key={day}
                      onClick={() => handleSelectDay(day)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                        selectedDay === day
                          ? 'bg-[#E8EFEA] border-[#2D5A43]/40'
                          : 'bg-[#F9F6F0] hover:bg-[#F2ECE1] border-[#E8E0D2]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#1E3E2E]">
                          Day {day} • {p.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-[#7A7163]">ပြင်ဆင်ရန်</span>
                          <button
                            onClick={(e) => handleDeleteSingleReflection(day, e)}
                            className="text-[#B3261E] hover:text-[#8C1D18] p-1 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity"
                            title={`Day ${day} မှတ်စု ဖျက်မည်`}
                            aria-label={`Day ${day} မှတ်စု ဖျက်မည်`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#4A4036] line-clamp-2 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

