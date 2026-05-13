import type { Chapter, DesktopMessage, KakaoPCWindowState } from '../../_types';
import { clockDate, makeExcel, taskbarAppsBase } from '../_shared';

const WIN_POS = {
  keumho: { top: 46, left: 570, zIndex: 2 },
  rims: { top: 36, left: 550, zIndex: 3 },
  daedong: { top: 26, left: 530, zIndex: 4 },
  miu: { top: 16, left: 510, zIndex: 5 },
  kang: { top: 100, left: 590, zIndex: 6 },
  park: { top: 120, left: 610, zIndex: 7 },
} as const;

// ─────────────────────────────────────────────────────────────
// Shared message blocks — 상태 간 메시지 텍스트/시간/순서가 절대 흔들리지 않도록 공유
// ─────────────────────────────────────────────────────────────

const M = {
  date17: { id: 'd17', kind: 'date', text: '2025년 11월 17일 (월)' },
  kangIntro: {
    id: 'm-kang-intro',
    kind: 'message',
    sender: '강승희',
    text: '안녕하세요 박대표님. 이번 주 발주 일정 공유드립니다.',
    time: '오후 2:00',
  },
  parkThanks: {
    id: 'm-park-thanks',
    kind: 'message',
    sender: '박대표',
    text: '확인했습니다 감사합니다',
    time: '오후 2:15',
  },
  date18: { id: 'd18', kind: 'date', text: '2025년 11월 18일 (화)' },
  parkRequest: {
    id: 'm-park-request',
    kind: 'message',
    sender: '박대표',
    text: '팀장님 안녕하세요. CV-A001 견적 부탁드립니다.',
    time: '오전 8:45',
  },
  parkFollowup: {
    id: 'm-park-followup',
    kind: 'message',
    sender: '박대표',
    text: '오늘 안에 회신 가능하실까요?',
    time: '오전 9:20',
  },
  kangFile: {
    id: 'm-kang-file',
    kind: 'file',
    sender: '강승희',
    fileName: '견적서_대동_v3.xlsx',
    fileSize: '14KB',
    fileType: 'xls',
    time: '오전 9:28',
  } as DesktopMessage,
  kangFileClickable: {
    id: 'm-kang-file',
    kind: 'file',
    sender: '강승희',
    fileName: '견적서_대동_v3.xlsx',
    fileSize: '14KB',
    fileType: 'xls',
    time: '오전 9:28',
    clickableFileId: 'quote-1',
  } as DesktopMessage,
  kangFileDeleted: {
    id: 'm-kang-file',
    kind: 'deleted',
    sender: '강승희',
    text: '삭제된 메시지입니다',
    time: '오전 9:28',
  } as DesktopMessage,
  parkConfirm: {
    id: 'm-park-confirm',
    kind: 'message',
    sender: '박대표',
    text: '감사합니다 확인해보겠습니다',
    time: '오전 9:32',
  },
  parkSuspicion: {
    id: 'm-park-suspicion',
    kind: 'message',
    sender: '박대표',
    text: '어? 강 사원님, 왜 파일 지우셨어요?',
    time: '오전 9:46',
  },
  systemNoReply: {
    id: 'sys-no-reply',
    kind: 'system',
    text: '— 단톡방 답 없음 —',
  },
} satisfies Record<string, DesktopMessage>;

const KANG_M = {
  sysFirst: { id: 'k-sys-1', kind: 'system', text: '— 1:1 개인톡 (마지막 대화: 3주 전) —' },
  sysLater: { id: 'k-sys-2', kind: 'system', text: '— 1:1 개인톡 —' },
  bossDelete: {
    id: 'k-boss-delete',
    kind: 'message',
    isMine: true,
    text: '강 사원, 미우 단톡방에 보낸 견적서 대동 단가표야. 당장 삭제해.',
    time: '오전 9:40',
  },
  kangOK: {
    id: 'k-ok',
    kind: 'message',
    sender: '강승희',
    text: '네 죄송합니다 바로 삭제하겠습니다',
    time: '오전 9:41',
  },
  kangDone: {
    id: 'k-done',
    kind: 'message',
    sender: '강승희',
    text: '삭제 완료했습니다',
    time: '오전 9:42',
  },
} satisfies Record<string, DesktopMessage>;

const PARK_M = {
  sys: { id: 'p-sys', kind: 'system', text: '— 마지막 대화: 3개월 전 —' },
  directHello: {
    id: 'p-hello',
    kind: 'message',
    sender: '박대표',
    text: '팀장님, 죄송한데 직접 연락드려요.',
    time: '오전 9:50',
  },
  directBody: {
    id: 'p-body',
    kind: 'message',
    sender: '박대표',
    text: '강 사원님 단톡방에 견적 파일 받았는데 우리 단가가 800원이라고 와있더라구요.',
    time: '오전 9:51',
  },
  capture: {
    id: 'p-capture',
    kind: 'file-captured',
    sender: '박대표',
    fileName: '단가표_캡처.png',
    fileSize: '186KB',
    fileType: 'png',
    fileNote: '대동 800 / 미우 1,000',
    time: '오전 9:51',
  } as DesktopMessage,
  captureNote: {
    id: 'p-note',
    kind: 'message',
    sender: '박대표',
    text: '캡처해뒀습니다. 근데 우리 평소 단가는 1,000원인데...',
    time: '오전 9:52',
  },
  question: {
    id: 'p-question',
    kind: 'message',
    sender: '박대표',
    text: '왜 같은 품번에 거래처마다 단가가 다른 거예요?',
    time: '오전 9:52',
  },
  followupPlease: {
    id: 'p-please',
    kind: 'message',
    sender: '박대표',
    text: '답변 부탁드립니다.',
    time: '오전 10:10',
    readBy: '읽음',
  },
} satisfies Record<string, DesktopMessage>;

// 미우 단톡방 누적 메시지 헬퍼 — 상태별로 새 메시지를 append만 한다.
const MIU_BASE = [M.date17, M.kangIntro, M.parkThanks, M.date18, M.parkRequest];

const MIU_STATE_BY_INDEX: DesktopMessage[][] = [];
MIU_STATE_BY_INDEX[0] = [...MIU_BASE];
MIU_STATE_BY_INDEX[1] = [...MIU_BASE, M.parkFollowup, M.kangFile];
MIU_STATE_BY_INDEX[2] = [...MIU_BASE, M.parkFollowup, M.kangFile, M.parkConfirm];
MIU_STATE_BY_INDEX[3] = [...MIU_BASE, M.parkFollowup, M.kangFileClickable, M.parkConfirm];
MIU_STATE_BY_INDEX[4] = [...MIU_BASE, M.parkFollowup, M.kangFile, M.parkConfirm];
MIU_STATE_BY_INDEX[5] = [...MIU_BASE, M.parkFollowup, M.kangFile, M.parkConfirm];
MIU_STATE_BY_INDEX[6] = [...MIU_BASE, M.parkFollowup, M.kangFileDeleted, M.parkConfirm];
MIU_STATE_BY_INDEX[7] = [
  ...MIU_BASE,
  M.parkFollowup,
  M.kangFileDeleted,
  M.parkConfirm,
  M.parkSuspicion,
];
MIU_STATE_BY_INDEX[8] = [
  ...MIU_BASE,
  M.parkFollowup,
  M.kangFileDeleted,
  M.parkConfirm,
  M.parkSuspicion,
];
MIU_STATE_BY_INDEX[9] = [
  ...MIU_BASE,
  M.parkFollowup,
  M.kangFileDeleted,
  M.parkConfirm,
  M.parkSuspicion,
  M.systemNoReply,
];

function keumhoWindow(): KakaoPCWindowState {
  return {
    id: 'keumho',
    title: '금호 ↔ 가온',
    participants: '이대리, 박지영, 윤현...',
    participantsCount: 6,
    position: WIN_POS.keumho,
    messages: [],
  };
}

function rimsWindow(): KakaoPCWindowState {
  return {
    id: 'rims',
    title: '림스케이블 ↔ 가온',
    participants: '신차장, 박지영, 강승희...',
    participantsCount: 8,
    position: WIN_POS.rims,
    messages: [],
  };
}

function daedongWindow(): KakaoPCWindowState {
  return {
    id: 'daedong',
    title: '대동케이블판매 ↔ 가온',
    participants: '박부장, 강승희, 윤현...',
    participantsCount: 7,
    position: WIN_POS.daedong,
    messages: [],
  };
}

function miuWindow(messages: DesktopMessage[]): KakaoPCWindowState {
  return {
    id: 'miu',
    title: '미우케이블 ↔ 가온 영업지원',
    participants: '박대표, 양예은, 차상훈, 강승희...',
    participantsCount: 8,
    position: WIN_POS.miu,
    messages,
  };
}

function kangWindow(opts: {
  visible: boolean;
  messages: DesktopMessage[];
  preset?: { text: string; nextStateIndex: number };
}): KakaoPCWindowState {
  return {
    id: 'kang',
    title: '강승희 사원 (1:1)',
    participants: '영업지원팀 · 1:1',
    variant: 'urgent',
    position: WIN_POS.kang,
    visible: opts.visible,
    messages: opts.messages,
    preset: opts.preset,
  };
}

function parkWindow(opts: {
  visible: boolean;
  messages: DesktopMessage[];
}): KakaoPCWindowState {
  return {
    id: 'park',
    title: '박대표 (1:1) ⚠️',
    participants: '1:1 · 마지막 3개월 전',
    variant: 'urgent',
    position: WIN_POS.park,
    visible: opts.visible,
    messages: opts.messages,
  };
}

export const chapter01MondayMorning: Chapter = {
  id: 1,
  act: 1,
  title: '평범한 오전',
  subtitle: '강승희 사원의 PC · 카톡 6창과 Excel 단가표 사이에서 사고가 발생합니다.',
  narration:
    '2025년 11월 18일 화요일. 강승희 사원의 모니터에는 거래처 카톡 단톡방 4개와 Excel 단가표가 동시에 떠 있습니다. 박대표의 견적 요청이 평소처럼 들어오고, 평소처럼 답신을 보냈는데 — 보낸 견적서 파일이 잘못된 거래처의 단가표였습니다.',
  stage: 'desktop-pc',
  states: [
    // STATE 0 — 평범한 오전 (intro guide + 첫 화면)
    {
      index: 0,
      phones: undefined,
      guide:
        '강승희 사원의 PC. 미우 단톡방에 박대표가 견적 요청을 보냈습니다. 평범한 오전, 평범한 응대의 시작.',
      desktop: {
        clockTime: '09:14',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({}),
        chatList: [
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: CV-A001 견적 부탁드립니다', time: '08:45', badge: 1, avatar: 'miu', icon: '👥', active: true },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 오늘 출하 일정 확인...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
          { id: 'keumho', name: '금호 ↔ 가온', preview: '이대리: 회신 부탁드립니다', time: '어제', avatar: 'keumho', icon: '👥' },
        ],
        toasts: [
          { id: 't1', from: '미우 박대표', room: '미우케이블 ↔ 가온', text: '팀장님 안녕하세요. CV-A001 견적 부탁드립니다.' },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[0]),
          kangWindow({ visible: false, messages: [] }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 1 — 평범한 오전의 시작',
        meta: '09:14 · 강승희 PC',
        situation:
          '카톡 단톡방 4개와 Excel 단가표가 모니터에 같이 떠 있는 흔한 출근 직후. 박대표 견적 요청이 평소처럼 도착.',
        interact: '왼쪽 Excel 단가표에서 거래처별 단가 확인. 오른쪽 카톡 6창과 채팅 목록.',
        feel: ['"매일 똑같은 시작"', '청중: 강승희 머릿속에 6개 거래처의 단가가 다 있어야 한다'],
        connect: ['→ 09:28 강승희가 견적서 첨부 → 사고의 발단'],
      },
    },

    // STATE 1 — 강승희 발송 (09:28)
    {
      index: 1,
      phones: undefined,
      desktop: {
        clockTime: '09:28',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({}),
        chatList: [
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '강승희: [파일] 견적서_대동_v3.xlsx', time: '방금', badge: 2, avatar: 'miu', icon: '👥', active: true },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 오늘 출하 일정...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
          { id: 'keumho', name: '금호 ↔ 가온', preview: '이대리: 회신 부탁드립니다', time: '어제', avatar: 'keumho', icon: '👥' },
        ],
        toasts: [
          { id: 't1', from: '강승희 사원', room: '미우케이블 ↔ 가온', text: '[견적서_대동_v3.xlsx] 파일을 보냈습니다' },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[1]),
          kangWindow({ visible: false, messages: [] }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 2 — 강승희 발송',
        meta: '09:28',
        situation:
          '강승희가 견적서 파일을 미우 단톡방에 첨부 전송. 파일명: 견적서_대동_v3.xlsx — 실제로는 대동 거래처용 파일을 잘못 골라서 보냄.',
        interact: '카톡 PC 클라이언트의 파일 첨부 흐름. 사람의 눈으로는 비슷한 파일명을 분간하기 어렵다.',
        feel: ['청중: "어? 파일명이 대동인데?"', '"이런 일이 일어날 수 있다는 게 본질"'],
        connect: ['→ 박대표 수령 → 단가 노출 사고로 이어짐'],
      },
    },

    // STATE 2 — 박대표 수령 (09:32)
    {
      index: 2,
      phones: undefined,
      advanceOn: [
        { target: 'window:miu', nextStateIndex: 3 },
        { target: 'chat:miu', nextStateIndex: 3 },
      ],
      guideTooltip: { target: 'window:miu', arrow: 'left', text: '미우 단톡방을 클릭해 확인' },
      desktop: {
        clockTime: '09:32',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({}),
        chatList: [
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: 감사합니다 확인해보겠습니다', time: '방금', badge: 3, avatar: 'miu', icon: '👥', pulse: true },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 오늘 출하 일정...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
          { id: 'keumho', name: '금호 ↔ 가온', preview: '이대리: 회신 부탁드립니다', time: '어제', avatar: 'keumho', icon: '👥' },
        ],
        toasts: [
          { id: 't1', from: '미우 박대표', room: '미우케이블 ↔ 가온', text: '감사합니다 확인해보겠습니다' },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[2]),
          kangWindow({ visible: false, messages: [] }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 3 — 박대표 수령',
        meta: '09:32',
        situation: '박대표가 첨부 파일을 받고 "확인해보겠습니다" 회신. 강승희는 아직 자신의 실수를 모름.',
        interact: '미우 단톡방 클릭 → STATE 4로 진행.',
        feel: ['청중: "...열어보는 순간"'],
        connect: ['→ 팀장 발견 → 즉시 삭제 지시'],
      },
    },

    // STATE 3 — 팀장 발견 (09:38)
    {
      index: 3,
      phones: undefined,
      advanceOn: [{ target: 'file:quote-1', nextStateIndex: 4 }],
      guideTooltip: { target: 'file:quote-1', arrow: 'top', text: '견적서 파일을 클릭해 열어 보기' },
      desktop: {
        clockTime: '09:38',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({ highlight: 'miu' }),
        chatList: [
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: 감사합니다 확인해보겠습니다', time: '방금', badge: 3, avatar: 'miu', icon: '👥', active: true },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 출하...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
          { id: 'keumho', name: '금호 ↔ 가온', preview: '이대리: 회신...', time: '어제', avatar: 'keumho', icon: '👥' },
        ],
        toasts: [],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[3]),
          kangWindow({ visible: false, messages: [] }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 4 — 팀장 발견',
        meta: '09:38',
        situation:
          '이윤 팀장이 강승희가 보낸 첨부 파일을 클릭. Excel 단가표의 미우 단가(₩1,000)와 파일 안 단가(₩800)가 일치하지 않음을 발견.',
        interact: '견적서 파일 클릭 → 견적서 팝업 등장.',
        feel: [
          '"이거 대동 견적서네? 단가 800원. 미우는 1,000원인데."',
          '청중: 단가 노출의 심각함',
        ],
        connect: ['→ 즉시 삭제 지시'],
      },
    },

    // STATE 4 — 삭제 지시 (09:40)
    {
      index: 4,
      phones: undefined,
      advanceOn: [{ target: 'preset:kang-delete', nextStateIndex: 5 }],
      guideTooltip: {
        target: 'preset:kang-delete',
        arrow: 'top',
        text: '강승희에게 삭제 지시 메시지 보내기',
      },
      desktop: {
        clockTime: '09:40',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'kang',
        excel: makeExcel({
          highlight: 'miu',
          quotePopup: {
            visible: true,
            title: '견적서_대동_v3.xlsx',
            subtitle: '2025-11-18 · GA-DD-20251118',
            rows: [
              { code: 'CV-A001', name: '가공동선', price: '₩800', quantity: '5,000m', danger: true },
            ],
            note: '대동 견적서입니다. 미우에 잘못 갔어요. 미우 단가는 ₩1,000.',
          },
        }),
        chatList: [
          { id: 'kang', name: '강승희 사원 (1:1)', preview: '1:1 대화', time: '방금', avatar: 'kang', icon: '💼', active: true },
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: 감사합니다 확인해보겠습니다', time: '8분 전', badge: 3, avatar: 'miu', icon: '👥' },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 출하...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
        ],
        toasts: [],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[4]),
          kangWindow({
            visible: true,
            messages: [KANG_M.sysFirst],
            preset: {
              text: '강 사원, 미우 단톡방에 보낸 견적서 대동 단가표야. 당장 삭제해.',
              nextStateIndex: 5,
            },
          }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 5 — 삭제 지시',
        meta: '09:40',
        situation:
          '팀장이 강승희 1:1로 "당장 삭제해" 지시. 견적서 팝업 위로 사고의 본질(₩800 vs ₩1,000)이 시각적으로 드러남.',
        interact: '강승희 1:1창 하단 프리셋 클릭으로 메시지 전송.',
        feel: ['"숨길 수 있을까?"', '청중: 사후 처리는 가능하지만 흔적은 남는다'],
        connect: ['→ 강승희가 즉시 응답 → 미우 단톡방에서 삭제 실행'],
      },
    },

    // STATE 5 — 강승희 응답 (09:41) — 보낸 지시가 1:1에 박히고 강승희가 즉답
    {
      index: 5,
      phones: undefined,
      desktop: {
        clockTime: '09:41',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'kang',
        excel: makeExcel({
          highlight: 'miu',
          quotePopup: {
            visible: true,
            title: '견적서_대동_v3.xlsx',
            subtitle: '2025-11-18 · GA-DD-20251118',
            rows: [
              { code: 'CV-A001', name: '가공동선', price: '₩800', quantity: '5,000m', danger: true },
            ],
            note: '대동 견적서입니다. 미우에 잘못 갔어요. 미우 단가는 ₩1,000.',
          },
        }),
        chatList: [
          { id: 'kang', name: '강승희 사원 (1:1)', preview: '강승희: 네 죄송합니다 바로 삭제하겠습니다', time: '방금', avatar: 'kang', icon: '💼', active: true },
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: 감사합니다 확인해보겠습니다', time: '9분 전', badge: 3, avatar: 'miu', icon: '👥' },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 출하...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
        ],
        toasts: [
          { id: 't1', from: '강승희 사원', room: '1:1 개인톡', text: '네 죄송합니다 바로 삭제하겠습니다' },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[5]),
          kangWindow({
            visible: true,
            messages: [KANG_M.sysFirst, KANG_M.bossDelete, KANG_M.kangOK],
          }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 6 — 강승희 응답',
        meta: '09:41',
        situation:
          '팀장의 "당장 삭제해" 지시가 강승희 1:1 채팅에 박힘. 강승희가 "네 죄송합니다 바로 삭제하겠습니다"로 즉답. 미우 단톡방의 견적서 파일은 아직 그대로 — 삭제 실행 직전.',
        interact: '관찰 STATE. → 키로 다음 단계 (실제 삭제 + 미우 반영) 진행.',
        feel: ['"메시지는 갔다 — 그리고 강승희가 보고 답했다"', '청중: 다음에 미우에서 무슨 일이 벌어질까'],
        connect: ['→ 강승희가 미우에서 파일 삭제 → 단톡방에 "삭제된 메시지" 표시'],
      },
    },

    // STATE 6 — 삭제됨 (09:42)
    {
      index: 6,
      phones: undefined,
      advanceOn: [
        { target: 'window:miu', nextStateIndex: 7 },
        { target: 'chat:miu', nextStateIndex: 7 },
      ],
      guideTooltip: {
        target: 'window:miu',
        arrow: 'left',
        text: '미우 단톡방으로 돌아가 확인',
      },
      desktop: {
        clockTime: '09:42',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'kang',
        excel: makeExcel({}),
        chatList: [
          { id: 'kang', name: '강승희 사원 (1:1)', preview: '강승희: 삭제 완료했습니다', time: '방금', avatar: 'kang', icon: '💼', active: true },
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '강승희: [삭제된 메시지]', time: '14분 전', avatar: 'miu', icon: '👥', pulse: true },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 출하...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
        ],
        toasts: [
          { id: 't1', from: '강승희 사원', room: '1:1 개인톡', text: '삭제 완료했습니다' },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[6]),
          kangWindow({
            visible: true,
            messages: [KANG_M.sysFirst, KANG_M.bossDelete, KANG_M.kangOK, KANG_M.kangDone],
          }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 7 — 삭제됨',
        meta: '09:42',
        situation:
          '강승희가 미우 단톡방에서 견적서를 삭제. 카톡은 "삭제된 메시지입니다"로 바뀜. 강승희 1:1엔 "삭제 완료했습니다" 보고.',
        interact: '미우 단톡방 클릭으로 결과 확인 → STATE 8.',
        feel: ['"수습한 것 같다"', '청중: "그러나 캡처는?"'],
        connect: ['→ 박대표 의심의 시작'],
      },
    },

    // STATE 7 — 박대표 의심 (09:46)
    {
      index: 7,
      phones: undefined,
      desktop: {
        clockTime: '09:46',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({}),
        chatList: [
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: 왜 파일 지우셨어요?', time: '방금', badge: 1, avatar: 'miu', icon: '👥', active: true },
          { id: 'kang', name: '강승희 사원 (1:1)', preview: '강승희: 삭제 완료했습니다', time: '4분 전', avatar: 'kang', icon: '💼' },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 출하...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
          { id: 'rims', name: '림스케이블 ↔ 가온', preview: '신차장: 견적서...', time: '어제', avatar: 'rims', icon: '👥' },
        ],
        toasts: [
          { id: 't1', from: '미우 박대표', room: '미우케이블 ↔ 가온', text: '어? 강 사원님, 왜 파일 지우셨어요?', variant: 'urgent' },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[7]),
          kangWindow({
            visible: true,
            messages: [KANG_M.sysFirst, KANG_M.bossDelete, KANG_M.kangOK, KANG_M.kangDone],
          }),
          parkWindow({ visible: false, messages: [] }),
        ],
      },
      memo: {
        title: 'STATE 8 — 박대표 의심',
        meta: '09:46',
        situation: '박대표가 단톡방에서 "왜 파일 지우셨어요?" 질문. 사후 처리가 들통남.',
        interact: '단톡방에서 다음 메시지가 자동으로 도착.',
        feel: ['"이미 봤다"', '청중: 삭제는 의심만 키운다'],
        connect: ['→ 박대표가 캡처를 들고 직접 팀장에게'],
      },
    },

    // STATE 8 — 캡처 항의 (09:52)
    {
      index: 8,
      phones: undefined,
      desktop: {
        clockTime: '09:52',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'park',
        excel: makeExcel({ highlight: 'miu' }),
        chatList: [
          { id: 'park', name: '박대표 (1:1) ⚠️', preview: '박대표: 왜 같은 품번에...', time: '방금', badge: 5, avatar: 'park', icon: '🤝', active: true },
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: 왜 파일 지우셨어요?', time: '6분 전', badge: 1, avatar: 'miu', icon: '👥' },
          { id: 'kang', name: '강승희 사원 (1:1)', preview: '강승희: 삭제 완료했습니다', time: '10분 전', avatar: 'kang', icon: '💼' },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 출하...', time: '어제', badge: 2, avatar: 'daedong', icon: '👥' },
        ],
        toasts: [
          { id: 't1', from: '박대표 (1:1)', room: '미우 → 팀장', text: '왜 같은 품번에 거래처마다 단가가 다른 거예요?', variant: 'urgent', pulse: true },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[8]),
          kangWindow({
            visible: true,
            messages: [KANG_M.sysFirst, KANG_M.bossDelete, KANG_M.kangOK, KANG_M.kangDone],
          }),
          parkWindow({
            visible: true,
            messages: [
              PARK_M.sys,
              PARK_M.directHello,
              PARK_M.directBody,
              PARK_M.capture,
              PARK_M.captureNote,
              PARK_M.question,
            ],
          }),
        ],
      },
      memo: {
        title: 'STATE 9 — 캡처 항의',
        meta: '09:52',
        situation:
          '박대표가 1:1로 팀장에게 직접 항의. 캡처 PNG 파일까지 첨부. 사고가 회사 차원으로 확산.',
        interact: '박대표 1:1창이 활성. 캡처 파일 + 단가 의심 메시지 6개.',
        feel: ['청중: "여기서 끝이 아니다"', '"이미 캡처가 박혀 있다 — 사후 처리는 불가능"'],
        connect: ['→ 위기 누적: 본부장 격상 + 대동 거래처 동시 우려'],
      },
    },

    // STATE 9 — 위기 누적 (10:14)
    {
      index: 9,
      phones: undefined,
      desktop: {
        clockTime: '10:14',
        clockDate,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'park',
        excel: makeExcel({ highlight: 'miu' }),
        chatList: [
          { id: 'boss', name: '영업 본부장 (1:1) ⚠️', preview: '본부장: 시스템 차원에서 풀어야...', time: '방금', badge: 1, avatar: 'boss', icon: '👔' },
          { id: 'park', name: '박대표 (1:1) ⚠️', preview: '박대표: 답변 부탁드립니다.', time: '4분 전', badge: 1, avatar: 'park', icon: '🤝', active: true },
          { id: 'daedong', name: '대동케이블판매 ↔ 가온', preview: '박부장: 저희 단가 노출된...', time: '방금', badge: 3, avatar: 'daedong', icon: '👥' },
          { id: 'miu', name: '미우케이블 ↔ 가온', preview: '박대표: 왜 파일 지우셨어요?', time: '30분 전', badge: 1, avatar: 'miu', icon: '👥' },
          { id: 'kang', name: '강승희 사원 (1:1)', preview: '강승희: 삭제 완료했습니다', time: '32분 전', avatar: 'kang', icon: '💼' },
        ],
        toasts: [
          { id: 't1', from: '영업 본부장', room: '1:1 개인톡', text: '팀장. 미우 박대표한테 전화 받았어요. 시스템 차원에서 풀어야 합니다.', variant: 'boss' },
          { id: 't2', from: '대동 박부장', room: '대동케이블판매 ↔ 가온', text: '저희 단가 노출된 거 아니죠?', variant: 'urgent' },
        ],
        kakaoWindows: [
          keumhoWindow(),
          rimsWindow(),
          daedongWindow(),
          miuWindow(MIU_STATE_BY_INDEX[9]),
          kangWindow({
            visible: true,
            messages: [KANG_M.sysFirst, KANG_M.bossDelete, KANG_M.kangOK, KANG_M.kangDone],
          }),
          parkWindow({
            visible: true,
            messages: [
              PARK_M.sys,
              PARK_M.directHello,
              PARK_M.directBody,
              PARK_M.capture,
              PARK_M.captureNote,
              PARK_M.question,
              PARK_M.followupPlease,
            ],
          }),
        ],
      },
      memo: {
        title: 'STATE 10 — 위기 누적',
        meta: '10:14',
        situation:
          '약 1시간 만에: 박대표 1:1 항의 → 본부장 1:1 격상 → 대동 거래처 단가 누출 의심까지 동시 발생.',
        interact: '챕터 종료. → 키로 Ch.2로 진행.',
        feel: ['"한 번의 잘못 첨부가 회사 전체로"', '청중: "이게 시스템 문제구나"'],
        connect: ['→ Ch.2 — 4개월 후 DWorks Cowork+ 본 오픈, 같은 사고가 일어날 수 없는 환경'],
      },
    },
  ],
  onComplete: { nextChapter: 2, demoAutoAdvance: false },
};
