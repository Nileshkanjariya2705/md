import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from './config';

let app: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  return app;
}
