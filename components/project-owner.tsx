'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import useClerkUser from '@/hooks/use-clerk-user';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProjectOwnerProps {
  userId: string;
}

export default function ProjectOwner({ userId }: ProjectOwnerProps) {
  const { user, isLoading } = useClerkUser({ userId });

  return (
    <>
      <div className='w-full flex items-center mt-[70px]'>
        <span className='w-full border bg-[#e7e7e9]' />
        <Link href='/' className='px-6'>
          {isLoading && <Skeleton className='w-[72px] h-[72px] rounded-full' />}
          {!isLoading && user && (
            <Avatar className='h-[72px] w-[72px] hover:cursor-pointer'>
              <AvatarImage src={user.imageUrl} alt='avatar' />
              <AvatarFallback>
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
        </Link>
        <span className='w-full border bg-[#e7e7e9]' />
      </div>
      <div className='flex justify-center mt-5'>
        <div className='flex flex-col text-center'>
          {isLoading && (
            <div className='flex flex-col items-center justify-center'>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-40 mt-3' />
              <Skeleton className='h-10 w-28 rounded-full mt-4' />
            </div>
          )}
          {!isLoading && user && (
            <>
              <Link href='/'>
                <p className='text-xl font-medium'>
                  {user.firstName} {user.lastName}
                </p>
              </Link>
              <p className='text-sm text-muted-foreground mt-2'>
                UI & Web Designer. Available for freelance work.
              </p>
              <div className='mt-4'>
                <Button className='rounded-full h-10'>Get in touch</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
