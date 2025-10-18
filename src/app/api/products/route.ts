
import { getProductosPaginados } from '@/lib/api/product-services';
import { TableFilter } from '@/store/table-store';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extraer parámetros
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';

    // Extraer filtros
    const filters: TableFilter[] = [];
    let filterIndex = 0;
    while (searchParams.has(`filters[${filterIndex}][field]`)) {
      const field = searchParams.get(`filters[${filterIndex}][field]`);
      const value = searchParams.get(`filters[${filterIndex}][value]`);
      const operator = searchParams.get(`filters[${filterIndex}][operator]`) as 'contains' | 'equals' | 'startsWith' | 'endsWith';

      if (field && value) {
        filters.push({
          field,
          value,
          operator: operator || 'contains',
        });
      }
      filterIndex++;
    }

    // Simular delay de red (opcional)
    await new Promise((resolve) => setTimeout(resolve, 300));

    const result = getProductosPaginados({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      filters,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error en API productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}