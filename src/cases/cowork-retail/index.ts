import type { CaseDef } from '../_types';
import { coworkRetailCast } from './cast';
import { coworkRetailMeta } from './meta';
import { chapter00PersonalPhone } from './chapters/chapter-00-personal-phone';
import { chapter01ChannelSwitch } from './chapters/chapter-01-channel-switch';
import { chapter02StoreService } from './chapters/chapter-02-store-service';
import { chapter03Continuity } from './chapters/chapter-03-continuity';
import { chapter04HqDashboard } from './chapters/chapter-04-hq-dashboard';

export const coworkRetailCase: CaseDef = {
  id: coworkRetailMeta.id,
  label: coworkRetailMeta.label,
  customer: coworkRetailMeta.customer,
  industry: coworkRetailMeta.industry,
  brandLine: coworkRetailMeta.brandLine,
  accentColor: coworkRetailMeta.accentColor,
  cast: coworkRetailCast,
  chapters: [
    chapter00PersonalPhone,
    chapter01ChannelSwitch,
    chapter02StoreService,
    chapter03Continuity,
    chapter04HqDashboard,
  ],
  roi: [
    {
      id: 'stores',
      label: '연결 매장 · 어드바이저',
      caption: '어드바이저 개인 계정 단위 응대 [예시]',
      value: 640,
      unit: '명',
      trend: 'up-good',
    },
    {
      id: 'consults',
      label: '상담 이력 자산화',
      caption: '재입고·예약·A/S·스타일링 [예시]',
      value: 4820,
      unit: '건',
      trend: 'up-good',
    },
    {
      id: 'handover',
      label: '담당 부재 인계율',
      caption: '부재 221건 중 212건 이력 승계 응대 [예시]',
      value: 96,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'missed',
      label: '응대 누락',
      caption: '전월 42건 → 당월 5건 (▼88%) [예시]',
      value: 5,
      unit: '건',
      trend: 'down-good',
    },
  ],
};
