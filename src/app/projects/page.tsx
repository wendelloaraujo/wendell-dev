'use client'

import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  const projects = [
    {
      id: 'aventura-espacial',
      title: 'Jogo Aventura Espacial',
      description: 'Um jogo de aventura no espaço desenvolvido em Unity com C#.',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
      id: 'sistema-automacao',
      title: 'Sistema de Automação de Documentos',
      description: 'Sistema automatizado para processamento de documentos usando Python.',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
    {
      id: 'robo-trader',
      title: 'Robô de Trader Esportivo',
      description: 'Desenvolvimento de bots para análise de dados esportivos com Python e Django.',
      imageUrl: 'https://via.placeholder.com/600x400',
    },
  ];

  return (
    <PageLayout title="Projetos">
      <div className="flex flex-wrap -mx-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <Link href={`/projects/${project.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Ver Detalhes
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
