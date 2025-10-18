import { buildTableQueryParams } from "@/lib/utils/table.utils";
import { Suspense } from "react";
import { DataTableWrapper } from "./_components/data-table-wrapper";



async function getProductos(searchParams: Props) {
  const params = buildTableQueryParams({
    page: Number(searchParams.page) || 1,
    pageSize: Number(searchParams.pageSize) || 10,
    search: searchParams.search || "",
    sort: searchParams.sortBy
      ? {
          field: searchParams.sortBy,
          direction: searchParams.sortOrder as "asc" | "desc",
        }
      : null,
    filters: [], // Construir desde searchParams si es necesario
  });

  // Usar la API local en lugar de una externa
  const baseUrl = "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al cargar productos");
  }

  return res.json();
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Props = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
export default async function ProductosPage(props: {
  searchParams: SearchParams;
}) {
  const { page, pageSize, search, sortBy, sortOrder } =
    await props.searchParams;

  const { data, pagination } = await getProductos({
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
  } as Props);
  return (
    <div className="container mx-auto">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold">Productos</h1>
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">{pagination.total}</span>{" "}
          productos
        </div>
      </div>

      <Suspense fallback={<div className="text-black w-3xl">Cargando...</div>}>
        <DataTableWrapper
          data={data}
          total={pagination.total}
          initialPage={pagination.page}
          initialPageSize={pagination.pageSize}
        />
      </Suspense>
    </div>
  );
}
