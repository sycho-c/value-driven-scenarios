import { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatLine, CastMember, RevealRhythm } from '@/cases/_types';
import { ChatBubble } from '../chat/ChatBubble';
import { DateDivider } from '../chat/DateDivider';
import { SystemNote } from '../chat/SystemNote';
import { BizFormCard } from '../chat/BizFormCard';
import { UrlCard } from '../chat/UrlCard';
import { LockedBubble } from '../chat/LockedBubble';
import { TypingBubble } from '../chat/TypingBubble';
import { useMessageReveal } from '../hooks/useMessageReveal';

interface MessageListProps {
  messages: ChatLine[];
  castById: Record<string, CastMember>;
  ownerCastId?: string;
  rhythm?: RevealRhythm;
  resetKey?: string;
}

type SystemTone = 'muted' | 'warn' | 'danger' | 'good' | 'brand';

function toneOf(line: ChatLine): SystemTone {
  const t = (line.meta as { tone?: SystemTone } | undefined)?.tone;
  return t ?? 'muted';
}

function findScrollParent(el: HTMLElement | null): HTMLElement | null {
  let cur: HTMLElement | null = el?.parentElement ?? null;
  while (cur) {
    const style = getComputedStyle(cur);
    if (/(auto|scroll|overlay)/.test(style.overflowY)) return cur;
    cur = cur.parentElement;
  }
  return null;
}

export function MessageList({
  messages,
  castById,
  ownerCastId,
  rhythm,
  resetKey,
}: MessageListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasRevealMetadata = useMemo(
    () =>
      messages.some(
        (m) => typeof m.revealDelayMs === 'number' || typeof m.typingFor === 'number',
      ),
    [messages],
  );

  const revealItems = useMemo(
    () =>
      messages.map((m, idx) => {
        const sender = m.senderId ? castById[m.senderId] : null;
        const isIncoming =
          m.kind === 'message' &&
          !(m.side === 'mine' || (!!ownerCastId && m.senderId === ownerCastId));
        return {
          id: m.id ?? `mli-${idx}`,
          text: m.text,
          senderId: m.senderId,
          senderLabel: sender?.shortLabel ?? sender?.label,
          revealDelayMs: m.revealDelayMs,
          typingFor: m.typingFor,
          isIncoming,
          line: m,
        };
      }),
    [messages, castById, ownerCastId],
  );

  const { revealed, typingSender } = useMessageReveal({
    items: revealItems,
    rhythm,
    resetKey: resetKey ?? messages.map((m, i) => m.id ?? `i${i}`).join('|'),
    disabled: !hasRevealMetadata,
  });

  const messageKey = revealed.map((m) => m.id).join('|');

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scroller = findScrollParent(wrapper);
    if (!scroller) return;

    const raf = requestAnimationFrame(() => {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
    });

    const ro = new ResizeObserver(() => {
      scroller.scrollTop = scroller.scrollHeight;
    });
    ro.observe(scroller);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [messageKey]);

  const typingCast =
    typingSender?.id && castById[typingSender.id] ? castById[typingSender.id] : null;

  return (
    <div ref={wrapperRef}>
      <AnimatePresence initial={false}>
        {revealed.map((item, idx) => {
          const line = item.line;
          const key = line.id ?? `msg-${idx}`;
          return (
            <motion.div
              key={key}
              initial={line.isNew ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderLine(line, castById, ownerCastId)}
            </motion.div>
          );
        })}
        {typingSender && (
          <motion.div key="typing-indicator">
            <TypingBubble sender={typingCast} senderLabel={typingSender.label} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function renderLine(
  line: ChatLine,
  castById: Record<string, CastMember>,
  ownerCastId?: string,
): React.ReactElement | null {
  switch (line.kind) {
    case 'date':
      return <DateDivider text={line.text ?? ''} />;
    case 'separator':
      return <DateDivider text={line.text ?? ''} />;
    case 'system':
      return <SystemNote text={line.text ?? ''} tone={toneOf(line)} />;
    case 'bizform-card': {
      const meta = (line.meta ?? {}) as { fields?: string[]; cta?: string };
      return <BizFormCard title={line.text ?? '비즈폼'} fields={meta.fields} cta={meta.cta} />;
    }
    case 'url-card': {
      const meta = (line.meta ?? {}) as { url?: string; badge?: string; metaText?: string };
      return (
        <UrlCard
          title={line.text ?? '추적 URL'}
          url={meta.url ?? ''}
          badge={meta.badge}
          metaText={meta.metaText}
        />
      );
    }
    case 'locked': {
      const meta = (line.meta ?? {}) as {
        recipientId?: string;
        recipientLabel?: string;
        defaultRevealed?: boolean;
      };
      const sender = line.senderId ? castById[line.senderId] : null;
      const toMe = !!ownerCastId && meta.recipientId === ownerCastId;
      return (
        <LockedBubble
          text={line.text ?? ''}
          sender={sender}
          toMe={toMe}
          recipientLabel={meta.recipientLabel}
          time={line.time}
          defaultRevealed={meta.defaultRevealed}
        />
      );
    }
    case 'message': {
      const sender = line.senderId ? castById[line.senderId] : null;
      const mine = line.side === 'mine' || (!!ownerCastId && line.senderId === ownerCastId);
      const meta = (line.meta ?? {}) as { danger?: boolean; urgent?: boolean };
      return (
        <ChatBubble
          text={line.text ?? ''}
          sender={sender}
          mine={mine}
          time={line.time}
          urgent={meta.urgent}
          danger={meta.danger}
        />
      );
    }
    default:
      return null;
  }
}
