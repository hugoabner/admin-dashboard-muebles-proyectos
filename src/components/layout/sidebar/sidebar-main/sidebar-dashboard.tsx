"use client";
import { SIDEBAR_GROUPS } from "@/constants/sidebar-constants";
import { useSidebarStore } from "@/store/sidebar-store";
import { X } from "lucide-react";
import SidebarMenuItem from "./sidebar-menu-item";

export default function SidebarDashboard() {
  const { isOpen, isCollapsed, closeSidebar, expandedGroup, toggleGroup } =
    useSidebarStore();
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
          fixed md:sticky top-0 left-0 h-svh bg-white  border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out flex flex-col justify-between
          /* Mobile: Drawer */
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          /* Desktop: Collapsed/Expanded */
          ${isCollapsed ? "md:w-16" : "md:w-56"}
          w-56
          `}
      >
        <div className=" h-full flex flex-col justify-between">
          {/* Header */}
          <section className="px-4 ">
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
          <section className={`h-full overflow-y-auto`}>
            <nav className="p-4 space-y-1 ">
              {SIDEBAR_GROUPS.map((group) => (
                <div key={group.title} className="mb-4">
                  {/* Título del grupo */}
                  <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 
                  uppercase tracking-wider transition-opacity duration-300">
                    {/* Tres puntos cuando está colapsado (solo en md+) */}
                    <span
                      className={`${
                        isCollapsed ? "md:block hidden" : "hidden"
                      } text-center`}
                    >
                      •••
                    </span>
                    {/* Título normal cuando está expandido */}
                    <span className={`${isCollapsed ? "md:hidden" : ""}`}>
                      {group.title}
                    </span>
                  </h3>
                  {/* Items del grupo */}
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <SidebarMenuItem
                        key={item.href || item.label}
                        item={item}
                        isCollapsed={isCollapsed}
                        onCloseSidebar={closeSidebar}
                        isExpanded={expandedGroup === item.label}
                        onToggle={() => toggleGroup(item.label)}
                      />
                    ))}
                  </div>
                </div>
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
