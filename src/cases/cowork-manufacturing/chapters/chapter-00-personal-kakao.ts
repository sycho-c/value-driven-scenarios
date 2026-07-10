import type { Chapter, MfgKakaoItem, MfgPhoneDef,
  MfgValueStripDef,
} from '../../_types';
import { MFG_ACTORS, feedUpTo } from '../_shared';

/**
 * 신 0. 도입 배경 — 왜 개인 카톡을 못 쓰나.
 * 담당자 1 + 거래처 2가 같은 개인 카톡 단톡방을 각자 폰으로 보는 M:N 구조.
 * 대화가 담당자 개인 폰 안에만 쌓이다, 마지막에 페인포인트 팝업으로 문제를 정면 제시.
 */

const SCRIPT: MfgKakaoItem[] = [
  { id: 'm1', kind: 'message', senderId: 'kim', text: '내일 납기 건 수량 확인 부탁드립니다', time: '09:12' },
  { id: 'm2', kind: 'message', senderId: 'me', text: '네 확인해서 오후에 회신드리겠습니다', time: '09:13' },
  { id: 'm3', kind: 'message', senderId: 'choi', text: '저희 견적서도 같이 부탁드려요', time: '09:13' },
  { id: 'm4', kind: 'message', senderId: 'me', text: '두 곳 모두 정리해서 보내드릴게요', time: '09:14' },
];

function phones(feedCount: number): MfgPhoneDef[] {
  const items = feedUpTo(SCRIPT, feedCount);
  const lastSender = feedCount > 0 ? SCRIPT[feedCount - 1]?.senderId : undefined;
  const base: Array<Omit<MfgPhoneDef, 'items'>> = [
    {
      id: 'a',
      ownerId: 'me',
      ownerLabel: '나회사 · 영업지원',
      ownerSub: '개인 카카오톡',
      badge: 'company',
      companyFrame: true,
      headerTitle: '발주 협의방',
      headerCount: '4',
    },
    {
      id: 'b',
      ownerId: 'kim',
      ownerLabel: '○○산업 이영업 대리',
      ownerSub: '개인 카카오톡',
      badge: 'vendor',
      headerTitle: '발주 협의방',
      headerCount: '4',
    },
    {
      id: 'c',
      ownerId: 'choi',
      ownerLabel: '△△전선 최구매 차장',
      ownerSub: '개인 카카오톡',
      badge: 'vendor',
      headerTitle: '발주 협의방',
      headerCount: '4',
    },
  ];
  const ownerOfSender: Record<string, string> = { me: 'a', kim: 'b', choi: 'c' };
  return base.map((p) => ({
    ...p,
    items,
    highlight: lastSender ? ownerOfSender[lastSender] === p.id : false,
  }));
}

function arenaState(feedCount: number, withPain = false) {
  return {
    layout: 'phones-only' as const,
    phonesLabel: '📱 같은 단톡방 · 회사 담당자 1 + 거래처 다수',
    phonesBadge: 'M:N',
    actors: MFG_ACTORS,
    phones: phones(feedCount),
    moreSlot: {
      title: '외 55개 거래처',
      sub: '거래처 57개 · 거래처 직원 138명 [확정]',
    },
    ...(withPain
      ? {
          painPopup: {
            title: '⚠ 이 단톡방, 회사는 통제 불가',
            items: [
              { heading: '관리자 확인 불가', desc: '담당자 폰을 열어보기 전엔 진행 상황 파악 불가' },
              { heading: '퇴사 시 증발', desc: '거래처 연락처·발주서·견적서가 담당자 폰과 함께 소멸' },
              { heading: '집계 불가', desc: '이번 달 발주 건수·거래처별 순위 산출 불가' },
            ],
          },
        }
      : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '거래처가 쓰던 방식(카카오톡 단톡방) 그대로, 회사는 대화를 자산으로.',
  pain: '담당자 개인 카톡 단톡방 = 관리자 확인 불가 · 퇴사 시 대화·파일 증발 · 발주 건수 집계 불가',
  roi: '통제 밖 대화량 = 회사 리스크. 계량 근거는 전환 후 확보 [확인필요]',
};

export const chapter00PersonalKakao: Chapter = {
  id: 0,
  act: 1,
  title: '도입 배경 — 왜 개인 카톡을 못 쓰나',
  subtitle: '도입 전 현황 (2025.08 니즈 발굴 시점) · 무대: 거래처·담당자의 개인 카카오톡 단톡방',
  narration:
    '영업지원 조직은 거래처 57개·직원 138명을 담당자별 개인 카톡 단톡방으로 상대합니다. 세 거래처와 담당자가 한 단톡방에서 발주를 주고받지만, 이 방 어디에도 회사는 없습니다. 관리자는 무엇이 오갔는지 볼 수 없고, 담당자가 나가면 대화도 함께 사라집니다. "개인 카톡에 흩어진 소통은, 관리도 자산화도 되지 않습니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '폰 3대가 같은 개인 카톡 단톡방을 각자 시점으로 보여줍니다. 맨 왼쪽 보라 테두리가 회사 담당자 폰. 화살표(→)로 대화를 진행하세요.',
      mfgArena: arenaState(0),
      memo: {
        title: 'STATE 1 — 개인 카톡 단톡방 진입',
        meta: '신 0 · 도입 배경',
        situation: '담당자와 거래처가 개인 카톡 단톡방에서 발주 관련 대화를 나눈다. 폰 3대가 같은 방을 각자 화면으로 표시.',
        interact: '화살표 클릭으로 대화가 브로드캐스트되며 진행된다.',
        feel: ['"우리도 지금 이렇게 일하는데?"'],
        connect: ['→ 대화가 담당자 개인 폰에만 쌓인다'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3500,
      mfgArena: arenaState(1),
      memo: {
        title: '○○산업의 발주 문의',
        meta: '신 0',
        situation: '○○산업 이영업 대리가 단톡방에 발주를 넣는다. 같은 메시지가 담당자와 거래처들의 폰에 동시에 뜬다.',
        interact: '다음 →',
        feel: ['발주·납기가 전부 카톡으로 오간다'],
        connect: ['→ 담당자 응대'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3500,
      mfgArena: arenaState(2),
      memo: {
        title: '담당자의 응대',
        meta: '신 0',
        situation: '회사 담당자가 답한다. 담당자 폰에선 노란색(내 메시지), 거래처 폰에선 흰색으로 보인다.',
        interact: '다음 →',
        feel: ['같은 방, 서로 다른 시점'],
        connect: ['→ 다른 거래처가 끼어든다'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3500,
      mfgArena: arenaState(3),
      memo: {
        title: 'M:N 구조의 민낯',
        meta: '신 0',
        situation: '△△전선이 끼어든다. 담당자 한 명이 여러 거래처를 한 방에서 동시에 상대하는 M:N 구조.',
        interact: '다음 →',
        feel: ['담당자마다 거래처를 나눠 관리 → 통합 관리 불가'],
        connect: ['→ 대화는 어디에 남는가?'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 3500,
      mfgArena: arenaState(4),
      memo: {
        title: '개인 폰 안에만 쌓이는 대화',
        meta: '신 0',
        situation: '담당자는 거래처마다 답을 나눠 보낸다. 이 대화 전부가 담당자 개인 폰 안에만 쌓인다.',
        interact: '다음 →',
        feel: ['회사는 이 대화의 존재조차 모른다'],
        connect: ['→ 페인포인트 정리'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgArena: arenaState(4, true),
      memo: {
        title: 'STATE 2 — 사각지대 인지',
        meta: '신 0 · 페인포인트',
        situation:
          '이 단톡방 어디에도 회사는 없다. 관리자 확인 불가 · 퇴사 시 증발 · 집계 불가 — 세 가지가 팝업으로 정면 제시된다.',
        interact: '다음 → (신 1 채널 전환으로)',
        feel: ['"편한 카톡을 못 쓰게 하자는 게 아닙니다. 이 편의를 회사 자산으로 바꾸자는 것"'],
        connect: ['→ 신 1: 상담톡 채널 전환'],
      },
    },
  ],
  onComplete: { nextChapter: 1 },
};
