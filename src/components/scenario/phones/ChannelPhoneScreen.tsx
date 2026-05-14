import type { PhoneScreen } from '@/cases/_types';
import { cn } from '@/lib/cn';
import { MessageContextMenu, type ContextMenuItem } from './MessageContextMenu';
import { ShareSheetMock, type ShareApp } from './ShareSheetMock';
import { LockScreenMock, type LockNotification, type LockAppBadge } from './LockScreenMock';
import styles from './ChannelPhoneScreen.module.css';

export interface ChannelMessage {
  id?: string;
  sender?: string;
  text?: string;
  time?: string;
  isMine?: boolean;
  hint?: string;
  fileName?: string;
  fileMemo?: string;
  fileBadge?: 'warn' | 'plain';
  pulseAttachment?: boolean;
}

type Meta = Record<string, unknown>;

interface ChannelPhoneScreenProps {
  screen: PhoneScreen;
}

export function ChannelPhoneScreen({ screen }: ChannelPhoneScreenProps) {
  const meta = (screen.meta ?? {}) as Meta;

  if (screen.type === 'share-sheet') {
    const apps = (meta.apps as ShareApp[]) ?? [];
    const baseScreen = meta.background as { messages?: ChannelMessage[] } | undefined;
    return (
      <div className={styles.screen}>
        <div className={styles.body}>
          {(baseScreen?.messages ?? []).map((m, i) => renderMessage(m, i))}
        </div>
        <ShareSheetMock title={(meta.title as string) ?? '공유'} apps={apps} />
      </div>
    );
  }

  if (screen.type === 'context-menu') {
    const items = (meta.items as ContextMenuItem[]) ?? [];
    const baseScreen = meta.background as { messages?: ChannelMessage[] } | undefined;
    return (
      <div className={styles.screen}>
        <div className={styles.body}>
          {(baseScreen?.messages ?? []).map((m, i) => renderMessage(m, i))}
        </div>
        <MessageContextMenu items={items} />
      </div>
    );
  }

  if (screen.type === 'lock-screen') {
    return (
      <LockScreenMock
        time={(meta.time as string) ?? '14:08'}
        date={(meta.date as string) ?? '4월 2일 목요일'}
        notifications={meta.notifications as LockNotification[] | undefined}
        emptyText={meta.emptyText as string | undefined}
        appDock={meta.appDock as LockAppBadge[] | undefined}
        homeBadge={meta.homeBadge as string | undefined}
      />
    );
  }

  if (screen.type === 'private-app') {
    const file = (meta.file ?? {}) as {
      name?: string;
      memo?: string;
    };
    return (
      <div className={cn(styles.screen, styles.privateApp)}>
        <span className={styles.badge}>📦 Cowork+ Private App</span>
        <span className={styles.title}>{(meta.title as string) ?? '미우 단체 Cowork+'}</span>
        <span className={styles.sub}>
          {(meta.sub as string) ?? 'iPhone 사내 전용 앱 · TestFlight 진입'}
        </span>
        {file.name && (
          <div className={cn(styles.fileCard)}>
            <div className={styles.fileIcon}>XLS</div>
            <div className={styles.fileMeta}>
              <div className={styles.fileName}>{file.name}</div>
              {file.memo && <div className={styles.fileMemo}>📝 {file.memo}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // channel-message: standard message list with lane visual
  const messages = (meta.messages as ChannelMessage[]) ?? [];
  const consultTone = screen.headerVariant === 'consult-yellow' || screen.headerVariant === 'cowork-badge';
  return (
    <div className={cn(styles.screen, consultTone && styles.consult)}>
      <div className={styles.body}>{messages.map((m, i) => renderMessage(m, i))}</div>
    </div>
  );
}

function renderMessage(m: ChannelMessage, idx: number) {
  const key = m.id ?? `cm-${idx}`;
  if (m.sender === 'system' && !m.fileName) {
    return (
      <div key={key} className={styles.systemRow}>
        <span className={styles.systemPill}>{m.text}</span>
      </div>
    );
  }
  if (m.fileName) {
    return (
      <div
        key={key}
        className={cn(styles.msgRow, m.isMine && styles.mine, m.pulseAttachment && styles.pulseAttachment)}
      >
        {!m.isMine && <div className={styles.avatar}>{m.sender?.charAt(0) ?? '?'}</div>}
        <div className={styles.bubbleCol}>
          {!m.isMine && m.sender && <span className={styles.senderName}>{m.sender}</span>}
          <div className={styles.bubbleLine}>
            <div className={cn(styles.fileCard, m.fileBadge === 'warn' && styles.warn)}>
              <div className={styles.fileIcon}>XLS</div>
              <div className={styles.fileMeta}>
                <div className={styles.fileName}>{m.fileName}</div>
                {m.fileMemo && <div className={styles.fileMemo}>📝 {m.fileMemo}</div>}
              </div>
            </div>
            {m.time && <span className={styles.bubbleTime}>{m.time}</span>}
          </div>
          {m.hint && <span className={styles.bubbleHint}>{m.hint}</span>}
        </div>
      </div>
    );
  }
  return (
    <div key={key} className={cn(styles.msgRow, m.isMine && styles.mine)}>
      {!m.isMine && <div className={styles.avatar}>{m.sender?.charAt(0) ?? '?'}</div>}
      <div className={styles.bubbleCol}>
        {!m.isMine && m.sender && <span className={styles.senderName}>{m.sender}</span>}
        <div className={styles.bubbleLine}>
          <div className={styles.bubble}>{renderBubbleText(m.text)}</div>
          {m.time && <span className={styles.bubbleTime}>{m.time}</span>}
        </div>
        {m.hint && <span className={styles.bubbleHint}>{m.hint}</span>}
      </div>
    </div>
  );
}

function renderBubbleText(text?: string) {
  if (!text) return null;
  // Cowork+ 본문 첫 줄 자동 삽입 패턴: "가온 강승희 [Cowork+]\n본문..."
  const match = text.match(/^([^\n]*\[Cowork\+\])\n([\s\S]+)$/);
  if (match) {
    const [, senderLine, body] = match;
    return (
      <>
        <div className={styles.coworkSenderLine}>{senderLine}</div>
        <hr className={styles.coworkDivider} />
        <div className={styles.coworkBody}>{body}</div>
      </>
    );
  }
  return text;
}
