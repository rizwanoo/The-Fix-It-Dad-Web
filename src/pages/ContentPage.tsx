import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BRAND_PROFILE,
  FEATURED_VIDEOS,
  OWNER_PHOTOS,
  PHOTO_ARCHIVE,
  VideoContentItem,
} from '../data/brandData';
import { BorderlessCTA } from '../components/BorderlessCTA';
import { YouTubeTheatre } from '../components/YouTubeTheatre';

gsap.registerPlugin(ScrollTrigger);

type FilterTab =
  | 'All'
  | 'Real Plumbing Projects'
  | 'Tools & Products'
  | 'Brand Collaborations'
  | 'Plumbing Journey';

const FILTER_TABS: FilterTab[] = [
  'All',
  'Real Plumbing Projects',
  'Tools & Products',
  'Brand Collaborations',
  'Plumbing Journey',
];

export const ContentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>(undefined);
  const [playSignal, setPlaySignal] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  const filteredVideos: VideoContentItem[] = useMemo(() => {
    if (activeTab === 'All') return FEATURED_VIDEOS;
    return FEATURED_VIDEOS.filter((v) => v.category === activeTab);
  }, [activeTab]);

  const handlePlayInTheatre = (youtubeId?: string) => {
    if (!youtubeId) return;
    setActiveTab('All');
    setSelectedVideoId(youtubeId);
    setPlaySignal((s) => s + 1);
    const el = document.getElementById('videos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const projectPhotos = PHOTO_ARCHIVE.filter(
    (item) => item.category === 'Real Plumbing Projects'
  );
  const toolPhotos = PHOTO_ARCHIVE.filter(
    (item) => item.category === 'Tools & Products'
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.content-hero-el', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Full-Bleed Electric Blue Header behind Transparent Navbar */}
      <section className="relative bg-[#1A46B8] text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={OWNER_PHOTOS.castIronLadder}
            alt="Seth Williams working inside wall framing on plumbing pipe"
            className="w-full h-full object-cover object-top opacity-35"
            referrerPolicy="no-referrer"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#12338C] via-[#1B49C4]/85 to-[#12338C]/75"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="content-hero-el text-xs font-semibold tracking-[0.14em] uppercase text-[#D9F05C] mb-4">
            PLUMBING WORK · VIDEOS &amp; CONTENT
          </p>
          <h1 className="content-hero-el font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.98] max-w-4xl">
            REAL PROJECTS.
            <br />
            TOOLS &amp; FIELD VIDEO.
          </h1>
          <p className="content-hero-el mt-6 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
            Genuine residential &amp; commercial plumbing work, service van
            breakdowns, and practical demonstrations published by Seth Williams
            across YouTube (@thefixitdad) and Instagram (@_thefixitdad).
          </p>

          <div className="content-hero-el mt-9 flex flex-wrap gap-8">
            <BorderlessCTA label="VIDEO LIBRARY" href="#videos" variant="lime" />
            <BorderlessCTA label="REAL PLUMBING PROJECTS" href="#projects" variant="light" />
            <BorderlessCTA label="TOOLS & VAN RIG" href="#tools" variant="light" />
          </div>
        </div>
      </section>

      {/* Interactive Native YouTube Video Library (#videos) — Warm Ivory #FFF9EF */}
      <section id="videos" className="bg-[#FFF9EF] py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#235DEB] mb-2">
                NATIVE YOUTUBE EMBEDS · @THEFIXITDAD
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C]">
                Watch Seth&rsquo;s Plumbing Library
              </h2>
            </div>

            <BorderlessCTA
              label="SUBSCRIBE ON YOUTUBE"
              href="https://youtube.com/@thefixitdad"
              external
              variant="orange"
            />
          </div>

          {/* Unboxed Typographic Filter Tabs (Zero Pills) */}
          <div
            role="tablist"
            aria-label="Filter video library by category"
            className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-[#303E48]/15 pb-3 mb-12"
          >
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-2 text-sm font-semibold bg-transparent border-0 cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'text-[#235DEB]'
                      : 'text-[#303E48]/75 hover:text-[#17232C]'
                  }`}
                >
                  <span>{tab}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-[13px] h-[2px] bg-[#235DEB]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <YouTubeTheatre
            key={activeTab}
            videos={filteredVideos}
            activeVideoId={selectedVideoId}
            playSignal={playSignal}
          />
        </div>
      </section>

      {/* Real Plumbing Projects Open Gallery (#projects) — Ice Blue #E5F2FF */}
      <section id="projects" className="bg-[#E5F2FF] py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#235DEB] mb-2">
                01 · REAL PLUMBING PROJECTS
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C]">
                Straight From the Jobsite
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#303E48] max-w-md">
              Every photograph below is captured directly from Seth&rsquo;s own
              plumbing field work—never stock imagery.
            </p>
          </div>

          {/* Open Asymmetric Editorial Grid (Zero Rectangular Card Outlines) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {projectPhotos.map((item, idx) => (
              <article
                key={item.id}
                className={idx % 3 === 1 ? 'lg:translate-y-8' : ''}
              >
                <button
                  type="button"
                  onClick={() => handlePlayInTheatre(item.youtubeId)}
                  className="group block w-full text-left bg-transparent border-0 p-0 cursor-pointer"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-[#17232C]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display font-bold text-2xl text-[#17232C] group-hover:text-[#235DEB] transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-sm font-bold text-[#235DEB] shrink-0">
                        Watch →
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#303E48] mt-1.5 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tools, Products & Service Van (#tools) — Soft Mint #E6F5ED */}
      <section id="tools" className="bg-[#E6F5ED] py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#14BDB2] mb-2">
                02 · TOOLS, PRODUCTS &amp; VAN SETUP
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C]">
                Gear Built for Everyday Calls
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-[#303E48] leading-relaxed">
                From Milwaukee Packout drawer builds and RIDGID FlexShaft drain
                cleaning gear to Spartan cable machines and ShuBee protective
                gear—see the exact equipment Seth trusts daily.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toolPhotos.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => handlePlayInTheatre(tool.youtubeId)}
                className="group block w-full text-left bg-transparent border-0 p-0 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#17232C]">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-2xl text-[#17232C] group-hover:text-[#235DEB] transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-sm font-bold text-[#235DEB] shrink-0">
                      Watch →
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#303E48] mt-1.5 leading-relaxed">
                    {tool.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-[#303E48]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-[#17232C]">
                Want Seth to put your trade product to the test?
              </h3>
              <p className="text-sm sm:text-base text-[#303E48] mt-1">
                Product reviews, sponsored reels, and long-term brand
                ambassadorships available.
              </p>
            </div>
            <BorderlessCTA
              label="INQUIRE ABOUT PRODUCT REVIEWS"
              to="/partnerships#contact"
              variant="blue"
            />
          </div>
        </div>
      </section>

      {/* Channel CTA Footer Strip — Pure White */}
      <section className="bg-white py-14 border-t border-[#303E48]/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-6">
          <p className="font-display font-bold text-2xl text-[#17232C]">
            More reels &amp; daily stories on Instagram ({BRAND_PROFILE.instagramMetrics.followers} followers)
          </p>
          <BorderlessCTA
            label="FOLLOW @_THEFIXITDAD"
            href="https://www.instagram.com/_thefixitdad/"
            external
            variant="orange"
          />
        </div>
      </section>
    </div>
  );
};
