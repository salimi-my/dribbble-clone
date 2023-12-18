'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Work } from '@prisma/client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import WorkPage from '@/components/work-page';
import WorkInitialPage from '@/components/work-initial-page';

interface WorkListProps {
  initialData: Work[];
  pageCount: number;
  isProfile?: boolean;
  userId?: string;
}

export default function WorkList({
  initialData,
  pageCount,
  isProfile = false,
  userId
}: WorkListProps) {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const pages = [
    <WorkInitialPage key={1} initialData={initialData} isProfile={isProfile} />
  ];
  for (let i = 2; i <= count; i++) {
    pages.push(
      <WorkPage
        index={i}
        key={i}
        setLoading={setLoading}
        isProfile={isProfile}
        userId={userId}
      />
    );
  }

  return (
    <>
      <section
        className={cn(
          'w-full gap-9 pt-4 lg:pt-8 grid md:grid-cols-2 lg:grid-cols-3',
          !isProfile && 'xl:grid-cols-4',
          isProfile && 'xl:gap-12'
        )}
      >
        {pages}
      </section>
      {count < pageCount && !loading ? (
        <div className='mt-14 h-9'>
          <Button
            onClick={() => setCount((currentCount) => currentCount + 1)}
            variant='secondary'
            className='bg-[#f8f7f4] rounded-full py-[10px] px-5 hover:bg-[#f5f3f0] text-[13px] font-semibold'
          >
            Load more work
          </Button>
        </div>
      ) : loading ? (
        <div className='flex items-center mt-14 h-9'>
          <Loader2 className='animate-spin mr-2 text-pink-500' size={18} />
          Loading more...
        </div>
      ) : (
        <div className='mt-14 h-9' />
      )}
    </>
  );
}
