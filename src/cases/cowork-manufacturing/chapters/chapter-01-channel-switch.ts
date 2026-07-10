import type {
  Chapter,
  MfgArenaState,
  MfgKakaoItem,
  MfgPhoneDef,
  MfgWorkspaceDef,
  MfgWsMessage,
  MfgValueStripDef,
} from '../../_types';
import { MFG_ACTORS } from '../_shared';

/**
 * 신 1. 채널 전환 — 상담톡 초대에서 인입까지.
 * 관리자가 상담톡 채널을 만들고 두 거래처를 동시 초대 → 인증 입장 → 대화 인입.
 * 거래처는 쓰던 카톡 그대로, 회사는 워크스페이스에서 실시간 열람.
 */

type Step = 0 | 1 | 2 | 3 | 4;

function vendorPhone(
  id: 'b' | 'c',
  step: Step,
): MfgPhoneDef {
  const isB = id === 'b';
  const vendorName = isB ? '○○산업' : '△△전선';
  const ownerId = isB ? 'kim' : 'choi';

  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '오늘' }];
  if (step === 1) {
    items.push({
      id: 'invite',
      kind: 'invite',
      inviteVendor: vendorName,
      inviteChannel: 'Cowork+ 발주 협의방',
      isNew: true,
    });
  }
  if (step >= 2) {
    items.push({ id: 'joined', kind: 'joined', text: '✓ 인증 완료 · 채널 입장', isNew: step === 2 });
  }
  if (step >= 3 && isB) {
    items.push({
      id: 'msg1',
      kind: 'message',
      senderId: 'kim',
      text: '내일 납기 건 수량 확인 부탁드립니다',
      time: '09:20',
      isNew: step === 3,
    });
  }

  return {
    id,
    ownerId,
    ownerLabel: isB ? '○○산업 이영업 대리' : '△△전선 최구매 차장',
    ownerSub: step >= 2 ? 'Cowork+ 상담톡' : '카카오톡 알림',
    badge: step >= 2 ? 'channel' : 'vendor',
    headerTitle: step >= 2 ? '발주 협의방' : '알림',
    headerCount: step >= 2 ? '기업채널' : undefined,
    channelTheme: step >= 2,
    screen: step >= 2 ? 'chat' : 'alert-list',
    statusTime: '09:20',
    items,
    highlight: (step === 1 && true) || (step === 3 && isB),
  };
}

function wsAt(step: Step): MfgWorkspaceDef {
  const messages: MfgWsMessage[] = [];
  if (step === 0) {
    messages.push({ id: 'sys0', kind: 'system', text: '상담톡 채널 개설됨 — 거래처를 초대하십시오' });
  }
  if (step >= 1) {
    messages.push(
      { id: 'inv1', kind: 'system', text: '관리자 → ○○산업 채널 초대 발송', isNew: step === 1 },
      { id: 'inv2', kind: 'system', text: '관리자 → △△전선 채널 초대 발송', isNew: step === 1 },
    );
  }
  if (step >= 3) {
    messages.push({
      id: 'in1',
      kind: 'in',
      senderId: 'kim',
      srcLabel: '상담톡 채널',
      text: '내일 납기 건 수량 확인 부탁드립니다',
      time: '오전 9:20',
      metaText: '✓ 자산화됨',
      isNew: step === 3,
    });
  }
  if (step >= 4) {
    messages.push({
      id: 'sys55',
      kind: 'system-hi',
      text: '＋ 외 55개 거래처가 동일 방식으로 초대·인증 후 상담톡 채널에 연결됨 (대화방 34개 개설 · 10개 가동)',
      isNew: true,
    });
  }

  return {
    role: 'br',
    headerTitle: '대외 업무 채널',
    headerSub: '상담톡(기업계정) 기반',
    rooms:
      step >= 2
        ? [
            { id: 'b', name: '○○산업 발주팀', preview: step >= 3 ? '내일 납기 건 수량 확인…' : '채널 입장함', color: '#E67E22', active: true },
            { id: 'c', name: '△△전선 구매팀', preview: '채널 입장함', color: '#27AE60' },
          ]
        : [],
    roomCount: step >= 4 ? '· 57' : undefined,
    sideNote: step >= 4 ? '초대·인증 통제 → 회사 자산화' : undefined,
    messages,
  };
}

function arenaAt(step: Step): MfgArenaState {
  return {
    layout: 'split',
    phonesLabel: '📱 초대받는 거래처 폰',
    phonesBadge: '상담톡 전환',
    actors: MFG_ACTORS,
    phones: [vendorPhone('b', step), vendorPhone('c', step)],
    moreSlot: { title: '외 55개 거래처', sub: '거래처 57개 · 거래처 직원 138명 [확정]' },
    workspace: wsAt(step),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '회사가 채널을 만들고 초대. 인증 안 된 사람·퇴사자는 입장 불가.',
  pain: '해결: 관리자 확인 불가 → 통합 조회 · 퇴사 시 증발 → 회사 자산화 · 집계 불가 → 데이터 대시보드',
  roi: '거래처 57개 · 직원 138명 · 대화방 34개 개설 / 10개 가동 [확정]',
};

export const chapter01ChannelSwitch: Chapter = {
  id: 1,
  act: 3,
  title: '채널 전환 — 상담톡 초대에서 인입까지',
  subtitle: '채널 전환 시점 (상담톡 기반 오픈) · 무대: 거래처 폰 + 회사 워크스페이스',
  narration:
    '카카오 상담톡은 개인이 아니라 기업 기준의 채널입니다. 관리자가 채널을 만들고 거래처를 초대하면, 인증한 거래처만 입장하고 대화는 곧바로 회사 데이터가 됩니다. 거래처는 쓰던 카톡 환경 그대로 대화하되, 회사는 그 대화를 워크스페이스에서 실시간으로 봅니다. "카톡을 그대로 쓰면서도, 회사가 소통을 들여다보기 시작합니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      guide:
        '담당자와 관리자는 이제 우측 Cowork+ 워크스페이스에서 일합니다. 좌측엔 초대받을 거래처 폰만 남습니다.',
      mfgArena: arenaAt(0),
      memo: {
        title: 'STATE 1 — 상담톡 채널 개설',
        meta: '신 1 · 채널 전환',
        situation: '개인 카톡 단톡방 대신, 회사가 만든 상담톡 채널이 무대가 된다. 워크스페이스는 아직 비어 있다.',
        interact: '다음 → 두 거래처 동시 초대',
        feel: ['채널의 주인이 개인에서 회사로 바뀐다'],
        connect: ['→ 알림톡 초대장 발송'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4500,
      mfgArena: arenaAt(1),
      memo: {
        title: '두 거래처 동시 초대',
        meta: '신 1',
        situation: '관리자가 ○○산업·△△전선을 동시에 초대한다. 두 거래처 폰에 카카오 알림톡 초대장이 함께 도착한다.',
        interact: '다음 → 인증 입장',
        feel: ['조직도 인증 후 자동 입장 · 미인가자·퇴사자 자동 차단'],
        connect: ['→ 입장과 동시에 방 생성'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(2),
      memo: {
        title: 'STATE 2 — 인입 및 방 생성',
        meta: '신 1',
        situation:
          '두 거래처가 각자 인증하고 입장한다. 워크스페이스에 대화방 2개가 생성된다. 인증 안 된 사람·퇴사자는 못 들어온다.',
        interact: '다음 → 거래처 발주',
        feel: ['입장 절차 자체가 통제의 시작'],
        connect: ['→ 대화 인입'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      pauseAfterMs: 4000,
      mfgArena: arenaAt(3),
      memo: {
        title: '대화가 회사로 인입된다',
        meta: '신 1',
        situation:
          '거래처가 채널에서 발주를 보낸다. 이 대화는 담당자 개인 폰이 아니라 회사 워크스페이스에 실시간으로 쌓인다.',
        interact: '다음 → 57개 거래처로 확장',
        feel: ['"담당자가 바뀌어도, 퇴사해도, 이 대화는 회사에 남습니다"'],
        connect: ['→ 전체 거래처 연결'],
      },
    },
    {
      index: 4,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5000,
      mfgArena: arenaAt(4),
      memo: {
        title: '외 55개 거래처 — 같은 절차로 통합',
        meta: '신 1 · ROI',
        situation:
          '폰 2개는 예시일 뿐. 실제로는 거래처 57개가 같은 초대·인증 절차로 한 곳에 통합된다. 대화방 34개 개설 · 10개 가동 [확정].',
        interact: '다음 → (신 2 한계·해결로)',
        feel: ['전환 비용 없이 관리가 시작된다'],
        connect: ['→ 신 2: 전환 과정의 실제 제약과 해결'],
      },
    },
  ],
  onComplete: { nextChapter: 2 },
};
