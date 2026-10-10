'use client';

import { logAnalyticsEvent } from '@/lib/firebase/analytics';

/**
 * Track a CTA click event.
 */
export function trackCTAClick(location: string, label: string): void {
  logAnalyticsEvent('cta_click', { location, label });
}

/**
 * Track a contact form submission.
 */
export function trackContactSubmit(): void {
  logAnalyticsEvent('contact_form_submit');
}

/**
 * Track a project view.
 */
export function trackProjectView(slug: string, title: string): void {
  logAnalyticsEvent('project_view', { slug, title });
}

/**
 * Track a project CTA click (e.g., visiting external URL).
 */
export function trackProjectCTAClick(slug: string, url: string): void {
  logAnalyticsEvent('project_cta_click', { slug, url });
}
