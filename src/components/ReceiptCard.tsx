import {
  MapPinIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

import { Timestamp } from 'firebase/firestore';

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

export interface ReceiptCardProps {
  receipt: Receipt;
  onClick: () => void;
}

export default function ReceiptCard({ receipt, onClick }: ReceiptCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative w-full h-40 bg-gray-100">
        {receipt.initialKmUrl ? (
          <img
            className="w-full h-40 object-cover"
            src={receipt.initialKmUrl}
            alt="Foto do KM inicial"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            Imagem inicial pendente
          </div>
        )}
        {!receipt.finalKmUrl && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            KM Final Pendente
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {/* Location - Full width */}
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-blue-950" />
            <h2 className="text-xl font-semibold">
              {receipt.location}
            </h2>
          </div>
          
          {/* Info grid - 2 columns */}
          <div className="grid grid-cols-2 gap-4">
            {/* User Name */}
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-blue-950" />
              <span className="text-gray-600 truncate">
                {receipt.userName}
              </span>
            </div>

            {/* Distance */}
            <div className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="h-5 w-5 text-blue-950" />
              <span className="text-gray-700">
                {parseInt(receipt.finalKm) - parseInt(receipt.initialKm)} km
              </span>
            </div>

            {/* Value */}
            <div className="flex items-center gap-2">
              <FireIcon className="h-5 w-5 text-blue-950" />
              <span className="text-xl font-semibold text-blue-950">
                R$ {parseFloat(receipt.value).toFixed(2)}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                Data: {receipt.createdAt.toDate().toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
