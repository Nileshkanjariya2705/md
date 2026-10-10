import { Timestamp } from 'firebase/firestore';

export const MESSAGE_STATUSES = ['NEW', 'READ', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: Timestamp;
}

export type CreateContactInput = Omit<ContactMessage, 'id' | 'status' | 'createdAt'>;
