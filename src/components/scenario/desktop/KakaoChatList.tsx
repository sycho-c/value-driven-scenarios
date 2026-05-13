import type { ChatListItem } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './KakaoChatList.module.css';

interface KakaoChatListProps {
  items: ChatListItem[];
  onItemClick?: (id: string) => void;
}

export function KakaoChatList({ items, onItemClick }: KakaoChatListProps) {
  return (
    <div className={styles.chatlist}>
      <div className={styles.titlebar}>
        <span>💬 카카오톡</span>
        <div className={styles.winControls}>
          <span>—</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <span className={styles.tab}>채팅</span>
          <span className={cn(styles.tab, styles.inactive)}>오픈채팅</span>
          <div className={styles.tabIcons}>
            <span>🔍</span>
            <span>💬</span>
            <span>➕</span>
          </div>
        </div>
        <div className={styles.filters}>
          <span className={cn(styles.filter, styles.active)}>전체</span>
          <span className={cn(styles.filter, styles.unread)}>💬 안읽음</span>
          <span className={styles.filter}>➕</span>
        </div>
      </div>
      <div className={styles.body}>
        {items.map((it) => (
          <div
            key={it.id}
            className={cn(styles.item, it.active && styles.active, it.pulse && styles.pulse)}
            onClick={(e) => {
              e.stopPropagation();
              onItemClick?.(it.id);
            }}
          >
            <div className={cn(styles.avatar, styles[it.avatar])}>{it.icon}</div>
            <div className={styles.content}>
              <div className={styles.name}>{it.name}</div>
              <div className={styles.preview}>{it.preview}</div>
            </div>
            <div className={styles.meta}>
              <span className={styles.time}>{it.time}</span>
              {!!it.badge && it.badge > 0 && (
                <span className={styles.badge}>{it.badge}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
