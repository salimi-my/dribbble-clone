'use client';

import Modal from '@/components/ui/modal';
import ProfileForm from '@/components/profile-form';
import { useAddProfileModal } from '@/hooks/use-add-profile-modal';

export default function AddProfileModal() {
  const addProfileModal = useAddProfileModal();

  return (
    <Modal
      title='Profile Information'
      description='Add your additional profile informations.'
      isOpen={addProfileModal.isOpen}
      onClose={addProfileModal.onClose}
    >
      <ProfileForm onClose={addProfileModal.onClose} />
    </Modal>
  );
}
