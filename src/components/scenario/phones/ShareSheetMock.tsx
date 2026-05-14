import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import styles from './ShareSheetMock.module.css';

export interface ShareApp {
  id: string;
  label: string;
  icon: string;
  disabled?: boolean;
  highlight?: boolean;
}

interface ShareSheetMockProps {
  title?: string;
  apps: ShareApp[];
}

export function ShareSheetMock({ title = '공유', apps }: ShareSheetMockProps) {
  return (
    <motion.div
      className={styles.sheet}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.grid}>
        {apps.map((app) => (
          <div
            key={app.id}
            className={cn(
              styles.app,
              app.disabled && styles.disabled,
              app.highlight && styles.coworkApp,
            )}
          >
            <span className={styles.appIcon}>{app.icon}</span>
            <span className={styles.appLabel}>{app.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
