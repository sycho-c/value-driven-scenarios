import type { RevealRhythm } from '@/cases/_types';

export interface PacingProfile {
  baseRevealMs: number;
  typingPerChar: number;
  typingMin: number;
  typingMax: number;
  pauseAfterStateMs: number;
}

export const PACING: Record<RevealRhythm, PacingProfile> = {
  snappy: {
    baseRevealMs: 280,
    typingPerChar: 55,
    typingMin: 400,
    typingMax: 1600,
    pauseAfterStateMs: 3000,
  },
  natural: {
    baseRevealMs: 520,
    typingPerChar: 80,
    typingMin: 600,
    typingMax: 2400,
    pauseAfterStateMs: 4500,
  },
  cinematic: {
    baseRevealMs: 900,
    typingPerChar: 110,
    typingMin: 800,
    typingMax: 2800,
    pauseAfterStateMs: 6000,
  },
};

export function getPacing(rhythm?: RevealRhythm): PacingProfile {
  return PACING[rhythm ?? 'natural'];
}

export function estimateTypingMs(
  text: string | undefined,
  rhythm: RevealRhythm = 'natural',
): number {
  if (!text) return PACING[rhythm].typingMin;
  const profile = PACING[rhythm];
  const raw = text.length * profile.typingPerChar;
  return Math.max(profile.typingMin, Math.min(profile.typingMax, raw));
}

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
