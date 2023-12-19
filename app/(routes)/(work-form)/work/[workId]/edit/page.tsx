import ObjectID from 'bson-objectid';
import { notFound } from 'next/navigation';

import db from '@/lib/db';
import { auth } from '@clerk/nextjs';
import WorkForm from '@/components/work-form';

export default async function EditPage({
  params
}: {
  params: { workId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    notFound();
  }

  const isValidId = ObjectID.isValid(params.workId);

  if (!isValidId) {
    notFound();
  }

  const work = await db.work.findUnique({
    where: {
      id: params.workId,
      userId
    }
  });

  if (!work) {
    notFound();
  }

  return <WorkForm work={work} />;
}
