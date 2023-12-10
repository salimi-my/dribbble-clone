import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { EdgeStoreProvider } from '@/lib/edgestore';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bribbble',
  description: 'A Dribbble clone'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
