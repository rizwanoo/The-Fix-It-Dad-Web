import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { VideoContentItem } from '../data/brandData';

interface YouTubeTheatreProps {
  videos: VideoContentItem[];
  heading?: string;
  activeVideoId?: string;
  playSignal?: number;
}

export const YouTubeTheatre: React.FC<YouTubeTheatreProps> = ({
  videos,
  activeVideoId,
  playSignal = 0,
}) => {
  const [selected, setSelected] = useState<VideoContentItem>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    if (!activeVideoId) return;
    const match = videos.find((v) => v.id === activeVideoId);
    if (match) {
      setSelected(match);
      if (playSignal > 0) setIsPlaying(true);
    }
  }, [activeVideoId, playSignal, videos]);

  const handleSelect = (item: VideoContentItem) => {
    setSelected(item);
    setIsPlaying(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Unboxed Video Player Stage */}
      <div className="lg:col-span-7">
        <div className="relative w-full aspect-[16/10] bg-[#17232C] overflow-hidden">
          {isPlaying ? (
            <iframe
              key={selected.id}
              src={`https://www.youtube.com/embed/${selected.id}?autoplay=1&rel=0`}
              title={selected.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play video: ${selected.title}`}
              className="group relative w-full h-full block bg-transparent border-0 p-0 cursor-pointer text-left"
            >
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#17232C]/80 via-[#17232C]/20 to-transparent"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center gap-3 px-6 py-3 bg-[#235DEB] text-white font-display font-bold text-base tracking-wide transition-transform duration-300 group-hover:scale-105">
                  <Play className="w-5 h-5 fill-current" aria-hidden="true" />
                  PLAY VIDEO
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.08em] uppercase text-[#D9F05C] mb-1">
                  {selected.category}
                </p>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                  {selected.title}
                </h3>
              </div>
            </button>
          )}
        </div>

        {/* Clean Unboxed Active Video Details */}
        <div className="pt-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#303E48]/15 pb-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#235DEB] mb-1">
              {selected.category}
              {selected.viewsNote ? ` · ${selected.viewsNote}` : ''}
            </p>
            <h3 className="font-display font-bold text-2xl text-[#17232C]">
              {selected.title}
            </h3>
            <p className="text-sm md:text-base text-[#303E48] mt-2 leading-relaxed">
              {selected.summary}
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${selected.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-borderless text-sm text-[#235DEB] hover:text-[#FF873F] shrink-0"
          >
            <span>WATCH ON YOUTUBE</span>
            <ExternalLink className="w-4 h-4 cta-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Unboxed Editorial Playlist Track */}
      <div className="lg:col-span-5 flex flex-col divide-y divide-[#303E48]/15">
        {videos.map((item, idx) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className={`group w-full text-left py-4 px-2 bg-transparent border-0 cursor-pointer flex items-center gap-4 transition-colors duration-200 ${
                active ? 'text-[#235DEB]' : 'text-[#303E48] hover:text-[#235DEB]'
              }`}
            >
              <span className="font-display font-bold text-lg tabular-nums w-7 shrink-0 opacity-60">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="w-20 h-14 shrink-0 overflow-hidden bg-[#17232C]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] opacity-70 truncate">
                  {item.category}
                </p>
                <p className="font-display font-bold text-base leading-snug line-clamp-2">
                  {item.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
