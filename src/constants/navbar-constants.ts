import { handleLogout } from "@/actions/logout-actions";
import { toast } from "@/lib/toast";
import { LogOut, Settings, User } from "lucide-react";
import { redirect } from "next/navigation";

export const USER = {
  name: "Admin Panel",
  email: "juan@example.com",
  image: "/images/profile3.png", // opcional
};
// Items del dropdown
export const DROPDOWN_AVATAR_ITEMS = [
  {
    id: "profile",
    label: "Mi Perfil",
    icon: User,
    onClick: () => toast.info("Funcionalidad en desarrollo"),
  },
  {
    id: "settings",
    label: "Configuración",
    icon: Settings,
    onClick: () => redirect("/dashboard/configurations"),
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
