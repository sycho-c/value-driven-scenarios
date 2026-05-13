import type { ComparisonBox as ComparisonBoxDef } from '@/cases/_types';
import styles from './ComparisonBox.module.css';

interface ComparisonBoxProps {
  data: ComparisonBoxDef;
}

export function ComparisonBox({ data }: ComparisonBoxProps) {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <div className={styles.title}>📊 {data.title}</div>
        <div className={styles.subtitle}>{data.subtitle}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.headerRow}>
          <span />
          <span className={styles.headerCh1}>Ch.1 카톡</span>
          <span className={styles.headerCh2}>Ch.2 Cowork+</span>
        </div>
        {data.rows.map((r, i) => (
          <div key={i} className={styles.row}>
            <span className={styles.rowLabel}>{r.label}</span>
            <span className={styles.rowCh1}>{r.ch1}</span>
            <span className={styles.rowCh2}>{r.ch2}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
