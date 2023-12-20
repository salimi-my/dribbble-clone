import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import db from '@/lib/db';
import DisclaimerModal from '@/components/modals/disclaimer-modal';

export default async function RouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (userId) {
    const profile = await db.profile.findFirst({
      where: {
        userId
      }
    });

    if (!profile) {
      redirect('/add-info');
    }
  }

  return (
    <>
      <DisclaimerModal />
      {children}
    </>
  );
}
