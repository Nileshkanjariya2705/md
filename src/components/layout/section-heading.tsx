import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  className,
  as = 'h2',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const HeadingTag = as;

  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        isCenter ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            'inline-flex items-center gap-2 rounded-full border border-[#2f6bff]/20 bg-[#2f6bff]/6 px-3.5 py-1 text-[11px] font-bold text-[#2f6bff] tracking-wider uppercase mb-4 shadow-xs'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f6bff] animate-pulse" />
          {badge}
        </div>
      )}
      <HeadingTag className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#14233a] leading-[1.15]">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#64748b] leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
