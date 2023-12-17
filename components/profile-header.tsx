import { MoreHorizontal } from 'lucide-react';
import type { User } from '@clerk/nextjs/server';
import type { Profile, Project } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  user: User;
  profile: Profile;
  projects: Project[];
  isPro: boolean;
  isOwner: boolean;
}

export default function ProfileHeader({
  user,
  profile,
  projects,
  isPro,
  isOwner
}: ProfileHeaderProps) {
  return (
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
  );
}
