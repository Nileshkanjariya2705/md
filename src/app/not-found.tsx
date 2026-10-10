import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 border border-teal-200 text-teal-700 font-extrabold text-3xl shadow-sm">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-slate-600 text-sm">
          The requested page could not be located. It might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild variant="outline">
            <Link href="/" className="gap-2">
              <Home className="h-4 w-4" /> Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/projects" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> View Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
