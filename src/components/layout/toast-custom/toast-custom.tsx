import { Toast as ToastType, useToastStore } from '@/store/toast-store';
import { AlertTriangle, Check, Info, X, XCircle } from 'lucide-react';
import React from 'react';

const icons = {
  success: Check,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorSchemes = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-800',
    iconText: 'text-green-500'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-800',
    iconText: 'text-red-500'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-500',
    text: 'text-yellow-800',
    iconText: 'text-yellow-500'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-800',
    iconText: 'text-blue-500'
  },
};

const titles = {
  success: 'Success',
  error: 'Error',
  warning: 'Warn',
  info: 'Info',
};

export const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const Icon = icons[toast.type];
  const scheme = colorSchemes[toast.type];

  return (
    <div
      className={`
        ${scheme.bg} ${scheme.border}
        border-1 rounded-md shadow-md
        p-4 min-w-[300px] max-w-md
        animate-slide-in-right
        flex gap-3
      `}
    >
      <div className={`rounded-full pt-1.5 h-fit`}>
        <Icon size={25} className={scheme.iconText} />
      </div>
      
      <div className="flex-1 flex flex-col gap-1">
        <h4 className={`font-semibold text-sm ${scheme.text}`}>
          {titles[toast.type]}
        </h4>
        <p className={`text-sm ${scheme.text}`}>
          {toast.message}
        </p>
      </div>
      
      <button
        onClick={() => removeToast(toast.id)}
        className={`${scheme.text} hover:opacity-70 transition-opacity h-fit`}
      >
        <X size={16} />
      </button>
    </div>
  );
};