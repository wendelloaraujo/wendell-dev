// src/components/Footer.tsx
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Wendell Araujo. Todos os direitos reservados.</p>
        <div className="flex">
          <Link href="https://www.linkedin.com/in/wendelloaraujo/" target="_blank">
            <FaLinkedin className="text-2xl mx-2 hover:text-blue-500 transition duration-300" />
          </Link>
          <Link href="https://github.com/wendelloaraujo" target="_blank">
            <FaGithub className="text-2xl mx-2 hover:text-gray-400 transition duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
