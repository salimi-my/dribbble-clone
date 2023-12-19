import Link from 'next/link';
import { format } from 'date-fns';
import { Profile } from '@prisma/client';
import { User } from '@clerk/nextjs/server';

import { Separator } from '@/components/ui/separator';
import { AtSign, Github, Linkedin, UserIcon } from 'lucide-react';

interface ProfileAboutProps {
  user: User;
  profile: Profile;
}

export default function ProfileAbout({ user, profile }: ProfileAboutProps) {
  const randomNumber = (min: number, max: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toLocaleString();
  };

  return (
    <div className='w-full max-w-[1152px] lg:px-[72px] grid md:grid-cols-2 lg:grid-cols-3 gap-12'>
      <div className='lg:col-span-2 flex flex-col gap-10'>
        <div>
          <h2 className='font-medium mb-4'>Name</h2>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div>
          <h2 className='font-medium mb-4'>Biography</h2>
          <p>{profile.bio}</p>
        </div>
        <Separator />
        <div className='flex gap-6 text-[#6e6d7a]'>
          <p>{randomNumber(5000, 2000)} followers</p>
          <p>{randomNumber(500, 100)} following</p>
          <p>{randomNumber(5000, 100)} likes</p>
        </div>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='p-6 rounded-lg bg-[#fafafb] flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <AtSign className='w-4 h-4 text-[#3d3d4e]' />
            <p className='text-sm text-[#3d3d4e]'>{profile.username}</p>
          </div>
          <div className='flex items-center gap-2'>
            <UserIcon className='w-4 h-4 text-[#3d3d4e]' />
            <p className='text-sm text-[#3d3d4e]'>
              Member since {format(new Date(user.createdAt), 'MMM yyyy')}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h2 className='font-medium mb-4'>Social</h2>
          <Link
            href={profile.githubUrl !== null ? profile.githubUrl : '/'}
            className='flex items-center gap-3 hover:opacity-80'
          >
            <Github className='w-5 h-5 text-[#3d3d4e]' />
            <p className='text-sm text-[#3d3d4e]'>GitHub</p>
          </Link>
          <Link
            href={profile.linkedinUrl !== null ? profile.linkedinUrl : '/'}
            className='flex items-center gap-3 hover:opacity-80'
          >
            <Linkedin className='w-5 h-5 text-[#3d3d4e]' />
            <p className='text-sm text-[#3d3d4e]'>LinkedIn</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
