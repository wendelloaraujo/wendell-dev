// src/app/dashboard/courses/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
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
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Cursos Disponíveis</h1>
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="mb-4">
              <Link href={`/dashboard/courses/${course.id}`}>
                <a className="text-blue-500 hover:underline">
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                </a>
              </Link>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
