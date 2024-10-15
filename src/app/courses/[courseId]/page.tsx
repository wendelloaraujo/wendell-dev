'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
    <motion.div
      className="container mx-auto px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-6 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {course.title}
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-6 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {course.description}
      </motion.p>

      <motion.p
        className="text-lg text-gray-400 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Tipo: <span className={course.isPaid ? 'text-red-500' : 'text-green-500'}>{course.isPaid ? 'Pago' : 'Gratuito'}</span>
      </motion.p>

      <motion.button
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Inscrever-se no Curso
      </motion.button>
    </motion.div>
  );
}
