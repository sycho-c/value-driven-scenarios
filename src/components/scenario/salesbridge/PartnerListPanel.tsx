import type { PartnerListItem, SalesBridgeState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PartnerListPanel.module.css';

interface PartnerListPanelProps {
  state: SalesBridgeState;
  onPartnerClick?: (id: string) => void;
}

export function PartnerListPanel({ state, onPartnerClick }: PartnerListPanelProps) {
  const c = state.liveCounter;
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.section}>거래처 라이브</div>
        {c ? (
          <>
            <div className={styles.liveCounter}>
              <span className={styles.liveNumber}>{c.current}</span>
              <span className={styles.liveSlash}>/</span>
              <span className={styles.liveTotal}>{c.total}</span>
            </div>
            <div className={styles.liveLabel}>{c.label}</div>
          </>
        ) : (
          <div className={styles.liveLabel}>입장 대기 중...</div>
        )}
        <div className={styles.search}>
          <span>🔍</span>
          <span>거래처 검색</span>
        </div>
      </div>
      {state.partnerListMeta && (
        <div className={styles.meta}>{state.partnerListMeta}</div>
      )}
      <div className={styles.list}>
        {state.partnerList.length === 0 && (
          <div className={styles.empty}>입장 대기 중...</div>
        )}
        {state.partnerList.map((p: PartnerListItem) => (
          <div
            key={p.id}
            className={cn(
              styles.item,
              state.activePartnerId === p.id && styles.active,
              p.pulse && styles.pulse,
            )}
            onClick={(e) => {
              e.stopPropagation();
              onPartnerClick?.(p.id);
            }}
          >
            <span className={cn(styles.dot, styles[p.status ?? 'normal'])} />
            <div className={styles.itemContent}>
              <div className={styles.itemName}>{p.label}</div>
              {p.sub && <div className={styles.itemSub}>{p.sub}</div>}
            </div>
            {!!p.badge && p.badge > 0 && <span className={styles.badge}>{p.badge}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
