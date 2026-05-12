import type { Chapter, DashboardRow, DashboardState } from '../../_types';

const AG_ROWS: DashboardRow[] = [
  { id: 'a1', name: '에이원오토',   sub: '서울 강남 · 영업 11명', value: 320, unit: '건', percent: 100, color: '#5B3FE4' },
  { id: 'bk', name: '비케이오토',   sub: '경기 분당 · 영업 8명',  value: 264, unit: '건', percent: 82,  color: '#8B6FFF' },
  { id: 'jn', name: '제니오토',     sub: '부산 해운대 · 영업 6명', value: 198, unit: '건', percent: 62,  color: '#00C896' },
  { id: 'rm', name: '림스카',       sub: '대구 수성 · 영업 5명',   value: 152, unit: '건', percent: 47,  color: '#FFB800' },
  { id: 'sm', name: '스마트오토',   sub: '인천 송도 · 영업 4명',   value: 118, unit: '건', percent: 37,  color: '#FF7B7B' },
];

const BR_ROWS: DashboardRow[] = [
  { id: 'kkh', name: '김경화', sub: '금리·대출 담당 · AG 5개', value: 412, unit: '건', percent: 100, color: '#5B3FE4' },
  { id: 'lpm', name: '이과장', sub: '금리·대출 담당 · AG 4개', value: 358, unit: '건', percent: 87,  color: '#8B6FFF' },
  { id: 'pj',  name: '박효성', sub: '서류·심사 담당 · AG 3개', value: 286, unit: '건', percent: 69,  color: '#00C896' },
  { id: 'kjh', name: '강주현', sub: '리스 전담 · AG 2개',     value: 192, unit: '건', percent: 47,  color: '#FFB800' },
];

const dashboardAg: DashboardState = {
  activeTab: 'ag',
  tabs: [
    { id: 'ag', label: 'AG사별' },
    { id: 'br', label: 'BR별' },
  ],
  summary: [
    { label: '이번 분기 신청건', value: '1,052건', sub: '전 분기 대비 +18.4%', trend: 'up' },
    { label: '평균 처리시간',     value: '2h 11m',  sub: '전 분기 대비 -34%',    trend: 'down' },
    { label: '응답 SLA 준수율',    value: '96.8%',   sub: '전 분기 대비 +12%p',  trend: 'up' },
  ],
  rows: AG_ROWS,
  rowsTitle: 'AG사별 신청건 분포',
  rowsMeta: '2026 Q3 · 7월 8일 14:00 기준',
};

const dashboardBr: DashboardState = {
  activeTab: 'br',
  tabs: [
    { id: 'ag', label: 'AG사별' },
    { id: 'br', label: 'BR별' },
  ],
  summary: [
    { label: 'BR별 평균 부하',   value: '64%',   sub: '전 분기 대비 -8%p',  trend: 'down' },
    { label: '최단 응답 BR',     value: '김경화', sub: '응답 평균 1.4분',     trend: 'up' },
    { label: '인센티브 후보',     value: '3명',   sub: 'AG 만족도 + 처리율 기준', trend: 'neutral' },
  ],
  rows: BR_ROWS,
  rowsTitle: 'BR별 처리건 + 부하',
  rowsMeta: '인센티브 산정 근거 자료 · 자동 집계',
};

export const chapter08Dashboard: Chapter = {
  id: 8,
  act: 4,
  title: '이번 달 누가 제일 잘했는지, 데이터로',
  subtitle: 'AG별/BR별 성과 — 인센티브 근거가 클릭 한 번에',
  narration:
    '센터장은 분기마다 AG사와 BR의 성과를 정량 비교해야 합니다. Cowork+의 채널 대시보드는 모든 데이터를 운영자에게 돌려줍니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'choi-cm',
      guide: '센터장이 AG사별 대시보드를 엽니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-dash-open',
              kind: 'system',
              text: '📊 센터장이 채널 대시보드를 조회 중입니다.',
              meta: { tone: 'muted' },
            },
          ],
        },
      },
      workspace: {
        mode: 'dashboard',
        dashboard: dashboardAg,
      },
      presets: [
        {
          id: 'admin-switch-br',
          text: 'BR별 탭으로 전환 — 누가 잘했는지 본다',
          kind: 'admin',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — AG사 성과 한눈에',
        meta: '최센터장 · 관리자 시점',
        situation:
          '47개 AG사 중 상위 5개를 정렬 + 분기 대비 변화율 자동 표시. 인사이트 발굴 시간이 분기 1주에서 5분으로.',
        interact: '센터장은 탭만 클릭. 데이터는 Cowork+ 운영 데이터에서 자동 적재.',
        feel: [
          '"엑셀 취합 시대 종료"',
          '청중: "이게 진짜 운영 데이터다"',
        ],
        connect: ['Ch.5의 셀프 조회 + Ch.7의 읽음 추적 데이터가 모두 여기에 합류'],
      },
    },
    {
      index: 1,
      activeCastId: 'choi-cm',
      guide: 'BR별 탭으로 전환 — 인센티브 후보 자동 도출.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-incentive',
              kind: 'system',
              text: '🏆 인센티브 후보 3명 자동 도출 — 김경화, 이과장, 박효성',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'dashboard',
        dashboard: dashboardBr,
      },
      presets: [
        {
          id: 'admin-export',
          text: '인센티브 산정 자료 PDF 자동 생성',
          kind: 'admin',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 인센티브의 근거',
        meta: 'Cowork+ · BR 성과',
        situation:
          '"누구한테 인센티브 줄지 어떻게 정하시나요?" → "Cowork+ BR 대시보드 보세요"라고 한 줄로 답변.',
        interact: '센터장이 BR 탭 클릭. 자동으로 산정 근거 카드 등장.',
        feel: [
          '"인센티브에 시비 없을 정량 근거"',
          '청중: BR 본인도 자기 데이터를 본다',
          '"본부장님께 보고 자료 5분 만에 완성"',
        ],
        connect: ['이 정량 데이터가 분기 운영 회의의 표준 자료가 됨'],
      },
    },
    {
      index: 2,
      activeCastId: 'choi-cm',
      guide: '챕터 마감 — 분기 정산 보고가 5분 만에 완료.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '에이원오토 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-done',
              kind: 'system',
              text: '✅ 분기 BR 성과 보고서 PDF 자동 생성 완료 (08-Q3-perf.pdf)',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'dashboard',
        dashboard: dashboardBr,
      },
      presets: [],
      memo: {
        title: 'STATE 2 — 4막 결제 모먼트',
        meta: 'Cowork+ · 운영자에게 데이터를 돌려준다',
        situation:
          'Ch.1~Ch.7에서 발생한 모든 운영 데이터가 한 화면의 정량 자료로 응축. B2B 임원의 결제 버튼이 눌리는 지점.',
        interact: '대시보드 → PDF 자동 생성 → 본부장 보고. 5분 안에 끝남.',
        feel: [
          '운영자: "내가 본부장님께 숫자로 보고할 수 있다"',
          '청중: "이게 우리가 사야 하는 이유"',
          '"엑셀 시트 모으던 한 주가 5분으로"',
        ],
        connect: [
          '플랫폼 가치의 정점 — Plan §IV "정착(Settle)" 막의 정의',
          'ROI 패널 6칩 — 측정 기준 곧 공개',
        ],
      },
    },
  ],
};
