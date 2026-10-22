import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ShieldCheck, Sparkles, Terminal, Zap, Users2, Activity } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between overflow-hidden pt-28 pb-16">
      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Central Radial Blue Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-[#2f6bff]/10 via-[#19c3d8]/8 to-transparent blur-[140px] rounded-full" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #14233a 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <Container className="relative z-10 text-center my-auto">
        {/* Top Tag / Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2f6bff]/20 bg-[#2f6bff]/6 px-4 py-1.5 text-xs font-semibold text-[#2f6bff] mb-8 backdrop-blur-md shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#2f6bff]" />
          <span>Next-Generation Software & AI Engineering</span>
        </div>

        {/* Primary Headline */}
        <h1 className="mx-auto max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#14233a] leading-[1.08]">
          Building Digital Experiences That{' '}
          <span className="bg-gradient-to-r from-[#2f6bff] via-[#3d7eff] to-[#19c3d8] bg-clip-text text-transparent">
            Drive Exponential Growth
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-[#64748b] leading-relaxed font-normal">
          Magnovaa designs and engineers high-throughput platforms, generative AI architectures, and resilient enterprise applications for category-defining businesses.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto rounded-full shadow-md">
            <Link href="/contact" className="gap-2">
              <span>Start Your Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-full"
          >
            <Link href="/projects" className="gap-2">
              <span>View Our Work</span>
              <Terminal className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>

      {/* Trust Badges Bar — Synkro-Inspired Trust Row */}
      <div className="relative z-10 mt-16 pt-8 border-t border-slate-200/80 bg-slate-50/70 backdrop-blur-xs">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-2">
            <div className="flex items-center gap-3 p-2">
              <div className="h-8 w-8 rounded-lg bg-[#2f6bff]/10 text-[#2f6bff] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#14233a]">Enterprise Grade</div>
                <div className="text-[11px] text-[#64748b]">SOC2 & HIPAA Compliant</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="h-8 w-8 rounded-lg bg-[#2f6bff]/10 text-[#2f6bff] flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#14233a]">99.99% Reliability</div>
                <div className="text-[11px] text-[#64748b]">Mission-Critical SLAs</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="h-8 w-8 rounded-lg bg-[#2f6bff]/10 text-[#2f6bff] flex items-center justify-center shrink-0">
                <Users2 className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#14233a]">Dedicated Squads</div>
                <div className="text-[11px] text-[#64748b]">Senior Architects Only</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="h-8 w-8 rounded-lg bg-[#2f6bff]/10 text-[#2f6bff] flex items-center justify-center shrink-0">
                <Activity className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#14233a]">Sub-50ms Latency</div>
                <div className="text-[11px] text-[#64748b]">Global Edge Optimized</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
