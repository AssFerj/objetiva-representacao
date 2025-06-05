'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/store';


interface ClientPainelLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientPainelLayoutWrapper({ children }: ClientPainelLayoutWrapperProps) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // AuthProvider já lida com o carregamento inicial e atualiza o estado do usuário.
    // Se, após o carregamento inicial do AuthProvider, o usuário não estiver definido, redirecione.
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Se não houver usuário, não renderize nada ou um loader enquanto o redirecionamento acontece.
  // Isso evita um flash do conteúdo protegido.
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-950"></div>
      </div>
    );
  }

  // Se o usuário existir, AppStructure já forneceu o DashboardLayout.
  // Apenas renderize o conteúdo da página específica do painel.
  return <>{children}</>;
}
