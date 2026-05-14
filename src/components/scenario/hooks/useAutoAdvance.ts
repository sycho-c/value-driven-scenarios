import { useEffect, useRef, useState } from 'react';

export interface UseAutoAdvanceOptions {
  enabled: boolean;
  pauseAfterMs?: number;
  onAdvance: () => void;
  /** Stable key — when this changes, timer restarts. */
  resetKey: string;
}

export interface UseAutoAdvanceResult {
  /** 0..1 progress — useful for rendering a progress bar. */
  progress: number;
  cancel: () => void;
}

/**
 * Fires onAdvance once after pauseAfterMs while enabled is true.
 * Any change to resetKey or enabled triggers a fresh cycle.
 * cancel() halts the current cycle without firing.
 */
export function useAutoAdvance({
  enabled,
  pauseAfterMs,
  onAdvance,
  resetKey,
}: UseAutoAdvanceOptions): UseAutoAdvanceResult {
  const [progress, setProgress] = useState(0);
  const firedRef = useRef(false);
  const cancelledRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    firedRef.current = false;
    cancelledRef.current = false;
    setProgress(0);

    if (!enabled || !pauseAfterMs || pauseAfterMs <= 0) {
      return () => {
        if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
      };
    }

    const start = performance.now();
    const tick = () => {
      if (cancelledRef.current || firedRef.current) return;
      const elapsed = performance.now() - start;
      const pct = Math.min(1, elapsed / pauseAfterMs);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    timeoutRef.current = window.setTimeout(() => {
      if (cancelledRef.current || firedRef.current) return;
      firedRef.current = true;
      onAdvance();
    }, pauseAfterMs);

    return () => {
      cancelledRef.current = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, pauseAfterMs, resetKey]);

  const cancel = () => {
    cancelledRef.current = true;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
  };

  return { progress, cancel };
}
