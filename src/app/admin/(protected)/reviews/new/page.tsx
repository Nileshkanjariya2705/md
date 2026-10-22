import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { ReviewForm } from '@/components/admin/review-form';

export default function NewReviewPage() {
  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title="Add Client Review"
        description="Publish a new client testimonial and rating to the endorsements section."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <ReviewForm />
      </div>
    </div>
  );
}
