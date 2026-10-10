import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--md-bg-primary)] text-[var(--md-text-primary)]">
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24">{children}</main>
      <Footer />
    </div>
  );
}
