import { LucideIcon } from "lucide-react";

export interface ToggleSidebarButtonProps {
  onClick: () => void;
  className?: string;
}

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: {
  	label: string;
  	href: string;
  	icon?: LucideIcon;
  }[];
};
export interface SidebarGroup {
  title: string;
  items: NavItem[];
}