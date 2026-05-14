import type { ReactNode } from 'react';
import type { SalesBridgeState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import { PartnerListPanel } from './PartnerListPanel';
import { BizFormCard } from './BizFormCard';
import { PartnerInfoPanel } from './PartnerInfoPanel';
import { BlockedFileModal } from './BlockedFileModal';
import { ComparisonBox } from './ComparisonBox';
import { DeliveryStatusBox } from '../desktop/DeliveryStatusBox';
import { ShareFailureModal } from '../overlays/ShareFailureModal';
import { AutoVizSequence } from '../moments/AutoVizSequence';
import { NoaAdminPanel } from './NoaAdminPanel';
import { ExecDashboardPanel } from './ExecDashboardPanel';
import styles from './SalesBridgeShell.module.css';

interface SalesBridgeShellProps {
  state: SalesBridgeState;
  onPartnerClick?: (id: string) => void;
  onFileClick?: (fileId: string) => void;
  onModalConfirm?: () => void;
  onShareFailureConfirm?: () => void;
  onAutoVizContinue?: () => void;
  onNoaCellClick?: (cellId: string) => void;
  onNoaActionApply?: () => void;
  onExecExportPdf?: () => void;
  onExecDismissPdf?: () => void;
  leftPhoneColumn?: ReactNode;
}

export function SalesBridgeShell({
  state,
  onPartnerClick,
  onFileClick,
  onModalConfirm,
  onShareFailureConfirm,
  onAutoVizContinue,
  onNoaCellClick,
  onNoaActionApply,
  onExecExportPdf,
  onExecDismissPdf,
  leftPhoneColumn,
}: SalesBridgeShellProps) {
  const blockedModal = state.blockedFileModal;
  const banner = state.comparisonBanner;
  const isFullPanel =
    state.mainContent.kind === 'noa-admin' || state.mainContent.kind === 'exec-dashboard';

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
      {banner && (
        <div className={styles.comparisonBanner}>
          <div className={styles.bannerTitle}>{banner.title}</div>
          <div className={styles.bannerSub}>{banner.subtitle}</div>
          <div className={styles.bannerRows}>
            {banner.rows.map((row, i) => (
              <div key={i} className={styles.bannerRow}>
                <span className={styles.rowLabel}>{row.label}</span>
                <span className={styles.rowCh1}>{row.ch1}</span>
                <span className={styles.rowCh2}>{row.ch2}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className={cn(
          styles.body,
          leftPhoneColumn && styles.bodyWithLeftPhone,
          isFullPanel && styles.bodyFull,
        )}
      >
        {leftPhoneColumn && <div className={styles.phoneColumn}>{leftPhoneColumn}</div>}
        {isFullPanel ? (
          <>
            {state.mainContent.kind === 'noa-admin' && state.noaAdmin && (
              <NoaAdminPanel
                data={state.noaAdmin}
                onCellClick={onNoaCellClick}
                onActionApply={onNoaActionApply}
              />
            )}
            {state.mainContent.kind === 'exec-dashboard' && state.execDashboard && (
              <ExecDashboardPanel
                data={state.execDashboard}
                onExportPdf={onExecExportPdf}
                onDismissPdf={onExecDismissPdf}
              />
            )}
          </>
        ) : (
          <>
            <PartnerListPanel state={state} onPartnerClick={onPartnerClick} />
            <BizFormCard main={state.mainContent} onFileClick={onFileClick} />
            {state.rightPanel ? (
              <PartnerInfoPanel data={state.rightPanel} />
            ) : (
              <div className={styles.empty} style={{ background: '#fff' }}>
                거래처 선택 시 정보가 표시됩니다.
              </div>
            )}
          </>
        )}

        {state.toast && (
          <div className={cn(styles.toast, state.toast.tone === 'warn' && styles.warn)}>
            <div className={styles.toastTitle}>{state.toast.title}</div>
            <div className={styles.toastBody}>{state.toast.body}</div>
          </div>
        )}

        {state.sosBanner && (
          <div className={styles.sosBanner}>
            <span className={styles.sosTitle}>{state.sosBanner.title}</span>
            <span className={styles.sosBody}>{state.sosBanner.body}</span>
          </div>
        )}

        {state.comparisonBox && (
          <div className={styles.comparisonWrapper}>
            <ComparisonBox data={state.comparisonBox} />
          </div>
        )}

        {state.deliveryStatus && (
          <div className={styles.deliveryWrapper}>
            <DeliveryStatusBox data={state.deliveryStatus} />
          </div>
        )}

        {blockedModal && (
          <div className={styles.modalBackdrop}>
            <BlockedFileModal modal={blockedModal} onConfirm={onModalConfirm} />
          </div>
        )}

        {state.shareFailureModal && (
          <div className={styles.modalBackdrop}>
            <ShareFailureModal
              data={state.shareFailureModal}
              onConfirm={onShareFailureConfirm}
            />
          </div>
        )}

        {state.autoVizModal && (
          <div className={styles.modalBackdrop}>
            <AutoVizSequence
              data={state.autoVizModal}
              onDismiss={onAutoVizContinue}
            />
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
