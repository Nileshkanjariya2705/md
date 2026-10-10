import { Timestamp } from 'firebase/firestore';

export interface ClientReview {
  id: string;
  clientName: string;
  companyName: string;
  designation: string;
  photo?: string;
  review: string;
  rating: number;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateReviewInput = Omit<ClientReview, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateReviewInput = Partial<Omit<ClientReview, 'id' | 'createdAt' | 'updatedAt'>>;
