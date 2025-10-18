import { NavbarDashboard } from "@/components/layout/header";
import { SidebarDashboard } from "@/components/layout/sidebar";
import React from "react";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarDashboard />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarDashboard />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
