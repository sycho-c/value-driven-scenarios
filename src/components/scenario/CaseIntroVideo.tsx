import { useCallback, useEffect, useRef, useState } from 'react';
import type { CaseIntroVideoDef } from '@/cases/_types';
import styles from './CaseIntroVideo.module.css';

interface CaseIntroVideoProps {
  intro: CaseIntroVideoDef;
  /** Called when the user skips the intro or the video finishes — advances into the scenario. */
  onDismiss: () => void;
  /** Called when the user cancels the intro (e.g. Esc) — returns to the previous screen. */
  onClose: () => void;
}

function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const trimmedBase = base.endsWith('/') ? base : `${base}/`;
  const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${trimmedBase}${trimmedPath}`;
}

export function CaseIntroVideo({ intro, onDismiss, onClose }: CaseIntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ended, setEnded] = useState(false);

  const handleDismiss = useCallback(() => {
    videoRef.current?.pause();
    onDismiss();
  }, [onDismiss]);

  const handleClose = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        handleDismiss();
        return;
      }
      if (e.key === ' ') {
        const v = videoRef.current;
        if (v) {
          e.preventDefault();
          if (v.paused) void v.play();
          else v.pause();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleDismiss, handleClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="시나리오 인트로 영상"
    >
      <div className={styles.header}>
        <div className={styles.headerText}>
          {intro.eyebrow && <span className={styles.eyebrow}>{intro.eyebrow}</span>}
          {intro.title && <h2 className={styles.title}>{intro.title}</h2>}
          {intro.subtitle && <span className={styles.subtitle}>{intro.subtitle}</span>}
        </div>
        <div className={styles.headerActions}>
          <button type="button" className={styles.skipBtn} onClick={handleDismiss}>
            {intro.skipLabel ?? '시나리오 바로 보기 →'}
          </button>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="인트로 닫기"
            title="인트로 닫기 (Esc)"
          >
            ×
          </button>
        </div>
      </div>

      <div className={styles.videoFrame}>
        <video
          ref={videoRef}
          className={styles.video}
          src={withBase(intro.src)}
          poster={intro.poster ? withBase(intro.poster) : undefined}
          controls
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setEnded(true)}
          onError={() => setEnded(true)}
        />
      </div>

      <div className={styles.controls}>
        {ended ? (
          <button type="button" className={styles.continueBtn} onClick={handleDismiss} autoFocus>
            {intro.continueLabel ?? '시나리오 시작 →'}
          </button>
        ) : (
          <span className={styles.hint}>Space 재생/일시정지 · Enter 시나리오 시작 · Esc 인트로 닫기</span>
        )}
      </div>
    </div>
  );
}
