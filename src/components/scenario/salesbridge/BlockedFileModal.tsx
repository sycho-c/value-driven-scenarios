import type { BlockedFileModal as BlockedFileModalDef } from '@/cases/_types';
import styles from './BlockedFileModal.module.css';

interface BlockedFileModalProps {
  modal: BlockedFileModalDef;
  onConfirm?: () => void;
}

export function BlockedFileModal({ modal, onConfirm }: BlockedFileModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <span>🚫</span>
        <span>{modal.title}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{modal.body}</div>
        <div className={styles.compare}>
          <span className={styles.compareLabel}>응대 거래처</span>
          <span className={styles.compareValue}>{modal.expectedPartner}</span>
          <span className={styles.compareLabel}>파일 거래처</span>
          <span className={styles.compareValue}>{modal.actualPartner}</span>
        </div>
        <div className={styles.expected}>✓ 올바른 파일: {modal.correctFile}</div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={(e) => {
              e.stopPropagation();
              onConfirm?.();
            }}
          >
            {modal.primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
