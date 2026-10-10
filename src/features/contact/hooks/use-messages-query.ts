'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllMessages,
  getMessageById,
  submitContactMessage,
  updateMessageStatus,
  deleteMessage,
} from '../services/contact.service';
import { ContactMessage, CreateContactInput, MessageStatus } from '../types';

export const MESSAGE_KEYS = {
  all: ['messages'] as const,
  detail: (id: string) => ['messages', 'detail', id] as const,
};

/**
 * Hook to fetch all contact messages with caching
 */
export function useMessagesQuery(initialData?: ContactMessage[]) {
  return useQuery({
    queryKey: MESSAGE_KEYS.all,
    queryFn: () => getAllMessages(),
    initialData,
  });
}

/**
 * Hook to fetch a single message by ID
 */
export function useMessageQuery(id: string) {
  return useQuery({
    queryKey: MESSAGE_KEYS.detail(id),
    queryFn: () => getMessageById(id),
    enabled: !!id,
  });
}

/**
 * Hook to submit a contact message with query invalidation
 */
export function useSubmitMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContactInput) => submitContactMessage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGE_KEYS.all });
    },
  });
}

/**
 * Hook to update message status with query invalidation
 */
export function useUpdateMessageStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: MessageStatus }) =>
      updateMessageStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: MESSAGE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: MESSAGE_KEYS.detail(id) });
    },
  });
}

/**
 * Hook to delete a message with query invalidation
 */
export function useDeleteMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: MESSAGE_KEYS.all });
      queryClient.removeQueries({ queryKey: MESSAGE_KEYS.detail(id) });
    },
  });
}
