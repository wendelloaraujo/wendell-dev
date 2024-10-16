'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/Spinner';

export default function LessonContent() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;
  const { user } = useAuth();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (!user || !courseId || !moduleId || !lessonId) {
          setError('Dados insuficientes para carregar a lição.');
          setLoading(false);
          return;
        }

        const enrollmentDoc = await getDoc(doc(db, `users/${user.uid}/enrollments`, courseId));
        if (!enrollmentDoc.exists()) {
          setError('Você não está inscrito neste curso.');
          setLoading(false);
          return;
        }

        const lessonDoc = await getDoc(
          doc(db, `courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`)
        );
        if (lessonDoc.exists()) {
          setLesson(lessonDoc.data());
        } else {
          setError('Lição não encontrada!');
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="large" />
        <p className="ml-4 text-lg font-semibold text-white">Carregando lição...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!lesson) {
    return <p className="text-red-600 text-center">Erro ao carregar os dados da lição.</p>;
  }

  return (
    <ProtectedRoute>
      <motion.div
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-white">
          {lesson.title}
        </h1>
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.content }} // Renderiza o HTML do Quill
        />
        <Link href={`/my-courses/${courseId}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            Voltar ao Curso
          </motion.button>
        </Link>
      </motion.div>
    </ProtectedRoute>
  );
}
