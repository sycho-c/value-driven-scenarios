import type {
  Chapter,
  MfgArenaState,
  MfgKakaoItem,
  MfgPhoneDef,
  MfgValueStripDef,
  MfgWorkspaceDef,
  MfgWsMessage,
} from '../../_types';
import { ADMIN_LABEL, FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 3. 이슈·인수인계 — 담당자 상향, 관리자 배정과 승계 승인.
 * 담당자가 처리할 수 없는 이슈는 본부 협업방으로 상향되고, 관리자가 부서와 기한을 정한다.
 * 점포 방과 본부 협업방은 분리돼 내부 협의가 점주에게 보이지 않는다.
 * 담당자가 바뀌면 관리자가 후임을 지정해 34개 점포의 방과 이력을 일괄 승계한다.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const ISSUE_NO = 'FR-26090801';

interface Flags {
  reported: boolean;
  escalated: boolean;
  assigned: boolean;
  handedOver: boolean;
}

/** 두 폰이 같은 순간을 보여준다 — 액션 전후로 시계가 함께 움직인다 */
function clock(f: Flags, step: Step): string {
  switch (step) {
    case 0:
      return f.reported ? '08:41' : '08:39';
    case 1:
      return f.escalated ? '08:55' : '08:52';
    case 2:
      return f.assigned ? '09:30' : '08:55';
    case 3:
      return '09:35';
    case 4:
      return '09:05';
    case 5:
      return '10:15';
  }
}

const ISSUE_TEXT = '개점 3주차인데 제빙기가 계속 멈춥니다. 오늘만 두 번이라 아이스 음료를 못 내고 있어요';
const REPLY_TEXT = '오늘 15:00 시설팀 A/S 배정됐습니다. 그때까지 아이스 메뉴는 인근 하남풍산점 지원으로 커버하겠습니다';
const FOLLOW_TEXT = `점주님, 후임 이서준입니다. 제빙기 A/S(${ISSUE_NO}) 이후 재발 없는지 확인차 연락드렸습니다. 개점 4주차 체크리스트도 이번 주 함께 보겠습니다`;

function ownerPhone(f: Flags, step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 8일 (화)' }];
  if (f.reported) {
    items.push(
      { id: 'i1', kind: 'message', senderId: 'owner2', text: ISSUE_TEXT, time: '08:40', isNew: step === 0 },
      { id: 'i1f', kind: 'file', senderId: 'owner2', text: '제빙기_에러코드_사진.jpg', time: '08:41', isNew: step === 0 },
    );
  }
  if (step >= 1) {
    items.push({ id: 'i2', kind: 'message', senderId: 'sv', text: '확인했습니다. 본부에 바로 올리겠습니다', time: '08:52', isNew: step === 1 });
  }
  if (step >= 3) {
    items.push(
      { id: 'i3', kind: 'message', senderId: 'sv', text: REPLY_TEXT, time: '09:35', isNew: step === 3 },
      { id: 'i3c', kind: 'joined', text: `🧾 접수번호 ${ISSUE_NO} · 시설팀 · 오늘 15:00 조치`, isNew: step === 3 },
    );
  }
  if (f.handedOver) {
    items.push(
      { id: 'h-date', kind: 'date', text: '9월 15일 (화)' },
      { id: 'h1', kind: 'joined', text: '담당자 변경 — 한태민 → 이서준. 점포 방과 상담 이력은 그대로 유지됩니다', at: '09:06', isNew: step === 4 },
    );
  }
  if (step >= 5) {
    items.push(
      { id: 'h2', kind: 'message', senderId: 'sv2', text: FOLLOW_TEXT, time: '10:12', isNew: true },
      { id: 'h3', kind: 'message', senderId: 'owner2', text: '인수인계 받으셨나 보네요. 처음부터 설명 안 해도 되니 편합니다', time: '10:15', isNew: true },
    );
  }
  return {
    id: 'owner',
    ownerId: 'owner2',
    ownerLabel: '오세훈 점주 · 하남미사점',
    ownerSub: '공식 채널 (웹) · 점포 방',
    badge: 'channel',
    badgeLabel: '점포 채널',
    headerTitle: '하남미사점',
    headerCount: '2',
    channelTheme: true,
    statusTime: clock(f, step),
    items,
    highlight: step === 0 || step === 3 || step === 5,
  };
}

/** 전임 한태민 — 이슈 카드와 상향 */
function svPhone(f: Flags, step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 8일 (화)' }];
  if (f.reported) {
    items.push(
      { id: 's1', kind: 'message', senderId: 'owner2', text: ISSUE_TEXT, time: '08:40', isNew: step === 0 },
      { id: 's1f', kind: 'file', senderId: 'owner2', text: '제빙기_에러코드_사진.jpg', time: '08:41', isNew: step === 0 },
      { id: 's1n', kind: 'joined', text: '⏱ 신규 문의 알림 — 하남미사점 · 매출 영향', at: '08:41', isNew: step === 0 },
    );
  }
  if (step >= 1) {
    items.push({ id: 's2', kind: 'message', senderId: 'sv', text: '확인했습니다. 본부에 바로 올리겠습니다', time: '08:52', isNew: step === 1 });
  }
  if (f.escalated) {
    items.push({ id: 's2e', kind: 'joined', text: '↗ 본부 협업방으로 상향 · 08:55', isNew: step === 1 });
  }
  if (f.assigned) {
    items.push({
      id: 's3',
      kind: 'joined',
      text: `📥 관리자 회신 — ${ISSUE_NO} · 시설팀 · 오늘 15:00 · 하남풍산점 지원`,
      isNew: step === 2,
    });
  }
  if (step >= 3) {
    items.push({ id: 's4', kind: 'message', senderId: 'sv', text: REPLY_TEXT, time: '09:35', isNew: step === 3 });
  }
  return {
    id: 'sv',
    ownerId: 'sv',
    ownerLabel: '한태민 담당자 · 수도권 2권역',
    ownerSub: 'Cowork App · 업무용',
    badge: 'company',
    badgeLabel: '담당자',
    companyFrame: true,
    companyRibbonLabel: 'Cowork App',
    headerTitle: '하남미사점 · 이슈',
    screen: 'cowork-app',
    appCaption: '담당 34개 점포',
    appBadge: 'Cowork App',
    appContext: {
      initial: '!',
      title: '이슈 카드 · 제빙기 반복 정지',
      sub: '하남미사점 · 개점 3주차 · 아이스 매출 42%',
      chips: f.assigned ? [ISSUE_NO, '시설팀 · 당일'] : f.escalated ? ['본부 상향됨'] : ['담당자 처리 불가'],
      tag: f.assigned ? '배정' : f.escalated ? '상향' : '신규',
    },
    statusTime: clock(f, step),
    items,
    highlight: step === 0 || step === 1 || step === 2,
  };
}

/** 전임 계정 비활성 */
function svGonePhone(f: Flags, step: Step): MfgPhoneDef {
  return {
    id: 'sv',
    ownerId: 'sv',
    ownerLabel: '한태민 담당자 · 퇴사',
    ownerSub: 'Cowork App · 계정 비활성',
    badge: 'company',
    badgeLabel: '비활성',
    headerTitle: '오프라인',
    screen: 'ios-home',
    iosHint: '🔒 계정 비활성 — 관리자가 후임을 지정하면 34개 점포가 승계됩니다',
    statusTime: clock(f, step),
    items: [],
    dimmed: true,
  };
}

/** 후임 이서준 — 승계된 점포 목록과 이력 카드 */
function successorPhone(f: Flags, step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [
    // 승계된 점포 방의 이전 대화 — 후임도 전임의 대화를 그대로 본다
    { id: 'old-date', kind: 'date', text: '9월 8일 (화) · 전임 대화' },
    { id: 'o1', kind: 'message', senderId: 'owner2', text: ISSUE_TEXT, time: '08:40' },
    { id: 'o1f', kind: 'file', senderId: 'owner2', text: '제빙기_에러코드_사진.jpg', time: '08:41' },
    { id: 'o2', kind: 'message', senderId: 'sv', text: '확인했습니다. 본부에 바로 올리겠습니다', time: '08:52' },
    { id: 'o3', kind: 'message', senderId: 'sv', text: REPLY_TEXT, time: '09:35' },
    { id: 'date', kind: 'date', text: '9월 15일 (화)' },
    { id: 'take', kind: 'joined', text: '🔄 관리자 승계 — 수도권 2권역 34개 점포 · 점포 방 34개', at: '09:05', isNew: step === 4 },
    {
      id: 'hist',
      kind: 'joined',
      text: `📇 하남미사점 이력 — 개점 4주차 · 제빙기 ${ISSUE_NO} 처리완료 · 교육 이수 · 설문 응답`,
      at: '09:05',
      isNew: step === 4,
    },
  ];
  if (step >= 5) {
    items.push(
      { id: 'm1', kind: 'message', senderId: 'sv2', text: FOLLOW_TEXT, time: '10:12', isNew: true },
      { id: 'm2', kind: 'message', senderId: 'owner2', text: '인수인계 받으셨나 보네요. 처음부터 설명 안 해도 되니 편합니다', time: '10:15', isNew: true },
    );
  }
  return {
    id: 'sv2',
    ownerId: 'sv2',
    ownerLabel: '이서준 담당자 · 34개 점포 승계',
    ownerSub: 'Cowork App · 업무용',
    badge: 'company',
    badgeLabel: '후임',
    companyFrame: true,
    companyRibbonLabel: 'Cowork App',
    headerTitle: step >= 5 ? '하남미사점' : '승계 점포',
    screen: 'cowork-app',
    appCaption: '담당 34개 점포 · 이력 승계',
    appBadge: 'Cowork App',
    appContext:
      step >= 5
        ? {
            initial: '미',
            title: '하남미사점 · 개점 4주차',
            sub: '전임 한태민 · 이력 승계 완료',
            chips: [`${ISSUE_NO} 처리완료`, '교육 이수', '설문 응답'],
            tag: '승계',
          }
        : {
            initial: '34',
            title: '수도권 2권역 34개 점포',
            sub: '승인 서윤아 관리자 · 전임 한태민',
            chips: ['진행 중 이슈 2', '개점 3개월 미만 5'],
            tag: '승계',
          },
    statusTime: clock(f, step),
    items,
    highlight: true,
  };
}

function consoleMessages(f: Flags, step: Step): MfgWsMessage[] {
  const msgs: MfgWsMessage[] = [{ id: 'sep', kind: 'system', text: '🔒 본부 협업방 — 점포 방과 분리된 내부 채널 · 점주에게 노출되지 않음' }];
  if (f.escalated) {
    msgs.push({
      id: 'e1',
      kind: 'in',
      senderId: 'sv',
      srcLabel: '담당자 상향',
      text: '하남미사점 제빙기 반복 정지입니다. 아이스 판매가 중단돼 당일 조치 요청드립니다.',
      card: {
        title: '📋 현장 이슈 상향',
        rows: [
          ['점포', '하남미사점 · 개점 3주차'],
          ['증상', '제빙기 정지 E-21 · 오늘 2회'],
          ['매출 영향', '아이스 음료 판매 중단 (매출 비중 42%)'],
        ],
      },
      file: { icon: '🖼', name: '제빙기_에러코드_사진.jpg', sub: '점주 첨부 · 08:41', state: 'plain' },
      time: '08:55',
      isNew: step === 1,
    });
  } else {
    msgs.push({ id: 'wait', kind: 'system', text: '상향된 이슈 없음 — 담당자가 처리할 수 없는 건만 이곳에 도착' });
  }
  if (step >= 2) {
    msgs.push({
      id: 'e2',
      kind: 'out',
      senderId: 'hq',
      srcLabel: '관리자 배정',
      text: f.assigned
        ? '시설팀 오늘 15:00 A/S로 배정합니다. 그때까지 하남풍산점에 아이스 지원을 요청해 두었습니다.'
        : '배정 부서와 조치 기한을 고릅니다.',
      card: {
        title: f.assigned ? `🧾 접수 ${ISSUE_NO}` : '🧾 이슈 배정',
        rows: f.assigned
          ? [
              ['임시 대응', '하남풍산점 아이스 지원'],
              ['회신', '담당자 앱 · 점포 이력 기록'],
            ]
          : [['접수번호', '배정 시 생성']],
        choices: [
          { k: '부서', opts: ['시설팀', '물류팀', '품질팀'], pick: f.assigned ? '시설팀' : undefined },
          { k: '기한', opts: ['당일', '익일', '3일'], pick: f.assigned ? '당일' : undefined },
        ],
      },
      time: '09:30',
      metaText: f.assigned ? '담당자 회신' : undefined,
      isNew: step === 2 && f.assigned,
    });
  }
  if (step >= 3) {
    msgs.push({ id: 'e4', kind: 'system', text: '✓ 09:35 담당자가 점포 방에 조치 일정 회신 — 협업방 내용은 점주에게 보이지 않음', isNew: step === 3 });
  }
  if (step >= 4) {
    msgs.push(
      { id: 'h-sep', kind: 'system', text: '— 9월 15일 (화) · 담당자 관리 —' },
      { id: 'h1', kind: 'system-hi', text: '🔒 09:00 한태민 담당자 퇴사 — 계정 비활성 · 담당 34개 점포 후임 지정 필요', at: '09:00', isNew: step === 4 && !f.handedOver },
      {
        id: 'h2',
        kind: 'out',
        senderId: 'hq',
        srcLabel: '승계 처리',
        text: f.handedOver ? '수도권 2권역 34개 점포를 이서준 담당자에게 승계했습니다.' : '후임을 고르고 승계를 실행합니다.',
        card: {
          title: f.handedOver ? '🔄 일괄 승계 — 한태민 → 이서준' : '🔄 담당자 승계',
          rows: f.handedOver
            ? [
                ['대상', '34개 점포 · 점포 방 34개'],
                ['승계 이력', '개점 주차 · 이슈 · 교육 · 설문'],
                ['이력 손실', '0'],
              ]
            : [['전임', '한태민 · 34개 점포 · 진행 중 이슈 2']],
          choices: [{ k: '후임', opts: ['이서준', '박도윤', '김나래'], pick: f.handedOver ? '이서준' : undefined }],
        },
        time: '09:05',
        metaText: f.handedOver ? '후임 앱 전달' : undefined,
        isNew: f.handedOver && step === 4,
      },
    );
  }
  if (step >= 5) {
    msgs.push({ id: 'h3', kind: 'system-hi', text: `✓ 10:12 후임 첫 응대 — ${ISSUE_NO} 이력 기반 후속 확인 · 점주 재설명 0`, isNew: true });
  }
  return msgs;
}

function workspace(f: Flags, step: Step): MfgWorkspaceDef {
  const handover = step >= 4;
  return {
    role: 'admin',
    hideRoleTabs: true,
    label: ADMIN_LABEL,
    headerTitle: handover ? '담당자 관리 · 수도권 2권역' : '본부 협업방 · 하남미사점 제빙기',
    headerSub: handover ? '후임 지정과 승계 승인' : '담당자가 상향한 이슈만 도착',
    dashLabel: '이슈 · 담당자',
    dashSubLabel: '권역별 · 담당자별',
    roomsLabel: '본부 협업방',
    rooms: [
      {
        id: 'issue',
        name: '하남미사점 제빙기',
        preview: f.assigned ? `${ISSUE_NO} · 시설팀` : f.escalated ? '상향 도착' : '—',
        color: '#27AE60',
        active: !handover,
      },
      ...(handover
        ? [{ id: 'handover', name: '담당자 관리', preview: f.handedOver ? '34개 점포 승계' : '후임 지정 대기', color: '#2E86AB', active: true }]
        : []),
    ],
    sideNote: '점포 방과 분리된 내부 채널',
    messages: consoleMessages(f, step),
  };
}

function arenaOf(f: Flags, step: Step): Omit<MfgArenaState, 'action' | 'after'> {
  const center = step < 4 ? svPhone(f, step) : f.handedOver ? successorPhone(f, step) : svGonePhone(f, step);
  return {
    layout: 'split',
    phonesLabel: step >= 4 ? '📱 담당자 교체 · 점포 방과 이력은 그대로' : '📱 점주 점포 방 ↔ 담당자 Cowork App',
    phonesBadge: step >= 4 ? '인수인계' : '현장 이슈',
    actors: FRANCHISE_ACTORS,
    phones: [ownerPhone(f, step), center],
    moreSlot: {
      title: '담당자 교체는 상시적이다',
      sub: '개인폰이었다면 후임은 34개 점포를 처음부터 다시 파악하고, 점주는 같은 설명을 반복한다',
    },
    workspace: workspace(f, step),
    ...(step >= 5 ? { banner: '점포는 담당자 개인이 아니라 본부에 연결된다 — "처음부터 설명 안 해도 되니 편합니다"' } : {}),
  };
}

const F0: Flags = { reported: false, escalated: false, assigned: false, handedOver: false };
const F1: Flags = { ...F0, reported: true };
const F2: Flags = { ...F1, escalated: true };
const F3: Flags = { ...F2, assigned: true };
const F4: Flags = { ...F3, handedOver: true };

function stateAt(step: Step): MfgArenaState {
  switch (step) {
    case 0:
      return {
        ...arenaOf(F0, 0),
        action: { label: '문의 전송', at: 'phone', phoneId: 'owner' },
        after: arenaOf(F1, 0),
      };
    case 1:
      return {
        ...arenaOf(F1, 1),
        action: { label: '본부 상향', at: 'phone', phoneId: 'sv', doneLabel: '✓ 상향 도착' },
        after: arenaOf(F2, 1),
      };
    case 2:
      return {
        ...arenaOf(F2, 2),
        action: { label: '배정', at: 'workspace', doneLabel: `✓ ${ISSUE_NO}` },
        after: arenaOf(F3, 2),
      };
    case 3:
      return arenaOf(F3, 3);
    case 4:
      return {
        ...arenaOf(F3, 4),
        action: { label: '승계 실행', at: 'workspace', doneLabel: '✓ 34개 점포 승계' },
        after: arenaOf(F4, 4),
      };
    case 5:
      return arenaOf(F4, 5);
  }
}

const VALUE: MfgValueStripDef = {
  sell: '이슈는 관리자 배정으로, 담당자 교체는 관리자 승인으로 — 점주가 같은 설명을 반복하지 않는 구조',
  pain: '이슈가 담당자 개인 판단에 머물러 본부 조치가 늦고, 담당자 교체마다 30~40개 점포의 관계 초기화 [확정]',
  roi: '이슈 접수 후 50분 만에 조치 부서 배정 (08:40 → 09:30) · 승계 시 34개 점포 이력 손실 0 [예시]',
};

export const chapter03IssueHandover: Chapter = {
  id: 3,
  act: 3,
  title: '이슈·인수인계 — 담당자 상향, 관리자 배정과 승계 승인',
  subtitle: '운영 중 (현장 이슈 발생 및 담당자 교체) · 무대: 점주 폰 + 담당자 Cowork App + 관리자 콘솔(본부 협업방)',
  narration:
    '담당자가 해결할 수 없는 이슈는 버튼 하나로 본부 협업방에 상향됩니다. 관리자가 부서와 기한을 정하면 접수번호가 생기고, 점주는 그 번호로 진행을 확인합니다. 협업방의 협의 내용은 점포 방에 노출되지 않습니다. 담당자가 바뀌면 관리자가 후임을 지정하고, 34개 점포의 방과 이력이 그대로 넘어갑니다. "점포는 담당자 개인이 아니라 본부에 연결됩니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 8일 (화) 08:40',
        jump: '1주 뒤',
        before: '지난 신: 공지는 관리자가 직접. 이번 신: 담당자가 혼자 해결할 수 없는 현장 이슈 — 하남미사점 제빙기가 멈췄습니다.',
        after: '에러코드 사진과 함께 온 문의가 담당자 앱에 바로 뜹니다.',
      },
      pauseAfterMs: 5000,
      guide: '왼쪽 점주 폰에서 문의를 보내면 가운데 담당자 앱에 알림이 뜹니다. 오른쪽 관리자 콘솔에는 아직 아무것도 오지 않습니다.',
      mfgArena: stateAt(0),
      memo: {
        title: 'STATE 1 — 현장 이슈 발생',
        meta: '신 3 · 이슈·인수인계',
        situation: '하남미사점 제빙기가 반복 정지해 아이스 음료 판매가 멈췄다. 점주가 에러코드 사진과 함께 문의를 보낸다.',
        interact: '점주 폰 아래 "문의 전송" 버튼',
        feel: ['매출이 멈춘 이슈가 34개 방 속에 묻히지 않는다'],
        connect: ['→ 담당자 상향'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 8일 (화) 08:52',
        before: '담당자가 이슈를 본부 협업방으로 올립니다. 협업방은 점주에게 보이지 않는 내부 방입니다.',
        after: '개점 주차 · 에러코드 · 매출 영향이 담긴 요청이 관리자 콘솔에 도착했습니다.',
      },
      pauseAfterMs: 5000,
      mfgArena: stateAt(1),
      memo: {
        title: 'STATE 2 — 담당자 상향',
        meta: '신 3',
        situation: '담당자가 점포 방이 아닌 본부 협업방으로 이슈를 올린다. 개점 주차·에러코드·매출 영향이 한 요청에 담겨 관리자 콘솔에 도착한다.',
        interact: '담당자 앱 아래 "본부 상향" 버튼',
        feel: ['"버튼 하나로 본부에 상향됩니다"'],
        connect: ['→ 관리자 배정'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 8일 (화) 09:30',
        before: '관리자가 처리할 부서와 기한을 고릅니다.',
        after: '시설팀 · 오늘 15:00 — 접수번호 FR-26090801이 생기고 담당자에게 회신됐습니다. 접수부터 50분.',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(2),
      memo: {
        title: 'STATE 3 — 관리자 배정',
        meta: '신 3 · 관리자 결정',
        situation: `관리자가 배정 부서(시설팀)와 조치 기한(당일)을 고르면 접수번호 ${ISSUE_NO}가 생기고 담당자 앱으로 회신된다.`,
        interact: '관리자 콘솔의 "배정" 버튼',
        feel: ['구두 약속이 아니라 접수번호 · 부서 · 기한'],
        connect: ['→ 점주에게는 결과만'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 8일 (화) 09:35',
        before: '담당자가 점포 방에 조치 일정을 알립니다. 협업방에서 오간 내용은 점주에게 보이지 않습니다.',
      },
      pauseAfterMs: 5000,
      mfgArena: stateAt(3),
      memo: {
        title: 'STATE 4 — 점주 회신',
        meta: '신 3',
        situation: '담당자가 점포 방에 조치 일정과 인근 점포 지원 방안을 회신한다. 본부 협업방의 협의 내용은 점주에게 보이지 않는다.',
        interact: '다음 → 일주일 뒤, 담당자 교체',
        feel: ['접수 08:40 → 배정 09:30, 50분'],
        connect: ['→ 담당자가 바뀐다'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 15일 (화) 09:00',
        jump: '1주 뒤',
        before: '담당자 한태민이 퇴사해 계정이 꺼졌습니다. 관리자가 후임을 정해야 합니다.',
        after: '후임 이서준에게 34개 점포가 방 · 대화 · 이력째 넘어갔습니다. 점주에게는 담당자 변경 안내만 갑니다.',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(4),
      memo: {
        title: 'STATE 5 — 관리자 승계 처리',
        meta: '신 3 · 관리자 결정',
        situation:
          '전임 한태민이 퇴사해 계정이 비활성됐다. 관리자가 후임 이서준을 고르고 승계를 실행하면 34개 점포 목록과 이력 카드가 후임 앱에 도착한다.',
        interact: '관리자 콘솔의 "승계 실행" 버튼',
        feel: ['"개인 폰이었다면 여기서 34개 점포가 백지가 됩니다"'],
        connect: ['→ 재설명 없는 인수인계'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 15일 (화) 10:12',
        before: '후임이 첫 연락을 합니다 — 지난주 제빙기 이슈를 이미 알고 있습니다.',
      },
      pauseAfterMs: 6000,
      mfgArena: stateAt(5),
      memo: {
        title: 'STATE 6 — 재설명 없는 인수인계',
        meta: '신 3 · ROI',
        situation: '후임이 이전 이슈 처리 내역을 근거로 후속 확인을 먼저 건넨다. 점주는 사정을 다시 설명하지 않는다.',
        interact: '다음 → (신 4 가맹본부 대시보드로)',
        feel: ['"점포는 담당자 개인이 아니라 본부에 연결됩니다"'],
        connect: ['→ 신 4: 관리자 판단을 담당자와 점주까지'],
      },
    },
  ],
  onComplete: { nextChapter: 4 },
};
