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
          badge="The MD Advantage"
          title="Why Forward-Thinking Leaders Partner With Us"
          description="We combine engineering excellence with business pragmatism to deliver software that produces measurable enterprise outcomes."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <Card
                key={idx}
                className="p-8 border-slate-200 bg-slate-50 hover:border-teal-500/40 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{adv.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{adv.desc}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
