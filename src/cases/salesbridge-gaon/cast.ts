import type { CastMember } from '../_types';

export const salesbridgeCast: CastMember[] = [
  { id: 'park-rep',  initial: '박', color: '#C9302C', role: 'guest', label: '박대표 (미우케이블 영업팀)' },
  { id: 'kang-bs',   initial: '강', color: '#1A5276', role: 'br',    label: '강승희 (가온 BR)' },
  { id: 'lee-team',  initial: '이', color: '#0C5460', role: 'admin', label: '이윤 팀장 (가온 영업팀장)' },
  { id: 'yang-ye',   initial: '양', color: '#27AE60', role: 'other', label: '양예은 (미우케이블)' },
  { id: 'park-dd',   initial: '박', color: '#E67E22', role: 'other', label: '박부장 (대동케이블판매)' },
  { id: 'shin-rs',   initial: '신', color: '#8E44AD', role: 'other', label: '신차장 (림스케이블)' },
  { id: 'lee-kh',    initial: '이', color: '#E91E8C', role: 'other', label: '이대리 (금호)' },
];

export const salesbridgeCastById = Object.fromEntries(
  salesbridgeCast.map((m) => [m.id, m]),
);
