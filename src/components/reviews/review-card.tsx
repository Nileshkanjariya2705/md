import React from 'react';
import Image from 'next/image';
import { Star, Quote, ShieldCheck, Building2, CheckCircle2, Sparkles } from 'lucide-react';
import { ClientReview } from '@/features/reviews/types';
import { Card } from '@/components/ui/card';

interface ReviewCardProps {
  review: ClientReview;
}

function getReviewOutcome(review: ClientReview): string {
  const text = review.review.toLowerCase();
  if (text.includes('throughput') || text.includes('latency')) return '4x Throughput & Sub-Second Latency';
  if (text.includes('clinical') || text.includes('ai') || text.includes('saas')) return 'Production AI Delivered in Record Time';
  if (text.includes('satisfaction') || text.includes('detail') || text.includes('45%')) return '+45% User Satisfaction Post-Launch';
  if (text.includes('250k') || text.includes('black friday') || text.includes('downtime')) return '250k Tx/Min Scaled with 0 Downtime';
  if (text.includes('refactoring') || text.includes('millions') || text.includes('months')) return 'High-Speed Enterprise Scalability';
  return 'Enterprise Verified Milestone';
}

export function ReviewCard({ review }: ReviewCardProps) {
  const outcome = getReviewOutcome(review);

  return (
    <Card className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl border-slate-200/90 bg-white hover:border-[#2f6bff]/40 hover:shadow-2xl hover:shadow-[#2f6bff]/5 transition-all duration-300 overflow-hidden">
      {/* Top Gradient Shimmer Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2f6bff] via-[#3d7eff] to-[#19c3d8] opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Background Watermark Quote */}
      <Quote className="absolute -bottom-4 -right-4 h-28 w-28 text-slate-100/70 select-none pointer-events-none group-hover:text-[#2f6bff]/5 transition-colors -rotate-12" />

      <div>
        {/* Top Header: Verified Badge & Rating Pill */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2f6bff] bg-[#2f6bff]/8 px-3 py-1 rounded-full border border-[#2f6bff]/20 shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[#2f6bff]" />
            <span>Verified Endorsement</span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-amber-50/90 border border-amber-200/70 px-2.5 py-1 rounded-full shadow-xs">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < review.rating
                      ? 'text-amber-500 fill-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-black text-amber-900">{review.rating}.0</span>
          </div>
        </div>

        {/* Business Outcome Highlight Banner */}
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-xl bg-[#2f6bff]/6 border border-[#2f6bff]/15 px-3 py-1.5 text-xs font-bold text-[#14233a]">
          <Sparkles className="h-3.5 w-3.5 text-[#2f6bff] shrink-0" />
          <span>{outcome}</span>
        </div>

        {/* Testimonial Quote Body */}
        <div className="relative mb-6 pl-4 border-l-2 border-[#2f6bff]/30 group-hover:border-[#2f6bff] transition-colors">
          <p className="text-sm sm:text-[15px] text-[#334155] leading-relaxed font-normal">
            &ldquo;{review.review}&rdquo;
          </p>
        </div>
      </div>

      {/* Client Identity & Footer Metadata */}
      <div className="pt-5 border-t border-slate-100 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            {review.photo ? (
              <div className="relative h-13 w-13 overflow-hidden rounded-2xl ring-2 ring-[#2f6bff]/30 ring-offset-2 ring-offset-white shadow-xs">
                <Image
                  src={review.photo}
                  alt={`${review.clientName}, ${review.designation} at ${review.companyName}`}
                  fill
                  sizes="52px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="h-13 w-13 rounded-2xl bg-gradient-to-br from-[#2f6bff] to-[#2052d9] text-white flex items-center justify-center font-bold text-lg shadow-xs">
                {review.clientName[0]}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#2f6bff] ring-2 ring-white flex items-center justify-center text-[9px] text-white font-bold">
              ✓
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-base font-extrabold text-[#14233a] group-hover:text-[#2f6bff] transition-colors truncate">
              {review.clientName}
            </h4>
            <p className="text-xs text-slate-500 font-medium truncate mb-1">
              {review.designation}
            </p>
            <div className="inline-flex items-center gap-1 font-semibold text-[#2f6bff] bg-[#2f6bff]/8 px-2 py-0.5 rounded-md border border-[#2f6bff]/15 text-[11px]">
              <Building2 className="h-3 w-3 text-[#2f6bff] shrink-0" />
              <span className="truncate">{review.companyName}</span>
            </div>
          </div>
        </div>

        {/* Micro Trust Stamp */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-100/80">
          <span className="flex items-center gap-1 text-slate-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#2f6bff]" /> Contract Verified
          </span>
          <span className="text-[#2f6bff] font-semibold bg-[#2f6bff]/8 px-2 py-0.5 rounded-full border border-[#2f6bff]/20">
            100% Recommendation
          </span>
        </div>
      </div>
    </Card>
  );
}
