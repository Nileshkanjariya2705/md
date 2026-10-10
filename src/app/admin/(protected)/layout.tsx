import React from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export const dynamic = 'force-dynamic';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50 text-slate-900">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
