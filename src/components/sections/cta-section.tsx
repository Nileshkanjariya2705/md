import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="relative rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50/80 via-white to-teal-50/40 p-10 sm:p-16 text-center shadow-xl overflow-hidden">
          {/* Accent lighting glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-teal-500/10 via-cyan-500/5 to-transparent blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-100/70 px-3.5 py-1 text-xs font-semibold text-teal-800">
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span>Let&apos;s Build Together</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Ready to Turn Vision Into a Scalable Digital Reality?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Schedule a technical scoping session with our principal engineers. We will analyze your architecture and produce an actionable roadmap within 48 hours.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto rounded-2xl shadow-md">
                <Link href="/contact" className="gap-2">
                  <span>Schedule Consultation</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-2xl">
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
