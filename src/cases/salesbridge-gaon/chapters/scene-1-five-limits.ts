import type { Chapter, ChapterStateNode, PhoneScreen } from '../../_types';

const NORMAL_LABEL = '🛣️ 일반도로';
const HIGHWAY_LABEL = '🛤️ 고속도로';
const BUS_LABEL = '🚌 버스전용';

const NORMAL_PRODUCT = '카카오톡 단체방';
const HIGHWAY_PRODUCT = '카카오 상담톡';
const BUS_PRODUCT = 'Cowork+';

const NORMAL_HEADER_TITLE = '가온 미우 단톡방 (8)';
const NORMAL_HEADER_SUB = '8명';
const HIGHWAY_HEADER_TITLE = '가온전선';
const HIGHWAY_HEADER_SUB = '공식 채널';
const BUS_HEADER_TITLE = '가온전선';
const BUS_HEADER_SUB = '공식 채널';

const STATE0_NORMAL: PhoneScreen = {
  type: 'channel-message',
  channelLabel: NORMAL_LABEL,
  headerTitle: NORMAL_HEADER_TITLE,
  headerSubtitle: NORMAL_HEADER_SUB,
  channelProduct: NORMAL_PRODUCT,
  headerVariant: 'kakao',
  resultBadge: { tone: 'good', text: '✓ 프로필+이름 정상' },
  meta: {
    messages: [
      {
        sender: '강승희',
        text: '박대표님, CV-A001 ₩1,000입니다',
        hint: '오전 11:08',
      },
    ],
  },
};

const STATE0_HIGHWAY: PhoneScreen = {
  type: 'channel-message',
  channelLabel: HIGHWAY_LABEL,
  headerTitle: HIGHWAY_HEADER_TITLE,
  headerSubtitle: HIGHWAY_HEADER_SUB,
  channelProduct: HIGHWAY_PRODUCT,
  headerVariant: 'consult-yellow',
  resultBadge: { tone: 'danger', text: '✗ 발신자 식별 불가' },
  meta: {
    messages: [
      {
        sender: '?',
        text: '박대표님, CV-A001 ₩1,000입니다',
        hint: '발신자 프로필·이름 미표시',
      },
    ],
  },
};

const STATE0_BUS: PhoneScreen = {
  type: 'channel-message',
  channelLabel: BUS_LABEL,
  headerTitle: BUS_HEADER_TITLE,
  headerSubtitle: BUS_HEADER_SUB,
  channelProduct: BUS_PRODUCT,
  headerVariant: 'cowork-badge',
  resultBadge: { tone: 'brand', text: '✨ 본문 첫 줄 이름 자동' },
  meta: {
    messages: [
      {
        sender: '?',
        text: '가온 강승희 [Cowork+]\n박대표님, CV-A001 ₩1,000입니다',
        hint: '본문 첫 줄 자동 삽입',
      },
    ],
  },
};

const REPLY_MSG_BG = {
  messages: [
    {
      sender: '강승희',
      text: '박대표님, CV-A001 ₩1,000입니다',
    },
  ],
};

const STATE1_NORMAL: PhoneScreen = {
  type: 'context-menu',
  channelLabel: NORMAL_LABEL,
  headerTitle: NORMAL_HEADER_TITLE,
  headerSubtitle: NORMAL_HEADER_SUB,
  channelProduct: NORMAL_PRODUCT,
  headerVariant: 'kakao',
  resultBadge: { tone: 'good', text: '✓ 답장 메뉴 정상' },
  meta: {
    background: REPLY_MSG_BG,
    items: [
      { id: 'copy', label: '복사', icon: '📋' },
      { id: 'forward', label: '전달', icon: '↪' },
      { id: 'reply', label: '답장', icon: '↩' },
      { id: 'delete', label: '삭제', icon: '🗑️' },
    ],
  },
};

const STATE1_HIGHWAY: PhoneScreen = {
  type: 'context-menu',
  channelLabel: HIGHWAY_LABEL,
  headerTitle: HIGHWAY_HEADER_TITLE,
  headerSubtitle: HIGHWAY_HEADER_SUB,
  channelProduct: HIGHWAY_PRODUCT,
  headerVariant: 'consult-yellow',
  resultBadge: { tone: 'danger', text: '✗ 답장·삭제 메뉴 없음' },
  meta: {
    background: REPLY_MSG_BG,
    items: [
      { id: 'copy', label: '복사', icon: '📋' },
      { id: 'forward', label: '전달', icon: '↪' },
      { id: 'reply', label: '답장 (지원 안 됨)', icon: '↩', disabled: true },
      { id: 'delete', label: '삭제 (지원 안 됨)', icon: '🗑️', disabled: true },
    ],
  },
};

const STATE1_BUS: PhoneScreen = {
  type: 'context-menu',
  channelLabel: BUS_LABEL,
  headerTitle: BUS_HEADER_TITLE,
  headerSubtitle: BUS_HEADER_SUB,
  channelProduct: BUS_PRODUCT,
  headerVariant: 'cowork-badge',
  resultBadge: { tone: 'warn', text: '🔄 카카오 측 문의 중' },
  meta: {
    background: REPLY_MSG_BG,
    items: [
      { id: 'copy', label: '복사', icon: '📋' },
      { id: 'forward', label: '전달', icon: '↪' },
      { id: 'reply', label: '답장 (지원 안 됨)', icon: '↩', disabled: true },
      { id: 'delete', label: '삭제 (지원 안 됨)', icon: '🗑️', disabled: true },
    ],
  },
};

const FILE_MSG_BG = {
  messages: [
    {
      sender: '강승희',
      fileName: '견적_미우_회신_2026-03-19.xlsx',
      pulseAttachment: true,
    },
  ],
};

const STATE2_NORMAL: PhoneScreen = {
  type: 'share-sheet',
  channelLabel: NORMAL_LABEL,
  headerTitle: NORMAL_HEADER_TITLE,
  headerSubtitle: NORMAL_HEADER_SUB,
  channelProduct: '차상훈 외근 · 카카오톡',
  headerVariant: 'kakao',
  resultBadge: { tone: 'good', text: '✓ 다른 앱 공유 가능' },
  meta: {
    background: FILE_MSG_BG,
    title: '공유',
    apps: [
      { id: 'gmail', label: 'Gmail', icon: '✉️' },
      { id: 'drive', label: 'Drive', icon: '📁' },
      { id: 'memo', label: '메모', icon: '📝' },
    ],
  },
};

const STATE2_HIGHWAY: PhoneScreen = {
  type: 'share-sheet',
  channelLabel: HIGHWAY_LABEL,
  headerTitle: HIGHWAY_HEADER_TITLE,
  headerSubtitle: HIGHWAY_HEADER_SUB,
  channelProduct: '차상훈 외근 · 상담톡',
  headerVariant: 'consult-yellow',
  resultBadge: { tone: 'danger', text: '✗ 상담톡 공유 불가' },
  meta: {
    background: FILE_MSG_BG,
    title: '공유',
    apps: [
      { id: 'gmail', label: 'Gmail', icon: '✉️' },
      { id: 'drive', label: 'Drive', icon: '📁' },
      { id: 'memo', label: '메모', icon: '📝' },
      { id: 'consult-talk', label: '상담톡', icon: '💬', disabled: true },
    ],
  },
};

const STATE2_BUS: PhoneScreen = {
  type: 'share-sheet',
  channelLabel: BUS_LABEL,
  headerTitle: BUS_HEADER_TITLE,
  headerSubtitle: BUS_HEADER_SUB,
  channelProduct: '차상훈 외근 · Cowork+',
  headerVariant: 'cowork-badge',
  resultBadge: { tone: 'brand', text: '✨ 사내 전용 앱 수령' },
  meta: {
    background: FILE_MSG_BG,
    title: '공유',
    apps: [
      { id: 'gmail', label: 'Gmail', icon: '✉️' },
      { id: 'drive', label: 'Drive', icon: '📁' },
      { id: 'memo', label: '메모', icon: '📝' },
      {
        id: 'cowork-app',
        label: 'Cowork+ App',
        icon: '🟣',
        highlight: true,
      },
    ],
  },
};

const STATE3_NORMAL: PhoneScreen = {
  type: 'channel-message',
  channelLabel: NORMAL_LABEL,
  headerTitle: NORMAL_HEADER_TITLE,
  headerSubtitle: NORMAL_HEADER_SUB,
  channelProduct: NORMAL_PRODUCT,
  headerVariant: 'kakao',
  resultBadge: { tone: 'good', text: '✓ 파일명 정상' },
  meta: {
    messages: [
      {
        sender: '박대표',
        fileName: '견적_미우_회신_2026-03-19.xlsx',
        hint: '한눈에 무슨 파일인지 확인',
      },
    ],
  },
};

const STATE3_HIGHWAY: PhoneScreen = {
  type: 'channel-message',
  channelLabel: HIGHWAY_LABEL,
  headerTitle: HIGHWAY_HEADER_TITLE,
  headerSubtitle: HIGHWAY_HEADER_SUB,
  channelProduct: HIGHWAY_PRODUCT,
  headerVariant: 'consult-yellow',
  resultBadge: { tone: 'danger', text: '✗ 인코딩됨 — 식별 불가' },
  meta: {
    messages: [
      {
        sender: '박대표',
        fileName: '_talkf_wzcRpFTex1_r3MprgdCkEV4TRXKxl6fk1_f_62a3a5267b30',
        fileBadge: 'warn',
        hint: '무슨 파일인지 모름',
      },
    ],
  },
};

const STATE3_BUS: PhoneScreen = {
  type: 'channel-message',
  channelLabel: BUS_LABEL,
  headerTitle: BUS_HEADER_TITLE,
  headerSubtitle: BUS_HEADER_SUB,
  channelProduct: BUS_PRODUCT,
  headerVariant: 'cowork-badge',
  resultBadge: { tone: 'brand', text: '✨ 파일명 메모 (운영 완료)' },
  meta: {
    messages: [
      {
        sender: '박대표',
        fileName: '_talkf_wzcRpFTex1_r3MprgdCkEV4TRXKxl6fk1_f_62a3a5267b30',
        fileMemo: '미우 견적 회신_2026-03-19',
        hint: 'Cowork+ 메모 자동 첨부',
      },
    ],
  },
};

const STATE4_NORMAL: PhoneScreen = {
  type: 'lock-screen',
  channelLabel: NORMAL_LABEL,
  headerTitle: NORMAL_HEADER_TITLE,
  headerSubtitle: NORMAL_HEADER_SUB,
  channelProduct: NORMAL_PRODUCT,
  headerVariant: 'kakao',
  resultBadge: { tone: 'good', text: '✓ 푸시 알림 정상' },
  meta: {
    time: '14:21',
    date: '4월 2일 목요일',
    notifications: [
      {
        app: '카카오톡',
        time: '방금',
        title: '미우 단체방',
        body: '강승희: 박대표님 견적 회신드립니다',
      },
      {
        app: '카카오톡',
        time: '1분 전',
        title: '미우 단체방',
        body: '박대표: 확인했습니다',
      },
    ],
  },
};

const STATE4_HIGHWAY: PhoneScreen = {
  type: 'lock-screen',
  channelLabel: HIGHWAY_LABEL,
  headerTitle: HIGHWAY_HEADER_TITLE,
  headerSubtitle: HIGHWAY_HEADER_SUB,
  channelProduct: HIGHWAY_PRODUCT,
  headerVariant: 'consult-yellow',
  resultBadge: { tone: 'danger', text: '✗ 디바이스마다 다름' },
  meta: {
    time: '14:21',
    date: '4월 2일 목요일',
    emptyText: '🔔 알림 없음 (PWA 미지원)',
  },
};

const STATE4_BUS: PhoneScreen = {
  type: 'lock-screen',
  channelLabel: BUS_LABEL,
  headerTitle: BUS_HEADER_TITLE,
  headerSubtitle: BUS_HEADER_SUB,
  channelProduct: BUS_PRODUCT,
  headerVariant: 'cowork-badge',
  resultBadge: { tone: 'brand', text: '✨ Cowork+ 푸시 정상' },
  meta: {
    time: '14:21',
    date: '4월 2일 목요일',
    notifications: [
      {
        app: 'Cowork+',
        time: '방금',
        title: '미우 단체방',
        body: '강승희: 박대표님 견적 회신드립니다',
      },
      {
        app: 'Cowork+',
        time: '1분 전',
        title: '미우 단체방',
        body: '박대표: 확인했습니다',
      },
    ],
  },
};

const GALLERY_CARDS = [
  {
    id: 'sender',
    icon: '🔤',
    title: '발신자 표시',
    limit: '발신자 프로필 아이콘/이름 미표시',
    solution: '메시지 본문 첫 줄 발신자 이름 자동 삽입',
    tag: '자체 도구',
    tone: 'self' as const,
  },
  {
    id: 'reply',
    icon: '💬',
    title: '답장 기능',
    limit: '답장 기능 자체 미지원',
    solution: '카카오 측 답변 대기 (적극 문의 중)',
    tag: '카카오 협업',
    tone: 'kakao' as const,
  },
  {
    id: 'file-share',
    icon: '📎',
    title: '파일 공유',
    limit: '카카오톡 → 모바일원톡 파일 공유 불가',
    solution: 'Cowork+ 사내 전용 앱 (iOS) 자체 개발',
    tag: '자체 도구 (SCENE 4)',
    tone: 'self' as const,
    pulse: true,
  },
  {
    id: 'filename',
    icon: '📂',
    title: '파일명 표시',
    limit: '파일명 인코딩됨 (_talkf_...)',
    solution: 'Cowork+ 파일명 메모 (운영 완료 3/19)',
    tag: '자체 도구 (완료)',
    tone: 'self' as const,
  },
  {
    id: 'push',
    icon: '🔔',
    title: '모바일 알림',
    limit: 'PWA 알림 디바이스마다 다름',
    solution: 'Custom push 분석 + 안 읽음 아이콘 표기',
    tag: '자체 도구 (진행 중)',
    tone: 'progress' as const,
  },
];

function makeChannelState(
  index: number,
  phones: Record<string, PhoneScreen>,
  opts: {
    guide: string;
    memoTitle: string;
    pauseAfterMs: number;
    memoSituation: string;
    memoInteract: string;
    memoFeel: string[];
    memoConnect: string[];
    memoMeta?: string;
  },
): ChapterStateNode {
  return {
    index,
    phones,
    pauseAfterMs: opts.pauseAfterMs,
    revealRhythm: 'natural',
    guide: opts.guide,
    memo: {
      title: opts.memoTitle,
      meta: opts.memoMeta,
      situation: opts.memoSituation,
      interact: opts.memoInteract,
      feel: opts.memoFeel,
      connect: opts.memoConnect,
    },
  };
}

export const scene1FiveLimits: Chapter = {
  id: 1,
  act: 3,
  title: '쓰면서 알게 된 카카오의 5가지 한계',
  subtitle: '박대표 폰 3대 · 같은 액션, 다른 결과. 카카오가 못한 5가지 + Cowork+의 해결.',
  narration:
    '카카오톡으로 하는 비즈니스를 공식화하기 위해서는 카카오 상담톡을 이용해야 합니다. 그리고 카카오 상담톡에는 이런 5가지 한계가 있습니다. 이런 한계를 솔직히 인정합니다. 가온전선은 Cowork+로 풀었습니다 — 어떻게 풀었는지 박대표 폰 3대로 확인합니다.',
  stage: 'three-phones',
  states: [
    makeChannelState(
      0,
      {
        'lane-normal': STATE0_NORMAL,
        'lane-highway': STATE0_HIGHWAY,
        'lane-bus': STATE0_BUS,
      },
      {
        guide:
          '강승희가 "박대표님, CV-A001 ₩1,000입니다"를 3개 채널에서 동시 발송. 박대표 폰에 어떻게 도착하는지 비교.',
        memoTitle: 'STATE 1 — 발신자 표시',
        memoMeta: '2026-03-11',
        pauseAfterMs: 5000,
        memoSituation:
          '같은 메시지가 3채널 동시 도착. 일반도로는 정상, 고속도로는 발신자 식별 불가, 버스전용은 본문 첫 줄에 이름 자동.',
        memoInteract: '관찰 STATE. 다음 →',
        memoFeel: ['"고속도로에선 누가 보낸지 모르네"', '"버스전용은 본문에 자동으로 박혀 있구나"'],
        memoConnect: ['→ STATE 2 답장 기능'],
      },
    ),
    makeChannelState(
      1,
      {
        'lane-normal': STATE1_NORMAL,
        'lane-highway': STATE1_HIGHWAY,
        'lane-bus': STATE1_BUS,
      },
      {
        guide:
          '박대표가 강승희 메시지를 길게 눌러 답장을 시도. 각 채널의 컨텍스트 메뉴 차이를 비교.',
        memoTitle: 'STATE 2 — 답장 기능',
        memoMeta: '2026-03-18',
        pauseAfterMs: 5200,
        memoSituation:
          '카카오 상담톡 자체가 답장 기능을 지원하지 않음. Cowork+도 동일하게 못하지만 카카오 측에 적극 문의 중임을 솔직하게 노출.',
        memoInteract: '관찰 STATE. 다음 →',
        memoFeel: ['"솔직하게 한계를 인정하니 신뢰감이 든다"'],
        memoConnect: ['→ STATE 3 ⚡ 파일 공유 (SCENE 4 다리)'],
      },
    ),
    makeChannelState(
      2,
      {
        'lane-normal': STATE2_NORMAL,
        'lane-highway': STATE2_HIGHWAY,
        'lane-bus': STATE2_BUS,
      },
      {
        guide:
          '⚡⚡ 차상훈 외근 사원 폰으로 시점 전환. 받은 견적서 파일을 다른 앱으로 공유 시도 — 모바일원톡 누락 여부를 비교.',
        memoTitle: 'STATE 3 ⚡ — 파일 공유 (SCENE 4 다리)',
        memoMeta: '2026-04-02',
        pauseAfterMs: 5800,
        memoSituation:
          '외근 중인 차상훈 iPhone에서 같은 파일을 다른 앱으로 공유. 카카오톡은 정상, 상담톡은 모바일원톡이 사라짐, Cowork+는 사내 전용 앱이 등장.',
        memoInteract: '파일 공유 펄스 → 자동으로 결과 비교. 다음 →',
        memoFeel: [
          '★ "외근 사원이 파일을 못 받는 게 진짜 문제였다"',
          '"이걸 풀려고 사내 전용 앱까지 만들었다"',
        ],
        memoConnect: ['→ STATE 4 파일명 표시', '→ SCENE 4 (사내 전용 앱)'],
      },
    ),
    makeChannelState(
      3,
      {
        'lane-normal': STATE3_NORMAL,
        'lane-highway': STATE3_HIGHWAY,
        'lane-bus': STATE3_BUS,
      },
      {
        guide:
          '박대표가 강승희에게 견적 회신 파일을 발송. 3채널에서 파일명이 어떻게 표시되는지 비교.',
        memoTitle: 'STATE 4 — 파일명 표시',
        memoMeta: '2026-03-19',
        pauseAfterMs: 5000,
        memoSituation:
          '카카오 상담톡은 파일명을 인코딩해서 무슨 파일인지 모름. Cowork+는 메모 기능으로 인코딩 위에 파일명을 풀어 운영.',
        memoInteract: '관찰 STATE. 다음 →',
        memoFeel: ['"파일명 인코딩을 메모로 풀었네"'],
        memoConnect: ['→ STATE 5 모바일 알림'],
      },
    ),
    makeChannelState(
      4,
      {
        'lane-normal': STATE4_NORMAL,
        'lane-highway': STATE4_HIGHWAY,
        'lane-bus': STATE4_BUS,
      },
      {
        guide: '강승희 외근 중. 같은 시각 3채널에서 메시지 도착 — 잠금 화면을 비교.',
        memoTitle: 'STATE 5 — 모바일 알림',
        memoMeta: '2026-03-18 ~ 5월 검토 중',
        pauseAfterMs: 5000,
        memoSituation:
          '카카오 상담톡 PWA 알림은 디바이스마다 다른 카카오 spec 한계. Cowork+는 안 읽음 아이콘 표기 + Custom push 분석 진행.',
        memoInteract: '관찰 STATE. 다음 → (5장 카드 갤러리)',
        memoFeel: ['"안 읽음 아이콘으로 보완한 게 똑똑하다"'],
        memoConnect: ['→ STATE 6 5장 카드 갤러리'],
      },
    ),
    {
      index: 5,
      pauseAfterMs: 7000,
      revealRhythm: 'cinematic',
      guide:
        '5가지 한계와 해결을 한 화면에 정리. 가운데 📎 카드(파일 공유) 펄스 강조 = SCENE 4 다리.',
      galleryCards: GALLERY_CARDS,
      galleryFooter:
        '이런 한계를 솔직히 인정합니다. 가온전선은 Cowork+로 풀었습니다. — SCENE 2부터 어떻게 풀었는지 직접 확인',
      memo: {
        title: 'STATE 6 — 5장 갤러리',
        meta: '5가지 한계 → 5가지 해결',
        situation:
          '5가지 한계 + 해결을 카드로 정리. 📎 파일 공유 카드에 노란 펄스 → SCENE 4의 입구 신호.',
        interact: 'SCENE 2 → 버튼으로 진행.',
        feel: ['"5장이 영업팀 답변 무기 세트구나"', '"파일 공유는 SCENE 4에서 자세히 풀린다"'],
        connect: ['→ SCENE 2 (본 오픈 첫날, 138명 100% 입장)'],
      },
    },
  ],
  onComplete: { nextChapter: 2, demoAutoAdvance: false },
};
