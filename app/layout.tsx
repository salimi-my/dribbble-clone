import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import './globals.css';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

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
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <main className='min-h-[calc(100vh-100px-427.44px)] md:min-h-[calc(100vh-100px-331.44px)] lg:min-h-[calc(100vh-100px-253.44px)]'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
