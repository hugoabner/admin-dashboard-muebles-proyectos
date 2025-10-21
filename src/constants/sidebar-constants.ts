import { NavItem } from "@/components/layout/sidebar/sidebar-main/sidebar-main";
import { HandPlatter, Home, Package, Settings, Users } from "lucide-react";

export const SIDEBAR_LINKS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
    isActive: false,
  },
  {
    label: "Productos",
    href: "/dashboard/products",
    icon: Package,
    isActive: false,
  },
  {
    label: "Servicios",
    href: "/dashboard/services",
    icon: HandPlatter,
    isActive: false,
  },
  {
    label: "Clientes",
    href: "/dashboard/clients",
    icon: Users,
    isActive: false,
  },
  {
    label: "Configuración",
    href: "/dashboard/configurations",
    icon: Settings,
    isActive: false,
  },
];