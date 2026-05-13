import { AnimatePresence, motion } from 'framer-motion';
import type { PCToast } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PCToastStack.module.css';

interface PCToastStackProps {
  toasts: PCToast[];
  onToastClick?: (toast: PCToast) => void;
}

export function PCToastStack({ toasts, onToastClick }: PCToastStackProps) {
  return (
    <div className={styles.container}>
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            className={cn(
              styles.toast,
              t.variant === 'urgent' && styles.urgent,
              t.variant === 'boss' && styles.boss,
              t.pulse && styles.pulse,
            )}
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onToastClick?.(t)}
          >
            <div className={styles.header}>
              <div className={styles.from}>{t.from}</div>
              <div className={styles.room}>{t.room}</div>
            </div>
            <div className={styles.body}>{t.text}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
