import { type ReactNode, useState } from 'react';
import type { ChapterStateNode, RcChannel, RcTimelineEntry } from '@/cases/_types';
import styles from './StageRentacarTimeline.module.css';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

// ─── Channel helpers ───────────────────────────────────────────────────────────
function chIcon(channel: RcChannel) {
  if (channel === 'phone') return '📞';
  if (channel === 'kakao') return '💬';
  return '✉️';
}
function chLabel(channel: RcChannel) {
  if (channel === 'phone') return '전화';
  if (channel === 'kakao') return '카카오';
  return '문자';
}
function chClass(channel: RcChannel): string {
  if (channel === 'phone') return styles.chPhone;
  if (channel === 'kakao') return styles.chKakao;
  return styles.chSms;
}
function chBadgeClass(channel: RcChannel): string {
  if (channel === 'phone') return styles.badgePhone;
  if (channel === 'kakao') return styles.badgeKakao;
  return styles.badgeSms;
}

// ─── Phone: Before ────────────────────────────────────────────────────────────
function PhoneBefore({
  customerName,
  silos,
  beforeNote,
}: {
  customerName: string;
  silos?: Array<{ channel: RcChannel; title: string; body: string[]; dark?: boolean }>;
  beforeNote?: string;
}) {
  const apps = silos ?? [
    { channel: 'kakao' as RcChannel, title: '카카오톡', body: [], dark: false },
    { channel: 'phone' as RcChannel, title: '전화', body: [], dark: false },
    { channel: 'sms' as RcChannel, title: '문자', body: [], dark: false },
  ];

  return (
    <div className={styles.phoneOuter}>
      <div className={styles.phoneFrame}>
        <div className={styles.phoneStatus}>
          <span>KT 10:14</span>
          <span className={styles.phoneStatusRight}>LTE ▶ 74</span>
        </div>
        <div className={styles.befScreen}>
          <div className={styles.appRowLabel}>{customerName} 관련 앱</div>
          <div className={styles.appGrid}>
            {apps.map((app) => (
              <div key={app.channel} className={styles.appIcon}>
                <div className={`${styles.appImg} ${chClass(app.channel)}`}>
                  <span className={styles.appEmoji}>{chIcon(app.channel)}</span>
                  <span className={styles.appBadge}>
                    {app.channel === 'phone' ? 5 : app.channel === 'kakao' ? 3 : 2}
                  </span>
                </div>
                <span className={styles.appLabel}>{app.title}</span>
              </div>
            ))}
          </div>
          <div className={styles.lastMsgCard}>
            <div className={styles.lmHead}>
              <div className={`${styles.lmIcon} ${styles.chKakao}`}>💬</div>
              <span className={styles.lmApp}>카카오톡</span>
              <span className={styles.lmTime}>05.08</span>
            </div>
            <div className={styles.lmName}>{customerName}</div>
            <div className={styles.lmText}>
              {apps.find((a) => a.channel === 'kakao')?.body?.[0] ??
                '"그럼 월 49만원이네요. 생각해볼게요"'}
            </div>
          </div>
          <div className={styles.lastMsgCard}>
            <div className={styles.lmHead}>
              <div className={`${styles.lmIcon} ${styles.chPhone}`}>📞</div>
              <span className={styles.lmApp}>전화</span>
              <span className={styles.lmTime}>05.12</span>
            </div>
            <div className={styles.lmName}>{customerName} — 14분 22초</div>
            <div className={`${styles.lmText} ${styles.lmTextMuted}`}>통화 내용 없음</div>
          </div>
          <div className={styles.lastMsgCard}>
            <div className={styles.lmHead}>
              <div className={`${styles.lmIcon} ${styles.chSms}`}>✉️</div>
              <span className={styles.lmApp}>문자</span>
              <span className={styles.lmTime}>05.05</span>
            </div>
            <div className={styles.lmName}>{customerName}</div>
            <div className={styles.lmText}>
              {apps.find((a) => a.channel === 'sms')?.body?.[0] ??
                '"5월 22일 오전에 방문 가능합니다"'}
            </div>
          </div>
          <div className={styles.befTag}>
            세 앱을 따로 열어야
            <br />
            전체 맥락을 알 수 있습니다
          </div>
        </div>
        <div className={styles.phoneHome}>
          <div className={styles.homeBtn}>⬚</div>
          <div className={styles.homeCircle} />
          <div className={styles.homeBtn}>‹</div>
        </div>
      </div>
      {beforeNote && <div className={styles.noteBox}>{beforeNote}</div>}
    </div>
  );
}

// ─── Phone: After ─────────────────────────────────────────────────────────────
function PhoneAfter({
  customerName,
  customerPhone,
  stats,
  entries,
}: {
  customerName: string;
  customerPhone: string;
  stats?: Array<{ value: string; label: string; good?: boolean }>;
  entries?: RcTimelineEntry[];
}) {
  const nameCh = customerName.charAt(0);
  const phoneCount = entries?.filter((e) => e.channel === 'phone').length ?? 3;
  const kakaoCount = entries?.filter((e) => e.channel === 'kakao').length ?? 3;
  const smsCount = entries?.filter((e) => e.channel === 'sms').length ?? 2;

  return (
    <div className={styles.phoneOuter}>
      <div className={styles.phoneFrame}>
        <div className={styles.phoneStatus}>
          <span>KT 10:14</span>
          <span className={styles.phoneStatusRight}>LTE ▶ 74</span>
        </div>
        <div className={styles.aftScreen}>
          <div className={styles.appHeaderBar}>
            <span className={styles.appBack}>‹</span>
            <span className={styles.appLogoText}>Cowork+</span>
          </div>
          <div className={styles.profileMini}>
            <div className={styles.pmAvatar}>{nameCh}</div>
            <div className={styles.pmName}>{customerName}</div>
            <div className={styles.pmPhone}>{customerPhone}</div>
            <div className={styles.pmStats}>
              {(stats ?? [
                { value: '8', label: '총 접촉' },
                { value: '62일', label: '상담 기간' },
                { value: '높음', label: '계약 가능성', good: true },
              ]).map((s) => (
                <div key={s.label} className={styles.pmStat}>
                  <div className={`${styles.pmVal} ${s.good ? styles.pmValGood : ''}`}>
                    {s.value}
                  </div>
                  <div className={styles.pmLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.chChipsPhone}>
            <span className={`${styles.ccp} ${styles.ccpPhone}`}>📞 전화 {phoneCount}회</span>
            <span className={`${styles.ccp} ${styles.ccpKakao}`}>💬 카카오 {kakaoCount}회</span>
            <span className={`${styles.ccp} ${styles.ccpSms}`}>✉️ 문자 {smsCount}회</span>
          </div>
          <div className={styles.miniTl}>
            {(entries ?? []).slice(0, 7).map((e, i) => (
              <div key={i} className={styles.mtlItem}>
                <div className={`${styles.mtlDot} ${chClass(e.channel)}`} />
                <div className={styles.mtlText}>
                  {chLabel(e.channel)} — {e.title}
                </div>
                <div className={styles.mtlDate}>{e.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.phoneHome}>
          <div className={styles.homeBtn}>⬚</div>
          <div className={styles.homeCircle} />
          <div className={styles.homeBtn}>‹</div>
        </div>
      </div>
      <div className={styles.noteBox}>
        좌측: Cowork+ 모바일 앱
        <br />
        우측 데스크톱과 동일한 타임라인을 모바일에서도 확인
      </div>
    </div>
  );
}

// ─── Workspace: Before ────────────────────────────────────────────────────────
function WorkspaceBefore({
  customerName,
  silos,
  beforeNote,
}: {
  customerName: string;
  silos?: Array<{ channel: RcChannel; title: string; body: string[]; dark?: boolean }>;
  beforeNote?: string;
}) {
  const defaultSilos: Array<{ channel: RcChannel; title: string; body: string[]; dark?: boolean }> =
    [
      {
        channel: 'kakao',
        title: '개인 카카오톡',
        body: [
          '05.08 "그랜저 옵션 네비 넣으면 얼마예요?" → 월 2만원 추가',
          '03.15 첫 상담: G80도 보실 의향 있으세요?',
        ],
        dark: false,
      },
      {
        channel: 'phone',
        title: '개인 전화 기록',
        body: [
          '05.12 통화 14분 22초 — 내용 없음',
          '04.28 통화 7분 08초 — 내용 없음',
          '03.20 통화 3분 51초 — 내용 없음',
        ],
        dark: true,
      },
      {
        channel: 'sms',
        title: '개인 문자',
        body: [
          '05.05 "5월 22일 오전에 방문 가능합니다"',
          '04.10 "보험 기본 포함인가요?"',
        ],
        dark: false,
      },
    ];

  const list = silos ?? defaultSilos;

  return (
    <div className={styles.wsWrap}>
      <div className={styles.wsHeader}>
        <div className={styles.wsTitle}>
          <span className={styles.wsTitleIcon} style={{ color: '#4A4A4A' }}>⬚</span>
          채널별 분산 상태
        </div>
        <div className={styles.wsSub}>{customerName} 고객 정보가 세 곳에 나뉘어 있습니다</div>
      </div>
      <div className={styles.siloGrid}>
        {list.map((silo) => (
          <div key={silo.channel} className={styles.silo}>
            <div className={`${styles.siloHead} ${chClass(silo.channel)}`}>
              {chIcon(silo.channel)} {silo.title}
            </div>
            <div className={`${styles.siloBody} ${silo.dark ? styles.siloBodyDark : ''}`}>
              {silo.body.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.noLink}>
        세 채널 사이에 연결고리가 없습니다. 전체 맥락을 파악하려면 세 앱을 모두 열어야 합니다.
        {beforeNote && (
          <div className={styles.beforeNoteInline}>{beforeNote}</div>
        )}
      </div>
    </div>
  );
}

// ─── Timeline Entry ───────────────────────────────────────────────────────────
function TimelineItem({
  entry,
  isLast,
}: {
  entry: RcTimelineEntry;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`${styles.tlItem} ${open ? styles.tlItemExp : ''}`}
      onClick={() => setOpen((v) => !v)}
    >
      {!isLast && <div className={styles.vline} />}
      <div className={`${styles.chIconWs} ${chClass(entry.channel)}`}>
        {chIcon(entry.channel)}
      </div>
      <div className={styles.tlBody}>
        <div className={styles.tlTop}>
          <span className={`${styles.cbadge} ${chBadgeClass(entry.channel)}`}>
            {chLabel(entry.channel)}
          </span>
          <span className={styles.tlTitle}>{entry.title}</span>
        </div>
        <div className={styles.tlPrev}>{entry.preview}</div>
        {open && entry.detailLines && entry.detailLines.length > 0 && (
          <div className={styles.expandInner}>
            {entry.detailLines.map((dl, i) => {
              if (dl.side === 'stt') {
                return (
                  <div key={i}>
                    <div className={styles.sttLabel}>🎤 STT 변환 내용</div>
                    <div className={styles.sttText}>{dl.text}</div>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={`${styles.cbbl} ${dl.side === 'out' ? styles.cbblOut : styles.cbblIn}`}
                >
                  {dl.text}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={styles.tlRight}>
        <div className={styles.tlDate}>{entry.date}</div>
        <span className={`${styles.chev} ${open ? styles.chevOpen : ''}`}>›</span>
      </div>
    </div>
  );
}

// ─── Workspace: After ────────────────────────────────────────────────────────
function WorkspaceAfter({
  customerName,
  customerPhone,
  customerMeta,
  stats,
  entries,
}: {
  customerName: string;
  customerPhone: string;
  customerMeta?: string;
  stats?: Array<{ value: string; label: string; good?: boolean }>;
  entries?: RcTimelineEntry[];
}) {
  const [filter, setFilter] = useState<'all' | RcChannel>('all');
  const nameCh = customerName.charAt(0);

  const defaultStats = [
    { value: '8', label: '총 접촉 횟수' },
    { value: '62일', label: '상담 기간' },
    { value: '높음', label: '계약 가능성', good: true },
  ];
  const displayStats = stats ?? defaultStats;

  const filtered = (entries ?? []).filter(
    (e) => filter === 'all' || e.channel === filter
  );

  const filterButtons: Array<{ key: 'all' | RcChannel; label: string; cls: string; onCls: string }> =
    [
      { key: 'all', label: '전체', cls: styles.fchipAll, onCls: styles.fchipAllOn },
      { key: 'phone', label: '📞 전화', cls: styles.fchipPhone, onCls: styles.fchipPhoneOn },
      { key: 'kakao', label: '💬 카카오', cls: styles.fchipKakao, onCls: styles.fchipKakaoOn },
      { key: 'sms', label: '✉️ 문자', cls: styles.fchipSms, onCls: styles.fchipSmsOn },
    ];

  return (
    <div className={styles.wsWrap}>
      <div className={styles.wsHeader}>
        <div className={styles.wsTitle}>
          <span className={styles.wsTitleIcon} style={{ color: '#1B3A6B' }}>⏱</span>
          Cowork+ — 통합 타임라인
        </div>
        <div className={styles.wsSub}>
          전화·카카오·문자 전 채널이 하나의 흐름으로. 항목을 클릭하면 내용이 펼쳐집니다.
        </div>
      </div>
      <div className={styles.profileWs}>
        <div className={styles.pwTop}>
          <div className={styles.pwAvatar}>{nameCh}</div>
          <div className={styles.pwInfo}>
            <div className={styles.pwName}>{customerName}</div>
            <div className={styles.pwMeta}>
              {customerPhone}
              {customerMeta && <> &nbsp;·&nbsp; {customerMeta}</>}
            </div>
          </div>
        </div>
        <div className={styles.statsRow}>
          {displayStats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <div className={`${styles.statVal} ${s.good ? styles.statValGood : ''}`}>
                {s.value}
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.filterRow}>
          <span className={styles.fl}>채널</span>
          {filterButtons.map((fb) => (
            <button
              key={fb.key}
              className={`${styles.fchip} ${fb.cls} ${filter === fb.key ? fb.onCls : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setFilter(fb.key);
              }}
            >
              {fb.label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.tlBox}>
        {filtered.length === 0 && (
          <div className={styles.tlEmpty}>해당 채널의 기록이 없습니다.</div>
        )}
        {filtered.map((entry, i) => (
          <TimelineItem key={i} entry={entry} isLast={i === filtered.length - 1} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function StageRentacarTimeline({ state, actions }: Props) {
  const d = state.rentacarTimeline;

  if (!d) {
    return (
      <div className={styles.fallback}>
        <p>rentacarTimeline 데이터가 없습니다.</p>
        {actions && <div className={styles.controlActions}>{actions}</div>}
      </div>
    );
  }

  const mode = d.mode;
  const descBorderColor = mode === 'before' ? '#4A4A4A' : '#1B3A6B';
  const descText =
    d.desc ??
    (mode === 'before'
      ? `${d.customerName} 고객의 2년치 대화가 카카오·전화·문자 세 곳에 흩어져 있습니다. 어느 앱에도 전체 맥락이 없습니다.`
      : `Cowork+ 도입 후 — 모바일 앱과 데스크톱 워크스페이스 모두 동일한 통합 타임라인. 항목을 클릭하면 내용이 펼쳐집니다.`);

  return (
    <div className={styles.root}>
      {/* Desc box */}
      <div className={styles.descBox} style={{ borderLeftColor: descBorderColor }}>
        {descText}
      </div>

      {/* Split */}
      <div className={styles.split}>
        {/* Left: Phone */}
        <div>
          {mode === 'before' ? (
            <PhoneBefore
              customerName={d.customerName}
              silos={d.silos}
              beforeNote={d.beforeNote}
            />
          ) : (
            <PhoneAfter
              customerName={d.customerName}
              customerPhone={d.customerPhone}
              stats={d.stats}
              entries={d.entries}
            />
          )}
        </div>

        {/* Right: Workspace */}
        <div>
          {mode === 'before' ? (
            <WorkspaceBefore
              customerName={d.customerName}
              silos={d.silos}
              beforeNote={d.beforeNote}
            />
          ) : (
            <WorkspaceAfter
              customerName={d.customerName}
              customerPhone={d.customerPhone}
              customerMeta={d.customerMeta}
              stats={d.stats}
              entries={d.entries}
            />
          )}
        </div>
      </div>

      {actions && <div className={styles.controlActions}>{actions}</div>}
    </div>
  );
}
