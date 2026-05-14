import { motion } from 'framer-motion';
import type { DesktopMessage } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './PCMessageBubble.module.css';

interface PCMessageBubbleProps {
  message: DesktopMessage;
  pulseFileId?: string;
  isNew?: boolean;
  delay?: number;
  onFileClick?: (fileId: string) => void;
}

export function PCMessageBubble({
  message,
  pulseFileId,
  isNew = true,
  delay = 0,
  onFileClick,
}: PCMessageBubbleProps) {
  if (message.kind === 'date') {
    return <div className={styles.dateDivider}>📅 {message.text}</div>;
  }

  if (message.kind === 'system') {
    return <div className={styles.systemNote}>{message.text}</div>;
  }

  const isMine = !!message.isMine;
  const isFile = message.kind === 'file' || message.kind === 'file-captured';
  const isClickable =
    message.kind === 'file' &&
    !!message.clickableFileId &&
    message.clickableFileId === pulseFileId;

  const fileBlock =
    isFile && message.kind === 'file' ? (
      <div className={styles.filePreview}>
        <div className={cn(styles.fileIcon, styles[message.fileType ?? 'xls'])}>
          {(message.fileType ?? 'xls').toUpperCase()}
        </div>
        <div className={styles.fileInfo}>
          <div className={styles.fileName}>{message.fileName}</div>
          <div className={styles.fileMeta}>{message.fileSize}</div>
        </div>
      </div>
    ) : isFile && message.kind === 'file-captured' ? (
      <div className={cn(styles.filePreview, styles.captured)}>
        <div className={cn(styles.fileIcon, styles[message.fileType ?? 'png'])}>
          {(message.fileType ?? 'png').toUpperCase()}
        </div>
        <div className={styles.fileInfo}>
          <div className={styles.fileName}>{message.fileName}</div>
          <div className={styles.fileMeta}>
            {message.fileSize}
            {message.fileNote ? ` · ${message.fileNote}` : ''}
          </div>
        </div>
      </div>
    ) : null;

  const bubbleContent = isFile ? fileBlock : message.text;

  const bubbleNode = (
    <div
      className={cn(
        styles.bubble,
        isMine && styles.mineBubble,
        message.kind === 'deleted' && styles.deleted,
        isFile && styles.withFile,
        isClickable && styles.clickable,
      )}
      onClick={
        isClickable
          ? (e) => {
              e.stopPropagation();
              onFileClick?.(message.clickableFileId!);
            }
          : undefined
      }
    >
      {bubbleContent}
    </div>
  );

  const timeNode = message.time ? <span className={styles.time}>{message.time}</span> : null;
  const readNode = message.readBy ? (
    <span className={styles.readStatus}>{message.readBy}</span>
  ) : null;

  return (
    <motion.div
      className={cn(styles.row, isMine ? styles.mine : styles.other)}
      initial={isNew ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        isNew ? { duration: 0.28, delay, ease: [0.22, 1, 0.36, 1] } : undefined
      }
    >
      {!isMine && (
        <div className={styles.avatar}>
          {message.senderAvatarSrc ? (
            <img src={message.senderAvatarSrc} alt={message.sender ?? ''} />
          ) : null}
        </div>
      )}
      <div className={styles.content}>
        {!isMine && message.sender && (
          <div className={styles.sender}>{message.sender}</div>
        )}
        <div className={cn(styles.bubbleRow, isMine && styles.mineRow)}>
          {bubbleNode}
          {readNode}
          {timeNode}
        </div>
      </div>
    </motion.div>
  );
}
