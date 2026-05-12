import { cn } from '@/lib/cn';
import styles from './StateBar.module.css';

interface StateBarProps {
  total: number;
  current: number;
  onJump?: (index: number) => void;
}

export function StateBar({ total, current, onJump }: StateBarProps) {
  return (
    <div className={styles.bar}>
      {Array.from({ length: total }, (_, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className={cn(styles.dot, isActive && styles.active, isDone && styles.done)}
              onClick={() => onJump?.(i)}
              aria-label={`State ${i}`}
            >
              {isDone ? '✓' : i}
            </button>
            {i < total - 1 && (
              <span className={cn(styles.connector, isDone && styles.done)} />
            )}
          </div>
        );
      })}
    </div>
  );
}
