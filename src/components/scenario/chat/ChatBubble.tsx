import { cn } from '@/lib/cn';
import type { CastMember } from '@/cases/_types';
import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  text: string;
  sender?: CastMember | null;
  mine?: boolean;
  time?: string;
  unreadCount?: number;
  urgent?: boolean;
  danger?: boolean;
  showAvatar?: boolean;
  showSender?: boolean;
}

export function ChatBubble({
  text,
  sender,
  mine = false,
  time,
  unreadCount,
  urgent,
  danger,
  showAvatar = true,
  showSender = true,
}: ChatBubbleProps) {
  const showHeader = !mine && sender && (showAvatar || showSender);

  return (
    <div className={cn(styles.row, mine && styles.mine)}>
      <div className={cn(styles.column, mine && styles.mine)}>
        {showHeader && (
          <div className={styles.header}>
            {showAvatar && (
              <div className={styles.avatar} style={{ background: sender!.color }}>
                {sender!.initial}
              </div>
            )}
            {showSender && <span className={styles.sender}>{sender!.label}</span>}
          </div>
        )}
        <div className={cn(styles.bubbleRow, mine && styles.mine)}>
          <div
            className={cn(
              styles.bubble,
              mine && styles.mine,
              urgent && styles.urgent,
              danger && styles.danger,
            )}
          >
            {text}
          </div>
          {(time || unreadCount) && (
            <div className={styles.meta}>
              {unreadCount ? <span className={styles.unreadCount}>{unreadCount}</span> : null}
              {time ? <span>{time}</span> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
