import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 0. 도입 배경 — 슈퍼바이저 1명이 34개 점포를 개인 카톡으로.
 * 리테일 사례가 1:1이라면 이 사례는 1:N이다. 슈퍼바이저는 한 점포를 응대하는 동안
 * 나머지 33개 점포의 문의를 보지 못하고, 신규 개점 점주의 문의는 한 시간 넘게 묻힌다.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

/** 정미경 점주(강동천호점) ↔ 한태민 SV — 지금 응대 중인 한 개의 방 */
function ownerAItems(step: Step): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step >= 1) {
    items.push({
      id: 'a1',
      kind: 'message',
      senderId: 'owner1',
      text: '태민님, 이번 신메뉴 발주 수량 어떻게 잡아야 할까요?',
      time: '09:12',
      isNew: step === 1,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'a2',
      kind: 'message',
      senderId: 'sv',
      text: '매장 규모 기준으로 정리해서 오후에 드릴게요',
      time: '09:14',
      isNew: step === 2,
    });
  }
  if (step >= 4) {
    items.push(
      {
        id: 'a3',
        kind: 'message',
        senderId: 'owner1',
        text: '그리고 지난주 프로모션 공지, 저희는 못 받은 것 같은데 포스터는 언제 오나요?',
        time: '09:16',
        isNew: step === 4,
      },
      {
        id: 'a4',
        kind: 'message',
        senderId: 'sv',
        text: '단톡방에 올렸었는데… 다시 보내드릴게요',
        time: '09:18',
        isNew: step === 4,
      },
    );
  }
  return items;
}

/** 오세훈 점주(하남미사점, 신규 개점) — 같은 슈퍼바이저에게 보냈지만 답이 없는 방 */
function ownerBItems(step: Step): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step >= 3) {
    items.push({
      id: 'b1',
      kind: 'message',
      senderId: 'owner2',
      text: '안녕하세요, 개점 준비 관련해서 여쭤볼 게 있는데요',
      time: '09:05',
      isNew: step === 3,
    });
  }
  if (step >= 5) {
    items.push({
      id: 'b2',
      kind: 'message',
      senderId: 'owner2',
      text: '혹시 확인되시면 연락 부탁드립니다',
      time: '10:40',
      isNew: step === 5,
    });
  }
  return items;
}

/** 슈퍼바이저 개인폰 — 지금은 정미경 방을 보고 있다. 나머지는 쌓인다. */
function svItems(step: Step): MfgKakaoItem[] {
  const items = ownerAItems(step);
  if (step >= 3) {
    items.push({
      id: 'unread',
      kind: 'joined',
      text:
        step >= 5
          ? '🔔 다른 대화방 안 읽음 14건 — 오세훈 점주 외 5명 (가장 오래된 건 1시간 35분 경과)'
          : '🔔 다른 대화방 안 읽음 11건 — 오세훈 점주 외 4명',
      isNew: step === 3 || step === 5,
    });
  }
  return items;
}

function phones(step: Step): MfgPhoneDef[] {
  return [
    {
      id: 'a',
      ownerId: 'owner1',
      ownerLabel: '정미경 점주 · 강동천호점',
      ownerSub: '개인 카카오톡',
      badge: 'vendor',
      badgeLabel: '가맹점주',
      headerTitle: '한태민 SV',
      headerCount: '1:1',
      statusTime: '10:40',
      items: ownerAItems(step),
      highlight: step === 1 || step === 4,
    },
    {
      id: 'sv',
      ownerId: 'sv',
      ownerLabel: '한태민 슈퍼바이저 · 34개점 담당',
      ownerSub: '개인 카카오톡 · 개인 휴대폰',
      badge: 'company',
      badgeLabel: '슈퍼바이저',
      companyFrame: true,
      companyRibbonLabel: '슈퍼바이저',
      headerTitle: '정미경 점주 (강동천호점)',
      headerCount: '1:1',
      statusTime: '10:40',
      items: svItems(step),
      highlight: step === 2,
    },
    {
      id: 'b',
      ownerId: 'owner2',
      ownerLabel: '오세훈 점주 · 하남미사점',
      ownerSub: '개인 카카오톡 · 신규 개점',
      badge: 'vendor',
      badgeLabel: '가맹점주',
      headerTitle: '한태민 SV',
      headerCount: '1:1',
      statusTime: '10:40',
      items: ownerBItems(step),
      highlight: step === 3 || step === 5,
    },
  ];
}

function arenaState(step: Step, withPain = false) {
  return {
    layout: 'phones-only' as const,
    phonesLabel: '📱 슈퍼바이저 1명 ↔ 가맹점 다수 · 점포마다 따로 열린 개인 카톡방',
    phonesBadge: '1 : N',
    actors: FRANCHISE_ACTORS,
    phones: phones(step),
    moreSlot: {
      title: '그리고 이런 방이 32개 더',
      sub: '가맹점 2,500개 · 슈퍼바이저 60명 · 인당 평균 42개점 담당 [예시]',
    },
    ...(withPain
      ? {
          painPopup: {
            title: '⚠ 34개 점포를 개인 카톡으로 관리한다는 것',
            items: [
              { heading: '응대 누락이 구조적으로 발생', desc: '한 점포를 응대하는 동안 나머지 33개는 대기 — 신규 개점 점주 문의가 1시간 35분째 미확인' },
              { heading: '공지 도달을 확인할 수 없다', desc: '본사 공지를 단톡방에 올려도 누가 읽었는지, 누락된 점포가 어디인지 알 수 없음' },
              { heading: '슈퍼바이저 퇴사 = 34개점 이력 증발', desc: '점주 연락처·현장 이슈·약속이 개인 폰과 함께 사라지고, 후임은 처음부터 다시' },
            ],
          },
        }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '점주가 쓰던 방식(카카오톡) 그대로, 가맹점 관리를 본사 자산으로.',
  pain: '슈퍼바이저 개인폰 1:N = 응대 누락 · 공지 도달 확인 불가 · 퇴사 시 담당 점포 이력 증발',
  roi: '측정 불가 구간이 곧 본사 리스크. 계량 근거는 공식 채널 전환 후 확보',
};

export const chapter00SupervisorOverload: Chapter = {
  id: 0,
  act: 1,
  title: '도입 배경 — 슈퍼바이저 1명이 34개 점포를',
  subtitle: '도입 전 현황 · 무대: 슈퍼바이저 개인폰과 가맹점주들의 개인 카카오톡',
  narration:
    '가맹본부의 현장 접점은 슈퍼바이저입니다. 한 사람이 평균 40여 개 점포를 맡고, 점주들과는 각자의 개인 카톡방으로 이어져 있습니다. 한 점포를 응대하는 동안 나머지는 기다립니다. 본사가 공지를 내려도 누가 읽었는지 알 수 없고, 슈퍼바이저가 그만두면 담당하던 점포의 이력이 통째로 사라집니다. "가맹점 2,500개의 현장이, 슈퍼바이저 60명의 개인 폰 안에 있습니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '가운데가 슈퍼바이저 개인폰, 좌우는 서로 다른 가맹점주의 폰입니다. 세 폰은 각각 다른 1:1 대화입니다 — 슈퍼바이저는 이런 방을 34개 갖고 있습니다.',
      mfgArena: arenaState(0),
      memo: {
        title: 'STATE 1 — 1:N 구조 진입',
        meta: '신 0 · 도입 배경',
        situation:
          '한태민 슈퍼바이저는 수도권 2권역 34개 점포를 담당한다. 점주마다 개인 카톡방이 따로 열려 있고, 지금은 강동천호점 정미경 점주 방을 보고 있다.',
        interact: '화살표 클릭으로 대화가 진행된다.',
        feel: ['"우리 SV들도 지금 이렇게 합니다"'],
        connect: ['→ 한 점포 응대가 시작된다'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3800,
      mfgArena: arenaState(1),
      memo: {
        title: '발주 문의 — 운영에 직결되는 대화',
        meta: '신 0',
        situation: '7년차 점주가 신메뉴 발주 수량을 묻는다. 매출과 폐기율에 바로 영향을 주는 문의다.',
        interact: '다음 →',
        feel: ['현장 판단이 개인 카톡으로 오간다'],
        connect: ['→ 슈퍼바이저 응대'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3800,
      mfgArena: arenaState(2),
      memo: {
        title: '슈퍼바이저 응대 — 한 번에 한 방',
        meta: '신 0',
        situation:
          '슈퍼바이저가 답한다. 이 순간 그는 34개 방 중 하나만 보고 있다. 나머지 33개에서 무슨 일이 일어나는지는 알 수 없다.',
        interact: '다음 → 다른 점포에서는',
        feel: ['사람 하나가 감당하는 폭'],
        connect: ['→ 신규 개점 점주의 문의'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4200,
      mfgArena: arenaState(3),
      memo: {
        title: 'STATE 2 — 묻히는 문의',
        meta: '신 0',
        situation:
          '오른쪽 하남미사점은 개점 준비 중인 신규 점주다. 09:05에 문의를 보냈지만 슈퍼바이저 폰에서는 안 읽음 11건 속에 묻혀 있다.',
        interact: '다음 → 공지 누락',
        feel: ['가장 도움이 필요한 신규 점주가 가장 늦게 닿는다'],
        connect: ['→ 본사 공지도 마찬가지'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4200,
      mfgArena: arenaState(4),
      memo: {
        title: 'STATE 3 — 공지가 닿았는지 알 수 없다',
        meta: '신 0',
        situation:
          '점주가 프로모션 공지를 못 받았다고 한다. 슈퍼바이저는 "단톡방에 올렸었는데"라고 답하지만, 누가 읽었고 누가 놓쳤는지 확인할 방법이 없다.',
        interact: '다음 → 방치된 신규 점주',
        feel: ['본사는 공지를 내렸다고 믿고, 현장은 못 받았다고 한다'],
        connect: ['→ 무응답 누적'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaState(5),
      memo: {
        title: '1시간 35분째 무응답',
        meta: '신 0',
        situation:
          '신규 점주가 다시 메시지를 보낸다. 슈퍼바이저 폰의 안 읽음은 14건으로 늘었다. 악의가 아니라 구조의 결과다.',
        interact: '다음 → 페인포인트 정리',
        feel: ['"연락이 안 된다"는 가맹점 불만의 실체'],
        connect: ['→ 세 가지 사각지대'],
      },
    },
    {
      index: 6,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgArena: arenaState(5, true),
      memo: {
        title: 'STATE 4 — 사각지대 인지',
        meta: '신 0 · 페인포인트',
        situation:
          '응대 누락 · 공지 도달 확인 불가 · 퇴사 시 이력 증발. 세 가지가 정면으로 제시된다. 가맹점 2,500개 규모에서 이것은 개인의 성실성으로 메울 수 없다.',
        interact: '다음 → (신 1 공식 채널 전환으로)',
        feel: ['"SV를 더 뽑는 게 답이 아닙니다"'],
        connect: ['→ 신 1: 가맹점 채널 + 점포 단톡방'],
      },
    },
  ],
  onComplete: { nextChapter: 1 },
};
