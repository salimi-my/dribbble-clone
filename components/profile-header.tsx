import Link from 'next/link';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import type { User } from '@clerk/nextjs/server';
import type { Profile, Work } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/Icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  user: User;
  profile: Profile;
  works: Work[];
  isOwner: boolean;
}

export default function ProfileHeader({
  user,
  profile,
  works,
  isOwner
}: ProfileHeaderProps) {
  const randomNumber = (min: number, max: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toLocaleString();
  };

  return (
    <>
      {/* profile header with no work */}
      {works.length === 0 && (
        <div className='w-full pt-9 pb-7 flex flex-col md:items-center justify-start'>
          <div className='flex flex-col md:flex-row'>
            <Avatar className='h-[84px] w-[84px] md:h-[120px] md:w-[120px]'>
              <AvatarImage src={user.imageUrl} alt='avatar' />
              <AvatarFallback>
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col md:ml-10'>
              <h1 className='text-3xl font-bold mt-[5px] mb-[10px]'>
                {user.firstName} {user.lastName}
              </h1>
              <p className='mb-2 text-[#9e9ea7]'>{profile.bio}</p>
              <div className='mt-[14px] flex space-x-3'>
                <Button className='rounded-full h-12 px-6 font-semibold hover:opacity-80'>
                  Get in touch
                </Button>
                {isOwner && (
                  <Button
                    variant='outline'
                    className='rounded-full h-12 px-6 font-semibold shadow-none hover:bg-transparent hover:border-[#dbdbde]'
                    asChild
                  >
                    <Link href='/account'>Edit Profile</Link>
                  </Button>
                )}
                {!isOwner && (
                  <Button
                    variant='outline'
                    className='rounded-full h-12 px-6 font-semibold shadow-none hover:bg-transparent hover:border-[#dbdbde]'
                  >
                    Follow
                  </Button>
                )}
                <Button
                  size='icon'
                  variant='outline'
                  className='rounded-full h-12 w-12 p-0 font-semibold shadow-none hover:bg-transparent hover:border-[#dbdbde]'
                >
                  <MoreHorizontal className='w-5 h-5' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* profile header with work */}
      {works.length > 0 && (
        <div className='my-5 w-full flex flex-col md:flex-row justify-between gap-[42px] md:gap-[60px]'>
          <div className='w-full flex justify-end grow max-w-[722px] md:order-2'>
            <div className='relative'>
              <Image
                src={works[0].image}
                alt={works[0].title}
                width={578}
                height={364}
                className='w-full max-w-[578px] h-auto object-cover object-center rounded-3xl'
              />
              <Icons.probadge className='absolute -bottom-[50px] right-[10px] md:top-[8%] md:-left-[50px] lg:-left-[68px] text-[#6e6d7a] w-[100px] lg:w-[135px] h-auto' />
            </div>
          </div>
          <div className='flex flex-col'>
            <Avatar className='h-[84px] w-[84px] mb-6'>
              <AvatarImage src={user.imageUrl} alt='avatar' />
              <AvatarFallback>
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h1 className='text-xl font-medium lg:text-3xl lg:font-bold mb-3'>
              {user.firstName} {user.lastName}
            </h1>
            <h2 className='text-2xl lg:text-5xl font-bold'>{profile.bio}</h2>
            <div className='flex gap-3 lg:gap-6 text-[#6e6d7a] mt-4 text-sm lg:text-base'>
              <p>{randomNumber(5000, 2000)} followers</p>
              <p>{randomNumber(500, 100)} following</p>
              <p>{randomNumber(5000, 100)} likes</p>
            </div>
            <div className='mt-6 flex space-x-3'>
              <Button className='rounded-full h-12 px-6 font-semibold hover:opacity-80'>
                Get in touch
              </Button>
              {isOwner && (
                <Button
                  variant='outline'
                  className='rounded-full h-12 px-6 font-semibold shadow-none hover:bg-transparent hover:border-[#dbdbde]'
                  asChild
                >
                  <Link href='/account'>Edit Profile</Link>
                </Button>
              )}
              {!isOwner && (
                <Button
                  variant='outline'
                  className='rounded-full h-12 px-6 font-semibold shadow-none hover:bg-transparent hover:border-[#dbdbde]'
                >
                  Follow
                </Button>
              )}
              <Button
                size='icon'
                variant='outline'
                className='rounded-full h-12 w-12 p-0 font-semibold shadow-none hover:bg-transparent hover:border-[#dbdbde]'
              >
                <MoreHorizontal className='w-5 h-5' />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
