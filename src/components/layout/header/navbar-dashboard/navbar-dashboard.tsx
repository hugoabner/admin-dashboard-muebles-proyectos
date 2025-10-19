"use client";

import { handleLogout } from "@/actions/logout-actions";
import { Button } from "@/components/ui/button";
import { ToggleSidebarButton } from "../../sidebar/sidebar-dashboard/sidebar-trigger";

export default function NavbarDashboard() {
  return (
     <nav
      className="sticky top-0 flex items-center border-b
        bg-white h-16 w-full mx-auto justify-between
        px-4 text-black border-gray-200 shadow-xs z-30"
    >
      <div className="flex items-center gap-4">
        <ToggleSidebarButton />
        <h2 className="text-lg font-semibold hidden sm:block">Panel de Control</h2>
      </div>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-2">
        <form action={handleLogout}>
          <Button type="submit" variant="outline" size="sm">
            Logout
          </Button>
        </form>
      </div>
    </nav>
  );
}
