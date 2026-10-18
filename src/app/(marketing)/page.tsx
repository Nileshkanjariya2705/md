import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { MetricsSection } from '@/components/sections/metrics-section';
import { ServicesSection } from '@/components/sections/services-section';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { ProcessSection } from '@/components/sections/process-section';
import { TeamPreview } from '@/components/sections/team-preview';
import { ReviewsSection } from '@/components/sections/reviews-section';
import { FAQSection } from '@/components/sections/faq-section';
import { CTASection } from '@/components/sections/cta-section';
import { PricingSection } from '@/components/sections/pricing-section';

import { getFeaturedProjects } from '@/features/projects/services/project.service';
import { getActiveTeamMembers } from '@/features/team/services/team.service';
import { getPublishedReviews } from '@/features/reviews/services/review.service';
import { getActivePricingPlans } from '@/features/pricing/services/pricing.service';

export const metadata: Metadata = {
  title: {
    absolute: 'Magnovaa Technology',
  },
  description:
    'Magnovaa Technology engineers high-concurrency systems, generative AI platforms, cloud architectures, and bespoke software solutions worldwide.',
  alternates: {
    canonical: 'https://magnovaa.com',
  },
  openGraph: {
    title: 'Magnovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'Magnovaa Technology engineers high-concurrency systems, generative AI platforms, cloud architectures, and bespoke software solutions worldwide.',
    url: 'https://magnovaa.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magnovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'Magnovaa Technology engineers high-concurrency systems, generative AI platforms, cloud architectures, and bespoke software solutions worldwide.',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Magnovaa structure client engagements?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We operate primarily on dedicated engineering squad models or fixed-scope milestone engagements. For long-term initiatives, we embed senior architects and engineers directly alongside your leadership, aligning seamlessly with your sprint cycles.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies and frameworks do you specialize in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our primary stack includes Next.js, React, TypeScript, Node.js, Go, Python, Tailwind CSS, PostgreSQL, Redis, and cloud architectures across AWS and GCP. In AI, we specialize in custom RAG pipelines, fine-tuned LLMs, and autonomous agent systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can a project squad kick off?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Following initial discovery and architectural scoping (typically 3–5 business days), a dedicated squad can usually be onboarded and pushing to staging within 1 to 2 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who retains intellectual property rights?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do. 100% of the code, designs, documentation, and infrastructure definitions generated during the partnership belong exclusively to your company upon milestone completion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer ongoing SLA maintenance and infrastructure support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide 24/7 SLA maintenance tiers encompassing proactive dependency patching, database query optimization, infrastructure scaling, and incident response.',
      },
    },
  ],
};

export default async function HomePage() {
  const [featuredProjects, teamMembers, reviews, pricingPlans] = await Promise.all([
    getFeaturedProjects(3),
    getActiveTeamMembers(),
    getPublishedReviews(),
    getActivePricingPlans(),
  ]);

  return (
    <div className="flex-col flex">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <MetricsSection />
      <ServicesSection />
      <FeaturedProjects projects={featuredProjects} />
      <ProcessSection />
      <TeamPreview team={teamMembers} />
      <ReviewsSection reviews={reviews} />
      <FAQSection />
      <CTASection />
      <PricingSection initialPlans={pricingPlans} />
    </div>
  );
}
