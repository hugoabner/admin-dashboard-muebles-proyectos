'use client';

import { DataTable } from "@/components/ui/tables-custom/data-table";
import { Producto } from "@/constants/products-constamt";
import { TableConfig } from '@/types/table-types';


interface DataTableWrapperProps {
  data: Producto[];
  total: number;
  initialPage: number;
  initialPageSize: number;
}

export function DataTableWrapper({
  data,
  total,
  initialPage,
  initialPageSize,
}: DataTableWrapperProps) {

  const tableConfig: TableConfig<Record<string, unknown>> = {
    columns: [
      { 
        key: 'nombre', 
        label: 'Nombre', 
        sortable: true, 
        filterable: true, 
        width: '100px'
      },
      {
        key: 'precio',
        label: 'Precio',
        sortable: true,
        render: (value) => `$${Number(value as unknown as number).toFixed(2)}`,
        width: '120px',
      },
      {
        key: 'stock',
        label: 'Stock',
        sortable: true,
        width: '100px',
        render: (value) => {
          const num = value == null ? 0 : Number(value as unknown as number);
          return (
            <span className={num < 10 ? 'text-red-600 font-semibold' : ''}>
              {(value as unknown as number) ?? 0}
            </span>
          );
        },
      },
      { key: 'categoria', label: 'Categoría', filterable: true, width: '150px' },
      {
        key: 'createdAt',
        label: 'Fecha',
        sortable: true,
        width: '130px',
        render: (value) => {
          if (value == null) return '';
          if (typeof value === 'boolean') return '';
          const date = new Date(value as string | number | Date);
          return date.toLocaleDateString('es-ES');
        },
      },
    ],
    rowKey: 'id',
    enableSearch: true,
    enableFilters: true,
    enableSort: true,
    searchPlaceholder: 'Buscar productos...',
  };

  return (
    <DataTable
      data={data as unknown as Record<string, unknown>[]}      total={total}
      config={tableConfig}
      initialPage={initialPage}
      initialPageSize={initialPageSize}
    />
  );
}