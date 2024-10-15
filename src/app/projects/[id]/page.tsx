'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

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
        content: 'Este projeto foi desenvolvido utilizando Unity e C#, explorando mecânicas de física avançadas para criar uma experiência imersiva em um cenário espacial. O jogo envolve o controle de uma nave em missões desafiadoras.',
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
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={800}
          height={500}
          className="rounded-lg shadow-lg object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg text-gray-300 mb-4">{project.description}</p>
        <p className="text-lg text-gray-400 mb-4 leading-relaxed">{project.content}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-white mb-4">Tecnologias Utilizadas:</h3>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          {project.technologies.map((tech, index) => (
            <li key={index} className="text-lg">{tech}</li>
          ))}
        </ul>

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
      </motion.div>
    </PageLayout>
  );
}
