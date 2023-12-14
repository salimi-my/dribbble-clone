import db from '@/lib/db';
import FilterNav from '@/components/filter-nav';
import ProjectList from '@/components/project-list';

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

  const projects = await db.project.findMany({
    take: 12,
    where: {
      title: {
        contains: titleContains
      },
      category: categoryContains
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <section className='flex flex-col justify-start items-center lg:px-20 py-6 px-5 mb-16'>
      <FilterNav />
      <ProjectList initialData={projects} />
    </section>
  );
}
