'use client';

import React, { useState, useMemo } from 'react';
import { ClientReview } from '@/features/reviews/types';
import { usePublishedReviewsQuery } from '@/features/reviews/hooks/use-reviews-query';
import { ReviewCard } from './review-card';
import { MobileCardScroll } from '@/components/ui/mobile-card-scroll';
import { cn } from '@/lib/utils/cn';
import { Star, Search, MessageSquareQuote } from 'lucide-react';

interface ReviewsGridProps {
  initialReviews: ClientReview[];
}

export function ReviewsGrid({ initialReviews }: ReviewsGridProps) {
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: reviews = initialReviews } = usePublishedReviewsQuery(initialReviews);

  const filterOptions = ['All Reviews', '5 Stars ★', 'Enterprise', 'Startups & Scaleups'];

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Rating filter
      let matchesCategory = true;
      if (selectedRating === '5 Stars ★') {
        matchesCategory = review.rating === 5;
      }

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        review.clientName.toLowerCase().includes(q) ||
        review.companyName.toLowerCase().includes(q) ||
        review.designation.toLowerCase().includes(q) ||
        review.review.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialReviews, selectedRating, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterOptions.map((opt) => {
            const isSelected =
              (selectedRating === 'All' && opt === 'All Reviews') || selectedRating === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setSelectedRating(opt === 'All Reviews' ? 'All' : opt)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 border',
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client, company, quote..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Counter bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 max-w-5xl mx-auto px-2">
        <span className="font-semibold text-slate-700">
          Showing {filteredReviews.length} of {reviews.length} verified endorsements
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-teal-600 hover:underline font-medium"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredReviews.length > 0 ? (
        <MobileCardScroll gridClassName="md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </MobileCardScroll>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center max-w-md mx-auto shadow-sm">
          <MessageSquareQuote className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Endorsements Found</h3>
          <p className="text-sm text-slate-500 mb-6">
            We couldn&apos;t find any client reviews matching your search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedRating('All');
              setSearchQuery('');
            }}
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
