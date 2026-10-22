'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { contactMessageSchema, ContactFormData } from '@/features/contact/validations/contact.schema';
import { useSubmitMessageMutation } from '@/features/contact/hooks/use-messages-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitMutation = useSubmitMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot spam defense check
    if (data.honeypot && data.honeypot.length > 0) {
      setIsSubmitted(true);
      return;
    }

    try {
      await submitMutation.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        subject: data.subject,
        message: data.message,
      });
      setIsSubmitted(true);
      toast.success('Message sent successfully! We will get in touch shortly.');
      reset();
    } catch (err) {
      console.error('Contact submission error:', err);
      toast.error('Failed to submit message. Please try again or reach out directly via email.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-[#2f6bff]/30 bg-white p-8 text-center shadow-lg animate-reveal visible">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2f6bff]/10 text-[#2f6bff]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-[#14233a] mb-2">Message Received</h3>
        <p className="text-[#64748b] text-sm max-w-md mx-auto mb-6 leading-relaxed">
          Thank you for reaching out to Magnovaa Technology. A senior solutions architect will review your inquiry and respond within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
          className="rounded-full"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl"
    >
      {/* Honeypot hidden input */}
      <input
        type="text"
        {...register('honeypot')}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Full Name <span className="text-[#2f6bff]">*</span>
          </label>
          <Input
            placeholder="Jane Doe"
            {...register('name')}
            className={errors.name ? 'border-rose-500' : ''}
          />
          {errors.name && (
            <p className="text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Work Email <span className="text-[#2f6bff]">*</span>
          </label>
          <Input
            type="email"
            placeholder="jane@company.com"
            {...register('email')}
            className={errors.email ? 'border-rose-500' : ''}
          />
          {errors.email && (
            <p className="text-xs text-rose-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Phone Number (Optional)
          </label>
          <Input
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register('phone')}
          />
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Subject / Engagement Type <span className="text-[#2f6bff]">*</span>
          </label>
          <Input
            placeholder="e.g. New Platform Development"
            {...register('subject')}
            className={errors.subject ? 'border-rose-500' : ''}
          />
          {errors.subject && (
            <p className="text-xs text-rose-500">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700">
          Project Brief / Message <span className="text-[#2f6bff]">*</span>
        </label>
        <Textarea
          rows={5}
          placeholder="Tell us about your technical objectives, timeline, or current infrastructure..."
          {...register('message')}
          className={errors.message ? 'border-rose-500' : ''}
        />
        {errors.message && (
          <p className="text-xs text-rose-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={submitMutation.isPending}
        size="lg"
        className="w-full justify-center rounded-full font-bold mt-2 shadow-sm"
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Transmitting Inquiry...
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4 ml-1" />
          </>
        )}
      </Button>
    </form>
  );
}
