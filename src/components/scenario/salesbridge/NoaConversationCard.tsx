import type { NoaConversationCardDef } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './NoaConversationCard.module.css';

interface NoaConversationCardProps {
  card: NoaConversationCardDef;
  onApply?: () => void;
}

export function NoaConversationCard({ card, onApply }: NoaConversationCardProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span>✨ AI 대화 분석 카드 ({card.partnerLabel})</span>
          <span className={styles.headerId}>{card.convId}</span>
        </div>
        <div className={styles.body}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>대화 요약</span>
            <div className={styles.sectionBody}>{card.summary}</div>
            <span className={styles.sectionLabel} style={{ marginTop: 10 }}>
              핵심 인사이트 (Core Insight)
            </span>
            <div className={cn(styles.sectionBody, styles.insight)}>{card.coreInsight}</div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>리스크 원인</span>
            <div className={styles.sectionBody}>{card.riskCause}</div>
            <div className={styles.actionBox}>
              <span className={styles.actionLabel}>🚀 즉시 실행 (Action Item)</span>
              <div className={styles.actionTitle}>{card.actionTitle}</div>
              <div className={styles.actionDesc}>{card.actionDesc}</div>
              <button
                type="button"
                className={cn(styles.actionBtn, card.actionApplied && styles.applied)}
                onClick={() => !card.actionApplied && onApply?.()}
                disabled={card.actionApplied}
              >
                {card.actionApplied ? '✓ 적용 완료 — 강승희 사원에게 전달됨' : card.actionCtaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
