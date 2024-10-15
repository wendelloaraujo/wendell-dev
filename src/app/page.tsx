'use client';

import { auth } from '@/firebase/firebaseConfig';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Exemplo: Verificar o usuário atual
    const user = auth.currentUser;
    console.log('Usuário atual:', user);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-500">
      <h1 className="text-4xl font-bold text-white">
        Bem-vindo ao meu site pessoal!
      </h1>
    </main>
  );
}
