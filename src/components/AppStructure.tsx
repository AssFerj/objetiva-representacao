'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import DashboardLayout from '@/components/DashboardLayout';

interface AppStructureProps {
  children: React.ReactNode;
}

export default function AppStructure({ children }: AppStructureProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    // Se o usuário estiver logado, usa o DashboardLayout para todas as rotas
    // A proteção específica de rotas do painel já é feita por src/app/painel/layout.tsx
    // e seu ClientPainelLayoutWrapper
    return <DashboardLayout>{children}</DashboardLayout>;
  } else {
    // Se o usuário não estiver logado, usa o layout público
    return (
      <>
        <Header />
        <Navigation />
        <main className="flex-grow">{children}</main> {/* Adicionado flex-grow para empurrar o footer */} 
        <Footer />
      </>
    );
  }
}
