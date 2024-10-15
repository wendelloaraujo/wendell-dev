'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LessonContent() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;
  const { user } = useAuth();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Adiciona estado de carregamento
  const [error, setError] = useState<string | null>(null); // Adiciona estado de erro

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (user && courseId && moduleId && lessonId) {
          // Verificar se o usuário está inscrito no curso
          const enrollmentDoc = await getDoc(doc(db, `users/${user.uid}/enrollments`, courseId));
          if (!enrollmentDoc.exists()) {
            setError('Você não está inscrito neste curso.');
            setLoading(false);
            return;
          }

          // Obter dados da lição
          const lessonDoc = await getDoc(
            doc(db, `courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`)
          );
          if (lessonDoc.exists()) {
            setLesson(lessonDoc.data());
          } else {
            setError('Lição não encontrada!');
          }
        }
      } catch (err) {
        console.error('Erro ao buscar lição:', err);
        setError('Ocorreu um erro ao carregar a lição.');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [user, courseId, moduleId, lessonId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!lesson) {
    return <p>Erro ao carregar os dados da lição.</p>;
  }

  return (
    <ProtectedRoute>
      <motion.div
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          {lesson.title}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>{lesson.content}</p>
        </div>
        <Link href={`/my-courses/${courseId}`}>
          <button className="btn mt-4">Voltar ao Curso</button>
        </Link>
      </motion.div>
    </ProtectedRoute>
  );
}
