import { Timestamp } from 'firebase/firestore';

function parseToDate(val: any): Date | null {
  if (!val) return null;
  if (typeof val.toDate === 'function') {
    return val.toDate();
  }
  if (typeof val.seconds === 'number') {
    return new Date(val.seconds * 1000);
  }
  if (val instanceof Date) {
    return val;
  }
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Format a Firestore Timestamp (or serialized timestamp) to a human-readable date string.
 */
export function formatDate(timestamp: any): string {
  const date = parseToDate(timestamp);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a Firestore Timestamp (or serialized timestamp) to a human-readable date and time string.
 */
export function formatDateTime(timestamp: any): string {
  const date = parseToDate(timestamp);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Format a Firestore Timestamp (or serialized timestamp) to a relative time string (e.g., "2 hours ago").
 */
export function formatRelativeTime(timestamp: any): string {
  const date = parseToDate(timestamp);
  if (!date) return '—';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatDate(timestamp);
}

/**
 * Create a Firestore Timestamp from the current time.
 */
export function now(): Timestamp {
  return Timestamp.now();
}
