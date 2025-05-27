import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import ReceiptCard from '../components/ReceiptCard';

// Temporary type until we create the receipt types
interface Receipt {
  id: string;
  location: string;
  date: string;
  userId: string;
  userName: string;
  initialKm: number;
  finalKm: number;
  value: number;
  initialKmPhotoUrl: string;
  finalKmPhotoUrl: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Fetch receipts from Firebase
    // For now, we'll use mock data
    const mockReceipts: Receipt[] = [
      {
        id: '1',
        location: 'Posto Shell',
        date: '2025-05-26',
        userId: 'user1',
        userName: 'John Doe',
        initialKm: 50000,
        finalKm: 50500,
        value: 250.00,
        initialKmPhotoUrl: 'https://example.com/photo1.jpg',
        finalKmPhotoUrl: 'https://example.com/photo2.jpg',
      },
      // Add more mock data as needed
    ];

    // Filter receipts based on user role
    const filteredReceipts = user?.role === 'manager' ? mockReceipts : mockReceipts.filter(receipt => receipt.userId === user?.id);

    setReceipts(filteredReceipts);
  }, [user]);

  const filteredReceipts = receipts.filter(receipt => 
    receipt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.userName.toLowerCase().includes(searchTerm.toLowerCase())
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
            <ReceiptCard receipt={receipt} />
          </div>
        ))}
      </div>
    </div>
  );
}
