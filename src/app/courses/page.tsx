// src/app/courses/page.tsx
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
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Cursos Disponíveis</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="mb-4">{course.description}</p>
              <p className="mb-4">
                Tipo: {course.isPaid ? 'Pago' : 'Gratuito'}
              </p>
              <Link href={`/courses/${course.id}`}>
                <button className="btn">Ver Detalhes</button>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p>Nenhum curso disponível no momento.</p>
      )}
    </div>
  );
}
