import type { Chapter, ChatLine } from '../../_types';

// 공통: 단톡방 "미우케이블 ↔ 가온 8" 기본 메시지 (9.18 → 9.19)
const baseGroupMessages: ChatLine[] = [
  { id: 'd-18', kind: 'date', text: '2025년 9월 18일 (목)' },
  {
    id: 'm-kang-out',
    kind: 'message',
    text: '안녕하세요. 9월 출하 일정 공지 드립니다. (첨부 파일 1)',
    senderId: 'kang-bs',
    time: '오후 2:00',
  },
  {
    id: 'm-yang-ok',
    kind: 'message',
    text: '확인했습니다 감사합니다',
    senderId: 'yang-ye',
    time: '오후 4:42',
  },
  {
    id: 'm-park-quote-1',
    kind: 'message',
    text: '견적 부탁드립니다',
    senderId: 'park-rep',
    time: '오전 9:23',
  },
  { id: 'd-19', kind: 'date', text: '2025년 9월 19일 (금)' },
];

// STATE 0~6에 따라 추가되는 메시지들
const evadeLine: ChatLine = {
  id: 'm-kang-evade',
  kind: 'message',
  text: '확인 후 연락드릴게요',
  senderId: 'kang-bs',
  time: '오전 10:14',
};

const parkUrgeLine: ChatLine = {
  id: 'm-park-urge',
  kind: 'message',
  text: '어제도 같은 말씀이셨는데… 오늘 안에 부탁드려요',
  senderId: 'park-rep',
  time: '오전 11:02',
};

const kangEvade2Line: ChatLine = {
  id: 'm-kang-evade2',
  kind: 'message',
  text: '확인해보겠습니다',
  senderId: 'kang-bs',
  time: '오후 1:38',
};

// 강승희 폰에 쌓이는 다른 단톡방 푸시 알림 (STATE 3)
const pushOverload = [
  {
    id: 'push-dd',
    room: '대동케이블판매',
    sender: '박부장',
    preview: '출하 일정 다시 확인 부탁드립니다',
    unread: 3,
    urgent: true,
  },
  {
    id: 'push-rs',
    room: '림스케이블',
    sender: '신차장',
    preview: '단가 견적서 부탁드려요',
    unread: 3,
    urgent: true,
  },
  {
    id: 'push-kh',
    room: '금호',
    sender: '이대리',
    preview: '어제 보낸 PO 확인하셨는지요',
    unread: 2,
    urgent: false,
  },
];

// 이팀장 폰 — 가온 영업팀 내부 (조용한 상태)
const teamInternal: ChatLine[] = [
  { id: 'd-19-t', kind: 'date', text: '2025년 9월 19일 (금)' },
  {
    id: 'm-team-meeting',
    kind: 'message',
    text: '주간 영업회의 자료 공유드립니다.',
    senderId: 'lee-team',
    side: 'mine',
    time: '오전 9:30',
  },
];

export const chapter00SeptemberDay: Chapter = {
  id: 0,
  act: 1,
  title: '9월의 어느 날',
  subtitle: '거래처가 팀장에게 직접 카톡하는 순간, 영업은 이미 끝났습니다',
  narration:
    '같은 사건이 거래처, 담당 BR, 영업팀장에게 어떻게 다르게 체감되는지 — 세 사람의 시점을 동시에 따라가는 8장의 프롤로그입니다.',
  stage: 'three-phones',
  states: [
    // STATE 0 — 박대표 재촉
    {
      index: 0,
      activeCastId: 'park-rep',
      guide:
        '박대표가 어제 오전 9시 23분에 단톡방에 견적을 요청했지만 24시간째 답이 없습니다.',
      phones: {
        'park-rep': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [
            ...baseGroupMessages,
            {
              id: 'm-no-reply',
              kind: 'system',
              text: '— 답 없음 —',
              meta: { tone: 'muted' },
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: baseGroupMessages,
        },
        'lee-team': {
          type: 'kakao-group',
          headerTitle: '가온 영업팀',
          headerSubtitle: '참여자 5명',
          messages: teamInternal,
        },
      },
      presets: [
        {
          id: 's0-next',
          text: '강승희가 그제서야 단톡방에 답변',
          kind: 'system',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 박대표, 어제부터 답을 못 받음',
        meta: '거래처 시점 · Crack',
        situation:
          '박대표는 어제 오전 9:23 단톡방에 견적을 요청했지만 24시간이 지나도록 회신이 없다.',
        interact: '단톡방을 새로고침. 별다른 액션 없음.',
        feel: [
          '"어제 보낸 메시지에 답이 없네"',
          '"나만 답을 못 받는 건 아닌가"',
          '청중: 거래처 입장 몰입',
        ],
        connect: [
          '다음 STATE에서 강승희의 "확인 후 연락드릴게요" 형식적 답변',
          'WON TALK Ch.4 — 자동 할당으로 이런 누락이 사라진다',
        ],
      },
    },
    // STATE 1 — 강승희 답변 (형식적 회피)
    {
      index: 1,
      activeCastId: 'kang-bs',
      guide:
        '강승희가 그제서야 단톡방에 답을 남깁니다. "확인 후 연락드릴게요" — 형식적 회피.',
      phones: {
        'park-rep': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [...baseGroupMessages, evadeLine],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [
            ...baseGroupMessages,
            { ...evadeLine, side: 'mine', isNew: true },
          ],
        },
        'lee-team': {
          type: 'kakao-group',
          headerTitle: '가온 영업팀',
          headerSubtitle: '참여자 5명',
          messages: teamInternal,
        },
      },
      presets: [
        {
          id: 's1-next',
          text: '박대표: "어제도 같은 말씀이셨는데…"',
          kind: 'guest',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 강승희의 회피',
        meta: '담당 BR 시점 · Crack',
        situation:
          '강승희는 머리속이 복잡하다. 다른 5개 거래처도 답을 기다리는 상황. 일단 "확인 후 연락" 보내고 다음 일을 처리.',
        interact: '의례적 답변 한 줄 발송.',
        feel: [
          'BR: "일단 답은 했으니까…"',
          '거래처: "또 \'확인 후\'야"',
          '청중: 진짜 처리는 아직 시작도 안 됨',
        ],
        connect: ['다음 STATE에서 박대표가 패턴을 인지'],
      },
    },
    // STATE 2 — 박대표 재요청
    {
      index: 2,
      activeCastId: 'park-rep',
      guide: '박대표가 어제와 같은 패턴이라는 것을 인지하고 재촉.',
      phones: {
        'park-rep': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [
            ...baseGroupMessages,
            evadeLine,
            { ...parkUrgeLine, side: 'mine', isNew: true },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [
            ...baseGroupMessages,
            { ...evadeLine, side: 'mine' },
            parkUrgeLine,
          ],
        },
        'lee-team': {
          type: 'kakao-group',
          headerTitle: '가온 영업팀',
          headerSubtitle: '참여자 5명',
          messages: teamInternal,
        },
      },
      presets: [
        {
          id: 's2-next',
          text: '강승희 폰에 다른 단톡방 알림이 폭주',
          kind: 'system',
          nextStateIndex: 3,
        },
      ],
      memo: {
        title: 'STATE 2 — 같은 패턴의 반복',
        meta: '거래처 시점 · Crack 심화',
        situation:
          '"어제도 같은 말씀이셨는데" — 박대표는 단일 누락이 아니라 *반복 패턴*임을 인지.',
        interact: '독촉 메시지 발송.',
        feel: [
          '거래처: "이 회사 항상 이래"',
          '청중: 한 번이면 실수, 두 번이면 시스템 문제',
        ],
        connect: ['다음 STATE에서 시스템 문제의 근본 원인이 드러남'],
      },
    },
    // STATE 3 — 강승희 정신없음 (5개 단톡방 알림 폭주)
    {
      index: 3,
      activeCastId: 'kang-bs',
      guide:
        '강승희 폰에 다른 거래처 단톡방에서 동시에 알림이 폭주. BR 1명이 5개 거래처를 동시에 응대 중.',
      phones: {
        'park-rep': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [
            ...baseGroupMessages,
            evadeLine,
            { ...parkUrgeLine, side: 'mine' },
            {
              id: 'm-no-reply-2',
              kind: 'system',
              text: '— 답 없음 (3시간째) —',
              meta: { tone: 'warn' },
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          pushNotifications: pushOverload,
          messages: [
            ...baseGroupMessages,
            { ...evadeLine, side: 'mine' },
            parkUrgeLine,
          ],
        },
        'lee-team': {
          type: 'kakao-group',
          headerTitle: '가온 영업팀',
          headerSubtitle: '참여자 5명',
          messages: teamInternal,
        },
      },
      presets: [
        {
          id: 's3-next',
          text: '박대표가 단톡방을 떠나 이팀장 개인톡을 시도',
          kind: 'guest',
          nextStateIndex: 4,
        },
      ],
      memo: {
        title: 'STATE 3 — BR 한 명이 5개 거래처를',
        meta: '담당 BR 시점 · Collapse 시작',
        situation:
          '대동·림스·금호·유한 등 동시에 알림이 8건. 한 BR이 처리 가능한 한계를 넘는다. 미우케이블은 그 사이에 묻힘.',
        interact: '폰을 보면서도 어디부터 답해야 할지 결정 못함.',
        feel: [
          'BR: "처음부터 끝까지 다 내 잘못 같다"',
          '청중: "한 명이 5개를 어떻게 다 챙겨"',
          '"이건 개인 역량의 문제가 아니라 시스템 포화"',
        ],
        connect: [
          'WON TALK Ch.4 — 자동 배정 + 부하 균형으로 이 문제 해결',
          'WON TALK Ch.5 — 거래처 셀프 조회로 BR 응대 시간 회수',
        ],
      },
    },
    // STATE 4 — 박대표 단톡방 이탈 → 친구 검색
    {
      index: 4,
      activeCastId: 'park-rep',
      guide:
        '박대표가 단톡방으로는 안 되겠다고 판단. 카톡 친구 검색에서 이팀장을 찾아 1:1 채팅을 시도.',
      phones: {
        'park-rep': {
          type: 'friends-search',
          headerTitle: '친구 검색',
          meta: {
            query: '이윤',
            target: {
              initial: '이',
              color: '#0C5460',
              name: '이윤 (가온전선 영업팀장)',
              sub: '명함 교환 · 6개월 전',
            },
            bridgeNote:
              '거래처가 담당 BR을 우회해 상위 결정권자에게 직접 연결을 시도합니다. 회사의 표준 채널 밖으로 정보가 흐르기 시작합니다.',
          },
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          pushNotifications: pushOverload,
          messages: [
            ...baseGroupMessages,
            { ...evadeLine, side: 'mine' },
            parkUrgeLine,
            kangEvade2Line && { ...kangEvade2Line, side: 'mine' },
          ].filter(Boolean) as ChatLine[],
        },
        'lee-team': {
          type: 'kakao-group',
          headerTitle: '가온 영업팀',
          headerSubtitle: '참여자 5명',
          messages: teamInternal,
        },
      },
      presets: [
        {
          id: 's4-next',
          text: '이팀장 개인 카톡으로 컴플레인 발송',
          kind: 'guest',
          nextStateIndex: 5,
        },
      ],
      memo: {
        title: 'STATE 4 — 비공식 사이드 채널의 시작',
        meta: '거래처 시점 · Collapse 핵심',
        situation:
          '거래처가 표준 채널(단톡방 BR)을 우회. 명함으로 받은 팀장 카톡으로 직접. 회사는 이 흐름을 모른다.',
        interact: '카톡 친구 검색 → 이팀장 발견 → 1:1 채팅 시작.',
        feel: [
          '거래처: "이러면 뭐라도 되겠지"',
          '회사: "이런 일이 벌어지는지 모른다"',
          '청중: "이게 진짜 비공식 채널이 만들어지는 순간"',
        ],
        connect: [
          'WON TALK Ch.1 — 인증된 신분 + 권한 매핑으로 우회 차단',
          'WON TALK Ch.2 — 표준 채널이 매력적이면 우회가 안 일어남',
        ],
      },
    },
    // STATE 5 — 이팀장 컴플레인 수신
    {
      index: 5,
      activeCastId: 'lee-team',
      guide:
        '이팀장 폰에 박대표로부터 1:1 카톡이 도착. 긴 컴플레인 메시지.',
      phones: {
        'park-rep': {
          type: 'kakao-1to1',
          headerTitle: '이윤 (가온 영업팀장)',
          headerSubtitle: '1:1 채팅',
          messages: [
            {
              id: 'm-complaint',
              kind: 'message',
              text: '팀장님, 죄송한데 직접 카톡드려요. 강승희님 카톡 단톡방(미우 ↔ 가온)에 어제부터 견적 부탁드렸는데 "확인 후 연락", "확인해보겠다"만 두 번이고 아직 답이 없으세요. 오늘 안에 부탁드려요',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 3:12',
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          pushNotifications: pushOverload,
          messages: [
            ...baseGroupMessages,
            { ...evadeLine, side: 'mine' },
            parkUrgeLine,
            { ...kangEvade2Line, side: 'mine' },
          ],
        },
        'lee-team': {
          type: 'kakao-1to1',
          headerTitle: '박대표 (미우케이블)',
          headerSubtitle: '1:1 채팅 · 새 친구',
          messages: [
            {
              id: 'm-complaint-recv',
              kind: 'message',
              text: '팀장님, 죄송한데 직접 카톡드려요. 강승희님 카톡 단톡방(미우 ↔ 가온)에 어제부터 견적 부탁드렸는데 "확인 후 연락", "확인해보겠다"만 두 번이고 아직 답이 없으세요. 오늘 안에 부탁드려요',
              senderId: 'park-rep',
              time: '오후 3:12',
              isNew: true,
              meta: { urgent: true },
            },
          ],
        },
      },
      presets: [
        {
          id: 's5-next',
          text: '이팀장이 박대표에게 즉시 회신 — 사과 + 1시간 내 회신 약속',
          kind: 'admin',
          nextStateIndex: 6,
        },
      ],
      memo: {
        title: 'STATE 5 — 팀장의 의자에 도착한 컴플레인',
        meta: '영업팀장 시점 · Collapse 정점',
        situation:
          '이팀장은 박대표를 6개월 전 명함 한 번 교환했을 뿐. 갑자기 1:1 컴플레인이 도착. 자기 팀의 어떤 BR이 어떤 상황을 만들었는지 모름.',
        interact: '메시지를 읽고 한숨. 강승희에게 무슨 일인지 물어봐야 함.',
        feel: [
          '팀장: "내가 모르는 일이 내 팀에서 벌어졌다"',
          '청중: "본부장이 알면 더 큰일"',
          '"분기 손실 가능성"',
        ],
        connect: [
          'WON TALK Ch.7 — 관리자가 채널 상태를 실시간으로 본다',
          'WON TALK Ch.8 — BR별 응답 시간을 분기 회의 자료로',
        ],
      },
    },
    // STATE 6 — 이팀장이 박대표에게 즉각 사과 회신 (박대표 ↔ 이팀장 활성)
    {
      index: 6,
      activeCastIds: ['park-rep', 'lee-team'],
      guide:
        '이팀장이 박대표에게 1:1로 회신합니다. "박대표님 죄송합니다. 바로 확인하고 1시간 내 회신드리겠습니다." — 컴플레인에 대한 응급 사과.',
      phones: {
        'park-rep': {
          type: 'kakao-1to1',
          headerTitle: '이윤 (가온 영업팀장)',
          headerSubtitle: '1:1 채팅',
          messages: [
            {
              id: 'm-complaint',
              kind: 'message',
              text:
                '팀장님, 죄송한데 직접 카톡드려요. 강승희님 카톡 단톡방(미우 ↔ 가온)에 어제부터 견적 부탁드렸는데 "확인 후 연락", "확인해보겠다"만 두 번이고 아직 답이 없으세요. 오늘 안에 부탁드려요',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 3:12',
            },
            {
              id: 'm-team-reply',
              kind: 'message',
              text: '박대표님 죄송합니다. 바로 확인하고 1시간 내 회신드리겠습니다.',
              senderId: 'lee-team',
              time: '오후 3:15',
              isNew: true,
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          pushNotifications: pushOverload,
          messages: [
            ...baseGroupMessages,
            { ...evadeLine, side: 'mine' },
            parkUrgeLine,
            { ...kangEvade2Line, side: 'mine' },
          ],
        },
        'lee-team': {
          type: 'kakao-1to1',
          headerTitle: '박대표 (미우케이블)',
          headerSubtitle: '1:1 채팅 · 새 친구',
          messages: [
            {
              id: 'm-complaint-recv-step2',
              kind: 'message',
              text:
                '팀장님, 죄송한데 직접 카톡드려요. 강승희님 카톡 단톡방(미우 ↔ 가온)에 어제부터 견적 부탁드렸는데 "확인 후 연락", "확인해보겠다"만 두 번이고 아직 답이 없으세요. 오늘 안에 부탁드려요',
              senderId: 'park-rep',
              time: '오후 3:12',
            },
            {
              id: 'm-team-reply-mine',
              kind: 'message',
              text: '박대표님 죄송합니다. 바로 확인하고 1시간 내 회신드리겠습니다.',
              senderId: 'lee-team',
              side: 'mine',
              time: '오후 3:15',
              isNew: true,
            },
          ],
        },
      },
      presets: [
        {
          id: 's6-next',
          text: '이팀장이 강승희에게 책임 추궁',
          kind: 'admin',
          nextStateIndex: 7,
        },
      ],
      memo: {
        title: 'STATE 6 — 팀장의 즉각 사과, 그러나 원인은 모름',
        meta: '영업팀장 시점 · 응급 응대 vs 정보 부재',
        situation:
          '이팀장은 어떤 상황인지 모르면서도 우선 사과 + 1시간 내 회신 약속. 거래처를 잡기 위한 응급 처치이지만, 강승희에게 무슨 일이 있었는지 회사는 아직 정량 데이터로 알지 못한다.',
        interact: '팀장은 회신 메시지 1건 발송. 박대표는 첫 응답을 받음.',
        feel: [
          '팀장: "일단 사과부터 — 그런데 1시간 안에 정리할 수 있을까"',
          '거래처: "그래도 팀장에게 직접 답을 받았다"',
          '청중: "사람이 빠르게 메우는 응대 — 시스템은 어디에 있는가"',
        ],
        connect: [
          '다음 STATE — 팀장이 강승희에게 5가지 질문',
          'Ch.2 (Act III) — 팀장이 모니터링 큐에서 먼저 보고 부스트 발동',
        ],
      },
    },
    // STATE 7 — 이팀장 책임 추궁
    {
      index: 7,
      activeCastId: 'lee-team',
      activeCastIds: ['lee-team', 'kang-bs'],
      guide:
        '이팀장이 강승희에게 1:1 카톡으로 책임 추궁. 5가지 질문 — 누가, 언제, 몇 번, 왜, 어떻게.',
      phones: {
        'park-rep': {
          type: 'kakao-1to1',
          headerTitle: '이윤 (가온 영업팀장)',
          headerSubtitle: '1:1 채팅',
          messages: [
            {
              id: 'm-complaint',
              kind: 'message',
              text: '팀장님, 죄송한데 직접 카톡드려요…',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 3:12',
            },
            {
              id: 'm-team-reply',
              kind: 'message',
              text: '박대표님 죄송합니다. 바로 확인하고 1시간 내 회신드리겠습니다.',
              senderId: 'lee-team',
              time: '오후 3:15',
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-1to1',
          headerTitle: '이윤 팀장',
          headerSubtitle: '1:1 채팅 · 우급',
          messages: [
            {
              id: 'm-grill',
              kind: 'message',
              text: '강승희님, 미우케이블 박대표님 견적 건 무슨 상황이에요? 박대표가 저한테 직접 카톡으로 컴플레인 왔어요. 어떤 상황인지 보고해 주시고, 우리 BR 1명당 거래처 분기 응대 건수가 몇 건인지도 정리해 주세요.',
              senderId: 'lee-team',
              time: '오후 3:16',
              isNew: true,
              meta: { urgent: true },
            },
          ],
        },
        'lee-team': {
          type: 'kakao-1to1',
          headerTitle: '강승희 BR',
          headerSubtitle: '1:1 채팅 · 우급',
          messages: [
            {
              id: 'm-grill-mine',
              kind: 'message',
              text: '강승희님, 미우케이블 박대표님 견적 건 무슨 상황이에요? 박대표가 저한테 직접 카톡으로 컴플레인 왔어요. 어떤 상황인지 보고해 주시고, 우리 BR 1명당 거래처 분기 응대 건수가 몇 건인지도 정리해 주세요.',
              senderId: 'lee-team',
              side: 'mine',
              time: '오후 3:16',
            },
          ],
        },
      },
      presets: [],
      memo: {
        title: 'STATE 7 — 다섯 가지 질문',
        meta: '영업팀장 시점 · Collapse 마감',
        situation:
          '팀장이 BR에게 묻는 5가지 — ① 누가 ② 언제 ③ 몇 번 ④ 왜 ⑤ 어떻게. 이것에 답할 수 있는 데이터가 회사에 없다.',
        interact: '팀장은 보고 요청. BR은 카톡 스크롤 + 엑셀 취합 시작.',
        feel: [
          'BR: "이걸 어떻게 정리하지"',
          '팀장: "분기 회의에 들어갈 자료"',
          '청중: "이 5가지 질문에 즉답할 수 있는 시스템이 필요하다"',
        ],
        connect: [
          'WON TALK Ch.5 — 셀프 조회 + 추적 URL로 누가/언제 자동 답',
          'WON TALK Ch.7 — 메시지 도달율과 응답시간이 콘솔에서 즉시',
          'WON TALK Ch.8 — BR별 분기 응대 건수 대시보드',
        ],
      },
    },
  ],
};
