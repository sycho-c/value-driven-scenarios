import { cn } from '@/lib/cn';
import styles from './LockScreenMock.module.css';

export interface LockNotification {
  app: string;
  time: string;
  title: string;
  body?: string;
}

export interface LockAppBadge {
  icon: string;
  label?: string;
  badge?: number;
}

interface LockScreenMockProps {
  time?: string;
  date?: string;
  notifications?: LockNotification[];
  emptyText?: string;
  appDock?: LockAppBadge[];
  homeBadge?: string;
}

export function LockScreenMock({
  time = '14:08',
  date = '4월 2일 목요일',
  notifications,
  emptyText,
  appDock,
  homeBadge,
}: LockScreenMockProps) {
  return (
    <div className={styles.lock}>
      <div className={styles.time}>{time}</div>
      <div className={styles.date}>{date}</div>

      <div className={styles.notifications}>
        {notifications && notifications.length > 0 ? (
          notifications.map((n, i) => {
            const isBrand = n.app === 'Cowork+';
            return (
              <div key={i} className={cn(styles.notif, isBrand && styles.notifBrand)}>
                <div className={styles.notifHeader}>
                  <span className={styles.notifApp}>
                    {isBrand && <span className={styles.notifSpark}>✨</span>}
                    {n.app}
                  </span>
                  <span className={styles.notifTime}>{n.time}</span>
                </div>
                <div className={styles.notifTitle}>{n.title}</div>
                {n.body && <div className={styles.notifBody}>{n.body}</div>}
              </div>
            );
          })
        ) : emptyText ? (
          <div className={styles.empty}>{emptyText}</div>
        ) : null}
      </div>

      {appDock && appDock.length > 0 && (
        <div className={styles.appDock}>
          {appDock.map((app, i) => (
            <div key={i} className={styles.appDockItem}>
              <span>{app.icon}</span>
              {typeof app.badge === 'number' && app.badge > 0 && (
                <span className={styles.appBadge}>{app.badge}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {homeBadge && <div className={styles.homeBadge}>{homeBadge}</div>}
    </div>
  );
}
