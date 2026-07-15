import type { ReactNode } from 'react';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPhase = 'loading' | ToastType;

export type AnimationPresetName = 'smooth' | 'bouncy' | 'subtle' | 'snappy';

export interface AnimationPreset {
  bounce: number;
  spring: boolean;
}

export interface ToastTimings {
  displayDuration?: number;
}

export interface ToastClassNames {
  wrapper?: string;
  content?: string;
  header?: string;
  title?: string;
  icon?: string;
  description?: string;
  actionWrapper?: string;
  actionButton?: string;
}

export interface ToastAction {
  label: string;
  onPress: () => void;
  successLabel?: string;
}

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  variant?: ToastType;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  dismissible?: boolean;
  swipeToDismiss?: boolean;
  onDismiss?: () => void;
  onPress?: () => void;
  icon?: ReactNode;
  action?: ToastAction;

  // Gooey-toast inspired options
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
  timing?: ToastTimings;
  preset?: AnimationPresetName;
  spring?: boolean;
  bounce?: number;
  showTimestamp?: boolean;
  showProgress?: boolean;
  classNames?: ToastClassNames;
  theme?: 'light' | 'dark';
}

export interface PromiseToastData<T> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: unknown) => string);
  description?: {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: unknown) => string);
  };
  action?: {
    success?: ToastAction;
    error?: ToastAction;
  };
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
  timing?: ToastTimings;
  preset?: AnimationPresetName;
  spring?: boolean;
  bounce?: number;
  showTimestamp?: boolean;
  showProgress?: boolean;
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

export interface ToastUpdateOptions {
  title?: string;
  description?: string;
  type?: ToastType;
  action?: ToastAction;
  icon?: ReactNode | null;
  showTimestamp?: boolean;
}

export interface Toast {
  id: string;
  options: ToastOptions;
  dismiss: () => void;
  update: (options: Partial<ToastOptions>) => void;
}

export type ToastReturnType = Toast;

export type ToastFunction = {
  (message: string, options?: Partial<ToastOptions>): Toast;
  success(message: string, options?: Partial<ToastOptions>): Toast;
  error(message: string, options?: Partial<ToastOptions>): Toast;
  warning(message: string, options?: Partial<ToastOptions>): Toast;
  info(message: string, options?: Partial<ToastOptions>): Toast;
  promise<T>(promise: Promise<T>, data: PromiseToastData<T>): Toast;
  update(id: string, options: Partial<ToastOptions>): void;
  dismiss(id?: string): void;
  dismissAll(): void;
};
