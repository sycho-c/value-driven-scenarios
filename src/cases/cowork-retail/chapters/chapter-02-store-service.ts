import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { RETAIL_ACTORS } from '../_shared';

/**
 * 신 2. 매장 응대 — 재입고 → 방문 예약 → A/S → 구매.
 * 어드바이저가 Cowork App만으로 실제 매장 업무를 완결한다.
 * 카카오 상담톡 사양의 파일명 난수화 제약도 이 흐름 안에서 해소된다.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** 고객 폰 — 공식 상담톡 */
function custPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step >= 1) {
    items.push({
      id: 'c1',
      kind: 'message',
      senderId: 'adv',
      text: '정수현님, 문의하신 재킷 55 사이즈가 강남 플래그십에 입고됐습니다',
      time: '14:02',
      isNew: step === 1,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'c2',
      kind: 'message',
      senderId: 'cust',
      text: '내일 오후에 들러도 될까요? 3시쯤 가능할 것 같아요',
      time: '14:06',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push(
      {
        id: 'c3',
        kind: 'message',
        senderId: 'adv',
        text: '내일 15:00 예약 확정했습니다. 피팅룸과 함께 준비해 두겠습니다',
        time: '14:08',
        isNew: step === 3,
      },
      {
        id: 'c3b',
        kind: 'joined',
        text: '📋 방문 예약 확정 — 08/26(수) 15:00 · 강남 플래그십 · 담당 김소연',
        isNew: step === 3,
      },
    );
  }
  if (step >= 4) {
    items.push({
      id: 'c4',
      kind: 'file',
      senderId: 'cust',
      text: '코트 소매 하자 사진 전송',
      time: '14:11',
      isNew: step === 4,
    });
  }
  if (step >= 5) {
    items.push({
      id: 'c5',
      kind: 'message',
      senderId: 'adv',
      text: 'A/S 접수 완료했습니다. 접수번호 AS-26082501로 진행되며, 내일 방문 때 함께 받아 드릴게요',
      time: '14:14',
      isNew: step === 5,
    });
  }
  if (step >= 6) {
    items.push({
      id: 'c6',
      kind: 'message',
      senderId: 'cust',
      text: '한 번에 해결되네요, 감사합니다!',
      time: '14:15',
      isNew: step === 6,
    });
  }

  return {
    id: 'b',
    ownerId: 'cust',
    ownerLabel: '정수현 고객 · VIP 3년차',
    ownerSub: '브랜드 공식 상담톡',
    badge: 'channel',
    badgeLabel: '공식 채널',
    headerTitle: '브랜드 공식 상담',
    headerCount: '공식채널',
    channelTheme: true,
    statusTime: '14:15',
    items,
    highlight: step === 2 || step === 4 || step === 6,
  };
}

/** 어드바이저 폰 — Cowork App */
function advPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step === 0) {
    items.push({
      id: 'wait',
      kind: 'joined',
      text: '📌 재입고 대기 등록됨 — 재킷 55 · 정수현(VIP) · 07/28 요청',
    });
  }
  if (step >= 1) {
    items.push(
      {
        id: 'a0',
        kind: 'joined',
        text: '📦 재입고 알림 — 재킷 55 입고 · 대기 고객 자동 매칭 (정수현 VIP)',
        isNew: step === 1,
      },
      {
        id: 'a1',
        kind: 'message',
        senderId: 'adv',
        text: '정수현님, 문의하신 재킷 55 사이즈가 강남 플래그십에 입고됐습니다',
        time: '14:02',
        isNew: step === 1,
      },
    );
  }
  if (step >= 2) {
    items.push({
      id: 'a2',
      kind: 'message',
      senderId: 'cust',
      text: '내일 오후에 들러도 될까요? 3시쯤 가능할 것 같아요',
      time: '14:06',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push(
      {
        id: 'a3',
        kind: 'message',
        senderId: 'adv',
        text: '내일 15:00 예약 확정했습니다. 피팅룸과 함께 준비해 두겠습니다',
        time: '14:08',
        isNew: step === 3,
      },
      {
        id: 'a3b',
        kind: 'joined',
        text: '✓ 예약 시스템 연동 — 08/26 15:00 · 피팅룸 배정 · 재킷 55 홀딩',
        isNew: step === 3,
      },
    );
  }
  if (step >= 4) {
    items.push(
      {
        id: 'a4raw',
        kind: 'file',
        senderId: 'cust',
        text: step >= 5 ? '정수현_코트소매_하자_0825.jpg' : 'k71bz3f0aq.jpg (파일명 난수 · 식별 불가)',
        time: '14:11',
        isNew: step === 4,
      },
      ...(step >= 5
        ? [
            {
              id: 'a4fix',
              kind: 'joined' as const,
              text: '✓ 원본 파일명 복원 · A/S 접수 AS-26082501 자동 연결 — 사진이 곧 증빙',
              isNew: step === 5,
            },
          ]
        : []),
    );
  }
  if (step >= 5) {
    items.push({
      id: 'a5',
      kind: 'message',
      senderId: 'adv',
      text: 'A/S 접수 완료했습니다. 접수번호 AS-26082501로 진행되며, 내일 방문 때 함께 받아 드릴게요',
      time: '14:14',
      isNew: step === 5,
    });
  }
  if (step >= 6) {
    items.push(
      {
        id: 'a6',
        kind: 'message',
        senderId: 'cust',
        text: '한 번에 해결되네요, 감사합니다!',
        time: '14:15',
        isNew: step === 6,
      },
      {
        id: 'a6b',
        kind: 'joined',
        text: '✓ 08/26 방문·구매 완료 — 재킷 1점 · 강남 플래그십 · 김소연 응대 귀속',
        isNew: step === 6,
      },
    );
  }

  return {
    id: 'a',
    ownerId: 'adv',
    ownerLabel: '김소연 어드바이저 · 강남 플래그십',
    ownerSub: 'Cowork App · 업무용',
    badge: 'company',
    badgeLabel: '매장 직원',
    companyFrame: true,
    companyRibbonLabel: 'Cowork App',
    headerTitle: '정수현 고객님',
    screen: 'cowork-app',
    appCaption: '매장 근무 중 · 담당 고객 응대',
    appBadge: 'Cowork App',
    appContext: {
      initial: '수',
      title: '정수현 · VIP 3년차',
      sub: '강남 플래그십 · 담당 김소연',
      chips:
        step >= 5
          ? ['선호 55', '예약 08/26 15:00', 'A/S AS-26082501']
          : step >= 3
            ? ['선호 55', '예약 08/26 15:00', '재킷 55 홀딩']
            : ['선호 55', '재입고 대기 · 재킷 55', '최근 구매 07/02'],
      tag: '담당',
    },
    statusTime: '14:15',
    items,
    // step 3 시점엔 답변이 이미 전송되어 대화에 올라가 있다 — 같은 문구를 입력창에서
    // 타이핑 중으로 겹쳐 보여주면 전송과 작성이 동시에 일어난 것처럼 읽힌다.
    appInput: step === 3 ? { text: '내일 15:00 예약 확정했습니다', state: 'sent' } : { state: 'idle' },
    highlight: step === 1 || step === 3 || step === 5,
  };
}

function arenaAt(step: Step) {
  return {
    layout: 'phones-only' as const,
    phonesLabel: '📱 고객 공식 상담톡 ↔ 어드바이저 Cowork App · 재입고에서 구매까지',
    phonesBadge: '매장 응대',
    actors: RETAIL_ACTORS,
    phones: [custPhone(step), advPhone(step)],
    moreSlot: {
      title: '이 흐름이 매장 70개에서 동시에',
      sub: '재입고 대기 · 예약 · A/S가 전부 업무앱 한 곳에서 처리 [예시]',
    },
    ...(step >= 6
      ? { banner: '재입고 → 예약 → A/S → 구매가 하나의 채널에서 완결 · 어느 응대가 매출이 됐는지 매장·개인에 귀속된다' }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '재입고 알림 → 방문 예약 → A/S 접수 → 구매까지, Cowork App 하나로 완결.',
  pain: '과거: 재입고 연락은 기억에 의존 · 예약은 구두 · A/S 사진은 난수 파일명으로 증빙 불가',
  roi: '상담 → 예약 전환, 예약 → 구매 전환을 매장·어드바이저 단위로 측정 [예시]',
};

export const chapter02StoreService: Chapter = {
  id: 2,
  act: 3,
  title: '매장 응대 — 재입고에서 구매까지',
  subtitle: '운영 정착 · 무대: 고객 공식 상담톡 + 어드바이저 Cowork App',
  narration:
    '실제 매장 업무는 이렇게 돌아갑니다. 재입고가 뜨면 대기 고객이 자동 매칭되고, 어드바이저는 매장에서 업무앱으로 알림을 보냅니다. 방문 예약이 시스템에 잡히고, 고객이 보낸 하자 사진은 원본 파일명이 복원되어 A/S 접수 증빙이 됩니다. 그리고 방문과 구매까지 하나의 채널에서 이어집니다. "기억과 구두 약속으로 하던 일이, 기록으로 남는 일이 됩니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '어드바이저 업무앱에 재입고 대기가 등록돼 있습니다. 신 0에서는 "연락드릴게요"라는 기억에 의존하던 부분입니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: 'STATE 1 — 재입고 대기 등록',
        meta: '신 2 · 매장 응대',
        situation: '정수현 고객의 재킷 55 문의가 재입고 대기로 등록돼 있다. 어드바이저 기억이 아니라 시스템에 남아 있다.',
        interact: '다음 → 입고 발생·자동 매칭',
        feel: ['"연락드린다고 해놓고 잊는 일"이 사라진다'],
        connect: ['→ 재입고 알림'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: 'STATE 2 — 재입고 자동 매칭 · 앱 발신',
        meta: '신 2',
        situation:
          '재킷 55가 입고되자 대기 고객이 자동 매칭된다. 어드바이저가 매장 근무 중 업무앱에서 바로 알림을 보낸다.',
        interact: '다음 → 고객 예약 요청',
        feel: ['재고 데이터가 곧 영업 기회가 된다'],
        connect: ['→ 방문 예약 문의'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(2),
      memo: {
        title: '고객 방문 예약 요청',
        meta: '신 2',
        situation: '고객이 공식 채널에서 방문 시간을 제안한다. 개인 카톡이 아니므로 이 대화도 회사에 남는다.',
        interact: '다음 → 예약 확정',
        feel: ['상담이 방문으로 이어지는 지점'],
        connect: ['→ 예약 시스템 연동'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(3),
      memo: {
        title: 'STATE 3 — 예약 확정 · 시스템 연동',
        meta: '신 2',
        situation:
          '어드바이저가 업무앱에서 예약을 확정한다. 매장·일시·담당·준비물이 기록으로 남아 구두 약속이 시스템 예약이 된다.',
        interact: '다음 → A/S 사진 인입',
        feel: ['✓ 피팅룸 배정 · 상품 홀딩까지 함께'],
        connect: ['→ 하자 사진 전송'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 4 — 제약: 파일명 난수화',
        meta: '신 2 · 제약',
        situation:
          '고객이 코트 소매 하자 사진을 보낸다. 카카오 상담톡 사양상 파일명이 난수(k71bz3f0aq.jpg)로 들어와, 그대로는 A/S 증빙으로 쓸 수 없다.',
        interact: '다음 → 원본 복원·접수 연결',
        feel: ['✕ 어느 고객의 어느 제품 하자인지 식별 불가'],
        connect: ['→ Cowork+ 복원'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(5),
      memo: {
        title: '해결 — 원본 복원 + A/S 접수 자동 연결',
        meta: '신 2 · 제약 해소',
        situation:
          'Cowork+가 원본 파일명을 복원하고 A/S 접수번호(AS-26082501)에 자동 연결한다. 사진이 곧 증빙이 되고, 접수는 구두가 아니라 번호로 남는다.',
        interact: '다음 → 방문·구매',
        feel: ['✓ 신 0에서 "접수됐는지 알 수 없던" 그 지점이 해소된다'],
        connect: ['→ 방문 및 구매'],
      },
    },
    {
      index: 6,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(6),
      memo: {
        title: 'STATE 5 — 구매 연결 · 매출 귀속',
        meta: '신 2 · ROI',
        situation:
          '고객이 방문해 구매하고 A/S 제품도 함께 전달한다. 상담 → 예약 → 구매의 연결이 강남 플래그십과 김소연 어드바이저에게 귀속된다.',
        interact: '다음 → (신 3 담당 부재 상황으로)',
        feel: ['"어느 응대가 매출이 됐는지, 처음으로 숫자로 보입니다"'],
        connect: ['→ 신 3: 담당이 자리를 비우면?'],
      },
    },
  ],
  onComplete: { nextChapter: 3 },
};
