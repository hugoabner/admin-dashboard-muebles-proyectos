import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  expandedGroup: string | null;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  setExpandedGroup: (groupLabel: string | null) => void;
  toggleGroup: (groupLabel: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  expandedGroup: null,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setExpandedGroup: (groupLabel) => set({ expandedGroup: groupLabel }),
  toggleGroup: (groupLabel) => set((state) => ({
    expandedGroup: state.expandedGroup === groupLabel ? null : groupLabel
  })),
}));