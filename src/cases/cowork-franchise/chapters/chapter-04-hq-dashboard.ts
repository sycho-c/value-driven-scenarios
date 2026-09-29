import type {
  Chapter,
  MfgArenaState,
  MfgDashAiTab,
  MfgDashGenTab,
  MfgDashboardState,
  MfgKakaoItem,
  MfgPhoneDef,
  MfgValueStripDef,
  MfgWorkspaceDef,
  MfgWsMessage,
} from '../../_types';
import { ADMIN_LABEL, FRANCHISE_ACTORS } from '../_shared';

/**
 * 신 4. 가맹본부 대시보드 — 관리자 판단을 담당자와 점주까지 연결.
 * STATE 1~3은 대시보드(운영지표 4단 드릴다운 · AI 운영지표 NOA),
 * STATE 4는 관리자가 이탈 위험 점포를 담당자 과업으로 지정하고 결과가 돌아오는 3자 무대다.
 * 담당자 개인 폰에 흩어져 있던 2,500개 점포의 현장이 한 화면의 데이터가 된다.
 * AI 층에서는 이를 이탈(폐점) 위험 축으로 교차해, 흔들리는 점포를 먼저 짚는다.
 */

const GEN: MfgDashGenTab = {
  insight: {
    label: '이번 달 핵심',
    value: '2,500',
    valueSuffix: '개점 소통 자산화',
    sub: '공지 열람 *82% → 재안내 후 98%* · 주의 권역 *충청권*',
    ctaLabel: 'AI 이탈위험 분석 →',
  },
  kpis: [
    {
      label: '소통 자산화 점포',
      value: '2,500',
      sub: '담당자 60명 · 점포 단위 채널',
      tag: 'fix',
      drill: {
        title: '가맹점·담당자 연결 현황',
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
              { label: '개인폰 시절', value: '담당자 개인 카톡방 약 2,500개 — 집계 불가' },
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
      sub: '최초 82% → 재안내 후',
      tag: 'est',
      drill: {
        title: '공지 도달·열람 — 재안내 효과',
        note: '개인 카톡 단톡방에서는 도달·열람 자체를 측정할 수 없었다',
        blocks: [
          {
            kind: 'vbar',
            subH: '9월 프로모션 공지 (2,500개점)',
            rows: [
              { label: '도달', value: 2500, display: '2,500', tone: 'navy' },
              { label: '최초 열람', value: 2050, display: '2,050 (82%)', tone: 'purple' },
              { label: '재안내 후', value: 2450, display: '2,450 (98%)', tone: 'pos' },
              { label: '끝내 미열람', value: 50, display: '50 (2%)', tone: 'red', sub: '담당자 직접 확인 대상' },
            ],
            max: 2500,
            unit: '개점',
          },
        ],
      },
    },
    {
      label: '응대 누락',
      value: '12',
      delta: { text: '▼ 94%', tone: 'good' },
      sub: '전월 198 → 당월 12건',
      tag: 'est',
      drill: {
        title: '응대 누락 추이 (1시간 초과 미응답)',
        blocks: [
          {
            kind: 'chips',
            rows: [
              { label: '전월', value: '198건' },
              { label: '당월', value: '12건 (▼94%)', tone: 'pos' },
              { value: '1시간 담당자 재알림 · 2시간 관리자 알림(단계형) 도입 효과 [예시]', tone: 'note' },
            ],
          },
          {
            kind: 'monthBars',
            rows: [
              { label: '4월', value: 221, tone: 'purpleL' },
              { label: '5월', value: 207, tone: 'purpleL' },
              { label: '6월', value: 214, tone: 'purpleL' },
              { label: '7월', value: 205, tone: 'purpleL' },
              { label: '8월', value: 198, tone: 'red' },
              { label: '9월', value: 12, tone: 'pos' },
            ],
            max: 230,
            metricLabel: '응대 누락',
          },
        ],
      },
    },
    {
      label: '이탈 위험',
      value: '38개점',
      delta: { text: '24개점 복귀', tone: 'good' },
      sub: '3주 무활동 + 교육 미이수 + 설문 무응답',
      tag: 'est',
      drill: {
        title: '이탈 위험 — 소통 기록에서 보이는 선행 신호',
        note: '개인폰 시절에는 폐점 통보를 받고서야 알았다',
        blocks: [
          {
            kind: 'vbar',
            subH: '권역별 이탈 위험 점포',
            rows: [
              { label: '충청권', value: 17, tone: 'red', sub: '담당자 1인당 44.6개점' },
              { label: '수도권 3권역', value: 9, tone: 'amber', sub: '신규 개점 밀집' },
              { label: '호남권', value: 7, tone: 'amber' },
              { label: '수도권 1·2권역', value: 3, tone: 'purple', sub: '수도권 2권역 3개 점포' },
              { label: '영남권', value: 2, tone: 'purple' },
            ],
            max: 20,
            unit: '개점',
          },
          {
            kind: 'chips',
            rows: [
              { label: '조기 접촉', value: '38개점 중 24개점 정상 복귀 (63%)', tone: 'pos' },
              { value: '판정 근거와 조치는 AI 운영지표(NOA) 탭에서 [예시]', tone: 'note' },
            ],
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
        { label: '수도권 1·2권역', sub: '682개점', cells: [680, 640, 651, 88] },
        { label: '수도권 3권역', sub: '418개점', cells: [417, 378, 389, 61] },
        { label: '영남권', sub: '540개점', cells: [539, 511, 511, 74] },
        { label: '충청권', sub: '312개점', cells: [268, 241, 252, 96], tail: '주의', tailTone: 'red' },
        { label: '호남권', sub: '548개점', cells: [546, 505, 508, 79] },
      ],
      max: 680,
      palette: 'purple',
      tailHeader: '판정',
    },
  },
  fileHist: [],
  drill4: {
    sub: '보고서가 아니라 기록으로 — 권역을 누르면 담당자, 담당자를 누르면 점포, 점포를 누르면 이력이 펼쳐진다.',
    total: { label: '전국', stores: '2,500개 점포 · 담당자 60명', rate: '88%' },
    regions: [
      { name: '수도권 1·2권역', stores: '682개 점포 · 담당자 17명', rate: '92%', tone: 'pos',
        agents: [
          { name: '이서준 (2권역)', stores: '34개 점포', rate: '93%', tasks: '과업 12건', tone: 'pos',
            storeList: [
              { name: '하남미사점', state: '승계 · 이슈 처리', tone: 'pos', timeline: [
                  { ev: '개점 · 점포 방 개설 (웹 채널)', meta: '08/25 · 한태민 담당자' },
                  { ev: '9월 공지 재안내 후 미열람 → 담당자 확인 요청 → 열람', meta: '09/01 16:10 · 공지' },
                  { ev: '설문 — 포스터 미수령 → 관리자 물류팀 이관', meta: '09/03 10:20 · 설문' },
                  { ev: '제빙기 이슈 FR-26090801 상향 → 관리자 시설팀 배정', meta: '09/08 08:55 → 09:30 · 이슈' },
                  { ev: '관리자 승계 승인 (한태민 → 이서준)', meta: '09/15 09:05 · 인수인계' },
                  { ev: '후임 첫 응대 · 재발 확인', meta: '09/15 10:12 · 응대' },
                ] },
              { name: '강동천호점', state: '정상', tone: 'pos', timeline: [
                  { ev: '채널 입장 · 점포 방 3인 구성 (김지아 매니저)', meta: '08/25 · 채널 전환' },
                  { ev: '9월 프로모션 공지 열람', meta: '09/01 09:04 · 공지' },
                  { ev: '신메뉴 제조 교육 이수 (김지아 매니저)', meta: '09/02 14:12 · 교육' },
                  { ev: '준비현황 설문 — 준비 완료', meta: '09/03 10:05 · 설문' },
                ] },
              { name: '남양주다산점', state: '이탈 위험', tone: 'red', timeline: [
                  { ev: '마지막 점주 문의', meta: '08/28 · 응대' },
                  { ev: '9월 공지 — 자동 재안내 후 열람', meta: '09/01 · 공지' },
                  { ev: '위생 점검 교육 미이수 · 10월 사전 설문 무응답', meta: '09/18 · 교육·설문' },
                  { ev: 'NOA 이탈 위험 판정 (3주 무활동 + 2개 신호)', meta: '09/22 · AI' },
                ] },
            ] },
          { name: '김나래 (1권역)', stores: '36개 점포', rate: '91%', tasks: '과업 9건', tone: 'pos' },
          { name: '정하윤 (1권역)', stores: '41개 점포', rate: '86%', tasks: '과업 15건', tone: 'amber' },
        ] },
      { name: '수도권 3권역', stores: '418개 점포 · 담당자 10명', rate: '84%', tone: 'amber' },
      { name: '영남권', stores: '540개 점포 · 담당자 13명', rate: '89%', tone: 'pos' },
      { name: '충청권', stores: '312개 점포 · 담당자 7명', rate: '71%', tone: 'red',
        agents: [
          { name: '최민호', stores: '45개 점포', rate: '68%', tasks: '과업 21건 중 14건', tone: 'red',
            storeList: [
              { name: '천안두정점', state: '이탈 위험', tone: 'red', timeline: [
                  { ev: '마지막 점주 문의', meta: '08/20 · 응대' },
                  { ev: '9월 공지 — 재안내 후에도 미열람 → 담당자 과업 기한 초과', meta: '09/03 · 공지' },
                  { ev: '교육 미이수 · 설문 무응답', meta: '09/05 · 교육·설문' },
                  { ev: 'NOA 이탈 위험 판정 (3주 무활동 + 2개 신호)', meta: '09/10 · AI' },
                ] },
            ] },
          { name: '윤서아', stores: '44개 점포', rate: '72%', tasks: '과업 18건 중 13건', tone: 'red' },
        ] },
      { name: '호남권', stores: '548개 점포 · 담당자 13명', rate: '86%', tone: 'amber' },
    ],
  },
  rooms: {
    sub: '이번 달 점포별 응대 건수. 응대가 끊긴 점포가 곧 관리 사각지대다.',
    bars: [
      { label: '하남미사점', value: 48, state: '신규 개점', tone: 'hi', tip: '개점 5주차 · 이슈 1건 처리' },
      { label: '강동천호점', value: 31, state: '정상', tone: 'hi', tip: '공지·교육·설문 전부 응답' },
      { label: '송파문정점', value: 22, state: '정상', tone: 'mid', tip: '응대 기준 준수' },
      { label: '구리인창점', value: 17, state: '물류 이관 1', tone: 'mid', tip: '포스터 재배송 완료' },
      { label: '천안두정점', value: 2, state: '이탈 위험', tone: 'low', tip: '9/10 조기 접촉 응대 2건 · 그 전 3주 무활동' },
    ],
    note: '막대 = 이번 달 응대 건수 · 전 점포 기준 응대 0건 점포는 NOA 이탈 위험 신호로 연결',
    metricLabel: '응대',
    unit: '건',
  },
  agents: {
    sub: '담당자별 담당 점포 수. 과부하 담당자는 응대 품질과 이탈 리스크로 이어진다.',
    rings: [
      { label: '충청권 평균', sub: '담당자 7명', pct: 89, tip: '1인당 44.6개점 · 권장 상한 대비 112%' },
      { label: '호남권', sub: '담당자 13명', pct: 84, tip: '1인당 42.2개점' },
      { label: '수도권 3권역', sub: '담당자 10명', pct: 84, tip: '1인당 41.8개점' },
      { label: '영남권', sub: '담당자 13명', pct: 83, tip: '1인당 41.5개점' },
      { label: '수도권 1·2권역', sub: '담당자 17명', pct: 80, tip: '1인당 40.1개점' },
    ],
  },
  audit: {
    sub: '담당 점포 수 · 응대 기준 준수율 · 과업 처리 건수. 주간 보고 없이 기록으로 비교한다.',
    rows: [
      { file: '이서준 · 수도권 2권역', type: '34개 점포', recv: '준수율 93% · 과업 12건 처리', count: '승계 2주차' },
      { file: '정하윤 · 수도권 1권역', type: '41개 점포', recv: '준수율 86% · 과업 15건 처리', count: '재배분 검토' },
      { file: '최민호 · 충청권', type: '45개 점포', recv: '준수율 68% · 과업 21건 중 14건', count: '증원 대상 권역' },
    ],
  },
  dailyBars: {
    sub: '최근 14일 전 권역 소통량. 공지·프로모션 구간 반응 확인.',
    values: [1240, 1180, 1320, 2860, 2140, 1460, 1080, 1220, 1390, 1810, 1520, 1340, 1260, 1190],
    max: 3000,
  },
  footnote:
    '운영 지표 — 점포 단위 기록을 전사 → 권역 → 담당자 → 점포 4단으로 집계. 당일 현황과 기간 추이를 구분.',
  labels: {
    doc: '권역별 열람 · 교육 · 설문 · 이슈',
    rooms: '점포별 응대 건수',
    agents: '권역별 담당자 부하',
    audit: '담당자 비교',
    auditCols: ['담당자 · 권역', '담당 점포', '응대 기준 · 과업', '비고'],
  },
};

const AI: MfgDashAiTab = {
  insight: {
    label: '이탈 위험 점포 · NOA 판정 [예시]',
    value: '38',
    valueSuffix: '개점',
    sub: '최우선 *충청권 17개점* · 담당자 1인당 *44.6개점* 과부하 해소 필요',
    ctaLabel: '가맹사업본부장 브리핑 →',
  },
  kpis: [
    {
      label: '이탈 위험 점포',
      value: '38개점',
      sub: '폐점·계약해지 선행 신호 감지',
      tag: 'est',
      drill: {
        title: '이탈 위험 판정 — 선행 신호 조합 [추정]',
        note: '3주 이상 무활동 · 교육 미이수 · 설문 무응답 세 신호가 모두 겹치는 점포. 가맹점 수가 4,000 → 2,500으로 줄어든 흐름에서 조기 감지가 핵심 [예시]',
        blocks: [
          {
            kind: 'vbar',
            subH: '권역별 이탈 위험 점포',
            rows: [
              { label: '충청권', value: 17, tone: 'red', sub: '담당자 과부하 44.6개점' },
              { label: '수도권 3권역', value: 9, tone: 'amber', sub: '신규 개점 밀집' },
              { label: '호남권', value: 7, tone: 'amber' },
              { label: '수도권 1·2권역', value: 3, tone: 'purple', sub: '수도권 2권역 3개 점포' },
              { label: '영남권', value: 2, tone: 'purple' },
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
      label: '응대 기준 준수율',
      value: '88%',
      sub: '일반 1h · 현장이슈 당일 [예시]',
      tag: 'est',
      drill: {
        title: '응대 기준 — 유형별 (동심원)',
        note: '응대 기준: 일반 문의 1h · 현장 이슈 당일 · 정산 문의 1일 [예시 기준 · 고객사 확정] · 전체 2,552/2,889건 = 88%',
        blocks: [
          {
            kind: 'rings',
            items: [
              { label: '현장 이슈 (당일)', pct: 78, tip: '준수 292/374건 · 78%' },
              { label: '일반 문의 (1h)', pct: 89, tip: '준수 1,842/2,070건 · 89%' },
              { label: '정산 문의 (1일)', pct: 94, tip: '준수 418/445건 · 94%' },
            ],
            colors: ['red', 'purple', 'navy'],
            centerV: '88%',
            centerL: '전체 준수율',
          },
        ],
      },
    },
    {
      label: '담당자 부하 지수',
      value: '44.6',
      delta: { text: '▲ 상한 초과', tone: 'bad' },
      sub: '충청권 1인당 담당 점포',
      tag: 'est',
      drill: {
        title: '담당자 부하 — 담당 점포 수와 응대 품질의 상관 [추정]',
        blocks: [
          {
            kind: 'vbar',
            subH: '권역별 담당자 1인당 담당 점포',
            rows: [
              { label: '충청권', value: 45, display: '44.6개점', tone: 'red', sub: '준수율 71%' },
              { label: '호남권', value: 42, display: '42.2개점', tone: 'amber', sub: '준수율 86%' },
              { label: '수도권 3권역', value: 42, display: '41.8개점', tone: 'amber', sub: '준수율 84%' },
              { label: '영남권', value: 42, display: '41.5개점', tone: 'purple', sub: '준수율 89%' },
              { label: '수도권 1·2권역', value: 40, display: '40.1개점', tone: 'purple', sub: '준수율 92%' },
            ],
            max: 48,
          },
          {
            kind: 'kv',
            title: '충청권 교차 근거',
            rows: [
              { k: '담당자 1인당 점포', v: '44.6개점 (전사 최고)', tone: 'red' },
              { k: '응대 기준', v: '71% (전사 88%)', tone: 'red' },
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
      sub: '담당자 과부하 · 이탈 위험 17개점',
      tag: 'est',
      drill: {
        title: '최우선 리스크 — 충청권 판정 근거',
        blocks: [
          {
            kind: 'vbar',
            subH: '권역별 응대 기준 준수율',
            rows: [
              { label: '충청권', value: 71, tone: 'red', sub: '담당자 7명 / 312개점' },
              { label: '수도권 3권역', value: 84, tone: 'amber', sub: '담당자 10명 / 418개점' },
              { label: '호남권', value: 86, tone: 'amber', sub: '담당자 13명 / 548개점' },
              { label: '영남권', value: 89, tone: 'purple', sub: '담당자 13명 / 540개점' },
              { label: '수도권 1·2권역', value: 92, tone: 'purple', sub: '담당자 17명 / 682개점' },
            ],
            max: 100,
            unit: '%',
          },
          {
            kind: 'chips',
            rows: [
              { label: '권고', value: '담당자 2명 증원 시 1인당 34.7개점 — 타 권역 수준', tone: 'pos' },
              { label: '대안', value: '개점 3개월 미만 점포를 전담 담당자로 분리', tone: 'pos' },
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
          sub: '312개점 · 담당자 7명',
          cells: [17, 28, 24],
          tail: '17개점',
          tailTone: 'red',
          tipLines: ['담당자 1인당 44.6개점 — 전사 최고', '응대 기준 71% · 교육 이수 77%', '이탈 위험 점포의 45%가 이 권역'],
        },
        {
          label: '수도권 3권역',
          sub: '418개점 · 담당자 10명',
          cells: [9, 11, 14],
          tail: '9개점',
          tailTone: 'amber',
          tipLines: ['개점 3개월 미만 점포 밀집', '신규 점주 온보딩 부하'],
        },
        {
          label: '호남권',
          sub: '548개점 · 담당자 13명',
          cells: [7, 19, 12],
          tail: '7개점',
          tailTone: 'amber',
          tipLines: ['교육 미이수 19개점 — 재알림 예약됨'],
        },
        {
          label: '영남권',
          sub: '540개점 · 담당자 13명',
          cells: [5, 12, 9],
          tail: '2개점',
          tailTone: 'amber',
          tipLines: ['준수율 89% · 신호 3종 중첩 2개점'],
        },
        {
          label: '수도권 1·2권역',
          sub: '682개점 · 담당자 17명',
          cells: [3, 6, 8],
          tail: '3개점',
          tailTone: 'amber',
          tipLines: ['준수율 92% · 전 권역 최고', '이탈 위험 3개 점포 — 모두 수도권 2권역 (담당 이서준)'],
        },
      ],
      max: 28,
      palette: 'red',
      tailHeader: '이탈 위험 [추정]',
      cellMetricLabel: '해당 신호',
      cellUnit: '개점',
      cellZeroLabel: '신호 없음',
      tailMetricLabel: '이탈 위험',
    },
  },
  quality: {
    sub: '담당자 담당 점포 수 구간별 응대 품질. 과부하 구간에서 품질이 꺾인다.',
    gauges: [
      { pct: 91, label: '42개점 이하 담당 담당자 · 43명', tone: 'purple', tip: '준수율 목표 85% 상회' },
      { pct: 73, label: '42개점 초과 담당 담당자 · 17명', tone: 'amber', tip: '목표 하회 · 증원·재배분 검토 필요' },
    ],
    rings: [
      { label: '수도권 1·2권역', sub: '담당자 17명', pct: 92, tip: '준수율 92% · 1인당 40.1개점' },
      { label: '영남권', sub: '담당자 13명', pct: 89, tip: '준수율 89% · 1인당 41.5개점' },
      { label: '호남권', sub: '담당자 13명', pct: 86, tip: '준수율 86% · 1인당 42.2개점' },
      { label: '수도권 3권역', sub: '담당자 10명', pct: 84, tip: '준수율 84% · 1인당 41.8개점' },
      { label: '충청권', sub: '담당자 7명', pct: 71, tip: '준수율 71% · 1인당 44.6개점' },
    ],
  },
  dailyLine: {
    sub: '최근 14일 응대 기준 준수율 추이. 공지 발송일 전후 부하 확인.',
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
          { name: '응대 누락', before: 198, after: 12, status: '해결', ev: '단계형 응대 기준(1h 담당자 · 2h 관리자) 도입 → 198건→12건' },
          { name: '공지 도달 확인 불가', before: 1, after: 0, status: '해결', ev: '도달·열람 집계 + 미열람 재안내' },
          { name: '충청권 담당자 과부하', before: 0, after: 1, status: '미해결', ev: '1인당 44.6개점 — 증원 품의 진행 중' },
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
          { name: '담당자 교체 시 이력 단절', before: 1, after: 0, status: '해결', ev: '권역 단위 일괄 승계 — 재설명 0' },
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
          { name: '담당자 개인폰 사각지대', before: 1, after: 0, status: '해결', ev: '2,500개점 공식 채널 전환' },
          { name: '교육 이수 미측정', before: 1, after: 0, status: '해결', ev: '점포·인원 단위 이수 집계' },
          { name: 'ERP 매출 지표 연동', before: 0, after: 1, status: '조치중', ev: 'ERP 매출 지표 연동 범위 협의 중 [검토]' },
        ],
      },
      {
        key: '연',
        label: '2026 연간(누적)',
        done: 58,
        doing: 9,
        open: 6,
        items: [
          { name: '가맹점 채널 전환', before: 1, after: 0, status: '해결', ev: '2,500개점 · 담당자 60명 전환 완료' },
          { name: '점포 이력 승계 체계', before: 1, after: 0, status: '해결', ev: '담당자 교체 시 점포 이력 일괄 승계' },
          { name: '권역별 담당자 재배분', before: 0, after: 1, status: '조치중', ev: '부하 지수 기반 재배분안 수립 중' },
        ],
      },
    ],
  },
  brief: {
    title: '가맹사업본부장 브리핑 리포트',
    sub: '이탈 위험·담당자 부하·현장 품질을 1장으로 정제 · 재가공 없이 경영진 보고',
    primaryLabel: '본부장 브리핑 PDF',
    secondaryLabel: 'Excel',
    reportTitle: '가맹사업본부 통합 운영 브리핑',
    reportSub: '2026.09 · 서윤아 팀장 → 가맹사업본부장 · NOA 자동 생성',
    reportSections: [
      {
        title: '1. 임원 요약',
        lines: [
          '공지 열람률 — 최초 82% → 재안내 후 98% (전월까지는 측정 불가)',
          '응대 누락 — 198건 → 12건 (▼94%)',
          '이탈 위험 점포 — 38개점 감지, 조기 접촉으로 24개점 복귀 (63%)',
        ],
      },
      {
        title: '2. 판정 — 최우선 리스크 (담당자 부하 × 준수율 × 이탈 신호)',
        lines: [
          '충청권 — 담당자 1인당 44.6개점(전사 최고) · 준수율 71% · 이탈 위험 17개점(전사의 45%)',
          '수도권 3권역 — 개점 3개월 미만 밀집 · 준수율 84% · 이탈 위험 9개점',
        ],
      },
      {
        title: '3. 권고 · 진행 중',
        lines: [
          '충청권 담당자 2명 증원 시 1인당 34.7개점 — 타 권역 수준으로 정상화',
          '42개점 초과 담당 담당자 17명 구간에서 준수율이 91% → 73%로 꺾임',
          'ERP 매출 지표 연동 협의 중 — 소통 지표와 매출을 한 화면에서 교차 예정 [검토]',
        ],
      },
    ],
    reportFoot: 'NOA가 운영지표를 이탈 위험·담당자 부하 축으로 크로스해 자동 생성 · 재가공 없이 경영진 보고 가능',
  },
  labels: { tag: '응대 기준', metric: '응대 기준 준수율', gauges: '담당 점포 수 구간별 준수율', rings: '권역별 준수율' },
  footnote:
    'AI 운영지표(NOA) — 운영지표를 이탈 위험과 담당자 부하 축으로 교차 분석. 당일 현황(판정·품질)과 기간 추이(조치)를 구분.',
};

function dashboard(partial: Partial<MfgDashboardState>): MfgDashboardState {
  return {
    tab: 'gen',
    title: '가맹본부 통합 인사이트 대시보드',
    subtitle: '서윤아 관리자 · 전국 2,500개 점포 · 담당자 60명 · 2026.09',
    gen: GEN,
    ai: AI,
    ...partial,
  };
}

/* ── STATE 4: 이탈 위험 점포 조치 지정 → 담당자 접촉 → 대시보드 회신 ──
 * 두 단계로 나눈다. 1) 관리자가 과업을 지정해 담당자 앱에 도착 2) 담당자가 점주에게 연락해 결과가 돌아온다 */

/** 0: 지정 전 · 1: 과업 지정(담당자 도착) · 2: 점주 접촉과 결과 회신 */
type RiskStage = 0 | 1 | 2;

const RISK_STORES = [
  { tab: 'd', name: '남양주다산점', ownerId: 'owner3', owner: '김도현 점주' },
  { tab: 'e', name: '잠실새내점', ownerId: 'owner4', owner: '이수진 점주' },
  { tab: 'f', name: '강동둔촌점', ownerId: 'owner5', owner: '박정우 점주' },
] as const;

const CONTACT_TEXT = '점주님, 담당 이서준입니다. 요즘 매장 운영 어떠신지 여쭙고 싶어 연락드렸어요. 이번 주 방문 일정 잡아도 될까요?';
const RESEND_TEXT = '[설문 재발송] 9월 프로모션 준비현황 — 2분이면 됩니다';
const REPLY_TEXT = '안 그래도 매출이 좀 빠져서 고민이었어요. 목요일 오후 괜찮습니다';

function riskClock(stage: RiskStage): string {
  return stage === 2 ? '11:05' : stage === 1 ? '10:31' : '10:30';
}

function riskOwnerItems(store: (typeof RISK_STORES)[number], stage: RiskStage): MfgKakaoItem[] {
  const items: MfgKakaoItem[] = [
    { id: 'd0', kind: 'date', text: '9월 14일 (월)' },
    { id: 'edu', kind: 'message', senderId: 'notice', text: '[교육] 위생 점검 교육 (5분) — 9/18까지 이수 부탁드립니다', time: '09:00' },
    { id: 'srv', kind: 'message', senderId: 'notice', text: '[설문] 10월 프로모션 사전 조사 — 9/18까지', time: '09:00' },
    { id: 'quiet', kind: 'joined', text: '— 3주째 점포 방 대화 없음 · 위생 교육 미이수 · 10월 사전 설문 무응답' },
  ];
  if (stage >= 2 && store.tab === 'd') {
    items.push(
      { id: 'd1', kind: 'date', text: '9월 22일 (화)' },
      { id: 'c1', kind: 'message', senderId: 'sv2', text: CONTACT_TEXT, time: '10:40', isNew: true },
      { id: 'c2', kind: 'message', senderId: 'sv2', text: RESEND_TEXT, time: '10:41', isNew: true },
      { id: 'c3', kind: 'message', senderId: store.ownerId, text: REPLY_TEXT, time: '11:05', isNew: true },
    );
  }
  return items;
}

function riskOwnerPhone(stage: RiskStage): MfgPhoneDef {
  return {
    id: 'owner',
    ownerId: 'owner3',
    ownerLabel: '이탈 위험 점포 3곳 (NOA 판정)',
    ownerSub: '',
    badge: 'channel',
    badgeLabel: '점포 채널',
    channelTheme: true,
    statusTime: riskClock(stage),
    activeTab: 'd',
    tabs: RISK_STORES.map((store) => ({
      id: store.tab,
      label: store.name,
      phone: {
        ownerId: store.ownerId,
        ownerLabel: `${store.owner} · ${store.name}`,
        ownerSub: '점포 방 · 이탈 위험 [예시]',
        headerTitle: store.name,
        headerCount: '3',
        items: riskOwnerItems(store, stage),
        highlight: stage === 2 && store.tab === 'd',
      },
    })),
  };
}

function riskSvPhone(stage: RiskStage): MfgPhoneDef {
  const items: MfgKakaoItem[] = [{ id: 'date', kind: 'date', text: '9월 22일 (화)' }];
  if (stage === 0) {
    items.push({ id: 'idle', kind: 'joined', text: '오늘 과업 없음 — 담당 34개 점포 정상 응대 중' });
  }
  if (stage >= 1) {
    items.push({ id: 't', kind: 'joined', text: '📋 관리자 과업 도착 — 이탈 위험 3개 점포 접촉 · 기한 9/25', at: '10:31', isNew: true });
  }
  if (stage >= 2) {
    items.push(
      { id: 'c1', kind: 'message', senderId: 'sv2', text: CONTACT_TEXT, time: '10:40', isNew: true },
      { id: 'c2', kind: 'message', senderId: 'sv2', text: RESEND_TEXT, time: '10:41', isNew: true },
      { id: 'c3', kind: 'message', senderId: 'owner3', text: REPLY_TEXT, time: '11:05', isNew: true },
      { id: 'r', kind: 'joined', text: '✓ 남양주다산점 접촉 완료 — 9/25 방문 예정 · 결과 기록', isNew: true },
    );
  }
  return {
    id: 'sv2',
    ownerId: 'sv2',
    ownerLabel: '이서준 담당자 · 수도권 2권역',
    ownerSub: 'Cowork App · 업무용',
    badge: 'company',
    badgeLabel: '담당자',
    companyFrame: true,
    companyRibbonLabel: 'Cowork App',
    headerTitle: stage >= 1 ? '과업 · 이탈 위험 접촉' : '오늘 과업',
    screen: 'cowork-app',
    appCaption: '담당 34개 점포',
    appBadge: 'Cowork App',
    appContext:
      stage >= 1
        ? {
            initial: '3',
            title: '이탈 위험 3개 점포 접촉',
            sub: '지정 서윤아 관리자 · 기한 9/25',
            chips: stage >= 2 ? ['접촉 1/3', '설문 재발송'] : ['접촉 0/3'],
            tag: '과업',
          }
        : { initial: '34', title: '수도권 2권역 34개 점포', sub: '기준 초과 과업만 도착', tag: '담당' },
    statusTime: riskClock(stage),
    items,
    highlight: stage >= 1,
  };
}

function riskConsole(stage: RiskStage): MfgWorkspaceDef {
  const assigned = stage >= 1;
  const msgs: MfgWsMessage[] = [
    { id: 'noa', kind: 'system-hi', text: '🤖 NOA 판정 — 수도권 2권역 이탈 위험 3개 점포 (3주 무활동 + 교육 미이수 + 설문 무응답)' },
    {
      id: 'assign',
      kind: 'out',
      senderId: 'hq',
      srcLabel: '조치 지정',
      text: assigned ? '이탈 위험 3개 점포 접촉을 이서준 담당자에게 지정했습니다.' : '위험 점포를 고르고 담당자와 기한을 정합니다.',
      card: {
        title: '🎯 담당자 과업 지정',
        rows: [['대상', '남양주다산점 · 잠실새내점 · 강동둔촌점']],
        choices: [
          { k: '담당자', opts: ['이서준'], pick: '이서준' },
          { k: '기한', opts: ['1일', '3일', '1주'], pick: assigned ? '3일' : undefined },
          { k: '조치', opts: ['점주 접촉', '설문 재발송', '방문'], pick: assigned ? '점주 접촉' : undefined },
        ],
      },
      time: '09/22 10:30',
      metaText: assigned ? '담당자 앱 전달' : undefined,
      isNew: assigned,
    },
  ];
  if (stage >= 2) {
    msgs.push({ id: 'back', kind: 'system', text: '↩ 11:05 남양주다산점 접촉 결과 회신 — 9/25 방문 예정 · 조치 현황 "진행 중"', at: '11:06', isNew: true });
  }
  return {
    role: 'admin',
    hideRoleTabs: true,
    label: ADMIN_LABEL,
    headerTitle: '이탈 위험 · 조치 지정',
    headerSub: 'NOA 판정 → 관리자 지정 → 담당자 접촉 → 결과 회신',
    dashLabel: '가맹본부 대시보드',
    dashSubLabel: '운영지표 · AI 운영지표',
    roomsLabel: '조치 현황',
    rooms: [
      {
        id: 'risk',
        name: '수도권 2권역 이탈 위험',
        preview: stage >= 2 ? '진행 중 · 접촉 1/3' : assigned ? '지정됨 · 접촉 대기' : '미지정 3',
        color: '#C0392B',
        active: true,
      },
    ],
    sideNote: '판정은 조회로 끝나지 않는다',
    board: {
      metrics: [
        { label: '이탈 위험 (전국)', value: '38개 점포', pct: 100, tone: 'red' },
        {
          label: '수도권 2권역 조치',
          value: stage >= 2 ? '진행 중 3 · 접촉 1' : assigned ? '지정 3 · 접촉 0' : '미지정 3',
          pct: stage >= 2 ? 33 : 0,
          tone: stage >= 2 ? 'amber' : 'red',
          isNew: stage >= 1,
        },
      ],
      listTitle: stage >= 2 ? '조치 현황 — 담당자 기록이 그대로 반영' : assigned ? '담당자 이서준에게 지정됨' : '위험 점포 — 선택됨',
      list: RISK_STORES.map((store) => ({
        name: store.name,
        state: stage >= 2 ? (store.tab === 'd' ? '접촉 완료 · 방문 9/25' : '진행 중') : assigned ? '접촉 대기' : '미지정',
        tone: stage >= 2 ? (store.tab === 'd' ? ('pos' as const) : ('amber' as const)) : assigned ? ('amber' as const) : ('red' as const),
      })),
    },
    messages: msgs,
  };
}

function riskArena(stage: RiskStage): Omit<MfgArenaState, 'action' | 'after'> {
  return {
    layout: 'split',
    phonesLabel: '📱 위험 점포 점포 방 ↔ 담당자 Cowork App',
    phonesBadge: '조치 연결',
    actors: FRANCHISE_ACTORS,
    phones: [riskOwnerPhone(stage), riskSvPhone(stage)],
    moreSlot: {
      title: '조기 접촉으로 38개 점포 중 24개 점포 복귀 [예시]',
      sub: '관리자 지시가 구두가 아니라 과업으로 — 이행 여부와 결과가 대시보드에 남는다',
    },
    workspace: riskConsole(stage),
    ...(stage >= 2 ? { banner: '관리자가 판단하고, 담당자가 접촉하고, 결과가 다시 관리자에게 기록된다' } : {}),
  };
}

const VALUE: MfgValueStripDef = {
  sell: '관리자 판단이 담당자 과업과 점주 접촉으로 이어지고 결과가 회신 · 같은 데이터를 사람 집계와 AI 판정 두 층으로',
  pain: '담당자 보고로만 점포 상태를 파악해 폐점 선행 신호를 놓치고, 관리자 지시가 구두로 전달돼 이행 여부를 모름',
  roi: '응대 누락 198→12건 · 공지 열람률 98% · 조기 접촉으로 24개 점포 복귀 · 충청권 담당자 2명 증원 시 인당 34.7개 점포 [예시]',
};

export const chapter04HqDashboard: Chapter = {
  id: 4,
  act: 4,
  title: '가맹본부 대시보드 — 관리자 판단을 담당자와 점주까지 연결',
  subtitle: '자산화 완성 (NOA 적용 이후) · 무대: 관리자 대시보드 + 담당자 Cowork App + 점주 폰',
  narration:
    '관리자는 주간 보고를 기다리지 않고 전사 · 권역 · 담당자 · 점포 순으로 기록을 확인합니다. NOA는 3주 무활동 · 교육 미이수 · 설문 무응답이 겹치는 점포를 이탈 위험으로 판정하고, 권역별 담당자 부하와 응대 기준 준수율을 함께 봅니다. 판정은 조회로 끝나지 않습니다. 관리자가 위험 점포를 담당자 과업으로 지정하면 담당자 앱과 점포 방까지 조치가 전달되고, 결과가 대시보드로 돌아옵니다. "관리자가 판단하고, 담당자가 접촉하고, 결과가 다시 관리자에게 기록됩니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 22일 (화)',
        jump: '1주 뒤',
        before: '지난 신들: 응대 · 공지 · 이슈가 모두 점포 단위 기록으로 쌓였습니다. 이번 신: 관리자가 그 기록을 한 화면에서 봅니다 — 주간 보고 없이.',
      },
      pauseAfterMs: 6000,
      guide:
        '관리자 대시보드입니다. 운영 지표 탭 — 소통 자산화 · 공지 열람률 · 응대 누락 · 이탈 위험 KPI 아래로 전사 → 권역 → 담당자 → 점포 드릴다운과 담당자 비교가 이어집니다.',
      mfgDashboard: dashboard({}),
      memo: {
        title: 'STATE 1 — 운영 지표 진입',
        meta: '신 4 · 대시보드',
        situation:
          '관리자가 KPI 4장(소통 자산화 2,500 · 공지 열람 98% · 응대 누락 198→12건 · 이탈 위험 38개 점포)과 당일 현황 · 기간 추이를 한 화면으로 본다.',
        interact: 'KPI 카드를 클릭하면 근거가 펼쳐집니다. 다음 → 드릴다운',
        feel: ['"주간 보고를 기다리지 않습니다"'],
        connect: ['→ 권역 · 담당자 · 점포'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 22일 (화)',
        before: '관리자가 권역 → 담당자 → 점포로 들어갑니다. 하남미사점에는 신 1~3의 기록이 그대로 남아 있습니다.',
      },
      pauseAfterMs: 6000,
      mfgDashboard: dashboard({ drill4Open: { region: '수도권 1·2권역', agent: '이서준 (2권역)', store: '하남미사점' } }),
      memo: {
        title: 'STATE 2 — 권역 · 담당자 · 점포 드릴다운',
        meta: '신 4 · 대시보드',
        situation:
          '관리자가 권역에서 담당자로, 담당자에서 점포로 들어간다. 하남미사점 이력에는 재안내 · 이관 · 이슈 배정 · 승계 승인까지 관리자 결정이 모두 남아 있다.',
        interact: '권역 → 담당자 → 점포를 차례로 눌러 보세요. 다음 → AI 운영지표',
        feel: ['신 0의 "특이사항 없음" 대신 기록'],
        connect: ['→ NOA 판정'],
      },
    },
    {
      index: 2,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 22일 (화)',
        before: 'NOA(운영 기록으로 폐점 위험을 판정하는 AI)가 위험 점포 38곳을 짚습니다 — 3주 무활동 · 교육 미이수 · 설문 무응답이 겹친 곳.',
      },
      pauseAfterMs: 6000,
      mfgDashboard: dashboard({ tab: 'ai' }),
      memo: {
        title: 'STATE 3 — AI 운영지표 (NOA)',
        meta: '신 4 · 대시보드',
        situation:
          'NOA가 3주 무활동 · 교육 미이수 · 설문 무응답이 겹치는 38개 점포를 이탈 위험으로 판정하고, 충청권 담당자 부하(인당 44.6개 점포)와 증원 권고(2명)를 함께 제시한다.',
        interact: 'AI KPI를 눌러 판정 근거 확인. 다음 → 조치 지정',
        feel: ['"가맹점 수가 줄어드는 이유를 숫자로 봅니다"'],
        connect: ['→ 판정을 조치로'],
      },
    },
    {
      index: 3,
      mfgValueStrip: VALUE,
      mfgCaption: {
        when: '9월 22일 (화) 10:30',
        before: 'NOA가 짚은 수도권 2권역 위험 점포 3곳(남양주다산점 · 잠실새내점 · 강동둔촌점) — 관리자가 담당자에게 접촉을 맡깁니다.',
        after: [
          '과업이 담당자 앱에 기한과 함께 도착했습니다. 이제 담당자가 점주에게 연락할 차례입니다.',
          '담당자가 남양주다산점 점주에게 연락하고 설문을 다시 보냈습니다. 결과가 관리자 화면에 "진행 중"으로 돌아왔습니다.',
        ],
      },
      pauseAfterMs: 6500,
      mfgArena: {
        ...riskArena(0),
        action: { label: '담당자 과업 지정', at: 'workspace', doneLabel: '✓ 과업 지정' },
        after: {
          ...riskArena(1),
          action: { label: '점주 접촉', at: 'phone', phoneId: 'sv2', doneLabel: '✓ 결과 회신 · 진행 중' },
          after: riskArena(2),
        },
      },
      memo: {
        title: 'STATE 4 — 조치 지정과 결과 회신',
        meta: '신 4 · ROI',
        situation:
          '관리자가 수도권 2권역 이탈 위험 3개 점포를 담당자 이서준에게 접촉 과업(기한 3일)으로 지정한다. 담당자가 점포 방에서 접촉하고 설문을 재발송하면, 대시보드 조치 현황이 "진행 중"으로 바뀐다.',
        interact: '관리자 콘솔 [담당자 과업 지정] → 담당자 앱 [점주 접촉]. 데모 완주 🎉',
        feel: ['"결과가 이 화면에 다시 기록됩니다"'],
        connect: ['신 0→4: 보이지 않던 3단 구조 → 관리자 기준 · 담당자 과업 · 점주 기록이 한 줄로'],
      },
    },
  ],
};
