'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllTeamMembers,
  getActiveTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../services/team.service';
import { TeamMember, CreateTeamMemberInput, UpdateTeamMemberInput } from '../types';

export const TEAM_KEYS = {
  all: ['team'] as const,
  active: ['team', 'active'] as const,
  detail: (id: string) => ['team', 'detail', id] as const,
};

/**
 * Hook to fetch active team members with caching
 */
export function useActiveTeamQuery(initialData?: TeamMember[]) {
  return useQuery({
    queryKey: TEAM_KEYS.active,
    queryFn: () => getActiveTeamMembers(),
    initialData,
  });
}

/**
 * Hook to fetch all team members (admin/all) with caching
 */
export function useAllTeamQuery(initialData?: TeamMember[]) {
  return useQuery({
    queryKey: TEAM_KEYS.all,
    queryFn: () => getAllTeamMembers(),
    initialData,
  });
}

/**
 * Hook to fetch a single team member by ID
 */
export function useTeamMemberQuery(id: string, initialData?: TeamMember | null) {
  return useQuery({
    queryKey: TEAM_KEYS.detail(id),
    queryFn: () => getTeamMemberById(id),
    enabled: !!id,
    initialData: initialData ?? undefined,
  });
}

/**
 * Hook to create a team member with query invalidation
 */
export function useCreateTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamMemberInput) => createTeamMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.active });
    },
  });
}

/**
 * Hook to update a team member with query invalidation
 */
export function useUpdateTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeamMemberInput }) =>
      updateTeamMember(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.active });
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.detail(id) });
    },
  });
}

/**
 * Hook to delete a team member with query invalidation
 */
export function useDeleteTeamMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTeamMember(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TEAM_KEYS.active });
      queryClient.removeQueries({ queryKey: TEAM_KEYS.detail(id) });
    },
  });
}
