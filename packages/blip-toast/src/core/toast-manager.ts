import type { ToastOptions, Toast, PromiseToastData } from './types';
import { generateId } from '../utils';

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
      description: options.description,
      duration,
      dismissible,
      variant: options.variant ?? 'default',
      position: options.position ?? 'bottom',
      swipeToDismiss: options.swipeToDismiss ?? true,
      onDismiss: options.onDismiss,
      onPress: options.onPress,
      icon: options.icon,
      action: options.action,
      fillColor: options.fillColor,
      borderColor: options.borderColor,
      borderWidth: options.borderWidth,
      timing: options.timing,
      preset: options.preset,
      spring: options.spring,
      bounce: options.bounce,
      showTimestamp: options.showTimestamp,
      showProgress: options.showProgress,
      classNames: options.classNames,
      theme: options.theme,
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

    // Auto dismiss is handled by ToastItem component for animation support
    // But we still set a fallback timer
    if (duration > 0 && duration !== Infinity) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration + 2000); // Extra 2s for collapse animation
    }

    return toast;
  }

  promise<T>(promise: Promise<T>, data: PromiseToastData<T>): Toast {
    const id = generateId();

    // Create loading toast
    const toast = this.create(data.loading, {
      id,
      variant: 'loading',
      duration: Infinity,
      fillColor: data.fillColor,
      borderColor: data.borderColor,
      borderWidth: data.borderWidth,
      timing: data.timing,
      preset: data.preset,
      spring: data.spring,
      bounce: data.bounce,
      showTimestamp: data.showTimestamp,
      showProgress: data.showProgress,
    });

    // Handle promise resolution
    promise
      .then((result) => {
        const successTitle = typeof data.success === 'function'
          ? data.success(result)
          : data.success;
        const successDesc = data.description?.success
          ? typeof data.description.success === 'function'
            ? data.description.success(result)
            : data.description.success
          : undefined;

        this.update(id, {
          title: successTitle,
          description: successDesc,
          variant: 'success',
          action: data.action?.success,
          duration: 4000,
        });

        // Auto dismiss after update
        setTimeout(() => {
          this.dismiss(id);
        }, 4000);
      })
      .catch((error) => {
        const errorTitle = typeof data.error === 'function'
          ? data.error(error)
          : data.error;
        const errorDesc = data.description?.error
          ? typeof data.description.error === 'function'
            ? data.description.error(error)
            : data.description.error
          : undefined;

        this.update(id, {
          title: errorTitle,
          description: errorDesc,
          variant: 'error',
          action: data.action?.error,
          duration: 4000,
        });

        // Auto dismiss after update
        setTimeout(() => {
          this.dismiss(id);
        }, 4000);
      });

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
