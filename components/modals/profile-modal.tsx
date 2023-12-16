'use client';

import Modal from '@/components/ui/modal';
import ProfileForm from '@/components/profile-form';
import { useProfileModal } from '@/hooks/use-profile-modal';

export default function ProfileModal() {
  const profileModal = useProfileModal();

  return (
    <Modal
      title='Profile Information'
      description='Add your additional profile informations.'
      isOpen={profileModal.isOpen}
      onClose={profileModal.onClose}
    >
      <ProfileForm onClose={profileModal.onClose} />
    </Modal>
  );
}
