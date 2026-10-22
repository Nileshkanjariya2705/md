import React from 'react';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';
import { Gauge, Users2, ShieldAlert, Award, Clock4, Infinity } from 'lucide-react';

const ADVANTAGES = [
  {
    icon: Gauge,
    title: 'Velocity Without Technical Debt',
    desc: 'We enforce clean architecture patterns and automated test coverage so speed never comes at the cost of stability.',
  },
  {
    icon: Users2,
    title: 'Senior Engineers Only',
    desc: 'You work directly with principal engineers, architects, and product leads. No junior bait-and-switch.',
  },
  {
    icon: ShieldAlert,
    title: 'Zero Failure Tolerance',
    desc: 'Our distributed systems are architected with automatic failovers, rate limiters, and circuit breakers.',
  },
  {
    icon: Award,
    title: 'Bespoke Craftsmanship',
    desc: 'No generic boilerplate templates. Every interaction and pipeline is designed specifically for your competitive advantage.',
  },
  {
    icon: Clock4,
    title: 'Transparent Sprints & Milestones',
    desc: 'Real-time visibility into burndown charts, staging deployments, and weekly synchronous demo checkpoints.',
  },
  {
    icon: Infinity,
    title: 'End-to-End Ownership',
    desc: 'From initial requirements discovery through post-launch observability and infrastructure tuning.',
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-24 bg-white relative">
      <Container>
        <SectionHeading
          badge="The Magnovaa Advantage"
          title="Why Forward-Thinking Leaders Partner With Us"
          description="We combine engineering excellence with business pragmatism to deliver software that produces measurable enterprise outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <Card
                key={idx}
                className="group p-8 rounded-2xl border border-slate-200/90 bg-white hover:border-[#2f6bff]/40 hover:shadow-[0_12px_32px_rgba(47,107,255,0.08)] transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-[#2f6bff]/8 text-[#2f6bff] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#2f6bff] group-hover:text-white transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[#14233a] group-hover:text-[#2f6bff] transition-colors mb-2">
                  {adv.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {adv.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
