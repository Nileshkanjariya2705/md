'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';
import {
  Target,
  Lightbulb,
  Users,
  Code2,
  CheckCircle2,
  Sprout,
  Zap,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface RoadmapStep {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  phase: string;
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    number: '01',
    icon: Target,
    title: 'Discovery & Analysis',
    description: 'We begin by understanding your unique challenges and opportunities.',
    features: [
      'In-depth business analysis',
      'Goal setting and KPI definition',
      'Technology stack assessment',
    ],
    phase: 'Phase 1 • Orientation',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy Creation',
    description: 'Developing a comprehensive AI implementation roadmap.',
    features: [
      'Custom solution blueprint',
      'Resource optimization plan',
      'ROI projection and timeline',
    ],
    phase: 'Phase 2 • Architecture',
  },
  {
    number: '03',
    icon: Users,
    title: 'Psychology-Based Design',
    description: 'Creating Intuitive Interfaces based on human behavior and cognitive patterns.',
    features: [
      'User behavior analysis',
      'Cognitive psychology principles',
      'Emotional design mapping',
    ],
    phase: 'Phase 3 • Experience',
  },
  {
    number: '04',
    icon: Code2,
    title: 'Development',
    description: 'Building your custom AI solution with cutting-edge technology.',
    features: [
      'Agile development process',
      'Regular progress updates',
      'Quality code architecture',
    ],
    phase: 'Phase 4 • Construction',
  },
  {
    number: '05',
    icon: CheckCircle2,
    title: 'Testing & Optimization',
    description: 'Ensuring perfect functionality and performance.',
    features: [
      'User experience testing',
      'Performance validation',
      'Security checks',
    ],
    phase: 'Phase 5 • Hardening',
  },
  {
    number: '06',
    icon: Sprout,
    title: 'Launch & Growth',
    description: 'Deploying your solution and ensuring continuous improvement.',
    features: [
      'Smooth deployment',
      '24/7 monitoring',
      'Ongoing support & updates',
    ],
    phase: 'Phase 6 • Evolution',
  },
];

export function ProcessSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const checkScrollState = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const cardWidth = 380;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveStepIndex(Math.min(Math.max(index, 0), ROADMAP_STEPS.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 400;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToStep = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.querySelectorAll('.roadmap-card');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <section id="process" className="py-24 bg-gradient-to-b from-white via-slate-50/70 to-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-[#2f6bff]/5 blur-[140px] rounded-full" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            badge="Execution Roadmap"
            title="Our Sequential Delivery Roadmap"
            description="A disciplined, step-by-step engineering journey engineered for speed, psychological resonance, and scale."
            align="left"
            className="mb-0 max-w-2xl"
          />

          {/* Navigation Controls */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-semibold mr-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
              <Compass className="h-3.5 w-3.5 text-[#2f6bff]" />
              <span>Scroll sequence &bull; 0{activeStepIndex + 1}/0{ROADMAP_STEPS.length}</span>
            </div>
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous roadmap step"
              className={cn(
                'h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-200',
                canScrollLeft
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-[#2f6bff]/10 hover:text-[#2f6bff] hover:border-[#2f6bff]/30 shadow-xs cursor-pointer'
                  : 'bg-slate-100/70 border-slate-200/50 text-slate-300 cursor-not-allowed'
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next roadmap step"
              className={cn(
                'h-11 w-11 rounded-full border flex items-center justify-center transition-all duration-200',
                canScrollRight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-[#2f6bff]/10 hover:text-[#2f6bff] hover:border-[#2f6bff]/30 shadow-xs cursor-pointer'
                  : 'bg-slate-100/70 border-slate-200/50 text-slate-300 cursor-not-allowed'
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Visual Map Timeline Header */}
        <div className="relative mb-8 hidden md:block">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#2f6bff] via-[#3d7eff] to-[#19c3d8] opacity-30" />
          <div
            className="absolute top-1/2 left-4 -translate-y-1/2 h-[2px] bg-[#2f6bff] transition-all duration-500"
            style={{ width: `${(activeStepIndex / (ROADMAP_STEPS.length - 1)) * 96}%` }}
          />

          {/* Node Milestones */}
          <div className="relative z-10 flex items-center justify-between">
            {ROADMAP_STEPS.map((step, idx) => {
              const isPastOrCurrent = idx <= activeStepIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div
                    className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border-2',
                      isPastOrCurrent
                        ? 'bg-[#2f6bff] border-white text-white shadow-md shadow-[#2f6bff]/30 ring-2 ring-[#2f6bff]/40 scale-105'
                        : 'bg-white border-slate-200 text-slate-400 group-hover:border-[#2f6bff]/40 group-hover:text-[#2f6bff]'
                    )}
                  >
                    {step.number}
                  </div>
                  <span
                    className={cn(
                      'text-[11px] font-semibold tracking-tight mt-1.5 transition-colors',
                      idx === activeStepIndex
                        ? 'text-[#2f6bff] font-bold'
                        : 'text-slate-500 group-hover:text-slate-900'
                    )}
                  >
                    {step.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory focus:outline-none no-scrollbar"
        >
          {ROADMAP_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === ROADMAP_STEPS.length - 1;

            return (
              <div
                key={step.number}
                className="roadmap-card snap-start shrink-0 w-[310px] sm:w-[360px] md:w-[390px] flex flex-col"
              >
                <Card className="relative p-7 sm:p-8 bg-white border-slate-200/90 rounded-3xl hover:border-[#2f6bff]/40 hover:shadow-[0_12px_32px_rgba(47,107,255,0.12)] transition-all duration-300 flex-1 flex flex-col justify-between group overflow-hidden">
                  <div>
                    {/* Top Icon Squircle */}
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f6bff] to-[#4f8aff] text-white shadow-md shadow-[#2f6bff]/20 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="h-7 w-7" />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#14233a] tracking-tight mb-2 group-hover:text-[#2f6bff] transition-colors">
                      {step.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p className="text-sm text-[#64748b] leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-3 pt-5 border-t border-slate-100">
                      {step.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="mt-0.5 shrink-0 h-4 w-4 rounded-full bg-[#2f6bff]/10 flex items-center justify-center">
                            <Zap className="h-2.5 w-2.5 text-[#2f6bff] fill-[#2f6bff]" />
                          </div>
                          <span className="font-medium leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-[#2f6bff] bg-[#2f6bff]/8 px-2.5 py-0.5 rounded-full border border-[#2f6bff]/20">
                      {step.phase}
                    </span>
                    {!isLast ? (
                      <span className="flex items-center gap-1 font-semibold text-slate-400 group-hover:text-[#2f6bff] transition-colors">
                        Next Phase <ArrowRight className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="font-bold text-[#2f6bff] flex items-center gap-1">
                        Deployment Goal &bull; Live
                      </span>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Scroll Progress Bar at Bottom */}
        <div className="mt-2 flex items-center justify-between max-w-sm mx-auto px-4">
          <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden mr-4">
            <div
              className="bg-gradient-to-r from-[#2f6bff] to-[#19c3d8] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((activeStepIndex + 1) / ROADMAP_STEPS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-500 shrink-0">
            Phase 0{activeStepIndex + 1} of 0{ROADMAP_STEPS.length}
          </span>
        </div>
      </Container>
    </section>
  );
}
