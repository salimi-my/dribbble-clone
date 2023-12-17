import { MoreHorizontal } from 'lucide-react';
import type { User } from '@clerk/nextjs/server';
import type { Profile, Project } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import ProBadge from './icons/pro-badge';

interface ProfileHeaderProps {
  user: User;
  profile: Profile;
  projects: Project[];
  isOwner: boolean;
}

export default function ProfileHeader({
  user,
  profile,
  projects,
  isOwner
}: ProfileHeaderProps) {
  const randomNumber = (min: number, max: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toLocaleString();
  };

  return (
    <>
      {/* profile header with no project */}
      {projects.length === 0 && (
        <div className='pt-9 pb-7 flex flex-col items-center justify-start'>
          <div className='flex'>
            <Avatar className='h-[120px] w-[120px]'>
              <AvatarImage src={user.imageUrl} alt='avatar' />
              <AvatarFallback>
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col ml-10'>
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
                  >
                    Edit Profile
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

      {/* profile header with project */}
      {projects.length > 0 && (
        <div className='my-10 w-full flex justify-between gap-[60px]'>
          <div className='flex flex-col'>
            <Avatar className='h-[84px] w-[84px] mb-6'>
              <AvatarImage src={user.imageUrl} alt='avatar' />
              <AvatarFallback>
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h1 className='text-3xl font-bold mb-3'>
              {user.firstName} {user.lastName}
            </h1>
            <h2 className='text-5xl font-bold'>{profile.bio}</h2>
            <div className='flex gap-6 text-[#6e6d7a] mt-4'>
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
                >
                  Edit Profile
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
          <div className='relative w-full flex justify-end grow max-w-[722px] overflow-hidden'>
            <div className='relative'>
              <Image
                src={projects[0].image}
                alt={projects[0].title}
                width={578}
                height={364}
                className='w-full max-w-[578px] h-auto object-cover object-center rounded-3xl'
              />
              <ProBadge />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
