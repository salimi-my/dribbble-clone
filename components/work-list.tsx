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
  isOwner?: boolean;
  userId?: string;
  userFullname?: string;
}

export default function WorkList({
  initialData,
  pageCount,
  isProfile = false,
  isOwner = false,
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
      {/* no results fallback for landing page */}
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

      {/* no results fallback for other's profile page */}
      {initialData.length === 0 && isProfile && !isOwner && (
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

      {/* no results fallback for owner's profile page */}
      {initialData.length === 0 && isProfile && isOwner && (
        <section className='w-full gap-9 pt-4 lg:pt-8 grid md:grid-cols-2 lg:grid-cols-3 xl:gap-12'>
          <div className='w-full flex flex-col items-center justify-center text-center h-[270px] xl:h-[360px] border-[2px] border-dashed border-[#e7e7e9] rounded-lg'>
            <div className='mb-[3%] lg:hidden xl:block'>
              <div className='w-[10%] my-0 h-[28px] mx-auto pb-[6%] pl-[10%] after:border-b-[28px] after:border-[#787eff] after:ml-[-28px] after:border-x-transparent after:border-x-[28px] after:w-0 after:h-0 after:content-[""] after:block' />
              <div className='w-[10%] my-0 h-[28px] mx-auto pb-[6%] pl-[10%] after:border-b-[28px] after:border-[#4d44c6] after:ml-[-28px] after:border-x-transparent after:border-x-[28px] after:w-0 after:h-0 after:content-[""] after:block' />
            </div>
            <h2 className='text-xl lg:text-xl xl:text-2xl font-bold mb-2'>
              Upload your first work
            </h2>
            <div className='w-[80%] max-w-[340px] mx-auto'>
              <p className='mb-[5%]'>
                Show off your best work. Get feedback, likes and be a part of a
                growing community.
              </p>
            </div>
            <Button
              className='rounded-full font-semibold hover:opacity-80 text-xs'
              asChild
            >
              <Link href='/upload-new'>Upload your first work</Link>
            </Button>
          </div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='w-full h-[225px] xl:h-[360px] rounded-lg bg-gradient-to-b from-black/[0.03] to-transparent'
            />
          ))}
        </section>
      )}

      {/* display work listing results */}
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
