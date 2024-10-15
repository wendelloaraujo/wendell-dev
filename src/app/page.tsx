// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center w-full bg-blue-600 text-white text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Wendell Oliveira de Araújo</h1>
        <p className="text-2xl mb-6">
          Desenvolvedor Full Stack | Especialista em Desenvolvimento de Jogos
        </p>
        <Link href="#projetos">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
            Ver Meus Projetos
          </button>
        </Link>
      </section>

      {/* Sobre Mim */}
      <section id="sobre" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Sobre Mim</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <Image
              src="/images/wendell.jpg" // Sua foto
              alt="Foto de Wendell"
              width={400}
              height={400}
              className="rounded-full mx-auto"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg leading-relaxed mb-4">
              Desenvolvedor com mais de 10 anos de experiência em C++, C#, Python, HTML,
              CSS e JavaScript, com foco recente no desenvolvimento web...
            </p>
            <div className="mt-6">
              <Link href="/sobre">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                  Saiba Mais
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologias */}
      <section className="bg-gray-100 py-20 text-black">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Tecnologias</h2>
          <div className="flex flex-wrap justify-center items-center">
            {/* Ícones das tecnologias */}
            {/* Utilize imagens de ícones de tecnologias aqui */}
            <div className="m-4">
              <Image
                src="https://via.placeholder.com/60" // Placeholder image
                alt="Python"
                width={60}
                height={60}
              />
            </div>
            {/* Adicione mais ícones conforme necessário */}
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Projetos em Destaque</h2>
        <div className="text-black flex flex-wrap -mx-4">
          {/* Projeto 1 */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded shadow-md overflow-hidden">
              <Image
                src="https://via.placeholder.com/600x400" // Placeholder image
                alt="Projeto 1"
                width={600}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Jogo Aventura Espacial</h3>
                <p className="text-gray-700 mb-4">
                  Um jogo de aventura no espaço desenvolvido em Unity com C#,
                  explorando mecânicas de física e narrativa envolvente.
                </p>
                <Link href="/projects/aventura-espacial">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Ver Detalhes
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Projeto 2 */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded shadow-md overflow-hidden">
              <Image
                src="https://via.placeholder.com/600x400" // Placeholder image
                alt="Projeto 2"
                width={600}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sistema de Automação</h3>
                <p className="text-gray-700 mb-4">
                  Desenvolvimento de um sistema automatizado para processamento de
                  documentos utilizando Python e técnicas de Machine Learning.
                </p>
                <Link href="/projects/sistema-automacao">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Ver Detalhes
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Projeto 3 */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white rounded shadow-md overflow-hidden">
              <Image
                src="https://via.placeholder.com/600x400" // Placeholder image
                alt="Projeto 3"
                width={600}
                height={400}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Robô de Trader Esportivo</h3>
                <p className="text-gray-700 mb-4">
                  Desenvolvimento de bots para análise de dados esportivos e automação de
                  tarefas utilizando Python, Django e Selenium.
                </p>
                <Link href="/projects/robo-trader">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Ver Detalhes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/projects">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
              Ver Todos os Projetos
            </button>
          </Link>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
          <p className="text-lg mb-6">
            Interessado em trabalhar comigo ou tem alguma pergunta? Fique à vontade para
            entrar em contato!
          </p>
          <Link href="/contact">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
              Fale Comigo
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
