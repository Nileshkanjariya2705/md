'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ShieldCheck, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { loginSchema, LoginFormData } from '@/features/auth/validations/auth.schema';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const operatorParam = searchParams.get('operator');
  const { signIn, user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [operatorName, setOperatorName] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Verify secret gate access token
    const hasCookie = typeof document !== 'undefined' && document.cookie.includes('md_admin_access=granted');
    const hasStorage = typeof window !== 'undefined' && localStorage.getItem('md_admin_access') === 'granted';

    if (!hasCookie && !hasStorage) {
      setIsAuthorized(false);
      router.replace('/not-found');
      return;
    }

    setIsAuthorized(true);

    const activeOp =
      operatorParam ||
      (typeof window !== 'undefined' ? localStorage.getItem('md_admin_operator') : null);

    if (activeOp) {
      const formatted = activeOp.charAt(0).toUpperCase() + activeOp.slice(1).toLowerCase();
      setOperatorName(formatted);
    }
  }, [operatorParam, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!authLoading && user && isAuthorized) {
      router.push('/admin/dashboard');
    }
  }, [user, authLoading, router, isAuthorized]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await signIn(data.email, data.password);
      toast.success('Authenticated successfully. Redirecting to dashboard...');
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      console.error('Login error:', err);
      const msg = (err as Error)?.message || 'Invalid credentials. Please verify your email and password.';
      setErrorMessage(msg);
      toast.error('Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setValue('email', 'admin@md.com');
    setValue('password', 'Admin@123456');
  };

  if (isAuthorized === false) {
    return null;
  }

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-7 w-7 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/10 blur-[140px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex justify-center">
            <Image
              src="/logo.png"
              alt="Mogovaa Technology"
              width={200}
              height={60}
              priority
              className="h-11 w-auto object-contain"
            />
          </div>
          {operatorName && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-100/90 text-teal-800 border border-teal-300/80 px-3.5 py-1 text-xs font-bold shadow-xs">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              Gateway Unlocked: {operatorName}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Gateway
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Secure administrative control portal for Mogovaa Technology
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl space-y-6">
          {errorMessage && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-600">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-teal-600" /> Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@md.com"
                {...register('email')}
                className={errors.email ? 'border-rose-500' : ''}
              />
              {errors.email && (
                <p className="text-xs text-rose-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-teal-600" /> Password
              </label>
              <Input
                type="password"
                placeholder="••••••••••••"
                {...register('password')}
                className={errors.password ? 'border-rose-500' : ''}
              />
              {errors.password && (
                <p className="text-xs text-rose-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full justify-center rounded-xl font-bold mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Enter Dashboard <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </form>

          {/* Demo Helper Pill */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold underline underline-offset-4"
            >
              Click to autofill demo credentials
            </button>
            <p className="text-[11px] text-slate-500 mt-1">
              admin@md.com / Admin@123456
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Return to public website
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <Loader2 className="h-7 w-7 animate-spin text-teal-600" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
