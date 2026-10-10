import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/features/auth/context/auth-context';
import { QueryProvider } from '@/lib/react-query/query-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | MD Technologies',
    default: 'MD Technologies | AI-Powered Enterprise Software & Digital Solutions',
  },
  description:
    'MD Technologies engineers high-concurrency systems, generative AI platforms, and bespoke enterprise software for industry-leading organizations worldwide.',
  keywords: [
    'software engineering',
    'cloud architecture',
    'enterprise web apps',
    'AI solutions',
    'digital transformation',
    'MD Technologies',
  ],
  authors: [{ name: 'MD Technologies' }],
  metadataBase: new URL('https://md.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://md.dev',
    siteName: 'MD Technologies',
    title: 'MD Technologies | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'We craft exceptional digital experiences that elevate brands and drive business growth through innovative technology solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD Technologies | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'We craft exceptional digital experiences that elevate brands and drive business growth through innovative technology solutions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} light`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--md-bg-primary)] text-[var(--md-text-primary)] antialiased selection:bg-teal-500/20 selection:text-teal-900">
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              theme="light"
              position="bottom-right"
              toastOptions={{
                className: 'border border-slate-200 bg-white text-slate-900 shadow-xl',
              }}
            />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
