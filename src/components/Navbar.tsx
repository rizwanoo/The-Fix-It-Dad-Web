import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BRAND_PROFILE } from '../data/brandData';
import { BorderlessCTA } from './BorderlessCTA';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.hash]);

  const openDropdown = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setDropdownOpen(true);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  const isLightHeader = scrolled || mobileOpen;

  const navLinkClass = (active: boolean) =>
    `relative py-2 text-[13px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 ${
      isLightHeader
        ? active
          ? 'text-[#235DEB]'
          : 'text-[#303E48] hover:text-[#235DEB]'
        : active
          ? 'text-[#D9F05C]'
          : 'text-white/95 hover:text-[#D9F05C]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLightHeader
          ? 'bg-[#FFF9EF]/95 backdrop-blur-md border-b border-[#303E48]/10'
          : 'bg-transparent'
      }`}
    >
      {/* Subtle local top edge readability gradient only when transparent over hero */}
      {!isLightHeader && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#11244E]/60 via-[#11244E]/22 to-transparent"
        />
      )}

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 md:h-24 flex items-center justify-between gap-6">
        {/* Large Original Brand Logo */}
        <Link
          to="/"
          aria-label="The Fix It Dad — Home"
          className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-[#235DEB]"
        >
          <img
            src={BRAND_PROFILE.logoTransparent}
            alt="The Fix It Dad official circular blueprint logo"
            className="h-14 md:h-[68px] w-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
          <span
            className={`hidden sm:inline-block font-display font-extrabold text-lg md:text-xl tracking-tight whitespace-nowrap transition-colors duration-200 ${
              isLightHeader ? 'text-[#17232C]' : 'text-white'
            }`}
          >
            THE FIX IT DAD
          </span>
        </Link>

        {/* Horizontal Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          <Link to="/" className={navLinkClass(location.pathname === '/')}>
            HOME
          </Link>

          <Link
            to="/journey"
            className={navLinkClass(location.pathname === '/journey')}
          >
            MY JOURNEY
          </Link>

          {/* Hoverable Dropdown kept seamlessly open while moving mouse into submenu */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleCloseDropdown}
          >
            <Link
              to="/content"
              className={`${navLinkClass(location.pathname === '/content')} inline-flex items-center gap-1`}
              aria-expanded={dropdownOpen}
              onFocus={openDropdown}
            >
              <span>PLUMBING CONTENT</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </Link>

            {dropdownOpen && (
              <div
                className="absolute left-0 top-full pt-3 min-w-[230px] z-50"
                onMouseEnter={openDropdown}
                onMouseLeave={scheduleCloseDropdown}
              >
                <div className="bg-[#FFF9EF] border-t-2 border-[#235DEB] py-4 px-5 shadow-lg flex flex-col gap-3">
                  <Link
                    to="/content#projects"
                    className="text-sm font-semibold text-[#303E48] hover:text-[#235DEB] transition-colors whitespace-nowrap"
                  >
                    Real Plumbing Projects
                  </Link>
                  <Link
                    to="/content#tools"
                    className="text-sm font-semibold text-[#303E48] hover:text-[#235DEB] transition-colors whitespace-nowrap"
                  >
                    Tools &amp; Van Setup
                  </Link>
                  <Link
                    to="/content#videos"
                    className="text-sm font-semibold text-[#303E48] hover:text-[#235DEB] transition-colors whitespace-nowrap"
                  >
                    YouTube Video Library
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/partnerships"
            className={navLinkClass(
              location.pathname === '/partnerships' &&
                location.hash !== '#contact'
            )}
          >
            PARTNERSHIPS
          </Link>

          <Link
            to="/partnerships#contact"
            className={navLinkClass(
              location.pathname === '/partnerships' &&
                location.hash === '#contact'
            )}
          >
            CONTACT
          </Link>
        </nav>

        {/* Primary Borderless CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:block">
            <BorderlessCTA
              label="COLLABORATE"
              to="/partnerships#contact"
              variant={isLightHeader ? 'blue' : 'light'}
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`lg:hidden p-2.5 bg-transparent border-0 transition-colors cursor-pointer ${
              isLightHeader ? 'text-[#17232C]' : 'text-white'
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FFF9EF] border-t border-[#303E48]/10 px-6 py-8">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-5">
            <Link
              to="/"
              className="font-display font-bold text-2xl text-[#17232C] hover:text-[#235DEB] transition-colors"
            >
              HOME
            </Link>
            <Link
              to="/journey"
              className="font-display font-bold text-2xl text-[#17232C] hover:text-[#235DEB] transition-colors"
            >
              MY JOURNEY
            </Link>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/content"
                className="font-display font-bold text-2xl text-[#17232C] hover:text-[#235DEB] transition-colors"
              >
                PLUMBING CONTENT
              </Link>
              <div className="pl-4 flex flex-col gap-2 border-b border-[#303E48]/10 pb-3">
                <Link
                  to="/content#projects"
                  className="text-sm font-medium text-[#303E48] hover:text-[#235DEB]"
                >
                  Real Plumbing Projects
                </Link>
                <Link
                  to="/content#tools"
                  className="text-sm font-medium text-[#303E48] hover:text-[#235DEB]"
                >
                  Tools &amp; Van Setup
                </Link>
                <Link
                  to="/content#videos"
                  className="text-sm font-medium text-[#303E48] hover:text-[#235DEB]"
                >
                  YouTube Video Library
                </Link>
              </div>
            </div>
            <Link
              to="/partnerships"
              className="font-display font-bold text-2xl text-[#17232C] hover:text-[#235DEB] transition-colors"
            >
              PARTNERSHIPS
            </Link>
            <Link
              to="/partnerships#contact"
              className="font-display font-bold text-2xl text-[#235DEB]"
            >
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
