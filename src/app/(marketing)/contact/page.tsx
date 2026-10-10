import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { ContactForm } from '@/components/forms/contact-form';
import { SITE_CONFIG } from '@/lib/constants/navigation';
import { Mail, MapPin, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & Technical Scoping',
  description:
    'Initiate a conversation with MD Technologies principal architects regarding new product builds, cloud migrations, or dedicated engineering squads.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          badge="Direct Inquiries"
          title="Let's Discuss Your Architectural Vision"
          description="Speak directly with our senior technical partners. Tell us about your goals, timelines, or infrastructure challenges."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-teal-600" />
                Engineering Headquarters
              </h3>

              <div className="space-y-5 text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Location</h4>
                    <p className="mt-0.5 text-slate-500 leading-relaxed">
                      {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email Inquiries</h4>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="mt-0.5 block text-teal-600 font-medium hover:underline"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Direct Line</h4>
                    <p className="mt-0.5 text-slate-500">
                      {SITE_CONFIG.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Response SLA</h4>
                    <p className="mt-0.5 text-slate-500">
                      Standard inquiries reviewed within 24 hours. Critical escalations monitored 24/7.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NDA / Confidentiality Guarantee */}
            <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-6 flex items-start gap-3.5">
              <ShieldCheck className="h-6 w-6 text-teal-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-teal-800 block mb-1">Mutual NDA Protected:</strong>
                All proprietary concepts, architecture plans, and communication submitted through this portal are treated with strict confidentiality.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
