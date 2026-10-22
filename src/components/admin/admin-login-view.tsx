'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ShieldCheck, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { loginSchema, LoginFormData } from '@/features/auth/validations/auth.schema';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminLoginViewProps {
  operator: 'mitali' | 'dharmesh';
}

export function AdminLoginView({ operator }: AdminLoginViewProps) {
  const router = useRouter();
  const { signIn, user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formattedOperator =
    operator.charAt(0).toUpperCase() + operator.slice(1).toLowerCase();

  // Set authorization cookies and storage when accessing via the secret portal
  useEffect(() => {
    try {
      document.cookie = 'md_admin_access=granted; path=/; max-age=604800; SameSite=Lax';
      document.cookie = `md_admin_operator=${operator}; path=/; max-age=604800; SameSite=Lax`;
      localStorage.setItem('md_admin_access', 'granted');
      localStorage.setItem('md_admin_operator', operator);
    } catch {
      // ignore
    }
  }, [operator]);

  // If already logged in, navigate straight to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/admin/dashboard');
    }
  }, [user, authLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await signIn(data.email, data.password);
      toast.success('Authenticated successfully. Redirecting to dashboard...');
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      console.error('Login error:', err);
      const msg =
        (err as Error)?.message || 'Invalid credentials. Please verify your email and password.';
      setErrorMessage(msg);
      toast.error('Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              alt="Magnovaa Technology"
              width={200}
              height={60}
              priority
              className="h-11 w-auto object-contain"
            />
          </div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-100/90 text-teal-800 border border-teal-300/80 px-3.5 py-1 text-xs font-bold shadow-xs">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            Gateway Unlocked: {formattedOperator}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Gateway
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Secure administrative control portal for Magnovaa Technology
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
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
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  Authenticating...
                </>
              ) : (
                <>
                  Enter Dashboard <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </form>
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
