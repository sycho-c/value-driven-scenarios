import { type ReactNode, useState } from 'react';
import type { ChapterStateNode, RcQuestionChoice, RcRiskSummaryItem } from '@/cases/_types';
import styles from './StageRentacarPanel.module.css';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

// ─── Question View ────────────────────────────────────────────────────────────
function QuestionView({
  question,
  questionSub,
  choices,
  onAdvance,
}: {
  question: string;
  questionSub?: string;
  choices?: RcQuestionChoice[];
  onAdvance?: (nextIndex: number) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleChoice(id: string) {
    setSelectedId(id);
    if (onAdvance) onAdvance(0);
  }

  return (
    <div className={styles.questionWrap}>
      <div className={styles.questionBody}>
        <p className={styles.questionText}>{question}</p>
        {questionSub && <p className={styles.questionSub}>{questionSub}</p>}
        {choices && choices.length > 0 && (
          <div className={styles.choiceList}>
            {choices.map((c) => (
              <button
                key={c.id}
                className={`${styles.choiceBtn} ${selectedId === c.id ? styles.choiceSelected : ''}`}
                onClick={() => handleChoice(c.id)}
                type="button"
              >
                <span className={styles.choiceLabel}>{c.label}</span>
                {c.hint && <span className={styles.choiceHint}>{c.hint}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty COSS View ──────────────────────────────────────────────────────────
function EmptyCossView({
  cossTitle,
  cossMeta,
  cossHint,
  searchName,
}: {
  cossTitle?: string;
  cossMeta?: string;
  cossHint?: string;
  searchName?: string;
}) {
  return (
    <div className={styles.cossWrap}>
      <div className={styles.cossHeader}>
        <div className={styles.cossBrand}>
          <span className={styles.cossBrandBadge}>Cowork+</span>
          <span className={styles.cossBrandSep}>/</span>
          <span className={styles.cossBrandSub}>COSS</span>
        </div>
        <h2 className={styles.cossTitle}>{cossTitle ?? '오늘 팀 상담 현황'}</h2>
        {cossMeta && <p className={styles.cossMeta}>{cossMeta}</p>}
      </div>

      <div className={styles.cossSearchRow}>
        <div className={styles.cossSearchBox}>
          <span className={styles.cossSearchIcon}>🔍</span>
          <input
            className={styles.cossSearchInput}
            placeholder={searchName ?? '고객명 / 차량번호 검색'}
            readOnly
          />
        </div>
      </div>

      <div className={styles.cossTableWrap}>
        <div className={styles.cossTableHeader}>
          <span>고객명</span>
          <span>채널</span>
          <span>유입시각</span>
          <span>처리상태</span>
        </div>
        <div className={styles.cossEmptyBody}>
          <div className={styles.cossEmptyIcon}>📋</div>
          <p className={styles.cossEmptyLabel}>오늘 상담 건수: 0</p>
          <p className={styles.cossEmptyDesc}>조회된 상담 내역이 없습니다</p>
        </div>
      </div>

      {cossHint && (
        <div className={styles.cossHintBox}>
          <span className={styles.cossHintIcon}>💡</span>
          <p className={styles.cossHintText}>{cossHint}</p>
        </div>
      )}
    </div>
  );
}

// ─── Risk Summary View ────────────────────────────────────────────────────────
function RiskSummaryView({
  riskTitle,
  riskItems,
  riskRootCause,
}: {
  riskTitle?: string;
  riskItems?: RcRiskSummaryItem[];
  riskRootCause?: string;
}) {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className={styles.riskWrap}>
      {riskTitle && <h2 className={styles.riskTitle}>{riskTitle}</h2>}

      {riskItems && riskItems.length > 0 && (
        <div className={styles.riskCards}>
          {riskItems.map((item, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.riskCard} ${styles[`riskCard--${item.tone}`]} ${activeId === i ? styles.riskCardActive : ''}`}
              onClick={() => setActiveId(activeId === i ? null : i)}
            >
              <span className={styles.riskCardIcon}>{item.icon}</span>
              <span className={styles.riskCardTitle}>{item.title}</span>
              <span className={styles.riskCardValue}>{item.value}</span>
              <span className={styles.riskCardDesc}>{item.desc}</span>
            </button>
          ))}
        </div>
      )}

      {riskRootCause && (
        <div className={styles.riskRootBox}>
          <div className={styles.riskRootArrows}>
            <span className={styles.riskRootArrow}>↑</span>
            <span className={styles.riskRootArrow}>↑</span>
            <span className={styles.riskRootArrow}>↑</span>
          </div>
          <div className={styles.riskRootCause}>
            <span className={styles.riskRootCauseIcon}>⚠️</span>
            <p className={styles.riskRootCauseText}>{riskRootCause}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function StageRentacarPanel({ state, actions, onAdvance }: Props) {
  const panel = state.rentacarPanel;

  if (!panel) {
    return (
      <div className={styles.root}>
        <div className={styles.fallback}>
          <p>패널 데이터가 없습니다.</p>
        </div>
        {actions && <div className={styles.controlActions}>{actions}</div>}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {panel.view === 'question' && (
          <QuestionView
            question={panel.question ?? ''}
            questionSub={panel.questionSub}
            choices={panel.choices}
            onAdvance={onAdvance}
          />
        )}
        {panel.view === 'empty-coss' && (
          <EmptyCossView
            cossTitle={panel.cossTitle}
            cossMeta={panel.cossMeta}
            cossHint={panel.cossHint}
            searchName={panel.searchName}
          />
        )}
        {panel.view === 'risk-summary' && (
          <RiskSummaryView
            riskTitle={panel.riskTitle}
            riskItems={panel.riskItems}
            riskRootCause={panel.riskRootCause}
          />
        )}
      </div>
      {actions && <div className={styles.controlActions}>{actions}</div>}
    </div>
  );
}
