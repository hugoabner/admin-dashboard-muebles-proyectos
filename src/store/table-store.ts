import { create } from 'zustand';

export interface TableFilter {
  field: string;
  value: string;
  operator?: 'contains' | 'equals' | 'startsWith' | 'endsWith';
}

export interface TableSort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface TableState {
  page: number;
  pageSize: number;
  filters: TableFilter[];
  sort: TableSort | null;
  search: string;
  
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setFilters: (filters: TableFilter[]) => void;
  addFilter: (filter: TableFilter) => void;
  removeFilter: (field: string) => void;
  setSort: (sort: TableSort | null) => void;
  setSearch: (search: string) => void;
  resetFilters: () => void;
}

export const createTableStore = (initialPageSize: number = 10) =>
  create<TableState>((set) => ({
    page: 1,
    pageSize: initialPageSize,
    filters: [],
    sort: null,
    search: '',

    setPage: (page) => set({ page }),
    setPageSize: (pageSize) => set({ pageSize, page: 1 }),
    setFilters: (filters) => set({ filters, page: 1 }),
    addFilter: (filter) =>
      set((state) => ({
        filters: [...state.filters.filter((f) => f.field !== filter.field), filter],
        page: 1,
      })),
    removeFilter: (field) =>
      set((state) => ({
        filters: state.filters.filter((f) => f.field !== field),
        page: 1,
      })),
    setSort: (sort) => set({ sort, page: 1 }),
    setSearch: (search) => set({ search, page: 1 }),
    resetFilters: () => set({ filters: [], search: '', sort: null, page: 1 }),
  }));