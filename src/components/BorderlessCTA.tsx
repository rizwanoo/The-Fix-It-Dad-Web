import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface BorderlessCTAProps {
  label: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  external?: boolean;
  variant?: 'light' | 'dark' | 'blue' | 'orange' | 'lime';
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BorderlessCTAProps['variant']>, string> = {
  light: 'text-white hover:text-[#D9F05C]',
  dark: 'text-[#17232C] hover:text-[#235DEB]',
  blue: 'text-[#235DEB] hover:text-[#14BDB2]',
  orange: 'text-[#FF873F] hover:text-[#235DEB]',
  lime: 'text-[#D9F05C] hover:text-white',
};

export const BorderlessCTA: React.FC<BorderlessCTAProps> = ({
  label,
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  external = false,
  variant = 'dark',
  className = '',
}) => {
  const colorClass = VARIANT_CLASSES[variant];
  const icon = external ? (
    <ArrowUpRight className="w-4 h-4 cta-arrow shrink-0" aria-hidden="true" />
  ) : (
    <ArrowRight className="w-4 h-4 cta-arrow shrink-0" aria-hidden="true" />
  );

  const combined = `cta-borderless text-sm md:text-[15px] whitespace-nowrap shrink-0 ${colorClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combined}>
        <span>{label}</span>
        {icon}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={combined}
      >
        <span>{label}</span>
        {icon}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
};
