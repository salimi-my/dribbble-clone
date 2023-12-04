import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NavLinks = [
  { href: '/', key: 'Find talent', text: 'Find talent' },
  { href: '/', key: 'Inspiration', text: 'Inspiration' },
  { href: '/', key: 'Learn design', text: 'Learn design' },
  { href: '/', key: 'Jobs', text: 'Jobs' },
  { href: '/', key: 'Go Pro', text: 'Go Pro' }
];

export default function Navbar() {
  const { userId } = auth();

  return (
    <nav className='flex justify-between items-center mid-xl:grid mid-xl:grid-cols-[1fr_96px_1fr] h-[100px] border-nav-border px-10'>
      <div className='flex-1 flex justify-start items-center gap-10'>
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
        {userId && (
          <>
            UserAvatar
            <Link href='/create-project'>Share Work</Link>
          </>
        )}
        {!userId && (
          <div className='flex justify-end items-center gap-6'>
            <div className='hidden lg:flex justify-between items-center h-12 rounded-full focus-within:outline-none focus-within:ring-0 bg-[#f4f5fb]'>
              <MagnifyingGlassIcon className='h-6 w-6 ms-5 me-1 text-muted-foreground' />
              <Input
                placeholder='Search...'
                className='h-8 border-none shadow-none pl-0 focus-visible:ring-0'
              />
            </div>
            <MagnifyingGlassIcon className='h-7 w-7 lg:hidden' />
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
              <Link href='/sign-up'>Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
