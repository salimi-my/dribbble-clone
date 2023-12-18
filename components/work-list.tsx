'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Work } from '@prisma/client';

import { cn } from '@/lib/utils';
import WorkPage from '@/components/work-page';
import { Button } from '@/components/ui/button';
import WorkInitialPage from '@/components/work-initial-page';

interface WorkListProps {
  initialData: Work[];
  pageCount: number;
  isProfile?: boolean;
  userId?: string;
  userFullname?: string;
}

export default function WorkList({
  initialData,
  pageCount,
  isProfile = false,
  userId,
  userFullname
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
      {initialData.length === 0 && !isProfile && (
        <section className='w-full pt-4 lg:pt-8 flex flex-col items-center'>
          <div className='relative inline-flex mb-5'>
            <Image
              src='/no-results.png'
              alt='no results'
              width={510}
              height={383}
            />
            <span className='absolute right-[60px] bottom-[20px] md:right-[120px] md:bottom-[40px] text-[#dbdbde] text-xs'>
              Art by{' '}
              <Link href='/' className='underline'>
                Misha
              </Link>
            </span>
          </div>
          <h3 className='text-2xl mb-5 font-bold text-center'>
            No results found
          </h3>
          <p className='mb-5 text-[#6e6d7a] text-center'>
            It seems we can’t find any results based on your search.
          </p>
        </section>
      )}
      {initialData.length === 0 && isProfile && (
        <section className='w-full pt-4 lg:pt-8 flex flex-col items-center my-[90px]'>
          <Image
            src='/no-works.jpg'
            alt='no works'
            width={190}
            height={190}
            className='mb-6'
          />
          <h4 className='mb-3 text-xl font-medium text-center'>No works :(</h4>
          <p className='text-sm text-center max-w-[325px]'>
            It looks like{' '}
            {typeof userFullname === 'string' ? userFullname : 'this user'}{' '}
            hasn’t uploaded any shots yet. Check back soon!
          </p>
        </section>
      )}
      {initialData.length > 0 && (
        <section
          className={cn(
            'w-full gap-9 pt-4 lg:pt-8 grid md:grid-cols-2 lg:grid-cols-3',
            !isProfile && 'xl:grid-cols-4',
            isProfile && 'xl:gap-12'
          )}
        >
          {pages}
        </section>
      )}

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
