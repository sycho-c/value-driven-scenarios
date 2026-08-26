import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 2. 공지·교육·설문 — 본사가 2,500개점에 닿는 법.
 * 개인 카톡으로는 "올렸다"까지만 되고 "닿았다"는 확인할 수 없다.
 * 공식 채널에서는 도달·열람·이수·응답이 숫자로 남고, 미열람 점포만 골라 다시 보낸다.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

/** 정미경 점주(카카오) — 공지를 바로 읽는 점포 */
function ownerAPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 1일 (월)' }];
  if (step >= 1) {
    items.push(
      {
        id: 'n1',
        kind: 'message',
        senderId: 'hq',
        text: '[본사 공지] 9월 프로모션 — 아이스 신메뉴 2종 출시. 포스터는 9/3까지 각 점포 배송 예정입니다.',
        time: '09:00',
        isNew: step === 1,
      },
      { id: 'n1f', kind: 'file', senderId: 'hq', text: '9월_프로모션_운영가이드.pdf', time: '09:00', isNew: step === 1 },
    );
  }
  if (step >= 2) {
    items.push({ id: 'read1', kind: 'joined', text: '✓ 09:04 열람 · 본사 집계 반영', isNew: step === 2 });
  }
  if (step >= 4) {
    items.push(
      {
        id: 't1',
        kind: 'message',
        senderId: 'hq',
        text: '[교육] 신메뉴 제조 교육 영상 (8분) — 9/5까지 이수 부탁드립니다',
        time: '11:20',
        isNew: step === 4,
      },
      { id: 't1d', kind: 'joined', text: '✓ 김지아 매니저 이수 완료 · 09/02 14:12', isNew: step === 4 },
    );
  }
  if (step >= 5) {
    items.push({
      id: 's1',
      kind: 'message',
      senderId: 'owner1',
      text: '[설문 응답] 포스터 수령 완료 · 신메뉴 재료 입고 완료 · 준비 이상 없음',
      time: '09/03 10:05',
      isNew: step === 5,
    });
  }
  return {
    id: 'a',
    ownerId: 'owner1',
    ownerLabel: '정미경 점주 · 강동천호점',
    ownerSub: '가맹점 공식 채널',
    badge: 'channel',
    badgeLabel: '점포 채널',
    headerTitle: '강동천호점',
    headerCount: '3',
    channelTheme: true,
    statusTime: '10:05',
    items,
    highlight: step === 1 || step === 5,
  };
}

/** 오세훈 점주(웹 채널) — 공지를 늦게 확인하는 점포. 리마인드 대상 */
function ownerBPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 1일 (월)' }];
  if (step >= 1) {
    items.push({
      id: 'n2',
      kind: 'message',
      senderId: 'hq',
      text: '[본사 공지] 9월 프로모션 — 아이스 신메뉴 2종 출시. 포스터는 9/3까지 각 점포 배송 예정입니다.',
      time: '09:00',
      isNew: step === 1,
    });
  }
  if (step >= 2 && step < 3) {
    items.push({ id: 'unread', kind: 'joined', text: '● 미열람 — 개점 준비로 확인 지연', isNew: step === 2 });
  }
  if (step >= 3) {
    items.push(
      { id: 'remind', kind: 'joined', text: '🔔 미열람 리마인드 자동 발송 · 09/01 15:00', isNew: step === 3 },
      { id: 'read2', kind: 'joined', text: '✓ 15:22 열람 · 본사 집계 반영', isNew: step === 3 },
    );
  }
  if (step >= 4) {
    items.push({
      id: 't2',
      kind: 'message',
      senderId: 'hq',
      text: '[교육] 신메뉴 제조 교육 영상 (8분) — 9/5까지 이수 부탁드립니다',
      time: '11:20',
      isNew: step === 4,
    });
  }
  if (step >= 5) {
    items.push({
      id: 's2',
      kind: 'message',
      senderId: 'owner2',
      text: '[설문 응답] 포스터 미수령 — 배송 확인 요청드립니다',
      time: '09/03 09:40',
      isNew: step === 5,
    });
  }
  return {
    id: 'b',
    ownerId: 'owner2',
    ownerLabel: '오세훈 점주 · 하남미사점',
    ownerSub: '가맹점 공식 채널 (웹)',
    badge: 'channel',
    badgeLabel: '점포 채널',
    headerTitle: '하남미사점',
    headerCount: '2',
    channelTheme: true,
    statusTime: '10:05',
    items,
    highlight: step === 3 || step === 5,
  };
}

/** 슈퍼바이저 Cowork App — 도달·열람·이수·응답이 숫자로 */
function svPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 1일 (월)' }];
  if (step === 0) {
    items.push({ id: 'ready', kind: 'joined', text: '📋 본사 공지 예약 — 9월 프로모션 · 전국 2,500개점 09:00 발송' });
  }
  if (step >= 1) {
    items.push({
      id: 'sent',
      kind: 'joined',
      text: '📣 공지 발송 완료 — 담당 34개점 도달 34/34 (카카오 29 · 웹 5)',
      isNew: step === 1,
    });
  }
  if (step >= 2) {
    items.push({
      id: 'read-agg',
      kind: 'joined',
      text: '👁 열람 집계 28/34 (82%) — 미열람 6개점 (하남미사점 외 5)',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({
      id: 'remind-agg',
      kind: 'joined',
      text: '🔔 미열람 6개점 자동 리마인드 → 열람 34/34 (100%) · 09/01 16:10',
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    items.push({
      id: 'train',
      kind: 'joined',
      text: '🎓 신메뉴 교육 이수 31/34 (91%) — 미이수 3개점은 9/5 마감 전 재알림 예약',
      isNew: step === 4,
    });
  }
  if (step >= 5) {
    items.push({
      id: 'survey',
      kind: 'joined',
      text: '📊 준비현황 설문 응답 33/34 (97%) — 포스터 미수령 2개점 확인, 물류팀 이관',
      isNew: step === 5,
    });
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
    headerTitle: '9월 프로모션 공지',
    screen: 'cowork-app',
    appCaption: '본사 공지 · 담당 점포 도달 현황',
    appBadge: 'Cowork App',
    appContext: {
      initial: '📣',
      title: '9월 프로모션 · 전국 2,500개점',
      sub: '담당 34개점 · 가맹기획팀 발송',
      chips:
        step >= 5
          ? ['열람 34/34', '교육 31/34', '설문 33/34']
          : step >= 4
            ? ['열람 34/34', '교육 31/34']
            : step >= 3
              ? ['열람 34/34']
              : step >= 2
                ? ['열람 28/34', '미열람 6']
                : step >= 1
                  ? ['도달 34/34']
                  : undefined,
      tag: 'SV',
    },
    statusTime: '10:05',
    items,
    highlight: step >= 1,
  };
}

function arenaAt(step: Step) {
  return {
    layout: 'phones-only' as const,
    phonesLabel: '📱 본사 공지가 점포마다 닿고, 닿았는지가 숫자로 돌아온다',
    phonesBadge: '공지 · 교육 · 설문',
    actors: FRANCHISE_ACTORS,
    phones: [ownerAPhone(step), svPhone(step), ownerBPhone(step)],
    moreSlot: {
      title: '전국 2,500개점 · 슈퍼바이저 60명',
      sub: '본사는 점포 단위 도달·열람·이수·응답을 실시간으로 본다 [예시]',
    },
    ...(step >= 5
      ? { banner: '신 0에서 "올렸는데요"로 끝나던 공지가, 열람 82%→100% · 교육 이수 91% · 설문 응답 97%라는 숫자로 남는다' }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '공지·교육·설문이 점포 단위로 나가고, 도달·열람·이수·응답이 숫자로 돌아온다.',
  pain: '과거: 단톡방에 올리는 것으로 끝 · 누가 읽었는지 모름 · 미열람 점포를 특정할 수 없음',
  roi: '공지 열람 82% → 리마인드 후 100% · 교육 이수 91% · 설문 응답 97% [예시]',
};

export const chapter02NoticeTraining: Chapter = {
  id: 2,
  act: 3,
  title: '공지·교육·설문 — 본사가 2,500개점에 닿는 법',
  subtitle: '운영 정착 · 무대: 점포 채널 + 슈퍼바이저 Cowork App',
  narration:
    '가맹본부가 가장 답답해하는 지점입니다. 공지를 내렸는데 현장은 못 받았다고 합니다. 개인 카톡 단톡방에서는 "올렸다"까지만 확인되고 "닿았다"는 알 수 없기 때문입니다. 공식 채널에서는 도달과 열람이 점포 단위로 집계되고, 읽지 않은 점포만 골라 다시 보냅니다. 교육 이수와 설문 응답도 같은 방식으로 남습니다. "공지를 내렸다가 아니라, 몇 개 점포에 닿았는지로 말하게 됩니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '가운데 Cowork App에 본사 공지가 예약돼 있습니다. 좌우는 서로 다른 점포 — 왼쪽은 카카오, 오른쪽은 웹 채널입니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: 'STATE 1 — 본사 공지 예약',
        meta: '신 2 · 공지·교육·설문',
        situation: '가맹기획팀이 9월 프로모션 공지를 전국 2,500개점에 09:00 발송으로 예약해 두었다.',
        interact: '다음 → 공지 발송',
        feel: ['공지가 사람이 아니라 시스템을 타고 나간다'],
        connect: ['→ 점포별 도달'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: 'STATE 2 — 도달 34/34',
        meta: '신 2',
        situation:
          '공지와 운영가이드가 두 점포에 동시에 도착한다. 카카오 29개점·웹 5개점으로 경로는 갈리지만 도달은 34/34다.',
        interact: '다음 → 열람 집계',
        feel: ['카톡 미사용 점포도 빠지지 않는다'],
        connect: ['→ 누가 읽었는가'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(2),
      memo: {
        title: 'STATE 3 — 열람 82%, 미열람 6개점 특정',
        meta: '신 2 · 핵심',
        situation:
          '강동천호점은 09:04에 읽었고, 개점 준비 중인 하남미사점은 아직 못 읽었다. 신 0에서는 알 수 없던 것이 여기서는 "미열람 6개점"으로 특정된다.',
        interact: '다음 → 자동 리마인드',
        feel: ['"누가 안 읽었는지"를 처음으로 알게 된다'],
        connect: ['→ 미열람만 골라 재발송'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(3),
      memo: {
        title: '미열람 리마인드 → 열람 100%',
        meta: '신 2',
        situation:
          '미열람 6개점에만 리마인드가 자동 발송되고, 하남미사점도 15:22에 확인한다. 이미 읽은 28개점은 다시 받지 않는다.',
        interact: '다음 → 교육 이수',
        feel: ['전체 재발송이 아니라 안 읽은 곳만'],
        connect: ['→ 교육 자료 배포'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 4 — 교육 이수 91%',
        meta: '신 2',
        situation:
          '신메뉴 제조 교육 영상이 나가고 이수 여부가 점포·인원 단위로 남는다. 강동천호점은 매니저가 이수했고, 미이수 3개점은 마감 전 재알림이 예약된다.',
        interact: '다음 → 설문',
        feel: ['교육이 "보냈다"가 아니라 "이수했다"로'],
        connect: ['→ 준비현황 점검'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgArena: arenaAt(5),
      memo: {
        title: 'STATE 5 — 설문 97% · 이상 점포 즉시 식별',
        meta: '신 2 · ROI',
        situation:
          '준비현황 설문에 33개점이 응답했고, 포스터 미수령 2개점이 즉시 드러나 물류팀으로 이관된다. 프로모션 시작 전에 문제를 잡는다.',
        interact: '다음 → (신 3 현장 이슈 대응으로)',
        feel: ['"현장 준비 됐나요?"에 숫자로 답한다'],
        connect: ['→ 신 3: 점주 문의와 본사 에스컬레이션'],
      },
    },
  ],
  onComplete: { nextChapter: 3 },
};
