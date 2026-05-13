import type { PartnerInfoPanel as PartnerInfoPanelDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PartnerInfoPanel.module.css';

interface PartnerInfoPanelProps {
  data: PartnerInfoPanelDef;
}

export function PartnerInfoPanel({ data }: PartnerInfoPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.section}>거래처 정보</div>
      <div className={styles.partnerHeader}>
        <div className={cn(styles.partnerIcon, styles[data.partnerTone ?? 'miu'])}>📋</div>
        <div className={styles.partnerName}>
          <div className={styles.partnerTitle}>{data.partnerName}</div>
          {data.partnerSize && <div className={styles.partnerSize}>{data.partnerSize}</div>}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardLabel}>계약 단가</div>
        <div className={styles.cardCode}>{data.contractPrice.code}</div>
        <div className={styles.cardValue}>{data.contractPrice.value}</div>
      </div>

      <div>
        <div className={styles.section}>계약일</div>
        <div className={styles.contractDate}>{data.contractDate}</div>
      </div>

      <div className={styles.divider} />

      <div>
        <div className={styles.section} style={{ marginBottom: 8 }}>
          최근 이력
        </div>
        <div className={styles.history}>
          {data.recentHistory.map((h, i) => (
            <div key={i} className={styles.historyRow}>
              <span className={cn(styles.historyDot, styles[h.tone ?? 'good'])} />
              <span className={styles.historyDate}>{h.date}</span>
              <span className={styles.historyLabel}>{h.label}</span>
            </div>
          ))}
        </div>
      </div>

      {data.guestMessage && (
        <>
          <div className={styles.divider} />
          <div className={styles.section}>거래처 메시지</div>
          <div className={styles.guestNote}>{data.guestMessage}</div>
        </>
      )}
    </div>
  );
}
