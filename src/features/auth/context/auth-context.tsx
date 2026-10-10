'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { AdminUser } from '../types';
import { signInAdmin, signOutAdmin, getAdminData } from '../services/auth.service';

interface AuthContextType {
  user: User | { uid: string; email: string } | null;
  adminData: AdminUser | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  adminData: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | { uid: string; email: string } | null>(null);
  const [adminData, setAdminData] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Check local storage for demo admin session
    const savedDemo = typeof window !== 'undefined' ? localStorage.getItem('md_demo_admin') : null;
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        setUser({ uid: parsed.uid, email: parsed.email });
        setAdminData(parsed);
        setIsLoading(false);
        return;
      } catch {
        localStorage.removeItem('md_demo_admin');
      }
    }

    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          const data = await getAdminData(currentUser.uid);
          setAdminData(data);
        } else {
          setUser(null);
          setAdminData(null);
        }
        setIsLoading(false);
      });
      return () => unsubscribe();
    } catch {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string) => {
    const authResult = await signInAdmin(email, pass);
    if ('uid' in authResult && authResult.uid === 'demo-admin-uid') {
      const demoUser = {
        uid: 'demo-admin-uid',
        email,
        name: 'System Administrator',
        role: 'ADMIN' as const,
        isActive: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createdAt: null as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updatedAt: null as any,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('md_demo_admin', JSON.stringify(demoUser));
      }
      startTransition(() => {
        setUser({ uid: demoUser.uid, email: demoUser.email });
        setAdminData(demoUser);
      });
      return;
    }

    const data = await getAdminData(authResult.uid);
    startTransition(() => {
      setUser(authResult);
      setAdminData(data);
    });
  };

  const signOut = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('md_demo_admin');
    }
    await signOutAdmin();
    startTransition(() => {
      setUser(null);
      setAdminData(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, adminData, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
