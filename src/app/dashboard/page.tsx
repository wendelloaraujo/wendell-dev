'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
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

export default function Dashboard() {
  const { user, role } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (user && role === 'student') {
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
  }, [user, role]);

  if (role === 'admin') {
    // Dashboard do Administrador
    return (
      <AdminRoute>
        <motion.div
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-white">
            Bem-vindo, {user?.displayName || user?.email}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/dashboard/courses">
              <motion.div
                className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-2xl font-semibold text-blue-400 mb-2">Gerenciar Cursos</h2>
                <p className="text-gray-400">Adicionar, editar ou remover cursos disponíveis na plataforma.</p>
              </motion.div>
            </Link>
            <Link href="/dashboard/users">
              <motion.div
                className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-2xl font-semibold text-blue-400 mb-2">Gerenciar Usuários</h2>
                <p className="text-gray-400">Visualizar e gerenciar usuários registrados na plataforma.</p>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </AdminRoute>
    );
  }

  // Dashboard do Estudante
  return (
    <ProtectedRoute>
      <motion.div
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-white">
          Olá, {user?.displayName || user?.email}!
        </h1>
        <h2 className="text-3xl font-semibold mb-6 text-blue-400">Seus Cursos</h2>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-2">{course.description}</p>
                <p className="text-gray-400 mb-4">Progresso: {course.progress || 0}%</p>
                <Link href={`/my-courses/${course.id}`}>
                  <motion.button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Continuar Curso
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Você ainda não está inscrito em nenhum curso.</p>
        )}
      </motion.div>
    </ProtectedRoute>
  );
}
