import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dhashnamoorthy  - AI & Web Developer',
  description: 'Aspiring AI enthusiast & web developer building intelligent interfaces. Portfolio showcasing projects in machine learning, web development, and innovative tech solutions.',
  keywords: ['AI Developer', 'Web Developer', 'Machine Learning', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Dhashnamoorthy ' }],
  creator: 'Dhashnamoorthy ',
  publisher: 'Dhashnamoorthy ',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexchen.dev',
    title: 'Dhashnamoorthy  - AI & Web Developer',
    description: 'Aspiring AI enthusiast & web developer building intelligent interfaces.',
    siteName: 'Dhashnamoorthy  Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhashnamoorthy  - AI & Web Developer',
    description: 'Aspiring AI enthusiast & web developer building intelligent interfaces.',
    creator: '@alexchen',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}