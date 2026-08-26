import type {
  Chapter,
  MfgDashAiTab,
  MfgDashGenTab,
  MfgDashboardState,
  MfgValueStripDef,
} from '../../_types';

/**
 * 신 4. 본사 대시보드 — 통합 인사이트 (운영지표 + AI 운영지표·NOA).
 * 고객 폰이 사라지고, 본사가 전 매장 응대를 데이터로 조망한다.
 * 어드바이저 업무 효율 · 관리 통제 · 매출 기여의 3축을 두 층으로 본다.
 */

const GEN: MfgDashGenTab = {
  insight: {
    label: '이번 달 핵심',
    value: '4,820',
    valueSuffix: '건 상담 자산화',
    sub: '응대 누락 *42 → 5건 (▼88%)* · 주의 매장 *부산 센텀*',
    ctaLabel: 'AI 리스크 분석 →',
  },
  kpis: [
    {
      label: '누적 상담 이력',
      value: '4,820',
      sub: '유형·고객별 이력 추적',
      tag: 'est',
      drill: {
        title: '상담 이력 상세 · 유형 구성 + 매출 연결',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '재입고·재고 문의', value: 1740, tone: 'navy' },
              { label: '방문 예약', value: 1320, tone: 'purple' },
              { label: 'A/S 접수', value: 1080, tone: 'purpleL' },
              { label: '스타일링 상담', value: 680, tone: 'gray' },
            ],
            centerV: '4,820',
            centerL: '누적 상담',
          },
          {
            kind: 'list',
            subH: '상담 → 방문 → 구매 연결 [예시]',
            rows: [
              { name: '재입고 알림 → 방문 예약', badge: '38%', badgeTone: 'pos', value: '661건' },
              { name: '방문 예약 → 실제 방문', badge: '82%', badgeTone: 'pos', value: '1,082건' },
              { name: '방문 → 구매 연결', badge: '46%', badgeTone: 'amber', value: '498건' },
            ],
          },
        ],
      },
    },
    {
      label: '연결 매장 · 어드바이저',
      value: '70 / 640',
      sub: '어드바이저 개인 계정 단위',
      tag: 'fix',
      drill: {
        title: '매장·어드바이저 연결 현황',
        blocks: [
          {
            kind: 'vbar',
            subH: '상위 매장 상담량',
            rows: [
              { label: '강남 플래그십', value: 682, tone: 'purple' },
              { label: '본점', value: 540, tone: 'purple' },
              { label: '부산 센텀', value: 428, tone: 'amber', sub: '주의' },
              { label: '판교 현대', value: 372, tone: 'purple' },
              { label: '대구 신세계', value: 214, tone: 'purple' },
            ],
            max: 700,
            unit: '건',
          },
          {
            kind: 'chips',
            rows: [
              { label: '개인폰 시절', value: '어드바이저 640명 = 640갈래, 집계 불가' },
              { label: '업무앱 전환 후', value: '매장 70 · 개인 계정 640 단위로 집계', tone: 'pos' },
              { value: '매장별 1계정이 아닌 어드바이저 개인 계정 구성 [예시]', tone: 'note' },
            ],
          },
        ],
      },
    },
    {
      label: '담당 부재 인계',
      value: '96%',
      delta: { text: '▲ 인계 성공', tone: 'good' },
      sub: '휴무·퇴사 시 이력 승계 응대',
      tag: 'est',
      drill: {
        title: '담당 부재 인계 — 연속성 지표 (신 3)',
        note: '담당 어드바이저 부재 중 발생한 고객 문의가 백업 어드바이저에게 이력과 함께 인계된 비율',
        blocks: [
          {
            kind: 'donut',
            segs: [
              { label: '이력 승계 응대', value: 212, tone: 'pos' },
              { label: '맥락 없이 응대', value: 6, tone: 'amber' },
              { label: '응대 누락', value: 3, tone: 'red' },
            ],
            centerV: '96%',
            centerL: '인계 성공률',
          },
          {
            kind: 'chips',
            rows: [
              { label: '개인폰 시절', value: '담당 부재 = 응대 단절 (측정 자체가 불가)' },
              { label: '전환 후', value: '부재 221건 중 212건 이력 승계 응대', tone: 'pos' },
              { value: '퇴사 인수인계 12건 — 고객 이탈 0건 [예시]', tone: 'note' },
            ],
          },
        ],
      },
    },
    {
      label: '응대 누락',
      value: '5',
      delta: { text: '▼ 88%', tone: 'good' },
      sub: '전월 42 → 당월 5건',
      tag: 'fix',
      drill: {
        title: '응대 누락 추이',
        blocks: [
          {
            kind: 'chips',
            rows: [
              { label: '전월', value: '42건' },
              { label: '당월', value: '5건 (▼88%)', tone: 'pos' },
              { value: '재입고 대기 자동 매칭·미응답 알림·담당 부재 인계 도입 효과 [예시]', tone: 'note' },
            ],
          },
          {
            kind: 'monthBars',
            rows: [
              { label: '3월', value: 51, tone: 'purpleL' },
              { label: '4월', value: 47, tone: 'purpleL' },
              { label: '5월', value: 44, tone: 'purpleL' },
              { label: '6월', value: 42, tone: 'red' },
              { label: '7월', value: 18, tone: 'purpleL' },
              { label: '8월', value: 5, tone: 'pos' },
            ],
            max: 55,
          },
        ],
      },
    },
  ],
  docHeatmap: {
    sub: '매장별 상담 유형 분포·개별 이력 추적. 응대 편중과 A/S 집중 매장을 식별.',
    axisLabel: '매장 × 상담 유형',
    heat: {
      cols: ['재입고', '예약', 'A/S', '스타일링'],
      rows: [
        { label: '강남 플래그십', cells: [248, 196, 142, 96] },
        { label: '본점', cells: [190, 168, 118, 64] },
        { label: '부산 센텀', cells: [156, 92, 164, 16] },
        { label: '판교 현대', cells: [142, 118, 82, 30] },
        { label: '대구 신세계', cells: [88, 64, 48, 14] },
      ],
      max: 248,
      palette: 'purple',
    },
  },
  fileHist: [
    {
      name: '정수현_코트소매_하자_0825.jpg',
      meta: 'A/S 증빙 · 접수 AS-26082501 · 이력 6건',
      timeline: [
        { ev: '고객 하자 사진 전송', meta: '08/25 14:11 · 정수현 고객' },
        { ev: '원본 파일명 복원 · 접수 자동 연결', meta: '08/25 14:12 · 시스템' },
        { ev: 'A/S 접수 확정', meta: '08/25 14:14 · 김소연 어드바이저' },
        { ev: '수선실 이관', meta: '08/26 09:10 · 강남 플래그십' },
        { ev: '방문 시 전달 완료', meta: '08/26 15:22 · 김소연 어드바이저' },
      ],
    },
    {
      name: 'VIP_정수현_고객이력.pdf',
      meta: '취향·구매 이력 · v4 · 이력 11건',
      timeline: [
        { ev: 'v1 최초 작성', meta: '2024/03/12 · 前 담당 어드바이저' },
        { ev: '담당 승계 (퇴사 인수인계)', meta: '2025/01/06 · 김소연 어드바이저' },
        { ev: 'v3 갱신 (선호 사이즈 55)', meta: '2026/07/02 · 김소연 어드바이저' },
        { ev: '백업 열람 (담당 휴무)', meta: '2026/09/03 11:05 · 박지훈 어드바이저' },
        { ev: 'v4 갱신 (매치 구매)', meta: '2026/09/03 · 박지훈 어드바이저' },
      ],
    },
    {
      name: '예약확정_강남_0826_1500.pdf',
      meta: '방문 예약 카드 · v1 · 이력 4건',
      timeline: [
        { ev: '예약 확정 발송', meta: '08/25 14:08 · 김소연 어드바이저' },
        { ev: '고객 확인', meta: '08/25 14:09 · 정수현 고객' },
        { ev: '방문·구매 완료', meta: '08/26 15:22 · 강남 플래그십' },
      ],
    },
  ],
  rooms: {
    sub: '매장별 상담량. 활성·휴면 구분.',
    bars: [
      { label: '강남 플래그십', value: 682, state: '활발', tone: 'hi', tip: '최근 활동 방금 전' },
      { label: '본점', value: 540, state: '활발', tone: 'hi', tip: '최근 활동 8분 전' },
      { label: '부산 센텀', value: 428, state: '활발', tone: 'hi', tip: '최근 활동 21분 전 · A/S 편중' },
      { label: '판교 현대', value: 372, state: '보통', tone: 'mid', tip: '최근 활동 1시간 전' },
      { label: '대구 신세계', value: 214, state: '보통', tone: 'mid', tip: '최근 활동 3시간 전' },
      { label: '광주 충장', value: 42, state: '저조', tone: 'low', tip: '최근 활동 5일 전' },
    ],
    note: '휴면 상담방 별도 460개',
  },
  agents: {
    sub: '어드바이저별 처리량. 특정 인력 집중 시 고객 관계 연속성 리스크.',
    rings: [
      { label: '김소연', sub: '강남 플래그십', pct: 34, tip: '처리 비중 34% · 상담 682 · VIP 담당 58명' },
      { label: '박지훈', sub: '강남 플래그십', pct: 26, tip: '처리 비중 26% · 상담 540 · 백업 인계 42건' },
      { label: '이정민', sub: '부산 센텀', pct: 21, tip: '처리 비중 21% · 상담 428 · A/S 집중' },
      { label: '최유진', sub: '판교 현대', pct: 12, tip: '처리 비중 12% · 상담 372' },
    ],
  },
  audit: {
    sub: '고객 개인정보·A/S 증빙의 열람 이력. 개인정보 규정 대응.',
    rows: [
      { file: 'VIP_정수현_고객이력.pdf', type: '개인정보', recv: '김소연(담당) · 박지훈(부재 인계 열람)', count: '2명' },
      { file: '정수현_코트소매_하자_0825.jpg', type: 'A/S 증빙', recv: '강남 플래그십 · 수선실 — 접수 연동', count: '2곳' },
      { file: '멤버십_등급변동_2026Q3.xlsx', type: '민감', recv: '본사 CRM팀 · 매장 매니저 3명', count: '4명' },
    ],
  },
  dailyBars: {
    sub: '최근 14일 전 매장 상담량 추이. 프로모션·신상 입고 반응 확인.',
    values: [286, 312, 268, 340, 402, 468, 512, 356, 298, 330, 388, 446, 524, 481],
    max: 560,
  },
  footnote:
    '운영 지표 — 당일 현황(상담 자산·매장 활동·감사 이력)과 기간 추이를 구분해 표시. 파일 히스토리 선택 시 이력 전개.',
};

const AI: MfgDashAiTab = {
  insight: {
    label: '응대 SLA 위반 · 매출 기회 손실 [추정]',
    value: '6,400만',
    valueSuffix: '원',
    sub: '최우선 *부산 센텀 4,900만원* · A/S 응대 SLA *66%* 개입 필요',
    ctaLabel: '본부장 브리핑 →',
  },
  kpis: [
    {
      label: '응대 SLA 준수율',
      value: '81%',
      sub: '재입고 4h · A/S 1일 [예시]',
      tag: 'est',
      drill: {
        title: '응대 SLA 준수율 — 유형별 (동심원)',
        note: 'SLA 기준: 재입고·재고 문의 4h · 방문 예약 2h · A/S 접수 1일 [예시 기준 · 고객사 확정]',
        blocks: [
          {
            kind: 'rings',
            items: [
              { label: 'A/S 접수 (SLA 1일)', pct: 66, tip: '준수 71/108건 · 66%' },
              { label: '재입고 문의 (SLA 4h)', pct: 84, tip: '준수 146/174건 · 84%' },
              { label: '방문 예약 (SLA 2h)', pct: 91, tip: '준수 120/132건 · 91%' },
            ],
            colors: ['red', 'purple', 'navy'],
            centerV: '81%',
            centerL: '전체 준수율',
          },
        ],
      },
    },
    {
      label: '응대 SLA 위반',
      value: '19건',
      sub: '매출 기회 손실 6,400만원 (2개 매장)',
      tag: 'est',
      drill: {
        title: 'SLA 위반 — 매장별 매출 기회 손실 [추정]',
        note: '위반 19건 중 매출 영향이 산정된 16건만 표시 (본점 2건·강남 1건은 후속 응대로 회복) · 재입고 문의는 구매 직전 단계라 응답 지연이 곧 이탈로 이어진다는 가정 [추정]',
        blocks: [
          {
            kind: 'vbar',
            rows: [
              { label: '부산 센텀', value: 4900, display: '4,900만원', tone: 'red', sub: 'A/S 편중 · 위반 11건' },
              { label: '대구 신세계', value: 1500, display: '1,500만원', tone: 'amber', sub: '인력 공백 · 위반 5건' },
            ],
            max: 4900,
            total: { label: '합계', value: '6,400만원' },
          },
        ],
      },
    },
    {
      label: '연속성 리스크',
      value: '김소연 34%',
      sub: '특정 어드바이저 편중',
      tag: 'fix',
      drill: {
        title: '연속성 리스크 — 어드바이저 편중 (신 3과 연결)',
        note: '한 어드바이저에 VIP가 집중되면, 그 사람이 떠날 때 관계도 함께 흔들린다',
        blocks: [
          {
            kind: 'vbar',
            subH: '어드바이저별 VIP 담당 수',
            rows: [
              { label: '김소연', value: 58, tone: 'red', sub: '강남 · 편중' },
              { label: '박지훈', value: 34, tone: 'purple', sub: '강남 · 백업 겸' },
              { label: '이정민', value: 29, tone: 'purple', sub: '부산 센텀' },
              { label: '최유진', value: 21, tone: 'purple', sub: '판교 현대' },
            ],
            max: 60,
            unit: '명',
          },
          {
            kind: 'chips',
            rows: [
              { label: '완화 조치', value: '백업 담당 사전 배정 — 이력 승계 자동화', tone: 'pos' },
              { label: '검증', value: '담당 부재 221건 중 212건 이력 승계 응대 (96%)', tone: 'pos' },
              { value: '개인폰 시절에는 편중 자체를 관측할 수 없었다', tone: 'note' },
            ],
          },
        ],
      },
    },
    {
      label: '최우선 리스크',
      value: '부산 센텀',
      sub: 'A/S 편중 · 위반 11건',
      tag: 'fix',
      drill: {
        title: '최우선 리스크 — 부산 센텀 판정 근거',
        blocks: [
          {
            kind: 'vbar',
            subH: '매장별 SLA 준수율',
            rows: [
              { label: '부산 센텀', value: 58, tone: 'red', sub: 'A/S 38% 편중' },
              { label: '대구 신세계', value: 72, tone: 'amber', sub: '인력 공백' },
              { label: '본점', value: 88, tone: 'purple', sub: '박지훈' },
              { label: '강남 플래그십', value: 94, tone: 'purple', sub: '김소연' },
            ],
            max: 100,
            unit: '%',
          },
          {
            kind: 'kv',
            title: '교차 근거 (매장 매출 × SLA × 상담 구성)',
            rows: [
              { k: '매장 매출 등급', v: '3위 (상위)' },
              { k: '상담 구성', v: 'A/S 38% 편중', tone: 'red' },
              { k: 'SLA 위반', v: '19건 중 11건', tone: 'red' },
              { k: '매출 기회 손실 [추정]', v: '4,900만원', tone: 'red' },
            ],
          },
        ],
      },
    },
  ],
  slaRisk: {
    sub: '매장 매출 등급 × 응대 SLA × 상담 유형 교차. 매출 영향순 정렬.',
    heat: {
      cols: ['재입고', '방문 예약', 'A/S'],
      rows: [
        {
          label: '부산 센텀',
          sub: '매출 3위 · A/S 편중',
          cells: [3, 1, 7],
          tail: '4,900만원',
          tailTone: 'red',
          tipLines: ['A/S 접수 SLA(1일) 위반 7건', 'A/S 상담 비중 38% — 타 매장 평균 22%', '수선실 이관 평균 2.4일 지연'],
        },
        {
          label: '대구 신세계',
          sub: '매출 12위 · 인력 공백',
          cells: [3, 2, 0],
          tail: '1,500만원',
          tailTone: 'amber',
          tipLines: ['어드바이저 1명 휴직 이후 미응답 증가', '상담방 가동률 급락'],
        },
        {
          label: '본점',
          sub: '매출 2위 · 박지훈',
          cells: [0, 1, 1],
          tail: '—',
          tailTone: 'muted',
          tipLines: ['백업 인계 42건 전량 이력 승계', '평균 응답 1.2시간'],
        },
        {
          label: '강남 플래그십',
          sub: '매출 1위 · 김소연',
          cells: [0, 1, 0],
          tail: '—',
          tailTone: 'muted',
          tipLines: ['재입고 문의 SLA 전건 준수', '평균 응답 42분'],
        },
      ],
      max: 7,
      palette: 'red',
      tailHeader: '매출 기회 손실 [추정]',
    },
  },
  quality: {
    sub: '담당 응대와 부재 인계 응대의 품질 격차. 연속성이 실제로 작동하는지 검증.',
    gauges: [
      { pct: 88, label: '담당 어드바이저 응대', tone: 'purple', tip: '평상시 응대 · SLA 88%' },
      { pct: 84, label: '부재 인계 응대 (백업)', tone: 'amber', tip: '이력 승계 후 응대 · SLA 84% — 격차 4%p' },
    ],
    rings: [
      { label: '김소연', sub: '강남 플래그십', pct: 94, tip: 'SLA 94% · 상담 682건' },
      { label: '박지훈', sub: '강남 플래그십', pct: 88, tip: 'SLA 88% · 백업 인계 42건 포함' },
      { label: '최유진', sub: '판교 현대', pct: 79, tip: 'SLA 79% · 상담 372건' },
      { label: '이정민', sub: '부산 센텀', pct: 58, tip: 'SLA 58% · 상담 428건 · A/S 편중' },
    ],
  },
  dailyLine: {
    sub: '최근 14일 응대 SLA 준수율 추이. 주말·프로모션 구간 변동.',
    values: [84, 82, 79, 86, 88, 72, 68, 81, 83, 85, 77, 74, 80, 81],
    min: 50,
    max: 100,
    target: 80,
    targetLabel: '목표 80%',
  },
  track: {
    sub: '기간별 리스크 해결·조치중·미해결 현황.',
    periods: [
      {
        key: '월',
        label: '지난달 → 이번달',
        done: 10,
        doing: 3,
        open: 1,
        items: [
          { name: '응대 누락', before: 42, after: 5, status: '해결', ev: '재입고 대기 자동 매칭·미응답 알림 → 42건→5건' },
          { name: '고객 식별 불가', before: 1, after: 0, status: '해결', ev: '카카오싱크 연동 — VIP 등급·구매 이력 복원' },
          { name: 'A/S SLA 위반', before: 0, after: 11, status: '미해결', ev: '부산 센텀 A/S 편중 — 신규 발생' },
        ],
      },
      {
        key: '분기',
        label: '2026 Q3',
        done: 24,
        doing: 4,
        open: 2,
        items: [
          { name: 'A/S 증빙 식별 불가', before: 12, after: 0, status: '해결', ev: '원본 파일명 복원·접수번호 자동 연결' },
          { name: '담당 부재 시 응대 단절', before: 1, after: 0, status: '해결', ev: '백업 자동 배정 + 이력 승계 (96%)' },
          { name: '어드바이저 편중', before: 1, after: 1, status: '조치중', ev: '김소연 34% — 백업 사전 배정 확대 중' },
        ],
      },
      {
        key: '반기',
        label: '2026 하반기',
        done: 38,
        doing: 6,
        open: 3,
        items: [
          { name: '어드바이저 개인폰 사각지대', before: 1, after: 0, status: '해결', ev: 'Cowork App 전환 — 매장 70개·640명' },
          { name: '퇴사 시 고객 관계 소멸', before: 1, after: 0, status: '해결', ev: '고객 이력 승계 체계 — 퇴사 12건 이탈 0건' },
          { name: '매장 간 재고 협업', before: 0, after: 1, status: '조치중', ev: '본사–매장 협업방 운영 — 이동 요청 자동화 검토' },
        ],
      },
      {
        key: '연',
        label: '2026 연간(누적)',
        done: 52,
        doing: 7,
        open: 4,
        items: [
          { name: '채널 전환·자산화', before: 1, after: 0, status: '해결', ev: '매장 70개 · 어드바이저 640명 전환 완료' },
          { name: '고객 개인정보 감사 이력', before: 1, after: 0, status: '해결', ev: '열람 이력 전량 기록' },
          { name: 'AI 확장 (QA·인사이트)', before: 0, after: 1, status: '조치중', ev: '초기 범위 외 — 고도화 단계 검토' },
        ],
      },
    ],
  },
  brief: {
    title: '본부장 브리핑 리포트',
    sub: '응대 SLA 기반 매출 기회 손실·연속성·매장 품질을 1장으로 정제 · 재가공 없이 경영진 보고',
    primaryLabel: '본부장 브리핑 PDF',
    secondaryLabel: 'Excel',
    reportTitle: '리테일 영업본부 통합 리스크 브리핑',
    reportSub: '2026.09 · 최현주 매니저 → 영업 본부장 · NOA 자동 생성',
    reportSections: [
      {
        title: '1. 임원 요약 (응대 SLA 기반)',
        lines: [
          '응대 SLA 준수율 (재입고 4h·예약 2h·A/S 1일 [예시]) — 81%',
          'SLA 위반 → 매출 기회 손실 — 6,400만원 [추정]',
          '담당 부재 인계 성공률 — 96% (221건 중 212건 이력 승계)',
        ],
      },
      {
        title: '2. 판정 — 최우선 리스크 (매장 매출 × SLA × 상담 구성)',
        lines: [
          '매출 3위 부산 센텀 (A/S 38% 편중) — SLA 58% · 위반 11건 → 기회 손실 4,900만원 [추정]',
          '매출 12위 대구 신세계 (인력 공백) — SLA 72% · 위반 5건 → 기회 손실 1,500만원 [추정]',
        ],
      },
      {
        title: '3. 연속성 · 매장 품질',
        lines: [
          '응대 누락 42건 → 5건 해결 (재입고 자동 매칭·미응답 알림)',
          '담당 응대 SLA 88% vs 부재 인계 응대 84% — 격차 4%p로 연속성 확보',
          '김소연 VIP 58명 집중 · 백업 사전 배정으로 관계 연속성 리스크 완화 중',
        ],
      },
    ],
    reportFoot: 'NOA가 운영지표를 응대 SLA 축으로 크로스해 자동 생성 · 재가공 없이 경영진 보고 가능',
  },
  footnote:
    'AI 운영지표(NOA) — 운영지표를 응대 SLA 축으로 교차 분석. 당일 현황(판정·품질)과 기간 추이(조치)를 구분.',
};

function dashboard(partial: Partial<MfgDashboardState>): MfgDashboardState {
  return {
    tab: 'gen',
    title: '본사 통합 인사이트 대시보드',
    subtitle: '최현주 매니저 · 전 매장 고객 소통 자산화 현황 · 2026.09',
    gen: GEN,
    ai: AI,
    ...partial,
  };
}

const VALUE: MfgValueStripDef = {
  sell: '같은 데이터를 사람 집계(운영지표)와 AI 분석(AI 운영지표) 두 층으로 — 재가공 없이 경영진 보고.',
  pain: '과거: 어드바이저 폰에 갇힌 대화로 집계 불가 · 응대 품질·연속성 리스크를 본사가 못 봄',
  roi: '응대 누락 42→5건 · 담당 부재 인계 96% [예시] · SLA 위반의 매출 영향 정량화 [추정]',
};

export const chapter04HqDashboard: Chapter = {
  id: 4,
  act: 4,
  title: '본사 대시보드 — 자산화의 결실',
  subtitle: '자산화 완성 (NOA 적용 이후) · 무대: 본사 매니저 PC (운영지표 + AI 운영지표)',
  narration:
    '고객 폰이 사라지고, 본사가 전 매장 응대를 데이터로 조망합니다. 어드바이저 개인 폰에 묻혀 휘발되던 대화가 본사 한 화면의 데이터가 되어, 재가공 없이 경영진께 바로 보고할 수 있습니다. 여기서 한 층 더 — NOA가 이 데이터를 응대 SLA 축으로 교차 분석해 매출 영향이 큰 매장을 먼저 짚습니다. "매장에서 가장 값진 자산이던 고객 관계가, 이제 회사의 데이터입니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      guide:
        '본사 뷰 통합 인사이트 대시보드입니다. 운영 지표 탭 — 이번 달 핵심 요약과 KPI, 상담 자산성(매장×유형 히트맵·이력 추적), 매장 활동, 어드바이저 편중, 개인정보 감사 이력, 일별 추이가 한 화면에 집계됩니다.',
      mfgDashboard: dashboard({}),
      memo: {
        title: 'STATE 1 — 운영 지표 진입',
        meta: '신 4 · 대시보드',
        situation:
          '본사 매니저가 대시보드를 열어 이번 달 핵심(4,820건 자산화)과 KPI(매장 70·어드바이저 640 · 부재 인계 96% · 누락 42→5)를 한 화면으로 본다.',
        interact: 'KPI 카드를 클릭하면 근거가 펼쳐집니다. 다음 → 고객 이력 드릴다운',
        feel: ['"재가공 없이 경영진께 바로 보고"'],
        connect: ['→ 개별 고객 이력 추적'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgDashboard: dashboard({ openFile: 'VIP_정수현_고객이력.pdf' }),
      memo: {
        title: 'STATE 2 — 고객 이력 드릴다운 · 승계 기록',
        meta: '신 4 · 대시보드',
        situation:
          '정수현 고객 이력을 선택하면 작성·승계·갱신이 타임라인으로 펼쳐진다. 前 담당 퇴사 시 김소연 승계, 09/03 휴무일 박지훈 열람까지 — 신 0에서 "증발"하던 그 자산이 남아 있다.',
        interact: '다른 파일(A/S 증빙·예약 카드)도 클릭해 전개 가능. 다음 → AI 운영지표',
        feel: ['"퇴사해도, 휴무여도 고객 관계는 회사에 남습니다"'],
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
          'AI 운영지표 탭에서 NOA가 응대 SLA 축으로 교차 분석한 결과를 본다. 리스크 판정 · 연속성 리스크(어드바이저 편중) · 담당/백업 품질 격차 · 본부장 브리핑.',
        interact: '조치 트래킹 기간 전환 · 본부장 브리핑 PDF 클릭. 데모 완주 🎉',
        feel: ['"응대 지연이 매출 얼마짜리 손실인지 숫자로"'],
        connect: ['신 0→4: 사각지대 → 공식 채널 → 매장 응대 → 연속성 → 자산화 완결'],
      },
    },
  ],
};
