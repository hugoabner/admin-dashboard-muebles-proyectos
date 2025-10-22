"use client";

import { Button } from "@/components/ui/button";
import { Eye, Images, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ImageFile {
  file: File;
  preview: string;
}

export default function ProductImage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const viewImage = (preview: string) => {
    setSelectedImage(preview);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-white">
      <div className="flex w-full">
        <div className="w-full space-y-2 p-5 md:p-8 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold ">Imagen de producto</h2>
          <p>Elija una imagen de un producto o simplemente arrastrela</p>
          {/* seccion de imagenes */}
          <section className="space-y-4">
            <div className="">
              <h3 className="font-semibold text-gray-700">
                Imágenes seleccionadas ({images.length}/5):
              </h3>
              <div className="flex flex-wrap gap-2 w-full">
                <div className="w-full">
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
                    <div className="flex flex-col items-center">
                      <Images className="text-gray-500" size={60} />
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
                {/* imagenes */}
                <div className="w-full">
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          {/* Contenedor de imagen */}
                          <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                            <Image
                              src={img.preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            {/* Capa de botones que aparece al hacer hover */}
                            <div
                              className="absolute inset-0 flex items-center justify-center 
                              gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                              bg-black/70"
                            />
                            {/* Capa de botones que aparece al hacer hover */}
                            <div
                              className="absolute inset-0 flex items-center justify-center 
                              gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              <button
                                onClick={() => viewImage(img.preview)}
                                className="bg-blue-500 text-white rounded-full
                                p-2 hover:bg-blue-600 transition"
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={() => removeImage(index)}
                                className="bg-red-500 text-white rounded-full 
                                p-2 hover:bg-red-600 transition"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Formatos de imagen: .jpg, .jpeg, .png, tamaño preferido: 1:1, el
              tamaño del archivo está restringido a un máximo de 500 kb.
            </p>
          </section>
        </div>
      </div>
      {/* Modal para ver imagen */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 
          backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Contenedor del modal */}
          <div
            className="relative w-full max-w-4xl mx-auto flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <div className="flex justify-end">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 
                backdrop-blur-md border border-white/20 text-white 
                transition-all duration-200 hover:scale-110"
              >
                <X size={24} />
              </Button>
            </div>
            {/* Contenedor de la imagen */}
            <div
              className="relative w-full bg-black/50 backdrop-blur-sm 
              rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="relative w-full aspect-square sm:aspect-video">
                <Image
                  src={selectedImage}
                  alt="Vista previa"
                  fill
                  className="object-contain p-2 sm:p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            </div>

            {/* Indicador de cierre (opcional) */}
            <p className="text-center text-white/60 text-sm hidden sm:block">
              Haz clic fuera de la imagen para cerrar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
{
  /* <div className="flex gap-3 pt-4">
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
              </div> */
}
