import Link from 'next/link';
import Image from 'next/image';

import AuthProviders from '@/components/auth-providers';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const NavLinks = [
  { href: '/', key: 'Find talent', text: 'Find talent' },
  { href: '/', key: 'Inspiration', text: 'Inspiration' },
  { href: '/', key: 'Learn design', text: 'Learn design' },
  { href: '/', key: 'Jobs', text: 'Jobs' },
  { href: '/', key: 'Go Pro', text: 'Go Pro' }
];

export default function Navbar() {
  const session = null;
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
            <Link
              key={link.key}
              href={link.href}
              className='flex items-center hover:opacity-80'
            >
              {link.text}{' '}
              {link.text === 'Learn design' && (
                <ChevronDownIcon className='ml-1' />
              )}
            </Link>
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
        {session && (
          <>
            UserAvatar
            <Link href='/create-project'>Share Work</Link>
          </>
        )}
        {!session && <AuthProviders />}
      </div>
    </nav>
  );
}
