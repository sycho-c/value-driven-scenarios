import { useState, useEffect, useCallback } from 'react';
import type { MemoSection } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './ChapterMemo.module.css';

interface ChapterMemoProps {
  memo: MemoSection;
}

export function ChapterMemo({ memo }: ChapterMemoProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={cn(styles.toggle, open && styles.open)}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="chapter-memo-drawer"
      >
        <span className={styles.toggleIcon}>{open ? '×' : '📓'}</span>
        <span className={styles.toggleLabel}>{open ? '닫기' : '연출 메모'}</span>
      </button>

      <div className={cn(styles.backdrop, open && styles.open)} onClick={close} />

      <aside
        id="chapter-memo-drawer"
        className={cn(styles.drawer, open && styles.open)}
        aria-label="시나리오 메모"
        aria-hidden={!open}
      >
        <div className={styles.drawerHead}>
          <div>
            <div className={styles.drawerLabel}>연출 노트</div>
            <div className={styles.title}>{memo.title}</div>
            {memo.meta && <div className={styles.meta}>{memo.meta}</div>}
          </div>
          <button type="button" className={styles.closeBtn} onClick={close} aria-label="메모 닫기">
            ×
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <div className={styles.sectionTitle}>상황</div>
          <p className={styles.sectionBody}>{memo.situation}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>사용자가 만지는 것</div>
          <p className={styles.sectionBody}>{memo.interact}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>청중이 느끼는 것</div>
          <ul className={styles.list}>
            {memo.feel.map((f, i) => (
              <li key={i} className={cn(styles.listItem, styles.audienceItem)}>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>시나리오 연결</div>
          <ul className={styles.list}>
            {memo.connect.map((c, i) => (
              <li key={i} className={cn(styles.listItem, styles.connectItem)}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
