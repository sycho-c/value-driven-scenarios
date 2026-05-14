import { useEffect, useState } from 'react';
import type { MobilePCTaskField } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './HanaTaskPanel.module.css';

interface HanaTaskPanelProps {
  title: string;
  fields: MobilePCTaskField[];
  fieldRefs?: Record<string, React.RefObject<HTMLDivElement>>;
  revealedIds?: Set<string>;
  actionLabel?: string;
  actionEnabled?: boolean;
  onAction?: () => void;
}

export function HanaTaskPanel({
  title,
  fields,
  fieldRefs,
  revealedIds,
  actionLabel,
  actionEnabled,
  onAction,
}: HanaTaskPanelProps) {
  const [internalRevealed, setInternalRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const set = new Set<string>();
    fields.forEach((f) => {
      if (f.revealed) set.add(f.id);
    });
    setInternalRevealed(set);
  }, [fields]);

  const isRevealed = (id: string) =>
    revealedIds?.has(id) || internalRevealed.has(id);

  return (
    <div className={styles.panel}>
      <div className={styles.titleRow}>
        <span className={styles.title}>{title}</span>
        <span className={styles.titleBadge}>NER · AUTO</span>
      </div>
      <div className={styles.card}>
        {fields.map((f) => {
          const revealed = isRevealed(f.id);
          return (
            <div key={f.id} className={styles.field} ref={fieldRefs?.[f.id]}>
              <div className={styles.fieldLabel}>{f.label}</div>
              <div
                className={cn(
                  styles.fieldValue,
                  revealed ? styles.revealed : styles.hidden,
                )}
              >
                {revealed ? f.value : '·'}
              </div>
            </div>
          );
        })}
      </div>
      {actionLabel && (
        <button
          type="button"
          className={cn(styles.action, actionEnabled && styles.pulse)}
          onClick={onAction}
          disabled={!actionEnabled}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
