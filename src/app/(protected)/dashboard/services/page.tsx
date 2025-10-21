"use client";
import DropdownCustom from "@/components/ui/dropdown-custom/dropdown-custom";
import { useState } from "react";

export default function Page() {
  
  const [selectedValue, setSelectedValue] = useState<string>("");

  const options = [
    { value: "1", label: "Opción 1" },
    { value: "2", label: "Opción 2", disabled: true },
    { value: "3", label: "Opción 3" },
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
