import type { MfgActor, MfgKakaoItem } from '../_types';

/** 무대 공용 발화자 — 폰 self 정렬·아바타 색상의 단일 소스 */
export const RETAIL_ACTORS: MfgActor[] = [
  { id: 'adv', name: '김소연 어드바이저', initial: '소', color: '#C2185B' },
  { id: 'adv2', name: '박지훈 어드바이저', initial: '지', color: '#8E44AD' },
  { id: 'cust', name: '정수현 고객', initial: '수', color: '#E67E22' },
  { id: 'hq', name: '최현주 매니저', initial: '현', color: '#16172A' },
];

/**
 * 누적 피드 빌더 — 전체 대본에서 앞 `count`개만 잘라 스냅샷을 만들고,
 * 마지막 줄에만 isNew를 켜 등장 애니메이션을 준다. 맨 앞에 날짜 캡션 삽입.
 *
 * 주의: 이 사례의 대화는 고객 1명과 어드바이저 1명의 1:1이다.
 * 서로 다른 고객의 대화를 한 폰에 섞지 않는다 — 폰마다 자기 대화만 본다.
 */
export function feedUpTo(script: MfgKakaoItem[], count: number, dateLabel = '오늘'): MfgKakaoItem[] {
  const slice = script.slice(0, count).map((item, i) => ({
    ...item,
    isNew: i === count - 1,
  }));
  return [{ id: 'date', kind: 'date' as const, text: dateLabel }, ...slice];
}
