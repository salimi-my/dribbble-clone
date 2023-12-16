import useSWR from 'swr';
import type { Profile } from '@prisma/client';
import type { User } from '@clerk/nextjs/server';

import fetcher from '@/lib/fetcher';

interface CurrentProfileProps {
  user: User;
  profile: Profile;
}

export default function useCurrentProfile() {
  const { data, isLoading, error } = useSWR<CurrentProfileProps>(
    '/api/profile',
    fetcher
  );

  return {
    data,
    isLoading,
    error
  };
}
