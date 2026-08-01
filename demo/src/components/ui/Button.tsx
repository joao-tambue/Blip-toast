import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
  'select-none transition-colors duration-200 cursor-pointer ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-btn-primary hover:shadow-glow ' +
    'hover:brightness-110 active:brightness-95',
  secondary: 'glass text-ink hover:border-violet/50 hover:shadow-glow-sm',
  ghost: 'text-muted hover:text-ink hover:bg-surface/60',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  )
);

Button.displayName = 'Button';
