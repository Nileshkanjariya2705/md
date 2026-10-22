'use client';

import React, { useRef, useState, useEffect, Children } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronRight } from 'lucide-react';

export interface MobileCardScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gridClassName?: string;
  itemClassName?: string;
  cardWidthClass?: string;
  showIndicators?: boolean;
  showSwipeHint?: boolean;
}

/**
 * MobileCardScroll
 *
 * Provides a responsive container that converts traditional grid-stacked cards into a fluid,
 * touch-friendly horizontal swipe carousel with snap physics and animated indicators on mobile devices,
 * while seamlessly retaining the original grid layout on tablet/desktop viewports.
 */
export function MobileCardScroll({
  children,
  className,
  gridClassName = 'md:grid-cols-2 lg:grid-cols-3 md:gap-8',
  itemClassName,
  cardWidthClass = 'w-[84vw] max-w-[340px] sm:w-[350px]',
  showIndicators = true,
  showSwipeHint = true,
  ...props
}: MobileCardScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const childArray = Children.toArray(children).filter(Boolean);
  const totalItems = childArray.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || totalItems <= 1) return;

    const handleScroll = () => {
      if (!hasScrolled && el.scrollLeft > 25) {
        setHasScrolled(true);
      }
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.scrollWidth / totalItems;
      const newIndex = Math.min(
        Math.max(Math.round(scrollLeft / cardWidth), 0),
        totalItems - 1
      );
      setActiveIndex(newIndex);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [totalItems, hasScrolled]);

  const scrollToCard = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardElements = el.children;
    if (cardElements[index]) {
      (cardElements[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className={cn('relative w-full', className)} {...props}>
      {/* Mobile Swipe Cue Animation */}
      {showSwipeHint && totalItems > 1 && !hasScrolled && (
        <div className="flex md:hidden items-center justify-end gap-1 mb-2 text-[11px] font-semibold text-[#2f6bff] animate-pulse transition-opacity duration-300 pr-1">
          <span>Swipe cards</span>
          <ChevronRight className="h-3.5 w-3.5 animate-pulse-swipe" />
        </div>
      )}

      {/* Main Track: Horizontal scroll on mobile, responsive grid on desktop */}
      <div
        ref={scrollRef}
        className={cn(
          'flex md:grid overflow-x-auto md:overflow-visible pb-4 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 gap-4 sm:gap-6 md:gap-8 snap-x snap-mandatory scroll-smooth no-scrollbar items-stretch',
          gridClassName
        )}
      >
        {childArray.map((child, idx) => (
          <div
            key={idx}
            className={cn(
              'shrink-0 snap-center md:shrink md:w-auto md:max-w-none md:snap-align-none transition-all duration-300 flex flex-col',
              cardWidthClass,
              itemClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Mobile Indicator Dots with Smooth Morph Animation */}
      {showIndicators && totalItems > 1 && (
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 pt-1">
          {childArray.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Scroll to card ${idx + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 focus:outline-none',
                activeIndex === idx
                  ? 'w-6 bg-[#2f6bff] shadow-sm shadow-[#2f6bff]/30'
                  : 'w-1.5 bg-slate-200 hover:bg-slate-300'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
