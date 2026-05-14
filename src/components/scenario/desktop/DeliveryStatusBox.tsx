import { motion } from 'framer-motion';
import type { DeliveryStatusBoxDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './DeliveryStatusBox.module.css';

interface DeliveryStatusBoxProps {
  data: DeliveryStatusBoxDef;
}

const ICON: Record<string, string> = {
  ok: '✓',
  warn: '⚠',
  fail: '✗',
  pending: '…',
};

export function DeliveryStatusBox({ data }: DeliveryStatusBoxProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.title}>{data.title}</div>
      <div className={styles.rows}>
        {data.rows.map((row) => (
          <div key={row.id} className={cn(styles.row, styles[row.status])}>
            <span className={cn(styles.icon, styles[row.status])}>{ICON[row.status]}</span>
            <span className={styles.label}>{row.label}</span>
            {row.note && <span className={styles.note}>{row.note}</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
