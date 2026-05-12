import type { Chapter, DashboardRow, DashboardState } from '../../_types';
import { SALESBRIDGE_SIDEBAR } from '../workspace-defaults';

// Act IV — 정착. 이팀장이 본부장 보고용 자료를 ONE TALK 대시보드에서 클릭 한 번으로.
// Ch.0~2의 운영 데이터가 자동 집계되어 분기 5대 질문에 즉답.

const CUSTOMER_ROWS: DashboardRow[] = [
  { id: 'mw', name: '미우케이블',         sub: '서울 강남 · 영업 11명', value: 312, unit: '건', percent: 100, color: '#C9302C' },
  { id: 'dd', name: '대동케이블판매',     sub: '인천 부평 · 영업 8명',   value: 246, unit: '건', percent: 79,  color: '#E67E22' },
  { id: 'rs', name: '림스케이블',         sub: '대구 달서 · 영업 6명',   value: 198, unit: '건', percent: 63,  color: '#8E44AD' },
  { id: 'kh', name: '금호',               sub: '광주 광산 · 영업 5명',   value: 154, unit: '건', percent: 49,  color: '#E91E8C' },
  { id: 'uh', name: '유한케이블',         sub: '대전 유성 · 영업 3명',   value: 92,  unit: '건', percent: 29,  color: '#00C896' },
];

const BR_ROWS: DashboardRow[] = [
  { id: 'kang', name: '강승희', sub: '미우·대동·림스 담당 · 거래처 3사', value: 386, unit: '건', percent: 100, color: '#C9302C' },
  { id: 'kim',  name: '김지훈', sub: '림스·금호 담당 · 거래처 2사',     value: 312, unit: '건', percent: 80,  color: '#E67E22' },
  { id: 'park', name: '박정민', sub: '금호·유한·신규 담당 · 거래처 3사', value: 268, unit: '건', percent: 69,  color: '#8E44AD' },
  { id: 'yang', name: '양민수', sub: '소형 거래처 6사 담당',           value: 214, unit: '건', percent: 55,  color: '#00C896' },
];

const dashboardCustomer: DashboardState = {
  activeTab: 'ag',
  tabs: [
    { id: 'ag', label: '거래처별' },
    { id: 'br', label: 'BR별' },
  ],
  summary: [
    { label: '분기 PO 응대 건',        value: '1,002건', sub: '전 분기 대비 +22.4%',  trend: 'up' },
    { label: '거래처 평균 응답시간',    value: '38분',    sub: '전 분기 4.2시간 → -85%', trend: 'down' },
    { label: '팀장 nudge / SLA 알림',    value: '89 / 412건', sub: '팀장 직접 컴플레인 0건', trend: 'down' },
  ],
  rows: CUSTOMER_ROWS,
  rowsTitle: '거래처별 분기 PO 응대 분포',
  rowsMeta: '2025 Q3 · 9월 30일 18:00 기준',
};

const dashboardBr: DashboardState = {
  activeTab: 'br',
  tabs: [
    { id: 'ag', label: '거래처별' },
    { id: 'br', label: 'BR별' },
  ],
  summary: [
    { label: 'BR 평균 부하',          value: '72%',     sub: '전 분기 대비 -13%p', trend: 'down' },
    { label: '최단 응답 BR',         value: '강승희',   sub: '평균 응답 16분',     trend: 'up' },
    { label: '주간 야근 시간 평균',   value: '1.4시간', sub: '전 분기 6.2h → -77%', trend: 'down' },
  ],
  rows: BR_ROWS,
  rowsTitle: 'BR별 분기 응대 + 부하 분포',
  rowsMeta: '본부장 회의 자료 · 자동 집계 · 클릭 1회로 PDF 생성 가능',
};

export const chapter03QuarterReport: Chapter = {
  id: 3,
  act: 4,
  title: '본부장님께 5분 만에 드릴 수 있는 분기 자료',
  subtitle: '거래처별·BR별 응대 데이터가 클릭 한 번에',
  narration:
    '이팀장은 더 이상 BR에게 야근을 시키지 않아도 됩니다. ONE TALK이 채널 안에서 발생한 모든 응대 데이터를 자동 집계해 분기 보고로 정리합니다. 본부장이 요구한 "누가·언제·몇 번·왜·어떻게"가 한 화면에 있습니다.',
  stage: 'phone-workspace',
  states: [
    // STATE 0 — 거래처별 대시보드
    {
      index: 0,
      activeCastId: 'lee-team',
      guide: '이팀장이 ONE TALK 분기 대시보드의 "거래처별" 탭을 엽니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명 · ONE TALK 채널',
          messages: [
            {
              id: 'sys-quarter',
              kind: 'system',
              text: '📊 영업팀장이 분기 대시보드를 조회 중입니다.',
              meta: { tone: 'muted' },
            },
            {
              id: 'sys-quarter-2',
              kind: 'system',
              text: '🟢 이번 분기 미우케이블 컴플레인 0건 · 평균 응답시간 22분',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'dashboard',
        sidebar: SALESBRIDGE_SIDEBAR,
        dashboard: dashboardCustomer,
      },
      presets: [
        {
          id: 'admin-switch-br',
          text: 'BR별 탭으로 전환 — 누가 어떻게 일했는지 본다',
          kind: 'admin',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 거래처별 응대 분포 한눈에',
        meta: '영업팀장 · 관리자 시점',
        situation:
          '23개 거래처 중 상위 5개를 자동 정렬 + 전 분기 대비 변화율 자동 표시. 본부장이 묻는 "누가 가장 많이 응대 받았나"에 즉답.',
        interact: '이팀장은 탭만 클릭. 데이터는 ONE TALK 채널 운영 데이터에서 자동 적재.',
        feel: [
          '"엑셀 취합 시대 종료"',
          '청중: "이게 진짜 운영 데이터"',
          '"평균 응답시간 4.2h → 38분이 한 줄에"',
        ],
        connect: [
          'Ch.1 STATE 3 — 강승희 야근 보고서가 이 한 화면으로 대체',
          'Ch.2 STATE 2 — 사이드 채널 흡수 89건이 여기 적재',
        ],
      },
    },
    // STATE 1 — BR별 탭
    {
      index: 1,
      activeCastId: 'lee-team',
      guide: 'BR별 탭으로 전환. 야근 시간 평균 -77%. 강승희 부하가 92% → 72%로 회복.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명 · ONE TALK 채널',
          messages: [
            {
              id: 'sys-br',
              kind: 'system',
              text: '👥 BR 4명 분기 응대 자료 자동 집계 — 인센티브 후보 자동 도출',
              meta: { tone: 'brand' },
            },
            {
              id: 'sys-br-2',
              kind: 'system',
              text: '🟢 야근 시간 BR 평균 1.4시간 (전 분기 6.2h → -77%)',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'dashboard',
        sidebar: SALESBRIDGE_SIDEBAR,
        dashboard: dashboardBr,
      },
      presets: [
        {
          id: 'admin-export',
          text: '본부장 보고용 PDF 자동 생성',
          kind: 'admin',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — BR을 야근에서 풀어주는 데이터',
        meta: 'ONE TALK · 운영자에게 데이터를 돌려준다',
        situation:
          '"BR 1명당 분기 응대 건수가 몇 건이에요?"라는 본부장 질문에 클릭 한 번으로 답. 강승희가 더 이상 카톡 캡처를 엑셀로 옮기지 않아도 됨.',
        interact: '이팀장이 BR 탭 클릭. 인센티브 산정 근거 카드 자동 등장.',
        feel: [
          '"인센티브에 시비 없을 정량 근거"',
          'BR: "내 노력이 자동으로 정리된다"',
          '청중: "이 데이터가 BR을 야근에서 풀어주는 진짜 이유"',
        ],
        connect: [
          'Ch.1 STATE 3 — 카톡 247건 캡처/엑셀 5시트가 이 한 화면에 응축',
          'WON TALK Ch.8 — 같은 패턴이 자동차금융 도메인에서도 동일하게 작동',
        ],
      },
    },
    // STATE 2 — PDF 자동 생성
    {
      index: 2,
      activeCastId: 'lee-team',
      guide: '챕터 마감 — 본부장 회의 자료 PDF가 5분 만에 완성.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명 · ONE TALK 채널',
          messages: [
            {
              id: 'sys-pdf',
              kind: 'system',
              text: '✅ 분기 영업 운영 보고서 PDF 자동 생성 완료 (Q3-ONETALK-perf.pdf · 12.4MB)',
              meta: { tone: 'good' },
            },
            {
              id: 'sys-pdf-2',
              kind: 'system',
              text: '📤 본부장 메일로 자동 전송 · 다음 회의 자료 큐에 등록',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'dashboard',
        sidebar: SALESBRIDGE_SIDEBAR,
        dashboard: dashboardBr,
      },
      presets: [],
      memo: {
        title: 'STATE 2 — 4막 결제 모먼트',
        meta: 'ONE TALK · 정착',
        situation:
          'Ch.0~Ch.2에서 발생한 모든 채널 데이터가 한 화면의 정량 자료로 응축. 다음 분기 회의에서 본부장이 "이걸 어떻게 정리하셨어요?"라고 물어본다.',
        interact: '대시보드 → PDF 자동 생성 → 본부장 메일 자동 전송. 사람의 손이 닿지 않은 자료.',
        feel: [
          '팀장: "내가 본부장님께 숫자로 보고할 수 있다"',
          'BR: "야근하지 않고 분기를 마감한 첫 분기"',
          '청중: "이게 우리가 사야 하는 이유"',
        ],
        connect: [
          '플랫폼 가치의 정점 — Plan §IV "정착(Settle)" 막의 정의',
          'WON TALK Ch.8 — 같은 결제 모먼트가 다른 산업에서도 재현',
          'ROI 패널 4칩 — 측정 기준 곧 공개',
        ],
      },
    },
  ],
};
