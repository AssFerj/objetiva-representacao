import { Fragment, useRef, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { deleteReceipt, updateReceipt } from '../services/receiptService';
import { uploadToCloudflare } from '../services/cloudflareStorage';
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

interface ReceiptModalProps {
  receipt: Receipt | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedReceipt: Receipt) => void;
  onDelete?: (deletedId: string) => void;
}

export default function ReceiptModal({ receipt: initialReceipt, isOpen, onClose, onUpdate, onDelete }: ReceiptModalProps) {
  const [receipt, setReceipt] = useState(initialReceipt);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    location: '',
    value: '',
    initialKm: '',
    finalKm: '',
  });

  useEffect(() => {
    if (initialReceipt) {
      setReceipt(initialReceipt);
      setEditForm({
        location: initialReceipt.location,
        value: initialReceipt.value,
        initialKm: initialReceipt.initialKm,
        finalKm: initialReceipt.finalKm,
      });
    }
  }, [initialReceipt]);

  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const initialKmImageRef = useRef<HTMLInputElement>(null);
  const finalKmImageRef = useRef<HTMLInputElement>(null);


  const handleImageChange = async (type: 'initialKm' | 'finalKm', file: File) => {
    if (!receipt) return;

    try {
      setLoading(true);
      const fileName = `${receipt.id}-${type}-${file.name}`;
      const url = await uploadToCloudflare({ file, fileName });
      const updatedData = { ...receipt, [`${type}Url`]: url };
      await updateReceipt(receipt.id, updatedData);
      onUpdate?.(updatedData);
      setReceipt(updatedData);
    } catch {
      alert('Erro ao atualizar imagem');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = async (type: 'initialKm' | 'finalKm') => {
    if (!isEditing) return;

    const inputRef = type === 'initialKm' ? initialKmImageRef : finalKmImageRef;
    inputRef.current?.click();
  };


  if (!receipt) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
                  {user?.role === 'manager' && (
                    <>
                      {isEditing ? (
                        <button
                          type="button"
                          className="rounded-md bg-white text-green-600 hover:text-green-700"
                          onClick={async () => {
                            try {
                              const updatedData = { ...receipt, ...editForm };
                              await updateReceipt(receipt.id, updatedData);
                              onUpdate?.(updatedData);
                              setReceipt(updatedData);
                              setIsEditing(false);
                            } catch {
                              alert('Erro ao atualizar o abastecimento');
                            }
                          }}
                        >
                          <span className="sr-only">Save</span>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-md bg-white text-blue-950 hover:text-blue-700"
                          onClick={() => setIsEditing(true)}
                        >
                          <span className="sr-only">Edit</span>
                          <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      )}
                      <button
                        type="button"
                        className="rounded-md bg-white text-red-600 hover:text-red-700"
                        onClick={async () => {
                          if (window.confirm('Tem certeza que deseja deletar este abastecimento?')) {
                            try {
                              await deleteReceipt(receipt.id);
                              onDelete?.(receipt.id);
                              onClose();
                            } catch {
                              alert('Erro ao deletar abastecimento');
                            }
                          }
                        }}
                      >
                        <span className="sr-only">Delete</span>
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    {/* Location */}
                    <div className="flex items-center gap-2 mb-6">
                      <MapPinIcon className="h-6 w-6 text-blue-950" />
                      <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-950">
                        {isEditing ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          />
                        ) : (
                          receipt.location
                        )}
                      </Dialog.Title>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {isEditing && (
                        <div className="col-span-2 mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">KM Inicial</h4>
                        <input
                          type="file"
                          ref={initialKmImageRef}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageChange('initialKm', file);
                          }}
                        />
                        <div 
                          className={`relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden ${(isEditing || !receipt.initialKmUrl) ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                          onClick={() => handleImageClick('initialKm')}
                        >
                          {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-950"></div>
                            </div>
                          ) : receipt.initialKmUrl ? (
                            <img
                              src={receipt.initialKmUrl}
                              alt="KM Inicial"
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                              Imagem pendente
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-500">KM Final</h4>
                          {!receipt.finalKmUrl && (
                            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                              Pendente
                            </span>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={finalKmImageRef}
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageChange('finalKm', file);
                          }}
                        />
                        <div 
                          className={`relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden ${(isEditing || !receipt.finalKmUrl) ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                          onClick={() => handleImageClick('finalKm')}
                        >
                          {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-950"></div>
                            </div>
                          ) : receipt.finalKmUrl ? (
                            <img
                              src={receipt.finalKmUrl}
                              alt="KM Final"
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                              Imagem pendente
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* User Info */}
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-blue-950" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Colaborador</p>
                          <p className="text-base text-gray-950">{receipt.userName}</p>
                        </div>
                      </div>

                      {/* Value */}
                      <div className="flex items-center gap-2">
                        <FireIcon className="h-5 w-5 text-blue-950" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Valor abastecido</p>
                          {isEditing ? (
                            <input
                              type="text"
                              className="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              value={editForm.value}
                              onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                            />
                          ) : (
                            <p className="text-base text-gray-950">
                              R$ {parseFloat(receipt.value).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* KM Info */}
                      <div className="flex items-center gap-2">
                        <ArrowTrendingUpIcon className="h-5 w-5 text-blue-950" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Quilometragem</p>
                          {isEditing ? (
                            <div className="flex gap-2 items-center">
                              <input
                                type="text"
                                className="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={editForm.initialKm}
                                onChange={(e) => setEditForm({ ...editForm, initialKm: e.target.value })}
                                placeholder="KM Inicial"
                              />
                              <span>-</span>
                              <input
                                type="text"
                                className="w-full px-2 py-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={editForm.finalKm}
                                onChange={(e) => setEditForm({ ...editForm, finalKm: e.target.value })}
                                placeholder="KM Final"
                              />
                            </div>
                          ) : (
                            <p className="text-base text-gray-950">
                              {receipt.initialKm} - {receipt.finalKm}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Data</p>
                          <p className="text-base text-gray-950">
                            {receipt.createdAt.toDate().toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
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
