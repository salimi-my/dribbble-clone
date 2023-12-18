'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignOutButton } from '@clerk/nextjs';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import useCurrentProfile from '@/hooks/use-current-profile';
import EditProfileModal from '@/components/modals/edit-profile-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

export default function ProfileMenu() {
  const router = useRouter();
  const { data, isLoading } = useCurrentProfile();

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* desktop menu */}
      <div className='hidden lg:flex'>
        <HoverCard openDelay={300}>
          <HoverCardTrigger>
            {isLoading && <Skeleton className='rounded-full h-12 w-12' />}
            {!isLoading && data && data.user && (
              <Avatar
                onClick={() => router.push(`/${data?.profile.username}`)}
                className='h-12 w-12 hover:cursor-pointer'
              >
                <AvatarImage src={data.user.imageUrl} alt='avatar' />
                <AvatarFallback>
                  {data.user.firstName?.charAt(0)}
                  {data.user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </HoverCardTrigger>
          <HoverCardContent
            collisionPadding={40}
            sideOffset={30}
            className='rounded-2xl shadow-sm border-[#f3f3f4] p-8 w-[320px]'
          >
            <div className='flex flex-col'>
              {isLoading && (
                <div className='flex flex-col justify-center items-center mb-5'>
                  <Skeleton className='rounded-full h-20 w-20' />
                  <Skeleton className='mt-4 h-6 w-40' />
                </div>
              )}
              {!isLoading && data && data.user && data.profile && (
                <Link
                  href={`/${data.profile.username}`}
                  className='flex flex-col justify-center items-center mb-5'
                >
                  <Avatar className='h-20 w-20'>
                    <AvatarImage src={data.user.imageUrl} alt='avatar' />
                    <AvatarFallback>
                      {data.user.firstName?.charAt(0)}
                      {data.user.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p className='mt-4 font-medium text-[15px]'>
                    {data.user.firstName} {data.user.lastName}
                  </p>
                </Link>
              )}
              <Link
                href='/upload-new'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Upload design work
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                type='button'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200 text-left'
              >
                Profile informations
              </button>
              <Link
                href='/account'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Settings
              </Link>
              <Separator className='my-3' />
              <SignOutButton>
                <button className='text-[15px] pt-2 text-left hover:opacity-80 transition-opacity ease-in-out duration-200'>
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* mobile menu */}
      <div className='block lg:hidden'>
        {isLoading && <Skeleton className='rounded-full h-[38px] w-[38px]' />}
        {!isLoading && data && data.user && (
          <Avatar
            onClick={() => setMenuOpen((prevState) => !prevState)}
            className='h-[38px] w-[38px] hover:cursor-pointer'
          >
            <AvatarImage src={data.user.imageUrl} alt='avatar' />
            <AvatarFallback>
              {data.user.firstName?.charAt(0)}
              {data.user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          onClick={() => setMenuOpen((prevState) => !prevState)}
          className={cn(
            'before:content-[""] before:fixed before:z-20 before:top-[100px] before:left-0 before:w-screen before:h-screen before:bg-black/50 transition-all ease-in-out duration-200',
            menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          )}
        />
        <div
          className={cn(
            'fixed top-[100px] w-full right-0 z-20 transition-opacity ease-in-out duration-200',
            menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          )}
        >
          <div className='relative z-20 box-border max-h-[calc(100vh_-_100px)] p-8 overflow-y-scroll border-t border-gray-200 bg-white shadow-lg'>
            <div className='flex flex-col'>
              {isLoading && (
                <div className='flex flex-col justify-center items-center mb-5'>
                  <Skeleton className='rounded-full h-20 w-20' />
                  <Skeleton className='mt-4 h-6 w-40' />
                </div>
              )}
              {!isLoading && data && data.user && data.profile && (
                <Link
                  href={`/${data.profile.username}`}
                  className='flex flex-col justify-center items-center mb-5'
                >
                  <Avatar className='h-20 w-20 hover:cursor-pointer'>
                    <AvatarImage src={data.user.imageUrl} alt='avatar' />
                    <AvatarFallback>
                      {data.user.firstName?.charAt(0)}
                      {data.user.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p className='mt-4 font-medium text-[15px]'>
                    {data.user.firstName} {data.user.lastName}
                  </p>
                </Link>
              )}
              <Link
                href='/upload-new'
                className='text-[15px] py-2 hover:opacity-80 transition-all ease-in-out duration-200'
              >
                Upload design work
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                type='button'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200 text-left'
              >
                Profile informations
              </button>
              <Link
                href='/account'
                className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
              >
                Settings
              </Link>
              <Separator className='my-3' />
              {isLoading && (
                <>
                  <Skeleton className='h-5 mt-3 w-20' />
                </>
              )}
              {!isLoading && data && data.user && (
                <SignOutButton>
                  <button className='text-[15px] pt-2 text-left hover:opacity-80 transition-opacity ease-in-out duration-200'>
                    Sign out
                  </button>
                </SignOutButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* profile modal */}
      {!isLoading && data && data.profile && (
        <EditProfileModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          profile={data.profile}
        />
      )}
    </>
  );
}
