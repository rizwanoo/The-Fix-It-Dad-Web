import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_PROFILE, SOCIAL_CHANNELS } from '../data/brandData';
import { BorderlessCTA } from './BorderlessCTA';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17232C] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/15">
          {/* Large Brand Identity */}
          <div className="lg:col-span-5 flex flex-col items-start gap-5">
            <Link to="/" className="flex items-center gap-4">
              <img
                src={BRAND_PROFILE.logoTransparent}
                alt="The Fix It Dad official logo"
                className="h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-display font-extrabold text-2xl tracking-tight text-white">
                  THE FIX IT DAD
                </p>
                <p className="text-sm text-[#14BDB2] font-semibold">
                  Seth Williams · Plumber &amp; Content Creator
                </p>
              </div>
            </Link>
            <p className="text-base text-white/75 max-w-md leading-relaxed">
              &ldquo;{BRAND_PROFILE.taglinePrimary}&rdquo; {BRAND_PROFILE.taglineSecondary}
            </p>
            <BorderlessCTA
              label="COLLABORATION INQUIRIES"
              to="/partnerships#contact"
              variant="lime"
            />
          </div>

          {/* Four Pages Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h2 className="font-display font-bold text-sm tracking-[0.08em] uppercase text-[#F4D05F] mb-2">
              Navigate
            </h2>
            <Link to="/" className="text-sm font-medium text-white/80 hover:text-[#14BDB2] transition-colors">
              Home
            </Link>
            <Link to="/journey" className="text-sm font-medium text-white/80 hover:text-[#14BDB2] transition-colors">
              My Journey — About Seth
            </Link>
            <Link to="/content" className="text-sm font-medium text-white/80 hover:text-[#14BDB2] transition-colors">
              Plumbing Content &amp; Videos
            </Link>
            <Link to="/partnerships" className="text-sm font-medium text-white/80 hover:text-[#14BDB2] transition-colors">
              Brand Partnerships
            </Link>
            <Link to="/partnerships#contact" className="text-sm font-medium text-white/80 hover:text-[#14BDB2] transition-colors">
              Contact Seth
            </Link>
          </div>

          {/* Official Socials & Contact */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h2 className="font-display font-bold text-sm tracking-[0.08em] uppercase text-[#F4D05F] mb-2">
              Official Channels &amp; Collaborations
            </h2>
            <a
              href={`mailto:${BRAND_PROFILE.email}`}
              className="text-base font-semibold text-white hover:text-[#D9F05C] transition-colors break-all"
            >
              {BRAND_PROFILE.email}
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {SOCIAL_CHANNELS.map((ch) => (
                <a
                  key={ch.id}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white/80 hover:text-[#14BDB2] transition-colors"
                >
                  {ch.name} ↗
                </a>
              ))}
            </div>
            <p className="text-xs text-white/55 pt-3 leading-relaxed">
              Verified Brand Ambassador for Fernco &amp; Active Partner with ShuBee.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} The Fix It Dad — Seth Williams. All authentic work &amp; media owned by Seth Williams.
          </p>
          <p>U.S. Marine Corps Veteran · Plumber · Husband &amp; Father of Two</p>
        </div>
      </div>
    </footer>
  );
};
