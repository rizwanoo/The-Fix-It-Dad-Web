import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  BRAND_PROFILE,
  OWNER_PHOTOS,
  SOCIAL_CHANNELS,
} from '../data/brandData';
import { BorderlessCTA } from '../components/BorderlessCTA';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  company: string;
  email: string;
  enquiryType: string;
  message: string;
  website: string; // honeypot
}

const ENQUIRY_TYPES = [
  'Brand Collaboration',
  'Sponsorship Enquiry',
  'Product Review',
  'General Contact',
];

export const PartnershipsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  const [csrfToken, setCsrfToken] = useState<string>('');
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    email: '',
    enquiryType: 'Brand Collaboration',
    message: '',
    website: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    kind: 'success' | 'error';
    text: string;
    deliveryMode?: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/csrf-token', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.csrfToken) setCsrfToken(data.csrfToken);
      })
      .catch(() => {
        // Handled cleanly on submit if unavailable
      });
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.partner-hero-el', {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Client-side validation mirroring server checks
    const errors: Record<string, string> = {};
    if (form.name.trim().length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (form.message.trim().length < 15) {
      errors.message =
        'Please include a few details about your enquiry (at least 15 characters).';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      let token = csrfToken;
      if (!token) {
        const tokRes = await fetch('/api/csrf-token', { cache: 'no-store' });
        const tokData = await tokRes.json();
        token = tokData.csrfToken || '';
        setCsrfToken(token);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          csrfToken: token,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSubmitStatus({
          kind: 'error',
          text:
            data.error ||
            `Could not send enquiry. Please contact ${BRAND_PROFILE.email} directly.`,
        });
      } else {
        setSubmitStatus({
          kind: 'success',
          text: data.message,
          deliveryMode: data.deliveryMode,
        });
        setForm({
          name: '',
          company: '',
          email: '',
          enquiryType: 'Brand Collaboration',
          message: '',
          website: '',
        });
        // Refresh CSRF token for any subsequent enquiry
        fetch('/api/csrf-token', { cache: 'no-store' })
          .then((r) => r.json())
          .then((d) => {
            if (d?.csrfToken) setCsrfToken(d.csrfToken);
          })
          .catch(() => {});
      }
    } catch {
      setSubmitStatus({
        kind: 'error',
        text: `Network error reaching the submission handler. Please reach out directly at ${BRAND_PROFILE.email}.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={pageRef}>
      {/* Full-Bleed Electric Blue Partnerships Hero behind transparent navbar */}
      <section className="relative bg-[#163EA0] text-white pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="partner-hero-el text-xs font-semibold tracking-[0.14em] uppercase text-[#D9F05C] mb-4">
              BRAND PARTNERSHIPS &amp; CONTACT
            </p>
            <h1 className="partner-hero-el font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.98]">
              BUILT ON TRUST.
              <br />
              AUTHENTIC IN THE FIELD.
            </h1>
            <p className="partner-hero-el mt-6 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
              Seth Williams partners with manufacturers and trade brands whose
              gear earns its spot on the truck—delivering honest demonstrations
              to working plumbers and homeowners.
            </p>
            <div className="partner-hero-el mt-8 flex flex-wrap gap-8">
              <BorderlessCTA
                label="START A COLLABORATION"
                href="#contact"
                variant="lime"
              />
              <BorderlessCTA
                label="EMAIL DIRECTLY"
                href={`mailto:${BRAND_PROFILE.email}`}
                variant="light"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden aspect-[4/5]">
              <img
                src={OWNER_PHOTOS.hydroShieldSuit}
                alt="Seth Williams suited up in ShuBee Hydro Shield gear beside his work van"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FERNCO BRAND AMBASSADOR PRESENTATION — Warm Ivory #FFF9EF */}
      <section className="bg-[#FFF9EF] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="overflow-hidden">
              <img
                src={OWNER_PHOTOS.ferncoPortrait}
                alt="Seth Williams, official Fernco Brand Ambassador"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-7 max-w-2xl">
            <div className="mb-6">
              <img
                src={BRAND_PROFILE.ferncoLogo}
                alt="Fernco official logo"
                className="h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#235DEB] mb-2">
              OFFICIAL BRAND AMBASSADOR
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C]">
              Fernco Brand Ambassador
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#303E48] leading-relaxed">
              Fernco officially features Seth Williams (@thefixitdad) among its
              team of trade brand ambassadors, highlighting his background as a
              U.S. Marine Corps veteran, plumber, husband, and father of two
              sharing authentic plumbing craft with future prospects and
              homeowners.
            </p>
            <div className="mt-7">
              <BorderlessCTA
                label="VIEW FERNCO AMBASSADOR PROFILE"
                href={BRAND_PROFILE.ferncoProfileUrl}
                external
                variant="blue"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SHUBEE ACTIVE PARTNER PRESENTATION — Soft Mint #E6F5ED */}
      <section className="bg-[#E6F5ED] py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 lg:order-1 order-2 max-w-2xl">
            <div className="mb-5">
              <img
                src={BRAND_PROFILE.shubeeLogo}
                alt="ShuBee official logo"
                className="h-20 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#14BDB2] mb-2">
              VERIFIED ACTIVE TRADE PARTNER
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C]">
              ShuBee Partner &amp; Field Showcase
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#303E48] leading-relaxed">
              Actively featured across Seth&rsquo;s channel—including his trip
              to ShuBee headquarters and field demonstrations of Bee Armor stair
              protection, Hydro Shield suits, Ugly Gloves, and ShuBee Leak
              Detection Tablets during residential shower-pan tests.
            </p>
            <div className="mt-7 flex flex-wrap gap-8">
              <BorderlessCTA
                label="VISIT SHUBEE.COM"
                href={BRAND_PROFILE.shubeeUrl}
                external
                variant="dark"
              />
              <BorderlessCTA
                label="WATCH SHUBEE HQ TRIP"
                href="https://www.youtube.com/watch?v=wgJwUktrHcI"
                external
                variant="blue"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:order-2 order-1">
            <div className="overflow-hidden">
              <img
                src={OWNER_PHOTOS.beeArmorStairs}
                alt="Seth Williams installing ShuBee Bee Armor protective stair runner"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* COLLABORATION ENQUIRIES & CONTACT FORM (#contact) — Ice Blue #E5F2FF */}
      <section id="contact" className="bg-[#E5F2FF] py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left Column: Direct Email & Verified Social Links */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#235DEB] mb-3">
              WORK WITH SETH WILLIAMS
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#17232C] leading-tight">
              Collaboration &amp; Sponsorship Enquiries
            </h2>
            <p className="mt-5 text-base text-[#303E48] leading-relaxed">
              Reach out directly for brand collaborations, sponsored content,
              product reviews, trade events, or general enquiries.
            </p>

            <div className="mt-10 pt-8 border-t border-[#303E48]/15">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#303E48]/70 mb-1">
                Official Collaboration Email
              </p>
              <a
                href={`mailto:${BRAND_PROFILE.email}`}
                className="font-display font-bold text-2xl sm:text-3xl text-[#235DEB] hover:text-[#FF873F] transition-colors break-all"
              >
                {BRAND_PROFILE.email}
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-[#303E48]/15">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#303E48]/70 mb-4">
                Official Social Channels
              </p>
              <div className="divide-y divide-[#303E48]/15">
                {SOCIAL_CHANNELS.map((ch) => (
                  <a
                    key={ch.id}
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 flex items-center justify-between text-[#17232C] hover:text-[#235DEB] transition-colors font-semibold text-base"
                  >
                    <span>
                      {ch.name}{' '}
                      <span className="font-normal text-sm text-[#303E48]/70">
                        ({ch.handle})
                      </span>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Borderless-Underline Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Hidden Honeypot for Bot Protection */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-field">Website</label>
                <input
                  id="website-field"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, website: e.target.value }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#17232C] mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Jordan Taylor"
                    className="field-underline"
                  />
                  {fieldErrors.name && (
                    <p className="mt-2 text-xs font-semibold text-red-700">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#17232C] mb-1"
                  >
                    Company / Brand
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, company: e.target.value }))
                    }
                    placeholder="Optional"
                    className="field-underline"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#17232C] mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@company.com"
                    className="field-underline"
                  />
                  {fieldErrors.email && (
                    <p className="mt-2 text-xs font-semibold text-red-700">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-type"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#17232C] mb-1"
                  >
                    Enquiry Type *
                  </label>
                  <select
                    id="contact-type"
                    value={form.enquiryType}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        enquiryType: e.target.value,
                      }))
                    }
                    className="field-underline cursor-pointer"
                  >
                    {ENQUIRY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.enquiryType && (
                    <p className="mt-2 text-xs font-semibold text-red-700">
                      {fieldErrors.enquiryType}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#17232C] mb-1"
                >
                  Project / Collaboration Details *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="Share details on your product, campaign timeline, or question for Seth..."
                  className="field-underline resize-y"
                />
                {fieldErrors.message && (
                  <p className="mt-2 text-xs font-semibold text-red-700">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {submitStatus && (
                <div
                  role="status"
                  className={`py-4 border-t-2 flex items-start gap-3 ${
                    submitStatus.kind === 'success'
                      ? 'border-[#14BDB2] text-[#17232C]'
                      : 'border-red-600 text-red-800'
                  }`}
                >
                  {submitStatus.kind === 'success' ? (
                    <CheckCircle2
                      className="w-5 h-5 text-[#14BDB2] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <AlertCircle
                      className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    {submitStatus.text}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <BorderlessCTA
                  type="submit"
                  label={submitting ? 'SENDING ENQUIRY...' : 'SUBMIT ENQUIRY'}
                  disabled={submitting}
                  variant="blue"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
