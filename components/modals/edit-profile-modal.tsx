'use client';

import type { Profile } from '@prisma/client';

import Modal from '@/components/ui/modal';
import ProfileForm from '@/components/profile-form';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile
}: EditProfileModalProps) {
  return (
    <Modal
      title='Edit Profile Information?'
      description='Update or manage your additional profile informations.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProfileForm profile={profile} onClose={onClose} />
    </Modal>
  );
}
