'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import useOrigin from '@/hooks/use-origin';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchHeaderProps {
  search: string | undefined;
}

export default function SearchHeader({ search }: SearchHeaderProps) {
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

  if (search === undefined) {
    return null;
  }

  return (
    <section className='flex flex-col items-center relative'>
      <div className='w-full h-20 bg-gradient-to-r from-[#e6fbfe] to-[#edddfb]' />
      <form
        action={handleSearch}
        className='w-full flex justify-center px-4 text-center'
      >
        <div className='flex justify-between items-center h-16 shadow-search rounded-lg focus-within:outline-none w-full max-w-[628px] -translate-y-1/2 bg-white'>
          <Search
            strokeWidth={2.5}
            className='h-5 w-5 ml-7 mr-4 text-[#9e9ea7]'
          />
          <Input
            placeholder='Search...'
            defaultValue={search}
            onChange={(e) => setSearchVal(e.target.value)}
            className='h-8 border-none shadow-none pl-0 focus-visible:ring-0 text-base placeholder:text-[#9e9ea7]'
          />
        </div>
      </form>
      {search !== undefined && search !== '' && (
        <>
          <h1 className='text-3xl font-bold mb-3 text-center'>
            {search.charAt(0).toUpperCase() + search.slice(1)}
          </h1>
          <p className='text-[#6e6d7a] mb-3 text-center'>
            Browse {search} designs
          </p>
        </>
      )}
    </section>
  );
}
