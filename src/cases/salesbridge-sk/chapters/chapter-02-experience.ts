import type { Chapter } from '../../_types';
import { makeSkTimeline, makeSkAttrition } from '../_shared';

/**
 * Ch.2 — 이렇게 만들어집니다 (After · 해결)
 *
 * 이 챕터는 "After 세계"다. Ch.1과 같은 장면(통합 타임라인·퇴사)을 이번엔 Cowork+ 도입 후 상태로 보여준다.
 * 키보드 ← → 흐름: 통합 타임라인(결과) → STT 통화(메커니즘) → 퇴사해도 이력 보존(자산화).
 */
export const chapter02Experience: Chapter = {
  id: 2,
  act: 2,
  title: '이렇게 만들어집니다',
  subtitle: 'After — 전화 한 통이 COSS 데이터가 되고, 떠나도 남는다',
  narration:
    '말로 설명하지 않습니다. Ch.1에서 세 곳에 흩어져 있던 박민준 고객의 대화가 이제 하나의 타임라인으로 모여 있고, 전화하기 버튼을 누르면 통화가 실시간 텍스트로 변환되어 COSS(SK DB Mark)에 수기 입력 없이 자동 적재됩니다. 그리고 담당자가 떠나도 그 이력은 회사 자산으로 남습니다.',
  stage: 'rentacar',
  states: [
    {
      index: 0,
      pauseAfterMs: 6500,
      guide:
        'After — 전화·카카오·문자가 하나의 시간순 타임라인으로. 항목을 클릭하면 STT 변환 내용이 펼쳐집니다. Ch.1의 분산 상태와 대비됩니다.',
      rentacarTimeline: makeSkTimeline('after'),
      memo: {
        title: 'STATE 0 — 통합 타임라인',
        meta: 'Ch.2 · After',
        situation:
          'Ch.1에서 세 곳에 흩어져 있던 같은 고객의 전화/문자/카카오가 하나의 시간순 타임라인으로 통합. 빈 화면, 분산 상태와 정면으로 대비된다.',
        interact: '타임라인 항목 클릭으로 STT 내용 펼침. → 키로 다음.',
        feel: ['"채널이 달라도 한 고객의 이력이 한 곳에"'],
        connect: ['→ STATE 1 STT 통화 체험'],
      },
    },
    {
      index: 1,
      pauseAfterMs: 8000,
      guide: '직접 [통화 시작]을 누르세요. 통화가 실시간 텍스트로 변환되고, 종료하면 COSS에 자동 적재됩니다. 수기 입력은 없습니다.',
      rentacarStt: {
        callerName: '박민준',
        callerPhone: '010-3847-2910',
        agentLabel: '담당: 김렌터',
        customerLabel: '고객: 박민준',
        autoEndMs: 16000,
        startLabel: '통화 시작 — STT 데모 실행',
        script: [
          { atMs: 800, text: '네, 안녕하세요. 박민준 고객님 맞으시죠?' },
          { atMs: 2000, text: ' 저 SK렌터카 김렌터입니다.' },
          { atMs: 3400, text: ' 지난번에 그랜저 장기 렌터카 상담 관련해서 연락드렸는데요,' },
          { atMs: 5200, text: ' 혹시 그랜저 2년 계약으로 생각하고 계신 거 맞나요?' },
          { atMs: 7000, text: ' 네, 맞습니다. 월 납입금은 47만원 선으로 말씀드렸던 거고요.' },
          { atMs: 9000, text: ' 출고는 3월 중순 이후로 가능합니다.' },
          { atMs: 10800, text: ' 보험은 기본 옵션으로 포함되어 있고요,' },
          { atMs: 12500, text: ' 추가로 네비게이션 옵션 넣으시면 2만원 정도 추가됩니다.' },
          { atMs: 14500, text: ' 네, 확인해보고 다시 연락드리겠습니다. 감사합니다.' },
        ],
        highlights: ['그랜저', '2년', '47만원', '3월 중순'],
        mappingTags: [
          { atMs: 5500, label: '차종: 그랜저' },
          { atMs: 7200, label: '계약 기간: 2년' },
          { atMs: 9200, label: '월 납입: 47만원' },
          { atMs: 10000, label: '출고: 3월 중순' },
          { atMs: 12800, label: '옵션: 네비게이션' },
        ],
        cossSteps: [
          { id: 'stt', label: 'STT 변환 완료' },
          { id: 'map', label: '고객 정보 매핑' },
          { id: 'send', label: 'COSS 전송' },
          { id: 'done', label: '적재 완료' },
        ],
        cossSummary: '차종: 그랜저 · 기간: 2년 · 월 47만원 · 출고: 3월 중순 · 옵션: 네비게이션',
      },
      memo: {
        title: 'STATE 1 ⚡ — STT 통화 + COSS 자동 적재',
        meta: 'Ch.2 · After · 메커니즘',
        situation:
          '전화 한 통이 실시간 텍스트로 변환되고, 통화 종료와 동시에 COSS에 자동 적재된다. 입력하지 않았는데 기록이 생긴다 — 이게 자산화의 시작점.',
        interact: '[통화 시작] 직접 클릭 → 실시간 변환 → 자동 종료 → COSS 적재 확인. → 키로 다음.',
        feel: ['★ "입력하지 않았는데 기록이 생겼다"', '"Ch.1의 빈 화면이 채워진다"'],
        connect: ['→ STATE 2 퇴사해도 이력 보존'],
      },
    },
    {
      index: 2,
      pauseAfterMs: 7000,
      guide:
        '같은 퇴사 상황. 이번엔 최성과가 떠나도 230명의 상담 이력이 COSS에 그대로 남아, 후임이 맥락을 알고 첫 통화를 이어갑니다.',
      rentacarAttrition: makeSkAttrition('after'),
      memo: {
        title: 'STATE 2 — 퇴사해도 이력 보존',
        meta: 'Ch.2 · After · 자산화',
        situation:
          'Ch.1과 같은 퇴사 상황이지만, 모든 채널 대화가 회사 서버에 자동 저장되어 있어 이력이 그대로 남는다. 후임이 맥락을 알고 응대하니 고객이 안심한다.',
        interact: '관찰 STATE. → 키로 Ch.3(다시 처음으로).',
        feel: ['"담당자가 떠나도 자산은 회사에 남는다"'],
        connect: ['→ Ch.3 다시 처음으로'],
      },
    },
  ],
  onComplete: { nextChapter: 3, demoAutoAdvance: false },
};
