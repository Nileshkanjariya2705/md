import React from 'react';
import { HeroSection } from '@/components/sections/hero-section';
import { MetricsSection } from '@/components/sections/metrics-section';
import { AboutPreview } from '@/components/sections/about-preview';
import { ServicesSection } from '@/components/sections/services-section';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { WhyChooseSection } from '@/components/sections/why-choose-section';
import { ProcessSection } from '@/components/sections/process-section';
import { TeamPreview } from '@/components/sections/team-preview';
import { ReviewsSection } from '@/components/sections/reviews-section';
import { CTASection } from '@/components/sections/cta-section';
import { PricingSection } from '@/components/sections/pricing-section';

import { getFeaturedProjects } from '@/features/projects/services/project.service';
import { getActiveTeamMembers } from '@/features/team/services/team.service';
import { getPublishedReviews } from '@/features/reviews/services/review.service';
import { getActivePricingPlans } from '@/features/pricing/services/pricing.service';

export default async function HomePage() {
  const [featuredProjects, teamMembers, reviews, pricingPlans] = await Promise.all([
    getFeaturedProjects(3),
    getActiveTeamMembers(),
    getPublishedReviews(),
    getActivePricingPlans(),
  ]);

  return (
    <div className="flex-col flex">
      <HeroSection />
      <MetricsSection />
      {/* <AboutPreview /> */}
      <ServicesSection />
      <FeaturedProjects projects={featuredProjects} />
      {/* <WhyChooseSection /> */}
      <ProcessSection />
      <TeamPreview team={teamMembers} />
      <ReviewsSection reviews={reviews} />
      <CTASection />
      <PricingSection initialPlans={pricingPlans} />
    </div>
  );
}
