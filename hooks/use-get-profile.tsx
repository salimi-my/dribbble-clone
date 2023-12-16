import useSWR from 'swr';
import type { Profile } from '@prisma/client';
import type { User } from '@clerk/nextjs/server';

import fetcher from '@/lib/fetcher';

interface GetProfileProps {
  userId: string;
}

interface GetProfileData {
  user: User;
  profile: Profile;
}

export default function useGetProfile({ userId }: GetProfileProps) {
  const { data, isLoading, error } = useSWR<GetProfileData>(
    `/api/profile/${userId}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error
  };
}
