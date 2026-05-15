import type { Chapter, ExecDashboardFullState, MobileSplitMessage } from '../../_types';

const STATE_STEPS = [
  { id: 'switch', label: '관리자 뷰 전환' },
  { id: 'aggregate', label: '매출 기여 지표 집계' },
  { id: 'beforeAfter', label: 'Before / After 매출 비교' },
];

const MOBILE_AFTERGLOW: MobileSplitMessage[] = [
  { id: 'after-1', side: 'other', text: '오, 바로 나왔네요? 그럼 이걸로 할게요.' },
  { id: 'after-2', side: 'mine', text: '감사합니다, 바로 진행해 드릴게요.' },
];

function baseDash(): ExecDashboardFullState {
  return {
    masterTitle: '하나손해보험 영업용 데모 — Ch.3 GA 채널을 가져오는 무기',
    masterMeta: '※ 영업본부장 통합 대시보드 시점',
    stateBarSteps: STATE_STEPS,
    stateBarActiveIndex: 0,
    mobileVisible: true,
    mobilePhoneHeader: '하나손보 Cowork+ 앱',
    mobilePhoneMessages: MOBILE_AFTERGLOW,
    tabs: [
      { id: 'manager', label: '정나윤 매니저 업무창', active: true },
      {
        id: 'dashboard',
        label: '📊 영업본부장 대시보드 👆',
        clickNextIndex: 1,
        pulse: true,
      },
    ],
    preDashboardEmpty: '(설계 처리 완료 대기 중)',
    scriptHeading: '🗣️ 영업 스크립트 가이드',
    scriptBody:
      '본부장님, 방금 보신 통화 중 계약 성사가 하루에 수십, 수백 건 쌓이면 어떤 매출 지표가 만들어질까요?',
    scriptHighlight: '우측 화면 상단의 [영업본부장 대시보드] 탭을 눌러보시죠.',
  };
}

export const chapter03VisibleField: Chapter = {
  id: 3,
  act: 4,
  title: 'GA 채널을 가져오는 무기',
  subtitle: '관리자 뷰 전환 → 매출 기여 지표 → Before/After 비교',
  narration:
    '효율 지표가 아니라 매출 기여 지표입니다. 설계사 1인당 월 계약 건수, 고객 응답 후 전환율, GA별 하나손보 추천 비율. 영업본부장이 임원 보고에서 그대로 쓸 수 있는 숫자. "이 속도 경쟁에서 이기는 보험사가 GA 채널을 가져갑니다."',
  stage: 'exec-dashboard',
  states: [
    {
      index: 0,
      pauseAfterMs: 6000,
      revealRhythm: 'natural',
      guide:
        '개별 채팅 화면에서 전사 현황을 파악할 수 있는 관리자 모드로 전환됩니다. 상단의 [영업본부장 대시보드] 탭을 클릭하면 화면이 좌측에서 우측으로 밀리며 거대한 대시보드 UI가 나타납니다.',
      execDashboardFull: {
        ...baseDash(),
        stateBarActiveIndex: 0,
      },
      advanceOn: [{ target: 'tab:dashboard', nextStateIndex: 1 }],
      memo: {
        title: 'STATE 1 — 관리자 뷰 전환',
        meta: '탭 전환 애니메이션',
        situation:
          '시연자가 상단 탭을 클릭하면 좌측 모바일 페이드아웃 + 우측 PC 풀스크린 확장.',
        interact: '시연자가 [영업본부장 대시보드] 탭 클릭.',
        feel: ['"개별 채팅에서 전사 현황으로 시야가 확장"'],
        connect: ['→ 매출 기여 지표 집계'],
      },
    },
    {
      index: 1,
      pauseAfterMs: 8500,
      revealRhythm: 'cinematic',
      guide:
        '하나손해보험의 실제 도입 성과 수치들이 매출 기여 지표 중심으로 채워집니다. 위젯 4개 카운트업 + GA별 하나손보 추천 비율 막대 차트.',
      execDashboardFull: {
        ...baseDash(),
        stateBarActiveIndex: 1,
        doneIndices: [0],
        mobileVisible: false,
        mobileFading: true,
        tabs: [
          { id: 'manager', label: '정나윤 매니저 업무창' },
          { id: 'dashboard', label: '📊 영업본부장 대시보드', active: true },
        ],
        preDashboardEmpty: undefined,
        widgets: [
          {
            id: 'contracts',
            title: '설계사 1인당 월 계약 건수',
            value: 6.4,
            suffix: '건',
            sub: '도입 전 4.1건 → +2.3건',
            tone: 'success',
            countUpFrom: 4.1,
            durationMs: 1200,
            fractionDigits: 1,
          },
          {
            id: 'conversion',
            title: '고객 응답 후 계약 전환율',
            value: 67,
            suffix: '%',
            sub: '기존 31% → 67% (+36%p)',
            tone: 'success',
            countUpFrom: 31,
            durationMs: 1200,
          },
          {
            id: 'channel',
            title: 'Cowork+ 채널 사용률 (자산화율)',
            value: 91,
            suffix: '%',
            sub: '갭 9% — 일부 GA 이미지 파일 잔존',
            tone: 'info',
            countUpFrom: 0,
            durationMs: 1200,
          },
          {
            id: 'error',
            title: '수기 입력 오류',
            value: 0,
            suffix: '건',
            sub: '▼ 100% (구조적 차단)',
            tone: 'danger',
            countUpFrom: 15,
            durationMs: 1000,
          },
        ],
        chartTitle: '📌 GA별 하나손보 추천 비율 순위 (Top 6)',
        bars: [
          {
            id: 'a-one',
            label: '에이원손해',
            valueText: '78%',
            widthPercent: 78,
            tone: 'brand',
          },
          {
            id: 'good-life',
            label: '더좋은인생',
            valueText: '71%',
            widthPercent: 71,
            tone: 'brand',
          },
          {
            id: 'future',
            label: '미래설계',
            valueText: '63%',
            widthPercent: 63,
            tone: 'brand',
          },
          {
            id: 'hangang',
            label: '한강라이프',
            valueText: '48%',
            widthPercent: 48,
            tone: 'brand',
          },
          {
            id: 'gangnam',
            label: '강남파트너 ⚠ 👆',
            valueText: '31%',
            widthPercent: 31,
            tone: 'warn',
            clickable: true,
            opensDrilldown: true,
          },
          {
            id: 'seoul',
            label: '서울중앙 ⚠ 👆',
            valueText: '24%',
            widthPercent: 24,
            tone: 'danger',
            clickable: true,
            opensDrilldown: true,
          },
        ],
        drilldown: {
          targetBarId: 'gangnam',
          title: '강남파트너 GA — 상세 분석',
          ctaLabel: '📨 가이드 일괄 발송 → 매출 비교 보기',
          ctaNextIndex: 2,
          causeRows: [
            { label: '이미지 파일 전송', percent: 68, tone: 'warn' },
            { label: '느린 응답 체감', percent: 21, tone: 'danger' },
            { label: '기타', percent: 11, tone: 'muted' },
          ],
          warnBox:
            '이미지 파일 전송 비중 68% → NER 처리율 저하 → 설계서 반환 지연',
          impact: {
            eyebrow: '이미지 → 텍스트 PDF 전환 시 예상 효과',
            before: '31%',
            after: '58%',
            sub: '추천 비율 +27%p 상승 예상',
          },
        },
        scriptBody:
          '개인 카톡 시절에는 사고가 나야만 문제를 알 수 있었습니다. 이제 본부장님은 GA별 하나손보 추천 비율 격차를 실시간으로 보십니다.\n\n⚠ 표시 GA를 클릭하면 추천 비율 저조 원인과 개선 효과까지 한 화면에 펼쳐집니다.',
        scriptHighlight: '하단 차트의 ⚠ GA(강남파트너/서울중앙) 막대를 클릭해보십시오.',
      },
      advanceOn: [{ target: 'next', nextStateIndex: 2 }],
      memo: {
        title: 'STATE 2 — 매출 기여 지표 집계',
        meta: 'v2 카운트업 위젯 + GA 추천 비율 차트',
        situation:
          '설계사 1인당 +2.3건, 전환율 31→67%, 자산화율 91%, 수기 오류 0건. 막대 차트가 GA별 하나손보 추천 비율 순위로 채워집니다.',
        interact: '자동 카운트업 + 막대 채움. 시연자가 [한미 GA 24%] 막대 클릭 → 드릴다운.',
        feel: ['"이게 GA 채널을 가져오는 숫자다"', '"하위 GA를 끌어올리면 추천 비율이 올라간다"'],
        connect: ['→ Before/After 매출 비교로 클로징'],
      },
    },
    {
      index: 2,
      pauseAfterMs: 9000,
      revealRhythm: 'cinematic',
      guide:
        'Cowork+ 도입 전과 후를 한 화면에서 비교. Ch.1의 "다른 곳으로 했어요"와 Ch.2의 "이걸로 할게요"가 이 숫자로 설명됩니다.',
      execDashboardFull: {
        ...baseDash(),
        stateBarActiveIndex: 2,
        doneIndices: [0, 1],
        mobileVisible: false,
        tabs: [
          { id: 'manager', label: '정나윤 매니저 업무창' },
          { id: 'dashboard', label: '📊 영업본부장 대시보드', active: true },
        ],
        preDashboardEmpty: undefined,
        widgets: [
          {
            id: 'contracts',
            title: '설계사 1인당 월 계약 건수',
            value: 6.4,
            suffix: '건',
            sub: '도입 전 4.1건 → +2.3건',
            tone: 'success',
            fractionDigits: 1,
          },
          {
            id: 'conversion',
            title: '고객 응답 후 계약 전환율',
            value: 67,
            suffix: '%',
            sub: '기존 31% → 67% (+36%p)',
            tone: 'success',
          },
          {
            id: 'channel',
            title: 'Cowork+ 채널 사용률 (자산화율)',
            value: 91,
            suffix: '%',
            sub: '갭 9% — 일부 GA 이미지 파일 잔존',
            tone: 'info',
          },
          {
            id: 'error',
            title: '수기 입력 오류',
            value: 0,
            suffix: '건',
            sub: '▼ 100% (구조적 차단)',
            tone: 'danger',
          },
        ],
        chartTitle: '📌 GA별 하나손보 추천 비율 순위 (Top 6)',
        bars: [
          { id: 'a-one', label: '에이원손해', valueText: '78%', widthPercent: 78, tone: 'brand' },
          { id: 'good-life', label: '더좋은인생', valueText: '71%', widthPercent: 71, tone: 'brand' },
          { id: 'future', label: '미래설계', valueText: '63%', widthPercent: 63, tone: 'brand' },
          { id: 'hangang', label: '한강라이프', valueText: '48%', widthPercent: 48, tone: 'brand' },
          { id: 'gangnam', label: '강남파트너 ⚠', valueText: '31%', widthPercent: 31, tone: 'warn' },
          { id: 'seoul', label: '서울중앙 ⚠', valueText: '24%', widthPercent: 24, tone: 'danger' },
        ],
        drilldown: undefined,
        beforeAfter: {
          eyebrow: 'CONFIDENTIAL · 영업본부장 보고',
          title: 'GA 채널을 가져오는 무기 — 매출 기여 정량 비교 (2026 Q1)',
          subtitle:
            '하나손해보험 영업본부 · Cowork+ NER 자동화 도입 전후 90일 측정',
          meta: '작성: 하나손보 영업본부 · 데이터 기준: Cowork+ NER 자동 추출 · 분석 기간: 2026.02 ~ 2026.04',
          beforeTitle: '개인 카톡 업무 (도입 전 90일)',
          afterTitle: 'Cowork+ 도입 (최근 90일)',
          rows: [
            { label: '설계서 응답 시간', before: '평균 3일', after: '평균 5분', highlight: 'good' },
            { label: '계약 전환율', before: '31%', after: '67% (+36%p)', highlight: 'good' },
            { label: '설계사 1인당 월 계약', before: '4.1건', after: '6.4건 (+2.3건)', highlight: 'good' },
            { label: '수기 입력 오류율', before: '15%', after: '0%', highlight: 'good' },
            { label: 'GA 데이터 추적', before: '불가', after: '실시간', highlight: 'good' },
            { label: '문서 자산화율', before: '0%', after: '91% (+91%p)', highlight: 'good' },
          ],
          insights: [
            {
              eyebrow: 'INSIGHT 01 · 응답 속도가 곧 계약 전환',
              body: '5분 이내 응답 구간의 전환율 67%, 3일 이상 11%. GA 설계사가 가장 먼저 꺼내는 보험사는 가장 빨리 설계서를 돌려준 보험사다.',
              highlight: '평균 응답 3일 → 5분, +2시간 빨라진 게 아니라 계약 한 건의 운명이 바뀌었다.',
            },
            {
              eyebrow: 'INSIGHT 02 · 자산화율 91% — 갭 9%가 곧 다음 매출',
              body: '15,188건 중 13,821건 NER 자동 처리 완료. 잔존 1,367건 중 71%가 이미지 파일 → 텍스트 PDF 가이드 발송 시 추천 비율 +27%p 추가 상승 여력.',
              highlight: '강남파트너 GA 31% → 58% 예상 — 가이드 일괄 발송으로 분기 내 즉시 전환 가능.',
            },
            {
              eyebrow: 'INSIGHT 03 · GA 추천 비율이 매출 점유율을 결정',
              body: '상위 4개 GA(에이원·더좋은인생·미래설계·한강라이프) 추천 비율 평균 65%. ⚠ 강남파트너·서울중앙 두 GA만 끌어올려도 전사 추천 비율 +12%p.',
              highlight: 'GA 6곳 중 4곳에서 하나손보가 “먼저 꺼내는 보험사”로 진입.',
            },
          ],
          tagline:
            '이 속도 경쟁에서 이기는 보험사가 GA 채널을 가져갑니다.',
          signature:
            '하나손해보험 영업본부 · Cowork+ 도입 90일 보고',
        },
        scriptBody:
          '지금 귀사의 GA 설계사들이 하나손해보험 상품을 가장 먼저 꺼내는 이유가 생겼습니다.\n\n경쟁사보다 2시간 빠른 설계서가 그 이유입니다. 이 속도 경쟁에서 이기는 보험사가 GA 채널을 가져갑니다.',
        scriptHighlight: '본부장님, 현재 귀사의 설계사들은 어느 보험사의 상품을 가장 먼저 꺼내고 있습니까?',
      },
      memo: {
        title: 'STATE 3 — Before / After 매출 비교',
        meta: '클로징 멘트와 함께',
        situation:
          '2컬럼 비교 화면 + tagline. Ch.1 STATE 3 / Ch.2 STATE 3와 직접 연결.',
        interact: '시연자가 Before → After 컬럼을 손으로 짚어가며 클로징.',
        feel: ['"이 속도 경쟁에서 이기는 보험사가 GA 채널을 가져간다"'],
        connect: ['→ 데모 종료'],
      },
    },
  ],
  onComplete: { demoAutoAdvance: false },
};
