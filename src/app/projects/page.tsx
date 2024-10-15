// src/app/projects/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';

export const metadata = {
  title: 'Projetos - Wendell Araujo',
  description: 'Explore os projetos desenvolvidos por Wendell Araujo, incluindo jogos, aplicações web e mais.',
};

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
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
    // Adicione mais projetos
  ];

  return (
    <PageLayout title="Projetos">
      <div className="flex flex-wrap -mx-4">
        {projects.map((project) => (
          <div key={project.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded shadow-md overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <Link href={`/projects/${project.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Ver Detalhes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
