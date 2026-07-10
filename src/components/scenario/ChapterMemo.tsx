import { useState, useEffect, useCallback, useRef } from 'react';
import type { MemoSection } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './ChapterMemo.module.css';

interface ChapterMemoProps {
  memo: MemoSection;
}

export function ChapterMemo({ memo }: ChapterMemoProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  // 핀치 줌(비주얼 뷰포트 확대) 시 fixed가 레이아웃 뷰포트에 남아 버튼이 화면 밖으로
  // 사라지므로, 확대 중에는 보이는 뷰포트의 우측 하단 모서리를 따라가도록 보정한다.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const sync = () => {
      const el = toggleRef.current;
      if (!el) return;
      if (vv.scale <= 1.01) {
        el.style.left = '';
        el.style.top = '';
        el.style.right = '';
        el.style.bottom = '';
        return;
      }
      const rightGap = open ? 336 : 18;
      el.style.left = `${vv.offsetLeft + vv.width - rightGap - el.offsetWidth}px`;
      el.style.top = `${vv.offsetTop + vv.height - 22 - el.offsetHeight}px`;
      el.style.right = 'auto';
      el.style.bottom = 'auto';
    };
    sync();
    vv.addEventListener('resize', sync);
    vv.addEventListener('scroll', sync);
    return () => {
      vv.removeEventListener('resize', sync);
      vv.removeEventListener('scroll', sync);
    };
  }, [open]);

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
        ref={toggleRef}
        type="button"
        className={cn(styles.toggle, open && styles.open)}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="chapter-memo-drawer"
        aria-label={open ? '연출 메모 닫기' : '연출 메모'}
        title={open ? '연출 메모 닫기' : '연출 메모'}
      >
        <span className={styles.toggleIcon}>{open ? '×' : '📓'}</span>
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
