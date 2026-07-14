// Core
export { toastManager } from './core';
export type { ToastOptions, Toast, ToastFunction, ToastReturnType } from './core';

// Components
export { ToastContainer, ToastItem } from './components';
export type { ToastContainerProps, ToastItemProps } from './components';

// Hooks
export { useToasts } from './hooks';

// Animations
export { useSlideIn, useSlideOut } from './animations';

// Utils
export { generateId, clamp, sleep } from './utils';

// Main toast function for easy usage
import { toastManager } from './core';
import type { ToastOptions, Toast } from './core/types';

const toast = (message: string, options?: Partial<ToastOptions>): Toast => {
  return toastManager.create(message, options);
};

toast.success = (message: string, options?: Partial<ToastOptions>): Toast => {
  return toastManager.create(message, { ...options, variant: 'success' });
};

toast.error = (message: string, options?: Partial<ToastOptions>): Toast => {
  return toastManager.create(message, { ...options, variant: 'error' });
};

toast.warning = (message: string, options?: Partial<ToastOptions>): Toast => {
  return toastManager.create(message, { ...options, variant: 'warning' });
};

toast.info = (message: string, options?: Partial<ToastOptions>): Toast => {
  return toastManager.create(message, { ...options, variant: 'info' });
};

toast.dismiss = (id?: string): void => {
  if (id) {
    toastManager.dismiss(id);
  }
};

toast.dismissAll = (): void => {
  toastManager.dismissAll();
};

export default toast;
