// src/app/dashboard/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

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
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-3xl font-bold mb-6">
            Bem-vindo, {user?.displayName || user?.email}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/dashboard/courses">
              <div className="bg-white p-6 rounded shadow cursor-pointer hover:bg-gray-100">
                <h2 className="text-2xl font-semibold mb-2">Gerenciar Cursos</h2>
                <p>Adicionar, editar ou remover cursos disponíveis na plataforma.</p>
              </div>
            </Link>
            <Link href="/dashboard/users">
              <div className="bg-white p-6 rounded shadow cursor-pointer hover:bg-gray-100">
                <h2 className="text-2xl font-semibold mb-2">Gerenciar Usuários</h2>
                <p>Visualizar e gerenciar usuários registrados na plataforma.</p>
              </div>
            </Link>
            {/* Adicione mais opções conforme necessário */}
          </div>
        </div>
      </AdminRoute>
    );
  }

  // Dashboard do Estudante
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">
          Olá, {user?.displayName || user?.email}!
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Seus Cursos</h2>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="mb-2">{course.description}</p>
                <p className="mb-2">Progresso: {course.progress || 0}%</p>
                <Link href={`/my-courses/${course.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Continuar Curso
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Você ainda não está inscrito em nenhum curso.</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
