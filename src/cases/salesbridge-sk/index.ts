import type { CaseDef } from '../_types';
import { salesbridgeSkCast } from './cast';
import { salesbridgeSkMeta } from './meta';
import { chapter00DashboardFirst } from './chapters/chapter-00-dashboard-first';
import { chapter01ReverseQuestion } from './chapters/chapter-01-reverse-question';
import { chapter02Experience } from './chapters/chapter-02-experience';
import { chapter03BackToStart } from './chapters/chapter-03-back-to-start';

export const salesbridgeSkCase: CaseDef = {
  id: salesbridgeSkMeta.id,
  label: salesbridgeSkMeta.label,
  customer: salesbridgeSkMeta.customer,
  industry: salesbridgeSkMeta.industry,
  brandLine: salesbridgeSkMeta.brandLine,
  accentColor: salesbridgeSkMeta.accentColor,
  cast: salesbridgeSkCast,
  chapters: [
    chapter00DashboardFirst,
    chapter01ReverseQuestion,
    chapter02Experience,
    chapter03BackToStart,
  ],
  roi: [
    {
      id: 'coss-auto-load',
      label: 'COSS 자동 적재율 (영업 대화 자산화)',
      caption: '8,423건 중 7,934건 자동 적재',
      value: 94.2,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'phone-conversion',
      label: '전화 상담 계약 전환율',
      caption: '문자(34%) 대비 2배 · 3회 이상 접촉 시 51%',
      value: 68,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'attrition-loss',
      label: '핵심 영업 퇴사 시 보존되는 고객 이력',
      caption: '담당 230명 · 2년치 상담 100% 인수인계',
      value: 100,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'churn-risk',
      label: '90일 미접촉 이탈 위험 고객 (조기 식별)',
      caption: '대시보드 자동 감지 → 재접촉 권고',
      value: null,
      unit: '명',
      trend: 'down-good',
    },
  ],
};

export { salesbridgeSkCast, salesbridgeSkMeta };
