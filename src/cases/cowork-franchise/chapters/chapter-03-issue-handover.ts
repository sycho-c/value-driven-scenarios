import type { Chapter, MfgKakaoItem, MfgPhoneDef, MfgValueStripDef } from '../../_types';
import { FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 3. 현장 이슈와 인수인계 — 슈퍼바이저가 바뀌어도 점포는 이어진다.
 * 앞부분은 점주 이슈가 본사까지 올라가 조치되는 경로,
 * 뒷부분은 슈퍼바이저 교체 시 담당 34개 점포가 이력째 승계되는 장면이다.
 * 가맹본부에서 슈퍼바이저 이직은 상시적이고, 그때마다 관계가 초기화되는 것이 실제 손실이다.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

/** 오세훈 점주(하남미사점) — 현장 이슈 제기부터 후임 응대까지 */
function ownerPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 8일 (월)' }];
  if (step >= 1) {
    items.push(
      {
        id: 'i1',
        kind: 'message',
        senderId: 'owner2',
        text: '개점 3주차인데 제빙기가 계속 멈춥니다. 오늘만 두 번이라 아이스 음료를 못 내고 있어요',
        time: '08:40',
        isNew: step === 1,
      },
      { id: 'i1f', kind: 'file', senderId: 'owner2', text: '제빙기_에러코드_사진.jpg', time: '08:41', isNew: step === 1 },
    );
  }
  if (step >= 2) {
    items.push({
      id: 'i2',
      kind: 'message',
      senderId: 'sv',
      text: '확인했습니다. 에러코드 기준으로 본사 시설팀에 바로 접수하겠습니다',
      time: '08:52',
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push(
      {
        id: 'i3',
        kind: 'message',
        senderId: 'sv',
        text: '오늘 오후 A/S 배정됐습니다. 그때까지 아이스 메뉴는 인근 하남풍산점 지원으로 커버하겠습니다',
        time: '09:35',
        isNew: step === 3,
      },
      { id: 'i3c', kind: 'joined', text: '🧾 이슈 등록 FR-26090801 · 시설팀 배정 · 처리 예정 9/8 15:00', isNew: step === 3 },
    );
  }
  if (step >= 4) {
    items.push({
      id: 'h1',
      kind: 'joined',
      text: '담당 슈퍼바이저 변경 — 한태민 → 이서준. 상담 이력은 그대로 유지됩니다',
      isNew: step === 4,
    });
  }
  if (step >= 5) {
    items.push(
      {
        id: 'h2',
        kind: 'message',
        senderId: 'sv2',
        text: '점주님, 후임 이서준입니다. 제빙기 A/S 이후 재발 없는지 확인차 연락드렸습니다. 개점 3주차 체크리스트도 이번 주 함께 보겠습니다',
        time: '09/15 10:12',
        isNew: step === 5,
      },
      {
        id: 'h3',
        kind: 'message',
        senderId: 'owner2',
        text: '인수인계 받으셨나 보네요. 처음부터 설명 안 해도 되니 편합니다',
        time: '09/15 10:15',
        isNew: step === 5,
      },
    );
  }
  return {
    id: 'a',
    ownerId: 'owner2',
    ownerLabel: '오세훈 점주 · 하남미사점',
    ownerSub: '가맹점 공식 채널 (웹)',
    badge: 'channel',
    badgeLabel: '점포 채널',
    headerTitle: '하남미사점',
    headerCount: '2',
    channelTheme: true,
    statusTime: '10:15',
    items,
    highlight: step === 1 || step === 5,
  };
}

/** 한태민 SV — step 2에서 본사 협업방, step 4부터 퇴사로 비활성 */
function svPhone(step: Step): MfgPhoneDef {
  const isHqRoom = step === 2;
  const isGone = step >= 4;

  if (isGone) {
    return {
      id: 'sv',
      ownerId: 'sv',
      ownerLabel: '한태민 슈퍼바이저 · 퇴사',
      ownerSub: 'Cowork App · 계정 비활성',
      badge: 'company',
      badgeLabel: '퇴사',
      headerTitle: '오프라인',
      screen: 'ios-home',
      iosHint: '🔒 계정 비활성 — 담당 34개 점포는 후임에게 승계됨',
      statusTime: '09/15',
      items: [],
      dimmed: true,
      highlight: false,
    };
  }

  if (isHqRoom) {
    return {
      id: 'sv',
      ownerId: 'sv',
      ownerLabel: '한태민 슈퍼바이저 · 34개점 담당',
      ownerSub: 'Cowork App · 내부 협업방',
      badge: 'company',
      badgeLabel: 'Cowork App',
      companyFrame: true,
      companyRibbonLabel: '본사 협업방',
      headerTitle: '가맹기획팀 · 시설팀',
      headerCount: '내부',
      screen: 'cowork-app',
      appCaption: '내부 협업방 · 점주에게 노출되지 않음',
      appBadge: 'Cowork App',
      appContext: {
        initial: '本',
        title: '본사 가맹기획팀 · 시설팀',
        sub: '내부 협업 채널 — 점주 대화와 분리',
        chips: ['이슈 접수', '시설 A/S 배정'],
        tag: '내부',
      },
      statusTime: '09:35',
      items: [
        { id: 'date', kind: 'date', text: '본사–현장 협업방' },
        {
          id: 'e1',
          kind: 'message',
          senderId: 'sv',
          text: '하남미사점(개점 3주차) 제빙기 반복 정지입니다. 에러코드 사진 첨부드립니다. 아이스 매출 비중이 커서 당일 조치 요청드립니다',
          time: '08:55',
        },
        {
          id: 'e2',
          kind: 'message',
          senderId: 'hq',
          text: '시설팀 확인했습니다. 오늘 15:00 A/S 배정하고, 인근 하남풍산점에 아이스 지원 요청 걸어두겠습니다',
          time: '09:30',
          isNew: true,
        },
        { id: 'e3', kind: 'joined', text: '✓ 이슈 FR-26090801 등록 · 시설팀 배정 · SLA 당일 조치', isNew: true },
      ],
      highlight: true,
    };
  }

  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 8일 (월)' }];
  if (step === 0) {
    items.push({ id: 'idle', kind: 'joined', text: '📋 오늘 순회 예정 4개점 · 미해결 이슈 1건' });
  }
  if (step >= 1) {
    items.push(
      {
        id: 's1',
        kind: 'message',
        senderId: 'owner2',
        text: '개점 3주차인데 제빙기가 계속 멈춥니다. 오늘만 두 번이라 아이스 음료를 못 내고 있어요',
        time: '08:40',
        isNew: step === 1,
      },
      { id: 's1n', kind: 'joined', text: '⏱ 신규 문의 즉시 알림 — 담당 34개점 어디서 와도 놓치지 않음', isNew: step === 1 },
    );
  }
  if (step >= 3) {
    items.push({
      id: 's3',
      kind: 'joined',
      text: '✓ 이슈 FR-26090801 · 시설팀 배정 완료 → 점주 안내 발송 · 09:35',
      isNew: step === 3,
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
    headerTitle: step === 0 ? '오늘 업무' : '하남미사점',
    screen: 'cowork-app',
    appCaption: '현장 순회 중 · 담당 점포 34개',
    appBadge: 'Cowork App',
    appContext:
      step === 0
        ? { initial: '34', title: '담당 점포 34개', sub: '수도권 2권역', chips: ['순회 예정 4'], tag: 'SV' }
        : {
            initial: '미',
            title: '하남미사점 · 개점 3주차',
            sub: '점주 오세훈 · 담당 한태민',
            chips: ['신규 개점', '아이스 매출 42%', step >= 3 ? '이슈 처리중' : '이슈 신규'],
            tag: '담당',
          },
    statusTime: '09:35',
    items,
    highlight: step === 1 || step === 3,
  };
}

/** 이서준 후임 SV — step 4부터 34개점을 이력째 승계받는다 */
function successorPhone(step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: step >= 4 ? '9월 15일 (월)' : '9월 8일 (월)' }];
  if (step < 4) {
    items.push({ id: 'na', kind: 'joined', text: '— 배정된 권역 없음' });
  }
  if (step >= 4) {
    items.push(
      {
        id: 'take',
        kind: 'joined',
        text: '🔄 수도권 2권역 34개 점포 승계 — 한태민 → 이서준 (일괄)',
        isNew: step === 4,
      },
      {
        id: 'hist',
        kind: 'joined',
        text: '📇 점포 이력 승계 — 하남미사점: 개점 3주차 · 제빙기 이슈 FR-26090801 처리완료 · 교육 이수 · 설문 응답',
        isNew: step === 4,
      },
    );
  }
  if (step >= 5) {
    items.push(
      {
        id: 'msg1',
        kind: 'message',
        senderId: 'sv2',
        text: '점주님, 후임 이서준입니다. 제빙기 A/S 이후 재발 없는지 확인차 연락드렸습니다. 개점 3주차 체크리스트도 이번 주 함께 보겠습니다',
        time: '10:12',
        isNew: step === 5,
      },
      {
        id: 'msg2',
        kind: 'message',
        senderId: 'owner2',
        text: '인수인계 받으셨나 보네요. 처음부터 설명 안 해도 되니 편합니다',
        time: '10:15',
        isNew: step === 5,
      },
    );
  }

  return {
    id: 'sv2',
    ownerId: 'sv2',
    ownerLabel: step >= 4 ? '이서준 슈퍼바이저 · 34개점 승계' : '이서준 슈퍼바이저 · 배정 대기',
    ownerSub: 'Cowork App · 업무용',
    badge: 'company',
    badgeLabel: '슈퍼바이저',
    companyFrame: true,
    companyRibbonLabel: 'Cowork App',
    headerTitle: step >= 5 ? '하남미사점' : step >= 4 ? '승계 완료' : '대기',
    screen: 'cowork-app',
    appCaption: step >= 4 ? '현장 순회 중 · 담당 점포 34개' : '권역 배정 대기',
    appBadge: 'Cowork App',
    appContext:
      step >= 5
        ? {
            initial: '미',
            title: '하남미사점 · 개점 3주차',
            sub: '전임 한태민 · 이력 승계 완료',
            chips: ['제빙기 이슈 처리완료', '교육 이수', '아이스 매출 42%'],
            tag: '승계',
          }
        : step >= 4
          ? {
              initial: '34',
              title: '수도권 2권역 34개점 승계',
              sub: '전임 한태민 · 이력·이슈·약속 그대로',
              chips: ['미해결 이슈 2', '개점 3개월 미만 5개점'],
              tag: '승계',
            }
          : undefined,
    statusTime: step >= 4 ? '10:15' : '09:35',
    items,
    dimmed: step < 4,
    highlight: step === 4 || step === 5,
  };
}

function arenaAt(step: Step) {
  return {
    layout: 'phones-only' as const,
    phonesLabel:
      step === 2
        ? '📱 점주 채널 · 슈퍼바이저는 본사 협업방에서 이슈 접수 (점주에게 보이지 않음)'
        : step >= 4
          ? '📱 슈퍼바이저 교체 · 담당 34개 점포가 이력째 후임에게 넘어간다'
          : '📱 점주 현장 이슈 ↔ 슈퍼바이저 Cowork App',
    phonesBadge: step >= 4 ? '인수인계' : '현장 이슈',
    actors: FRANCHISE_ACTORS,
    phones: [ownerPhone(step), svPhone(step), successorPhone(step)],
    moreSlot: {
      title: '슈퍼바이저 교체는 상시적이다',
      sub: '개인폰 시절: 후임은 34개 점포를 처음부터 다시 파악 · 점주는 같은 설명을 반복 [예시]',
    },
    ...(step >= 5
      ? { banner: '사람이 바뀌어도 점포는 이어진다 — "처음부터 설명 안 해도 되니 편합니다"' }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '현장 이슈는 본사까지 한 경로로, 슈퍼바이저가 바뀌어도 점포 이력은 그대로.',
  pain: '개인폰 1:N의 한계: 이슈가 구두로 흐르고 · SV 교체 시 34개점 관계가 초기화됨',
  roi: '이슈 당일 조치 · SV 교체 시 34개점 일괄 승계, 점주 재설명 0 [예시]',
};

export const chapter03IssueHandover: Chapter = {
  id: 3,
  act: 3,
  title: '현장 이슈와 인수인계 — 사람이 바뀌어도 점포는 이어진다',
  subtitle: '운영 안정화 · 무대: 점포 채널 + 슈퍼바이저 Cowork App + 본사 협업방',
  narration:
    '가맹본부에서 슈퍼바이저 교체는 상시적입니다. 그리고 그때마다 담당하던 30~40개 점포의 관계가 초기화됩니다. 후임은 점포 사정을 처음부터 파악하고, 점주는 같은 설명을 다시 합니다. 공식 채널에서는 이슈 이력·교육 이수·약속이 점포에 붙어 있으므로 사람만 갈립니다. "점포가 슈퍼바이저에게 묶여 있는가, 본사에 묶여 있는가."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '왼쪽은 개점 3주차 점포, 가운데는 담당 슈퍼바이저입니다. 오른쪽 폰은 아직 비어 있습니다 — 뒤에서 등장합니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: 'STATE 1 — 평상시 운영',
        meta: '신 3 · 현장 이슈',
        situation: '슈퍼바이저가 오늘 순회 4개점을 앞두고 있다. 담당 34개점 어디서 무슨 일이 생겨도 알림은 한 곳으로 온다.',
        interact: '다음 → 현장 이슈 발생',
        feel: ['신 0에서는 이 알림 자체가 없었다'],
        connect: ['→ 제빙기 정지'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: 'STATE 2 — 매출에 직결되는 이슈',
        meta: '신 3',
        situation:
          '개점 3주차 점포의 제빙기가 반복 정지한다. 아이스 매출 비중이 42%라 그날 매출이 걸린 문제다. 사진과 함께 즉시 슈퍼바이저에게 도달한다.',
        interact: '다음 → 본사 에스컬레이션',
        feel: ['신 0이었다면 안 읽음 14건 속에 묻혔다'],
        connect: ['→ 내부 협업방'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(2),
      memo: {
        title: 'STATE 3 — 본사 협업방 에스컬레이션',
        meta: '신 3 · 내부 협업',
        situation:
          '슈퍼바이저가 같은 앱 안의 본사 협업방에서 시설팀에 접수한다. 점주 대화방과 분리된 내부 채널이라 협의 과정은 점주에게 보이지 않는다.',
        interact: '다음 → 조치 회신',
        feel: ['현장 → 본사 경로가 구두가 아니라 기록으로'],
        connect: ['→ 당일 A/S 배정'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(3),
      memo: {
        title: '조치 회신 · 이슈 번호로 남는다',
        meta: '신 3',
        situation:
          '당일 A/S가 배정되고 인근 점포 지원까지 붙는다. 이슈 FR-26090801로 등록되어 처리 이력이 점포에 남는다.',
        interact: '다음 → 슈퍼바이저 교체',
        feel: ['구두 약속이 아니라 접수번호로'],
        connect: ['→ 한 주 뒤, 담당이 바뀐다'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 4 — 슈퍼바이저 교체, 34개점 일괄 승계',
        meta: '신 3 · 핵심',
        situation:
          '한태민 슈퍼바이저가 퇴사하고 계정이 비활성된다. 담당 34개 점포가 후임 이서준에게 통째로 승계되고, 점포별 이슈·교육·개점 시점까지 함께 넘어간다.',
        interact: '다음 → 후임의 첫 응대',
        feel: ['개인폰이었다면 여기서 34개점이 백지가 된다'],
        connect: ['→ 이력을 아는 후임'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgArena: arenaAt(5),
      memo: {
        title: 'STATE 5 — 재설명 없는 인수인계',
        meta: '신 3 · ROI',
        situation:
          '후임이 제빙기 이슈 재발 여부를 먼저 확인하고 개점 3주차 체크리스트를 챙긴다. 점주는 "처음부터 설명 안 해도 되니 편하다"고 답한다.',
        interact: '다음 → (신 4 본사 대시보드로)',
        feel: ['"점포가 사람이 아니라 본사에 묶여 있습니다"'],
        connect: ['→ 신 4: 2,500개점을 한 화면으로'],
      },
    },
  ],
  onComplete: { nextChapter: 4 },
};
