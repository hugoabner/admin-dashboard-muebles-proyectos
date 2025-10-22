"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { Eye, Images, Trash2, X } from "lucide-react";
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
        console.log(file.size);
        const isValidSize = file.size <= 500 * 1024; // 500kb

        if (!isValidType) {
          alert(`${file.name}: Formato no válido. Use .jpg, .jpeg o .png`);
          return false;
        }
        if (!isValidSize) {
          toast.error("El tamaño de la imagen no puede ser mayor a 500kb");
          return false;
        }
        return true;
      });
      const newImages = validFiles.slice(0, 3 - images.length).map((file) => ({
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
    toast.success("Imagen eliminada con exito");
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

  const maxImages = 3;

  return (
    <div className="bg-white">
      <div className="flex w-full">
        <div className="w-full space-y-2 p-5 md:p-8 bg-white rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold ">Imagen de producto</h2>
          <p>Elija una imagen de un producto o simplemente arrastrela</p>

          <section className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">
                Imágenes seleccionadas ({images.length}/{maxImages}):
              </h3>

              {/* SI NO HAY IMÁGENES */}
              {images.length === 0 ? (
                <label
                  htmlFor="fileInput1"
                  className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                >
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`mt-3 border-2 border-dashed rounded-lg flex flex-col 
                      justify-center items-center text-center p-8 transition-colors cursor-pointer ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-blue-400 hover:bg-blue-50"
                    }`}
                  >
                    <Images className="text-gray-500 mb-2" size={48} />
                    <p className="text-sm text-gray-600">
                      Deja tu imagen aquí, o haz clic para navegar{" "}
                      <input
                        id="fileInput1"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                      />
                    </p>
                  </div>
                </label>
              ) : (
                // SI HAY IMÁGENES
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full mt-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                          src={img.preview}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover transition duration-300 group-hover:opacity-80"
                        />
                      </div>
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button
                          onClick={() => viewImage(img.preview)}
                          className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-2 transition"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => removeImage(index)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Cuadro pequeño para subir más imágenes */}
                  {images.length < maxImages && (
                    <label
                      htmlFor="fileInput"
                      className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                    >
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg flex flex-col 
                        justify-center items-center text-center p-4 transition-colors 
                        aspect-square cursor-pointer hover:bg-blue-50 ${
                          isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-blue-400 hover:bg-blue-50"
                        }`}
                      >
                        <Images className="text-gray-500" size={36} />
                        <p className="text-xs text-gray-600 mt-2">
                          Suelta tu imagen aquí o haz clic para buscar{" "}
                          <input
                            id="fileInput"
                            type="file"
                            multiple
                            onChange={(e) => handleFileSelect(e.target.files)}
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                          />
                        </p>
                      </div>
                    </label>
                  )}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Formatos de imagen: <strong>.jpg, .jpeg, .png</strong>, tamaño
              preferido: 1:1, tamaño máximo de archivo: <strong>500 kb</strong>.
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
