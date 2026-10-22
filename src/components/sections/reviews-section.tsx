import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { ReviewCard } from '@/components/reviews/review-card';
import { Button } from '@/components/ui/button';
import { MobileCardScroll } from '@/components/ui/mobile-card-scroll';
import { ArrowRight } from 'lucide-react';
import { ClientReview } from '@/features/reviews/types';

interface ReviewsSectionProps {
  reviews: ClientReview[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="py-24 relative overflow-hidden scroll-mt-20">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2f6bff]/5 blur-[120px] rounded-full" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Endorsements"
          title="Trusted by Visionary Founders & Engineering Leaders"
          description="Read authentic feedback from the technology executives and product directors who build their businesses with Magnovaa."
        />

        <MobileCardScroll gridClassName="md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </MobileCardScroll>

        {/* Explore More Reviews Button */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-8 shadow-sm">
            <Link href="/reviews" className="gap-2">
              Explore More Client Reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
