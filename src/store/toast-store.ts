
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  
  addToast: (message, type, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = { id, message, type, duration };
    
    set((state) => ({
      toasts: [...state.toasts, toast]
    }));

    // Auto remover después de la duración
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id)
        }));
      }, duration);
    }
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    }));
  },

  success: (message, duration) => {
    useToastStore.getState().addToast(message, 'success', duration);
  },

  error: (message, duration) => {
    useToastStore.getState().addToast(message, 'error', duration);
  },

  warning: (message, duration) => {
    useToastStore.getState().addToast(message, 'warning', duration);
  },

  info: (message, duration) => {
    useToastStore.getState().addToast(message, 'info', duration);
  },
}));