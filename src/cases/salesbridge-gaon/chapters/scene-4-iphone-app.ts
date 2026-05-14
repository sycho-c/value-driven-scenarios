import type {
  Chapter,
  ChapterStateNode,
  PartnerListItem,
  PhoneScreen,
  SalesBridgeBubbleSender,
  SalesBridgeChatMessage,
} from '../../_types';
import parkAvatar from '../assets/park.png';
import kangAvatar from '../assets/kang.png';

const CLOCK_DATE = '2026-04-02 (목)';

const PARTNERS_FULL: PartnerListItem[] = [
  { id: 'miu', label: '미우케이블', sub: '박대표 외 · 4명 단체', status: 'live' },
  { id: 'daedong', label: '대동케이블판매', sub: '박부장 · 7명', status: 'live' },
  { id: 'rims', label: '림스케이블', sub: '신차장 · 8명', status: 'live' },
  { id: 'keumho', label: '금호', sub: '이대리 · 6명', status: 'live' },
];

const PARK: SalesBridgeBubbleSender = {
  id: 'park-rep',
  label: '박대표',
  initial: '박',
  color: '#C9302C',
  badge: '미우케이블 · Guest',
  avatarSrc: parkAvatar,
  org: '미우케이블',
};

const YANG: SalesBridgeBubbleSender = {
  id: 'yang-yeoneun',
  label: '양예은',
  initial: '양',
  color: '#8E44AD',
  badge: '미우케이블 · 실무',
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

const CHA: SalesBridgeBubbleSender = {
  id: 'cha-sanghoon',
  label: '차상훈',
  initial: '차',
  color: '#16A085',
  badge: '가온 외근 · iPhone',
  org: '가온전선',
};

const M_OPENING: SalesBridgeChatMessage = {
  kind: 'date',
  text: '2026년 4월 2일 (목) · 미우 단체 Cowork+ 방',
};

const M_SYS_ENTER: SalesBridgeChatMessage = {
  kind: 'system',
  id: 'm-sys-enter',
  tone: 'brand',
  text:
    '👥 미우케이블 단체 Cowork+ 방 입장 — 박대표·양예은(Guest) + 강승희·차상훈(사용자) 4명',
};

const M_PARK_TO_YANG: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm1',
  sender: PARK,
  text: '양 사원, CV-A001 수량 5,000m 발주 가능한지 확인 부탁드립니다.',
  time: '오전 10:14',
};

const M_YANG_REPLY: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm2',
  sender: YANG,
  text: '확인했습니다. 재고 충분합니다.',
  time: '오전 10:18',
};

const M_PARK_THANKS: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm3',
  sender: PARK,
  text: '감사합니다.',
  time: '오전 10:19',
};

const M_PARK_REQUEST: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm4',
  sender: PARK,
  text: '강승희님, 견적서 부탁드립니다.',
  time: '오후 1:55',
};

const M_KANG_ATTACH: SalesBridgeChatMessage = {
  kind: 'attachment',
  id: 'm5',
  sender: KANG,
  isMine: true,
  fileName: '견적서_미우_v3.xlsx',
  fileSize: '14KB',
  fileType: 'xls',
  status: 'sent',
  time: '오후 2:02',
};

const M_KANG_NOTE: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm6',
  sender: KANG,
  isMine: true,
  text: '박대표님, 견적서 송부드립니다. CV-A001 · ₩1,000 · 5,000m 기준입니다.',
  time: '오후 2:02',
};

const M_CHA_SOS: SalesBridgeChatMessage = {
  kind: 'system',
  id: 'm-sys-sos',
  tone: 'warn',
  text: '⚠️ 차상훈(iPhone)에서 파일 수신 실패 신호 — 외근 중 / 미우케이블 현장',
};

const M_CHA_DM_TEXT: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm-cha-dm',
  sender: CHA,
  text: '팀장님, 단체방 견적서가 안 열려요. 현장인데...',
  time: '오후 2:08',
};

const M_KANG_TO_LEE: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm-kang-lee',
  sender: KANG,
  isMine: true,
  text: '차상훈 사원 iPhone 파일 수신 이슈. 시스템 차원에서 해결 필요합니다.',
  time: '오후 2:10',
};

const M_CHA_OK: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm-cha-ok',
  sender: CHA,
  text: '팀장님, 앱 설치하고 단체방 들어왔어요. 파일 잘 열려요.',
  time: '오후 4:42',
};

const M_KANG_CLOSE: SalesBridgeChatMessage = {
  kind: 'text',
  id: 'm-kang-close',
  sender: KANG,
  isMine: true,
  text: '이제 외근 중에도 단체방 그대로 쓸 수 있겠네요.',
  time: '오후 4:43',
};

const MIU_INFO_BASE = {
  partnerName: '미우케이블',
  partnerTone: 'miu' as const,
  partnerSize: '중소 · 단체방 4명',
  contractPrice: { code: 'CV-A001 (가공동선)', value: '₩1,000' },
  contractDate: '2025-04-22 갱신',
  recentHistory: [
    { date: '03/03', label: 'SCENE 2 견적 발송 ✓', tone: 'good' as const },
    { date: '03/19', label: '파일명 메모 운영', tone: 'good' as const },
    { date: '04/02', label: 'iPhone 외근 수신 실패', tone: 'warn' as const },
  ],
};

const CHAT_HEADER_MIU = {
  partnerLabel: '미우케이블 단체방 (4명)',
  partnerSub: '박대표 · 양예은 (Guest) + 강승희 · 차상훈 (사용자)',
  partnerAvatar: '미',
  partnerAvatarTone: 'miu' as const,
  guestBadge: 'Guest 2',
};

const CHA_HEADER_TITLE = '미우 단체방 (4)';
const CHA_HEADER_SUB = '4명';

const CHA_PHONE_ENTERED: PhoneScreen = {
  type: 'channel-message',
  headerVariant: 'kakao',
  headerTitle: CHA_HEADER_TITLE,
  headerSubtitle: CHA_HEADER_SUB,
  meta: {
    messages: [
      { sender: 'system', text: '미우 단체 Cowork+ 방 입장 — 4명' },
      { sender: '박대표', text: '양 사원, CV-A001 수량 5,000m 확인 부탁', time: '오전 10:14' },
      { sender: '양예은', text: '재고 충분합니다.', time: '오전 10:18' },
    ],
  },
};

const CHA_PHONE_FILE_WARN: PhoneScreen = {
  type: 'channel-message',
  headerVariant: 'kakao',
  headerTitle: CHA_HEADER_TITLE,
  headerSubtitle: CHA_HEADER_SUB,
  meta: {
    messages: [
      {
        sender: '강승희',
        fileName: '견적서_미우_v3.xlsx',
        fileBadge: 'warn',
        pulseAttachment: true,
        time: '오후 2:02',
        hint: 'iPhone 카카오 상담톡 한계 — 외부 앱 공유 불가',
      },
    ],
  },
};

const CHA_PHONE_FAILED: PhoneScreen = {
  type: 'share-sheet',
  headerVariant: 'kakao',
  headerTitle: CHA_HEADER_TITLE,
  headerSubtitle: CHA_HEADER_SUB,
  meta: {
    background: {
      messages: [
        {
          sender: '강승희',
          fileName: '견적서_미우_v3.xlsx',
          fileBadge: 'warn',
          time: '오후 2:02',
        },
      ],
    },
    title: '공유',
    apps: [
      { id: 'gmail', label: 'Gmail', icon: '✉️' },
      { id: 'drive', label: 'Drive', icon: '📁' },
      { id: 'memo', label: '메모', icon: '📝' },
      { id: 'onetalk', label: '모바일원톡', icon: '🟣', disabled: true },
    ],
  },
};

const CHA_PHONE_WAITING: PhoneScreen = {
  type: 'channel-message',
  headerVariant: 'kakao',
  headerTitle: CHA_HEADER_TITLE,
  headerSubtitle: CHA_HEADER_SUB,
  meta: {
    messages: [{ sender: 'system', text: '대기 중 — 4/15 결정 회의' }],
  },
};

const CHA_PHONE_SUCCESS: PhoneScreen = {
  type: 'private-app',
  meta: {
    title: '미우 단체 Cowork+',
    sub: 'iPhone TestFlight 설치 완료 · 단체방 정상 수령',
    file: {
      name: '견적서_미우_v3.xlsx',
      memo: '미우 견적 회신 5,000m',
    },
  },
};

function makeStateBody(
  index: number,
  opts: Partial<ChapterStateNode> & { salesbridge: NonNullable<ChapterStateNode['salesbridge']> },
): ChapterStateNode {
  return {
    index,
    pauseAfterMs: 5500,
    revealRhythm: 'natural',
    ...opts,
  };
}

export const scene4IphoneApp: Chapter = {
  id: 4,
  act: 4,
  title: '그럼에도 iPhone도, Android도, 사내 전용 앱',
  subtitle:
    '4/2 외근 사건 → 4/15 결정 → 5/11 적용. iPhone·Android 섞인 환경을 사내 전용 앱으로 풀다.',
  narration:
    '가온 영업사원은 iPhone과 Android가 섞여 있습니다 — 어떤 폰을 쓸지 가온이 결정할 수 없는 환경입니다. 4월 2일 외근 사건에서 iPhone 사용자가 단체방 파일을 못 받는 문제가 드러났고, 가온은 가온 직원에게만 배포하는 사내 전용 iOS 앱을 만들었습니다. App Store 거치지 않습니다. 외부 노출 없습니다.',
  stage: 'salesbridge-workspace',
  states: [
    makeStateBody(0, {
      guide:
        '미우케이블 거래처 단체방 활성 — 4명 멤버. 차상훈은 외근 중이지만 단체방에는 입장 완료 상태.',
      phones: { cha: CHA_PHONE_ENTERED },
      phoneFrame: { tone: 'neutral' },
      salesbridge: {
        clockTime: '10:08',
        clockDate: CLOCK_DATE,
        topBanner: '👥 미우케이블 단체 Cowork+ 방 — 4명 멤버 활성',
        topMeta: '박대표 · 양예은 (Guest) + 강승희 · 차상훈 (사용자)',
        partnerList: PARTNERS_FULL.map((p) => (p.id === 'miu' ? { ...p, pulse: true } : p)),
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: { ...CHAT_HEADER_MIU, messages: [M_OPENING, M_SYS_ENTER] },
        },
        rightPanel: MIU_INFO_BASE,
        badgeMessage: '미우 단체방 활성 · 4명',
      },
      memo: {
        title: 'STATE 1 — 단체방 입장',
        meta: '10:08',
        situation: '한 거래처 단체방에 가온 사원 2명, 거래처 직원 2명이 함께 입장.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"단체방 하나에 모두가 모여 있구나"'],
        connect: ['→ STATE 2 거래처 내부 협업'],
      },
    }),

    makeStateBody(1, {
      guide:
        '단체방 안에서 박대표가 양예은(거래처 실무자)에게 사양 확인. 가온은 관찰자 — 거래처 내부 협업이 가시화된다.',
      phones: { cha: CHA_PHONE_ENTERED },
      phoneFrame: { tone: 'neutral' },
      salesbridge: {
        clockTime: '10:20',
        clockDate: CLOCK_DATE,
        topBanner: '🤝 거래처 내부 협업 — 박대표 ↔ 양예은',
        topMeta: '카톡 1:1로 일했으면 가온이 못 봤을 흐름',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [M_OPENING, M_SYS_ENTER, M_PARK_TO_YANG, M_YANG_REPLY, M_PARK_THANKS],
          },
        },
        rightPanel: MIU_INFO_BASE,
        badgeMessage: '거래처 내부 협업 관찰 중',
      },
      memo: {
        title: 'STATE 2 — 거래처 내부 협업',
        meta: '10:20',
        situation: '박대표·양예은의 사양 확인 흐름이 단체방 안에 노출. 가온은 관찰자.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"카톡 1:1로 일했으면 가온이 못 봤을 거래처 내부 협업"'],
        connect: ['→ STATE 3 견적 발송 + 수신 상태 비교'],
      },
    }),

    makeStateBody(2, {
      pauseAfterMs: 6000,
      guide:
        '강승희가 단체방에 견적서 발송. 박·양은 정상, 차상훈 iPhone만 ⚠️ — 같은 단체방인데 사용 환경 때문에 못 받는다.',
      phones: { cha: CHA_PHONE_FILE_WARN },
      phoneFrame: { tone: 'warn' },
      salesbridge: {
        clockTime: '14:02',
        clockDate: CLOCK_DATE,
        topBanner: '📩 강승희 견적서 발송 — 단체방 4명 수신 상태',
        topMeta: '박✓ 양✓ 차⚠️ — iPhone 사용자만 못 받는다',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [
              M_OPENING,
              M_SYS_ENTER,
              M_PARK_TO_YANG,
              M_YANG_REPLY,
              M_PARK_REQUEST,
              M_KANG_ATTACH,
              M_KANG_NOTE,
            ],
          },
        },
        rightPanel: MIU_INFO_BASE,
        deliveryStatus: {
          title: '단체방 수신 상태 (4명)',
          rows: [
            { id: 'park', label: '박대표 (모바일 상담톡)', status: 'ok' },
            { id: 'yang', label: '양예은 (모바일 상담톡)', status: 'ok' },
            { id: 'kang', label: '강승희 (PC Cowork+)', status: 'ok', note: '발신자' },
            {
              id: 'cha',
              label: '차상훈 (iPhone · 외근)',
              status: 'warn',
              note: '수신 미확인',
            },
          ],
        },
        badgeMessage: '단체방 수신 차이 발견',
      },
      memo: {
        title: 'STATE 3 — 견적 발송 + 수신 상태 비교',
        meta: '14:02',
        situation:
          '같은 단체방에 보낸 파일을 iPhone 사용자만 못 연다. 카카오 상담톡 spec 한계가 단체방 안에서 가시화.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"같은 단체방인데 iPhone 사용자만 ⚠️ 표시되네"'],
        connect: ['→ STATE 4 ⚡ iPhone 외근 파일 실패'],
      },
    }),

    makeStateBody(3, {
      pauseAfterMs: 6500,
      revealRhythm: 'cinematic',
      guide:
        '⚡ 차상훈 iPhone에서 파일 클릭 → 공유 시트에 모바일원톡 없음. 강승희 PC로 SOS 1:1 메시지 도착.',
      phones: { cha: CHA_PHONE_FAILED },
      phoneFrame: { tone: 'error' },
      advanceOn: [{ target: 'modal:share-fail', nextStateIndex: 4 }],
      salesbridge: {
        clockTime: '14:08',
        clockDate: CLOCK_DATE,
        topBanner: '🚨 차상훈 SOS — iPhone 파일 수신 실패',
        topMeta: '단체방까지 도착했는데 iPhone 사용자만 못 받는다',
        sosBanner: {
          title: '🚨 외근 사원 SOS',
          body: '차상훈 → "단체방 견적서가 안 열려요. 현장인데..."',
        },
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [
              M_OPENING,
              M_SYS_ENTER,
              M_PARK_REQUEST,
              M_KANG_ATTACH,
              M_KANG_NOTE,
              M_CHA_SOS,
              M_CHA_DM_TEXT,
              M_KANG_TO_LEE,
            ],
          },
        },
        rightPanel: MIU_INFO_BASE,
        shareFailureModal: {
          title: 'iPhone · 모바일원톡 공유 실패',
          body:
            '카카오 상담톡 → 모바일원톡 파일 공유는 iPhone 환경에서 지원되지 않습니다 (카카오 spec).',
          shareTargets: [
            { name: 'Gmail', icon: '✉️' },
            { name: 'Drive', icon: '📁' },
            { name: '메모', icon: '📝' },
            { name: '모바일원톡', icon: '🟣', disabled: true },
          ],
          note: '⚠️ iPhone 사용자 단체방 파일 수령 차단 — 외근 시 업무 중단',
          primaryLabel: '시스템 차원 해결 검토 →',
        },
        badgeMessage: 'iPhone 외근 수신 실패',
      },
      memo: {
        title: 'STATE 4 ⚡ — iPhone 외근 실패',
        meta: '14:08 · 2026-04-02',
        situation:
          'iPhone 환경에서 카카오 상담톡 → 모바일원톡 파일 공유가 막힌다. 한 명 문제가 아니라 가온 iPhone 사용자 모두의 페인.',
        interact: '모달 [시스템 차원 해결 검토] → STATE 5.',
        feel: [
          '★ "단체방까지 도착했는데 iPhone 사용자만 못 받는다"',
          '"가온 영업사원 중 iPhone 쓰는 사람 전부의 문제"',
        ],
        connect: ['→ STATE 5 환경→문제→해결 자동 시각화'],
      },
    }),

    makeStateBody(4, {
      pauseAfterMs: 8000,
      revealRhythm: 'cinematic',
      guide:
        '4/15 결정 회의. 사용자 환경 → 문제 → 해결 3단계가 자동 등장. App Store 거치지 않는 사내 전용 앱.',
      phones: { cha: CHA_PHONE_WAITING },
      phoneFrame: { tone: 'error' },
      advanceOn: [{ target: 'modal:auto-viz', nextStateIndex: 5 }],
      salesbridge: {
        clockTime: '15:30',
        clockDate: '2026-04-15 (화)',
        topBanner: '🧭 결정 회의 — 사내 전용 iOS 앱',
        topMeta: '통제 불가 환경 → 구조적 해결',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [M_OPENING, M_SYS_ENTER, M_KANG_ATTACH, M_KANG_NOTE, M_CHA_SOS],
          },
        },
        rightPanel: MIU_INFO_BASE,
        autoVizModal: {
          title: '환경 → 문제 → 해결',
          environmentBox: {
            title: '사용자 환경',
            left: '📱 iPhone 사용자',
            right: '🤖 Android 사용자',
            warn: '⚠️ 어떤 폰을 쓸지는 가온이 결정할 수 없는 환경',
          },
          problemBox: {
            title: '문제 발견 (4/2 외근 사건)',
            body:
              'iPhone 사용자는 카카오 상담톡 단체방 파일을 모바일원톡에서 받을 수 없음 → 외근 시 업무 중단.',
          },
          solutionBox: {
            title: '해결 (4/15 결정)',
            body: [
              '📦 Cowork+ 사내 전용 앱 (iOS)',
              '✓ 가온전선 직원에게만 배포 (App Store 거치지 않음)',
              '✓ iPhone 사용자도 단체방 파일 정상 수령',
              '✓ 외부 노출 없음 · 사내 환경에서 안전',
            ],
          },
          ctaLabel: '5/11 TestFlight 진입 →',
        },
        badgeMessage: '환경→문제→해결 자동 시각화',
      },
      memo: {
        title: 'STATE 5 — 자동 시각화 3단계',
        meta: '15:30 · 2026-04-15',
        situation: '환경, 문제, 해결 3박스가 자동 등장. 청중이 5초 안에 이해.',
        interact: '[5/11 TestFlight 진입] → STATE 6.',
        feel: [
          '"어떤 폰 쓸지 가온이 결정 못 한다 → iOS 앱이 자명한 해결"',
          '"한 명을 위해서가 아니라, 영업 조직 환경 전체를 풀었다"',
        ],
        connect: ['→ STATE 6 TestFlight + Before/After'],
      },
    }),

    makeStateBody(5, {
      pauseAfterMs: 7000,
      revealRhythm: 'cinematic',
      guide:
        '5/11 TestFlight 진입. 차상훈 iPhone에 Cowork+ 사내 전용 앱 설치. 같은 견적서를 정상 수령.',
      phones: { cha: CHA_PHONE_SUCCESS },
      phoneFrame: { tone: 'success' },
      salesbridge: {
        clockTime: '16:42',
        clockDate: '2026-05-11 (월)',
        topBanner: '✅ TestFlight 진입 — 단체방 빈자리 채워짐',
        topMeta: 'iPhone 사용자도 외근 중 단체방 그대로 사용',
        partnerList: PARTNERS_FULL,
        activePartnerId: 'miu',
        mainContent: {
          kind: 'chat',
          chat: {
            ...CHAT_HEADER_MIU,
            messages: [
              M_OPENING,
              M_SYS_ENTER,
              M_KANG_ATTACH,
              M_KANG_NOTE,
              M_CHA_OK,
              M_KANG_CLOSE,
            ],
          },
        },
        rightPanel: MIU_INFO_BASE,
        comparisonBox: {
          title: 'Before vs After (단체방 운영)',
          subtitle: 'iPhone 외근 사원도 단체방 그대로',
          rows: [
            { label: '사용 환경', ch1: 'iPhone 카카오', ch2: '사내 전용 앱' },
            { label: '파일 수신', ch1: '실패 ✗', ch2: '정상 ✓' },
            { label: '외근 사용', ch1: 'SOS', ch2: '즉시' },
            { label: '배포 방식', ch1: '—', ch2: '가온 직원만 (App Store ✗)' },
          ],
        },
        badgeMessage: '✓ 단체방 빈자리 채움',
      },
      memo: {
        title: 'STATE 6 — TestFlight + Before/After',
        meta: '16:42 · 2026-05-11',
        situation:
          '사내 전용 앱으로 단체방 빈자리가 채워짐. iPhone 외근 사원도 단체방을 그대로 사용.',
        interact: '챕터 종료. → SCENE 5로.',
        feel: [
          '"통제 불가 환경에서 단체방을 지킨 방법"',
          '"한 명의 페인 = 영업 조직 인프라 결정"',
        ],
        connect: ['→ SCENE 5 (분석이 곧 개선이 된다)'],
      },
    }),
  ],
  onComplete: { nextChapter: 5, demoAutoAdvance: false },
};
