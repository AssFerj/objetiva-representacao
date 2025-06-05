'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps): JSX.Element {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-lg font-semibold leading-6 text-blue-950">Objetiva Representações</h1>
          <button
            className="bg-blue-950 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Saindo...</span>
              </>
            ) : (
              'Sair'
            )}
          </button>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <footer className="bg-white shadow-sm mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">© {new Date().getFullYear()} <span className="font-bold text-blue-950">Objetiva Representações</span>. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default DashboardLayout;
