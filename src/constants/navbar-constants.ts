import { handleLogout } from "@/actions/logout-actions";
import { LogOut, Settings, User } from "lucide-react";

export const USER = {
  name: "Admin Panel",
  email: "juan@example.com",
  // image: "/images/profile1.jpg", // opcional
};

// Items del dropdown
export const DROPDOWN_AVATAR_ITEMS = [
  {
    id: "profile",
    label: "Mi Perfil",
    icon: User,
    onClick: () => console.log("Ir a perfil"),
  },
  {
    id: "settings",
    label: "Configuración",
    icon: Settings,
    onClick: () => console.log("Ir a configuración"),
  },
  // {
  //   id: "divider",
  //   label: "",
  //   divider: true,
  // },
  {
    id: "logout",
    label: "Cerrar Sesión",
    icon: LogOut,
    onClick: () => handleLogout(),
    danger: true,
  },
];
