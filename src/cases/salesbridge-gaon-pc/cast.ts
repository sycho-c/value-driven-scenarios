import type { CastMember } from '../_types';

export const salesbridgePcCast: CastMember[] = [
  { id: 'kang-sahoo',    initial: '강', color: '#C9302C', role: 'br',    label: '강승희 사원 (영업지원팀 BR)' },
  { id: 'lee-team',      initial: '이', color: '#5B3FE4', role: 'admin', label: '이윤 팀장 (영업지원팀)' },
  { id: 'boss',          initial: '본', color: '#FFA000', role: 'admin', label: '영업 본부장' },
  { id: 'park-rep',      initial: '박', color: '#C9302C', role: 'guest', label: '박대표 (미우케이블)' },
  { id: 'park-buchang',  initial: '박', color: '#E67E22', role: 'guest', label: '박부장 (대동케이블판매)' },
  { id: 'shin-cha',      initial: '신', color: '#2E86C1', role: 'guest', label: '신차장 (림스케이블)' },
  { id: 'lee-daeri',     initial: '이', color: '#27AE60', role: 'guest', label: '이대리 (금호)' },
  { id: 'yang-yeoneun',  initial: '양', color: '#8E44AD', role: 'other', label: '양예은 (미우케이블 직원)' },
];

export const salesbridgePcCastById = Object.fromEntries(
  salesbridgePcCast.map((m) => [m.id, m]),
);
