import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { TeamGrid } from '@/components/team/team-grid';
import { Button } from '@/components/ui/button';
import { CTASection } from '@/components/sections/cta-section';
import { getActiveTeamMembers } from '@/features/team/services/team.service';
import { ShieldCheck, Award, Zap, Code2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team & Engineering Leadership | MD Technologies',
  description:
    'Meet the principal engineers, distributed systems architects, and product design leaders behind MD Technologies.',
};

const TEAM_STATS = [
  {
    icon: Award,
    value: '100%',
    label: 'Senior & Staff Tier',
    desc: 'No junior outsourcing or handoffs',
  },
  {
    icon: Zap,
    value: '12+ Yrs',
    label: 'Average Experience',
    desc: 'Ex-FAANG & venture scale-up track records',
  },
  {
    icon: Code2,
    value: '40+',
    label: 'Production Systems',
    desc: 'Deployed with high-concurrency SLAs',
  },
  {
    icon: ShieldCheck,
    value: 'Zero-Debt',
    label: 'Architecture Rigor',
    desc: 'Mathematical design systems & strict tests',
  },
];

export default async function TeamPage() {
  const teamMembers = await getActiveTeamMembers();

  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* Page Heading */}
        <SectionHeading
          badge="Our Squad"
          title="Engineers, Architects & Innovators"
          description="We are an elite collective of senior technologists, distributed systems architects, and design leaders dedicated to building reliable, resilient, and beautifully crafted software."
        />

        {/* Squad Stat Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TEAM_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-teal-500/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{stat.label}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{stat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Filterable Team Grid */}
        <TeamGrid initialTeam={teamMembers} />

        {/* Culture & Hiring Callout */}
        <div className="mt-24 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-teal-500/20 blur-[100px] rounded-full" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Careers at MD
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 mb-4">
              Want to Build Mission-Critical Software With Us?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              We operate with high agency, deep technical autonomy, zero corporate bureaucracy, and market-leading compensation. Explore our open engineering positions.
            </p>
            <Button asChild size="lg" className="rounded-xl font-bold">
              <Link href="/career" className="gap-2">
                Explore Open Positions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
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
