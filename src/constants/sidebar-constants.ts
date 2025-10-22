import { SidebarGroup } from "@/components/layout/sidebar/sidebar-main/sidebar-main";
import {
  CreditCard,
  HandPlatter,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
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
    ],
  },
  {
    title: "Ecommerce",
    items: [
      {
        label: "Ecommerce",
        icon: ShoppingCart,
        href: "",
        isActive: false,
        subItems: [
          {
            label: "Home",
            href: "/ecommerce/home",
            icon: Home,
          },
          {
            label: "Products",
            href: "/ecommerce/products",
          },
          {
            label: "Orders",
            href: "/ecommerce/orders",
          },
        ],
      },
    ],
  },
  {
    title: "Banking",
    items: [
      {
        label: "Banking",
        icon: CreditCard,
        href: "",
        isActive: false,
        subItems: [
          {
            label: "Home",
            href: "/banking/home",
            icon: Home,
          },
          {
            label: "Transactions",
            href: "/banking/transactions",
          },
          {
            label: "Accounts",
            href: "/banking/accounts",
          },
        ],
      },
    ],
  },
  {
    title: "Bankssaaaing",
    items: [
      {
        label: "Baaankiang",
        icon: CreditCard,
        href: "",
        isActive: false,
        subItems: [
          {
            label: "Homae",
            href: "/baanking/home",
            icon: Home,
          },
          {
            label: "Tranasactions",
            href: "/baanking/transactions",
          },
          {
            label: "Accaounts",
            href: "/banaking/accounts",
          },
        ],
      },
    ],
  },
  {
    title: "Bankiaansg",
    items: [
      {
        label: "Bankaaing",
        icon: CreditCard,
        href: "",
        isActive: false,
        subItems: [
          {
            label: "Homaae",
            href: "/baaanking/home",
            icon: Home,
          },
          {
            label: "Transaaactions",
            href: "/bankiaang/transactions",
          },
          {
            label: "Accoaaunts",
            href: "/banking/accounts",
          },
        ],
      },
    ],
  },
];
