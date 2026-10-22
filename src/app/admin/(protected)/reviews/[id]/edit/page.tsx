import React from 'react';
import { notFound } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';
import { ReviewForm } from '@/components/admin/review-form';
import { getReviewById } from '@/features/reviews/services/review.service';

export const dynamic = 'force-dynamic';

interface EditReviewProps {
  params: Promise<{ id: string }>;
}

export default async function EditReviewPage({ params }: EditReviewProps) {
  const { id } = await params;
  const review = await getReviewById(id);

  if (!review) {
    notFound();
  }

  return (
    <div className="flex-1 pb-16">
      <AdminHeader
        title={`Edit Review: ${review.clientName}`}
        description="Modify quote content, company affiliation, rating score, or visibility."
      />
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <ReviewForm initialData={review} isEdit />
      </div>
    </div>
  );
}
