import type {
  Chapter,
  PartnerListItem,
  SalesBridgeBubbleSender,
  SalesBridgeChatMessage,
} from '../../_types';
import parkAvatar from '../assets/park.png';

const PARTNERS_FULL: PartnerListItem[] = [
  { id: 'miu', label: '미우케이블', sub: '박대표 외 · 8명', status: 'live' },
  { id: 'daedong', label: '대동케이블판매', sub: '박부장 · 7명', status: 'live' },
  { id: 'rims', label: '림스케이블', sub: '신차장 · 8명', status: 'live' },
  { id: 'keumho', label: '금호', sub: '이대리 · 6명', status: 'live' },
  { id: 'daon', label: '다온케이블', sub: '4명', status: 'live' },
  { id: 'yuhan', label: '유한이앤씨', sub: '5명', status: 'live' },
];

const CLOCK_DATE = '2026-03-03 (화)';

const PARK_REP: SalesBridgeBubbleSender = {
  id: 'park-rep',
  label: '박대표',
  initial: '박',
  color: '#C9302C',
  badge: '미우케이블 · Guest',
  avatarSrc: parkAvatar,
  org: '미우케이블',
};

const M_OPENING: SalesBridgeChatMessage = {
  kind: 'date',
  text: '2026년 3월 3일 (화)',
};

const M_PARK_GREETING: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm1',
  sender: PARK_REP,
  text:
    '안녕하세요, 강승희님. 미우케이블 박대표입니다. CV-A001 신규 발주 건 견적 부탁드리겠습니다.',
  time: '오후 2:00',
};

const M_PARK_BIZFORM: SalesBridgeChatMessage = {
  kind: 'bizform',
  id: 'm2',
  sender: PARK_REP,
  title: '비즈폼 · 견적 신청서',
  statusLabel: '접수됨',
  fields: [
    { label: '거래처', value: '미우케이블 (Guest 인증)' },
    { label: '품번', value: 'CV-A001' },
    { label: '품명', value: '가공동선' },
    { label: '단가', value: '₩1,000', auto: true, highlight: true },
    { label: '수량', value: '5,000m' },
    { label: '납기 희망', value: '2026-03-18' },
  ],
  time: '오후 2:00',
};

const M_SYS_MAPPING: SalesBridgeChatMessage = {
  kind: 'system',
  id: 'm3',
  tone: 'brand',
  text:
    '⚡ 거래처 단가 DB에서 미우케이블 CV-A001 단가 ₩1,000 자동 매핑 — 강승희님 수동 입력 불필요',
};

const M_PARK_NOTE: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm4',
  sender: PARK_REP,
  text:
    '이번 분기 발주 일정에 맞춰 처리 부탁드립니다. 견적 확인되는 대로 PO 진행하겠습니다.',
  time: '오후 2:01',
};

const MIU_INFO_BASE = {
  partnerName: '미우케이블',
  partnerTone: 'miu' as const,
  partnerSize: '중소',
  contractPrice: { code: 'CV-A001 (가공동선)', value: '₩1,000' },
  contractDate: '2025-04-22 갱신',
  recentHistory: [
    { date: '09/19', label: '견적 발송 (CV-A001 · 3,000m)', tone: 'good' as const },
    { date: '10/12', label: '발주 확정 (CV-A002)', tone: 'good' as const },
    { date: '11/18', label: '단가 노출 사고 (SCENE 0)', tone: 'warn' as const },
  ],
};

const CHAT_HEADER_MIU = {
  partnerLabel: '미우케이블 박대표',
  partnerSub: '비즈폼 · 견적 응대 · 거래처-단가 자동 매핑',
  partnerAvatar: '미',
  partnerAvatarTone: 'miu' as const,
  guestBadge: 'Guest',
};

export const scene2Launch: Chapter = {
  id: 2,
  act: 4,
  title: '본 오픈 첫날, 138명 100% 입장',
  subtitle: '2026.03.03 · 거래처 57개 / 138명 100% 인증 입장 · 비즈폼 자동 매핑',
  narration:
    '카오스를 인정한 다음 가온전선이 한 일은 거버넌스입니다. 2026년 3월 3일 화요일 본 오픈 첫날, 57개 거래처의 138명 전원이 인증 후 단일 Cowork+ 워크스페이스에 입장. 퇴사자·외부인은 자동 차단되고, 박대표의 비즈폼 견적은 거래처-단가가 자동 매핑되어 손이 안 듭니다.',
  stage: 'salesbridge-workspace',
  states: [
    // STATE 0 — Intro: 통합 화면 첫 등장
    {
      index: 0,
      phones: undefined,
      pauseAfterMs: 4500,
      revealRhythm: 'natural',
      guide:
        '4개월 후. SCENE 0의 카톡 6창·Excel·푸시 알림이 한 화면 Cowork+ 통합 워크스페이스로 압축되었습니다.',
      salesbridge: {
        clockTime: '09:00',
        clockDate: CLOCK_DATE,
        topBanner: '🎉 본 오픈 첫날 · 2026.03.03 (화)',
        topMeta: '거래처 57개 · 직원 138명 · 인증 후 입장',
        partnerList: [],
        partnerListMeta: '거래처 입장 대기 중',
        liveCounter: { current: 0, total: 138, label: '거래처 직원 입장' },
        mainContent: {
          kind: 'live-counter',
          liveCounter: {
            current: 0,
            total: 138,
            label: '본 오픈 첫날 — 거래처 입장 대기 중',
            sublabel: '57개 거래처의 138명이 Cowork+로 입장합니다.',
          },
        },
        toast: {
          title: '영업 본부장 격려',
          body: '"승희야, 오늘부터 Cowork+야. 잘 부탁한다."',
          tone: 'system',
        },
        badgeMessage: '본 오픈 진행 중',
      },
      memo: {
        title: 'STATE 1 — 통합 화면 첫 등장',
        meta: '09:00 · 본 오픈',
        situation: 'SCENE 0의 카톡 6창·Excel·푸시 알림 → 한 화면 Cowork+로 시각 전환.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"카톡 6창이 어디 갔지?"', '"화면이 이렇게 깔끔해질 수 있구나"'],
        connect: ['→ 138명 입장 라이브'],
      },
    },

    // STATE 1 — 138명 입장 라이브 시작
    {
      index: 1,
      phones: undefined,
      pauseAfterMs: 4000,
      revealRhythm: 'natural',
      salesbridge: {
        clockTime: '09:08',
        clockDate: CLOCK_DATE,
        topBanner: '🎉 본 오픈 첫날 · 거래처 입장 라이브',
        topMeta: '실시간 입장 중',
        liveCounter: { current: 67, total: 138, label: '거래처 직원 입장' },
        partnerList: PARTNERS_FULL.slice(0, 4),
        partnerListMeta: '23 → 67 → 124 → 138 (실시간)',
        mainContent: {
          kind: 'live-counter',
          liveCounter: {
            current: 67,
            total: 138,
            label: '거래처 직원 입장 중',
            sublabel: '57개 거래처 중 28개 완료 · 23명 추가 입장 중',
          },
        },
        badgeMessage: '거래처 입장 중',
      },
      memo: {
        title: 'STATE 2 — 138명 입장 라이브',
        meta: '09:08',
        situation: '카운터가 실시간으로 증가. 좌측 거래처 목록에 거래처들이 차례로 추가됨.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"138명이 한 시스템 안에"', '"실제 운영 중"'],
        connect: ['→ 입장 완료 후 첫 응대'],
      },
    },

    // STATE 2 — 138/138 입장 완료
    {
      index: 2,
      phones: undefined,
      pauseAfterMs: 4000,
      revealRhythm: 'natural',
      salesbridge: {
        clockTime: '09:15',
        clockDate: CLOCK_DATE,
        topBanner: '✅ 거래처 138명 전체 입장 완료',
        topMeta: '57개 거래처 · 단일 워크스페이스 · 인증된 직원만',
        liveCounter: { current: 138, total: 138, label: '거래처 직원 입장' },
        partnerList: PARTNERS_FULL,
        partnerListMeta: '57개 거래처 활성',
        mainContent: {
          kind: 'live-counter',
          liveCounter: {
            current: 138,
            total: 138,
            label: '138명 / 138명 입장 완료',
            sublabel: '57개 거래처가 Cowork+ 워크스페이스에 진입했습니다. 퇴사자·외부인 자동 차단.',
            completedNote: '✓ 본 오픈 첫날 안정화 · 일 평균 651건 메시지',
          },
        },
        badgeMessage: '본 오픈 완료',
      },
      memo: {
        title: 'STATE 3 — 입장 완료',
        meta: '09:15',
        situation:
          '거래처 138명 전체가 한 시스템에 입장. 퇴사자·외부인은 자동 차단. 단톡방 정리 문제가 시스템 차원으로 해결.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"이제 모든 거래처가 같은 화면에"', '"단톡방 멤버 정리가 시스템 차원이구나"'],
        connect: ['→ 박대표 재등장 · 비즈폼 견적 신청'],
      },
    },

    // STATE 3 — 박대표 비즈폼 견적 신청
    {
      index: 3,
      phones: undefined,
      pauseAfterMs: 4500,
      revealRhythm: 'natural',
      advanceOn: [{ target: 'partner:miu', nextStateIndex: 4 }],
      salesbridge: {
        clockTime: '14:00',
        clockDate: CLOCK_DATE,
        topBanner: '📩 미우케이블 박대표 — 비즈폼 견적 신청',
        topMeta: '같은 거래처, 같은 견적, 4개월 만에 다시',
        partnerList: PARTNERS_FULL.map((p) =>
          p.id === 'miu' ? { ...p, pulse: true, badge: 1 } : p,
        ),
        partnerListMeta: '미우케이블 · 1건 신규 요청',
        mainContent: {
          kind: 'empty',
        },
        toast: {
          title: '📩 미우케이블 박대표',
          body: 'CV-A001 견적 신청서가 도착했습니다. (오후 2:00)',
          tone: 'system',
        },
        badgeMessage: '미우케이블 응대 대기',
      },
      guideTooltip: {
        target: 'partner:miu',
        text: '좌측 거래처 목록에서 미우케이블을 클릭해 응대 시작',
      },
      memo: {
        title: 'STATE 4 — 박대표 재등장',
        meta: '14:00',
        situation: '같은 박대표(미우케이블)가 비공식 단톡방이 아닌 공식 비즈폼으로 견적 신청.',
        interact: '거래처 목록의 미우케이블 클릭 → STATE 5.',
        feel: ['"또 이 박대표 — 그러나 이번엔 공식 채널"'],
        connect: ['→ 자동 단가 매핑'],
      },
    },

    // STATE 4 — 자동 매핑 + 견적 흐름
    {
      index: 4,
      phones: undefined,
      pauseAfterMs: 6000,
      revealRhythm: 'natural',
      moment: {
        kind: 'auto-mapping',
        payload: {
          field: '단가',
          value: '₩1,000',
          detail: '미우케이블 CV-A001 단가 자동 매핑 — 수동 입력 불필요',
        },
      },
      salesbridge: {
        clockTime: '14:01',
        clockDate: CLOCK_DATE,
        topBanner: '⚡ 시스템 자동 단가 매핑 완료',
        topMeta: '거래처-단가 자동 검증 · 사람 손이 안 든다',
        partnerList: PARTNERS_FULL.map((p) => (p.id === 'miu' ? { ...p, badge: 0 } : p)),
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [
              M_OPENING,
              M_PARK_GREETING,
              M_PARK_BIZFORM,
              M_SYS_MAPPING,
              M_PARK_NOTE,
            ],
          },
        },
        rightPanel: MIU_INFO_BASE,
        badgeMessage: '미우케이블 응대 중 · 자동 매핑 ✓',
      },
      memo: {
        title: 'STATE 5 — 자동 매핑',
        meta: '14:01',
        situation:
          '대화방 안에서 박대표 인사 → 비즈폼 카드 메시지 → 시스템 매핑 노트 → 후속 메시지가 한 흐름으로 흐름. SCENE 0의 수동 단가 입력이 통째로 제거됨.',
        interact: '관찰 STATE. 다음 → SCENE 3에서 사고 사전 차단 시연.',
        feel: ['"비즈폼이 대화 안의 한 말풍선처럼 자연스럽다"', '"수동 입력이 자동으로"'],
        connect: ['→ SCENE 3 (사고 사전 차단 — 자동 매핑)'],
      },
    },
  ],
  onComplete: { nextChapter: 3, demoAutoAdvance: false },
};
