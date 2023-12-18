import type { Work } from '@prisma/client';

import WorkCard from '@/components/work-card';

interface WorkInitialPageProps {
  initialData: Work[];
  isProfile: boolean;
}

export default function WorkInitialPage({
  initialData,
  isProfile
}: WorkInitialPageProps) {
  return (
    <>
      {initialData.map((work) => (
        <WorkCard key={work.id} work={work} isProfile={isProfile} />
      ))}
    </>
  );
}
