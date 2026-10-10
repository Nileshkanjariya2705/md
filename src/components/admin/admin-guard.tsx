'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isGateAuthorized, setIsGateAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const hasCookie = typeof document !== 'undefined' && document.cookie.includes('md_admin_access=granted');
    const hasStorage = typeof window !== 'undefined' && localStorage.getItem('md_admin_access') === 'granted';

    if (!hasCookie && !hasStorage) {
      setIsGateAuthorized(false);
      router.replace('/not-found');
      return;
    }

    setIsGateAuthorized(true);

    if (!isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  if (isGateAuthorized === false) {
    return null;
  }

  if (isLoading || isGateAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
          <p className="text-xs uppercase tracking-wider font-semibold">
            Verifying Admin Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
