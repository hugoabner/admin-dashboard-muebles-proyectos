import { TableFilter, TableSort } from '@/store/table-store';

export function buildTableQueryParams(params: {
  page: number;
  pageSize: number;
  filters: TableFilter[];
  sort: TableSort | null;
  search: string;
}): URLSearchParams {
  const searchParams = new URLSearchParams();

  searchParams.set('page', params.page.toString());
  searchParams.set('pageSize', params.pageSize.toString());

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.sort) {
    searchParams.set('sortBy', params.sort.field);
    searchParams.set('sortOrder', params.sort.direction);
  }

  params.filters.forEach((filter, index) => {
    searchParams.set(`filters[${index}][field]`, filter.field);
    searchParams.set(`filters[${index}][value]`, filter.value);
    searchParams.set(`filters[${index}][operator]`, filter.operator || 'contains');
  });

  return searchParams;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}