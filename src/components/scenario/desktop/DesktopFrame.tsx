import { useEffect, useRef, useState, type ReactNode, type Ref } from 'react';
import { cn } from '@/lib/cn';
import styles from './DesktopFrame.module.css';

/** 스케일 기준이 되는 PC 캔버스 원본 크기 */
const CANVAS_W = 1400;
const CANVAS_H = 780;

interface DesktopFrameProps {
  content: ReactNode;
  taskbar: ReactNode;
  scalerRef?: Ref<HTMLDivElement>;
  /** 외부 폰과 나란히 배치될 때 사용하는 좁은 모드 */
  compact?: boolean;
  /** 부모 컬럼 너비를 실측해 100% 채우는 모드 — 워크스페이스 창과 같은 박스로 정렬된다 */
  fluid?: boolean;
}

export function DesktopFrame({ content, taskbar, scalerRef, compact, fluid }: DesktopFrameProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [hostWidth, setHostWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!fluid) return;
    const el = hostRef.current;
    if (!el) return;
    const measure = () => setHostWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fluid]);

  const scale = fluid && hostWidth ? hostWidth / CANVAS_W : null;

  return (
    <div
      ref={hostRef}
      className={cn(styles.shell, compact && styles.shellCompact)}
      style={fluid ? { padding: 0 } : undefined}
    >
      <div
        className={cn(styles.fitter, compact && styles.fitterCompact)}
        style={scale ? { width: '100%', height: CANVAS_H * scale } : undefined}
      >
        <div
          className={cn(styles.scaler, compact && styles.scalerCompact)}
          style={scale ? { transform: `scale(${scale})` } : undefined}
          ref={scalerRef}
        >
          <div className={styles.frame}>
            <div className={styles.content}>{content}</div>
            {taskbar}
          </div>
        </div>
      </div>
    </div>
  );
}
