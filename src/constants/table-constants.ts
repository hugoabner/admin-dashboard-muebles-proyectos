export const COLUMNS_CLIENT_TABLE = [
  { key: "id", label: "ID", className: "w-48" },
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
  { key: "email_verified", label: "Email Verificado" },
  { key: "image_url", label: "Imagen" },
  {
	key: "acciones",
	label: "Acciones",
	className: "flex items-center justify-center",
  },
];

export const COLUMNS_RESERVATION_TABLE = [
  { key: "id", label: "ID", className: "w-48" },
  { key: "fecha", label: "Fecha" },
  { key: "cliente", label: "Nombre" },
  { key: "numeroOrden", label: "Orden" },
  { key: "precio", label: "Precio" },
  { key: "estado", label: "Estado" },
  {
	key: "acciones",
	label: "Acciones",
	className: "flex items-center justify-center",
  },
];