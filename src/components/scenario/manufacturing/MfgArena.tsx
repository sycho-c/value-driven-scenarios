import { type ReactNode, useEffect, useRef, useState } from 'react';
import type {
  MfgActor,
  MfgArenaState,
  MfgKakaoItem,
  MfgPhoneDef,
  MfgWsMessage,
} from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './MfgArena.module.css';

interface Props {
  state: MfgArenaState;
  actions?: ReactNode;
}

function actorOf(actors: MfgActor[], id?: string): MfgActor | undefined {
  return id ? actors.find((a) => a.id === id) : undefined;
}

function KakaoLine({
  item,
  phone,
  actors,
}: {
  item: MfgKakaoItem;
  phone: MfgPhoneDef;
  actors: MfgActor[];
}) {
  if (item.kind === 'date') {
    return <div className={styles.kDate}>{item.text ?? '오늘'}</div>;
  }
  if (item.kind === 'invite') {
    return (
      <div className={styles.alimCard}>
        <div className={styles.alimHd}>
          <span className={styles.alimIc}>💬</span>
          <span className={styles.alimT}>{item.inviteChannel ?? 'Cowork+ 채널'}</span>
          <span className={styles.alimTag}>알림톡</span>
        </div>
        <div className={styles.alimBd}>
          <div className={styles.alimTitle}>[채널 입장 초대]</div>
          <div className={styles.alimDesc}>
            <b>{item.inviteVendor}</b>님, {item.inviteChannel ?? '채널'}에 초대되었습니다. 인증
            후 입장하실 수 있습니다.
          </div>
          <div className={styles.alimNote}>
            ※ 조직도 인증 후 자동 입장
            <br />※ 미인가자·퇴사자 자동 차단
          </div>
          <button type="button" className={styles.alimBtn}>
            인증하고 입장 ▶
          </button>
        </div>
      </div>
    );
  }
  if (item.kind === 'joined') {
    return <div className={styles.joinBadge}>{item.text ?? '✓ 인증 완료 · 채널 입장'}</div>;
  }

  const sender = actorOf(actors, item.senderId);
  const isSelf = item.senderId === phone.ownerId;
  const body = item.kind === 'file' ? `📎 ${item.text}` : item.text;

  return (
    <div className={cn(styles.kmr, isSelf && styles.self, item.isNew && styles.isNew)}>
      {!isSelf && sender && (
        <div className={styles.kavt} style={{ background: sender.color }}>
          {sender.initial}
        </div>
      )}
      <div className={styles.kcol}>
        {!isSelf && sender && <div className={styles.kSender}>{sender.name}</div>}
        <div className={styles.kBubbleRow}>
          <div className={styles.kbbl}>{body}</div>
          {item.time && <div className={styles.kTime}>{item.time}</div>}
        </div>
      </div>
    </div>
  );
}

function AppTypedInput({ text }: { text: string }) {
  const [len, setLen] = useState(0);
  useEffect(() => {
    setLen(0);
    const iv = window.setInterval(() => {
      setLen((n) => {
        if (n >= text.length) {
          window.clearInterval(iv);
          return n;
        }
        return n + 1;
      });
    }, 42);
    return () => window.clearInterval(iv);
  }, [text]);
  return (
    <>
      {text.slice(0, len)}
      {len < text.length && <span className={styles.caret}>|</span>}
    </>
  );
}

function PhoneScreenBody({ phone, actors }: { phone: MfgPhoneDef; actors: MfgActor[] }) {
  const msgsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  if (phone.screen === 'ios-home') {
    const apps: Array<[string, string, string, boolean]> = [
      ['☎️', '#34C759', '전화', false],
      ['✉️', '#5AC8FA', '메일', false],
      ['🗺️', '#FF9500', '지도', false],
      ['📷', '#FF2D55', '카메라', false],
      ['C+', '#5B3FE4', 'Cowork+', true],
      ['⚙️', '#8E8E93', '설정', false],
      ['📅', '#007AFF', '캘린더', false],
      ['📗', '#4CD964', '메모', false],
    ];
    return (
      <div className={styles.iosHome}>
        <div className={styles.iosTime}>10:11</div>
        <div className={styles.iosGrid}>
          {apps.map(([ic, bg, label, pulse]) => (
            <div key={label} className={cn(styles.iosApp, pulse && styles.pulseApp)}>
              <div className={styles.iosIc} style={{ background: bg }}>
                {ic}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className={styles.iosHint}>👆 Cowork+ 앱을 탭하세요</div>
      </div>
    );
  }

  if (phone.screen === 'cowork-app') {
    return (
      <div className={styles.appScreen}>
        <div className={styles.appHdr}>
          <span>‹</span>
          <span className={styles.grow}>{phone.headerTitle ?? 'Cowork+'}</span>
          <span style={{ fontSize: 9 }}>iOS</span>
        </div>
        <div className={styles.appBody} ref={msgsRef}>
          <div className={styles.appCap}>외근 중 · Cowork+ 앱</div>
          {(phone.items ?? []).map((item) => (
            <KakaoLine key={item.id} item={item} phone={phone} actors={actors} />
          ))}
        </div>
        <div className={styles.appInbar}>
          <div className={styles.appIn}>
            {phone.appInput?.state === 'typing' && phone.appInput.text ? (
              <AppTypedInput text={phone.appInput.text} />
            ) : phone.appInput?.state === 'sent' || !phone.appInput?.text ? (
              <span className={styles.appInPh}>메시지 입력…</span>
            ) : (
              phone.appInput.text
            )}
          </div>
          <button type="button" className={styles.appSend}>
            전송
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.kakaoScreen,
        phone.screen === 'alert-list' && styles.alertList,
        phone.channelTheme && styles.channelTheme,
      )}
    >
      <div className={styles.kHdr}>
        <span className={styles.kBack}>‹</span>
        <div className={styles.kHdrMid}>
          <span className={styles.kHdrN}>{phone.headerTitle}</span>
          {phone.headerCount && <span className={styles.kHdrC}>{phone.headerCount}</span>}
        </div>
        <span className={styles.kMenu}>☰</span>
      </div>
      <div className={styles.kMsgs} ref={msgsRef}>
        {(phone.items ?? []).map((item) => (
          <KakaoLine key={item.id} item={item} phone={phone} actors={actors} />
        ))}
      </div>
      <div className={styles.kInput}>
        <span className={styles.kInputPlus}>＋</span>
        <div className={styles.kInputField}>메시지 입력</div>
      </div>
    </div>
  );
}

const BADGE_LABEL: Record<string, string> = {
  company: '회사',
  vendor: '거래처',
  channel: '상담톡',
};

function Phone({
  phone,
  actors,
  dimAll,
}: {
  phone: MfgPhoneDef;
  actors: MfgActor[];
  dimAll: boolean;
}) {
  const dimmed = dimAll || phone.dimmed;
  const lastTimed = [...(phone.items ?? [])].reverse().find((it) => it.time);
  const statusTime = phone.statusTime ?? lastTimed?.time ?? '09:00';
  return (
    <div
      className={cn(
        styles.phoneUnit,
        phone.companyFrame && styles.companyFrame,
        dimmed && styles.dimmedUnit,
      )}
    >
      <div className={styles.pOwner}>
        <div className={styles.pOwnerL}>
          <div className={styles.pOwnerN}>{phone.ownerLabel}</div>
          <div className={styles.pOwnerT}>{phone.ownerSub}</div>
        </div>
        <span className={cn(styles.pBadge, styles[phone.badge])}>
          {phone.badgeLabel ?? BADGE_LABEL[phone.badge]}
        </span>
      </div>
      <div
        className={cn(styles.phone, phone.highlight && styles.highlight, dimmed && styles.dimmed)}
      >
        <div className={styles.notch} />
        <div className={styles.statusbar}>
          <span>{statusTime}</span>
          <span>●●● 📶 🔋</span>
        </div>
        <PhoneScreenBody phone={phone} actors={actors} />
        {phone.companyFrame && <div className={styles.companyRibbon}>회사 담당자</div>}
      </div>
    </div>
  );
}

function WsMessageRow({ msg, actors }: { msg: MfgWsMessage; actors: MfgActor[] }) {
  if (msg.kind === 'system' || msg.kind === 'system-hi') {
    return (
      <div className={cn(styles.wsSys, msg.kind === 'system-hi' && styles.hi, msg.isNew && styles.isNew)}>
        {msg.text}
      </div>
    );
  }

  const sender = actorOf(actors, msg.senderId);
  const out = msg.kind === 'out';
  const avatarColor = msg.senderUnknown ? '#B0B8CC' : sender?.color ?? '#5B3FE4';
  const avatarInitial = msg.senderUnknown ? '?' : sender?.initial ?? '나';
  const senderName = msg.senderLabel ?? sender?.name ?? '';

  return (
    <div className={cn(styles.wsMr, out && styles.out, msg.isNew && styles.isNew)}>
      <div className={styles.wsAv} style={{ background: avatarColor }}>
        {avatarInitial}
      </div>
      <div className={styles.wsMc}>
        <div className={styles.wsMn}>
          <span className={cn(msg.senderUnknown && styles.wsMnRaw)}>{senderName}</span>
          {msg.srcLabel && <span className={styles.wsMnSrc}> · {msg.srcLabel}</span>}
        </div>
        {msg.text && (
          <div className={styles.wsBbl}>
            {msg.text}
            {msg.card && (
              <div className={styles.wsCard}>
                <div className={styles.wsCardT}>{msg.card.title}</div>
                {msg.card.rows.map(([k, v]) => (
                  <div key={k} className={styles.wsCardRow}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {msg.file && (
          <>
            <div className={cn(styles.wsFile, msg.file.state && styles[msg.file.state])}>
              <div className={styles.wsFileIco}>{msg.file.icon}</div>
              <div className={styles.wsFileInfo}>
                <div className={styles.wsFileN}>{msg.file.name}</div>
                <div className={styles.wsFileS}>{msg.file.sub}</div>
              </div>
              {msg.file.download && <div className={styles.wsFileDl}>↓ 다운로드</div>}
            </div>
            {msg.file.statusText && (
              <div className={msg.file.statusTone === 'ok' ? styles.wsSendOk : styles.wsSendFail}>
                {msg.file.statusText}
              </div>
            )}
          </>
        )}
        <div className={styles.wsMeta}>
          {msg.time && <span>{msg.time}</span>}
          {msg.badge && (
            <span className={cn(styles.s2Badge, styles[msg.badge.tone])}>{msg.badge.text}</span>
          )}
          {msg.metaText && <span className={styles.wsRead}>{msg.metaText}</span>}
        </div>
      </div>
    </div>
  );
}

export function MfgArena({ state, actions }: Props) {
  const wsMsgsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wsMsgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  const ws = state.workspace;
  const painActive = !!state.painPopup;

  return (
    <div>
      {state.banner && <div className={styles.banner}>{state.banner}</div>}
      <div className={cn(styles.arena, state.layout === 'phones-only' && styles.phonesOnly)}>
        <div className={styles.leftCol}>
          {state.phonesLabel && (
            <div className={styles.colLabel}>
              {state.phonesLabel}
              {state.phonesBadge && <span className={styles.nBadge}>{state.phonesBadge}</span>}
            </div>
          )}
          <div className={styles.phones}>
            {state.phones.map((phone) => (
              <Phone key={phone.id} phone={phone} actors={state.actors} dimAll={painActive} />
            ))}
            {state.painPopup && (
              <div className={styles.painPop}>
                <div className={styles.painPopHd}>{state.painPopup.title}</div>
                <div className={styles.painPopBd}>
                  {state.painPopup.items.map((it, i) => (
                    <div key={it.heading} className={styles.painItem}>
                      <div className={styles.painNum}>{i + 1}</div>
                      <div>
                        <div className={styles.painH}>{it.heading}</div>
                        <div className={styles.painD}>{it.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {state.moreSlot && (
            <div className={styles.moreSlot}>
              <div className={styles.moreIco}>＋</div>
              <div>
                <div className={styles.moreT}>{state.moreSlot.title}</div>
                <div className={styles.moreS}>{state.moreSlot.sub}</div>
              </div>
            </div>
          )}
        </div>

        {state.layout === 'split' && ws && (
          <div className={styles.wsCol}>
            <div className={styles.wsRole}>
              <button type="button" className={cn(styles.wsRb, ws.role !== 'admin' && styles.on)}>
                🖥 영업지원 담당자
              </button>
              <button type="button" className={cn(styles.wsRb, ws.role === 'admin' && styles.on)}>
                👔 이윤 관리자
              </button>
              <span className={styles.wsRoleTag}>
                {ws.role === 'admin' ? '관리자 뷰 · 대시보드 권한' : '담당자 뷰'}
              </span>
            </div>
            <div className={styles.workspace}>
              <div className={styles.wsSide}>
                <div className={styles.wsShdr}>
                  <div className={styles.wsLogo}>Cowork+</div>
                  <div className={styles.wsOnline}>● 근무중</div>
                </div>
                <div className={styles.wsSecT}>운영현황</div>
                <div className={styles.wsDashMenu}>
                  <div className={styles.wsDashIco}>📊</div>
                  <div>
                    <div className={styles.wsDashL}>채널 대시보드</div>
                    <div className={styles.wsDashS}>거래처별 · 담당자별</div>
                  </div>
                </div>
                <div className={styles.wsSecT}>대화방 {ws.roomCount ?? ''}</div>
                <div className={styles.wsRooms}>
                  {(ws.rooms ?? []).map((room) => (
                    <div key={room.id} className={cn(styles.wsRm, room.active && styles.on)}>
                      <div className={styles.wsRav} style={{ background: room.color }}>
                        {room.name.charAt(0)}
                      </div>
                      <div className={styles.wsRi}>
                        <div className={styles.wsRn}>{room.name}</div>
                        {room.preview && <div className={styles.wsRp}>{room.preview}</div>}
                      </div>
                    </div>
                  ))}
                </div>
                {ws.sideNote && <div className={styles.wsCountNote}>{ws.sideNote}</div>}
              </div>
              <div className={styles.wsCenter}>
                <div className={styles.wsChdr}>
                  <div>
                    <div className={styles.wsCname}>{ws.headerTitle}</div>
                    {ws.headerSub && <div className={styles.wsCsub}>{ws.headerSub}</div>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>🔍 ⋯</div>
                </div>
                <div className={styles.wsMsgs} ref={wsMsgsRef}>
                  {ws.messages.map((msg) => (
                    <WsMessageRow key={msg.id} msg={msg} actors={state.actors} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {actions}
    </div>
  );
}
