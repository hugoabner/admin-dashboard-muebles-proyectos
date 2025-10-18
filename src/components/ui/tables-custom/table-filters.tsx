'use client';

import { TableFilter } from '@/store/table-store';
import { TableColumn } from '@/types/table-types';
import { FilterIcon, PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

interface TableFiltersProps<T> {
  columns: TableColumn<T>[];
  filters: TableFilter[];
  onFilterChange: (filters: TableFilter[]) => void;
  onReset: () => void;
}

export function TableFilters<T>({
  columns,
  filters,
  onFilterChange,
  onReset,
}: TableFiltersProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [operator, setOperator] = useState<'contains' | 'equals' | 'startsWith' | 'endsWith'>('contains');

  const handleAddFilter = () => {
    if (!selectedField || !filterValue) return;

    const newFilter: TableFilter = {
      field: selectedField,
      value: filterValue,
      operator,
    };

    const existingFilterIndex = filters.findIndex(f => f.field === selectedField);
    
    if (existingFilterIndex >= 0) {
      const updatedFilters = [...filters];
      updatedFilters[existingFilterIndex] = newFilter;
      onFilterChange(updatedFilters);
    } else {
      onFilterChange([...filters, newFilter]);
    }

    setSelectedField('');
    setFilterValue('');
    setOperator('contains');
  };

  const handleRemoveFilter = (field: string) => {
    onFilterChange(filters.filter(f => f.field !== field));
  };

  const getColumnLabel = (field: string) => {
    return columns.find(col => String(col.key) === field)?.label || field;
  };

  const operatorLabels = {
    contains: 'Contiene',
    equals: 'Igual a',
    startsWith: 'Comienza con',
    endsWith: 'Termina con',
  };

  return (
    <div className="">
      {/* Botón de filtros */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <FilterIcon className="h-4 w-4" />
        Filtros
        {filters.length > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {filters.length}
          </span>
        )}
      </button>

      {/* Panel de filtros */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 z-50 mt-2 w-96 rounded-lg border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  Filtros avanzados
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Formulario de nuevo filtro */}
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Campo
                  </label>
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar campo</option>
                    {columns.map((column) => (
                      <option key={String(column.key)} value={String(column.key)}>
                        {column.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Operador
                  </label>
                  <select
                    value={operator}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'contains' || val === 'equals' || val === 'startsWith' || val === 'endsWith') {
                        setOperator(val);
                      }
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="contains">Contiene</option>
                    <option value="equals">Igual a</option>
                    <option value="startsWith">Comienza con</option>
                    <option value="endsWith">Termina con</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">
                    Valor
                  </label>
                  <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddFilter()}
                    placeholder="Ingrese un valor..."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleAddFilter}
                  disabled={!selectedField || !filterValue}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PlusIcon className="h-4 w-4" />
                  Agregar filtro
                </button>
              </div>

              {/* Lista de filtros activos */}
              {filters.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-700">
                      Filtros activos
                    </h4>
                    <button
                      onClick={onReset}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Limpiar todos
                    </button>
                  </div>

                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <div
                        key={filter.field}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                      >
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900">
                            {getColumnLabel(filter.field)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {operatorLabels[filter.operator || 'contains']}: {filter.value}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFilter(filter.field)}
                          className="ml-2 text-gray-400 hover:text-red-600"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer con información */}
            {filters.length === 0 && (
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-500">
                  No hay filtros aplicados. Agrega uno para comenzar.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Chips de filtros activos (fuera del dropdown) */}
      {filters.length > 0 && !isOpen && (
        <div className="absolute left-0 top-full z-30 mt-2 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <div
              key={filter.field}
              className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
            >
              <span>
                {getColumnLabel(filter.field)}: {filter.value}
              </span>
              <button
                onClick={() => handleRemoveFilter(filter.field)}
                className="hover:text-blue-900"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}