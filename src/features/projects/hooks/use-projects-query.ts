'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllProjects,
  getPublishedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../services/project.service';
import { Project, CreateProjectInput, UpdateProjectInput } from '../types';

export const PROJECT_KEYS = {
  all: ['projects'] as const,
  published: ['projects', 'published'] as const,
  detail: (id: string) => ['projects', 'detail', id] as const,
};

/**
 * Hook to fetch all published projects with React Query caching
 */
export function usePublishedProjectsQuery(initialData?: Project[]) {
  return useQuery({
    queryKey: PROJECT_KEYS.published,
    queryFn: () => getPublishedProjects(),
    initialData,
  });
}

/**
 * Hook to fetch all projects (admin/all) with React Query caching
 */
export function useAllProjectsQuery(initialData?: Project[]) {
  return useQuery({
    queryKey: PROJECT_KEYS.all,
    queryFn: () => getAllProjects(),
    initialData,
  });
}

/**
 * Hook to fetch a single project by ID with caching
 */
export function useProjectQuery(id: string, initialData?: Project | null) {
  return useQuery({
    queryKey: PROJECT_KEYS.detail(id),
    queryFn: () => getProjectById(id),
    enabled: !!id,
    initialData: initialData ?? undefined,
  });
}

/**
 * Hook to create a project with automatic query invalidation
 */
export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectInput) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.published });
    },
  });
}

/**
 * Hook to update a project with automatic query invalidation
 */
export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectInput }) =>
      updateProject(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.published });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.detail(id) });
    },
  });
}

/**
 * Hook to delete a project with automatic query invalidation
 */
export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.published });
      queryClient.removeQueries({ queryKey: PROJECT_KEYS.detail(id) });
    },
  });
}
