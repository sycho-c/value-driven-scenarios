import type {
  Chapter,
  PartnerListItem,
  SalesBridgeBubbleSender,
  SalesBridgeChatMessage,
} from '../../_types';

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
};

const KANG: SalesBridgeBubbleSender = {
  id: 'kang-sahoo',
  label: '강승희',
  initial: '강',
  color: '#5B3FE4',
};

// Reusable message blocks so STATE 4/5/6 stay consistent
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

const M_KANG_RECEIVED: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm5',
  sender: KANG,
  isMine: true,
  text:
    '박대표님, 확인했습니다. 단가표 검토하고 견적서 작성해서 바로 송부드리겠습니다.',
  time: '오후 2:03',
};

const M_FILE_CHOICES: SalesBridgeChatMessage = {
  kind: 'file-choices',
  id: 'm6',
  sender: KANG,
  isMine: true,
  title: '📎 첨부 파일 선택',
  caption: '거래처-파일 검증 진행 중 — 미우케이블 양식인지 확인합니다.',
  choices: [
    {
      id: 'quote-miu',
      name: '견적서_미우_v3.xlsx',
      note: '미우케이블 양식 · 단가 ₩1,000 / 5,000m',
      valid: true,
    },
    {
      id: 'quote-daedong',
      name: '견적서_대동_v3.xlsx',
      note: '대동케이블판매 양식 — 발신 거래처 불일치',
      valid: false,
      pulse: true,
    },
  ],
  time: '오후 2:05',
};

const M_FILE_CHOSEN: SalesBridgeChatMessage = {
  kind: 'file-choices',
  id: 'm6',
  sender: KANG,
  isMine: true,
  title: '📎 첨부 파일 선택',
  caption: '올바른 파일이 선택되었습니다 — 거래처-파일 일치 확인.',
  choices: [
    {
      id: 'quote-miu',
      name: '견적서_미우_v3.xlsx',
      note: '미우케이블 양식 · 14KB · 검증 통과',
      valid: true,
    },
  ],
};

const M_SYS_VERIFY: SalesBridgeChatMessage = {
  kind: 'system',
  id: 'm7',
  tone: 'good',
  text:
    '✓ 거래처-파일 검증 통과 — 견적서_미우_v3.xlsx · CRM 이력에 자동 기록',
};

const M_ATTACHMENT_SENT: SalesBridgeChatMessage = {
  kind: 'attachment',
  id: 'm8',
  sender: KANG,
  isMine: true,
  fileName: '견적서_미우_v3.xlsx',
  fileSize: '14KB',
  fileType: 'xls',
  status: 'sent',
  time: '오후 2:06',
};

const M_KANG_SEND_NOTE: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm9',
  sender: KANG,
  isMine: true,
  text:
    '박대표님, 견적서 송부드립니다. CV-A001 · ₩1,000 · 5,000m · 납기 3월 18일 기준입니다. 검토 후 PO 회신 부탁드리겠습니다.',
  time: '오후 2:06',
};

const M_PARK_CLOSE: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm10',
  sender: PARK_REP,
  text:
    '강승희님, 잘 받았습니다. 내부 검토 후 오늘 중으로 PO 회신드리겠습니다. 빠른 처리 감사합니다.',
  time: '오후 2:07',
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
    { date: '11/18', label: '단가 노출 사고 (Ch.1)', tone: 'warn' as const },
  ],
};

const CHAT_HEADER_MIU = {
  partnerLabel: '미우케이블 박대표',
  partnerSub: '비즈폼 · 견적 응대 · 거래처-단가 자동 매핑',
  partnerAvatar: '미',
  partnerAvatarTone: 'miu' as const,
  guestBadge: 'Guest',
};

export const chapter02LaunchDay: Chapter = {
  id: 2,
  act: 4,
  title: '본 오픈 첫날',
  subtitle: '4개월 후 — 같은 거래처, 같은 견적, 다른 결과.',
  narration:
    '2026년 3월 3일 화요일. DWorks Cowork+가 본 오픈한 첫날. 강승희의 PC 화면은 카톡 6창이 아니라 DWorks Cowork+ 통합 워크스페이스 하나로 단순해졌습니다. 같은 박대표가 같은 CV-A001 견적을 다시 요청 — 그러나 이번엔 자동 매핑 + 사전 차단으로 사고가 일어날 수 없는 환경.',
  stage: 'salesbridge-workspace',
  states: [
    // STATE 0 — Intro
    {
      index: 0,
      phones: undefined,
      guide:
        '4개월 후. 같은 강승희 PC, 그러나 카톡 6창이 사라지고 DWorks Cowork+ 통합 워크스페이스 하나가 화면 전체를 차지합니다.',
      salesbridge: {
        clockTime: '09:00',
        clockDate: CLOCK_DATE,
        topBanner: '🎉 본 오픈 첫날 · 2026.03.03 (화)',
        topMeta: '거래처 57개 · 직원 138명',
        partnerList: [],
        partnerListMeta: '거래처 입장 대기 중',
        liveCounter: { current: 0, total: 138, label: '거래처 직원 입장' },
        mainContent: {
          kind: 'live-counter',
          liveCounter: {
            current: 0,
            total: 138,
            label: '본 오픈 첫날 — 거래처 입장 대기 중',
            sublabel: '57개 거래처의 138명이 DWorks Cowork+로 입장합니다.',
          },
        },
        toast: {
          title: '영업 본부장 격려',
          body: '"승희야, 오늘부터 DWorks Cowork+야. 잘 부탁한다."',
          tone: 'system',
        },
        badgeMessage: '본 오픈 진행 중',
      },
      memo: {
        title: 'STATE 1 — 통합 화면 첫 등장',
        meta: '09:00 · 본 오픈',
        situation: 'Ch.1의 카톡 6창·Excel·푸시 알림 → 한 화면 DWorks Cowork+로 시각 전환.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"카톡 6창이 어디 갔지?"', '"화면이 이렇게 깔끔해질 수 있구나"'],
        connect: ['→ 138명 입장 라이브'],
      },
    },

    // STATE 1 — 138명 입장 라이브 시작
    {
      index: 1,
      phones: undefined,
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
      salesbridge: {
        clockTime: '09:15',
        clockDate: CLOCK_DATE,
        topBanner: '✅ 거래처 138명 전체 입장 완료',
        topMeta: '57개 거래처 · 단일 워크스페이스',
        liveCounter: { current: 138, total: 138, label: '거래처 직원 입장' },
        partnerList: PARTNERS_FULL,
        partnerListMeta: '57개 거래처 활성',
        mainContent: {
          kind: 'live-counter',
          liveCounter: {
            current: 138,
            total: 138,
            label: '138명 / 138명 입장 완료',
            sublabel: '57개 거래처가 DWorks Cowork+ 워크스페이스에 진입했습니다.',
            completedNote: '✓ 본 오픈 첫날 안정화',
          },
        },
        badgeMessage: '본 오픈 완료',
      },
      memo: {
        title: 'STATE 3 — 입장 완료',
        meta: '09:15',
        situation: '거래처 138명 전체가 한 시스템에 입장. 단일 워크스페이스로 통합 운영 가능 상태.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"이제 모든 거래처가 같은 화면에"', '"카톡 6창 시절은 끝났다"'],
        connect: ['→ 박대표(미우) 재등장 → Ch.1 사고의 회수'],
      },
    },

    // STATE 3 — 박대표 비즈폼 견적 신청 (Toast 가운데 + 본문 빈 채팅 헤더)
    {
      index: 3,
      phones: undefined,
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

    // STATE 4 — 자동 매핑 (채팅 스레드 진입)
    {
      index: 4,
      phones: undefined,
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
          '대화방 안에서 박대표 인사 → 비즈폼 카드 메시지 → 시스템 매핑 노트 → 후속 메시지가 한 흐름으로 흐름. Ch.1의 수동 단가 입력이 통째로 제거됨.',
        interact: '관찰 STATE. → 키 또는 다음 → STATE 6.',
        feel: ['"비즈폼이 대화 안의 한 말풍선처럼 자연스럽다"', '"수동 입력이 자동으로"'],
        connect: ['→ 사고 사전 차단 — 같은 시도가 어떻게 다른 결과로?'],
      },
    },

    // STATE 5 — 사고 사전 차단 (file-choices 버블 + 모달 자동 노출)
    {
      index: 5,
      phones: undefined,
      advanceOn: [
        { target: 'modal:confirm', nextStateIndex: 6 },
        { target: 'file:quote-miu', nextStateIndex: 6 },
      ],
      salesbridge: {
        clockTime: '14:05',
        clockDate: CLOCK_DATE,
        topBanner: '🚫 거래처 불일치 — 시스템 사전 차단',
        topMeta: 'Ch.1 클라이맥스의 회수 — 같은 실수, 다른 결과',
        partnerList: PARTNERS_FULL,
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
              M_KANG_RECEIVED,
              M_FILE_CHOICES,
            ],
          },
        },
        rightPanel: MIU_INFO_BASE,
        modal: {
          title: '거래처 불일치 발견',
          body: '이 파일은 대동케이블판매 거래처 양식입니다. 현재 응대 거래처와 일치하지 않아 발송이 차단되었습니다.',
          expectedPartner: '미우케이블',
          actualPartner: '대동케이블판매',
          correctFile: '견적서_미우_v3.xlsx',
          primaryLabel: '확인 · 올바른 파일로 교체',
        },
        badgeMessage: '거래처 불일치 차단됨',
      },
      memo: {
        title: 'STATE 6 ⚡⚡ — 사고 사전 차단',
        meta: '14:05',
        situation:
          'Ch.1과 똑같이 잘못된 파일을 첨부하려는 시도. 시스템이 발신 전 거래처-파일 검증을 자동 수행하고, 대화 위에 모달로 차단 결과를 즉시 알린다.',
        interact: '→ 키 · 모달 [확인] · 미우 파일 클릭 — 세 경로 모두 STATE 7로 진행.',
        feel: ['"기능이 있고 없고가 아니라 사전 차단이 답"', '★ 결정적 깨달음'],
        connect: ['→ 안전 발송 + Ch.1 vs Ch.2 비교'],
      },
    },

    // STATE 6 — 안전한 견적 발송 + 비교 박스
    {
      index: 6,
      phones: undefined,
      salesbridge: {
        clockTime: '14:07',
        clockDate: CLOCK_DATE,
        topBanner: '✓ 안전한 견적 발송 완료',
        topMeta: 'Ch.1 1시간 사고 ↔ Ch.2 5분 처리',
        partnerList: PARTNERS_FULL,
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
              M_KANG_RECEIVED,
              M_FILE_CHOSEN,
              M_SYS_VERIFY,
              M_ATTACHMENT_SENT,
              M_KANG_SEND_NOTE,
              M_PARK_CLOSE,
            ],
          },
        },
        rightPanel: {
          ...MIU_INFO_BASE,
          recentHistory: [
            { date: '03/03', label: '견적 발송 (CV-A001 · 5,000m) ✓', tone: 'good' as const },
            ...MIU_INFO_BASE.recentHistory,
          ],
        },
        comparisonBox: {
          title: 'Ch.1 (2025.11) vs Ch.2 (2026.03)',
          subtitle: '같은 거래처 · 같은 견적 · 다른 결과',
          rows: [
            { label: '사고 발견', ch1: '6분 후 발견', ch2: '사전 차단 (0초)' },
            { label: '복구 시간', ch1: '1시간+', ch2: '해당 없음' },
            { label: '거래처 신뢰', ch1: '손상', ch2: '유지' },
            { label: '관리자 개입', ch1: '본부장까지', ch2: '없음' },
            { label: '총 처리 시간', ch1: '약 60분', ch2: '약 5분' },
          ],
        },
        badgeMessage: '✓ 발송 완료',
      },
      memo: {
        title: 'STATE 7 — 비교와 마감',
        meta: '14:07',
        situation:
          '같은 거래처·같은 견적이 5분 만에 깔끔하게 처리됨. 우상단 Ch.1 vs Ch.2 비교 박스가 시간 압축의 본질을 시각화.',
        interact: '챕터 종료. ← 키로 이전 STATE 탐색 가능.',
        feel: ['"Ch.1 1시간, Ch.2 5분 — 같은 사람, 다른 결과"', '"이게 DWorks Cowork+의 일상"'],
        connect: ['→ 사례 그리드로 돌아가 v1과 비교'],
      },
    },
  ],
  onComplete: { demoAutoAdvance: false },
};
