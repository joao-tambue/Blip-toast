// Core
export { toastManager } from './core';
export { animationPresets } from './core/presets';
export type {
  ToastOptions,
  Toast,
  ToastFunction,
  ToastReturnType,
  ToastType,
  ToastPhase,
  ToastAction,
  ToastTimings,
  ToastClassNames,
  PromiseToastData,
  ToastUpdateOptions,
  AnimationPresetName,
  AnimationPreset,
} from './core';

// Components
export { ToastContainer, ToastItem } from './components';
export { ProgressBar } from './components/ProgressBar';
export type { ToastContainerProps, ToastItemProps } from './components';

// Hooks
export { useToasts } from './hooks';

// Animations
export { useSlideIn, useSlideOut } from './animations';
export { MorphAnimation } from './animations/MorphAnimation';

// Icons
export {
  DefaultIcon,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  SpinnerIcon,
} from './icons';

// Utils
export { generateId, clamp, sleep } from './utils';

// Main toast function for easy usage
import { toastManager } from './core';
import type { ToastOptions, Toast, PromiseToastData } from './core/types';

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

toast.promise = <T,>(promise: Promise<T>, data: PromiseToastData<T>): Toast => {
  return toastManager.promise(promise, data);
};

toast.update = (id: string, options: Partial<ToastOptions>): void => {
  toastManager.update(id, options);
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
