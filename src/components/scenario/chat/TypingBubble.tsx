import { motion } from 'framer-motion';
import type { CastMember } from '@/cases/_types';
import { AvatarImage } from './AvatarImage';
import styles from './TypingBubble.module.css';

interface TypingBubbleProps {
  sender?: CastMember | null;
  senderLabel?: string;
  showAvatar?: boolean;
}

export function TypingBubble({ sender, senderLabel, showAvatar = true }: TypingBubbleProps) {
  const label = senderLabel ?? sender?.label;
  return (
    <motion.div
      className={styles.row}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {showAvatar && sender && <AvatarImage sender={sender} size={28} />}
      <div className={styles.column}>
        {label && <span className={styles.sender}>{label} 입력 중…</span>}
        <div className={styles.bubble}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </motion.div>
  );
}
