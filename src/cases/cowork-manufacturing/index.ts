import type { CaseDef } from '../_types';
import { coworkManufacturingCast } from './cast';
import { coworkManufacturingMeta } from './meta';
import { chapter00PersonalKakao } from './chapters/chapter-00-personal-kakao';
import { chapter01ChannelSwitch } from './chapters/chapter-01-channel-switch';
import { chapter02LimitsSolved } from './chapters/chapter-02-limits-solved';
import { chapter03IndustryDomestic } from './chapters/chapter-03-industry-domestic';
import { chapter04IndustryOverseas } from './chapters/chapter-04-industry-overseas';
import { chapter05AdminDashboard } from './chapters/chapter-05-admin-dashboard';

export const coworkManufacturingCase: CaseDef = {
  id: coworkManufacturingMeta.id,
  label: coworkManufacturingMeta.label,
  customer: coworkManufacturingMeta.customer,
  industry: coworkManufacturingMeta.industry,
  brandLine: coworkManufacturingMeta.brandLine,
  accentColor: coworkManufacturingMeta.accentColor,
  cast: coworkManufacturingCast,
  chapters: [
    chapter00PersonalKakao,
    chapter01ChannelSwitch,
    chapter02LimitsSolved,
    chapter03IndustryDomestic,
    chapter04IndustryOverseas,
    chapter05AdminDashboard,
  ],
  chapterGroupSelect: {
    groupId: 'industry',
    eyebrow: '산업 적용 · 슬롯 선택',
    title: '어떤 산업 흐름으로 보시겠습니까?',
    subtitle: '공통 골격(개인 카톡 → 채널 전환 → 한계 해소)은 그대로, 산업 슬롯만 하나 골라 얹습니다.',
    allOptionLabel: '전체 흐름 보기 (국내 + 해외)',
  },
  roi: [
    {
      id: 'vendors',
      label: '연결 거래처',
      caption: '거래처 직원 138명 [확정]',
      value: 57,
      unit: '개',
      trend: 'up-good',
    },
    {
      id: 'rooms',
      label: '상담톡 대화방 개설',
      caption: '가동 10개 · 통합 관리 기반 확보 [확정]',
      value: 34,
      unit: '개',
      trend: 'up-good',
    },
    {
      id: 'file-errors',
      label: '파일 전송 오류',
      caption: '5월 9건 → 6월 1건 (6월분은 카카오 측 장애) [확정]',
      value: 1,
      unit: '건',
      trend: 'down-good',
    },
    {
      id: 'daily-messages',
      label: '일 메시지 자산화',
      caption: '일 300~651건 · 관리자 실시간 조회 [확정]',
      value: 651,
      unit: '건',
      trend: 'up-good',
    },
  ],
};
