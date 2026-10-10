import { Timestamp } from 'firebase/firestore';

export const ADMIN_ROLES = ['ADMIN'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
