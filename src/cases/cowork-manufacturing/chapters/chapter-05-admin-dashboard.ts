import type { Chapter, MfgDashboardState,
  MfgValueStripDef,
} from '../../_types';

/**
 * 신 4. 관리자 대시보드 — 자산화의 결실 (운영지표 + AI 운영지표).
 * 거래처 폰이 사라지고, 관리자가 전체 소통을 데이터로 조망한다.
 * 운영 지표(사람 집계)와 AI 운영지표(NOA 자동 분석)의 2층 구조.
 */

function dashboard(partial: Partial<MfgDashboardState>): MfgDashboardState {
  return {
    tab: 'gen',
    headerTitle: '채널 운영 대시보드 · 제조 파트너 협업',
    aiTabLabel: 'AI 운영지표',
    aiTabSlotTag: 'NOA',
    kpis: [
      { value: '57', label: '연결 거래처', tag: '확정', tagTone: 'ok' },
      { value: '34 / 10', label: '대화방 개설/가동', tag: '확정', tagTone: 'ok' },
      { value: '328', label: '누적 파일 공유', tag: '추정', tagTone: 'est', tone: 'muted' },
      { value: '9→1', label: '파일 오류 5→6월', tag: '확정', tagTone: 'ok', tone: 'good' },
    ],
    risk: {
      title: '리스크 파일 추적 · 감사 이력',
      sub: '단가·견적 등 민감 문서가 언제, 누구에게, 어느 거래처로 나갔는지 전량 기록. 개인 카톡에서는 불가능했던 통제입니다.',
      rows: [
        { doc: '○○산업_단가표_0712.xlsx', level: 'hi', org: '○○산업', person: '이영업 대리', badge: '민감' },
        { doc: '△△전선_견적서_0714.pdf', level: 'hi', org: '△△전선', person: '최구매 차장', badge: '민감' },
        { doc: '○○산업_발주서_0715.xlsx', level: 'md', org: '○○산업', person: '박열정 과장', badge: '주의' },
      ],
      note: '※ 민감 문서 유출 시 수신자·시점 추적으로 책임 소재 확인. 금융·제조 컴플라이언스 대응. [추정]',
    },
    fileTypes: [
      { icon: '📄', iconBg: '#F0EBFF', iconColor: '#5B3FE4', name: '견적서', count: 96 },
      { icon: '📊', iconBg: '#FFF3E0', iconColor: '#E67E22', name: '발주서', count: 112 },
      { icon: '🖼️', iconBg: '#E8F5E9', iconColor: '#27AE60', name: '현장 사진', count: 74 },
      { icon: '📋', iconBg: '#E3F2FD', iconColor: '#1E88E5', name: '납기리스트', count: 46 },
    ],
    versions: {
      title: '동일 문서 반복 공유 · 버전 추적',
      sub: '같은 문서가 몇 번 오갔는지, 최신본이 무엇인지',
      rows: [
        { icon: '📄', name: '○○산업_견적서_0715', sub: '최초 07/15 → 재전송 3회 · 최신본 v4', badge: '6회 공유', hot: true, latest: '최신 v4' },
        { icon: '📊', name: '○○산업_발주서_0715', sub: '최초 07/15 → 재전송 1회 · 최신본 v2', badge: '3회 공유', latest: '최신 v2' },
        { icon: '📋', name: '△△전선_납기리스트_0712', sub: '최초 07/12 → 재전송 2회 · 최신본 v3', badge: '5회 공유', hot: true, latest: '최신 v3' },
      ],
      note: '※ 개인 카톡에서는 "견적서 최종/진짜최종" 혼선으로 어느 게 최신인지 확인 불가. Cowork+는 동일 문서 재전송을 묶어 최신본을 지정. [추정]',
    },
    ranking: {
      title: '활동 랭킹',
      sub: '대화량·파일교환 상위 (핵심 거래처 식별)',
      rows: [
        { no: 1, name: '○○산업 이영업 대리', msg: 132, files: 21 },
        { no: 2, name: '△△전선 최구매 차장', msg: 98, files: 15 },
        { no: 3, name: '○○산업 박열정 과장', msg: 82, files: 17 },
        { no: 4, name: '□□기업 한발주 과장', msg: 73, files: 12 },
      ],
    },
    accounts: {
      title: '거래처별 활동',
      sub: '막대를 클릭하면 담당자별 상세가 아래로 펼쳐집니다',
      rows: [
        {
          name: '○○산업',
          pct: 88,
          color: '#E67E22',
          msg: 214,
          files: 38,
          members: [
            { name: '이영업 대리', msg: 132, files: 21, lastDoc: '발주서.xlsx' },
            { name: '박열정 과장', msg: 82, files: 17, lastDoc: '견적서.pdf' },
          ],
        },
        {
          name: '△△전선',
          pct: 64,
          color: '#27AE60',
          msg: 156,
          files: 24,
          members: [
            { name: '최구매 차장', msg: 98, files: 15, lastDoc: '납기리스트.xlsx' },
            { name: '정자재 대리', msg: 58, files: 9, lastDoc: '품목정보.pdf' },
          ],
        },
        {
          name: '□□기업',
          pct: 50,
          color: '#5B8FE4',
          msg: 121,
          files: 19,
          members: [
            { name: '한발주 과장', msg: 73, files: 12, lastDoc: '발주서.xlsx' },
            { name: '윤구매 대리', msg: 48, files: 7, lastDoc: '견적서.pdf' },
          ],
        },
        { name: '외 54개 거래처', pct: 38, color: '#8E44AD' },
      ],
      note: '※ 개인 카카오톡 시절에는 담당자 폰 안에 대화가 갇혀 이 집계 자체가 불가능. 통합·자산화가 대시보드의 전제입니다.',
    },
    aiSlot: {
      title: 'AI 운영지표 레이어 · NOA',
      sub: '같은 데이터 위에서 NOA(AI)가 응대 품질·CX 이탈·병목을 자동 분석하는 지능형 레이어입니다. 기본 운영지표(사람 집계) 위에 얹히는 두 번째 층입니다.',
    },
    aiCards: [
      {
        icon: '📊',
        title: 'AI Insight — 현상 분석 → 개선',
        tag: 'NOA',
        desc: '채널 대화·파일 패턴을 분석해 응답 지연 구간, 반복 문의 유형, 병목 담당자를 자동 도출하고 개선안을 제시합니다.',
      },
      {
        icon: '✅',
        title: 'AI QA — 응대 품질',
        tag: 'NOA',
        desc: '담당자 응대를 자동 평가해 누락·오응대·지연을 탐지합니다. 불완전 판매 리스크를 사전 차단합니다.',
      },
      {
        icon: '📡',
        title: 'CX 실시간 모니터링',
        tag: 'NOA',
        desc: '거래처 만족도·이탈 신호를 실시간 감지해 관리자에게 알립니다. 파트너 이탈 방지로 매출 방어에 기여합니다.',
      },
    ],
    aiNote:
      '※ 운영 지표 탭은 사람이 집계하던 것을 같은 데이터 위에서 한 화면으로, AI 운영지표 탭은 그 위에서 NOA가 자동 분석한 결과를 보여줍니다.',
    ...partial,
  };
}

const VALUE: MfgValueStripDef = {
  sell: '같은 데이터를 사람 집계(운영지표)와 AI 분석(AI 운영지표) 두 층으로 — 재가공 없이 경영진 보고.',
  pain: '과거: 담당자 폰에 갇힌 대화로 집계 불가 · 응대 품질·이탈 신호를 사람이 놓침',
  roi: '파일 오류 9→1건 [확정] · 민감 문서 감사 이력 확보 · AI 이탈·병목 선제 감지 [추정]',
};

export const chapter05AdminDashboard: Chapter = {
  id: 5,
  act: 4,
  title: '관리자 대시보드 — 자산화의 결실',
  subtitle: '자산화 완성 (NOA 적용 이후) · 무대: 이윤 관리자 PC (운영지표 + AI 운영지표)',
  narration:
    '거래처 폰이 사라지고, 관리자가 전체 소통을 데이터로 조망합니다. 개별 카톡에 묻혀 휘발되던 대화가 관리자 한 화면의 데이터가 되어, 재가공 없이 경영진께 바로 보고할 수 있습니다. 여기서 한 층 더 — NOA가 이 데이터를 분석해 응대 품질을 평가하고, 이탈 신호를 실시간으로 잡습니다. "개별 카톡에 묻혀 있던 데이터가, 회사의 전략적 자산이자 AI 분석 대상이 됩니다."',
  stage: 'manufacturing',
  states: [
    {
      index: 0,
      mfgValueStrip: VALUE,
      pauseAfterMs: 6000,
      guide:
        '관리자 뷰 대시보드입니다. 운영 지표 탭 — 상단 KPI, 리스크 파일 추적(감사 이력), 파일 유형별, 버전 추적, 활동 랭킹, 거래처별 활동이 한 화면에 집계됩니다.',
      mfgDashboard: dashboard({}),
      memo: {
        title: 'STATE 1 — 운영 지표 진입',
        meta: '신 4 · 대시보드',
        situation:
          '관리자가 대시보드를 열어 KPI(거래처 57 · 대화방 34/10 · 누적 파일 328 · 오류 9→1)·리스크 파일·거래처 활동을 한 화면으로 본다.',
        interact: '다음 → 거래처 드릴다운',
        feel: ['"재가공 없이 경영진께 바로 보고"'],
        connect: ['→ 담당자별 상세'],
      },
    },
    {
      index: 1,
      mfgValueStrip: VALUE,
      pauseAfterMs: 5500,
      mfgDashboard: dashboard({ openAccount: '○○산업' }),
      memo: {
        title: 'STATE 2 — 거래처 드릴다운',
        meta: '신 4 · 대시보드',
        situation:
          '거래처 막대를 클릭하면 담당자별 상세가 펼쳐진다. ○○산업 이영업 대리·박열정 과장의 대화량·파일·최근 문서를 파고든다.',
        interact: '막대 클릭으로 다른 거래처도 펼침 가능. 다음 → AI 운영지표',
        feel: ['개별 담당자 단위까지 데이터로'],
        connect: ['→ NOA 분석 레이어'],
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
          'AI 운영지표 탭에서 NOA가 응대 품질·CX 이탈·병목을 자동 분석한 지표를 본다. AI Insight · AI QA · CX 실시간 모니터링.',
        interact: '데모 완주 🎉',
        feel: ['"보이지 않던 문제가 데이터로 드러나 매출을 지킵니다"'],
        connect: ['신 0→4: 사각지대 → 통제 → 해결 → 확장 → 자산화 완결'],
      },
    },
  ],
};
