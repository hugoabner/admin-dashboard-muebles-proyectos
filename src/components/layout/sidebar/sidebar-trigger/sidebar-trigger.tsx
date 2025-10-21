"use client";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/sidebar-store";
import { TextAlignStart } from "lucide-react";



export default function SidebarTrigger() {
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
    <Button
      variant={"ghost"}
      onClick={handleToggle}
      aria-label="Toggle sidebar"
    >
      <TextAlignStart className="w-6 h-6" />
    </Button>
  );
}
