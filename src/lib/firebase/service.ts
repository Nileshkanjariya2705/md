import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  QueryConstraint,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseFirestore } from './firestore';
import { getFirebaseAuth } from './auth';
import { getFirebaseStorage } from './storage';
import { getFirebaseApp } from './app';
import { serializeData } from '@/lib/utils/serialize';
import { isFirebaseConfigured } from './config';

function withTimeout<T>(promise: Promise<T>, ms = 1200): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Firestore query timed out after ${ms}ms`)), ms)
    ),
  ]);
}

/**
 * Common Unified Firebase Connection Service
 * Single point of contact for all Firestore, Auth, and Storage operations.
 */
export class FirebaseConnectionService {
  private static instance: FirebaseConnectionService;

  private constructor() {}

  public static getInstance(): FirebaseConnectionService {
    if (!FirebaseConnectionService.instance) {
      FirebaseConnectionService.instance = new FirebaseConnectionService();
    }
    return FirebaseConnectionService.instance;
  }

  public get db() {
    return getFirebaseFirestore();
  }

  public get auth() {
    return getFirebaseAuth();
  }

  public get storage() {
    return getFirebaseStorage();
  }

  public get app() {
    return getFirebaseApp();
  }

  /**
   * Fetch all documents from a Firestore collection with optional query constraints
   */
  public async getDocuments<T extends { id: string }>(
    collectionName: string,
    constraints: QueryConstraint[] = [],
    fallbackData?: T[]
  ): Promise<T[]> {
    if (!isFirebaseConfigured) {
      return fallbackData ? serializeData(fallbackData) : [];
    }

    try {
      const q = constraints.length > 0
        ? query(collection(this.db, collectionName), ...constraints)
        : query(collection(this.db, collectionName));

      const snapshot = await withTimeout(getDocs(q), 1200);
      if (!snapshot.empty) {
        return serializeData(
          snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }))
        ) as T[];
      }

      // If collection is empty and fallbackData is provided, seed it into Firestore
      if (fallbackData && fallbackData.length > 0) {
        this.seedCollection(collectionName, fallbackData).catch((err) => {
          console.warn(`Firestore seeding skipped for ${collectionName}:`, err);
        });
        return serializeData(fallbackData);
      }
    } catch (error) {
      console.warn(`Firebase query for ${collectionName} error:`, error);
      if (fallbackData) {
        return serializeData(fallbackData);
      }
      throw error;
    }
    return fallbackData ? serializeData(fallbackData) : [];
  }

  /**
   * Fetch a single document by ID
   */
  public async getDocumentById<T extends { id: string }>(
    collectionName: string,
    id: string,
    fallbackItem?: T | null
  ): Promise<T | null> {
    if (!isFirebaseConfigured) {
      return fallbackItem !== undefined ? serializeData(fallbackItem) : null;
    }

    try {
      const docRef = doc(this.db, collectionName, id);
      const snapshot = await withTimeout(getDoc(docRef), 1200);
      if (snapshot.exists()) {
        return serializeData({
          id: snapshot.id,
          ...snapshot.data(),
        }) as T;
      }
    } catch (error) {
      console.warn(`Firebase getDocumentById for ${collectionName}/${id} error:`, error);
      if (fallbackItem !== undefined) {
        return serializeData(fallbackItem);
      }
      throw error;
    }
    return fallbackItem ? serializeData(fallbackItem) : null;
  }

  /**
   * Create a new document in a collection
   */
  public async createDocument<T extends DocumentData>(
    collectionName: string,
    data: T
  ): Promise<string> {
    if (!isFirebaseConfigured) {
      console.info(`[Demo Mode] Stored item in '${collectionName}' (connect real Firebase in .env to persist permanently)`);
      return 'demo-' + Date.now();
    }

    const now = Timestamp.now();
    const docRef = await addDoc(collection(this.db, collectionName), {
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  /**
   * Update an existing document
   */
  public async updateDocument(
    collectionName: string,
    id: string,
    data: Partial<DocumentData>
  ): Promise<void> {
    if (!isFirebaseConfigured) {
      console.info(`[Demo Mode] Updated item '${collectionName}/${id}' (connect real Firebase in .env to persist permanently)`);
      return;
    }

    const docRef = doc(this.db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  }

  /**
   * Delete a document
   */
  public async deleteDocument(
    collectionName: string,
    id: string
  ): Promise<void> {
    if (!isFirebaseConfigured) {
      console.info(`[Demo Mode] Deleted item '${collectionName}/${id}' (connect real Firebase in .env to persist permanently)`);
      return;
    }

    const docRef = doc(this.db, collectionName, id);
    await deleteDoc(docRef);
  }

  /**
   * Helper to seed documents into Firestore if needed
   */
  private async seedCollection<T extends { id: string }>(
    collectionName: string,
    items: T[]
  ): Promise<void> {
    try {
      for (const item of items) {
        const { id, ...data } = item;
        await setDoc(doc(this.db, collectionName, id), {
          ...data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        }, { merge: true });
      }
    } catch {
      // ignore
    }
  }
}

export const firebaseService = FirebaseConnectionService.getInstance();
