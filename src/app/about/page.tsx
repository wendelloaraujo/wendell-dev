'use client'

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-20 text-white">
      {/* Seção: Sobre Mim */}
      <section className="flex flex-col md:flex-row items-center mb-12">
        <motion.div
          className="md:w-1/3 md:pr-8 mb-8 md:mb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/wendell.jpg"
            alt="Foto de Wendell"
            width={300}
            height={300}
            className="rounded-full mx-auto"
          />
        </motion.div>
        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-6">Olá, eu sou o Wendell!</h1>
          <p className="text-lg leading-relaxed mb-4 text-gray-300">
            Desenvolvedor Full Stack Sênior com mais de 10 anos de experiência em C++, C#, Python, HTML, CSS e JavaScript, com foco recente no desenvolvimento web. Especialista em desenvolvimento de jogos com C# e Unity, além de automação de tarefas e criação de aplicações web com Python e Django.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            Ao longo da minha carreira, atuei em coordenação de equipes e implementação de projetos de software, sempre buscando soluções práticas e eficientes. Sou apaixonado por tecnologia e estou sempre em busca de novos desafios e aprendizado constante.
          </p>
        </motion.div>
      </section>

      {/* Seção: Habilidades */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">Habilidades</h2>
        <div className="flex flex-wrap">
          {/* Ícones e habilidades */}
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
          <div className="flex items-center mr-6 mb-4">
            <Image src="/icons/javascript.svg" alt="JavaScript" width={30} height={30} />
            <span className="ml-2 text-lg">JavaScript</span>
          </div>
        </div>
      </motion.section>

      {/* Seção: Experiência Profissional */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">Experiência Profissional</h2>
        {/* Experiência 1 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Docente - UNINASSAU</h3>
          <p className="text-gray-400">Ago/2024 - Presente</p>
          <p className="mt-2 text-lg leading-relaxed text-gray-300">
            Ministro aulas nas disciplinas de Front-end Frameworks, com foco em HTML, CSS, JavaScript e React, e em Sistemas de Informação Aplicados à Gestão. Participo do desenvolvimento de projetos institucionais voltados para jogos.
          </p>
        </div>
        {/* Experiência 2 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Programador - Mirantes Empreendimentos</h3>
          <p className="text-gray-400">Jun/2023 - Jul/2024</p>
          <p className="mt-2 text-lg leading-relaxed text-gray-300">
            Realizei correções e ajustes em páginas web automatizadas para preenchimento automático de documentos, utilizando HTML, CSS e JavaScript. Também prestei suporte técnico em TI e atualizei documentos utilizando APIs.
          </p>
        </div>
        {/* Experiência 3 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Professor Substituto - IFRN Ceará-Mirim</h3>
          <p className="text-gray-400">Jun/2022 - Jun/2024</p>
          <p className="mt-2 text-lg leading-relaxed text-gray-300">
            Ministrei disciplinas de Programação Orientada a Objetos com C# e Desenvolvimento de Jogos 2D utilizando Unity, além de orientar alunos em seus projetos de conclusão de curso.
          </p>
        </div>
        {/* Experiência 4 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Programador Freelancer</h3>
          <p className="text-gray-400">Jan/2021 - Mai/2023</p>
          <p className="mt-2 text-lg leading-relaxed text-gray-300">
            Desenvolvi bots para o Telegram e um site de análise de dados utilizando web scraping e automação de tarefas com Python, Django e Selenium. Atuei na manutenção contínua de servidores VPS e no desenvolvimento de sites para análise de dados esportivos.
          </p>
        </div>
        {/* Adicione mais experiências conforme necessário */}
      </motion.section>

      {/* Seção: Formação Acadêmica */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">Formação Acadêmica</h2>
        {/* Formação 1 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Mestrado em Sistemas e Computação</h3>
          <p className="text-gray-400">Universidade Federal do Rio Grande do Norte (UFRN), 2018</p>
        </div>
        {/* Formação 2 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Especialização em Desenvolvimento de Jogos Digitais</h3>
          <p className="text-gray-400">Faculdade Estácio, 2017</p>
        </div>
        {/* Formação 3 */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Bacharelado em Ciência da Computação</h3>
          <p className="text-gray-400">Universidade Federal do Rio Grande do Norte (UFRN), 2015</p>
        </div>
      </motion.section>

      {/* Seção: Conquistas e Prêmios */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">Conquistas e Prêmios</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed text-gray-300">
          <li>Melhor Jogo do Festival, II e III Encontro Potiguar de Jogos, Entretenimento e Educação (2016, 2017)</li>
          <li>25º Lugar - Final Brasileira da 18ª Maratona de Programação (2013)</li>
          <li>11º Lugar - Fase Regional da 18ª Maratona de Programação (2013)</li>
        </ul>
      </motion.section>

      {/* Chamada para Ação */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/contact">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Entre em Contato
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
