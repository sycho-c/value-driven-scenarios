import { useMemo } from 'react';
import type { WonTalkConsoleState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './WonTalkConsole.module.css';

interface WonTalkConsoleProps {
  state: WonTalkConsoleState;
}

interface AgItem {
  id: string;
  name: string;
  loc: string;
  cnt: number;
  br: number;
  sec: number;
  file: number;
  sla: number;
  color: string;
  trend: number[];
}

interface BrItem {
  id: string;
  name: string;
  role: string;
  ag: number;
  msg: number;
  sla: number;
  sec: number;
  color: string;
}

const AG_ITEMS: AgItem[] = [
  { id: 'gnea',   name: '지엔에이',  loc: '서울 강남',   cnt: 2624, br: 4, sec: 198, file: 189, sla: 96.2, color: '#5B47C9', trend: [320, 280, 310, 390, 420, 380, 290, 350, 420, 450, 440, 380, 310, 280] },
  { id: 'kaiel',  name: '카이엘',    loc: '경기 분당',   cnt: 2382, br: 4, sec: 182, file: 171, sla: 95.8, color: '#7B6EE0', trend: [210, 250, 290, 340, 380, 390, 310, 260, 320, 380, 400, 420, 370, 280] },
  { id: 'triple', name: '트리플',    loc: '부산 해운대', cnt: 1934, br: 3, sec: 148, file: 139, sla: 94.1, color: '#10B981', trend: [180, 200, 220, 260, 290, 310, 280, 230, 250, 300, 340, 320, 280, 210] },
  { id: 'snc',    name: '에스엔씨',  loc: '인천 서구',   cnt: 1651, br: 3, sec: 124, file: 118, sla: 93.7, color: '#3B82F6', trend: [150, 170, 190, 220, 240, 260, 230, 190, 210, 250, 280, 260, 220, 180] },
  { id: 'sihwa',  name: '시화1',     loc: '경기 시흥',   cnt: 1591, br: 2, sec: 118, file: 114, sla: 92.4, color: '#F59E0B', trend: [140, 160, 180, 210, 230, 240, 210, 180, 200, 230, 260, 240, 200, 170] },
  { id: 'kbay',   name: '카베이',    loc: '대구 수성',   cnt: 1573, br: 2, sec: 116, file: 113, sla: 92.1, color: '#EF4444', trend: [135, 155, 175, 205, 225, 235, 205, 175, 195, 225, 255, 235, 195, 165] },
  { id: 'monil',  name: '모닐카',    loc: '광주 서구',   cnt: 1305, br: 2, sec: 98,  file: 94,  sla: 91.8, color: '#8B5CF6', trend: [120, 130, 145, 170, 185, 200, 175, 145, 160, 185, 210, 195, 160, 135] },
  { id: 'hanil2', name: '한일오토2', loc: '서울 송파',   cnt: 1266, br: 2, sec: 96,  file: 91,  sla: 91.2, color: '#06B6D4', trend: [115, 125, 140, 165, 180, 195, 170, 140, 155, 180, 205, 190, 155, 130] },
  { id: 'hanil1', name: '한일오토1', loc: '서울 강동',   cnt: 1250, br: 2, sec: 94,  file: 90,  sla: 90.9, color: '#6366F1', trend: [110, 120, 135, 160, 175, 190, 165, 135, 150, 175, 200, 185, 150, 125] },
  { id: 'cnj',    name: '씨앤제이',  loc: '경기 수원',   cnt: 1056, br: 1, sec: 80,  file: 76,  sla: 90.4, color: '#14B8A6', trend: [95, 105, 115, 135, 150, 160, 140, 115, 125, 150, 170, 160, 130, 105] },
  { id: 'azero',  name: '에이제로',  loc: '충남 천안',   cnt: 1036, br: 1, sec: 78,  file: 75,  sla: 89.8, color: '#F97316', trend: [90, 100, 110, 130, 145, 155, 135, 110, 120, 145, 165, 155, 125, 100] },
  { id: 'ksauto', name: 'KS오토',    loc: '경북 구미',   cnt: 843,  br: 1, sec: 64,  file: 61,  sla: 89.1, color: '#84CC16', trend: [75, 85, 92, 110, 120, 130, 115, 92, 100, 120, 138, 130, 105, 85] },
];

const BR_ITEMS: BrItem[] = [
  { id: 'kkh', name: '김경화', role: '수도권 담당 BR',   ag: 52, msg: 18420, sla: 97.2, sec: 1482, color: '#5B47C9' },
  { id: 'ljs', name: '이지수', role: '영남권 담당 BR',   ag: 48, msg: 16840, sla: 95.8, sec: 1312, color: '#10B981' },
  { id: 'pmj', name: '박민준', role: '충청권 담당 BR',   ag: 44, msg: 15220, sla: 94.1, sec: 1188, color: '#3B82F6' },
  { id: 'csa', name: '최수아', role: '호남권 담당 BR',   ag: 38, msg: 13060, sla: 93.4, sec: 1018, color: '#F59E0B' },
  { id: 'jhy', name: '정하윤', role: '강원·제주 BR',     ag: 35, msg: 11980, sla: 92.8, sec: 934,  color: '#EF4444' },
  { id: 'hdh', name: '한도현', role: '신규 파트너 BR',   ag: 44, msg: 14960, sla: 91.6, sec: 1164, color: '#8B5CF6' },
];

const MAX_AG_CNT = AG_ITEMS[0].cnt;

const MSG_D = [180, 650, 820, 1100, 1450, 520, 90, 1800, 2200, 2600, 2900, 3100, 380, 80, 2800, 3200, 3500, 3300, 2800, 420, 70, 2700, 3100, 3200, 2900, 2600, 390, 60, 2400, 2800, 3100, 2800, 2400, 350, 55, 2200, 2600, 2800, 2500, 2200, 320, 50, 2100, 2400, 2700, 2400, 2100, 300, 45, 1900, 2200, 2500, 2100, 1800, 260, 40, 1700, 2000, 2200, 1900, 1600, 230, 350, 1100, 600];
const USR_D = [25, 90, 110, 150, 200, 70, 12, 240, 290, 340, 380, 400, 52, 10, 380, 400, 400, 390, 370, 55, 8, 360, 390, 390, 380, 350, 48, 7, 330, 360, 380, 360, 320, 44, 7, 300, 340, 360, 330, 300, 42, 6, 280, 320, 340, 310, 280, 38, 6, 260, 300, 320, 290, 260, 35, 5, 240, 270, 290, 270, 240, 33, 45, 150, 85];
const SEC_D = [4, 18, 22, 30, 40, 14, 2, 55, 75, 95, 120, 150, 20, 3, 140, 160, 180, 175, 160, 24, 3, 155, 175, 190, 195, 200, 30, 4, 185, 200, 220, 210, 185, 27, 4, 175, 195, 210, 200, 180, 26, 3, 165, 185, 200, 190, 170, 24, 3, 150, 170, 185, 175, 160, 22, 3, 140, 160, 175, 160, 150, 20, 28, 90, 50];
const BIZ_D = [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 2, 1, 0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 2, 3, 4, 2, 0, 0, 0, 0, 1, 5, 3, 0, 0, 0, 2, 4, 6, 4, 0, 0, 8];

function TrendBars({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const n = data.length;
  return (
    <svg className={styles.trendSvg} viewBox={`0 0 ${n * 4} 72`} preserveAspectRatio="none">
      {data.map((v, i) => {
        const h = (v / max) * 64;
        const x = i * 4;
        const y = 72 - h;
        const opacity = 0.3 + 0.7 * (v / max);
        return <rect key={i} x={x} y={y} width={3} height={h} rx={1} fill={color} opacity={opacity} />;
      })}
    </svg>
  );
}

function MiniTrend({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className={styles.miniTrend}>
      {data.map((v, i) => {
        const h = Math.round((v / max) * 30);
        return <div key={i} className={styles.mtBar} style={{ height: h, background: color, opacity: 0.75 }} />;
      })}
    </div>
  );
}

interface DonutSegment {
  label: string;
  value: number;
  pct: number;
  color: string;
}

function Donut({ title, segments }: { title: string; segments: DonutSegment[] }) {
  const C = 2 * Math.PI * 30; // circumference
  let offset = 47.1; // start offset
  return (
    <div>
      <div className={styles.donutTitleSmall}>{title}</div>
      <div className={styles.donutBlock}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" fill="none" stroke="#E8EAF2" strokeWidth="12" />
          {segments.map((seg, i) => {
            const arc = (seg.pct / 100) * C;
            const dash = `${arc} ${C}`;
            const el = (
              <circle
                key={i}
                cx="40" cy="40" r="30"
                fill="none" stroke={seg.color}
                strokeWidth="12"
                strokeDasharray={dash}
                strokeDashoffset={offset}
                transform="rotate(-90 40 40)"
              />
            );
            offset -= arc;
            return el;
          })}
          <text x="40" y="44" textAnchor="middle" fill="#1A1E3A" fontSize="10" fontFamily="DM Mono, monospace" fontWeight="700">
            {title.replace(/별$/, '')}
          </text>
        </svg>
        <div className={styles.donutLegend}>
          {segments.map((seg, i) => (
            <div key={i} className={styles.dlItem}>
              <div className={styles.dlLeft}>
                <div className={styles.dlDot} style={{ background: seg.color }} />
                {seg.label}
              </div>
              <div className={styles.dlRight}>
                <span className={styles.dlVal}>{seg.value.toLocaleString()}</span>
                <span className={styles.dlPct}>{seg.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModalContent({ id }: { id: string }) {
  switch (id) {
    case 'msg':
      return (
        <>
          <div className={styles.mKpis}>
            <Kpi label="파트너 발신" value="90,745" color="#5B47C9" />
            <Kpi label="사용자 발신" value="63,684" />
            <Kpi label="일 피크" value="3,500" color="#EF4444" />
          </div>
          <div className={styles.mSec}>메시지 유형</div>
          <div className={styles.mTags}>
            <Tag bg="#EEEAFF" color="#5B47C9">텍스트 115,194 (88.9%)</Tag>
            <Tag bg="#D1FAE5" color="#10B981">비밀 9,799 (7.6%)</Tag>
            <Tag bg="#FEE2E2" color="#EF4444">파일 4,518 (3.5%)</Tag>
          </div>
        </>
      );
    case 'time':
      return (
        <>
          <div className={styles.mKpis}>
            <Kpi label="현재" value="1h 42m" color="#10B981" />
            <Kpi label="목표" value="2h 00m" />
            <Kpi label="전 분기" value="2h 22m" />
          </div>
          <div className={styles.mSec}>응답시간 분포</div>
          <div className={styles.mTags}>
            <Tag bg="#D1FAE5" color="#10B981">1h 이내 38.2%</Tag>
            <Tag bg="#EEEAFF" color="#5B47C9">1~2h 44.1%</Tag>
            <Tag bg="#FEF3C7" color="#D97706">2~4h 14.3%</Tag>
            <Tag bg="#FEE2E2" color="#EF4444">4h+ 3.4%</Tag>
          </div>
        </>
      );
    case 'sla':
      return (
        <>
          <div className={styles.mKpis}>
            <Kpi label="전체 SLA" value="94.3%" color="#10B981" />
            <Kpi label="목표" value="90.0%" />
            <Kpi label="최고 BR" value="97.2%" />
          </div>
          <div className={styles.mSec}>AG사별 SLA TOP 5</div>
          <div className={styles.mTags}>
            {AG_ITEMS.slice(0, 5).map((a) => (
              <Tag key={a.id} bg="#EEEAFF" color="#5B47C9">{a.name} {a.sla}%</Tag>
            ))}
          </div>
        </>
      );
    case 'sec':
      return (
        <>
          <div className={styles.mKpis}>
            <Kpi label="총 비밀 메시지" value="9,799" color="#5B47C9" />
            <Kpi label="비율" value="7.6%" />
            <Kpi label="일 피크" value="280건" />
          </div>
          <div className={styles.mSec}>용도 추정</div>
          <div className={styles.mTags}>
            <Tag bg="#EEEAFF" color="#5B47C9">수수료율 협의 추정 ~5,880건</Tag>
            <Tag bg="#FEF3C7" color="#D97706">특판 조건 추정 ~3,919건</Tag>
          </div>
        </>
      );
    case 'file':
      return (
        <>
          <div className={styles.mKpis}>
            <Kpi label="파일 전송" value="4,518" />
            <Kpi label="비밀 메시지" value="9,799" />
            <Kpi label="비즈폼" value="400" />
          </div>
          <div className={styles.mSec}>파이프라인 합계</div>
          <div className={styles.mTags}>
            <Tag bg="#D1FAE5" color="#10B981">매출 직결 거래 총 14,717건</Tag>
            <Tag bg="#EEEAFF" color="#5B47C9">비즈폼 400건 = 금융 상품 접수</Tag>
          </div>
        </>
      );
    case 'ag':
      return (
        <>
          <div className={styles.mKpis}>
            <Kpi label="총 AG" value="3,658" color="#5B47C9" />
            <Kpi label="활성 대화방" value="52" />
            <Kpi label="일 활성" value="200~350" />
          </div>
          <div className={styles.mSec}>상위 3개 AG사</div>
          <div className={styles.mTags}>
            {AG_ITEMS.slice(0, 3).map((a) => (
              <Tag key={a.id} bg="#EEEAFF" color="#5B47C9">{a.name} {a.cnt.toLocaleString()}건</Tag>
            ))}
          </div>
        </>
      );
    default: {
      // BR detail modal — id format: "br-<brId>"
      const br = BR_ITEMS.find((b) => `br-${b.id}` === id || b.id === id);
      if (!br) return null;
      return (
        <>
          <div className={styles.mKpis}>
            <Kpi label="총 메시지" value={br.msg.toLocaleString()} color={br.color} />
            <Kpi label="비밀 메시지" value={br.sec.toLocaleString()} />
            <Kpi label="SLA" value={`${br.sla}%`} color="#10B981" />
          </div>
          <div className={styles.mSec}>비밀 메시지 비율: {((br.sec / br.msg) * 100).toFixed(1)}%</div>
          <div className={styles.mTags}>
            <Tag bg="#EEEAFF" color="#5B47C9">수수료율 추정 {Math.round(br.sec * 0.6).toLocaleString()}건</Tag>
            <Tag bg="#FEF3C7" color="#D97706">특판 조건 추정 {Math.round(br.sec * 0.4).toLocaleString()}건</Tag>
          </div>
        </>
      );
    }
  }
}

function Kpi({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className={styles.mKpi}>
      <div className={styles.mKpiLabel}>{label}</div>
      <div className={styles.mKpiVal} style={{ color }}>{value}</div>
    </div>
  );
}

function Tag({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) {
  return <span className={styles.mTag} style={{ background: bg, color }}>{children}</span>;
}

function ModalHeader({ id }: { id: string }) {
  const titles: Record<string, { t: string; s: string }> = {
    msg:  { t: '전체 메시지 상세',     s: '2026.02.15 ~ 2026.05.13 (약 3개월)' },
    time: { t: '평균 응답시간 상세',   s: '전 분기 대비 28% 개선' },
    sla:  { t: 'SLA 준수율 상세',       s: '목표 90% 대비 4.3%p 초과 달성' },
    sec:  { t: '비밀 메시지 상세',     s: '전체 메시지의 7.6% · 일 평균 80~200건' },
    file: { t: '비즈니스 문서 파이프라인', s: '매출 관련 핵심 거래 총 14,717건' },
    ag:   { t: 'AG 채널 전환 현황',     s: '카카오 오픈채팅 → WON TALK 100%' },
  };
  if (titles[id]) {
    return (
      <>
        <div className={styles.modalTtl}>{titles[id].t}</div>
        <div className={styles.modalSub}>{titles[id].s}</div>
      </>
    );
  }
  const br = BR_ITEMS.find((b) => `br-${b.id}` === id || b.id === id);
  if (br) {
    return (
      <>
        <div className={styles.modalTtl}>{br.name} BR 상세</div>
        <div className={styles.modalSub}>{br.role} · 담당 AG {br.ag}개사</div>
      </>
    );
  }
  return null;
}

export function WonTalkConsole({ state }: WonTalkConsoleProps) {
  const isAgTab = state.activeTab === 'ag';

  const subjectDonut = useMemo<DonutSegment[]>(() => ([
    { label: '파트너(AG)',    value: 90745, pct: 58.8, color: '#5B47C9' },
    { label: '사용자(내부)',  value: 63684, pct: 41.2, color: '#10B981' },
  ]), []);

  const typeDonut = useMemo<DonutSegment[]>(() => ([
    { label: '텍스트',        value: 115194, pct: 88.9, color: '#5B47C9' },
    { label: '비밀 메시지',   value: 9799,   pct: 7.6,  color: '#10B981' },
    { label: '파일',          value: 4518,   pct: 3.5,  color: '#EF4444' },
  ]), []);

  const expandedAg = isAgTab && state.expandedAgId
    ? AG_ITEMS.find((a) => a.id === state.expandedAgId)
    : null;

  return (
    <div className={styles.console}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.sbLogo}>
          <div className={styles.sbBadge}>COWORK+</div>
          <div>
            <div className={styles.sbTitle}>Console</div>
            <div className={styles.sbSub}>우리금융캐피탈</div>
          </div>
        </div>
        <nav className={styles.sbNav}>
          <div className={styles.sbSec}>운영</div>
          <div className={cn(styles.sbItem, styles.sbItemActive)}>채널 운영 대시보드</div>
          <div className={styles.sbItem}>금융사업본부</div>
          <div className={styles.sbItem}>파트너 관리</div>
          <div className={styles.sbItem}>
            컴플라이언스
            <span className={cn(styles.sbPill, styles.sbPillRed)}>1</span>
          </div>
          <div className={styles.sbSec} style={{ marginTop: 10 }}>분석</div>
          <div className={styles.sbItem}>
            AI Insight
            <span className={cn(styles.sbPill, styles.sbPillGreen)}>NEW</span>
          </div>
          <div className={styles.sbItem}>할일 관리</div>
          <div className={styles.sbItem}>비즈폼 현황</div>
          <div className={styles.sbItem}>비밀 메시지</div>
        </nav>
        <div className={styles.sbUser}>
          <div className={styles.sbAv}>최</div>
          <div>
            <div className={styles.sbUname}>최센터장</div>
            <div className={styles.sbUrole}>채널영업센터장</div>
          </div>
          <div className={styles.liveDot} />
        </div>
      </aside>

      {/* MAIN */}
      <div className={styles.main}>
        <div className={styles.topbar}>
          <div className={styles.topbarTitle}>
            채널 운영 대시보드
            <span className={styles.topbarTag}>{state.topbarTag ?? (isAgTab ? 'AG사별' : 'BR별')}</span>
          </div>
          <div className={styles.tbRight}>
            <button className={styles.tbBtn}>{state.dateRangeLabel ?? '2026.02.15 ~ 05.13'}</button>
            <button className={styles.tbBtn}>📄 리포트</button>
            <button className={cn(styles.tbBtn, styles.tbBtnPri)}>🔄 실시간</button>
          </div>
        </div>

        <div className={styles.content}>
          {/* TABS */}
          <div className={styles.tabRow}>
            <div className={cn(styles.tab, isAgTab && styles.tabOn)}>AG사별</div>
            <div className={cn(styles.tab, !isAgTab && styles.tabOn)}>BR별</div>
          </div>

          {isAgTab ? (
            <>
              {/* KPI */}
              <div className={styles.kpiRow}>
                <div className={cn(styles.kpi, styles.k1)}>
                  <div className={styles.kpiLabel}>이번 분기 전체 메시지</div>
                  <div className={styles.kpiValue}>129,511</div>
                  <span className={cn(styles.kpiDelta, styles.kpiDeltaUp)}>↑ +24.6% 전 분기 대비</span>
                  <div className={styles.kpiPrev}>일 최대 3,500건 · 평균 1,800건/일</div>
                </div>
                <div className={cn(styles.kpi, styles.k2)}>
                  <div className={styles.kpiLabel}>평균 응답시간</div>
                  <div className={styles.kpiValue}>1h 42m</div>
                  <span className={cn(styles.kpiDelta, styles.kpiDeltaWarn)}>↓ -28% 전 분기 대비</span>
                  <div className={styles.kpiPrev}>목표 2h 이내 · 초과 달성</div>
                </div>
                <div className={cn(styles.kpi, styles.k3)}>
                  <div className={styles.kpiLabel}>응답 SLA 준수율</div>
                  <div className={styles.kpiValue}>94.3%</div>
                  <span className={cn(styles.kpiDelta, styles.kpiDeltaUp)}>↑ +8.2%p 전 분기 대비</span>
                  <div className={styles.kpiPrev}>목표 90% · 4.3%p 초과</div>
                </div>
              </div>

              {/* PRODUCTIVITY BANNER */}
              <div className={styles.prod}>
                <div className={styles.prodLeft}>
                  <div className={styles.prodTitle}>영업지원 생산성 — WON TALK 도입 효과</div>
                  <div className={styles.prodSub}>렌터카 영업지원 14명 기준 · 2026.02.15 ~ 05.13</div>
                </div>
                <div className={styles.prodMetrics}>
                  <div>
                    <div className={styles.pmLabel}>도입 전 1인 담당 AG</div>
                    <div className={cn(styles.pmVal, styles.pmValDim)}>190<small> 명</small></div>
                  </div>
                  <div className={styles.prodArrow}>→</div>
                  <div className={styles.prodChange}>+37.4% ↑</div>
                  <div>
                    <div className={styles.pmLabel}>현재 1인 담당 AG</div>
                    <div className={cn(styles.pmVal, styles.pmValPri)}>261<small> 명</small></div>
                  </div>
                  <div className={styles.prodDivider} />
                  <div>
                    <div className={styles.pmLabel}>활성 대화방</div>
                    <div className={cn(styles.pmVal, styles.pmValGn)}>52<small> 개</small></div>
                  </div>
                  <div>
                    <div className={styles.pmLabel}>외부 파트너</div>
                    <div className={cn(styles.pmVal, styles.pmValPri)}>3,658<small> 명</small></div>
                  </div>
                </div>
              </div>

              {/* INSIGHT ROW */}
              <div className={styles.insightRow}>
                <div className={styles.ins}>
                  <div className={styles.insIcon}>🔒</div>
                  <div className={styles.insTitle}>민감 거래 보호 규모</div>
                  <div className={styles.insNum}>9,799</div>
                  <div className={styles.insBody}>수수료율·특판 조건 협의가 WON TALK 비밀 채널로 안전하게 처리됩니다. 전체 거래의 7.6%.</div>
                  <button className={styles.insCta}>비밀 메시지 상세 →</button>
                </div>
                <div className={styles.ins}>
                  <div className={styles.insIcon}>📎</div>
                  <div className={styles.insTitle}>비즈니스 문서 파이프라인</div>
                  <div className={styles.insNum}>14,717</div>
                  <div className={styles.insBody}>파일 4,518 + 비밀 9,799 + 비즈폼 400건 = 매출 관련 핵심 거래 총량.</div>
                  <button className={styles.insCta}>파일 현황 상세 →</button>
                </div>
                <div className={styles.ins}>
                  <div className={styles.insIcon}>📊</div>
                  <div className={styles.insTitle}>AG 채널 전환 완료</div>
                  <div className={styles.insNum}>3,658</div>
                  <div className={styles.insBody}>카카오 오픈채팅 → WON TALK 100% 전환. 매일 200~350명 활발히 발신 중.</div>
                  <button className={styles.insCta}>AG사별 활성도 →</button>
                </div>
              </div>

              {/* TREND ROW 2×2 */}
              <div className={styles.trendRow}>
                <TrendPanel label="📈 일별 메시지"  peak="피크 3,500/일" data={MSG_D} color="#5B47C9" />
                <TrendPanel label="👥 활성 사용자"  peak="피크 400명/일"  data={USR_D} color="#10B981" />
                <TrendPanel label="🔒 비밀 메시지"  peak="피크 280/일"    data={SEC_D} color="#3B82F6" />
                <TrendPanel label="📋 비즈폼 접수"  peak="피크 8/일"      data={BIZ_D} color="#EF4444" />
              </div>

              {/* AG DETAIL */}
              <div className={styles.agDetailWrap}>
                <div className={styles.agDetailLabel}>
                  <span className={styles.agDetailMark} />
                  AG사별 상세
                  <span className={styles.agDetailSub}>참고 데이터 · 클릭하면 상세</span>
                </div>
                <div className={styles.midGrid}>
                  <div className={styles.panel}>
                    <div className={styles.panelTitle}>
                      메시지 분포 (최근 4주) <span>클릭 → 드릴다운</span>
                    </div>
                    <div className={styles.agList}>
                      {AG_ITEMS.map((ag) => {
                        const isSel = expandedAg?.id === ag.id;
                        return (
                          <div key={ag.id} className={cn(styles.agItem, isSel && styles.agItemSel)}>
                            <div className={styles.agHdr}>
                              <div>
                                <div className={styles.agName}>{ag.name}</div>
                                <div className={styles.agMeta}>{ag.loc} · BR {ag.br}명</div>
                              </div>
                              <div className={styles.agCount}>
                                {ag.cnt.toLocaleString()}<small>건</small>
                              </div>
                            </div>
                            <div className={styles.agTrack}>
                              <div
                                className={styles.agFill}
                                style={{ width: `${(ag.cnt / MAX_AG_CNT) * 100}%`, background: ag.color }}
                              />
                            </div>
                            {isSel && (
                              <div className={cn(styles.agDetail, styles.agDetailOpen)}>
                                <div className={styles.detailGrid}>
                                  <DetailCell label="비밀 메시지" value={ag.sec.toLocaleString()} tone="pr" />
                                  <DetailCell label="파일 전송"   value={ag.file.toLocaleString()} />
                                  <DetailCell label="SLA 준수"     value={`${ag.sla}%`} tone="gn" />
                                  <DetailCell label="담당 BR"      value={`${ag.br}명`} />
                                </div>
                                <div className={styles.dcLabel} style={{ marginBottom: 4 }}>최근 14일 추이</div>
                                <MiniTrend data={ag.trend} color={ag.color} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.panel}>
                    <div className={styles.panelTitle}>메시지 주체 · 타입 분포</div>
                    <div className={styles.donutSection}>
                      <Donut title="주체별" segments={subjectDonut} />
                      <Donut title="타입별" segments={typeDonut} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* BR VIEW */}
              <div className={styles.kpiRow}>
                <div className={cn(styles.kpi, styles.k1)}>
                  <div className={styles.kpiLabel}>총 BR 수</div>
                  <div className={styles.kpiValue}>14</div>
                  <span className={cn(styles.kpiDelta, styles.kpiDeltaUp)}>↑ 전기 대비 +3명</span>
                </div>
                <div className={cn(styles.kpi, styles.k2)}>
                  <div className={styles.kpiLabel}>1인당 담당 AG</div>
                  <div className={styles.kpiValue}>261</div>
                  <span className={cn(styles.kpiDelta, styles.kpiDeltaUp)}>↑ 190명→261명 (+37.4%)</span>
                </div>
                <div className={cn(styles.kpi, styles.k3)}>
                  <div className={styles.kpiLabel}>평균 메시지/BR·일</div>
                  <div className={styles.kpiValue}>4,551</div>
                  <span className={cn(styles.kpiDelta, styles.kpiDeltaUp)}>↑ +18.2%</span>
                </div>
              </div>
              <div className={styles.brGrid}>
                {BR_ITEMS.map((br) => (
                  <div key={br.id} className={styles.brCard}>
                    <div className={styles.brTop}>
                      <div className={styles.brAv} style={{ background: br.color }}>{br.name[0]}</div>
                      <div>
                        <div className={styles.brNm}>{br.name}</div>
                        <div className={styles.brRl}>{br.role}</div>
                      </div>
                    </div>
                    <div className={styles.brStats}>
                      <div>
                        <div className={styles.bsLabel}>담당 AG</div>
                        <div className={styles.bsVal}>{br.ag}개</div>
                      </div>
                      <div>
                        <div className={styles.bsLabel}>총 메시지</div>
                        <div className={styles.bsVal}>{(br.msg / 1000).toFixed(1)}K</div>
                      </div>
                      <div>
                        <div className={styles.bsLabel}>SLA</div>
                        <div className={cn(styles.bsVal, styles.bsValGn)}>{br.sla}%</div>
                        <div className={styles.bsBar}>
                          <div className={styles.bsFill} style={{ width: `${br.sla}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {state.openModalId && (
        <div className={cn(styles.overlay, styles.overlayOpen)}>
          <div className={styles.modal}>
            <div className={styles.modalHdr}>
              <div><ModalHeader id={state.openModalId} /></div>
            </div>
            <ModalContent id={state.openModalId} />
          </div>
        </div>
      )}
    </div>
  );
}

function TrendPanel({ label, peak, data, color }: { label: string; peak: string; data: number[]; color: string }) {
  return (
    <div className={styles.trendPanel}>
      <div className={styles.trendHdr}>
        <div className={styles.trendLabel}>{label}</div>
        <div className={styles.trendPeak}>{peak}</div>
      </div>
      <TrendBars data={data} color={color} />
    </div>
  );
}

function DetailCell({ label, value, tone }: { label: string; value: string; tone?: 'pr' | 'gn' }) {
  return (
    <div className={styles.dc}>
      <div className={styles.dcLabel}>{label}</div>
      <div className={cn(styles.dcVal, tone === 'pr' && styles.dcValPr, tone === 'gn' && styles.dcValGn)}>{value}</div>
    </div>
  );
}
