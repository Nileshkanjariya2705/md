import { where, orderBy } from 'firebase/firestore';
import { firebaseService } from '@/lib/firebase';
import { ClientReview, CreateReviewInput, UpdateReviewInput } from '../types';
import { MOCK_REVIEWS } from '../data/mock-reviews';

const COLLECTION_NAME = 'clientReviews';

export async function getPublishedReviews(): Promise<ClientReview[]> {
  return firebaseService.getDocuments<ClientReview>(
    COLLECTION_NAME,
    [where('isPublished', '==', true), orderBy('sortOrder', 'asc')],
    MOCK_REVIEWS.filter((r) => r.isPublished)
  );
}

export async function getAllReviews(): Promise<ClientReview[]> {
  return firebaseService.getDocuments<ClientReview>(
    COLLECTION_NAME,
    [orderBy('sortOrder', 'asc')],
    MOCK_REVIEWS
  );
}

export async function getReviewById(id: string): Promise<ClientReview | null> {
  const fallback = MOCK_REVIEWS.find((r) => r.id === id) || null;
  return firebaseService.getDocumentById<ClientReview>(COLLECTION_NAME, id, fallback);
}

export async function createReview(data: CreateReviewInput): Promise<string> {
  return firebaseService.createDocument(COLLECTION_NAME, data);
}

export async function updateReview(id: string, data: UpdateReviewInput): Promise<void> {
  return firebaseService.updateDocument(COLLECTION_NAME, id, data);
}

export async function deleteReview(id: string): Promise<void> {
  return firebaseService.deleteDocument(COLLECTION_NAME, id);
}

export async function setReviewPublished(id: string, isPublished: boolean): Promise<void> {
  return updateReview(id, { isPublished });
}
