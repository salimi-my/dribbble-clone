'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function UploadForm() {
  const router = useRouter();

  return (
    <div className='flex justify-between mx-2'>
      <Button
        onClick={() => router.back()}
        variant='outline'
        className='rounded-full p-[19px] shadow-none text-[13px] font-semibold'
      >
        Cancel
      </Button>
      <Button className='rounded-full p-5 shadow-none text-[13px] font-semibold'>
        Continue
      </Button>
    </div>
  );
}
