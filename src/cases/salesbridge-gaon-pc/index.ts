import type { CaseDef } from '../_types';
import { salesbridgePcCast } from './cast';
import { salesbridgePcMeta } from './meta';
import { chapter01MondayMorning } from './chapters/chapter-01-monday-morning';
import { chapter02LaunchDay } from './chapters/chapter-02-launch-day';

export const salesbridgePcCase: CaseDef = {
  id: salesbridgePcMeta.id,
  label: salesbridgePcMeta.label,
  customer: salesbridgePcMeta.customer,
  industry: salesbridgePcMeta.industry,
  brandLine: salesbridgePcMeta.brandLine,
  accentColor: salesbridgePcMeta.accentColor,
  cast: salesbridgePcCast,
  chapters: [chapter01MondayMorning, chapter02LaunchDay],
  roi: [
    {
      id: 'pre-block-rate',
      label: '거래처 불일치 첨부 사전 차단율',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'up-good',
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
      id: 'mis-attach',
      label: '월간 단가/거래처 불일치 발신 시도',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '건',
      trend: 'down-good',
    },
    {
      id: 'br-load',
      label: 'BR 1인 동시 응대 거래처 수 절감',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'down-good',
    },
  ],
};

export { salesbridgePcCast, salesbridgePcMeta };
