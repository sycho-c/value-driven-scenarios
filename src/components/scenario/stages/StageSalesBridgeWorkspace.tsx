import type { ReactNode } from 'react';
import type { ChapterStateNode, PhoneScreen } from '@/cases/_types';
import { DesktopFrame } from '../desktop/DesktopFrame';
import { DesktopTaskbar } from '../desktop/DesktopTaskbar';
import { SalesBridgeShell } from '../salesbridge/SalesBridgeShell';
import { PhoneFrame } from '../phones/PhoneFrame';
import { PhoneScreenView } from '../phones/PhoneScreenView';
import { PhoneChannelHeader } from '../phones/PhoneChannelHeader';
import { MomentRenderer } from '../moments/MomentRenderer';
import { cn } from '@/lib/cn';
import styles from './StageDesktopPC.module.css';
import shellStyles from '../salesbridge/SalesBridgeShell.module.css';

interface StageSalesBridgeWorkspaceProps {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextStateIndex: number) => void;
}

const TONE_CLASS: Record<string, string> = {
  neutral: shellStyles.neutral,
  warn: shellStyles.warn,
  error: shellStyles.error,
  success: shellStyles.success,
};

function LeftPhoneColumn({
  screen,
  label,
  toneClass,
  topBanner,
}: {
  screen: PhoneScreen;
  label?: string;
  toneClass?: string;
  topBanner?: string;
  tone?: 'neutral' | 'warn' | 'error' | 'success';
}) {
  const headerTitle = screen.headerTitle ?? screen.channelLabel;
  const headerSub = screen.headerSubtitle ?? screen.channelProduct;
  const showHeader = !!(screen.headerVariant && headerTitle);
  return (
    <>
      <span className={shellStyles.phoneColumnLabel}>{label ?? '외근 사원 폰'}</span>
      {topBanner && (
        <div className={cn(shellStyles.phoneColumnBanner, toneClass)}>{topBanner}</div>
      )}
      <PhoneFrame compact>
        {showHeader && (
          <PhoneChannelHeader
            lane={headerTitle!}
            product={headerSub}
            variant={screen.headerVariant}
          />
        )}
        <PhoneScreenView screen={screen} castById={{}} />
      </PhoneFrame>
    </>
  );
}

export function StageSalesBridgeWorkspace({
  state,
  actions,
  onAdvance,
}: StageSalesBridgeWorkspaceProps) {
  const sb = state.salesbridge;
  if (!sb) {
    return (
      <div style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
        salesbridge 데이터가 없습니다.
      </div>
    );
  }

  const advanceMap: Record<string, number> = {};
  (state.advanceOn ?? []).forEach((t) => {
    advanceMap[t.target] = t.nextStateIndex;
  });

  const handleAdvance = (target: string) => {
    const next = advanceMap[target];
    if (typeof next === 'number') onAdvance?.(next);
  };

  const taskbarApps = [
    { id: 'cowork', icon: '🟣', label: 'Cowork+', active: true },
    { id: 'browser', icon: '🌐', label: 'Edge' },
    { id: 'mail', icon: '📧', label: 'Outlook' },
  ];

  const chaPhone = state.phones?.cha;
  const tone = state.phoneFrame?.tone;
  const toneClass = tone ? TONE_CLASS[tone] : undefined;

  const leftPhoneNode = chaPhone ? (
    <LeftPhoneColumn
      screen={chaPhone}
      label="차상훈 · iPhone"
      tone={tone}
      toneClass={toneClass}
      topBanner={state.phoneFrame?.topBanner}
    />
  ) : null;

  const desktopFrame = (
    <DesktopFrame
      compact={!!leftPhoneNode}
      content={
        <>
          <SalesBridgeShell
            state={sb}
            onPartnerClick={(id) => handleAdvance(`partner:${id}`)}
            onFileClick={(fileId) => handleAdvance(`file:${fileId}`)}
            onModalConfirm={() => handleAdvance('modal:confirm')}
            onShareFailureConfirm={() => handleAdvance('modal:share-fail')}
            onAutoVizContinue={() => handleAdvance('modal:auto-viz')}
            onNoaCellClick={(cellId) => handleAdvance(`noa:cell:${cellId}`)}
            onNoaActionApply={() => handleAdvance('noa:action-apply')}
            onExecExportPdf={() => handleAdvance('exec:pdf-export')}
            onExecDismissPdf={() => handleAdvance('exec:pdf-dismiss')}
          />
          <MomentRenderer moment={state.moment} />
        </>
      }
      taskbar={
        <DesktopTaskbar
          apps={taskbarApps}
          clockTime={sb.clockTime}
          clockDate={sb.clockDate}
        />
      }
    />
  );

  return (
    <div className={styles.stage}>
      {leftPhoneNode ? (
        <div className={shellStyles.externalPhoneRow}>
          <div className={shellStyles.externalPhoneColumn}>{leftPhoneNode}</div>
          <div className={shellStyles.externalDesktopWrap}>{desktopFrame}</div>
        </div>
      ) : (
        desktopFrame
      )}
      {(state.guide || actions) && (
        <div
          className={
            state.guide ? styles.controlBar : `${styles.controlBar} ${styles.controlBarCenter}`
          }
        >
          {state.guide && (
            <div className={styles.guide}>
              <span className={styles.guideLabel}>이 화면에서</span>
              <span>{state.guide}</span>
            </div>
          )}
          {actions && <div className={styles.controlActions}>{actions}</div>}
        </div>
      )}
    </div>
  );
}
