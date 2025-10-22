"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import type { NavItem } from "./sidebar-main";

interface SidebarMenuItemProps {
  item: NavItem;
  isCollapsed: boolean;
  onCloseSidebar: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SidebarMenuItem({
  item,
  isCollapsed,
  onCloseSidebar,
  isExpanded,
  onToggle,
}: SidebarMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const pathname = usePathname();

  const hasSubItems = item.subItems && item.subItems.length > 0;

  // Si no tiene subItems, renderiza un Link normal
  if (!hasSubItems && item.href) {
    const isActive = pathname === item.href;

    return (
      <Link
        href={item.href}
        onClick={onCloseSidebar}
        className={`
          relative flex items-center gap-3 px-3 py-2 rounded-lg
          transition-colors group
          ${
            isActive
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "hover:bg-gray-100"
          }
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
          <span
            style={{
              left: "64px", // Ancho del sidebar colapsado (w-16 = 64px)
              top: "auto",
            }}
            className="hidden md:block fixed z-[100] left-full px-2 py-1 
            bg-gray-900 text-white text-sm rounded opacity-0 
            group-hover:opacity-100 transition-opacity 
            whitespace-nowrap pointer-events-none"
          >
            {item.label}
          </span>
        )}
      </Link>
    );
  }

  // Si tiene subItems, renderiza un menú desplegable
  const isAnySubItemActive = item.subItems?.some(
    (subItem) => pathname === subItem.href
  );

  const handleMouseEnter = () => {
    if (isCollapsed) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 200);
    }
  };

  return (
    <div
      className={`relative group ${isCollapsed ? "md:flex" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => !isCollapsed && onToggle()}
        className={`
          w-full flex items-center gap-3 px-3 py-2 rounded-lg
          transition-colors group
          ${
            isAnySubItemActive
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "hover:bg-gray-100"
          }
          ${isCollapsed ? "md:justify-center" : "justify-between"}
        `}
      >
        <div className="flex items-center gap-3">
          {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
          <span
            className={`transition-opacity duration-300 ${
              isCollapsed ? "md:opacity-0 md:hidden" : "opacity-100"
            }`}
          >
            {item.label}
          </span>
        </div>

        {!isCollapsed && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Dropdown flotante con fixed */}
      {isCollapsed && isHovered && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden md:block fixed z-[100] left-full px-2 py-1 
            bg-white border border-gray-200 text-sm rounded opacity-0 
            group-hover:opacity-100 transition-opacity 
            whitespace-nowrap"
        >
          <div className=" rounded-lg p-2 min-w-[180px]">
            <div className="font-semibold px-2 py-1 text-sm 
            border-gray-700 mb-1 border-b">
              {item.label}
            </div>
            {item.subItems?.map((subItem) => {
              const isActiveSubItem = pathname === subItem.href;
              return (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  onClick={onCloseSidebar}
                  className={`
                    flex items-center gap-2 px-2 py-1.5 rounded 
                    transition-colors text-sm
                    ${
                      isActiveSubItem
                        ? "bg-red-50 text-red-300"
                        : "hover:bg-gray-200"
                    }
                  `}
                >
                  {subItem.icon && <subItem.icon className="w-4 h-4" />}
                  <span>{subItem.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Submenú expandido (solo visible cuando no está colapsado) */}
      {!isCollapsed && isExpanded && hasSubItems && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
          {item.subItems?.map((subItem) => {
            const isActive = pathname === subItem.href;

            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={onCloseSidebar}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                  transition-colors
                  ${
                    isActive
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {subItem.icon && <subItem.icon className="w-4 h-4" />}
                <span>{subItem.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
