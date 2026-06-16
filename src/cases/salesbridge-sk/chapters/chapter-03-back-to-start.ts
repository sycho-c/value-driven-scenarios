import type { Chapter, RentacarDashboardState } from '../../_types';
import { makeSkDashboard } from '../_shared';

/** 자산화 현황 탭 강조 — 방금 만든 통화 데이터가 이 숫자 안에 포함됨. */
function assetHighlightDashboard(): RentacarDashboardState {
  const d = makeSkDashboard({ activeTab: 'asset' });
  if (d.assetGap) {
    d.assetGap = {
      ...d.assetGap,
      highlight: true,
      note: '오늘 발생 8,423건 중 7,934건 자동 적재 완료 — 방금 직접 테스트한 통화 1건도 이 숫자 안에 포함됩니다.',
    };
  }
  return d;
}

/**
 * Ch.3 — 다시 처음으로 (So What).
 * Ch.0에서 '뭐지?'였던 대시보드가 체험 후 '이렇게 만들어진 거구나'로 의미가 완성된다.
 * 마지막은 'SK렌터카' 자리에 '[귀사명]'이 들어갈 수 있다는 플레이스홀더 전환.
 */
export const chapter03BackToStart: Chapter = {
  id: 3,
  act: 3,
  title: '다시 처음으로',
  subtitle: 'So What — 처음과 같은 화면, 완전히 달라진 의미',
  narration:
    '처음에 봤던 대시보드로 돌아옵니다. Ch.0에서는 "뭐지?"였던 숫자가, 이제는 저 숫자 하나하나가 어떻게 만들어진 것인지 보입니다. 방금 직접 건 전화 한 통도 자산화 현황 숫자 안에 들어가 있습니다. 그리고 마지막 — SK렌터카 자리에 귀사 이름이 들어갈 수 있습니다.',
  stage: 'rentacar',
  states: [
    {
      index: 0,
      pauseAfterMs: 6000,
      revealRhythm: 'cinematic',
      guide: 'Ch.0과 정확히 동일한 대시보드. 단, 이제는 저 숫자가 어떻게 만들어진 건지 보입니다. 설명 없이.',
      rentacarDashboard: makeSkDashboard({ activeTab: 'talk' }),
      memo: {
        title: 'STATE 0 — 같은 화면, 다른 의미',
        meta: 'Ch.3',
        situation: 'Ch.0과 동일한 대시보드를 다시 본다. 영업사원은 아무 말도 하지 않는다. 의미만 완전히 달라졌다.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"Ch.0에선 \'뭐지?\'였는데, 지금은 보인다"'],
        connect: ['→ STATE 1 자산화 현황'],
      },
    },
    {
      index: 1,
      pauseAfterMs: 6000,
      guide: '자산화 현황 탭. 오늘 발생 대화 → COSS 적재 완료. 방금 자신이 테스트한 통화 건이 이 숫자 안에 포함되어 있습니다.',
      rentacarDashboard: assetHighlightDashboard(),
      memo: {
        title: 'STATE 1 ⚡ — 내 통화가 저 숫자 안에',
        meta: 'Ch.3',
        situation: 'Ch.2에서 방금 만들어진 데이터가 자산화 현황 숫자 안에 포함되어 있음을 확인. 데모가 실제 시스템임을 증명.',
        interact: '자산화 현황 탭 확인. 다음 →',
        feel: ['"내가 방금 건 전화가 저 숫자 안에 있다"'],
        connect: ['→ STATE 2 귀사명 플레이스홀더'],
      },
    },
    {
      index: 2,
      pauseAfterMs: 8000,
      revealRhythm: 'cinematic',
      guide: "'SK렌터카' 라벨이 '[귀사명]' 입력 필드로 전환됩니다. 이 자리에 귀사 이름이 들어갈 수 있습니다.",
      rentacarDashboard: makeSkDashboard({ activeTab: 'risk', companyPlaceholder: '[귀사명]' }),
      takeover: {
        tone: 'brand',
        eyebrow: '데모 마감 · So What',
        headline: '"이제 저 숫자가 무엇인지 보입니다.\n이 자리에 귀사 이름이 들어갈 수 있습니다."',
        sub: '결론 먼저 → 역질문 → 체험 → 다시 첫 화면으로. 처음과 같은 화면, 완전히 달라진 의미.',
        ctaLabel: '시연 완주 →',
      },
      memo: {
        title: 'STATE 2 — 귀사명 플레이스홀더',
        meta: 'Ch.3 · 신규 제작 · 마감',
        situation:
          "대시보드의 'SK렌터카' 라벨이 '[귀사명]' 플레이스홀더로 전환. 영업 현장에서 실시간으로 고객사 이름을 넣을 수 있다.",
        interact: '시연 완주. ← 키로 STATE 탐색 가능.',
        feel: ['★ "SK렌터카 자리에 우리 이름이 들어갈 수 있다"'],
        connect: ['시연 완주 → 후속 미팅'],
      },
    },
  ],
  onComplete: { demoAutoAdvance: false },
};
