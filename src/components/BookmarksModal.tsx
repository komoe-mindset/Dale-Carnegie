import React, { useState } from 'react';
import { Principle } from '../types';
import { ALL_PRINCIPLES } from '../data/principles';
import { useModalFocus } from '../hooks/useModalFocus';
import { X, Bookmark, ArrowRight, Trash2, FileText, Sparkles } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIds: number[];
  reflections?: Record<number, string>;
  onToggleBookmark: (id: number) => void;
  onOpenDetail: (principle: Principle) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedIds,
  reflections = {},
  onToggleBookmark,
  onOpenDetail,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');

  const modalRef = useModalFocus({
    isOpen,
    onClose,
  });

  if (!isOpen) return null;

  const bookmarkedPrinciples = ALL_PRINCIPLES.filter((p) =>
    bookmarkedIds.includes(p.id)
  );

  const notesList = Object.entries(reflections)
    .filter(([_, text]) => typeof text === 'string' && text.trim().length > 0)
    .map(([dayStr, text]) => {
      const day = parseInt(dayStr, 10);
      const principle = ALL_PRINCIPLES.find((p) => p.dayPractice.day === day) || ALL_PRINCIPLES.find((p) => p.id === day);
      return {
        day,
        principle,
        text: String(text),
      };
    })
    .filter((item): item is { day: number; principle: Principle; text: string } => item.principle !== undefined);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookmarks-modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-[#FBF9F5] w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2D8C7] overflow-hidden flex flex-col max-h-[85vh] animate-fadeIn"
      >
        {/* Header */}
        <div className="bg-[#FBF9F5] px-6 py-4 border-b border-[#EAE2D2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FBECE7] text-[#C25E3E] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 id="bookmarks-modal-title" className="font-serif-heading font-bold text-base sm:text-lg text-[#1E3E2E]">
                သိမ်းဆည်းထားသော အကြောင်းအရာများ
              </h3>
              <p className="text-xs text-[#7A7163]">
                မှတ်သားထားသော သင်ခန်းစာများနှင့် ရေးသားထားသော မှတ်စုများ
              </p>
            </div>
          </div>

          <button
            id="close-bookmarks-modal-btn"
            onClick={onClose}
            aria-label="ပိတ်မည်"
            className="p-2 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 pb-2 bg-[#F5EFE4] border-b border-[#E8E0D2] flex gap-2" role="tablist">
          <button
            id="tab-saved-bookmarks"
            role="tab"
            aria-selected={activeTab === 'bookmarks'}
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
              activeTab === 'bookmarks'
                ? 'bg-[#2D5A43] text-white shadow-xs'
                : 'bg-[#EAE0CF] text-[#5A5245] hover:bg-[#DFD4C1]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>မှတ်သားထားသော သင်ခန်းစာများ ({bookmarkedPrinciples.length})</span>
          </button>

          <button
            id="tab-saved-notes"
            role="tab"
            aria-selected={activeTab === 'notes'}
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] ${
              activeTab === 'notes'
                ? 'bg-[#2D5A43] text-white shadow-xs'
                : 'bg-[#EAE0CF] text-[#5A5245] hover:bg-[#DFD4C1]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>ရေးသားထားသော မှတ်စုများ ({notesList.length})</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3">
          {activeTab === 'bookmarks' && (
            <>
              {bookmarkedPrinciples.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Bookmark className="w-10 h-10 mx-auto text-[#C5BBAA]" />
                  <p className="text-sm text-[#5A5245] font-medium">
                    မှတ်သားထားသော သင်ခန်းစာ မရှိသေးပါ။
                  </p>
                  <p className="text-xs text-[#7A7163]">
                    သင်ခန်းစာကတ်များပေါ်ရှိ Bookmark ခလုတ်ကို နှိပ်၍ အချိန်မရွေး သိမ်းဆည်းထားနိုင်ပါသည်။
                  </p>
                </div>
              ) : (
                bookmarkedPrinciples.map((principle) => (
                  <div
                    key={principle.id}
                    className="bg-[#FFFDF9] rounded-xl p-4 border border-[#E2D8C7] flex items-center justify-between gap-4 hover:border-[#2D5A43]/40 transition-all"
                  >
                    <div
                      className="cursor-pointer flex-1"
                      onClick={() => {
                        onClose();
                        onOpenDetail(principle);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-md bg-[#2D5A43] text-white flex items-center justify-center font-bold text-xs">
                          #{principle.id}
                        </span>
                        <span className="text-xs font-semibold text-[#C25E3E]">
                          Part {principle.partId}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1E3E2E] hover:text-[#2D5A43]">
                        {principle.title}
                      </h4>
                      <p className="text-xs text-[#7A7163] italic">
                        "{principle.englishTitle}"
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenDetail(principle);
                        }}
                        className="px-3 py-2 text-[#2D5A43] hover:bg-[#E8EFEA] rounded-lg transition-colors text-xs font-semibold flex items-center gap-1 min-h-[40px]"
                      >
                        <span>ဖတ်ရန်</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onToggleBookmark(principle.id)}
                        className="p-2 text-[#B3261E] hover:bg-[#FDF2F0] rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                        title="ဖျက်ရန်"
                        aria-label={`သဘောတရား #${principle.id} မှတ်သားမှု ဖျက်မည်`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'notes' && (
            <>
              {notesList.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <FileText className="w-10 h-10 mx-auto text-[#C5BBAA]" />
                  <p className="text-sm text-[#5A5245] font-medium">
                    ရေးထားသော မှတ်စု မရှိသေးပါ။
                  </p>
                  <p className="text-xs text-[#7A7163]">
                    သင်ခန်းစာ အသေးစိတ်ထဲတွင် သင့်အတွေးနှင့် လက်တွေ့လုပ်ဆောင်မှုများကို ရေးမှတ်ထားနိုင်ပါသည်။
                  </p>
                </div>
              ) : (
                notesList.map((item) => (
                  <div
                    key={item.day}
                    className="bg-[#FFFDF9] rounded-xl p-4 border border-[#E2D8C7] space-y-2 hover:border-[#2D5A43]/40 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#E8EFEA] text-[#1E3E2E] font-bold text-xs">
                          Day {item.day}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-[#1E3E2E]">
                          {item.principle.title}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenDetail(item.principle);
                        }}
                        className="text-xs font-semibold text-[#2D5A43] hover:underline flex items-center gap-1 min-h-[36px]"
                      >
                        <span>ကြည့်ရှု / ပြင်ဆင်ရန်</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-[#FAF7F0] rounded-lg p-3 border border-[#EBE4D5] text-xs sm:text-sm text-[#3E3831] leading-relaxed italic">
                      "{item.text}"
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

