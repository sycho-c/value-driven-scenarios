import { useEffect, useState, useRef, type CSSProperties } from 'react';
import type { MobilePCParticle } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './FlyingParticles.module.css';

interface FlyingParticlesProps {
  particles: MobilePCParticle[];
  originRef: React.RefObject<HTMLElement | null>;
  targetRefs: Record<string, React.RefObject<HTMLElement>>;
  onParticleArrive?: (targetFieldId: string) => void;
  flightDurationMs?: number;
  resetKey?: string;
}

type ParticlePhase = 'idle' | 'spawn' | 'flying' | 'done';

interface ParticleState {
  id: string;
  text: string;
  targetFieldId: string;
  phase: ParticlePhase;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
}

export function FlyingParticles({
  particles,
  originRef,
  targetRefs,
  onParticleArrive,
  flightDurationMs = 850,
  resetKey,
}: FlyingParticlesProps) {
  const [states, setStates] = useState<ParticleState[]>([]);
  const [glowOn, setGlowOn] = useState(false);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
    setStates([]);
    setGlowOn(false);

    if (!originRef.current || particles.length === 0) return;

    const compute = () => {
      const originEl = originRef.current;
      if (!originEl) return;
      const oRect = originEl.getBoundingClientRect();
      const oCenter = {
        x: oRect.left + oRect.width / 2,
        y: oRect.top + oRect.height / 2,
      };
      setGlowPos(oCenter);
      setGlowOn(true);

      const computed: ParticleState[] = particles
        .map((p) => {
          const tEl = targetRefs[p.targetFieldId]?.current;
          if (!tEl) return null;
          const tRect = tEl.getBoundingClientRect();
          const target = {
            x: tRect.left + tRect.width / 2,
            y: tRect.top + tRect.height / 2 + 6,
          };
          return {
            id: p.id,
            text: p.text,
            targetFieldId: p.targetFieldId,
            phase: 'idle' as ParticlePhase,
            startX: oCenter.x,
            startY: oCenter.y,
            dx: target.x - oCenter.x,
            dy: target.y - oCenter.y,
          };
        })
        .filter((s): s is ParticleState => s !== null);

      setStates(computed);

      particles.forEach((p, i) => {
        const delay = p.delayMs ?? i * 450;
        const tSpawn = window.setTimeout(() => {
          setStates((prev) =>
            prev.map((s) => (s.id === p.id ? { ...s, phase: 'spawn' } : s)),
          );
        }, delay);
        const tFly = window.setTimeout(() => {
          setStates((prev) =>
            prev.map((s) => (s.id === p.id ? { ...s, phase: 'flying' } : s)),
          );
        }, delay + 120);
        const tArrive = window.setTimeout(() => {
          setStates((prev) =>
            prev.map((s) => (s.id === p.id ? { ...s, phase: 'done' } : s)),
          );
          onParticleArrive?.(p.targetFieldId);
        }, delay + 120 + flightDurationMs);
        timeoutsRef.current.push(tSpawn, tFly, tArrive);
      });

      const lastDelay = particles.reduce(
        (acc, p, i) => Math.max(acc, p.delayMs ?? i * 450),
        0,
      );
      const offT = window.setTimeout(
        () => setGlowOn(false),
        lastDelay + 120 + flightDurationMs + 400,
      );
      timeoutsRef.current.push(offT);
    };

    const raf = window.requestAnimationFrame(compute);
    return () => {
      window.cancelAnimationFrame(raf);
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      {glowPos && (
        <div
          className={cn(styles.glow, glowOn && styles.on)}
          style={{ left: glowPos.x, top: glowPos.y }}
        />
      )}
      {states.map((s) => {
        const isFlying = s.phase === 'flying' || s.phase === 'done';
        const style: CSSProperties = {
          left: s.startX,
          top: s.startY,
          ['--dx' as never]: `${s.dx}px`,
          ['--dy' as never]: `${s.dy}px`,
          transform: isFlying
            ? `translate(${s.dx}px, ${s.dy}px) scale(${s.phase === 'done' ? 0.7 : 1})`
            : `translate(0, 0) scale(${s.phase === 'idle' ? 0.6 : 1})`,
          opacity: s.phase === 'idle' || s.phase === 'done' ? (s.phase === 'idle' ? 0 : 0) : 1,
        };
        return (
          <div
            key={s.id}
            className={cn(
              styles.particle,
              s.phase === 'spawn' && styles.spawn,
              s.phase === 'flying' && styles.flying,
              s.phase === 'done' && styles.done,
            )}
            style={style}
          >
            {s.text}
          </div>
        );
      })}
    </div>
  );
}
