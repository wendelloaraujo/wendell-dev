'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css'; // Arquivo CSS customizado

// Importando Quill dinamicamente
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Lesson {
  id: string;
  title: string;
  content: string;
}

export default function ManageLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;

  // Carregar lições do Firestore
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

  // Adicionar uma nova lição
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

  // Excluir uma lição
  const handleDeleteLesson = async (lessonId: string) => {
    if (confirm('Tem certeza que deseja excluir esta lição?')) {
      await deleteDoc(
        doc(db, `courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`)
      );
      setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
    }
  };

  // Editar uma lição existente
  const handleEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setEditTitle(lesson.title);
    setEditContent(lesson.content);
  };

  // Atualizar uma lição editada
  const handleUpdateLesson = async () => {
    if (!editingLessonId || editTitle.trim() === '' || editContent.trim() === '') return;

    const lessonDocRef = doc(db, `courses/${courseId}/modules/${moduleId}/lessons/${editingLessonId}`);
    await updateDoc(lessonDocRef, {
      title: editTitle,
      content: editContent, 
    });

    setLessons(
      lessons.map((lesson) =>
        lesson.id === editingLessonId ? { ...lesson, title: editTitle, content: editContent } : lesson
      )
    );

    setEditingLessonId(null);
    setEditTitle('');
    setEditContent('');
  };

  // Configuração da toolbar com todas as ferramentas do Quill liberadas
  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
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
          <ReactQuill
            theme="snow"
            value={newLessonContent}
            onChange={setNewLessonContent}
            modules={modules}
            className="custom-quill-toolbar bg-gray-800 text-white mb-2"
          />
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
              {editingLessonId === lesson.id ? (
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Título da Lição"
                    className="mb-2 w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <ReactQuill
                    theme="snow"
                    value={editContent}
                    onChange={setEditContent}
                    modules={modules}
                    className="custom-quill-toolbar bg-gray-700 text-white mb-2"
                  />
                  <div className="flex justify-between">
                    <motion.button
                      onClick={handleUpdateLesson}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Salvar
                    </motion.button>
                    <motion.button
                      onClick={() => setEditingLessonId(null)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Cancelar
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-white text-lg">{lesson.title}</span>
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => handleEditLesson(lesson)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Editar
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      Excluir
                    </motion.button>
                  </div>
                </>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AdminRoute>
  );
}
