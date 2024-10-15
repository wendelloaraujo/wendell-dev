'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Course[];
        setCourses(coursesData);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto px-6 py-20 text-white">
      <h1 className="text-3xl font-bold mb-8 text-white">Cursos Disponíveis</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-400">{course.title}</h2>
              <p className="text-gray-400 mb-4">{course.description}</p>
              <p className="text-gray-300 mb-4">
                Tipo: <span className={course.isPaid ? 'text-red-500' : 'text-green-500'}>
                  {course.isPaid ? 'Pago' : 'Gratuito'}
                </span>
              </p>
              <Link href={`/courses/${course.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                  Ver Detalhes
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Nenhum curso disponível no momento.</p>
      )}
    </div>
  );
}
