import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './PhoneFrame.module.css';

interface PhoneFrameProps {
  children: ReactNode;
  inactive?: boolean;
  dimmer?: boolean;
  compact?: boolean;
  label?: string;
  badge?: string;
  className?: string;
}

export function PhoneFrame({
  children,
  inactive,
  dimmer,
  compact,
  label,
  badge,
  className,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        styles.phone,
        compact && styles.compact,
        inactive && styles.inactive,
        !inactive && dimmer && styles.dimmer,
        className,
      )}
    >
      <div className={styles.screen}>{children}</div>
      {label && (
        <span className={styles.label}>
          {badge && <span className={styles.badge}>{badge}</span>}
          {label}
        </span>
      )}
    </div>
  );
}
