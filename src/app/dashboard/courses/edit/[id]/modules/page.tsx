// src/app/dashboard/courses/edit/[id]/modules/page.tsx
'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
}

export default function EditModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;

  useEffect(() => {
    const fetchModules = async () => {
      if (courseId) {
        const modulesSnapshot = await getDocs(
          collection(db, `courses/${courseId}/modules`)
        );
        const modulesData = modulesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Module[];
        setModules(modulesData);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleAddModule = async () => {
    if (newModuleTitle.trim() === '') return;

    const moduleRef = await addDoc(
      collection(db, `courses/${courseId}/modules`),
      {
        title: newModuleTitle,
      }
    );
    setModules([...modules, { id: moduleRef.id, title: newModuleTitle }]);
    setNewModuleTitle('');
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (confirm('Tem certeza que deseja excluir este módulo?')) {
      await deleteDoc(doc(db, `courses/${courseId}/modules/${moduleId}`));
      setModules(modules.filter((module) => module.id !== moduleId));
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Editar Módulos</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="Título do Novo Módulo"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
          />
          <button
            onClick={handleAddModule}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Adicionar Módulo
          </button>
        </div>
        <ul>
          {modules.map((module) => (
            <li key={module.id} className="mb-2 flex justify-between items-center">
              <span>{module.title}</span>
              <div>
                <Link href={`/dashboard/courses/edit/${courseId}/modules/${module.id}/lessons`}>
                  <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-300 mr-2">
                    Gerenciar Lições
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteModule(module.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminRoute>
  );
}
