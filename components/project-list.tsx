'use client';

import type { Project } from '@prisma/client';
import { useState } from 'react';

interface ProjectListProps {
  initialData: Project[];
}

export default function ProjectList({ initialData }: ProjectListProps) {
  const [data, setData] = useState(initialData);

  return (
    <section className='w-full grid grid-cols-4 gap-9'>
      {data.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </section>
  );
}
