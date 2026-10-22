'use client';

import React from 'react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Bell, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/80 px-8 py-6 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {action}
        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2f6bff]/10 text-[#2f6bff] border border-[#2f6bff]/20 font-semibold">
            <Sparkles className="h-3 w-3 text-[#2f6bff]" />
            <span>Active Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
