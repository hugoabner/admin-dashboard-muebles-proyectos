"use client";
import { COLUMNS_RESERVATION_TABLE } from "@/constants/table-constants";
import { useMemo, useState } from "react";

const RESERVATIONS_DATA = [
  {
    id: 1,
    fecha: "2025-10-20",
    cliente: "Carlos Ramírez",
    numeroOrden: "ORD-1001",
    precio: 1250.5,
    estado: "Confirmada",
  },
  {
    id: 2,
    fecha: "2025-10-21",
    cliente: "María López",
    numeroOrden: "ORD-1002",
    precio: 890.0,
    estado: "Pendiente",
  },
  {
    id: 3,
    fecha: "2025-10-22",
    cliente: "José Fernández",
    numeroOrden: "ORD-1003",
    precio: 1575.75,
    estado: "Cancelada",
  },
  {
    id: 4,
    fecha: "2025-10-23",
    cliente: "Lucía Torres",
    numeroOrden: "ORD-1004",
    precio: 2230.0,
    estado: "Confirmada",
  },
  {
    id: 5,
    fecha: "2025-10-24",
    cliente: "Andrés Castillo",
    numeroOrden: "ORD-1005",
    precio: 650.25,
    estado: "Pendiente",
  },
  {
    id: 6,
    fecha: "2025-10-25",
    cliente: "Valeria Gómez",
    numeroOrden: "ORD-1006",
    precio: 1999.99,
    estado: "Confirmada",
  },
  {
    id: 7,
    fecha: "2025-10-26",
    cliente: "Fernando Díaz",
    numeroOrden: "ORD-1007",
    precio: 720.0,
    estado: "Pendiente",
  },
  {
    id: 8,
    fecha: "2025-10-27",
    cliente: "Rosa Martínez",
    numeroOrden: "ORD-1008",
    precio: 1280.5,
    estado: "Cancelada",
  },
  {
    id: 9,
    fecha: "2025-10-28",
    cliente: "Javier Morales",
    numeroOrden: "ORD-1009",
    precio: 1890.0,
    estado: "Confirmada",
  },
  {
    id: 10,
    fecha: "2025-10-29",
    cliente: "Camila Herrera",
    numeroOrden: "ORD-1010",
    precio: 940.75,
    estado: "Pendiente",
  },
  {
    id: 11,
    fecha: "2025-10-30",
    cliente: "Sofía Paredes",
    numeroOrden: "ORD-1011",
    precio: 1340.0,
    estado: "Confirmada",
  },
  {
    id: 12,
    fecha: "2025-10-31",
    cliente: "Ricardo Núñez",
    numeroOrden: "ORD-1012",
    precio: 1150.3,
    estado: "Pendiente",
  },
  {
    id: 13,
    fecha: "2025-11-01",
    cliente: "Natalia Ruiz",
    numeroOrden: "ORD-1013",
    precio: 2450.0,
    estado: "Confirmada",
  },
  {
    id: 14,
    fecha: "2025-11-02",
    cliente: "Luis Cabrera",
    numeroOrden: "ORD-1014",
    precio: 890.9,
    estado: "Cancelada",
  },
  {
    id: 15,
    fecha: "2025-11-03",
    cliente: "Elena Castro",
    numeroOrden: "ORD-1015",
    precio: 1780.25,
    estado: "Confirmada",
  },
  {
    id: 16,
    fecha: "2025-11-04",
    cliente: "Daniel Pérez",
    numeroOrden: "ORD-1016",
    precio: 1620.0,
    estado: "Pendiente",
  },
  {
    id: 17,
    fecha: "2025-11-05",
    cliente: "Gabriela Ramos",
    numeroOrden: "ORD-1017",
    precio: 2120.75,
    estado: "Confirmada",
  },
  {
    id: 18,
    fecha: "2025-11-06",
    cliente: "Miguel Vargas",
    numeroOrden: "ORD-1018",
    precio: 995.5,
    estado: "Cancelada",
  },
  {
    id: 19,
    fecha: "2025-11-07",
    cliente: "Adriana Flores",
    numeroOrden: "ORD-1019",
    precio: 1390.0,
    estado: "Pendiente",
  },
  {
    id: 20,
    fecha: "2025-11-08",
    cliente: "Pablo Medina",
    numeroOrden: "ORD-1020",
    precio: 2500.0,
    estado: "Confirmada",
  },
];

export default function TableReservations() {

  const [query, setQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
	const q = query.trim().toLowerCase();
	if (!q) return RESERVATIONS_DATA;
	return RESERVATIONS_DATA.filter(
	  (r) =>
		r.cliente.toLowerCase().includes(q) || r.estado.toLowerCase().includes(q)
	  // r..toLowerCase().includes(q) ||
	  // r.status.toLowerCase().includes(q)
	);
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice(
	pageIndex * pageSize,
	pageIndex * pageSize + pageSize
  );

  function prev() {
	setPageIndex((p) => Math.max(0, p - 1));
  }

  function next() {
	setPageIndex((p) => Math.min(pageCount - 1, p + 1));
  }

  return (
	<div className="mx-auto w-full">
	  <header className="flex items-center justify-between mb-4">
		<h1 className="text-sm md:text-2xl font-semibold">
		  Reservas registradas
		</h1>
		<div className="flex gap-2 items-center">
		  <input
			value={query}
			onChange={(e) => {
			  setQuery(e.target.value);
			  setPageIndex(0);
			}}
			placeholder="Buscar por nombre, rol, email o estado..."
			className="px-3 py-2 border rounded-md shadow-sm 
			focus:outline-none focus:ring-2 focus:ring-indigo-300"
		  />
		</div>
	  </header>
	  <div className="overflow-x-auto w-full">
		<table className="w-full divide-y divide-gray-200">
		  <thead className="bg-gray-100">
			<tr>
			  {COLUMNS_RESERVATION_TABLE.map((column) => (
				<th
				  key={column.key}
				  className="px-6 py-3 text-left text-sm font-medium text-gray-700"
				>
				  {column.label}
				</th>
			  ))}
			</tr>
		  </thead>
		  <tbody className="bg-white divide-y divide-gray-100">
			{current.length === 0 ? (
			  <tr>
				<td
				  colSpan={6}
				  className="px-6 py-52 text-center text-sm text-gray-500"
				>
				  No se encontraron resultados.
				</td>
			  </tr>
			) : (
			  current.map((row) => {
				let statusClass = "bg-gray-100 text-gray-800 border";
				if (row.estado === "Confirmada") {
				  statusClass = "bg-green-100 text-green-800 border";
				} else if (row.estado === "Cancelada") {
				  statusClass = "bg-red-100 text-red-800 border";
				} else if (row.estado === "Pendiente") {
				  statusClass = "bg-yellow-100 text-yellow-800 border";
				}

				return (
				  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
					<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">
					  {row.id}
					</td>
					<td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
					  {row.fecha}
					</td>
					<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
					  {row.cliente}
					</td>
					<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
					  {row.numeroOrden}
					</td>
					<td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
					  {row.precio}
					</td>
					<td className="px-6 py-2 whitespace-nowrap text-sm">
					  <span
						className={`
						inline-flex items-center px-2.5 py-0.5 
						rounded-full text-xs font-medium 
						${statusClass}`}
					  >
						{row.estado}
					  </span>
					</td>
					<td className="px-6 py-2 whitespace-nowrap  text-sm">
					  <button className="px-3 py-1 rounded-md border text-sm">
						Ver
					  </button>
					</td>
				  </tr>
				);
			  })
			)}
		  </tbody>
		</table>
	  </div>

	  <div className="flex flex-col  sm:flex-row items-center justify-center sm:justify-between w-full py-2 bg-gray-100">
		<div className="text-sm text-gray-600">
		  Mostrando{" "}
		  <span className="font-medium">
			{filtered.length === 0 ? 0 : pageIndex * pageSize + 1}
		  </span>{" "}
		  a{" "}
		  <span className="font-medium">
			{Math.min((pageIndex + 1) * pageSize, filtered.length)}
		  </span>{" "}
		  de <span className="font-medium">{filtered.length}</span>
		</div>
		<div className="flex items-center gap-2">
		  <button
			onClick={prev}
			disabled={pageIndex === 0}
			className="px-3 py-1 rounded-md border disabled:opacity-50"
		  >
			Anterior
		  </button>
		  <div className="text-sm">
			Página {pageIndex + 1} / {pageCount}
		  </div>
		  <button
			onClick={next}
			disabled={pageIndex >= pageCount - 1}
			className="px-3 py-1 rounded-md border disabled:opacity-50"
		  >
			Siguiente
		  </button>
		</div>
		<div>
		  <select
			value={pageSize}
			onChange={(e) => {
			  setPageSize(Number(e.target.value));
			  setPageIndex(0);
			}}
			className="px-2 py-2 border rounded-md"
		  >
			<option value={5}>5 / página</option>
			<option value={10}>10 / página</option>
			<option value={25}>25 / página</option>
		  </select>
		</div>
	  </div>
	</div>
  );
}

