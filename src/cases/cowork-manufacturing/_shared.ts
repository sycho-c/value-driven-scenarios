import type { MfgActor, MfgKakaoItem } from '../_types';

/** 무대 공용 발화자 — 폰 self 정렬·아바타 색상의 단일 소스 */
export const MFG_ACTORS: MfgActor[] = [
  { id: 'me', name: '나회사 · 영업지원', initial: '나', color: '#5B3FE4' },
  { id: 's1', name: '○○산업', initial: '산', color: '#E67E22' },
  { id: 's2', name: '△△전선', initial: '전', color: '#27AE60' },
  { id: 'kim', name: '○○산업 이영업 대리', initial: '영', color: '#E67E22' },
  { id: 'park', name: '○○산업 박열정 과장', initial: '열', color: '#D4537E' },
  { id: 'choi', name: '△△전선 최구매 차장', initial: '최', color: '#27AE60' },
];

/**
 * 누적 피드 빌더 — 전체 대본에서 앞 `count`개만 잘라 스냅샷을 만들고,
 * 마지막 줄에만 isNew를 켜 등장 애니메이션을 준다. 맨 앞에 날짜 캡션 삽입.
 */
export function feedUpTo(script: MfgKakaoItem[], count: number): MfgKakaoItem[] {
  const slice = script.slice(0, count).map((item, i) => ({
    ...item,
    isNew: i === count - 1,
  }));
  return [{ id: 'date', kind: 'date' as const, text: '오늘' }, ...slice];
}
