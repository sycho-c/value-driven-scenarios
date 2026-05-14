import { useEffect, useRef, useState } from 'react';
import type { MobilePCFormField } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './HanaSubscriptionWindow.module.css';

interface HanaSubscriptionWindowProps {
  title?: string;
  fields: MobilePCFormField[];
  actionLabel?: string;
  onAction?: () => void;
  waitText?: string;
  typingError?: {
    fieldId: string;
    correctValue: string;
    wrongValue: string;
    intervalMs?: number;
    onCompleteAdvanceMs?: number;
    onCompleteAdvanceTo?: number;
  };
  autoFillName?: { fieldId: string; value: string };
  onAdvance?: (next: number) => void;
  reworkBanner?: { label: string; value: string; sub?: string };
}

interface FieldDisplay {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  state: 'empty' | 'filled' | 'error';
}

export function HanaSubscriptionWindow({
  title = '하나 청약 지원 시스템',
  fields,
  actionLabel,
  onAction,
  waitText,
  typingError,
  autoFillName,
  onAdvance,
  reworkBanner,
}: HanaSubscriptionWindowProps) {
  const [display, setDisplay] = useState<FieldDisplay[]>(() =>
    fields.map((f) => ({
      id: f.id,
      label: f.label,
      placeholder: f.placeholder,
      value: f.value ?? '',
      state: f.state ?? (f.value ? 'filled' : 'empty'),
    })),
  );
  const [typingActive, setTypingActive] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    setDisplay(
      fields.map((f) => ({
        id: f.id,
        label: f.label,
        placeholder: f.placeholder,
        value: f.value ?? '',
        state: f.state ?? (f.value ? 'filled' : 'empty'),
      })),
    );
    setTypingActive(false);
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, [fields]);

  const startTypingError = () => {
    if (!typingError) return;
    setTypingActive(true);

    if (autoFillName) {
      setDisplay((prev) =>
        prev.map((f) =>
          f.id === autoFillName.fieldId
            ? { ...f, value: autoFillName.value, state: 'filled' }
            : f,
        ),
      );
    }

    const interval = typingError.intervalMs ?? 150;
    const wrong = typingError.wrongValue;

    for (let i = 0; i <= wrong.length; i++) {
      const t = window.setTimeout(() => {
        setDisplay((prev) =>
          prev.map((f) =>
            f.id === typingError.fieldId
              ? { ...f, value: wrong.slice(0, i), state: 'filled' }
              : f,
          ),
        );
      }, i * interval);
      timeoutsRef.current.push(t);
    }

    const errorDelay = (wrong.length + 1) * interval + 300;
    const errT = window.setTimeout(() => {
      setDisplay((prev) =>
        prev.map((f) =>
          f.id === typingError.fieldId
            ? { ...f, value: wrong, state: 'error' }
            : f,
        ),
      );
    }, errorDelay);
    timeoutsRef.current.push(errT);

    if (typingError.onCompleteAdvanceTo !== undefined) {
      const advT = window.setTimeout(() => {
        onAdvance?.(typingError.onCompleteAdvanceTo!);
      }, errorDelay + (typingError.onCompleteAdvanceMs ?? 1500));
      timeoutsRef.current.push(advT);
    }
  };

  const handleAction = () => {
    if (typingError) startTypingError();
    onAction?.();
  };

  return (
    <div className={styles.window}>
      <div className={styles.titlebar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🏛️</span>
          <span>{title} — 청약접수</span>
        </div>
        <div className={styles.winControls}>
          <span>—</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <div className={styles.ribbon}>
        <span>접수</span>
        <span>조회</span>
        <span>심사</span>
        <span>지급</span>
        <span>고객관리</span>
      </div>
      <div className={styles.subBar}>
        <span className={styles.subTitle}>신규 청약 접수</span>
        <span className={styles.subBadge}>대외비 · 1급 정보</span>
      </div>
      <div className={styles.body}>
        {reworkBanner && (
          <div className={styles.reworkBanner}>
            <div className={styles.reworkBannerLeft}>
              <span className={styles.reworkIcon}>⏱</span>
              <div>
                <div className={styles.reworkLabel}>{reworkBanner.label}</div>
                {reworkBanner.sub && (
                  <div className={styles.reworkSub}>{reworkBanner.sub}</div>
                )}
              </div>
            </div>
            <div className={styles.reworkValue}>{reworkBanner.value}</div>
          </div>
        )}
        {display.map((f, i) => (
          <div key={f.id} className={styles.fieldGroup}>
            <span className={styles.label}>
              {f.label}
              <span className={styles.labelReq}>*</span>
            </span>
            <div className={cn(styles.input, styles[f.state])}>
              {f.value || (f.placeholder ?? '')}
            </div>
            {i === 1 && f.state !== 'error' && (
              <span className={styles.hint}>
                고객 동의서 사진을 보고 직접 입력 — 매번 사람이 눈으로 맞춰야 합니다.
              </span>
            )}
            {f.state === 'error' && (
              <span className={cn(styles.hint, styles.warn)}>
                ⚠️ 입력값이 원본과 일치하지 않습니다. (원본: 870512)
              </span>
            )}
          </div>
        ))}
        <div className={styles.actionRow}>
          {actionLabel && !typingActive ? (
            <button type="button" className={styles.actionBtn} onClick={handleAction}>
              {actionLabel}
            </button>
          ) : waitText ? (
            <div className={styles.waitText}>{waitText}</div>
          ) : null}
        </div>
      </div>
      <div className={styles.statusbar}>
        <span>접수번호 자동 채번 · DRAFT</span>
        <span>매니저: 정나윤</span>
      </div>
    </div>
  );
}
