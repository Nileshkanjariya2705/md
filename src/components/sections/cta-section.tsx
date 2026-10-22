import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-[#14233a] to-[#0b1320] p-10 sm:p-16 text-center shadow-2xl overflow-hidden">
          {/* Accent lighting glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#2f6bff]/20 via-[#19c3d8]/10 to-transparent blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-[#19c3d8]" />
              <span>Let&apos;s Build Together</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Ready to Turn Vision Into a Scalable Digital Reality?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Schedule a technical scoping session with our principal engineers. We will analyze your architecture and produce an actionable roadmap within 48 hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto rounded-full shadow-lg">
                <Link href="/contact" className="gap-2">
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 hover:text-white"
              >
                <Link href="/projects">
                  Explore Past Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
