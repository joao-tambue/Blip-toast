export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  dismissible?: boolean;
  swipeToDismiss?: boolean;
  onDismiss?: () => void;
  onPress?: () => void;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onPress: () => void;
  };
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
  success: (message: string, options?: Partial<ToastOptions>) => Toast;
  error: (message: string, options?: Partial<ToastOptions>) => Toast;
  warning: (message: string, options?: Partial<ToastOptions>) => Toast;
  info: (message: string, options?: Partial<ToastOptions>) => Toast;
  dismiss: (id?: string) => void;
  dismissAll: () => void;
};
