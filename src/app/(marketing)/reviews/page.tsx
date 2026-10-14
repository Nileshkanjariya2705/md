import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Card } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { MobileCardScroll } from '@/components/ui/mobile-card-scroll';
import { ReviewsGrid } from '@/components/reviews/reviews-grid';
import { CTASection } from '@/components/sections/cta-section';
import { getPublishedReviews } from '@/features/reviews/services/review.service';
import { Star, ShieldCheck, Award, ThumbsUp, Sparkles, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Client Reviews & Endorsements | Mogovaa Technology',
  description:
    'Read authentic verified reviews and endorsements from founders, CTOs, and product executives who trust Mogovaa Technology for digital engineering.',
};

const STATS = [
  {
    icon: Star,
    value: '4.95 / 5.0',
    label: 'Client Satisfaction Rating',
    sub: 'Across 40+ production launches',
  },
  {
    icon: ShieldCheck,
    value: '99.99%',
    label: 'Uptime Reliability SLA',
    sub: 'Mission-critical cloud software',
  },
  {
    icon: Award,
    value: '100%',
    label: 'On-Time Milestone Delivery',
    sub: 'Agile sprints with daily visibility',
  },
  {
    icon: ThumbsUp,
    value: '92%',
    label: 'Client Long-Term Retention',
    sub: 'Multi-year partnership extensions',
  },
];

export default async function ReviewsPage() {
  const reviews = await getPublishedReviews();

  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Page Heading */}
        <SectionHeading
          badge="Client Endorsements"
          title="Proven Execution. Endorsed by Technology Leaders."
          description="Read authentic experiences from technology founders, CTOs, and digital leaders who trust Mogovaa Technology to build, modernize, and scale their core platforms."
        />

        {/* Stats Showcase */}
        <MobileCardScroll
          gridClassName="sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mb-20"
          cardWidthClass="w-[72vw] max-w-[280px] sm:w-auto"
        >
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                className="p-6 bg-white border-slate-200 shadow-sm hover:border-teal-500/40 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      <AnimatedCounter value={stat.value} duration={1800} />
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{stat.label}</h4>
                  <p className="text-xs text-slate-500">{stat.sub}</p>
                </div>
              </Card>
            );
          })}
        </MobileCardScroll>

        {/* Interactive Filterable Reviews Grid */}
        <ReviewsGrid initialReviews={reviews} />

        {/* Enterprise Trust Box */}
        <div className="mt-20 rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-50/50 via-white to-slate-50 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-3 py-1 text-xs font-bold text-teal-800 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Our Partnership Pledge
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Direct Senior Ownership. Never Subcontracted.
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              When you engage Mogovaa Technology, your product is personally architected and implemented by principal engineers. We maintain transparent sprint burndowns, shared Slack channels, and automated code review pipelines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-teal-200/60 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-600" /> Full IP & Code Ownership
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-teal-600" /> Enterprise NDAs & SOC2
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-teal-600" /> 100% Satisfaction Guarantee
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CTA */}
      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
