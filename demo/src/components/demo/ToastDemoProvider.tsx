import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ToastContainer } from 'blip-toast';
import { DEFAULT_CONFIG, fireToast, type DemoConfig, type ToastKind } from '../../lib/demo-actions';

interface ToastDemoContextValue {
  config: DemoConfig;
  updateConfig: (patch: Partial<DemoConfig>) => void;
  fire: (kind: ToastKind) => void;
}

const ToastDemoContext = createContext<ToastDemoContextValue | null>(null);

export function ToastDemoProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG);
  const configRef = useRef(config);
  configRef.current = config;

  const updateConfig = useCallback((patch: Partial<DemoConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const fire = useCallback((kind: ToastKind) => {
    fireToast(kind, configRef.current);
  }, []);

  const value = useMemo(() => ({ config, updateConfig, fire }), [config, updateConfig, fire]);

  return (
    <ToastDemoContext.Provider value={value}>
      {children}
      {/* Single real container driven by the playground controls.
          Every demo on the site feeds into it via the same toast manager. */}
      <ToastContainer
        position={config.position}
        theme={config.theme}
        maxVisible={config.maxVisible}
      />
    </ToastDemoContext.Provider>
  );
}

export function useToastDemo(): ToastDemoContextValue {
  const ctx = useContext(ToastDemoContext);
  if (!ctx) {
    throw new Error('useToastDemo must be used within <ToastDemoProvider>');
  }
  return ctx;
}
