import React from 'react';
import { Principle } from '../types';
import { ALL_PRINCIPLES } from '../data/principles';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIds: number[];
  onToggleBookmark: (id: number) => void;
  onOpenDetail: (principle: Principle) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedIds,
  onToggleBookmark,
  onOpenDetail,
}) => {
  if (!isOpen) return null;

  const bookmarkedPrinciples = ALL_PRINCIPLES.filter((p) =>
    bookmarkedIds.includes(p.id)
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookmarks-modal-title"
    >
      <div className="relative bg-[#FBF9F5] w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2D8C7] overflow-hidden flex flex-col max-h-[85vh] animate-fadeIn">
        
        {/* Header */}
        <div className="bg-[#FBF9F5] px-6 py-4 border-b border-[#EAE2D2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FBECE7] text-[#C25E3E] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 id="bookmarks-modal-title" className="font-serif-heading font-bold text-base sm:text-lg text-[#1E3E2E]">
                မှတ်သားထားသော သဘောတရားများ
              </h3>
              <p className="text-xs text-[#7A7163]">စုစုပေါင်း {bookmarkedPrinciples.length} ခု</p>
            </div>
          </div>

          <button
            id="close-bookmarks-modal-btn"
            onClick={onClose}
            className="p-2 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-3">
          {bookmarkedPrinciples.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Bookmark className="w-10 h-10 mx-auto text-[#C5BBAA]" />
              <p className="text-sm text-[#5A5245]">
                မှတ်သားထားသော သဘောတရားများ မရှိသေးပါ။
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
                    <span className="w-5 h-5 rounded-md bg-[#2D5A43] text-white flex items-center justify-center font-bold text-[10px]">
                      #{principle.id}
                    </span>
                    <span className="text-[11px] font-semibold text-[#C25E3E]">
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
                    className="p-2 text-[#2D5A43] hover:bg-[#E8EFEA] rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                  >
                    <span>ဖတ်ရန်</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleBookmark(principle.id)}
                    className="p-2 text-[#B3261E] hover:bg-[#FDF2F0] rounded-lg transition-colors"
                    title="ဖျက်ရန်"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
