"use client";
import { useSidebarStore } from "@/store/sidebar-store";
import { HandPlatter, Home, Package, Settings, Users, X } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Package, label: "Productos", href: "/dashboard/products" },
  { icon: HandPlatter, label: "Servicios", href: "/dashboard/services" },
  { icon: Users, label: "Clientes", href: "/dashboard/clients" },
  { icon: Settings, label: "Configuración", href: "/dashboard/configurations" },
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
          fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out flex flex-col justify-between
          
          /* Mobile: Drawer */
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          
          /* Desktop: Collapsed/Expanded */
          ${isCollapsed ? "md:w-20" : "md:w-64"}
          w-64
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4.5 border-b border-gray-200">
           <h1
            className={`font-bold text-xl transition-opacity duration-300 ${
              isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
            }`}
          >
            Admin LJP
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

        {/* Menu Items */}
        <nav className="p-4 space-y-2 h-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
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
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className={`transition-opacity duration-300 ${
                    isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
                  }`}
                >
                  {item.label}
                </span>

                {/* Tooltip para cuando está colapsado */}
                {isCollapsed && (
                  <span className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="flex items-center justify-center p-4.5 border-t border-gray-200">
           <h1
            className={`font-bold text-xl transition-opacity duration-300 ${
              isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
            }`}
          >
            Admin LJP
          </h1>
        </div>
      </aside>
    </>
  );
}
