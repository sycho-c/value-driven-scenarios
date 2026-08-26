import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 1. 채널 전환 — 가맹점 채널과 점포 단톡방.
 * 슈퍼바이저는 개인폰에서 Cowork App으로 옮기고, 점포마다 점주·매장 매니저가 함께 있는
 * 단톡방이 열린다. 카카오톡을 쓰지 않는 점주는 문자로 같은 채널에 들어온다.
 */

type Step = 0 | 1 | 2 | 3 | 4;

/** 정미경 점주 — 카카오톡 사용 */
function ownerAPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step === 1) {
    items.push({
      id: 'invite',
      kind: 'invite',
      inviteVendor: '정미경',
      inviteChannel: '가맹점 공식 채널',
      inviteTitle: '[가맹점 채널 안내]',
      inviteDesc:
        '강동천호점 정미경 점주님, 본사 가맹점 공식 채널입니다. 담당 한태민 슈퍼바이저가 그대로 응대하며, 본사 공지도 이 채널로 도착합니다.',
      inviteNotes: ['점포 단위 채널 — 매장 매니저도 함께 참여 가능', '슈퍼바이저 변경 시에도 상담 이력 유지'],
      inviteBtn: '채널 추가하기 ▶',
      isNew: true,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'joined',
      kind: 'joined',
      text: '✓ 강동천호점 채널 입장 · 한태민 SV 연결',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'mgr-in',
      kind: 'joined',
      text: '👥 김지아 매니저 참여 — 점주·매니저·SV 3인 점포방',
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    items.push({
      id: 'q1',
      kind: 'message',
      senderId: 'owner1',
      text: '태민님, 이번 신메뉴 발주 수량 어떻게 잡아야 할까요?',
      time: '09:12',
      isNew: step === 4,
    });
  }

  return {
    id: 'a',
    ownerId: 'owner1',
    ownerLabel: '정미경 점주 · 강동천호점',
    ownerSub: step >= 2 ? '가맹점 공식 채널' : '카카오톡 알림',
    badge: step >= 2 ? 'channel' : 'vendor',
    badgeLabel: step >= 2 ? '점포 채널' : '가맹점주',
    headerTitle: step >= 2 ? '강동천호점' : '알림',
    headerCount: step >= 3 ? '3' : step >= 2 ? '점포방' : undefined,
    channelTheme: step >= 2,
    screen: step >= 2 ? 'chat' : 'alert-list',
    statusTime: '09:12',
    items,
    highlight: step === 1 || step === 4,
  };
}

/** 오세훈 점주 — 카카오톡 미사용. 문자로 같은 채널에 들어온다 */
function ownerBPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step === 1) {
    items.push({
      id: 'wait',
      kind: 'joined',
      text: '— 카카오톡 미사용 점주 · 알림톡이 닿지 않음',
    });
  }
  if (step >= 2) {
    items.push({
      id: 'sms',
      kind: 'invite',
      inviteVendor: '오세훈',
      inviteChannel: '가맹점 공식 채널',
      inviteTitle: '[문자 안내 · 하남미사점]',
      inviteDesc:
        '오세훈 점주님, 카카오톡 대신 문자로 안내드립니다. 아래 링크로 들어오시면 카카오톡 없이도 같은 채널에서 본사·슈퍼바이저와 소통하실 수 있습니다.',
      inviteNotes: ['카카오톡 미사용 점주는 문자·웹 채널로 동일 참여', '공지·교육 자료도 같은 경로로 수신'],
      inviteBtn: '웹 채널로 입장 ▶',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'joined2',
      kind: 'joined',
      text: '✓ 하남미사점 채널 입장 (웹) · 한태민 SV 연결',
      isNew: step === 3,
    });
  }

  return {
    id: 'b',
    ownerId: 'owner2',
    ownerLabel: '오세훈 점주 · 하남미사점',
    ownerSub: step >= 3 ? '가맹점 공식 채널 (웹)' : '문자 · 카카오톡 미사용',
    badge: step >= 3 ? 'channel' : 'vendor',
    badgeLabel: step >= 3 ? '점포 채널' : '가맹점주',
    headerTitle: step >= 3 ? '하남미사점' : '문자',
    headerCount: step >= 3 ? '점포방' : undefined,
    channelTheme: step >= 3,
    screen: step >= 3 ? 'chat' : 'alert-list',
    statusTime: '09:12',
    items,
    highlight: step === 2 || step === 3,
  };
}

/** 슈퍼바이저 — Cowork App */
function svPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step === 0) {
    items.push({
      id: 'login',
      kind: 'joined',
      text: '🏪 수도권 2권역 · 한태민 계정 로그인 — 담당 점포 34개',
    });
  }
  if (step >= 1) {
    items.push({
      id: 'send1',
      kind: 'joined',
      text: '📨 담당 34개 점포에 가맹점 채널 안내 발송 (알림톡 29 · 문자 5)',
      isNew: step === 1,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'sms-note',
      kind: 'joined',
      text: '✓ 카카오톡 미사용 5개 점포는 문자·웹 채널로 자동 전환 — 누락 0',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'rooms',
      kind: 'joined',
      text: '👥 점포방 생성 — 점주 + 매장 매니저 + SV. 인수인계 시 방은 그대로 유지',
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    items.push(
      {
        id: 'q1',
        kind: 'message',
        senderId: 'owner1',
        text: '태민님, 이번 신메뉴 발주 수량 어떻게 잡아야 할까요?',
        time: '09:12',
        isNew: step === 4,
      },
      {
        id: 'sla',
        kind: 'joined',
        text: '⏱ 미응답 알림 설정 — 2시간 내 미응답 시 SV·본사에 동시 알림',
        isNew: step === 4,
      },
    );
  }

  return {
    id: 'sv',
    ownerId: 'sv',
    ownerLabel: '한태민 슈퍼바이저 · 34개점 담당',
    ownerSub: 'Cowork App · 업무용',
    badge: 'company',
    badgeLabel: '슈퍼바이저',
    companyFrame: true,
    companyRibbonLabel: 'Cowork App',
    headerTitle: step >= 4 ? '강동천호점' : '담당 점포',
    screen: 'cowork-app',
    appCaption: '현장 순회 중 · 담당 점포 34개',
    appBadge: 'Cowork App',
    appContext:
      step >= 4
        ? {
            initial: '천',
            title: '강동천호점 · 7년차',
            sub: '점주 정미경 · 매니저 김지아 · 담당 한태민',
            chips: ['월매출 A등급', '최근 방문 08/19', '미해결 이슈 0'],
            tag: '담당',
          }
        : {
            initial: '34',
            title: '담당 점포 34개',
            sub: '수도권 2권역 · 카카오 29 · 웹 5',
            chips: step >= 2 ? ['채널 전환 34/34'] : undefined,
            tag: 'SV',
          },
    statusTime: '09:12',
    items,
    highlight: step === 1 || step === 2 || step === 3,
  };
}

function arenaAt(step: Step) {
  return {
    layout: 'phones-only' as const,
    phonesLabel: '📱 점주 폰(카카오 · 문자) ↔ 슈퍼바이저 Cowork App · 점포마다 공식 채널',
    phonesBadge: '공식 채널 전환',
    actors: FRANCHISE_ACTORS,
    phones: [ownerAPhone(step), svPhone(step), ownerBPhone(step)],
    moreSlot: {
      title: '외 32개 점포도 같은 절차로',
      sub: '가맹점 2,500개 · 슈퍼바이저 60명 · 카카오 미사용 점포는 문자·웹으로 [예시]',
    },
    ...(step >= 4
      ? { banner: '점주는 쓰던 방식 그대로 — 카카오톡이든 문자든. 바뀌는 쪽은 슈퍼바이저와 본사다.' }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '점포마다 공식 채널. 카카오톡을 쓰지 않는 점주도 문자·웹으로 같은 채널에.',
  pain: '해결: 개인폰 귀속 → 본사 기록 · 카톡 미사용 점주 사각 → 문자·웹 참여 · 응대 누락 → 미응답 알림',
  roi: '담당 34개점 채널 전환 34/34 · 카카오 미사용 5개점 누락 0 [예시]',
};

export const chapter01ChannelSwitch: Chapter = {
  id: 1,
  act: 3,
  title: '채널 전환 — 가맹점 채널과 점포 단톡방',
  subtitle: '채널 전환 시점 · 무대: 점주 폰(카카오·문자) + 슈퍼바이저 Cowork App',
  narration:
    '점주에게 바꾸라고 요구하지 않습니다. 카카오톡을 쓰는 점주는 채널을 추가하고, 쓰지 않는 점주는 문자로 같은 채널에 들어옵니다. 어느 가맹본부든 카톡을 안 쓰는 점주가 반드시 있고, 그 점포가 관리 사각지대가 됩니다. 점포마다 점주와 매장 매니저, 슈퍼바이저가 함께 있는 방이 열리고, 슈퍼바이저는 개인폰 대신 Cowork App에서 자기 계정으로 일합니다. "점주는 그대로, 본사만 보이기 시작합니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '가운데 폰이 바뀌었습니다. 슈퍼바이저의 개인 휴대폰이 아니라 Cowork App이고, 담당 점포 34개가 계정에 묶여 있습니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: 'STATE 1 — Cowork App 로그인',
        meta: '신 1 · 채널 전환',
        situation:
          '슈퍼바이저가 자기 계정으로 로그인한다. 담당 34개 점포가 개인 폰 연락처가 아니라 본사 데이터로 묶여 있다.',
        interact: '다음 → 34개 점포 채널 안내',
        feel: ['담당 점포가 사람이 아니라 조직에 귀속된다'],
        connect: ['→ 일괄 안내 발송'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: '34개 점포 일괄 안내 — 알림톡 29 · 문자 5',
        meta: '신 1',
        situation:
          '담당 점포 전체에 채널 안내를 보낸다. 카카오톡을 쓰는 29개점은 알림톡으로, 쓰지 않는 5개점은 문자로 나뉘어 나간다.',
        interact: '다음 → 카톡 미사용 점주',
        feel: ['채널이 하나여도 도달 경로는 점주에 맞춘다'],
        connect: ['→ 오른쪽 폰을 보세요'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(2),
      memo: {
        title: 'STATE 2 — 카카오톡을 쓰지 않는 점주',
        meta: '신 1 · 실제 제약',
        situation:
          '하남미사점 점주는 카카오톡을 쓰지 않는다. 알림톡이 닿지 않으므로 문자로 안내가 나가고, 웹 채널로 같은 방에 들어온다. 신 0에서 이 점포는 통제 밖이었다.',
        interact: '다음 → 점포방 구성',
        feel: ['"저희 점주님들 중엔 카톡 안 쓰시는 분도 계셔서요"'],
        connect: ['→ 누락 0으로 전환 완료'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(3),
      memo: {
        title: 'STATE 3 — 점주 + 매니저 + SV 점포방',
        meta: '신 1',
        situation:
          '점포방에 매장 매니저가 함께 참여한다. 점주 개인이 아니라 점포가 채널의 단위이므로, 점주가 자리를 비워도 매니저가 이어받고 방과 이력은 그대로 남는다.',
        interact: '다음 → 문의 인입',
        feel: ['채널의 단위가 사람이 아니라 점포다'],
        connect: ['→ 응대 누락 방지'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 4 — 놓치지 않는 구조',
        meta: '신 1 · ROI',
        situation:
          '신 0에서 묻히던 그 문의가 이번엔 본사 채널로 들어온다. 2시간 내 미응답이면 슈퍼바이저와 본사에 동시 알림이 가므로, 1시간 35분 무응답 같은 일이 구조적으로 걸러진다.',
        interact: '다음 → (신 2 공지·교육·설문으로)',
        feel: ['"SV 성실성이 아니라 시스템이 잡습니다"'],
        connect: ['→ 신 2: 본사가 2,500개점에 닿는 법'],
      },
    },
  ],
  onComplete: { nextChapter: 2 },
};
