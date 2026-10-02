import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { CaseVariantSelectDef } from '@/cases/_types';
import styles from './ChapterGroupSelect.module.css';

interface CaseVariantSelectProps {
  select: CaseVariantSelectDef;
  accentColor?: string;
  onSelect: (variant: 'guided' | 'live') => void;
}

/** 같은 시나리오의 두 가지 진행 방식(단계 안내형 · 직접 체험형) 중 하나를 고르는 진입 화면. */
export function CaseVariantSelect({ select, accentColor, onSelect }: CaseVariantSelectProps) {
  const firstCardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstCardRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onSelect('guided');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onSelect]);

  const options: Array<{ key: 'guided' | 'live'; label: string; desc: string }> = [
    { key: 'guided', ...select.guided },
    { key: 'live', label: select.live.label, desc: select.live.desc },
  ];

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
          {options.map((o, i) => (
            <button
              key={o.key}
              ref={i === 0 ? firstCardRef : undefined}
              type="button"
              className={styles.card}
              onClick={() => onSelect(o.key)}
            >
              <span className={styles.cardOption}>{o.label}</span>
              <span className={styles.cardDesc}>{o.desc}</span>
              <span className={styles.cardCta}>이 방식으로 시작 →</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
