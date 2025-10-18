"use client";

import { handleLogout } from "@/actions/logout-actions";
import { Button } from "@/components/ui/button";
import { ToggleSidebarButton } from "../../sidebar/sidebar-dashboard/sidebar-trigger";

export default function NavbarDashboard() {

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-4">
        <ToggleSidebarButton />
        <h2 className="text-lg font-semibold">Panel de Control</h2>

        {/* Aquí puedes agregar más elementos del header */}
        <div className="ml-auto flex items-center gap-2">
          {/* Ejemplo: Avatar, notificaciones, etc. */}
          <div>
            <form action={handleLogout}>
              <Button type="submit">Logout</Button>
            </form>{" "}
          </div>
        </div>
      </div>
    </header>
  );
}
