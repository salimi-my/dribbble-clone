import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import db from '@/lib/db';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Info | Bribbble',
  description: "Add additional information of your account's profile."
};

export default async function AddInfoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const profile = await db.profile.findFirst({
    where: {
      userId
    }
  });

  if (profile) {
    redirect('/');
  }

  return <>{children}</>;
}
