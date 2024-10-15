// src/app/dashboard/courses/new/page.tsx
'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function NewCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();

  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'courses'), {
        title,
        description,
        isPaid,
        createdAt: Timestamp.now(),
      });
      router.push('/dashboard/courses');
    } catch (error) {
      console.error('Erro ao criar curso:', error);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Adicionar Novo Curso</h1>
        <form onSubmit={handleCreateCourse}>
          <div className="mb-4">
            <label className="block mb-1">Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="mr-2"
              />
              Curso Pago
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Criar Curso
          </button>
        </form>
      </div>
    </AdminRoute>
  );
}
