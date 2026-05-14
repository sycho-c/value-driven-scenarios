import { motion } from 'framer-motion';
import type { AutoVizModalDef } from '@/cases/_types';
import styles from './AutoVizSequence.module.css';

interface AutoVizSequenceProps {
  data: AutoVizModalDef;
  onDismiss?: () => void;
}

const STEP_DELAY = 0.6;

export function AutoVizSequence({ data, onDismiss }: AutoVizSequenceProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.stack}>
        <motion.div
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.32 }}
        >
          {data.title}
        </motion.div>

        <motion.div
          className={`${styles.box} ${styles.env}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STEP_DELAY * 0.5, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.boxTitle}>1. {data.environmentBox.title}</span>
          <div className={styles.envRow}>
            <span className={styles.envChip}>{data.environmentBox.left}</span>
            <span>+</span>
            <span className={styles.envChip}>{data.environmentBox.right}</span>
          </div>
          <span className={styles.envWarn}>{data.environmentBox.warn}</span>
        </motion.div>

        <motion.div
          className={`${styles.box} ${styles.problem}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STEP_DELAY * 1.5, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.boxTitle}>2. {data.problemBox.title}</span>
          <p className={styles.problemBody}>{data.problemBox.body}</p>
        </motion.div>

        <motion.div
          className={`${styles.box} ${styles.solution}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: STEP_DELAY * 2.5, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.boxTitle}>3. {data.solutionBox.title}</span>
          <ul className={styles.solutionList}>
            {data.solutionBox.body.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </motion.div>

        {onDismiss && (
          <motion.button
            type="button"
            className={styles.cta}
            onClick={onDismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: STEP_DELAY * 3.5, duration: 0.32 }}
          >
            {data.ctaLabel ?? '계속 →'}
          </motion.button>
        )}
      </div>
    </div>
  );
}
