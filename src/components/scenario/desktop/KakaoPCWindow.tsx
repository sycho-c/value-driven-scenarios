import {
  useEffect,
  useMemo,
  useRef,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import type { KakaoPCWindowState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import { PCMessageBubble } from './PCMessageBubble';
import { PCTypingBubble } from './PCTypingBubble';
import { useMessageReveal } from '../hooks/useMessageReveal';
import styles from './KakaoPCWindow.module.css';

const MESSAGE_STEP_DELAY = 0.38;

interface KakaoPCWindowProps {
  window: KakaoPCWindowState;
  active: boolean;
  pulse: boolean;
  pulseFileId?: string;
  positionOverride?: { top: number; left: number };
  zIndexOverride?: number;
  onWindowClick?: (windowId: string) => void;
  onTitleMouseDown?: (windowId: string, e: ReactMouseEvent) => void;
  onFileClick?: (fileId: string) => void;
  onPresetClick?: (windowId: string, nextStateIndex: number) => void;
}

export function KakaoPCWindow({
  window: w,
  active,
  pulse,
  pulseFileId,
  positionOverride,
  zIndexOverride,
  onWindowClick,
  onTitleMouseDown,
  onFileClick,
  onPresetClick,
}: KakaoPCWindowProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());

  const hasRevealMetadata = useMemo(
    () =>
      w.messages.some(
        (m) => typeof m.revealDelayMs === 'number' || typeof m.typingFor === 'number',
      ),
    [w.messages],
  );

  const persistedIds = useMemo(() => new Set(seenIdsRef.current), [w.id]);

  const revealItems = useMemo(
    () =>
      w.messages.map((m, i) => {
        const id = m.id ?? `${w.id}-${m.kind}-${i}`;
        const isIncoming = m.kind === 'message' && !m.isMine;
        return {
          id,
          text: m.text,
          senderId: m.sender,
          senderLabel: m.sender,
          revealDelayMs: m.revealDelayMs,
          typingFor: m.typingFor,
          isIncoming,
          msg: m,
        };
      }),
    [w.messages, w.id],
  );

  const { revealed, typingSender } = useMessageReveal({
    items: revealItems,
    rhythm: 'natural',
    resetKey: revealItems.map((r) => r.id).join('|'),
    persistedIds,
    disabled: !hasRevealMetadata,
  });

  const rendered = useMemo(() => {
    let newIndex = 0;
    return revealed.map((r, i) => {
      const isNew = !seenIdsRef.current.has(r.id);
      const delay = isNew ? newIndex * MESSAGE_STEP_DELAY : 0;
      if (isNew) newIndex += 1;
      return { msg: r.msg, key: r.id, isNew, delay, idx: i };
    });
  }, [revealed]);

  useEffect(() => {
    rendered.forEach((r) => seenIdsRef.current.add(r.key));
  }, [rendered]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const scrollToBottom = () => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    };
    scrollToBottom();
    const ro = new ResizeObserver(() => scrollToBottom());
    Array.from(el.children).forEach((child) => ro.observe(child));
    return () => ro.disconnect();
  }, [revealed.length, typingSender]);

  const top = positionOverride?.top ?? w.position.top;
  const left = positionOverride?.left ?? w.position.left;
  const zIndex =
    zIndexOverride ?? (pulse ? 30 : active ? 25 : w.position.zIndex ?? 5);

  return (
    <div
      className={cn(
        styles.window,
        !active && styles.inactive,
        active && styles.activeFront,
        pulse && styles.pulseTarget,
      )}
      style={{ top, left, zIndex }}
      onClick={() => onWindowClick?.(w.id)}
    >
      <div
        className={cn(styles.titlebar, w.variant === 'urgent' && styles.urgent)}
        onMouseDown={(e) => onTitleMouseDown?.(w.id, e)}
      >
        <span>💬 {w.title}</span>
        <div className={styles.winControls}>
          <span>—</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.title}>
            {w.title}
            {typeof w.participantsCount === 'number' && (
              <span className={styles.count}>{w.participantsCount}</span>
            )}
          </div>
          {w.participants && <div className={styles.participants}>{w.participants}</div>}
        </div>
        <div className={styles.actions}>
          <span>🔍</span>
          <span>☰</span>
        </div>
      </div>
      <div className={styles.body} ref={bodyRef}>
        <AnimatePresence initial={false}>
          {rendered.map((r) => (
            <PCMessageBubble
              key={r.key}
              message={r.msg}
              pulseFileId={pulseFileId}
              isNew={r.isNew}
              delay={r.delay}
              onFileClick={onFileClick}
            />
          ))}
          {typingSender && (
            <PCTypingBubble
              key={`typing-${w.id}-${typingSender.id ?? 'anon'}`}
              sender={typingSender.label ?? typingSender.id}
            />
          )}
        </AnimatePresence>
      </div>
      {w.preset && (
        <div className={styles.presetArea}>
          <button
            type="button"
            className={styles.presetBtn}
            onClick={(e) => {
              e.stopPropagation();
              onPresetClick?.(w.id, w.preset!.nextStateIndex);
            }}
          >
            💬 {w.preset.text}
          </button>
        </div>
      )}
      <div className={styles.input}>
        <div className={styles.inputTools}>
          <span>📎</span>
          <span>😊</span>
        </div>
        <div className={styles.inputBox}>메시지 입력</div>
      </div>
    </div>
  );
}
