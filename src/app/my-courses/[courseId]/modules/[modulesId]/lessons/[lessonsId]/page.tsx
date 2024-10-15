// src/app/my-courses/[courseId]/modules/[moduleId]/lessons/[lessonId]/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LessonContent() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;
  const { user } = useAuth();
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (user && courseId && moduleId && lessonId) {
        // Verificar se o usuário está inscrito no curso
        const enrollmentDoc = await getDoc(doc(db, `users/${user.uid}/enrollments`, courseId));
        if (!enrollmentDoc.exists()) {
          alert('Você não está inscrito neste curso.');
          return;
        }

        // Obter dados da lição
        const lessonDoc = await getDoc(
          doc(db, `courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`)
        );
        if (lessonDoc.exists()) {
          setLesson(lessonDoc.data());
        } else {
          console.log('Lição não encontrada!');
        }
      }
    };

    fetchLesson();
  }, [user, courseId, moduleId, lessonId]);

  if (!lesson) {
    return <p>Carregando...</p>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{lesson.title}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>{lesson.content}</p>
        </div>
        <Link href={`/my-courses/${courseId}`}>
          <button className="btn mt-4">Voltar ao Curso</button>
        </Link>
      </div>
    </ProtectedRoute>
  );
}
