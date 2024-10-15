'use client';

import AdminRoute from '@/components/AdminRoute';
import { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (uid: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), {
        role: newRole,
      });
      setUsers(
        users.map((user) =>
          user.uid === uid ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar o papel do usuário:', error);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Usuários</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Papel</th>
              <th className="py-2 px-4 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="student">Estudante</option>
                    <option value="admin">Administrador</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminRoute>
  );
}
