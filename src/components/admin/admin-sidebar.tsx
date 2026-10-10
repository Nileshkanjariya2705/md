'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CreditCard,
  Star,
  MessageSquare,
  ExternalLink,
  LogOut,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { cn } from '@/lib/utils/cn';

const ADMIN_LINKS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Team Members', href: '/admin/team', icon: Users },
  { label: 'Pricing Plans', href: '/admin/pricing', icon: CreditCard },
  { label: 'Client Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Contact Inquiries', href: '/admin/messages', icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 min-h-screen">
      {/* Top Logo */}
      <div>
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white font-black text-base shadow-md">
              MD
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-base leading-none">
                MD Admin
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-teal-600 mt-0.5">
                Control Hub
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {ADMIN_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin/dashboard'
                ? pathname === '/admin/dashboard'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile & Sign Out */}
      <div className="p-4 border-t border-slate-200 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            Public Website
          </span>
          <span className="text-[10px] uppercase bg-slate-100 px-1.5 py-0.5 rounded text-teal-700 font-semibold">Live</span>
        </Link>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Shield className="h-4 w-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.email || 'admin@md.com'}
              </p>
              <p className="text-[10px] text-teal-600 font-semibold uppercase">Superadmin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut()}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-200 transition-colors"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
