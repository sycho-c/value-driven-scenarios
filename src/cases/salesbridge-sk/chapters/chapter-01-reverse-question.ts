import type { Chapter } from '../../_types';
import { makeSkTimeline, makeSkAttrition } from '../_shared';

/**
 * Ch.1 — 귀사는 지금 이 화면을 볼 수 있나요? (Before · 문제 인식)
 *
 * 이 챕터는 "Before 세계"다. 키보드 ← → 로 한 장면씩 넘기면 각 STATE가 하나의 설명 단위로 이어진다:
 * 역질문 → 빈 COSS → 채널 분산 → 퇴사로 데이터 소멸 → 3가지 리스크.
 * (화면 내부 Before/After 토글 없음 — Before는 이 챕터, After는 Ch.2가 담당)
 */
export const chapter01ReverseQuestion: Chapter = {
  id: 1,
  act: 1,
  title: '귀사는 지금 이 화면을 볼 수 있나요?',
  subtitle: 'Before — 자기 문제를 스스로 인식 (개인폰으로 일하는 현재)',
  narration:
    'Ch.0에서 본 화면을 기준으로 단 하나의 질문을 던집니다. "귀사의 영업사원들이 오늘 고객과 나눈 대화가 지금 어디에 있나요?" 이 챕터는 그 답이 "개인 폰"일 때 벌어지는 일을 한 장면씩 보여줍니다 — 빈 COSS, 세 곳에 흩어진 대화, 핵심 영업사원의 퇴사로 사라지는 2년치 데이터, 그리고 그 모든 것이 개인폰 사용이라는 하나의 원인에서 비롯된다는 것.',
  stage: 'rentacar',
  states: [
    {
      index: 0,
      pauseAfterMs: 6000,
      revealRhythm: 'cinematic',
      guide: '화면 중앙에 단 하나의 질문. 의사결정권자가 직접 선택지를 클릭합니다. 어떤 답이든 "확인해봅시다"로 이어집니다.',
      rentacarPanel: {
        view: 'question',
        question: '귀사의 영업사원들이 오늘 고객과 나눈 대화가\n지금 이 순간 어디에 있나요?',
        questionSub: '하나를 선택해 주세요. 어떤 답이든 함께 확인해 봅니다.',
        choices: [
          { id: 'company', label: '회사 시스템', hint: '조회할 수 있다' },
          { id: 'phone', label: '개인 폰', hint: '영업사원만 가지고 있다' },
          { id: 'unknown', label: '모름', hint: '확인할 방법이 없다' },
        ],
      },
      memo: {
        title: 'STATE 0 — 단 하나의 역질문',
        meta: 'Ch.1 · Before',
        situation: '대시보드를 본 직후, 단 하나의 질문만 화면 중앙에 표시. 고객이 직접 선택지를 클릭한다.',
        interact: '선택지 클릭 → → 키로 다음 장면.',
        feel: ['"이게 우리 얘기네"'],
        connect: ['→ STATE 1 빈 COSS 화면'],
      },
    },
    {
      index: 1,
      pauseAfterMs: 6000,
      guide: '이관리 팀장이 COSS에서 오늘 팀 상담 현황을 조회하지만 테이블이 비어 있습니다. 오늘 상담 건수: 0.',
      rentacarPanel: {
        view: 'empty-coss',
        cossTitle: '오늘 팀 상담 현황 (COSS)',
        cossMeta: '이관리 팀장 · 2026.05.14 (목) 기준',
        searchName: '팀원 이름 검색',
        cossHint: '영업사원들은 오늘도 수십 건의 통화를 했습니다. 그러나 회사 시스템에는 0건. Ch.0의 대시보드와 정반대입니다.',
      },
      memo: {
        title: 'STATE 1 — 빈 COSS 화면',
        meta: 'Ch.1 · Before',
        situation: '이관리 팀장이 COSS에서 팀원 오늘 활동을 조회. 결과는 없음. Ch.0 대시보드와 이 빈 화면이 설명 없이 대비된다.',
        interact: '팀원 이름을 검색해도 결과 0건. → 키로 다음.',
        feel: ['"왜 우리는 이 화면이 없지?"'],
        connect: ['→ STATE 2 채널 분산'],
      },
    },
    {
      index: 2,
      pauseAfterMs: 6000,
      guide: '박민준 고객의 2년치 대화가 카카오·전화·문자 세 곳에 흩어져 있습니다. 전화 기록은 통화 내용조차 없습니다.',
      rentacarTimeline: makeSkTimeline('before'),
      memo: {
        title: 'STATE 2 — 채널별 분산',
        meta: 'Ch.1 · Before',
        situation:
          '같은 고객의 전화·카카오·문자가 세 앱에 흩어져 있다. 전화는 통화 내용조차 없다. 전체 맥락을 보려면 세 앱을 모두 열어야 한다.',
        interact: '관찰 STATE. → 키로 다음.',
        feel: ['"맥락이 세 곳에 쪼개져 있다"'],
        connect: ['→ STATE 3 퇴사 → 데이터 소멸'],
      },
    },
    {
      index: 3,
      pauseAfterMs: 7000,
      guide:
        '핵심 영업사원 최성과가 퇴사하자 계정이 비활성화되고, 담당 고객 230명의 2년치 상담 이력이 회사 시스템에서 사라집니다. 후임이 전화해도 이력이 없어 고객이 이탈합니다.',
      rentacarAttrition: makeSkAttrition('before'),
      memo: {
        title: 'STATE 3 ⚡ — 퇴사로 데이터 소멸',
        meta: 'Ch.1 · Before · 핵심 순간',
        situation:
          '최성과 계정 비활성화 → 담당 고객 230명의 이력이 0건. 후임이 인수인계 전화를 걸어도 맥락이 없어 고객이 "또 처음부터?"라며 이탈한다.',
        interact: '관찰 STATE. → 키로 다음.',
        feel: ['★ "한 명이 떠나면 2년치가 사라진다"', '"개인폰이 곧 회사 리스크"'],
        connect: ['→ STATE 4 3가지 리스크 요약'],
      },
    },
    {
      index: 4,
      pauseAfterMs: 6000,
      guide: '데이터 이탈 · 클레임 대응 불가 · AI 활용 불가. 세 리스크가 모두 개인폰 사용이라는 하나의 원인에서 비롯됩니다.',
      rentacarPanel: {
        view: 'risk-summary',
        riskTitle: '개인폰 사용이 만드는 3가지 리스크',
        riskItems: [
          { icon: '📉', title: '데이터 이탈', value: '230명', desc: '퇴사 시 손실 고객 — 2년치 상담 이력 소멸', tone: 'danger' },
          { icon: '⚠️', title: '클레임 대응 불가', value: '대응 공백', desc: '담당자 부재 시 이력이 없어 즉시 대응 불가', tone: 'warn' },
          { icon: '🤖', title: 'AI 활용 불가', value: '분석 불가', desc: '데이터가 없으면 AI 코칭·이탈 예측 분석 불가', tone: 'brand' },
        ],
        riskRootCause: '이 3가지는 모두 "개인폰 사용"이라는 하나의 원인에서 비롯됩니다.',
      },
      memo: {
        title: 'STATE 4 — 3가지 리스크 요약',
        meta: 'Ch.1 · Before · 마무리',
        situation: '데이터 이탈·클레임 대응 불가·AI 활용 불가가 아이콘과 수치로 압축. 세 리스크가 하나의 원인(개인폰)으로 수렴.',
        interact: '각 항목 클릭으로 상세 확인. → 키로 Ch.2(After)로.',
        feel: ['"문제의 뿌리가 하나구나"'],
        connect: ['→ Ch.2 이렇게 만들어집니다 (After)'],
      },
    },
  ],
  onComplete: { nextChapter: 2, demoAutoAdvance: false },
};
