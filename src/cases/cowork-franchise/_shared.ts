import type { MfgActor, MfgKakaoItem } from '../_types';

/** 무대 공용 발화자 — 폰 self 정렬·아바타 색상의 단일 소스 */
export const FRANCHISE_ACTORS: MfgActor[] = [
  { id: 'sv', name: '한태민 담당자', initial: '태', color: '#A0522D' },
  { id: 'owner1', name: '정미경 점주 (강동천호점)', initial: '정', color: '#E67E22' },
  { id: 'owner2', name: '오세훈 점주 (하남미사점)', initial: '오', color: '#27AE60' },
  { id: 'mgr', name: '김지아 매니저 (강동천호점)', initial: '지', color: '#7B5E9E' },
  { id: 'sv2', name: '이서준 담당자 (후임)', initial: '서', color: '#2E86AB' },
  { id: 'hq', name: '서윤아 관리자 (가맹기획팀장)', initial: '윤', color: '#16172A' },
  /** 점포 방에 도착하는 본부 공지·교육·설문의 발신자 — 관리자는 점포 방 참여자가 아니다 */
  { id: 'notice', name: '가맹본부 공지', initial: '📣', color: '#5B3FE4' },
  { id: 'owner3', name: '김도현 점주 (남양주다산점)', initial: '김', color: '#C0392B' },
  { id: 'owner4', name: '이수진 점주 (잠실새내점)', initial: '이', color: '#8E44AD' },
  { id: 'owner5', name: '박정우 점주 (강동둔촌점)', initial: '박', color: '#16A085' },
];

/** 관리자 콘솔 컬럼 라벨 */
export const ADMIN_LABEL = '👔 관리자 콘솔 · 서윤아 가맹기획팀장';

/**
 * 누적 피드 빌더 — 전체 대본에서 앞 `count`개만 잘라 스냅샷을 만들고,
 * 마지막 줄에만 isNew를 켜 등장 애니메이션을 준다.
 *
 * 주의: 이 사례의 무대는 담당자 1명 대 가맹점 다수(1:N)다.
 * 가맹점마다 대화가 독립이므로 서로 다른 점포의 대화를 한 폰에 섞지 않는다.
 */
export function feedUpTo(script: MfgKakaoItem[], count: number, dateLabel = '오늘'): MfgKakaoItem[] {
  const slice = script.slice(0, count).map((item, i) => ({
    ...item,
    isNew: i === count - 1,
  }));
  return [{ id: 'date', kind: 'date' as const, text: dateLabel }, ...slice];
}
