import { cn } from '@/lib/cn';
import styles from './SystemNote.module.css';

type Tone = 'muted' | 'warn' | 'danger' | 'good' | 'brand';

interface SystemNoteProps {
  text: string;
  tone?: Tone;
}

const toneClass: Record<Tone, string | null> = {
  muted: null,
  warn: styles['tone-warn'],
  danger: styles['tone-danger'],
  good: styles['tone-good'],
  brand: styles['tone-brand'],
};

export function SystemNote({ text, tone = 'muted' }: SystemNoteProps) {
  return (
    <div className={styles.note}>
      <span className={cn(styles.text, toneClass[tone])}>{text}</span>
    </div>
  );
}
