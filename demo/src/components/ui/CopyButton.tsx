import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { cn } from '../../lib/cn';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={() => copy(text)}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium',
        'text-muted transition-colors duration-150 hover:bg-white/10 hover:text-ink cursor-pointer',
        className
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-400" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {label && <span>{copied ? 'Copied' : label}</span>}
    </motion.button>
  );
}
