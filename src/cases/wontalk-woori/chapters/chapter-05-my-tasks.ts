import type { Chapter } from '../../_types';

const myTasks = [
  {
    id: '9872',
    title: '신규 대출 — 홍길동',
    sub: '아이오닉 6 · 35,000,000원 · 오토론',
    status: 'progress' as const,
    meta: '담당 김경화 · 처리 시작 2:19',
  },
  {
    id: '9841',
    title: '금리 문의 — 이철수',
    sub: '캐스퍼 일렉트릭 · 추가 금리 우대 검토',
    status: 'pending' as const,
    meta: '접수 14:02 · SLA 4시간',
  },
  {
    id: '9803',
    title: '대출 승인 — 김민준',
    sub: 'K8 하이브리드 · 28,000,000원',
    status: 'done' as const,
    meta: '완료 어제 17:42',
  },
  {
    id: '9755',
    title: '리스 신청 — 박서연',
    sub: 'EV6 GT · 36개월 운용 리스',
    status: 'done' as const,
    meta: '완료 7.5 · 처리 소요 2h 11m',
  },
];

export const chapter05MyTasks: Chapter = {
  id: 5,
  act: 3,
  title: '"어떻게 됐어요?"는 옛말',
  subtitle: '내 신청 건의 상태를 직접 — 단톡방에 물어볼 필요가 없다',
  narration:
    '예전에는 BR에게 매번 메시지로 진행 상황을 물어봐야 했습니다. 이제 강민호는 "내 대화 보기" 탭 하나로 본인 신청 건의 상태를 직접 확인합니다.',
  stage: 'phone-workspace',
  states: [
    {
      index: 0,
      activeCastId: 'park-rep',
      guide: '강민호가 그룹채팅 우상단의 "내 대화 보기"를 탭합니다.',
      phones: {
        guest: {
          type: 'wontalk-group',
          headerTitle: '지엔에이 영업팀',
          headerSubtitle: '참여자 11명',
          messages: [
            {
              id: 'wonder',
              kind: 'message',
              text: '아까 접수한 #9872 건 어떻게 됐지? 김경화님께 또 물어봐야 하나…',
              senderId: 'park-rep',
              side: 'mine',
              time: '오후 2:41',
              isNew: true,
            },
          ],
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '지엔에이 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-watch',
              kind: 'system',
              text: '🔍 강민호가 #9872 진행 조회 시도',
              meta: { tone: 'muted' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-ask-volume',
            kind: 'audit-log',
            title: '"어떻게 됐어요?" 메시지 빈도',
            body: '지엔에이 영업팀 · 지난 분기 일평균 23회. BR 응대 시간의 11% 차지.',
            highlight: 'NOISE · 11% of BR time',
            tone: 'warn',
          },
        ],
      },
      presets: [
        {
          id: 'open-tasks',
          text: '"내 대화 보기" 탭 열기',
          kind: 'guest',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 매일 일어나는 노이즈',
        meta: '강민호 · 게스트 시점',
        situation:
          '거래처는 자기 신청건 상태를 모르니 매번 BR에게 묻는다. BR 응대 시간의 11%가 진행 조회 응답에 소비된다.',
        interact: '게스트는 보통 "어떻게 됐어요?" 메시지를 추가 발송한다.',
        feel: [
          '청중: "이게 우리 회사에선 매일 일어난다"',
          'BR: 진행 조회 응답 누적이 SLA를 갉아먹는다',
        ],
        connect: ['다음 STATE에서 같은 데이터를 게스트가 직접 조회'],
      },
    },
    {
      index: 1,
      activeCastId: 'park-rep',
      guide: '"내 대화 보기" 진입. 강민호는 자기 4건의 진행 상태를 한 화면에서 확인.',
      phones: {
        guest: {
          type: 'tasks',
          headerTitle: '내 대화 보기',
          headerSubtitle: '강민호 · 신청 건 4건',
          meta: {
            filter: 'all',
            tasks: myTasks,
          },
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '지엔에이 영업팀',
          participants: 11,
          messages: [
            {
              id: 'ws-self-served',
              kind: 'system',
              text: '✅ 강민호 — 셀프 진행 조회 (메시지 발송 없이 4건 상태 확인)',
              meta: { tone: 'good' },
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-self-serve',
            kind: 'auto-assign',
            title: '셀프 서비스 조회',
            body: '같은 추적 URL 데이터를 발신자가 직접 조회. 별도 메시지 발송 0.',
            highlight: 'SELF-SERVE · 1 click',
            tone: 'good',
          },
          {
            id: 'p-saved-time',
            kind: 'new-task',
            title: '응대 시간 절감 (시뮬레이션)',
            body: '"어떻게 됐어요?" 일평균 23건 → 셀프 서비스 전환 시 BR 응대 시간 대폭 절감',
            highlight: '──% BR 시간 절감',
            tone: 'brand',
            meta: '측정 기준 곧 공개',
          },
          {
            id: 'p-csat',
            kind: 'audit-log',
            title: '체감 응답성',
            body: '진행 상태가 항상 보여서 "기다리는 느낌"이 사라짐 → 파트너 CSAT 개선',
            highlight: '──% CSAT 개선',
            tone: 'muted',
            meta: '측정 기준 곧 공개',
          },
        ],
      },
      presets: [
        {
          id: 'guest-relieved',
          text: '아, 탭 하나로 다 보이네요. 매번 물어볼 필요가 없겠는데요?',
          kind: 'guest',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 셀프 서비스의 정의',
        meta: 'Cowork+ · 내 대화 보기',
        situation:
          '같은 추적 URL을 발신자가 자기 시점으로 한 번에 조회. 대기/처리중/완료 필터로 우선 처리할 일도 명확.',
        interact: '게스트는 탭 1회로 전 상태 확인. 운영자는 메시지가 줄어든 양을 본다.',
        feel: [
          '"내가 직접 본다는 안도감"',
          '청중: 23회 × 4,000명 × 분기 = 11% BR 시간',
          'BR: 진짜 처리에만 집중',
        ],
        connect: ['Ch.4의 자동 배정 + Ch.5의 셀프 조회 = BR 시간 회수'],
      },
    },
    {
      index: 2,
      activeCastId: 'kim-kyunghwa',
      guide: 'BR이 같은 데이터의 운영자 뷰로 강민호 건들의 상세를 동시에 본다.',
      phones: {
        guest: {
          type: 'tasks',
          headerTitle: '내 대화 보기',
          headerSubtitle: '강민호 · 처리중 1건',
          meta: {
            filter: 'progress',
            tasks: myTasks,
          },
        },
      },
      workspace: {
        mode: 'chat',
        chat: {
          title: '지엔에이 영업팀',
          participants: 11,
          messages: [
            {
              id: 'br-confirm',
              kind: 'message',
              text: '"어떻게 됐어요?" 문의 안 하셔도 돼요! 탭 하나로 본인 건 상태 바로 확인 가능합니다 🙂',
              senderId: 'kim-kyunghwa',
              side: 'other',
              time: '오후 2:43',
              isNew: true,
            },
          ],
        },
        operatorPanel: [
          {
            id: 'p-same-truth',
            kind: 'tracking-code',
            title: '단일 진실원 재확인',
            body: '게스트 폰 · BR Workspace · 관리자 대시보드 모두 동일 데이터',
            highlight: 'SSOT · 1 dataset',
            tone: 'brand',
          },
        ],
      },
      presets: [],
      memo: {
        title: 'STATE 2 — 게스트와 BR이 같은 화면을 본다',
        meta: 'Cowork+ · 같은 데이터, 다른 시점',
        situation:
          '게스트와 BR이 같은 데이터를 자기 시점으로 본다. 같은 진실원을 공유하기 때문에 "다른 답"이 나올 수가 없다.',
        interact: '게스트는 "처리중" 필터, BR은 자기 큐 전체. 같은 #9872 건이 양쪽에 동기.',
        feel: ['청중: "엑셀 따로 카톡 따로의 끝"', '운영자: 데이터 신뢰감'],
        connect: ['Ch.8 — 같은 데이터의 관리자 뷰가 대시보드'],
      },
    },
  ],
  onComplete: { nextChapter: 6, demoAutoAdvance: true },
};
