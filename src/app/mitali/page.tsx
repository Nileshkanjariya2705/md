import React from 'react';
import { Metadata } from 'next';
import { AdminLoginView } from '@/components/admin/admin-login-view';

export const metadata: Metadata = {
  title: 'Administrator Gateway | Magnovaa Technology',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MitaliPortalPage() {
  return <AdminLoginView operator="mitali" />;
}
