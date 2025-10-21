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
  // items?: {
  // 	title: string;
  // 	url: string;
  // }[];
};
