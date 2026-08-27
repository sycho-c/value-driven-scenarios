import type { CaseDef } from '../_types';
import { coworkFranchiseCast } from './cast';
import { coworkFranchiseMeta } from './meta';
import { chapter00SupervisorOverload } from './chapters/chapter-00-supervisor-overload';
import { chapter01ChannelSwitch } from './chapters/chapter-01-channel-switch';
import { chapter02NoticeTraining } from './chapters/chapter-02-notice-training';
import { chapter03IssueHandover } from './chapters/chapter-03-issue-handover';
import { chapter04HqDashboard } from './chapters/chapter-04-hq-dashboard';

export const coworkFranchiseCase: CaseDef = {
  id: coworkFranchiseMeta.id,
  label: coworkFranchiseMeta.label,
  customer: coworkFranchiseMeta.customer,
  industry: coworkFranchiseMeta.industry,
  brandLine: coworkFranchiseMeta.brandLine,
  accentColor: coworkFranchiseMeta.accentColor,
  // 실제 도입 사례가 아니라, 확보한 요구사항으로 구성한 제안 시나리오다.
  kind: 'proposal',
  cast: coworkFranchiseCast,
  chapters: [
    chapter00SupervisorOverload,
    chapter01ChannelSwitch,
    chapter02NoticeTraining,
    chapter03IssueHandover,
    chapter04HqDashboard,
  ],
  roi: [
    {
      id: 'stores',
      label: '연결 가맹점 · SV',
      caption: 'SV 1인당 평균 41.7개점 [예시]',
      value: 2500,
      unit: '개점',
      trend: 'up-good',
    },
    {
      id: 'notice',
      label: '공지 열람률',
      caption: '최초 82% → 미열람 리마인드 후 [예시]',
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
