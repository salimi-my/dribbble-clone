'use client';

import { useEffect } from 'react';
import { Work } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

import useWorks from '@/hooks/use-works';
import WorkCard from '@/components/work-card';

interface WorkPageProps {
  index: number;
  setLoading: (value: boolean) => void;
  isProfile: boolean;
  userId?: string;
}

export default function WorkPage({
  index,
  setLoading,
  isProfile,
  userId
}: WorkPageProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const category = searchParams.get('category');

  const { data, isLoading, error } = useWorks({
    offset: (index - 1) * 12,
    search,
    category,
    userId
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [setLoading, isLoading]);

  return (
    <>
      {data &&
        !isLoading &&
        data.map((work: Work) => (
          <WorkCard key={work.id} work={work} isProfile={isProfile} />
        ))}
    </>
  );
}
