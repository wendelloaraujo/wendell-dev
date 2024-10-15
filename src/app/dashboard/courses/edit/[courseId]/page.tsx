'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        const docRef = doc(db, 'courses', courseId);
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
  }, [courseId]);

  const handleUpdateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'courses', courseId), {
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
          {/* Campos do formulário */}
        </form>

        {/* Botão para gerenciar módulos e lições */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Conteúdo do Curso</h2>
          <Link href={`/dashboard/courses/edit/${courseId}/modules`}>
            <button
              className="px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--foreground-color)' }}
            >
              Gerenciar Módulos e Lições
            </button>
          </Link>
        </div>
      </div>
    </AdminRoute>
  );
}
