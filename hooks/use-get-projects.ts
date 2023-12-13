import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

interface params {
  offset?: number;
  search?: string;
  category?: string;
}

export default function useGetProjects({ offset, search, category }: params) {
  let params = '';

  if (offset !== undefined && typeof offset === 'number') {
    params += params === '' ? '?offset=' + offset : '&offset=' + offset;
  }

  if (search !== undefined && typeof search === 'string') {
    params += params === '' ? '?search=' + search : '&search=' + search;
  }

  if (category !== undefined && typeof category === 'string') {
    params += params === '' ? '?category=' + category : '&category=' + category;
  }

  const { data, error, isLoading } = useSWR(`/api/project${params}`, fetcher);

  return {
    data,
    isLoading,
    error
  };
}
