import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/toaster';
import { EdgeStoreProvider } from '@/lib/edgestore';
import ModalProvider from '@/providers/modal-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'Bribbble - Discover the World’s Top Designers & Creative Professionals',
  description:
    'Find Top Designers & Creative Professionals on Bribbble. We are where designers gain inspiration, feedback, community, and jobs.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <Toaster />
          <ModalProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
