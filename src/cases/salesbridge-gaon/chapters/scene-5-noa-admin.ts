import type {
  Chapter,
  ChapterStateNode,
  NoaAdminPanel,
  NoaConversationCardDef,
  NoaHeatmapCell,
  PartnerListItem,
} from '../../_types';

const CLOCK_DATE = '2026-05-20 (수)';

const PARTNERS_FULL: PartnerListItem[] = [
  { id: 'hanjin', label: '한진전기', sub: '리스크 1순위', status: 'live' },
  { id: 'sungjin', label: '성진전기', status: 'live' },
  { id: 'woojin', label: '우진전기', status: 'live' },
  { id: 'dongseung', label: '동승전기', status: 'live' },
];

const HEATMAP_PARTNERS = [
  { id: 'dongseung', label: '동승전기' },
  { id: 'sungjin', label: '성진전기' },
  { id: 'woojin', label: '우진전기' },
  { id: 'hanjin', label: '한진전기' },
];

const HEATMAP_RISKS = [
  { id: 'complaint', label: '고객불만' },
  { id: 'urgent', label: '긴급요청' },
  { id: 'delay', label: '지연가능성' },
  { id: 'compliance', label: '준수위반' },
  { id: 'quality', label: '품질오류' },
];

const HEATMAP_CELLS: NoaHeatmapCell[] = [
  // 동승
  { partnerId: 'dongseung', riskId: 'complaint', value: 12, tone: 'lv2' },
  { partnerId: 'dongseung', riskId: 'urgent', value: 48, tone: 'lv4' },
  { partnerId: 'dongseung', riskId: 'delay', value: 18, tone: 'lv2' },
  { partnerId: 'dongseung', riskId: 'compliance', value: 9, tone: 'lv1' },
  { partnerId: 'dongseung', riskId: 'quality', value: 14, tone: 'lv2' },
  // 성진
  { partnerId: 'sungjin', riskId: 'complaint', value: 19, tone: 'lv3' },
  { partnerId: 'sungjin', riskId: 'urgent', value: 44, tone: 'lv4' },
  { partnerId: 'sungjin', riskId: 'delay', value: 22, tone: 'lv3' },
  { partnerId: 'sungjin', riskId: 'compliance', value: 11, tone: 'lv2' },
  { partnerId: 'sungjin', riskId: 'quality', value: 16, tone: 'lv2' },
  // 우진
  { partnerId: 'woojin', riskId: 'complaint', value: 8, tone: 'lv1' },
  { partnerId: 'woojin', riskId: 'urgent', value: 21, tone: 'lv3' },
  { partnerId: 'woojin', riskId: 'delay', value: 25, tone: 'lv3' },
  { partnerId: 'woojin', riskId: 'compliance', value: 6, tone: 'lv1' },
  { partnerId: 'woojin', riskId: 'quality', value: 12, tone: 'lv2' },
  // 한진 (target)
  { partnerId: 'hanjin', riskId: 'complaint', value: 22, tone: 'lv3' },
  { partnerId: 'hanjin', riskId: 'urgent', value: 36, tone: 'lv4' },
  { partnerId: 'hanjin', riskId: 'delay', value: 50, tone: 'lv5' },
  { partnerId: 'hanjin', riskId: 'compliance', value: 14, tone: 'lv2' },
  { partnerId: 'hanjin', riskId: 'quality', value: 18, tone: 'lv3' },
];

const HEATMAP_CELLS_TARGETED: NoaHeatmapCell[] = HEATMAP_CELLS.map((c) =>
  c.partnerId === 'hanjin' && c.riskId === 'delay' ? { ...c, pulse: true } : c,
);

const TOP5 = [
  { rank: 1, label: '한진전기 × 지연 가능성', delta: '+37% ▲', highlight: true },
  { rank: 2, label: '동승전기 × 긴급 요청', delta: '+22% ▲' },
  { rank: 3, label: '성진전기 × 긴급 요청', delta: '+18% ▲' },
  { rank: 4, label: '한진전기 × 긴급 요청', delta: '+14% ▲' },
  { rank: 5, label: '성진전기 × 고객 불만', delta: '+11% ▲' },
];

const TREEMAP = [
  { id: 'hanjin-delay', label: '한진전기 / 지연', value: 50, tone: 'lv5' as const },
  { id: 'dongseung-urgent', label: '동승전기 / 긴급', value: 48, tone: 'lv4' as const },
  { id: 'sungjin-urgent', label: '성진전기 / 긴급', value: 44, tone: 'lv3' as const },
];

const HANJIN_CARD: NoaConversationCardDef = {
  partnerLabel: '한진전기',
  convId: 'CONV-HANJIN-0520',
  summary:
    '지연·재촉 메시지 50건 분석. 한진전기와 가온 BR 사이 응대 톤이 단답형으로 굳어진 패턴. 신규 담당자의 소통 방식이 거래처 기대와 어긋남.',
  coreInsight:
    '단순 물량 이슈가 아닌, 신규 담당자와의 소통 방식 차이로 인한 병목 현상 감지.',
  riskCause: '개인 응대 불만형 — 신입 BR의 단답형 응대가 거래처 기대를 충족하지 못함.',
  actionTitle: '[한진전기 전용 답변 톤 교정 모드] 활성화',
  actionDesc:
    '한진전기 응대 시 BR에게 가이드 자동 노출: "지연 사유 + 예상 일정 + 다음 step" 3단 응답 강제 + 지연 안내 템플릿 추천.',
  actionCtaLabel: '해결책 즉시 적용하기',
};

function makeNoaPanel(opts: {
  highlightTarget?: boolean;
  conversationVisible?: boolean;
  conversationApplied?: boolean;
  successToast?: string;
}): NoaAdminPanel {
  return {
    title: 'NOA Admin — 통합 리스크 분석',
    subtitle: '2024.02 ~ 2026.05 · 거래처 10개사 · 56,896문장 분석',
    partners: HEATMAP_PARTNERS,
    risks: HEATMAP_RISKS,
    cells: opts.highlightTarget ? HEATMAP_CELLS_TARGETED : HEATMAP_CELLS,
    treemap: TREEMAP,
    top5: TOP5,
    conversationCard: {
      ...HANJIN_CARD,
      actionApplied: opts.conversationApplied,
    },
    conversationCardVisible: opts.conversationVisible,
    successToast: opts.successToast,
  };
}

function makeState(index: number, opts: Partial<ChapterStateNode>): ChapterStateNode {
  return {
    index,
    pauseAfterMs: 5500,
    revealRhythm: 'natural',
    ...opts,
  };
}

export const scene5NoaAdmin: Chapter = {
  id: 5,
  act: 4,
  title: '그럼에도 분석이 곧 개선이 된다',
  subtitle: '이윤 팀장 PC · NOA Admin 히트맵 → AI 대화 분석 → Action Item',
  narration:
    '도입 2개월 후, 데이터가 쌓였습니다. 이윤 팀장이 NOA Admin에 접속하면 거래처 × 리스크 유형 히트맵이 펼쳐집니다. 시스템이 한진전기 × 지연 가능성 50건 (+37% ▲)을 1순위로 짚어내고, 클릭하면 단순 통계가 아니라 원인 + 즉시 실행할 Action Item까지 제시합니다. 분석만 하는 SaaS가 아니라 개선까지 가는 컨설팅 파트너.',
  stage: 'salesbridge-workspace',
  states: [
    // STATE 0 — Admin 진입, 히트맵 로드
    makeState(0, {
      activeCastId: 'lee-team',
      guide: '이윤 팀장이 NOA Admin에 진입. 거래처 × 리스크 유형 히트맵이 자동으로 그려집니다.',
      salesbridge: {
        clockTime: '11:08',
        clockDate: CLOCK_DATE,
        topBanner: '✨ NOA Admin — 통합 리스크 분석',
        topMeta: '이윤 팀장 PC · 2024.02 ~ 2026.05 데이터',
        partnerList: PARTNERS_FULL,
        mainContent: { kind: 'noa-admin' },
        noaAdmin: makeNoaPanel({}),
        badgeMessage: 'NOA Admin · 분석 로드 완료',
      },
      memo: {
        title: 'STATE 1 — NOA Admin 진입',
        meta: '11:08 · 5월 중순',
        situation:
          '도입 2개월 후 쌓인 56,896문장이 한 화면에 시각화. 히트맵(파트너 × 리스크) + 트리맵(비중) + TOP 5.',
        interact: '관찰 STATE. 다음 → 리스크 포착.',
        feel: ['"개별 카톡방에 흩어진 위험 신호가 한 화면에 모인다"'],
        connect: ['→ STATE 2 한진전기 리스크 포착'],
      },
    }),

    // STATE 1 — 한진전기 리스크 포착 (펄스)
    makeState(1, {
      pauseAfterMs: 5500,
      advanceOn: [{ target: 'noa:cell:hanjin__delay', nextStateIndex: 2 }],
      guideTooltip: {
        target: 'noa:cell:hanjin__delay',
        text: '한진전기 × 지연 가능성 셀을 클릭 (펄스)',
      },
      activeCastId: 'lee-team',
      guide:
        '한진전기 × 지연 가능성 50건 (전월 대비 +37% ▲). 가장 시급한 문제로 펄스. 셀 클릭으로 진입.',
      salesbridge: {
        clockTime: '11:09',
        clockDate: CLOCK_DATE,
        topBanner: '🔥 리스크 포착 — 한진전기 × 지연 가능성',
        topMeta: '50건 · 전월 대비 +37% ▲',
        partnerList: PARTNERS_FULL.map((p) =>
          p.id === 'hanjin' ? { ...p, pulse: true, badge: 50 } : p,
        ),
        mainContent: { kind: 'noa-admin' },
        noaAdmin: makeNoaPanel({ highlightTarget: true }),
        badgeMessage: '리스크 펄스 — 클릭 대기',
      },
      memo: {
        title: 'STATE 2 — 리스크 포착',
        meta: '11:09',
        situation:
          '한진전기 × 지연 가능성 50건이 보라색 lv5로 펄스. TOP 5 리스트 1위로 동시 강조.',
        interact: '펄스 셀 클릭 → 대화 분석 카드.',
        feel: ['"숫자만 보여주는 분석 도구는 많은데, 어디를 봐야 할지 짚어준다"'],
        connect: ['→ STATE 3 AI 대화 분석 카드'],
      },
    }),

    // STATE 2 — AI 대화 분석 카드
    makeState(2, {
      pauseAfterMs: 7000,
      revealRhythm: 'cinematic',
      advanceOn: [{ target: 'noa:action-apply', nextStateIndex: 3 }],
      activeCastId: 'lee-team',
      guide:
        '대화 분석 카드 자동 팝업. 요약 + 핵심 인사이트 + 원인 + Action Item. 단순 통계가 아니라 컨설팅.',
      salesbridge: {
        clockTime: '11:11',
        clockDate: CLOCK_DATE,
        topBanner: '✨ AI 대화 분석 — 한진전기',
        topMeta: '대화 50건 → 원인 + 즉시 실행 Action Item',
        partnerList: PARTNERS_FULL,
        mainContent: { kind: 'noa-admin' },
        noaAdmin: makeNoaPanel({
          highlightTarget: true,
          conversationVisible: true,
        }),
        badgeMessage: '대화 분석 진행 중',
      },
      memo: {
        title: 'STATE 3 — AI 대화 분석',
        meta: '11:11',
        situation:
          '"단순 물량 이슈가 아닌, 신규 담당자와의 소통 방식 차이로 인한 병목 현상 감지." — AI가 대화 이면의 진짜 원인을 짚는다.',
        interact: '[해결책 즉시 적용하기] 버튼 클릭 → STATE 4.',
        feel: [
          '"숫자 뒤에 원인까지 풀어주는 게 진짜 컨설팅"',
          '"신입 BR의 단답형 응대 — 사람은 모르고 시스템만 안다"',
        ],
        connect: ['→ STATE 4 즉시 개선 적용'],
      },
    }),

    // STATE 3 — Action Item 적용 완료
    makeState(3, {
      pauseAfterMs: 7000,
      revealRhythm: 'cinematic',
      activeCastId: 'lee-team',
      guide:
        '팀장이 클릭 한 번으로 개선안 승인. 강승희 사원에게 답변 톤 교정 가이드가 즉시 전달.',
      salesbridge: {
        clockTime: '11:12',
        clockDate: CLOCK_DATE,
        topBanner: '🚀 즉시 개선 — 한진전기 답변 톤 교정 모드 활성화',
        topMeta: '분석 → 개선. 강승희 사원에게 가이드 자동 전달',
        partnerList: PARTNERS_FULL,
        mainContent: { kind: 'noa-admin' },
        noaAdmin: makeNoaPanel({
          highlightTarget: true,
          conversationVisible: true,
          conversationApplied: true,
          successToast: '강승희 사원에게 [한진전기 답변 톤 교정 가이드] 전달 완료',
        }),
        badgeMessage: '✓ Action Item 적용 완료',
      },
      memo: {
        title: 'STATE 4 — 즉시 개선',
        meta: '11:12',
        situation:
          '팀장이 클릭 한 번으로 개선안을 승인. 강승희 사원에게 즉시 가이드가 전달되며 분석이 실무 개선으로 이어진다.',
        interact: '챕터 종료 → SCENE 6 (영업 본부장 대시보드).',
        feel: ['"분석만 하는 SaaS가 아니라 개선까지 가는 컨설팅"', '★ "분석 = 개선"'],
        connect: ['→ SCENE 6 (보이지 않던 것이 보인다)'],
      },
    }),
  ],
  onComplete: { nextChapter: 6, demoAutoAdvance: false },
};
