// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="p-4 bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer text-white">
            Wendell.dev.br
          </span>
        </Link>
        <div className="flex items-center">
          <Link href="/">
            <span className="mr-4 hover:underline cursor-pointer text-gray-200">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="mr-4 hover:underline cursor-pointer text-gray-200">
              Sobre
            </span>
          </Link>
          <Link href="/projects">
            <span className="mr-4 hover:underline cursor-pointer text-gray-200">
              Projetos
            </span>
          </Link>
          <Link href="/courses">
            <span className="mr-4 hover:underline cursor-pointer text-gray-200">
              Cursos
            </span>
          </Link>
          <Link href="/contact">
            <span className="mr-4 hover:underline cursor-pointer text-gray-200">
              Contato
            </span>
          </Link>
          {user ? (
            <>
              <Link href="/dashboard">
                <span className="mr-4 hover:underline cursor-pointer text-gray-200">
                  Dashboard
                </span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="mr-4 hover:underline cursor-pointer text-gray-200">
                  Login
                </span>
              </Link>
              <Link href="/register">
                <span className="hover:underline cursor-pointer text-gray-200">
                  Registrar
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
