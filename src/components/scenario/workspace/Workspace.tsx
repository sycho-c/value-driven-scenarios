import { useMemo } from 'react';
import type { CastMember, WorkspaceState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import { MessageList } from '../phones/MessageList';
import { OperatorPanel } from './OperatorPanel';
import { Dashboard } from './Dashboard';
import styles from './Workspace.module.css';

interface WorkspaceProps {
  state: WorkspaceState;
  castById: Record<string, CastMember>;
  operatorLabel?: string;
}

export function Workspace({
  state,
  castById,
  operatorLabel = 'BR Workspace',
}: WorkspaceProps) {
  const workspaceOwnerId = useMemo(
    () => Object.values(castById).find((m) => m.role === 'br')?.id,
    [castById],
  );

  const sidebarRooms = state.sidebar?.rooms;
  const activeRoomFromSidebar = sidebarRooms?.find(
    (r) => r.id === state.sidebar?.activeRoom,
  );
  const titleBarLabel =
    state.chat?.title ?? activeRoomFromSidebar?.label ?? '에이원오토 영업팀';
  const rooms = state.sidebar?.rooms ?? [
    { id: 'a1-auto', label: '에이원오토 영업팀', unread: 2 },
    { id: 'team-finance', label: '금융사업본부', unread: 0 },
    { id: 'partner-mgmt', label: '파트너 관리', unread: 0 },
    { id: 'compliance', label: '컴플라이언스', unread: 1 },
  ];
  const activeRoomId = state.sidebar?.activeRoom ?? 'a1-auto';

  return (
    <div className={styles.workspace}>
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.titleBarText}>
          {titleBarLabel} — BR Workspace
        </span>
        <span className={styles.titleBarBrand}>COWORK+</span>
      </div>
      <aside className={styles.sidebar}>
        <div className={styles.workspaceLogo}>COWORK+ · CONSOLE</div>
        {rooms.map((r) => (
          <div
            key={r.id}
            className={cn(styles.sidebarItem, r.id === activeRoomId && styles.active)}
          >
            <span>{r.label}</span>
            {r.unread ? <span className={styles.sidebarUnread}>{r.unread}</span> : null}
          </div>
        ))}
      </aside>
      <section className={styles.main}>
        <header className={styles.mainHeader}>
          <div className={styles.mainTitle}>
            <span className={styles.mainTitleText}>
              {state.mode === 'dashboard'
                ? '채널 운영 대시보드'
                : state.chat?.title ?? '에이원오토 영업팀'}
            </span>
            <span className={styles.mainTitleMeta}>
              {state.mode === 'dashboard'
                ? `${state.dashboard?.tabs.find((t) => t.id === state.dashboard?.activeTab)?.label ?? ''}`
                : `참여자 ${state.chat?.participants ?? 11}명`}
            </span>
          </div>
          <span className={styles.mainRoleBadge}>{operatorLabel}</span>
        </header>
        <div
          className={cn(
            styles.mainBody,
            state.mode === 'dashboard' && styles.mainBodyDashboard,
          )}
        >
          {state.mode === 'dashboard' && state.dashboard ? (
            <Dashboard
              activeTab={state.dashboard.activeTab}
              tabs={state.dashboard.tabs}
              summary={state.dashboard.summary}
              rows={state.dashboard.rows}
              rowsTitle={state.dashboard.rowsTitle}
              rowsMeta={state.dashboard.rowsMeta}
            />
          ) : (
            <div className={styles.chatPane}>
              <div className={styles.chatScroll}>
                {state.chat?.notice && (
                  <div className={styles.notice}>
                    <span>📣 {state.chat.notice.text}</span>
                    {state.chat.notice.totalCount && (
                      <span className={styles.noticeReadCount}>
                        {state.chat.notice.readCount ?? 0} / {state.chat.notice.totalCount} 읽음
                      </span>
                    )}
                  </div>
                )}
                <MessageList
                  messages={state.chat?.messages ?? []}
                  castById={castById}
                  ownerCastId={workspaceOwnerId}
                />
              </div>
            </div>
          )}
          {state.mode !== 'dashboard' && <OperatorPanel cards={state.operatorPanel ?? []} />}
        </div>
      </section>
    </div>
  );
}
