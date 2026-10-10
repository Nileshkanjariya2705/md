'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllReviews,
  getPublishedReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../services/review.service';
import { ClientReview, CreateReviewInput, UpdateReviewInput } from '../types';

export const REVIEW_KEYS = {
  all: ['reviews'] as const,
  published: ['reviews', 'published'] as const,
  detail: (id: string) => ['reviews', 'detail', id] as const,
};

/**
 * Hook to fetch published reviews with caching
 */
export function usePublishedReviewsQuery(initialData?: ClientReview[]) {
  return useQuery({
    queryKey: REVIEW_KEYS.published,
    queryFn: () => getPublishedReviews(),
    initialData,
  });
}

/**
 * Hook to fetch all reviews (admin/all) with caching
 */
export function useAllReviewsQuery(initialData?: ClientReview[]) {
  return useQuery({
    queryKey: REVIEW_KEYS.all,
    queryFn: () => getAllReviews(),
    initialData,
  });
}

/**
 * Hook to fetch a single review by ID
 */
export function useReviewQuery(id: string, initialData?: ClientReview | null) {
  return useQuery({
    queryKey: REVIEW_KEYS.detail(id),
    queryFn: () => getReviewById(id),
    enabled: !!id,
    initialData: initialData ?? undefined,
  });
}

/**
 * Hook to create a review with query invalidation
 */
export function useCreateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewInput) => createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.all });
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.published });
    },
  });
}

/**
 * Hook to update a review with query invalidation
 */
export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewInput }) =>
      updateReview(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.all });
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.published });
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.detail(id) });
    },
  });
}

/**
 * Hook to delete a review with query invalidation
 */
export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.all });
      queryClient.invalidateQueries({ queryKey: REVIEW_KEYS.published });
      queryClient.removeQueries({ queryKey: REVIEW_KEYS.detail(id) });
    },
  });
}
