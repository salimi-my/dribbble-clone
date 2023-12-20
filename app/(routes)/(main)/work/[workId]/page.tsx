import Link from 'next/link';
import Image from 'next/image';
import ObjectID from 'bson-objectid';
import { auth } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { Github, Globe } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';

import db from '@/lib/db';
import WorkOwner from '@/components/work-owner';
import WorkDelete from '@/components/work-delete';
import WorkHeader from '@/components/work-header';
import WorkLayout from '@/components/ui/work-layout';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: { workId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const work = await db.work.findUnique({
    where: {
      id: params.workId
    }
  });

  // optionally access and extend (rather than replace) parent metadata
  const previousOpenGraphImages = (await parent).openGraph?.images || [];
  const previousTwitterImages = (await parent).twitter?.images || [];

  return {
    title: work?.title + ' | Bribbble',
    description: work?.description,
    openGraph: {
      images:
        typeof work?.image === 'string'
          ? [{ url: work.image }, ...previousOpenGraphImages]
          : previousOpenGraphImages
    },
    twitter: {
      images:
        typeof work?.image === 'string'
          ? [{ url: work.image }, ...previousTwitterImages]
          : previousTwitterImages
    }
  };
}

export default async function WorkPage({
  params
}: {
  params: { workId: string };
}) {
  const { userId } = auth();

  const isValidId = ObjectID.isValid(params.workId);

  if (!isValidId) {
    notFound();
  }

  const work = await db.work.findUnique({
    where: {
      id: params.workId
    }
  });

  if (!work) {
    notFound();
  }

  return (
    <WorkLayout>
      <div className='w-full relative pb-[70px]'>
        <WorkHeader userId={work.userId} title={work.title} />
        <div className='flex justify-center md:px-4 lg:px-[120px]'>
          <div className='flex flex-col relative max-w-5xl'>
            <Image
              src={work.image}
              alt={work.title}
              width={1024}
              height={768}
              priority
              className='my-7 md:rounded-md contrast-[0.95]'
            />
            <p className='font-medium text-lg my-8 px-4 md:px-0'>
              {work.description}
            </p>
            <div className='flex justify-start gap-2 h-5 px-4 md:px-0'>
              <div className='inline-flex items-center gap-2'>
                <Github className='w-5 h-5' />
                <Link
                  href={work.githubUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline underline-offset-4 text-sm font-medium'
                >
                  GitHub repo
                </Link>
              </div>
              <Separator orientation='vertical' className='mx-2 w-[2px]' />
              <div className='inline-flex items-center gap-2'>
                <Globe className='w-5 h-5' />
                <Link
                  href={work.githubUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline underline-offset-4 text-sm font-medium'
                >
                  Live site
                </Link>
              </div>
            </div>
            <div className='flex justify-center mt-20'>
              {userId !== null && userId === work.userId && (
                <div className='p-6 rounded-lg bg-[#fafafb] inline-flex gap-6'>
                  <Link
                    href={`/work/${work.id}/edit`}
                    className='text-[#3d3d4e] text-sm'
                  >
                    Edit
                  </Link>
                  <WorkDelete work={work} />
                </div>
              )}
            </div>
            <WorkOwner userId={work.userId} />
          </div>
        </div>
      </div>
    </WorkLayout>
  );
}
