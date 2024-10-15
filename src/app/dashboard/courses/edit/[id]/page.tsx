// src/app/dashboard/courses/edit/[id]/page.tsx
'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';

export default function EditCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        const docRef = doc(db, 'courses', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const courseData = docSnap.data();
          setTitle(courseData.title);
          setDescription(courseData.description);
          setIsPaid(courseData.isPaid);
        } else {
          console.log('Curso não encontrado!');
        }
      }
    };

    fetchCourse();
  }, [id]);

  const handleUpdateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'courses', id), {
        title,
        description,
        isPaid,
      });
      router.push('/dashboard/courses');
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Editar Curso</h1>
        <form onSubmit={handleUpdateCourse}>
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Atualizar Curso
          </button>
        </form>
      </div>
    </AdminRoute>
  );
}
