// src/app/about/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Sobre - Wendell Araujo',
  description:
    'Conheça mais sobre Wendell Araujo, desenvolvedor full stack e especialista em desenvolvimento de jogos.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      {/* Seção: Sobre Mim */}
      <section className="flex flex-col md:flex-row items-center mb-12">
        <div className="md:w-1/3 md:pr-8 mb-8 md:mb-0">
          <Image
            src="/images/wendell.jpg"
            alt="Foto de Wendell"
            width={300}
            height={300}
            className="rounded-full mx-auto"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-6">Olá, eu sou o Wendell!</h1>
          <p className="text-lg leading-relaxed mb-4">
            Sou um desenvolvedor com mais de 10 anos de experiência em C++, C#, Python,
            HTML, CSS e JavaScript, com foco recente no desenvolvimento web. Especializado
            em desenvolvimento de jogos utilizando C# e Unity, além de automação de tarefas
            e criação de aplicações web com Python e Django.
          </p>
          <p className="text-lg leading-relaxed">
            Sempre buscando soluções práticas e eficientes, atuei na coordenação de equipes
            e na implementação de projetos de software, contribuindo para o sucesso de
            diversos projetos. Sou apaixonado por tecnologia e estou sempre em busca de
            novos desafios.
          </p>
        </div>
      </section>

      {/* Seção: Habilidades */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Habilidades</h2>
        <div className="flex flex-wrap">
          {/* Habilidades com Ícones */}
          <div className="flex items-center mr-6 mb-4">
            <Image src="/icons/python.svg" alt="Python" width={30} height={30} />
            <span className="ml-2 text-lg">Python</span>
          </div>
          <div className="flex items-center mr-6 mb-4">
            <Image src="/icons/csharp.svg" alt="C#" width={30} height={30} />
            <span className="ml-2 text-lg">C#</span>
          </div>
          <div className="flex items-center mr-6 mb-4">
            <Image src="/icons/unity.svg" alt="Unity" width={30} height={30} />
            <span className="ml-2 text-lg">Unity</span>
          </div>
          {/* Adicione mais habilidades */}
        </div>
      </section>

      {/* Seção: Experiência Profissional */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Experiência Profissional</h2>
        {/* Experiência 1 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Docente - UNINASSAU</h3>
          <p className="text-gray-600">Ago/2024 - Presente</p>
          <p className="mt-2 text-lg leading-relaxed">
            Ministro aulas nas disciplinas de Front-end Frameworks, com foco em HTML, CSS,
            JavaScript e React, além de Sistemas de Informação Aplicados à Gestão.
            Participo do desenvolvimento de projetos institucionais voltados para jogos.
          </p>
        </div>
        {/* Experiência 2 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">
            Programador - Mirantes Empreendimentos
          </h3>
          <p className="text-gray-600">Jun/2023 - Jul/2024</p>
          <p className="mt-2 text-lg leading-relaxed">
            Realizei correções e ajustes em páginas web automatizadas, utilizando HTML, CSS
            e JavaScript. Prestei suporte técnico em TI e atualizei documentos com uso de
            APIs.
          </p>
        </div>
        {/* Adicione mais experiências */}
      </section>

      {/* Seção: Formação Acadêmica */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Formação Acadêmica</h2>
        {/* Formação 1 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">
            Mestrado em Sistemas e Computação
          </h3>
          <p className="text-gray-600">
            Universidade Federal do Rio Grande do Norte (UFRN), 2018
          </p>
        </div>
        {/* Formação 2 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">
            Especialização em Desenvolvimento de Jogos Digitais
          </h3>
          <p className="text-gray-600">Faculdade Estácio, 2017</p>
        </div>
        {/* Adicione mais formações */}
      </section>

      {/* Seção: Conquistas e Prêmios */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Conquistas e Prêmios</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed">
          <li>
            Melhor Jogo do Festival, II e III Encontro Potiguar de Jogos, Entretenimento e
            Educação (2016, 2017)
          </li>
          <li>
            25º Lugar - Final Brasileira da 18ª Maratona de Programação (2013)
          </li>
          {/* Adicione mais conquistas */}
        </ul>
      </section>

      {/* Chamada para Ação */}
      <div className="text-center mt-12">
        <Link href="/contact">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Entre em Contato
          </button>
        </Link>
      </div>
    </div>
  );
}
