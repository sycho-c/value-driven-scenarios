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
 * 신 2. 한계·해결 — 상담톡 제약의 실시간 해결.
 * 단일 거래처(○○산업)의 두 담당자(이영업·박열정)가 하나의 단체 채널에서 대화하며
 * 카카오 상담톡 사양 제약 3가지(발신자 미표시·파일명 난수화·모바일 전송 끊김)가
 * 대화 흐름 안에서 순차로 드러나고 Cowork+가 실시간으로 해결한다.
 */

const PHONE_SCRIPT: MfgKakaoItem[] = [
  { id: 'p1', kind: 'message', senderId: 'kim', text: '내일 납기 건 수량 확인 부탁드립니다', time: '09:20' },
  { id: 'p2', kind: 'message', senderId: 'me', text: '이영업 대리님, 발주 확인했습니다. 납기 수량은 오후 3시까지 회신드리겠습니다', time: '09:21' },
  { id: 'p3', kind: 'file', senderId: 'park', text: '견적서 파일 전송', time: '09:23' },
  { id: 'p4', kind: 'message', senderId: 'me', text: '박열정 과장님, 견적서 잘 받았습니다. 단가 검토 후 회신드릴게요', time: '09:24' },
  { id: 'p5', kind: 'file', senderId: 'kim', text: '발주서 파일 전송', time: '09:26' },
  { id: 'p6', kind: 'message', senderId: 'me', text: '발주서 정상 수신했습니다. 바로 처리하겠습니다', time: '09:27' },
];

/** 단계 → 폰에 보이는 대본 줄 수 */
const PHONE_COUNT = [0, 1, 1, 2, 3, 3, 4, 5, 6] as const;

function phones(step: number): MfgPhoneDef[] {
  const items = feedUpTo(PHONE_SCRIPT, PHONE_COUNT[step]);
  const last = PHONE_COUNT[step] > 0 ? PHONE_SCRIPT[PHONE_COUNT[step] - 1] : undefined;
  return (
    [
      { id: 'b', ownerId: 'kim', ownerLabel: '○○산업 이영업 대리', color: '#E67E22' },
      { id: 'c', ownerId: 'park', ownerLabel: '○○산업 박열정 과장', color: '#D4537E' },
    ] as const
  ).map((p) => ({
    id: p.id,
    ownerId: p.ownerId,
    ownerLabel: p.ownerLabel,
    ownerSub: 'Cowork+ 상담톡',
    badge: 'vendor' as const,
    headerTitle: '○○산업 발주 협의방',
    headerCount: '3',
    channelTheme: true,
    items,
    highlight: last?.senderId === p.ownerId,
  }));
}

function wsMessages(step: number): MfgWsMessage[] {
  const messages: MfgWsMessage[] = [];

  // 왕복1 — 제약① 발신자 미표시 → 실명 복원
  if (step >= 1) {
    const fixed = step >= 2;
    messages.push({
      id: 'w1',
      kind: 'in',
      senderId: fixed ? 'kim' : undefined,
      senderLabel: fixed ? undefined : '알 수 없음',
      senderUnknown: !fixed,
      srcLabel: '상담톡 인입',
      text: '내일 납기 건 수량 확인 부탁드립니다',
      time: '09:20',
      badge: fixed
        ? { tone: 'fixed', text: '✓ 조직도 연동 실명 복원' }
        : { tone: 'raw', text: '✕ 발신자 미표시 (카카오 상담톡)' },
      isNew: step <= 2,
    });
  }
  if (step >= 3) {
    messages.push({
      id: 'w2',
      kind: 'out',
      senderId: 'me',
      text: '이영업 대리님, 발주 확인했습니다. 납기 수량은 오후 3시까지 회신드리겠습니다',
      time: '09:21',
      isNew: step === 3,
    });
  }

  // 왕복2 — 제약② 파일명 난수화 → 원본 복원
  if (step >= 4) {
    const fixed = step >= 5;
    messages.push({
      id: 'w3',
      kind: 'in',
      senderId: 'park',
      srcLabel: '상담톡 인입',
      time: '09:23',
      file: fixed
        ? { icon: '📄', name: '○○산업_견적서_0715.pdf', sub: '견적서 · 653KB', state: 'fixed' }
        : { icon: '📄', name: 'a8f3k29x1b.pdf', sub: '파일 · 무슨 문서인지 불명', state: 'raw' },
      badge: fixed
        ? { tone: 'fixed', text: '✓ 원본 파일명 복원 · 문서 식별' }
        : { tone: 'raw', text: '✕ 파일명 난수화 (카카오 spec)' },
      isNew: step === 4 || step === 5,
    });
  }
  if (step >= 6) {
    messages.push({
      id: 'w4',
      kind: 'out',
      senderId: 'me',
      text: '박열정 과장님, 견적서 잘 받았습니다. 단가 검토 후 회신드릴게요',
      time: '09:24',
      isNew: step === 6,
    });
  }

  // 왕복3 — 제약③ 모바일 전송 끊김 → 정상 공유
  if (step >= 7) {
    const fixed = step >= 8;
    messages.push({
      id: 'w5',
      kind: 'in',
      senderId: 'kim',
      srcLabel: '모바일',
      time: '09:26',
      file: fixed
        ? {
            icon: '📊',
            name: '발주서.xlsx',
            sub: '발주서 · 128KB',
            state: 'fixed',
            statusText: '✓ Cowork+ 채널로 정상 공유 · 즉시 다운로드',
            statusTone: 'ok',
            download: true,
          }
        : {
            icon: '⏳',
            name: '발주서.xlsx',
            sub: '모바일에서 전송 시도',
            state: 'raw',
            statusText: '✕ 전송 중… 원톡 환경에서 파일 흐름 끊김',
            statusTone: 'fail',
          },
      isNew: step === 7 || step === 8,
    });
  }
  if (step >= 8) {
    messages.push({
      id: 'w6',
      kind: 'out',
      senderId: 'me',
      text: '발주서 정상 수신했습니다. 바로 처리하겠습니다',
      time: '09:27',
      isNew: true,
    });
  }

  if (messages.length === 0) {
    messages.push({ id: 'sys0', kind: 'system', text: '○○산업 발주 협의방 — 단체 채널 대화를 시작하십시오' });
  }
  return messages;
}

function arenaAt(step: number): MfgArenaState {
  return {
    layout: 'split',
    phonesLabel: '📱 ○○산업 두 담당자의 폰 · 같은 단체 채널',
    phonesBadge: '제약 → 해결',
    actors: MFG_ACTORS,
    phones: phones(step),
    workspace: {
      role: 'br',
      headerTitle: '○○산업 발주 협의방 · 상담톡 채널',
      headerSub: '👥 이영업 대리 · 박열정 과장 · 나회사 담당자 — 단체 채널',
      rooms: [
        { id: 'b', name: '○○산업 발주팀', preview: '단체 채널 · 3명', color: '#E67E22', active: true },
        { id: 'c', name: '△△전선 구매팀', preview: '채널 입장함', color: '#27AE60' },
      ],
      messages: wsMessages(step),
    },
  };
}

const VALUE: MfgValueStripDef = {
  sell: '상담톡의 기업 통제 위에, Cowork+가 업무용 제약을 실시간 보완.',
  pain: '상담톡 제약: 발신자 미표시 · 파일명 난수화 · 모바일 파일공유 불가',
  roi: '파일 전송 오류 5월 9건 → 6월 1건 (6월분은 카카오 측 장애) [확정]',
};

export const chapter02LimitsSolved: Chapter = {
  id: 2,
  act: 3,
  title: '한계·해결 — 상담톡 제약의 실시간 해결',
  subtitle: '오픈 후 운영 초기 (제약 인지·개선) · 무대: 거래처 폰(단체 채널) + 워크스페이스',
  narration:
    '전환은 매끄럽지 않았습니다. 카카오 상담톡 사양에서 오는 제약이 실제로 존재했고, 그것을 하나씩 해결한 것이 제품 경쟁력입니다. 발신자 미표시 → 조직도 연동 실명 복원, 파일명 난수화 → 원본 파일명 복원, 모바일 전송 끊김 → 채널 정상 공유. 제약을 숨기지 않습니다. "카카오 사양의 한계를, 회사 통제 기능으로 메웁니다." 파일 오류는 5월 9건에서 6월 1건으로 줄었습니다.',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '○○산업 발주 협의방 — 하나의 단체 채널입니다. 왼쪽 두 폰은 이영업 대리·박열정 과장이 각자 자기 폰으로 이 방을 보는 화면입니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: '무대 — 단일 거래처 단체 채널',
        meta: '신 2 · 한계·해결',
        situation: '○○산업 두 담당자와 나회사 담당자가 같은 방에서 대화한다. 세 제약이 이 흐름 안에서 순차로 드러난다.',
        interact: '다음 → 제약① 발신자 미표시',
        feel: ['제약은 사고가 아니라 사양의 한계'],
        connect: ['→ 발주 인입'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: 'STATE 1 — 제약① 발신자 미표시',
        meta: '신 2',
        situation:
          '이영업 대리가 발주를 보낸다. 두 폰에 함께 뜨고 워크스페이스에 인입되지만, 카카오 상담톡은 발신자를 "알 수 없음"으로만 전달한다.',
        interact: '다음 → 실명 복원',
        feel: ['누구 요청인지 모르면 업무가 누락된다'],
        connect: ['→ 조직도 연동'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(2),
      memo: {
        title: '해결① — 조직도 연동 실명 복원',
        meta: '신 2',
        situation: 'Cowork+가 조직도와 연동해 "○○산업 이영업 대리"로 실명을 복원한다. 누구 요청인지 알고 응대한다.',
        interact: '다음 → 담당자 응대',
        feel: ['✓ 조직도 연동 실명 복원'],
        connect: ['→ 응대는 두 폰에 모두 전달'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(3),
      memo: {
        title: '담당자 응대 — 단체 채널 전달',
        meta: '신 2',
        situation: '나회사 담당자가 워크스페이스에서 직접 응대한다. 단체 채널이므로 두 사람 폰에 모두 전달된다.',
        interact: '다음 → 제약② 파일명 난수화',
        feel: ['워크스페이스에서 바로 응대'],
        connect: ['→ 견적서 인입'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(4),
      memo: {
        title: 'STATE 2 — 제약② 파일명 난수화',
        meta: '신 2',
        situation:
          '같은 방의 박열정 과장이 견적서를 올린다. 워크스페이스에 들어온 파일은 카카오 spec상 파일명이 난수(a8f3k29x1b.pdf)로 깨져 있다.',
        interact: '다음 → 원본 파일명 복원',
        feel: ['무슨 문서인지 식별 불가'],
        connect: ['→ 파일명 복원'],
      },
    },
    {
      index: 5,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(5),
      memo: {
        title: '해결② — 원본 파일명 복원',
        meta: '신 2',
        situation: 'Cowork+가 원본 파일명을 복원한다. "○○산업_견적서_0715.pdf"로 식별된다.',
        interact: '다음 → 담당자 응대',
        feel: ['✓ 원본 파일명 복원 · 문서 식별'],
        connect: ['→ 한 거래처 두 담당자를 한 방에서'],
      },
    },
    {
      index: 6,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(6),
      memo: {
        title: '담당자 응대 — 두 담당자를 한 방에서',
        meta: '신 2',
        situation: '나회사 담당자가 박열정 과장에게 응대한다. 한 거래처의 두 담당자를 한 방에서 함께 처리한다.',
        interact: '다음 → 제약③ 모바일 전송 끊김',
        feel: ['방 하나로 거래처 전체를 응대'],
        connect: ['→ 모바일 발주서 전송'],
      },
    },
    {
      index: 7,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(7),
      memo: {
        title: 'STATE 3 — 제약③ 모바일 전송 끊김',
        meta: '신 2',
        situation: '이영업 대리가 모바일에서 발주서를 보내려 하지만, 원톡 환경에서 전송이 끊긴다.',
        interact: '다음 → 정상 공유 해결',
        feel: ['✕ 전송 중… 파일 흐름 끊김'],
        connect: ['→ Cowork+ 채널 공유'],
      },
    },
    {
      index: 8,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgArena: arenaAt(8),
      memo: {
        title: '해결③ — 채널 정상 공유 · 세 제약 완결',
        meta: '신 2 · ROI',
        situation:
          'Cowork+ 채널로 발주서가 정상 공유되고 즉시 다운로드해 처리한다. 파일 전송 오류 5월 9건 → 6월 1건 [확정] (6월 1건은 카카오 측 장애).',
        interact: '다음 → (신 3 산업 적용으로)',
        feel: ['"제약을 해결한 것이 이 제품의 힘입니다"'],
        connect: ['→ 신 3: 공통 골격 위에 산업 슬롯'],
      },
    },
  ],
  onComplete: { nextChapter: 3 },
};
