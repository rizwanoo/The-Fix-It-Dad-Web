import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BRAND_PROFILE,
  FEATURED_VIDEOS,
  OWNER_PHOTOS,
  PHOTO_ARCHIVE,
  SOCIAL_CHANNELS,
} from '../data/brandData';
import { BorderlessCTA } from '../components/BorderlessCTA';
import { YouTubeTheatre } from '../components/YouTubeTheatre';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform',
      });

      gsap.to('.hero-parallax-img', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal-block').forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const homeProjects = PHOTO_ARCHIVE.slice(0, 4);
  const homeVideos = FEATURED_VIDEOS.slice(0, 5);

  return (
    <div ref={rootRef}>
      {/* 1. CINEMATIC FULL-WIDTH HERO (extends seamlessly behind transparent navbar) */}
      <section className="hero-section relative min-h-[92vh] lg:min-h-screen w-full overflow-hidden bg-[#102657] flex items-end lg:items-center pt-28 pb-16 lg:py-24">
        {/* Background Color Field & Authentic Seth Portrait */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2454] via-[#183882] to-[#11234A]" />
          <img
            src={OWNER_PHOTOS.heroSeth}
            alt="Seth Williams, The Fix It Dad, smiling in his branded shirt"
            className="hero-parallax-img absolute right-0 top-0 h-full w-full lg:w-[64%] object-cover object-[50%_20%] opacity-95"
            referrerPolicy="no-referrer"
          />
          {/* Subtle local directional contrast scrim on left only — keeps Seth bright & unobstructed */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0E214D] via-[#0E214D]/78 lg:via-[#0E214D]/45 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0E214D]/90 via-[#0E214D]/40 to-transparent lg:hidden"
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="hero-stagger text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#D9F05C] mb-4">
              SETH WILLIAMS · PLUMBER &amp; CONTENT CREATOR
            </p>
            <h1 className="hero-stagger font-display font-extrabold text-5xl sm:text-6xl lg:text-[78px] leading-[0.98] tracking-tight text-white">
              JUST A DAD.
              <br />
              FIXING PIPES.
            </h1>
            <p className="hero-stagger mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl font-normal">
              Real plumbing. Real projects. Everyday life in the trades. Follow
              Seth Williams on his plumbing journey.
            </p>

            <div className="hero-stagger mt-9 flex flex-wrap items-center gap-x-9 gap-y-4">
              <BorderlessCTA
                label="EXPLORE THE JOURNEY"
                to="/journey"
                variant="lime"
              />
              <BorderlessCTA
                label="WATCH THE LATEST VIDEOS"
                to="/content"
                variant="light"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PERSONAL BRAND INTRO & AUDIENCE SNAPSHOT — Warm Ivory #FFF9EF */}
      <section className="bg-[#FFF9EF] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-block grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#235DEB] mb-3">
                THE FIX IT DAD · PERSONAL BRAND
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C] leading-[1.08] max-w-2xl">
                &ldquo;{BRAND_PROFILE.taglinePrimary}&rdquo;{' '}
                <span className="text-[#235DEB]">
                  {BRAND_PROFILE.taglineSecondary}
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base sm:text-lg text-[#303E48] leading-relaxed">
                After serving in the United States Marine Corps and finding his
                calling in residential plumbing, Seth Williams started sharing
                honest work straight from the jobsite—connecting homeowners,
                apprentices, and fellow tradespeople without corporate polish.
              </p>
              <div className="mt-6">
                <BorderlessCTA
                  label="MEET SETH WILLIAMS"
                  to="/journey"
                  variant="blue"
                />
              </div>
            </div>
          </div>

          {/* Unboxed Audience Numbers Row (tabular-nums, hairline dividers only) */}
          <div className="reveal-block mt-16 pt-10 border-t border-[#303E48]/15 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-display font-extrabold text-4xl sm:text-5xl text-[#235DEB] tabular-nums">
                {BRAND_PROFILE.instagramMetrics.followers}
              </p>
              <p className="text-sm font-semibold text-[#17232C] mt-1">
                Instagram Followers (@_thefixitdad)
              </p>
            </div>
            <div>
              <p className="font-display font-extrabold text-4xl sm:text-5xl text-[#14BDB2] tabular-nums">
                {BRAND_PROFILE.instagramMetrics.posts}
              </p>
              <p className="text-sm font-semibold text-[#17232C] mt-1">
                Published Instagram Posts
              </p>
            </div>
            <div>
              <p className="font-display font-extrabold text-4xl sm:text-5xl text-[#FF873F] tabular-nums">
                {BRAND_PROFILE.instagramMetrics.youtubeVideos}+
              </p>
              <p className="text-sm font-semibold text-[#17232C] mt-1">
                YouTube Plumbing Videos (@thefixitdad)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VIBRANT MARQUEE DIVIDER — Fresh Aqua #14BDB2 */}
      <div
        aria-hidden="true"
        className="bg-[#14BDB2] text-[#17232C] py-3.5 overflow-hidden border-y border-[#17232C]/10"
      >
        <div className="marquee-track font-display font-bold text-sm sm:text-base tracking-[0.12em] uppercase">
          <span className="px-6">
            SETH WILLIAMS · THE FIX IT DAD · U.S. MARINE CORPS VETERAN · PLUMBER &amp; CONTENT CREATOR · FERNCO AMBASSADOR · SHUBEE PARTNER · REAL WORK IN THE TRADES
          </span>
          <span className="px-6">
            SETH WILLIAMS · THE FIX IT DAD · U.S. MARINE CORPS VETERAN · PLUMBER &amp; CONTENT CREATOR · FERNCO AMBASSADOR · SHUBEE PARTNER · REAL WORK IN THE TRADES
          </span>
        </div>
      </div>

      {/* 4. HIS PLUMBING JOURNEY SPLIT-SCREEN — Ice Blue #E5F2FF */}
      <section className="bg-[#E5F2FF]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 relative min-h-[420px] lg:min-h-[620px] overflow-hidden">
            <img
              src={OWNER_PHOTOS.castIronLadder}
              alt="Seth Williams working on a ladder repairing cast iron and PVC drain piping"
              loading="lazy"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 px-6 sm:px-10 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
            <div className="reveal-block max-w-xl">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#235DEB] mb-3">
                FROM THE MARINE CORPS TO THE TRADES
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C] leading-[1.08]">
                A veteran, husband, and dad who fell in love with plumbing.
              </h2>
              <p className="mt-6 text-base sm:text-lg text-[#303E48] leading-relaxed">
                {BRAND_PROFILE.ferncoBioExact}
              </p>
              <p className="mt-4 text-base text-[#303E48] leading-relaxed">
                Every clip on The Fix It Dad shows real repairs, crawlspace
                diagnoses, van organization, and lessons learned on the job—no
                scripts and no corporate facade.
              </p>
              <div className="mt-8">
                <BorderlessCTA
                  label="FOLLOW THE JOURNEY"
                  to="/journey"
                  variant="blue"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REAL PLUMBING PROJECT PHOTOGRAPHY — Pure White #FFFFFF (Zero Card Boxes) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-block flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#FF873F] mb-2">
                AUTHENTIC JOBSITE DOCUMENTATION
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C]">
                Real Plumbing Work
              </h2>
            </div>
            <BorderlessCTA
              label="EXPLORE ALL PROJECTS & TOOLS"
              to="/content"
              variant="dark"
            />
          </div>

          {/* Open Editorial Photo Strip — Sharp Edges, Zero Borders, Zero Cards */}
          <div className="reveal-block grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {homeProjects.map((proj, i) => (
              <a
                key={proj.id}
                href={`https://www.youtube.com/watch?v=${proj.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block ${i % 2 === 1 ? 'lg:mt-10' : ''}`}
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-[#E5F2FF]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#235DEB]">
                    {proj.category}
                  </p>
                  <h3 className="font-display font-bold text-xl text-[#17232C] mt-1 group-hover:text-[#235DEB] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[#303E48] mt-1.5 leading-relaxed">
                    {proj.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED VIDEO CONTENT — Soft Mint #E6F5ED */}
      <section className="bg-[#E6F5ED] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-block flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#14BDB2] mb-2">
                @THEFIXITDAD ON YOUTUBE
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C]">
                Featured Videos &amp; Field Clips
              </h2>
            </div>
            <BorderlessCTA
              label="OPEN FULL VIDEO LIBRARY"
              to="/content#videos"
              variant="dark"
            />
          </div>

          <div className="reveal-block">
            <YouTubeTheatre videos={homeVideos} />
          </div>
        </div>
      </section>

      {/* 7. BRAND COLLABORATIONS SPOTLIGHT — Electric Royal Blue #235DEB */}
      <section className="bg-[#235DEB] text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 px-5 sm:px-8 lg:px-16 py-20 lg:py-28 flex flex-col justify-center">
            <div className="reveal-block max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#D9F05C] mb-3">
                TRUSTED TRADE PARTNERSHIPS
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.06] text-white">
                Partnering with brands plumbers actually rely on.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed">
                Seth collaborates as an official{' '}
                <strong className="text-white font-semibold">
                  Fernco Brand Ambassador
                </strong>{' '}
                and an active{' '}
                <strong className="text-white font-semibold">
                  ShuBee Partner
                </strong>
                , putting couplings, jobsite surface protection, gloves, and
                leak-detection gear to the test on real residential calls.
              </p>

              {/* Official Partner Logos — Open White Showcase Strip */}
              <div className="mt-10 pt-8 border-t border-white/20 flex flex-wrap items-center gap-10">
                <a
                  href={BRAND_PROFILE.ferncoProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-5 py-3 inline-flex items-center transition-transform duration-300 hover:scale-[1.03]"
                  aria-label="Fernco Brand Ambassadors"
                >
                  <img
                    src={BRAND_PROFILE.ferncoLogo}
                    alt="Fernco official logo"
                    className="h-9 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </a>

                <a
                  href={BRAND_PROFILE.shubeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-5 py-2 inline-flex items-center transition-transform duration-300 hover:scale-[1.03]"
                  aria-label="ShuBee official website"
                >
                  <img
                    src={BRAND_PROFILE.shubeeLogo}
                    alt="ShuBee official logo"
                    className="h-12 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-8">
                <BorderlessCTA
                  label="BRAND COLLABORATIONS"
                  to="/partnerships"
                  variant="lime"
                />
                <BorderlessCTA
                  label="CONTACT SETH"
                  to="/partnerships#contact"
                  variant="light"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-[600px]">
            <img
              src={OWNER_PHOTOS.beeArmorStairs}
              alt="Seth Williams installing ShuBee Bee Armor protective stair runners"
              loading="lazy"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 8. SOCIAL CHANNELS & COLLABORATION CTA — Warm Ivory #FFF9EF */}
      <section className="bg-[#FFF9EF] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-block grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#FF873F] mb-3">
                CONNECT ACROSS PLATFORMS
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C] leading-[1.08]">
                Follow The Fix It Dad or start a brand conversation.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[#303E48] leading-relaxed max-w-lg">
                For brand collaborations, sponsorships, product reviews, and
                media enquiries, reach out directly at{' '}
                <a
                  href={`mailto:${BRAND_PROFILE.email}`}
                  className="font-semibold text-[#235DEB] underline underline-offset-4 hover:text-[#FF873F]"
                >
                  {BRAND_PROFILE.email}
                </a>
                .
              </p>
              <div className="mt-8">
                <BorderlessCTA
                  label="SEND COLLABORATION ENQUIRY"
                  to="/partnerships#contact"
                  variant="orange"
                />
              </div>
            </div>

            <div className="lg:col-span-6 divide-y divide-[#303E48]/15 border-t border-b border-[#303E48]/15">
              {SOCIAL_CHANNELS.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group py-5 flex items-center justify-between gap-4 text-[#17232C] hover:text-[#235DEB] transition-colors"
                >
                  <div>
                    <p className="font-display font-bold text-2xl">
                      {channel.name}{' '}
                      <span className="text-base font-medium text-[#303E48]/70 group-hover:text-[#235DEB]/80">
                        · {channel.handle}
                      </span>
                    </p>
                    <p className="text-sm text-[#303E48] mt-1">
                      {channel.note}
                    </p>
                  </div>
                  <span className="font-display font-bold text-xl shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
