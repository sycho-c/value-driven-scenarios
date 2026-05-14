import type { Chapter, DesktopMessage, KakaoPCWindowState } from '../../_types';
import { clockDateScene0, makeExcel, taskbarAppsBase } from '../_shared';

const WIN_POS = {
  keumho: { top: 46, left: 570, zIndex: 2 },
  rims: { top: 36, left: 550, zIndex: 3 },
  daedong: { top: 26, left: 530, zIndex: 4 },
  miu: { top: 16, left: 510, zIndex: 5 },
} as const;

const M = {
  date18: { id: 'd18', kind: 'date', text: '2025년 11월 18일 (화)' },
  parkRequest: {
    id: 'm-park-request',
    kind: 'message',
    sender: '박대표',
    text: 'CV-A001 견적 부탁드립니다',
    time: '어제 17:32',
  },
  parkFollowup: {
    id: 'm-park-followup',
    kind: 'message',
    sender: '박대표',
    text: '오늘 안에 회신 가능하실까요?',
    time: '오전 9:14',
  },
  kangPrepping: {
    id: 'm-kang-prep',
    kind: 'message',
    sender: '강승희',
    text: '네, 견적서 준비 중입니다. 잠시만요.',
    time: '오전 9:20',
    isMine: true,
  },
} satisfies Record<string, DesktopMessage>;

const MIU_MESSAGES: DesktopMessage[] = [M.date18, M.parkRequest, M.parkFollowup, M.kangPrepping];

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

function miuWindow(): KakaoPCWindowState {
  return {
    id: 'miu',
    title: '미우케이블 ↔ 가온 영업지원',
    participants: '박대표, 양예은, 차상훈, 강승희...',
    participantsCount: 8,
    position: WIN_POS.miu,
    messages: MIU_MESSAGES,
  };
}

export const scene0Chaos: Chapter = {
  id: 0,
  act: 1,
  title: '이런 사고, 어디서든 터집니다',
  subtitle: '영업지원 팀장 PC · 카오스 1분 압축',
  narration:
    '2025년 11월 18일 화요일 오전 9:14. 영업지원 팀장 PC에는 카톡 단톡방 4개와 Excel 단가표가 한꺼번에 떠 있습니다. 박대표가 견적을 재촉합니다. 강승희가 견적서를 첨부하려는데 — 폴더에 비슷한 파일이 너무 많습니다. 카카오톡 단톡방으로 비즈니스 하는 모든 분이 매일 마주하는 카오스, 1분 압축본.',
  stage: 'desktop-pc',
  states: [
    {
      index: 0,
      pauseAfterMs: 4500,
      revealRhythm: 'natural',
      guide:
        '평범한 오전. 미우 단톡방에 박대표의 견적 재촉이 떴고, 강승희가 견적서 첨부를 시도합니다. 폴더에는 거래처별 파일 4개가 비슷한 이름으로 모여 있습니다.',
      desktop: {
        clockTime: '09:14',
        clockDate: clockDateScene0,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({}),
        chatList: [
          {
            id: 'miu',
            name: '미우케이블 ↔ 가온',
            preview: '박대표: 오늘 안에 회신 가능하실까요?',
            time: '09:14',
            badge: 2,
            avatar: 'miu',
            icon: '👥',
            active: true,
            pulse: true,
          },
          {
            id: 'daedong',
            name: '대동케이블판매',
            preview: '박부장: 금주 출하 일정 회신 부탁...',
            time: '09:08',
            badge: 1,
            avatar: 'daedong',
            icon: '👥',
          },
          {
            id: 'rims',
            name: '림스케이블',
            preview: '신차장: 사양 변경 가능한지...',
            time: '08:55',
            badge: 3,
            avatar: 'rims',
            icon: '👥',
          },
          {
            id: 'keumho',
            name: '금호',
            preview: '이대리: 결제 조건 확인 부탁드립니다',
            time: '08:40',
            badge: 1,
            avatar: 'keumho',
            icon: '👥',
          },
        ],
        toasts: [
          {
            id: 't1',
            from: '미우 박대표',
            room: '미우케이블 단톡방',
            text: '오늘 안에 회신 가능하실까요?',
            pulse: true,
          },
        ],
        kakaoWindows: [keumhoWindow(), rimsWindow(), daedongWindow(), miuWindow()],
      },
      memo: {
        title: 'STATE 1 — 평범한 오전',
        meta: '09:14 · 영업지원 팀장 PC',
        situation:
          '카톡 단톡방 4개 + Excel 단가표가 한 화면에. 미우 단톡방 안 읽음 2개. 박대표 견적 재촉.',
        interact: '강승희가 견적서 첨부 직전 — 다음 STATE에서 위기 모먼트.',
        feel: ['청중: "우리 회사도 매일 이래"', '"단가표 대외비인데 파일은 폴더에 다 같이 있다"'],
        connect: ['→ 잘못된 파일을 미우 단톡방에 첨부 시도'],
      },
    },

    // STATE 1 — 위기 모먼트 (잘못된 파일 첨부 시도)
    {
      index: 1,
      pauseAfterMs: 5500,
      revealRhythm: 'cinematic',
      moment: {
        kind: 'price-flash',
        payload: {
          wrong: 800,
          correct: 1000,
          wrongFile: '견적서_대동_v3.xlsx',
          targetRoom: '미우케이블 단톡방',
        },
      },
      desktop: {
        clockTime: '09:21',
        clockDate: clockDateScene0,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({
          highlight: 'miu',
          quotePopup: {
            visible: true,
            title: '⚠️ 첨부 시도: 견적서_대동_v3.xlsx',
            subtitle: '미우케이블 단톡방으로 전송 직전',
            rows: [
              {
                code: 'CV-A001',
                name: '대동 단가 (이 파일)',
                price: '₩800/m',
                quantity: '대외비 — 미우엔 노출 금지',
                danger: true,
              },
              {
                code: 'CV-A001',
                name: '미우 단가 (정상)',
                price: '₩1,000/m',
                quantity: '단가 차이 ₩200 (20%)',
              },
            ],
            note: '파일명이 비슷해 헷갈리기 쉽다. 사람이 매번 멘탈로 맞춰야 한다.',
          },
        }),
        chatList: [
          {
            id: 'miu',
            name: '미우케이블 ↔ 가온',
            preview: '강승희: [첨부 시도] 견적서_대동_v3.xlsx',
            time: '방금',
            badge: 2,
            avatar: 'miu',
            icon: '👥',
            active: true,
          },
          {
            id: 'daedong',
            name: '대동케이블판매',
            preview: '박부장: 금주 출하 일정...',
            time: '09:08',
            badge: 1,
            avatar: 'daedong',
            icon: '👥',
          },
          {
            id: 'rims',
            name: '림스케이블',
            preview: '신차장: 사양 변경...',
            time: '08:55',
            badge: 3,
            avatar: 'rims',
            icon: '👥',
          },
          {
            id: 'keumho',
            name: '금호',
            preview: '이대리: 결제 조건...',
            time: '08:40',
            badge: 1,
            avatar: 'keumho',
            icon: '👥',
          },
        ],
        toasts: [
          {
            id: 't1',
            from: '시스템',
            room: '파일 선택',
            text: '폴더 내 4개 견적서 중 잘못된 파일 선택 — 사람이 매번 멘탈로 맞춰야 합니다.',
            variant: 'urgent',
            pulse: true,
          },
        ],
        kakaoWindows: [keumhoWindow(), rimsWindow(), daedongWindow(), miuWindow()],
      },
      memo: {
        title: 'STATE 2 — ⚡ 위기 모먼트',
        meta: '09:21',
        situation:
          '파일명 "견적서_대동_v3.xlsx" 클로즈업. 대동 단가 ₩800 vs 미우 단가 ₩1,000 — 단가 정책이 거래처에 노출되기 직전.',
        interact: '시간 정지. 화면이 페이드되며 사고의 본질이 드러남.',
        feel: ['"우리 회사도 이런 일 있다… 어떻게 막지?"', '청중: 시스템 차원의 안전장치가 필요'],
        connect: ['→ 도전 클로징: "카카오만 쓰시겠어요?"'],
      },
    },

    // STATE 2 — 도전 클로징
    {
      index: 2,
      pauseAfterMs: 6500,
      revealRhythm: 'cinematic',
      takeover: {
        tone: 'danger',
        eyebrow: '⏸️ 시간 정지 · 단가 정책이 거래처에 노출되었다면…',
        headline: '이런 사고는 어디서든 터질 수 있습니다.',
        sub: '파일명 헷갈림, 잘못된 단톡방, 한 번의 클릭. 카카오톡 단톡방으로 비즈니스 하시는 분이라면 — 이런 사고를 막을 시스템 차원의 안전장치가 있나요? 이런 한계가 있는데도, 카카오만 쓰시겠어요?',
        ctaLabel: 'SCENE 1 — 카카오의 5가지 한계 →',
      },
      desktop: {
        clockTime: '09:21',
        clockDate: clockDateScene0,
        taskbarApps: taskbarAppsBase,
        activeWindowId: 'miu',
        excel: makeExcel({ highlight: 'miu' }),
        chatList: [],
        toasts: [],
        kakaoWindows: [keumhoWindow(), rimsWindow(), daedongWindow(), miuWindow()],
      },
      memo: {
        title: 'STATE 3 — 도전 클로징',
        meta: '시간 정지',
        situation:
          '"이런 한계가 있는데도, 카카오만 쓰시겠어요?" — 청중에게 던지는 도전. 카오스가 우리 회사에서도 매일 벌어진다는 자각.',
        interact: 'SCENE 1로 자동/수동 전환.',
        feel: ['청중: "우리 회사도 이거구나"', '"솔직히 인정한다 — 그래서 어떻게 풀었지?"'],
        connect: ['→ SCENE 1 — 카카오의 5가지 한계 솔직 진단'],
      },
    },
  ],
  onComplete: { nextChapter: 1, demoAutoAdvance: false },
};
