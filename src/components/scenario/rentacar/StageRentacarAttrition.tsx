import { type ReactNode } from 'react';
import type { ChapterStateNode, RentacarAttritionState, RcHistItem } from '@/cases/_types';
import styles from './StageRentacarAttrition.module.css';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

const CHANNEL_ICON: Record<string, string> = {
  phone: '📞',
  kakao: '💬',
  sms: '✉️',
};

// ─── Phone Panel (정적 — 통화 종료 결과) ─────────────────────────────────────────
function PhonePanel({
  mode,
  customerName,
  customerPhone,
  bubble,
}: {
  mode: 'before' | 'after';
  customerName: string;
  customerPhone: string;
  bubble: string;
}) {
  const screenClass = [styles.callScreen, mode === 'after' ? styles.idle : styles.ended].join(' ');
  const initial = customerName.charAt(0);

  return (
    <div className={styles.phoneFrame}>
      <div className={styles.phoneStatus}>
        <span>KT 6:21</span>
        <div className={styles.phoneStatusR}>
          <span>LTE</span>
          <span className={styles.battBadge}>74</span>
        </div>
      </div>

      <div className={screenClass}>
        <div className={styles.callTimer}>
          <div className={styles.timerLeft}>
            <span className={styles.timerIcon}>📞</span>
            <span>통화 종료</span>
          </div>
          <span className={styles.timerDots}>⋮</span>
        </div>

        <div className={styles.callerArea}>
          <div className={styles.callerBadge} data-state="ended">
            인수인계 통화
          </div>
          <div className={styles.callerName}>{customerName}</div>
          <div className={styles.callerRole}>고객</div>
          <div className={styles.callerNumber}>{customerPhone}</div>
        </div>

        <div className={styles.avatar} data-state="ended">
          <span className={styles.avatarInitial}>{initial}</span>
        </div>

        <div className={styles.bubble}>{bubble}</div>

        <div className={styles.assistRow}>
          <button className={styles.assistBtn}>✦ 통화 어시스트</button>
        </div>

        <div className={styles.controlPanel}>
          <div className={styles.ctrlGrid}>
            {['🎙️', '📹', '🔵', '🔊', '🔇', '⌨️'].map((icon, i) => (
              <div key={i} className={styles.ctrlItem}>
                <div className={styles.ctrlIcon}>{icon}</div>
                <span className={styles.ctrlLabel}>
                  {['녹음', '영상통화', '블루투스', '스피커', '내 소리 차단', '키패드'][i]}
                </span>
              </div>
            ))}
          </div>
          <div className={styles.endBtn}>📵</div>
        </div>
      </div>

      <div className={styles.phoneHome}>
        <div className={styles.homeBtn}>☰</div>
        <div className={styles.homeCircle} />
        <div className={styles.homeBtn}>‹</div>
      </div>
    </div>
  );
}

// ─── Workspace Panel ──────────────────────────────────────────────────────────
function WorkspacePanel({
  mode,
  data,
}: {
  mode: 'before' | 'after';
  data: RentacarAttritionState;
}) {
  const histItems: RcHistItem[] = data.histItems ?? [];

  return (
    <div className={styles.wsPanel}>
      {/* header */}
      <div className={styles.wsHeader}>
        <div className={styles.wsTitle}>
          <span className={styles.wsTitleIcon}>👤</span>
          Cowork+ — 고객 프로필
        </div>
        <div className={styles.wsSub}>
          {data.customerName}&nbsp;·&nbsp;
          <span>
            {mode === 'before'
              ? `담당자: 없음 (${data.deactName} 퇴사)`
              : '담당자: 후임 배정 완료'}
          </span>
        </div>
      </div>

      {/* deact banner */}
      <div className={styles.deactBanner}>
        <div className={styles.deactTitle}>⚠ {data.deactName} 계정 비활성화됨</div>
        <div className={styles.deactSub}>
          담당 고객 {data.deactClients}&nbsp;·&nbsp;퇴사일: {data.deactDate}
        </div>
      </div>

      {/* profile box */}
      <div className={styles.profileBox}>
        <div className={styles.profileTop}>
          <div className={styles.profileAvatar}>{data.customerName.charAt(0)}</div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{data.customerName}</div>
            <div className={styles.profileMeta}>
              {data.customerPhone}&nbsp;·&nbsp;장기 렌터카 상담 고객
            </div>
            {/* COSS tags */}
            <div className={styles.cossRow}>
              {mode === 'after' ? (
                <>
                  <span className={styles.cossTagGood}>COSS 자동 적재 완료</span>
                  {data.cossTags.map((t) => (
                    <span key={t} className={styles.cossTagGood}>{t}</span>
                  ))}
                </>
              ) : (
                <span className={styles.cossTagDanger}>COSS 적재 없음</span>
              )}
            </div>
          </div>
        </div>

        {/* history */}
        <div className={styles.histSection}>
          <div className={styles.histLabel}>
            <span>🕐</span> 상담 이력
          </div>

          {mode === 'before' ? (
            <div className={styles.histEmpty}>
              <div className={styles.histEmptyVal}>0건</div>
              <div className={styles.histEmptyMsg}>
                개인 카카오에 있던 2년치 이력이 회사 시스템에 없습니다
              </div>
            </div>
          ) : (
            <div className={styles.histList}>
              {histItems.map((item, i) => (
                <div key={i} className={styles.histItem}>
                  <div className={[styles.histIcon, styles[`histIcon_${item.channel}`]].join(' ')}>
                    {CHANNEL_ICON[item.channel] ?? '📋'}
                  </div>
                  <div className={styles.histContent}>
                    <div className={styles.histTitle}>{item.title}</div>
                    <div className={styles.histDetail}>{item.detail}</div>
                  </div>
                  <div className={styles.histDate}>{item.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* reaction */}
      <div className={mode === 'before' ? styles.reactionBad : styles.reactionGood}>
        <strong>고객 반응</strong>
        <br />
        {data.reaction}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function StageRentacarAttrition({ state, actions }: Props) {
  const raw = state.rentacarAttrition;

  const data: RentacarAttritionState = raw ?? {
    mode: 'before',
    customerName: '박민준',
    customerPhone: '010-3847-2910',
    deactName: '최성과',
    deactClients: '230명',
    deactDate: '2026.05.20',
    histItems: [],
    cossTags: [],
    bubble: '"안녕하세요, 담당자가 바뀌어서 연락드렸습니다."',
    reaction: '"죄송한데, 이미 그랜저 조건으로 3번이나 설명드렸는데요."',
  };

  const mode = data.mode;

  const desc =
    data.desc ??
    (mode === 'before'
      ? `${data.deactName} 영업사원이 담당 고객 ${data.deactClients}을 두고 퇴사. 2년간의 모든 상담이 개인 카카오에만 존재.`
      : 'Cowork+ 도입 후 — 모든 채널 대화가 회사 서버에 자동 저장됨. 퇴사해도 이력은 그대로.');

  return (
    <div className={styles.root}>
      {/* desc box */}
      <div className={styles.descBox} data-mode={mode}>
        {desc}
      </div>

      {/* split */}
      <div className={styles.split}>
        <div>
          <PhonePanel
            mode={mode}
            customerName={data.customerName}
            customerPhone={data.customerPhone}
            bubble={data.bubble}
          />
          <div className={styles.phoneNote}>
            좌측: 후임 영업사원의 법인폰
            <br />
            {data.customerName} 고객에게 인수인계 첫 통화
          </div>
        </div>
        <WorkspacePanel mode={mode} data={data} />
      </div>

      {actions && <div className={styles.controlActions}>{actions}</div>}
    </div>
  );
}
