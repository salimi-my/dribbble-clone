import Link from 'next/link';

import { cn } from '@/lib/utils';

interface ProfileNavProps {
  username: string;
  activeNav: string;
}

export default function ProfileNav({ username, activeNav }: ProfileNavProps) {
  return (
    <ul className='w-full flex gap-2 py-8 border-b border-[#e7e7e9]'>
      <li>
        <Link
          href={`/${username}`}
          className={cn(
            'h-9 px-4 inline-flex items-center text-sm font-semibold hover:text-[#6e6d7a] transition-colors duration-200 ease-in',
            activeNav === 'work' &&
              'rounded-full bg-[#f8f7f4] hover:bg-[#f5f3f0] hover:text-[#0d0c22]'
          )}
        >
          Work
        </Link>
      </li>
      <li>
        <Link
          href={`/${username}/about`}
          className={cn(
            'h-9 px-4 inline-flex items-center text-sm font-semibold hover:text-[#6e6d7a] transition-colors duration-200 ease-in',
            activeNav === 'about' &&
              'rounded-full bg-[#f8f7f4] hover:bg-[#f5f3f0] hover:text-[#0d0c22]'
          )}
        >
          About
        </Link>
      </li>
    </ul>
  );
}
