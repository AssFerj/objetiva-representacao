'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { RootState } from '@/store';
import ReceiptCard from '@/components/ReceiptCard';
import ReceiptModal from '@/components/ReceiptModal';
import { Receipt } from '@/types';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReceipts = async () => {
      if (!user) return;

      try {
        const receiptsRef = collection(db, 'receipts');
        const receiptsQuery = query(receiptsRef);
        const querySnapshot = await getDocs(receiptsQuery);

        // Define a type for the raw data from Firestore to ensure type safety
        type FirestoreReceipt = Omit<Receipt, 'id' | 'createdAt'> & { createdAt: Timestamp };

        const allReceipts = querySnapshot.docs.map(doc => {
          const data = doc.data() as FirestoreReceipt;
          return {
            id: doc.id,
            ...data,
          };
        });

        const userReceipts = allReceipts.filter(receipt =>
          user.role === 'manager' || receipt.userId === user.id
        );

        userReceipts.sort((a, b) => {
          const dateA = a.createdAt.toDate();
          const dateB = b.createdAt.toDate();
          return dateB.getTime() - dateA.getTime();
        });

        // Map to the final Receipt type for the UI state, converting Timestamp to a string
        const fetchedReceipts: Receipt[] = userReceipts.map(r => ({
          ...r,
          createdAt: r.createdAt.toDate().toISOString(),
        }));

        setReceipts(fetchedReceipts);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    };

    fetchReceipts();
  }, [user]);

  const filteredReceipts = receipts.filter(receipt =>
    receipt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl"> 
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-blue-950">
            Dashboard
          </h1>
          {user && (
            <p className="text-gray-600">
              Olá, {user.name}!
            </p>
          )}
        </div>
        <button
          className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={() => router.push('/painel/registrar-abastecimento')}
        >
          <PlusIcon className="h-5 w-5" />
          Novo Abastecimento
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por local ou usuário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReceipts.map((receipt) => (
          <div key={receipt.id}>
            <ReceiptCard
              receipt={receipt}
              onClick={() => {
                setSelectedReceipt(receipt);
                setIsModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {selectedReceipt && (
        <ReceiptModal
          receipt={selectedReceipt}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedReceipt(null);
          }}
          onUpdate={(updatedReceipt) => {
            setReceipts(receipts.map(r => r.id === updatedReceipt.id ? updatedReceipt : r));
            setSelectedReceipt(updatedReceipt);
          }}
          onDelete={(deletedId) => {
            setReceipts(receipts.filter(r => r.id !== deletedId));
            setIsModalOpen(false);
            setSelectedReceipt(null);
          }}
        />
      )}
    </div>
  );
}
