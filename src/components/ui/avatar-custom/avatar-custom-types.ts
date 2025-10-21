import { LucideIcon } from "lucide-react";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
}

export interface AvatarDropdownProps {
  user: {
    name: string;
    email?: string;
    image?: string;
  };
  items?: DropdownItem[];
  className?: string;
  showChevron?: boolean;
  position?: 'left' | 'right';
}
