import type { CaseDef } from '../_types';
import { wontalkCast } from './cast';
import { wontalkMeta } from './meta';
import { chapter01SmsAuth } from './chapters/chapter-01-sms-auth';
import { chapter02BlockPii } from './chapters/chapter-02-block-pii';
import { chapter03TrackingUrl } from './chapters/chapter-03-tracking-url';
import { chapter04AutoAssign } from './chapters/chapter-04-auto-assign';
import { chapter05MyTasks } from './chapters/chapter-05-my-tasks';
import { chapter06SecretMessage } from './chapters/chapter-06-secret-message';
import { chapter07BroadcastRead } from './chapters/chapter-07-broadcast-read';
import { chapter08Dashboard } from './chapters/chapter-08-dashboard';

export const wontalkCase: CaseDef = {
  id: wontalkMeta.id,
  label: wontalkMeta.label,
  customer: wontalkMeta.customer,
  industry: wontalkMeta.industry,
  brandLine: wontalkMeta.brandLine,
  accentColor: wontalkMeta.accentColor,
  disableGuideOverlay: true,
  cast: wontalkCast,
  chapters: [
    chapter01SmsAuth,
    chapter02BlockPii,
    chapter03TrackingUrl,
    chapter04AutoAssign,
    chapter05MyTasks,
    chapter06SecretMessage,
    chapter07BroadcastRead,
    chapter08Dashboard,
  ],
  roi: [
    {
      id: 'notice-read',
      label: '4,000명 알림톡 읽음률',
      caption: 'Ch.7 데이터 인용',
      value: 95.5,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'response-time',
      label: '평균 응답시간 단축',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'down-good',
    },
    {
      id: 'pii-blocked',
      label: '단톡방 개인정보 노출 차단율',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'auto-assign',
      label: '담당자 자동 배정 비율',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'up-good',
    },
    {
      id: 'self-serve',
      label: '"어떻게 됐어요?" 메시지 감소율',
      caption: 'Ch.5 셀프 조회 도입 후',
      value: null,
      unit: '%',
      trend: 'down-good',
    },
    {
      id: 'audit-coverage',
      label: '감사 로그 자동 적재 비율',
      caption: '측정 기준 곧 공개',
      value: null,
      unit: '%',
      trend: 'up-good',
    },
  ],
};

export { wontalkCast, wontalkMeta };
