import type { CaseDef } from '../_types';
import { coworkHanaCast } from './cast';
import { coworkHanaMeta } from './meta';
import { chapter01InvisibleCost } from './chapters/chapter-01-invisible-cost';
import { chapter02SelfReading } from './chapters/chapter-02-self-reading';
import { chapter03VisibleField } from './chapters/chapter-03-visible-field';

export const coworkHanaCase: CaseDef = {
  id: coworkHanaMeta.id,
  label: coworkHanaMeta.label,
  customer: coworkHanaMeta.customer,
  industry: coworkHanaMeta.industry,
  brandLine: coworkHanaMeta.brandLine,
  accentColor: coworkHanaMeta.accentColor,
  cast: coworkHanaCast,
  chapters: [chapter01InvisibleCost, chapter02SelfReading, chapter03VisibleField],
  roi: [
    {
      id: 'monthly-contracts',
      label: '설계사 1인당 월 계약 건수',
      caption: 'GA 매출 기여 ↑',
      value: 2.3,
      unit: '건',
      prefix: '+',
      trend: 'up-good',
    },
    {
      id: 'conversion-rate',
      label: '고객 응답 후 계약 전환율',
      caption: '기존 31% → 67% (+36%p)',
      value: 67,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'ga-recommendation',
      label: 'GA별 하나손보 추천 비율 (상위 GA)',
      caption: '에이원 대리점 78% · Top 3 진입',
      value: 78,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'channel-active',
      label: 'Cowork+ 채널 사용률 (자산화율)',
      caption: '갭 9% — 일부 GA 이미지 파일 잔존',
      value: 91,
      unit: '%',
      trend: 'up-good',
    },
  ],
};

export { coworkHanaCast, coworkHanaMeta };
