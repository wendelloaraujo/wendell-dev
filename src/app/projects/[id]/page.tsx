'use client'

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';

interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  technologies: string[];
}

export default function ProjectDetails() {
  const params = useParams();
  const id = params?.id;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      // Dados fictícios de um projeto específico
      const fakeProject: Project = {
        id: id as string,
        title: 'Jogo Aventura Espacial',
        description: 'Um jogo de aventura no espaço desenvolvido em Unity com C#.',
        content: 'Informações detalhadas sobre o projeto vão aqui...',
        imageUrl: 'https://via.placeholder.com/800x500',
        technologies: ['Unity', 'C#', 'Física'],
      };
      setProject(fakeProject);
    }
  }, [id]);

  if (!project) {
    return <p>Carregando...</p>;
  }

  return (
    <PageLayout title={project.title}>
      <Image
        src={project.imageUrl}
        alt={project.title}
        width={800}
        height={500}
        className="mb-6"
      />
      <p className="text-lg mb-4">{project.description}</p>
      <p className="text-lg mb-4">{project.content}</p>
      <h3 className="text-2xl font-semibold mb-2">Tecnologias Utilizadas:</h3>
      <ul className="list-disc list-inside mb-4">
        {project.technologies.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
      {/* Adicione links para código fonte, demo, etc., se disponíveis */}
      <div className="mt-6">
        <a
          href="https://github.com/seu-usuario/seu-projeto"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Ver Código Fonte no GitHub
        </a>
      </div>
    </PageLayout>
  );
}
