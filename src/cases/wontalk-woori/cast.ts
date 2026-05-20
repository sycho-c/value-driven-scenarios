import type { CastMember } from '../_types';

export const wontalkCast: CastMember[] = [
  { id: 'park-rep',    initial: '강', color: '#5B3FE4', role: 'guest', label: '강민호 (지엔에이 AG 모집인)' },
  { id: 'lee-hyunsu',  initial: '이', color: '#27AE60', role: 'other', label: '이현수 (파트너)' },
  { id: 'choi-youngho',initial: '최', color: '#E67E22', role: 'other', label: '최영호 (파트너)' },
  { id: 'park-soyeon', initial: '소', color: '#E91E8C', role: 'other', label: '박소연 (파트너)' },
  { id: 'kim-chulmin', initial: '철', color: '#8E44AD', role: 'other', label: '김철민 (파트너)' },
  { id: 'kim-kyunghwa',initial: '김', color: '#2C3E50', role: 'br',    label: '김경화 (금리·대출 담당)' },
  { id: 'lee-pm',      initial: '이', color: '#1A5276', role: 'br',    label: '이과장 (금리·대출 담당)' },
  { id: 'choi-cm',     initial: '최', color: '#0C5460', role: 'admin', label: '최센터장 (우리금융캐피탈)' },
];

export const wontalkCastById = Object.fromEntries(
  wontalkCast.map((m) => [m.id, m]),
);

export type WontalkCastId = (typeof wontalkCast)[number]['id'];
