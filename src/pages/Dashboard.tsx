import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import ReceiptModal from '../components/ReceiptModal';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { RootState } from '../store';
import ReceiptCard from '../components/ReceiptCard';

interface Receipt {
  id: string;
  location: string;
  createdAt: Timestamp;
  userId: string;
  userEmail: string;
  userName: string;
  initialKm: string;
  finalKm: string;
  value: string;
  initialKmUrl: string;
  finalKmUrl: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReceipts = async () => {
      if (!user) return;

      try {
        // Create query based on user role
        const receiptsRef = collection(db, 'receipts');
        let q;

        if (user.role === 'manager') {
          // Manager can see all receipts
          q = query(receiptsRef, orderBy('createdAt', 'desc'));
        } else {
          // Seller can only see their own receipts
          q = query(
            receiptsRef,
            where('userId', '==', user.id),
            orderBy('createdAt', 'desc')
          );
        }

        const querySnapshot = await getDocs(q);
        const fetchedReceipts: Receipt[] = [];

        querySnapshot.forEach((doc) => {
          fetchedReceipts.push({
            id: doc.id,
            ...doc.data() as Omit<Receipt, 'id'>
          });
        });

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
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => navigate('/add-receipt')}
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
