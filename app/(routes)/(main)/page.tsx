import { Metadata, ResolvingMetadata } from 'next';

import db from '@/lib/db';
import WorkList from '@/components/work-list';
import FilterNav from '@/components/filter-nav';
import SearchHeader from '@/components/search-header';

type Props = {
  searchParams: { search?: string; category?: string };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { search, category } = searchParams;

  const previousTitle = (await parent).title || '';

  let searchTitle =
    typeof search === 'string'
      ? 'Browse thousands of ' +
        search.charAt(0).toUpperCase() +
        search.slice(1) +
        ' images for design inspiration | Bribbble'
      : previousTitle;

  searchTitle =
    typeof category === 'string'
      ? 'Browse thousands of ' +
        category.charAt(0).toUpperCase() +
        category.slice(1) +
        ' images for design inspiration | Bribbble'
      : searchTitle;

  return {
    title: searchTitle
  };
}

interface HomePageProps {
  searchParams: {
    search?: string;
    category?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { search, category } = searchParams;

  const titleContains = typeof search === 'string' ? search : undefined;
  const categoryContains =
    typeof category === 'string' &&
    [
      'Animation',
      'Branding',
      'Illustration',
      'Mobile',
      'Print',
      'Product Design',
      'Typography',
      'Web Design'
    ].includes(category)
      ? category
      : undefined;

  const [works, totalWorks] = await db.$transaction([
    db.work.findMany({
      take: 12,
      where: {
        title: {
          contains: titleContains,
          mode: 'insensitive'
        },
        category: categoryContains
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),
    db.work.count({
      where: {
        title: {
          contains: titleContains,
          mode: 'insensitive'
        },
        category: categoryContains
      }
    })
  ]);

  const pageCount = Math.ceil(totalWorks / 12);

  return (
    <>
      <SearchHeader search={titleContains} />
      <section className='flex flex-col justify-start items-center lg:px-20 py-6 px-5'>
        <FilterNav />
        <WorkList initialData={works} pageCount={pageCount} />
      </section>
    </>
  );
}
