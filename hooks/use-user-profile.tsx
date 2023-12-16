import useSWR from 'swr';
import type { Profile } from '@prisma/client';
import type { User } from '@clerk/nextjs/server';

import fetcher from '@/lib/fetcher';

interface UserProfileProps {
  user: User;
  profile: Profile;
}

export default function useUserProfile() {
  const { data, isLoading, error } = useSWR<UserProfileProps>(
    '/api/profile',
    fetcher
  );

  return {
    data,
    isLoading,
    error
  };
}
