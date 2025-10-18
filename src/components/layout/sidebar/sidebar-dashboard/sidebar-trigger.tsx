"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { Menu } from "lucide-react";

export function ToggleSidebarButton() {
  const { toggleCollapse, toggleSidebar } = useSidebarStore();
  const handleToggle = () => {
    // En mobile: toggle drawer
    // En desktop: toggle collapse
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      toggleSidebar();
    } else {
      toggleCollapse();
    }
  };
  return (
    <button
      onClick={handleToggle}
      className={`p-2 hover:bg-gray-100 rounded-lg transition-colors`}
      aria-label="Toggle sidebar"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
