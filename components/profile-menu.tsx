import Link from 'next/link';
import { SignOutButton, currentUser } from '@clerk/nextjs';

import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

export default async function ProfileMenu() {
  const user = await currentUser();

  if (user) {
    return (
      <HoverCard openDelay={300}>
        <HoverCardTrigger>
          <Avatar className='h-12 w-12 hover:cursor-pointer'>
            <AvatarImage src={user.imageUrl} alt='avatar' />
            <AvatarFallback>
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent
          collisionPadding={40}
          sideOffset={30}
          className='rounded-2xl shadow-sm border-[#f3f3f4] p-8 w-[320px]'
        >
          <div className='flex flex-col'>
            <Link
              href='/'
              className='flex flex-col justify-center items-center mb-5'
            >
              <Avatar className='h-20 w-20 hover:cursor-pointer'>
                <AvatarImage src={user.imageUrl} alt='avatar' />
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className='mt-4 font-medium'>
                {user.firstName} {user.lastName}
              </p>
            </Link>
            <Link
              href='/'
              className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
            >
              Upload design work
            </Link>
            <Link
              href='/'
              className='text-[15px] py-2 hover:opacity-80 transition-opacity ease-in-out duration-200'
            >
              Work preferences
            </Link>
            <Link
              href='/'
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
    );
  } else {
    return null;
  }
}
