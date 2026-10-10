import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

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
            'inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-700 tracking-wide uppercase mb-4 shadow-sm'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
