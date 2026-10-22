'use client';

import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { useAdminSidebar } from './admin-sidebar-context';

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  const { toggle } = useAdminSidebar();

  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 backdrop-blur-md sticky top-0 z-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Title area with mobile hamburger toggle */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={toggle}
            className="lg:hidden p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0 shadow-xs active:scale-95"
            aria-label="Toggle navigation sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight truncate">
              {title}
            </h1>
            {description && (
              <p className="mt-0.5 text-xs sm:text-sm text-slate-500 line-clamp-1 sm:line-clamp-none">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Action area */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0">
          {action}
          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
              <Sparkles className="h-3 w-3 text-teal-600" />
              <span>Active Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
