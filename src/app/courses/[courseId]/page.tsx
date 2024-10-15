// src/app/courses/[courseId]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CourseDetails() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const [course, setCourse] = useState<any | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        try {
          const docRef = doc(db, 'courses', courseId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCourse({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log('Curso não encontrado!');
          }
        } catch (error) {
          console.error('Erro ao buscar o curso:', error);
        }
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!user) {
      alert('Você precisa estar logado para se inscrever.');
      router.push('/login');
      return;
    }

    if (course.isPaid) {
      // Implementar integração com gateway de pagamento
      alert('Este curso é pago. Pagamentos ainda não foram implementados.');
    } else {
      // Inscrever o usuário no curso
      await setDoc(doc(db, `users/${user.uid}/enrollments`, course.id), {
        courseId: course.id,
        enrolledAt: new Date(),
      });
      alert('Inscrição realizada com sucesso!');
      router.push(`/my-courses/${course.id}`);
    }
  };

  if (!course) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{course.title}</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{course.description}</p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Tipo: {course.isPaid ? 'Pago' : 'Gratuito'}</p>
      <button onClick={handleEnroll} className="btn">
        Inscrever-se no Curso
      </button>
    </div>
  );
}
