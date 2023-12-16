'use client';

import { useEffect, useState } from 'react';

import AddProfileModal from '@/components/modals/add-profile-modal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddProfileModal />
    </>
  );
}
