import type { TaskbarApp } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './DesktopTaskbar.module.css';

interface DesktopTaskbarProps {
  apps: TaskbarApp[];
  clockTime: string;
  clockDate: string;
}

export function DesktopTaskbar({ apps, clockTime, clockDate }: DesktopTaskbarProps) {
  return (
    <div className={styles.taskbar}>
      <div className={styles.start}>⊞ 시작</div>
      <div className={styles.icons}>
        {apps.map((a) => (
          <div key={a.id} className={cn(styles.icon, a.active && styles.iconActive)}>
            <span className={styles.emoji}>{a.icon}</span>
            <span>{a.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.clock}>
        <div className={styles.clockTime}>{clockTime}</div>
        <div className={styles.clockDate}>{clockDate}</div>
      </div>
    </div>
  );
}
