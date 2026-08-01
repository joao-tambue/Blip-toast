import { useCallback, useEffect, useRef, useState } from 'react';

export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        setCopied(true);
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => setCopied(false), timeout);
      } catch {
        setCopied(false);
      }
    },
    [timeout]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return { copied, copy };
}
