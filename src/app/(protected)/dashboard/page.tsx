import { SidebarDashboard } from "@/components/layout/sidebar";

export default function page() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarDashboard />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Admin Panel</h1>
          <p className="text-gray-600">
            Select an item from the sidebar to navigate. The dropdown menu will appear when you hover over items with
            sub-items while the sidebar is collapsed.
          </p>
        </div>
      </main>
    </div>
  );
}
