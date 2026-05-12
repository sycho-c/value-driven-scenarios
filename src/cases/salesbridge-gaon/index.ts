import type { CaseDef } from '../_types';
import { salesbridgeCast } from './cast';
import { salesbridgeMeta } from './meta';
import { chapter00SeptemberDay } from './chapters/chapter-00-september-day';
import { chapter01MondayCollapse } from './chapters/chapter-01-monday-collapse';
import { chapter02OnetalkArrives } from './chapters/chapter-02-onetalk-arrives';
import { chapter03QuarterReport } from './chapters/chapter-03-quarter-report';

export const salesbridgeCase: CaseDef = {
  id: salesbridgeMeta.id,
  label: salesbridgeMeta.label,
  customer: salesbridgeMeta.customer,
  industry: salesbridgeMeta.industry,
  brandLine: salesbridgeMeta.brandLine,
  accentColor: salesbridgeMeta.accentColor,
  cast: salesbridgeCast,
  chapters: [
    chapter00SeptemberDay,
    chapter01MondayCollapse,
    chapter02OnetalkArrives,
    chapter03QuarterReport,
  ],
  roi: [
    {
      id: 'team-visibility',
      label: '팀장 모니터링 큐로 사전 캐치한 SLA 임박 비율',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'br-overflow',
      label: 'BR 1인당 동시 응대 거래처 수 절감',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'down-good',
    },
    {
      id: 'response-time',
      label: '거래처 평균 응답시간 단축',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'down-good',
    },
    {
      id: 'escalation',
      label: '팀장 직접 컴플레인 발생률 감소',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'down-good',
    },
  ],
};

export { salesbridgeCast, salesbridgeMeta };
