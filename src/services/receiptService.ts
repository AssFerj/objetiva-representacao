import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Receipt } from '../types';
import { db } from '../config/firebase';
import { uploadToCloudflare } from './cloudflareStorage';

export const updateReceiptImage = async (
  receiptId: string,
  file: File,
  type: 'initialKm' | 'finalKm',
  metadata: {
    userId: string;
    userEmail: string;
  }
) => {
  try {
    // Upload da imagem
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const fileName = `${type}_${metadata.userEmail.split('@')[0]}_${timestamp}_${random}.${extension}`;

    const imageUrl = await uploadToCloudflare({
      file,
      fileName,
      metadata: {
        ...metadata,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Atualiza o documento no Firestore
    const receiptRef = doc(db, 'receipts', receiptId);
    await updateDoc(receiptRef, {
      [`${type}Url`]: imageUrl,
    });

    return imageUrl;
  } catch (error) {
    console.error('Error updating receipt image:', error);
    throw new Error('Erro ao atualizar a imagem');
  }
};

export const updateReceipt = async (receiptId: string, data: Partial<Receipt>) => {
  try {
    const receiptRef = doc(db, 'receipts', receiptId);
    await updateDoc(receiptRef, data);
  } catch (error) {
    console.error('Error updating receipt:', error);
    throw new Error('Erro ao atualizar o abastecimento');
  }
};

export const deleteReceipt = async (receiptId: string) => {
  try {
    const receiptRef = doc(db, 'receipts', receiptId);
    await deleteDoc(receiptRef);
  } catch (error) {
    console.error('Error deleting receipt:', error);
    throw new Error('Erro ao deletar o abastecimento');
  }
};
