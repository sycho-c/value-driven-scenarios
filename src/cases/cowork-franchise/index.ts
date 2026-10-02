import type { CaseDef, Chapter } from '../_types';
import { coworkFranchiseCast } from './cast';
import { coworkFranchiseMeta } from './meta';
import { chapter00SupervisorOverload } from './chapters/chapter-00-supervisor-overload';
import { chapter01ChannelSwitch } from './chapters/chapter-01-channel-switch';
import { chapter02NoticeTraining } from './chapters/chapter-02-notice-training';
import { chapter03IssueHandover } from './chapters/chapter-03-issue-handover';
import { chapter04HqDashboard } from './chapters/chapter-04-hq-dashboard';

/**
 * 단계 안내 줄의 제목을 채운다 — "신 2 · 4/6 · 자동 재안내와 담당자 과업".
 * 3자 무대가 동시에 바뀌어 흐름을 놓치기 쉬워, 문장은 각 STATE의 mfgCaption 에 관객용으로 쓴다.
 */
const withCaption = (chapter: Chapter): Chapter => ({
  ...chapter,
  states: chapter.states.map((state, i) =>
    state.mfgCaption
      ? {
          ...state,
          mfgCaption: {
            ...state.mfgCaption,
            title: `신 ${chapter.id} · ${i + 1}/${chapter.states.length} · ${(state.memo?.title ?? '').replace(/^STATE \d+ — /, '')}`,
          },
        }
      : state,
  ),
});

export const coworkFranchiseCase: CaseDef = {
  id: coworkFranchiseMeta.id,
  label: coworkFranchiseMeta.label,
  customer: coworkFranchiseMeta.customer,
  industry: coworkFranchiseMeta.industry,
  brandLine: coworkFranchiseMeta.brandLine,
  accentColor: coworkFranchiseMeta.accentColor,
  // 실제 도입 사례가 아니라, 확보한 요구사항으로 구성한 제안 시나리오다.
  kind: 'proposal',
  // 같은 가맹점 관리 시나리오를 두 가지 방식으로 — 진입 시 고른다
  variantSelect: {
    eyebrow: '가맹점 관리 · 진행 방식 선택',
    title: '어떤 방식으로 보시겠습니까?',
    subtitle: '같은 가맹점 관리 시나리오를 두 가지 방식으로 준비했습니다.',
    guided: {
      label: '단계 안내형',
      desc: '관리자 · 담당자 · 점주 세 화면이 단계마다 함께 움직입니다. → 키로 한 단계씩 진행합니다.',
    },
    live: {
      label: '직접 체험형',
      desc: '강동천호점 9/1 오픈 준비 한 건을 처음부터 끝까지 따라갑니다. 점주 폰에 직접 입력하며 진행합니다.',
      src: 'demos/franchise-live.html',
    },
  },
  cast: coworkFranchiseCast,
  chapters: [
    chapter00SupervisorOverload,
    chapter01ChannelSwitch,
    chapter02NoticeTraining,
    chapter03IssueHandover,
    chapter04HqDashboard,
  ].map(withCaption),
  roi: [
    {
      id: 'stores',
      label: '소통 자산화 점포',
      caption: '담당자 약 60명 · 인당 30~40개 점포 [확정]',
      value: 2500,
      unit: '개점',
      trend: 'up-good',
    },
    {
      id: 'notice',
      label: '공지 열람률',
      caption: '최초 82% → 미열람 재안내 후 [예시]',
      value: 98,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'missed',
      label: '응대 누락',
      caption: '전월 198건 → 당월 12건 (▼94%) [예시]',
      value: 12,
      unit: '건',
      trend: 'down-good',
    },
    {
      id: 'churn',
      label: '이탈 위험 조기 감지',
      caption: '38개점 감지 · 조기 접촉으로 24개점 복귀 [예시]',
      value: 24,
      unit: '개점',
      trend: 'up-good',
    },
  ],
};
