import { NavbarDashboard } from "@/components/layout/header";
import { SidebarDashboard } from "@/components/layout/sidebar";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-svh bg-gray-50">
      <SidebarDashboard />
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
        <NavbarDashboard />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
