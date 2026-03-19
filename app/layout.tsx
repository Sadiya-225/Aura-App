import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Aura',
  description: 'A private journal of recognition.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/icon1.png', type: 'image/png' },
    ],
    apple: '/favicon/apple-icon.png',
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#fdf8f4] text-[#1a1010] min-h-screen selection:bg-[#7a5a5a]/20">
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] noise-texture" />
        {children}
      </body>
    </html>
  );
}
