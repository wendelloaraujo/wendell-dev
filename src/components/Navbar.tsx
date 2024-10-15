'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Wendell.dev.br</span>
        </Link>
        <div className="flex items-center">
          <Link href="/">
            <span className="mr-4 hover:text-gray-300 cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="mr-4 hover:text-gray-300 cursor-pointer">Sobre</span>
          </Link>
          <Link href="/projects">
            <span className="mr-4 hover:text-gray-300 cursor-pointer">Projetos</span>
          </Link>
          <Link href="/courses">
            <span className="mr-4 hover:text-gray-300 cursor-pointer">Cursos</span>
          </Link>
          <Link href="/contact">
            <span className="mr-4 hover:text-gray-300 cursor-pointer">Contato</span>
          </Link>
          {user ? (
            <>
              <Link href="/dashboard">
                <span className="mr-4 hover:text-gray-300 cursor-pointer">Dashboard</span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="mr-4 hover:text-gray-300 cursor-pointer">Login</span>
              </Link>
              <Link href="/register">
                <span className="hover:text-gray-300 cursor-pointer">Registrar</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
