import React from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminSidebarProvider } from '@/components/admin/admin-sidebar-context';

export const dynamic = 'force-dynamic';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <AdminSidebarProvider>
        <div className="flex min-h-screen bg-slate-50 text-slate-900 relative">
          <AdminSidebar />
          <main className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
            {children}
          </main>
        </div>
      </AdminSidebarProvider>
    </AdminGuard>
  );
}
