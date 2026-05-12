import { motion } from 'framer-motion';
import type { PushNotification } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PushNotificationStack.module.css';

interface PushNotificationStackProps {
  notifications: PushNotification[];
}

export function PushNotificationStack({ notifications }: PushNotificationStackProps) {
  if (notifications.length === 0) return null;
  return (
    <div className={styles.stack}>
      {notifications.map((n, i) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={cn(styles.notification, n.urgent ? styles.urgent : styles.normal)}
        >
          <div className={styles.icon}>💬</div>
          <div className={styles.body}>
            <div className={styles.room}>{n.room}</div>
            <div className={styles.preview}>
              {n.sender && <strong>{n.sender}:</strong>}
              {n.preview}
            </div>
          </div>
          {n.unread ? <span className={styles.unreadBadge}>{n.unread}</span> : null}
        </motion.div>
      ))}
    </div>
  );
}
