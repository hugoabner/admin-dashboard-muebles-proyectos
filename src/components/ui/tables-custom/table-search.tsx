'use client';

import { SearchIcon } from 'lucide-react';

interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TableSearch({ value, onChange, placeholder }: TableSearchProps) {
  return (
    <div className="">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Buscar...'}
        className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}