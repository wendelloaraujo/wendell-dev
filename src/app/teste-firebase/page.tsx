'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function TesteFirebase() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Teste do Firebase</h1>
        {user ? (
          <p>Usuário logado: {user.email}</p>
        ) : (
          <p>Nenhum usuário logado.</p>
        )}
      </div>
    </div>
  );
}
