import { useEffect, useState, useRef } from 'react';

interface CountUpValueProps {
  from: number;
  to: number;
  durationMs?: number;
  fractionDigits?: number;
  resetKey?: string | number;
}

export function CountUpValue({
  from,
  to,
  durationMs = 1000,
  fractionDigits = 0,
  resetKey,
}: CountUpValueProps) {
  const [value, setValue] = useState(from);
  const startTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startTsRef.current = null;
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    const step = (ts: number) => {
      if (startTsRef.current === null) startTsRef.current = ts;
      const elapsed = ts - startTsRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const next = from + eased * (to - from);
      setValue(next);
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      } else {
        setValue(to);
        rafRef.current = null;
      }
    };
    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, from, to, durationMs]);

  const formatted =
    fractionDigits > 0
      ? value.toFixed(fractionDigits)
      : Math.floor(value).toString();
  return <>{formatted}</>;
}
