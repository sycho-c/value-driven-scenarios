import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Chapter, ChapterGroupSelectDef } from '@/cases/_types';
import styles from './ChapterGroupSelect.module.css';

interface ChapterGroupSelectProps {
  select: ChapterGroupSelectDef;
  members: Chapter[];
  accentColor?: string;
  onSelect: (chapterId: number) => void;
  onSelectAll: () => void;
}

/** 시나리오 시작 전, 산업 적용 등 그룹 슬롯에서 하나를 고르게 하는 전체 화면 선택 오버레이. */
export function ChapterGroupSelect({
  select,
  members,
  accentColor,
  onSelect,
  onSelectAll,
}: ChapterGroupSelectProps) {
  const firstCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstCardRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onSelectAll();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onSelectAll]);

  return (
    <motion.div
      className={styles.overlay}
      style={accentColor ? ({ '--select-accent': accentColor } as React.CSSProperties) : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={select.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={styles.panel}
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.header}>
          {select.eyebrow && <span className={styles.eyebrow}>{select.eyebrow}</span>}
          <h2 className={styles.title}>{select.title}</h2>
          {select.subtitle && <p className={styles.subtitle}>{select.subtitle}</p>}
        </div>

        <div className={styles.cards}>
          {members.map((m, i) => (
            <button
              key={m.id}
              ref={i === 0 ? firstCardRef : undefined}
              type="button"
              className={styles.card}
              onClick={() => onSelect(m.id)}
            >
              <span className={styles.cardOption}>{m.group?.optionLabel ?? m.title}</span>
              {(m.group?.optionDesc ?? m.subtitle) && (
                <span className={styles.cardDesc}>{m.group?.optionDesc ?? m.subtitle}</span>
              )}
              <span className={styles.cardCta}>이 흐름으로 시작 →</span>
            </button>
          ))}
        </div>

        <button type="button" className={styles.allBtn} onClick={onSelectAll}>
          {select.allOptionLabel ?? '전체 흐름 보기'}
        </button>
      </motion.div>
    </motion.div>
  );
}
