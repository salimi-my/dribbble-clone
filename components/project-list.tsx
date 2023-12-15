'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Project } from '@prisma/client';

import { Button } from '@/components/ui/button';
import ProjectPage from '@/components/project-page';
import ProjectInitialPage from '@/components/project-initial-page';

interface ProjectListProps {
  initialData: Project[];
  pageCount: number;
}

export default function ProjectList({
  initialData,
  pageCount
}: ProjectListProps) {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const pages = [<ProjectInitialPage key={1} initialData={initialData} />];
  for (let i = 2; i <= count; i++) {
    pages.push(<ProjectPage index={i} key={i} setLoading={setLoading} />);
  }

  return (
    <>
      <section className='w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9 pt-4 lg:pt-8'>
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
