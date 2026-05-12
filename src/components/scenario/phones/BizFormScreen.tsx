import type { PhoneScreen } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './BizFormScreen.module.css';

interface FieldDef {
  label: string;
  value: string;
  auto?: boolean;
  masked?: boolean;
}

interface BizFormScreenProps {
  screen: PhoneScreen;
}

export function BizFormScreen({ screen }: BizFormScreenProps) {
  const fields = ((screen.meta as { fields?: FieldDef[] } | undefined)?.fields ?? []) as FieldDef[];
  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <div className={styles.headerMain}>📋 {screen.headerTitle ?? '비즈폼'}</div>
        {screen.headerSubtitle && <div className={styles.headerSub}>{screen.headerSubtitle}</div>}
      </div>
      <div className={styles.body}>
        {fields.map((f) => (
          <div key={f.label} className={styles.field}>
            <div className={styles.label}>
              <span>{f.label}</span>
              {f.auto && <span className={styles.autoBadge}>자동입력</span>}
            </div>
            <div className={cn(styles.value, f.masked && styles.masked)}>{f.value}</div>
          </div>
        ))}
        <div className={styles.cta}>제출하기</div>
      </div>
    </div>
  );
}
