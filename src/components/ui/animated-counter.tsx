'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  /** The value string (e.g. '50+', '99.8%', '12+ Years', '4.95 / 5.0', '150k+') or number */
  value: string | number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** CSS class name for styling */
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1800,
  className,
}: AnimatedCounterProps) {
  const valueStr = String(value);
  const [display, setDisplay] = useState<string>(valueStr);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const frameIdRef = useRef<number | null>(null);

  // Parse prefix, target number, decimals, and suffix
  // e.g. "99.8%" -> prefix="", number=99.8, decimals=1, suffix="%"
  // e.g. "12+ Years" -> prefix="", number=12, decimals=0, suffix="+ Years"
  // e.g. "4.95 / 5.0" -> prefix="", number=4.95, decimals=2, suffix=" / 5.0"
  const parseValue = (str: string) => {
    const match = str.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) {
      return null;
    }
    const prefix = match[1];
    const target = parseFloat(match[2]);
    const decMatch = match[2].split('.');
    const decimals = decMatch.length > 1 ? decMatch[1].length : 0;
    const suffix = match[3];

    return { prefix, target, decimals, suffix };
  };

  useEffect(() => {
    const parsed = parseValue(valueStr);
    if (!parsed) return;

    const el = containerRef.current;
    if (!el) return;

    // Reset if value changes
    hasAnimatedRef.current = false;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const { prefix, target, decimals, suffix } = parsed;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic curve: fast start, smooth gentle deceleration
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = target * easedProgress;

        const formattedNum = currentVal.toFixed(decimals);
        setDisplay(`${prefix}${formattedNum}${suffix}`);

        if (progress < 1) {
          frameIdRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(valueStr);
        }
      };

      frameIdRef.current = requestAnimationFrame(animate);
    };

    if (typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            startAnimation();
          }
        });
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [valueStr, duration]);

  return (
    <span ref={containerRef} className={className}>
      {display}
    </span>
  );
}
