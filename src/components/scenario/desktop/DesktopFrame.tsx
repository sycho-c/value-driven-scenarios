import type { ReactNode, Ref } from 'react';
import styles from './DesktopFrame.module.css';

interface DesktopFrameProps {
  content: ReactNode;
  taskbar: ReactNode;
  scalerRef?: Ref<HTMLDivElement>;
}

export function DesktopFrame({ content, taskbar, scalerRef }: DesktopFrameProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.scaler} ref={scalerRef}>
        <div className={styles.frame}>
          <div className={styles.content}>{content}</div>
          {taskbar}
        </div>
      </div>
    </div>
  );
}
