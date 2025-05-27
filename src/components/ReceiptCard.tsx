import {
  MapPinIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

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

interface ReceiptCardProps {
  receipt: Receipt;
}

export default function ReceiptCard({ receipt }: ReceiptCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full h-40 object-cover"
        src={receipt.initialKmPhotoUrl || '/placeholder.jpg'}
        alt="Foto do KM inicial"
      />
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">
                {receipt.location}
              </h2>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-600">
                {receipt.userName}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <ArrowTrendingUpIcon className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700">
                {receipt.finalKm - receipt.initialKm} km
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <FireIcon className="h-5 w-5 text-blue-600" />
              <span className="text-xl font-semibold text-blue-600">
                R$ {receipt.value.toFixed(2)}
              </span>
            </div>
          </div>

          <div>
            <span className="text-sm text-gray-500">
              Data: {new Date(receipt.date).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
