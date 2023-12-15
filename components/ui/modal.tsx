'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, ReactNode } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div
      ref={overlay}
      className='fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80 hover:cursor-pointer'
      onClick={(e) => handleClick(e)}
    >
      <button
        type='button'
        onClick={onDismiss}
        className='absolute top-2 right-2'
      >
        <X className='text-white w-6 h-6 opacity-90 hover:opacity-100' />
      </button>

      <div
        ref={wrapper}
        className='flex justify-start items-center flex-col absolute h-[calc(100vh_-_40px)] animate-slide-up w-full bottom-0 bg-white rounded-t-xl overflow-y-scroll hover:cursor-default'
      >
        {children}
      </div>
    </div>
  );
}
