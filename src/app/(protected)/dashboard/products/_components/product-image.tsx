"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ImageFile {
  file: File;
  preview: string;
}

export default function ProductImage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const validFiles = Array.from(files).filter((file) => {
        const isValidType = ["image/jpeg", "image/jpg", "image/png"].includes(
          file.type
        );
        const isValidSize = file.size <= 500 * 1024; // 500kb

        if (!isValidType) {
          alert(`${file.name}: Formato no válido. Use .jpg, .jpeg o .png`);
          return false;
        }
        if (!isValidSize) {
          alert(`${file.name}: El archivo excede 500kb`);
          return false;
        }
        return true;
      });

      const newImages = validFiles.slice(0, 5 - images.length).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    },
    [images.length]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleConfirm = async () => {
    if (images.length === 0) {
      alert("Seleccione al menos una imagen");
      return;
    }

    const formData = new FormData();
    images.forEach((img, index) => {
      formData.append(`image${index}`, img.file);
    });

    try {
      // Aquí envías a tu API
      const response = await fetch("/api/products/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Imágenes subidas exitosamente");
        // Limpiar imágenes
        images.forEach((img) => URL.revokeObjectURL(img.preview));
        setImages([]);
      }
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      alert("Error al subir las imágenes");
    }
  };
  return (
    <div className="bg-white">
      <div className="flex w-full">
        <div className="w-full space-y-2 p-5 md:p-8 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold ">Imagen de producto</h2>
          <p>Elija una imagen de un producto o simplemente arrastrela</p>
          <section className="space-y-4">
            <div className="">
              <h3 className="font-semibold text-gray-700">
                Imágenes seleccionadas ({images.length}/5):
              </h3>
              <div className="flex  w-full">
                <div className="w-44">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="w-28">
                      <svg
                        className="mx-auto h-10 w-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs text-gray-600 flex flex-col">
                        Suelta tu imagen aquí o{" "}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                          haz clic para buscar{" "}
                          <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="hidden"
                          />
                        </label>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {images.length > 0 && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        {images.map((img, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                              <Image
                                src={img.preview}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white 
                              rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="flex gap-3 pt-4">
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Confirmar y subir
                </button>
                <button
                  onClick={() => {
                    images.forEach((img) => URL.revokeObjectURL(img.preview));
                    setImages([]);
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancelar
                </button>
              </div> */}
            </div>{" "}
            <p className="text-sm text-gray-500">
              Formatos de imagen: .jpg, .jpeg, .png, tamaño preferido: 1:1, el
              tamaño del archivo está restringido a un máximo de 500 kb.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
