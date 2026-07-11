import type {
  Chapter,
  MfgDashAiTab,
  MfgDashGenTab,
  MfgDashboardState,
  MfgValueStripDef,
} from '../../_types';

/**
 * 신 4. 관리자 대시보드 — 통합 인사이트 (운영지표 + AI 운영지표·NOA).
 * 거래처 폰이 사라지고, 관리자가 전체 소통을 데이터로 조망한다.
 * 운영 지표(사람 집계)와 AI 운영지표(NOA 자동 분석·SLA 교차)의 2층 구조.
 */

const GEN: MfgDashGenTab = {
  insight: {
    label: '이번 달 핵심',
    value: '328',
    valueSuffix: '건 문서 자산화',
    sub: '파일 오류 *9 → 1건 (▼89%)* · 주의 거래처 *△△전선*',
    ctaLabel: 'AI 리스크 분석 →',
  },
  kpis: [
    {
      label: '누적 문서 자산', value: '328', sub: '문서 유형·이력 추적', tag: 'est',
      drill: {
        title: '문서 자산 상세 · 유형 구성 + 버전 관리',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '발주서', value: 112, tone: 'navy' },
              { label: '견적서', value: 96, tone: 'purple' },
              { label: '현장사진', value: 74, tone: 'purpleL' },
              { label: '무역서류', value: 46, tone: 'gray' },
            ],
            centerV: '328',
            centerL: '누적 문서',
          },
          {
            kind: 'list',
            subH: '동일 문서 버전 추적',
            rows: [
              { name: '○○산업_견적서.pdf', badge: 'v4', badgeTone: 'amber', value: '공유 6회' },
              { name: '납기리스트_7월.xlsx', badge: 'v3', badgeTone: 'amber', value: '공유 4회' },
              { name: '단가표_Q3.xlsx', badge: 'v2', badgeTone: 'amber', value: '공유 3회' },
            ],
          },
        ],
      },
    },
    {
      label: '연결 거래처', value: '57', sub: '국내 55 · 해외 2', tag: 'fix',
      drill: {
        title: '연결 거래처 상세',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '국내', value: 55, tone: 'purple' },
              { label: '해외', value: 2, tone: 'navy' },
            ],
            centerV: '57',
            centerL: '연결 거래처',
          },
          {
            kind: 'vbar',
            subH: '상위 거래처 대화량',
            rows: [
              { label: '○○산업', value: 132, tone: 'purple' },
              { label: '△△전선', value: 98, tone: 'amber', sub: '주의' },
              { label: 'US Buyer', value: 44, tone: 'purple' },
              { label: '华东化工', value: 38, tone: 'purple' },
            ],
            max: 140,
            unit: '건',
          },
        ],
      },
    },
    {
      label: '대화방 개설/가동', value: '34 / 10', sub: '가동률 29%', tag: 'fix',
      drill: {
        title: '대화방 가동 현황',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '가동(활성)', value: 10, tone: 'purple' },
              { label: '대기·휴면', value: 24, tone: 'gray' },
            ],
            centerV: '29%',
            centerL: '가동률',
          },
        ],
      },
    },
    {
      label: '파일 전송 오류', value: '1', delta: { text: '▼ 89%', tone: 'good' }, sub: '5월 9 → 6월 1건', tag: 'fix',
      drill: {
        title: '파일 전송 오류 추이',
        blocks: [
          {
            kind: 'chips',
            rows: [
              { label: '5월', value: '9건' },
              { label: '6월', value: '1건 (▼89%)', tone: 'pos' },
              { value: '원본 파일명 복원·다운로드 개발 효과 · 6월 1건은 카카오 측 장애 [확정]', tone: 'note' },
            ],
          },
          {
            kind: 'monthBars',
            rows: [
              { label: '1월', value: 6, tone: 'purpleL' },
              { label: '2월', value: 7, tone: 'purpleL' },
              { label: '3월', value: 5, tone: 'purpleL' },
              { label: '4월', value: 3, tone: 'purpleL' },
              { label: '5월', value: 9, tone: 'red' },
              { label: '6월', value: 1, tone: 'pos' },
            ],
            max: 10,
          },
        ],
      },
    },
  ],
  docHeatmap: {
    sub: '거래처별 문서 유형 분포·개별 파일 이력 추적. 최신본 관리 및 감사 이력 확보.',
    heat: {
      cols: ['발주서', '견적서', '도면', '현장사진', '무역서류', '납기'],
      rows: [
        { label: '○○산업', cells: [42, 28, 18, 24, 0, 20] },
        { label: '△△전선', cells: [30, 34, 6, 12, 0, 16] },
        { label: 'US Buyer', cells: [0, 0, 0, 0, 26, 0] },
        { label: '华东化工', cells: [0, 0, 0, 0, 20, 0] },
      ],
      max: 42,
      palette: 'purple',
    },
  },
  fileHist: [
    {
      name: '○○산업_규격도면_v3.pdf',
      meta: '이영업 대리 · v3 · 이력 12건',
      timeline: [
        { ev: 'v1 최초 전송', meta: '07/15 09:12 · ○○산업 이영업' },
        { ev: '다운로드·검토', meta: '07/15 09:40 · 나회사 담당' },
        { ev: 'v2 재전송 (치수 수정)', meta: '07/16 14:03 · ○○산업 이영업' },
        { ev: 'v3 확정본 회신', meta: '07/18 10:22 · 나회사 담당' },
        { ev: '다운로드 (최종)', meta: '07/18 10:25 · ○○산업 이영업' },
      ],
    },
    {
      name: '단가표_2026Q3.xlsx',
      meta: '박은규 이사 · v2 · 이력 7건',
      timeline: [
        { ev: 'v1 등록 (민감)', meta: '07/01 11:00 · 본사 가격팀' },
        { ev: '열람 (감사 기록)', meta: '07/02 09:15 · ○○산업 이영업' },
        { ev: '열람 (감사 기록)', meta: '07/03 16:40 · △△전선 최구매' },
        { ev: 'v2 갱신', meta: '07/10 10:00 · 본사 가격팀' },
      ],
    },
    {
      name: 'Shipping_Docs_US-2207.zip',
      meta: '수출 담당 · v1 · 이력 4건',
      timeline: [
        { ev: 'B/L·Invoice·C/O 전송', meta: '07/22 10:26 · 수출 담당' },
        { ev: '다운로드 (통관용)', meta: '07/22 22:10 · US Buyer' },
      ],
    },
  ],
  rooms: {
    sub: '대화방별 메시지량. 활성·휴면 구분.',
    bars: [
      { label: '○○산업', value: 132, state: '활발', tone: 'hi', tip: '최근 활동 방금 전' },
      { label: '△△전선', value: 98, state: '활발', tone: 'hi', tip: '최근 활동 12분 전' },
      { label: 'US Buyer', value: 44, state: '보통', tone: 'mid', tip: '최근 활동 2시간 전' },
      { label: '华东化工', value: 38, state: '보통', tone: 'mid', tip: '최근 활동 3시간 전' },
      { label: '□□케이블', value: 6, state: '저조', tone: 'low', tip: '최근 활동 6일 전' },
    ],
    note: '휴면 대화방 별도 24개',
  },
  agents: {
    sub: '담당자별 처리량. 특정 인력 집중 시 연속성 리스크.',
    rings: [
      { label: '강승희', sub: '영업지원', pct: 40, tip: '처리 비중 40% · 대화 132 · 파일 40' },
      { label: '나회사', sub: '영업지원', pct: 22, tip: '처리 비중 22% · 대화 98 · 파일 28' },
      { label: '정발주', sub: '영업', pct: 14, tip: '처리 비중 14% · 대화 61 · 파일 16' },
      { label: '신규 담당', sub: '영업', pct: 7, tip: '처리 비중 7% · 대화 24 · 파일 8' },
    ],
  },
  audit: {
    sub: '민감·무역 문서의 수신자·감사 이력. 규정 대응.',
    rows: [
      { file: '단가표_2026Q3.xlsx', type: '민감', recv: '○○산업 이영업 · △△전선 최구매', count: '2곳' },
      { file: 'Shipping_Docs_US-2207.zip', type: '무역', recv: 'US Buyer — B/L·Invoice·C/O', count: '1곳' },
      { file: '○○산업_견적서_0715.pdf', type: '견적', recv: '○○산업 박열정 — 원본명 복원', count: '1곳' },
    ],
  },
  dailyBars: {
    sub: '최근 14일 채널 활동 추이. 거래처 이용도 흐름.',
    values: [420, 385, 510, 468, 332, 290, 540, 502, 438, 610, 555, 480, 651, 523],
    max: 700,
  },
  footnote: '운영 지표 — 당일 현황(자산·활동·감사)과 기간 추이를 구분해 표시. 파일 히스토리 선택 시 이력 전개.',
};

const AI: MfgDashAiTab = {
  insight: {
    label: 'SLA 위반 · 매출 영향 [추정]',
    value: '5,700만',
    valueSuffix: '원',
    sub: '최우선 *△△전선 3,200만원* · 영업팀 SLA *68%* 개입 필요',
    ctaLabel: '본부장 브리핑 →',
  },
  kpis: [
    {
      label: 'SLA 준수율', value: '78%', sub: '긴급 2h·일반 4h [예시]', tag: 'est',
      drill: {
        title: 'SLA 준수율 — 유형별 (동심원)',
        note: 'SLA 기준: 긴급 발주 2h · 일반 문의 4h · 수출 서류 1일 [예시 기준 · 고객사 확정]',
        blocks: [
          {
            kind: 'rings',
            items: [
              { label: '긴급 발주 (SLA 2h)', pct: 70, tip: '준수 14/20건 · 70%' },
              { label: '일반 문의 (SLA 4h)', pct: 86, tip: '준수 38/44건 · 86%' },
              { label: '수출 서류 (SLA 1일)', pct: 86, tip: '준수 12/14건 · 86%' },
            ],
            colors: ['red', 'purple', 'navy'],
            centerV: '78%',
            centerL: '전체 준수율',
          },
        ],
      },
    },
    {
      label: 'SLA 위반', value: '14건', sub: '매출 영향 5,700만원', tag: 'est',
      drill: {
        title: 'SLA 위반 — 거래처별 매출 영향 [추정]',
        blocks: [
          {
            kind: 'vbar',
            rows: [
              { label: '△△전선', value: 3200, display: '3,200만원', tone: 'red', sub: '신규 담당 · 위반 6건' },
              { label: '□□케이블', value: 1100, display: '1,100만원', tone: 'amber', sub: '정발주 · 위반 3건' },
            ],
            max: 3200,
            total: { label: '합계', value: '5,700만원' },
          },
        ],
      },
    },
    {
      label: '리스크 조치율', value: '64%', sub: '개선 완료 기준', tag: 'fix',
      drill: {
        title: '리스크 조치율 — 조치 내역',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '해결', value: 6, tone: 'pos' },
              { label: '조치중', value: 2, tone: 'amber' },
              { label: '미해결', value: 1, tone: 'red' },
            ],
            centerV: '64%',
            centerL: '조치 완료',
          },
          {
            kind: 'list',
            rows: [
              { name: '파일 전송 오류', value: '9→1건', badge: '해결', badgeTone: 'pos' },
              { name: '상담톡 사양 제약', value: '14→1건', badge: '해결', badgeTone: 'pos' },
              { name: '긴급 발주 SLA 위반', value: '0→5건', badge: '미해결', badgeTone: 'red' },
              { name: '담당자 편중', value: '진행', badge: '조치중', badgeTone: 'amber' },
            ],
          },
        ],
      },
    },
    {
      label: '최우선 리스크', value: '△△전선', sub: '신규 담당 · 위반 5건', tag: 'fix',
      drill: {
        title: '최우선 리스크 — △△전선 판정 근거',
        blocks: [
          {
            kind: 'vbar',
            subH: '거래처별 SLA 준수율',
            rows: [
              { label: '△△전선', value: 52, tone: 'red', sub: '신규 담당' },
              { label: '□□케이블', value: 74, tone: 'amber', sub: '정발주' },
              { label: 'US Buyer', value: 88, tone: 'purple', sub: '수출 담당' },
              { label: '○○산업', value: 96, tone: 'purple', sub: '강승희' },
            ],
            max: 100,
            unit: '%',
          },
          {
            kind: 'kv',
            title: '교차 근거 (매출 등급 × SLA × 담당자)',
            rows: [
              { k: '매출 등급', v: '3위 (상위)' },
              { k: '담당자', v: '신규 담당', tone: 'red' },
              { k: 'SLA 위반', v: '6건 중 5건', tone: 'red' },
              { k: '매출 영향 [추정]', v: '3,200만원', tone: 'red' },
            ],
          },
        ],
      },
    },
  ],
  slaRisk: {
    sub: '거래처 매출 등급 × SLA 준수율 × 담당자 교차. 매출 영향순 정렬.',
    heat: {
      cols: ['긴급 발주', '일반 문의', '수출 서류'],
      rows: [
        {
          label: '△△전선', sub: '매출 3위 · 신규 담당', cells: [5, 1, 0], tail: '3,200만원', tailTone: 'red',
          tipLines: ['긴급 발주 6건 중 SLA 위반 5건', '납기 확정 지연 평균 5.2시간', '매출 상위인데 신규 담당 배정'],
        },
        {
          label: '□□케이블', sub: '매출 7위 · 정발주', cells: [1, 2, 0], tail: '1,100만원', tailTone: 'amber',
          tipLines: ['일반 문의 응답 SLA 위반 3건', '평균 응답 6.1시간'],
        },
        {
          label: '○○산업', sub: '매출 1위 · 강승희', cells: [0, 2, 0], tail: '—', tailTone: 'muted',
          tipLines: ['긴급 발주 2건 중 2건 SLA 준수', '납기 확정 평균 38분'],
        },
        {
          label: 'US Buyer', sub: '수출 · 수출 담당', cells: [0, 0, 1], tail: '—', tailTone: 'muted',
          tipLines: ['수출 서류 SLA 준수', '번역 응대 지연 0'],
        },
      ],
      max: 5,
      palette: 'red',
      tailHeader: '매출 영향 [추정]',
    },
  },
  quality: {
    sub: '조직·담당자별 SLA 준수율. 영업·영업지원 격차 진단.',
    gauges: [
      { pct: 82, label: '영업지원팀 · 8명', tone: 'purple', tip: 'SLA 목표 80% 상회' },
      { pct: 68, label: '영업팀(현장) · 5명', tone: 'amber', tip: '목표 80% 하회 · 현장 응대 개선 필요' },
    ],
    rings: [
      { label: '강승희', sub: '영업지원', pct: 96, tip: 'SLA 96% · 대화 132건 · 영업지원' },
      { label: '나회사', sub: '영업지원', pct: 90, tip: 'SLA 90% · 대화 98건 · 영업지원' },
      { label: '정발주', sub: '영업', pct: 74, tip: 'SLA 74% · 대화 61건 · 영업' },
      { label: '신규 담당', sub: '영업', pct: 52, tip: 'SLA 52% · 대화 24건 · 영업' },
    ],
  },
  dailyLine: {
    sub: '최근 14일 SLA 준수율 추이. 응대 품질 일별 변동.',
    values: [72, 75, 68, 80, 82, 78, 85, 74, 79, 83, 76, 81, 77, 78],
    min: 50,
    max: 100,
    target: 80,
    targetLabel: '목표 80%',
  },
  track: {
    sub: '기간별 리스크 해결·조치중·미해결 현황.',
    periods: [
      {
        key: '월', label: '지난달 → 이번달', done: 6, doing: 2, open: 1,
        items: [
          { name: '파일 전송 오류', before: 9, after: 1, status: '해결', ev: '원본 파일명 복원·다운로드 개발 → 9건→1건' },
          { name: '발신자 미표시', before: 1, after: 0, status: '해결', ev: '조직도 연동 실명 복원' },
          { name: '긴급 발주 SLA 위반', before: 0, after: 5, status: '미해결', ev: '△△전선 신규 담당 배정 이슈 — 신규 발생' },
        ],
      },
      {
        key: '분기', label: '2026 Q2', done: 18, doing: 2, open: 2,
        items: [
          { name: '상담톡 제약(파일명·답장)', before: 8, after: 0, status: '해결', ev: '다운로드·메모 기능 개발' },
          { name: '외근 파일 공유 끊김', before: 6, after: 1, status: '해결', ev: 'iOS 전용 앱 배포' },
          { name: '긴급 발주 SLA', before: 0, after: 5, status: '조치중', ev: '납기 확정 카드 필수화 검토' },
        ],
      },
      {
        key: '반기', label: '2026 상반기', done: 34, doing: 4, open: 3,
        items: [
          { name: '개인 카톡 M:N 사각지대', before: 1, after: 0, status: '해결', ev: '상담톡 채널 전환' },
          { name: '상담톡 사양 제약군', before: 14, after: 1, status: '해결', ev: '단계적 기능 개발' },
          { name: '담당자 쏠림(연속성)', before: 1, after: 1, status: '조치중', ev: '강승희 편중 — 백업 담당 배정 진행' },
        ],
      },
      {
        key: '연', label: '2026 연간(누적)', done: 48, doing: 5, open: 5,
        items: [
          { name: '채널 전환·자산화', before: 1, after: 0, status: '해결', ev: '거래처 57개 상담톡 전환 완료' },
          { name: '문서 통제·감사 이력', before: 1, after: 0, status: '해결', ev: '전량 감사 이력 확보' },
          { name: 'SLA 기반 품질 관리', before: 0, after: 1, status: '조치중', ev: 'NOA SLA 모니터링 도입' },
        ],
      },
    ],
  },
  brief: {
    title: '본부장 브리핑 리포트',
    sub: 'SLA 기반 매출 리스크·조치 현황·서비스 품질을 1장으로 정제 · 재가공 없이 경영진 보고',
    primaryLabel: '본부장 브리핑 PDF',
    secondaryLabel: 'Excel',
    reportTitle: '제조 영업본부 통합 리스크 브리핑',
    reportSub: '2026.07 · 이윤 관리자 → 영업 본부장 · NOA 자동 생성',
    reportSections: [
      {
        title: '1. 임원 요약 (SLA 기반)',
        lines: [
          'SLA 준수율 (긴급 2h·일반 4h [예시]) — 78%',
          'SLA 위반 → 매출 영향 — 5,700만원 [추정]',
          '리스크 조치율 — 64% (진행중)',
        ],
      },
      {
        title: '2. 판정 — 최우선 리스크 (매출등급 × SLA × 담당자)',
        lines: [
          '매출 3위 △△전선 (신규 담당) — SLA 52% · 위반 6건 → 매출 영향 3,200만원 [추정]',
          '매출 7위 □□케이블 (정발주) — SLA 74% · 위반 3건 → 매출 영향 1,100만원 [추정]',
        ],
      },
      {
        title: '3. 조치 트래킹 · 서비스 품질',
        lines: [
          '파일 전송 오류 9건 → 1건 해결 (원본 파일명·다운로드 개발)',
          '영업지원팀 SLA 82% vs 영업팀(현장) 68% — 현장 응대 품질 개입 필요',
          '강승희 물량 집중 · 백업 담당 배정으로 연속성 리스크 완화',
        ],
      },
    ],
    reportFoot: 'NOA가 운영지표를 SLA 축으로 크로스해 자동 생성 · 재가공 없이 경영진 보고 가능',
  },
  footnote: 'AI 운영지표(NOA) — 운영지표를 SLA 축으로 교차 분석. 당일 현황(판정·품질)과 기간 추이(조치)를 구분.',
};

function dashboard(partial: Partial<MfgDashboardState>): MfgDashboardState {
  return {
    tab: 'gen',
    title: '통합 인사이트 대시보드',
    subtitle: '이윤 관리자 · 전사 소통 자산화 현황 · 2026.07',
    gen: GEN,
    ai: AI,
    ...partial,
  };
}

const VALUE: MfgValueStripDef = {
  sell: '같은 데이터를 사람 집계(운영지표)와 AI 분석(AI 운영지표) 두 층으로 — 재가공 없이 경영진 보고.',
  pain: '과거: 담당자 폰에 갇힌 대화로 집계 불가 · 응대 품질·이탈 신호를 사람이 놓침',
  roi: '파일 오류 9→1건 [확정] · 민감 문서 감사 이력 확보 · SLA 위반의 매출 영향 정량화 [추정]',
};

export const chapter05AdminDashboard: Chapter = {
  id: 5,
  act: 4,
  title: '관리자 대시보드 — 자산화의 결실',
  subtitle: '자산화 완성 (NOA 적용 이후) · 무대: 이윤 관리자 PC (운영지표 + AI 운영지표)',
  narration:
    '거래처 폰이 사라지고, 관리자가 전체 소통을 데이터로 조망합니다. 개별 카톡에 묻혀 휘발되던 대화가 관리자 한 화면의 데이터가 되어, 재가공 없이 경영진께 바로 보고할 수 있습니다. 여기서 한 층 더 — NOA가 이 데이터를 SLA 축으로 교차 분석해 매출 영향이 큰 리스크를 먼저 짚습니다. "개별 카톡에 묻혀 있던 데이터가, 회사의 자산이자 AI 분석 대상이 됩니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      guide:
        '관리자 뷰 통합 인사이트 대시보드입니다. 운영 지표 탭 — 이번 달 핵심 요약과 KPI, 문서 자산성(거래처×유형 히트맵·파일 히스토리), 연결성, 담당자 편중, 감사 이력, 일별 추이가 한 화면에 집계됩니다.',
      mfgDashboard: dashboard({}),
      memo: {
        title: 'STATE 1 — 운영 지표 진입',
        meta: '신 4 · 대시보드',
        situation:
          '관리자가 대시보드를 열어 이번 달 핵심(328건 자산화)과 KPI(거래처 57 · 대화방 34/10 · 오류 9→1)·문서 자산성·활동·감사 이력을 한 화면으로 본다.',
        interact: '다음 → 파일 히스토리 드릴다운',
        feel: ['"재가공 없이 경영진께 바로 보고"'],
        connect: ['→ 개별 파일 이력 추적'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgDashboard: dashboard({ openFile: '○○산업_규격도면_v3.pdf' }),
      memo: {
        title: 'STATE 2 — 파일 히스토리 드릴다운',
        meta: '신 4 · 대시보드',
        situation:
          '파일 히스토리에서 문서를 선택하면 전송·다운로드·버전 교체 이력이 시각순 타임라인으로 펼쳐진다. 규격도면 v1→v3의 전 과정을 파고든다.',
        interact: '다른 파일도 클릭해 전개 가능. 다음 → AI 운영지표',
        feel: ['개별 문서 단위까지 감사 이력으로'],
        connect: ['→ NOA SLA 교차 분석'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      mfgDashboard: dashboard({ tab: 'ai' }),
      memo: {
        title: 'STATE 3 — AI 운영지표 (NOA)',
        meta: '신 4 · 대시보드 · ROI',
        situation:
          'AI 운영지표 탭에서 NOA가 운영지표를 SLA 축으로 교차 분석한 결과를 본다. 리스크 판정(매출등급×SLA×담당자) · 서비스 품질 · 조치 트래킹 · 본부장 브리핑.',
        interact: '조치 트래킹 기간 전환 · 본부장 브리핑 PDF 클릭. 데모 완주 🎉',
        feel: ['"SLA 위반이 매출 얼마짜리 리스크인지 숫자로"'],
        connect: ['신 0→4: 사각지대 → 통제 → 해결 → 확장 → 자산화 완결'],
      },
    },
  ],
};
