import type { ExecPdfDoc } from '@/cases/_types';
import styles from './ExecBriefPdfModal.module.css';

interface ExecBriefPdfModalProps {
  doc: ExecPdfDoc;
  onDismiss?: () => void;
}

export function ExecBriefPdfModal({ doc, onDismiss }: ExecBriefPdfModalProps) {
  return (
    <div className={styles.backdrop} onClick={onDismiss}>
      <div className={styles.doc} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.tag}>CONFIDENTIAL — 가온전선 영업본부 보고</div>
          <div className={styles.title}>{doc.title}</div>
          <div className={styles.subtitle}>{doc.subtitle}</div>
          <div className={styles.meta}>{doc.meta}</div>
          <button type="button" className={styles.close} onClick={onDismiss}>
            ✕
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>매출 리스크 및 전략적 통찰</div>
            {doc.insights.map((ins, i) => (
              <div key={i} className={styles.insight}>
                <div className={styles.insightLabel}>{ins.label}</div>
                <div className={styles.insightQuote}>{ins.quote}</div>
                <div className={styles.insightAction}>{ins.action}</div>
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              {doc.qaTitle ?? '조직 응대 품질 (AI QA 전수조사)'}
            </div>
            <ul className={styles.qaList}>
              {doc.qaBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className={styles.footer}>{doc.footer}</div>
        </div>
      </div>
    </div>
  );
}
