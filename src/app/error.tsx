'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 shadow-sm">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Something went wrong</h1>
        <p className="text-slate-600 text-sm">
          An unexpected error occurred while rendering this view. Our telemetry systems have been alerted.
        </p>
        <div className="pt-2">
          <Button onClick={() => reset()} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
