import type {
  Chapter,
  ChatListItem,
  DesktopMessage,
  KakaoPCWindowState,
  MobilePCSplitState,
  MobileSplitMessage,
  PCToast,
  TaskbarApp,
} from '../../_types';

const STATE_STEPS = [
  { id: 'send', label: '카톡 문서 전송' },
  { id: 'type', label: '수기 입력의 늪 (휴먼 에러)' },
  { id: 'rework', label: '재작업 3일 · 지연 안내' },
  { id: 'lost', label: '고객 이탈 (계약 손실)' },
];

const PHONE_HEADER = '정나윤 매니저 (개인 카톡)';
const PHONE_HEADER_CUSTOMER = '박민준 고객 (카톡)';

const GREETING_MOBILE: MobileSplitMessage = {
  id: 'm1',
  side: 'other',
  text: '안녕하세요, 오늘 신규 접수 건 부탁드립니다.',
};

const SENT_DOCUMENT_MOBILE: MobileSplitMessage = {
  id: 'doc-sent',
  side: 'mine',
  text: '박민준 고객님 동의서입니다.',
  imageCaption: '[ 가입동의서 사진 ]',
  imageLines: ['성명: 박민준', '주민번호: 870512-1234567'],
  highlightToken: { text: '870512', tone: 'danger' },
};

const CUSTOMER_DELAY_INTRO: MobileSplitMessage = {
  id: 'cust-intro',
  side: 'system',
  text: '— 3일 후, 박민준 고객 채널 —',
};

const APOLOGY_FROM_AGENT: MobileSplitMessage = {
  id: 'apology-1',
  side: 'mine',
  text: '설계서가 좀 늦어질 것 같습니다. 죄송합니다.',
};

const CUSTOMER_FAREWELL: MobileSplitMessage = {
  id: 'cust-leave',
  side: 'other',
  text: '죄송합니다, 다른 곳으로 계약했어요.',
  highlightToken: { text: '다른 곳으로 계약', tone: 'danger' },
};

// PC 카톡 창 (이설계 → 정나윤)
const PC_GREETING: DesktopMessage = {
  id: 'pc-greeting',
  kind: 'message',
  sender: '이설계',
  text: '안녕하세요, 오늘 신규 접수 건 부탁드립니다.',
  time: '오전 9:08',
};

const PC_DOC_LINE1: DesktopMessage = {
  id: 'pc-doc-line1',
  kind: 'message',
  sender: '이설계',
  text: '박민준 고객님 동의서입니다.',
  time: '오전 9:14',
};

const PC_DOC_IMAGE: DesktopMessage = {
  id: 'pc-doc-image',
  kind: 'image-capture',
  sender: '이설계',
  time: '오전 9:14',
  imageCaption: '[ 가입동의서 사진 ]',
  imageLines: ['성명: 박민준', '주민번호: 870512-1234567'],
  imageHighlight: { text: '870512', tone: 'danger' },
};

const PC_CHAT_BASE_POS = { top: 56, left: 560, zIndex: 6 };

function buildKakaoPCWindow(messages: DesktopMessage[]): KakaoPCWindowState {
  return {
    id: 'lee-seolgye',
    title: '이설계 (GA) ↔ 정나윤',
    participants: '이설계, 정나윤',
    participantsCount: 2,
    position: PC_CHAT_BASE_POS,
    messages,
  };
}

const TASKBAR_APPS: TaskbarApp[] = [
  { id: 'subscription', icon: '🏛️', label: '청약지원시스템', active: true },
  { id: 'kakao', icon: '💬', label: '카카오톡', active: true },
  { id: 'outlook', icon: '📧', label: 'Outlook' },
];

const BASE_CHAT_LIST: ChatListItem[] = [
  {
    id: 'lee-seolgye',
    name: '이설계 (GA · 에이원)',
    preview: '안녕하세요, 오늘 신규 접수 건 부탁드립니다.',
    time: '09:08',
    badge: 1,
    avatar: 'kang',
    icon: '👤',
    active: true,
    pulse: true,
  },
  {
    id: 'good-life',
    name: '더좋은 지점 단톡',
    preview: '소장님: 오늘 청약 3건 부탁드려요',
    time: '08:55',
    badge: 3,
    avatar: 'rims',
    icon: '👥',
  },
  {
    id: 'rich-planner',
    name: '리치플래너 GA',
    preview: '최팀장: 수정 가입설계서 보내드립니다',
    time: '08:40',
    badge: 2,
    avatar: 'keumho',
    icon: '👥',
  },
  {
    id: 'office',
    name: '하나손보 청약지원팀',
    preview: '오늘 미접수 건 잔량 12건',
    time: '어제',
    avatar: 'park',
    icon: '👥',
  },
];

const CLOCK_TIME = '09:14';
const CLOCK_DATE = '2026-05-15 (목)';

function baseSplit(): MobilePCSplitState {
  return {
    phase: 'warn',
    masterTitle: '하나손해보험 영업용 데모 — Ch.1 보이지 않는 비용',
    masterMeta: '※ 태블릿/PC 시연자 직접 조작 모드',
    stateBarSteps: STATE_STEPS,
    stateBarActiveIndex: 0,
    phoneHeader: PHONE_HEADER,
    phoneHeaderVariant: 'kakao',
    phoneMessages: [GREETING_MOBILE],
    pcMode: 'kakao+form',
    pcHeaderLabel: '정나윤 매니저 Desktop',
    pcStatusLabel: '카카오톡 PC + 사내 청약 시스템',
    pcKakao: {
      title: '이설계 (GA)',
      sender: '이설계',
      messages: [],
    },
    pcSystem: {
      title: '하나 청약 지원 시스템',
      fields: [
        { id: 'name', label: '고객명', placeholder: '이름을 입력하세요', value: '', state: 'empty' },
        {
          id: 'ssn',
          label: '주민등록번호 (앞 6자리)',
          placeholder: 'YYMMDD',
          value: '',
          state: 'empty',
        },
      ],
      waitText: '문서 수신 대기 중...',
    },
    scriptHeading: '🗣️ 영업 스크립트 가이드',
    scriptBody: '',
  };
}

export const chapter01InvisibleCost: Chapter = {
  id: 1,
  act: 1,
  title: '보이지 않는 비용',
  subtitle: '카톡 문서 전송 → 수기 입력의 늪 → 재작업 → 고객 이탈',
  narration:
    'GA 설계사 이설계가 박민준 고객의 동의서를 카톡으로 보냅니다. 매니저 정나윤은 사진을 보고 사내 시스템에 손으로 옮겨 적습니다. 오타가 발생하고, 3일이 지연되고, 결국 박민준은 다른 보험사로 계약합니다. "지금 이 순간에도 귀사의 설계사들은 이 위험한 수작업 때문에 계약을 잃고 있습니다."',
  stage: 'mobile-pc-split',
  states: [
    // STATE 0 — 아찔한 문서 전송
    {
      index: 0,
      pauseAfterMs: 5500,
      revealRhythm: 'natural',
      guide:
        '평범한 오전. 설계사 이설계가 카톡으로 고객 박민준의 동의서 사진을 보내려 합니다. 매니저 정나윤은 이 정보를 사내 시스템에 옮겨 적어야 합니다.',
      mobilePcSplit: {
        ...baseSplit(),
        stateBarActiveIndex: 0,
        phoneActionLabel: '💬 [대사 선택] 고객 동의서 사진 보내기 👆',
        phoneActionNextIndex: 1,
        phoneActionHint: '시연자가 직접 클릭합니다.',
      },
      desktop: {
        clockTime: CLOCK_TIME,
        clockDate: CLOCK_DATE,
        taskbarApps: TASKBAR_APPS,
        activeWindowId: 'lee-seolgye',
        excel: { fileName: '', cellRef: '', formula: '', headerTitle: '', rows: [] },
        chatList: BASE_CHAT_LIST,
        toasts: [
          {
            id: 't-seolgye',
            from: '이설계 GA',
            room: '이설계 단톡',
            text: '오늘 신규 접수 건 부탁드립니다',
            pulse: true,
          } as PCToast,
        ],
        kakaoWindows: [buildKakaoPCWindow([PC_GREETING])],
      },
      memo: {
        title: 'STATE 1 — 아찔한 문서 전송',
        meta: '카톡 (개인 메신저)',
        situation:
          '영업 현장에서 가장 흔하게 벌어지는 ‘개인정보 카톡 전송’. 좌측 폰에서 동의서 사진이 발송되고 우측 카톡 PC 알림 팝업.',
        interact: '시연자가 좌측 폰 [사진 보내기] 클릭 → 메시지 발송 애니메이션, 우측 카톡 PC 창에 사진 수신.',
        feel: ['청중: "우리 회사도 매일 카톡으로 주민번호 받는다…"', '"개인 카톡으로 대외비가 흘러간다"'],
        connect: ['→ 매니저가 사진을 보며 사내 시스템에 옮겨 적기'],
      },
    },

    // STATE 1 — 수기 입력의 늪
    {
      index: 1,
      pauseAfterMs: 7000,
      revealRhythm: 'cinematic',
      guide:
        '매니저 정나윤이 모니터 한쪽에 카톡 사진을 띄워놓고, 다른 한쪽 시스템에 손으로 정보를 옮겨 적기 시작합니다.',
      mobilePcSplit: {
        ...baseSplit(),
        stateBarActiveIndex: 1,
        doneIndices: [0],
        phoneMessages: [GREETING_MOBILE, SENT_DOCUMENT_MOBILE],
        pcSystem: {
          ...baseSplit().pcSystem!,
          waitText: undefined,
          actionLabel: '⌨️ 시스템에 직접 옮겨 적기 👆',
          actionNextIndex: 2,
          autoFillName: { fieldId: 'name', value: '박민준' },
          typingError: {
            fieldId: 'ssn',
            correctValue: '870512',
            wrongValue: '810512',
            intervalMs: 150,
            onCompleteAdvanceMs: 1800,
            onCompleteAdvanceTo: 2,
          },
        },
      },
      desktop: {
        clockTime: '09:21',
        clockDate: CLOCK_DATE,
        taskbarApps: TASKBAR_APPS,
        activeWindowId: 'lee-seolgye',
        excel: { fileName: '', cellRef: '', formula: '', headerTitle: '', rows: [] },
        chatList: BASE_CHAT_LIST.map((c) =>
          c.id === 'lee-seolgye'
            ? { ...c, preview: '[가입동의서 사진]', time: '방금', badge: undefined, pulse: false }
            : c,
        ),
        toasts: [],
        kakaoWindows: [buildKakaoPCWindow([PC_GREETING, PC_DOC_LINE1, PC_DOC_IMAGE])],
      },
      memo: {
        title: 'STATE 2 — 수기 입력의 늪 (휴먼 에러)',
        meta: '카톡 PC + 사내 청약 시스템',
        situation:
          '사진 원본은 870512이지만, 입력창에는 810512로 잘못 타이핑되고 붉은색 에러 하이라이트가 번쩍입니다.',
        interact: '시연자가 우측 [직접 옮겨 적기] 클릭 → 150ms 간격 타이핑 → 오타 발생 → 빨간 펄스.',
        feel: ['"단순한 오타 하나가 전면 재작업 비용으로 돌아온다"', '청중: "우리 매니저도 매일 이래…"'],
        connect: ['→ 재작업 3일이 시작되고, 설계사는 고객에게 지연을 사과해야 한다'],
      },
    },

    // STATE 2 — 재작업 3일 · 고객에게 지연 안내
    {
      index: 2,
      pauseAfterMs: 7500,
      revealRhythm: 'cinematic',
      guide:
        '오타가 발견됐습니다. 재작업까지 3일이 더 필요합니다. 설계사는 박민준 고객에게 직접 지연 안내를 보내야 합니다.',
      mobilePcSplit: {
        ...baseSplit(),
        stateBarActiveIndex: 2,
        doneIndices: [0, 1],
        phoneHeader: PHONE_HEADER_CUSTOMER,
        phoneMessages: [CUSTOMER_DELAY_INTRO],
        phoneActionLabel: '📩 [고객에게 지연 안내]',
        phoneActionNextIndex: 3,
        phoneActionHint: '"설계서가 좀 늦어질 것 같습니다. 죄송합니다."',
        pcSystem: {
          ...baseSplit().pcSystem!,
          waitText: undefined,
          fields: [
            { id: 'name', label: '고객명', value: '박민준', state: 'filled' },
            { id: 'ssn', label: '주민등록번호 (앞 6자리)', value: '810512', state: 'error' },
          ],
          reworkBanner: {
            label: '재작업 소요',
            value: '3일',
            sub: '오타 발견 · 처음부터 다시 입력해야 합니다',
          },
        },
      },
      desktop: {
        clockTime: '09:23',
        clockDate: CLOCK_DATE,
        taskbarApps: TASKBAR_APPS,
        activeWindowId: 'lee-seolgye',
        excel: { fileName: '', cellRef: '', formula: '', headerTitle: '', rows: [] },
        chatList: BASE_CHAT_LIST.map((c) =>
          c.id === 'lee-seolgye'
            ? { ...c, preview: '[가입동의서 사진]', time: '09:14', badge: undefined, pulse: false }
            : c,
        ),
        toasts: [],
        kakaoWindows: [buildKakaoPCWindow([PC_GREETING, PC_DOC_LINE1, PC_DOC_IMAGE])],
      },
      memo: {
        title: 'STATE 3 — 재작업 3일 · 지연 안내',
        meta: '청약 시스템 + 매니저 카톡',
        situation:
          '청약시스템 상단에 "재작업 소요 3일" 빨간 배너. 좌측 폰은 박민준 고객 채널로 전환되어 매니저가 지연 안내 메시지를 보내야 합니다.',
        interact: '시연자가 [고객에게 지연 안내] 클릭 → "설계서가 좀 늦어질 것 같습니다. 죄송합니다." 발송.',
        feel: ['"3일이라는 침묵 동안 고객은 어디로 갈까"', '청중: "우리 설계사도 매일 이런 사과를 보낸다…"'],
        connect: ['→ 3일 후, 고객의 답장'],
      },
    },

    // STATE 3 — 고객 이탈 (계약 손실)
    {
      index: 3,
      pauseAfterMs: 9000,
      revealRhythm: 'cinematic',
      guide:
        '— 3일 후 —. 화면 다른 요소는 침묵합니다. 좌측 폰에 박민준 고객의 단 한 줄 답장만 도착합니다.',
      mobilePcSplit: {
        ...baseSplit(),
        stateBarActiveIndex: 3,
        doneIndices: [0, 1, 2],
        phoneHeader: PHONE_HEADER_CUSTOMER,
        phoneMessages: [CUSTOMER_DELAY_INTRO, APOLOGY_FROM_AGENT, CUSTOMER_FAREWELL],
        pcDimmed: true,
        pcSystem: {
          ...baseSplit().pcSystem!,
          waitText: undefined,
          fields: [
            { id: 'name', label: '고객명', value: '박민준', state: 'filled' },
            { id: 'ssn', label: '주민등록번호 (앞 6자리)', value: '810512', state: 'error' },
          ],
          reworkBanner: {
            label: '재작업 소요',
            value: '3일',
            sub: '처리 지연 · 결과 미수신',
          },
        },
      },
      desktop: {
        clockTime: '+3일 후',
        clockDate: '2026-05-18 (일)',
        taskbarApps: TASKBAR_APPS,
        activeWindowId: 'lee-seolgye',
        excel: { fileName: '', cellRef: '', formula: '', headerTitle: '', rows: [] },
        chatList: BASE_CHAT_LIST.map((c) =>
          c.id === 'lee-seolgye'
            ? { ...c, preview: '[가입동의서 사진]', time: '3일 전', badge: undefined, pulse: false, active: false }
            : c,
        ),
        toasts: [],
        kakaoWindows: [buildKakaoPCWindow([PC_GREETING, PC_DOC_LINE1, PC_DOC_IMAGE])],
      },
      memo: {
        title: 'STATE 4 — 고객 이탈 · 계약 손실',
        meta: '박민준 고객 카톡',
        situation:
          '단 한 줄. "죄송합니다, 다른 곳으로 계약했어요." 우측 PC는 dim 처리되어 침묵을 만듭니다. 영업 멘트도 3~5초 후에 들어가야 합니다.',
        interact: '자동 진행. 시연자는 침묵하며 청중이 화면을 읽도록 둡니다.',
        feel: [
          '"오타 하나가 계약 하나를 잃게 만든다"',
          '청중: "이게 우리 조직 얘기네…"',
          '"3일 지연이 곧 계약 손실"',
        ],
        connect: ['→ Ch.2 — 같은 설계사, 같은 문서, 다른 시스템'],
      },
    },
  ],
  onComplete: { nextChapter: 2, demoAutoAdvance: false },
};
