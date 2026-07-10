import { type ReactNode, useEffect, useRef, useState } from 'react';
import type { ChapterStateNode } from '@/cases/_types';
import styles from './StageRentacarStt.module.css';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

type Phase = 'idle' | 'calling' | 'ended';

function formatTime(secs: number): string {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function highlightText(text: string, highlights: string[]): string {
  if (!highlights.length) return text;
  // Escape regex special chars and build pattern
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  return text.replace(pattern, '<mark class="stt-hl">$1</mark>');
}

export function StageRentacarStt({ state, actions }: Props) {
  const stt = state.rentacarStt;

  // fallback safe values
  const callerName = stt?.callerName ?? '고객';
  const callerPhone = stt?.callerPhone ?? '';
  const agentLabel = stt?.agentLabel ?? '담당자';
  const customerLabel = stt?.customerLabel ?? '고객';
  const autoEndMs = stt?.autoEndMs ?? 16000;
  const script = stt?.script ?? [];
  const highlights = stt?.highlights ?? [];
  const mappingTags = stt?.mappingTags ?? [];
  const cossSteps = stt?.cossSteps ?? [];
  const cossSummary = stt?.cossSummary ?? '';
  const startLabel = stt?.startLabel ?? '통화 시작 — STT 데모 실행';

  const [phase, setPhase] = useState<Phase>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [sttContent, setSttContent] = useState('');
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [cossActiveIndex, setCossActiveIndex] = useState(-1);
  const [cossDone, setCossDone] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Ref collection for cleanup
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearAll() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function reset() {
    clearAll();
    setPhase('idle');
    setElapsed(0);
    setSttContent('');
    setVisibleTags([]);
    setCossActiveIndex(-1);
    setCossDone(false);
    setShowSummary(false);
  }

  function startDemo() {
    if (phase !== 'idle') return;
    clearAll();

    setPhase('calling');
    setElapsed(0);
    setSttContent('');
    setVisibleTags([]);
    setCossActiveIndex(-1);
    setCossDone(false);
    setShowSummary(false);

    // Timer
    const startAt = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startAt) / 1000));
    }, 500);

    // STT script
    let accumulated = '';
    script.forEach(({ atMs, text }) => {
      const tid = setTimeout(() => {
        accumulated += text;
        setSttContent(accumulated);
      }, atMs);
      timersRef.current.push(tid);
    });

    // Mapping tags
    mappingTags.forEach(({ atMs, label }) => {
      const tid = setTimeout(() => {
        setVisibleTags((prev) => [...prev, label]);
      }, atMs);
      timersRef.current.push(tid);
    });

    // Auto end
    const endTid = setTimeout(() => endCall(), autoEndMs);
    timersRef.current.push(endTid);
  }

  function endCall() {
    clearAll();
    setPhase('ended');

    // COSS steps sequential illumination
    cossSteps.forEach((_, i) => {
      const tid = setTimeout(() => {
        setCossActiveIndex(i);
      }, 300 + i * 600);
      timersRef.current.push(tid);
    });

    // After all steps done → show summary
    const summaryDelay = 300 + cossSteps.length * 600 + 200;
    const doneTid = setTimeout(() => {
      setCossDone(true);
      setShowSummary(true);
    }, summaryDelay);
    timersRef.current.push(doneTid);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset when state.index changes (new chapter state)
  const prevIndexRef = useRef(state.index);
  useEffect(() => {
    if (prevIndexRef.current !== state.index) {
      prevIndexRef.current = state.index;
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.index]);

  const isCalling = phase === 'calling';
  const isEnded = phase === 'ended';

  const callerStatusText =
    phase === 'idle' ? '전화 대기 중' : isCalling ? '통화 중' : '통화 종료';

  return (
    <div className={styles.root}>
      {/* Start button */}
      <div className={styles.topBar}>
        {!isEnded && (
          <button
            className={styles.startBtn}
            onClick={startDemo}
            disabled={isCalling}
          >
            <span className={styles.startIcon}>📞</span>
            {startLabel}
          </button>
        )}
        {isEnded && (
          <button className={styles.resetBtn} onClick={reset}>
            ↺ 처음부터 다시 보기
          </button>
        )}
      </div>

      <div className={styles.split}>
        {/* ── LEFT: Phone UI ── */}
        <div className={styles.phoneCol}>
          <div className={styles.phoneFrame}>
            {/* Status bar */}
            <div className={styles.phoneStatus}>
              <span>KT 10:14</span>
              <div className={styles.phoneStatusR}>
                <span>LTE</span>
                <span>📶</span>
                <span className={styles.battBadge}>74</span>
              </div>
            </div>

            {/* Call screen */}
            <div className={styles.callScreen}>
              {/* Timer row */}
              <div className={styles.callTimerRow}>
                <div className={styles.callTimerLeft}>
                  <span>📞</span>
                  <span className={styles.timerVal}>{formatTime(elapsed)}</span>
                </div>
                <span className={styles.dotsIcon}>⋮</span>
              </div>

              {/* Caller info */}
              <div className={styles.callName}>
                <div
                  className={styles.callerStatus}
                  data-calling={isCalling ? 'true' : undefined}
                  data-ended={isEnded ? 'true' : undefined}
                >
                  {callerStatusText}
                </div>
                <div className={styles.callerNameMain}>{callerName}</div>
                <div className={styles.callerPhone}>{callerPhone}</div>
              </div>

              {/* Avatar */}
              <div className={styles.callerIcon}>
                {isCalling ? '👤' : '👤'}
              </div>

              {/* Assist row */}
              <div className={styles.assistRow}>
                <button className={styles.assistBtn}>
                  <span>✦</span> 통화 어시스트
                </button>
                <button className={styles.ccBtn}>CC</button>
              </div>

              {/* Control panel */}
              <div className={styles.controlPanel}>
                <div className={styles.ctrlGrid}>
                  {[
                    { icon: '🎙', label: '녹음', active: isCalling },
                    { icon: '📹', label: '영상통화', dim: true },
                    { icon: '🔷', label: '블루투스' },
                    { icon: '🔊', label: '스피커' },
                    { icon: '🔇', label: '내 소리 차단' },
                    { icon: '#', label: '키패드' },
                  ].map(({ icon, label, active, dim }) => (
                    <div className={styles.ctrlItem} key={label}>
                      <div
                        className={styles.ctrlIcon}
                        data-active={active ? 'true' : undefined}
                        data-dim={dim ? 'true' : undefined}
                      >
                        {icon}
                      </div>
                      <span className={styles.ctrlLabel}>{label}</span>
                    </div>
                  ))}
                </div>
                <button className={styles.endBtn} onClick={isEnded ? undefined : endCall}>
                  📵
                </button>
              </div>
            </div>

            {/* Home bar */}
            <div className={styles.phoneHome}>
              <div className={styles.homeBtn}>≡</div>
              <div className={styles.homeCircle} />
              <div className={styles.homeBtn}>‹</div>
            </div>
          </div>

          <div className={styles.noteBox}>
            좌측: 영업사원의 법인폰 통화 화면<br />
            우측: Cowork+ 워크스페이스에서 동시에 STT 적재 중
          </div>
        </div>

        {/* ── RIGHT: Cowork+ Workspace ── */}
        <div className={styles.wsPanel}>
          {/* Header */}
          <div className={styles.wsHeader}>
            <div className={styles.wsTitle}>
              <span className={styles.wsTitleIcon}>💬</span>
              Cowork+ 워크스페이스
              {isCalling && (
                <span className={styles.liveBadge}>
                  <span className={styles.liveDot} />
                  통화 중 STT 적재
                </span>
              )}
            </div>
            <div className={styles.wsSub}>
              고객: {customerLabel} &nbsp;·&nbsp; 담당: {agentLabel} &nbsp;·&nbsp;{' '}
              <span>
                {phase === 'idle'
                  ? '통화 대기'
                  : isCalling
                  ? 'STT 적재 중'
                  : '통화 종료 · COSS 적재 완료'}
              </span>
            </div>
          </div>

          {/* STT box */}
          <div className={styles.sttBox}>
            <div className={styles.sttLabel}>
              <span>🎙</span>
              실시간 STT 변환 — 통화 내용이 자동으로 텍스트로 변환됩니다
            </div>
            <div className={styles.sttText}>
              {phase === 'idle' ? (
                <span className={styles.sttPlaceholder}>
                  통화가 시작되면 여기에 텍스트가 실시간으로 쌓입니다.
                </span>
              ) : (
                <>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightText(sttContent, highlights),
                    }}
                  />
                  {isCalling && <span className={styles.sttCursor} />}
                </>
              )}
            </div>
          </div>

          {/* Mapping tags */}
          {visibleTags.length > 0 && (
            <div className={styles.mappingBox}>
              <div className={styles.mappingTitle}>
                <span>🏷</span>
                자동 인식된 주요 정보
              </div>
              <div className={styles.mappingRow}>
                {visibleTags.map((tag) => (
                  <span className={styles.mappingTag} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* COSS box */}
          <div
            className={styles.cossBox}
            data-done={cossDone ? 'true' : undefined}
            data-active={isEnded && !cossDone ? 'true' : undefined}
          >
            <div className={styles.cossTitle}>COSS 자동 적재</div>
            {/* Steps dots */}
            {cossSteps.length > 0 && (
              <div className={styles.cossSteps}>
                {cossSteps.map((step, i) => (
                  <div className={styles.cossStepRow} key={step.id}>
                    <div
                      className={styles.cossDot}
                      data-done={cossActiveIndex >= i ? 'true' : undefined}
                      data-active={
                        isEnded && cossActiveIndex === i - 1 && !cossDone
                          ? 'true'
                          : undefined
                      }
                    />
                    <span
                      className={styles.cossStepLabel}
                      data-done={cossActiveIndex >= i ? 'true' : undefined}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {showSummary && (
              <div className={styles.cossSummary}>{cossSummary}</div>
            )}
            {!isEnded && !showSummary && (
              <div className={styles.cossContent}>
                통화 종료 후 자동으로 적재됩니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* actions slot */}
      {actions && <div className={styles.controlActions}>{actions}</div>}
    </div>
  );
}
