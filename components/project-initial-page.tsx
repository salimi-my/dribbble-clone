import type { Project } from '@prisma/client';

import ProjectCard from '@/components/project-card';

interface ProjectInitialPageProps {
  initialData: Project[];
}

export default function ProjectInitialPage({
  initialData
}: ProjectInitialPageProps) {
  return (
    <>
      {initialData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
}
