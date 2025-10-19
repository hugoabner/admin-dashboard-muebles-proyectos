"use client";
import { COLUMNS_CLIENT_TABLE } from "@/constants/table-constants";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function Page() {
  const CLIENT_DATA = [
    {
      id: 1,
      name: "Ana Pérez",
      email: "ana.perez@example.com",
      email_verified: true,
      image_url:
        "https://lh3.googleusercontent.com/a/ACg8ocKCclWEzy6TU-XpQjbWUl_IJUkUg7ZH-PzwQCeSvvlkLKWAhQ=s96-c",
    },
    {
      id: 2,
      name: "Luis Gómez",
      email: "luis.gomez@example.com",
      email_verified: false,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 3,
      name: "Carla Ruiz",
      email: "carla.ruiz@example.com",
      email_verified: true,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 4,
      name: "Miguel Torres",
      email: "miguel.torres@example.com",
      email_verified: false,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 5,
      name: "Sofía Castillo",
      email: "sofia.castillo@example.com",
      email_verified: true,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 6,
      name: "Diego Fernández",
      email: "diego.fernandez@example.com",
      email_verified: false,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 7,
      name: "María López",
      email: "maria.lopez@example.com",
      email_verified: true,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 8,
      name: "Jorge Salazar",
      email: "jorge.salazar@example.com",
      email_verified: true,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 9,
      name: "Patricia Ramos",
      email: "patricia.ramos@example.com",
      email_verified: false,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 10,
      name: "Ricardo Medina",
      email: "ricardo.medina@example.com",
      email_verified: true,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 11,
      name: "Patricia Ramos",
      email: "patricia.ramos@example.com",
      email_verified: false,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
    {
      id: 12,
      name: "Ricardo Medina",
      email: "ricardo.medina@example.com",
      email_verified: true,
      image_url: "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
    },
  ];

  const [query, setQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLIENT_DATA;
    return CLIENT_DATA.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
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
          Clientes registrados
        </h1>
        <div className="flex gap-2 items-center">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPageIndex(0);
            }}
            placeholder="Buscar por nombre, rol, email o estado..."
            className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </header>
      <div className="overflow-x-auto w-full">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {COLUMNS_CLIENT_TABLE.map((column) => (
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
              current.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">
                    {row.id}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">
                    {row.email}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`
                      inline-flex items-center px-2.5 py-0.5 
                      rounded-full text-xs font-medium 
                      ${
                        row.email_verified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {row.email_verified ? "Verificado" : "No verificado"}
                    </span>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                    <Image
                      src={row.image_url}
                      alt={row.name}
                      width={50}
                      height={50}
                      className="w-8 h-8 rounded-full"
                    />
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap  text-sm">
                    <button className="px-3 py-1 rounded-md border text-sm">
                      Ver
                    </button>
                  </td>
                </tr>
              ))
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
