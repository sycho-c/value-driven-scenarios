import { cn } from '@/lib/cn';
import styles from './Dashboard.module.css';

export interface DashSummary {
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface DashRow {
  id: string;
  name: string;
  sub?: string;
  value: number;
  unit?: string;
  percent: number;
  color: string;
}

interface DashboardProps {
  activeTab: 'ag' | 'br';
  tabs: Array<{ id: 'ag' | 'br'; label: string }>;
  summary: DashSummary[];
  rows: DashRow[];
  rowsTitle: string;
  rowsMeta?: string;
}

export function Dashboard({ activeTab, tabs, summary, rows, rowsTitle, rowsMeta }: DashboardProps) {
  return (
    <div className={styles.dash}>
      <div className={styles.tabs}>
        {tabs.map((t) => (
          <span key={t.id} className={cn(styles.tab, activeTab === t.id && styles.active)}>
            {t.label}
          </span>
        ))}
      </div>

      <div className={styles.summary}>
        {summary.map((s) => (
          <div key={s.label} className={styles.summaryCard}>
            <span className={styles.summaryLabel}>{s.label}</span>
            <span className={styles.summaryValue}>{s.value}</span>
            {s.sub && (
              <span
                className={cn(
                  styles.summarySub,
                  s.trend === 'up' && styles.up,
                  s.trend === 'down' && styles.down,
                )}
              >
                {s.sub}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className={styles.rowsTitle}>
        <span className={styles.rowsTitleMain}>{rowsTitle}</span>
        {rowsMeta && <span className={styles.rowsTitleMeta}>{rowsMeta}</span>}
      </div>

      <div className={styles.rows}>
        {rows.map((r) => (
          <div key={r.id} className={styles.row}>
            <div>
              <div className={styles.rowName}>{r.name}</div>
              {r.sub && <div className={styles.rowSub}>{r.sub}</div>}
            </div>
            <div className={styles.rowBar}>
              <div
                className={styles.rowBarFill}
                style={{ width: `${Math.min(100, Math.max(0, r.percent))}%`, background: r.color }}
              />
            </div>
            <div className={styles.rowValue}>
              {r.value.toLocaleString()}
              {r.unit ?? ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
