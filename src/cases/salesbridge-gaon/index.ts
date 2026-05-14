import type { CaseDef } from '../_types';
import { salesbridgeCast } from './cast';
import { salesbridgeMeta } from './meta';
import { scene0Chaos } from './chapters/scene-0-chaos';
import { scene1FiveLimits } from './chapters/scene-1-five-limits';
import { scene2Launch } from './chapters/scene-2-launch';
import { scene3Block } from './chapters/scene-3-block';
import { scene4IphoneApp } from './chapters/scene-4-iphone-app';
import { scene5NoaAdmin } from './chapters/scene-5-noa-admin';
import { scene6Executive } from './chapters/scene-6-executive';

export const salesbridgeCase: CaseDef = {
  id: salesbridgeMeta.id,
  label: salesbridgeMeta.label,
  customer: salesbridgeMeta.customer,
  industry: salesbridgeMeta.industry,
  brandLine: salesbridgeMeta.brandLine,
  accentColor: salesbridgeMeta.accentColor,
  cast: salesbridgeCast,
  chapters: [
    scene0Chaos,
    scene1FiveLimits,
    scene2Launch,
    scene3Block,
    scene4IphoneApp,
    scene5NoaAdmin,
    scene6Executive,
  ],
  roi: [
    {
      id: 'governance-onboarding',
      label: '본 오픈 첫날 거래처 직원 인증 입장률',
      caption: '138명 / 138명 (가온전선 실측)',
      value: 100,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'pre-block-rate',
      label: '거래처 불일치 첨부 사전 차단율',
      caption: '시스템 자동 매핑 + 검증',
      value: null,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'mis-attach',
      label: '월간 단가/거래처 불일치 발신 시도',
      caption: '발송 전 자동 차단',
      value: null,
      unit: '건',
      trend: 'down-good',
    },
    {
      id: 'analysis-to-action',
      label: '분석 → 개선 행동까지 평균 소요',
      caption: 'NOA Admin AI 코칭 적용 기준',
      value: null,
      unit: '시간',
      trend: 'down-good',
    },
  ],
};

export { salesbridgeCast, salesbridgeMeta };
