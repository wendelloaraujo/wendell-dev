// src/app/dashboard/activities/[id]/submit/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';
import { storage, db } from '@/firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';

export default function SubmitActivity() {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const activityId = params.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !user) return;

    try {
      const fileRef = ref(storage, `activities/${activityId}/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'submissions'), {
        activityId,
        studentId: user.uid,
        fileUrl,
        submittedAt: Timestamp.now(),
      });

      alert('Atividade enviada com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao enviar atividade:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Enviar Atividade</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            required
            className="mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
