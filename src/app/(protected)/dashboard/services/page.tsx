"use client";
import DropdownCustom from "@/components/ui/dropdown-custom/dropdown-custom";
import { useState } from "react";

export default function Page() {
  
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
    <div className="">
      <DropdownCustom
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        label="Selecciona una opción"
        placeholder="Elige..."
        searchable
        required
      />
    </div>
  );
}
