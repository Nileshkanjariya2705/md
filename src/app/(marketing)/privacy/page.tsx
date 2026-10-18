import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the official privacy policy of Magnovaa Technology. Learn how we safeguard client confidentiality, project IP, and digital data.',
  alternates: {
    canonical: 'https://magnovaa.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Magnovaa Technology',
    description:
      'Read the official privacy policy of Magnovaa Technology. Learn how we safeguard client confidentiality, project IP, and digital data.',
    url: 'https://magnovaa.com/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Magnovaa Technology',
    description:
      'Read the official privacy policy of Magnovaa Technology. Learn how we safeguard client confidentiality, project IP, and digital data.',
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
      name: 'Privacy Policy',
      item: 'https://magnovaa.com/privacy',
    },
  ],
};

export default function PrivacyPolicyPage() {
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
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        {/* Page Hero */}
        <SectionHeading
          as="h1"
          badge="Security & Compliance"
          title="Privacy Policy & Data Protection"
          description={`Our commitment to enterprise data segregation, confidentiality, and transparency. Last updated: ${lastUpdated}.`}
        />

        <div className="max-w-4xl mx-auto space-y-10 text-slate-600 leading-relaxed text-base">
          {/* Section 1 */}
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-teal-600" />
              1. Information We Collect
            </h2>
            <p>
              Magnovaa Technology (&quot;Magnovaa&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates{' '}
              <Link href="https://magnovaa.com" className="text-teal-600 font-semibold hover:underline">
                https://magnovaa.com
              </Link>{' '}
              to provide enterprise software engineering, AI architecture, cloud infrastructure, and technical consulting.
            </p>
            <p>
              When you submit an architectural inquiry or contact our team, we collect your name, corporate email address, organization name, phone number, and project scoping parameters. We collect only what is strictly necessary to evaluate and execute commercial engineering agreements.
            </p>
          </section>

          {/* Section 2 */}
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Lock className="h-5 w-5 text-teal-600" />
              2. Intellectual Property & Confidentiality
            </h2>
            <p>
              Magnovaa operates under strict non-disclosure obligations. Any technical specifications, proprietary codebases, algorithm designs, data schemas, or roadmap documents shared during scoping or development are treated as confidential information.
            </p>
            <p>
              Upon milestone satisfaction and contract completion, 100% of all custom source code, documentation, CI/CD pipelines, and design assets developed for a client belong exclusively to that client.
            </p>
          </section>

          {/* Section 3 */}
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <Eye className="h-5 w-5 text-teal-600" />
              3. Telemetry & Analytics
            </h2>
            <p>
              We collect anonymized technical telemetry (browser user agent, viewport resolution, referral headers, and aggregate response latency) solely to maintain performance, prevent security anomalies, and ensure compatibility with Core Web Vitals across devices.
            </p>
            <p>
              We do not sell, rent, monetize, or broker personal or corporate data to third-party ad networks or data aggregators.
            </p>
          </section>

          {/* Section 4 */}
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-teal-600" />
              4. Contact Our Data Governance Team
            </h2>
            <p>
              For security disclosures, data access requests, or NDA inquiries, please contact our legal and infrastructure leadership directly:
            </p>
            <div className="pt-2">
              <p className="font-semibold text-slate-900">Magnovaa Technology Legal & Security</p>
              <p>Email: <a href="mailto:hello@magnovaa.com" className="text-teal-600 hover:underline">hello@magnovaa.com</a></p>
              <p>Website: <Link href="https://magnovaa.com" className="text-teal-600 hover:underline">https://magnovaa.com</Link></p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
