// src/app/my-courses/[courseId]/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
}

export default function CourseContent() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(() => {
    const fetchCourseContent = async () => {
      if (user && courseId) {
        // Verificar se o usuário está inscrito no curso
        const enrollmentDoc = await getDoc(doc(db, `users/${user.uid}/enrollments`, courseId));
        if (!enrollmentDoc.exists()) {
          alert('Você não está inscrito neste curso.');
          return;
        }

        // Obter dados do curso
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        if (courseDoc.exists()) {
          setCourseTitle(courseDoc.data()?.title || '');
        }

        // Obter módulos do curso
        const modulesSnapshot = await getDocs(collection(db, `courses/${courseId}/modules`));
        const modulesData = await Promise.all(
          modulesSnapshot.docs.map(async (moduleDoc) => {
            const lessonsSnapshot = await getDocs(
              collection(db, `courses/${courseId}/modules/${moduleDoc.id}/lessons`)
            );
            const lessonsData = lessonsSnapshot.docs.map((lessonDoc) => ({
              id: lessonDoc.id,
              ...lessonDoc.data(),
            }));
            return {
              id: moduleDoc.id,
              ...moduleDoc.data(),
              lessons: lessonsData,
            } as Module;
          })
        );
        setModules(modulesData);
      }
    };

    fetchCourseContent();
  }, [user, courseId]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">{courseTitle}</h1>
        {modules.map((module) => (
          <div key={module.id} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{module.title}</h2>
            <ul className="list-disc list-inside">
              {module.lessons.map((lesson) => (
                <li key={lesson.id} className="mb-2">
                  <Link href={`/my-courses/${courseId}/modules/${module.id}/lessons/${lesson.id}`}>
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      {lesson.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
