'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Rocket, 
  Users, 
  Building2, 
  Clock, 
  Lock,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

import { PricingPlan } from '@/features/pricing/types';
import { MOCK_PRICING_PLANS } from '@/features/pricing/data/mock-pricing';
import { useActivePricingQuery } from '@/features/pricing/hooks/use-pricing-query';

interface PricingSectionProps {
  initialPlans?: PricingPlan[];
}

export function PricingSection({ initialPlans }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const { data: plans = initialPlans || MOCK_PRICING_PLANS } = useActivePricingQuery(initialPlans);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-50/60 scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-teal-500/5 via-cyan-500/5 to-transparent blur-[140px] rounded-full" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-semibold text-teal-800 mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Transparent Engineering Investment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Predictable Pricing Plans Built for Scale
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Choose the model that fits your company stage. No hidden fees, no lengthy onboarding delays, and 100% intellectual property ownership from day one.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-200/80 border border-slate-300/80">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200',
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              Monthly Retainer
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('quarterly')}
              className={cn(
                'px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5',
                billingCycle === 'quarterly'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <span>Quarterly Engagement</span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {plans.map((plan) => {
            const isCustom = typeof plan.monthlyPrice === 'string';
            const price = isCustom
              ? 'Custom'
              : billingCycle === 'quarterly'
              ? plan.quarterlyPrice.toLocaleString()
              : plan.monthlyPrice.toLocaleString();

            return (
              <Card
                key={plan.id}
                className={cn(
                  'rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 relative',
                  plan.popular
                    ? 'border-2 border-teal-500 bg-white shadow-2xl shadow-teal-500/10 lg:-translate-y-2'
                    : 'border border-slate-200/90 bg-white/95 hover:border-slate-300 hover:shadow-xl'
                )}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md shadow-teal-600/30 flex items-center gap-1.5">
                    <Zap className="h-3 w-3 fill-white" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        'text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full',
                        plan.popular
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      )}
                    >
                      {plan.badge}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {plan.deliveryTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">
                    {plan.tagline}
                  </p>

                  {/* Price Block */}
                  <div className="my-6 py-5 px-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      {!isCustom && (
                        <span className="text-2xl font-extrabold text-slate-900">$</span>
                      )}
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {price}
                      </span>
                      {!isCustom && (
                        <span className="text-xs font-semibold text-slate-500">
                          / {plan.billingPeriod}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'quarterly' && !isCustom && plan.id === 'dedicated-pod' && (
                      <p className="mt-1 text-[11px] font-semibold text-teal-700">
                        Billed quarterly at $22,950 (saves $4,047)
                      </p>
                    )}
                    {isCustom && (
                      <p className="mt-1 text-[11px] font-semibold text-slate-500">
                        Scoped specifically to your infrastructure requirements
                      </p>
                    )}
                  </div>

                  {/* Team Pod Breakdown */}
                  <div className="mb-6 pb-6 border-b border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Users className="h-4 w-4 text-teal-600 shrink-0" />
                      <span>{plan.teamSetup}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 pl-6">
                      <span className="font-semibold text-slate-700">Best for:</span> {plan.idealFor}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-[11px] uppercase font-bold tracking-wider text-slate-900">
                      What&apos;s Included:
                    </h4>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-snug">
                          <div className={cn(
                            'h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                            plan.popular ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-700'
                          )}>
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA & Technologies */}
                <div>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {plan.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      'w-full rounded-2xl font-bold shadow-sm py-3 transition-all duration-200',
                      plan.popular
                        ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-teal-600/20 shadow-md'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    )}
                  >
                    <Link href={plan.ctaHref} className="gap-2 justify-center">
                      <span>{plan.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trust Badges & Guarantees */}
        <div className="mt-16 max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">100% IP Ownership</h5>
                <p className="text-[11px] text-slate-500">You own all source code and assets.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Day-1 Mutual NDA</h5>
                <p className="text-[11px] text-slate-500">Your proprietary ideas remain confidential.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">48-Hour Kickoff</h5>
                <p className="text-[11px] text-slate-500">Start development without hiring delays.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Zero Lock-In</h5>
                <p className="text-[11px] text-slate-500">Pause or transition pods with 14-day notice.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
