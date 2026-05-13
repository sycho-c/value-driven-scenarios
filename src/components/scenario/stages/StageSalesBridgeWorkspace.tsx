import type { ReactNode } from 'react';
import type { ChapterStateNode } from '@/cases/_types';
import { DesktopFrame } from '../desktop/DesktopFrame';
import { DesktopTaskbar } from '../desktop/DesktopTaskbar';
import { SalesBridgeShell } from '../salesbridge/SalesBridgeShell';
import styles from './StageDesktopPC.module.css';

interface StageSalesBridgeWorkspaceProps {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextStateIndex: number) => void;
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
    { id: 'cowork', icon: '🟣', label: 'DWorks Cowork+', active: true },
    { id: 'browser', icon: '🌐', label: 'Edge' },
    { id: 'mail', icon: '📧', label: 'Outlook' },
  ];

  return (
    <div className={styles.stage}>
      <DesktopFrame
        content={
          <SalesBridgeShell
            state={sb}
            onPartnerClick={(id) => handleAdvance(`partner:${id}`)}
            onFileClick={(fileId) => handleAdvance(`file:${fileId}`)}
            onModalConfirm={() => handleAdvance('modal:confirm')}
          />
        }
        taskbar={
          <DesktopTaskbar
            apps={taskbarApps}
            clockTime={sb.clockTime}
            clockDate={sb.clockDate}
          />
        }
      />
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
