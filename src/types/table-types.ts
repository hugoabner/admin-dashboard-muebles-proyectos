export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T] | undefined, row: T) => React.ReactNode;
  width?: string;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  rowKey: keyof T;
  enableSearch?: boolean;
  enableFilters?: boolean;
  enableSort?: boolean;
  searchPlaceholder?: string;
}