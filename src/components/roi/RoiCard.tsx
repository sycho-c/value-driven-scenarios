import type { RoiCardDef, RoiTrend } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './RoiCard.module.css';

interface RoiCardProps {
  def: RoiCardDef;
}

function trendDisplay(trend: RoiTrend | undefined, hasValue: boolean) {
  if (!hasValue || !trend || trend === 'neutral') return null;
  if (trend === 'up-good') return { arrow: '▲', tone: 'good' as const };
  if (trend === 'down-good') return { arrow: '▼', tone: 'good' as const };
  return null;
}

export function RoiCard({ def }: RoiCardProps) {
  const hasValue = def.value !== null && def.value !== undefined;
  const trend = trendDisplay(def.trend, hasValue);

  return (
    <div className={cn(styles.card, !hasValue && styles.placeholder)}>
      {!hasValue && <span className={styles.placeholderHint}>측정 예정</span>}
      <div className={styles.valueRow}>
        {def.prefix && <span className={styles.unit}>{def.prefix}</span>}
        <span className={cn(styles.value, !hasValue && styles.placeholder)}>
          {hasValue ? def.value!.toLocaleString() : '──'}
        </span>
        {def.unit && (
          <span className={cn(styles.unit, !hasValue && styles.placeholder)}>{def.unit}</span>
        )}
        {trend && <span className={cn(styles.trendArrow, styles[trend.tone])}>{trend.arrow}</span>}
      </div>
      <div className={styles.label}>{def.label}</div>
      {def.caption && (
        <div className={cn(styles.caption, !hasValue && styles.placeholder)}>{def.caption}</div>
      )}
    </div>
  );
}
