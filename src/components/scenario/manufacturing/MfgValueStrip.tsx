import type { MfgValueStripDef } from '@/cases/_types';
import styles from './MfgValueStrip.module.css';

/** 원본 데모의 하단 3대 요건 스트립 — 영업 멘트의 근거를 무대 아래 상시 노출 */
export function MfgValueStrip({ value }: { value: MfgValueStripDef }) {
  return (
    <div className={styles.strip}>
      <div className={`${styles.card} ${styles.sell}`}>
        <div className={styles.label}>셀링포인트</div>
        <div className={styles.body}>{value.sell}</div>
      </div>
      <div className={`${styles.card} ${styles.pain}`}>
        <div className={styles.label}>페인포인트</div>
        <div className={styles.body}>{value.pain}</div>
      </div>
      <div className={`${styles.card} ${styles.roi}`}>
        <div className={styles.label}>ROI</div>
        <div className={styles.body}>{value.roi}</div>
      </div>
    </div>
  );
}
