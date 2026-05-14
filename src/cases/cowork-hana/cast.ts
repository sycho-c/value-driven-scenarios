import type { CastMember } from '../_types';

export const coworkHanaCast: CastMember[] = [
  {
    id: 'boss-demo',
    initial: '본',
    color: '#1B4F72',
    role: 'admin',
    label: '타사 영업본부장 (시연자)',
    shortLabel: '본부장',
    org: '하나손해보험',
  },
  {
    id: 'jung-nayoon',
    initial: '나',
    color: '#117A65',
    role: 'br',
    label: '정나윤 설계 매니저',
    shortLabel: '정나윤',
    org: '하나손해보험',
  },
  {
    id: 'lee-seolgye',
    initial: '설',
    color: '#E67E22',
    role: 'guest',
    label: '이설계 설계사 (GA)',
    shortLabel: '이설계',
    org: '에이원 대리점',
  },
  {
    id: 'park-customer',
    initial: '민',
    color: '#8E44AD',
    role: 'other',
    label: '박민준 (가입 고객)',
    shortLabel: '박민준',
    org: '고객',
  },
];

export const coworkHanaCastById = Object.fromEntries(
  coworkHanaCast.map((m) => [m.id, m]),
);

export type CoworkHanaCastId = (typeof coworkHanaCast)[number]['id'];
