import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseFirestore } from '@/lib/firebase';
import { AdminUser } from '../types';

export async function signInAdmin(email: string, pass: string): Promise<User | { uid: string; email: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  // Primary administrator credentials: mitali@gmail.com / mitali@123
  if (normalizedEmail === 'mitali@gmail.com' && pass === 'mitali@123') {
    try {
      const auth = getFirebaseAuth();
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      return cred.user;
    } catch {
      // Local fallback for admin login in development or when Firebase user is not provisioned
      return {
        uid: 'demo-admin-uid',
        email: 'mitali@gmail.com',
      };
    }
  }

  try {
    const auth = getFirebaseAuth();
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    return cred.user;
  } catch (err: unknown) {
    // If running in development with fallback demo credentials
    const errMessage = (err as Error)?.message || '';
    const isInvalidApiKey = errMessage.includes('invalid-api-key') || errMessage.includes('auth/api-key-not-valid');
    if (isInvalidApiKey && normalizedEmail === 'admin@md.com' && pass === 'Admin@123456') {
      return {
        uid: 'demo-admin-uid',
        email: 'mitali@gmail.com',
      };
    }
    throw err;
  }
}

export async function signOutAdmin(): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
  } catch (err) {
    console.warn('Sign out warning:', err);
  }
}

export async function getAdminData(uid: string): Promise<AdminUser | null> {
  if (uid === 'demo-admin-uid') {
    return {
      uid: 'demo-admin-uid',
      email: 'mitali@gmail.com',
      name: 'Mitali',
      role: 'ADMIN',
      isActive: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createdAt: { toDate: () => new Date() } as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updatedAt: { toDate: () => new Date() } as any,
    };
  }
  try {
    const db = getFirebaseFirestore();
    const docRef = doc(db, 'admins', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as AdminUser;
    }
  } catch (err) {
    console.warn('getAdminData error:', err);
  }
  return null;
}
