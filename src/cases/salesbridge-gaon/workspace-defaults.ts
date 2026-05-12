import type { WorkspaceState } from '../_types';

// 가온전선 BR이 콘솔에서 보는 채널 사이드바 — 현재 보는 거래처 채널을 첫 항목에 둔다.
export const SALESBRIDGE_SIDEBAR: NonNullable<WorkspaceState['sidebar']> = {
  activeRoom: 'mw-gaon',
  rooms: [
    { id: 'mw-gaon', label: '미우케이블 ↔ 가온', unread: 2 },
    { id: 'dd-gaon', label: '대동케이블판매', unread: 3 },
    { id: 'rs-gaon', label: '림스케이블', unread: 1 },
    { id: 'gaon-team', label: '가온 영업팀' },
  ],
};

export const SALESBRIDGE_CONSOLE_TITLE = '미우케이블 ↔ 가온';
