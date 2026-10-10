'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function MitaliPortalPage() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = 'md_admin_access=granted; path=/; max-age=604800; SameSite=Lax';
    document.cookie = 'md_admin_operator=mitali; path=/; max-age=604800; SameSite=Lax';
    try {
      localStorage.setItem('md_admin_access', 'granted');
      localStorage.setItem('md_admin_operator', 'mitali');
    } catch {
      // ignore
    }
    router.replace('/admin/login?operator=mitali');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
          <ShieldCheck className="h-8 w-8 animate-pulse" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">Authenticating Gateway</h2>
          <p className="text-xs text-slate-400">Unlocking administrator portal for Mitali...</p>
        </div>
        <Loader2 className="h-5 w-5 animate-spin text-teal-400 mt-2" />
      </div>
    </div>
  );
}
