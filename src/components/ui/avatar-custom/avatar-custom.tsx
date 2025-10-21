'use client';

import { ChevronDown, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface DropdownItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
}

interface AvatarDropdownProps {
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

export default function AvatarDropdown({
  user,
  items = [],
  className = '',
  showChevron = false,
  position = 'right',
}: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative ${className}`}>
      <div ref={dropdownRef} className="relative" onBlur={handleBlur}>
        {/* Avatar Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-2 focus:outline-none group"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Avatar Image */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden 
            ring-2 ring-red-200 group-hover:ring-red-500 
            transition-all duration-200">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-500 
                to-red-600 flex items-center justify-center 
                text-white font-semibold text-lg">
                {getInitials(user.name)}
              </div>
            )}
          </div>

          {/* Chevron opcional */}
          {showChevron && (
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 
                ${isOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={`absolute mt-2 w-56 bg-white border border-gray-200 
              rounded-lg shadow-lg z-50 py-1
              ${position === 'right' ? 'right-0' : 'left-0'}
              animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user.name}
              </p>
              {user.email && (
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {user.email}
                </p>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {items.map((item) => (
                <div key={item.id}>
                  {item.divider && (
                    <div className="my-1 border-t border-gray-100" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={`
                      w-full px-4 py-2.5 text-left flex items-center gap-3
                      transition-colors duration-150 text-sm
                      ${item.disabled 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-50 cursor-pointer'
                      }
                      ${item.danger 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-gray-700'
                      }
                    `}
                  >
                    {item.icon && (
                      <span className="flex-shrink-0 w-4 h-4">
                        {item.icon && <item.icon className="w-4 h-4" />}
                      </span>
                    )}
                    <span className="flex-1">{item.label}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}