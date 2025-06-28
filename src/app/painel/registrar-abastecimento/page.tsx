'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { CameraIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import type { AppDispatch, RootState } from '@/store';
import { db } from '@/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { uploadToCloudflare } from '@/services/cloudflareStorage';
import { Receipt } from '@/types';
import { addReceipt } from '@/store/slices/receiptSlice';
interface Seller {
  uid: string;
  displayName: string | null;
  email: string | null;
}

export default function AddReceipt() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<Seller[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', 'seller'));
        const querySnapshot = await getDocs(q);
        const usersList: Seller[] = querySnapshot.docs.map(doc => ({
          uid: doc.id,
          displayName: doc.data().name || null,
          email: doc.data().email || null,
        }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  
  const [formData, setFormData] = useState({
    location: '',
    initialKm: '',
    finalKm: '',
    value: '',
  });
  
  const [images, setImages] = useState({
    initialKmPhoto: null as File | null,
    finalKmPhoto: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (type: 'initialKmPhoto' | 'finalKmPhoto') => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImages(prev => ({
        ...prev,
        [type]: event.target.files![0]
      }));
    }
  };

  const uploadImage = async (file: File, type: 'initialKm' | 'finalKm') => {
    if (!file) return null;
    
    try {
      // Add timestamp and random string to ensure uniqueness
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const extension = file.name.split('.').pop();
      const fileName = `${type}_${user?.email?.split('@')[0]}_${timestamp}_${random}.${extension}`;
      
      // Upload to Cloudflare
      const downloadURL = await uploadToCloudflare({
        file,
        fileName,
        metadata: {
          userId: user?.id || '',
          userEmail: user?.email || '',
          uploadedAt: new Date().toISOString()
        }
      });
      
      return downloadURL;
    } catch (error) {
      console.error(`Error uploading ${type} image:`, error);
      if (error instanceof Error) {
        throw new Error(`Erro ao enviar imagem ${type === 'initialKm' ? 'do KM inicial' : 'do KM final'}: ${error.message}`);
      }
      throw new Error(`Erro ao enviar imagem ${type === 'initialKm' ? 'do KM inicial' : 'do KM final'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!images.initialKmPhoto) {
      toast.warn('A foto do KM inicial é obrigatória.');
      return;
    }

    setLoading(true);
    try {
      const initialKmUrl = await uploadImage(images.initialKmPhoto, 'initialKm');
      const finalKmUrl = images.finalKmPhoto ? await uploadImage(images.finalKmPhoto, 'finalKm') : null;

      if (!initialKmUrl) {
        throw new Error('Falha ao fazer upload da imagem do KM inicial.');
      }

      let receiptOwner: { id: string; name: string; email: string; };

      if (user.role === 'seller') {
        receiptOwner = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      } else {
        if (!selectedUserId) {
          toast.warn('Por favor, selecione um vendedor.');
          setLoading(false);
          return;
        }
        const selectedUser = users.find(u => u.uid === selectedUserId);
        if (!selectedUser) {
          throw new Error('Vendedor selecionado não encontrado.');
        }
        receiptOwner = {
          id: selectedUser.uid,
          name: selectedUser.displayName || '',
          email: selectedUser.email || '',
        };
      }

      const newReceipt: Omit<Receipt, 'id'> = {
        location: formData.location,
        initialKm: Number(formData.initialKm),
        finalKm: Number(formData.finalKm),
        value: Number(formData.value),
        userId: receiptOwner.id,
        userEmail: receiptOwner.email,
        userName: receiptOwner.name,
        initialKmUrl,
        finalKmUrl,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await dispatch(addReceipt(newReceipt as Receipt)).unwrap();
      
      toast.success('Abastecimento registrado com sucesso!');
      router.push('/painel');
    } catch (error) {
      console.error('Error saving receipt:', error);
      const errorMessage = error instanceof Error ? error.message : 'Por favor, tente novamente.';
      toast.error(`Erro ao salvar o abastecimento: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">
          Novo Abastecimento
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <select
                required
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className={`w-full px-3 py-2 text-gray-400 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${user?.role === 'seller' ? 'hidden' : ''}`}
              >
                <option className='text-gray-400' value="">Selecione um vendedor</option>
                {users.map((u) => (
                  <option className='text-gray-400' key={u.uid} value={u.uid}>
                    {u.displayName}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <input
                required
                type="text"
                placeholder="Local do Abastecimento (Localidade + Nome do posto)"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                required
                type="number"
                placeholder="KM Inicial"
                value={formData.initialKm}
                onChange={(e) => setFormData({ ...formData, initialKm: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <input
                required
                type="number"
                placeholder="KM Final"
                value={formData.finalKm}
                onChange={(e) => setFormData({ ...formData, finalKm: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="sm:col-span-2">
              <input
                required
                type="number"
                placeholder="Valor Abastecido"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <div className="flex items-center gap-4">
                <input
                  accept="image/*"
                  className="hidden"
                  id="initial-km-photo"
                  type="file"
                  required                  onChange={handleImageChange('initialKmPhoto')}
                />
                <label htmlFor="initial-km-photo" className="cursor-pointer">
                  <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <CameraIcon className="h-6 w-6 text-blue-950" />
                  </div>
                </label>
                <span className="text-gray-600">
                  {images.initialKmPhoto ? images.initialKmPhoto.name : 'Foto do KM Inicial'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <input
                  accept="image/*"
                  className="hidden"
                  id="final-km-photo"
                  type="file"
                  onChange={handleImageChange('finalKmPhoto')}
                />
                <label htmlFor="final-km-photo" className="cursor-pointer">
                  <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <CameraIcon className="h-6 w-6 text-blue-950" />
                  </div>
                </label>
                <span className="text-gray-600">
                  {images.finalKmPhoto ? images.finalKmPhoto.name : 'Foto do KM Final'}
                </span>
              </div>
            </div>

            <div className="sm:col-span-2 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/painel')}
                disabled={loading}
                className="py-2 px-4 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-4 bg-blue-950 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}
