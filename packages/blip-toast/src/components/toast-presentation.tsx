import React from 'react';
import type { ToastLayoutColors, ToastOptions, ToastPhase } from '../core/types';
import { DefaultIcon, ErrorIcon, InfoIcon, SpinnerIcon, SuccessIcon, WarningIcon } from '../icons';

export const DEFAULT_DISPLAY_DURATION = 4000;

const PHASE_ICON_MAP: Record<
  Exclude<ToastPhase, 'loading'>,
  React.FC<{ size?: number; color?: string }>
> = {
  default: DefaultIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

export const PHASE_COLOR_MAP: Record<ToastPhase, string> = {
  loading: '#555',
  default: '#555',
  success: '#4CAF50',
  error: '#E53935',
  warning: '#C49000',
  info: '#1E88E5',
};

export const PHASE_BG_MAP: Record<ToastPhase, string> = {
  loading: '#f5f5f5',
  default: '#f5f5f5',
  success: '#f5f5f5',
  error: '#f5f5f5',
  warning: '#f5f5f5',
  info: '#f5f5f5',
};

export const DARK_PHASE_BG_MAP: Record<ToastPhase, string> = {
  loading: '#1a1a1a',
  default: '#1a1a1a',
  success: '#1a1a1a',
  error: '#1a1a1a',
  warning: '#1a1a1a',
  info: '#1a1a1a',
};

export const PHASE_PROGRESS_MAP: Record<ToastPhase, string> = {
  loading: '#1E88E5',
  default: '#999',
  success: '#4CAF50',
  error: '#E53935',
  warning: '#C49000',
  info: '#1E88E5',
};

export function resolveToastColors(
  phase: ToastPhase,
  options: ToastOptions,
  theme: 'light' | 'dark'
): ToastLayoutColors {
  const isDark = theme === 'dark';
  const accent = isDark
    ? phase === 'default' || phase === 'loading'
      ? '#ccc'
      : PHASE_COLOR_MAP[phase]
    : PHASE_COLOR_MAP[phase];

  return {
    accent,
    background: options.fillColor || (isDark ? '#1a1a1a' : '#ffffff'),
    surface: isDark ? DARK_PHASE_BG_MAP[phase] : PHASE_BG_MAP[phase],
    text: isDark ? '#bbb' : '#444',
    border: options.borderColor || 'transparent',
  };
}

/** The auto-dismiss duration for a toast, honoring `timing.displayDuration`. */
export function resolveDisplayDuration(options: ToastOptions): number {
  return options.timing?.displayDuration ?? options.duration ?? DEFAULT_DISPLAY_DURATION;
}

/** The default phase icon node for a toast (spinner while loading). */
export function renderPhaseIcon(phase: ToastPhase, color: string, size = 18): React.ReactElement {
  if (phase === 'loading') {
    return <SpinnerIcon size={size} color={color} />;
  }
  const IconComponent = PHASE_ICON_MAP[phase];
  return <IconComponent size={size} color={color} />;
}
