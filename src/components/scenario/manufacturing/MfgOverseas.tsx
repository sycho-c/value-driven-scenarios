import { type ReactNode, useEffect, useRef, useState } from 'react';
import type {
  MfgOverseasState,
  MfgOvsChannelDef,
  MfgOvsWsMessage,
} from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './MfgOverseas.module.css';

interface Props {
  state: MfgOverseasState;
  actions?: ReactNode;
}

const THEME = {
  wa: { hdrBg: '#075E54', bodyBg: '#ECE5DD', bubble: '#DCF8C6', avBg: '#075E54' },
  wc: { hdrBg: '#2C2C2C', bodyBg: '#EDEDED', bubble: '#95EC69', avBg: '#2C2C2C' },
} as const;

function OvsPhone({ channel, active }: { channel: MfgOvsChannelDef; active: boolean }) {
  const theme = THEME[channel.theme];
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  const isAuth = channel.phoneScreen === 'auth';

  return (
    <div className={styles.phoneSlot}>
      <div className={styles.phoneLabel}>
        {channel.partnerLabel}
        <span className={cn(styles.phoneTag, channel.theme === 'wa' ? styles.tagWa : styles.tagWc)}>
          {channel.messengerTag}
        </span>
        <div className={styles.phoneSub}>Cowork+ 상담톡</div>
      </div>
      <div className={cn(styles.phone, active && styles.highlight)}>
        <div className={styles.notch} />
        <div
          className={styles.phoneScreen}
          style={{ background: isAuth ? '#F4F7FB' : theme.bodyBg }}
        >
          <div
            className={styles.phHdr}
            style={{ background: isAuth ? '#0F62A8' : theme.hdrBg, color: '#fff' }}
          >
            <span>‹</span>
            <span className={styles.grow}>
              {isAuth ? '담당자 폰 · Authenticator' : channel.phoneHeader}
            </span>
            <span style={{ fontSize: 9 }}>
              {isAuth
                ? '🔐'
                : (channel.phoneTagLabel ?? (channel.messengerTag === 'WhatsApp' ? 'WA' : '微信'))}
            </span>
          </div>
          <div className={styles.phBody} ref={bodyRef}>
            {isAuth && channel.auth ? (
              <div className={styles.authPush}>
                <div className={styles.authT}>🔐 {channel.auth.title}</div>
                <div className={styles.authApp}>{channel.auth.app}</div>
                <div className={styles.authNum}>{channel.auth.num}</div>
                <div className={styles.authD}>{channel.auth.hint}</div>
                <div className={styles.authBtns}>
                  <button type="button" className={styles.authNo}>
                    {channel.auth.no}
                  </button>
                  <button type="button" className={styles.authYes}>
                    {channel.auth.yes}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.dateCap}>
                  {channel.dateCaption ?? (channel.theme === 'wc' ? '今天' : 'Today')}
                </div>
                {(channel.phoneItems ?? []).map((item) => (
                  <div
                    key={item.id}
                    className={cn(styles.msg, item.side === 'me' && styles.me, item.isNew && styles.isNew)}
                  >
                    {item.side === 'partner' && (
                      <div className={styles.msgAv} style={{ background: theme.avBg }}>
                        {channel.partnerInitial ?? (channel.theme === 'wc' ? '华' : 'U')}
                      </div>
                    )}
                    <div className={styles.msgCol}>
                      {item.side === 'partner' && (
                        <div className={styles.msgWho}>{channel.tabLabel}</div>
                      )}
                      {item.file ? (
                        <div className={styles.msgFile} style={{ background: theme.bubble }}>
                          <span>{item.file.icon}</span>
                          <span>{item.file.name}</span>
                        </div>
                      ) : (
                        <div
                          className={styles.msgBbl}
                          style={item.side === 'me' ? { background: theme.bubble } : undefined}
                        >
                          {item.text}
                        </div>
                      )}
                      {item.time && <div className={styles.msgTime}>{item.time}</div>}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {!isAuth && (
            <div className={styles.phFoot}>
              <div className={styles.phFootIn}>
                {channel.inputPlaceholder ?? (channel.theme === 'wc' ? '输入消息…' : 'Type a message…')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WsChatMessage({ msg }: { msg: MfgOvsWsMessage }) {
  const out = msg.side === 'out';
  return (
    <div className={cn(styles.wsMsg, out && styles.me, msg.isNew && styles.isNew)}>
      <div className={styles.wsAv} style={{ background: out ? '#5B3FE4' : '#0F62A8' }}>
        {out ? '나' : '外'}
      </div>
      <div className={styles.wsMc}>
        {msg.srcLabel && (
          <div className={styles.wsWho}>
            <span className={styles.wsWhoSrc}>{msg.srcLabel}</span>
          </div>
        )}
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
          {msg.file && (
            <div className={styles.wsFile}>
              <div className={styles.wsFileIc}>{msg.file.icon}</div>
              <div>
                <div className={styles.wsFileN}>{msg.file.name}</div>
                <div className={styles.wsFileS}>{msg.file.sub}</div>
              </div>
              <div className={styles.wsFileDl}>↓</div>
            </div>
          )}
          {msg.transNote && <div className={styles.transTag}>🌐 {msg.transNote}</div>}
        </div>
        <div className={styles.wsMeta}>
          {[msg.time, msg.metaText].filter(Boolean).join(' · ')}
        </div>
      </div>
    </div>
  );
}

function TypedText({ text }: { text: string }) {
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
    }, 36);
    return () => window.clearInterval(iv);
  }, [text]);
  return (
    <>
      {text.slice(0, len)}
      {len < text.length && <span className={styles.caret}>|</span>}
    </>
  );
}

export function MfgOverseas({ state, actions }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  return (
    <div>
      {state.banner && <div className={styles.banner}>{state.banner}</div>}
      <div className={styles.stage}>
        <div className={styles.phoneZone}>
          <div className={styles.phoneZoneHd}>
            {state.phonesLabel ?? '📱 해외 파트너 폰 (각 메신저)'}
          </div>
          <div className={styles.phoneRow}>
            {state.channels.map((ch) => (
              <OvsPhone key={ch.id} channel={ch} active={ch.id === state.activeChannelId} />
            ))}
          </div>
        </div>

        <div className={styles.ws}>
          <div className={styles.wsHd}>
            <div>
              <div className={styles.wsHdT}>{state.headerTitle}</div>
              {state.headerSub && <div className={styles.wsHdS}>{state.headerSub}</div>}
            </div>
            <div className={styles.wsHdBadge}>{state.wsRoleBadge ?? '🖥 영업지원 담당자'}</div>
          </div>

          <div className={styles.ovsTabs}>
            {state.channels.map((ch) => (
              <div key={ch.id} className={cn(styles.ovsTab, ch.id === state.activeChannelId && styles.on)}>
                <div className={styles.ovsTabIc} style={{ background: ch.tabIconBg }}>
                  {ch.tabIcon}
                </div>
                <div>
                  <div className={styles.ovsTabN}>{ch.tabLabel}</div>
                  <div className={styles.ovsTabApp}>{ch.tabSub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.wsBody} ref={bodyRef}>
            {state.wsView === 'select' && (
              <div className={styles.wsCenterMsg} style={{ color: 'var(--muted)' }}>
                <div style={{ fontSize: 13 }}>↑ 채널을 선택하십시오</div>
                <div style={{ fontSize: 11, marginTop: 6 }}>
                  해외 채널 열람 시 M365 인증이 필요합니다
                </div>
              </div>
            )}

            {state.wsView === 'mfa-intro' && state.mfa && (
              <div className={styles.wsCenterMsg}>
                <div className={styles.mfaIco}>🔐</div>
                <div className={styles.mfaT}>M365 보안 인증 필요</div>
                <div className={styles.mfaD}>
                  <b>{state.mfa.channelName}</b> ({state.mfa.messenger}) 채널은 수출 선적·무역
                  서류가 오가는 민감 채널입니다.
                  <br />
                  담당자 본인 확인을 위해 Microsoft Authenticator 승인이 필요합니다.
                </div>
                <button type="button" className={styles.mfaBtn}>
                  인증 요청 보내기 ▶
                </button>
              </div>
            )}

            {state.wsView === 'mfa-wait' && state.mfa && (
              <div className={styles.wsCenterMsg}>
                <div className={styles.mfaIco}>📲</div>
                <div className={styles.mfaT}>Authenticator 앱 승인 대기</div>
                <div className={styles.mfaD}>
                  담당자 폰에 푸시 알림이 전송되었습니다. 아래 번호를 앱에서 선택해
                  승인하십시오.
                </div>
                <div className={styles.mfaMatch}>{state.mfa.num}</div>
                <div className={styles.mfaWait}>
                  ⏳ <b>{state.mfa.num}</b> 선택 후 승인 대기 중…
                </div>
              </div>
            )}

            {state.wsView === 'mfa-ok' && state.mfa && (
              <div className={styles.mfaOk}>
                {state.mfa.okText ??
                  `✓ M365 MFA 인증 통과 · MIP 문서보호 적용 · ${state.mfa.messenger} 채널 열람 허가`}
              </div>
            )}

            {state.wsView === 'chat' &&
              (state.wsMessages ?? []).map((msg) => <WsChatMessage key={msg.id} msg={msg} />)}
          </div>

          {state.doneNote && <div className={styles.doneNote}>{state.doneNote}</div>}

          {state.transBar && (
            <div className={styles.transBar}>
              <div className={styles.transIn}>
                {state.transBar.state === 'typing' && state.transBar.typed ? (
                  <TypedText text={state.transBar.typed} />
                ) : state.transBar.state === 'translating' ? (
                  <span className={styles.transTranslating}>🌐 AI 번역 중…</span>
                ) : (
                  <span className={styles.transPh}>
                    {state.transBar.placeholder ?? '한국어로 입력 → 번역 전송'}
                  </span>
                )}
              </div>
              <button type="button" className={styles.transSend}>
                🌐 AI 번역 응대
              </button>
            </div>
          )}
        </div>
      </div>
      {actions}
    </div>
  );
}
