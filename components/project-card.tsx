import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@prisma/client';
import { BookmarkIcon, HeartIcon } from 'lucide-react';

import Eye from '@/components/icons/eye';
import Heart from '@/components/icons/heart';
import useClerkUser from '@/hooks/use-clerk-user';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { user, isLoading } = useClerkUser({ userId: project.userId });

  return (
    <div className='flex flex-col gap-2'>
      <Link
        href={`project/${project.id}`}
        className='relative w-full h-[225px] overflow-hidden group'
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1439px) 33vw, 25vw'
          className='object-cover rounded-lg'
        />
        <div className='opacity-0 group-hover:opacity-100 group-hover:cursor-pointer absolute top-0 bottom-0 right-0 left-0 p-5 flex z-10 items-end rounded-lg bg-card-info transition-opacity ease-in-out duration-300'>
          <div className='w-full flex justify-between items-center'>
            <div className='text-white font-medium w-1/2 truncate'>
              {project.title}
            </div>
            <div className='flex justify-end'>
              <div className='bg-white rounded-full flex justify-center items-center w-10 h-10 ml-3'>
                <BookmarkIcon size={16} />
              </div>
              <div className='bg-white rounded-full flex justify-center items-center w-10 h-10 ml-3'>
                <HeartIcon size={16} />
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className='flex justify-between items-center'>
        <div className='w-full flex justify-start items-center space-x-2'>
          {isLoading && (
            <>
              <Skeleton className='rounded-full h-6 w-6' />
              <Skeleton className='w-1/2 h-5' />
            </>
          )}
          {user && !isLoading && (
            <>
              <Avatar className='h-6 w-6 hover:cursor-pointer'>
                <AvatarImage src={user.imageUrl} alt='avatar' />
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className='text-sm font-medium w-1/2 truncate'>
                {user.firstName} {user.lastName}
              </p>
            </>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center space-x-[2px]'>
            <Heart />
            <p className='text-xs font-medium text-[#3d3d4e]'>70</p>
          </div>
          <div className='flex items-center space-x-[2px]'>
            <Eye />
            <p className='text-xs font-medium text-[#3d3d4e]'>3.6k</p>
          </div>
        </div>
      </div>
    </div>
  );
}
