'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
      <motion.div
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Adicionar Novo Curso</h1>
        
        <motion.form
          onSubmit={handleCreateCourse}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-white mb-2">Título do Curso:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="mr-2 form-checkbox text-blue-600"
              />
              Curso Pago
            </label>
          </div>

          <motion.button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Criar Curso
          </motion.button>
        </motion.form>
      </motion.div>
    </AdminRoute>
  );
}
