import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

interface ProjectParams {
  offset?: number;
  search?: string | null;
  category?: string | null;
  userId?: string;
}

export default function useProjects({
  offset,
  search,
  category,
  userId
}: ProjectParams) {
  let params = '';

  if (offset !== undefined && typeof offset === 'number') {
    params += params === '' ? '?offset=' + offset : '&offset=' + offset;
  }

  if (search !== undefined && search !== null && typeof search === 'string') {
    params += params === '' ? '?search=' + search : '&search=' + search;
  }

  if (
    category !== undefined &&
    category !== null &&
    typeof category === 'string'
  ) {
    params += params === '' ? '?category=' + category : '&category=' + category;
  }

  if (userId !== undefined && typeof userId === 'string') {
    params += params === '' ? '?userId=' + category : '&userId=' + userId;
  }

  const { data, error, isLoading } = useSWR(`/api/project${params}`, fetcher);

  return {
    data,
    isLoading,
    error
  };
}
