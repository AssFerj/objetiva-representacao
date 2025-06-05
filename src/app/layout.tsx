import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import AuthProvider from '@/components/AuthProvider';
import AppStructure from '@/components/AppStructure';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Objetiva Representação',
  description: 'Plataforma Objetiva Representação',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <AppStructure>{children}</AppStructure>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
