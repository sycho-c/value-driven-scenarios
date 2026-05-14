import { motion } from 'framer-motion';
import type { ShareFailureModalDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './ShareFailureModal.module.css';

interface ShareFailureModalProps {
  data: ShareFailureModalDef;
  onConfirm?: () => void;
}

export function ShareFailureModal({ data, onConfirm }: ShareFailureModalProps) {
  return (
    <motion.div
      className={styles.modal}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.title}>{data.title}</div>
      <p className={styles.body}>{data.body}</p>
      <div className={styles.targets}>
        {data.shareTargets.map((t, i) => (
          <div key={i} className={cn(styles.target, t.disabled && styles.disabled)}>
            <span className={styles.targetIcon}>{t.icon}</span>
            <span>{t.name}</span>
          </div>
        ))}
      </div>
      {data.note && <div className={styles.note}>{data.note}</div>}
      <button type="button" className={styles.cta} onClick={onConfirm}>
        {data.primaryLabel ?? '확인'}
      </button>
    </motion.div>
  );
}
