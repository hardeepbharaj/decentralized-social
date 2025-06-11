import { Roboto } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import Providers from './providers';
import { Navigation } from '@/components/Navigation';

import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-black ${roboto.className}`}>
        <Providers>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Navigation />
            <main className="py-8">
              <div className="mx-auto max-w-3xl">{children}</div>
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
