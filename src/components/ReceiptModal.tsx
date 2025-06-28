import { Fragment, useRef, useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import {
  MapPinIcon,
  UserIcon,
  ArrowTrendingUpIcon,
  FireIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

import type { RootState } from '@/store';
import { Receipt } from '@/types';
import { deleteReceipt, updateReceipt } from '@/services/receiptService';
import { uploadToCloudflare } from '@/services/cloudflareStorage';

// This interface holds the form state, using strings for all fields to match input elements
interface EditFormState {
  location: string;
  value: string;
  initialKm: string;
  finalKm: string;
}

interface ReceiptModalProps {
  receipt: Receipt | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedReceipt: Receipt) => void;
  onDelete?: (deletedId: string) => void;
}

export default function ReceiptModal({ receipt: initialReceipt, isOpen, onClose, onUpdate, onDelete }: ReceiptModalProps) {
  // Master receipt state for the modal, updated via props or after local saves
  const [receipt, setReceipt] = useState<Receipt | null>(initialReceipt);
  // Separate form state for the editing UI
  const [editForm, setEditForm] = useState<EditFormState>({ location: '', value: '', initialKm: '', finalKm: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const initialKmImageRef = useRef<HTMLInputElement>(null);
  const finalKmImageRef = useRef<HTMLInputElement>(null);

  // Effect to sync local state when the prop changes
  useEffect(() => {
    setReceipt(initialReceipt);
    if (initialReceipt) {
      // Populate the edit form when the modal opens or receipt data changes
      setEditForm({
        location: initialReceipt.location,
        value: String(initialReceipt.value),
        initialKm: String(initialReceipt.initialKm),
        finalKm: String(initialReceipt.finalKm),
      });
      // Reset editing state when a new receipt is passed in
      setIsEditing(false);
    }
  }, [initialReceipt]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (type: 'initialKm' | 'finalKm') => {
    const inputRef = type === 'initialKm' ? initialKmImageRef : finalKmImageRef;
    const file = inputRef.current?.files?.[0];
    if (!file || !receipt) return;

    setLoading(true);
    try {
      const fileName = `${receipt.id}-${type}-${file.name}`;
      const url = await uploadToCloudflare({ file, fileName });
      
      const updatedField = { [`${type}Url`]: url };
      
      await updateReceipt(receipt.id, updatedField);

      const updatedReceipt = { ...receipt, ...updatedField } as Receipt;
      setReceipt(updatedReceipt);
      onUpdate?.(updatedReceipt);
      toast.success('Imagem enviada com sucesso!');

    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erro ao fazer upload da imagem.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!receipt) return;

    const updatedData: Partial<Receipt> = {
      location: editForm.location,
      value: Number(editForm.value),
      initialKm: Number(editForm.initialKm),
      finalKm: Number(editForm.finalKm),
    };

    try {
      await updateReceipt(receipt.id, updatedData);
      
      const updatedReceipt = { ...receipt, ...updatedData } as Receipt;
      setReceipt(updatedReceipt);
      onUpdate?.(updatedReceipt);
      setIsEditing(false);
      toast.success('Abastecimento atualizado com sucesso!');

    } catch (error) {
      console.error('Error saving receipt:', error);
      toast.error('Erro ao salvar as alterações.');
    }
  };

  const handleDelete = async () => {
    if (!receipt || !window.confirm('Tem certeza que deseja deletar este abastecimento?')) {
      return;
    }
    try {
      await deleteReceipt(receipt.id);
      toast.success('Abastecimento deletado com sucesso!');
      onDelete?.(receipt.id);
      onClose();
    } catch (error) {
      console.error('Error deleting receipt:', error);
      toast.error('Erro ao deletar o abastecimento.');
    }
  };

  const handleImageClick = (type: 'initialKm' | 'finalKm') => {
    if (!isEditing) return;
    const inputRef = type === 'initialKm' ? initialKmImageRef : finalKmImageRef;
    inputRef.current?.click();
  };
  
  const formatDate = (dateStr: string | Timestamp) => {
    if (!dateStr) return 'N/A';
    const date = dateStr instanceof Timestamp ? dateStr.toDate() : new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  if (!isOpen || !receipt) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute top-0 right-0 pt-4 pr-4 flex items-center gap-2">
                  {user?.role === 'manager' && (
                    <>
                      {isEditing ? (
                        <button type="button" className="rounded-md bg-white text-green-600 hover:text-green-700" onClick={handleSave}>
                          <span className="sr-only">Salvar</span>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      ) : (
                        <button type="button" className="rounded-md bg-white text-blue-950 hover:text-blue-700" onClick={() => setIsEditing(true)}>
                          <span className="sr-only">Editar</span>
                          <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      )}
                      <button type="button" className="rounded-md bg-white text-red-600 hover:text-red-700" onClick={handleDelete}>
                        <span className="sr-only">Deletar</span>
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </>
                  )}
                  <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500" onClick={onClose}>
                    <span className="sr-only">Fechar</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="w-full">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPinIcon className="h-6 w-6 text-blue-950" />
                    {isEditing ? (
                      <input type="text" name="location" value={editForm.location} onChange={handleInputChange} className="w-full px-2 py-1 text-2xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    ) : (
                      <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-950">{receipt.location}</Dialog.Title>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">KM Inicial</h4>
                      <input type="file" ref={initialKmImageRef} className="hidden" accept="image/*" onChange={() => handleImageUpload('initialKm')} />
                      <div className={`relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden ${isEditing ? 'cursor-pointer hover:bg-gray-200' : ''}`} onClick={() => handleImageClick('initialKm')}>
                        {loading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-950"></div></div>
                        ) : receipt.initialKmUrl ? (
                          <img src={receipt.initialKmUrl} alt="KM Inicial" className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">Imagem pendente</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-500">KM Final</h4>
                        {!receipt.finalKmUrl && <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Pendente</span>}
                      </div>
                      <input type="file" ref={finalKmImageRef} className="hidden" accept="image/*" onChange={() => handleImageUpload('finalKm')} />
                      <div className={`relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden ${isEditing ? 'cursor-pointer hover:bg-gray-200' : ''}`} onClick={() => handleImageClick('finalKm')}>
                        {loading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-950"></div></div>
                        ) : receipt.finalKmUrl ? (
                          <img src={receipt.finalKmUrl} alt="KM Final" className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">Imagem pendente</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2"><UserIcon className="h-5 w-5 text-blue-950" /><div><p className="text-sm font-medium text-gray-500">Colaborador</p><p className="text-base text-gray-950">{receipt.userName}</p></div></div>
                    <div className="flex items-center gap-2"><FireIcon className="h-5 w-5 text-blue-950" /><div><p className="text-sm font-medium text-gray-500">Valor abastecido</p>{isEditing ? <input type="text" name="value" value={editForm.value} onChange={handleInputChange} className="w-full px-2 py-1 text-base border border-gray-300 rounded-md" /> : <p className="text-base text-gray-950">R$ {Number(receipt.value).toFixed(2)}</p>}</div></div>
                    <div className="flex items-center gap-2"><ArrowTrendingUpIcon className="h-5 w-5 text-blue-950" /><div><p className="text-sm font-medium text-gray-500">Quilometragem</p>{isEditing ? <div className="flex gap-2 items-center"><input type="text" name="initialKm" value={editForm.initialKm} onChange={handleInputChange} placeholder="Inicial" className="w-full px-2 py-1 text-base border border-gray-300 rounded-md" /><span>-</span><input type="text" name="finalKm" value={editForm.finalKm} onChange={handleInputChange} placeholder="Final" className="w-full px-2 py-1 text-base border border-gray-300 rounded-md" /></div> : <p className="text-base text-gray-950">{receipt.initialKm} - {receipt.finalKm}</p>}</div></div>
                    <div className="flex items-center gap-2"><CalendarIcon className="h-5 w-5 text-blue-950" /><div><p className="text-sm font-medium text-gray-500">Data</p><p className="text-base text-gray-950">{formatDate(receipt.createdAt)}</p></div></div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
