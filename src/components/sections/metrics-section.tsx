import React from 'react';
import { Container } from '@/components/layout/container';
import { Card } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
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
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full" />

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Card
                key={idx}
                className="relative p-7 bg-white/95 backdrop-blur-sm border-slate-200/90 rounded-3xl hover:border-teal-500/40 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group overflow-hidden"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-600 bg-clip-text text-transparent">
                  <AnimatedCounter value={metric.value} duration={1900} />
                </div>

                <div className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {metric.label}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {metric.desc}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
