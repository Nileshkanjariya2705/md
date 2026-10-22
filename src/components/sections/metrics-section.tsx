import React from 'react';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { MobileCardScroll } from '@/components/ui/mobile-card-scroll';
import { FolderCheck, Smile, Award, ShieldCheck } from 'lucide-react';

const METRICS = [
  {
    icon: FolderCheck,
    value: '150+',
    label: 'Projects Delivered',
    desc: 'Across 12 enterprise sectors',
  },
  {
    icon: Smile,
    value: '99.8%',
    label: 'Satisfaction Rate',
    desc: 'Verified client reviews',
  },
  {
    icon: Award,
    value: '12+ Years',
    label: 'Staff Experience',
    desc: 'Senior architects & engineers',
  },
  {
    icon: ShieldCheck,
    value: '99.99%',
    label: 'Uptime Reliability',
    desc: 'Mission-critical availability',
  },
];

export function MetricsSection() {
  return (
    <section className="py-20 border-y border-slate-200/80 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[300px] bg-[#2f6bff]/5 blur-[120px] rounded-full" />

      <Container>
        <MobileCardScroll
          gridClassName="sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
          cardWidthClass="w-[72vw] max-w-[280px] sm:w-auto"
        >
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Card
                key={idx}
                className="relative p-7 bg-white/95 backdrop-blur-xs border-slate-200/90 rounded-3xl hover:border-[#2f6bff]/40 hover:shadow-[0_12px_32px_rgba(47,107,255,0.12)] transition-all duration-300 flex flex-col items-center text-center group overflow-hidden h-full"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2f6bff] via-[#3d7eff] to-[#19c3d8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="h-12 w-12 rounded-2xl bg-[#2f6bff]/8 text-[#2f6bff] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#2f6bff] group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-[#2f6bff] to-[#19c3d8] bg-clip-text text-transparent">
                  <AnimatedCounter value={metric.value} duration={1900} />
                </div>

                <div className="mt-3 text-base font-bold text-[#14233a] group-hover:text-[#2f6bff] transition-colors">
                  {metric.label}
                </div>

                <div className="mt-1 text-xs text-[#64748b]">
                  {metric.desc}
                </div>
              </Card>
            );
          })}
        </MobileCardScroll>
      </Container>
    </section>
  );
}
