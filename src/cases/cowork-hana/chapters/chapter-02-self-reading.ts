import type { Chapter, MobilePCSplitState, MobileSplitMessage } from '../../_types';

const STATE_STEPS = [
  { id: 'send', label: '가입동의서 전송' },
  { id: 'ner', label: 'AI 데이터 자동 추출' },
  { id: 'return', label: '설계서 즉시 반환' },
  { id: 'win', label: '통화 중 계약 성사' },
];

const PHONE_HEADER = '하나손보 Cowork+ 앱';
const PHONE_HEADER_CALL = '📞 통화 중 · 박민준 04:52';
const PC_CHAT_HEADER = '이설계 설계사 (대리점A)';

const COWORK_INTRO_MSG: MobileSplitMessage = {
  id: 'cw-intro',
  side: 'other',
  text: '설계 요청 시 동의서를 올려주세요.',
};

const DOC_SENT: MobileSplitMessage = {
  id: 'cw-doc-sent',
  side: 'mine',
  text: '동의서 보냅니다.',
  fileName: '가입동의서_박민준.pdf',
  fileMeta: '2.4MB',
  fileTone: 'brand',
};

const DOC_RECEIVED: MobileSplitMessage = {
  id: 'cw-doc-received',
  side: 'other',
  text: '문서가 수신되었습니다.',
  fileName: '가입동의서_박민준.pdf',
  fileMeta: 'NER 자동 분석 중...',
  fileTone: 'brand',
};

const CALL_SYSTEM: MobileSplitMessage = {
  id: 'cw-call-system',
  side: 'system',
  text: '📞 박민준 고객님과 통화 중 · 04:52',
};

const PLAN_ARRIVED_NOTI: MobileSplitMessage = {
  id: 'cw-plan-noti',
  side: 'other',
  text: 'Cowork+ 알림 · 설계서가 자동으로 발송됐습니다.',
  fileName: '가입설계서_박민준.pdf',
  fileMeta: 'Cowork+ 자동 발송',
  fileTone: 'brand',
};

const AGENT_SHARE_TO_CUSTOMER: MobileSplitMessage = {
  id: 'cw-agent-share',
  side: 'mine',
  text: '고객님, 방금 설계서 보내드렸어요. 한 번 보시고 말씀해 주세요.',
};

const CUSTOMER_ACCEPT: MobileSplitMessage = {
  id: 'cw-customer-accept',
  side: 'other',
  text: '오, 바로 나왔네요? 그럼 이걸로 할게요.',
  highlightToken: { text: '이걸로 할게요', tone: 'brand' },
};

function baseSolve(): MobilePCSplitState {
  return {
    phase: 'solve',
    masterTitle: '하나손해보험 영업용 데모 — Ch.2 문서가 스스로 읽힌다',
    masterMeta: '※ 스펙트라 NER 기술 시연',
    stateBarSteps: STATE_STEPS,
    stateBarActiveIndex: 0,
    phoneHeader: PHONE_HEADER,
    phoneHeaderVariant: 'cowork',
    phoneMessages: [COWORK_INTRO_MSG],
    pcMode: 'workspace+task',
    pcHeaderLabel: 'Cowork+ Workspace (매니저용)',
    pcStatusLabel: '● AI 엔진 가동 중',
    pcWorkspace: {
      sidebarActiveIndex: 0,
      chatHeader: PC_CHAT_HEADER,
      chatSubtitle: '동의서 채널',
      messages: [COWORK_INTRO_MSG],
      engineStatus: '● AI 엔진 가동 중',
    },
    pcTaskPanel: {
      title: '📋 자동 생성된 할 일',
      fields: [
        { id: 'name', label: '고객명', value: '박민준', revealed: false },
        { id: 'ssn', label: '주민등록번호', value: '870512-*******', revealed: false },
        { id: 'addr', label: '거주지역', value: '서울시 강남구', revealed: false },
      ],
    },
    scriptHeading: '🗣️ 영업 스크립트 가이드',
    scriptBody:
      '본부장님, 이제 개인 카톡이 아닌 전용 앱으로 문서를 보내보겠습니다.\n\n문서를 보내는 순간 어떤 일이 벌어지는지 우측 PC 화면을 주목해 주십시오.',
    scriptHighlight: '좌측 모바일 하단의 [동의서 전송하기]를 눌러주십시오.',
  };
}

export const chapter02SelfReading: Chapter = {
  id: 2,
  act: 2,
  title: '문서가 스스로 읽힌다',
  subtitle: 'NER 자동 추출 → 1클릭 반환 → 통화 중 계약 성사',
  narration:
    '같은 설계사, 같은 고객, 같은 문서. 시스템만 다릅니다. 매니저가 사진을 보고 타이핑할 필요가 없습니다. 문서를 보내는 순간 시스템이 내용을 읽고, 5분 안에 설계서가 반환됩니다. 이설계는 고객과 통화하는 그 자리에서 계약을 따냅니다.',
  stage: 'mobile-pc-split',
  states: [
    {
      index: 0,
      pauseAfterMs: 5500,
      revealRhythm: 'natural',
      guide:
        '설계사 이설계가 개인 카톡이 아닌 Cowork+ 전용 앱으로 가입동의서 PDF를 전송합니다. 전용 채널 보안 전송.',
      mobilePcSplit: {
        ...baseSolve(),
        stateBarActiveIndex: 0,
        phoneActionLabel: '💬 [대사 선택] 동의서 전송하기(NER) 👆',
        phoneActionNextIndex: 1,
        phoneActionHint: '전용 앱 → 자동 수신',
      },
      memo: {
        title: 'STATE 1 — 혁신적 문서 전송',
        meta: 'Cowork+ 앱',
        situation:
          '설계사가 텍스트 기반 PDF 문서를 전송. 개인 카톡과 달리 전용 채널 보안 전송.',
        interact: '시연자가 좌측 폰 [동의서 전송하기(NER)] 클릭 → 우측 PC 채팅창에 실시간 수신.',
        feel: ['"카톡과 다른 안전한 채널"'],
        connect: ['→ NER 자동 분석 시작'],
      },
    },
    {
      index: 1,
      pauseAfterMs: 7500,
      revealRhythm: 'cinematic',
      guide:
        '시스템이 수신된 문서를 즉시 분석. 데이터 입자들이 문서에서 튀어나와 우측 할 일 패널의 빈칸으로 포탄처럼 날아가 자동 입력됩니다.',
      mobilePcSplit: {
        ...baseSolve(),
        stateBarActiveIndex: 1,
        doneIndices: [0],
        phoneMessages: [COWORK_INTRO_MSG, DOC_SENT],
        pcWorkspace: {
          ...baseSolve().pcWorkspace!,
          messages: [COWORK_INTRO_MSG, DOC_RECEIVED],
        },
        pcTaskPanel: {
          ...baseSolve().pcTaskPanel!,
          flyingParticles: [
            { id: 'fp-name', text: '박민준', targetFieldId: 'name', delayMs: 600 },
            { id: 'fp-ssn', text: '870512-*******', targetFieldId: 'ssn', delayMs: 1100 },
            { id: 'fp-addr', text: '서울시 강남구...', targetFieldId: 'addr', delayMs: 1600 },
          ],
          actionLabel: '✨ 설계서 즉시 반환하기 👆',
          actionNextIndex: 2,
        },
        scriptBody:
          'Ch.1에서 매니저가 사진을 보고 손으로 옮겨 적던 그 자리에, 이번에는 시스템이 직접 문서를 읽습니다.\n\n매니저는 키보드를 단 한 번도 누르지 않았습니다.',
        scriptHighlight: 'Ch.1의 810512 오타가 났던 그 자리에, 이번에는 870512가 정확히 채워져 있습니다.',
      },
      memo: {
        title: 'STATE 2 — 데이터 플라잉 (NER 자동 추출)',
        meta: '문서 → 할 일 패널',
        situation:
          '문서 아이콘이 빛나며 성명·주민번호·주소 등 데이터 입자가 튀어나와 우측 패널 빈칸으로 포탄처럼 날아갑니다.',
        interact: '자동 진행. 시각적 효과 집중.',
        feel: [
          '"이게 NER이구나"',
          '"매니저가 타이핑을 하나도 안 했다"',
        ],
        connect: ['→ 원클릭 설계서 반환'],
      },
    },
    {
      index: 2,
      pauseAfterMs: 6500,
      revealRhythm: 'cinematic',
      guide:
        '정보가 이미 다 채워져 있으므로, 매니저는 검토 후 버튼 한 번으로 설계를 마무리합니다. 문서 수신 후 경과 시간 4분 38초.',
      mobilePcSplit: {
        ...baseSolve(),
        stateBarActiveIndex: 2,
        doneIndices: [0, 1],
        phoneMessages: [COWORK_INTRO_MSG, DOC_SENT],
        pcWorkspace: {
          ...baseSolve().pcWorkspace!,
          messages: [COWORK_INTRO_MSG, DOC_RECEIVED],
        },
        pcTaskPanel: {
          ...baseSolve().pcTaskPanel!,
          fields: [
            { id: 'name', label: '고객명', value: '박민준', revealed: true },
            { id: 'ssn', label: '주민등록번호', value: '870512-*******', revealed: true },
            { id: 'addr', label: '거주지역', value: '서울시 강남구', revealed: true },
          ],
        },
        resultModal: {
          title: '설계서 즉시 전송 완료!',
          beforeLabel: '기존 (카톡, 3일)',
          beforeValue: '3일',
          afterLabel: '도입 후 (NER)',
          afterValue: '4분 38초',
          tagline: '수기 입력 0초. 오류 0건. 이설계는 지금 박민준 고객과 통화 중입니다.',
          ctaLabel: '통화 중 계약 장면 보기 →',
          ctaNextIndex: 3,
        },
        scriptBody:
          '이제 수기 입력 오류는 구조적으로 불가능합니다.\n\n같은 설계사, 같은 문서, 같은 고객. 시스템만 다릅니다.',
        scriptHighlight: '문서 수신 후 4분 38초. Ch.1의 3일이 5분으로 줄었습니다.',
      },
      memo: {
        title: 'STATE 3 — 원클릭 설계서 반환',
        meta: '4분 38초의 마법',
        situation:
          '기존 4단계(다운 → PC이동 → 카톡방찾기 → 드래그)가 사라지고, 버튼 클릭 한 번으로 즉시 설계서 파일이 설계사에게 전송됩니다.',
        interact: '시연자가 [설계서 즉시 반환] 클릭 → 결과 카드 → 통화 중 계약 STATE.',
        feel: ['"수기 입력 오류 구조적으로 불가능"'],
        connect: ['→ 이설계가 통화 중인 그 자리에서 계약을 따낸다'],
      },
    },
    // STATE 3 — 통화 중 계약 성사
    {
      index: 3,
      pauseAfterMs: 9000,
      revealRhythm: 'cinematic',
      guide:
        '이설계는 박민준 고객과 4분 52초째 통화 중. 그 사이 Cowork+가 설계서를 자동 발송합니다. 이설계는 통화를 끊지 않고 그 자리에서 계약을 따냅니다.',
      mobilePcSplit: {
        ...baseSolve(),
        stateBarActiveIndex: 3,
        doneIndices: [0, 1, 2],
        phoneHeader: PHONE_HEADER_CALL,
        phoneHeaderVariant: 'cowork',
        phoneMessages: [
          CALL_SYSTEM,
          PLAN_ARRIVED_NOTI,
          AGENT_SHARE_TO_CUSTOMER,
          CUSTOMER_ACCEPT,
        ],
        phoneActionLabel: undefined,
        pcWorkspace: {
          ...baseSolve().pcWorkspace!,
          messages: [COWORK_INTRO_MSG, DOC_RECEIVED],
          engineStatus: '● 설계서 자동 발송 완료',
        },
        pcTaskPanel: {
          ...baseSolve().pcTaskPanel!,
          fields: [
            { id: 'name', label: '고객명', value: '박민준', revealed: true },
            { id: 'ssn', label: '주민등록번호', value: '870512-*******', revealed: true },
            { id: 'addr', label: '거주지역', value: '서울시 강남구', revealed: true },
          ],
        },
        scriptBody:
          'Ch.1에서 3일 후 "다른 곳으로 했어요"가 돌아왔던 자리에, 이번에는 통화 중 "이걸로 할게요"가 옵니다.\n\n기술 자체가 아니라, 설계사가 통화 중에 계약을 따냈다는 사실이 핵심입니다.',
        scriptHighlight: '하나손보의 경쟁상대는 다른 상품이 아니라 다른 보험사의 매니저 처리 속도입니다.',
      },
      memo: {
        title: 'STATE 4 — 통화 중 계약 성사',
        meta: '이설계 · 박민준 통화 채널',
        situation:
          '좌측 폰 상단에 "📞 통화 중 · 박민준 04:52" 시스템 배너. Cowork+ 알림으로 설계서 도착 → 카톡 공유 → 박민준 "이걸로 할게요" 답장.',
        interact: '자동 reveal 또는 시연자가 침묵하며 화면이 말하게 둡니다.',
        feel: [
          '"통화 중에 계약을 따낸다"',
          '청중: "GA 설계사가 하나손보를 가장 먼저 꺼낼 이유"',
        ],
        connect: ['→ Ch.3 — 이 속도가 매출로 어떻게 환산되는가'],
      },
    },
  ],
  onComplete: { nextChapter: 3, demoAutoAdvance: false },
};
