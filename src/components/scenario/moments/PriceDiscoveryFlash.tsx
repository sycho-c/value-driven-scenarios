import { motion } from 'framer-motion';
import styles from './PriceDiscoveryFlash.module.css';

interface PriceDiscoveryFlashProps {
  wrong: number;
  correct: number;
  currency?: string;
}

export function PriceDiscoveryFlash({
  wrong,
  correct,
  currency = '₩',
}: PriceDiscoveryFlashProps) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={styles.card}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={styles.col}>
          <span className={styles.label}>전송됨 (대동)</span>
          <span className={`${styles.value} ${styles.wrong}`}>
            {currency}
            {wrong.toLocaleString()}
          </span>
        </div>
        <span className={styles.versus}>vs</span>
        <div className={styles.col}>
          <span className={styles.label}>실제 (미우)</span>
          <span className={`${styles.value} ${styles.correct}`}>
            {currency}
            {correct.toLocaleString()}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
