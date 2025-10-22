"use client";
import { DropdownCustom, Input } from "@/components/ui";
import { useState } from "react";

export default function FormAtributes() {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const options = [
    { value: "sala", label: "Muebles para Sala" },
    { value: "comedor", label: "Muebles para Comedor" },
    { value: "cocina", label: "Muebles para Cocina" },
    { value: "dormitorio", label: "Muebles para Dormitorio" },
    { value: "baño", label: "Muebles para Baño" },
    { value: "oficina", label: "Muebles de Oficina" },
    { value: "terraza", label: "Muebles para Terraza y Jardín" },
    { value: "infantil", label: "Muebles Infantiles" },
    { value: "almacenamiento", label: "Muebles de Almacenamiento" },
    { value: "decoracion", label: "Muebles Decorativos" },
    { value: "tv", label: "Muebles para TV y Entretenimiento" },
    { value: "vestidor", label: "Muebles para Vestidor y Closet" },
    { value: "entrada", label: "Muebles para Recibidor o Entrada" },
  ];
  return (
    <div className="bg-white">
      <div className="flex w-full">
        <div
          className="w-full space-y-6 p-5 md:p-8 
        bg-white rounded-lg shadow-md border"
        >
          <h2 className="text-2xl font-bold ">Atributos</h2>
          <form className="space-y-4">
            <DropdownCustom
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              label="Categoría de Producto"
              placeholder="Seleccione una categoria . . ."
              searchable
              required
            />
            <Input
              label="Categoría"
              type="text"
              name="category"
              title="categoría"
              // value={formData.username}
              // onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Ingrese la categoría"
              minLength={3}
              maxLength={20}
              // error={touched.username ? errors.username : ""}
              // showCharCount={true}
              required
            />
            <Input
              label="Marca"
              type="text"
              name="brand"
              title="marca"
              // value={formData.password}
              // onChange={handleChange}
              // onBlur={handleBlur}
              placeholder="Ingrese la marca"
              minLength={8}
              maxLength={10}
              // error={touched.password ? errors.password : ""}
              // helperText="Mínimo 8 caracteres, máximo 10"
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
}
