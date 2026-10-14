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
    template: '%s | Mogovaa Technology',
    default: 'Mogovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
  },
  description:
    'Mogovaa Technology engineers high-concurrency systems, generative AI platforms, cloud architectures, and bespoke software solutions worldwide.',
  keywords: [
    'software engineering',
    'cloud architecture',
    'enterprise web apps',
    'AI solutions',
    'digital transformation',
    'Mogovaa Technology',
    'Mogovaa',
    'Magnovaa',
    'Full Stack Development',
    'Next.js',
    'React',
    'Python AI',
  ],
  authors: [{ name: 'Mogovaa Technology', url: 'https://mogovaa.com' }],
  creator: 'Mogovaa Technology',
  publisher: 'Mogovaa Technology',
  metadataBase: new URL('https://mogovaa.com'),
  alternates: {
    canonical: 'https://mogovaa.com',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mogovaa.com',
    siteName: 'Mogovaa Technology',
    title: 'Mogovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'We craft exceptional digital experiences that elevate brands and drive business growth through innovative technology solutions.',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 362,
        alt: 'Mogovaa Technology Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mogovaa Technology | AI-Powered Enterprise Software & Digital Solutions',
    description:
      'We craft exceptional digital experiences that elevate brands and drive business growth through innovative technology solutions.',
    images: ['/logo.png'],
    site: '@mogovaa',
    creator: '@mogovaa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mogovaa Technology',
  alternateName: ['Mogovaa', 'Magnovaa Technology'],
  url: 'https://mogovaa.com',
  logo: 'https://mogovaa.com/logo.png',
  description:
    'Mogovaa Technology engineers high-concurrency systems, generative AI platforms, and bespoke enterprise software for industry-leading organizations worldwide.',
  email: 'hello@mogovaa.com',
  sameAs: [
    'https://linkedin.com/company/mogovaa',
    'https://twitter.com/mogovaa',
    'https://github.com/mogovaa',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@mogovaa.com',
    contactType: 'customer support',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} light`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
