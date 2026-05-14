import { motion } from 'framer-motion';
import styles from './AutoMappingPulse.module.css';

interface AutoMappingPulseProps {
  field?: string;
  value?: string;
  detail?: string;
}

export function AutoMappingPulse({
  field = '단가',
  value = '₩1,000',
  detail = '거래처 단가 DB에서 자동 매핑 — 수동 입력 불필요',
}: AutoMappingPulseProps) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, x: 12, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={styles.card}
        animate={{ boxShadow: [
          '0 12px 32px rgba(255, 176, 32, 0.35)',
          '0 12px 40px rgba(255, 176, 32, 0.65)',
          '0 12px 32px rgba(255, 176, 32, 0.35)',
        ] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className={styles.eyebrow}>⚡ AUTO-MAPPED</span>
        <span className={styles.headline}>
          {field}: {value}
        </span>
        <span className={styles.detail}>{detail}</span>
      </motion.div>
    </motion.div>
  );
}
