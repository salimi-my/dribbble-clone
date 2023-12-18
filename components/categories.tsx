'use client';

import { useRef } from 'react';
import { useOverflow } from 'use-overflow';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import useOrigin from '@/hooks/use-origin';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  'Discover',
  'Animation',
  'Branding',
  'Illustration',
  'Mobile',
  'Print',
  'Product Design',
  'Typography',
  'Web Design'
];

export default function Categories() {
  const router = useRouter();
  const origin = useOrigin();
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const category = searchParams.get('category');

  const horizontalRef = useRef<HTMLUListElement>(null);
  const { refXOverflowing, refXScrollBegin, refXScrollEnd } =
    useOverflow(horizontalRef);

  const handleClick = (direction: string) => {
    if (horizontalRef.current) {
      const { scrollLeft, clientWidth } = horizontalRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      horizontalRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleFilter = (item: string) => {
    if (item === 'Discover') {
      if (search === null) {
        router.push(`${origin}`);
      } else {
        router.push(`${origin}?search=${search}`);
      }
    } else {
      if (search === null) {
        router.push(`${origin}?category=${item}`);
      } else {
        router.push(`${origin}?search=${search}&category=${item}`);
      }
    }
  };

  return (
    <div className='overflow-x-auto overflow-y-hidden relative'>
      <span
        onClick={() => handleClick('left')}
        className={cn(
          'w-10 h-9 absolute left-0 z-10 flex items-center justify-start bg-gradient-to-l from-transparent from-0% to-white to-50% hover:cursor-pointer',
          !refXOverflowing && 'hidden',
          refXScrollBegin && 'hidden'
        )}
      >
        <ChevronLeft size={18} />
      </span>
      <span
        onClick={() => handleClick('right')}
        className={cn(
          'w-10 h-9 absolute right-0 z-10 flex items-center justify-end bg-gradient-to-r from-transparent from-0% to-white to-50% hover:cursor-pointer',
          !refXOverflowing && 'hidden',
          refXScrollEnd && 'hidden'
        )}
      >
        <ChevronRight size={18} />
      </span>
      <ul
        ref={horizontalRef}
        className='overflow-x-auto overflow-y-hidden flex gap-2 px-[2px] whitespace-nowrap scroll-smooth scrollbar-hide'
      >
        {categories.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleFilter(item)}
              type='button'
              className={cn(
                'inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer',
                index === 0 && refXOverflowing && '-ml-4',
                index === item.length - 1 && refXOverflowing && '-mr-4',
                (item === category ||
                  (item === 'Discover' && category === null)) &&
                  'bg-[#f8f7f4]'
              )}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
