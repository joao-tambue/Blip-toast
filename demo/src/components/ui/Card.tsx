import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/cn';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={cn(
        'glass rounded-2xl p-6 shadow-card',
        'transition-colors duration-200 hover:border-violet/40 hover:shadow-glow-sm',
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
