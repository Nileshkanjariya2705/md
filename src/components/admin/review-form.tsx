'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { clientReviewSchema, ClientReviewFormData } from '@/features/reviews/validations/review.schema';
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from '@/features/reviews/hooks/use-reviews-query';
import { ClientReview } from '@/features/reviews/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader2, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

interface ReviewFormProps {
  initialData?: ClientReview;
  isEdit?: boolean;
}

export function ReviewForm({ initialData, isEdit = false }: ReviewFormProps) {
  const router = useRouter();
  const createMutation = useCreateReviewMutation();
  const updateMutation = useUpdateReviewMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClientReviewFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(clientReviewSchema) as any,
    defaultValues: {
      clientName: initialData?.clientName || '',
      companyName: initialData?.companyName || '',
      designation: initialData?.designation || '',
      photo: initialData?.photo || '',
      review: initialData?.review || '',
      rating: initialData?.rating ?? 5,
      sortOrder: initialData?.sortOrder ?? 0,
      isPublished: initialData?.isPublished ?? true,
    },
  });

  const ratingVal = watch('rating');
  const isPublishedVal = watch('isPublished');

  const onSubmit = async (data: ClientReviewFormData) => {
    try {
      if (isEdit && initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data });
        toast.success('Review testimonial updated');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Review added successfully');
      }
      router.push('/admin/reviews');
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save review');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/reviews"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel & Return
        </Link>
        <Button type="submit" disabled={isSubmitting} className="rounded-xl">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-1" /> Saving...
            </>
          ) : isEdit ? (
            'Save Changes'
          ) : (
            'Add Review'
          )}
        </Button>
      </div>

      <div className="p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Client Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Client Name *
            </label>
            <Input
              placeholder="David Sterling"
              {...register('clientName')}
              className={errors.clientName ? 'border-rose-500' : ''}
            />
            {errors.clientName && (
              <p className="text-xs text-rose-500">
                {errors.clientName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Company Name *
            </label>
            <Input
              placeholder="Apex Capital Partners"
              {...register('companyName')}
              className={errors.companyName ? 'border-rose-500' : ''}
            />
            {errors.companyName && (
              <p className="text-xs text-rose-500">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Designation *
            </label>
            <Input
              placeholder="Managing Director & CIO"
              {...register('designation')}
              className={errors.designation ? 'border-rose-500' : ''}
            />
            {errors.designation && (
              <p className="text-xs text-rose-500">
                {errors.designation.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Photo URL (Optional)
            </label>
            <Input
              placeholder="https://images.unsplash.com/photo-..."
              {...register('photo')}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Sort Order (Ascending)
            </label>
            <Input
              type="number"
              {...register('sortOrder', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      <div className="p-8 rounded-2xl border border-slate-200 bg-white space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
          Testimonial & Rating
        </h3>

        {/* Rating Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">
            Rating Score ({ratingVal} Stars)
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setValue('rating', score)}
                className="p-1 rounded hover:scale-110 transition-transform"
              >
                <Star
                  className={`h-6 w-6 ${
                    score <= ratingVal
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Review Statement *
          </label>
          <Textarea
            rows={5}
            placeholder="Detailed client testimonial feedback regarding technical execution and results..."
            {...register('review')}
            className={errors.review ? 'border-rose-500' : ''}
          />
          {errors.review && (
            <p className="text-xs text-rose-500">{errors.review.message}</p>
          )}
        </div>
      </div>

      <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Publish Status</h4>
            <p className="text-xs text-slate-500">
              Enable to feature this testimonial in the endorsements carousel.
            </p>
          </div>
          <Switch
            checked={isPublishedVal}
            onCheckedChange={(checked) => setValue('isPublished', checked)}
          />
        </div>
      </div>
    </form>
  );
}
