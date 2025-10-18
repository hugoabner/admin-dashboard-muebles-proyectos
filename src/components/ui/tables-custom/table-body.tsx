'use client';

import { TableColumn } from '@/types/table-types';

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: keyof T;
  loading?: boolean;
}

export function TableBody<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  loading,
}: TableBodyProps<T>) {
  if (loading) {
    return (
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="border-b bg-white">
            {columns.map((col, j) => (
              <td key={j} className="px-6 py-4">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  if (!data.length) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
            No se encontraron resultados
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row) => (
        <tr key={String(row[rowKey])} className="border-b bg-white hover:bg-gray-50">
          {columns.map((column) => (
            <td key={String(column.key)} className="px-6 py-4">
              {column.render
                ? column.render(row[column.key as keyof T], row)
                : String(row[column.key as keyof T] ?? '')}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}