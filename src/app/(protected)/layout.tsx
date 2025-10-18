import { NavbarDashboard } from "@/components/layout/header";
import { SidebarDashboard } from "@/components/layout/sidebar";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <SidebarDashboard />
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        <NavbarDashboard />
        <main className="overflow-y-auto p-3">
          {children}
        </main>
      </div>
    </div>
  );
}
