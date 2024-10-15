'use client';

import AdminRoute from '@/components/AdminRoute';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      <div className="container mx-auto px-6 py-20 text-white">
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Gerenciar Cursos
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link href="/dashboard/courses/new">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 mb-6">
              Adicionar Novo Curso
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <table className="min-w-full text-left bg-gray-800 text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-6">Título</th>
                <th className="py-3 px-6">Tipo</th>
                <th className="py-3 px-6">Ações</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-700 transition duration-200">
                  <td className="py-3 px-6 border-b border-gray-600">{course.title}</td>
                  <td className="py-3 px-6 border-b border-gray-600">
                    {course.isPaid ? 'Pago' : 'Gratuito'}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-600">
                    <Link href={`/dashboard/courses/edit/${course.id}`}>
                      <motion.button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mr-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        Editar
                      </motion.button>
                    </Link>
                    <motion.button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Excluir
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </AdminRoute>
  );
}
