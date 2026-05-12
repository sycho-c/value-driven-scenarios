import type { OperatorPanelCard } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './Workspace.module.css';

const KIND_LABEL: Record<OperatorPanelCard['kind'], string> = {
  'auto-assign': '자동 배정',
  'tracking-code': '추적 코드',
  'new-task': '신규 태스크',
  'audit-log': '감사 로그',
  compliance: '컴플라이언스',
};

interface OperatorPanelProps {
  cards: OperatorPanelCard[];
}

export function OperatorPanel({ cards }: OperatorPanelProps) {
  if (cards.length === 0) return null;
  return (
    <aside className={styles.panelPane}>
      <div className={styles.panelTitle}>운영자 패널</div>
      {cards.map((card) => (
        <div key={card.id} className={cn(styles.panelCard, card.tone && styles[card.tone])}>
          <span className={styles.panelCardKind}>{KIND_LABEL[card.kind]}</span>
          <div className={styles.panelCardTitle}>{card.title}</div>
          <p className={styles.panelCardBody}>{card.body}</p>
          {card.highlight && (
            <div className={styles.panelCardHighlight}>{card.highlight}</div>
          )}
          {card.meta && <div className={styles.panelCardMeta}>{card.meta}</div>}
        </div>
      ))}
    </aside>
  );
}
