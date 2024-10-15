// src/app/dashboard/page.tsx
'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>
        <p>Bem-vindo ao seu painel, aqui você pode acessar conteúdos exclusivos.</p>
      </div>
    </ProtectedRoute>
  );
}
