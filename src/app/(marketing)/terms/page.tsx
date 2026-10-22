import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { CheckCircle2, Shield, Scale, FileCode, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms of service governing client partnerships, engineering milestones, and consulting agreements with Magnovaa Technology.',
  alternates: {
    canonical: 'https://magnovaa.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Magnovaa Technology',
    description:
      'Read the terms of service governing client partnerships, engineering milestones, and consulting agreements with Magnovaa Technology.',
    url: 'https://magnovaa.com/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Magnovaa Technology',
    description:
      'Read the terms of service governing client partnerships, engineering milestones, and consulting agreements with Magnovaa Technology.',
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
      name: 'Terms of Service',
      item: 'https://magnovaa.com/terms',
    },
  ],
};

export default function TermsOfServicePage() {
  const lastUpdated = 'October 18, 2026';

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Container>
        {/* Navigation back */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#2f6bff] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        {/* Page Hero */}
        <SectionHeading
          as="h1"
          badge="Terms of Service"
          title="Master Services Terms & Conditions"
          description={`Governing commercial engineering agreements, project delivery, and digital intellectual property. Last updated: ${lastUpdated}.`}
        />

        <div className="max-w-4xl mx-auto space-y-10 text-slate-600 leading-relaxed text-base">
          {/* Section 1 */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#14233a] flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-[#2f6bff]" />
              1. Engagement Models & Scope
            </h2>
            <p>
              Magnovaa Technology (&quot;Magnovaa&quot;) delivers bespoke software architecture, generative artificial intelligence pipelines, cloud migrations, and dedicated engineering squad services.
            </p>
            <p>
              All client initiatives are governed by mutually executed Statements of Work (SOW) defining sprint cadence, technical deliverables, performance milestones, and acceptance criteria.
            </p>
          </section>

          {/* Section 2 */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#14233a] flex items-center gap-2.5">
              <FileCode className="h-5 w-5 text-[#2f6bff]" />
              2. Deliverables & Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise agreed in a customized enterprise agreement, 100% of all custom software code, database schemas, APIs, UI/UX designs, and documentation developed by Magnovaa for a client become the exclusive intellectual property of the client upon receipt of contractually agreed milestone fees.
            </p>
            <p>
              Magnovaa retains ownership of its preexisting background technology, general-purpose utilities, and open-source libraries that are licensed under standard permissive terms (e.g., MIT, Apache 2.0).
            </p>
          </section>

          {/* Section 3 */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#14233a] flex items-center gap-2.5">
              <Shield className="h-5 w-5 text-[#2f6bff]" />
              3. Service Level Agreements & Warranties
            </h2>
            <p>
              Magnovaa warrants that all production code is developed in accordance with prevailing software engineering best practices, passes automated static analysis, and complies with agreed security standards.
            </p>
            <p>
              We provide post-deployment warranty periods on bespoke deliverables to rectify functional defects within the contracted scope at zero additional cost.
            </p>
          </section>

          {/* Section 4 */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#14233a] flex items-center gap-2.5">
              <Scale className="h-5 w-5 text-[#2f6bff]" />
              4. Governing Law & Inquiries
            </h2>
            <p>
              These Terms and any dispute arising from them shall be governed by and construed in accordance with applicable commercial laws.
            </p>
            <p>
              Questions regarding these Terms should be directed to{' '}
              <a href="mailto:hello@magnovaa.com" className="text-[#2f6bff] font-semibold hover:underline">
                hello@magnovaa.com
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
