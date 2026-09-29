import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type {
  MfgActor,
  MfgArenaAction,
  MfgArenaState,
  MfgCaption,
  MfgLegacyPcDef,
  MfgKakaoItem,
  MfgPhoneDef,
  MfgWsBoard,
  MfgWsMessage,
} from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './MfgArena.module.css';
import { type Beat, buildBeats, kakaoSig, wsSig } from './beats';
import { StepCaption } from './StepCaption';

interface Props {
  state: MfgArenaState;
  actions?: ReactNode;
  /** 자동재생 중이면 STATE 안 액션을 잠시 뒤 스스로 실행한다 */
  autoplay?: boolean;
  /** 안내·테이크오버 오버레이가 떠 있으면 → 키를 러너에 양보한다 */
  overlay?: boolean;
  onBusyChange?: (busy: boolean) => void;
  /** 단계 안내 줄 — 지금 할 일은 진행 상태로 채운다 */
  caption?: MfgCaption;
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
          <span className={styles.alimTag}>{item.inviteTag ?? '알림톡'}</span>
        </div>
        <div className={styles.alimBd}>
          <div className={styles.alimTitle}>{item.inviteTitle ?? '[채널 입장 초대]'}</div>
          <div className={styles.alimDesc}>
            {item.inviteDesc ?? (
              <>
                <b>{item.inviteVendor}</b>님, {item.inviteChannel ?? '채널'}에 초대되었습니다. 인증
                후 입장하실 수 있습니다.
              </>
            )}
          </div>
          <div className={styles.alimNote}>
            {(item.inviteNotes ?? ['조직도 인증 후 자동 입장', '미인가자·퇴사자 자동 차단']).map(
              (note, i) => (
                <span key={note}>
                  {i > 0 && <br />}※ {note}
                </span>
              ),
            )}
          </div>
          <button type="button" className={styles.alimBtn}>
            {item.inviteBtn ?? '인증하고 입장 ▶'}
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

/** 상대가 입력 중일 때 보이는 점 세 개 */
function TypingDots() {
  return (
    <div className={styles.typingRow}>
      <span className={styles.typingDots}>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

function PhoneScreenBody({
  phone,
  actors,
  hidden,
  typing,
  sigId,
}: {
  phone: MfgPhoneDef;
  actors: MfgActor[];
  /** 아직 차례가 오지 않은 줄 */
  hidden: Set<string>;
  typing: boolean;
  /** 순서 서명에 쓰는 폰 id (탭을 덮어도 바뀌지 않는 원래 id) */
  sigId: string;
}) {
  const visibleItems = (phone.items ?? []).filter((item) => !hidden.has(kakaoSig(sigId, item)));
  const msgsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = msgsRef.current;
    // 새 줄이 붙으면 목록이 부드럽게 위로 밀린다
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
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
        <div className={styles.iosTime}>{phone.statusTime ?? '10:11'}</div>
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
        {phone.iosHint !== '' && (
          <div className={styles.iosHint}>{phone.iosHint ?? '👆 Cowork+ 앱을 탭하세요'}</div>
        )}
      </div>
    );
  }

  if (phone.screen === 'room-list') {
    return (
      <div className={styles.kakaoScreen}>
        <div className={styles.rlHdr}>
          <span>{phone.headerTitle ?? '채팅'}</span>
          {phone.headerCount && <span className={styles.rlCount}>{phone.headerCount}</span>}
        </div>
        <div className={styles.rlList} ref={msgsRef}>
          {(phone.roomList ?? []).map((room) => (
            <div key={room.id} className={cn(styles.rlRow, room.hot && styles.rlHot)}>
              <div className={styles.rlAv} style={{ background: room.color ?? '#B0B8CC' }}>
                {room.name.slice(0, 1)}
              </div>
              <div className={styles.rlMain}>
                <div className={styles.rlName}>{room.name}</div>
                <div className={styles.rlPrev}>{room.preview}</div>
              </div>
              <div className={styles.rlSide}>
                {room.time && <div className={styles.rlTime}>{room.time}</div>}
                {!!room.unread && <div className={styles.rlBadge}>{room.unread}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phone.screen === 'cowork-app') {
    return (
      <div className={styles.appScreen}>
        <div className={styles.appHdr}>
          <span>‹</span>
          <span className={styles.grow}>{phone.headerTitle ?? 'Cowork+'}</span>
          <span className={styles.appHdrBadge}>{phone.appBadge ?? 'iOS'}</span>
        </div>
        {phone.appContext && (
          <div className={styles.appCtx}>
            <div className={styles.appCtxAv}>
              {phone.appContext.initial ?? phone.appContext.title.slice(0, 1)}
            </div>
            <div className={styles.appCtxMain}>
              <div className={styles.appCtxT}>{phone.appContext.title}</div>
              {phone.appContext.sub && <div className={styles.appCtxS}>{phone.appContext.sub}</div>}
              {phone.appContext.chips && phone.appContext.chips.length > 0 && (
                <div className={styles.appCtxChips}>
                  {phone.appContext.chips.map((chip) => (
                    <span key={chip} className={styles.appCtxChip}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {phone.appContext.tag && <div className={styles.appCtxTag}>{phone.appContext.tag}</div>}
          </div>
        )}
        <div className={styles.appBody} ref={msgsRef}>
          <div className={styles.appCap}>{phone.appCaption ?? '외근 중 · Cowork+ 앱'}</div>
          {visibleItems.map((item) => (
            <KakaoLine key={item.id} item={item} phone={phone} actors={actors} />
          ))}
          {typing && <TypingDots />}
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
        {visibleItems.map((item) => (
          <KakaoLine key={item.id} item={item} phone={phone} actors={actors} />
        ))}
        {typing && <TypingDots />}
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
  phone: basePhone,
  actors,
  dimAll,
  action,
  onAction,
  tabSlot,
  hidden,
  typing,
  focus,
}: {
  phone: MfgPhoneDef;
  actors: MfgActor[];
  dimAll: boolean;
  hidden: Set<string>;
  typing: boolean;
  /** 박자 진행 중 강조 — 지정되면 정적 highlight 대신 쓴다 */
  focus?: boolean;
  /** 같은 줄의 다른 폰에 탭이 있으면 빈 탭 자리를 둬 폰 높이·위치를 맞춘다 */
  tabSlot?: boolean;
  /** 이 폰에 걸린 미실행 액션 (버튼 또는 탭) */
  action?: MfgArenaAction;
  onAction?: () => void;
}) {
  // 탭 선택은 그 폰 정의에 묶어 둔다 — 정의가 바뀐 첫 렌더부터 activeTab 으로 돌아간다
  const [picked, setPicked] = useState<{ base: MfgPhoneDef; id: string } | null>(null);
  const tabSel = picked?.base === basePhone ? picked.id : basePhone.activeTab;
  const tab = basePhone.tabs?.find((t) => t.id === tabSel);
  const phone: MfgPhoneDef = tab ? { ...basePhone, ...tab.phone } : basePhone;
  const pickTab = (id: string) => {
    setPicked({ base: basePhone, id });
    if (action?.tabId === id) onAction?.();
  };
  const dimmed = dimAll || phone.dimmed;
  const lastTimed = [...(phone.items ?? [])].reverse().find((it) => it.time);
  const statusTime = phone.statusTime ?? lastTimed?.time ?? '09:00';
  // Cowork App 화면은 헤더 배지가 앱 정체성을 이미 표시하므로 하단 리본을 겹쳐 그리지 않는다.
  const isProductApp = phone.screen === 'cowork-app';
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
          <div className={styles.pOwnerRow}>
            <span className={cn(styles.pBadge, styles[phone.badge])}>
              {phone.badgeLabel ?? BADGE_LABEL[phone.badge]}
            </span>
            <span className={styles.pOwnerN}>{phone.ownerLabel}</span>
          </div>
          <div className={styles.pOwnerT}>{phone.ownerSub}</div>
        </div>
      </div>
      {!basePhone.tabs?.length && tabSlot && (
        <div className={cn(styles.pTabs, styles.pTabsGhost)} aria-hidden>
          <span className={styles.pTab}>&nbsp;</span>
        </div>
      )}
      {basePhone.tabs && basePhone.tabs.length > 0 && (
        <div className={styles.pTabs}>
          {basePhone.tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={cn(
                styles.pTab,
                t.id === tabSel && styles.on,
                action?.tabId === t.id && t.id !== tabSel && styles.pTabCue,
              )}
              onClick={() => pickTab(t.id)}
            >
              {t.label}
              {t.dot && t.id !== tabSel && <span className={styles.pTabDot} />}
            </button>
          ))}
        </div>
      )}
      <div
        className={cn(styles.phone, (focus ?? phone.highlight) && styles.highlight, dimmed && styles.dimmed)}
      >
        <div className={styles.notch} />
        <div className={styles.statusbar}>
          <span>{statusTime}</span>
          <span>●●● 📶 🔋</span>
        </div>
        <PhoneScreenBody phone={phone} actors={actors} hidden={hidden} typing={typing} sigId={basePhone.id} />
        {phone.companyFrame && !isProductApp && phone.companyRibbonLabel !== '' && (
          <div className={styles.companyRibbon}>{phone.companyRibbonLabel ?? '회사 담당자'}</div>
        )}
      </div>
      {action && !action.tabId && (
        <button type="button" className={cn(styles.actBtn, styles.phoneAct)} onClick={onAction}>
          👆 {action.label}
        </button>
      )}
    </div>
  );
}

function LegacyPc({ pc }: { pc: MfgLegacyPcDef }) {
  return (
    <div className={cn(styles.legacy, pc.hi && styles.legacyHi)}>
      <div className={styles.lgBar}>
        <span className={styles.lgDots}>● ● ●</span>
        <span className={styles.lgTitle}>{pc.windowTitle}</span>
      </div>
      <div className={styles.lgBody}>
        <div className={styles.lgSecT}>{pc.logTitle ?? '공지 발송 기록'}</div>
        <div className={styles.lgLog}>
          {pc.log.map((l) => (
            <div key={l.text} className={cn(styles.lgLogRow, l.tone && styles[`lg_${l.tone}`], l.hi && styles.lgHiRow)}>
              <span>{l.text}</span>
              {l.meta && <em>{l.meta}</em>}
            </div>
          ))}
        </div>
        <div className={styles.lgSecT}>📊 {pc.sheetTitle ?? '주간 보고'}</div>
        <table className={styles.lgSheet}>
          <thead>
            <tr>
              <th className={styles.lgRowNo} />
              {pc.cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pc.rows.map((row, i) => (
              <tr key={row.cells.join('|')} className={cn(row.hi && styles.lgHiRow)}>
                <td className={styles.lgRowNo}>{i + 2}</td>
                {row.cells.map((c, j) => (
                  <td key={`${j}-${c}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
                {msg.card.choices?.map((c) => (
                  <div key={c.k} className={styles.wsChoiceRow}>
                    <span>{c.k}</span>
                    <div className={styles.wsChoiceOpts}>
                      {c.opts.map((o) => (
                        <span key={o} className={cn(styles.wsChoice, o === c.pick && styles.on)}>
                          {o === c.pick ? '✓ ' : ''}
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
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

function WsBoard({ board }: { board: MfgWsBoard }) {
  return (
    <div className={styles.wsBoard}>
      <div className={styles.wsBoardMetrics}>
        {board.metrics.map((m, i) => (
          <div key={`${i}-${m.label}`} className={cn(styles.wsBm, m.isNew && styles.isNew)}>
            <div className={styles.wsBmHd}>
              <span>{m.label}</span>
              <b>{m.value}</b>
            </div>
            <div className={styles.wsBmTrack}>
              <div className={cn(styles.wsBmFill, styles[`tone_${m.tone ?? 'navy'}`])} style={{ width: `${m.pct}%` }} />
            </div>
            {m.sub && <div className={styles.wsBmSub}>{m.sub}</div>}
          </div>
        ))}
      </div>
      {board.list && board.list.length > 0 && (
        <div className={styles.wsBoardList}>
          {board.listTitle && <div className={styles.wsBlT}>{board.listTitle}</div>}
          <div className={styles.wsBlItems}>
            {board.list.map((it, i) => (
              <span key={`${i}-${it.name}`} className={cn(styles.wsBlItem, styles[`chip_${it.tone ?? 'muted'}`])}>
                {it.name} <em>{it.state}</em>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MfgArena({ state: baseState, actions, autoplay, overlay, onBusyChange, caption }: Props) {
  const wsMsgsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wsMsgsRef.current;
    // 새 줄이 붙으면 목록이 부드럽게 위로 밀린다
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  });

  // STATE 안 액션 사슬 — 버튼을 누를 때마다 다음 화면(after)이 덮인다. after 안에 다음 버튼이 있으면 이어진다
  const phases = useMemo(() => {
    const list: MfgArenaState[] = [baseState];
    let cur = baseState;
    while (cur.action && cur.after) {
      const { action: _done, after: nextPatch, ...rest } = cur;
      const next = { ...rest, ...nextPatch } as MfgArenaState;
      list.push(next);
      cur = next;
    }
    return list;
  }, [baseState]);
  // 몇 단계까지 눌렀는지 — 그 state 객체에 묶어, state가 바뀐 첫 렌더부터 0으로 그린다
  const [actedFor, setActedFor] = useState<{ base: MfgArenaState; n: number } | null>(null);
  const step = actedFor?.base === baseState ? actedFor.n : 0;
  const acted = step > 0;
  const state = phases[step];
  const pending = state.action;
  const fire = () => setActedFor({ base: baseState, n: Math.min(step + 1, phases.length - 1) });

  // 버블 순차 등장 — 새 줄(isNew)을 한 박자씩 내보낸다. 앞 단계에서 이미 나온 줄은 건너뛴다
  // 팝업 항목도 한 박자씩 (팝업이 이 단계에서 처음 뜰 때)
  const phaseKey: object = state;
  const beats = useMemo(() => {
    const seen = new Set<string>();
    let cur: Beat[] = [];
    for (let i = 0; i <= step; i += 1) {
      cur = buildBeats(phases[i], seen);
      cur.forEach((b) => seen.add(b.sig));
    }
    const popup = phases[step].painPopup;
    if (popup && !(step > 0 && phases[step - 1].painPopup)) {
      popup.items.forEach((it, i) => cur.push({ sig: `pop|${i}`, typingPhones: [], places: [], label: it.heading }));
    }
    return cur;
  }, [phases, step]);
  const [rev, setRev] = useState<{ key: object; n: number } | null>(null);
  const shown = rev?.key === phaseKey ? rev.n : 0;
  const revealing = shown < beats.length;
  const revealNext = () => setRev({ key: phaseKey, n: Math.min(shown + 1, beats.length) });
  const hidden = useMemo(() => new Set(beats.slice(shown).map((b) => b.sig)), [beats, shown]);
  const typingPhones = revealing ? beats[shown].typingPhones : [];
  // 강조는 방금 나온 버블(또는 지금 입력 중인 곳)을 따라간다. 박자가 없는 STATE는 데이터의 highlight 그대로
  const focusPlaces =
    beats.length === 0
      ? undefined
      : typingPhones.length > 0
        ? typingPhones
        : shown > 0
          ? beats[shown - 1].places
          : [];

  // 자동재생일 때만 다음 박자를 스스로 낸다 — 수동 진행은 → 키로 한 버블씩
  // 상대 메시지는 "입력 중…" 을 보여 줄 만큼 조금 더 기다린다
  useEffect(() => {
    if (!revealing || overlay || !autoplay) return undefined;
    const delay = shown === 0 ? 500 : typingPhones.length > 0 ? 1300 : 850;
    const t = window.setTimeout(revealNext, delay);
    return () => window.clearTimeout(t);
  }, [revealing, overlay, autoplay, shown, phaseKey]);

  // → 키: 남은 버블이 있으면 다음 버블, 다 나왔으면 액션, 그다음은 러너가 다음 STATE로 (오버레이가 떠 있으면 양보)
  useEffect(() => {
    if (overlay || (!revealing && !pending)) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowRight') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (revealing) revealNext();
      else fire();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [overlay, revealing, pending, baseState, shown, phaseKey, step]);

  // 자동재생: 버블이 다 나온 뒤 잠시 보여 주고 액션을 스스로 실행
  useEffect(() => {
    if (!pending || !autoplay || revealing) return undefined;
    const t = window.setTimeout(fire, 1800);
    return () => window.clearTimeout(t);
  }, [pending, autoplay, revealing, baseState, step]);

  // 버튼은 버블이 다 나온 뒤에 보인다 — 순서가 뒤섞여 보이지 않게
  const shownAction = revealing ? undefined : pending;

  // 러너에 진행 중 여부를 알려 자동재생이 버블·액션을 기다리게 한다
  const busy = revealing || !!pending;
  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);
  useEffect(() => () => onBusyChange?.(false), [onBusyChange]);
  const doneLabel = acted ? phases[step - 1].action?.doneLabel : undefined;

  const ws = state.workspace;
  // 팝업은 첫 항목이 나올 때 뜬다
  const popupItems = state.painPopup?.items.filter((_, i) => !hidden.has(`pop|${i}`)) ?? [];
  const painActive = popupItems.length > 0;
  const afterTexts = caption?.after === undefined ? [] : Array.isArray(caption.after) ? caption.after : [caption.after];
  const captionText =
    step > 0 && afterTexts.length > 0 ? afterTexts[Math.min(step - 1, afterTexts.length - 1)] : caption?.before ?? '';

  // 지금 할 일 — 버블이 남았으면 다음 메시지, 누를 버튼이 있으면 그 위치와 이름, 끝났으면 다음 단계
  let hint = '→ 다음 단계';
  if (revealing) hint = `→ 다음 메시지 (${beats.length - shown})`;
  else if (pending) {
    const target = state.phones.find((p) => p.id === pending.phoneId);
    const tabLabel = target?.tabs?.find((t) => t.id === pending.tabId)?.label;
    const where =
      pending.at === 'workspace'
        ? ws?.legacy
          ? '관리자 PC'
          : '관리자 콘솔'
        : target?.screen === 'cowork-app'
          ? '담당자 앱'
          : target?.companyFrame
            ? '담당자 폰'
            : '점주 폰';
    hint = tabLabel ? `👆 ${where}의 [${tabLabel}] 탭` : `👆 ${where}의 [${pending.label}]`;
  }

  return (
    <div>
      {caption && (
        <StepCaption
          title={caption.title ?? ''}
          text={captionText}
          when={caption.when}
          jump={caption.jump}
          hint={hint}
          cue={!!pending && !revealing}
        />
      )}
      {/* 배너는 결말을 요약하므로 버블이 다 나온 뒤에 띄운다 */}
      {state.banner && !revealing && <div className={styles.banner}>{state.banner}</div>}
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
              <Phone
                key={phone.id}
                phone={phone}
                actors={state.actors}
                dimAll={painActive}
                action={shownAction?.at === 'phone' && shownAction.phoneId === phone.id ? shownAction : undefined}
                onAction={fire}
                tabSlot={state.phones.some((p) => (p.tabs?.length ?? 0) > 0)}
                hidden={hidden}
                typing={typingPhones.includes(phone.id)}
                focus={focusPlaces ? focusPlaces.includes(phone.id) : undefined}
              />
            ))}
            {state.painPopup && painActive && (
              <div className={styles.painPop}>
                <div className={styles.painPopHd}>{state.painPopup.title}</div>
                <div className={styles.painPopBd}>
                  {popupItems.map((it, i) => (
                    <div key={it.heading} className={cn(styles.painItem, styles.painItemIn)}>
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
            {ws.hideRoleTabs && ws.label && (
              <div className={styles.colLabel}>
                {ws.label}
                {doneLabel && <span className={styles.doneChip}>{doneLabel}</span>}
                {ws.legacy && shownAction?.at === 'workspace' && (
                  <button type="button" className={cn(styles.actBtn, styles.labelAct)} onClick={fire}>
                    👆 {shownAction.label}
                  </button>
                )}
              </div>
            )}
            {ws.legacy && <LegacyPc pc={ws.legacy} />}
            {!ws.legacy && !ws.hideRoleTabs && (
              <div className={styles.wsRole}>
                <button type="button" className={cn(styles.wsRb, ws.role !== 'admin' && styles.on)}>
                  {ws.roleTabs?.[0] ?? '🖥 영업지원 담당자'}
                </button>
                <button type="button" className={cn(styles.wsRb, ws.role === 'admin' && styles.on)}>
                  {ws.roleTabs?.[1] ?? '👔 이윤 관리자'}
                </button>
                <span className={styles.wsRoleTag}>
                  {ws.role === 'admin' ? '관리자 뷰 · 대시보드 권한' : '담당자 뷰'}
                </span>
              </div>
            )}
            {!ws.legacy && (
              <div className={cn(styles.workspace, focusPlaces?.includes('ws') && styles.wsFocus)}>
                <div className={styles.wsSide}>
                  <div className={styles.wsShdr}>
                    <div className={styles.wsLogo}>Cowork+</div>
                    <div className={styles.wsOnline}>● 근무중</div>
                  </div>
                  <div className={styles.wsSecT}>운영현황</div>
                  <div className={styles.wsDashMenu}>
                    <div className={styles.wsDashIco}>📊</div>
                    <div>
                      <div className={styles.wsDashL}>{ws.dashLabel ?? '채널 대시보드'}</div>
                      <div className={styles.wsDashS}>{ws.dashSubLabel ?? '거래처별 · 담당자별'}</div>
                    </div>
                  </div>
                  <div className={styles.wsSecT}>
                    {ws.roomsLabel ?? '대화방'} {ws.roomCount ?? ''}
                  </div>
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
                    {shownAction?.at === 'workspace' ? (
                      <button type="button" className={styles.actBtn} onClick={fire}>
                        👆 {shownAction.label}
                      </button>
                    ) : (
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>🔍 ⋯</div>
                    )}
                  </div>
                  {ws.board && <WsBoard board={ws.board} />}
                  <div className={styles.wsMsgs} ref={wsMsgsRef}>
                    {ws.messages.filter((msg) => !hidden.has(wsSig(msg))).map((msg) => (
                      <WsMessageRow key={msg.id} msg={msg} actors={state.actors} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {actions}
    </div>
  );
}
