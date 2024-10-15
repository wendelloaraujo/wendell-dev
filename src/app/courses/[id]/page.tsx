'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CourseDetails() {
  const params = useParams();
  const id = params?.id;
  const [course, setCourse] = useState<any | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      if (id && typeof id === 'string') {
        try {
          const docRef = doc(db, 'courses', id);
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
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      alert('Você precisa estar logado para se inscrever.');
      router.push('/login');
      return;
    }

    if (course.isPaid) {
      // Redirecionar para página de pagamento (a ser implementada)
      alert('Este curso é pago. Processamento de pagamentos ainda não implementado.');
    } else {
      // Inscrever o usuário no curso (por simplicidade, não estamos verificando se já está inscrito)
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
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <p className="mb-4">Tipo: {course.isPaid ? 'Pago' : 'Gratuito'}</p>
      <button
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Inscrever-se no Curso
      </button>
    </div>
  );
}
