import { useEffect, useRef, useState } from 'react';
import type { MobilePCFormField } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './HanaPCForm.module.css';

interface HanaPCFormProps {
  title: string;
  fields: MobilePCFormField[];
  fieldRefs?: Record<string, React.RefObject<HTMLDivElement>>;
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
}

interface FieldDisplay {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  state: 'empty' | 'filled' | 'error';
}

export function HanaPCForm({
  title,
  fields,
  fieldRefs,
  actionLabel,
  onAction,
  waitText,
  typingError,
  autoFillName,
  onAdvance,
}: HanaPCFormProps) {
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
    if (typingError) {
      startTypingError();
    }
    onAction?.();
  };

  return (
    <div className={styles.form}>
      <div className={styles.titleRow}>
        <span className={styles.title}>{title}</span>
        <span className={styles.titleBadge}>사내 시스템</span>
      </div>
      {display.map((f) => {
        const innerRef = fieldRefs?.[f.id];
        return (
          <div key={f.id} className={styles.field} ref={innerRef}>
            <span className={styles.label}>{f.label}</span>
            <div className={cn(styles.input, styles[f.state])}>
              {f.value || (f.placeholder ?? '')}
            </div>
          </div>
        );
      })}
      <div className={styles.actionWrap}>
        {actionLabel && !typingActive ? (
          <button type="button" className={styles.actionBtn} onClick={handleAction}>
            {actionLabel}
          </button>
        ) : waitText ? (
          <div className={styles.waitText}>{waitText}</div>
        ) : null}
      </div>
    </div>
  );
}
