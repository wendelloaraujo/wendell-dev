// src/app/dashboard/courses/page.tsx
'use client';

import AdminRoute from '@/components/AdminRoute';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
}

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[];
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este curso?')) {
      await deleteDoc(doc(db, 'courses', id));
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Cursos</h1>
        <Link href="/dashboard/courses/new">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 mb-4">
            Adicionar Novo Curso
          </button>
        </Link>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Título</th>
              <th className="py-2 px-4 border-b">Tipo</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="py-2 px-4 border-b">{course.title}</td>
                <td className="py-2 px-4 border-b">
                  {course.isPaid ? 'Pago' : 'Gratuito'}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/dashboard/courses/edit/${course.id}`}>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-300 mr-2">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminRoute>
  );
}
