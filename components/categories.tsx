'use client';

import { useRef } from 'react';
import { useOverflow } from 'use-overflow';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Categories() {
  const horizontalRef = useRef<HTMLDivElement>(null);
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
      <div
        ref={horizontalRef}
        className='overflow-x-auto overflow-y-hidden flex gap-2 px-[2px] whitespace-nowrap scroll-smooth scrollbar-hide'
      >
        <div>
          <div
            className={cn(
              'inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer',
              refXOverflowing && '-ml-4'
            )}
          >
            Discover
          </div>
        </div>
        <div>
          <div className='inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer'>
            Animation
          </div>
        </div>
        <div>
          <div className='inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer'>
            Branding
          </div>
        </div>
        <div>
          <div className='inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer'>
            Illustration
          </div>
        </div>
        <div>
          <div className='inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer'>
            Mobile
          </div>
        </div>
        <div>
          <div className='inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer'>
            Print
          </div>
        </div>
        <div>
          <div className='inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer'>
            Product Design
          </div>
        </div>
        <div>
          <div className='inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer'>
            Typography
          </div>
        </div>
        <div>
          <div
            className={cn(
              'inline-flex items-center h-9 px-4 rounded-full text-sm font-semibold leading-5 hover:opacity-70 hover:cursor-pointer',
              refXOverflowing && '-mr-4'
            )}
          >
            Web Design
          </div>
        </div>
      </div>
    </div>
  );
}
