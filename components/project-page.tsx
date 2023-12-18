'use client';

import { useEffect } from 'react';
import { Project } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

import useProjects from '@/hooks/use-projects';
import ProjectCard from '@/components/project-card';

interface ProjectPageProps {
  index: number;
  setLoading: (value: boolean) => void;
  isProfile: boolean;
  userId?: string;
}

export default function ProjectPage({
  index,
  setLoading,
  isProfile,
  userId
}: ProjectPageProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const category = searchParams.get('category');

  const { data, isLoading, error } = useProjects({
    offset: (index - 1) * 12,
    search,
    category,
    userId
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [setLoading, isLoading]);

  return (
    <>
      {data &&
        !isLoading &&
        data.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isProfile={isProfile}
          />
        ))}
    </>
  );
}
