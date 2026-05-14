import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import type {
  AdvanceTrigger,
  ChapterStateNode,
  GuideTooltipDef,
  KakaoPCWindowState,
  PCToast,
} from '@/cases/_types';
import { DesktopFrame } from '../desktop/DesktopFrame';
import { DesktopTaskbar } from '../desktop/DesktopTaskbar';
import { ExcelWindow } from '../desktop/ExcelWindow';
import { KakaoPCWindow } from '../desktop/KakaoPCWindow';
import { KakaoChatList } from '../desktop/KakaoChatList';
import { PCToastStack } from '../desktop/PCToastStack';
import { GuideTooltip } from '../desktop/GuideTooltip';
import { MomentRenderer } from '../moments/MomentRenderer';
import styles from './StageDesktopPC.module.css';

interface StageDesktopPCProps {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextStateIndex: number) => void;
}

interface AdvanceMap {
  [target: string]: number;
}

function buildAdvanceMap(triggers?: AdvanceTrigger[]): AdvanceMap {
  const map: AdvanceMap = {};
  (triggers ?? []).forEach((t) => {
    map[t.target] = t.nextStateIndex;
  });
  return map;
}

const TOOLTIP_TARGETS: Record<
  string,
  { top?: number; left?: number; right?: number; bottom?: number }
> = {
  'window:miu': { top: 280, left: 730 },
  'window:daedong': { top: 260, left: 720 },
  'window:kang': { top: 540, left: 600 },
  'window:park': { top: 380, left: 700 },
  'file:quote-1': { top: 380, left: 580 },
  'preset:kang-delete': { top: 540, left: 600 },
  'chat:miu': { top: 280, left: 1080 },
  'chat:park': { top: 380, left: 1080 },
};

function resolveTooltipPosition(tooltip: GuideTooltipDef) {
  const base = TOOLTIP_TARGETS[tooltip.target] ?? { top: 200, left: 600 };
  return {
    top: base.top !== undefined ? base.top + (tooltip.offsetY ?? 0) : undefined,
    left: base.left !== undefined ? base.left + (tooltip.offsetX ?? 0) : undefined,
    right: base.right,
    bottom: base.bottom,
  };
}

const FRAME_INTRINSIC_WIDTH = 1400;

export function StageDesktopPC({ state, actions, onAdvance }: StageDesktopPCProps) {
  const desktop = state.desktop;
  const scalerRef = useRef<HTMLDivElement | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [zOrder, setZOrder] = useState<string[]>([]);
  const [positions, setPositions] = useState<
    Record<string, { top: number; left: number }>
  >({});

  useEffect(() => {
    setFocusedId(null);
    setZOrder([]);
    setPositions({});
  }, [state.index, state.desktop?.activeWindowId]);

  const bringToFront = useCallback((id: string) => {
    setFocusedId(id);
    setZOrder((prev) => {
      const without = prev.filter((x) => x !== id);
      return [...without, id];
    });
  }, []);

  const handleTitleMouseDown = useCallback(
    (id: string, e: ReactMouseEvent) => {
      if (!desktop) return;
      const win = desktop.kakaoWindows.find((w) => w.id === id);
      if (!win) return;
      const scaler = scalerRef.current;
      const rect = scaler?.getBoundingClientRect();
      const scale = rect && rect.width > 0 ? rect.width / FRAME_INTRINSIC_WIDTH : 1;
      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startPos = positions[id] ?? { top: win.position.top, left: win.position.left };

      bringToFront(id);
      e.preventDefault();

      const onMove = (ev: MouseEvent) => {
        const dx = (ev.clientX - startMouseX) / scale;
        const dy = (ev.clientY - startMouseY) / scale;
        setPositions((prev) => ({
          ...prev,
          [id]: {
            top: Math.max(0, startPos.top + dy),
            left: Math.max(0, startPos.left + dx),
          },
        }));
      };
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [desktop, positions, bringToFront],
  );

  if (!desktop) {
    return (
      <div style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
        desktop 데이터가 없습니다.
      </div>
    );
  }

  const advanceMap = buildAdvanceMap(state.advanceOn);

  const handleAdvance = (target: string) => {
    const next = advanceMap[target];
    if (typeof next === 'number') onAdvance?.(next);
  };

  const handleWindowClick = (id: string) => {
    bringToFront(id);
    handleAdvance(`window:${id}`);
  };

  const activeId = desktop.activeWindowId;

  const pulseTargetEntry = state.advanceOn?.[0];
  const pulseTargetKind = pulseTargetEntry?.target.split(':')[0];
  const pulseTargetId = pulseTargetEntry?.target.split(':').slice(1).join(':');

  const visibleWindows: KakaoPCWindowState[] = desktop.kakaoWindows.filter(
    (w) => w.visible !== false,
  );

  const zIndexFor = (w: KakaoPCWindowState) => {
    const idx = zOrder.indexOf(w.id);
    if (idx >= 0) return 40 + idx; // user-clicked windows stack above defaults
    if (focusedId === w.id) return 35;
    const pulse = pulseTargetKind === 'window' && pulseTargetId === w.id;
    if (pulse) return 30;
    if (activeId === w.id) return 25;
    return w.position.zIndex ?? 5;
  };

  return (
    <div className={styles.stage}>
      <DesktopFrame
        scalerRef={scalerRef}
        content={
          <>
            <ExcelWindow state={desktop.excel} />
            {visibleWindows.map((w) => (
              <KakaoPCWindow
                key={w.id}
                window={w}
                active={activeId === w.id}
                pulse={pulseTargetKind === 'window' && pulseTargetId === w.id}
                pulseFileId={
                  pulseTargetKind === 'file' ? pulseTargetId : undefined
                }
                positionOverride={positions[w.id]}
                zIndexOverride={zIndexFor(w)}
                onWindowClick={handleWindowClick}
                onTitleMouseDown={handleTitleMouseDown}
                onFileClick={(fileId) => handleAdvance(`file:${fileId}`)}
                onPresetClick={(_id, next) => onAdvance?.(next)}
              />
            ))}
            <KakaoChatList
              items={desktop.chatList}
              onItemClick={(id) => handleAdvance(`chat:${id}`)}
            />
            <PCToastStack
              toasts={desktop.toasts as PCToast[]}
              onToastClick={(t) => handleAdvance(`toast:${t.id}`)}
            />
            {state.guideTooltip && (
              <GuideTooltip
                tooltip={state.guideTooltip}
                position={resolveTooltipPosition(state.guideTooltip)}
              />
            )}
            <MomentRenderer moment={state.moment} />
          </>
        }
        taskbar={
          <DesktopTaskbar
            apps={desktop.taskbarApps}
            clockTime={desktop.clockTime}
            clockDate={desktop.clockDate}
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
