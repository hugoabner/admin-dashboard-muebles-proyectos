'use client';

import { debounce } from '@/lib/utils/table.utils';
import { createTableStore } from '@/store/table-store';
import { TableConfig } from '@/types/table-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { TableBody } from './table-body';
import { TableFilters } from './table-filters';
import { TableHeader } from './table-header';
import { TableSearch } from './table-search';
import { TablePagination } from './table.pagination';

interface DataTableProps<T> {
  data: T[];
  total: number;
  config: TableConfig<T>;
  loading?: boolean;
  initialPage?: number;
  initialPageSize?: number;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  total,
  config,
  loading = false,
  initialPage = 1,
  initialPageSize = 10,
}: DataTableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const useTableStore = useMemo(
    () => createTableStore(initialPageSize),
    [initialPageSize]
  );

  const {
    page,
    pageSize,
    filters,
    sort,
    search,
    setPage,
    setPageSize,
    setFilters,
    setSort,
    setSearch,
    resetFilters,
  } = useTableStore();

  // Sincronizar URL con el estado
  const updateURL = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set('page', page.toString());
    params.set('pageSize', pageSize.toString());
    
    if (search) params.set('search', search);
    else params.delete('search');
    
    if (sort) {
      params.set('sortBy', sort.field);
      params.set('sortOrder', sort.direction);
    } else {
      params.delete('sortBy');
      params.delete('sortOrder');
    }

    // Limpiar filtros anteriores
    Array.from(params.keys()).forEach(key => {
      if (key.startsWith('filter_')) params.delete(key);
    });

    // Añadir nuevos filtros
    filters.forEach(filter => {
      params.set(`filter_${filter.field}`, filter.value);
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pageSize, search, sort, filters, pathname, router, searchParams]);

  // Debounce para actualizaciones de búsqueda
  const debouncedUpdateURL = useMemo(
    () => debounce(updateURL, 500),
    [updateURL]
  );

  useEffect(() => {
    debouncedUpdateURL();
  }, [search, debouncedUpdateURL]);

  useEffect(() => {
    updateURL();
  }, [page, pageSize, sort, filters]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full space-y-4">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {config.enableSearch && (
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder={config.searchPlaceholder}
          />
        )}
        
        {config.enableFilters && (
          <TableFilters
            columns={config.columns.filter(col => col.filterable)}
            filters={filters}
            onFilterChange={setFilters}
            onReset={resetFilters}
          />
        )}
      </div>

      {/* Tabla */}
      <div className=" overflow-x-auto rounded-lg border border-gray-200 shadow-sm ">
        <table className="w-full text-left text-sm">
          <TableHeader
            columns={config.columns}
            sort={sort}
            onSort={config.enableSort ? setSort : undefined}
          />
          <TableBody
            data={data}
            columns={config.columns}
            rowKey={config.rowKey}
            loading={loading}
          />
        </table>
      </div>

      {/* Paginación */}
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}