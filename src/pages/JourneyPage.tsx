import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND_PROFILE, OWNER_PHOTOS } from '../data/brandData';
import { BorderlessCTA } from '../components/BorderlessCTA';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_CHAPTERS = [
  {
    number: '01',
    accent: '#235DEB',
    bg: 'bg-[#FFF9EF]',
    kicker: 'SERVICE & DISCIPLINE',
    title: 'Graduating high school and serving in the U.S. Marine Corps.',
    body: 'Before picking up a pipe wrench, Seth Williams served his country in the United States Marine Corps. Those years shaped the work ethic, accountability, and calm focus he brings onto every residential jobsite today.',
    image: OWNER_PHOTOS.ferncoPortrait,
    imageAlt: 'Seth Williams official Fernco ambassador portrait',
  },
  {
    number: '02',
    accent: '#14BDB2',
    bg: 'bg-[#E5F2FF]',
    kicker: 'FINDING THE CALLING',
    title: 'Searching for a meaningful path and falling in love with plumbing.',
    body: 'After leaving the service, Seth spent time searching for a career field that felt genuinely rewarding. When he found his way into plumbing, everything clicked—tactile craftsmanship, real problem-solving, and helping households stay running.',
    image: OWNER_PHOTOS.castIronLadder,
    imageAlt: 'Seth Williams on a ladder repairing cast iron and PVC piping',
  },
  {
    number: '03',
    accent: '#FF873F',
    bg: 'bg-[#FFFFFF]',
    kicker: 'FAMILY & IDENTITY',
    title: 'Husband, father of two, and “The Fix It Dad.”',
    body: 'As a husband and father of two, Seth built The Fix It Dad around who he actually is—just a dad fixing pipes, keeping a sense of humor on tough calls, and treating every customer home with care.',
    image: OWNER_PHOTOS.beeArmorStairs,
    imageAlt: 'Seth Williams laying protective ShuBee Bee Armor runners on customer stairs',
  },
  {
    number: '04',
    accent: '#235DEB',
    bg: 'bg-[#E6F5ED]',
    kicker: 'SHARING THE TRADE',
    title: 'Documenting real work for homeowners and future tradespeople.',
    body: 'Across 195+ YouTube videos and hundreds of Instagram reels, Seth shares solder-vs-press comparisons, drain clearing breakdowns, van organization tours, and DWV mockups to spark curiosity and respect for skilled trades.',
    image: '/assets/images/the-fix-it-dad/tools-and-equipment/dwv-mockup-teaching-0b1iiYmWhCM.jpg',
    imageAlt: 'DWV plumbing mockup used for hands-on teaching at home',
  },
];

export const JourneyPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.journey-hero-el', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform',
      });

      gsap.utils.toArray<HTMLElement>('.chapter-row').forEach((row) => {
        gsap.from(row, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: row,
            start: 'top 84%',
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Full-Bleed Storytelling Hero behind transparent navbar */}
      <section className="relative bg-[#0E5C57] text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#0B4B47] via-[#107871] to-[#1B3F8B]"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="journey-hero-el text-xs font-semibold tracking-[0.14em] uppercase text-[#D9F05C] mb-4">
              ABOUT SETH WILLIAMS · THE JOURNEY
            </p>
            <h1 className="journey-hero-el font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
              Just a Dad,
              <br />
              fixing pipes.
            </h1>
            <p className="journey-hero-el mt-6 text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
              From the United States Marine Corps to residential plumbing and
              trade storytelling—get to know Seth Williams, the plumber,
              husband, and father of two behind The Fix It Dad.
            </p>
            <div className="journey-hero-el mt-8 flex flex-wrap gap-8">
              <BorderlessCTA
                label="EXPLORE MY WORK"
                to="/content"
                variant="lime"
              />
              <BorderlessCTA
                label="BRAND PARTNERSHIPS"
                to="/partnerships"
                variant="light"
              />
            </div>
          </div>

          {/* Overlapping Editorial Portrait Diptych (Zero Card Borders) */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-8 overflow-hidden">
                <img
                  src={OWNER_PHOTOS.heroSeth}
                  alt="Seth Williams smiling in his The Fix It Dad t-shirt"
                  className="w-full aspect-[4/5] object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-4 -ml-8 mb-8 relative z-10 overflow-hidden shadow-2xl">
                <img
                  src={OWNER_PHOTOS.ferncoPortrait}
                  alt="Seth Williams official Fernco portrait"
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Editorial Pull-Quote — Sunshine Yellow & Warm Ivory */}
      <section className="bg-[#F4D05F] text-[#17232C] py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#17232C]/75 mb-4">
            VERIFIED FERNCO AMBASSADOR PROFILE
          </p>
          <blockquote className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-snug">
            &ldquo;{BRAND_PROFILE.ferncoBioExact}&rdquo;
          </blockquote>
          <div className="mt-6">
            <BorderlessCTA
              label="VIEW OFFICIAL FERNCO PROFILE"
              href={BRAND_PROFILE.ferncoProfileUrl}
              external
              variant="dark"
            />
          </div>
        </div>
      </section>

      {/* 4 Storytelling Chapters — Alternating Full-Width Editorial Splits */}
      {JOURNEY_CHAPTERS.map((chapter, idx) => {
        const isReversed = idx % 2 === 1;
        return (
          <section key={chapter.number} className={`${chapter.bg} py-20 lg:py-28`}>
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              <div className="chapter-row grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="overflow-hidden">
                    <img
                      src={chapter.image}
                      alt={chapter.imageAlt}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="max-w-xl">
                    <div className="flex items-baseline gap-4 mb-3">
                      <span
                        className="font-display font-extrabold text-5xl sm:text-6xl tabular-nums"
                        style={{ color: chapter.accent }}
                      >
                        {chapter.number}
                      </span>
                      <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#303E48]">
                        {chapter.kicker}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17232C] leading-tight">
                      {chapter.title}
                    </h2>
                    <p className="mt-5 text-base sm:text-lg text-[#303E48] leading-relaxed">
                      {chapter.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Inside the Daily Workflow — Electric Blue #235DEB */}
      <section className="bg-[#235DEB] text-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#D9F05C] mb-3">
                EVERYDAY LIFE IN THE TRADES
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Organized vans, honest fixes, and passing the craft forward.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <BorderlessCTA
                label="WATCH PLUMBING CONTENT"
                to="/content"
                variant="lime"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/assets/images/the-fix-it-dad/tools-and-equipment/milwaukee-packout-van-tour-B0wlQMpXLOs.jpg"
                  alt="Seth Williams Milwaukee Packout van drawer setup"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-4 font-display font-bold text-xl">
                Service Van Organization
              </p>
              <p className="text-sm text-white/80 mt-1">
                Stocked drawers built for rapid residential and commercial calls.
              </p>
            </div>

            <div>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/assets/images/the-fix-it-dad/plumbing-work/press-or-solder-copper-wZaXh8ivRl4.jpg"
                  alt="Copper soldering on tailgate pipe vise"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-4 font-display font-bold text-xl">
                Hands-On Craftsmanship
              </p>
              <p className="text-sm text-white/80 mt-1">
                Comparing modern press tooling with classic torch soldering.
              </p>
            </div>

            <div>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={OWNER_PHOTOS.hydroShieldSuit}
                  alt="Seth Williams geared up in ShuBee Hydro Shield suit by his van"
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="mt-4 font-display font-bold text-xl">
                Real-World Conditions
              </p>
              <p className="text-sm text-white/80 mt-1">
                Suited up and ready for whatever awaits under the house or slab.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
