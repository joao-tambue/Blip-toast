import type { ToastOptions, Toast } from './types';

const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

type ToastListener = (toasts: Toast[]) => void;

class ToastManager {
  private toasts: Toast[] = [];
  private listeners: Set<ToastListener> = new Set();
  private maxToasts = 5;

  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const snapshot = [...this.toasts];
    this.listeners.forEach((listener) => listener(snapshot));
  }

  getToasts(): Toast[] {
    return [...this.toasts];
  }

  create(message: string, options: Partial<ToastOptions> = {}): Toast {
    const id = options.id || generateId();
    const duration = options.duration ?? 4000;
    const dismissible = options.dismissible ?? true;

    const toastOptions: ToastOptions = {
      id,
      title: message,
      duration,
      dismissible,
      variant: options.variant ?? 'default',
      position: options.position ?? 'bottom',
      swipeToDismiss: options.swipeToDismiss ?? true,
      onDismiss: options.onDismiss,
      onPress: options.onPress,
      icon: options.icon,
      action: options.action,
    };

    const toast: Toast = {
      id,
      options: toastOptions,
      dismiss: () => this.dismiss(id),
      update: (newOptions) => this.update(id, newOptions),
    };

    this.toasts.push(toast);

    if (this.toasts.length > this.maxToasts) {
      this.toasts.shift();
    }

    this.notify();

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    return toast;
  }

  dismiss(id: string): void {
    const index = this.toasts.findIndex((t) => t.id === id);
    if (index !== -1) {
      const toast = this.toasts[index];
      toast.options.onDismiss?.();
      this.toasts.splice(index, 1);
      this.notify();
    }
  }

  dismissAll(): void {
    this.toasts.forEach((toast) => {
      toast.options.onDismiss?.();
    });
    this.toasts = [];
    this.notify();
  }

  update(id: string, options: Partial<ToastOptions>): void {
    const index = this.toasts.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.toasts[index].options = {
        ...this.toasts[index].options,
        ...options,
      };
      this.notify();
    }
  }

  setMaxToasts(max: number): void {
    this.maxToasts = max;
  }
}

export const toastManager = new ToastManager();
