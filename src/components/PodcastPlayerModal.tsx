import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Headphones,
  ExternalLink,
  Download,
  Minimize2,
  Maximize2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PODCAST_MP3_URL, PODCAST_INFO } from '../data/podcast';

interface PodcastPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  playbackRate: number;
  onChangePlaybackRate: (rate: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const PodcastPlayerModal: React.FC<PodcastPlayerProps> = ({
  isOpen,
  onClose,
  isMinimized,
  onToggleMinimize,
  isPlaying,
  onTogglePlay,
  audioRef,
  currentTime,
  duration,
  onSeek,
  playbackRate,
  onChangePlaybackRate,
  isMuted,
  onToggleMute,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  useEffect(() => {
    if (!isSeeking) {
      setSliderValue(currentTime);
    }
  }, [currentTime, isSeeking]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSliderValue(val);
  };

  const handleSeekCommit = () => {
    setIsSeeking(false);
    onSeek(sliderValue);
  };

  const skipTime = (offset: number) => {
    const newTime = Math.min(Math.max(0, currentTime + offset), duration || 10000);
    onSeek(newTime);
  };

  if (!isOpen) return null;

  // Render minimized floating bar if user minimized it
  if (isMinimized) {
    return (
      <div
        id="podcast-minimized-bar"
        className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-24 z-50 bg-[#1E3E2E] text-[#FBF9F5] rounded-2xl shadow-2xl border border-[#37614B] p-3 flex items-center justify-between gap-3 sm:max-w-md animate-fadeIn"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <button
            onClick={onTogglePlay}
            id="mini-podcast-play-btn"
            aria-label={isPlaying ? 'ခေတ္တရပ်မည်' : 'ဖွင့်မည်'}
            className="w-10 h-10 rounded-xl bg-[#C25E3E] hover:bg-[#A84F33] text-white flex items-center justify-center shrink-0 shadow-xs transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate text-[#FBF9F5]">
              {PODCAST_INFO.title}
            </p>
            <p className="text-[11px] text-[#A7CDB9] flex items-center gap-1.5">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <span>•</span>
              <span className="truncate">Dale Carnegie Audio Summary</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleMinimize}
            id="mini-podcast-expand-btn"
            className="p-2 text-[#A7CDB9] hover:text-white hover:bg-[#2D5A43] rounded-lg transition-colors"
            title="အပြည့်အစုံ ဖွင့်မည်"
            aria-label="အပြည့်အစုံ ဖွင့်မည်"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            id="mini-podcast-close-btn"
            className="p-2 text-[#A7CDB9] hover:text-white hover:bg-[#2D5A43] rounded-lg transition-colors"
            title="ပိတ်မည်"
            aria-label="ပိတ်မည်"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="podcast-modal-title"
    >
      <div className="relative bg-[#FBF9F5] w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2D8C7] overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn">
        {/* Modal Top Bar */}
        <div className="bg-[#FAF7F0] px-6 py-4 border-b border-[#EAE2D2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2D5A43] text-white flex items-center justify-center">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#C25E3E] uppercase tracking-wider">
                Official Audio Summary
              </span>
              <h3 id="podcast-modal-title" className="font-serif-heading font-bold text-base text-[#1E3E2E]">
                Dale Carnegie Podcast Mp3
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="podcast-minimize-btn"
              onClick={onToggleMinimize}
              className="p-2 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors"
              title="အောက်သို့ ချုံ့ထားမည် (နားဆင်ရင်း ဆက်ဖတ်နိုင်ရန်)"
              aria-label="အောက်သို့ ချုံ့ထားမည်"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <button
              id="podcast-close-btn"
              onClick={onClose}
              className="p-2 text-[#5A5245] hover:text-[#1E3E2E] hover:bg-[#F2ECE1] rounded-lg transition-colors"
              aria-label="ပိတ်မည်"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto">
          {/* Cover & Audio Info Card */}
          <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#DFCDB9] space-y-3.5 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#2D5A43] to-[#1E3E2E] text-white flex flex-col items-center justify-center shrink-0 shadow-xs border border-[#3E6C53]">
                <Headphones className="w-8 h-8 text-[#A7CDB9]" />
                <span className="text-[10px] font-bold text-[#E2ECE5] mt-1">MP3 AUDIO</span>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FBECE7] text-[#8C3A21] text-xs font-semibold">
                  <Sparkles className="w-3 h-3 text-[#C25E3E]" />
                  <span>စာအုပ်နှင့် ဝက်ဘ်ဆိုက် အနှစ်ချုပ် ရှင်းလင်းချက်</span>
                </div>
                <h4 className="font-serif-heading font-bold text-base sm:text-lg text-[#1E3E2E] leading-snug">
                  {PODCAST_INFO.title}
                </h4>
                <p className="text-xs text-[#6B6357] leading-relaxed">
                  {PODCAST_INFO.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4036] leading-relaxed pt-1 border-t border-[#F2EBE0]">
              {PODCAST_INFO.description}
            </p>
          </div>

          {/* Player Controls Container */}
          <div className="bg-[#FAF6EE] rounded-2xl p-5 sm:p-6 border border-[#E5DAC6] space-y-4">
            {/* Timeline Progress Bar */}
            <div className="space-y-1.5">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={sliderValue}
                onChange={handleSeekChange}
                onMouseDown={() => setIsSeeking(true)}
                onTouchStart={() => setIsSeeking(true)}
                onMouseUp={handleSeekCommit}
                onTouchEnd={handleSeekCommit}
                id="podcast-seek-bar"
                aria-label="အသံဖိုင် တိုး/ဆုတ် ပြေးခလုတ်"
                className="w-full h-2 bg-[#DDD1BE] rounded-lg appearance-none cursor-pointer accent-[#2D5A43] focus:outline-hidden"
              />
              <div className="flex items-center justify-between text-xs font-semibold text-[#6B6357]">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : 'Loading...'}</span>
              </div>
            </div>

            {/* Playback Action Buttons */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 pt-1">
              <button
                onClick={() => skipTime(-15)}
                id="podcast-skip-back-btn"
                className="p-2.5 rounded-full text-[#4A4036] hover:bg-[#EAE0CF] hover:text-[#1E3E2E] transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                title="၁၅ စက္ကန့် နောက်ဆုတ်မည်"
                aria-label="၁၅ စက္ကန့် နောက်ဆုတ်မည်"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="text-[10px] font-bold ml-0.5">15</span>
              </button>

              <button
                onClick={onTogglePlay}
                id="podcast-main-play-btn"
                className="w-14 h-14 rounded-full bg-[#2D5A43] hover:bg-[#234735] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all active:scale-95"
                title={isPlaying ? 'ခေတ္တရပ်မည်' : 'ဖွင့်မည်'}
                aria-label={isPlaying ? 'ခေတ္တရပ်မည်' : 'ဖွင့်မည်'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-current" />
                ) : (
                  <Play className="w-7 h-7 fill-current ml-1" />
                )}
              </button>

              <button
                onClick={() => skipTime(15)}
                id="podcast-skip-forward-btn"
                className="p-2.5 rounded-full text-[#4A4036] hover:bg-[#EAE0CF] hover:text-[#1E3E2E] transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                title="၁၅ စက္ကန့် ရှေ့တိုးမည်"
                aria-label="၁၅ စက္ကန့် ရှေ့တိုးမည်"
              >
                <span className="text-[10px] font-bold mr-0.5">15</span>
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            {/* Auxiliary Controls: Speed & Mute */}
            <div className="flex items-center justify-between pt-2 border-t border-[#EAE0CF] text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#6B6357]">Speed:</span>
                {[1, 1.25, 1.5, 1.75].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onChangePlaybackRate(rate)}
                    id={`podcast-speed-${rate}x-btn`}
                    className={`px-2 py-1 rounded-md text-xs font-bold transition-colors min-h-[32px] ${
                      playbackRate === rate
                        ? 'bg-[#2D5A43] text-white'
                        : 'bg-[#EDE4D5] text-[#5A5245] hover:bg-[#DFD4C1]'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleMute}
                  id="podcast-mute-btn"
                  className="p-2 rounded-lg text-[#5A5245] hover:bg-[#EDE4D5] transition-colors flex items-center gap-1 min-h-[36px]"
                  title={isMuted ? 'အသံဖွင့်မည်' : 'အသံပိတ်မည်'}
                  aria-label={isMuted ? 'အသံဖွင့်မည်' : 'အသံပိတ်မည်'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#B3261E]" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick External Links & Download Options */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <a
              href={PODCAST_MP3_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="podcast-open-tab-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0EAE1] hover:bg-[#E5DDCF] text-[#2C2926] text-xs font-bold border border-[#D5CBB9] transition-all min-h-[42px]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>MP3 ကို Tab အသစ်တွင် ဖွင့်မည်</span>
            </a>

            <a
              href={PODCAST_MP3_URL}
              download="Dale_Carnegie_Summary.mp3"
              id="podcast-download-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D5A43] hover:bg-[#234735] text-white text-xs font-bold shadow-xs transition-all min-h-[42px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>အသံဖိုင် ဒေါင်းလုဒ်ရယူမည် (MP3)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
