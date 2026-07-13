import type {
  Chapter,
  MfgArenaState,
  MfgKakaoItem,
  MfgPhoneDef,
  MfgWsMessage,
  MfgValueStripDef,
} from '../../_types';
import { MFG_ACTORS, feedUpTo } from '../_shared';

/**
 * 신 3-A. 산업 적용 — 국내 그룹 채널 (규격별 주문제작).
 * 규격 도면 접수 → 오더메이드 납기 확정 → 발주서 접수 → 외근 iOS 앱 응대까지
 * 하나의 채널에서. 공통 골격 위에 국내 산업 슬롯을 얹는다.
 */

const REPLY_TEXT = '발주서 잘 받았습니다. 07/22 납기로 생산 착수하겠습니다';

const CUST_SCRIPT: MfgKakaoItem[] = [
  { id: 'c1', kind: 'message', senderId: 'kim', text: '안녕하세요, 신규 발주 건 문의드립니다', time: '10:02' },
  { id: 'c2', kind: 'file', senderId: 'kim', text: '케이블_규격도면_0715.pdf', time: '10:04' },
  { id: 'c3', kind: 'message', senderId: 'kim', text: 'TR 22.9kV 60SQ · 500m 규격입니다. 납기 가능할까요?', time: '10:05' },
  { id: 'c4', kind: 'message', senderId: 'me', text: '도면 확인 완료. 📐 납기 07/22 확정', time: '10:09' },
  { id: 'c5', kind: 'message', senderId: 'kim', text: '납기 확인했습니다. 발주서 정식 전송합니다', time: '10:11' },
  { id: 'c6', kind: 'file', senderId: 'kim', text: '○○산업_발주서_0715.xlsx', time: '10:11' },
  { id: 'c7', kind: 'message', senderId: 'me', text: REPLY_TEXT, time: '10:12' },
];

/** 단계별 거래처 폰에 보이는 대본 줄 수 */
const CUST_COUNT = [0, 1, 3, 4, 6, 6, 6, 6, 7] as const;

function custPhone(step: number): MfgPhoneDef {
  const count = CUST_COUNT[step];
  const last = count > 0 ? CUST_SCRIPT[count - 1] : undefined;
  return {
    id: 'cust',
    ownerId: 'kim',
    ownerLabel: '○○산업 이영업 대리',
    ownerSub: 'Cowork+ 상담톡',
    badge: 'vendor',
    headerTitle: '발주 협의방',
    headerCount: '3',
    channelTheme: true,
    items: feedUpTo(CUST_SCRIPT, count),
    highlight: last?.senderId === 'kim',
  };
}

function agentPhone(step: number): MfgPhoneDef | null {
  if (step < 5) return null;
  if (step === 5) {
    return {
      id: 'agent',
      ownerId: 'me',
      ownerLabel: '나회사 담당자',
      ownerSub: 'iOS 앱',
      badge: 'company',
      badgeLabel: '외근',
      companyFrame: true,
      screen: 'ios-home',
      statusTime: '10:11',
      highlight: true,
    };
  }
  const appItems: MfgKakaoItem[] = [
    { id: 'a1', kind: 'file', senderId: 'kim', text: '발주서 확인 부탁드립니다', time: '10:10' },
  ];
  if (step >= 8) {
    appItems.push({ id: 'a2', kind: 'message', senderId: 'me', text: REPLY_TEXT, time: '10:12', isNew: true });
  }
  return {
    id: 'agent',
    ownerId: 'me',
    ownerLabel: '나회사 담당자',
    ownerSub: 'iOS 앱',
    badge: 'company',
    badgeLabel: '외근',
    companyFrame: true,
    screen: 'cowork-app',
    headerTitle: 'Cowork+ · 발주 협의방',
    items: appItems,
    appInput:
      step === 7
        ? { text: REPLY_TEXT, state: 'typing' }
        : step >= 8
          ? { state: 'sent' }
          : { state: 'idle' },
    highlight: step === 8,
  };
}

function wsMessages(step: number): MfgWsMessage[] {
  const messages: MfgWsMessage[] = [];
  if (step >= 1) {
    messages.push({
      id: 'w1',
      kind: 'in',
      senderId: 'kim',
      srcLabel: '상담톡 인입',
      text: '안녕하세요, 신규 발주 건 문의드립니다',
      time: '10:02',
      isNew: step === 1,
    });
  }
  if (step >= 2) {
    messages.push(
      {
        id: 'w2',
        kind: 'in',
        senderId: 'kim',
        srcLabel: '상담톡 인입',
        time: '10:04',
        file: { icon: '📄', name: '케이블_규격도면_0715.pdf', sub: '규격도면 · 1.2MB', state: 'plain', download: true },
        metaText: '✓ 자산화',
        isNew: step === 2,
      },
      {
        id: 'w3',
        kind: 'in',
        senderId: 'kim',
        srcLabel: '상담톡 인입',
        text: 'TR 22.9kV 60SQ · 500m 규격입니다. 납기 가능할까요?',
        time: '10:05',
        isNew: step === 2,
      },
    );
  }
  if (step >= 3) {
    messages.push({
      id: 'w4',
      kind: 'out',
      senderId: 'me',
      text: '도면 검토했습니다. 생산 일정 반영해 납기 확정드립니다',
      time: '10:09',
      card: {
        title: '📐 오더메이드 납기 확정',
        rows: [
          ['TR 22.9kV 60SQ · 500m', '생산 5일 + 출하 2일'],
          ['확정 납기', '07/22'],
        ],
      },
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    messages.push(
      {
        id: 'w5',
        kind: 'in',
        senderId: 'kim',
        srcLabel: '상담톡 인입',
        text: '납기 확인했습니다. 발주서 정식 전송합니다',
        time: '10:11',
        isNew: step === 4,
      },
      {
        id: 'w6',
        kind: 'in',
        senderId: 'kim',
        srcLabel: '상담톡 인입',
        time: '10:11',
        file: { icon: '📊', name: '○○산업_발주서_0715.xlsx', sub: '발주서 · 128KB', state: 'plain', download: true },
        metaText: '✓ 자산화',
        isNew: step === 4,
      },
    );
  }
  if (step >= 5) {
    messages.push({
      id: 'w7',
      kind: 'system-hi',
      text: '📱 나회사 담당자 외근 이동 · 현장에서 폰 앱으로 채널 접속 (오른쪽 담당자 폰)',
      isNew: step === 5,
    });
  }
  if (step >= 8) {
    messages.push({
      id: 'w8',
      kind: 'out',
      senderId: 'me',
      srcLabel: '외근 iOS 앱',
      text: REPLY_TEXT,
      time: '10:12',
      metaText: '✓ 외근 중 앱에서 발신',
      isNew: true,
    });
  }
  if (messages.length === 0) {
    messages.push({ id: 'sys0', kind: 'system', text: '○○산업 발주 협의방 — 국내 그룹 채널' });
  }
  return messages;
}

function arenaAt(step: number): MfgArenaState {
  const agent = agentPhone(step);
  return {
    layout: 'split',
    banner: '🏭 국내 그룹 채널 · 규격별 주문제작 · 하나의 카톡 그룹방에 거래처 다수',
    phonesLabel: agent ? '📱 거래처 폰 + 담당자 폰(외근)' : '📱 거래처·담당자 폰',
    phonesBadge: '국내 슬롯',
    actors: MFG_ACTORS,
    phones: agent ? [custPhone(step), agent] : [custPhone(step)],
    workspace: {
      role: 'br',
      headerTitle: '○○산업 발주 협의방 · 상담톡 채널',
      headerSub: '👥 이영업 대리 · 나회사 담당자',
      rooms: [
        { id: 'b', name: '○○산업 발주팀', preview: '규격 주문제작', color: '#E67E22', active: true },
        { id: 'c', name: '△△전선 구매팀', preview: '채널 입장함', color: '#27AE60' },
      ],
      messages: wsMessages(step),
    },
  };
}

const VALUE: MfgValueStripDef = {
  sell: '골격 재사용·슬롯 교체 — 그룹 채널·오더메이드 납기·외근 앱 응대로 국내 주문제작 대응.',
  pain: '국내: 규격 납기 혼선 · 외근 응대 단절 — 도면·발주·응대가 흩어짐',
  roi: '외근 파일 오류 해소 (5월 9건 → 6월 1건) [확정] · 도면·발주서 전량 자산화',
};

export const chapter03IndustryDomestic: Chapter = {
  id: 3,
  act: 4,
  group: {
    id: 'industry',
    tabLabel: '산업 적용',
    optionLabel: '🏭 국내 그룹 채널',
    optionDesc: '규격 도면 접수 → 오더메이드 납기 확정 → 발주서 접수 → 외근 앱 응대',
  },
  title: '산업 적용 · 국내 — 그룹 채널 (주문제작)',
  subtitle: '산업별 확장 (교체 슬롯) · 규격 도면 → 오더메이드 납기 → 발주서 → 외근 앱 응대',
  narration:
    '골격은 그대로입니다. 국내 주문제작 거래처면 이 그룹 채널을 얹습니다. 규격 도면 접수 → 오더메이드 납기 확정 → 발주서 접수 → 외근 중 폰 앱 응대까지, 하나의 채널에서 완결됩니다. 파일·대화는 전량 자산화됩니다. "하나의 골격, 산업 슬롯만 교체."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide: '국내 그룹 채널 — 규격별 주문제작 발주 흐름입니다. 화살표(→)로 대화를 진행하세요.',
      mfgArena: arenaAt(0),
      memo: {
        title: '무대 — 국내 그룹 채널',
        meta: '신 3 · 국내 슬롯',
        situation: '공통 골격 위에 국내 산업 슬롯(그룹 채널·오더메이드 납기)을 얹는다.',
        interact: '다음 → 발주 문의',
        feel: ['골격 재사용, 슬롯만 교체'],
        connect: ['→ 규격 도면 흐름'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(1),
      memo: {
        title: '거래처 발주 문의',
        meta: '신 3 · 국내',
        situation: '국내 거래처(○○산업 이영업 대리)가 카톡 그룹방으로 발주를 시작한다. 대화는 워크스페이스에 실시간 인입.',
        interact: '다음 → 규격 도면 전송',
        feel: ['거래처는 쓰던 카톡 그대로'],
        connect: ['→ 도면 접수'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(2),
      memo: {
        title: 'STATE 1 — 도면 접수',
        meta: '신 3 · 국내',
        situation: '규격 도면(PDF)을 첨부해 주문제작 사양을 전달한다. 도면 파일이 채널에 자산화된다.',
        interact: '다음 → 납기 확정',
        feel: ['도면·사양·납기가 한 방에'],
        connect: ['→ 오더메이드 납기'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(3),
      memo: {
        title: '오더메이드 납기 확정',
        meta: '신 3 · 국내',
        situation: '담당자가 도면을 검토하고, 생산 5일+출하 2일을 반영한 납기(07/22)를 확정 카드로 고정한다.',
        interact: '다음 → 정식 발주서',
        feel: ['납기 확정이 카드로 남는다'],
        connect: ['→ 발주서 접수'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 2 — 발주서 접수',
        meta: '신 3 · 국내',
        situation: '거래처가 확정 납기를 확인하고 정식 발주서를 전송한다. 발주 문서까지 채널 하나에 모인다.',
        interact: '다음 → 담당자 외근',
        feel: ['문서가 흩어지지 않는다'],
        connect: ['→ 외근 응대'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(5),
      memo: {
        title: '담당자 외근 — 폰 앱 등장',
        meta: '신 3 · 국내',
        situation: '담당자가 외근을 나간다. 폰에 Cowork+ 앱이 깔려 있다. 오른쪽에 담당자 폰(iOS 홈)이 등장한다.',
        interact: '다음 → 앱 실행',
        feel: ['외근 중에도 채널이 끊기지 않는다'],
        connect: ['→ Cowork+ 앱'],
      },
    },
    {
      index: 6,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(6),
      memo: {
        title: 'Cowork+ 앱 실행',
        meta: '신 3 · 국내',
        situation: '앱이 열리면 발주 협의방 채널이 그대로 이어진다. 입력창에 답변을 작성한다.',
        interact: '다음 → 답변 입력',
        feel: ['PC 워크스페이스와 같은 방'],
        connect: ['→ 타이핑'],
      },
    },
    {
      index: 7,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(7),
      memo: {
        title: '외근 중 타이핑',
        meta: '신 3 · 국내',
        situation: '현장에서 답변을 입력한다. "발주서 잘 받았습니다. 07/22 납기로 생산 착수하겠습니다"',
        interact: '다음 → 전송',
        feel: ['현장 응대 단절 해소'],
        connect: ['→ 전송·기록'],
      },
    },
    {
      index: 8,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(8),
      memo: {
        title: '국내 완결 — 전량 자산화',
        meta: '신 3 · 국내 · ROI',
        situation:
          '외근 현장에서 앱으로 응대를 전송했다. 거래처 폰·회사 워크스페이스 모두에 기록된다. 도면 접수 → 납기 확정 → 발주서 접수 → 외근 앱 응대까지 하나의 채널에서.',
        interact: '다음 → (신 3 해외 멀티 메신저로)',
        feel: ['외근 파일 오류 해소 (5월 9건→6월 1건) [확정]'],
        connect: ['→ 해외 수출 슬롯'],
      },
    },
  ],
  onComplete: { nextChapter: 4 },
};
