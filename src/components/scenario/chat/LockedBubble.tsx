import { useState } from 'react';
import type { CastMember } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './LockedBubble.module.css';

interface LockedBubbleProps {
  text: string;
  sender?: CastMember | null;
  toMe?: boolean;
  recipientLabel?: string;
  time?: string;
  defaultRevealed?: boolean;
}

export function LockedBubble({
  text,
  sender,
  toMe = false,
  recipientLabel,
  time,
  defaultRevealed = false,
}: LockedBubbleProps) {
  const [revealed, setRevealed] = useState(defaultRevealed);
  const canReveal = toMe;
  const showText = canReveal && revealed;

  return (
    <div className={cn(styles.row, toMe && styles.toMe)}>
      {sender && !toMe && (
        <div className={styles.avatar} style={{ background: sender.color }}>
          {sender.initial}
        </div>
      )}
      <div className={styles.column}>
        {sender && !toMe && <span className={styles.sender}>{sender.label}</span>}
        <div
          className={styles.bubble}
          onClick={() => canReveal && setRevealed((v) => !v)}
        >
          <div className={styles.lockHeader}>
            <span>🔒 비밀 메시지</span>
            {recipientLabel && <span>· to {recipientLabel}</span>}
          </div>
          <div className={cn(styles.lockBody, !showText && styles.locked)}>
            {showText ? text : '이 메시지는 수신자만 볼 수 있습니다.'}
          </div>
          {canReveal && (
            <div className={styles.revealHint}>
              {revealed ? '↑ 다시 잠그기' : '↑ 탭하여 확인'}
            </div>
          )}
          {!canReveal && (
            <div className={styles.revealHint}>다른 참여자는 내용을 볼 수 없습니다.</div>
          )}
        </div>
        {time && <div className={styles.meta}>{time}</div>}
      </div>
    </div>
  );
}
