'use client';

import { TableSort } from '@/store/table-store';
import { TableColumn } from '@/types/table-types';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  sort: TableSort | null;
  onSort?: (sort: TableSort | null) => void;
}

export function TableHeader<T>({ columns, sort, onSort }: TableHeaderProps<T>) {
  const handleSort = (field: string) => {
    if (!onSort) return;

    if (sort?.field === field) {
      if (sort.direction === 'asc') {
        onSort({ field, direction: 'desc' });
      } else {
        onSort(null);
      }
    } else {
      onSort({ field, direction: 'asc' });
    }
  };

  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            scope="col"
            className="px-6 py-3"
            style={{ width: column.width }}
          >
            <div className="flex items-center gap-2">
              <span>{column.label}</span>
              {column.sortable && onSort && (
                <button
                  onClick={() => handleSort(String(column.key))}
                  className="hover:text-gray-900"
                >
                  {sort?.field === column.key ? (
                    sort.direction === 'asc' ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )
                  ) : (
                    <ChevronUpIcon className="h-4 w-4 opacity-30" />
                  )}
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}