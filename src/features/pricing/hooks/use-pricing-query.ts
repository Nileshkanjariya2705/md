'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllPricingPlans,
  getActivePricingPlans,
  getPricingPlanById,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan,
} from '../services/pricing.service';
import { PricingPlan, CreatePricingPlanInput, UpdatePricingPlanInput } from '../types';

export const PRICING_KEYS = {
  all: ['pricing'] as const,
  active: ['pricing', 'active'] as const,
  detail: (id: string) => ['pricing', 'detail', id] as const,
};

/**
 * Hook to fetch active pricing plans with caching
 */
export function useActivePricingQuery(initialData?: PricingPlan[]) {
  return useQuery({
    queryKey: PRICING_KEYS.active,
    queryFn: () => getActivePricingPlans(),
    initialData,
  });
}

/**
 * Hook to fetch all pricing plans (admin/all) with caching
 */
export function useAllPricingQuery(initialData?: PricingPlan[]) {
  return useQuery({
    queryKey: PRICING_KEYS.all,
    queryFn: () => getAllPricingPlans(),
    initialData,
  });
}

/**
 * Hook to fetch a single pricing plan by ID
 */
export function usePricingPlanQuery(id: string, initialData?: PricingPlan | null) {
  return useQuery({
    queryKey: PRICING_KEYS.detail(id),
    queryFn: () => getPricingPlanById(id),
    enabled: !!id,
    initialData: initialData ?? undefined,
  });
}

/**
 * Hook to create a pricing plan with query invalidation
 */
export function useCreatePricingPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePricingPlanInput) => createPricingPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRICING_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PRICING_KEYS.active });
    },
  });
}

/**
 * Hook to update a pricing plan with query invalidation
 */
export function useUpdatePricingPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePricingPlanInput }) =>
      updatePricingPlan(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: PRICING_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PRICING_KEYS.active });
      queryClient.invalidateQueries({ queryKey: PRICING_KEYS.detail(id) });
    },
  });
}

/**
 * Hook to delete a pricing plan with query invalidation
 */
export function useDeletePricingPlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePricingPlan(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: PRICING_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PRICING_KEYS.active });
      queryClient.removeQueries({ queryKey: PRICING_KEYS.detail(id) });
    },
  });
}
