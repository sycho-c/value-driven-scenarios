import type {
  Chapter,
  MfgArenaState,
  MfgKakaoItem,
  MfgLegacyPcDef,
  MfgPhoneDef,
  MfgRoomListItem,
  MfgValueStripDef,
} from '../../_types';
import { FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 0. 도입 배경 — 관리자·담당자·점주가 서로 보이지 않는 구조.
 * 관리자는 담당자 보고로, 담당자는 개인 카카오톡으로, 점주는 담당자 한 사람으로만 연결된다.
 * 왼쪽 점주 폰(점포 전환 탭), 가운데 담당자 개인폰, 오른쪽 관리자 PC(주간 보고 엑셀).
 * 관리자가 보는 현장(보고)과 실제 현장(개인 폰)이 어긋나는 장면을 나란히 보여준다.
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

/** STATE마다 두 폰이 같은 순간을 보여준다 */
const CLOCK: Record<Step, string> = { 0: '09:10', 1: '09:14', 2: '09:14', 3: '09:18', 4: '10:40', 5: '10:40' };

/** 강동천호점 정미경 ↔ 한태민 — 발주 문의, 공지 미수신 */
function storeAItems(step: Step, withQuestion: boolean): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '8월 18일 (화)' }];
  if (withQuestion) {
    items.push(
      { id: 'a1', kind: 'message', senderId: 'owner1', text: '태민님, 이번 신메뉴 발주 수량 어떻게 잡아야 할까요?', time: '09:12', isNew: step === 1 },
      { id: 'a2', kind: 'message', senderId: 'sv', text: '매장 규모 기준으로 정리해서 오후에 드릴게요', time: '09:14', isNew: step === 1 },
    );
  }
  if (step >= 3) {
    items.push(
      {
        id: 'a3',
        kind: 'message',
        senderId: 'owner1',
        text: '그리고 8월 프로모션 공지, 저희는 못 받은 것 같은데 포스터는 언제 오나요?',
        time: '09:16',
        isNew: step === 3,
      },
      { id: 'a4', kind: 'message', senderId: 'sv', text: '단톡방에 올렸었는데… 다시 보내드릴게요', time: '09:18', isNew: step === 3 },
    );
  }
  return items;
}

/** 하남미사점 오세훈 ↔ 한태민 — 답이 오지 않는 신규 점주 */
function storeBItems(step: Step, withFirst: boolean): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '8월 18일 (화)' }];
  if (withFirst) {
    items.push({
      id: 'b1',
      kind: 'message',
      senderId: 'owner2',
      text: '안녕하세요, 개점 준비 관련해서 여쭤볼 게 있는데요',
      time: '09:05',
    });
  }
  // 09:05 문의는 이미 와 있던 메시지 — 새로 도착하는 것은 "읽지 않음" 경과 표시다
  if (withFirst && (step === 2 || step === 3)) {
    items.push({
      id: 'b-wait0',
      kind: 'joined',
      text: '⏳ 9분째 읽지 않음 — 담당자는 강동천호점 대화 중',
      at: '09:14',
      isNew: step === 2,
    });
  }
  if (step >= 4) {
    items.push(
      { id: 'b-wait', kind: 'joined', text: '⏳ 1시간 35분째 답이 없음' },
      { id: 'b2', kind: 'message', senderId: 'owner2', text: '혹시 확인되시면 연락 부탁드립니다', time: '10:40', isNew: step === 4 },
    );
  }
  return items;
}

/** 점주 폰 1대 — 탭으로 강동천호점 / 하남미사점을 전환한다 */
function ownerPhone(step: Step, tab: 'a' | 'b', opts: { aQuestion: boolean; bFirst: boolean }): MfgPhoneDef {
  return {
    id: 'owner',
    ownerId: 'owner1',
    ownerLabel: '점주 폰',
    ownerSub: '개인 카카오톡 · 담당자 1:1',
    badge: 'vendor',
    badgeLabel: '가맹점주',
    headerTitle: '한태민 담당자',
    headerCount: '1:1',
    statusTime: CLOCK[step],
    activeTab: tab,
    tabs: [
      {
        id: 'a',
        label: '강동천호점',
        phone: {
          ownerId: 'owner1',
          ownerLabel: '정미경 점주 · 강동천호점',
          items: storeAItems(step, opts.aQuestion),
          highlight: step === 1 || step === 3,
        },
      },
      {
        id: 'b',
        label: '하남미사점',
        dot: opts.bFirst && tab !== 'b',
        phone: {
          ownerId: 'owner2',
          ownerLabel: '오세훈 점주 · 하남미사점',
          ownerSub: '개인 카카오톡 · 신규 개점',
          items: storeBItems(step, opts.bFirst),
          highlight: step === 2 || step === 4,
        },
      },
    ],
  };
}

const ROOMS_BASE: MfgRoomListItem[] = [
  { id: 'r1', name: '정미경 (강동천호점)', preview: '태민님, 이번 신메뉴 발주 수량…', time: '09:12', color: '#E67E22' },
  { id: 'r2', name: '오세훈 (하남미사점)', preview: '안녕하세요, 개점 준비 관련해서…', time: '09:05', unread: 1, color: '#27AE60' },
  { id: 'r3', name: '강동둔촌점 점주', preview: '사진 보냈습니다', time: '08:58', unread: 3, color: '#16A085' },
  { id: 'r4', name: '송파문정점 점주', preview: '정산 건 확인 부탁드려요', time: '08:41', unread: 2, color: '#2980B9' },
  { id: 'r5', name: '잠실새내점 점주', preview: '네 알겠습니다', time: '어제', color: '#8E44AD' },
  { id: 'r6', name: '구리인창점 점주', preview: '원두 입고가 늦어지네요', time: '어제', unread: 5, color: '#D35400' },
  { id: 'r7', name: '남양주다산점 점주', preview: '(사진)', time: '어제', color: '#C0392B' },
];

/** 담당자 개인폰 — 대화방 목록 또는 지금 열린 방 하나 */
function svPhone(step: Step, view: 'list' | 'chat-a'): MfgPhoneDef {
  const base: MfgPhoneDef = {
    id: 'sv',
    ownerId: 'sv',
    ownerLabel: '한태민 담당자 · 34개 점포',
    ownerSub: '개인 카카오톡 · 개인 휴대폰',
    badge: 'company',
    badgeLabel: '담당자',
    companyFrame: true,
    // 개인폰임은 소제목(개인 카카오톡 · 개인 휴대폰)으로 충분하다 — 입력창을 가리는 리본은 그리지 않는다
    companyRibbonLabel: '',
    statusTime: CLOCK[step],
  };
  if (view === 'list') {
    const late = step >= 4;
    return {
      ...base,
      screen: 'room-list',
      headerTitle: '채팅',
      headerCount: late ? '1:1 대화방 34 · 안 읽음 14' : '1:1 대화방 34 · 안 읽음 11',
      roomList: ROOMS_BASE.map((room) =>
        room.id === 'r2' && late
          ? { ...room, preview: '혹시 확인되시면 연락 부탁드립니다', time: '10:40', unread: 2, hot: true }
          : room,
      ),
      highlight: step === 0 || step === 4,
    };
  }
  const items = storeAItems(step, true);
  if (step >= 2) {
    items.push({ id: 'unread', kind: 'joined', text: '🔔 다른 대화방 안 읽음 11건 — 오세훈 점주 외 4명', at: '09:14', isNew: step === 2 });
  }
  return {
    ...base,
    headerTitle: '정미경 점주 (강동천호점)',
    headerCount: '1:1',
    items,
    highlight: step === 1 || step === 3,
  };
}

/** 관리자 PC — 공지 발송 기록과 담당자 주간 보고 엑셀 */
function adminPc(step: Step): MfgLegacyPcDef {
  return {
    windowTitle: '주간보고_2026-08-3주.xlsx — 관리자 PC',
    hi: step === 3 || step === 4,
    logTitle: '📣 공지 발송 기록 (관리자 기록)',
    log: [
      { text: '8월 프로모션 공지 → 담당자 60명 전달', meta: '08/11 · 전달 완료', tone: 'ok', hi: step === 3 },
      { text: '여름 신메뉴 교육 안내 → 담당자 60명 전달', meta: '08/12 · 전달 완료', tone: 'ok' },
      { text: '점포별 수신 여부', meta: '확인 수단 없음', tone: 'muted' },
    ],
    sheetTitle: '담당자 주간 보고 — 권역별',
    cols: ['권역', '담당자', '점포', '특이사항'],
    rows: [
      { cells: ['수도권 1권역', '김나래', '36', '신규 개점 1'] },
      { cells: ['수도권 2권역', '한태민', '34', '특이사항 없음'], hi: step === 4 },
      { cells: ['수도권 3권역', '박도윤', '41', '정산 문의 2'] },
      { cells: ['충청권', '최민호', '45', '인력 부족'] },
      { cells: ['…', '담당자 60명', '2,500', ''] },
    ],
  };
}

function arena(step: Step, ownerTab: 'a' | 'b', svView: 'list' | 'chat-a', opts: { aQuestion: boolean; bFirst: boolean }) {
  return {
    phones: [ownerPhone(step, ownerTab, opts), svPhone(step, svView)],
  };
}

function base(step: Step): Omit<MfgArenaState, 'phones'> {
  return {
    layout: 'split',
    phonesLabel: '📱 점주 폰 ↔ 담당자 개인폰 · 점포마다 따로 열린 개인 카톡방',
    phonesBadge: '1 : 34',
    actors: FRANCHISE_ACTORS,
    moreSlot: {
      title: '담당자 폰 안에 이런 방이 34개',
      sub: '가맹점 약 2,500개 · 담당자 약 60명 · 인당 30~40개 점포 [확정]',
    },
    workspace: {
      hideRoleTabs: true,
      label: '🖥 관리자 PC · 서윤아 가맹기획팀장 — 담당자 보고로만 현장을 본다',
      headerTitle: '관리자 PC',
      messages: [],
      legacy: adminPc(step),
    },
  };
}

function stateAt(step: Step): MfgArenaState {
  switch (step) {
    case 0: {
      // 관리자 PC(보고된 현장)부터 보여준 뒤, 액션으로 실제 현장(담당자 폰 · 점주 폰)을 드러낸다
      const shown = arena(0, 'a', 'list', { aQuestion: false, bFirst: false });
      return {
        ...base(0),
        phones: shown.phones.map((phone) => ({ ...phone, dimmed: true, highlight: false })),
        action: { label: '실제 현장 보기', at: 'workspace' },
        after: shown,
      };
    }
    case 1:
      // 앞 STATE에서 열어 둔 강동천호점 방 그대로 — 탭을 되돌리지 않는다
      return { ...base(1), ...arena(1, 'a', 'chat-a', { aQuestion: true, bFirst: false }) };
    case 2:
      return {
        ...base(2),
        ...arena(2, 'a', 'chat-a', { aQuestion: true, bFirst: true }),
        action: { label: '하남미사점 탭 선택', at: 'phone', phoneId: 'owner', tabId: 'b' },
        after: arena(2, 'b', 'chat-a', { aQuestion: true, bFirst: true }),
      };
    case 3:
      return { ...base(3), ...arena(3, 'a', 'chat-a', { aQuestion: true, bFirst: true }) };
    case 4:
      return { ...base(4), ...arena(4, 'b', 'list', { aQuestion: true, bFirst: true }) };
    case 5:
      return {
        ...base(5),
        ...arena(5, 'b', 'list', { aQuestion: true, bFirst: true }),
        painPopup: {
          title: '⚠ 세 역할 사이의 단절',
          items: [
            { heading: '점주 → 담당자: 응대 누락', desc: '한 점포를 응대하는 동안 나머지 33개는 대기 — 신규 점주 문의가 1시간 35분째 미확인' },
            { heading: '관리자 → 점주: 공지 미수신', desc: '관리자 기록은 "담당자 전달 완료", 강동천호점은 공지를 받지 못함' },
            {
              heading: '담당자 → 관리자: 보고 불일치 · 이력 소실',
              desc: '같은 날 주간 보고는 "특이사항 없음". 담당자가 퇴사하면 34개 점포 응대 이력이 개인 폰과 함께 사라짐',
            },
          ],
        },
      };
  }
}

const VALUE: MfgValueStripDef = {
  sell: '점주 이용 방식은 그대로 두고, 관리자가 보고가 아닌 실제 응대 기록으로 현장을 확인하는 구조로 전환',
  pain: '관리자 화면에 없는 응대 누락 · 공지 미수신 · 보고와 현장의 불일치, 담당자 퇴사 시 점포 이력 소실',
  roi: '담당자 증원이 아닌 3단 연결 구조 전환 · 가맹점 약 2,500개 · 담당자 약 60명 규모의 소통을 본부 관리 대상으로 [확정]',
};

export const chapter00SupervisorOverload: Chapter = {
  id: 0,
  act: 1,
  title: '도입 배경 — 관리자·담당자·점주가 서로 보이지 않는 구조',
  subtitle: '도입 전 현황 (2026.08 요구 확인 시점) · 무대: 점주 폰 + 담당자 개인폰 + 관리자 PC',
  narration:
    '관리자는 담당자 보고로, 담당자는 개인 카카오톡으로, 점주는 담당자 한 사람으로만 연결돼 있습니다. 담당자 한 명이 30~40개 점포를 개인 카톡으로 응대하고, 관리자는 주간 보고에 적힌 것만 봅니다. 본부 공지는 관리자 → 담당자 → 점주 순서로 내려가지만 관리자 기록에는 "담당자 전달 완료"까지만 남습니다. "관리자가 보는 현장은 보고된 현장이고, 실제 현장은 담당자 개인 폰 안에 있습니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 18일 (화) 09:10',
        before: '도입 전 가맹본부입니다. 관리자는 주간 보고 엑셀로만 현장을 봅니다 — 담당자와 점주의 실제 대화는 이 화면에 없습니다.',
        after: '실제 현장입니다. 담당자 한 명이 34개 점포를 개인 카톡 1:1 방으로 응대합니다.',
      },
      pauseAfterMs: 5000,
      guide:
        '오른쪽은 관리자 PC(주간 보고 엑셀), 가운데는 담당자 개인폰(1:1 대화방 34개), 왼쪽은 점주 폰입니다. → 키를 누를 때마다 메시지가 한 버블씩 나옵니다. 보라색 버튼은 그 역할의 행동이고, 점주 폰 위 탭으로 점포를 바꿔 볼 수 있습니다.',
      mfgArena: stateAt(0),
      memo: {
        title: 'STATE 1 — 3단 구조 진입',
        meta: '신 0 · 도입 배경',
        situation:
          '관리자·담당자·점주가 각각 다른 도구로 연결돼 있다. 관리자는 엑셀 보고서, 담당자는 개인 카톡 대화방 34개, 점주는 담당자 한 사람.',
        interact: '관리자 PC 위 "실제 현장 보기" 버튼(→ 키) → 담당자 폰 · 점주 폰이 드러난다. 다음 → 점주 문의',
        feel: ['"우리 본부도 지금 이렇게 봅니다"'],
        connect: ['→ 한 점포 응대가 시작된다'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 18일 (화) 09:12',
        before: '강동천호점 정미경 점주가 담당자 개인 카톡으로 신메뉴 발주 수량을 묻고, 담당자가 오후에 답하겠다고 합니다.',
      },
      pauseAfterMs: 5000,
      mfgArena: stateAt(1),
      memo: {
        title: 'STATE 2 — 점주 문의와 담당자 응대',
        meta: '신 0',
        situation:
          '정미경 점주가 신메뉴 발주 수량을 묻고, 담당자가 오후 회신을 약속한다. 이 순간 담당자 폰에서 열린 방은 34개 중 하나다.',
        interact: '→ 키로 한 버블씩 — 점주 문의, 담당자 응대',
        feel: ['매출과 폐기율에 직결되는 판단이 개인 카톡으로 오간다'],
        connect: ['→ 다른 점포에서는'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 18일 (화) 09:14',
        before: '담당자가 강동천호점 방에 있는 동안, 다른 방에는 안 읽은 문의가 11건 쌓입니다.',
        after: '하남미사점 신규 점주가 09:05에 보낸 문의 — 9분째 아무도 읽지 않았습니다.',
      },
      pauseAfterMs: 5000,
      mfgArena: stateAt(2),
      memo: {
        title: 'STATE 3 — 묻히는 문의',
        meta: '신 0',
        situation:
          '신규 점주 오세훈의 개점 준비 문의가 다른 대화방에 밀려 있다. 담당자 폰에는 안 읽음 11건.',
        interact: '점주 폰 탭을 "하남미사점"으로 바꾸세요 (→ 키도 가능)',
        feel: ['가장 도움이 필요한 신규 점주가 가장 늦게 닿는다'],
        connect: ['→ 본부 공지는'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 18일 (화) 09:18',
        before: '관리자 PC 기록은 "8월 프로모션 공지 → 담당자 60명 전달 완료". 그런데 강동천호점 점주는 공지를 받지 못했다고 합니다.',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(3),
      memo: {
        title: 'STATE 4 — 공지 미수신',
        meta: '신 0',
        situation:
          '관리자 기록에는 8월 프로모션 공지가 "담당자 전달 완료"로 남아 있다. 같은 시각 강동천호점은 공지를 받지 못했다고 묻는다.',
        interact: '다음 → 같은 날 주간 보고',
        feel: ['관리자는 내렸다고 알고, 점포는 못 받았다고 한다'],
        connect: ['→ 보고와 현장'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 18일 (화) 10:40',
        jump: '1시간 20분 뒤',
        before: '하남미사점 문의는 1시간 35분째 답이 없습니다. 같은 날 담당자 주간 보고에는 "수도권 2권역 특이사항 없음".',
      },
      pauseAfterMs: 5500,
      mfgArena: stateAt(4),
      memo: {
        title: 'STATE 5 — 보고와 현장의 불일치',
        meta: '신 0 · 핵심',
        situation:
          '하남미사점 문의가 1시간 35분째 답을 받지 못한 같은 날, 담당자 주간 보고에는 "수도권 2권역 특이사항 없음"이 적혀 있다.',
        interact: '다음 → 페인포인트 정리',
        feel: ['"관리자님이 보시는 현장은 보고된 현장입니다"'],
        connect: ['→ 세 역할 사이의 단절'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '8월 18일 (화)',
        before: '세 역할 사이의 단절 세 가지 — 이것이 도입 전 출발점입니다.',
      },
      pauseAfterMs: 6000,
      mfgArena: stateAt(5),
      memo: {
        title: 'STATE 6 — 페인포인트 노출',
        meta: '신 0 · 페인포인트',
        situation:
          '점주 → 담당자 응대 누락, 관리자 → 점주 공지 미수신, 담당자 → 관리자 보고 불일치와 퇴사 시 이력 소실. 세 가지 단절이 정리된다.',
        interact: '다음 → (신 1 채널 전환으로)',
        feel: ['"담당자를 더 채용하는 방식으로는 해결되지 않습니다"'],
        connect: ['→ 신 1: 관리자 설정, 담당자 초대, 점주 편입'],
      },
    },
  ],
  onComplete: { nextChapter: 1 },
};
