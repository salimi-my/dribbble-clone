'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import useGetProfile from '@/hooks/use-get-profile';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail } from 'lucide-react';

interface ProjectOwnerProps {
  userId: string;
}

export default function ProjectOwner({ userId }: ProjectOwnerProps) {
  const { data, isLoading } = useGetProfile({ userId });

  return (
    <>
      <div className='w-full flex items-center mt-[70px] px-4 md:px-0'>
        <span className='w-full border bg-[#e7e7e9]' />
        <Link href='/' className='px-6'>
          {isLoading && <Skeleton className='w-[72px] h-[72px] rounded-full' />}
          {!isLoading && data && data.user && (
            <Avatar className='h-[72px] w-[72px] hover:cursor-pointer'>
              <AvatarImage src={data.user.imageUrl} alt='avatar' />
              <AvatarFallback>
                {data.user.firstName?.charAt(0)}
                {data.user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </Link>
        <span className='w-full border bg-[#e7e7e9]' />
      </div>
      <div className='flex justify-center mt-5 px-4 md:px-0'>
        <div className='flex flex-col text-center'>
          {isLoading && (
            <div className='flex flex-col items-center justify-center'>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-40 mt-3' />
              <Skeleton className='h-10 w-28 rounded-full mt-4' />
            </div>
          )}
          {!isLoading && data && data.user && (
            <>
              <Link href='/'>
                <p className='text-xl font-medium'>
                  {data.user.firstName} {data.user.lastName}
                </p>
              </Link>
              <p className='text-sm text-muted-foreground mt-2'>
                UI & Web Designer. Available for freelance work.
              </p>
              <div className='mt-4'>
                <Button className='rounded-full h-10'>
                  <Mail className='mr-1.5 w-4 h-4' />
                  Get in touch
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
