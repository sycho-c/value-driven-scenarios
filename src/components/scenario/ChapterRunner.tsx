import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CaseDef, Chapter, PresetChip as PresetChipDef } from '@/cases/_types';
import { ACT_LABEL } from '@/cases/_types';
import { StagePhoneWorkspace } from './stages/StagePhoneWorkspace';
import { StageThreePhones } from './stages/StageThreePhones';
import { StageDesktopPC } from './stages/StageDesktopPC';
import { StageSalesBridgeWorkspace } from './stages/StageSalesBridgeWorkspace';
import { StageMobilePCSplit } from './stages/StageMobilePCSplit';
import { StageExecDashboard } from './stages/StageExecDashboard';
import { StageRentacar } from './rentacar/StageRentacar';
import { StateBar } from './StateBar';
import { ChapterMemo } from './ChapterMemo';
import { PresetChip } from './controls/PresetChip';
import { TakeoverOverlay } from './moments/TakeoverOverlay';
import { useAutoAdvance } from './hooks/useAutoAdvance';
import { cn } from '@/lib/cn';
import styles from './ChapterRunner.module.css';

interface ChapterRunnerProps {
  caseDef: CaseDef;
  chapter: Chapter;
  onChapterChange?: (chapterId: number, opts?: { atEnd?: boolean }) => void;
  initialStateIndex?: number;
}

export function ChapterRunner({
  caseDef,
  chapter,
  onChapterChange,
  initialStateIndex = 0,
}: ChapterRunnerProps) {
  const clampIndex = (i: number) =>
    Math.min(Math.max(0, i), Math.max(0, chapter.states.length - 1));

  const [stateIndex, setStateIndex] = useState(() => clampIndex(initialStateIndex));
  const [expandedNarration, setExpandedNarration] = useState(false);
  const [dismissedGuides, setDismissedGuides] = useState<Set<string>>(new Set());
  const [autoplayOn, setAutoplayOn] = useState(false);
  const [dismissedTakeovers, setDismissedTakeovers] = useState<Set<string>>(new Set());

  useEffect(() => {
    setStateIndex(clampIndex(initialStateIndex));
    setExpandedNarration(false);
    setDismissedGuides(new Set());
    setDismissedTakeovers(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter.id, initialStateIndex]);

  const totalStates = chapter.states.length;
  const safeIndex = Math.min(Math.max(stateIndex, 0), Math.max(totalStates - 1, 0));
  const node = chapter.states[safeIndex];

  const guideKey = `${chapter.id}-${safeIndex}`;
  const takeoverKey = `${chapter.id}-${safeIndex}-takeover`;
  const guideOverlayVisible =
    !caseDef.disableGuideOverlay &&
    safeIndex === 0 &&
    !!node?.guide &&
    !dismissedGuides.has(guideKey);

  const takeoverVisible = !!node?.takeover && !dismissedTakeovers.has(takeoverKey);

  const dismissGuide = useCallback(() => {
    setDismissedGuides((prev) => {
      const next = new Set(prev);
      next.add(guideKey);
      return next;
    });
  }, [guideKey]);

  const dismissTakeover = useCallback(() => {
    setDismissedTakeovers((prev) => {
      const next = new Set(prev);
      next.add(takeoverKey);
      return next;
    });
  }, [takeoverKey]);

  const chapterIdx = caseDef.chapters.findIndex((c) => c.id === chapter.id);
  const nextChapter =
    chapterIdx >= 0 && chapterIdx < caseDef.chapters.length - 1
      ? caseDef.chapters[chapterIdx + 1]
      : null;

  const advanceState = useCallback(() => {
    setStateIndex((i) => {
      if (i >= totalStates - 1) {
        if (nextChapter) onChapterChange?.(nextChapter.id);
        return i;
      }
      const triggers = chapter.states[i]?.advanceOn;
      if (triggers && triggers.length > 0) return triggers[0].nextStateIndex;
      return i + 1;
    });
  }, [chapter.states, nextChapter, onChapterChange, totalStates]);

  const autoplayPaused = guideOverlayVisible || takeoverVisible;
  const autoplayResetKey = useMemo(
    () => `${chapter.id}-${safeIndex}-${autoplayOn ? '1' : '0'}-${autoplayPaused ? 'p' : 'r'}`,
    [chapter.id, safeIndex, autoplayOn, autoplayPaused],
  );

  const { progress, cancel: cancelAutoplay } = useAutoAdvance({
    enabled: autoplayOn && !autoplayPaused,
    pauseAfterMs: node?.pauseAfterMs,
    onAdvance: advanceState,
    resetKey: autoplayResetKey,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        cancelAutoplay();
        if (takeoverVisible) {
          dismissTakeover();
          return;
        }
        if (guideOverlayVisible) {
          dismissGuide();
          return;
        }
        const advanceTriggers = node?.advanceOn;
        if (advanceTriggers && advanceTriggers.length > 0) {
          setStateIndex(advanceTriggers[0].nextStateIndex);
          return;
        }
        const presets = node?.presets;
        if (presets && presets.length > 0) {
          const chip = presets[0];
          if (typeof chip.nextStateIndex === 'number') {
            setStateIndex(chip.nextStateIndex);
          } else {
            setStateIndex((i) => Math.min(i + 1, totalStates - 1));
          }
          return;
        }
        if (safeIndex === totalStates - 1) {
          if (nextChapter) onChapterChange?.(nextChapter.id);
          return;
        }
        setStateIndex((i) => Math.min(i + 1, totalStates - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        cancelAutoplay();
        if (safeIndex === 0) {
          const idx = caseDef.chapters.findIndex((c) => c.id === chapter.id);
          if (idx > 0) {
            onChapterChange?.(caseDef.chapters[idx - 1].id, { atEnd: true });
          }
          return;
        }
        if (guideOverlayVisible) return;
        setStateIndex((i) => Math.max(0, i - 1));
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setAutoplayOn((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [
    caseDef.chapters,
    chapter.id,
    node,
    totalStates,
    safeIndex,
    guideOverlayVisible,
    takeoverVisible,
    dismissGuide,
    dismissTakeover,
    onChapterChange,
    nextChapter,
    cancelAutoplay,
  ]);

  if (!node) {
    return (
      <div style={{ padding: 48, textAlign: 'center', color: 'var(--muted)' }}>
        이 챕터의 STATE 데이터가 비어 있습니다.
      </div>
    );
  }

  const handleAdvance = useCallback(() => {
    cancelAutoplay();
    setStateIndex((i) => Math.min(i + 1, totalStates - 1));
  }, [totalStates, cancelAutoplay]);

  const handleChip = useCallback(
    (chip: PresetChipDef) => {
      cancelAutoplay();
      if (typeof chip.nextStateIndex === 'number') {
        setStateIndex(chip.nextStateIndex);
      } else {
        handleAdvance();
      }
    },
    [handleAdvance, cancelAutoplay],
  );

  const isLast = safeIndex === totalStates - 1;
  const hasPresets = (node.presets?.length ?? 0) > 0;
  const hasAdvanceTriggers = (node.advanceOn?.length ?? 0) > 0;

  const activeCast = node.activeCastId
    ? caseDef.cast.find((c) => c.id === node.activeCastId)
    : null;
  const promptLabel = activeCast
    ? `↓ 다음 입력 — ${activeCast.label}이 입력합니다`
    : '↓ 다음 입력';

  const actions = hasPresets ? (
    <div className={cn(styles.actionsRow, styles.prompt)}>
      <span className={cn(styles.actionsLabel, styles.prompt)}>{promptLabel}</span>
      {node.presets!.map((chip) => (
        <PresetChip key={chip.id} chip={chip} onClick={handleChip} />
      ))}
    </div>
  ) : hasAdvanceTriggers && !isLast ? (
    <div className={cn(styles.actionsRow, styles.advance)}>
      <span className={cn(styles.actionsLabel, styles.advance)}>↓ 화면 안 펄스 클릭 또는 →</span>
      <button
        type="button"
        className={styles.advanceBtn}
        onClick={() => {
          cancelAutoplay();
          setStateIndex(node.advanceOn![0].nextStateIndex);
        }}
      >
        다음 →
      </button>
      <span className={styles.actionsHint}>화살표 키로도 이동</span>
    </div>
  ) : isLast ? (
    <div className={cn(styles.actionsRow, styles.complete)}>
      <span className={styles.completeBadge}>✅ 챕터 완주</span>
      {nextChapter ? (
        <button
          type="button"
          className={styles.advanceBtn}
          onClick={() => onChapterChange?.(nextChapter.id)}
        >
          Ch.{nextChapter.id} · {nextChapter.title} →
        </button>
      ) : (
        <span className={styles.actionsHint}>다음 챕터는 곧 공개됩니다.</span>
      )}
    </div>
  ) : (
    <div className={cn(styles.actionsRow, styles.advance)}>
      <span className={cn(styles.actionsLabel, styles.advance)}>↓ 다음 STATE로</span>
      <button type="button" className={styles.advanceBtn} onClick={handleAdvance}>
        다음 →
      </button>
      <span className={styles.actionsHint}>↑ 도트 클릭으로 점프 가능</span>
    </div>
  );

  return (
    <div className={styles.runner}>
      <header className={styles.intro}>
        <div className={styles.introLeft}>
          <div className={styles.introHeader}>
            {chapter.act && (
              <span className={styles.actLabel}>{ACT_LABEL[chapter.act]}</span>
            )}
            <h2 className={styles.chapterTitle}>
              Ch.{chapter.id} · {chapter.title}
            </h2>
          </div>
          {chapter.subtitle && (
            <p className={styles.chapterSubtitle}>{chapter.subtitle}</p>
          )}
          <p
            className={cn(styles.narration, expandedNarration && styles.expanded)}
            onClick={() => setExpandedNarration((v) => !v)}
            title={expandedNarration ? '한 줄로 접기' : '내레이션 펼치기'}
          >
            {chapter.narration}
          </p>
        </div>
        <div className={styles.introRight}>
          <span className={styles.progressLabel}>
            진행 {safeIndex + 1} / {totalStates}
          </span>
          <StateBar total={totalStates} current={safeIndex} onJump={setStateIndex} />
          <button
            type="button"
            className={cn(styles.autoplayToggle, autoplayOn && styles.on)}
            onClick={() => setAutoplayOn((v) => !v)}
            aria-pressed={autoplayOn}
            title="Space 키로도 토글"
          >
            {autoplayOn ? '❚❚ 자동' : '▶ 자동'}
          </button>
          {autoplayOn && node.pauseAfterMs ? (
            <div className={styles.autoplayBar}>
              <motion.div
                className={styles.autoplayBarFill}
                style={{ scaleX: progress }}
                initial={false}
              />
            </div>
          ) : null}
          <span className={styles.caseMeta}>
            {caseDef.label} · {caseDef.customer}
          </span>
        </div>
      </header>

      {caseDef.chapters.length > 1 && (
        <div className={styles.chapterTabs} role="tablist" aria-label="챕터 선택">
          {caseDef.chapters.map((c) => {
            const active = c.id === chapter.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={cn(styles.chapterTab, active && styles.chapterTabActive)}
                onClick={() => onChapterChange?.(c.id)}
              >
                <span className={styles.chapterTabNum}>Ch.{c.id}</span>
                <span className={styles.chapterTabTitle}>{c.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {chapter.stage === 'three-phones' ? (
        <StageThreePhones state={node} cast={caseDef.cast} actions={actions} />
      ) : chapter.stage === 'desktop-pc' ? (
        <StageDesktopPC state={node} actions={actions} onAdvance={setStateIndex} />
      ) : chapter.stage === 'salesbridge-workspace' ? (
        <StageSalesBridgeWorkspace state={node} actions={actions} onAdvance={setStateIndex} />
      ) : chapter.stage === 'mobile-pc-split' ? (
        <StageMobilePCSplit state={node} actions={actions} onAdvance={setStateIndex} />
      ) : chapter.stage === 'exec-dashboard' ? (
        <StageExecDashboard state={node} actions={actions} onAdvance={setStateIndex} />
      ) : chapter.stage === 'rentacar' ? (
        <StageRentacar state={node} actions={actions} onAdvance={setStateIndex} />
      ) : (
        <StagePhoneWorkspace
          state={node}
          cast={caseDef.cast}
          actions={actions}
          phoneSide={caseDef.id === 'wontalk-woori' ? 'left' : 'right'}
        />
      )}

      {node.memo && <ChapterMemo memo={node.memo} />}

      <AnimatePresence>
        {guideOverlayVisible && (
          <motion.div
            key={guideKey}
            className={styles.guideOverlay}
            role="dialog"
            aria-modal="true"
            aria-label="이 화면 배경 설명"
            onClick={dismissGuide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className={styles.guideCard}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.guideEyebrow}>
                <span>이 화면에서</span>
                <span className={styles.guideStep}>
                  STATE {safeIndex + 1} / {totalStates}
                </span>
              </div>
              <p className={styles.guideBody}>{node.guide}</p>
              <button
                type="button"
                className={styles.guideDismiss}
                onClick={dismissGuide}
                autoFocus
              >
                대화 보기 →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {takeoverVisible && node.takeover && (
          <TakeoverOverlay
            key={takeoverKey}
            takeover={node.takeover}
            onDismiss={dismissTakeover}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
