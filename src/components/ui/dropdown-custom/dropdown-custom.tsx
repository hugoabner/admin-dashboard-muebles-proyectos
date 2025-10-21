'use client';

import { useRef, useState, type ReactNode } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownCustomProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  searchable?: boolean;
}

export default function DropdownCustom({
  options,
  value,
  onChange,
  placeholder = 'Selecciona una opción',
  className = '',
  disabled = false,
  error,
  label,
  required = false,
  searchable = false,
}: DropdownCustomProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div ref={dropdownRef} className="relative" onBlur={handleBlur}>
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 text-left bg-white border rounded-lg
            flex items-center justify-between gap-2
            transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-blue-500 cursor-pointer'}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isOpen ? 'border-blue-500 ring-2 ring-blue-200' : ''}
          `}
        >
          <span className="flex items-center gap-2 flex-1 truncate">
            {selectedOption?.icon && (
              <span className="flex-shrink-0">{selectedOption.icon}</span>
            )}
            <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
              {selectedOption?.label || placeholder}
            </span>
          </span>
          
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {searchable && (
              <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            )}

            <ul className="py-1">
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-2 text-gray-500 text-sm text-center">
                  No se encontraron resultados
                </li>
              ) : (
                filteredOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className={`
                        w-full px-4 py-2.5 text-left flex items-center gap-2
                        transition-colors duration-150
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}
                        ${option.value === value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-900'}
                      `}
                    >
                      {option.icon && (
                        <span className="flex-shrink-0">{option.icon}</span>
                      )}
                      <span className="flex-1">{option.label}</span>
                      {option.value === value && (
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}