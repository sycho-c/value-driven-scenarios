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
 * 신 1. 채널 전환 — 관리자 설정, 담당자 초대, 점주 편입.
 * 관리자는 대화에 들어가지 않고 구조를 정한다(점포·담당자 배정, 단계형 응대 기준).
 * 담당자는 배정받은 34개 점포를 일괄 초대하고, 점주는 이용 방식을 바꾸지 않는다.
 * 카카오톡을 쓰지 않는 점주는 문자 링크로 같은 채널에 들어온다.
 */

type Step = 0 | 1 | 2 | 3 | 4;

/** 진행 플래그 — STATE 안 액션 전/후를 같은 빌더로 그린다 */
interface Flags {
  assigned: boolean;
  invited: boolean;
  webJoined: boolean;
  managerIn: boolean;
  ruleApplied: boolean;
}

/** 두 폰이 같은 순간을 보여준다 — 관리자 콘솔 기록 시각과 함께 움직인다 */
function clock(f: Flags, step: Step): string {
  switch (step) {
    case 0:
      return '08:30';
    case 1:
      return f.invited ? '09:13' : '09:05';
    case 2:
      return f.webJoined ? '09:22' : '09:15';
    case 3:
      return '10:05';
    case 4:
      return '10:20';
  }
}

function storeAItems(f: Flags, step: Step): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '8월 25일 (화)' }];
  if (f.invited) {
    items.push({
      id: 'invite',
      kind: 'invite',
      inviteVendor: '정미경',
      inviteChannel: '가맹본부 공식 채널',
      inviteTitle: '[가맹점 채널 안내]',
      inviteDesc:
        '강동천호점 정미경 점주님, 가맹본부 공식 채널입니다. 담당 한태민 담당자가 그대로 응대하며, 본부 공지도 이 채널로 도착합니다.',
      inviteNotes: ['점포 단위 방 — 매장 매니저도 함께 참여', '담당자가 바뀌어도 방과 이력 유지'],
      inviteBtn: '채널 추가하기 ▶',
      at: '09:12',
      isNew: step === 1,
    });
  }
  if (f.invited) {
    // 알림톡의 [채널 추가하기]를 누른 결과 — 강동천호점 입장이 이 STATE 안에서 보이게 한다
    items.push({ id: 'joined', kind: 'joined', text: '✓ 정미경 점주 채널 추가 — 강동천호점 점포 방 입장', at: '09:14', isNew: step === 1 });
  }
  if (f.managerIn) {
    items.push(
      { id: 'mgr-ask', kind: 'message', senderId: 'owner1', text: '매장 매니저 김지아도 이 방에 초대할게요', time: '10:00', isNew: step === 3 },
      { id: 'mgr-in', kind: 'joined', text: '👥 김지아 매니저 참여 — 점주 · 매니저 · 담당자 3인 점포 방', at: '10:01', isNew: step === 3 },
    );
  }
  return items;
}

function storeBItems(f: Flags, step: Step): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '8월 25일 (화)' }];
  if (!f.invited) return items;
  items.push({
    id: 'sms',
    kind: 'invite',
    inviteVendor: '오세훈',
    inviteChannel: '가맹본부 공식 채널',
    inviteTitle: '[문자 안내 · 하남미사점]',
    inviteDesc:
      '오세훈 점주님, 카카오톡 대신 문자로 안내드립니다. 아래 링크로 들어오시면 카카오톡 없이도 같은 채널에서 담당자·본부와 소통하실 수 있습니다.',
    inviteNotes: ['카카오톡 미사용 점주는 문자·웹 채널로 동일 참여', '공지·교육 자료도 같은 경로로 수신'],
    inviteBtn: '웹 채널로 입장 ▶',
    inviteTag: '문자(SMS)',
  });
  if (f.webJoined) {
    items.push({ id: 'joined2', kind: 'joined', text: '✓ 하남미사점 채널 입장 (웹) · 한태민 담당자 연결', at: '09:20', isNew: step === 2 });
  }
  return items;
}

function ownerPhone(f: Flags, step: Step, tab: 'a' | 'b'): MfgPhoneDef {
  const aJoined = step >= 2;
  return {
    id: 'owner',
    ownerId: 'owner1',
    ownerLabel: '점주 폰',
    ownerSub: '',
    badge: 'vendor',
    statusTime: clock(f, step),
    activeTab: tab,
    tabs: [
      {
        id: 'a',
        label: '강동천호점',
        phone: {
          ownerId: 'owner1',
          ownerLabel: '정미경 점주 · 강동천호점',
          ownerSub: aJoined ? '가맹본부 공식 채널 (카카오)' : '카카오톡 알림톡',
          badge: aJoined ? 'channel' : 'vendor',
          badgeLabel: aJoined ? '점포 채널' : '가맹점주',
          headerTitle: aJoined ? '강동천호점' : '알림',
          headerCount: f.managerIn ? '3' : aJoined ? '점포 방' : undefined,
          channelTheme: aJoined,
          screen: aJoined ? 'chat' : 'alert-list',
          items: storeAItems(f, step),
          highlight: step === 1 || step === 3,
        },
      },
      {
        id: 'b',
        label: '하남미사점',
        dot: f.invited && tab !== 'b',
        phone: {
          ownerId: 'owner2',
          ownerLabel: '오세훈 점주 · 하남미사점',
          ownerSub: f.webJoined ? '가맹본부 공식 채널 (웹)' : '문자 · 카카오톡 미사용',
          badge: f.webJoined ? 'channel' : 'vendor',
          badgeLabel: f.webJoined ? '점포 채널' : '가맹점주',
          headerTitle: f.webJoined ? '하남미사점' : '문자',
          headerCount: f.webJoined ? '점포 방' : undefined,
          channelTheme: f.webJoined,
          screen: f.webJoined ? 'chat' : 'alert-list',
          items: storeBItems(f, step),
          highlight: step === 2,
        },
      },
    ],
  };
}

function svPhone(f: Flags, step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '8월 25일 (화)' }];
  if (f.assigned) {
    items.push({ id: 'assign', kind: 'joined', text: '📥 관리자 배정 도착 — 수도권 2권역 34개 점포', isNew: step === 0 });
  }
  if (f.invited) {
    items.push({ id: 'send', kind: 'joined', text: '📨 34개 점포 채널 안내 발송 — 알림톡 29 · 문자 5', at: '09:10', isNew: step === 1 });
  }
  if (f.webJoined) {
    items.push({ id: 'all-in', kind: 'joined', text: '✓ 편입 34/34 — 카카오톡 미사용 5개 점포도 문자·웹으로', at: '09:21', isNew: step === 2 });
  }
  if (f.managerIn) {
    items.push({ id: 'rooms', kind: 'joined', text: '👥 강동천호점 점포 방 3인 — 점주 · 매니저 · 담당자', at: '10:02', isNew: step === 3 });
  }
  if (f.ruleApplied) {
    items.push({ id: 'rule', kind: 'joined', text: '⏱ 응대 기준 적용 — 1시간 미응답 시 나에게 재알림', isNew: true });
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
    headerTitle: '담당 점포',
    screen: 'cowork-app',
    appCaption: f.assigned ? '배정 점포 34개' : '배정 대기',
    appBadge: 'Cowork App',
    appContext: f.assigned
      ? {
          initial: '34',
          title: '수도권 2권역 34개 점포',
          sub: '배정 서윤아 관리자 · 카카오 29 · 문자 5',
          chips: f.webJoined ? ['편입 34/34'] : f.invited ? ['안내 발송 34'] : ['안내 전'],
          tag: '담당',
        }
      : undefined,
    statusTime: clock(f, step),
    items,
    highlight: step === 0 || step === 1,
  };
}

function consoleMessages(f: Flags, step: Step): MfgWsMessage[] {
  const msgs: MfgWsMessage[] = [
    { id: 'scope', kind: 'system', text: '전국 가맹점 약 2,500개 · 담당자 약 60명 [확정]' },
    {
      id: 'assign',
      kind: 'out',
      senderId: 'hq',
      srcLabel: '점포 · 담당자 배정',
      text: f.assigned ? '수도권 2권역 34개 점포를 한태민 담당자에게 배정했습니다.' : '권역을 고르고 담당자를 지정합니다.',
      card: {
        title: '🗺 권역 배정',
        rows: f.assigned ? [['배정 점포', '34개 (카카오 29 · 문자 5)']] : [['수도권 2권역', '34개 점포 · 담당자 미지정']],
        choices: [
          { k: '권역', opts: ['수도권 1권역', '수도권 2권역', '충청권'], pick: '수도권 2권역' },
          { k: '담당자', opts: ['한태민', '이서준', '박도윤'], pick: f.assigned ? '한태민' : undefined },
        ],
      },
      time: '08/25 08:30',
      metaText: f.assigned ? '담당자 앱 전달' : undefined,
      isNew: step === 0 && f.assigned,
    },
  ];
  if (f.invited) {
    msgs.push({ id: 'invited', kind: 'system', text: '📨 담당자 일괄 안내 34건 — 알림톡 29 · 문자 5', at: '09:13', isNew: step === 1 });
  }
  if (f.webJoined) {
    msgs.push({ id: 'joined', kind: 'system-hi', text: '✓ 편입 현황 34/34 — 카카오 29 · 웹 5 · 누락 0', at: '09:22', isNew: step === 2 });
  }
  if (f.managerIn) {
    // 관리자는 방을 만들거나 말하지 않는다 — 콘솔에는 조회 결과만 보인다
    msgs.push({
      id: 'room',
      kind: 'system-hi',
      text: '👁 조회 — 강동천호점 점포 방 참여자 3인(점주 정미경 · 매니저 김지아 · 담당자 한태민) · 관리자는 방에 들어가지 않음',
      at: '10:03',
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    msgs.push({
      id: 'rule',
      kind: 'out',
      senderId: 'hq',
      srcLabel: '응대 기준 설정',
      text: f.ruleApplied ? '단계형 응대 기준을 적용했습니다.' : '미응답 기준을 단계형으로 정합니다.',
      card: {
        title: f.ruleApplied ? '⏱ 응대 기준 — 적용됨' : '⏱ 응대 기준 — 적용 전',
        rows: [['신 0 사례', '하남미사점 1시간 35분 무응답']],
        choices: [
          { k: '1차 (담당자)', opts: ['30분', '1시간', '2시간'], pick: '1시간' },
          { k: '2차 (관리자)', opts: ['1시간', '2시간', '4시간'], pick: '2시간' },
        ],
      },
      time: '08/25 10:20',
      metaText: f.ruleApplied ? '전 권역 적용' : undefined,
      isNew: f.ruleApplied,
    });
    if (f.ruleApplied) {
      msgs.push({
        id: 'rule-hi',
        kind: 'system-hi',
        text: '✓ 1시간 미응답 → 담당자 재알림 · 2시간 미응답 → 관리자 알림 (관리자는 기준 초과 건만 받는다)',
        isNew: true,
      });
    }
  }
  return msgs;
}

function workspace(f: Flags, step: Step): MfgWorkspaceDef {
  return {
    role: 'admin',
    hideRoleTabs: true,
    label: ADMIN_LABEL,
    headerTitle: step >= 4 ? '응대 기준 설정' : step >= 3 ? '점포 방 · 권한' : '점포 · 담당자 배정',
    headerSub: '관리자는 대화에 참여하지 않고 구조와 기준을 정한다',
    dashLabel: '배정 현황',
    dashSubLabel: '권역별 · 담당자별',
    roomsLabel: '설정',
    rooms: [
      { id: 'assign', name: '점포 · 담당자 배정', preview: f.assigned ? '수도권 2권역 → 한태민' : '미지정', color: '#16172A', active: step <= 2 },
      { id: 'room', name: '점포 방 · 권한', preview: f.managerIn ? '3인 구성' : '—', color: '#7B5E9E', active: step === 3 },
      { id: 'rule', name: '응대 기준', preview: f.ruleApplied ? '1h · 2h 적용' : '미설정', color: '#A0522D', active: step === 4 },
    ],
    sideNote: '관리자는 점포 방 비참여 · 권한 범위 조회',
    messages: consoleMessages(f, step),
  };
}

function arenaOf(f: Flags, step: Step, tab: 'a' | 'b'): Omit<MfgArenaState, 'action' | 'after'> {
  return {
    layout: 'split',
    phonesLabel: '📱 점주 폰(카카오 · 문자) ↔ 담당자 Cowork App',
    phonesBadge: '공식 채널 전환',
    actors: FRANCHISE_ACTORS,
    phones: [ownerPhone(f, step, tab), svPhone(f, step)],
    moreSlot: {
      title: '외 32개 점포도 같은 절차로',
      sub: '관리자가 배정 → 담당자가 일괄 안내 → 점주는 채널 추가 또는 문자 링크만',
    },
    workspace: workspace(f, step),
    ...(f.ruleApplied
      ? { banner: '신 0: 하남미사점 1시간 35분 무응답 → 이제는 1시간 시점에 담당자 재알림, 2시간이 넘으면 관리자 알림' }
      : {}),
  };
}

const F0: Flags = { assigned: false, invited: false, webJoined: false, managerIn: false, ruleApplied: false };
const F1: Flags = { ...F0, assigned: true };
const F2: Flags = { ...F1, invited: true };
const F3: Flags = { ...F2, webJoined: true };
const F4: Flags = { ...F3, managerIn: true };
const F5: Flags = { ...F4, ruleApplied: true };

function stateAt(step: Step): MfgArenaState {
  switch (step) {
    case 0:
      return {
        ...arenaOf(F0, 0, 'a'),
        action: { label: '담당자 지정', at: 'workspace', doneLabel: '✓ 배정 완료' },
        after: arenaOf(F1, 0, 'a'),
      };
    case 1:
      return {
        ...arenaOf(F1, 1, 'a'),
        action: { label: '일괄 안내', at: 'phone', phoneId: 'sv' },
        after: arenaOf(F2, 1, 'a'),
      };
    case 2:
      return {
        ...arenaOf(F2, 2, 'b'),
        action: { label: '문자 링크 열기', at: 'phone', phoneId: 'owner', doneLabel: '✓ 편입 34/34' },
        after: arenaOf(F3, 2, 'b'),
      };
    case 3:
      return arenaOf(F4, 3, 'a');
    case 4:
      return {
        ...arenaOf(F4, 4, 'a'),
        action: { label: '기준 적용', at: 'workspace', doneLabel: '✓ 기준 적용' },
        after: arenaOf(F5, 4, 'a'),
      };
  }
}

const VALUE: MfgValueStripDef = {
  sell: '점주 전환 부담 없이, 관리자가 구조와 기준을 정하고 담당자가 그 기준 안에서 응대하는 체계',
  pain: '점포·담당자 배정이 담당자 개인 연락처에 묶여 교체 시 초기화 · 카카오톡 미사용 점포가 관리 사각지대로 잔존 [확정]',
  roi: '34개 점포 전량 편입(알림톡 29 · 문자 5) · 1시간 시점 담당자 재알림 · 관리자는 2시간 초과 건만 수신 [예시]',
};

export const chapter01ChannelSwitch: Chapter = {
  id: 1,
  act: 3,
  title: '채널 전환 — 관리자 설정, 담당자 초대, 점주 편입',
  subtitle: '채널 전환 시점 (공식 채널 개설) · 무대: 점주 폰(카카오·문자) + 담당자 Cowork App + 관리자 콘솔',
  narration:
    '관리자는 대화에 들어가지 않고 구조를 정합니다. 어느 점포를 누가 맡는지, 몇 시간 안에 응답해야 하는지를 관리자 콘솔에서 설정합니다. 담당자는 배정받은 점포를 일괄 초대하고, 카카오톡을 쓰지 않는 점주는 문자 링크로 같은 채널에 들어옵니다. 점포 방은 점주·매장 매니저·담당자 3인이고, 관리자는 방에 들어가지 않고 권한 범위 안에서 기록을 조회합니다. "관리자는 대화에 들어가지 않고, 기준을 정합니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 25일 (화) 08:30',
        jump: '1주 뒤 · 도입',
        before: '지난 신: 세 역할이 서로 보이지 않았습니다. 이번 신: 관리자가 먼저 구조를 정합니다 — 수도권 2권역 34개 점포를 누가 맡을지.',
        after: '배정이 담당자 앱에 바로 도착했습니다. 점포는 이제 담당자 개인 연락처가 아니라 본부 배정에 묶입니다.',
      },
      pauseAfterMs: 5500,
      guide:
        '오른쪽이 관리자 콘솔, 가운데가 담당자 Cowork App, 왼쪽이 점주 폰입니다. 보라색 버튼을 누르면 그 역할이 행동합니다(→ 키도 같습니다).',
      mfgArena: stateAt(0),
      memo: {
        title: 'STATE 1 — 관리자 점포·담당자 배정',
        meta: '신 1 · 채널 전환',
        situation: '관리자가 권역 목록에서 수도권 2권역 34개 점포를 고르고 담당자 한태민을 지정한다. 배정은 담당자 앱으로 바로 전달된다.',
        interact: '관리자 콘솔의 "담당자 지정" 버튼 (→ 키도 가능)',
        feel: ['점포가 담당자 개인이 아니라 본부 배정에 묶인다'],
        connect: ['→ 담당자 일괄 안내'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 25일 (화) 09:05',
        before: '배정받은 담당자가 34개 점포에 공식 채널 안내를 한 번에 보냅니다.',
        after: '카카오 점포 29곳은 알림톡, 카카오 미사용 5곳은 문자로 — 강동천호점 점주는 채널을 추가해 점포 방에 들어왔습니다.',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(1),
      memo: {
        title: 'STATE 2 — 담당자 일괄 안내',
        meta: '신 1',
        situation: '담당자 앱에 배정 점포 34개가 도착하고, 담당자가 공식 채널 안내를 일괄 발송한다. 강동천호점에는 알림톡이 온다.',
        interact: '담당자 앱 아래 "일괄 안내" 버튼',
        feel: ['알림톡 29 · 문자 5 — 경로는 점주에 맞춘다'],
        connect: ['→ 카카오톡을 쓰지 않는 점주'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 25일 (화) 09:15',
        before: '하남미사점 오세훈 점주는 카카오톡을 쓰지 않습니다. 안내가 문자로 왔습니다.',
        after: '문자 링크 하나로 같은 채널에 들어왔습니다 — 34개 점포 모두 편입, 누락 0.',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(2),
      memo: {
        title: 'STATE 3 — 카카오톡 미사용 점포 편입',
        meta: '신 1 · 실제 제약',
        situation: '하남미사점 점주는 카카오톡을 쓰지 않는다. 문자로 안내를 받고 링크로 웹 채널에 들어온다. 관리자 콘솔 편입 현황 34/34.',
        interact: '점주 폰(하남미사점 탭) 아래 "문자 링크 열기" 버튼',
        feel: ['"저희 점주님들 중엔 카톡 안 쓰시는 분도 계셔서요"'],
        connect: ['→ 점포 방 구성'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 25일 (화) 10:00',
        before: '강동천호점 점포 방에 매장 매니저가 합류합니다. 방은 점주 · 매니저 · 담당자 3인이고, 관리자는 들어가지 않고 기록만 조회합니다.',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(3),
      memo: {
        title: 'STATE 4 — 점포 방 3인 구성',
        meta: '신 1',
        situation: '점주·매장 매니저·담당자가 하나의 점포 방에 참여한다. 관리자 콘솔에는 "참여자 3인 · 관리자 조회 권한"만 표시된다.',
        interact: '다음 → 응대 기준',
        feel: ['관리자는 방에 들어가지 않는다 — 감시가 아니라 기준'],
        connect: ['→ 관리자가 기준을 정한다'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 25일 (화) 10:20',
        before: '관리자가 응대 기준을 정합니다 — 문의에 몇 시간 안에 답해야 하는지.',
        after: '1시간 넘으면 담당자에게 다시 알림, 2시간 넘으면 관리자에게. 신 0의 1시간 35분 무응답이 여기서 걸러집니다.',
      },
      pauseAfterMs: 6000,
      mfgArena: stateAt(4),
      memo: {
        title: 'STATE 5 — 관리자 응대 기준 설정',
        meta: '신 1 · ROI',
        situation: '관리자가 미응답 기준을 단계형으로 정한다. 1시간이 지나면 담당자에게 재알림, 2시간이 지나야 관리자에게 알림이 간다.',
        interact: '관리자 콘솔의 "기준 적용" 버튼 → 이후 신 2로',
        feel: ['"기준을 넘긴 점포만 관리자 화면에 표시됩니다"'],
        connect: ['→ 신 2: 관리자 발송, 점포 단위 집계'],
      },
    },
  ],
  onComplete: { nextChapter: 2 },
};
