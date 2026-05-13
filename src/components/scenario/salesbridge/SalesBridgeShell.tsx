import type { SalesBridgeState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import { PartnerListPanel } from './PartnerListPanel';
import { BizFormCard } from './BizFormCard';
import { PartnerInfoPanel } from './PartnerInfoPanel';
import { BlockedFileModal } from './BlockedFileModal';
import { ComparisonBox } from './ComparisonBox';
import styles from './SalesBridgeShell.module.css';

interface SalesBridgeShellProps {
  state: SalesBridgeState;
  onPartnerClick?: (id: string) => void;
  onFileClick?: (fileId: string) => void;
  onModalConfirm?: () => void;
}

export function SalesBridgeShell({
  state,
  onPartnerClick,
  onFileClick,
  onModalConfirm,
}: SalesBridgeShellProps) {
  return (
    <div className={styles.window}>
      <div className={styles.titlebar}>
        <div className={styles.titleLeft}>
          <div className={styles.brandMark}>DW</div>
          <div>
            <div>DWorks Cowork+</div>
            <div className={styles.titleSub}>가온전선 영업지원팀</div>
          </div>
        </div>
        <div className={styles.userArea}>
          <div className={styles.userAvatar}>강</div>
          <span>강승희 · 영업지원팀</span>
        </div>
      </div>
      {state.topBanner && (
        <div className={styles.banner}>
          <span>{state.topBanner}</span>
          {state.topMeta && <span className={styles.bannerMeta}>{state.topMeta}</span>}
        </div>
      )}
      <div className={styles.body}>
        <PartnerListPanel state={state} onPartnerClick={onPartnerClick} />
        <BizFormCard main={state.mainContent} onFileClick={onFileClick} />
        {state.rightPanel ? (
          <PartnerInfoPanel data={state.rightPanel} />
        ) : (
          <div className={styles.empty} style={{ background: '#fff' }}>
            거래처 선택 시 정보가 표시됩니다.
          </div>
        )}

        {state.toast && (
          <div className={cn(styles.toast, state.toast.tone === 'warn' && styles.warn)}>
            <div className={styles.toastTitle}>{state.toast.title}</div>
            <div className={styles.toastBody}>{state.toast.body}</div>
          </div>
        )}

        {state.comparisonBox && (
          <div className={styles.comparisonWrapper}>
            <ComparisonBox data={state.comparisonBox} />
          </div>
        )}

        {state.modal && (
          <div className={styles.modalBackdrop}>
            <BlockedFileModal modal={state.modal} onConfirm={onModalConfirm} />
          </div>
        )}
      </div>
      <div className={styles.statusbar}>
        <span>DWorks Cowork+ · {state.badgeMessage ?? '연결됨'}</span>
        <span>
          {state.clockTime} · {state.clockDate}
        </span>
      </div>
    </div>
  );
}
