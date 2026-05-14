import type {
  Chapter,
  ChapterStateNode,
  ExecDashboardPanel,
  ExecPdfDoc,
  ExecPriorityItem,
  PartnerListItem,
  RadarAxis,
} from '../../_types';

const CLOCK_DATE = '2026-05-29 (금)';

const PARTNERS_FULL: PartnerListItem[] = [
  { id: 'all', label: '전사 57개 거래처', sub: '활성 34개 · 리스크 8개', status: 'live' },
];

const RADAR: RadarAxis[] = [
  { id: 'comm', label: '소통 밀도', value: 84 },
  { id: 'order', label: '발주 안정성', value: 76 },
  { id: 'compliance', label: '컴플라이언스', value: 58 },
  { id: 'bizform', label: '비즈폼 활용도', value: 72 },
  { id: 'defense', label: '클레임 방어', value: 88 },
];

const PRIORITIES: ExecPriorityItem[] = [
  {
    rank: 1,
    title: '긴급 발주 시 표준 프로세스 우회 패턴',
    tagLabel: '매출 위험',
    tagTone: 'danger',
    body:
      '성진전기·동승전기 등 3개사에서 긴급 발주 시 비즈폼을 건너뛰고 카톡 1:1로 우회하는 패턴 누적. 컴플라이언스 준수율 전월 대비 12% 하락.',
    highlight: true,
  },
  {
    rank: 2,
    title: '특정 품목(CV-A001) 반복적 납기 재촉',
    tagLabel: '운영 병목',
    tagTone: 'warn',
    body:
      'CV-A001 발주 후 평균 2.3일 안에 거래처가 재촉 메시지를 보내는 패턴. 공장 일정 사전 안내 부재.',
  },
  {
    rank: 3,
    title: '신입 BR 단답형 응대로 인한 거래처 불만',
    tagLabel: '품질 통제',
    tagTone: 'brand',
    body:
      '신입 BR 3명의 단답형 응대가 한진전기 등 일부 거래처 불만 누적의 원인. SCENE 5의 답변 톤 교정 모드 활성화로 후속 조치 진행 중.',
  },
];

const SUMMARY = [
  { label: '관리 거래처', value: '57개', sub: '활성 34개 · 휴면 23개' },
  { label: '활성 비중', value: '60%', sub: '전월 대비 +4%p' },
  { label: '리스크 감지', value: '8건', sub: '매출 위험 1 · 운영 3', danger: true },
  { label: 'Healthy 비율', value: '42%', sub: '5축 평균 70+ 기준' },
];

const PDF_DOC: ExecPdfDoc = {
  title: '통합 영업 리스크 브리핑 (2026.05)',
  subtitle: '가온전선 영업본부 · NOA 통합 인사이트 리포트',
  meta: '작성자: 영업지원팀 이윤 팀장 · 분석 엔진: NOA GPT-5.4-mini · 기간 2024.02 ~ 2026.05',
  insights: [
    {
      label: 'INSIGHT 01 · 프로세스 이탈에 따른 수익성 저해',
      quote:
        '"긴급 발주 시 비즈폼을 우회하는 패턴이 컴플라이언스 준수율 12% 하락 + 단가 정책 리스크의 핵심 원인."',
      action:
        '성진전기 등 3개사 대화방에 AI 컴플라이언스 체크 모드 강제 활성화 (조치 완료)',
    },
    {
      label: 'INSIGHT 02 · 납기 가시성 부재로 인한 반복 재촉',
      quote:
        '"CV-A001 품목 발주 후 평균 2.3일 안에 거래처가 재촉. 공장 일정 사전 안내 템플릿 부재가 핵심."',
      action:
        '거래처 발주 시 공장 일정 사전 안내 자동 템플릿 적용 (강승희 사원 외 BR 2인에게 가이드 전달)',
    },
    {
      label: 'INSIGHT 03 · 신입 BR 응대 품질 격차',
      quote:
        '"신입 BR 3명 평균 응대 점수 65점 · 전체 평균 82점과 17점 격차. 한진전기 등 불만형 거래처 누적."',
      action:
        '한진전기 등 답변 톤 교정 모드 활성화 (SCENE 5 후속) · 월간 1회 BR 응대 코칭 자동 발송',
    },
  ],
  qaTitle: '조직 응대 품질 (AI QA 전수조사)',
  qaBullets: [
    '전체 응대 평균 82점 (5월) — 전월 대비 +3점',
    '강승희 사원 92점 — 영업지원팀 최우수',
    '신입 BR 3인 평균 65점 — 응대 톤 교정 모드 활성화 중',
    '거래처 불만형 응대 8건 → 자동 코칭 + 템플릿 전달',
  ],
  footer: '— GAON CABLE Cowork+ NOA Insight Report —',
};

function makeExecPanel(opts: {
  pdfButtonPulse?: boolean;
  pdfModalVisible?: boolean;
}): ExecDashboardPanel {
  return {
    title: '영업 본부장 · 통합 인사이트',
    subtitle: 'B2B 파트너 통합 건강도 진단 · 2026.05 종합',
    summary: SUMMARY,
    radar: RADAR,
    radarNote: '전월 대비 컴플라이언스 준수율 12% 하락 감지',
    priorities: PRIORITIES,
    pdfButtonPulse: opts.pdfButtonPulse,
    pdfModalVisible: opts.pdfModalVisible,
    pdfDoc: PDF_DOC,
  };
}

function makeState(index: number, opts: Partial<ChapterStateNode>): ChapterStateNode {
  return {
    index,
    pauseAfterMs: 6000,
    revealRhythm: 'cinematic',
    ...opts,
  };
}

export const scene6Executive: Chapter = {
  id: 6,
  act: 4,
  title: '그럼에도 보이지 않던 것이 보인다',
  subtitle: '영업 본부장 PC · 5축 레이더 → 우선순위 → PDF 브리핑',
  narration:
    '5월 말. 영업 본부장 PC. 한 달간의 영업 지원 성과가 5축 레이더 차트로 그려집니다. 소통 밀도 · 발주 안정성 · 컴플라이언스 · 비즈폼 활용도 · 클레임 방어. 시스템은 "긴급 발주 시 표준 프로세스 우회 패턴"을 매출 위험 1순위로 짚어내고, 클릭 한 번에 본부장 브리핑 PDF가 생성됩니다. 수만 건의 대화가 휘발되는 비용이 아니라 매출을 지키는 경영 자산이 됩니다.',
  stage: 'salesbridge-workspace',
  states: [
    // STATE 0 — 대시보드 진입, 레이더 그리기
    makeState(0, {
      pauseAfterMs: 5500,
      activeCastId: 'boss',
      guide:
        '영업 본부장이 통합 인사이트 대시보드에 진입. 5축 레이더 차트가 자동으로 그려집니다.',
      salesbridge: {
        clockTime: '15:08',
        clockDate: CLOCK_DATE,
        topBanner: '📊 통합 인사이트 — 영업 본부장 대시보드',
        topMeta: '57개 거래처 · 5축 건강도 자동 진단',
        partnerList: PARTNERS_FULL,
        mainContent: { kind: 'exec-dashboard' },
        execDashboard: makeExecPanel({}),
        badgeMessage: '통합 인사이트 로드 완료',
      },
      memo: {
        title: 'STATE 1 — 통합 인사이트 진입',
        meta: '15:08 · 5월 말',
        situation:
          '본부장이 한 달간 영업 지원 성과를 종합 보고하기 위해 전사 통합 대시보드를 엽니다. 레이더 차트가 57개 거래처의 영업 건강도를 그려냅니다.',
        interact: '관찰 STATE. 다음 →',
        feel: ['"한 화면에 5축으로 영업 건강도가 정리된다"'],
        connect: ['→ STATE 2 매출 리스크 패턴'],
      },
    }),

    // STATE 1 — 우선순위 패턴 강조
    makeState(1, {
      pauseAfterMs: 6000,
      activeCastId: 'boss',
      guide:
        'PRIORITY 01 — 긴급 발주 시 표준 프로세스 우회 패턴이 매출 위험 1순위로 강조. 본부장이 클릭 한 번으로 진단을 받습니다.',
      salesbridge: {
        clockTime: '15:09',
        clockDate: CLOCK_DATE,
        topBanner: '🔥 매출 리스크 패턴 — PRIORITY 01',
        topMeta: '긴급 발주 시 표준 프로세스 우회 — 컴플라이언스 12% 하락',
        partnerList: PARTNERS_FULL,
        mainContent: { kind: 'exec-dashboard' },
        execDashboard: makeExecPanel({}),
        badgeMessage: '우선순위 패턴 강조',
      },
      memo: {
        title: 'STATE 2 — 매출 리스크 패턴',
        meta: '15:09',
        situation:
          'AI가 "보이지 않던" 비즈니스 병목을 찾아냅니다. 긴급 발주 시 규정을 어기는 패턴이 매출 손실 위험 1순위로 보고됩니다.',
        interact: '관찰 STATE. 다음 → PDF 추출.',
        feel: ['"숫자 너머의 패턴 — 사람이 한 달 데이터를 읽어도 못 짚는 부분"'],
        connect: ['→ STATE 3 리포트 자동 생성'],
      },
    }),

    // STATE 2 — PDF 버튼 펄스
    makeState(2, {
      pauseAfterMs: 5500,
      advanceOn: [{ target: 'exec:pdf-export', nextStateIndex: 3 }],
      guideTooltip: { target: 'exec:pdf-export', text: '본부장 브리핑 PDF 추출 클릭' },
      activeCastId: 'boss',
      guide:
        '우상단 [📄 본부장 브리핑 PDF 추출] 버튼이 펄스. 클릭하면 본부장용 브리핑 문서가 자동 완성됩니다.',
      salesbridge: {
        clockTime: '15:10',
        clockDate: CLOCK_DATE,
        topBanner: '📄 본부장 브리핑 PDF 추출 — 클릭 한 번',
        topMeta: '복잡한 대시보드는 보지 않는다. 1장짜리 리포트만 필요.',
        partnerList: PARTNERS_FULL,
        mainContent: { kind: 'exec-dashboard' },
        execDashboard: makeExecPanel({ pdfButtonPulse: true }),
        badgeMessage: 'PDF 추출 대기',
      },
      memo: {
        title: 'STATE 3 — 리포트 자동 생성',
        meta: '15:10',
        situation:
          '경영진은 복잡한 대시보드를 직접 보지 않습니다. 팀장이 우상단의 [PDF 추출] 버튼을 클릭해 본부장용 브리핑 문서를 완성합니다.',
        interact: 'PDF 추출 버튼 클릭 → STATE 4.',
        feel: ['"클릭 한 번으로 본부장이 받을 1장 리포트가 나온다"'],
        connect: ['→ STATE 4 최종 보고 마감'],
      },
    }),

    // STATE 3 — PDF 모달
    makeState(3, {
      pauseAfterMs: 8000,
      revealRhythm: 'cinematic',
      activeCastId: 'boss',
      guide:
        '1장짜리 정제 리포트가 모달로 등장. 팩트 + 인사이트 + 조치 결과가 한 페이지에. 데모 마감.',
      salesbridge: {
        clockTime: '15:11',
        clockDate: CLOCK_DATE,
        topBanner: '✅ 통합 영업 리스크 브리핑 (2026.05)',
        topMeta: '보이지 않던 것이 경영 자산이 되었다',
        partnerList: PARTNERS_FULL,
        mainContent: { kind: 'exec-dashboard' },
        execDashboard: makeExecPanel({ pdfModalVisible: true }),
        badgeMessage: '✓ 브리핑 리포트 완성',
      },
      takeover: {
        tone: 'brand',
        eyebrow: '데모 마감 · 2026.05',
        headline:
          '"수만 건의 대화가 휘발되는 비용이었습니다. 이제 매출을 지키는 경영 자산입니다."',
        sub:
          '카오스로 시작해 경영 자산으로 끝난다 — 가온전선이 보여준 길. 7 SCENE 시연 완주.',
        ctaLabel: '시연 완주 →',
      },
      memo: {
        title: 'STATE 4 — 최종 보고 마감',
        meta: '15:11',
        situation:
          '팩트를 넘어 전략적 조치(Action)까지 담긴 리포트가 완성됨. "보이지 않던 것"이 "매출을 지키는 자산"으로 전환되며 데모가 마감.',
        interact: '시연 완주. ← 키로 STATE 탐색.',
        feel: [
          '★ "수만 건의 대화 → 경영 자산화"',
          '"개별 카톡이 매출 리스크 보고서로 변신한다"',
        ],
        connect: ['시연 완주 → 영업팀 Q&A 또는 후속 미팅'],
      },
    }),
  ],
  onComplete: { demoAutoAdvance: false },
};
