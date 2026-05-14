import { motion } from 'framer-motion';
import styles from './FileBlockedToast.module.css';

interface FileBlockedToastProps {
  title?: string;
  body?: string;
}

export function FileBlockedToast({
  title = '🚫 거래처 불일치 — 발송 차단',
  body = '대동 양식 파일을 미우 거래처로 보낼 수 없습니다.',
}: FileBlockedToastProps) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={styles.toast}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.body}>{body}</span>
      </motion.div>
    </motion.div>
  );
}
