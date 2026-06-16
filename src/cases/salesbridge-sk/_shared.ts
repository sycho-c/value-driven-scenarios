import type {
  RentacarDashboardState,
  RcDashTabId,
  RentacarTimelineState,
  RentacarAttritionState,
  RcTimelineSilo,
  RcTimelineEntry,
  RcHistItem,
} from '../_types';

export const SK_ACCENT = '#1B3A6B';

const TABS: Array<{ id: RcDashTabId; label: string }> = [
  { id: 'talk', label: '대화 발생 현황' },
  { id: 'asset', label: '자산화 현황' },
  { id: 'revenue', label: '자산 → 매출 연결' },
  { id: 'risk', label: '리스크 현황' },
];

/**
 * SK렌터카 Cowork+ 관리자 대시보드 — Ch.0 / Ch.3 공유.
 * 와이어프레임(sk_rentacar_dashboard_wireframe.html)의 4탭·KPI·차트 데이터를 그대로 옮겼다.
 */
export function makeSkDashboard(
  overrides: Partial<RentacarDashboardState> = {},
): RentacarDashboardState {
  return {
    title: 'SK렌터카 Cowork+ 관리자 대시보드',
    meta: '2026.05.14 (목) · 전체 영업사원 14,000명 기준',
    realtimeLabel: '마지막 업데이트 14:32',
    kpis: [
      { label: '오늘 접촉 건수', value: '8,423', sub: '전화 62% · 문자 23% · 카카오 15%', tone: 'ok' },
      { label: 'COSS 자동 적재율', value: '94.2%', sub: '7,934건 완료', tone: 'ok' },
      { label: '자산화 갭', value: '489건', sub: '앱 미사용 주요 원인', tone: 'warn' },
      { label: '리스크 고객', value: '1,204명', sub: '90일 미접촉 이탈 위험', tone: 'danger' },
    ],
    activeTab: 'talk',
    tabs: TABS,
    donut: {
      total: '8,423',
      segs: [
        { label: '전화 (STT)', percent: 62, color: '#1B3A6B' },
        { label: '문자', percent: 23, color: '#378ADD' },
        { label: '카카오', percent: 15, color: '#85B7EB' },
      ],
    },
    zeroContact: {
      value: '1,247명',
      sub: '전체 14,000명 중 8.9%',
      bars: [
        { label: '수도권 1팀', percent: 12.1, valueText: '12.1%', tone: 'danger' },
        { label: '수도권 2팀', percent: 7.4, valueText: '7.4%', tone: 'warn' },
        { label: '호남사업단', percent: 4.2, valueText: '4.2%', tone: 'good' },
        { label: '부산사업단', percent: 6.0, valueText: '6.0%', tone: 'warn' },
      ],
      note: '→ 수도권 1팀 클릭 시 영업사원별 드릴다운',
    },
    assetGap: {
      donePercent: 94.2,
      doneLabel: 'COSS 완료 94.2% (7,934건)',
      gapLabel: '갭 5.8%',
      note: '총 발생 8,423건 중 7,934건 자동 적재 완료 · 489건 미적재',
      causeTitle: '미적재 489건 원인 분류',
      causes: [
        { label: '앱 미사용', percent: 52, valueText: '52%', tone: 'warn' },
        { label: 'STT 변환 실패', percent: 34, valueText: '34%', tone: 'danger' },
        { label: '네트워크 오류', percent: 14, valueText: '14%', tone: 'muted' },
      ],
      actionNote: '앱 미사용 254건 → 해당 영업사원 255명에게 앱 사용 안내 발송',
    },
    convTitle: '채널별 계약 전환율',
    convBars: [
      { label: '전화', percent: 68, valueText: '68%', tone: 'brand' },
      { label: '카카오', percent: 51, valueText: '51%', tone: 'brand' },
      { label: '문자', percent: 34, valueText: '34%', tone: 'muted' },
    ],
    convNote: '전화 상담 시 전환율이 문자 대비 2배',
    convLine: {
      points: [
        { label: '1회', valueText: '22%', ratio: 0.3 },
        { label: '2회', valueText: '35%', ratio: 0.48 },
        { label: '3회', valueText: '51%', ratio: 0.7 },
        { label: '4회', valueText: '64%', ratio: 0.88 },
        { label: '5회+', valueText: '73%', ratio: 1.0 },
      ],
      note: '3회 이상 접촉 시 전환율 51% → AI 코칭 기준점',
    },
    coachingNote:
      '접촉 1~2회에서 이탈한 고객 3,841명 재접촉 권고 · 평균 접촉 1.8회 영업사원 342명에게 "3회 이상 접촉" 가이드 발송 예정',
    risks: [
      { value: '1,204명', desc: '90일 이상 미접촉\n이탈 위험 고객', tone: 'hot', drillLabel: '목록 조회 ↗' },
      { value: '3건', desc: '퇴사 예정자\n인수인계 미완료', tone: 'warm', drillLabel: '인수인계 시작 ↗' },
      { value: '12건', desc: '진행 중 클레임\n이력 확인 가능 100%', tone: 'ok', drillLabel: '클레임 조회 ↗' },
    ],
    handoffTitle: '퇴사 예정자 인수인계 현황',
    handoff: [
      { name: '김○○ 영업사원', clients: '187명', date: '5/31', status: 'pending' },
      { name: '이○○ 영업사원', clients: '94명', date: '6/14', status: 'progress' },
      { name: '박○○ 영업사원', clients: '230명', date: '5/21', status: 'done' },
    ],
    handoffNote: '모든 고객 상담 이력이 COSS에 적재되어 있어 인수인계 후 즉시 접촉 가능',
    ...overrides,
  };
}

// ───────────────────────── 채널 통합 타임라인 (Ch.1 Before / Ch.2 After 공유) ─────────────────────────

const TIMELINE_SILOS: RcTimelineSilo[] = [
  {
    channel: 'kakao',
    title: '개인 카카오톡',
    body: ['05.08 "그랜저 옵션 네비 넣으면 얼마예요?" → 월 2만원 추가', '03.15 첫 상담: G80도 보실 의향 있으세요?'],
  },
  {
    channel: 'phone',
    title: '개인 전화 기록',
    dark: true,
    body: ['05.12 통화 14분 22초 — 내용 없음', '04.28 통화 7분 08초 — 내용 없음', '03.20 통화 3분 51초 — 내용 없음'],
  },
  {
    channel: 'sms',
    title: '개인 문자',
    body: ['05.05 "5월 22일 오전에 방문 가능합니다"', '04.10 "보험 기본 포함인가요?"'],
  },
];

const TIMELINE_ENTRIES: RcTimelineEntry[] = [
  {
    channel: 'phone',
    title: '통화 14분 22초 — STT 자동 기록',
    preview: '그랜저 2년 계약, 월 47만원 협의, 3월 출고 희망 확인...',
    date: '05.12 10:14',
    detailLines: [
      { side: 'stt', text: '"네 그랜저 2년 계약으로 말씀드렸는데요, 월 47만원 선이고요. 3월 중순 출고로 잡아드릴 수 있을 것 같습니다."' },
    ],
  },
  {
    channel: 'kakao',
    title: '네비게이션 옵션 문의',
    preview: '그랜저 옵션 네비 넣으면 얼마예요? → 월 2만원 추가',
    date: '05.08 15:12',
    detailLines: [
      { side: 'out', text: '그랜저 옵션 네비 넣으면 얼마예요?' },
      { side: 'in', text: '네비 추가 시 월 2만원 추가입니다 (총 49만원)' },
      { side: 'out', text: '그럼 월 49만원이네요. 생각해볼게요' },
    ],
  },
  {
    channel: 'sms',
    title: '계약서 서명 일정 협의',
    preview: '← "5월 22일 오전에 방문 가능합니다"',
    date: '05.05 11:30',
    detailLines: [
      { side: 'out', text: '계약서 서명 일정 잡아드리겠습니다. 편하신 날짜 알려주세요' },
      { side: 'in', text: '5월 22일 오전에 방문 가능합니다' },
    ],
  },
  {
    channel: 'phone',
    title: '통화 7분 08초 — STT 자동 기록',
    preview: '보험 기본 포함, 장기 할인 3% 안내...',
    date: '04.28 14:40',
    detailLines: [
      { side: 'stt', text: '"기본 보험은 포함이고요, 2년 이상 계약 시 장기 할인 3% 추가 적용됩니다. 최종 월 45만 8천원으로 가능합니다."' },
    ],
  },
  {
    channel: 'sms',
    title: '보험 포함 여부 문의',
    preview: '← "보험 기본 포함인가요?"',
    date: '04.10 09:05',
    detailLines: [{ side: 'in', text: '보험 기본 포함인가요?' }],
  },
  {
    channel: 'phone',
    title: '통화 3분 51초 — STT 자동 기록',
    preview: '그랜저 HEV vs G80 비교 상담...',
    date: '03.20 16:17',
    detailLines: [
      { side: 'stt', text: '"그랜저 HEV랑 G80 두 가지 다 보고 싶다고 하셨는데요, G80은 월 65만원대부터예요. 예산 기준이 어떻게 되세요?"' },
    ],
  },
  {
    channel: 'kakao',
    title: '첫 상담 접수',
    preview: '그랜저 HEV 또는 G80 장기 렌터카 문의...',
    date: '03.15 10:22',
    detailLines: [
      { side: 'out', text: '안녕하세요, 그랜저 HEV나 G80 장기 렌터카 알아보고 있어요' },
      { side: 'in', text: '안녕하세요! 두 차종 비교 상담 도와드릴게요. 선호 기간이 어떻게 되시나요?' },
    ],
  },
];

export function makeSkTimeline(mode: 'before' | 'after'): RentacarTimelineState {
  return {
    mode,
    customerName: '박민준',
    customerPhone: '010-3847-2910',
    customerMeta: '담당: 김렌터 · 첫 접촉 2026.03.15',
    stats: [
      { value: '8', label: '총 접촉 횟수' },
      { value: '62일', label: '상담 기간' },
      { value: '높음', label: '계약 가능성', good: true },
    ],
    silos: TIMELINE_SILOS,
    beforeNote: '세 채널 사이에 연결고리가 없습니다. 전체 맥락을 파악하려면 세 앱을 모두 열어야 합니다.',
    entries: TIMELINE_ENTRIES,
  };
}

// ───────────────────────── 퇴사 시뮬 (Ch.1 Before / Ch.2 After 공유) ─────────────────────────

const ATTRITION_HIST: RcHistItem[] = [
  { channel: 'phone', title: '통화 — 그랜저 2년 견적 상담', detail: '월 47만원 협의 · 3월 출고 희망', date: '2026.05.12' },
  { channel: 'kakao', title: '카카오 메시지 — 옵션 문의', detail: '네비게이션 추가 시 월 49만원 확인', date: '2026.05.08' },
  { channel: 'sms', title: '문자 — 계약서 서명 일정', detail: '5월 22일 오전 방문 예약', date: '2026.05.05' },
  { channel: 'phone', title: '통화 — 보험 옵션 확인', detail: '기본 보험 포함 여부 안내 완료', date: '2026.04.28' },
  { channel: 'kakao', title: '카카오 — 첫 상담 접수', detail: '그랜저 HEV 또는 제네시스 G80 비교 요청', date: '2026.03.15' },
];

export function makeSkAttrition(mode: 'before' | 'after'): RentacarAttritionState {
  const base = {
    customerName: '박민준',
    customerPhone: '010-3847-2910',
    deactName: '최성과',
    deactClients: '230명',
    deactDate: '2026.05.20',
    histItems: ATTRITION_HIST,
    cossTags: ['그랜저 2년', '월 47만원', '3월 출고', '5건 이력'],
  };
  if (mode === 'before') {
    return {
      ...base,
      mode: 'before',
      bubble: '"안녕하세요, 담당자가 바뀌어서 연락드렸습니다. 이전에 상담하신 내용 확인을 위해..."',
      reaction:
        '"죄송한데, 이미 그랜저 조건으로 3번이나 설명드렸는데요. 또 처음부터 하셔야 하나요? 다른 렌터카 회사도 알아보고 있었는데..."',
    };
  }
  return {
    ...base,
    mode: 'after',
    bubble: '"박민준 고객님, 저 이번에 담당 바뀐 김렌터입니다. 그랜저 2년 계약, 월 47만원 조건으로 상담하고 계셨죠?"',
    reaction:
      '"아, 담당자 바뀌셨군요. 네, 그랜저 2년에 47만원 맞아요. 3월 출고 가능한지 확인해주신다고 하셨는데, 어떻게 됐나요?"',
  };
}
