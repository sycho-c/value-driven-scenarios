import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { RETAIL_ACTORS } from '../_shared';

/**
 * 신 3. 연속성 — 담당이 자리를 비웠을 때.
 * 이 사례의 핵심 질문에 답하는 장면. 1:1 대화라는 형태는 신 0과 같지만,
 * 개인 폰의 1:1과 회사 채널의 1:1이 갈라지는 지점이 바로 여기다.
 * 담당 휴무 → 백업 어드바이저가 이력 그대로 승계 → 본사 단톡방으로 타 매장 재고 확인.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

/** 고객 폰 — 공식 상담톡 (고객은 담당이 바뀐 줄도 모른다) */
function custPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 3일 (수)' }];
  if (step >= 0) {
    items.push({
      id: 'c1',
      kind: 'message',
      senderId: 'cust',
      text: '지난번 재킷이랑 같이 매치할 스커트 보고 싶은데, 오늘 매장에 있을까요?',
      time: '11:02',
      isNew: step === 0,
    });
  }
  if (step >= 1) {
    items.push({
      id: 'c2',
      kind: 'joined',
      text: '담당 김소연 어드바이저 휴무 · 박지훈 어드바이저가 이어서 응대합니다',
      isNew: step === 1,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'c3',
      kind: 'message',
      senderId: 'adv2',
      text: '정수현님, 박지훈입니다. 8월에 구매하신 재킷 55와 매치되는 스커트로 두 가지 준비해 두겠습니다',
      time: '11:08',
      isNew: step === 3,
    });
  }
  if (step >= 5) {
    items.push(
      {
        id: 'c4',
        kind: 'message',
        senderId: 'adv2',
        text: '선호하시는 55 사이즈는 본점에 있어 오늘 오후까지 강남으로 이동시켜 두겠습니다',
        time: '11:21',
        isNew: step === 5,
      },
      {
        id: 'c5',
        kind: 'message',
        senderId: 'cust',
        text: '어머, 제 사이즈까지 기억해 주시네요. 저녁에 들를게요',
        time: '11:23',
        isNew: step === 5,
      },
    );
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
    statusTime: '11:23',
    items,
    highlight: step === 0 || step === 5,
  };
}

/** 김소연 폰 — 휴무. 개인 폰 시절이었다면 여기서 대화가 멈췄다 */
function offPhone(): MfgPhoneDef {
  return {
    id: 'off',
    ownerId: 'adv',
    ownerLabel: '김소연 어드바이저 · 휴무',
    ownerSub: 'Cowork App · 미근무',
    badge: 'company',
    badgeLabel: '휴무',
    headerTitle: '오프라인',
    screen: 'ios-home',
    iosHint: '🌙 오늘 휴무 — 개인 폰 시절이었다면 대화는 여기서 멈춘다',
    statusTime: '11:02',
    items: [],
    dimmed: true,
    highlight: false,
  };
}

/** 박지훈 폰 — 백업 응대. state 4에서는 본사 단톡방 화면 */
function backupPhone(step: Step): MfgPhoneDef {
  const isHqRoom = step === 4;
  const items: MfgKakaoItem[] = [];

  if (isHqRoom) {
    items.push(
      { id: 'date', kind: 'date', text: '본사–매장 협업방' },
      {
        id: 'h1',
        kind: 'message',
        senderId: 'adv2',
        text: '강남 플래그십입니다. FW 스커트 55 재고 확인 부탁드립니다 (VIP 고객 당일 방문 예정)',
        time: '11:12',
      },
      {
        id: 'h2',
        kind: 'message',
        senderId: 'hq',
        text: '본점에 55 두 점 있습니다. 오후 배송편으로 강남 보내드릴게요',
        time: '11:18',
        isNew: true,
      },
      {
        id: 'h3',
        kind: 'joined',
        text: '✓ 매장 간 재고 이동 요청 등록 — 본점 → 강남 플래그십',
        isNew: true,
      },
    );
    return {
      id: 'a',
      ownerId: 'adv2',
      ownerLabel: '박지훈 어드바이저 · 강남 플래그십',
      ownerSub: 'Cowork App · 내부 협업방',
      badge: 'company',
      badgeLabel: 'Cowork App',
      companyFrame: true,
      companyRibbonLabel: '본사 협업방',
      headerTitle: '본사 리테일운영팀 · 강남 플래그십',
      headerCount: '단톡',
      screen: 'cowork-app',
      appCaption: '내부 협업방 · 고객 대화와 분리됨',
      appBadge: 'Cowork App',
      appContext: {
        initial: '本',
        title: '본사 리테일운영팀 · 강남 플래그십',
        sub: '내부 협업 채널 — 고객에게 노출되지 않음',
        chips: ['재고 조회', '매장 간 이동 요청'],
        tag: '내부',
      },
      statusTime: '11:18',
      items,
      highlight: true,
    };
  }

  items.push({ id: 'date', kind: 'date', text: '9월 3일 (수)' });
  // 시간 순서대로 쌓는다: 고객 문의(11:02)가 먼저이고,
  // 그 문의가 담당 부재를 만나 자동 배정 → 이력 승계로 이어진다.
  items.push({
    id: 'b0',
    kind: 'message',
    senderId: 'cust',
    text: '지난번 재킷이랑 같이 매치할 스커트 보고 싶은데, 오늘 매장에 있을까요?',
    time: '11:02',
    isNew: step === 0,
  });
  if (step >= 1) {
    items.push({
      id: 'b1',
      kind: 'joined',
      text: '🔄 담당 김소연 휴무 — 정수현(VIP) 상담이 박지훈에게 자동 인계됨',
      isNew: step === 1,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'b2',
      kind: 'joined',
      text: '📇 고객 이력 승계 — VIP 3년차 · 선호 55 · 08/26 재킷 구매 · A/S AS-26082501 완료',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'b3',
      kind: 'message',
      senderId: 'adv2',
      text: '정수현님, 박지훈입니다. 8월에 구매하신 재킷 55와 매치되는 스커트로 두 가지 준비해 두겠습니다',
      time: '11:08',
      isNew: step === 3,
    });
  }
  if (step >= 5) {
    items.push(
      {
        id: 'b4',
        kind: 'joined',
        text: '✓ 본점 재고 이동 확정 — 오후 도착 예정',
        isNew: step === 5,
      },
      {
        id: 'b5',
        kind: 'message',
        senderId: 'adv2',
        text: '선호하시는 55 사이즈는 본점에 있어 오늘 오후까지 강남으로 이동시켜 두겠습니다',
        time: '11:21',
        isNew: step === 5,
      },
      {
        id: 'b6',
        kind: 'message',
        senderId: 'cust',
        text: '어머, 제 사이즈까지 기억해 주시네요. 저녁에 들를게요',
        time: '11:23',
        isNew: step === 5,
      },
    );
  }

  return {
    id: 'a',
    ownerId: 'adv2',
    ownerLabel: '박지훈 어드바이저 · 강남 플래그십',
    ownerSub: 'Cowork App · 백업 응대',
    badge: 'company',
    badgeLabel: '매장 직원',
    companyFrame: true,
    companyRibbonLabel: 'Cowork App',
    headerTitle: '정수현 고객님',
    screen: 'cowork-app',
    appCaption: '매장 근무 중 · 담당 고객 응대',
    appBadge: 'Cowork App',
    // 이력 승계(step 2) 전에는 인계만 받은 상태 — 아직 고객을 모른다.
    appContext:
      step >= 2
        ? {
            initial: '수',
            title: '정수현 · VIP 3년차',
            sub: '원담당 김소연 휴무 · 이력 승계 완료',
            chips: ['선호 55', '08/26 재킷 구매', 'A/S 완료'],
            tag: '백업 응대',
          }
        : {
            initial: '수',
            title: '정수현 · VIP 3년차',
            sub: '원담당 김소연 휴무 · 이력 확인 중',
            tag: '백업 응대',
          },
    statusTime: '11:23',
    items,
    highlight: step === 1 || step === 2 || step === 3 || step === 5,
  };
}

function arenaAt(step: Step) {
  return {
    layout: 'phones-only' as const,
    phonesLabel:
      step === 4
        ? '📱 고객 상담톡 · 담당 휴무 · 박지훈은 본사–매장 협업방에서 재고 확인'
        : '📱 담당 휴무 · 백업 어드바이저가 이력 그대로 이어받는다',
    phonesBadge: '연속성',
    actors: RETAIL_ACTORS,
    phones: [custPhone(step), offPhone(), backupPhone(step)],
    moreSlot: {
      title: '개인 폰이었다면 여기서 끝났다',
      sub: '담당 휴무·퇴사 = 대화 단절 · 이력 소멸 (신 0의 페인포인트)',
    },
    ...(step >= 5
      ? { banner: '같은 1:1이지만 결과가 다르다 — 담당이 없어도 회사가 고객을 알아본다' }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '담당이 쉬어도 고객은 기다리지 않는다. 이력이 회사에 있으니 누구든 이어받는다.',
  pain: '개인 폰 1:1의 한계: 담당 휴무·퇴사 시 응대 단절 · 취향·구매 이력 소멸 · 매장 간 협업 불가',
  roi: '담당 부재 시 응대 공백 해소 · 본사–매장 협업으로 매장 간 재고까지 연결 [예시]',
};

export const chapter03Continuity: Chapter = {
  id: 3,
  act: 3,
  title: '연속성 — 담당이 자리를 비웠을 때',
  subtitle: '운영 안정화 · 무대: 고객 상담톡 + 백업 어드바이저 업무앱 + 본사–매장 협업방',
  narration:
    '여기가 갈라지는 지점입니다. 형태는 신 0과 똑같은 1:1 대화입니다. 다른 것은 담당 김소연이 휴무일 때 벌어지는 일입니다. 개인 폰이었다면 고객은 답을 받지 못했습니다. 공식 채널이기 때문에 백업 박지훈에게 자동 배정되고, 고객의 취향과 구매 이력이 그대로 승계됩니다. 재고가 없으면 본사–매장 협업방에서 타 매장 재고를 끌어옵니다. "1:1이라는 형태가 아니라, 그 1:1이 어디에 저장되는가가 다릅니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '가운데 폰이 회색입니다 — 담당 김소연 어드바이저는 오늘 휴무입니다. 개인 폰 시절이었다면 이 대화는 여기서 멈췄습니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: 'STATE 1 — 담당 휴무일의 문의',
        meta: '신 3 · 연속성',
        situation:
          'VIP 고객이 후속 문의를 보낸다. 그런데 담당 어드바이저는 휴무다. 신 0 구조였다면 답은 다음 근무일까지 오지 않는다.',
        interact: '다음 → 백업 자동 배정',
        feel: ['"담당자 없으면 그냥 기다리는 수밖에요"'],
        connect: ['→ 자동 인계'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: 'STATE 2 — 백업 어드바이저 자동 배정',
        meta: '신 3',
        situation:
          '담당 부재가 감지되어 같은 매장 박지훈에게 자동 배정된다. 고객에게도 누가 이어받는지 안내된다.',
        interact: '다음 → 고객 이력 승계',
        feel: ['고객은 방치되지 않는다'],
        connect: ['→ 맥락 인계'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(2),
      memo: {
        title: 'STATE 3 — 고객 이력 승계',
        meta: '신 3 · 핵심',
        situation:
          '박지훈의 업무앱에 정수현 고객의 이력이 그대로 뜬다 — VIP 3년차, 선호 55, 8월 재킷 구매, A/S 완료. 신 0에서 김소연 개인 폰에만 있던 그 맥락이다.',
        interact: '다음 → 맥락 있는 응대',
        feel: ['"처음 보는 고객"이 아니라 "아는 고객"으로 만난다'],
        connect: ['→ 응대'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(3),
      memo: {
        title: '맥락을 아는 백업 응대',
        meta: '신 3',
        situation:
          '박지훈이 8월 구매 이력을 근거로 매치 상품을 제안한다. 담당이 바뀌었지만 응대 수준은 유지된다.',
        interact: '다음 → 본사–매장 협업방',
        feel: ['고객 입장에선 끊김이 없다'],
        connect: ['→ 재고가 없다면?'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 4 — 본사–매장 협업방',
        meta: '신 3 · 내부 협업',
        situation:
          '선호 사이즈가 매장에 없다. 박지훈이 같은 업무앱 안의 본사–매장 협업방에서 재고를 확인하고 이동을 요청한다. 고객 대화방과는 분리된 내부 채널이다.',
        interact: '다음 → 결과 회신',
        feel: ['고객 응대와 내부 협업이 한 앱 안에, 다만 분리되어'],
        connect: ['→ 매장 간 재고 이동'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgArena: arenaAt(5),
      memo: {
        title: 'STATE 5 — 끊기지 않은 관계',
        meta: '신 3 · ROI',
        situation:
          '본점 재고를 강남으로 이동시키고 고객에게 회신한다. 담당이 휴무인 날에도 VIP 고객은 자기를 아는 응대를 받았고, 그 이력은 다시 회사에 쌓인다.',
        interact: '다음 → (신 4 본사 대시보드로)',
        feel: ['"1:1이라는 형태가 아니라, 그 1:1이 어디 저장되는가의 문제"'],
        connect: ['→ 신 4: 본사는 이것을 어떻게 보는가'],
      },
    },
  ],
  onComplete: { nextChapter: 4 },
};
