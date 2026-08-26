import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { RETAIL_ACTORS } from '../_shared';

/**
 * 신 1. 채널 전환 — 고객은 공식 상담톡, 어드바이저는 Cowork App.
 * PC 워크스페이스는 등장하지 않는다. 매장 어드바이저의 실제 근무 도구는 법인폰이고,
 * 고객 응대·고객 식별·이력 저장이 모두 그 업무용 앱 안에서 일어난다.
 */

type Step = 0 | 1 | 2 | 3 | 4;

/** 고객 폰 — 카카오톡(알림 → 공식 상담톡) */
function custPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step === 1) {
    items.push({
      id: 'invite',
      kind: 'invite',
      inviteVendor: '정수현',
      inviteChannel: '브랜드 공식 상담',
      inviteTitle: '[공식 상담 채널 안내]',
      inviteDesc:
        '정수현님, 강남 플래그십에서 안내드린 브랜드 공식 상담 채널입니다. 추가하시면 지금 담당 김소연 어드바이저가 그대로 응대해 드립니다.',
      inviteNotes: [
        '카카오싱크 연동 — 담당 어드바이저 자동 연결',
        '담당자 휴무·변경 시에도 상담 이력 유지',
      ],
      inviteBtn: '채널 추가하고 상담하기 ▶',
      isNew: true,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'joined',
      kind: 'joined',
      text: '✓ 채널 추가 완료 · 김소연 어드바이저 연결',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'q1',
      kind: 'message',
      senderId: 'cust',
      text: '소연님, 재킷 55 사이즈 입고됐을까요?',
      time: '10:20',
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    items.push({
      id: 'a1',
      kind: 'message',
      senderId: 'adv',
      text: '정수현님 안녕하세요. 재고 확인해서 바로 안내드릴게요',
      time: '10:22',
      isNew: step === 4,
    });
  }

  return {
    id: 'b',
    ownerId: 'cust',
    ownerLabel: '정수현 고객 · VIP 3년차',
    ownerSub: step >= 2 ? '브랜드 공식 상담톡' : '카카오톡 알림',
    badge: step >= 2 ? 'channel' : 'vendor',
    badgeLabel: step >= 2 ? '공식 채널' : '고객',
    headerTitle: step >= 2 ? '브랜드 공식 상담' : '알림',
    headerCount: step >= 2 ? '공식채널' : undefined,
    channelTheme: step >= 2,
    screen: step >= 2 ? 'chat' : 'alert-list',
    statusTime: '10:22',
    items,
    highlight: step === 1 || step === 3,
  };
}

/** 어드바이저 폰 — Cowork App */
function advPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step === 0) {
    items.push({
      id: 'ready',
      kind: 'joined',
      text: '🏬 강남 플래그십 · 김소연 계정으로 로그인됨 — 담당 고객 58명',
    });
  }
  if (step >= 1) {
    items.push({
      id: 'sent',
      kind: 'joined',
      text: '📨 정수현 고객에게 공식 채널 안내 발송',
      isNew: step === 1,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'sync',
      kind: 'joined',
      text: '✓ 카카오싱크 연동 — 정수현 · VIP 3년차 · 최근 구매 07/02 · 선호 55',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'q1',
      kind: 'message',
      senderId: 'cust',
      text: '소연님, 재킷 55 사이즈 입고됐을까요?',
      time: '10:20',
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    items.push(
      {
        id: 'a1',
        kind: 'message',
        senderId: 'adv',
        text: '정수현님 안녕하세요. 재고 확인해서 바로 안내드릴게요',
        time: '10:22',
        isNew: step === 4,
      },
      {
        id: 'saved',
        kind: 'joined',
        text: '✓ 상담 이력 회사 저장 — 개인 폰이 아니라 회사 계정에 기록됨',
        isNew: step === 4,
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
    // 카카오싱크 연동(step 2) 전에는 상대가 누구인지 앱도 모른다 — 패널이 비어 있다.
    appContext:
      step >= 2
        ? {
            initial: '수',
            title: '정수현 · VIP 3년차',
            sub: '강남 플래그십 · 담당 김소연',
            chips: ['최근 구매 07/02', '선호 55', '누적 8회'],
            tag: '담당',
          }
        : {
            initial: '?',
            title: '알 수 없는 고객',
            sub: '카카오 상담톡 익명 키 — 식별 정보 없음',
          },
    statusTime: '10:22',
    items,
    appInput: step === 4 ? { text: '재고 확인해서 바로 안내드릴게요', state: 'sent' } : { state: 'idle' },
    highlight: step === 1 || step === 2 || step === 4,
  };
}

function arenaAt(step: Step) {
  return {
    layout: 'phones-only' as const,
    phonesLabel: '📱 고객 카카오톡 ↔ 어드바이저 Cowork App · 여전히 1:1, 다만 회사 채널',
    phonesBadge: '공식 채널 전환',
    actors: RETAIL_ACTORS,
    phones: [custPhone(step), advPhone(step)],
    moreSlot: {
      title: '외 639명의 어드바이저도 같은 방식',
      sub: '매장 70개 · 어드바이저 640명 · 개인 계정으로 각자 담당 고객 응대 [예시]',
    },
    ...(step >= 4
      ? { banner: '고객이 보는 화면은 그대로 카카오톡. 달라진 것은 어드바이저 쪽 — 개인폰이 아니라 Cowork App이고, 대화는 회사에 남는다.' }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '고객은 카카오톡 그대로. 어드바이저만 개인폰 → Cowork App으로 옮긴다.',
  pain: '해결: 개인 폰 귀속 → 회사 계정 기록 · 고객이 누군지 모름 → 카카오싱크 연동 식별',
  roi: '어드바이저 640명 · 개인 계정 단위 응대 이력 확보 [예시]',
};

export const chapter01ChannelSwitch: Chapter = {
  id: 1,
  act: 3,
  title: '채널 전환 — 공식 상담톡과 Cowork App',
  subtitle: '채널 전환 시점 · 무대: 고객 카카오톡 + 어드바이저 Cowork App',
  narration:
    '고객에게 바꾸라고 요구하지 않습니다. 매장에서 공식 채널을 안내하면, 고객은 늘 쓰던 카카오톡에서 채널 하나를 추가할 뿐입니다. 바뀌는 쪽은 어드바이저입니다. 개인 휴대폰 대신 Cowork App에서, 자기 계정으로 응대합니다. 카카오싱크가 연동되어 상대가 누구인지 — VIP 3년차인지, 무엇을 언제 샀는지 — 를 알고 응대합니다. "고객 경험은 그대로, 대화의 주인만 개인에서 회사로."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '오른쪽 폰이 바뀌었습니다. 어드바이저의 개인 휴대폰이 아니라, 매장에서 쓰는 Cowork App입니다. 왼쪽은 여전히 고객의 카카오톡입니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: 'STATE 1 — Cowork App 로그인',
        meta: '신 1 · 채널 전환',
        situation:
          '어드바이저가 Cowork App에 자기 계정으로 로그인한다. 담당 고객 58명이 계정에 묶여 있다 — 개인 폰 연락처가 아니라 회사 데이터다.',
        interact: '다음 → 고객에게 공식 채널 안내',
        feel: ['근무 도구가 개인 폰에서 회사 자산으로 바뀐다'],
        connect: ['→ 공식 채널 안내 발송'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: '공식 채널 안내 — 고객이 잃는 것은 없다',
        meta: '신 1',
        situation:
          '어드바이저가 업무앱에서 공식 채널을 안내한다. 고객 폰에는 카카오 알림톡으로 도착한다.',
        interact: '다음 → 채널 추가와 고객 식별',
        feel: ['"담당 어드바이저가 그대로 응대합니다"'],
        connect: ['→ 카카오싱크 연동'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(2),
      memo: {
        title: 'STATE 2 — 카카오싱크 고객 식별',
        meta: '신 1 · 제약 해소',
        situation:
          '고객이 채널을 추가하는 순간 카카오싱크가 온·오프라인 고객정보를 연동한다. 카카오 상담톡만으로는 익명 키뿐이지만, 업무앱에는 "VIP 3년차 · 최근 구매 07/02 · 선호 55"가 뜬다.',
        interact: '다음 → 상담 인입',
        feel: ['✓ 누구인지 알고 응대하는 것과 모르고 응대하는 것의 차이'],
        connect: ['→ 문의 인입'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(3),
      memo: {
        title: '같은 문의, 다른 도착지',
        meta: '신 1',
        situation:
          '신 0에서 개인 폰으로 오던 그 문의가, 이번엔 회사 채널을 통해 업무앱으로 들어온다. 대화 상대도 내용도 같지만 도착지가 다르다.',
        interact: '다음 → 응대와 자산화',
        feel: ['고객은 달라진 걸 느끼지 못한다'],
        connect: ['→ 회사 계정으로 응대'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 3 — 회사 계정 응대 · 이력 저장',
        meta: '신 1 · ROI',
        situation:
          '어드바이저가 업무앱에서 응대하고, 그 대화가 개인 폰이 아니라 회사에 기록된다. 어드바이저 640명이 각자 이 방식으로 담당 고객을 응대한다.',
        interact: '다음 → (신 2 매장 응대 흐름으로)',
        feel: ['"1:1은 그대로입니다. 다만 그 1:1이 회사 안에 있습니다"'],
        connect: ['→ 신 2: 재입고 → 예약 → 구매'],
      },
    },
  ],
  onComplete: { nextChapter: 2 },
};
