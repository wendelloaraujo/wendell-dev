'use client';

import AdminRoute from '@/components/AdminRoute';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Module {
  id: string;
  title: string;
}

export default function EditModules() {
  const [modules, setModules] = useState<Module[]>([]);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;

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
      <motion.div
        className="container mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Editar Módulos</h1>
        
        {/* Adicionar Novo Módulo */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <input
            type="text"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="Título do Novo Módulo"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
          />
          <motion.button
            onClick={handleAddModule}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Adicionar Módulo
          </motion.button>
        </motion.div>

        {/* Listagem de Módulos */}
        <ul className="space-y-4">
          {modules.map((module) => (
            <motion.li
              key={module.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-white text-lg">{module.title}</span>
              <div className="flex space-x-4">
                <Link href={`/dashboard/courses/edit/${courseId}/modules/${module.id}/lessons`}>
                  <motion.button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Gerenciar Lições
                  </motion.button>
                </Link>
                <motion.button
                  onClick={() => handleDeleteModule(module.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Excluir
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AdminRoute>
  );
}
