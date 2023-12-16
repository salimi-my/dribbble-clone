import useSWR from 'swr';
import type { User } from '@clerk/nextjs/server';

import fetcher from '@/lib/fetcher';

interface GetProfileProps {
  userId: string;
}

export default function useGetProfile({ userId }: GetProfileProps) {
  const {
    data: user,
    isLoading,
    error
  } = useSWR<User>(`/api/user/${userId}`, fetcher);

  return {
    user,
    isLoading,
    error
  };
}
