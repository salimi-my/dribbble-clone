'use client';

import { useEffect } from 'react';

import { useAddProfileModal } from '@/hooks/use-add-profile-modal';

export default function AddInfoPage() {
  const onOpen = useAddProfileModal((state) => state.onOpen);
  const isOpen = useAddProfileModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
