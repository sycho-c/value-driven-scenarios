import { motion } from 'framer-motion';
import styles from './PCTypingBubble.module.css';

interface PCTypingBubbleProps {
  sender?: string;
  avatarSrc?: string;
}

export function PCTypingBubble({ sender, avatarSrc }: PCTypingBubbleProps) {
  return (
    <motion.div
      className={styles.row}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.avatar}>
        {avatarSrc ? <img src={avatarSrc} alt={sender ?? ''} /> : null}
      </div>
      <div className={styles.column}>
        {sender && <span className={styles.sender}>{sender} 입력 중…</span>}
        <div className={styles.bubble}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </motion.div>
  );
}
