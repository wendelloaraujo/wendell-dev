'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

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
      <motion.div
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Gerenciar Lições</h1>

        {/* Adicionar Nova Lição */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <input
            type="text"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            placeholder="Título da Nova Lição"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
          />
          <textarea
            value={newLessonContent}
            onChange={(e) => setNewLessonContent(e.target.value)}
            placeholder="Conteúdo da Nova Lição"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
          ></textarea>
          <motion.button
            onClick={handleAddLesson}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Adicionar Lição
          </motion.button>
        </motion.div>

        {/* Lista de Lições */}
        <ul className="space-y-4">
          {lessons.map((lesson) => (
            <motion.li
              key={lesson.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-white text-lg">{lesson.title}</span>
              <motion.button
                onClick={() => handleDeleteLesson(lesson.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Excluir
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AdminRoute>
  );
}
