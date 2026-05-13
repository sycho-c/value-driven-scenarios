import { Fragment, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import type {
  SBMessageAttachment,
  SBMessageBizForm,
  SBMessageDate,
  SBMessageFileChoices,
  SBMessageSystem,
  SBMessageText,
  SalesBridgeBubbleSender,
  SalesBridgeChatMessage,
  SalesBridgeMain,
} from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './BizFormCard.module.css';

interface BizFormCardProps {
  main: SalesBridgeMain;
  onFileClick?: (fileId: string) => void;
}

const STEP_DELAY = 0.45;
const BASE_DURATION = 0.28;

interface MessageMotionProps {
  delay: number;
  isNew: boolean;
}

function AvatarBubble({
  sender,
  isMine,
}: {
  sender: SalesBridgeBubbleSender;
  isMine: boolean;
}) {
  if (isMine) return null;
  return (
    <div
      className={styles.avatar}
      style={{ background: sender.color, color: '#fff' }}
      aria-hidden
    >
      {sender.initial}
    </div>
  );
}

function SenderHeader({
  sender,
  isMine,
}: {
  sender: SalesBridgeBubbleSender;
  isMine: boolean;
}) {
  if (isMine) return null;
  return (
    <div className={styles.senderRow}>
      <span className={styles.senderName}>{sender.label}</span>
      {sender.badge && <span className={styles.senderBadge}>{sender.badge}</span>}
    </div>
  );
}

function buildMotion({ delay, isNew }: MessageMotionProps, yOffset = 8) {
  if (!isNew) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: yOffset },
    animate: { opacity: 1, y: 0 },
    transition: { duration: BASE_DURATION, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

function TextBubble({
  message,
  motionProps,
}: {
  message: SBMessageText;
  motionProps: MessageMotionProps;
}) {
  const isMine = !!message.isMine;
  return (
    <motion.div
      className={cn(styles.row, isMine ? styles.rowMine : styles.rowOther)}
      {...buildMotion(motionProps, 6)}
    >
      <AvatarBubble sender={message.sender} isMine={isMine} />
      <div className={styles.bubbleColumn}>
        <SenderHeader sender={message.sender} isMine={isMine} />
        <div className={styles.timeRow}>
          <div className={styles.bubble}>{message.text}</div>
          {message.time && <span className={styles.time}>{message.time}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function BizFormBubble({
  message,
  motionProps,
}: {
  message: SBMessageBizForm;
  motionProps: MessageMotionProps;
}) {
  const isMine = !!message.isMine;
  return (
    <motion.div
      className={cn(styles.row, isMine ? styles.rowMine : styles.rowOther)}
      {...buildMotion(motionProps)}
    >
      <AvatarBubble sender={message.sender} isMine={isMine} />
      <div className={styles.bubbleColumn}>
        <SenderHeader sender={message.sender} isMine={isMine} />
        <div className={styles.timeRow}>
          <div className={styles.bizCard}>
            <div className={styles.bizHeader}>
              <span className={styles.bizTitle}>📋 {message.title ?? '비즈폼 · 견적 신청'}</span>
              {message.statusLabel && (
                <span className={styles.bizStatus}>{message.statusLabel}</span>
              )}
            </div>
            <div className={styles.bizBody}>
              {message.fields.map((f, i) => (
                <Fragment key={i}>
                  <div className={styles.bizFieldLabel}>{f.label}</div>
                  <div className={styles.bizFieldValue}>
                    <span className={f.highlight ? styles.bizFieldHighlight : undefined}>
                      {f.value}
                    </span>
                    {f.auto && <span className={styles.autoTag}>⚡ 자동 매핑</span>}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          {message.time && <span className={styles.time}>{message.time}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function FileChoicesBubble({
  message,
  motionProps,
  onFileClick,
}: {
  message: SBMessageFileChoices;
  motionProps: MessageMotionProps;
  onFileClick?: (id: string) => void;
}) {
  const isMine = !!message.isMine;
  return (
    <motion.div
      className={cn(styles.row, isMine ? styles.rowMine : styles.rowOther)}
      {...buildMotion(motionProps)}
    >
      <AvatarBubble sender={message.sender} isMine={isMine} />
      <div className={styles.bubbleColumn}>
        <SenderHeader sender={message.sender} isMine={isMine} />
        <div className={styles.timeRow}>
          <div className={styles.choices}>
            <div className={styles.choicesHeader}>
              <div className={styles.choicesTitle}>{message.title ?? '📎 견적서 파일 선택'}</div>
              {message.caption && (
                <div className={styles.choicesCaption}>{message.caption}</div>
              )}
            </div>
            <div className={styles.choiceList}>
              {message.choices.map((c) => (
                <div
                  key={c.id}
                  className={cn(
                    styles.choice,
                    c.valid && styles.valid,
                    !c.valid && styles.invalid,
                    c.pulse && styles.pulse,
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileClick?.(c.id);
                  }}
                >
                  <div className={styles.choiceIcon}>XLS</div>
                  <div className={styles.choiceInfo}>
                    <div className={styles.choiceName}>{c.name}</div>
                    {c.note && <div className={styles.choiceNote}>{c.note}</div>}
                  </div>
                  {c.valid ? (
                    <span className={styles.choiceStatusOk}>✓ 일치</span>
                  ) : (
                    <span className={styles.choiceStatusWarn}>⚠ 차단</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {message.time && <span className={styles.time}>{message.time}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function AttachmentBubble({
  message,
  motionProps,
}: {
  message: SBMessageAttachment;
  motionProps: MessageMotionProps;
}) {
  const isMine = !!message.isMine;
  const fileType = message.fileType ?? 'xls';
  return (
    <motion.div
      className={cn(styles.row, isMine ? styles.rowMine : styles.rowOther)}
      {...buildMotion(motionProps, 6)}
    >
      <AvatarBubble sender={message.sender} isMine={isMine} />
      <div className={styles.bubbleColumn}>
        <SenderHeader sender={message.sender} isMine={isMine} />
        <div className={styles.timeRow}>
          <div className={styles.attachment}>
            <div className={styles.attachmentBody}>
              <div className={styles.attachmentIcon}>{fileType.toUpperCase()}</div>
              <div className={styles.attachmentInfo}>
                <div className={styles.attachmentName}>{message.fileName}</div>
                <div className={styles.attachmentMeta}>
                  {message.fileSize}
                  {message.caption ? ` · ${message.caption}` : ''}
                </div>
              </div>
            </div>
            {message.status === 'sent' && (
              <div className={styles.attachmentStatus}>✓ 발송 완료 — CRM 이력 자동 기록</div>
            )}
          </div>
          {message.time && <span className={styles.time}>{message.time}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function SystemNote({
  message,
  motionProps,
}: {
  message: SBMessageSystem;
  motionProps: MessageMotionProps;
}) {
  const { initial, animate, transition } = (() => {
    if (!motionProps.isNew) {
      return { initial: false as const, animate: { opacity: 1 } as const, transition: undefined };
    }
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: BASE_DURATION, delay: motionProps.delay },
    };
  })();
  return (
    <motion.div
      className={cn(styles.system, message.tone && styles[message.tone])}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {message.text}
    </motion.div>
  );
}

function DateDivider({ message }: { message: SBMessageDate }) {
  return <div className={styles.date}>{message.text}</div>;
}

function renderMessage(
  m: SalesBridgeChatMessage,
  motionProps: MessageMotionProps,
  key: string,
  onFileClick?: (id: string) => void,
) {
  switch (m.kind) {
    case 'text':
      return <TextBubble key={key} message={m} motionProps={motionProps} />;
    case 'bizform':
      return <BizFormBubble key={key} message={m} motionProps={motionProps} />;
    case 'file-choices':
      return (
        <FileChoicesBubble
          key={key}
          message={m}
          motionProps={motionProps}
          onFileClick={onFileClick}
        />
      );
    case 'attachment':
      return <AttachmentBubble key={key} message={m} motionProps={motionProps} />;
    case 'system':
      return <SystemNote key={key} message={m} motionProps={motionProps} />;
    case 'date':
      return <DateDivider key={key} message={m} />;
  }
}

export function BizFormCard({ main, onFileClick }: BizFormCardProps) {
  if (main.kind === 'live-counter' && main.liveCounter) {
    const c = main.liveCounter;
    return (
      <div className={styles.main}>
        <div className={styles.liveCounterBig}>
          <span className={styles.liveCounterLabel}>{c.label}</span>
          <div className={styles.liveCounterRow}>
            <motion.span
              key={c.current}
              className={styles.liveCounterNumber}
              initial={{ scale: 0.92, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.current}
            </motion.span>
            <span className={styles.liveCounterSlash}>/</span>
            <span className={styles.liveCounterTotal}>{c.total}</span>
          </div>
          {c.sublabel && <p className={styles.liveCounterSub}>{c.sublabel}</p>}
          {c.completedNote && (
            <div className={styles.liveCounterDone}>{c.completedNote}</div>
          )}
        </div>
      </div>
    );
  }

  if (main.kind === 'empty' || !main.chat) {
    return (
      <div className={styles.main}>
        <div className={styles.empty}>
          좌측 거래처 목록에서 응대할 거래처를 선택해 주세요.
        </div>
      </div>
    );
  }

  return <ChatThreadView main={main} onFileClick={onFileClick} />;
}

function ChatThreadView({
  main,
  onFileClick,
}: {
  main: SalesBridgeMain;
  onFileClick?: (id: string) => void;
}) {
  const chat = main.chat!;
  const threadRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const seenRef = useRef<Set<string>>(new Set());
  const prevPartnerRef = useRef<string | null>(null);

  if (prevPartnerRef.current !== null && prevPartnerRef.current !== chat.partnerLabel) {
    seenRef.current = new Set();
  }
  prevPartnerRef.current = chat.partnerLabel;

  const rendered = useMemo(() => {
    let newIndex = 0;
    return chat.messages.map((m, i) => {
      const key = m.id ?? `${m.kind}-${i}`;
      const isNew = !seenRef.current.has(key);
      const delay = isNew ? newIndex * STEP_DELAY : 0;
      if (isNew) newIndex += 1;
      return { msg: m, key, motionProps: { delay, isNew } };
    });
  }, [chat.messages]);

  useEffect(() => {
    rendered.forEach((r) => seenRef.current.add(r.key));
  }, [rendered]);

  // Auto-scroll to bottom whenever the thread content grows (covers each staggered message reveal)
  useEffect(() => {
    const thread = threadRef.current;
    const inner = innerRef.current;
    if (!thread || !inner) return;
    const scrollToBottom = () => {
      thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    };
    scrollToBottom();
    const ro = new ResizeObserver(() => scrollToBottom());
    ro.observe(inner);
    return () => ro.disconnect();
  }, [chat.messages.length]);

  return (
    <div className={styles.main}>
      <div className={styles.chatHeader}>
        <div
          className={cn(
            styles.partnerAvatar,
            chat.partnerAvatarTone && styles[chat.partnerAvatarTone],
          )}
        >
          {chat.partnerAvatar ?? '미'}
        </div>
        <div className={styles.partnerInfo}>
          <div className={styles.partnerLabel}>
            {chat.partnerLabel}
            {chat.guestBadge && <span className={styles.guestBadge}>{chat.guestBadge}</span>}
          </div>
          <div className={styles.partnerSub}>{chat.partnerSub ?? '비즈폼 · 견적 응대'}</div>
        </div>
      </div>
      <div className={styles.thread} ref={threadRef}>
        <div className={styles.threadInner} ref={innerRef}>
          {rendered.map((r) =>
            renderMessage(r.msg, r.motionProps, r.key, onFileClick),
          )}
        </div>
      </div>
    </div>
  );
}
