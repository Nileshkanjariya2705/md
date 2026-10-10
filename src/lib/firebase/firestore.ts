import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFirebaseApp } from './app';

let db: Firestore | undefined;

export function getFirebaseFirestore(): Firestore {
  if (db) return db;
  db = getFirestore(getFirebaseApp());
  return db;
}
