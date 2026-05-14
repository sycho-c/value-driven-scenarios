import { cn } from '@/lib/cn';
import styles from './MonogramCard.module.css';

interface MonogramCardProps {
  initial: string;
  color: string;
  org?: string;
  size?: number;
  variant?: 'default' | 'compact' | 'large';
  className?: string;
}

export function MonogramCard({
  initial,
  color,
  org,
  size = 36,
  variant = 'default',
  className,
}: MonogramCardProps) {
  return (
    <div
      className={cn(
        styles.card,
        variant === 'compact' && styles.compact,
        variant === 'large' && styles.large,
        className,
      )}
      style={
        {
          width: size,
          height: size,
          ['--mono-bg' as never]: color,
        } as React.CSSProperties
      }
    >
      <span className={styles.initial}>{initial}</span>
      {org && <span className={styles.org}>{org}</span>}
    </div>
  );
}
