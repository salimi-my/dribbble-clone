import type { Project } from '@prisma/client';

import ProjectCard from '@/components/project-card';

interface ProjectInitialPageProps {
  initialData: Project[];
  isProfile: boolean;
}

export default function ProjectInitialPage({
  initialData,
  isProfile
}: ProjectInitialPageProps) {
  return (
    <>
      {initialData.map((project) => (
        <ProjectCard key={project.id} project={project} isProfile={isProfile} />
      ))}
    </>
  );
}
