import useSWR from 'swr';
import type { Profile } from '@prisma/client';
import type { User } from '@clerk/nextjs/server';

import fetcher from '@/lib/fetcher';

interface CurrentProfileData {
  user: User;
  profile: Profile;
}

export default function useCurrentProfile() {
  const { data, isLoading, error } = useSWR<CurrentProfileData>(
    '/api/profile',
    fetcher
  );

  return {
    data,
    isLoading,
    error
  };
}
