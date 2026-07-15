import { useState, useEffect } from 'react';
import { toastManager } from '../core/toast-manager';
import type { Toast } from '../core/types';

export function useToasts(): Toast[] {
  const [toasts, setToasts] = useState<Toast[]>(toastManager.getToasts());

  useEffect(() => {
    return toastManager.subscribe(setToasts);
  }, []);

  return toasts;
}
