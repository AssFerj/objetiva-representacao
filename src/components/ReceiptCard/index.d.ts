import { FC } from 'react';

interface Receipt {
  id: string;
  location: string;
  date: string;
  userId: string;
  initialKm: number;
  finalKm: number;
  value: number;
  initialKmPhotoUrl?: string;
  finalKmPhotoUrl?: string;
}

interface ReceiptCardProps {
  receipt: Receipt;
}

declare const ReceiptCard: FC<ReceiptCardProps>;

export default ReceiptCard;
export type { Receipt, ReceiptCardProps };
