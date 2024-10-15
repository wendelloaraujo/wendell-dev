// src/app/my-courses/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  description: string;
  progress?: number;
}

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (user) {
        const enrollmentSnapshot = await getDocs(
          collection(db, `users/${user.uid}/enrollments`)
        );
        const courseIds = enrollmentSnapshot.docs.map((doc) => doc.id);

        const coursePromises = courseIds.map(async (courseId) => {
          const courseDoc = await getDoc(doc(db, 'courses', courseId));
          return { id: courseDoc.id, ...courseDoc.data() } as Course;
        });

        const coursesData = await Promise.all(coursePromises);
        setCourses(coursesData);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Meus Cursos</h1>
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
                <p className="mb-2">Progresso: {course.progress || 0}%</p>
                <Link href={`/my-courses/${course.id}`}>
                  <button className="btn">Acessar Curso</button>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p>Você ainda não está inscrito em nenhum curso.</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
