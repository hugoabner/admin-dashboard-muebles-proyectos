"use client";

import { AvatarCustom } from "@/components/ui";
import { DROPDOWN_AVATAR_ITEMS, USER } from "@/constants/navbar-constants";
import { SidebarTrigger } from "../../sidebar";

export default function NavbarDashboard() {
  return (
    <nav
      className="sticky top-0 flex items-center border-b
    bg-white h-16 w-full mx-auto justify-between
      px-4 text-black border-gray-200 shadow-xs"
    >
      <SidebarTrigger />
      <h2 className="ml-2 text-lg font-semibold">Panel de Control</h2>
      {/* Aquí puedes agregar más elementos del header */}
      <div className="ml-auto flex items-center gap-2">
        {/* Ejemplo: Avatar, notificaciones, etc. */}
        <div>
          other
        </div>
        <div>
          <AvatarCustom
            user={USER}
            items={DROPDOWN_AVATAR_ITEMS}
            showChevron={false}
            position="right"
          />
        </div>
      </div>
    </nav>
  );
}
