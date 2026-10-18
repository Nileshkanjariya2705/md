'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const FAQS = [
  {
    question: 'How does Magnovaa structure client engagements?',
    answer:
      'We operate primarily on dedicated engineering squad models or fixed-scope milestone engagements. For long-term initiatives, we embed senior architects and engineers directly alongside your leadership, aligning seamlessly with your sprint cycles.',
  },
  {
    question: 'What technologies and frameworks do you specialize in?',
    answer:
      'Our primary stack includes Next.js, React, TypeScript, Node.js, Go, Python, Tailwind CSS, PostgreSQL, Redis, and cloud architectures across AWS and GCP. In AI, we specialize in custom RAG pipelines, fine-tuned LLMs, and autonomous agent systems.',
  },
  {
    question: 'How fast can a project squad kick off?',
    answer:
      'Following initial discovery and architectural scoping (typically 3–5 business days), a dedicated squad can usually be onboarded and pushing to staging within 1 to 2 weeks.',
  },
  {
    question: 'Who retains intellectual property rights?',
    answer:
      'You do. 100% of the code, designs, documentation, and infrastructure definitions generated during the partnership belong exclusively to your company upon milestone completion.',
  },
  {
    question: 'Do you offer ongoing SLA maintenance and infrastructure support?',
    answer:
      'Yes. We provide 24/7 SLA maintenance tiers encompassing proactive dependency patching, database query optimization, infrastructure scaling, and incident response.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white relative">
      <Container>
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Everything You Need to Know"
          description="Clear answers about our engagement models, technology stack, and engineering practices."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  'rounded-2xl border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'border-teal-500/40 bg-teal-50/40 shadow-sm'
                    : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      'rounded-full p-1.5 transition-transform duration-300 shrink-0',
                      isOpen
                        ? 'rotate-180 bg-teal-100 text-teal-700'
                        : 'bg-slate-200 text-slate-600'
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 animate-reveal visible">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
