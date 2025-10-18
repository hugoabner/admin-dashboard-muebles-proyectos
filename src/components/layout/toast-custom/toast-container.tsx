'use client';
import { useToastStore } from '@/store/toast-store';
import React from 'react';
import { Toast } from './toast-custom';

type Position = 
  | 'top-right' 
  | 'top-left' 
  | 'top-center' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'bottom-center';

interface ToastContainerProps {
  position?: Position;
}

const positionClasses: Record<Position, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  position = 'top-right' 
}) => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};