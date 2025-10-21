"use client";
import { useSidebarStore } from "@/store/sidebar-store";
import {
  HandPlatter,
  Home,
  LucideIcon,
  Package,
  Settings,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  isActive?: boolean;
  // items?: {
  // 	title: string;
  // 	url: string;
  // }[];
};

const SIDEBAR_LINKS: NavItem[] = [
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

export default function SidebarDashboard() {
  const { isOpen, isCollapsed, closeSidebar } = useSidebarStore();
  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen bg-white  border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out flex flex-col justify-between overflow-visible
          /* Mobile: Drawer */
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          /* Desktop: Collapsed/Expanded */
          ${isCollapsed ? "md:w-16" : "md:w-56"}
          w-56
          `}
      >
        <div className=" h-full flex flex-col justify-between">
          {/* Header */}
          <section className="px-4">
            <div className="flex  items-center justify-between h-20">
              <h1
                className={`font-bold text-xl transition-opacity duration-300 
                  `}
                // ${isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"}
              >
                {isCollapsed ? "JLP" : "Admin Panel"}
              </h1>
              {/* Botón cerrar solo en mobile */}
              <button
                onClick={closeSidebar}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Cerrar sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* Body */}
          <section className=" h-full">
            <nav className="p-4 space-y-2 h-full">
              {SIDEBAR_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => closeSidebar()}
                  className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg
                  hover:bg-gray-100 transition-colors group
                  ${isCollapsed ? "md:justify-center" : ""}
                `}
                >
                  {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                  <span
                    className={`transition-opacity duration-300 ${
                      isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Tooltip para cuando está colapsado */}
                  {isCollapsed && (
                    <span className="hidden md:block absolute 
                    left-full px-2 py-1 bg-gray-900 
                    text-white text-sm rounded opacity-0 
                    group-hover:opacity-100 transition-opacity 
                    whitespace-nowrap pointer-events-none">
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </section>

          {/* Footer */}
          <section className="">
            <h1
              className={`font-bold text-xl transition-opacity duration-300 ${
                isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
              }`}
            >
              Admin LJP
            </h1>
          </section>
        </div>
      </aside>
    </>
  );
}

/* <aside
        className={`
          md:sticky top-0 left-0 h-screen bg-white 
          border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out 
          flex flex-col justify-between
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          
          ${isCollapsed ? "md:w-20" : "md:w-64"}
        `}
      ></aside> 
*/
