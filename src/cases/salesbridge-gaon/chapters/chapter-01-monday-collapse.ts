import type { Chapter, ChatLine, PushNotification } from '../../_types';

// Ch.0 “9월의 어느 날” 다음, 주말이 지난 월요일.
// 박대표가 오전 9:02 단톡방에 또 메시지를 남기지만 6시간째 답이 없고,
// 결국 오후 3시 이후 사이드 채널이 다시 열리며 팀장 보고선까지 무너지는 장면.

const monMorningPushes: PushNotification[] = [
  {
    id: 'push-mw',
    room: '미우케이블 ↔ 가온',
    sender: '박대표',
    preview: '주말 잘 보내셨어요? 그 견적 건 오늘은 부탁드려요',
    unread: 4,
    urgent: true,
  },
  {
    id: 'push-dd',
    room: '대동케이블판매',
    sender: '박부장',
    preview: '월요일 출하 일정 변경 가능한지요',
    unread: 2,
    urgent: true,
  },
  {
    id: 'push-rs',
    room: '림스케이블',
    sender: '신차장',
    preview: '단가표 v3 다시 검토 부탁드립니다',
    unread: 5,
    urgent: true,
  },
  {
    id: 'push-kh',
    room: '금호',
    sender: '이대리',
    preview: 'PO 회신 아직 못 받았는데 본부장님 확인 중이세요',
    unread: 3,
    urgent: false,
  },
  {
    id: 'push-uh',
    room: '유한케이블',
    sender: '김상무',
    preview: '담당자 누구신지 다시 한 번…',
    unread: 1,
    urgent: false,
  },
];

const teamMon: ChatLine[] = [
  { id: 'd-22-t', kind: 'date', text: '2025년 9월 22일 (월)' },
  {
    id: 'm-team-mon',
    kind: 'message',
    text: '주간 미팅 자료 09:30까지 부탁드립니다.',
    senderId: 'lee-team',
    side: 'mine',
    time: '오전 8:45',
  },
];

const parkDirectComplaint: ChatLine = {
  id: 'm-park-direct',
  kind: 'message',
  text:
    '팀장님 죄송한데 또 직접 카톡드려요. 금요일 그 견적 건 카톡 단톡방(미우 ↔ 가온)에 또 아무 회신이 없어서요. 솔직히 이번 분기 PO 의사결정에 영향 있을 수 있을 것 같습니다.',
  senderId: 'park-rep',
  side: 'mine',
  time: '오후 3:18',
};

const parkDirectComplaintRecv: ChatLine = {
  ...parkDirectComplaint,
  side: undefined,
  isNew: true,
  meta: { urgent: true },
};

const bossEscalation: ChatLine = {
  id: 'm-boss',
  kind: 'message',
  text:
    '박대표 컴플레인 보고서 어디 있어요? 이번 분기 거래처별 응대시간·BR별 분기 응대 건수 정리도 같이. 본부장 회의 자료에 들어갑니다. 오늘 18시까지.',
  senderId: 'lee-team',
  time: '오후 3:42',
  isNew: true,
  meta: { urgent: true, label: '본부장' },
};

export const chapter01MondayCollapse: Chapter = {
  id: 1,
  act: 2,
  title: '월요일이 와도, 같은 일이 반복됩니다',
  subtitle: '한 번 열린 사이드 채널은 다시 닫히지 않습니다',
  narration:
    '주말이 지난 월요일. 오전 9:02에 박대표가 또 단톡방에 메시지를 남겼지만 강승희는 다른 거래처 응대에 묶여 답을 못 보냈고, 6시간이 흘러 오후 3시가 넘었습니다. 박대표는 더 이상 단톡방을 신뢰하지 않고, 이팀장에게는 본부장의 분기 보고 요청이 떨어집니다.',
  stage: 'three-phones',
  states: [
    // STATE 0 — 강승희 폰: 주말 동안 5개 거래처 단톡방 알림 폭주
    {
      index: 0,
      activeCastId: 'kang-bs',
      guide:
        '강승희 폰에 주말 동안 5개 거래처 단톡방의 미처리 메시지가 쌓였습니다. 미우케이블도 박대표가 또 추가 메시지를 보냈습니다.',
      phones: {
        'park-rep': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [
            { id: 'd-22', kind: 'date', text: '2025년 9월 22일 (월)' },
            {
              id: 'm-park-mon-0',
              kind: 'message',
              text: '주말 잘 보내셨어요? 그 견적 건 오늘은 부탁드려요',
              senderId: 'park-rep',
              side: 'mine',
              time: '오전 9:02',
            },
            {
              id: 'm-no-reply-mon',
              kind: 'system',
              text: '— 답 없음 (6시간째) —',
              meta: { tone: 'warn' },
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          pushNotifications: monMorningPushes,
          messages: [
            { id: 'd-22', kind: 'date', text: '2025년 9월 22일 (월)' },
            {
              id: 'm-park-mon-0-r',
              kind: 'message',
              text: '주말 잘 보내셨어요? 그 견적 건 오늘은 부탁드려요',
              senderId: 'park-rep',
              time: '오전 9:02',
            },
            {
              id: 'm-overload-note',
              kind: 'system',
              text: '⏱ 미처리 메시지 12건 · 5개 거래처 · 우선순위 결정 필요',
              meta: { tone: 'warn' },
            },
          ],
        },
        'lee-team': {
          type: 'kakao-group',
          headerTitle: '가온 영업팀',
          headerSubtitle: '참여자 5명',
          messages: teamMon,
        },
      },
      presets: [
        {
          id: 's0-next',
          text: '박대표가 단톡방을 포기하고 이팀장 1:1로 직진',
          kind: 'guest',
          nextStateIndex: 1,
        },
      ],
      memo: {
        title: 'STATE 0 — 주말이 지나도 12건이 그대로',
        meta: '담당 BR 시점 · Collapse 심화',
        situation:
          '강승희는 오전 출근부터 오후 3시까지 다른 거래처 5개 응대에 묶여, 미우케이블 박대표 견적 건을 한 번도 못 챙겼다. 단톡방 미처리는 그대로 12건.',
        interact: '폰을 들고 메시지를 훑어보기만 함. 답장 한 줄도 못 보냄.',
        feel: [
          'BR: "오늘도 못 다 챙길 것 같다"',
          '거래처: "월요일인데 또 답이 없네"',
          '청중: "사람이 매주 야근으로 메우는 구조"',
        ],
        connect: [
          '다음 STATE에서 박대표가 단톡방을 포기하고 1:1로 직진',
          'Ch.3 (Act IV) BR별 응대시간 대시보드 — 이 12건의 시간이 전부 적재',
        ],
      },
    },
    // STATE 1 — 박대표가 단톡방을 포기하고 이팀장에게 직접
    {
      index: 1,
      activeCastId: 'park-rep',
      guide:
        '박대표는 한 번 열린 사이드 채널을 이번엔 처음부터 사용합니다. 단톡방 무시하고 이팀장 1:1로 직진.',
      phones: {
        'park-rep': {
          type: 'kakao-1to1',
          headerTitle: '이윤 (가온 영업팀장)',
          headerSubtitle: '1:1 채팅',
          messages: [
            {
              id: 'm-fri',
              kind: 'message',
              text: '팀장님, 죄송한데 직접 카톡드려요…',
              senderId: 'park-rep',
              side: 'mine',
              time: '9월 19일 오후 3:12',
            },
            {
              id: 'm-fri-reply',
              kind: 'message',
              text: '박대표님 죄송합니다. 바로 확인하고 1시간 내 회신드리겠습니다.',
              senderId: 'lee-team',
              time: '9월 19일 오후 3:15',
            },
            {
              id: 'd-22-1to1',
              kind: 'date',
              text: '2025년 9월 22일 (월)',
            },
            { ...parkDirectComplaint, isNew: true },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          pushNotifications: monMorningPushes,
          messages: [
            { id: 'd-22', kind: 'date', text: '2025년 9월 22일 (월)' },
            {
              id: 'm-park-mon-0-r2',
              kind: 'message',
              text: '주말 잘 보내셨어요? 그 견적 건 오늘은 부탁드려요',
              senderId: 'park-rep',
              time: '오전 9:02',
            },
            {
              id: 'm-overload-note-2',
              kind: 'system',
              text: '⏱ 미처리 메시지 12건 · 5개 거래처',
              meta: { tone: 'warn' },
            },
          ],
        },
        'lee-team': {
          type: 'kakao-1to1',
          headerTitle: '박대표 (미우케이블)',
          headerSubtitle: '1:1 채팅',
          messages: [
            {
              id: 'm-fri-r',
              kind: 'message',
              text: '팀장님, 죄송한데 직접 카톡드려요…',
              senderId: 'park-rep',
              time: '9월 19일 오후 3:12',
            },
            {
              id: 'm-fri-reply-m',
              kind: 'message',
              text: '박대표님 죄송합니다. 바로 확인하고 1시간 내 회신드리겠습니다.',
              senderId: 'lee-team',
              side: 'mine',
              time: '9월 19일 오후 3:15',
            },
            {
              id: 'd-22-1to1-r',
              kind: 'date',
              text: '2025년 9월 22일 (월)',
            },
            parkDirectComplaintRecv,
          ],
        },
      },
      presets: [
        {
          id: 's1-next',
          text: '본부장이 이팀장에게 분기 보고서를 요구',
          kind: 'admin',
          nextStateIndex: 2,
        },
      ],
      memo: {
        title: 'STATE 1 — 사이드 채널이 첫 번째 선택지가 됨',
        meta: '거래처 시점 · Collapse 정점',
        situation:
          '지난주 사이드 채널이 효과를 본 거래처가 이번엔 단톡방을 건너뛰고 1:1을 첫 시도로 사용. PO 영향 시사까지 추가.',
        interact: '거래처는 압박 메시지 1건. 회사는 공식 채널에 기록 없음.',
        feel: [
          '거래처: "이 길이 더 빠르다"',
          '회사: "1:1 컴플레인이 표준 응대 경로가 되어버림"',
          '청중: "한 번 열린 사이드 채널이 막힐 수 있는가"',
        ],
        connect: [
          'Ch.2 (Act III) — 같은 1:1 시도가 회사 채널의 에스컬레이션 카드로 흡수',
          '비공식 채널 차단율 ROI 지표',
        ],
      },
    },
    // STATE 2 — 이팀장 폰: 본부장으로부터 분기 보고서 요구
    {
      index: 2,
      activeCastId: 'lee-team',
      guide:
        '이팀장 폰에 본부장 1:1 카톡 도착. 박대표 컴플레인 보고서 + 거래처/BR별 분기 응대 자료 요구. 마감 오늘 18시.',
      phones: {
        'park-rep': {
          type: 'kakao-1to1',
          headerTitle: '이윤 (가온 영업팀장)',
          headerSubtitle: '1:1 채팅',
          messages: [
            parkDirectComplaint,
            {
              id: 'm-team-read',
              kind: 'system',
              text: '읽음',
              meta: { tone: 'muted' },
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          pushNotifications: monMorningPushes,
          messages: [
            { id: 'd-22', kind: 'date', text: '2025년 9월 22일 (월)' },
            {
              id: 'm-park-mon-0-r3',
              kind: 'message',
              text: '주말 잘 보내셨어요? 그 견적 건 오늘은 부탁드려요',
              senderId: 'park-rep',
              time: '오전 9:02',
            },
            {
              id: 'm-overload-note-3',
              kind: 'system',
              text: '⏱ 미처리 메시지 12건 · 5개 거래처',
              meta: { tone: 'warn' },
            },
          ],
        },
        'lee-team': {
          type: 'kakao-1to1',
          headerTitle: '본부장',
          headerSubtitle: '1:1 채팅 · 우선',
          messages: [bossEscalation],
        },
      },
      presets: [
        {
          id: 's2-next',
          text: '강승희가 야근으로 보고서를 만드는 중',
          kind: 'br',
          nextStateIndex: 3,
        },
      ],
      memo: {
        title: 'STATE 2 — 회사가 답할 수 없는 다섯 가지 질문',
        meta: '영업팀장 시점 · 분기 회의 압박',
        situation:
          '본부장은 "누가/언제/몇 번/왜/어떻게"를 정량으로 요구. 가온에는 이걸 즉답할 시스템이 없다. 보고서를 만드는 일이 BR에게 떨어진다.',
        interact: '팀장은 BR에게 요청을 떠넘기는 것 외에 할 수 있는 게 없다.',
        feel: [
          '팀장: "본부장 회의 자료를 BR이 야근으로 만든다"',
          '청중: "이건 매 분기 반복되는 풍경"',
        ],
        connect: [
          'Ch.3 (Act IV) — 같은 질문에 클릭 한 번으로 답하는 대시보드',
          '이 데이터는 ONE TALK 도입 후 자동 집계됨',
        ],
      },
    },
    // STATE 3 — 강승희 폰: 야근 (오후 9:47), 카톡 캡처를 엑셀에 옮기는 중
    {
      index: 3,
      activeCastId: 'kang-bs',
      guide:
        '강승희가 5개 거래처 × 12주치 카톡방 메시지를 캡처해서 엑셀에 옮기는 중. 시간은 오후 9:47.',
      phones: {
        'park-rep': {
          type: 'kakao-1to1',
          headerTitle: '이윤 (가온 영업팀장)',
          headerSubtitle: '1:1 채팅',
          messages: [
            parkDirectComplaint,
            {
              id: 'm-team-late-reply',
              kind: 'message',
              text: '확인하고 있습니다. 오늘 안에 회신드리겠습니다.',
              senderId: 'lee-team',
              time: '오후 4:18',
            },
          ],
        },
        'kang-bs': {
          type: 'kakao-group',
          headerTitle: '미우케이블 ↔ 가온',
          headerSubtitle: '참여자 8명',
          messages: [
            {
              id: 'm-late-note-1',
              kind: 'system',
              text: '🕘 야근 모드 · 오후 9:47',
              meta: { tone: 'warn' },
            },
            {
              id: 'm-late-note-2',
              kind: 'system',
              text: '📋 보고서 자료 취합 중 — 카톡 캡처 247건 / 엑셀 시트 5개 / 폰 메모 32건',
              meta: { tone: 'muted' },
            },
            {
              id: 'm-late-note-3',
              kind: 'system',
              text: '⌛ 추정 완성 시각 새벽 1시 30분',
              meta: { tone: 'danger' },
            },
            {
              id: 'm-late-quote',
              kind: 'message',
              text: '5개 거래처 × 12주 = 카톡방 60개를 손으로 정리하는 중… 어디서부터 시작해야 할지 모르겠다.',
              senderId: 'kang-bs',
              side: 'mine',
              time: '오후 9:47',
              meta: { whisper: true },
            },
          ],
        },
        'lee-team': {
          type: 'kakao-1to1',
          headerTitle: '본부장',
          headerSubtitle: '1:1 채팅 · 우선',
          messages: [
            bossEscalation,
            {
              id: 'm-team-self-reply',
              kind: 'message',
              text: '죄송합니다. 자료가 흩어져 있어서 정리에 시간이 더 걸립니다. 내일 오전 9시까지 다시 드리겠습니다.',
              senderId: 'lee-team',
              side: 'mine',
              time: '오후 8:11',
            },
          ],
        },
      },
      presets: [],
      memo: {
        title: 'STATE 3 — 사람이 매주 야근으로 시스템을 메운다',
        meta: '담당 BR 시점 · Collapse 마감',
        situation:
          '카톡 247건 캡처 + 엑셀 5시트 + 폰 메모 32건. 시스템이 없어서 BR이 매주 4~6시간씩 야근으로 보고서를 만든다.',
        interact: 'BR은 손으로 데이터를 옮긴다. 정확성은 보장되지 않는다.',
        feel: [
          'BR: "내가 잘못해서 야근하는 게 아니라 회사에 도구가 없어서"',
          '청중: "이게 진짜 비용 — 한 BR이 분기마다 24시간 손실"',
          '"본부장이 받는 자료는 진짜 데이터가 아니라 BR의 추측"',
        ],
        connect: [
          'Ch.2 (Act III)에서 이 모든 것이 ONE TALK 채널에 자동 적재되기 시작',
          'Ch.3 (Act IV)에서 자동 집계 → 5분 안에 보고서',
        ],
      },
    },
  ],
  onComplete: { nextChapter: 2, demoAutoAdvance: true },
};
