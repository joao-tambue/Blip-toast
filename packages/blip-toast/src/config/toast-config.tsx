import React, { createContext, useContext, useMemo } from 'react';
import type { ToastConfig } from '../core/types';

const EMPTY_CONFIG: ToastConfig = {};

const ToastConfigContext = createContext<ToastConfig>(EMPTY_CONFIG);

export interface ToastConfigProviderProps {
  /** Layout configuration applied to every `<ToastContainer>` below it. */
  config?: ToastConfig;
  children: React.ReactNode;
}

/**
 * Provide app-wide toast layout configuration (`styles`, `slots`, `renderToast`).
 * Mount it once near the root; any `<ToastContainer>` inside inherits it. The
 * matching props on `<ToastContainer>` override this per field.
 */
export const ToastConfigProvider: React.FC<ToastConfigProviderProps> = ({ config, children }) => {
  const value = useMemo<ToastConfig>(() => config ?? EMPTY_CONFIG, [config]);

  return <ToastConfigContext.Provider value={value}>{children}</ToastConfigContext.Provider>;
};

/** Read the current toast layout configuration. Returns `{}` with no provider. */
export function useToastConfig(): ToastConfig {
  return useContext(ToastConfigContext);
}
