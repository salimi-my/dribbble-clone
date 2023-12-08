import Link from 'next/link';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlignLeft, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const NavLinks = [
  { href: '/', key: 'Find talent', text: 'Find talent' },
  { href: '/', key: 'Inspiration', text: 'Inspiration' },
  { href: '/', key: 'Learn design', text: 'Learn design' },
  { href: '/', key: 'Jobs', text: 'Jobs' },
  { href: '/', key: 'Go Pro', text: 'Go Pro' }
];

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className='flex justify-between items-center mid-xl:grid mid-xl:grid-cols-[1fr_96px_1fr] h-[100px] border-nav-border px-6 lg:px-10'>
      <div className='flex-1 flex justify-start items-center gap-1 xl:gap-10'>
        <Button size='icon' variant='link' className='justify-start'>
          <AlignLeft className='mid-xl:hidden w-7 h-7' />
        </Button>
        <Link href='/' className='mid-xl:hidden'>
          <Image
            src='/bribbble-logo.svg'
            alt='bribbble logo'
            width={96}
            height={38}
          />
        </Link>
        <ul className='hidden lg:flex text-sm font-semibold gap-8'>
          {NavLinks.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className='flex items-center hover:opacity-80'
              >
                {link.text}{' '}
                {link.text === 'Learn design' && (
                  <ChevronDownIcon className='ml-1' />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link href='/' className='max-mid-xl:hidden'>
        <Image
          src='/bribbble-logo.svg'
          alt='bribbble logo'
          width={96}
          height={38}
        />
      </Link>

      <div className='flex justify-end items-center'>
        {user && (
          <div className='flex justify-end items-center gap-6'>
            <div className='hidden lg:flex justify-between items-center h-12 rounded-full focus-within:outline-none focus-within:ring-0 bg-[#f4f5fb]'>
              <Search className='h-5 w-5 ms-5 me-2 text-muted-foreground' />
              <Input
                placeholder='Search...'
                className='h-8 border-none shadow-none pl-0 focus-visible:ring-0'
              />
            </div>
            <Search className='h-6 w-6 lg:hidden' />
            <Avatar className='h-12 w-12'>
              <AvatarImage src={user.imageUrl} alt='avatar' />
              <AvatarFallback>
                {user.firstName?.charAt(0)}
                {user.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        {!user && (
          <div className='flex justify-end items-center gap-6'>
            <div className='hidden lg:flex justify-between items-center h-12 rounded-full focus-within:outline-none focus-within:ring-0 bg-[#f4f5fb]'>
              <Search className='h-5 w-5 ms-5 me-2 text-muted-foreground' />
              <Input
                placeholder='Search...'
                className='h-8 border-none shadow-none pl-0 focus-visible:ring-0'
              />
            </div>
            <Search className='h-6 w-6 lg:hidden' />
            <Link
              href='/sign-in'
              className='hidden lg:flex font-semibold text-sm hover:opacity-80'
            >
              Log in
            </Link>
            <Button
              className='rounded-full h-12 px-6 font-semibold hover:opacity-80'
              asChild
            >
              <Link href='/sign-up'>Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
