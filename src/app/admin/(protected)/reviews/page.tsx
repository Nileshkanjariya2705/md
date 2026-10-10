import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { ReviewsTable } from '@/components/admin/reviews-table';
import { getAllReviews } from '@/features/reviews/services/review.service';

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Client Reviews & Endorsements"
        description="Curate authentic client testimonials, star ratings, and website endorsements."
      />
      <div className="p-8 max-w-7xl">
        <ReviewsTable initialReviews={reviews} />
      </div>
    </div>
  );
}
