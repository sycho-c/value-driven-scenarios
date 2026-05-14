import type { MobileSplitMessage } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './HanaSplitMessage.module.css';

interface HanaSplitMessageProps {
  message: MobileSplitMessage;
}

function renderTextWithHighlight(
  text: string,
  highlight?: { text: string; tone: 'danger' | 'brand' },
) {
  if (!highlight || !text.includes(highlight.text)) return text;
  const parts = text.split(highlight.text);
  const className = highlight.tone === 'danger' ? styles.danger : styles.brandToken;
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <span className={className}>{highlight.text}</span>}
    </span>
  ));
}

export function HanaSplitMessage({ message }: HanaSplitMessageProps) {
  if (message.side === 'system') {
    return (
      <div className={styles.systemRow}>
        <span className={styles.systemBubble}>{message.text}</span>
      </div>
    );
  }

  const brandClass =
    message.fileTone === 'brand'
      ? styles.brand
      : null;

  return (
    <div
      className={cn(
        styles.bubble,
        message.side === 'mine' ? styles.mine : styles.other,
        brandClass,
      )}
    >
      {message.text && (
        <div>{renderTextWithHighlight(message.text, message.highlightToken)}</div>
      )}
      {message.imageCaption && (
        <div className={styles.imageBox}>
          <span className={styles.caption}>{message.imageCaption}</span>
          {message.imageLines?.map((line, i) => (
            <div key={i}>{renderTextWithHighlight(line, message.highlightToken)}</div>
          ))}
        </div>
      )}
      {message.fileName && (
        <div className={styles.fileBox}>
          <span className={styles.fileIcon}>📄</span>
          <div className={styles.fileInfo}>
            <div>{message.fileName}</div>
            {message.fileMeta && <span className={styles.meta}>{message.fileMeta}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
