import { NavbarDashboard } from "@/components/layout/header";
import { SidebarDashboard } from "@/components/layout/sidebar";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex overflow-hidden">
      {/* Sidebar */}
      <SidebarDashboard />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-amber-700">
        <NavbarDashboard />
        <main className="overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
