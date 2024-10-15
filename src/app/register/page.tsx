// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Atualizar o nome do usuário
      await updateProfile(user, { displayName: name });

      // Salvar informações adicionais no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name,
        role: 'student',
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Registrar</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-800">Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Registrar
          </button>
        </form>
        <p className="mt-6 text-center text-gray-800">
          Já tem uma conta?{' '}
          <Link href="/login">
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
              Entrar
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
