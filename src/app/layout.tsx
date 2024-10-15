import './globals.css';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata = {
  title: 'Wendell Araujo',
  description: 'Site pessoal de Wendell Araujo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
