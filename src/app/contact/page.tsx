'use client';

import { useState } from 'react';

export default function ContatoPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar o email
    alert('Mensagem enviada com sucesso!');
    // Limpar os campos
    setNome('');
    setEmail('');
    setMensagem('');
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-center mb-12">Entre em Contato</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Mensagem:</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}
