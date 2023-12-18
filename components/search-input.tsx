'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import useOrigin from '@/hooks/use-origin';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  const router = useRouter();
  const origin = useOrigin();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState('');

  const category = searchParams.get('category');

  const handleSearch = () => {
    if (category === null) {
      router.push(`${origin}?search=${searchVal}`);
    } else {
      router.push(`${origin}?search=${searchVal}&category=${category}`);
    }
  };

  const handleMobileSearch = () => {
    if (category === null) {
      router.push(`${origin}?search=`);
    } else {
      router.push(`${origin}?search=&category=${category}`);
    }
  };

  return (
    <>
      <form action={handleSearch}>
        <div className='hidden xl:flex justify-between items-center h-12 rounded-full focus-within:outline-none focus-within:ring-0 bg-[#f4f5fb]'>
          <Search className='h-5 w-5 ms-5 me-2 text-muted-foreground' />
          <Input
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder='Search...'
            className='h-8 border-none shadow-none pl-0 focus-visible:ring-0'
          />
        </div>
      </form>
      <Search
        onClick={handleMobileSearch}
        className='h-[22px] w-[22px] xl:hidden'
      />
    </>
  );
}
