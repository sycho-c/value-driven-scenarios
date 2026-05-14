import type { ReactNode, Ref } from 'react';
import { cn } from '@/lib/cn';
import styles from './DesktopFrame.module.css';

interface DesktopFrameProps {
  content: ReactNode;
  taskbar: ReactNode;
  scalerRef?: Ref<HTMLDivElement>;
  /** 외부 폰과 나란히 배치될 때 사용하는 좁은 모드 */
  compact?: boolean;
}

export function DesktopFrame({ content, taskbar, scalerRef, compact }: DesktopFrameProps) {
  return (
    <div className={cn(styles.shell, compact && styles.shellCompact)}>
      <div className={cn(styles.fitter, compact && styles.fitterCompact)}>
        <div className={cn(styles.scaler, compact && styles.scalerCompact)} ref={scalerRef}>
          <div className={styles.frame}>
            <div className={styles.content}>{content}</div>
            {taskbar}
          </div>
        </div>
      </div>
    </div>
  );
}
