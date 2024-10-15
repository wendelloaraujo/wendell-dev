// src/app/courses/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

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
      <h1 className="text-3xl font-bold mb-6">Cursos Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="mb-4">{course.description}</p>
            <p className="mb-4">
              Tipo: {course.isPaid ? 'Pago' : 'Gratuito'}
            </p>
            <Link href={`/courses/${course.id}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Ver Detalhes
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
