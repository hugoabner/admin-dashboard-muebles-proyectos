import { create } from "zustand";

export interface SidebarStore {
  isOpen: boolean; // Para mobile (drawer)
  isCollapsed: boolean; // Para desktop (collapsed)
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
}));