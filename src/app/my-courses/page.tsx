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
        <h1 className="text-4xl font-bold mb-6 text-white">Meus Cursos</h1>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-semibold mb-2 text-white">
                  {course.title}
                </h2>
                <p className="mb-4 text-gray-400">{course.description}</p>
                <p className="mb-2 text-gray-400">
                  Progresso: {course.progress || 0}%
                </p>
                <Link href={`/my-courses/${course.id}`}>
                  <motion.button
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Acessar Curso
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-white">Você ainda não está inscrito em nenhum curso.</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
