import { orderBy } from 'firebase/firestore';
import { firebaseService } from '@/lib/firebase';
import { ContactMessage, CreateContactInput, MessageStatus } from '../types';

const COLLECTION_NAME = 'contactMessages';

export async function submitContactMessage(data: CreateContactInput): Promise<string> {
  return firebaseService.createDocument(COLLECTION_NAME, {
    ...data,
    status: 'NEW',
  });
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  return firebaseService.getDocuments<ContactMessage>(
    COLLECTION_NAME,
    [orderBy('createdAt', 'desc')],
    []
  );
}

export async function getMessageById(id: string): Promise<ContactMessage | null> {
  return firebaseService.getDocumentById<ContactMessage>(COLLECTION_NAME, id, null);
}

export async function updateMessageStatus(id: string, status: MessageStatus): Promise<void> {
  return firebaseService.updateDocument(COLLECTION_NAME, id, { status });
}

export async function deleteMessage(id: string): Promise<void> {
  return firebaseService.deleteDocument(COLLECTION_NAME, id);
}
