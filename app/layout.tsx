import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alex Chen - AI & Web Developer',
  description: 'Aspiring AI enthusiast & web developer building intelligent interfaces. Portfolio showcasing projects in machine learning, web development, and innovative tech solutions.',
  keywords: ['AI Developer', 'Web Developer', 'Machine Learning', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Alex Chen' }],
  creator: 'Alex Chen',
  publisher: 'Alex Chen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexchen.dev',
    title: 'Alex Chen - AI & Web Developer',
    description: 'Aspiring AI enthusiast & web developer building intelligent interfaces.',
    siteName: 'Alex Chen Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Chen - AI & Web Developer',
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
      </body>
    </html>
  );
}