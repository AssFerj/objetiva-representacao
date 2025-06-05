// src/app/painel/layout.tsx
import ClientPainelLayoutWrapper from '@/components/ClientPainelLayoutWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel Objetiva Representações',
  description: 'Painel administrativo para gerenciamento de abastecimentos e outras funcionalidades.',
};

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientPainelLayoutWrapper>{children}</ClientPainelLayoutWrapper>;
}
