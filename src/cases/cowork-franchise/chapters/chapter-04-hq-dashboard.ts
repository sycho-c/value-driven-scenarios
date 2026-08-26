import type {
  Chapter,
  MfgDashAiTab,
  MfgDashGenTab,
  MfgDashboardState,
  MfgValueStripDef,
} from '../../_types';

/**
 * 신 4. 가맹본부 대시보드 — 운영지표 + AI 운영지표(NOA).
 * 슈퍼바이저 개인 폰에 흩어져 있던 2,500개 점포의 현장이 한 화면의 데이터가 된다.
 * AI 층에서는 이를 이탈(폐점) 위험 축으로 교차해, 흔들리는 점포를 먼저 짚는다.
 */

const GEN: MfgDashGenTab = {
  insight: {
    label: '이번 달 핵심',
    value: '2,500',
    valueSuffix: '개점 소통 자산화',
    sub: '공지 열람 *82% → 리마인드 후 98%* · 주의 권역 *충청권*',
    ctaLabel: 'AI 이탈위험 분석 →',
  },
  kpis: [
    {
      label: '연결 가맹점 · SV',
      value: '2,500 / 60',
      sub: 'SV 1인당 평균 41.7개점',
      tag: 'fix',
      drill: {
        title: '가맹점·슈퍼바이저 연결 현황',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '카카오 채널', value: 2135, tone: 'purple' },
              { label: '웹·문자 채널', value: 365, tone: 'navy' },
            ],
            centerV: '2,500',
            centerL: '연결 가맹점',
          },
          {
            kind: 'chips',
            rows: [
              { label: '개인폰 시절', value: 'SV 개인 카톡방 약 2,500개 — 집계 불가' },
              { label: '전환 후', value: '점포 단위 채널 2,500개 · 누락 0', tone: 'pos' },
              { value: '카카오 미사용 365개점도 웹·문자로 동일 참여 [예시]', tone: 'note' },
            ],
          },
        ],
      },
    },
    {
      label: '공지 열람률',
      value: '98%',
      delta: { text: '▲ 16%p', tone: 'good' },
      sub: '최초 82% → 리마인드 후',
      tag: 'est',
      drill: {
        title: '공지 도달·열람 — 리마인드 효과',
        note: '개인 카톡 단톡방에서는 도달·열람 자체를 측정할 수 없었다',
        blocks: [
          {
            kind: 'vbar',
            subH: '9월 프로모션 공지 (2,500개점)',
            rows: [
              { label: '도달', value: 2500, display: '2,500', tone: 'navy' },
              { label: '최초 열람', value: 2050, display: '2,050 (82%)', tone: 'purple' },
              { label: '리마인드 후', value: 2450, display: '2,450 (98%)', tone: 'pos' },
              { label: '끝내 미열람', value: 50, display: '50 (2%)', tone: 'red', sub: 'SV 직접 확인 대상' },
            ],
            max: 2500,
            unit: '개점',
          },
        ],
      },
    },
    {
      label: '교육 이수율',
      value: '91%',
      sub: '신메뉴 제조 교육 · 마감 D-2',
      tag: 'est',
      drill: {
        title: '교육 이수 현황',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '이수 완료', value: 2275, tone: 'pos' },
              { label: '진행 중', value: 150, tone: 'amber' },
              { label: '미착수', value: 75, tone: 'red' },
            ],
            centerV: '91%',
            centerL: '이수율',
          },
          {
            kind: 'list',
            subH: '미착수 집중 권역',
            rows: [
              { name: '충청권', value: '28개점', badge: '주의', badgeTone: 'red' },
              { name: '호남권', value: '19개점', badge: '주의', badgeTone: 'amber' },
              { name: '수도권 3권역', value: '11개점', badge: '보통', badgeTone: 'amber' },
            ],
          },
        ],
      },
    },
    {
      label: '응대 누락',
      value: '12',
      delta: { text: '▼ 94%', tone: 'good' },
      sub: '전월 198 → 당월 12건',
      tag: 'fix',
      drill: {
        title: '응대 누락 추이 (2시간 초과 미응답)',
        blocks: [
          {
            kind: 'chips',
            rows: [
              { label: '전월', value: '198건' },
              { label: '당월', value: '12건 (▼94%)', tone: 'pos' },
              { value: '미응답 2시간 알림 · SV/본사 동시 통지 도입 효과 [예시]', tone: 'note' },
            ],
          },
          {
            kind: 'monthBars',
            rows: [
              { label: '4월', value: 221, tone: 'purpleL' },
              { label: '5월', value: 207, tone: 'purpleL' },
              { label: '6월', value: 214, tone: 'purpleL' },
              { label: '7월', value: 198, tone: 'red' },
              { label: '8월', value: 46, tone: 'purpleL' },
              { label: '9월', value: 12, tone: 'pos' },
            ],
            max: 230,
          },
        ],
      },
    },
  ],
  docHeatmap: {
    sub: '권역별 활동 분포. 공지·교육 참여가 낮은 권역이 곧 관리 취약 지점이다.',
    axisLabel: '권역 × 활동 유형',
    heat: {
      cols: ['공지 열람', '교육 이수', '설문 응답', '이슈 접수'],
      rows: [
        { label: '수도권 1·2권역', sub: '682개점', cells: [670, 640, 651, 88] },
        { label: '수도권 3권역', sub: '418개점', cells: [402, 378, 389, 61] },
        { label: '영남권', sub: '540개점', cells: [528, 496, 511, 74] },
        { label: '충청권', sub: '312개점', cells: [268, 241, 252, 96], tail: '주의', tailTone: 'red' },
        { label: '호남권', sub: '548개점', cells: [532, 490, 508, 79] },
      ],
      max: 670,
      palette: 'purple',
      tailHeader: '판정',
    },
  },
  fileHist: [
    {
      name: '9월_프로모션_운영가이드.pdf',
      meta: '본사 공지 · 2,500개점 배포 · 이력 6건',
      timeline: [
        { ev: '가맹기획팀 발행', meta: '09/01 08:40 · 서윤아 팀장' },
        { ev: '2,500개점 발송 (카카오 2,135 · 웹 365)', meta: '09/01 09:00 · 시스템' },
        { ev: '최초 열람 2,050개점 (82%)', meta: '09/01 12:00 · 집계' },
        { ev: '미열람 450개점 리마인드', meta: '09/01 15:00 · 자동' },
        { ev: '열람 2,450개점 (98%) 도달', meta: '09/01 18:00 · 집계' },
      ],
    },
    {
      name: '하남미사점_점포이력.pdf',
      meta: '점포 운영 이력 · v6 · 이력 14건',
      timeline: [
        { ev: '개점 등록', meta: '2026/08/18 · 가맹기획팀' },
        { ev: '제빙기 이슈 FR-26090801 접수', meta: '2026/09/08 08:55 · 한태민 SV' },
        { ev: '시설 A/S 완료', meta: '2026/09/08 16:20 · 시설팀' },
        { ev: 'SV 교체 승계 (한태민 → 이서준)', meta: '2026/09/15 09:00 · 시스템' },
        { ev: '후임 첫 응대 · 재발 확인', meta: '2026/09/15 10:12 · 이서준 SV' },
      ],
    },
    {
      name: '신메뉴_제조교육_영상.mp4',
      meta: '교육 자료 · 이수 2,275개점 · 이력 4건',
      timeline: [
        { ev: '교육팀 배포', meta: '09/01 11:20 · 본사 교육팀' },
        { ev: '이수 1,840개점', meta: '09/03 · 집계' },
        { ev: '미이수 재알림', meta: '09/04 09:00 · 자동' },
        { ev: '이수 2,275개점 (91%)', meta: '09/05 · 집계' },
      ],
    },
  ],
  rooms: {
    sub: '권역별 소통량. 이슈 접수가 몰리는 권역은 현장 부하 신호.',
    bars: [
      { label: '수도권 1·2권역', value: 682, state: '활발', tone: 'hi', tip: '682개점 · SV 17명' },
      { label: '호남권', value: 548, state: '활발', tone: 'hi', tip: '548개점 · SV 13명' },
      { label: '영남권', value: 540, state: '활발', tone: 'hi', tip: '540개점 · SV 13명' },
      { label: '수도권 3권역', value: 418, state: '보통', tone: 'mid', tip: '418개점 · SV 10명' },
      { label: '충청권', value: 312, state: '주의', tone: 'low', tip: '312개점 · SV 7명 · 1인당 44.6개점' },
    ],
    note: '휴면(3개월 무활동) 점포방 별도 38개',
  },
  agents: {
    sub: '슈퍼바이저별 담당 점포 수. 과부하 SV는 응대 품질과 이탈 리스크로 이어진다.',
    rings: [
      { label: '충청권 평균', sub: 'SV 7명', pct: 89, tip: '1인당 44.6개점 · 권장 상한 대비 112%' },
      { label: '수도권 3권역', sub: 'SV 10명', pct: 84, tip: '1인당 41.8개점' },
      { label: '영남권', sub: 'SV 13명', pct: 83, tip: '1인당 41.5개점' },
      { label: '수도권 1·2권역', sub: 'SV 17명', pct: 80, tip: '1인당 40.1개점' },
    ],
  },
  audit: {
    sub: '가맹계약·정산 관련 문서의 열람 이력. 가맹사업법 대응.',
    rows: [
      { file: '가맹계약_갱신안내_2026Q4.pdf', type: '계약', recv: '갱신 대상 218개점 · SV 60명', count: '278곳' },
      { file: '하남미사점_점포이력.pdf', type: '운영', recv: '한태민(전임) · 이서준(승계 열람)', count: '2명' },
      { file: '정산내역_2026-08.xlsx', type: '민감', recv: '본사 정산팀 · 권역장 5명', count: '6명' },
    ],
  },
  dailyBars: {
    sub: '최근 14일 전 권역 소통량. 공지·프로모션 구간 반응 확인.',
    values: [1240, 1180, 1320, 2860, 2140, 1460, 1080, 1220, 1390, 1810, 1520, 1340, 1260, 1190],
    max: 3000,
  },
  footnote:
    '운영 지표 — 당일 현황(도달·이수·감사 이력)과 기간 추이를 구분해 표시. 문서 선택 시 배포·열람 이력 전개.',
};

const AI: MfgDashAiTab = {
  insight: {
    label: '이탈 위험 점포 · 연 매출 영향 [추정]',
    value: '38',
    valueSuffix: '개점',
    sub: '최우선 *충청권 17개점* · SV 1인당 *44.6개점* 과부하 해소 필요',
    ctaLabel: '가맹사업본부장 브리핑 →',
  },
  kpis: [
    {
      label: '응대 SLA 준수율',
      value: '87%',
      sub: '일반 2h · 현장이슈 당일 [예시]',
      tag: 'est',
      drill: {
        title: '응대 SLA — 유형별 (동심원)',
        note: 'SLA 기준: 일반 문의 2h · 현장 이슈 당일 · 정산 문의 1일 [예시 기준 · 고객사 확정]',
        blocks: [
          {
            kind: 'rings',
            items: [
              { label: '현장 이슈 (당일)', pct: 78, tip: '준수 292/374건 · 78%' },
              { label: '일반 문의 (2h)', pct: 89, tip: '준수 1,842/2,070건 · 89%' },
              { label: '정산 문의 (1일)', pct: 94, tip: '준수 418/445건 · 94%' },
            ],
            colors: ['red', 'purple', 'navy'],
            centerV: '87%',
            centerL: '전체 준수율',
          },
        ],
      },
    },
    {
      label: '이탈 위험 점포',
      value: '38개점',
      sub: '폐점·계약해지 선행 신호 감지',
      tag: 'est',
      drill: {
        title: '이탈 위험 판정 — 선행 신호 조합 [추정]',
        note: '문의 급감(3주 이상 무활동) · 교육 미이수 · 설문 무응답 · 공지 미열람이 겹치는 점포. 가맹점 수가 4,000 → 2,500으로 줄어든 흐름에서 조기 감지가 핵심 [예시]',
        blocks: [
          {
            kind: 'vbar',
            subH: '권역별 이탈 위험 점포',
            rows: [
              { label: '충청권', value: 17, tone: 'red', sub: 'SV 과부하 44.6개점' },
              { label: '수도권 3권역', value: 9, tone: 'amber', sub: '신규 개점 밀집' },
              { label: '호남권', value: 7, tone: 'amber' },
              { label: '영남권', value: 5, tone: 'purple' },
            ],
            max: 20,
            unit: '개점',
          },
          {
            kind: 'chips',
            rows: [
              { label: '신호 조합', value: '3주 무활동 + 교육 미이수 + 설문 무응답' },
              { label: '조기 접촉 결과', value: '38개점 중 24개점 정상 복귀 (63%)', tone: 'pos' },
              { value: '개인폰 시절에는 폐점 통보를 받고서야 알았다', tone: 'note' },
            ],
          },
        ],
      },
    },
    {
      label: 'SV 부하 지수',
      value: '44.6',
      delta: { text: '▲ 상한 초과', tone: 'bad' },
      sub: '충청권 1인당 담당 점포',
      tag: 'fix',
      drill: {
        title: 'SV 부하 — 담당 점포 수와 응대 품질의 상관 [추정]',
        blocks: [
          {
            kind: 'vbar',
            subH: '권역별 SV 1인당 담당 점포',
            rows: [
              { label: '충청권', value: 45, display: '44.6개점', tone: 'red', sub: 'SLA 71%' },
              { label: '수도권 3권역', value: 42, display: '41.8개점', tone: 'amber', sub: 'SLA 84%' },
              { label: '영남권', value: 42, display: '41.5개점', tone: 'purple', sub: 'SLA 89%' },
              { label: '수도권 1·2권역', value: 40, display: '40.1개점', tone: 'purple', sub: 'SLA 92%' },
            ],
            max: 48,
          },
          {
            kind: 'kv',
            title: '충청권 교차 근거',
            rows: [
              { k: 'SV 1인당 점포', v: '44.6개점 (전사 최고)', tone: 'red' },
              { k: '응대 SLA', v: '71% (전사 87%)', tone: 'red' },
              { k: '교육 이수', v: '77% (전사 91%)', tone: 'red' },
              { k: '이탈 위험 점포', v: '17개점 (전사 38 중 45%)', tone: 'red' },
            ],
          },
        ],
      },
    },
    {
      label: '최우선 리스크',
      value: '충청권',
      sub: 'SV 과부하 · 이탈 위험 17개점',
      tag: 'fix',
      drill: {
        title: '최우선 리스크 — 충청권 판정 근거',
        blocks: [
          {
            kind: 'vbar',
            subH: '권역별 응대 SLA 준수율',
            rows: [
              { label: '충청권', value: 71, tone: 'red', sub: 'SV 7명 / 312개점' },
              { label: '수도권 3권역', value: 84, tone: 'amber', sub: 'SV 10명 / 418개점' },
              { label: '영남권', value: 89, tone: 'purple', sub: 'SV 13명 / 540개점' },
              { label: '수도권 1·2권역', value: 92, tone: 'purple', sub: 'SV 17명 / 682개점' },
            ],
            max: 100,
            unit: '%',
          },
          {
            kind: 'chips',
            rows: [
              { label: '권고', value: 'SV 2명 증원 시 1인당 34.7개점 — 타 권역 수준', tone: 'pos' },
              { label: '대안', value: '개점 3개월 미만 점포를 전담 SV로 분리', tone: 'pos' },
              { value: '증원 없이 유지하면 이탈 위험 17개점의 조기 접촉이 어렵다 [추정]', tone: 'note' },
            ],
          },
        ],
      },
    },
  ],
  slaRisk: {
    sub: '권역 × 이탈 선행 신호 교차. 세 신호가 모두 겹치는 점포만 이탈 위험으로 판정한다 (합 38개점).',
    heat: {
      cols: ['3주 무활동', '교육 미이수', '설문 무응답'],
      rows: [
        {
          label: '충청권',
          sub: '312개점 · SV 7명',
          cells: [17, 28, 24],
          tail: '17개점',
          tailTone: 'red',
          tipLines: ['SV 1인당 44.6개점 — 전사 최고', '응대 SLA 71% · 교육 이수 77%', '이탈 위험 점포의 45%가 이 권역'],
        },
        {
          label: '수도권 3권역',
          sub: '418개점 · SV 10명',
          cells: [9, 11, 14],
          tail: '9개점',
          tailTone: 'amber',
          tipLines: ['개점 3개월 미만 점포 밀집', '신규 점주 온보딩 부하'],
        },
        {
          label: '호남권',
          sub: '548개점 · SV 13명',
          cells: [7, 19, 12],
          tail: '7개점',
          tailTone: 'amber',
          tipLines: ['교육 미이수 19개점 — 재알림 예약됨'],
        },
        {
          label: '영남권',
          sub: '540개점 · SV 13명',
          cells: [5, 12, 9],
          tail: '5개점',
          tailTone: 'amber',
          tipLines: ['SLA 89% · 신호 3종 중첩 5개점'],
        },
        {
          label: '수도권 1·2권역',
          sub: '682개점 · SV 17명',
          cells: [3, 6, 8],
          tail: '—',
          tailTone: 'muted',
          tipLines: ['SLA 92% · 전 권역 최고', '신호가 3종 모두 겹치는 점포 없음'],
        },
      ],
      max: 28,
      palette: 'red',
      tailHeader: '이탈 위험 [추정]',
    },
  },
  quality: {
    sub: 'SV 담당 점포 수 구간별 응대 품질. 과부하 구간에서 품질이 꺾인다.',
    gauges: [
      { pct: 91, label: '40개점 이하 담당 SV · 43명', tone: 'purple', tip: 'SLA 목표 85% 상회' },
      { pct: 73, label: '43개점 초과 담당 SV · 17명', tone: 'amber', tip: '목표 하회 · 증원·재배분 검토 필요' },
    ],
    rings: [
      { label: '수도권 1·2권역', sub: 'SV 17명', pct: 92, tip: 'SLA 92% · 1인당 40.1개점' },
      { label: '영남권', sub: 'SV 13명', pct: 89, tip: 'SLA 89% · 1인당 41.5개점' },
      { label: '수도권 3권역', sub: 'SV 10명', pct: 84, tip: 'SLA 84% · 1인당 41.8개점' },
      { label: '충청권', sub: 'SV 7명', pct: 71, tip: 'SLA 71% · 1인당 44.6개점' },
    ],
  },
  dailyLine: {
    sub: '최근 14일 응대 SLA 준수율 추이. 공지 발송일 전후 부하 확인.',
    values: [89, 88, 86, 74, 79, 85, 90, 88, 87, 83, 86, 88, 85, 87],
    min: 50,
    max: 100,
    target: 85,
    targetLabel: '목표 85%',
  },
  track: {
    sub: '기간별 리스크 해결·조치중·미해결 현황.',
    periods: [
      {
        key: '월',
        label: '지난달 → 이번달',
        done: 12,
        doing: 4,
        open: 2,
        items: [
          { name: '응대 누락', before: 198, after: 12, status: '해결', ev: '미응답 2시간 알림 도입 → 198건→12건' },
          { name: '공지 도달 확인 불가', before: 1, after: 0, status: '해결', ev: '도달·열람 집계 + 미열람 리마인드' },
          { name: '충청권 SV 과부하', before: 0, after: 1, status: '미해결', ev: '1인당 44.6개점 — 증원 품의 진행 중' },
        ],
      },
      {
        key: '분기',
        label: '2026 Q3',
        done: 26,
        doing: 5,
        open: 3,
        items: [
          { name: '카톡 미사용 점포 사각', before: 365, after: 0, status: '해결', ev: '문자·웹 채널로 365개점 전원 참여' },
          { name: 'SV 교체 시 이력 단절', before: 1, after: 0, status: '해결', ev: '권역 단위 일괄 승계 — 재설명 0' },
          { name: '이탈 위험 조기 감지', before: 0, after: 1, status: '조치중', ev: '38개점 중 24개점 조기 접촉으로 복귀' },
        ],
      },
      {
        key: '반기',
        label: '2026 하반기',
        done: 41,
        doing: 7,
        open: 4,
        items: [
          { name: 'SV 개인폰 사각지대', before: 1, after: 0, status: '해결', ev: '2,500개점 공식 채널 전환' },
          { name: '교육 이수 미측정', before: 1, after: 0, status: '해결', ev: '점포·인원 단위 이수 집계' },
          { name: 'ERP 매출 지표 연동', before: 0, after: 1, status: '조치중', ev: '더존ERP 연동 범위 협의 중 [검토]' },
        ],
      },
      {
        key: '연',
        label: '2026 연간(누적)',
        done: 58,
        doing: 9,
        open: 6,
        items: [
          { name: '가맹점 채널 전환', before: 1, after: 0, status: '해결', ev: '2,500개점 · SV 60명 전환 완료' },
          { name: '가맹계약 문서 감사 이력', before: 1, after: 0, status: '해결', ev: '열람 이력 전량 기록' },
          { name: '권역별 SV 재배분', before: 0, after: 1, status: '조치중', ev: '부하 지수 기반 재배분안 수립 중' },
        ],
      },
    ],
  },
  brief: {
    title: '가맹사업본부장 브리핑 리포트',
    sub: '이탈 위험·SV 부하·현장 품질을 1장으로 정제 · 재가공 없이 경영진 보고',
    primaryLabel: '본부장 브리핑 PDF',
    secondaryLabel: 'Excel',
    reportTitle: '가맹사업본부 통합 운영 브리핑',
    reportSub: '2026.09 · 서윤아 팀장 → 가맹사업본부장 · NOA 자동 생성',
    reportSections: [
      {
        title: '1. 임원 요약',
        lines: [
          '공지 열람률 — 최초 82% → 리마인드 후 98% (전월까지는 측정 불가)',
          '응대 누락 — 198건 → 12건 (▼94%)',
          '이탈 위험 점포 — 38개점 감지, 조기 접촉으로 24개점 복귀 (63%)',
        ],
      },
      {
        title: '2. 판정 — 최우선 리스크 (SV 부하 × SLA × 이탈 신호)',
        lines: [
          '충청권 — SV 1인당 44.6개점(전사 최고) · SLA 71% · 이탈 위험 17개점(전사의 45%)',
          '수도권 3권역 — 개점 3개월 미만 밀집 · SLA 84% · 이탈 위험 9개점',
        ],
      },
      {
        title: '3. 권고 · 진행 중',
        lines: [
          '충청권 SV 2명 증원 시 1인당 34.7개점 — 타 권역 수준으로 정상화',
          '43개점 초과 담당 SV 17명 구간에서 SLA가 91% → 73%로 꺾임',
          '더존ERP 매출 지표 연동 협의 중 — 소통 지표와 매출을 한 화면에서 교차 예정 [검토]',
        ],
      },
    ],
    reportFoot: 'NOA가 운영지표를 이탈 위험·SV 부하 축으로 크로스해 자동 생성 · 재가공 없이 경영진 보고 가능',
  },
  footnote:
    'AI 운영지표(NOA) — 운영지표를 이탈 위험과 SV 부하 축으로 교차 분석. 당일 현황(판정·품질)과 기간 추이(조치)를 구분.',
};

function dashboard(partial: Partial<MfgDashboardState>): MfgDashboardState {
  return {
    tab: 'gen',
    title: '가맹본부 통합 인사이트 대시보드',
    subtitle: '서윤아 팀장 · 전국 2,500개점 소통 자산화 현황 · 2026.09',
    gen: GEN,
    ai: AI,
    ...partial,
  };
}

const VALUE: MfgValueStripDef = {
  sell: '2,500개 점포의 현장을 사람 집계(운영지표)와 AI 분석(이탈 위험) 두 층으로.',
  pain: '과거: SV 개인 폰에 갇힌 현장 · 공지 도달도 이탈 신호도 측정 불가',
  roi: '응대 누락 198→12건 · 공지 열람 98% · 이탈 위험 38개점 중 24개점 복귀 [예시]',
};

export const chapter04HqDashboard: Chapter = {
  id: 4,
  act: 4,
  title: '가맹본부 대시보드 — 2,500개점을 한 화면으로',
  subtitle: '자산화 완성 (NOA 적용 이후) · 무대: 가맹기획팀 PC (운영지표 + AI 운영지표)',
  narration:
    '점주 폰과 슈퍼바이저 폰이 사라지고, 본부가 전국 2,500개 점포를 데이터로 조망합니다. 슈퍼바이저 60명의 개인 폰에 흩어져 휘발되던 현장이 한 화면의 지표가 되어, 재가공 없이 경영진께 보고됩니다. 여기서 한 층 더 — NOA가 이 데이터를 이탈 위험과 슈퍼바이저 부하 축으로 교차해, 흔들리는 점포와 과부하 권역을 먼저 짚습니다. "폐점 통보를 받고 알던 것을, 세 주 전에 알게 됩니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      guide:
        '가맹본부 뷰 통합 인사이트 대시보드입니다. 운영 지표 탭 — 공지 열람률·교육 이수율·응대 누락과 권역별 활동, SV 부하, 계약 문서 감사 이력이 한 화면에 집계됩니다.',
      mfgDashboard: dashboard({}),
      memo: {
        title: 'STATE 1 — 운영 지표 진입',
        meta: '신 4 · 대시보드',
        situation:
          '가맹기획팀장이 대시보드를 열어 이번 달 핵심(2,500개점 자산화)과 KPI(가맹점 2,500/SV 60 · 공지 열람 98% · 교육 91% · 누락 198→12)를 한 화면으로 본다.',
        interact: 'KPI 카드를 클릭하면 근거가 펼쳐집니다. 다음 → 공지 배포 이력',
        feel: ['"공지 내렸습니다"가 아니라 "2,450개점이 읽었습니다"'],
        connect: ['→ 문서 단위 배포·열람 추적'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgDashboard: dashboard({ openFile: '하남미사점_점포이력.pdf' }),
      memo: {
        title: 'STATE 2 — 점포 이력 드릴다운 · SV 승계 기록',
        meta: '신 4 · 대시보드',
        situation:
          '하남미사점 이력을 열면 개점부터 제빙기 이슈, SV 교체 승계, 후임 첫 응대까지 타임라인으로 펼쳐진다. 신 0에서 개인 폰과 함께 사라지던 그 이력이다.',
        interact: '공지·교육 자료도 클릭해 배포·열람 이력 전개. 다음 → AI 운영지표',
        feel: ['"SV가 바뀌어도 점포는 본사에 남습니다"'],
        connect: ['→ NOA 이탈 위험 분석'],
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
          'NOA가 3주 무활동·교육 미이수·설문 무응답이 겹치는 38개점을 이탈 위험으로 판정하고, 충청권 SV 과부하(1인당 44.6개점)와의 상관을 함께 제시한다.',
        interact: '조치 트래킹 기간 전환 · 본부장 브리핑 PDF 클릭. 데모 완주 🎉',
        feel: ['"가맹점 수가 줄어드는 이유를 숫자로 봅니다"'],
        connect: ['신 0→4: 1:N 사각지대 → 공식 채널 → 공지·교육 → 인수인계 → 자산화 완결'],
      },
    },
  ],
};
