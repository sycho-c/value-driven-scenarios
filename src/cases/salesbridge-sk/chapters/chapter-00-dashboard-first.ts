import type { Chapter } from '../../_types';
import { makeSkDashboard } from '../_shared';

/**
 * Ch.0 — 이것이 SK렌터카가 오늘 보고 있는 화면입니다 (결론 먼저).
 * 설명 없이 관리자 대시보드를 첫 장면으로 제시. 의사결정권자가 스스로 '저거 갖고 싶다'를 느끼게.
 */
export const chapter00DashboardFirst: Chapter = {
  id: 0,
  act: 1,
  title: '이것이 SK렌터카가 오늘 보고 있는 화면입니다',
  subtitle: '결론 먼저 — 의사결정권자의 첫 인상 · 설명 없이 화면만',
  narration:
    'SK렌터카 Cowork+ 관리자 대시보드. 오늘 접촉 8,423건, COSS 자동 적재율 94.2%, 자산화 갭 489건, 리스크 고객 1,204명 — 14,000명 영업사원의 오늘 활동이 한 화면에 있습니다. 영업사원은 아무 설명도 하지 않습니다. 의사결정권자가 스스로 "저게 뭐지, 저거 갖고 싶다"를 느끼는 순간이 이 챕터의 전부입니다.',
  stage: 'rentacar',
  states: [
    {
      index: 0,
      pauseAfterMs: 6000,
      revealRhythm: 'cinematic',
      guide:
        '설명 없이 대시보드만 켭니다. 오늘 접촉 현황·자산화·리스크가 한 화면에. 고객이 먼저 질문할 때까지 침묵하세요.',
      rentacarDashboard: makeSkDashboard({ activeTab: 'talk' }),
      memo: {
        title: 'STATE 0 — 결론 먼저, 침묵',
        meta: 'Ch.0 · 약 5분',
        situation:
          'SK렌터카가 실제로 오늘 보고 있는 관리자 대시보드를 첫 장면으로 제시. 영업사원은 화면을 켜고 아무 말도 하지 않는다.',
        interact: '관찰 STATE. 고객이 화면을 살펴보게 둔다. 다음 →',
        feel: ['"저게 뭐지?"', '"저거 갖고 싶다"'],
        connect: ['→ STATE 1 대시보드 탐색'],
      },
    },
    {
      index: 1,
      pauseAfterMs: 6000,
      revealRhythm: 'cinematic',
      guide:
        '의사결정권자가 직접 탭을 눌러 탐색. 리스크 현황 탭에서 퇴사 예정자 인수인계·이탈 위험 고객이 드릴다운됩니다.',
      rentacarDashboard: makeSkDashboard({ activeTab: 'risk' }),
      memo: {
        title: 'STATE 1 — 14,000명의 영업 대화 현황',
        meta: 'Ch.0',
        situation:
          '의사결정권자가 대시보드를 직접 탐색. 탭을 누르면 채널 분포·자산화 갭·전환율·리스크가 드릴다운된다. 모든 숫자가 실제 영업사원의 오늘 활동 데이터.',
        interact: '탭을 눌러 탐색. 다음 →',
        feel: ['"이 숫자가 전부 실제 영업 활동이라고?"'],
        connect: ['→ Ch.1 귀사는 지금 이 화면을 볼 수 있나요?'],
      },
    },
  ],
  onComplete: { nextChapter: 1, demoAutoAdvance: false },
};
