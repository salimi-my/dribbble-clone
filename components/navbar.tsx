import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';
import { AlignLeft } from 'lucide-react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import ProfileMenu from '@/components/profile-menu';
import SearchInput from '@/components/search-input';

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
        {userId && (
          <div className='flex justify-end items-center gap-6'>
            <SearchInput />
            <ProfileMenu />
          </div>
        )}
        {!userId && (
          <div className='flex justify-end items-center gap-6'>
            <SearchInput />
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
