import { motion } from 'framer-motion';
import type { TakeoverDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './TakeoverOverlay.module.css';

interface TakeoverOverlayProps {
  takeover: TakeoverDef;
  onDismiss?: () => void;
}

export function TakeoverOverlay({ takeover, onDismiss }: TakeoverOverlayProps) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      onClick={onDismiss}
    >
      <motion.div
        className={cn(styles.card, styles[takeover.tone])}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.eyebrow}>{takeover.eyebrow}</span>
        <h2 className={styles.headline}>{takeover.headline}</h2>
        {takeover.sub && <p className={styles.sub}>{takeover.sub}</p>}
        {onDismiss && (
          <button type="button" className={styles.cta} onClick={onDismiss}>
            {takeover.ctaLabel ?? '계속 →'}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
