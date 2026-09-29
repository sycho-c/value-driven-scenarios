import type {
  Chapter,
  MfgArenaState,
  MfgKakaoItem,
  MfgPhoneDef,
  MfgValueStripDef,
  MfgWorkspaceDef,
  MfgWsBoard,
  MfgWsMessage,
} from '../../_types';
import { ADMIN_LABEL, FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 2. 공지·교육·설문 — 관리자 발송, 점포 단위 집계, 담당자 후속 조치.
 * 관리자 공지가 담당자 전달을 거치지 않고 점주에게 바로 닿는다.
 * 미열람 점포에는 시스템이 먼저 재안내하고, 그래도 남은 점포만 담당자 과업이 된다.
 * 설문에서 드러난 문제는 관리자가 부서로 이관하고, 결과가 담당자와 점주에게 돌아간다.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

interface Flags {
  sent: boolean;
  regionOpen: boolean;
  /** 담당자 개별 확인 요청 후 하남미사점 열람 */
  taskDone: boolean;
  handedOff: boolean;
}

const NOTICE_TEXT = '[본부 공지] 9월 프로모션 — 아이스 신메뉴 2종 출시. 포스터는 9/3까지 각 점포 배송 예정입니다.';
const EDU_TEXT = '[교육] 신메뉴 제조 교육 영상 (8분) — 9/5까지 이수 부탁드립니다';
const SURVEY_TEXT = '[설문] 9월 프로모션 준비현황 — 포스터 수령 · 재료 입고 · 교육 이수';
const UNREAD_STORES = ['하남미사점', '강동둔촌점', '송파문정점', '잠실새내점', '구리인창점', '남양주다산점'];

/** state마다 두 화면이 같은 순간을 보여준다 */
const STATUS_TIME: Record<Step, string> = { 0: '09:00', 1: '09:04', 2: '12:00', 3: '16:10', 4: '14:12', 5: '10:25' };

function storeAItems(f: Flags, step: Step): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 1일 (화)' }];
  if (!f.sent) return items;
  items.push(
    { id: 'n1', kind: 'message', senderId: 'notice', text: NOTICE_TEXT, time: '09:00', isNew: step === 0 },
    { id: 'n1f', kind: 'file', senderId: 'notice', text: '9월_프로모션_운영가이드.pdf', time: '09:00', isNew: step === 0 },
  );
  if (step >= 1) items.push({ id: 'read1', kind: 'joined', text: '✓ 09:04 열람 · 관리자 집계 반영' });
  if (step >= 4) {
    items.push(
      { id: 'd2', kind: 'date', text: '9월 2일 (수)' },
      { id: 't1', kind: 'message', senderId: 'notice', text: EDU_TEXT, time: '09:00', isNew: step === 4 },
      { id: 't1d', kind: 'joined', text: '✓ 김지아 매니저 이수 완료 · 14:12', isNew: step === 4 },
    );
  }
  if (step >= 5) {
    items.push(
      { id: 's0', kind: 'message', senderId: 'notice', text: SURVEY_TEXT, time: '09/02 17:00', at: '09:31', isNew: step === 5 && !f.handedOff },
      {
        id: 's1',
        kind: 'message',
        senderId: 'owner1',
        text: '[설문 응답] 포스터 수령 완료 · 신메뉴 재료 입고 완료 · 준비 이상 없음',
        time: '09/03 10:05',
      },
    );
  }
  return items;
}

function storeBItems(f: Flags, step: Step): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 1일 (화)' }];
  if (!f.sent) return items;
  items.push(
    { id: 'n2', kind: 'message', senderId: 'notice', text: NOTICE_TEXT, time: '09:00', isNew: step === 1 },
    { id: 'n2f', kind: 'file', senderId: 'notice', text: '9월_프로모션_운영가이드.pdf', time: '09:00', isNew: step === 1 },
  );
  if (step === 2) items.push({ id: 'unread', kind: 'joined', text: '● 미열람 — 개점 준비로 확인 지연' });
  if (step >= 3) {
    items.push({ id: 'remind', kind: 'joined', text: '🔔 12:30 자동 재안내 — 아직 미열람', at: '12:30', isNew: step === 3 && !f.taskDone });
    if (f.taskDone) {
      items.push(
        {
          id: 'sv-ask',
          kind: 'message',
          senderId: 'sv',
          text: '점주님, 9월 프로모션 공지 확인 부탁드립니다. 포스터 수령 일정이 들어 있어요',
          time: '16:02',
          isNew: step === 3,
        },
        { id: 'read2', kind: 'joined', text: '✓ 16:10 열람 · 관리자 집계 반영', isNew: step === 3 },
      );
    }
  }
  if (step >= 4) {
    items.push(
      { id: 'd2', kind: 'date', text: '9월 2일 (수)' },
      { id: 't2', kind: 'message', senderId: 'notice', text: EDU_TEXT, time: '09:00' },
    );
  }
  if (step >= 5) {
    items.push(
      { id: 's0', kind: 'message', senderId: 'notice', text: SURVEY_TEXT, time: '09/02 17:00', at: '09:31', isNew: step === 5 && !f.handedOff },
      {
        id: 's2',
        kind: 'message',
        senderId: 'owner2',
        text: '[설문 응답] 포스터 미수령 — 배송 확인 요청드립니다',
        time: '09/03 09:40',
        isNew: !f.handedOff,
      },
    );
    if (f.handedOff) {
      items.push({
        id: 'ship',
        kind: 'message',
        senderId: 'sv',
        text: '점주님, 포스터는 물류팀에서 9/4 재배송합니다. 프로모션 시작 전 도착 예정입니다.',
        time: '09/03 10:25',
        isNew: true,
      });
    }
  }
  return items;
}

function ownerPhone(f: Flags, step: Step, tab: 'a' | 'b'): MfgPhoneDef {
  return {
    id: 'owner',
    ownerId: 'owner1',
    ownerLabel: '점주 폰',
    ownerSub: '',
    badge: 'channel',
    badgeLabel: '점포 채널',
    channelTheme: true,
    statusTime: STATUS_TIME[step],
    activeTab: tab,
    tabs: [
      {
        id: 'a',
        label: '강동천호점',
        phone: {
          ownerId: 'owner1',
          ownerLabel: '정미경 점주 · 강동천호점',
          ownerSub: '공식 채널 (카카오)',
          headerTitle: '강동천호점',
          headerCount: '3',
          items: storeAItems(f, step),
          highlight: step === 0 || step === 4,
        },
      },
      {
        id: 'b',
        label: '하남미사점',
        dot: f.sent && tab !== 'b',
        phone: {
          ownerId: 'owner2',
          ownerLabel: '오세훈 점주 · 하남미사점',
          ownerSub: '공식 채널 (웹)',
          headerTitle: '하남미사점',
          headerCount: '2',
          items: storeBItems(f, step),
          highlight: step === 1 || step === 3 || step === 5,
        },
      },
    ],
  };
}

function svPhone(f: Flags, step: Step): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 1일 (화)' }];
  if (f.sent) {
    items.push({ id: 'info', kind: 'joined', text: '📣 본부 공지가 점주에게 직접 도착 — 담당자는 전달하지 않아도 됩니다', at: '09:01', isNew: step === 0 });
  }
  if (step >= 3) {
    items.push({
      id: 'task',
      kind: 'joined',
      text: '📋 확인 필요 점포 1건 — 하남미사점 · 공지 미열람 (재안내 후)',
      at: '12:31',
      isNew: step === 3 && !f.taskDone,
    });
    if (f.taskDone) {
      items.push(
        {
          id: 'ask',
          kind: 'message',
          senderId: 'sv',
          text: '점주님, 9월 프로모션 공지 확인 부탁드립니다. 포스터 수령 일정이 들어 있어요',
          time: '16:02',
          isNew: step === 3,
        },
        { id: 'task-done', kind: 'joined', text: '✓ 과업 완료 — 하남미사점 16:10 열람', isNew: step === 3 },
      );
    }
  }
  if (f.handedOff) {
    items.push({
      id: 'handoff',
      kind: 'joined',
      text: '🚚 관리자 이관 회신 — 포스터 미수령 2개 점포 물류팀 9/4 재배송',
      at: '10:21',
      isNew: true,
    });
    items.push({
      id: 'ship',
      kind: 'message',
      senderId: 'sv',
      text: '점주님, 포스터는 물류팀에서 9/4 재배송합니다. 프로모션 시작 전 도착 예정입니다.',
      time: '09/03 10:25',
      isNew: true,
    });
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
    headerTitle: '확인 필요 점포',
    screen: 'cowork-app',
    appCaption: '담당 34개 점포 · 과업만 도착',
    appBadge: 'Cowork App',
    appContext: {
      initial: '✓',
      title: step >= 3 ? `확인 필요 ${f.taskDone ? 0 : 1}건` : '확인 필요 0건',
      sub: '재안내 후에도 남은 점포만 과업으로',
      chips: step >= 3 ? ['34개 → 1개 점포'] : undefined,
      tag: '과업',
    },
    statusTime: STATUS_TIME[step],
    items,
    highlight: step === 3,
  };
}

function board(f: Flags, step: Step): MfgWsBoard | undefined {
  if (!f.sent) return undefined;
  if (step <= 1) {
    return {
      metrics: [
        { label: '수신 (전국)', value: '2,500/2,500', pct: 100, tone: 'navy', sub: '수도권 2권역 34/34 · 카카오 29 · 웹 5', isNew: step <= 1 },
        { label: '열람', value: '집계 중', pct: 0, tone: 'amber' },
      ],
    };
  }
  if (step === 2) {
    if (!f.regionOpen) {
      return {
        metrics: [
          { label: '수신 (전국)', value: '2,500/2,500', pct: 100, tone: 'navy' },
          { label: '열람 (전국)', value: '2,050 (82%)', pct: 82, tone: 'amber', sub: '12:00 최초 열람' },
        ],
        listTitle: '권역별 열람 — 권역을 누르면 점포까지',
        list: [
          { name: '수도권 1권역', state: '83%', tone: 'amber' },
          { name: '수도권 2권역', state: '82%', tone: 'amber' },
          { name: '수도권 3권역', state: '84%', tone: 'amber' },
          { name: '영남권', state: '86%', tone: 'pos' },
          { name: '충청권', state: '71%', tone: 'red' },
          { name: '호남권', state: '83%', tone: 'amber' },
        ],
      };
    }
    return {
      metrics: [
        { label: '수도권 2권역 수신', value: '34/34', pct: 100, tone: 'navy' },
        { label: '수도권 2권역 열람', value: '28/34 (82%)', pct: 82, tone: 'amber', isNew: true },
      ],
      listTitle: '미열람 6개 점포 — 점포 이름으로 특정',
      list: UNREAD_STORES.map((name) => ({ name, state: '미열람', tone: 'red' as const })),
    };
  }
  const read = step === 3 && !f.taskDone ? { value: '33/34 (97%)', pct: 97, sub: '자동 재안내 후' } : { value: '34/34 (100%)', pct: 100, sub: '담당자 확인 후' };
  const metrics: MfgWsBoard['metrics'] = [
    { label: '수신', value: '34/34', pct: 100, tone: 'navy' },
    { label: '열람', ...read, tone: read.pct === 100 ? 'pos' : 'amber', isNew: step === 3 },
  ];
  if (step >= 4) metrics.push({ label: '교육 이수', value: '31/34 (91%)', pct: 91, tone: 'purple', sub: '9/5 마감', isNew: step === 4 });
  if (step >= 5) metrics.push({ label: '설문 응답', value: '33/34 (97%)', pct: 97, tone: 'purple', sub: '준비현황' });
  if (step === 3) {
    return {
      metrics,
      listTitle: f.taskDone ? '재안내 6 → 5개 점포 열람 · 남은 1개 점포 담당자 확인 완료' : '재안내 6 → 5개 점포 열람 · 남은 1개 점포는 담당자 과업',
      list: UNREAD_STORES.map((name) =>
        name === '하남미사점'
          ? { name, state: f.taskDone ? '담당자 확인 → 열람' : '담당자 과업', tone: f.taskDone ? ('pos' as const) : ('red' as const) }
          : { name, state: '재안내 → 열람', tone: 'pos' as const },
      ),
    };
  }
  if (step === 4) {
    return {
      metrics,
      listTitle: '미이수 3 — 9/5 마감 전 재알림 예약',
      list: ['하남미사점', '구리인창점', '남양주다산점'].map((name) => ({ name, state: '미이수', tone: 'amber' as const })),
    };
  }
  if (step === 5) {
    return {
      metrics,
      listTitle: f.handedOff ? '포스터 미수령 2 → 물류팀 이관 · 9/4 재배송' : '설문에서 드러난 준비 이상 2',
      list: ['하남미사점', '구리인창점'].map((name) => ({
        name,
        state: f.handedOff ? '물류팀 이관' : '포스터 미수령',
        tone: f.handedOff ? ('pos' as const) : ('red' as const),
      })),
    };
  }
  return { metrics };
}

function consoleMessages(f: Flags, step: Step): MfgWsMessage[] {
  const msgs: MfgWsMessage[] = [
    {
      id: 'send',
      kind: 'out',
      senderId: 'hq',
      srcLabel: f.sent ? '09:00 발송' : '예약 09:00',
      text: NOTICE_TEXT,
      file: { icon: '📄', name: '9월_프로모션_운영가이드.pdf', sub: 'PDF · 2.4MB', state: 'plain' },
      card: {
        title: '📣 발송 대상',
        rows: [['경로', '점주에게 직접 수신 · 담당자 전달 없음']],
        choices: [{ k: '대상', opts: ['전국 2,500', '권역 선택'], pick: '전국 2,500' }],
      },
      time: '09/01 09:00',
      metaText: f.sent ? '수신 2,500/2,500' : undefined,
      isNew: step === 0 && f.sent,
    },
  ];
  if (step >= 2) {
    msgs.push({ id: 'read', kind: 'system', text: '👁 12:00 전국 최초 열람 2,050/2,500 (82%)' });
  }
  if (f.regionOpen || step >= 3) {
    msgs.push({ id: 'drill', kind: 'system-hi', text: '🔎 수도권 2권역 28/34 — 미열람 6개 점포 확인', isNew: step === 2 });
  }
  if (step >= 3) {
    msgs.push({ id: 'remind', kind: 'system', text: '🔔 12:30 미열람 6개 점포 자동 재안내 → 5개 점포 열람 (33/34)', at: '12:30', isNew: step === 3 && !f.taskDone });
    msgs.push({ id: 'task', kind: 'system-hi', text: '📋 남은 1개 점포(하남미사점) → 한태민 담당자 과업 배정', at: '12:31', isNew: step === 3 && !f.taskDone });
    if (f.taskDone) {
      msgs.push({ id: 'task-done', kind: 'system-hi', text: '✓ 16:10 하남미사점 열람 — 담당자 과업 완료 · 34/34', at: '16:11', isNew: step === 3 });
    }
  }
  if (step >= 4) {
    msgs.push({
      id: 'edu',
      kind: 'out',
      senderId: 'hq',
      srcLabel: '교육 배포',
      text: EDU_TEXT,
      file: { icon: '🎬', name: '신메뉴_제조교육_영상.mp4', sub: '영상 · 8분 · 이수 집계', state: 'plain' },
      time: '09/02 09:00',
      metaText: '이수 31/34',
      isNew: step === 4,
    });
  }
  if (step >= 5) {
    msgs.push({ id: 'survey', kind: 'out', senderId: 'hq', srcLabel: '설문 배포', text: SURVEY_TEXT, time: '09/02 17:00', at: '09:30', metaText: '응답 33/34', isNew: step === 5 && !f.handedOff });
    msgs.push({
      id: 'handoff',
      kind: 'out',
      senderId: 'hq',
      srcLabel: '부서 이관',
      text: f.handedOff ? '포스터 미수령 2개 점포를 물류팀으로 이관했습니다.' : '포스터 미수령 2개 점포 — 이관할 부서를 고릅니다.',
      card: {
        title: '🚚 설문 문제 이관',
        rows: [
          ['대상', '하남미사점 · 구리인창점'],
          ['기한', '9/4 18:00 재배송 (프로모션 시작 전)'],
        ],
        choices: [{ k: '부서', opts: ['물류팀', '시설팀', '품질팀'], pick: f.handedOff ? '물류팀' : undefined }],
      },
      time: '09/03 10:20',
      metaText: f.handedOff ? '담당자 · 점포 방 회신' : undefined,
      isNew: f.handedOff,
    });
  }
  return msgs;
}

function workspace(f: Flags, step: Step): MfgWorkspaceDef {
  const room = step >= 5 ? 'survey' : step >= 4 ? 'edu' : 'notice';
  return {
    role: 'admin',
    hideRoleTabs: true,
    label: ADMIN_LABEL,
    headerTitle:
      room === 'survey' ? '준비현황 설문 · 응답 집계' : room === 'edu' ? '신메뉴 제조 교육 · 이수 집계' : '9월 프로모션 공지 · 발송 집계',
    headerSub: f.regionOpen || step >= 3 ? '전국 → 수도권 2권역 34개 점포' : '전국 2,500개 점포',
    dashLabel: '발송 집계',
    dashSubLabel: '권역 · 담당자 · 점포',
    roomsLabel: '공지 · 교육 · 설문',
    rooms: [
      { id: 'notice', name: '9월 프로모션 공지', preview: step >= 3 ? '열람 100%' : f.sent ? '수신 100%' : '예약', color: '#16172A', active: room === 'notice' },
      ...(step >= 4 ? [{ id: 'edu', name: '신메뉴 제조 교육', preview: '이수 91%', color: '#5B3FE4', active: room === 'edu' }] : []),
      ...(step >= 5
        ? [{ id: 'survey', name: '준비현황 설문', preview: f.handedOff ? '물류팀 이관' : '응답 97%', color: '#A0522D', active: room === 'survey' }]
        : []),
    ],
    sideNote: '관리자 발송 → 시스템 재안내 → 남은 점포만 담당자',
    board: board(f, step),
    messages: consoleMessages(f, step),
  };
}

function arenaOf(f: Flags, step: Step, tab: 'a' | 'b'): Omit<MfgArenaState, 'action' | 'after'> {
  return {
    layout: 'split',
    phonesLabel: '📱 점주 폰(카카오 · 웹) ↔ 담당자 Cowork App',
    phonesBadge: '공지 · 교육 · 설문',
    actors: FRANCHISE_ACTORS,
    phones: [ownerPhone(f, step, tab), svPhone(f, step)],
    moreSlot: {
      title: '전국 2,500개 점포 · 담당자 60명',
      sub: '관리자는 발송하고, 시스템이 재안내하고, 담당자는 남은 점포만 확인한다 [예시]',
    },
    workspace: workspace(f, step),
    ...(f.handedOff
      ? { banner: '최초 열람 82% → 재안내 후 97% → 담당자 확인 후 100% · 담당자 확인 대상 34개 → 1개 점포' }
      : {}),
  };
}

const F0: Flags = { sent: false, regionOpen: false, taskDone: false, handedOff: false };
const F1: Flags = { ...F0, sent: true };
const F2: Flags = { ...F1, regionOpen: true };
const F3: Flags = { ...F2, taskDone: true };
const F4: Flags = { ...F3, handedOff: true };

function stateAt(step: Step): MfgArenaState {
  switch (step) {
    case 0:
      return {
        ...arenaOf(F0, 0, 'a'),
        action: { label: '발송', at: 'workspace', doneLabel: '✓ 발송 완료' },
        after: arenaOf(F1, 0, 'a'),
      };
    case 1:
      return {
        ...arenaOf(F1, 1, 'a'),
        action: { label: '하남미사점 탭 선택', at: 'phone', phoneId: 'owner', tabId: 'b' },
        after: arenaOf(F1, 1, 'b'),
      };
    case 2:
      return {
        ...arenaOf(F1, 2, 'b'),
        action: { label: '수도권 2권역 ▸', at: 'workspace' },
        after: arenaOf(F2, 2, 'b'),
      };
    case 3:
      return {
        ...arenaOf(F2, 3, 'b'),
        action: { label: '확인 요청', at: 'phone', phoneId: 'sv', doneLabel: '✓ 34/34' },
        after: arenaOf(F3, 3, 'b'),
      };
    case 4:
      return arenaOf(F3, 4, 'a');
    case 5:
      return {
        ...arenaOf(F3, 5, 'b'),
        action: { label: '이관', at: 'workspace', doneLabel: '✓ 물류팀 이관' },
        after: arenaOf(F4, 5, 'b'),
      };
  }
}

const VALUE: MfgValueStripDef = {
  sell: '관리자 · 시스템 · 담당자의 역할 분담 — 공지가 발송에서 끝나지 않고 전 점포 열람까지 관리',
  pain: '공지가 담당자 전달에 의존해 관리자는 열람 여부를 모르고, 프로모션 당일에야 미준비 점포 확인',
  roi: '열람 82% → 재안내 97% → 담당자 확인 100% · 담당자 확인 대상 34 → 1개 점포 · 포스터 미수령 2개 점포 사전 조치 [예시]',
};

export const chapter02NoticeTraining: Chapter = {
  id: 2,
  act: 3,
  title: '공지·교육·설문 — 관리자 발송, 점포 단위 집계, 담당자 후속 조치',
  subtitle: '운영 정착 (9월 프로모션 사전 준비) · 무대: 점주 폰(카카오·웹) + 담당자 Cowork App + 관리자 콘솔',
  narration:
    '관리자가 공지를 보내면 담당자 전달을 거치지 않고 점주 폰에 바로 닿습니다. 열람 여부는 점포 이름으로 기록되고, 열람하지 않은 점포에는 시스템이 먼저 재안내를 보냅니다. 그래도 남은 점포만 담당자에게 과업으로 배정되므로, 담당자는 34개 점포를 모두 확인하지 않아도 됩니다. 설문에서 드러난 문제는 관리자가 부서로 이관하고 결과가 담당자와 점주에게 돌아갑니다. "관리자는 발송하고, 시스템이 재안내하고, 담당자는 남은 점포만 확인합니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 1일 (화) 09:00',
        jump: '1주 뒤',
        before: '지난 신: 채널과 응대 기준을 만들었습니다. 이번 신: 관리자가 9월 프로모션 공지를 보냅니다 — 신 0과 달리 담당자를 거치지 않습니다.',
        after: '공지가 점주 폰에 바로 도착했습니다. 담당자는 전달하지 않아도 됩니다.',
      },
      pauseAfterMs: 5500,
      guide: '관리자 콘솔에서 발송 대상을 고르고 "발송"을 누르면 점주 폰에 바로 도착합니다. 담당자는 전달하지 않습니다.',
      mfgArena: stateAt(0),
      memo: {
        title: 'STATE 1 — 관리자 공지 발송',
        meta: '신 2 · 공지·교육·설문',
        situation: '관리자가 9월 프로모션 공지와 운영가이드 PDF를 전국에 발송한다. 신 0과 달리 담당자를 거치지 않는다.',
        interact: '관리자 콘솔의 "발송" 버튼',
        feel: ['"담당자가 전달했는지가 아니라 점주님이 열람했는지를 봅니다"'],
        connect: ['→ 두 채널 수신 비교'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 1일 (화) 09:04',
        before: '강동천호점(카카오)은 공지를 받아 바로 읽었습니다. 카카오톡을 쓰지 않는 하남미사점은?',
        after: '하남미사점(웹)도 같은 공지를 똑같이 받았습니다.',
      },
      pauseAfterMs: 5000,
      mfgArena: stateAt(1),
      memo: {
        title: 'STATE 2 — 점주 수신',
        meta: '신 2',
        situation: '카카오 채널 점포(강동천호점)와 웹 채널 점포(하남미사점)가 같은 공지를 똑같이 받는다.',
        interact: '점주 폰 탭을 "하남미사점"으로 바꿔 비교',
        feel: ['카톡 미사용 점포도 빠지지 않는다'],
        connect: ['→ 누가 읽었는가'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 1일 (화) 12:00',
        jump: '3시간 뒤',
        before: '전국 열람률 82%. 관리자가 수도권 2권역으로 들어가 봅니다.',
        after: '수도권 2권역 28/34 — 아직 안 읽은 6개 점포가 이름으로 보입니다.',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(2),
      memo: {
        title: 'STATE 3 — 권역·점포 열람 집계',
        meta: '신 2 · 핵심',
        situation: '관리자가 전국 열람률 82%에서 수도권 2권역으로 들어가, 28/34와 미열람 6개 점포를 이름으로 확인한다.',
        interact: '관리자 콘솔의 "수도권 2권역 ▸" 버튼',
        feel: ['전국 → 권역 → 점포 이름까지'],
        connect: ['→ 시스템 재안내'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 1일 (화) 12:30',
        before: '안 읽은 6곳에 시스템이 자동으로 다시 안내해 5곳이 읽었습니다. 남은 1곳만 담당자에게 과업으로 갑니다.',
        after: '담당자가 하남미사점에 확인을 요청했고, 오후 4시 10분 점주가 읽었습니다 — 34곳 모두 열람.',
      },
      pauseAfterMs: 6000,
      mfgArena: stateAt(3),
      memo: {
        title: 'STATE 4 — 자동 재안내와 담당자 과업',
        meta: '신 2 · 역할 분담',
        situation:
          '미열람 6개 점포에 자동 재안내가 나가 33/34가 되고, 남은 하남미사점 1곳만 담당자 앱에 "확인 필요"로 도착한다. 담당자가 확인을 요청하자 점주가 열람해 34/34.',
        interact: '담당자 앱 아래 "확인 요청" 버튼',
        feel: ['"담당자는 34개 점포를 모두 확인하지 않아도 됩니다"'],
        connect: ['→ 교육 배포'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 2일 (수) 09:00',
        jump: '다음 날',
        before: '관리자가 신메뉴 제조 교육 영상을 보냅니다. 강동천호점은 매장 매니저가 이수했습니다 — 이수 31/34.',
      },
      pauseAfterMs: 5000,
      mfgArena: stateAt(4),
      memo: {
        title: 'STATE 5 — 교육 이수',
        meta: '신 2',
        situation: '관리자가 신메뉴 제조 교육(8분)을 배포하고, 강동천호점은 점포 방의 김지아 매니저가 이수한다. 관리자 콘솔 이수 31/34(91%).',
        interact: '다음 → 설문',
        feel: ['교육이 "보냈다"가 아니라 "이수했다"로'],
        connect: ['→ 준비현황 점검'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 3일 (목) 09:40',
        jump: '다음 날',
        before: '관리자가 보낸 프로모션 준비 설문에 하남미사점이 "포스터를 못 받았다"고 답했습니다. 같은 답이 2곳.',
        after: '관리자가 물류팀으로 넘겼고, 재배송 일정이 담당자와 점주에게 돌아갔습니다 — 프로모션 시작 전에.',
      },
      pauseAfterMs: 6000,
      mfgArena: stateAt(5),
      memo: {
        title: 'STATE 6 — 설문 응답과 부서 이관',
        meta: '신 2 · ROI',
        situation:
          '하남미사점이 "포스터 미수령"으로 응답하고, 관리자 콘솔에 미수령 2개 점포가 뜬다. 관리자가 물류팀으로 이관하면 담당자 앱과 점포 방에 처리 결과가 돌아간다.',
        interact: '관리자 콘솔의 "이관" 버튼 → 이후 신 3으로',
        feel: ['프로모션 당일이 아니라 시작 전에 잡는다'],
        connect: ['→ 신 3: 담당자 상향, 관리자 배정과 승계 승인'],
      },
    },
  ],
  onComplete: { nextChapter: 3 },
};
