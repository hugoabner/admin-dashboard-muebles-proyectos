'use client';

import { toast } from '@/lib/toast';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ImageUploader() {
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      
      // Crear URL temporal para previsualización
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSave = async () => {
    if (!imageFile) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      // Enviar a tu API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        toast.success('Imagen guardada con exito.');
        const data = await response.json();
        console.log('Imagen guardada:', data);
        // Limpiar después de guardar
        setSelectedImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        handleCancel();
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.error('Imagen cancelada.');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        {/* Input oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          id="image-upload"
        />
        
        {/* Botón personalizado */}
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Seleccionar Imagen
        </label>

        {/* Previsualización */}
        {selectedImage && (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="relative w-64 h-64">
              <Image
                src={selectedImage}
                alt="Previsualización"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Botones de acción */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleSave}
                disabled={isUploading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md disabled:bg-gray-400"
              >
                {isUploading ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                onClick={handleCancel}
                disabled={isUploading}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md disabled:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}