'use client';

import { useState } from 'react';
import type { Project } from '@prisma/client';

import ProjectCard from '@/components/project-card';

interface ProjectListProps {
  initialData: Project[];
}

export default function ProjectList({ initialData }: ProjectListProps) {
  const [data, setData] = useState(initialData);

  return (
    <section className='w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9 pt-4 lg:pt-8'>
      {data.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
