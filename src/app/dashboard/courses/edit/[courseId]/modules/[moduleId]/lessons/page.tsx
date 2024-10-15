// src/app/dashboard/courses/edit/[courseId]/modules/[moduleId]/lessons/page.tsx
'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';

interface Lesson {
  id: string;
  title: string;
  content: string;
}

export default function ManageLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;

  useEffect(() => {
    const fetchLessons = async () => {
      if (courseId && moduleId) {
        const lessonsSnapshot = await getDocs(
          collection(db, `courses/${courseId}/modules/${moduleId}/lessons`)
        );
        const lessonsData = lessonsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lesson[];
        setLessons(lessonsData);
      }
    };

    fetchLessons();
  }, [courseId, moduleId]);

  const handleAddLesson = async () => {
    if (newLessonTitle.trim() === '' || newLessonContent.trim() === '') return;

    const lessonRef = await addDoc(
      collection(db, `courses/${courseId}/modules/${moduleId}/lessons`),
      {
        title: newLessonTitle,
        content: newLessonContent,
      }
    );
    setLessons([...lessons, { id: lessonRef.id, title: newLessonTitle, content: newLessonContent }]);
    setNewLessonTitle('');
    setNewLessonContent('');
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (confirm('Tem certeza que deseja excluir esta lição?')) {
      await deleteDoc(
        doc(db, `courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`)
      );
      setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Lições</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            placeholder="Título da Nova Lição"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
          />
          <textarea
            value={newLessonContent}
            onChange={(e) => setNewLessonContent(e.target.value)}
            placeholder="Conteúdo da Nova Lição"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
          ></textarea>
          <button
            onClick={handleAddLesson}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Adicionar Lição
          </button>
        </div>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id} className="mb-2 flex justify-between items-center">
              <span>{lesson.title}</span>
              <button
                onClick={() => handleDeleteLesson(lesson.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AdminRoute>
  );
}
