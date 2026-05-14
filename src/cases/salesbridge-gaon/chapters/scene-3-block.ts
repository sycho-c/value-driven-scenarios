import type {
  Chapter,
  PartnerListItem,
  SalesBridgeBubbleSender,
  SalesBridgeChatMessage,
} from '../../_types';
import kangAvatar from '../assets/kang.png';
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

const KANG: SalesBridgeBubbleSender = {
  id: 'kang-sahoo',
  label: '강승희',
  initial: '강',
  color: '#5B3FE4',
  avatarSrc: kangAvatar,
  org: '가온전선',
};

const M_OPENING: SalesBridgeChatMessage = {
  kind: 'date',
  text: '2026년 3월 3일 (화)',
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
    { label: '단가', value: '₩1,000', auto: true, highlight: true },
    { label: '수량', value: '5,000m' },
  ],
  time: '오후 2:00',
};

const M_SYS_MAPPING: SalesBridgeChatMessage = {
  kind: 'system',
  id: 'm3',
  tone: 'brand',
  text:
    '⚡ 미우케이블 CV-A001 단가 ₩1,000 자동 매핑 — 강승희님 수동 입력 불필요',
};

const M_KANG_RECEIVED: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm5',
  sender: KANG,
  isMine: true,
  text: '박대표님, 확인했습니다. 견적서 작성해서 바로 송부드리겠습니다.',
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
  text: '✓ 거래처-파일 검증 통과 — 견적서_미우_v3.xlsx · CRM 이력에 자동 기록',
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
    '박대표님, 견적서 송부드립니다. CV-A001 · ₩1,000 · 5,000m · 납기 3월 18일 기준입니다.',
  time: '오후 2:06',
};

const M_PARK_CLOSE: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm10',
  sender: PARK_REP,
  text: '강승희님, 잘 받았습니다. 내부 검토 후 오늘 중으로 PO 회신드리겠습니다.',
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
    { date: '11/18', label: 'SCENE 0 단가 노출 사고', tone: 'warn' as const },
  ],
};

const CHAT_HEADER_MIU = {
  partnerLabel: '미우케이블 박대표',
  partnerSub: '비즈폼 · 견적 응대 · 거래처-단가 자동 매핑',
  partnerAvatar: '미',
  partnerAvatarTone: 'miu' as const,
  guestBadge: 'Guest',
};

export const scene3Block: Chapter = {
  id: 3,
  act: 4,
  title: 'SCENE 3 — 그럼에도 단가 노출 사고가 일어나지 않는다',
  subtitle: '비즈폼 자동 매핑 + 거래처-파일 검증 사전 차단',
  narration:
    '강승희가 회신 견적서 파일을 첨부하려는 순간 — SCENE 0과 똑같이 폴더에 비슷한 파일이 함께 있습니다. 그러나 이번엔 시스템이 거래처-파일을 자동 검증해 잘못된 파일을 발송 전 차단합니다. 사람의 실수가 사고로 이어지지 않습니다.',
  stage: 'salesbridge-workspace',
  states: [
    // STATE 0 — 강승희 회신 준비
    {
      index: 0,
      phones: undefined,
      pauseAfterMs: 4500,
      revealRhythm: 'natural',
      guide:
        '비즈폼이 자동 매핑된 견적 신청을 받은 강승희. 회신 견적서를 첨부하려고 첨부 파일 선택지를 엽니다.',
      salesbridge: {
        clockTime: '14:03',
        clockDate: CLOCK_DATE,
        topBanner: '✉️ 강승희 — 견적서 회신 준비',
        topMeta: '거래처-파일 검증 자동 진행',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [M_OPENING, M_PARK_BIZFORM, M_SYS_MAPPING, M_KANG_RECEIVED],
          },
        },
        rightPanel: MIU_INFO_BASE,
        badgeMessage: '미우케이블 응대 중',
      },
      memo: {
        title: 'STATE 1 — 회신 준비',
        meta: '14:03',
        situation: '비즈폼이 도착하고 자동 매핑이 완료된 상태. 강승희가 견적서 회신을 시작.',
        interact: '관찰 STATE. 다음 → 잘못된 파일 첨부 시도.',
        feel: ['"단가는 이미 자동으로 들어갔다 — 사람은 파일만 첨부하면 된다"'],
        connect: ['→ 잘못된 파일 첨부 시도'],
      },
    },

    // STATE 1 — 잘못된 파일 첨부 시도 (펄스)
    {
      index: 1,
      phones: undefined,
      pauseAfterMs: 5500,
      revealRhythm: 'natural',
      advanceOn: [{ target: 'file:quote-daedong', nextStateIndex: 2 }],
      guideTooltip: {
        target: 'file:quote-daedong',
        text: '대동 파일을 클릭 — 일부러 잘못된 파일을 골라봅니다',
      },
      salesbridge: {
        clockTime: '14:05',
        clockDate: CLOCK_DATE,
        topBanner: '📎 첨부 파일 선택 — 거래처-파일 검증 진행',
        topMeta: 'SCENE 0과 같은 파일 폴더 · 다른 결과',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [
              M_OPENING,
              M_PARK_BIZFORM,
              M_SYS_MAPPING,
              M_KANG_RECEIVED,
              M_FILE_CHOICES,
            ],
          },
        },
        rightPanel: MIU_INFO_BASE,
        badgeMessage: '첨부 파일 검증 중',
      },
      memo: {
        title: 'STATE 2 — 파일 선택 (사고 시뮬레이션)',
        meta: '14:05',
        situation:
          'SCENE 0과 똑같은 폴더 — 견적서_미우_v3.xlsx와 견적서_대동_v3.xlsx가 함께 있다. 강승희가 (시연 목적) 잘못된 파일을 클릭.',
        interact: '대동 파일 클릭 → 시스템 사전 차단 모달.',
        feel: ['"같은 폴더, 같은 헷갈림 — 그러나 이번엔 시스템이 본다"'],
        connect: ['→ 거래처 불일치 사전 차단'],
      },
    },

    // STATE 2 — 사고 사전 차단 (file-blocked moment)
    {
      index: 2,
      phones: undefined,
      pauseAfterMs: 6000,
      revealRhythm: 'cinematic',
      moment: {
        kind: 'file-blocked',
        payload: {
          title: '🚫 거래처 불일치 — 사전 차단',
          body: '대동 양식 파일을 미우 거래처로 보낼 수 없습니다.',
        },
      },
      advanceOn: [
        { target: 'modal:confirm', nextStateIndex: 3 },
        { target: 'file:quote-miu', nextStateIndex: 3 },
      ],
      salesbridge: {
        clockTime: '14:05',
        clockDate: CLOCK_DATE,
        topBanner: '🚫 거래처 불일치 — 시스템 사전 차단',
        topMeta: 'SCENE 0 클라이맥스의 회수 — 같은 실수, 다른 결과',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [
              M_OPENING,
              M_PARK_BIZFORM,
              M_SYS_MAPPING,
              M_KANG_RECEIVED,
              M_FILE_CHOICES,
            ],
          },
        },
        rightPanel: MIU_INFO_BASE,
        blockedFileModal: {
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
        title: 'STATE 3 ⚡ — 사고 사전 차단',
        meta: '14:05',
        situation:
          'SCENE 0과 똑같이 잘못된 파일을 첨부하려는 시도. 시스템이 발신 전 거래처-파일 검증을 자동 수행하고, 대화 위에 모달로 차단 결과를 즉시 알린다.',
        interact: '→ 키 · 모달 [확인] · 미우 파일 클릭 — 세 경로 모두 STATE 4로 진행.',
        feel: ['"기능이 있고 없고가 아니라 사전 차단이 답"', '★ 결정적 깨달음'],
        connect: ['→ 안전 발송 + SCENE 0 vs SCENE 3 비교'],
      },
    },

    // STATE 3 — 안전한 견적 발송 + Before/After 비교
    {
      index: 3,
      phones: undefined,
      pauseAfterMs: 6500,
      revealRhythm: 'cinematic',
      salesbridge: {
        clockTime: '14:07',
        clockDate: CLOCK_DATE,
        topBanner: '✓ 안전한 견적 발송 완료',
        topMeta: 'SCENE 0 1시간 사고 ↔ SCENE 3 5분 처리',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [
              M_OPENING,
              M_PARK_BIZFORM,
              M_SYS_MAPPING,
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
        comparisonBanner: {
          title: 'SCENE 0 (도입 전) vs SCENE 3 (Cowork+ 운영)',
          subtitle: '같은 거래처 · 같은 견적 · 다른 결과',
          variant: 'top-banner',
          rows: [
            { label: '단가 입력', ch1: '사람 손 (Excel 보고 매번)', ch2: '자동 매핑' },
            { label: '파일 발송', ch1: '그대로 발송', ch2: '사전 차단' },
            { label: '사고 발견', ch1: '6분 후 발견', ch2: '사전 차단 (0초)' },
            { label: '복구 시간', ch1: '1시간+', ch2: '해당 없음' },
            { label: '관리자 개입', ch1: '본부장까지', ch2: '없음' },
          ],
        },
        badgeMessage: '✓ 발송 완료',
      },
      memo: {
        title: 'STATE 4 — 비교와 마감',
        meta: '14:07',
        situation:
          '같은 거래처·같은 견적이 5분 만에 깔끔하게 처리됨. 상단 비교 박스가 SCENE 0 (사고)와의 차이를 시각화. 사람의 실수가 사고로 이어지지 않는 구조.',
        interact: '챕터 종료 → SCENE 4로.',
        feel: ['"비즈폼이 거래처와 단가를 자동 매핑"', '"잘못된 파일은 발송 전에 시스템이 차단"'],
        connect: ['→ SCENE 4 (iPhone도, Android도, 사내 전용 앱)'],
      },
    },
  ],
  onComplete: { nextChapter: 4, demoAutoAdvance: false },
};
