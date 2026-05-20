import type { Chapter, WonTalkConsoleState } from '../../_types';

const baseAg: WonTalkConsoleState = {
  activeTab: 'ag',
  dateRangeLabel: '2026.02.15 ~ 05.13',
  topbarTag: 'AG사별',
};

const baseAgWithDrill: WonTalkConsoleState = {
  ...baseAg,
  expandedAgId: 'gnea',
};

const baseAgWithSecModal: WonTalkConsoleState = {
  ...baseAg,
  openModalId: 'sec',
};

const baseBr: WonTalkConsoleState = {
  activeTab: 'br',
  dateRangeLabel: '2026.02.15 ~ 05.13',
  topbarTag: 'BR별',
};

const baseBrWithModal: WonTalkConsoleState = {
  ...baseBr,
  openModalId: 'br-kkh',
};

export const chapter08Dashboard: Chapter = {
  id: 8,
  act: 4,
  title: '이번 달 누가 제일 잘했는지, 데이터로',
  subtitle:
    '센터장의 채널 운영 대시보드 — KPI · 생산성 · 인사이트 · 추이가 한 화면에',
  narration:
    '센터장은 분기마다 AG사와 BR 성과를 정량 비교해야 합니다. WON TALK Console은 운영 중에 발생한 모든 데이터를 한 화면의 결재 자료로 응축해서 보여줍니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'choi-cm',
      guide:
        '센터장이 WON TALK 채널 운영 대시보드를 엽니다 — KPI 3종 + 생산성 배너 + 인사이트 3종 + 추이 4차트.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-dash-open',
              kind: 'system',
              text: '📊 센터장이 채널 운영 대시보드를 조회 중입니다.',
              meta: { tone: 'muted' },
            },
          ],
        },
      },
      workspace: {
        mode: 'console',
        console: baseAg,
      },
      presets: [
        {
          id: 'admin-drill-ag',
          text: '지엔에이 AG사 클릭 — 드릴다운',
          kind: 'admin',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 채널 운영 대시보드 전체 뷰',
        meta: '최센터장 · 관리자 시점',
        situation:
          'KPI 3종(메시지 129,511 / 응답 1h 42m / SLA 94.3%) + 생산성 배너(1인 담당 AG 190→261) + 인사이트(민감거래 9,799 / 문서 14,717 / 채널 전환 3,658) + 추이 4차트가 한 화면.',
        interact: '청중에게 "엑셀 취합 시대 종료"를 시각적으로 전달.',
        feel: [
          '"이 한 화면이 분기 운영 회의의 표준 자료"',
          '청중: "이게 진짜 운영 데이터다"',
        ],
        connect: ['Ch.5의 셀프 조회 + Ch.7의 읽음 추적 데이터가 모두 여기에 합류'],
      },
    },
    {
      index: 1,
      activeCastId: 'choi-cm',
      guide:
        '지엔에이 AG사 카드 클릭 — 비밀/파일/SLA/담당 BR + 최근 14일 추이까지 그 자리에서 드릴다운.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-drill',
              kind: 'system',
              text: '🔍 지엔에이 AG사 상세 — 비밀 198 · 파일 189 · SLA 96.2% · BR 4명',
              meta: { tone: 'muted' },
            },
          ],
        },
      },
      workspace: {
        mode: 'console',
        console: baseAgWithDrill,
      },
      presets: [
        {
          id: 'admin-open-sec',
          text: '비밀 메시지 인사이트 카드 클릭 → 상세',
          kind: 'admin',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — AG 드릴다운',
        meta: '지엔에이 AG사 (2,624건)',
        situation:
          '클릭 한 번에 AG사 단위 운영 상태(비밀/파일/SLA/BR 수 + 14일 추이) 가시화. 별도 시트·BI 도구 없음.',
        interact: '청중에게 "엑셀 합치는 한 주가 한 번의 클릭으로"를 시연.',
        feel: [
          '"AG사별 협상 자료 즉시 준비"',
          '"BR 4명 누가 응대하는지도 즉시 확인"',
        ],
        connect: ['Ch.6의 비밀 메시지 흐름이 이 카드에 합쳐 보여짐'],
      },
    },
    {
      index: 2,
      activeCastId: 'choi-cm',
      guide:
        '비밀 메시지 인사이트 카드 → 모달. 9,799건의 민감 거래가 안전하게 보호 중인 규모.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-sec-open',
              kind: 'system',
              text: '🔒 민감 거래 보호 규모 — 수수료율·특판 조건 협의 통합',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'console',
        console: baseAgWithSecModal,
      },
      presets: [
        {
          id: 'admin-switch-br',
          text: 'BR별 탭으로 전환 — 누가 잘했는지 본다',
          kind: 'admin',
          nextStateIndex: 3,
        },
      ],
      memo: {
        title: 'STATE 2 — 민감 거래 보호 규모',
        meta: '비밀 메시지 9,799건 (전체 7.6%)',
        situation:
          '카카오 단톡에서는 새어나가던 수수료율·특판 조건 협의가 WON TALK 비밀 채널로 안전하게 처리. 매출 직결 거래 14,717건 중 핵심 9,799건.',
        interact: '청중: "이 정도 거래가 안 보였다는 거네?"',
        feel: [
          '"보이지 않던 협상 통제권 회복"',
          'B2B 임원의 결제 트리거 — 보안 + 정량 증거',
        ],
        connect: ['Ch.6 비밀 메시지의 운영적 가치가 여기서 정량화됨'],
      },
    },
    {
      index: 3,
      activeCastId: 'choi-cm',
      guide:
        'BR별 탭으로 전환 — 인센티브 후보가 SLA·메시지량·담당 AG 기반으로 자동 도출.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-incentive',
              kind: 'system',
              text: '🏆 BR 6명 자동 정렬 — SLA·메시지량·담당 AG 기준',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'console',
        console: baseBr,
      },
      presets: [
        {
          id: 'admin-open-br',
          text: '김경화 BR 클릭 → 상세',
          kind: 'admin',
          nextStateIndex: 4,
        },
      ],
      memo: {
        title: 'STATE 3 — BR 성과 격자',
        meta: 'BR 14명 · 1인당 평균 4,551 msg/일',
        situation:
          '"누구한테 인센티브 줄지 어떻게 정하시나요?" → "WON TALK BR 격자 보세요"로 한 줄 답변.',
        interact: '센터장이 BR 탭 클릭. 자동 산정 근거 카드 6장.',
        feel: [
          '"인센티브에 시비 없을 정량 근거"',
          'BR 본인도 자기 데이터를 본다',
        ],
        connect: ['이 정량 데이터가 분기 운영 회의의 표준 자료가 됨'],
      },
    },
    {
      index: 4,
      activeCastId: 'choi-cm',
      guide:
        '김경화 BR 상세 — 총 메시지 18,420 · 비밀 1,482 · SLA 97.2%. 본부장 보고에 그대로 사용.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'sys-done',
              kind: 'system',
              text: '✅ BR 성과 보고 자료 — SLA 97.2% · 비밀 메시지 비율 8.0%',
              meta: { tone: 'good' },
            },
          ],
        },
      },
      workspace: {
        mode: 'console',
        console: baseBrWithModal,
      },
      presets: [],
      memo: {
        title: 'STATE 4 — 4막 결제 모먼트',
        meta: 'Cowork+ · 운영자에게 데이터를 돌려준다',
        situation:
          'Ch.1~Ch.7에서 발생한 모든 운영 데이터가 한 화면의 정량 자료로 응축. B2B 임원의 결제 버튼이 눌리는 지점.',
        interact: '대시보드 → BR 상세 → PDF/엑셀 추출 → 본부장 보고. 5분 이내.',
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
