import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { RETAIL_ACTORS, feedUpTo } from '../_shared';

/**
 * 신 0. 도입 배경 — 고객 관계가 어드바이저 개인폰에 갇힌다.
 * 무대는 단 하나의 1:1 대화다. 왼쪽은 어드바이저 개인폰, 오른쪽은 같은 대화를 보는 고객 폰.
 * 매장 어드바이저 640명이 각자 이런 1:1을 개인 폰에 쌓고 있다는 사실을 마지막에 정면으로 제시한다.
 */

/** 김소연 어드바이저 ↔ 정수현 고객 — 개인 카톡 1:1 */
const SCRIPT: MfgKakaoItem[] = [
  { id: 'm1', kind: 'message', senderId: 'cust', text: '소연님, 지난번 봐주신 재킷 55 사이즈 입고됐을까요?', time: '10:04' },
  { id: 'm2', kind: 'message', senderId: 'adv', text: '고객님 안녕하세요! 재고 확인하고 바로 연락드릴게요', time: '10:05' },
  { id: 'm3', kind: 'file', senderId: 'cust', text: '코트 소매 하자 사진 전송', time: '10:07' },
  { id: 'm4', kind: 'message', senderId: 'adv', text: '작년에 구매하신 코트 맞으시죠? A/S 접수 도와드리겠습니다', time: '10:08' },
];

function phones(step: number): MfgPhoneDef[] {
  const items = feedUpTo(SCRIPT, step);
  const lastSender = step > 0 ? SCRIPT[step - 1]?.senderId : undefined;

  return [
    {
      id: 'a',
      ownerId: 'adv',
      ownerLabel: '김소연 어드바이저 · 강남 플래그십',
      ownerSub: '개인 카카오톡 · 개인 휴대폰',
      badge: 'company',
      badgeLabel: '매장 직원',
      companyFrame: true,
      companyRibbonLabel: '매장 직원',
      headerTitle: '정수현 고객님',
      headerCount: '1:1',
      statusTime: '10:08',
      items,
      highlight: lastSender === 'adv',
    },
    {
      id: 'b',
      ownerId: 'cust',
      ownerLabel: '정수현 고객 · VIP 3년차',
      ownerSub: '개인 카카오톡',
      badge: 'vendor',
      badgeLabel: '고객',
      headerTitle: '김소연 어드바이저',
      headerCount: '1:1',
      statusTime: '10:08',
      items,
      highlight: lastSender === 'cust',
    },
  ];
}

function arenaState(step: number, withPain = false) {
  return {
    layout: 'phones-only' as const,
    phonesLabel: '📱 어드바이저 개인폰 ↔ 고객 · 1:1 개인 카톡 (같은 대화, 양쪽 시점)',
    phonesBadge: '개인 채널',
    actors: RETAIL_ACTORS,
    phones: phones(step),
    moreSlot: {
      title: '그리고 이런 1:1이 639개 더',
      sub: '매장 70개 · 어드바이저 640명이 각자 개인폰으로 단골을 응대 [예시]',
    },
    ...(withPain
      ? {
          painPopup: {
            title: '⚠ 이 대화, 회사에는 없는 대화',
            items: [
              { heading: '퇴사·이동 = 고객 관계 소멸', desc: 'VIP 고객 연락처·취향·응대 이력이 어드바이저 개인 폰과 함께 사라짐' },
              { heading: '담당 부재 시 응대 단절', desc: '휴무·휴직이면 고객은 답을 받지 못하고, 다른 직원은 맥락을 모름' },
              { heading: '본사 확인·집계 불가', desc: 'A/S 접수 여부도, 어느 응대가 재구매로 이어졌는지도 알 수 없음' },
            ],
          },
        }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '고객이 쓰던 방식(카카오톡) 그대로, 매장 응대를 회사 자산으로.',
  pain: '어드바이저 개인폰 1:1 = 퇴사 시 관계 증발 · 담당 부재 시 단절 · 본사 확인·집계 불가',
  roi: '측정 불가 구간이 곧 회사 리스크. 계량 근거는 공식 채널 전환 후 확보',
};

export const chapter00PersonalPhone: Chapter = {
  id: 0,
  act: 1,
  title: '도입 배경 — 고객 관계가 개인폰에 갇힌다',
  subtitle: '도입 전 현황 · 무대: 어드바이저 개인폰과 고객의 1:1 카카오톡',
  narration:
    '매장 어드바이저는 단골 고객을 자기 개인 카톡으로 응대합니다. 재입고 문의도, A/S 접수도, 취향 메모도 전부 어드바이저 개인 폰 안에 있습니다. 어드바이저 640명이 각자 이런 1:1을 쌓고 있습니다. 고객은 회사가 아니라 "그 직원"과 거래하고 있고, 그 직원이 쉬거나 떠나면 대화도 함께 멈춥니다. "매장에서 가장 값진 자산인 고객 관계가, 회사 밖에 있습니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '폰 2대는 하나의 1:1 대화를 양쪽에서 본 것입니다. 왼쪽이 어드바이저 개인폰(분홍 테두리), 오른쪽이 고객 폰. 화살표(→)로 대화를 진행하세요.',
      mfgArena: arenaState(0),
      memo: {
        title: 'STATE 1 — 개인 카톡 1:1',
        meta: '신 0 · 도입 배경',
        situation:
          '강남 플래그십 김소연 어드바이저와 VIP 정수현 고객의 1:1 대화. 회사 시스템이 아니라 두 사람의 개인 휴대폰 안에서만 일어난다.',
        interact: '화살표 클릭으로 대화가 진행된다.',
        feel: ['"우리 매장 직원들도 지금 이렇게 합니다"'],
        connect: ['→ 구매 직전 문의가 개인 카톡으로'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3500,
      mfgArena: arenaState(1),
      memo: {
        title: '재입고 문의 — 매출에 가장 가까운 대화',
        meta: '신 0',
        situation: 'VIP 고객이 재킷 재입고를 묻는다. 구매 직전 단계의 문의가 개인 카톡으로 들어온다.',
        interact: '다음 →',
        feel: ['가장 매출에 가까운 대화가 회사 밖에서 오간다'],
        connect: ['→ 어드바이저 응대'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3500,
      mfgArena: arenaState(2),
      memo: {
        title: '어드바이저 응대 — 개인 시간, 개인 책임',
        meta: '신 0',
        situation:
          '어드바이저가 개인 폰으로 답한다. 어드바이저 폰에선 분홍(내 메시지), 고객 폰에선 흰색으로 보인다.',
        interact: '다음 →',
        feel: ['근무 시간 구분도, 응대 기록도 없다'],
        connect: ['→ A/S 요청이 들어온다'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3500,
      mfgArena: arenaState(3),
      memo: {
        title: 'A/S 사진 — 남지 않는 접수',
        meta: '신 0',
        situation:
          '고객이 하자 사진을 개인 카톡으로 보낸다. 이 사진은 어드바이저 갤러리에만 남고, A/S 시스템에는 아무 기록이 없다.',
        interact: '다음 →',
        feel: ['접수됐는지 확인할 방법이 없다'],
        connect: ['→ 구두 약속으로 끝나는 응대'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaState(4),
      memo: {
        title: '개인 폰 안에만 쌓이는 관계',
        meta: '신 0',
        situation:
          '어드바이저가 A/S 접수를 약속한다. 이 대화 전부 — 취향, 구매 이력, 약속 — 가 개인 폰 안에만 쌓인다.',
        interact: '다음 → 페인포인트 정리',
        feel: ['회사는 이 대화의 존재조차 모른다'],
        connect: ['→ 640갈래의 사각지대'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgArena: arenaState(4, true),
      memo: {
        title: 'STATE 2 — 사각지대 인지',
        meta: '신 0 · 페인포인트',
        situation:
          '이 1:1 어디에도 회사는 없다. 퇴사 시 관계 소멸 · 담당 부재 시 단절 · 본사 확인 불가 — 세 가지가 정면으로 제시된다.',
        interact: '다음 → (신 1 공식 채널 전환으로)',
        feel: ['"카톡을 못 쓰게 하자는 게 아닙니다. 이 관계를 회사에 남기자는 것"'],
        connect: ['→ 신 1: 공식 채널 + 업무용 앱'],
      },
    },
  ],
  onComplete: { nextChapter: 1 },
};
