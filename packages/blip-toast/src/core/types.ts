import type { ComponentType, ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

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
  variant?: ToastPhase;
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

/**
 * The resolved colors for a single toast, taking the active theme and any
 * per-toast overrides (`fillColor`, `borderColor`) into account. Handed to
 * custom layouts so they can match the built-in look with zero guesswork.
 */
export interface ToastLayoutColors {
  /** Phase accent — icon tint, action text, error/success hue. */
  accent: string;
  /** Card background (the outer surface). */
  background: string;
  /** Inner content background. */
  surface: string;
  /** Body / description text color. */
  text: string;
  /** Resolved border color (`'transparent'` when the toast has no border). */
  border: string;
}

/**
 * Per-slot style overrides merged over the built-in `StyleSheet`. Use this to
 * re-skin a toast (spacing, radius, colors, typography) without rebuilding its
 * structure. Every field is optional and additive.
 */
export interface ToastStyleOverrides {
  wrapper?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  header?: StyleProp<ViewStyle>;
  iconWrapper?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  timestamp?: StyleProp<TextStyle>;
  body?: StyleProp<ViewStyle>;
  description?: StyleProp<TextStyle>;
  actionButton?: StyleProp<ViewStyle>;
  actionText?: StyleProp<TextStyle>;
  progressBar?: StyleProp<ViewStyle>;
}

/** Props passed to a {@link ToastSlots.Icon} override. */
export interface ToastIconSlotProps {
  phase: ToastPhase;
  color: string;
  size: number;
}

/** Props passed to a {@link ToastSlots.ActionButton} override. */
export interface ToastActionSlotProps {
  label: string;
  onPress: () => void;
  color: string;
  phase: ToastPhase;
}

/** Props passed to a {@link ToastSlots.Progress} override. */
export interface ToastProgressSlotProps {
  duration: number;
  color: string;
  phase: ToastPhase;
}

/**
 * Swap individual pieces of the built-in layout while keeping its structure.
 * A per-toast `options.icon` still wins over `slots.Icon`.
 */
export interface ToastSlots {
  Icon?: ComponentType<ToastIconSlotProps>;
  ActionButton?: ComponentType<ToastActionSlotProps>;
  Progress?: ComponentType<ToastProgressSlotProps>;
}

/**
 * Everything a custom layout needs. The library still owns the stack animation,
 * entrance/exit/shake, auto-dismiss timing, promise morphing and accessibility —
 * `renderToast` only replaces the inner card.
 */
export interface ToastRenderProps {
  toast: Toast;
  id: string;
  phase: ToastPhase;
  title: string;
  description?: string;
  action?: ToastAction;
  /** Resolved theme for this toast (`'system'` is already collapsed). */
  theme: 'light' | 'dark';
  isDark: boolean;
  colors: ToastLayoutColors;
  /** Localized creation time, e.g. `"3:45 PM"`. */
  timestamp: string;
  /** `true` when the toast has a description or an action. */
  isExpanded: boolean;
  /** The default phase icon node — drop it straight into your layout. */
  icon: ReactNode;
  /** A wired progress bar (respects `showProgress` + duration), or `null`. */
  progressBar: ReactNode;
  /** Animated dismiss — the same path the auto-dismiss timer uses. */
  dismiss: () => void;
  /** Fire `action.onPress` and run the `successLabel` transition. */
  runAction: () => void;
}

/**
 * App-wide layout configuration, supplied through `<ToastConfigProvider>` or the
 * matching props on `<ToastContainer>` (props win). All fields are optional; an
 * empty config renders the default toast.
 */
export interface ToastConfig {
  styles?: ToastStyleOverrides;
  slots?: ToastSlots;
  renderToast?: (props: ToastRenderProps) => ReactNode;
}

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
