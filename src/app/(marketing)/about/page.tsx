import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { TeamPreview } from '@/components/sections/team-preview';
import { CTASection } from '@/components/sections/cta-section';
import { getActiveTeamMembers } from '@/features/team/services/team.service';
import { Target, Compass, Zap, Shield, HeartHandshake, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Magnovaa Technology, our engineering principles, mission, leadership, and our dedication to digital excellence.',
  alternates: {
    canonical: 'https://magnovaa.com/about',
  },
  openGraph: {
    title: 'About Us | Magnovaa Technology',
    description:
      'Learn about Magnovaa Technology, our engineering principles, mission, leadership, and our dedication to digital excellence.',
    url: 'https://magnovaa.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Magnovaa Technology',
    description:
      'Learn about Magnovaa Technology, our engineering principles, mission, leadership, and our dedication to digital excellence.',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://magnovaa.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: 'https://magnovaa.com/about',
    },
  ],
};

const VALUES = [
  {
    icon: Zap,
    title: 'Relentless Craftsmanship',
    desc: 'Every function, schema, and animation is scrutinized for performance, clarity, and durability.',
  },
  {
    icon: Shield,
    title: 'Architectural Integrity',
    desc: 'We never take shortcuts that compound technical debt. Systems are engineered to withstand stress and scale effortlessly.',
  },
  {
    icon: HeartHandshake,
    title: 'Radical Transparency',
    desc: 'Unfiltered communication, realistic milestone projections, and direct engineer-to-stakeholder collaboration.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    desc: 'We aggressively explore and benchmark emerging paradigms in AI, cloud-native runtimes, and frontend acceleration.',
  },
];

export default async function AboutPage() {
  const teamMembers = await getActiveTeamMembers();

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2f6bff]/5 blur-[140px] rounded-full" />

        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2f6bff]/20 bg-[#2f6bff]/6 px-4 py-1.5 text-xs font-semibold text-[#2f6bff] mb-6 uppercase tracking-wider shadow-xs">
            About Magnovaa Technology
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#14233a] tracking-tight leading-[1.1]">
            Engineering What&apos;s Next with{' '}
            <span className="bg-gradient-to-r from-[#2f6bff] via-[#3d7eff] to-[#19c3d8] bg-clip-text text-transparent">
              Precision & Purpose
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#64748b] leading-relaxed font-normal">
            Founded by veteran software architects, Magnovaa Technology was established to bridge the divide between corporate development agencies and high-velocity boutique product studios. We craft software that empowers visionary companies.
          </p>
        </Container>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 bg-slate-50/80 border-y border-slate-200">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:border-[#2f6bff]/30 hover:shadow-[0_12px_32px_rgba(47,107,255,0.08)] transition-all relative overflow-hidden">
              <div className="h-12 w-12 rounded-2xl bg-[#2f6bff]/8 text-[#2f6bff] flex items-center justify-center mb-6">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#14233a] mb-3">Our Mission</h3>
              <p className="text-[#64748b] text-base leading-relaxed">
                To engineer resilient, high-impact digital platforms that eliminate operational friction, unlock exponential business growth, and set benchmarks for software quality.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:border-[#19c3d8]/40 hover:shadow-[0_12px_32px_rgba(25,195,216,0.08)] transition-all relative overflow-hidden">
              <div className="h-12 w-12 rounded-2xl bg-[#19c3d8]/10 text-[#0c7c8a] flex items-center justify-center mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#14233a] mb-3">Our Vision</h3>
              <p className="text-[#64748b] text-base leading-relaxed">
                To become the world&apos;s most trusted engineering partner for enterprise leaders and high-growth pioneers who demand flawless digital execution.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story Narrative & Office Image */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Magnovaa engineering team collaboration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14233a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold text-[#19c3d8]">
                  Global Distributed Engineering Hub
                </p>
                <p className="text-xs text-slate-300">
                  Collaborating across San Francisco, London, Zurich & Singapore
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <SectionHeading
                align="left"
                badge="Our Philosophy"
                title="Code Is an Asset, Not an Expense"
                description="We treat every system we construct as an engine for enterprise leverage."
                className="mb-4"
              />
              <p className="text-[#64748b] leading-relaxed text-sm sm:text-base">
                Software fails when agencies optimize for billable hours rather than long-term architecture. We invert this model: our squad members are incentivized by product speed, reliability, and business impact.
              </p>
              <p className="text-[#64748b] leading-relaxed text-sm sm:text-base">
                Whether deploying zero-latency trading APIs, autonomous AI agents, or cross-platform applications, our teams bring unmatched discipline and design aesthetics to every milestone.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-200">
        <Container>
          <SectionHeading
            badge="Guiding Principles"
            title="The Values That Govern Our Code"
            description="Our core commitments dictate how we architect solutions, review pull requests, and support our partners."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#2f6bff]/40 hover:shadow-md transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-[#2f6bff]/8 text-[#2f6bff] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#14233a] mb-2">{val.title}</h4>
                  <p className="text-sm text-[#64748b] leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Leadership Team */}
      <TeamPreview team={teamMembers} />

      {/* CTA */}
      <CTASection />
    </div>
  );
}
