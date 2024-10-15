// src/app/dashboard/new-course/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function NewCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'courses'), {
        title,
        description,
        createdAt: Timestamp.now(),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Criar Novo Curso</h1>
        <form onSubmit={handleCreateCourse}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do curso"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição do curso"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Criar Curso
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
