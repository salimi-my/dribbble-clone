import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export default function SearchInput() {
  return (
    <>
      <div className='hidden lg:flex justify-between items-center h-12 rounded-full focus-within:outline-none focus-within:ring-0 bg-[#f4f5fb]'>
        <Search className='h-5 w-5 ms-5 me-2 text-muted-foreground' />
        <Input
          placeholder='Search...'
          className='h-8 border-none shadow-none pl-0 focus-visible:ring-0'
        />
      </div>
      <Search className='h-6 w-6 lg:hidden' />
    </>
  );
}
