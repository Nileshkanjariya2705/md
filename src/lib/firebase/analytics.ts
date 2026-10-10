import {
  getAnalytics,
  isSupported,
  logEvent as firebaseLogEvent,
  type Analytics,
} from 'firebase/analytics';
import { getFirebaseApp } from './app';

let analytics: Analytics | null = null;
let analyticsInitialized = false;

/**
 * Returns the Firebase Analytics instance, or null if unsupported (SSR, etc.)
 * Lazily initialized and cached.
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analyticsInitialized) return analytics;

  try {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(getFirebaseApp());
    }
  } catch {
    // Analytics not available — silently degrade
    analytics = null;
  }

  analyticsInitialized = true;
  return analytics;
}

/**
 * Log an analytics event safely (no-op during SSR or if analytics is unavailable)
 */
export async function logAnalyticsEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): Promise<void> {
  const instance = await getFirebaseAnalytics();
  if (instance) {
    firebaseLogEvent(instance, eventName, eventParams);
  }
}
