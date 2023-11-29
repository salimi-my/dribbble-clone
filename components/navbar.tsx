import Link from 'next/link';
import Image from 'next/image';

import AuthProviders from '@/components/auth-providers';

const NavLinks = [
  { href: '/', key: 'Inspiration', text: 'Inspiration' },
  { href: '/', key: 'Find Projects', text: 'Find Projects' },
  { href: '/', key: 'Learn Development', text: 'Learn Development' },
  { href: '/', key: 'Career Advancement', text: 'Career Advancement' },
  { href: '/', key: 'Hire Developers', text: 'Hire Developers' }
];

export default function Navbar() {
  const session = null;
  return (
    <nav className='flex justify-between items-center py-3 px-8 border-b border-nav-border gap-4'>
      <div className='flex-1 flex justify-start items-center gap-10'>
        <Link href='/'>
          <Image
            src='/bribbble-logo.svg'
            alt='bribbble logo'
            width={115}
            height={43}
          />
        </Link>
        <ul className='hidden xl:flex text-sm font-medium gap-7'>
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className='flex justify-center items-center gap-4'>
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
