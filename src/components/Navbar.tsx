// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LogoutButton from './LogoutButton';
import { useState, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md'; // Ícones para alternar temas

export default function Navbar() {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="p-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer text-gray-800 dark:text-white">
            Wendell.dev.br
          </span>
        </Link>
        <div className="flex items-center">
          <Link href="/">
            <span className="mr-4 hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="mr-4 hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
              Sobre
            </span>
          </Link>
          <Link href="/projects">
            <span className="mr-4 hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
              Projetos
            </span>
          </Link>
          <Link href="/courses">
            <span className="mr-4 hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
              Cursos
            </span>
          </Link>
          <Link href="/contact">
            <span className="mr-4 hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
              Contato
            </span>
          </Link>
          {user ? (
            <>
              <Link href="/dashboard">
                <span className="mr-4 hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
                  Dashboard
                </span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="mr-4 hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
                  Login
                </span>
              </Link>
              <Link href="/register">
                <span className="hover:underline cursor-pointer text-gray-800 dark:text-gray-200">
                  Registrar
                </span>
              </Link>
            </>
          )}
          {/* Botão para alternar o modo */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {theme === 'light' ? (
              <MdDarkMode size={24} className="text-gray-800" />
            ) : (
              <MdLightMode size={24} className="text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
