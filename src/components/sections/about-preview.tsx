import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ArrowRight, CheckCircle2, Cpu, Rocket, Shield } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Left */}
          <div>
            <SectionHeading
              align="left"
              badge="Who We Are"
              title="Pioneering the Frontier of Digital Craftsmanship"
              description="At Magnovaa, we bridge the gap between high-velocity engineering and uncompromising aesthetic execution. We build digital ecosystems engineered to scale from day one."
              className="mb-8"
            />

            <div className="space-y-4 mb-8">
              {[
                {
                  title: 'Architectural Rigor',
                  desc: 'Distributed systems built for fault tolerance, sub-second latency, and horizontal scalability.',
                  icon: Cpu,
                },
                {
                  title: 'Full-Cycle Acceleration',
                  desc: 'Rapid ideation to production deployment with continuous integration and real-time monitoring.',
                  icon: Rocket,
                },
                {
                  title: 'Enterprise Security by Default',
                  desc: 'SOC2, GDPR, and ISO compliant architectures baked into every line of code.',
                  icon: Shield,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#2f6bff]/30 transition-colors">
                    <div className="rounded-xl bg-[#2f6bff]/8 p-2.5 text-[#2f6bff] shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#14233a]">{item.title}</h4>
                      <p className="text-sm text-[#64748b] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button asChild variant="outline" className="rounded-full">
              <Link href="/about" className="gap-2">
                Discover Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Graphic / Card Preview Right */}
          <div className="relative">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-rose-500" />
                  <span className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-mono text-[#2f6bff] font-semibold">system_health: optimal</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                    Deployment Pipeline
                  </div>
                  <div className="text-lg font-bold text-[#14233a] flex items-center justify-between">
                    <span>Zero Downtime Releases</span>
                    <span className="text-xs text-[#2f6bff] bg-[#2f6bff]/10 px-2.5 py-0.5 rounded-full border border-[#2f6bff]/20 font-semibold">
                      <AnimatedCounter value="100%" /> Automated
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
                    <div className="text-xs text-slate-500 font-semibold mb-1">API Latency</div>
                    <div className="text-2xl font-black text-[#19c3d8]">
                      <AnimatedCounter value="18ms" />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">p99 response time</div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
                    <div className="text-xs text-slate-500 font-semibold mb-1">Test Coverage</div>
                    <div className="text-2xl font-black text-[#2f6bff]">
                      <AnimatedCounter value="96.4%" />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Automated suites</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#2f6bff]/6 border border-[#2f6bff]/20 p-5 flex items-center gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#2f6bff] shrink-0" />
                  <div className="text-xs text-slate-700">
                    <strong className="text-[#14233a]">Continuous Engineering Partnership:</strong> Every client gains direct Slack access to our senior engineering squad.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
