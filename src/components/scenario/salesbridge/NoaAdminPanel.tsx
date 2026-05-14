import type { NoaAdminPanel as NoaAdminPanelData, NoaHeatmapCell } from '@/cases/_types';
import { cn } from '@/lib/cn';
import { NoaConversationCard } from './NoaConversationCard';
import styles from './NoaAdminPanel.module.css';

interface NoaAdminPanelProps {
  data: NoaAdminPanelData;
  onCellClick?: (cellId: string) => void;
  onActionApply?: () => void;
}

function cellKey(c: NoaHeatmapCell) {
  return `${c.partnerId}__${c.riskId}`;
}

export function NoaAdminPanel({ data, onCellClick, onActionApply }: NoaAdminPanelProps) {
  const cellMap = new Map(data.cells.map((c) => [cellKey(c), c]));

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>📊 {data.title}</div>
        {data.subtitle && <div className={styles.headerSub}>{data.subtitle}</div>}
      </div>

      <div className={styles.body}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>🎯 파트너 × 리스크 유형 교차 분석</div>
          <div className={styles.heatmapWrap}>
            <table className={styles.heatmap}>
              <thead>
                <tr>
                  <th />
                  {data.partners.map((p) => (
                    <th key={p.id}>{p.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.risks.map((r) => (
                  <tr key={r.id}>
                    <th className={styles.rowHead}>{r.label}</th>
                    {data.partners.map((p) => {
                      const cell = cellMap.get(`${p.id}__${r.id}`);
                      if (!cell) return <td key={p.id} className={styles.lv1}>—</td>;
                      return (
                        <td
                          key={p.id}
                          className={cn(
                            styles.cell,
                            styles[cell.tone],
                            cell.pulse && styles.pulse,
                          )}
                          onClick={() => cell.pulse && onCellClick?.(cellKey(cell))}
                        >
                          {cell.value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>🗺️ 리스크 비중</div>
            <div className={styles.treemap}>
              {data.treemap.map((t) => (
                <div key={t.id} className={cn(styles.treeBox, styles[t.tone])}>
                  <div className={styles.treeBoxLabel}>{t.label}</div>
                  <div className={styles.treeBoxValue}>{t.value}건</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>🔥 리스크 TOP 5</div>
            <div className={styles.topList}>
              {data.top5.map((item) => (
                <div
                  key={item.rank}
                  className={cn(styles.topItem, item.highlight && styles.highlight)}
                >
                  <span className={styles.topRank}>{item.rank}.</span>
                  <span className={styles.topLabel}>{item.label}</span>
                  <span className={styles.topDelta}>{item.delta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {data.conversationCardVisible && data.conversationCard && (
        <NoaConversationCard card={data.conversationCard} onApply={onActionApply} />
      )}

      {data.successToast && <div className={styles.successToast}>✓ {data.successToast}</div>}
    </div>
  );
}
