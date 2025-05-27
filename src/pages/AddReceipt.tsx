import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CameraIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../store';

export default function AddReceipt() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // TODO: Implement Firebase upload
      // 1. Upload images to Firebase Storage
      // 2. Save receipt data to Firestore
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving receipt:', error);
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
              <input
                required
                type="text"
                placeholder="Local do Abastecimento"
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
                  onChange={handleImageChange('initialKmPhoto')}
                />
                <label htmlFor="initial-km-photo" className="cursor-pointer">
                  <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <CameraIcon className="h-6 w-6 text-blue-600" />
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
                    <CameraIcon className="h-6 w-6 text-blue-600" />
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
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="py-2 px-4 bg-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
