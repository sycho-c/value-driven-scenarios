import { useMemo, useRef, useState, useEffect, type ReactNode } from 'react';
import type {
  ChapterStateNode,
  DesktopState,
  MobilePCSplitState,
  MobilePCTaskField,
} from '@/cases/_types';
import { cn } from '@/lib/cn';
import { PhoneFrame } from '../phones/PhoneFrame';
import { DesktopFrame } from '../desktop/DesktopFrame';
import { DesktopTaskbar } from '../desktop/DesktopTaskbar';
import { KakaoPCWindow } from '../desktop/KakaoPCWindow';
import { KakaoChatList } from '../desktop/KakaoChatList';
import { PCToastStack } from '../desktop/PCToastStack';
import { HanaSplitMessage } from '../hana/HanaSplitMessage';
import { HanaPCForm } from '../hana/HanaPCForm';
import { HanaTaskPanel } from '../hana/HanaTaskPanel';
import { FlyingParticles } from '../hana/FlyingParticles';
import { HanaSubscriptionWindow } from '../hana/HanaSubscriptionWindow';
import styles from './StageMobilePCSplit.module.css';

interface StageMobilePCSplitProps {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

export function StageMobilePCSplit({
  state,
  actions,
  onAdvance,
}: StageMobilePCSplitProps) {
  const split = state.mobilePcSplit;
  if (!split) {
    return (
      <div style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
        mobilePcSplit 데이터가 없습니다.
      </div>
    );
  }
  return (
    <StageInner
      split={split}
      desktop={state.desktop}
      guide={state.guide}
      actions={actions}
      onAdvance={onAdvance}
    />
  );
}

function StageInner({
  split,
  desktop,
  guide,
  actions,
  onAdvance,
}: {
  split: MobilePCSplitState;
  desktop?: DesktopState;
  guide?: string;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}) {
  const docOriginRef = useRef<HTMLDivElement | null>(null);
  const fieldRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {};
    (split.pcSystem?.fields ?? []).forEach((f) => {
      refs[f.id] = { current: null } as React.RefObject<HTMLDivElement>;
    });
    (split.pcTaskPanel?.fields ?? []).forEach((f) => {
      refs[f.id] = { current: null } as React.RefObject<HTMLDivElement>;
    });
    return refs;
  }, [split.pcSystem?.fields, split.pcTaskPanel?.fields]);

  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => {
    const set = new Set<string>();
    (split.pcTaskPanel?.fields ?? []).forEach((f) => {
      if (f.revealed) set.add(f.id);
    });
    return set;
  });

  useEffect(() => {
    const set = new Set<string>();
    (split.pcTaskPanel?.fields ?? []).forEach((f) => {
      if (f.revealed) set.add(f.id);
    });
    setRevealedIds(set);
  }, [split.pcTaskPanel?.fields]);

  const [warningDismissed, setWarningDismissed] = useState(false);
  useEffect(() => setWarningDismissed(false), [split.stateBarActiveIndex]);

  const [resultDismissed, setResultDismissed] = useState(false);
  useEffect(() => setResultDismissed(false), [split.stateBarActiveIndex]);

  const allRevealed =
    (split.pcTaskPanel?.fields ?? []).every(
      (f) => revealedIds.has(f.id) || f.revealed,
    ) && (split.pcTaskPanel?.fields ?? []).length > 0;

  const taskPanelFields: MobilePCTaskField[] = split.pcTaskPanel?.fields ?? [];

  const onPhoneAction = () => {
    if (typeof split.phoneActionNextIndex === 'number') {
      onAdvance?.(split.phoneActionNextIndex);
    }
  };

  const onPcFormAction = () => {
    if (
      typeof split.pcSystem?.actionNextIndex === 'number' &&
      !split.pcSystem.typingError
    ) {
      onAdvance?.(split.pcSystem.actionNextIndex);
    }
  };

  const onTaskAction = () => {
    if (typeof split.pcTaskPanel?.actionNextIndex === 'number') {
      onAdvance?.(split.pcTaskPanel.actionNextIndex);
    }
  };

  const onResultCta = () => {
    setResultDismissed(true);
    if (typeof split.resultModal?.ctaNextIndex === 'number') {
      onAdvance?.(split.resultModal.ctaNextIndex);
    }
  };

  const onWarningCta = () => {
    setWarningDismissed(true);
    if (typeof split.warningOverlay?.ctaNextIndex === 'number') {
      onAdvance?.(split.warningOverlay.ctaNextIndex);
    }
  };

  const phase = split.phase;
  const flyingParticles = split.pcTaskPanel?.flyingParticles;
  const resetKey = useMemo(
    () =>
      `${split.stateBarActiveIndex}-${(flyingParticles ?? [])
        .map((p) => p.id)
        .join(',')}`,
    [split.stateBarActiveIndex, flyingParticles],
  );

  const phoneCastLabel =
    split.phoneHeaderVariant === 'cowork' ? '설계사 · Cowork+' : '설계 매니저 · 카톡';

  const useDesktop = split.pcMode === 'kakao+form' && !!desktop;

  return (
    <div className={cn(styles.stage, phase === 'solve' && styles.solve)}>
      <div className={styles.phaseBar}>
        <span className={styles.phaseLabel}>
          {phase === 'solve' ? 'Solution Flow' : 'Pain Point'}
        </span>
        <div className={styles.phaseSteps}>
          {split.stateBarSteps.map((step, i) => {
            const active = i === split.stateBarActiveIndex;
            const done = (split.doneIndices ?? []).includes(i);
            return (
              <div
                key={step.id}
                className={cn(
                  styles.step,
                  active && styles.active,
                  done && styles.done,
                )}
              >
                <span className={styles.stepDot}>{i + 1}</span>
                <span>{step.label}</span>
                {i < split.stateBarSteps.length - 1 && (
                  <span className={styles.stepSep}>›</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={cn(styles.contentRow, useDesktop && styles.contentRowDesktop)}>
        <div className={styles.phoneCol}>
          <PhoneFrame compact label={phoneCastLabel} badge="매니저">
            <PhoneScreen split={split} />
          </PhoneFrame>
          {split.phoneActionLabel && (
            <>
              <button
                type="button"
                className={styles.phoneActionBtn}
                onClick={onPhoneAction}
              >
                <span>{split.phoneActionLabel}</span>
              </button>
              {split.phoneActionHint && (
                <div className={styles.phoneActionHint}>
                  {split.phoneActionHint}
                </div>
              )}
            </>
          )}
        </div>

        <div
          className={styles.workspaceCol}
          style={split.pcDimmed ? { opacity: 0.45, filter: 'grayscale(0.35)', transition: 'opacity 0.6s ease, filter 0.6s ease' } : undefined}
        >
          {useDesktop ? (
            <DesktopBoard
              desktop={desktop!}
              split={split}
              onPcFormAction={onPcFormAction}
              onAdvance={onAdvance}
              docOriginRef={docOriginRef}
            />
          ) : (
            <WorkspaceBoard
              split={split}
              fieldRefs={fieldRefs}
              taskPanelFields={taskPanelFields}
              revealedIds={revealedIds}
              allRevealed={allRevealed}
              onPcFormAction={onPcFormAction}
              onTaskAction={onTaskAction}
              onAdvance={onAdvance}
              docOriginRef={docOriginRef}
            />
          )}
        </div>
      </div>

      <div className={cn(styles.controlBar, !guide && styles.controlBarCenter)}>
        {guide && (
          <div className={styles.guide}>
            <span className={styles.guideLabel}>이 화면에서</span>
            <span>{guide}</span>
          </div>
        )}
        {actions && (
          <div className={styles.controlActions}>{actions}</div>
        )}
      </div>

      {split.warningOverlay && !warningDismissed && (
        <div className={styles.overlay}>
          <div className={styles.alertBox}>
            <span className={styles.alertEyebrow}>구조적 위험</span>
            <div className={styles.alertTitle}>
              {split.warningOverlay.title}
            </div>
            <div className={styles.alertDesc}>{split.warningOverlay.body}</div>
            {split.warningOverlay.ctaLabel && (
              <button
                type="button"
                className={styles.alertBtn}
                onClick={onWarningCta}
              >
                {split.warningOverlay.ctaLabel}
              </button>
            )}
          </div>
        </div>
      )}

      {split.resultModal && !resultDismissed && (
        <div className={styles.resultOverlay}>
          <div className={styles.resultCard}>
            <span className={styles.resultEyebrow}>NER Result</span>
            <div className={styles.resultTitle}>
              {split.resultModal.title}
            </div>
            <div className={styles.resultCompare}>
              <div className={cn(styles.resultStat, styles.before)}>
                <div className={styles.resultStatLabel}>
                  {split.resultModal.beforeLabel}
                </div>
                <div className={styles.resultStatValue}>
                  {split.resultModal.beforeValue}
                </div>
              </div>
              <div className={cn(styles.resultStat, styles.after)}>
                <div className={styles.resultStatLabel}>
                  {split.resultModal.afterLabel}
                </div>
                <div className={styles.resultStatValue}>
                  {split.resultModal.afterValue}
                </div>
              </div>
            </div>
            <div className={styles.resultTagline}>
              {split.resultModal.tagline}
            </div>
            <button
              type="button"
              className={styles.resultCta}
              onClick={onResultCta}
            >
              {split.resultModal.ctaLabel}
            </button>
          </div>
        </div>
      )}

      {flyingParticles && flyingParticles.length > 0 && (
        <FlyingParticles
          particles={flyingParticles}
          originRef={docOriginRef}
          targetRefs={fieldRefs}
          resetKey={resetKey}
          onParticleArrive={(fieldId) => {
            setRevealedIds((prev) => {
              const next = new Set(prev);
              next.add(fieldId);
              return next;
            });
          }}
        />
      )}
    </div>
  );
}

/** Ch1 — 가온전선식 데스크탑 보드 (KakaoPC 창 + 청약 시스템 창 + 채팅 리스트 + 토스트 + 작업표시줄) */
function DesktopBoard({
  desktop,
  split,
  onPcFormAction,
  onAdvance,
}: {
  desktop: DesktopState;
  split: MobilePCSplitState;
  onPcFormAction: () => void;
  onAdvance?: (nextIndex: number) => void;
  docOriginRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const kakaoWindow = desktop.kakaoWindows[0];
  return (
    <DesktopFrame
      fluid
      content={
        <>
          {/* 청약 시스템 창 (좌측 큰 창) */}
          {split.pcSystem && (
            <HanaSubscriptionWindow
              title={split.pcSystem.title}
              fields={split.pcSystem.fields}
              actionLabel={split.pcSystem.actionLabel}
              onAction={onPcFormAction}
              waitText={split.pcSystem.waitText}
              typingError={split.pcSystem.typingError}
              autoFillName={split.pcSystem.autoFillName}
              onAdvance={onAdvance}
              reworkBanner={split.pcSystem.reworkBanner}
            />
          )}
          {/* 카카오톡 PC 단톡창 (중앙) */}
          {kakaoWindow && (
            <KakaoPCWindow window={kakaoWindow} active pulse={false} />
          )}
          {/* 카카오톡 채팅 리스트 (우측) */}
          <KakaoChatList items={desktop.chatList} />
          <PCToastStack toasts={desktop.toasts} />
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
  );
}

/** Ch2 — 기존 Cowork+ Workspace 보드 (단톡 + 자동 채워지는 할일 패널) */
function WorkspaceBoard({
  split,
  fieldRefs,
  taskPanelFields,
  revealedIds,
  allRevealed,
  onPcFormAction,
  onTaskAction,
  onAdvance,
  docOriginRef,
}: {
  split: MobilePCSplitState;
  fieldRefs: Record<string, React.RefObject<HTMLDivElement>>;
  taskPanelFields: MobilePCTaskField[];
  revealedIds: Set<string>;
  allRevealed: boolean;
  onPcFormAction: () => void;
  onTaskAction: () => void;
  onAdvance?: (nextIndex: number) => void;
  docOriginRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const sidebarRooms = [
    { id: 'design-req', label: '설계 요청 채널', unread: 1 },
    { id: 'partner-list', label: 'GA 파트너 관리', unread: 0 },
    { id: 'audit', label: '자동 추출 로그', unread: 0 },
  ];
  const activeRoomId = sidebarRooms[0]!.id;
  const mainTitle = split.pcHeaderLabel;
  const mainMeta = split.pcStatusLabel;

  return (
    <div className={styles.workspace}>
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.titleBarText}>{mainTitle} — 매니저 Workspace</span>
        {mainMeta && <span className={styles.titleBarStatus}>{mainMeta}</span>}
        <span className={styles.titleBarBrand}>COWORK+</span>
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>COWORK+ · CONSOLE</div>
        {sidebarRooms.map((r) => (
          <div
            key={r.id}
            className={cn(
              styles.sidebarItem,
              r.id === activeRoomId && styles.active,
            )}
          >
            <span>{r.label}</span>
            {r.unread ? (
              <span className={styles.sidebarUnread}>{r.unread}</span>
            ) : null}
          </div>
        ))}
      </aside>

      <section className={styles.main}>
        <header className={styles.mainHeader}>
          <div className={styles.mainTitle}>
            <span className={styles.mainTitleText}>
              문서 자동 처리 워크플로우
            </span>
            <span className={styles.mainTitleMeta}>{sidebarRooms[0]!.label}</span>
          </div>
          <span className={styles.mainRoleBadge}>정나윤 · BR</span>
        </header>

        <div className={styles.mainBody}>
          <div className={styles.chatPane}>
            <div className={styles.chatPaneHeader}>
              <span className={styles.chatPaneTitle}>
                {split.pcWorkspace?.chatHeader ?? '이설계 설계사'}
              </span>
              <span className={styles.chatPaneSub}>
                {split.pcWorkspace?.chatSubtitle ?? '전용 채널'}
              </span>
            </div>
            <div className={styles.chatScroll}>
              {(split.pcWorkspace?.messages ?? []).map((m) => {
                const isOriginDoc = m.fileName && m.id.includes('doc-received');
                if (isOriginDoc) {
                  return (
                    <div
                      key={m.id}
                      ref={(el) => {
                        if (el) docOriginRef.current = el;
                      }}
                    >
                      <HanaSplitMessage message={m} />
                    </div>
                  );
                }
                return <HanaSplitMessage key={m.id} message={m} />;
              })}
            </div>
          </div>

          <div className={styles.formPane}>
            {split.pcSystem && (
              <HanaPCForm
                title={split.pcSystem.title}
                fields={split.pcSystem.fields}
                fieldRefs={fieldRefs}
                actionLabel={split.pcSystem.actionLabel}
                onAction={onPcFormAction}
                waitText={split.pcSystem.waitText}
                typingError={split.pcSystem.typingError}
                autoFillName={split.pcSystem.autoFillName}
                onAdvance={onAdvance}
              />
            )}
            {split.pcTaskPanel && (
              <HanaTaskPanel
                title={split.pcTaskPanel.title}
                fields={taskPanelFields}
                fieldRefs={fieldRefs}
                revealedIds={revealedIds}
                actionLabel={split.pcTaskPanel.actionLabel}
                actionEnabled={
                  allRevealed || taskPanelFields.every((f) => f.revealed)
                }
                onAction={onTaskAction}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function PhoneScreen({ split }: { split: MobilePCSplitState }) {
  const isCowork = split.phoneHeaderVariant === 'cowork';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: isCowork ? '#F4F6F7' : '#B2C7DB',
      }}
    >
      <div
        style={{
          padding: '22px 12px 9px',
          background: isCowork ? '#1B4F72' : '#A9BDCE',
          color: isCowork ? '#fff' : '#1A1C1E',
          fontSize: 11.5,
          fontWeight: 800,
          textAlign: 'center',
          letterSpacing: '-0.01em',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {split.phoneHeader}
      </div>
      <div
        style={{
          flex: 1,
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          overflowY: 'auto',
        }}
      >
        {split.phoneMessages.map((m) => (
          <HanaSplitMessage key={m.id} message={m} />
        ))}
      </div>
    </div>
  );
}
