import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Dynamic Ambient Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Central Radial Teal Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-teal-500/10 via-cyan-500/5 to-transparent blur-[140px] rounded-full" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <Container className="relative z-10 text-center">
        {/* Top Tag / Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-800 mb-8 backdrop-blur-md shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-teal-600" />
          <span>Next-Generation Software & AI Engineering</span>
        </div>

        {/* Primary Headline */}
        <h1 className="mx-auto max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
          Building Digital Experiences That{' '}
          <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
            Drive Exponential Growth
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
          MD designs and engineers high-throughput platforms, generative AI architectures, and resilient enterprise applications for category-defining businesses.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto rounded-2xl">
            <Link href="/contact" className="gap-2">
              <span>Start Your Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-2xl"
          >
            <Link href="/projects" className="gap-2">
              <span>View Our Work</span>
              <Terminal className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 uppercase tracking-widest font-semibold">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            <span>Enterprise Grade Security</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            <span>99.99% Reliability SLA</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            <span>Dedicated Squads</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
