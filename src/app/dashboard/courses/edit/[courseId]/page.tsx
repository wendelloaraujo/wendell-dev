'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      <motion.div
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-white">Editar Curso</h1>
        <form onSubmit={handleUpdateCourse}>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2">Título do Curso</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[150px] w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2">Tipo de Curso</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!isPaid}
                  onChange={() => setIsPaid(false)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-white">Gratuito</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={isPaid}
                  onChange={() => setIsPaid(true)}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-white">Pago</span>
              </label>
            </div>
          </div>
          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Atualizar Curso
          </motion.button>
        </form>

        {/* Botão para gerenciar módulos e lições */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-white mb-4">Conteúdo do Curso</h2>
          <Link href={`/dashboard/courses/edit/${courseId}/modules`}>
            <motion.button
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Gerenciar Módulos e Lições
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </AdminRoute>
  );
}
