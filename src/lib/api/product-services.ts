import { PRODUCTOS_MOCK, Producto } from '@/constants/products-constamt';
import { TableFilter } from '@/store/table-store';

interface FilterParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: TableFilter[];
}

export function getProductosPaginados(params: FilterParams) {
  let productos = [...PRODUCTOS_MOCK];

  // Aplicar búsqueda global
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    productos = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchLower) ||
        p.categoria.toLowerCase().includes(searchLower) ||
        p.descripcion.toLowerCase().includes(searchLower)
    );
  }

  // Aplicar filtros específicos
  if (params.filters && params.filters.length > 0) {
    params.filters.forEach((filter) => {
      productos = productos.filter((p) => {
        const value = String(p[filter.field as keyof Producto] || '').toLowerCase();
        const filterValue = filter.value.toLowerCase();

        switch (filter.operator) {
          case 'equals':
            return value === filterValue;
          case 'startsWith':
            return value.startsWith(filterValue);
          case 'endsWith':
            return value.endsWith(filterValue);
          case 'contains':
          default:
            return value.includes(filterValue);
        }
      });
    });
  }

  // Aplicar ordenamiento
  if (params.sortBy) {
    productos.sort((a, b) => {
      const aValue = a[params.sortBy as keyof Producto];
      const bValue = b[params.sortBy as keyof Producto];

      let comparison = 0;
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return params.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  // Calcular paginación
  const total = productos.length;
  const totalPages = Math.ceil(total / params.pageSize);
  const start = (params.page - 1) * params.pageSize;
  const end = start + params.pageSize;
  const paginatedData = productos.slice(start, end);

  return {
    data: paginatedData,
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages,
    },
  };
}

export function getProductoById(id: string): Producto | undefined {
  return PRODUCTOS_MOCK.find((p) => p.id === id);
}

export function getCategorias(): string[] {
  return Array.from(new Set(PRODUCTOS_MOCK.map((p) => p.categoria))).sort();
}

export function getEstadisticas() {
  return {
    total: PRODUCTOS_MOCK.length,
    activos: PRODUCTOS_MOCK.filter((p) => p.activo).length,
    inactivos: PRODUCTOS_MOCK.filter((p) => !p.activo).length,
    stockTotal: PRODUCTOS_MOCK.reduce((sum, p) => sum + p.stock, 0),
    valorInventario: PRODUCTOS_MOCK.reduce((sum, p) => sum + p.precio * p.stock, 0),
    categorias: getCategorias().length,
  };
}