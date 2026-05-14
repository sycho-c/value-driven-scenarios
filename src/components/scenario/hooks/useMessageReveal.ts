import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type { RevealRhythm } from '@/cases/_types';
import { getPacing, estimateTypingMs } from '../timing/pacing';

export interface RevealItem {
  id: string;
  text?: string;
  senderId?: string;
  senderLabel?: string;
  revealDelayMs?: number;
  typingFor?: number;
  persist?: boolean;
  isIncoming?: boolean;
}

export interface UseMessageRevealOptions<T extends RevealItem> {
  items: T[];
  rhythm?: RevealRhythm;
  /** Stable key — when this changes, the reveal sequence restarts. */
  resetKey?: string;
  /** Persistent items that should be visible immediately on entry (e.g. items already shown in earlier state). */
  persistedIds?: Set<string>;
  /** Disable autoplay reveal — show all items immediately. */
  disabled?: boolean;
}

export interface UseMessageRevealResult<T extends RevealItem> {
  revealed: T[];
  typingSender: { id?: string; label?: string } | null;
  fastForward: () => void;
  isComplete: boolean;
}

/**
 * Schedules message reveals using absolute timestamps based on
 * (prev typingFor + revealDelayMs). One ArrowRight key fastForwards.
 */
export function useMessageReveal<T extends RevealItem>(
  opts: UseMessageRevealOptions<T>,
): UseMessageRevealResult<T> {
  const { items, rhythm, resetKey, persistedIds, disabled } = opts;
  const pacing = getPacing(rhythm);

  const schedule = useMemo(() => {
    let t = 0;
    return items.map((item, idx) => {
      const isPersisted = persistedIds?.has(item.id) ?? false;
      const delay = item.revealDelayMs ?? (idx === 0 ? 0 : pacing.baseRevealMs);
      const typingFor =
        item.isIncoming && item.text ? item.typingFor ?? estimateTypingMs(item.text, rhythm) : 0;
      t += delay + typingFor;
      return {
        item,
        revealAt: isPersisted ? 0 : t,
        typingStartAt: isPersisted ? 0 : t - typingFor,
        typingFor: isPersisted ? 0 : typingFor,
        isPersisted,
      };
    });
  }, [items, pacing.baseRevealMs, rhythm, persistedIds]);

  const totalDuration = schedule.length > 0 ? schedule[schedule.length - 1].revealAt : 0;

  const [now, setNow] = useState(disabled ? totalDuration + 1 : 0);
  const startRef = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);
  const fastForwardedRef = useRef(false);

  useEffect(() => {
    if (disabled) {
      setNow(totalDuration + 1);
      return;
    }
    fastForwardedRef.current = false;
    startRef.current = performance.now();
    setNow(0);
    const tick = () => {
      if (fastForwardedRef.current) return;
      const elapsed = performance.now() - startRef.current;
      setNow(elapsed);
      if (elapsed < totalDuration + 50) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [resetKey, totalDuration, disabled]);

  const fastForward = useCallback(() => {
    fastForwardedRef.current = true;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    setNow(totalDuration + 1);
  }, [totalDuration]);

  const revealed = useMemo(
    () => schedule.filter((s) => s.isPersisted || now >= s.revealAt).map((s) => s.item),
    [schedule, now],
  );

  const typingSender = useMemo(() => {
    const inProgress = schedule.find(
      (s) => !s.isPersisted && s.typingFor > 0 && now >= s.typingStartAt && now < s.revealAt,
    );
    if (!inProgress) return null;
    return { id: inProgress.item.senderId, label: inProgress.item.senderLabel };
  }, [schedule, now]);

  const isComplete = now >= totalDuration;

  return { revealed, typingSender, fastForward, isComplete };
}
