import { useEffect } from 'react';
import { Project } from '@prisma/client';

import useProjects from '@/hooks/use-projects';
import ProjectCard from '@/components/project-card';

interface ProjectPageProps {
  index: number;
  setLoading: (value: boolean) => void;
}

export default function ProjectPage({ index, setLoading }: ProjectPageProps) {
  const { data, isLoading, error } = useProjects({ offset: (index - 1) * 12 });

  useEffect(() => {
    setLoading(isLoading);
  }, [setLoading, isLoading]);

  return (
    <>
      {data &&
        !isLoading &&
        data.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </>
  );
}
