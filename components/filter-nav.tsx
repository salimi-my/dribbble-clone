import { ChevronDown, ListFilter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Categories from '@/components/categories';
import { Separator } from '@/components/ui/separator';

export default function FilterNav() {
  return (
    <>
      <div className='w-full lg:hidden flex flex-col'>
        <div className='flex justify-between items-center'>
          <Button
            variant='outline'
            className='hover:bg-transparent shadow-none p-[18px] pr-3 hover:shadow-sm rounded-[8px] mr-10'
          >
            Following
            <ChevronDown className='ml-2' size={14} />
          </Button>
          <Button
            variant='outline'
            className='hover:bg-transparent shadow-none p-[18px] hover:shadow-sm rounded-full ml-10'
          >
            <ListFilter className='mr-1' size={16} />
            Filters
          </Button>
        </div>
        <Separator className='my-4' />
        <Categories />
      </div>
      <div className='w-full hidden lg:block'>
        <div className='flex flex-row items-center justify-between'>
          <Button
            variant='outline'
            className='hover:bg-transparent shadow-none p-[18px] pr-3 hover:shadow-sm rounded-[8px] mr-10'
          >
            Following
            <ChevronDown className='ml-2' size={14} />
          </Button>
          <Categories />
          <Button
            variant='outline'
            className='hover:bg-transparent shadow-none p-[18px] hover:shadow-sm rounded-full ml-10'
          >
            <ListFilter className='mr-1' size={16} />
            Filters
          </Button>
        </div>
      </div>
    </>
  );
}
