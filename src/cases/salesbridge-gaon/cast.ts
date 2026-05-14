import type { CastMember } from '../_types';
import kangAvatar from './assets/kang.png';
import parkAvatar from './assets/park.png';
import leeAvatar from './assets/lee.png';

export const salesbridgeCast: CastMember[] = [
  {
    id: 'kang-sahoo',
    initial: '강',
    color: '#C9302C',
    role: 'br',
    label: '강승희 사원 (영업지원팀 BR)',
    shortLabel: '강승희',
    org: '가온전선',
    avatarSrc: kangAvatar,
  },
  {
    id: 'lee-team',
    initial: '이',
    color: '#5B3FE4',
    role: 'admin',
    label: '이윤 팀장 (영업지원팀)',
    shortLabel: '이윤팀장',
    org: '가온전선',
    avatarSrc: leeAvatar,
  },
  {
    id: 'boss',
    initial: '본',
    color: '#FFA000',
    role: 'admin',
    label: '영업 본부장',
    shortLabel: '본부장',
    org: '가온전선',
  },
  {
    id: 'park-rep',
    initial: '박',
    color: '#C9302C',
    role: 'guest',
    label: '박대표 (미우케이블)',
    shortLabel: '박대표',
    org: '미우케이블',
    avatarSrc: parkAvatar,
  },
  {
    id: 'park-buchang',
    initial: '박',
    color: '#E67E22',
    role: 'guest',
    label: '박부장 (대동케이블판매)',
    shortLabel: '박부장',
    org: '대동케이블',
  },
  {
    id: 'shin-cha',
    initial: '신',
    color: '#2E86C1',
    role: 'guest',
    label: '신차장 (림스케이블)',
    shortLabel: '신차장',
    org: '림스케이블',
  },
  {
    id: 'lee-daeri',
    initial: '이',
    color: '#27AE60',
    role: 'guest',
    label: '이대리 (금호)',
    shortLabel: '이대리',
    org: '금호',
  },
  {
    id: 'yang-yeoneun',
    initial: '양',
    color: '#8E44AD',
    role: 'other',
    label: '양예은 (미우케이블 직원)',
    shortLabel: '양예은',
    org: '미우케이블',
  },
  {
    id: 'cha-sanghoon',
    initial: '차',
    color: '#16A085',
    role: 'br',
    label: '차상훈 사원 (가온 외근영업)',
    shortLabel: '차상훈',
    org: '가온전선',
  },
];

export const salesbridgeCastById = Object.fromEntries(
  salesbridgeCast.map((m) => [m.id, m]),
);

export const kangAvatarSrc = kangAvatar;
export const parkAvatarSrc = parkAvatar;
export const leeAvatarSrc = leeAvatar;
