// src/app/my-courses/[courseId]/modules/[moduleId]/lessons/[lessonId]/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function LessonContent() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;
  const lessonId = params?.lessonId as string;
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      if (courseId && moduleId && lessonId) {
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
  }, [courseId, moduleId, lessonId]);

  if (!lesson) {
    return <p>Carregando...</p>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
        <div className="prose">
          <p>{lesson.content}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
