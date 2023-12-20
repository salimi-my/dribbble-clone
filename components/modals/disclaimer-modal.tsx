'use client';

import { useEffect, useState } from 'react';

import useStore from '@/hooks/use-store';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import useDisclaimerModal from '@/hooks/use-disclaimer-modal';

export default function DisclaimerModal() {
  const [isMounted, setIsMounted] = useState(false);
  const disclaimer = useStore(useDisclaimerModal, (state) => state);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='This is NOT REAL Dribbble'
      description='This site is not the real Dribbble. I created this site for educational purposes only 
      and I do not own any images used on this site. Under no circumstance shall I have any liability 
      to you for any loss or damage of any kind incurred as a result of the use of the site or reliance 
      on any information provided on the site. Your use of the site and your reliance on any information 
      on the site is solely at your own risk.'
      isOpen={disclaimer?.isOpen}
      onClose={disclaimer?.onClose}
      disclaimer={true}
    >
      <div className='pt-2 space-x-2 flex items-center justify-end w-full'>
        <Button
          onClick={disclaimer?.onClose}
          type='button'
          className='rounded-full'
        >
          Got it, thanks!
        </Button>
      </div>
    </Modal>
  );
}
